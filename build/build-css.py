#!/usr/bin/env python3
"""
Emit the design system as a standalone stylesheet.

    python3 build-css.py

Writes medmasters-cards.css, pulled straight out of the shared template in
build-week.py. It is generated rather than maintained separately so the
file she drops into another project cannot drift from what the course
pages actually ship.
"""
import io, os, re, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('bw', os.path.join(HERE, 'build-week.py'))
bw = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bw)

css = bw.TEMPLATE[bw.TEMPLATE.index('<style>') + 7:bw.TEMPLATE.index('</style>')].replace('%%', '%')

# Keep the tokens, the base reset, the accessibility primitives and the
# card system. Drop the page furniture, which is specific to the course.
root = css[css.index(':root{'):css.index('*,*::before')]
base = css[css.index('*,*::before'):css.index('/* ---------- top bar ---------- */')]
cards = css[css.index('/* ============================================================\n   MEDMASTERS CARD SYSTEM'):
            css.index('@media(prefers-reduced-motion:reduce)')]
motion = '@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}\n'

HEAD = '''/* ============================================================
   MedMasters card system
   ------------------------------------------------------------
   Dr. Sharilyn Rennie. Generated %s by build-css.py, from the
   same stylesheet the BIO 005 pages ship, so this file and those
   pages cannot drift apart. Do not hand-edit: edit build-week.py
   and run build-css.py again.

   Drop it in as a stylesheet, or paste it inside a <style> tag.
   Class names match the markup on medmasterscollaborative.com,
   so it is drop-in compatible with that page.

   THREE VALUES DIFFER FROM THE ORIGINAL SPEC, EACH FOR A REASON

   1. --navy-55 became --navy-75.
      The original measured 4.04:1 on white. Normal-size text needs
      4.5:1 to reach AA at all and 7:1 for AAA. --navy-75 measures
      8.10:1 on white and 7.76:1 on off-white.

   2. .cta-outline no longer takes its border from --navy-15.
      A button's edge is the thing that tells you it is a button,
      so 1.4.11 asks for 3:1. --navy-15 is 1.37:1. It now uses
      --navy-50 at 3.45:1. --navy-15 is still used for card edges
      and dividers, which carry no information and are exempt.

   3. Fonts under 11px were raised to 11px.
      The badge (9px), the includes label (9.5px), the button (10px)
      and the list item (12px) kept their weights and their letter
      spacing, so the look holds, but not their sizes. No WCAG rule
      sets a minimum size. This is a judgement call about students
      reading on a phone, and it is the one change here you might
      reasonably want reversed. The original numbers are in the
      comment beside each rule.

   A note on colour and dark grounds: terra measures 2.36:1 against
   navy, so it cannot be the accent on a dark band. On dark, use
   --straw-light for quiet text and --gold-bright for emphasis.
   On terra itself, use white: --straw-light is only 5.96:1 there.
   ============================================================ */

'''

TYPE = '''
/* ---- TYPE SCALE, for reference ------------------------------
   eyebrow    11px   / 700 / +3.3px  / uppercase / terra
   headline   30px   / 800 / -0.6px  / display   / navy
   number     28px   / 800 / -0.56px / terra
   tier name  18px   / 800 / -0.27px / navy
   price      13px   / 700 /                     / terra
   tagline    13px   / 400 /                     / navy
   includes   11px   / 700 / +2.09px / uppercase / navy   (spec: 9.5px)
   list item  13px   / 500 /                     / navy   (spec: 12px)
   button     11px   / 700 / +2px    / uppercase          (spec: 10px)
   badge      11px   / 700 / +1.98px / uppercase          (spec: 9px)
   ------------------------------------------------------------- */
'''


def main():
    import datetime
    out = (HEAD % datetime.date.today().strftime('%B %-d, %Y')) + root + TYPE + base + cards + motion
    if '—' in out or '–' in out:
        raise SystemExit('em or en dash in the stylesheet')
    io.open('medmasters-cards.css', 'w', encoding='utf-8').write(out)
    print('%-24s %6.1f KB' % ('medmasters-cards.css', len(out) / 1024.0))


if __name__ == '__main__':
    main()
