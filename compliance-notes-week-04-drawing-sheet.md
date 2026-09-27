# Accessibility compliance notes

## 1. Project

BIOL 005 Human Physiology, Week 4. Printable drawing sheet.

Files covered:

- biol005-w04-drawing-sheet.html
- week-04.html (drawing sheet card added)

Date: September 23, 2026
Reviewer: Dr. Sharilyn Rennie

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level achieved | Notes |
|---|---|---|
| 1.1.1 Non-text content | AA | The one scaffold figure, the blank membrane on Part 3, carries a role of img and a description of what is drawn. Empty drawing boxes carry no content to describe, and the task text above each one states what goes in it. |
| 1.3.1 Info and relationships | AA | Each part is a section with an aria-labelledby heading. Tasks use headings, not bold text, so the structure is real. |
| 1.3.2 Meaningful sequence | AA | Reading order matches visual order in both screen and print views. |
| 1.4.3 / 1.4.6 Contrast | AAA for all text | Navy on white 18.04:1, secondary #414B5C on white 8.80:1. Rule lines are structural, not text. |
| 1.4.10 Reflow | AA | The three-across and two-across grids collapse to one column below 700 px. |
| 2.1.1 Keyboard | AA | Two controls, both keyboard operable. |
| 2.4.1 Bypass blocks | AA | Skip link to the worksheet. |
| 2.4.7 Focus visible | AAA | 3 px maroon ring, 3 px offset. |
| 2.5.8 Target size | AA | Both buttons 44 px high. |
| 2.3.3 Animation | AAA | No animation. Reduced-motion rule present regardless. |

## 3. Color contrast audit

| Pair | Ratio | Result |
|---|---|---|
| Navy #0B1530 on card #FFFFFF | 18.04:1 | AAA |
| Navy #0B1530 on page #FAFAF9 | 17.27:1 | AAA |
| Secondary #414B5C on card #FFFFFF | 8.80:1 | AAA |
| White on navy #0B1530 button | 18.04:1 | AAA |
| Maroon #8B3A2E on card #FFFFFF | 7.66:1 | AAA |

Print view is black on white throughout.

## 4. Keyboard navigation flow verified

Skip link, Print this sheet, Back to Week 4. That is the full set of controls.

## 5. Screen reader testing

Automated verification: section landmarks, heading order, the labelled scaffold
figure, and the skip link. No errors.

An important limitation is stated plainly in section 6 rather than treated as solved.

## 6. Known limitations and remediation plan

1. This sheet asks students to draw. That task is not equally available to every
   student, and no markup fixes it. The sheet states on the page, before the
   first task, that typing the answers in the walkthrough worksheet and saving
   the PDF is an equally accepted route. The same statement belongs in the Canvas
   assignment description.
2. The blank drawing boxes are empty by design, so a screen reader user hears the
   task text and then nothing. The task text is written to fully describe what
   goes in the box for that reason.
3. Hand screen reader pass with NVDA and VoiceOver not yet performed.
4. Print output runs to nine physical pages. Part headings are numbered as Parts,
   not pages, so the numbering does not contradict the printed page count.

## 7. Reviewer

Dr. Sharilyn Rennie
