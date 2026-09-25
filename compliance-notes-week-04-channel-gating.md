# Accessibility compliance notes

## 1. Project

BIOL 005 Human Physiology, Week 4. Guided walkthrough: ion channel gating.

Files covered:

- biol005-w04-channel-gating-guided.html
- week-04.html (walkthrough card added)

Date: September 23, 2026
Reviewer: Dr. Sharilyn Rennie

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable. Same engine and styles as the
neurons and neuroglia walkthrough, so the criteria table in
compliance-notes-week-04-neurons-glia.md applies unchanged. Verified for this file:

| Criterion | Level achieved | Notes |
|---|---|---|
| 1.1.1 Non-text content | AA | All 16 scenes carry a plain-language description in an aria-live region, including the three sodium channel states. |
| 1.3.1 Info and relationships | AA | Semantic landmarks, heading hierarchy, labels tied to fields. |
| 1.4.3 / 1.4.6 Contrast | AAA for all text | Audit unchanged from the neurons file, same palette. |
| 2.1.1 Keyboard | AA | All controls reachable and operable. |
| 2.4.3 Focus order | AA | Focus moves to the step heading, then to the answer box on reveal. |
| 2.4.7 Focus visible | AAA | 3 px maroon ring, 3 px offset. |
| 2.5.8 Target size | AA | All controls at least 44 px high. |
| 4.1.3 Status messages | AA | Voltage readings and scene changes announced politely. |
| 2.3.3 Animation from interaction | AAA | prefers-reduced-motion jumps to end states. |

Channel state is never carried by color alone. Every gate position is stated in
the step text, in the caption, and in the scene description.

## 3. Color contrast audit

Identical palette and pairs to the neurons and neuroglia file. All text pairs AAA.
Gold-deep #8A6D33 at 4.87:1 is used only for the gate graphics, never for text.

## 4. Keyboard navigation flow verified

Skip link, course links, topic menu, lesson controls, worksheet fields, See all my
answers, Save as PDF. Next is disabled on all 11 prediction steps until the reveal,
conveyed by the disabled attribute rather than color.

## 5. Screen reader testing

Automated verification across all 16 steps: landmarks, heading order, accessible
names, aria-live regions, aria-expanded states, focus movement. No errors.

Hand verification with NVDA in Chrome and VoiceOver in Safari still outstanding.

## 6. Known limitations and remediation plan

1. Hand screen reader pass not yet performed.
2. One Khan Academy support button in this file, on the chemically gated channel
   step, using the ligand-gated channels video already verified for the resting
   potential walkthrough. More will be added when the mapping rows for this
   section are supplied.
3. Printable drawing worksheet not yet built. The on-page worksheet with PDF
   export is complete.
4. Worksheet answers are stored in the student's own browser.

## 7. Brand restyle, September 24, 2026

Covers biol005-w04-channel-gating-guided.html.

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

## 8. Reviewer
Dr. Sharilyn Rennie
