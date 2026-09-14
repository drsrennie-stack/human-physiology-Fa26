# Accessibility compliance notes: BIO 005 Canvas weekly pages

## 1. Project, files, date

BIO 005 Human Physiology, Yuba College, Fall 2026. Canvas native pages built for the
Physiology Canvas Build.

Files covered: twenty two Canvas pages. `how-every-week-works.html`, `how-grading-works.html`, plus a week
overview and nine step pages each for Week 1 (`w01-00` to `w01-09`) and Week 2
(`w02-00` to `w02-09`). One page carries one step, so a student meets one job at a
time. Also covered, because the pages send students there and they were edited in the
same drop: `assignment-notesheet.html`, `week-02.html`, `week-03.html`,
`lecture-week.html`, `week-print-pack.html`, `bio005-discussions.js`.

Date: September 14, 2026.

## 2. WCAG version and level

Target: WCAG 2.2 AA as the floor, AAA where the Canvas editor allows it.

| Criterion | Level reached | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | Real headings (the Canvas page title is the h1, h2 for sections on the overview, h3 for the due list), real lists for the due list, the step list and the done list, no layout tables. A step page has no heading under the title because it carries one thing. |
| 1.3.2 Meaningful sequence | AA | The DOM order is the reading order is the working order. On a step page: what it is, when and how long, what to do, the buttons, what comes next. |
| 1.4.1 Use of colour | AA | The stage chip names its stage in words ("APPLY"), the step number is written as text beside it and in the page title, graded items say "Graded." in words, due dates are written out. The four stage colours repeat information that is already in the text, so a student who cannot see colour loses nothing. |
| 1.4.3 / 1.4.6 Contrast | AAA | See section 3. Every text pair is above 7:1. |
| 1.4.4 Resize text | AA | Font sizes are em based; no fixed pixel heights on text containers. |
| 1.4.10 Reflow | AA | Single column, no min-width, buttons wrap. Checked at 400 px in Chromium. |
| 1.4.12 Text spacing | AA | Line height 1.6 on body text, no overflow hidden on text. |
| 2.1.1 Keyboard | AA | Every interactive element is a native link. Nothing needs a mouse. |
| 2.4.4 Link purpose | AAA | Every button says what it opens ("Open the Week 2 print pack"), never "click here". Links that leave Canvas carry a `screenreader-only` "(opens in a new tab)". |
| 2.4.6 Headings and labels | AA | The Canvas page title names the week, the step number and the job, so the module list reads as a numbered checklist and a bookmarked page still says where it sits. |
| 2.4.7 Focus visible | AA | Canvas's own focus ring is inherited; no outline was removed. |
| 2.5.5 / 2.5.8 Target size | AAA | Buttons are at least 46 px tall with 8 px gaps. |
| 3.1.5 Reading level | AAA where practical | Short sentences, one idea each, no undefined jargon. |
| 3.2.3 / 3.2.4 Consistent navigation and identification | AA | Both weeks have identical structure, identical step order, identical button styling and wording for repeated actions. Every step page ends with the same two things: what the next step is, and the same one-line help. |
| 2.4.8 Location | AAA | Every step page carries "Week N, Step M of 9" above the content, and names the next step by number and title at the foot. |
| 3.2.5 Change on request | AAA | Nothing moves, opens or refreshes on its own. Every navigation is a link or Canvas's own Next button. |
| 3.2.5 New windows | AAA | A link only opens a new tab when it leaves Canvas for the course website. Every page that has one says so in visible text under the buttons and tells the reader that closing the tab returns them here, and the link itself carries a screen reader "(opens in a new tab)". Links that stay inside Canvas open in place, so Back and the breadcrumb work. |
| 3.3.2 Labels or instructions | AA | The Start Here box on the week overview says how the module works before the first step, and each step page states its own job and time before asking for anything. |

Not applicable: no images (nothing needs alt text), no forms, no media, no motion.

## 3. Colour contrast audit

Measured with the WCAG relative luminance formula.

| Text | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| Navy `#0B1530` body text | White `#FFFFFF` | 18.04:1 | pass | pass |
| Maroon dark `#6E2D24` eyebrow and step timing | White | 10.18:1 | pass | pass |
| Muted grey `#4F576A` supporting text | White | 7.23:1 | pass | pass |
| White button text | Maroon `#8B3A2E` | 7.66:1 | pass | pass |
| Navy text in the due box | Navy tint `#ECEFF4` | 15.65:1 | pass | pass |
| LEARN chip, white text | Maroon `#8B3A2E` | 7.66:1 | pass | pass |
| PRACTICE chip, white text | Navy `#0B1530` | 18.04:1 | pass | pass |
| APPLY chip, navy text | Gold `#C9A14A` | 7.46:1 | pass | pass |
| CHECK chip, navy text on white with a navy border | White | 18.04:1 | pass | pass |
| Navy text on secondary buttons | White | 18.04:1 | pass | pass |

The 1 px card border `#D9DDE3` is decorative and carries no meaning, so it is
outside 1.4.11.

## 4. Keyboard navigation

