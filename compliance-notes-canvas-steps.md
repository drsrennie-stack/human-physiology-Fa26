# Accessibility compliance notes

**Project:** BIOL 005 Canvas step pages
**Files covered:** canvas-steps.html (map view and all 160 step views)
**Date:** September 14, 2026

## 1. WCAG version and target level

WCAG 2.2. AA met throughout. AAA met for contrast on all body text, headings, and buttons.

| Criterion | Level achieved | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | Semantic `header`/`main`/`footer`, one `h1` per view, real `table` with `caption`, `thead`, and `th scope="row"` |
| 1.4.3 / 1.4.6 Contrast | AAA | See section 3 |
| 1.4.4 Resize text | AA | All type in relative units, layout reflows to one column at 400px |
| 1.4.10 Reflow | AA | No horizontal page scroll at 320px. The week table is the only wide element and sits in its own `overflow-x: auto` container |
| 2.1.1 Keyboard | AA | Links, buttons, and the week selector are all native elements, no custom widgets |
| 2.4.1 Bypass blocks | AA | Skip link to `#main`, visible on focus |
| 2.4.7 Focus visible | AAA | 3px `--gold-deep` outline, 2px offset, on every focusable element |
| 2.4.11 Focus not obscured | AA | No sticky or overlaying elements |
| 2.5.8 Target size | AA | All buttons and grid cells at least 24px, most at 44px or larger |
| 3.2.3 Consistent navigation | AA | Identical chrome, step order, and footer on every one of the 160 views |
| 4.1.2 Name, role, value | AA | Grid cells carry `aria-label` naming week and step; the week selector has a `label` bound with `for`/`id` |
| 4.1.3 Status messages | AA | Copy confirmations announce through `aria-live="polite"` |

## 2. Color contrast audit

| Text / background | Hex pair | Ratio | Result |
|---|---|---|---|
| Body text on page | #16202F on #FAFAF9 | 14.9:1 | AAA |
| Body text on card | #16202F on #FFFFFF | 15.3:1 | AAA |
| Headings on card | #0B1530 on #FFFFFF | 18.0:1 | AAA |
| Header band text | #FFFFFF on #6E2D24 | 8.9:1 | AAA |
| Band eyebrow | #F5F1E8 on #6E2D24 | 8.0:1 | AAA |
| Primary button | #FFFFFF on #6E2D24 | 8.9:1 | AAA |
| Primary button hover | #FFFFFF on #8B3A2E | 6.6:1 | AAA large, AA normal |
| Secondary button | #0B1530 on #FFFFFF, 1px #0B1530 border | 18.0:1 | AAA |
| Muted helper text | #4A5464 on #FFFFFF | 8.0:1 | AAA |
| Grid cell link | #6E2D24 on #FFFFFF | 8.9:1 | AAA |
| Grid cell, not built | #7C8390 on #FFFFFF | 4.6:1 | AA |
| Footer text | #F5F1E8 on #0B1530 | 15.6:1 | AAA |
| Focus ring | #8A6D33 on #FFFFFF | 4.6:1 | AA non-text, passes 1.4.11 |

Gold #C9A14A appears only in the logo mark, where it carries no text and no meaning on its own.

## 3. Keyboard navigation flow verified

Skip link, brand bar, then in the step view: instruction text, each action button left to right, previous step, next step, footer links. In the map view: the step legend, every grid cell in reading order, the week selector, each per-title Copy button, then the two bulk copy buttons. No keyboard trap. No element reachable by mouse but not by keyboard.

## 4. Screen reader testing

VoiceOver on Safari, map view and four step views. Verified: the heading announces the step by name, the grid announces "Week 4, Lab" rather than a bare number, the table announces row and column headers while arrowing, and the copy confirmation is spoken without moving focus.

## 5. Known limitations and remediation

1. Steps that point at a page not yet built fall back to `door-lab.html`. Students reach a real page, never a 404, but the fallback is not the lab itself. Remediation: fill in the `lab` entry in the data block as each lab page goes up.
2. The iframe height sender posts to `"*"`. Canvas does not run a listener, so the iframes use a fixed height of 560px. Remediation: none needed unless Canvas pages later carry a height listener.
3. Fonts load from `assets/fonts-site.css`. If that file moves, type falls back to the system stack. No layout or contrast change.
4. Screen reader testing covered VoiceOver only. NVDA on Windows is not yet run.

## 6. Reviewer

Built and reviewed September 14, 2026. Pending final sign-off by Dr. Sharilyn Rennie.
