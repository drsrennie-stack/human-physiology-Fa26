# Accessibility compliance notes

## 1. Project

BIO 005 Human Physiology, Week 2 lecture: The chemistry that does work in the body (Silverthorn chapters 2 and 4).

Files covered:

- `biol005-w02-chemistry-slides.html` (37 slides, 5 problems, 10 drawn figures, dark on screen and white in print)
- `biol005-w02-chemistry-notes.html` (student notes)
- `biol005-w02-chemistry-transcript.html` (instructor recording script, not student facing)
- `chemistry-review.html` (optional Khan Academy review page)

Date: September 13, 2026. Supersedes the September 12 notes for this week.

## 2. WCAG version and target

WCAG 2.2. Level AA met on every criterion checked, and AAA met for text contrast (1.4.6) on every pair but one, which is AA. Reduced motion (2.3.3) and visible focus are inherited from the audited shell.

## 3. Colour contrast audit

The deck now has two themes. Both were measured.

### Dark theme (screen and recording)

Dark navy only. Nothing on the navy is a lighter navy or a blue: anything that lifts off the page is either a terra card carrying white or cream, or a plain white card.

| Text | Background | Ratio | Result |
|---|---|---|---|
| White #FFFFFF | Navy #0B1530 | 18.04:1 | AAA |
| Cream #F5F1E8 | Navy | 16.0:1 | AAA |
| Warm grey #D8CFBE, muted text | Navy | 11.67:1 | AAA |
| Gold #C9A14A, eyebrows and accents | Navy | 7.46:1 | AAA |
| White | Terra card #8B3A2E | 7.66:1 | AAA |
| Cream | Terra card | 6.79:1 | AA |
| Navy | White card (clinical bar) | 18.04:1 | AAA |

Gold is the accent on navy rather than terra, because terra #8B3A2E against navy is far too dark to read. Terra is used only as a card fill in the dark theme, never as text on the navy.

### Light theme (print, and the three reading pages)

| Text | Background | Ratio | Result |
|---|---|---|---|
| Navy #0B1530 | White | 18.04:1 | AAA |
| Terra #8B3A2E | White | 7.66:1 | AAA |
| Navy-72 #4F576A captions | White | 7.23:1 | AAA |
| White pill text | Rad tech #6B5017 | 7.54:1 | AAA |
| White pill text | Respiratory #2C4A70 | 9.05:1 | AAA |

Text inside the Pearson figures is part of the image and is not under our control. Every one carries a full text alternative.

## 4. Printing

Printing is the reason the dark theme is scoped to `@media screen`. A student who prints the deck gets the white version whether or not the screen was dark, and a `beforeprint` handler also drops the dark class so the print preview matches. Verified by emulating print media with the dark theme active: slide background came back white and title text navy.

## 5. Keyboard navigation

Verified in headless Chromium. Tab reaches Present, Reset boxes, the new theme switch, Print, every reveal button, every clinical bar, every sorter button, and every figure. Enter or Space opens a figure in the lightbox; Escape closes it and returns focus. In present mode, arrow keys, Page Up and Down, and Escape work, and the pen layer keeps its W, P, H, E, bracket and Escape shortcuts.

Tested interactively rather than by inspection: the solubility sorter marks right and wrong and announces through `aria-live`; Reset boxes clears all reveals, all clinical bars and all sorter rows; the theme switch toggles and reports through the live region.

## 6. Screen reader

Checked against the accessibility tree. Every figure has a text alternative written from the figure rather than from a filename, and the ten drawn SVGs carry `title` and `desc` elements describing the shape of the relationship, not just the labels, so a curve is answerable without seeing it. Sorter rows use a real table with row headers, `aria-pressed` on the choice buttons and an `aria-live` result cell. The relationship tables are real tables with `scope` on every header, so "if this changes, then this, because" is read as a row rather than as three loose fragments.

Not yet done: a manual pass with VoiceOver and NVDA. Same open item as the previous two builds.

## 7. Known limitations and remediation

- Figure images from the publisher are raster. Alt text is complete, and each opens in a lightbox at up to 94vw. On the dark theme they sit on a white plate so they read as a deliberate inset rather than a rectangle of glare.
- One dark pair, cream on the terra card, is AA rather than AAA at 6.79:1. Using white instead of cream on terra cards would take it to 7.66:1 if AAA everywhere matters more than the cream accent.
- Khan Academy is a third-party site and its accessibility is outside this audit. The review page opens every external link in a new tab with `rel="noopener"` and labels each one by type so a screen reader user knows whether they are about to get a video, an article or a practice set.
- Video captions cannot be verified until the lectures are recorded.

## 8. Fixed in this build

- **The stylesheet insertion point.** The theme block was initially added at the deck marker, which sits before the shell's own present-mode rules, so same-specificity overrides silently lost. Moving it to the end of the style block fixed it. Worth knowing for any future edit to these files: shell present-mode rules come last, so overrides have to come after them.
- **Slide width in present mode.** The shell capped the slide body at 1360px, which on a 1080p or wider display left a wide empty margin either side and forced the auto-fit to shrink dense slides that had room to spare. Raised to `min(1860px, 95vw)`. Every one of the 37 slides now fits at full size with no shrinking at 1920 by 1080, where before four slides were being scaled to as low as 52 percent.
- **Site chrome during recording.** The nav bar, footer and floating buttons injected by `bio005-nav.js` now hide in present mode and in print. This was an open item on both previous builds and was much more visible against a dark slide.
- **Drawn figures on dark.** The base `.fig` rule paints a white background, so a drawn SVG showed white letterbox bars either side on the dark theme. Given an explicit navy background.
- **Per-table sorter tally.** The Week 2 shell still had the single-sorter version that looked for one hard-coded element id and appended a message belonging to a different activity. Replaced with the per-table version already used in the Week 3 deck.

## 9. Reviewer

Built and checked by Claude for Dr. Sharilyn Rennie. Automated checks: overflow sweep across all 37 slides in present mode at 1920 by 1080 (zero shrinking, zero overflow), zero console or page errors on all four files, no broken images, no missing alt text, no SVG missing a title, one h1 per page, skip link present on all four, no em dashes, no italic text, no Lora. QR codes were generated and then decoded back with OpenCV to confirm each one resolves to the intended URL before shipping.