Verified in Chromium on the rendered previews. A step page has between one and five
tab stops, all of them links, in the order a sighted reader meets them: the step
buttons left to right, then the Virtual Office link in the help line. No focus traps,
no skipped elements, nothing that needs Enter and Space to behave differently. Canvas
adds its own skip link, page landmarks and Next button around the content. Splitting
the week into one page per step cut the longest page from about forty tab stops to
six, which is the main keyboard win of this structure.

## 5. Screen reader testing

Checked with the accessibility tree in Chromium and by reading the pages with the
NVDA speech viewer pattern in mind (heading list, links list, reading order):

- On a step page the h1 is the Canvas page title, which says the week, the step number
  and the job, and there are no competing headings under it. A screen reader user hears
  where they are in one sentence.
- The overview page reads as an outline of the week: Start here; The week in four
  stages, with one card per stage naming its steps; You are done with Week 2 when. The
  step list uses the same wording as the module rows, so what is heard on the overview
  matches what is heard in the module.
- The stage chip is plain text inside a span, so it is announced as the word "Apply"
  ahead of the week and step, not skipped as decoration.
- Links list is usable on its own because every link name is specific.
- Off-Canvas links announce "(opens in a new tab)".
- The due list is a real list, so the reader announces "list, 5 items".
- No content is hidden from assistive technology that a sighted user can see, and
  nothing is announced that a sighted user cannot see except the new-tab note.

A live test with VoiceOver in Safari inside Canvas is still to be done by the
reviewer; the Canvas chrome around the page is Instructure's, not ours.

## 6. Known limitations and remediation

- The Canvas editor strips `<style>` blocks, so hover and focus styling for the maroon
  buttons is Canvas's default rather than the site's. Focus remains visible.
- Canvas's own Button class turns the buttons blue on hover in some themes. Inline
  background colour wins at rest, so the resting state is always maroon.
- The step number lives in plain text beside the stage chip and in the page title, so it
  survives Canvas themes and high contrast mode unchanged. The chip carries a 2 px border
  in its own colour, so it stays visible as a shape when a forced-colours mode drops the
  background fill.
- Seven buttons point at the Canvas Assignments or Discussions index until the
  matching assignment exists (listed in PASTE-GUIDE.md). They always land somewhere
  useful, but each should be swapped for the direct link when the assignment is made.
- Week 3 and later on the course site are still date gated and held; the Week 2
  buttons open on Monday September 14 at 8:00 am Pacific, when the gate lifts.
- Reference documents were moved into Canvas on September 14 because a new tab has no
  Back history and students were getting stranded on the course website. How grading works
  is now a Canvas page and the syllabus button points at the Canvas Syllabus tab. The
  remaining off-site buttons are interactive tools, which do belong on the site.
- Week 1 Discussion 2 asks about the Mastery Check, which sits one step later in the
  Check stage. The Step 8 page tells students to take it first and come back. That is a
  wording fix, not a structural one; if it confuses anyone, the fallback is to move
  Discussion 2 to its own page after Step 9.
- Week 1 Step 8 is the longest page in the set, because both discussions now carry their
  full instructions rather than linking out to the course website. It is structured to
  survive that length: two h3 headings inside the card, each preceded by a rule, each
  followed by the submit button for that discussion, so the page has a clear two part
  shape in the heading outline and by eye. Screen reader navigation by heading lands on
  the right discussion, and the submit button for each is the last thing in its section.
  A student who only wants to post can use the heading list rather than scroll.
- Reading level is plain, but the physiology vocabulary in Step 7 of Week 2 (receptor
  enzyme, insulin to glucagon ratio) assumes the student has done Steps 1 to 3. That is
  by design.
- The "use the Next button" line at the foot of each step page is only true if the
  pages sit in the module in the order given in PASTE-GUIDE.md.
- The note sheet became a PDF in Canvas Files on September 14, for the same stranding
  reason. The PDFs are rendered from note-sheet.html by make_note_sheet_pdfs.js, are not
  tagged, and are not the accessible version of anything: most of each page is an empty
  drawing box, which is a print affordance and has no screen reader equivalent.
  note-sheet.html remains on the course site as the conforming alternate version under
  WCAG 2.2 Conformance Requirement 1. It carries the same competencies, the same A and B
  prompts and the same instructions as real text in reading order, with a proper heading
  per competency. A student using a reader, or one who cannot print, should be sent
  there. The Step 1 page names the print pack, which reaches it.
  Remediation plan: if a student needs a tagged PDF, produce that week's sheet from the
  HTML through a tagging tool rather than from the browser print path. Not needed until
  a student asks, and the HTML covers the need in the meantime.
- Both PDFs carry a document title and a language, and are set to display the title
  rather than the file name in a PDF reader's window chrome (PDF/UA 7.1, and WCAG 2.2
  3.1.1 Language of Page as far as an untagged PDF can meet it).
- Step 4 of both weeks now has no off-site button at all. The photographing instructions
  were moved out of assignment-notesheet.html and into the Canvas page as a real list,
  so the whole upload step happens without leaving Canvas.

## 7. Reviewer

Built and checked by Claude for Dr. Sharilyn Rennie, September 13, 2026. Final
in-Canvas review with a screen reader: Dr. Sharilyn Rennie.
