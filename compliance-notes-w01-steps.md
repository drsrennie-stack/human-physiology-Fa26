# Accessibility compliance notes: BIO 005 Week 1 standalone step pages

## 1. Project, files, date

BIO 005 Human Physiology, Yuba College, Fall 2026. Standalone HTML pages built to be
embedded as iframes in the Week 1 Canvas module, one page per step.

Files covered, eight pages:

| File | Step | Stage |
|---|---|---|
| `w01-step-01-print-your-week.html` | 1 | Learn |
| `w01-step-02-first-pass.html` | 2 | Learn |
| `w01-step-04-upload-note-sheet.html` | 4 | Learn |
| `w01-step-05-study-it.html` | 5 | Practice |
| `w01-step-06-lab.html` | 6 | Apply |
| `w01-step-07-patient.html` | 7 | Apply |
| `w01-step-08-discussions.html` | 8 | Apply |
| `w01-step-09-mastery-check.html` | 9 | Check |

Step 3 is `concept-videos-week01.html`, covered by its own record.

Also produced in this drop and covered here only as linked targets, not as
conforming content: `print/BIO005-Week1-Packet.pdf` and
`print/BIO005-Week1-Competency-List.pdf`.

Date: September 14, 2026.

## 2. WCAG version and level

Target: WCAG 2.2 AA as the floor, AAA where achievable.

| Criterion | Level reached | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | One h1 per page (the step title), h2 per card, h3 for subsections inside a card. Real `ol` for every sequence, real `ul` for every unordered set. No layout tables. |
| 1.3.2 Meaningful sequence | AA | DOM order is reading order is working order: what it is, how long it takes, the exit, the lead, the cards in the order they are done, then what comes next. |
| 1.4.1 Use of colour | AA | The stage is spelled out in the eyebrow ("STEP 1 OF 9 · LEARN"). Graded items say "Graded." in words. Due dates are written out. Nothing is carried by colour alone. |
| 1.4.3 / 1.4.6 Contrast | AAA | See section 3. Every pair is above 7:1. |
| 1.4.4 Resize text | AA | No fixed heights on text containers; cards grow with their content. |
| 1.4.10 Reflow | AA | Checked at 400px in Chromium on all eight pages: no horizontal scroll, buttons wrap, the numbered grid collapses to one column. |
| 1.4.12 Text spacing | AA | Line height 1.55 to 1.62 on body text, no `overflow:hidden` on text. |
| 2.1.1 Keyboard | AA | Every interactive element is a native link. Nothing needs a mouse. |
| 2.4.1 Bypass blocks | A | A skip link to `#main` is the first focusable element on every page. |
| 2.4.2 Page titled | A | Each title names the course, the week, the step number and the job. |
| 2.4.4 / 2.4.9 Link purpose | AAA | Every link names its destination ("Upload your Week 1 note sheet", "Open the Reference Range Lab"). No "click here". Links leaving the page carry a visually hidden "(opens in a new tab)". |
| 2.4.6 Headings and labels | AA | Headings describe the work, not the format. |
| 2.4.7 Focus visible | AA | The site focus ring is inherited from the shared tokens; no outline is removed. |
| 2.4.8 Location | AAA | The eyebrow gives "Week 1, Step N of 9" on every page, and the foot names the next step. |
| 2.5.5 / 2.5.8 Target size | AAA | Every button and chip is at least 44px tall with 9px gaps. The masthead chip was raised from 38px to 44px in this drop, on these pages and on both concept video pages. |
| 3.1.5 Reading level | AAA where practical | Short sentences, one idea each. Physiology vocabulary is only used where the step is about that physiology. |
| 3.2.3 / 3.2.4 Consistent navigation and identification | AA | All eight pages share one masthead, one exit button in one position, one card style, one button style, and the same closing "when this is done" line. |
| 3.2.5 Change on request | AAA | Nothing moves, opens or refreshes on its own. |
| 3.2.5 New windows | AAA | A link opens a new tab only when it leaves for a PDF, Canvas, or a course site tool, and says so in the accessible name. |
| 3.3.2 Labels or instructions | AA | Each page states its job and its time before asking for anything. |

Not applicable: no images (the brandbar mark is a labelled decorative SVG), no forms,
no media embedded on these pages, no motion.

