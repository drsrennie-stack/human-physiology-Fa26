# Accessibility compliance notes

## 1. Project

**Study With Me calendar, and the site-wide button change**
BIO 005 Human Physiology, Yuba College, Fall 2026

Files covered:

- `study-with-me-calendar.html` (new, replaces the static list of the same name)
- `tools/site/kit.py` (the `.btn` and `.btn.sec` rules, which rebuild every kit page)
- `index.html`, `course.html`, `study-with-me.html`, `scholar-points.html`,
  `syllabus-fall2026.html`, `course-schedule.html`, `how-every-week-works.html`,
  `how-grading-works.html`, `access-pearson.html`, `ai-in-this-course.html`,
  `assignment-discussion-01-visionboard.html` (rebuilt with the new buttons)
- `week-01-foundations.html`, `pulmonary-function-lab.html` (own copy of the
  button CSS, patched by hand)
- `canvas-paste-sheet.html`, `course-tools.html` (rebuilt)

Date: September 16, 2026

## 2. WCAG version and level

WCAG 2.2. Level AA is the floor and is met throughout. AAA contrast (7:1 normal,
4.5:1 large) is met on every text pair on the calendar page except one, noted in
section 6.

| Criterion | Level | Result |
|---|---|---|
| 1.1.1 Non-text content | A | Pass. The mark and the arrows are `aria-hidden`, the page name carries the label. No `img` without `alt` (0 found). |
| 1.3.1 Info and relationships | A | Pass. One `h1`, `h2` on every dialog, `fieldset`-equivalent grouping via `role="radiogroup"` with `aria-labelledby`, real `label for=` on every control (0 unlabeled controls found). |
| 1.3.5 Identify input purpose | AA | Pass. `autocomplete="name"` and `autocomplete="email"` on the host and sign-up fields. |
| 1.4.3 Contrast (minimum) | AA | Pass. Lowest text pair on the page is 6.66:1. |
| 1.4.6 Contrast (enhanced) | AAA | Pass on every pair except the gold emphasis inside the dark note, 6.66:1. See section 6. |
| 1.4.11 Non-text contrast | AA | Pass. Button surfaces against the page: maroon-dark 9.74:1, navy 17.27:1. Day cells carry a shadow, and today carries a 2px terra cotta ring at 7.66:1. |
| 1.4.12 Text spacing | AA | Pass. No fixed heights on text containers, line-height 1.55 on body. |
| 2.1.1 Keyboard | A | Pass. Every control is a real `button`, `a`, `select` or `input`. Hidden form blocks are `disabled` as well as `hidden`, so nothing unreachable is focusable. |
| 2.1.2 No keyboard trap | A | Pass. Native `<dialog>` with `showModal`, Escape closes. |
| 2.4.1 Bypass blocks | A | Pass. Skip link present, first in the tab order. |
| 2.4.3 Focus order | A | Pass. DOM order matches reading order. |
| 2.4.6 Headings and labels | AA | Pass. |
| 2.4.7 Focus visible | AA | Pass. `:focus-visible{outline:3px solid var(--terra-cta);outline-offset:3px}`, 7.66:1 against white. |
| 2.4.11 Focus not obscured | AA | Pass. Nothing sticky on this page. |
| 2.5.8 Target size | AA | Pass. Buttons are min-height 46px, small buttons 40px with padding, day chips 44px+. |
| 3.2.2 On input | A | Pass. Changing the "hosting as" select changes a placeholder only, no context change. |
| 3.3.1 Error identification | A | Pass. Errors are text in `#hostErr`, in the dialog, not color alone. |
| 3.3.2 Labels or instructions | A | Pass. Every field carries a hint where the answer is not obvious. |
| 4.1.2 Name, role, value | A | Pass. `aria-pressed` on the view toggle, `aria-labelledby` on every dialog, `role="status"` with `aria-live="polite"` on the status line. |
| 4.1.3 Status messages | AA | Pass. Sign-up, cancel and load results announce through the `role="status"` line without moving focus. |

## 3. Color contrast audit

Measured, not estimated. Sign-up calendar page:

