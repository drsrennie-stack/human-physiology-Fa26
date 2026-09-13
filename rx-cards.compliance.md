# Accessibility compliance notes: Rx Cards

Project: BIO 005 Human Physiology, Yuba College, Fall 2026
Files covered: rx-cards.html (new), how-this-course-works.html (rewritten onto the four stages), and the link sweep that points every recall card link at rx-cards.html (week-01 to week-15, door-study, course-materials, course-questions, course-schedule, lecture-week, sitemap, study-with-me, welcome, welcome-tour, bio005-nav.js, bio005-dock.js, os/bio005-dock.js, bio005-gate.js, bio005-faq.js, bio005-question-bank.js, tools/gen_week_pages_v3.py)
Date: September 13, 2026

## WCAG version and target

WCAG 2.2. Level AA is the floor on every criterion. AAA is met on contrast for all text (7:1 or better) and on focus appearance.

| Criterion | Level reached | How |
|---|---|---|
| 1.1.1 Non-text content | AA | The three-figure mark carries role="img" and a label. Option numbers and the graded marker symbol are aria-hidden because the accessible name carries the same information in words. |
| 1.3.1 Info and relationships | AA | One h1, h2 per section, landmarks (header, main, nav from bio005-nav.js, footer). Answer choices are a list of buttons. Rating buttons sit in a labelled group. |
| 1.3.2 Meaningful sequence | AA | DOM order is reading order on all three screens. |
| 1.4.1 Use of color | AA | Right and wrong are shown by color plus a numbered key, plus the text "Right." or "Not this one. The answer is N". The intro page marks graded stages with a symbol as well as color. |
| 1.4.3 / 1.4.6 Contrast | AAA | Measured below. Lowest text pair is 7.33:1. |
| 1.4.11 Non-text contrast | AA | Control borders (answer buttons, the week select, the new-cards segment) use #6F7787 on white, 4.5:1. Correct and incorrect outlines are 7.7:1. |
| 1.4.12 Text spacing, 1.4.10 Reflow | AA | Relative units, wrapping grids, single column at 560px. No horizontal scroll at 320px. |
| 2.1.1 Keyboard | AA | Whole flow is keyboard driven: 1 to 4 picks an answer, 1 to 4 rates, Escape stops. Every control is a real button, select, or link. |
| 2.1.2 No keyboard trap | AA | No modal. Escape ends the session and moves focus to the finish heading. |
| 2.4.1 Bypass blocks | AA | Skip link to main. |
| 2.4.3 Focus order | AA | Focus is moved to the first answer on each new card, to the rating buttons after an answer, to the finish heading at the end, and back to the Due now heading on return. |
| 2.4.7 / 2.4.11 Focus visible, not obscured | AAA | 3px maroon outline with 3px offset on every focusable element; sticky bars are short enough not to cover a focused control. |
| 2.5.8 Target size | AA | Every button is at least 46px tall. |
| 3.2.1 / 3.2.2 On focus, on input | AA | Changing the week select or the new-cards setting re-renders the counts only. Nothing navigates on focus. |
| 3.3.2 Labels | AA | The week select has a visible label with for/id; the segment has aria-labelledby; rating buttons name the interval each would give. |
| 4.1.2 Name, role, value | AA | Segment buttons use aria-pressed. Tabs on the intro page use role=tab with aria-selected and roving tabindex. |
| 4.1.3 Status messages | AA | The verdict block is aria-live="polite" so the result is announced without moving focus. |

## Color contrast audit

| Text | Foreground | Background | Ratio | Result |
|---|---|---|---|---|
| Body text | #0B1530 | #FAFAF9 | 17.27:1 | AAA |
| Text on white cards | #0B1530 | #FFFFFF | 18.04:1 | AAA |
| Headings, links, eyebrow | #8B3A2E | #FFFFFF | 7.66:1 | AAA |
| Headings on page background | #8B3A2E | #FAFAF9 | 7.33:1 | AAA |
| Secondary text | #414B5C | #FFFFFF | 8.80:1 | AAA |
| Secondary text on page | #414B5C | #FAFAF9 | 8.43:1 | AAA |
| Button text | #FFFFFF | #0B1530 | 18.04:1 | AAA |
| Button hover | #FFFFFF | #8B3A2E | 7.66:1 | AAA |
| Option key, verdict text | #0B1530 | #ECEFF4 | 15.65:1 | AAA |
| Text on correct tint | #0B1530 | #E6F1EA | 15.58:1 | AAA |
| Correct key | #FFFFFF | #1F5E3A | 7.72:1 | AAA |
| Text on incorrect tint | #0B1530 | #F6E9E6 | 15.22:1 | AAA |
| Incorrect key, Again button | #FFFFFF / #8B3A2E | #8B3A2E / #FFFFFF | 7.66:1 | AAA |
| Control borders (non-text) | #6F7787 | #FFFFFF | 4.50:1 | pass, 3:1 floor |

## Keyboard navigation flow verified

Skip link, brand mark, site nav, week select, four new-card buttons, Start reviewing. In the reviewer: answers 1 to 4, then ratings 1 to 4 (only Again is enabled after a miss), Stop for now. Finish screen: focus lands on the heading, then the three links and Back to Due now. Verified headless with tools/test_rx_cards.js (26 checks passing) and by hand in Chromium.

## Screen reader testing

Chromium accessibility tree inspected for every screen. Verified: landmarks present, the verdict is announced on answer, each answer button reads "Choice N: text", each rating button reads its name and the interval it would give, the live count line under Due now updates when settings change. VoiceOver spot check recommended on the live site.

## Known limitations and remediation plan

1. Progress is per browser. A student who switches devices starts a fresh schedule. Stated on the page; no server exists to sync against.
2. The brain dump cards (free recall prompts with a drawing checklist) are not in this build because their bank (cards/dumps) was never uploaded to the repo. The multiple choice bank is complete: 4980 cards, all 268 competencies, all three levels.
3. The old Mastery OS pages remain in the repo but nothing student-facing links to them. Delete when convenient; the GitHub web uploader cannot.

## Reviewer

Built and checked by Claude for Dr. Sharilyn Rennie, September 13, 2026.
