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

---

## Brand restyle, September 24, 2026

Files: weekly-loop.html, tools/build_week_entry.py, week-04-entry.html (regenerated
with `python3 tools/build_week_entry.py 4`, never hand-edited; the data file
tools/week-entry-data.json is unchanged). Also covers the three Week 4 pages the
entry page links to that have no compliance notes of their own:
week-04-preread.html, lab-worksheet-week04.html, discussion-week04.html.

What changed:

- Both loop pages now carry the shared MedMasters chrome from assets/brandbar.css,
  forked from virtual-office.html: the sticky white brand bar with the three-figure
  mark, the uppercase tracked back link, a maroon eyebrow ("How every week works",
  "Week 4, start here"), a two-tone Open Sans 800 headline with a closing period,
  maroon-dark section headings, the uppercase maroon Print button at 4px radius, and
  the dark dot-separated footer. Hootie and the floating Back button load as they do
  on virtual-office.html. bio005-collapse.js is not loaded, because it would fold the
  page's sections and change how it behaves.
- Off-brand hues removed. The preview step was slate gray and is now navy-tint with a
  navy edge; its label in the key now reads "Light navy", and the loop diagram's text
  description says "shown in light navy". Arrows are navy instead of gray. The orange
  W badge (known limitation 2 above) is now navy, at the instructor's direction on
  Sep 24. S stays maroon. T is now gold with a navy-deep letter and a navy ring,
  where it used to be navy, so W and T no longer share a color.
- Cards and the key are white at 8px radius on a shadow, with no borders.
- On the week entry page, linked diagram boxes lift on a shadow on hover and take a
  3px maroon focus outline around the whole step. The old gold hover and focus edge
  was 2.32:1 on the page, under the 3:1 non-text floor.
- The pre-read, lab worksheet and discussion pages get the same chrome and type. A
  chosen radio or checkbox answer now stays white, gets a navy outline and lifts on a
  shadow. The rubric disclosures get the same chevron as the key.
- Print: every one of these pages prints the same number of pages as before (loop 5,
  entry 3, pre-read 7, lab 6, discussion 6). The brand bar, footer and floating
  buttons do not print.
- No italics, no em or en dashes, target="_top" and target="_blank" rel="noopener"
  unchanged, iframe height sender still the last script before </body>.

New or changed contrast pairs, measured:

| Pair | Ratio | Level |
|---|---|---|
| Navy #0B1530 text on navy-tint #ECEFF4, Pre-read box | 15.65:1 | AAA |
| Navy #0B1530 edge of the Pre-read box and arrows on off-white #FAFAF9 (non-text) | 17.27:1 | Passes 3:1 |
| White on navy #0B1530, W badge | 18.04:1 | AAA |
| White on maroon #8B3A2E, S badge, primary buttons | 7.66:1 | AAA |
| Navy-deep #060A18 letter on gold #C9A14A, T badge | 8.16:1 | AAA |
| Navy #0B1530 ring of the T badge on a white box (non-text) | 18.04:1 | Passes 3:1 |
| Maroon #8B3A2E eyebrow, back link, headline words on off-white #FAFAF9 | 7.33:1 | AAA |
| Maroon-dark #6E2D24 headings on off-white #FAFAF9 | 9.74:1 | AAA |
| Maroon-dark #6E2D24 headings and rubric summaries on white | 10.18:1 | AAA |
| White on maroon-dark #6E2D24, button hover | 10.18:1 | AAA |
| Maroon #8B3A2E focus outline on off-white, diagram links (non-text) | 7.33:1 | Passes 3:1 |
| Navy #0B1530 outline on white, chosen answer (non-text) | 18.04:1 | Passes 3:1 |
| Ink-soft #414B5C lede and meta text on off-white | 8.43:1 | AAA |
| Bone #F5F1E8 footer text on navy-deep #060A18 | 17.50:1 | AAA |

The rows above for slate and orange are retired. Known limitation 2 is closed.
Limitation 1, the live screen reader pass, is still open.
