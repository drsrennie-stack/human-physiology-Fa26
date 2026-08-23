#!/usr/bin/env python3
"""
Put one logo on every page of the BIO 005 repo, and a favicon on all of them.

    cd human-physiology-Fa26
    python3 fix-branding.py --dry-run
    python3 fix-branding.py

WHAT THE AUDIT FOUND
--------------------
The repo is carrying two different logos and a lot of pages carrying
none.

  The three-figure mark   navy, maroon and gold figures. This is the
                          real one. It is what icon.svg draws, what
                          the BIO 004 build uses, and what sits on
                          before-you-start, the unit pages, week-01,
                          the study guide and the OS.

  An EKG square           a rounded square with a heartbeat trace
                          through it, on course-schedule, start-here,
                          what-you-do and competency-map. It is not
                          in any brand document. It also carries gold
                          #DCB45C, which is the pre-migration gold
                          that BRAND-MIGRATION.md replaced, and on
                          start-here the square is maroon while on the
                          others it is navy, so the three copies do
                          not even agree with each other.

  Nothing at all          thirteen pages, including index.html.

  No favicon              twenty one pages. The tab shows a blank
                          document icon, so a student with six course
                          tabs open cannot tell them apart.

WHAT THIS SCRIPT DOES
---------------------
1. Replaces the EKG square with the three-figure mark, in place, in
   the same slot and at the same size. No layout moves.
2. Adds <link rel="icon" href="icon.svg"> to every page that lacks it,
   with the correct relative path from os/.
3. Leaves pages alone that already carry the three-figure mark.

WHAT IT DELIBERATELY DOES NOT DO
--------------------------------
It does not inject a whole brand header into the pages that have no
header at all. Those pages have different layouts and a header dropped
in blind would land in the wrong place on some of them. They are listed
at the end of the run so you can decide page by page. welcome.html and
course-entry.html are excluded from that list on purpose: both are
front doors with their own full-bleed hero mark, which is correct.
"""
import os, re, sys, io

DRY = '--dry-run' in sys.argv

# The three-figure mark, viewBox 40 10 125 148, navy + maroon + gold.
FIGURES = (
 '<g transform="translate(0,18)">'
 '<g transform="translate(60,0) rotate(8 0 130)">'
 '<circle cx="0" cy="20" r="10" fill="#08101F"/>'
 '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 '
 'C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#08101F"/></g>'
 '<g transform="translate(100,0)">'
 '<circle cx="0" cy="10" r="11" fill="#5E201A"/>'
 '<path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 '
 'C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#5E201A"/></g>'
 '<g transform="translate(140,0) rotate(-8 0 130)">'
 '<circle cx="0" cy="20" r="10" fill="#B8924A"/>'
 '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 '
 'C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#B8924A"/></g></g>'
)

# An EKG-square mark: a <svg class="mark"> holding a rect plus one heartbeat path.
EKG_RE = re.compile(
    r'<svg([^>]*class="mark"[^>]*)>\s*<rect\b[^>]*/?>\s*(?:</rect>)?\s*'
    r'<path\b[^>]*d="M\d[^"]*"[^>]*/?>\s*(?:</path>)?\s*</svg>',
    re.S)

ICON_RE = re.compile(r'<link[^>]+rel=["\']icon["\']', re.I)
HEAD_RE = re.compile(r'(<meta[^>]+charset[^>]*>)', re.I)

NO_HEADER_OK = {'welcome.html', 'course-entry.html'}


def swap_mark(s):
    """Put the three-figure artwork inside the existing <svg class="mark"> slot."""
    def rep(m):
        attrs = m.group(1)
        attrs = re.sub(r'viewBox="[^"]*"', 'viewBox="40 10 125 148"', attrs)
        if 'viewBox' not in attrs:
            attrs += ' viewBox="40 10 125 148"'
        if 'aria-label' not in attrs and 'aria-hidden' not in attrs:
            attrs += ' role="img" aria-label="BIO 005 Human Physiology"'
        return '<svg' + attrs + '>' + FIGURES + '</svg>'
    return EKG_RE.subn(rep, s)


def add_icon(path, s):
    if ICON_RE.search(s):
        return s, 0
    href = '../icon.svg' if os.path.dirname(path) else 'icon.svg'
    tag = '<link rel="icon" type="image/svg+xml" href="%s">' % href
    m = HEAD_RE.search(s)
    if m:
        return s[:m.end()] + '\n' + tag + s[m.end():], 1
    i = s.lower().find('<head>')
    if i != -1:
        j = i + len('<head>')
        return s[:j] + '\n' + tag + s[j:], 1
    return s, 0


def main():
    root = os.getcwd()
    files = [f for f in sorted(os.listdir(root)) if f.endswith('.html')]
    if os.path.isdir(os.path.join(root, 'os')):
        files += ['os/' + f for f in sorted(os.listdir(os.path.join(root, 'os'))) if f.endswith('.html')]

    swapped = icons = 0
    no_mark = []
    for rel in files:
        p = os.path.join(root, rel)
        try:
            s = io.open(p, encoding='utf-8').read()
        except (UnicodeDecodeError, OSError):
            continue
        orig = s
        notes = []

        s, n = swap_mark(s)
        if n:
            swapped += n
            notes.append('%d EKG square%s replaced with the three-figure mark' % (n, '' if n == 1 else 's'))

        s, k = add_icon(rel, s)
        if k:
            icons += k
            notes.append('favicon added')

        if 'C -10,32 -16,36 -16,42' not in s and os.path.basename(rel) not in NO_HEADER_OK:
            no_mark.append(rel)

        if s != orig:
            print(('would fix  ' if DRY else 'fixed  ') + rel)
            for note in notes:
                print('           ' + note)
            if not DRY:
                io.open(p, 'w', encoding='utf-8').write(s)

    print()
    print('EKG squares replaced: %d' % swapped)
    print('favicons added:       %d' % icons)
    if no_mark:
        print()
        print('Still carrying no logo at all, %d pages. These need a header slot' % len(no_mark))
        print('before a mark can go in, so decide them one at a time:')
        for f in no_mark:
            print('   ' + f)


if __name__ == '__main__':
    main()
