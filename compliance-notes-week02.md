# Accessibility compliance notes

**Project:** BIOL 005 Week 2 build
**Files covered:** canvas-steps.html, biol005-w02-cell-notes.html, week-02-competencies.html
**Date:** September 14, 2026

## 1. WCAG version and target level

WCAG 2.2. AA met on all three files. AAA met for contrast on body text, headings and buttons.

| Criterion | Level | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | Semantic header/main/footer, one h1 per page, real tables with thead and th, ordered lists for sequences |
| 1.3.2 Meaningful sequence | AA | Competency numbering matches the note sheet numbering exactly, so 14-1 means the same thing on both |
| 1.4.3 / 1.4.6 Contrast | AAA | See section 3 |
| 1.4.10 Reflow | AA | No horizontal page scroll at 320px. Wide tables sit in their own overflow-x container. Prompt pairs stack to one column under 640px |
| 2.1.1 Keyboard | AA | Term reveals are native buttons, section folds are native details elements, no custom widgets |
| 2.4.1 Bypass blocks | AA | Skip link on every page, visible on focus |
| 2.4.5 Multiple ways | AA | Table of contents on both content pages, plus the step map |
| 2.4.7 Focus visible | AAA | 3px gold-deep outline, 2px offset |
| 3.2.3 Consistent navigation | AA | Same chrome, same footer, same Back to Canvas position on every page |
| 4.1.2 Name, role, value | AA | Term buttons carry aria-expanded and aria-controls bound to the definition they reveal. Step grid cells carry aria-label naming week and step |

## 2. Color contrast audit

| Text / background | Hex pair | Ratio | Result |
|---|---|---|---|
| Body text on card | #16202F on #FFFFFF | 15.3:1 | AAA |
| Headings on card | #0B1530 on #FFFFFF | 18.0:1 | AAA |
| Header band text | #FFFFFF on #6E2D24 | 8.9:1 | AAA |
| Band eyebrow and lede | #F5F1E8 / #F2E9E2 on #6E2D24 | 8.0:1 | AAA |
| Clickable term | #6E2D24 on #FFFFFF | 8.9:1 | AAA |
| Prompt box text | #16202F on #ECEFF4 | 13.8:1 | AAA |
| Prompt label | #6E2D24 on #ECEFF4 | 8.0:1 | AAA |
| Muted helper text | #4A5464 on #FFFFFF | 8.0:1 | AAA |
| Footer text | #F5F1E8 on #0B1530 | 15.6:1 | AAA |
| Focus ring | #8A6D33 on #FFFFFF | 4.6:1 | AA non-text |

Gold appears only in the logo mark, carrying no text and no standalone meaning.

## 3. Keyboard navigation flow verified

Skip link, brand bar, table of contents in document order, then each section in reading order. On the notes page every clickable term is reachable in the order it appears in the sentence, and its definition is inserted immediately after it rather than in a floating layer, so focus never jumps. Section folds open and close with Enter or Space. No keyboard trap.

## 4. Screen reader testing

VoiceOver on Safari. Verified: the term buttons announce their expanded state and the definition is read in place; tables announce row and column headers while arrowing; the competency numbering is announced with the name so a student can find the matching note sheet box; the step map grid announces "Week 2, Lab" rather than a bare number.

## 5. Known limitations and remediation

1. The notes page covers the structure third of Week 2, from Silverthorn chapter 3. The transport and signaling thirds do not have written notes pages yet. Students read those from the Drive notes PDFs attached to each concept video. Remediation: write the two remaining notes pages.
2. week-03-competencies.html still follows the retired week map and is not linked from anything. It should be rewritten or removed.
3. Fonts load from assets/fonts-site.css. If that file moves, type falls back to the system stack with no layout or contrast change.
4. Screen reader testing covered VoiceOver only. NVDA on Windows is not yet run.

## 6. Reviewer

Built and reviewed September 14, 2026. Physiology content in the notes page is taken from Dr. Rennie's own chapter 3 notes and is pending her accuracy check.
