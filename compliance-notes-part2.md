# Accessibility compliance notes: Part 2 Learning Guide and Your Week

Project: BIO 005 Human Physiology, Yuba College, Fall 2026
Files covered: learning-guide.html, your-week.html, bio005-part2-data.js (data only, no markup)
Date: November 1, 2026

## WCAG version and target

WCAG 2.2 AA met on every criterion checked below. AAA contrast met on all body text pairs; AA on the two gold-on-navy label pairs (see table).

## Color contrast

| Text | Background | Ratio | Result |
|------|------------|-------|--------|
| #1f2a44 body text | #FFFFFF card | 13.6:1 | AAA |
| #5c6577 muted text (14 px, 600) | #FFFFFF | 5.6:1 | AA (AAA for large) |
| #0B1530 button text | #FFFFFF | 17.6:1 | AAA |
| #8B3A2E section titles and numbers (26 to 72 px) | #FFFFFF | 7.0:1 | AAA |
| #FFFFFF hero text | #0B1530 | 17.6:1 | AAA |
| #DCB45C gold labels (11 to 12 px uppercase, 700) | #0B1530 | 9.4:1 | AAA |
| #dfe5f2 hero body text | #0B1530 | 14.0:1 | AAA |
| #6E5018 on #F2E8D8 chip | | 6.9:1 | AA (AAA at 7:1 not quite; chip text is 10 px bold, decorative label duplicated by the row text) |
| #FFFFFF on #8B3A2E (open button, exam card) | | 7.0:1 | AAA |
| #0B1530 on #C9A14A (gold button) | | 8.2:1 | AAA |

## Keyboard

- Skip link to the main region on both pages.
- Every button and link is a native <a> or <button>; tab order follows reading order (hero, week selector, sections 1 to 6, rail).
- "Not posted yet" items are non-interactive spans with a visible label, so they are not in the tab order and do not read as broken links.
- Week selector is a native <select>; the rail week list uses <button> elements with aria-current on the active week.
- Visible focus: 3 px gold outline on every focusable element.

## Screen reader

Checked with the page's accessibility tree in Chromium and VoiceOver landmarks.

- Landmarks: header, main, aside (labelled "Quick links"), each numbered section is a <section> with aria-labelledby pointing at its heading.
- Headings: one h1 per page; h2 per section; h3 inside the week pattern cards.
- The big section numbers and arrows are aria-hidden; the heading carries the meaning.
- External links append "(opens in a new tab)" visually hidden.
- The stats strip is aria-live="polite" so a week change announces the new state.

## Motion and print

- prefers-reduced-motion disables the card lift.
- your-week.html has a print stylesheet: black on white, no bands, no buttons.

## Known limitations

- The week change on learning-guide.html rewrites the main region; the stats strip announces, the sections do not (they are navigated normally afterward). If this proves noisy it can be moved to a single status line.
- Links marked "not posted yet" become live only when a file name is entered in bio005-part2-data.js.

Reviewer: Dr. Sharilyn Rennie

## Added November 6, 2026: cardiac-lab.html, hemodynamics-lab.html, discussion-w9-engineering.html, rx-cards.html (weekly report)

- Same token set and contrast pairs as above (maroon #8B3A2E on white 7.0:1 for headings; navy #0B1530 on white 17.6:1; body #14202F on white 15.6:1).
- Tabs are a WAI-ARIA tablist with arrow-key, Home and End navigation; panels are tabpanels; every input has a visible label or an aria-label; feedback regions are aria-live="polite".
- The check buttons give text verdicts ("Yes" / "No" / "Not yet") beside the color, never color alone.
- Rhythm strips and the biomarker curve are SVG with role="img" and a descriptive aria-label; the strips also state scale in visible text. Students who cannot see the strips can answer from the stated R to R and PR values in the key, which the instructor can provide on request.
- The heart-sound player uses synthesized audio and is optional; every sound is also described in text in the cases.
- Print stylesheets remove the tab bar and buttons and print every panel with the typed answers; black on white.
- Weekly card report prints as a single black on white page.
