# Accessibility compliance notes: Week 4 lectures, Membrane potential, neurons and synapses

## 1. Project, files, date

- Project: BIOL 005 Human Physiology, Week 4, six lecture pieces
- Date: September 20, 2026. This file replaces the single-piece notes written September 19 for the resting membrane potential lecture, which were never uploaded.
- Files covered, 18 new pages. Each piece has a deck (-slides), student notes (-notes) and an instructor recording script (-transcript):
  - biol005-w04-membrane-potential (26 slides, 11 figures, model: ions crossing a membrane)
  - biol005-w04-neurons-glia (23 slides, 9 figures, model: axonal transport)
  - biol005-w04-action-potential (23 slides, 14 figure drawings, model: fire an action potential)
  - biol005-w04-ap-conduction (22 slides, 11 figures, model: race two axons)
  - biol005-w04-synapse (20 slides, 10 figures, model: run one synapse)
  - biol005-w04-synaptic-integration (23 slides, 11 figures, model: will it fire)
- Two existing pages edited: lecture-week.html (a Week 4 entry added to the manifest, nothing else changed) and week-04-notes.html (the placeholder text inside main replaced with links to the six lectures, page chrome unchanged).
- Decks and notes are forks of the Week 3 compartments deck and notes. Scripts are forks of the Week 2 chemistry script with its periodic table widget removed. The deck engine, pen layer, lightbox, print styles and site chrome are unchanged.

## 2. WCAG version and level

WCAG 2.2. Level AA met on every criterion checked. AAA contrast met for body text, with the exceptions in section 6.

| Criterion | Result |
|---|---|
| 1.1.1 Non-text content | Pass. Every figure is inline SVG with role img, a title and a full desc. Each model canvas has role img and a label, and everything it shows is also given as HTML text: numeric readouts plus a sentence describing the current state. |
| 1.3.1 Info and relationships | Pass. One h1 per page, slide titles h2, headings inside slides h3, no skipped levels (checked by script on all 18 pages). Tables have captions and th scope. |
| 1.4.1 Use of color | Pass. Ions and molecules differ by shape as well as color in every figure and model: potassium circle, sodium square, trapped anions dashed triangle, calcium diamond, chloride ring, neurotransmitter small dot. |
| 1.4.3 / 1.4.6 Contrast | Pass AA everywhere, AAA for body text. See section 3. |
| 1.4.10 Reflow | Pass. Two column and figure layouts collapse to one column on narrow screens. |
| 2.1.1 Keyboard | Pass. See section 4. |
| 2.2.2 Pause, stop, hide | Pass. Every model has a Pause button, stops when scrolled out of view or when the tab is hidden, and starts paused when the device asks for reduced motion. While paused, each control still shows its end result as a still frame. |
| 2.3.3 Animation from interactions | Pass. Transitions are disabled under prefers-reduced-motion. |
| 2.4.1 Bypass blocks | Pass. Skip link to main. |
| 2.4.7 Focus visible | Pass. 3 px maroon outline on every interactive element. |
| 3.3.2 Labels | Pass. Every slider has a visible label and a linked output. No unlabeled inputs (checked by script). |
| 4.1.2 Name, role, value | Pass. Reveal and clinical buttons carry aria-expanded and aria-controls. Sorter, step, scenario and toggle buttons carry aria-pressed. Sort counters, deck status and each model's status line are aria-live polite. No duplicate ids (checked by script). |

## 3. Color contrast audit (measured)

| Text / background | Ratio | Result |
|---|---|---|
| Navy #0B1530 on white | 18.04 | AAA |
| Navy on off-white #FAFAF9 | 17.27 | AAA |
| Navy on navy-tint #ECEFF4 | 15.65 | AAA |
| Maroon #8B3A2E on white | 7.66 | AAA |
| Maroon on off-white | 7.33 | AAA |
| Secondary #4F576A on white | 7.23 | AAA |
| Secondary #4F576A on off-white (equation card key lines) | 6.92 | AA, just under AAA |
| White on navy (meters, navy cards) | 18.04 | AAA |
| Bone #F5F1E8 on navy | 16.00 | AAA |
| Gold #C9A14A on navy | 7.46 | AAA |
| White on maroon (buttons, pills) | 7.66 | AAA |
| Gold-deep #8A6D33 on white (calcium labels, bold, 16 px and larger) | 4.87 | AA |

## 4. Keyboard navigation verified

Skip link, deck toolbar (Present, Reset boxes, Print), then each slide in order: sorter buttons, reveal buttons, clinical bars, figures (Enter opens the enlarged view, Escape closes and returns focus). In present mode the arrow keys and Page Up / Page Down change slides and Escape exits. W opens the pen layer. Each model is reached in order: scenario or step buttons, Pause, toggles, then sliders. Arrow keys on a focused slider change the slider and do not change the slide (tested in every deck).

## 5. Screen reader testing

Checked through the accessibility tree in headless Chromium on all 18 pages: landmarks, heading outline, figure names and descriptions, table captions and header associations, button states, live regions. Not yet tested with VoiceOver or NVDA by a person.

## 6. Known limitations and remediation plan

- Equation card key lines are 6.92:1, AA but 0.08 short of AAA. Inherited from the shared deck stylesheet. Fix by changing .eq .k to navy when the decks are next touched as a set.
- Gold-deep calcium labels are 4.87:1, AA. Calcium is also marked by its diamond shape and a text label, so color is never the only cue.
- Equations are written in HTML with sub and sup, not MathML. The "What it says" line under each equation gives the meaning in words.
- Each model's canvas is a picture of moving shapes. A screen reader user gets the numbers and the description, not the motion itself.
- In present mode the pen layer covers a model's buttons, so the pen has to be closed (W) before clicking them. Each script says so.
- At 1600 x 900 some text-heavy slides are scaled down by the deck's fit function, as in the Week 3 deck. At 1920 x 1080 the smallest scale in these six decks is 0.72 (one slide), the same as the Week 3 deck's smallest.
- Notes pages link to chemistry-review.html. There is no math-review.html in the repo, so math cards carry no link.
- A person still needs to run VoiceOver over the pages.

## 7. Reviewer

Prepared by Claude for Dr. Sharilyn Rennie. Awaiting her review.
