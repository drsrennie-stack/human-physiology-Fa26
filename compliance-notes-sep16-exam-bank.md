# Accessibility compliance notes

**Project:** BIO 005 practice exam, week map corrected
**Files covered:** bio005-exam-bank.js, practice-exam.html
**Date:** September 16, 2026

## 1. What changed

bio005-exam-bank.js is a data file with no markup. Its competency and question
records were re-tagged to the current week map. practice-exam.html gained a
small map that lets a catch up week draw on the weeks it is catching up on, and
the week row label now names those source weeks.

## 2. WCAG version and target level

WCAG 2.2. AA met, unchanged, with one criterion improved.

| Criterion | Level achieved | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | Unchanged. Each week is still a `label` wrapping its own `input type="checkbox"`, so the association is in the markup rather than in position |
| 2.4.6 Headings and labels | AAA, improved | A week row used to say "Week 3, Catch up on the cell, 20 competencies" when the exam it built came from Week 2's material. The label now says "25 competencies, from Week 2", which describes what the control actually does |
| 3.3.2 Labels or instructions | AA, improved | Selecting Week 3 or Week 8 would have produced an exam from an empty pool. Both now state their source weeks before the student commits to a selection |
| 1.4.3 / 1.4.6 Contrast | AAA | No color, size or weight touched. The added text sits inside the existing `.cnt` span and inherits its styling |
| 2.1.1 Keyboard | AA | No control added or removed. The fifteen week checkboxes are in the same order with the same tab sequence |
| 4.1.2 Name, role, value | AA | The accessible name of each checkbox is its label text, which is now longer and more accurate on the two catch up weeks. Nothing is conveyed by color or position alone |

## 3. Color contrast audit

No contrast pair changed. The longer label text renders in the same `.cnt`
color on the same background as the count it replaces.

## 4. Keyboard navigation flow verified

Unchanged. Fifteen checkboxes in week order, each reachable and operable, each
with a visible focus ring, followed by the existing exam length and blueprint
controls.

## 5. Screen reader testing

Re-checked on the setup view. Each week announces as a checkbox with its full
label, and the two catch up weeks announce their source weeks as part of that
label rather than as separate text a screen reader user could miss. No live
region was added, so nothing is announced without the student acting.

## 6. Known limitations and remediation

1. The label on Week 8 is long: "Midterm 1, 133 competencies, from Weeks 1, 2,
   4, 5, 6 and 7." That is a lot to hear before moving to the next checkbox. It
   is accurate and it only affects one row, so it stands, but a shorter form
   such as "from Weeks 1 to 7" would read faster if it ever covers a clean
   range.
2. The CATCHUP map is a manual statement of which weeks are catch up weeks. If
   a week's job changes in the course and the map is not updated, the practice
   exam will quietly go back to offering an empty pool. The map carries a
   comment saying so.
3. Screen reader coverage is VoiceOver only. NVDA on Windows has not been run.

## 7. Reviewer

Dr. Sharilyn Rennie
