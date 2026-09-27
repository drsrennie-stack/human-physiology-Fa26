# Accessibility compliance notes

## 1. Project

BIOL 005 Human Physiology, Week 4. Guided walkthrough: the action potential.

Files covered:

- biol005-w04-action-potential-guided.html (new), built by
  tools/walkthroughs/assemble_action_potential.py from the graded potentials shell and
  tools/walkthroughs/action-potential.scene.js
- biol005-w04-action-potential-walkthrough-notes.html and
  notes/BIO005-Week4-Walkthrough-Notes-action-potential.pdf (new written notes)
- lecture-week.html (walkthrough and notes cards replace the older action potential story
  slides, draw-along sheet, lecture notes and slides)
- week-04-notes.html (the action potential entry now links the walkthrough and its notes)
- tools/canvas_steps_week04.py and the Canvas Step 2 page (five walkthroughs named)
- instructor-preview-week04.html (new, for Dr. Rennie: every walkthrough with nothing
  locked, and every support video)

No drawing sheet part was added. On September 27 Scrubs questioned the drawing sheet,
since the Competency Study Guide already has a drawing prompt for every competency, and
it was taken off Canvas Step 2 and the lessons page.

Date: September 27, 2026
Reviewer: Dr. Sharilyn Rennie

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable. Same engine, styles and worksheet as
the graded potentials walkthrough, with only the scene, the steps and the support videos
replaced.

| Criterion | Level achieved | Notes |
|---|---|---|
| 1.1.1 Non-text content | AA | All 16 scenes carry a plain-language description in the aria-live region. Every value on the tracing, the meter or a panel is also in the step text or the description. |
| 1.3.1 Info and relationships | AA | Semantic landmarks, heading hierarchy, labels tied to fields. |
| 1.4.1 Use of color | AA | The sodium and potassium channel traces are labeled Na+ and K+. The normal and drug tracings, and the failed and stronger second stimulus, differ by line style (solid or dashed) and labels. Channel states differ by shape: a bar across the pore or not, a ball in the pore or hanging below it. |
| 1.4.3 / 1.4.6 Contrast | AAA for all text | See section 3. |
| 1.4.10 Reflow | AA | No horizontal scroll at 390 px. |
| 2.1.1 Keyboard | AA | All controls reachable and operable. |
| 2.4.3 Focus order | AA | Focus moves to the step heading on Next and to the answer box on reveal. |
| 2.4.7 Focus visible | AAA | 3 px maroon ring, 3 px offset. |
| 2.5.8 Target size | AA | All controls at least 44 px high. |
| 4.1.3 Status messages | AA | Scene changes and the Show me lock message announced politely. |
| 2.3.3 Animation from interaction | AAA | prefers-reduced-motion jumps every step to its end state. Checked with a full reduced-motion pass. |

## 3. Color contrast audit

| Pair | Ratio | Level |
|---|---|---|
| Navy #0B1530 figure text, tracing and meter on white | 18.04:1 | AAA |
| Maroon #8B3A2E figure labels on white | 7.66:1 | AAA |
| Ink2 #414B5C axis labels, channel labels and panel labels on white | 8.80:1 | AAA |
| White on navy, Na ion labels | 18.04:1 | AAA |
| White on maroon, K ion labels | 7.66:1 | AAA |
| Maroon dashed threshold line on white (non-text) | 7.66:1 | Passes 3:1 |
| Gold-deep #8A6D33 gates and balance-point lines on white (non-text) | 4.87:1 | Passes 3:1 |
| Navy membrane outline on navy-tint #ECEFF4 (non-text) | 15.65:1 | Passes 3:1 |

## 4. Keyboard navigation flow verified

Skip link, course links, topic menu, lesson controls, worksheet fields, See all my
answers, Save as PDF. On all 14 prediction steps Show me stays disabled until at least
three words are typed in the worksheet, and Next stays disabled until Show me. The topic
menu stays disabled until the last step is revealed.

## 5. Screen reader testing

Automated verification across all 16 steps in headless Chromium:

- every step plays and every play() promise resolves
- Next is locked on every prediction step until Show me
- the topic menu unlocks only at the end
- typed answers persist after reload, appear in See all my answers, and reach the print
  view with the student name
- no console errors, including in a reduced-motion pass
- with ?preview=1 nothing is locked (instructor preview only)

Every scene was screenshotted and inspected by eye. Fixes made from that inspection:
the potassium ions and channel sat under the Watch again button, so the membrane patch
was moved left; the time label sat on the potassium balance line; the inactivation ball
showed on scenes without the membrane patch; the "no second spike" label crossed the
falling phase; one caption ran under the Watch again button.

Hand verification with NVDA in Chrome and VoiceOver in Safari is still outstanding, as
it is for every walkthrough.

## 6. Content and accuracy notes

- Numbers match the earlier walkthroughs: rest minus 70 mV, threshold about minus 55,
  peak about plus 30, sodium's balance point plus 60, potassium's minus 90, inside
  concentrations sodium 15 mM and potassium 150 mM. The after-hyperpolarization is about
  minus 80 mV, as in Week 4 competency 13. The live model in the older lecture notes shows
  minus 84 because it uses Goldman values; the walkthrough uses the rounder number.
- Threshold is taught as the voltage where sodium current in first outweighs potassium
  current out, as competency 14 asks, with a 10 mV push failing and a 15 mV push firing.
- The channel-count panel is a teaching sketch of timing (sodium fast and brief,
  potassium later and longer). It is not scaled data, and the step text says what it
  shows.
- The refractory periods: absolute while the sodium inactivation gates are closed;
  relative during the dip, where the same 16 mV push from minus 78 reaches only minus 62,
  and a stronger stimulus fires a second, slightly smaller spike. Backward conduction is
  left to the conduction walkthrough, as agreed.
- Firing ceiling: 1 to 2 ms absolute refractory period gives 500 to 1,000 per second,
  worked out in the step.
- Patient: dalfampridine (4-aminopyridine) blocks voltage-gated potassium channels and is
  used to improve walking in multiple sclerosis. Demyelination exposes potassium channels
  normally under the myelin. Blocking them widens the action potential, and the dose is
  limited by seizure risk. Stated at that level only.
- Competency labels follow bio005-competencies.js and week-04-competencies.html: 13
  phases, 14 threshold and all or none, 15 coding of stimulus intensity, 16 refractory
  periods.

## 7. Known limitations and remediation plan

1. Hand screen reader pass not yet performed.
2. Support buttons: four, on threshold, the peak, the fall and the dip, using the two
   Khan Academy action potential videos already verified for the channel gating
   walkthrough ("Neuron action potential description" and "Neuron action potential
   mechanism", both on the khanacademymedicine YouTube channel). No verified video was
   found for coding or refractory periods, so those steps have no button.
3. The last patient answer points to the conduction walkthrough, which is not built yet.
   Until it is, the older lesson "How action potentials carry information" covers it.
4. Worksheet answers are stored in the student's own browser. The Canvas assignment
   should tell students to save the PDF.