| Text | On | Ratio | Level |
|---|---|---|---|
| Body ink `#0B1530` | white `#FFFFFF` | 18.04:1 | AAA |
| Headline tail and eyebrow `#8B3A2E` | white | 7.66:1 | AAA |
| Links and muted emphasis `#6E2D24` | white | 10.18:1 | AAA |
| Secondary body text `#414B5C` | white | 8.80:1 | AAA |
| Cream `#F5F1E8` on the primary button `#6E2D24` | button | 9.03:1 | AAA |
| Cream on the primary button, hover `#5C2520` | button | 10.70:1 | AAA |
| Cream on the navy button `#0B1530` | button | 16.00:1 | AAA |
| Cream on the navy button, hover `#1A2A4E` | button | 12.54:1 | AAA |
| Active view toggle, white | navy `#0B1530` | 18.04:1 | AAA |
| "Dr. Rennie" legend chip, white | maroon `#8B3A2E` | 7.66:1 | AAA |
| "Student" legend chip `#0B1530` | white | 18.04:1 | AAA |
| Body text `#F5F7FB` in the dark note | `#12203F` | 15.01:1 | AAA |
| Gold emphasis `#C9A14A` in the dark note | `#12203F` | 6.66:1 | AA, see section 6 |

Non-text, for 1.4.11:

| Element | Against | Ratio |
|---|---|---|
| Primary button surface `#6E2D24` | page `#FAFAF9` | 9.74:1 |
| Secondary button surface `#0B1530` | page `#FAFAF9` | 17.27:1 |
| Today's ring `#8B3A2E` | white cell | 7.66:1 |
| Focus ring `#8B3A2E` | white | 7.66:1 |

The old outline button, white fill with a navy border on a near-white page, is
gone from every file. Grep for `.btn.sec{background:#fff` returns nothing.

## 4. Keyboard navigation flow verified

Tab order on the calendar page: skip link, course mark (home), host, join a live
room, Scholar Points, refresh, weekly/list toggle, previous/next/this week, then
each day's sessions in date order, then the footer links. Every dialog opens with
`showModal`, traps focus natively, closes on Escape and on its own Cancel button,
and returns focus to the control that opened it. The three form blocks that do
not apply to the chosen role are `hidden` **and** `disabled`, so a keyboard user
cannot tab into a field that will not be submitted.

## 5. Screen reader testing

VoiceOver on Safari, structural pass. Verified: one `h1`, the `main` landmark
reached from the skip link, every dialog announces its own `h2` on open, every
input announces its label and its hint, the view toggle announces pressed state,
and the status line reads sign-up and error results without stealing focus.
Badges on a session card read as words ("Instructor", "Full", "Live now"), never
as color alone.

## 6. Known limitations and remediation plan

1. **Gold emphasis inside the dark note is 6.66:1, AA but not AAA.** It is
   bold 15px, which clears the AAA large-text bar of 4.5:1, and nothing is
   carried by that color alone: the sentence reads the same without it. Left as
   is so the note keeps one accent. Revisit if the gold token moves.
2. **The calendar needs its own Apps Script URL before it does anything.** Until
   that is pasted into the `CONFIG` block, the page draws the week and says so in
   the status line. It must not be pointed at the anatomy deployment, or the two
   classes share one calendar.
3. **Sign-ups are not anonymous to other students.** First names appear on the
   card, which is the point, it is how a student decides whether to come. Emails
   are never posted. Only the door contact the host chooses is public, and a
   phone number is never required.
4. **Student names on session cards are session data from the sheet.** They are
   not stored in this repo, not committed, and not written to any file that
   persists across sessions.

## 7. Reviewer

Dr. Sharilyn Rennie

## 8. Revision, same day

Her note after seeing it: the dark blocks read as black. They did. `#060A18` is
RGB 6, 10, 24, which is navy in a swatch and black on a screen. Every dark
surface, the secondary buttons, the page footers, the website door on the
welcome page, moved to the real navy `#0B1530`, with `#1A2A4E` as the hover so
the state change is still visible. `#060A18` is kept only as ink on gold, where
looking like ink is the point. Cream on `#0B1530` is 16.0:1, still AAA.
