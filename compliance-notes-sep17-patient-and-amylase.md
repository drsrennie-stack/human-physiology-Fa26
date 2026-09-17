# Accessibility compliance notes

**Project:** BIO 005 patient explainer, patient pages, amylase lab wording
**Files covered:** patient-how-this-works.html (new), w01-step-06-patient.html, w02-step-06-patient.html, w01-07-patient.html, w02-06-patient.html, w02-07-patient.html, _canvas/pages/w01-07-patient.html, _canvas/pages/w02-06-patient.html, _canvas/pages/w02-07-patient.html, w02-step-05-lab.html, enzyme-amylase-lab.html
**Date:** September 17, 2026

## 1. What changed

One new page built on the existing step page template, two new buttons added to
the eight patient pages, one dead button removed, and wording corrections on the
two amylase lab pages.

## 2. WCAG version and target level

WCAG 2.2. AA met throughout. AAA met on contrast and on section headings.

| Criterion | Level achieved | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | The new page is `header`, `main`, `footer` with `section` per topic. The six part loop is a real `ol`, so a screen reader announces it as six steps in order rather than as six sentences |
| 1.4.3 / 1.4.6 Contrast | AAA | Inherited unchanged from the step page template: navy #0B1530 on white at 18.04:1, white on terra #8B3A2E at 7.66:1, muted #4A5265 on white at 7.82:1 |
| 1.4.10 Reflow | AA | No horizontal scroll at 320px. The numbered lists use the template's single column variant |
| 2.1.1 Keyboard | AA | Every control is a native link. No custom widgets, no dialogs |
| 2.4.1 Bypass blocks | AA | Skip link to `#main`, visible on focus |
| 2.4.4 Link purpose | AA | Each of the four buttons names its destination, with "opens in a new tab" in the accessible name |
| 2.4.6 Headings and labels | AAA | Section headings state the question being answered, including the one students actually ask, "What draw this week's control loop by hand actually means" |
| 2.4.10 Section headings | AAA | Heading levels run h1, h2, h3 with zero skipped levels on all nine rendered pages |
| 3.1.5 Reading level | AA, improved | The instruction being explained assumed the phrase "control loop" was already understood. It is now defined on the page that asks for it, with a worked example in everyday language |
| 3.3.2 Labels or instructions | AA, improved | The weekly upload instruction contradicted the assignment and pointed at a disabled Canvas page. It is replaced with what is actually required, and the page says outright that the disabled page was the site's error and not the student's |
| 4.1.2 Name, role, value | AA | Decorative SVG carries `aria-hidden="true"`, so button names are their text alone |

## 3. Color contrast audit

No new colour was introduced. Every pair on the new page comes from the step
page template and was measured when that template shipped.

| Text / background | Hex pair | Ratio | Result |
|---|---|---|---|
| Body text on card | #0B1530 on #FFFFFF | 18.04:1 | AAA |
| h1 on the hero band | #FFFFFF on #8B3A2E | 7.66:1 | AAA |
| Lede text on card | #4A5265 on #FFFFFF | 7.82:1 | AAA |
| Primary button label | #FFFFFF on #8B3A2E | 7.66:1 | AAA |
| Secondary button label | #0B1530 on #FFFFFF | 18.04:1 | AAA |
| Step number on its circle | #FFFFFF on #8B3A2E | 7.66:1 | AAA |

## 4. Keyboard navigation flow verified

New page: skip link, back to Canvas modules, then the four buttons in reading
order. Every stop shows a visible focus ring, no trap, nothing mouse-only. On
the eight patient pages the button count went from three to four in the same
row, so the tab order gains one stop in reading order and changes nowhere else.

## 5. Screen reader testing

Checked on the new page in the rendered output. The six part loop announces as
an ordered list of six items, the lead phrase of each step is emphasised with
`b` rather than by colour alone, and the quick answers announce at heading level
3 under their level 2 section. The four buttons announce with their destination
and their new tab warning inside the accessible name.

## 6. Known limitations and remediation

1. The page is long, roughly 4,600px in the Canvas frame. That is deliberate,
   since it replaces several half answers, but a student on a phone does a lot
   of scrolling. If it proves unwieldy, the control loop section is the piece
   that could stand alone.
2. Canvas strips scripts from a pasted page, so the iframe height is fixed at
   4,600px rather than sent by the page. The height was measured from the
   rendered page and the fallback link sits under the frame.
3. The control loop explanation uses one worked example, thermoregulation. A
   student whose entry point is radiology may want a second example closer to
   their desk. Worth adding one per entry point if the question keeps coming.
4. Screen reader coverage is VoiceOver only. NVDA on Windows has not been run.

## 7. Reviewer

Dr. Sharilyn Rennie
