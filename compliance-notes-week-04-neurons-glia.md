# Accessibility compliance notes

## 1. Project

BIOL 005 Human Physiology, Week 4. Guided walkthrough: neurons and neuroglia.

Files covered:

- biol005-w04-neurons-glia-guided.html
- biol005-w04-drawing-sheet.html (Part 1 and Part 2 extended in the September 24 drop)
- biol005-w04-rmp-guided.html (sodium entry path corrected in the September 23 drop)
- week-04.html (two walkthrough cards added to the Learn section in the September 23 drop)

Date: September 23, 2026, updated September 24, 2026
Reviewer: Dr. Sharilyn Rennie

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level achieved | Notes |
|---|---|---|
| 1.1.1 Non-text content | AA | Every scene carries a plain-language description in an aria-live region. Decorative SVG is aria-hidden. |
| 1.3.1 Info and relationships | AA | Semantic landmarks, h1 and h2 hierarchy, label and textarea tied with for and id. |
| 1.4.3 / 1.4.6 Contrast | AAA for all body and heading text | Full audit in section 3. |
| 1.4.10 Reflow | AA | Single column below 1050 px, worksheet collapses under the lesson. No horizontal scroll at 390 px. |
| 1.4.11 Non-text contrast | AA | Figure shapes that carry meaning are 3:1 or better against their background. See section 3. |
| 1.4.12 Text spacing | AA | Relative units throughout, no fixed-height text containers. |
| 2.1.1 Keyboard | AA | Every control reachable and operable by keyboard, including the topic menu. |
| 2.4.3 Focus order | AA | Focus moves to the step heading on advance, and to the answer box on reveal. |
| 2.4.7 Focus visible | AAA | 3 px maroon outline with 3 px offset on all focusable elements. |
| 2.5.8 Target size | AA | All controls at least 44 px high. |
| 3.3.2 Labels or instructions | AA | Every field has a visible label written in plain student language. |
| 4.1.2 Name, role, value | AA | aria-expanded on the topic menu and worksheet toggle, accessible names on icon controls. |
| 4.1.3 Status messages | AA | Save confirmations and scene descriptions in aria-live polite regions. |
| 2.3.3 Animation from interaction | AAA | prefers-reduced-motion jumps straight to end states, no motion. |

## 3. Color contrast audit

| Pair | Ratio | Result |
|---|---|---|
| Navy #0B1530 on page #FAFAF9 | 17.27:1 | AAA |
| Navy #0B1530 on card #FFFFFF | 18.04:1 | AAA |
| Maroon #8B3A2E on card #FFFFFF | 7.66:1 | AAA |
| Maroon #8B3A2E on page #FAFAF9 | 7.33:1 | AAA |
| Secondary #414B5C on card #FFFFFF | 8.80:1 | AAA |
| White on navy #0B1530 | 18.04:1 | AAA |
| Navy on navy-tint #ECEFF4 | 15.65:1 | AAA |
| Gold-deep #8A6D33 on card #FFFFFF | 4.87:1 | AA for normal text, AAA for large |

Pairs added September 24, 2026, for the new scenes. No new colors were introduced; every new scene uses the existing tokens.

| Pair | Where it appears | Ratio | Result |
|---|---|---|---|
| Secondary #414B5C text on navy-tint #ECEFF4 | "Blood in a capillary" and "water-soluble" labels inside the capillary, blood-brain barrier step | 7.64:1 | AAA |
| White text on navy #0B1530 | "Ca" inside the calcium ions, calcium step | 18.04:1 | AAA |
| Maroon #8B3A2E text on card #FFFFFF | Map tags, shape locations, signal type labels, glia sorting names | 7.66:1 | AAA |
| Secondary #414B5C shape on navy-tint #ECEFF4 | Lipid-soluble molecule inside the capillary | 7.64:1 | Passes 1.4.11 (3:1) |
| Gold-deep #8A6D33 shape on navy-tint #ECEFF4 | Water-soluble molecule inside the capillary | 4.22:1 | Passes 1.4.11 (3:1) |
| Maroon #8B3A2E bars on card #FFFFFF | Sodium channel density bars | 7.66:1 | Passes 1.4.11 (3:1) |

Gold-deep is used only for large graphic elements, the trigger zone marker, and small molecule dots, never for text. Color is never the only way information is carried. In the new scenes every colored item also has a word beside it (kinesin and dynein on the transport packages, lipid-soluble and water-soluble on the molecules, fast and slow written out with their speeds), and every scene state is also stated in the step text and the scene description.

## 4. Keyboard navigation flow verified

Skip link, then course links, then the topic menu button, then the lesson controls (Show me, Watch again, Back, Next), then the worksheet name field, the prediction field, the result field, See all my answers, and Save as PDF. Escape closes the topic menu and returns focus to its button. Next is disabled on prediction steps until the reveal, and that state is conveyed by the disabled attribute rather than by color alone.

September 24, 2026: the full 44-step pass was repeated using the keyboard only, with Enter on Show me and Next. Focus landed on the step heading after every Next and on the answer box after every reveal. The topic menu opened from the keyboard with focus on its first item, and Escape closed it and returned focus to the menu button. The menu now lists seven topics, starting with the map of the nervous system.

## 5. Screen reader testing

Automated verification completed: landmark structure, heading order, accessible names, aria-live regions, aria-expanded states, and focus movement were verified programmatically across all 44 steps with no errors.

Hand verification with NVDA in Chrome and VoiceOver in Safari is still outstanding. See section 6.

