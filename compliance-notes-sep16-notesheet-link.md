# Accessibility compliance notes

**Project:** BIO 005 Week 2 and Week 3 note sheet upload link
**Files covered:** w02-step-03-upload-note-sheets.html, w02-03-upload-note-sheets.html, w02-04-upload-note-sheet.html, week-02.html, week2-learn-block.html, _canvas/pages/w02-03-upload-note-sheets.html, _canvas/pages/w02-04-upload-note-sheet.html
**Date:** September 16, 2026

## 1. What changed

One `href` per file. The Week 2 and Week 3 note sheet upload button pointed at
the Canvas assignments index and now points at the assignment itself,
`assignments/1241524`. No markup, text, heading, landmark, color or style was
altered in any of the seven files.

## 2. WCAG version and target level

WCAG 2.2. AA met, unchanged from the versions already in service, with one
criterion improved.

| Criterion | Level achieved | How |
|---|---|---|
| 2.4.4 Link purpose in context | AA, improved | The button says "Upload your Week 2 note sheets" and now actually opens that assignment. Before, its accessible name promised a destination the link did not deliver, which is the failure this criterion describes |
| 3.2.4 Consistent identification | AA, improved | The Week 1 upload button already pointed at its own assignment. Weeks 2 and 3 now behave the same way, so the same control does the same thing in every week |
| 1.4.3 / 1.4.6 Contrast | AAA | No color, size or weight touched |
| 2.1.1 Keyboard | AA | Still a native link, reachable and operable by keyboard |
| 4.1.2 Name, role, value | AA | Accessible name unchanged, including the hidden "opens in a new tab" |

## 3. Color contrast audit

No contrast pair changed. The pairs measured when these pages were built still
hold.

## 4. Keyboard navigation flow verified

Unchanged. No element was added, removed or reordered, so the tab sequence on
all seven files is identical to the versions already in service.

## 5. Screen reader testing

Not re-run. The announced content is byte for byte identical apart from the URL
behind one link, which a screen reader does not read aloud. What changes is
where the student lands after activating it.

## 6. Known limitations and remediation

1. Other buttons on the Week 1 and Week 2 step pages still point at the bare
   Canvas assignments index: the lab submission, the patient chart entry and
   the mastery check report. They are the same 2.4.4 problem this change fixes,
   and they stay that way until their assignment IDs are supplied. Listed by
   file in PUSH-THESE-sep16-notesheet-link.txt.
2. week-02.html is gated until Wednesday September 16 at 8:00 PM Pacific, so
   the changed tile is reachable before then only with `?preview=1`. That is
   the gate working as designed, not a limitation of this change.
3. Screen reader coverage on this set is VoiceOver only. NVDA on Windows has
   not been run.

## 7. Reviewer

Dr. Sharilyn Rennie
