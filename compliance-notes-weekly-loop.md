# Compliance notes: weekly loop and week entry pages

Project: BIO 005 Human Physiology, Yuba College, Fall 2026
Files covered: weekly-loop.html, week-04-entry.html, tools/build_week_entry.py (generates every week-NN-entry.html)
Date: September 23, 2026

## WCAG version and target

WCAG 2.2, AA required, AAA targeted. All text contrast meets AAA.

## Color contrast (measured)

| Text | Background | Ratio | Result |
|---|---|---|---|
| White | Navy #0B1530 (learning steps) | 18.04:1 | AAA |
| White | Slate #414B5C (preview step) | 8.80:1 | AAA |
| White | Maroon #8B3A2E (retrieval step, S badge, chips) | 7.66:1 | AAA |
| Gold-ink #060A18 | Gold #C9A14A (Mastery Check) | 8.16:1 | AAA |
| Navy #0B1530 | Orange #F28C28 (W badge) | 7.35:1 | AAA |
| Navy | White cards | 18.04:1 | AAA |
| Maroon-dark #6E2D24 | White (card headings, times in list) | 10.18:1 | AAA |
| Slate #414B5C | Off-white #FAFAF9 (labels, notes) | 8.43:1 | AAA |
| Maroon #8B3A2E | Off-white (Not yet? label) | 7.33:1 | AAA |

Color never carries meaning alone. Every phase is named in words on the diagram and in the text list, and every badge is explained in the key and repeated in words in the list.

## Keyboard

Verified in headless Chromium: skip link, back link, the key, each diagram step link (week entry page), each go-back-in item, and the step list are all reachable with Tab and operable with Enter. Diagram links show a gold focus outline on the box. Collapsibles are native details and summary elements.

## Screen reader

Structure checked in the accessibility tree: landmarks (nav, main, footer), one h1, h2 sections in order, diagram links carry accessible names ("Lab, opens this week's page"), the loop page diagram has a full text description, and both pages repeat the whole week as an ordered list. Not yet tested with a live screen reader (NVDA or VoiceOver). That test is the remaining step.

## Known limitations and plan

1. Live screen reader pass not done yet. Plan: VoiceOver on Safari and NVDA on Firefox before Week 4 opens.
2. The orange W badge is outside the brand palette, kept at the instructor's request.
3. Steps marked Not posted yet on the Week 4 page (Pre-read, Second pass) are not links until their pages exist.

## Reviewer

Built and machine-checked by Claude for Dr. Sharilyn Rennie. Final review: Dr. Sharilyn Rennie.
