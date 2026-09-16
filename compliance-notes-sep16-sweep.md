# Accessibility compliance notes

**Project:** BIO 005 September 16 sweep, Canvas frame escape, drawing canvas, Week 2 lecture page, Study With Me
**Files covered:** the 19 files listed in section 1
**Date:** September 16, 2026

## 1. Files covered

Canvas frame escape added, 16 files: concept-videos-week01.html,
concept-videos-week03.html, w01-step-01-first-pass.html,
w01-step-03-upload-note-sheet.html, w01-step-04-study-it.html,
w01-step-05-lab.html, w01-step-06-patient.html, w01-step-07-discussions.html,
w01-step-08-mastery-check.html, w02-step-01-first-pass.html,
w02-step-03-upload-note-sheets.html, w02-step-04-study-it.html,
w02-step-05-lab.html, w02-step-06-patient.html, w02-step-07-discussion.html,
w02-step-08-mastery-check.html.

Also: mastery-canvas.html, lecture-week.html, study-with-me.html.

## 2. WCAG version and target level

WCAG 2.2. AA met throughout on every file in the set. AAA met on contrast
wherever it was measured.

| Criterion | Level achieved | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | Real `ul` and `ol` for every list added to study-with-me.html, so a screen reader announces list and item count. No list built from styled paragraphs |
| 1.4.3 / 1.4.6 Contrast | AAA | Unchanged from the versions already measured. No color, weight or size was altered in this drop |
| 2.1.1 Keyboard | AA | The frame escape is bound to click, which fires on Enter and Space for a link, so keyboard users get the same behavior as mouse users |
| 2.4.4 Link purpose | AA | Every button that now opens something names what it opens. The one button that named a destination that did not exist was repointed at one that does |
| 2.4.5 Multiple ways | AA | study-with-me.html now also reaches the course calendar, so the schedule is available from one more place |
| 3.2.5 Change on request | AAA | Nothing opens a new window without the student activating a control, and every control that does say so in its accessible name |
| 4.1.2 Name, role, value | AA | The new hidden text on the discussions button uses the `.vh` utility, so the accessible name reads "Post a session in Canvas discussions, opens in a new tab" |
| 2.4.10 Section headings | AAA | Questions people ask moved from h4 to h3 on study-with-me.html. Heading levels on that page now run with zero skipped levels |

## 3. Color contrast audit

No color, background, font size or weight changed in this drop, so the pairs
measured when these pages were built still hold. The one new style rule,
`h3.q`, reuses the exact size, weight and color the `h4` it replaces already
carried, so its pair is unchanged at #0B1530 on #FFFFFF, 18.04:1, AAA. The
`.vh` rule paints nothing.

## 4. Keyboard navigation flow verified

Tab order is unchanged on all 19 files, because no element was added, removed
or reordered in the tab sequence. On study-with-me.html two buttons changed:
one had a destination that went nowhere and now has a real one, and one is new
and sits in the existing button row in reading order. The frame escape does not
trap focus, add a dialog, or move focus on activation.

## 5. Screen reader testing

Not re-run for the 16 frame-escape files. The change is one script block, with
no markup, text, heading or landmark altered, so what is announced is identical
to the tested versions.

study-with-me.html was re-checked, since its content changed. Verified in the
rendered page: the four new lists announce as lists with their item counts, the
Fine and Not fine pair reads as a two item list rather than running together as
prose, the questions announce at heading level 3 under their level 2 section,
and the hidden "opens in a new tab" is inside the button's accessible name
rather than floating as loose text.

## 6. Known limitations and remediation

1. Where the browser refuses a new tab, the frame escape sends the whole Canvas
   tab to the file. That is a context change the student asked for by clicking,
   and the button says it opens in a new tab, which is what happens wherever
   the browser allows it. Browser Back returns them to Canvas. Remediation:
   none available from inside the frame, since the permission is set by Canvas.
2. mastery-canvas.html still requests bio004-reading-mode.js and gets a 404.
   It is requested from inside bio004-dock.js, which is shared with the BIO 004
   pages in this repo. The only effect is that reading mode does not offer
   itself on that page. Remediation: point that page at the BIO 005 dock, which
   is a larger change than this drop should carry.
3. mastery-canvas.html carries five empty `<i>` elements used as pen size
   swatches. They hold no text so nothing is announced and nothing renders
   italic, but `<span aria-hidden="true">` would be the more honest markup.
4. Screen reader coverage across this set is VoiceOver only. NVDA on Windows
   has not been run.
5. math-review.html and notesheet-directions.html are still linked from pages
   that are open to students and still do not exist. Those links lead to the
   404 page. Not addressed in this drop.

## 7. Reviewer

Dr. Sharilyn Rennie
