#!/usr/bin/env python3
"""
Build mastery-physio-os-standalone.html from os/mastery-physio-os.html.

    python3 tools/build-standalone.py                 # the OS
    python3 tools/build-standalone.py week-01.html    # any other page

WHY THIS FILE EXISTS
--------------------
The README has said "regenerate the standalone after any change in os/"
since the fork, and until now there was nothing to regenerate it with. It
was built by hand once. A one-line fix in os/bio005-reading-mode.js then
had to be made twice, in two files, by hand, and the second one is the one
a person forgets. Two copies of the same code that drift apart is the
whole reason this course has a single-file build in the first place.

WHAT IT DOES
------------
1. Replaces every <script src="..."> in the OS page with the file inline.
2. Inlines the three files the dock fetches at run time. These are not
   <script src> tags in the source page: the dock injects them itself when
   it needs them, and injection cannot reach a sibling file that is not
   there. They go in AHEAD of the dock, so the dock's own
   "already loaded?" guards see them and short circuit rather than trying
   to fetch. Order matters and is not alphabetical.
3. Rewrites the icon link to a data URI so nothing at all is fetched.

Pass any other page in the repo and it does the same thing for that
page, writing <name>-standalone.html next to it. Use that whenever a
single page has to leave the repo. Sending a loose multi file page is
what produced an unstyled screenshot and the question "it looks nothing
like my operating system, what the hell?", and the answer was that the
page was fine and its dependencies were not with it.

WHAT IT DELIBERATELY DOES NOT DO
--------------------------------
It does not minify, reorder or reformat anything. The output should
differ from the input only in that the dependencies are inside it, so a
diff between two builds is readable and a mistake is visible.
"""
import base64, os, re, sys

# The three the dock injects at run time, in the order they must appear.
RUNTIME = ['bio005-reading-mode.js', 'schedule-fall2026.js', 'hootie.js']

SRC = 'os/mastery-physio-os.html'
OUT = 'mastery-physio-os-standalone.html'
ICON = 'icon.svg'


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def guard(js):
    """Close a script block safely.

    Any literal </script> inside inlined JS would end the block early. The
    dock and Hootie both contain example markup with script tags in their
    comments, which is exactly how this bites.
    """
    return js.replace('</script>', '<\\/script>')


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)

    src = sys.argv[1] if len(sys.argv) > 1 else SRC
    out = OUT if src == SRC else (os.path.splitext(src)[0] + '-standalone.html')

    if not os.path.exists(src):
        print('Cannot find ' + src)
        return 1

    page = read(src)
    osdir = os.path.dirname(src)
    inlined, missing = [], []

    def swap(m):
        rel = m.group(1)
        path = os.path.normpath(os.path.join(osdir, rel))
        if not os.path.exists(path):
            missing.append(rel)
            return m.group(0)
        inlined.append(rel)
        return ('<script>\n/* ===== inlined: ' + rel + ' ===== */\n'
                + guard(read(path)) + '\n</script>')

    page = re.sub(r'<script src="([^"]+)"></script>', swap, page)

    # The run time three, immediately before the dock that pulls them.
    anchor = '<script>\n/* ===== inlined: bio005-dock.js ===== */'
    if anchor not in page:
        print('No dock on this page, so nothing is fetched at run time.')
        anchor = None

    ahead = ''
    for name in (RUNTIME if anchor else []):
        path = os.path.join(osdir, name)
        if not os.path.exists(path):
            path = name                      # some live at the repo root
        if not os.path.exists(path):
            missing.append(name)
            continue
        inlined.append(name + ' (run time)')
        ahead += ('<script>\n/* ===== inlined ahead of the dock: ' + name
                  + ' ===== */\n' + guard(read(path)) + '\n</script>\n')
    if anchor:
        page = page.replace(anchor, ahead + anchor, 1)

    # Icon as a data URI, so the build fetches nothing at all.
    if os.path.exists(ICON):
        b64 = base64.b64encode(read(ICON).encode('utf-8')).decode('ascii')
        page = re.sub(r'href="(\.\./)?icon\.svg"',
                      'href="data:image/svg+xml;base64,' + b64 + '"', page)

    # The title says which build this is. A student with both open sees
    # two identical tabs otherwise, and the multi file one is the one that
    # looks broken when it is opened outside the repo folder.
    if src == SRC:
        page = re.sub(r'<title>Mastery Physio OS(?!, single file)',
                      '<title>Mastery Physio OS, single file', page, count=1)

    banner = ('<!-- SINGLE FILE BUILD. Every dependency inlined. Regenerate after any\n'
              '     change in os/ with: python3 tools/build-standalone.py\n'
              '     Never edit this file by hand. -->\n')
    page = re.sub(r'<!-- SINGLE FILE BUILD.*?-->\n', '', page, flags=re.S)
    page = page.replace('<head>', '<head>\n' + banner, 1)

    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)

    print(out + '  ' + str(round(len(page) / 1024)) + ' KB')
    print('inlined ' + str(len(inlined)) + ' files:')
    for name in inlined:
        print('   ' + name)
    # Look for leftovers only OUTSIDE script blocks. The dock and Hootie
    # both contain the string <script src="..."> inside their own code,
    # because injecting a script tag is what they do, and matching those
    # reports a clean build as broken.
    outside = re.sub(r'<script(?![^>]*\ssrc=)[^>]*>.*?</script>', ' ', page, flags=re.S)
    left = re.findall(r'<script src="([^"]+)"', outside)
    if left:
        print('\nSTILL FETCHED, so the build is not standalone:')
        for name in left:
            print('   ' + name)
    if missing:
        print('\nMISSING, could not inline:')
        for name in missing:
            print('   ' + name)
    return 1 if (left or missing) else 0


if __name__ == '__main__':
    sys.exit(main())
