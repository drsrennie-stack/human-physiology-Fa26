#!/usr/bin/env python3
"""
Strip Lora and italics out of the BIO 005 repo.

    cd human-physiology-Fa26
    python3 fix-lora-italics.py --dry-run     # see what would change
    python3 fix-lora-italics.py               # do it

WHY THIS EXISTS
---------------
Two of Scrubs' standing rules are "never Lora" and "never italic text
anywhere". Seventeen files in this repo break one or both. They are not
random drift: palettes.md at the workspace root says, in the PRIMARY
type scale, "Lora italic: usage instructions, body emphasis". Every file
that carries Lora italic was built correctly against that document. The
document is what is wrong, and it needs that line deleted, otherwise the
next file built from it reintroduces exactly this.

BRAND-MIGRATION.md already flagged the contradiction in Aug 2026 and
asked which one wins. This script is the answer: the rule wins.

WHAT IT CHANGES
---------------
1. The --serif token stops being Lora and becomes the display stack, so
   any rule still reaching for var(--serif) lands on Plus Jakarta Sans
   rather than falling through to Georgia.
2. Every font-family that names Lora drops it.
2b. Every other serif stack goes too. There is no serif in this design
   system any more, so Georgia, Times New Roman and Fraunces are the same
   mistake under a different name. The common one is
   font-family:var(--font-serif,Georgia),serif, forty two of them, where
   the token is never defined so it quietly lands on Georgia.
3. Every font-style:italic becomes font-style:normal. Nothing is deleted,
   so a rule that used italic for emphasis keeps its other properties and
   just stops leaning.
4. Lora is removed from every Google Fonts URL, which also means one less
   font file per page load.
5. The one comment in brand.css that still describes Lora italic is
   reworded, so the file does not document a rule it no longer follows.
6. Every HTML file gets a belt-and-braces reset, em,i,cite,dfn,var,address
   {font-style:normal}, injected before </style> if it is not already
   there. That catches italics that come from the browser default rather
   than from a stylesheet, which is how <em> in body copy sneaks back in.

WHAT IT DOES NOT TOUCH
----------------------
DM Sans. Several files still load it for eyebrow lines, and the Aug 17
correction says Plus Jakarta Sans everywhere including eyebrows. That is
a separate change with a visible result, so it is not bundled in here.
"""
import os, re, sys, io

DRY = '--dry-run' in sys.argv

DISPLAY = "'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"
RESET = "em,i,cite,dfn,var,address{font-style:normal}"

SKIP_DIRS = {'.git', 'node_modules', '.github'}
EXTS = ('.html', '.css', '.js')


def fix_text(path, s):
    orig = s
    notes = []

    # 1. the --serif token itself
    n = len(re.findall(r"--serif\s*:[^;}]*Lora[^;}]*", s))
    if n:
        s = re.sub(r"(--serif\s*:)[^;}]*", r"\1" + DISPLAY, s)
        notes.append(f"{n} --serif token")

    # 2. Lora inside any other font-family stack
    def drop_lora(m):
        stack = m.group(2)
        parts = [p.strip() for p in stack.split(',')]
        parts = [p for p in parts if 'lora' not in p.lower()]
        if not parts:
            parts = [DISPLAY]
        return m.group(1) + ', '.join(parts)
    before = s
    s = re.sub(r"(font-family\s*:\s*)([^;}\n]*[Ll]ora[^;}\n]*)", drop_lora, s)
    if s != before:
        notes.append("Lora dropped from a font stack")

    # 2b. every other serif stack in the teaching files. The design system has
    #     no serif in it at all any more, so a rule reaching for Georgia,
    #     Times New Roman or Fraunces is the same mistake wearing a different
    #     name. var(--font-serif,Georgia) is the common one: the token is never
    #     defined, so it silently lands on Georgia.
    before = s
    s = re.sub(r"font-family\s*:\s*var\(--font-serif[^)]*\)\s*,\s*serif", "font-family:" + DISPLAY, s)
    s = re.sub(r"font-family\s*:\s*'?(?:Fraunces|Georgia|Times New Roman)'?\s*,[^;}\n]*", "font-family:" + DISPLAY, s)
    if s != before:
        notes.append("serif stack repointed at Plus Jakarta Sans")

    # 3. italics off
    n = len(re.findall(r"font-style\s*:\s*italic", s))
    if n:
        s = re.sub(r"font-style\s*:\s*italic", "font-style:normal", s)
        notes.append(f"{n} font-style:italic")

    # 4. Lora out of the Google Fonts URL
    def clean_url(m):
        url = m.group(0)
        url = re.sub(r"family=Lora(?::[^&\"']*)?&?", "", url)
        url = url.replace('css2?&', 'css2?').rstrip('&')
        return url
    before = s
    s = re.sub(r"https://fonts\.googleapis\.com/css2\?[^\"'\s>]*", clean_url, s)
    if s != before:
        notes.append("Lora removed from a Google Fonts URL")

    # 4c. an @import that still pulls a serif webfont down. Nothing uses it
    #     once the stacks above are repointed, so it is dead weight on load.
    before = s
    s = re.sub(r"@import\s+url\(['\"]?https://fonts\.googleapis\.com/css2\?family=(?:Fraunces|Lora)[^)]*\);\s*", "", s)
    s = s.replace('/* Serif display headlines (Fraunces) and serif numerals */',
                  '/* Display headlines and numerals. Plus Jakarta Sans, no serif. */')
    if s != before:
        notes.append("dropped a serif webfont import")

    # 4b. the one prose line inside brand.css that still describes the old rule
    if s.count('Usage instructions and body emphasis: Lora italic'):
        s = s.replace('Usage instructions and body emphasis: Lora italic',
                      'Usage instructions and body emphasis: Plus Jakarta Sans, never italic')
        notes.append('corrected the type-scale comment')

    # 5. the reset, HTML only, once per file, in the last <style> block
    if path.endswith('.html') and RESET not in s and 'font-style:normal}' not in s:
        i = s.rfind('</style>')
        if i != -1:
            s = s[:i] + "\n/* Scrubs rule: no italics anywhere. Browser defaults included. */\n" + RESET + "\n" + s[i:]
            notes.append("added the no-italics reset")

    return s, notes, s != orig


def main():
    root = os.getcwd()
    changed = 0
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in sorted(filenames):
            if not fn.endswith(EXTS):
                continue
            path = os.path.join(dirpath, fn)
            rel = os.path.relpath(path, root)
            try:
                with io.open(path, encoding='utf-8') as fh:
                    s = fh.read()
            except (UnicodeDecodeError, OSError):
                continue
            new, notes, did = fix_text(path, s)
            if did:
                changed += 1
                print(f"{'would fix' if DRY else 'fixed'}  {rel}")
                for n in notes:
                    print(f"            {n}")
                if not DRY:
                    with io.open(path, 'w', encoding='utf-8') as fh:
                        fh.write(new)

    print()
    print(f"{changed} file{'s' if changed != 1 else ''} {'would change' if DRY else 'changed'}.")
    if not DRY and changed:
        print()
        print("Left to do by hand, because they are prose and not code:")
        print("  1. palettes.md at the workspace root. Delete the line")
        print("     'Lora italic: usage instructions, body emphasis' from the")
        print("     PRIMARY font list, or every new file rebuilds this problem.")
        print("  2. BRAND-MIGRATION.md closes its 'still to do' section with")
        print("     the Lora question. It can be marked answered.")


if __name__ == '__main__':
    main()
