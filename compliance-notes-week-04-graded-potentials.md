# Accessibility compliance notes

## 1. Project

BIOL 005 Human Physiology, Week 4. Guided walkthrough: graded potentials.

Files covered:

- biol005-w04-graded-potentials-guided.html (new)
- biol005-w04-drawing-sheet.html (new Part 5, Graded potentials; Put it together is now Part 6)
- lecture-week.html (walkthrough card added in teaching order, after channel gating)
- week-04-entry.html, tools/week-entry-data.json, tools/canvas_steps_week04.py and
  _canvas/pages/w04-02-first-pass-in-your-first-color.html (the First pass wording now
  says the walkthroughs come first and names graded potentials among them)

Not changed: week-04.html. Since September 26 it forwards to the Week 4 start page,
so the card went on the lessons page instead, as Scrubs approved on September 27.

Date: September 27, 2026
Reviewer: Dr. Sharilyn Rennie

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable. Same engine, styles and worksheet as
the channel gating walkthrough, copied with only the SCENE and STEPS blocks replaced,
so the criteria table in compliance-notes-week-04-neurons-glia.md applies. Verified for
this file:

| Criterion | Level achieved | Notes |
|---|---|---|
| 1.1.1 Non-text content | AA | All 15 scenes carry a plain-language description in the aria-live region. Every value on a tracing or meter is also in the step text or the description. |
| 1.3.1 Info and relationships | AA | Semantic landmarks, heading hierarchy, labels tied to fields. |
| 1.4.1 Use of color | AA | Depolarizing and hyperpolarizing potentials, threshold, and the separate inputs in the summation steps are told apart by labels, line style (solid or dashed) and position, never by color alone. |
| 1.4.3 / 1.4.6 Contrast | AAA for all text | See section 3. |
| 1.4.10 Reflow | AA | No horizontal scroll at 390 px. |
| 2.1.1 Keyboard | AA | All controls reachable and operable. |
| 2.4.3 Focus order | AA | Focus moves to the step heading on Next and to the answer box on reveal, checked by keyboard. |
| 2.4.7 Focus visible | AAA | 3 px maroon ring, 3 px offset. |
| 2.5.8 Target size | AA | All controls at least 44 px high. |
| 4.1.3 Status messages | AA | Scene changes announced politely. |
| 2.3.3 Animation from interaction | AAA | prefers-reduced-motion jumps every step to its end state. Checked with a full reduced-motion pass. |

## 3. Color contrast audit

Same palette as the other walkthroughs. Pairs used in this figure:

| Pair | Ratio | Level |
|---|---|---|
| Navy #0B1530 figure text and tracing on white | 18.04:1 | AAA |
| Maroon #8B3A2E figure labels (sizes, threshold, current leak, toxin) on white | 7.66:1 | AAA |
| Ink2 #414B5C axis labels and channel labels on white | 8.80:1 | AAA |
| White on navy, Na ion labels | 18.04:1 | AAA |
| White on maroon, K ion labels and plus signs | 7.66:1 | AAA |
| Maroon dashed threshold line on white (non-text) | 7.66:1 | Passes 3:1 |
| Navy dendrite outline on navy-tint #ECEFF4 (non-text) | 15.65:1 | Passes 3:1 |
| Gold-deep #8A6D33 gates and trigger zone on white (non-text) | 4.87:1 | Passes 3:1 |

The maroon band inside the dendrite (maroon at 32 percent opacity on navy-tint) shows
the charge thinning out. It is a supporting graphic: the same information is carried by
the four meter readings, the step text and the scene description, so it is not held to
the 3:1 non-text floor.

## 4. Keyboard navigation flow verified

Skip link, course links, topic menu, lesson controls, worksheet fields, See all my
answers, Save as PDF. Next is disabled on all 12 prediction steps until Show me, by the
disabled attribute. The topic menu stays disabled until the last step is revealed.

## 5. Screen reader testing

Automated verification across all 15 steps in headless Chromium:

- every step plays and every play() promise resolves
- Next is locked on every prediction step until Show me
- the topic menu unlocks only at the end
- typed answers persist after reload, appear in See all my answers, and reach the print
  view with the student name
- no console errors, including in a reduced-motion pass

Key scenes were screenshotted and inspected by eye. Fixes made from that inspection:
the mV axis label sat on top of the minus 40 tick; the "toward the cell body" label ran
under the charge band and the plus signs; the resistance label sat inside the widened
dendrite; the time label collided with the cell body label; the summation labels
crossed the threshold line; the plus signs leaking out sat on top of their arrowheads.

Hand verification with NVDA in Chrome and VoiceOver in Safari is still outstanding, as
it is for every walkthrough.

## 6. Content and accuracy notes

- Content and numbers follow the retired action potential notes (Silverthorn chapter 9):
  3, 7 and 12 mV for weak, medium and strong stimuli; 20, 12, 7 and 4 mV at four points
  along the dendrite; the worked problem with 8 mV reaching the trigger zone, 16 mV for
  two together and 11 mV with a 5 mV inhibitory input; threshold about minus 55 mV;
  the tetrodotoxin recordings (5 mV weak, about 20 mV strong, no action potential).
- One deliberate change from the notes. The notes say a graded potential hyperpolarizes
  when potassium leaves or chloride enters. The resting potential walkthrough gives
  chloride's balance point as about minus 65 mV and rest as minus 70 mV, so on those
  numbers opening chloride channels would not hyperpolarize the cell. To keep the two
  walkthroughs consistent, this file uses only potassium leaving as the hyperpolarizing
  example.
- The summation step says in words that real graded potentials add to a little less than
  their plain sum, as the notes do.
- The action potential in the summation steps leaves the top of the tracing's scale,
  which runs from minus 90 to minus 40 mV. The label says it rises to about plus 30 mV.
- Competency labels follow bio005-competencies.js: Competency 12, and Competencies 12
  and 14 where threshold comes in. The mismatch between the eleven stated objectives and
  bio005-competencies.js is untouched, as agreed.

## 7. Known limitations and remediation plan

1. Hand screen reader pass not yet performed.
2. Support buttons: two videos, both from the graded potentials mapping rows already used
   in the resting potential walkthrough. "Neuron graded potential mechanism" was checked
   on September 27, 2026 through YouTube's oEmbed record (title matches, channel
   khanacademymedicine). The Khan Academy page for "Neuron graded potential
   description" loads, but its title is filled in by script, so the title could not be
   read from the build environment. The URL is the one verified for the resting
   potential file. No other buttons were added.
3. The walkthrough ends by pointing to the action potential walkthrough, which is not
   built yet. Until it is, the older action potential lesson on the lessons page covers
   that material.
4. Worksheet answers are stored in the student's own browser. The Canvas assignment
   should tell students to save the PDF.
5. Drawing sheet: the sheet now opts out of the site's reading layout
   (data-no-reading-mode, data-collapse off). With the reading layout on, part headings
   were being pulled away from their pages in print. Each part now starts on its own
   page. The sheet prints to 14 pages; Part 5 takes 3 of them.

## 8. Reviewer
Dr. Sharilyn Rennie
