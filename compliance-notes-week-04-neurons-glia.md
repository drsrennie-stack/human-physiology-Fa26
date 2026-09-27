# Accessibility compliance notes

## 1. Project

BIOL 005 Human Physiology, Week 4. Guided walkthrough: neurons and neuroglia.

Files covered:

- biol005-w04-neurons-glia-guided.html
- biol005-w04-rmp-guided.html (sodium entry path corrected in this drop)
- week-04.html (two walkthrough cards added to the Learn section)

Date: September 23, 2026
Reviewer: Dr. Sharilyn Rennie

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level achieved | Notes |
|---|---|---|
| 1.1.1 Non-text content | AA | Every scene carries a plain-language description in an aria-live region. Decorative SVG is aria-hidden. |
| 1.3.1 Info and relationships | AA | Semantic landmarks, h1 and h2 hierarchy, label and textarea tied with for and id. |
| 1.4.3 / 1.4.6 Contrast | AAA for all body and heading text | Full audit in section 3. |
| 1.4.10 Reflow | AA | Single column below 1050 px, worksheet collapses under the lesson. |
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

Gold-deep is used only for large graphic elements and the trigger zone marker, never for body text. Color is never the only way information is carried: every scene state is also stated in the text and in the scene description.

## 4. Keyboard navigation flow verified

Skip link, then course links, then the topic menu button, then the lesson controls (Show me, Watch again, Back, Next), then the worksheet name field, the prediction field, the result field, See all my answers, and Save as PDF. Escape closes the topic menu and returns focus to its button. Next is disabled on prediction steps until the reveal, and that state is conveyed by the disabled attribute rather than by color alone.

## 5. Screen reader testing

Automated verification completed in this drop: landmark structure, heading order, accessible names, aria-live regions, aria-expanded states, and focus movement were verified programmatically across all 22 steps with no errors.

Hand verification with NVDA in Chrome and VoiceOver in Safari is still outstanding. See section 6.

## 6. Known limitations and remediation plan

1. Hand screen reader pass with NVDA and VoiceOver not yet performed on either walkthrough. Planned before the Week 4 module opens.
2. Khan Academy support buttons in the neurons and glia file currently cover two steps only, using the one video URL verified against Khan's own sitemap. The remaining buttons will be added when the mapping rows for this section are supplied, the same way the resting potential file was built.
3. The printable drawing worksheet described in the build plan is not in this drop. The on-page worksheet with PDF export is complete and working.
4. Worksheet answers are stored in the student's own browser. Students are told to export the PDF and upload it, since clearing site data clears the saved work.

## 7. Reviewer

Dr. Sharilyn Rennie