## 6. Known limitations and remediation plan

1. Hand screen reader pass with NVDA and VoiceOver not yet performed on either walkthrough. Planned before the Week 4 module opens.
2. Khan Academy support buttons cover three steps. Two use the neuron structure video verified against Khan's own sitemap, and the new graded potential step reuses the graded potential video already verified for the resting potential file. Khan Academy could not be reached from the build environment on September 24, so no new video URLs were added for the map, glia, myelin, or transport steps. Those buttons will be added when the mapping rows for this section are supplied or the URLs can be checked.
3. Worksheet answers are stored in the student's own browser. Students are told to export the PDF and upload it, since clearing site data clears the saved work.
4. At phone widths, the Watch again button can partly cover the longest figure captions. The caption is decorative, since the same idea is in the step text and the scene description, but the shared template should move the button or the caption at narrow widths. This affects every walkthrough built from the template, not only this one.

## 7. Change note, September 24, 2026

This walkthrough is now the only student-facing lesson for neurons and neuroglia. The older story slides, draw-along, notes, slides, and transcript for this topic are retired. The walkthrough was extended from 22 steps to 44 so that it teaches every element of Week 4 competencies 7 to 11, including the map of the nervous system that now opens the neuron classes competency.

- New topic, first in order: the map of the nervous system (CNS and PNS, sensory and efferent divisions, somatic motor and autonomic, sympathetic and parasympathetic, enteric).
- New steps on graded potentials, the all-or-none action potential, calcium entry at the terminal, and the signal type in each region; where each neuron shape is found; which glia are in the CNS and which in the PNS; the blood-brain barrier; microglia, ependymal cells, and satellite cells each on their own screen; peripheral nerve regrowth; how myelin speeds conduction; sodium channel clustering at the nodes; Guillain-Barré syndrome; kinesin and dynein; fast and slow transport.
- Accuracy corrections to existing steps: the trigger zone is now named as the axon hillock and initial segment; the myelin speed claim now uses the textbook range of about 0.5 to 2 m per second unmyelinated against up to about 120 m per second myelinated; satellite cells are described as surrounding cell bodies in all ganglia; the step order now points to the resting membrane potential walkthrough as the next section.
- Layout fixes after visual inspection: the multipolar neuron drew its dendrites over its cell body; the Cell body and Trigger zone labels sat on outlines; the Schwann cell label and satellite cells ran under the Watch again button at widths near 1260 px. All corrected.
- Every step now sets the figure from its starting state before drawing its finished state, so returning to a completed step always shows the correct picture.
- Drawing sheet: Part 1 gains a nervous system map box and asks for the signal type in each region; Part 2 gains an axonal transport box and a short writing block. The sheet is now 24 drawing boxes and 10 open writing blocks with no ruled lines, and prints to 11 pages with a page break before each part.

## 8. Brand restyle, September 24, 2026

Covers biol005-w04-neurons-glia-guided.html and biol005-w04-rmp-guided.html. The drawing sheet is logged in its own notes.

Brand restyle onto the MedMasters system, forked from virtual-office.html. Layout,
animation, Next gating, Show me, the worksheet sidebar, saving and the PDF view are
unchanged, and were rechecked in headless Chromium after the change.

- Added the shared brand bar and dark footer from assets/brandbar.css. The bar is
  static on the walkthroughs (not sticky) because the figure and worksheet columns
  are already sticky.
- The course line above the h1 is now a tracked uppercase maroon eyebrow; the h1 is
  two-tone Open Sans 800 with the key words in maroon and a closing period.
- Headings maroon-dark. Buttons uppercase and tracked at 4px radius; primary buttons
  maroon. Cards, boxes and the figure frame at 8px radius.
- Locked controls (every disabled button, including Next before Show me and the jump
  menu before the end) are now gray dashed instead of faded, so the state no longer
  relies on reduced opacity. The unlocked jump menu gets a gold-deep border.
- Jump menu hover and focus keep the item white with a navy outline instead of a
  navy-tint fill.
- The floating Back button and Ask Hootie are not loaded here: they would cover the
  worksheet's Save as PDF button and, on a phone, the lesson controls.
- No italics, no em or en dashes, target="_top" and rel="noopener" unchanged, height
  sender still last before </body>. Heading order, skip link, aria-live regions and
  aria-expanded unchanged.

New or changed contrast pairs, measured:

| Pair | Ratio | Level |
|---|---|---|
| Maroon #8B3A2E eyebrow and prediction labels on white #FFFFFF | 7.66:1 | AAA |
| Maroon #8B3A2E eyebrow and Week 4 lectures link on the off-white page #FAFAF9 | 7.33:1 | AAA |
| Maroon-dark #6E2D24 step and worksheet headings on white | 10.18:1 | AAA |
| White on maroon #8B3A2E, primary buttons (Show me, Save as PDF) | 7.66:1 | AAA |
| White on maroon-dark #6E2D24, primary button hover | 10.18:1 | AAA |
| Locked gray #454B58 dashed border and label on white, disabled buttons | 8.75:1 | AAA |
| Gold-deep #8A6D33 border on white, unlocked Jump to a topic (non-text) | 4.87:1 | Passes 3:1 |
| Navy #0B1530 inset outline on white, jump menu hover and focus (non-text) | 18.04:1 | Passes 3:1 |
| Bone #F5F1E8 footer text on navy-deep #060A18 | 17.50:1 | AAA |

## 9. Reviewer
Dr. Sharilyn Rennie
