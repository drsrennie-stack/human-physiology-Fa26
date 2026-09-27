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

## 7. Reviewer

Dr. Sharilyn Rennie