## 3. Colour contrast audit

Measured with the WCAG relative luminance formula. Tokens are the shared site set.

| Text | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| Navy `#0B1530` body text | White `#FFFFFF` | 18.04:1 | pass | pass |
| Navy body text | Off-white `#FAFAF9` | 17.45:1 | pass | pass |
| Muted `#4A5265` lede text | White | 8.31:1 | pass | pass |
| Terra dark `#6E2D24` bold emphasis | White | 10.18:1 | pass | pass |
| White masthead text | Terra `#8B3A2E` | 7.66:1 | pass | pass |
| White numeral | Terra `#8B3A2E` step circle | 7.66:1 | pass | pass |
| White button text | Terra `#8B3A2E` | 7.66:1 | pass | pass |
| Navy secondary button text | White, navy border | 18.04:1 | pass | pass |
| Navy text in the graded strip | Navy tint `#ECEFF4` | 15.65:1 | pass | pass |
| Navy text on the back chip | Gold `#C9A14A` | 7.46:1 | pass | pass |

The card shadow and the 2px button borders repeat information already in the text,
so they fall outside 1.4.11.

## 4. Keyboard navigation

Verified in Chromium on all eight rendered pages. Tab order on a step page: skip
link, Back to Canvas modules, then the buttons in each card in visual order. Between
three and eight tab stops per page, all native links. No focus traps, no tabindex
above zero, nothing that needs Enter and Space to behave differently. Canvas supplies
its own skip link, landmarks and Next button around the iframe.

## 5. Screen reader testing

Checked with the Chromium accessibility tree, reading each page by heading list,
link list and reading order:

- The h1 says the week, and the eyebrow immediately above it says the step number out
  of nine and the stage, so a reader knows where they are in one pass.
- Step 8 is the longest page. Its heading outline is two h2 discussions, each with
  four h3 subsections, and each ends with its own submit button, so heading navigation
  lands on the right discussion and the submit for it is the last thing in that section.
- The link list is usable alone; every link name is specific and unique on its page.
- Every off-page link announces "(opens in a new tab)".
- Numbered lists announce as lists with their item counts. The step numerals are CSS
  counters and decorative, and the DOM order carries the sequence.
- The skip link is the first focusable element and reveals itself on focus.

A live test with VoiceOver in Safari inside Canvas is still to be done by the reviewer.
The Canvas chrome around the frame is Instructure's, not ours.

## 6. Known limitations and remediation

- Canvas strips `<script>` from a pasted page, so the Canvas iframe carries a fixed
  height and the page's own height sender has no listener there. A student scrolls
  inside the frame. The sender stays in the file for the course site and Kajabi, where
  a listener exists.
- Each page is published with a plain-link fallback under the iframe in Canvas, because
  some school-managed devices block third-party iframes outright.
- Step 7's "Turn in your chart entry" button points at the Canvas Assignments index
  because the Week 1 chart entry assignment does not exist yet. It lands somewhere
  useful but should be swapped for the direct link when the assignment is created.
- Five links on Step 5, and one each on Steps 1, 6, 7 and 9, go to interactive tools on
  the course website. Those tools have no PDF equivalent, so this is deliberate. They
  are the only non-PDF, non-Canvas destinations in the set.
- The two PDFs produced in this drop are rendered from HTML by headless Chromium and
  are not tagged. They carry a document title and a language and display the title
  rather than the file name. They are not the accessible version of anything: the
  competency list is mostly empty checkboxes, which is a print affordance with no
  screen reader equivalent. A student using a reader should be sent to the competency
  list on the course site, which carries the same twelve competencies and their can-do
  statements as real text in reading order. Remediation: if a student asks for a tagged
  PDF, produce it through a tagging tool rather than the browser print path.
- The PDF header and footer render in a fallback face. Chromium does not apply a page's
  `@font-face` to header and footer templates. This matches the Week 2 packet rather
  than regressing from it.
- The "go to Step N" line at the foot of each page is only true if the pages sit in the
  Canvas module in the order given.

## 7. Reviewer

Built and checked by Claude for Dr. Sharilyn Rennie, September 14, 2026. Final
in-Canvas review with a screen reader: Dr. Sharilyn Rennie.
