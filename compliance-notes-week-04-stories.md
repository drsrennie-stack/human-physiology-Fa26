# Accessibility compliance notes: Week 4 baseline stories and draw along sheets

## 1. Project, files, date

- Project: BIOL 005 Human Physiology, Week 4, the baseline story level that is taught before each full lecture
- Date: September 20, 2026
- Files covered, 18 new pages. Each of the six lectures has a story deck (-story-slides), a printable student sheet (-story-drawalong) and an instructor recording script (-story-transcript):
  - biol005-w04-membrane-potential-story (16 slides, 13 parts, Dr. Rennie's own sequence, starts from a balloon)
  - biol005-w04-neurons-glia-story (17 slides, 14 parts)
  - biol005-w04-action-potential-story (14 slides, 11 parts)
  - biol005-w04-ap-conduction-story (18 slides, 15 parts)
  - biol005-w04-synapse-story (16 slides, 13 parts)
  - biol005-w04-synaptic-integration-story (15 slides, 12 parts)
- Two existing pages edited again: lecture-week.html (the Week 4 manifest now lists each story and draw along sheet ahead of its full lecture) and week-04-notes.html (each lecture's line now starts with the story and the sheet, and one paragraph explains the two levels).
- The full lectures are covered by compliance-notes-week-04-lectures.md. This file does not replace it.
- Story decks are forks of the Week 3 compartments deck, draw along sheets are forks of the Week 3 notes page, scripts are forks of the Week 2 chemistry script with its periodic table widget removed. The deck engine, pen layer, lightbox and site chrome are unchanged.

## 2. WCAG version and level

WCAG 2.2. Level AA met on every criterion checked. AAA contrast met for body text.

| Criterion | Result |
|---|---|
| 1.1.1 Non-text content | Pass. Every drawing is inline SVG with role img, a title and a desc. The blank drawing and the finished drawing of each part have different descriptions, so a screen reader user hears what was added. |
| 1.3.1 Info and relationships | Pass. One h1 per page, slide titles h2, no skipped levels (checked by script on all 18 pages). |
| 1.4.1 Use of color | Pass. Ions differ by shape as well as color, the three kinds of door differ by shape, and every arrow in a finished drawing carries a text label. The pen color code in the scripts is a teaching aid and never the only cue. |
| 1.4.3 / 1.4.6 Contrast | Pass. Same palette and measured ratios as compliance-notes-week-04-lectures.md section 3. |
| 1.4.10 Reflow | Pass. Drawing and text stack in one column on narrow screens. |
| 2.1.1 Keyboard | Pass. Each part has one reveal button, reached in order. In present mode the arrow keys change slides and Escape exits. |
| 2.3.3 / reduced motion | Pass. No animation on these pages. Transitions are disabled under prefers-reduced-motion. |
| 2.4.1 Bypass blocks | Pass. Skip link to main. |
| 2.4.7 Focus visible | Pass. 3 px maroon outline. |
| 4.1.2 Name, role, value | Pass. Reveal buttons carry aria-expanded and aria-controls. No duplicate ids on any page (checked by script), including pages that show the same drawing blank and finished. |

## 3. Color contrast audit

Unchanged from the lectures file: navy on white 18.04, maroon on white 7.66, secondary gray on white 7.23, white on navy 18.04, white on maroon 7.66, gold-deep on white 4.87 (used only for calcium shapes and their bold labels).

## 4. Keyboard navigation verified

Skip link, deck toolbar, then one reveal per slide. Opening a reveal in present mode places the finished drawing exactly over the blank one, so the slide does not jump and pen marks stay lined up (checked at 1280, 1600 and 1920 wide). Draw along sheets have one control, Print this sheet.

## 5. Screen reader testing

Checked through the accessibility tree in headless Chromium on all 18 pages. Not yet tested with VoiceOver or NVDA by a person.

## 6. Known limitations and remediation plan

- Drawing along is a visual task. A student who cannot see the drawings gets the same content from each drawing's description, the question, the answer text and the story chain, all of which are text.
- The draw along sheets are meant for paper. Each part is kept on one page when printed. They have no fillable form fields, because the task is drawing; the two ruled lines under each drawing are for handwriting.
- The story chain for membrane potential has 21 links, so it is laid out in columns to stay readable on a slide. Each column reads top to bottom and the boxes are numbered.
- A person still needs to run VoiceOver over the pages.

## 7. Reviewer

Prepared by Claude for Dr. Sharilyn Rennie. Awaiting her review.
