# Accessibility compliance notes: the patient chart rebuild

## 1. Project and files

**Project.** BIO 005 Human Physiology, Yuba College, Fall 2026. The patient chart rebuild: two patients across fifteen weeks, realigned to the Fall 2026 schedule, plus the end of term analysis.

**Date.** September 21, 2026.

**Files covered.**

| File | State |
|---|---|
| `bio005-patient-chart.js` | Rewritten. Weeks 1 and 2 byte-identical to the posted version, verified by diff and by deep-equality of the parsed objects. Weeks 3 to 8 realigned, Weeks 9 to 15 new. Data only, no rendering. |
| `patient-chart-book.html` | Rebuilt. Two patients, five flowsheets per half, released results on every week page, repainted onto PRIMARY. |
| `assignment-apply.html` | Updated. Reads the right patient per week, renders released results, repainted onto PRIMARY. |
| `patient-sheet.html` | Updated. Reads the right patient per week, repainted onto PRIMARY. |
| `assignment-patient-chart.html` | Updated. Two patients in the upload list, the analysis added as the second file, repainted onto PRIMARY, long filenames wrapped so the page reflows at 320 px. |
| `assignment-patient-analysis.html` | New. The written half of the end of term capstone. |
| `instructor/patient-chart-key.md` | New. Worked arithmetic and intended answers. Not student-facing. |

## 2. WCAG version, target, and what was achieved

Target is WCAG 2.2 Level AA as the floor, with AAA wherever it was reachable without changing the brand palette. All five pages pass AA at every measured pair. The one thing that does not reach AAA is described in section 6 and it is the palette's own accent color, not a page defect.

Automated testing used axe-core against the `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` and `best-practice` rule sets, in headless Chromium.

| Page | axe violations |
|---|---|
| `patient-chart-book.html` | 0 |
| `assignment-patient-analysis.html` | 0 |
| `assignment-apply.html?week=3` | 0 |
| `assignment-apply.html?week=9` | 0 |
| `patient-sheet.html?all=1` | 0 |
| `assignment-patient-chart.html` | 0 |

Criterion by criterion, for the criteria this rebuild actually touches:

| Criterion | Level | Result | How |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | No content images. The one SVG, the back arrow, is `aria-hidden` with `focusable="false"` beside a text label. |
| 1.3.1 Info and relationships | A | Pass | Results and flowsheets are real tables with `thead`, `scope="col"` and `scope="row"`. The chart entry is a description list. Sections are labeled by their own headings. |
| 1.3.2 Meaningful sequence | A | Pass | Source order is reading order on every page; no CSS reordering of content. |
| 1.4.1 Use of color | A | Pass | **The change that mattered most.** Abnormal results are flagged with the words High, Low, Critical high and Critical low in their own column. Color is redundant. Entry point names no longer carry a color code at all. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. Lowest pair 5.38:1 against a 4.5:1 requirement. |
| 1.4.6 Contrast, enhanced | AAA | Partial | See section 6. |
| 1.4.4 Resize text | AA | Pass | All sizes in px scale with browser zoom; no `maximum-scale` or `user-scalable=no`. Measured at 200 percent text size in a 640 px viewport: no horizontal scroll. |
| 1.4.10 Reflow | AA | Pass | Measured, not assumed. No horizontal page scroll at 320 px on any page. Flowsheets and results tables sit in `overflow-x:auto` wrappers, which is the permitted exception for tabular data; the two long PDF filenames on the capstone page were overflowing and now wrap. |
| 1.4.11 Non-text contrast | AA | Pass | Table borders and the focus ring are `#1E3D4C` and `#A0522D` on white or off-white, 5.4:1 and above against a 3:1 requirement. The back button is white on navy, 11.4:1 at its boundary. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers; the fixed heights are on empty writing boxes, which contain no text. |
| 2.1.1 Keyboard | A | Pass | See section 4. |
| 2.1.2 No keyboard trap | A | Pass | No modal, no focus management script, nothing that captures Tab. |
| 2.4.1 Bypass blocks | A | Pass | Skip link first in the tab order on every page. |
| 2.4.2 Page titled | A | Pass | Titles are unique and week-specific where the page is week-specific. |
| 2.4.3 Focus order | A | Pass | See section 4. |
| 2.4.6 Headings and labels | AA | Pass | Heading hierarchy runs h1, h2, h3 with no skipped levels. Repeated sheet titles carry a visually hidden patient name so no two landmarks share an accessible name. |
| 2.4.7 Focus visible | AA | Pass | 3 px solid `#A0522D` at 3 px offset, on every focusable element, verified by measurement rather than by reading the stylesheet. |
| 2.4.11 Focus not obscured | AA | Pass | No sticky headers or fixed overlays on any of these pages. |
| 2.5.8 Target size, minimum | AA | Pass | All controls 44 px tall or more, except two noted in section 4 that meet the inline and the enclosing-control exceptions. |
| 3.1.1 Language of page | A | Pass | `lang="en"` on every page. |
| 3.2.3 Consistent navigation | AA | Pass | The Canvas back bar is identical on every standalone page, and its button is now white on navy everywhere. It had drifted to navy on gold, 3.93:1, on two pages, which was a real AA failure. |
| 3.3.2 Labels or instructions | A | Pass | The entry point picker is a real `fieldset` with a `legend` and real radios with `for`/`id` label association. |
| 4.1.2 Name, role, value | A | Pass | No custom widgets. Everything is a native control. |

Other standing requirements from the global instructions:

- **Reduced motion.** `prefers-reduced-motion: reduce` disables all transitions on the new and rebuilt pages. The only motion anywhere is a 200 ms card lift on hover.
- **Forced colors.** `forced-colors: active` gives cards, boxes and tables a `CanvasText` border so structure survives Windows high contrast.
- **No italics.** `em, i, cite, dfn, var` render bold, not slanted, on every page. Verified at runtime: zero elements compute to `font-style: italic` in the rendered chart book.
- **No bookend bars.** Cards are white on off-white, lifted by shadow only. No accent bars, no decorative rules at section tops or bottoms.
- **iframe height sender.** Present before the closing body tag on all three standalone pages, posting `{frame, id, height}` with a `ResizeObserver` plus `load` and `resize` listeners.
- **target="\_top".** On every internal and same-domain link, so a link inside a Canvas iframe does not open the course inside itself.

## 3. Color contrast audit

Ratios computed from the rendered pages, not from the stylesheet, so inherited and cascaded colors are the ones measured. Thirty-seven distinct text-and-background pairs in the chart book, twenty-one in the analysis page, thirty-five in the weekly entry page. Every pair passes AA. The table lists every pair that does not also reach AAA, plus the main body pairs for reference.

| Foreground | Background | Ratio | Where | AA | AAA |
|---|---|---|---|---|---|
| `#1E3D4C` navy | `#FAFAF9` off-white | 10.90:1 | All body text | Pass | Pass |
| `#1E3D4C` navy | `#FFFFFF` card | 11.39:1 | Card text, table cells | Pass | Pass |
| `#35505E` muted | `#FAFAF9` off-white | 8.11:1 | Subheads, hints, reference ranges | Pass | Pass |
| `#35505E` muted | `#FFFFFF` card | 8.47:1 | Same, on cards | Pass | Pass |
| `#1E3D4C` navy | `#EDF1F3` navy-tint | 10.03:1 | Table header cells | Pass | Pass |
| `#FFFFFF` white | `#1E3D4C` navy | 11.39:1 | Page header, back bar button | Pass | Pass |
| `#E6ECEF` | `#1E3D4C` navy | 10.15:1 | Header lede and meta | Pass | Pass |
| `#F0E4CC` | `#1E3D4C` navy | 8.69:1 | Header eyebrow | Pass | Pass |
| `#A0522D` terra-dark | `#FFFFFF` card | 5.62:1 | Eyebrows, section numbers, result flags, question numbers | Pass | **Fail** |
| `#A0522D` terra-dark | `#FAFAF9` off-white | 5.38:1 | Due lines, legends, inline links | Pass | **Fail** |

Non-text contrast, against the 3:1 requirement of 1.4.11:

| Element | Colors | Ratio |
|---|---|---|
| Focus ring | `#A0522D` on `#FAFAF9` | 5.38:1 |
| Focus ring | `#A0522D` on `#FFFFFF` | 5.62:1 |
| Table borders | `#1E3D4C` on `#FFFFFF` | 11.39:1 |
| Checkbox and writing box borders | `#1E3D4C` on `#FFFFFF` | 11.39:1 |
| Back bar button edge | `#FFFFFF` on `#1E3D4C` | 11.39:1 |

**Two colors deliberately not used as text.** Brushed gold `#B8924A` reaches only 2.90:1 on white and terra `#C2734D` only 3.60:1, so neither appears as text anywhere in these files. Gold is a border and accent color only, which is what `palettes.md` says it is for. The one place gold had drifted into text, the Canvas back button in `assignment-apply.html`, was navy on gold at 3.93:1 and was a real AA failure. It is now navy on white at 11.39:1.

## 4. Keyboard navigation, verified

Tab order was walked programmatically on each page and the focused element, its computed outline and its rendered size recorded at each step, rather than inferred from the stylesheet.

**`patient-chart-book.html`**: Skip to the chart, Back to Canvas modules, Print or save as PDF, This week's entry on screen, The end of term analysis. Five focusable elements, all 44 px tall or more, all with a visible 3 px ring. The book itself is printed matter and contains no controls, which is the design.

**`assignment-patient-analysis.html`**: Skip to the assignment, Back to Canvas modules. Two focusable elements. The checklist uses drawn boxes rather than form fields on purpose, because the page is printed and ticked by hand; nothing on it claims to be an input that is not one.

**`assignment-apply.html?week=9`**: Skip to the assignment, Back to Canvas modules, Course home, the entry point radio group, three disclosure summaries, and three links. All operable by keyboard; the radio group is a native `fieldset` so arrow keys move within it and Tab leaves it, which is correct radio behavior.

**The skip link is first on every page**, ahead of the Canvas back bar. It was second after the landmark fix and was moved.

**Two targets under 24 by 24 CSS pixels**, both meeting a documented exception:

1. The entry point radio inputs are 1 by 1 px and visually hidden, but each is wrapped by a label that is the full width of its card and 60 px tall, and the focus ring renders on the label. This is the enclosing-control case, not a small target.
2. The inline link "your patient chart" inside a sentence is 18 px tall. SC 2.5.8 exempts targets in a sentence or block of text.

## 5. Screen reader testing

**What was verified, and how.** Structure was verified from the accessibility tree rather than by ear: heading levels in order with none skipped, every table exposing column and row headers, every landmark carrying a unique accessible name, every section labeled by its own heading, no element with an empty accessible name. axe-core's `empty-table-header`, `landmark-unique`, `region`, `heading-order`, `label`, `aria-**` and `table-**` rules all pass on all four pages. The blank rows in the flowsheets, which are deliberately empty so a student can name a test, carry a visually hidden row header reading "Blank row, for a test this week adds that is not listed", so a screen reader user is told what the empty row is for instead of hearing nothing.

**What was not done.** No manual pass with NVDA, JAWS or VoiceOver has been run on these four pages. That is the outstanding item in section 6 and it should happen before Week 9 opens, because the Week 9 to 15 pages are the ones carrying the dense results tables.

## 6. Known limitations and the plan

**1. Terra-dark does not reach AAA for small text.** `#A0522D` on white is 5.62:1. AA needs 4.5:1 and AAA needs 7:1, so every eyebrow, section number and result flag in the palette's accent color is AA and not AAA. Reaching AAA would need terra-dark around `#8A4523`, which changes the brand across the whole teaching stack, not just these four files. **Plan:** leave it. Record it here, raise it if the MedMasters reconciliation reopens the palette. Nothing load-bearing depends on those elements: every result flag is also a word in its own column, and every eyebrow duplicates information in the heading beneath it.

**2. No manual screen reader pass.** As above. **Plan:** one pass with VoiceOver on the chart book and on `assignment-apply.html?week=9`, before Week 9 opens on November 2. The two things to listen for are whether the results tables announce the reference range column usefully, and whether fifteen week pages in one document are navigable by heading without becoming a wall.

**3. DM Sans is not available in this repo.** The global instruction sets DM Sans for eyebrow text. `assets/fonts-site.css` self-hosts Open Sans and Plus Jakarta Sans only, deliberately, so that pages render identically with no network, inside Canvas, and behind a campus filter that blocks Google. These pages use Plus Jakarta Sans for eyebrows rather than adding a third self-hosted family or reaching out to a CDN. **Plan:** if DM Sans is wanted, it gets added to `fonts-site.css` as a base64 woff2 subset in one change, and every page picks it up at once.

**4. Print is verified by stylesheet, not by paper.** The print rules were written and reviewed but the chart book has not been printed. It is about forty sheets per student. **Plan:** print one copy of the Patient A half before releasing it, and check that the vitals flowsheet fits its nine columns inside a letter portrait page at the set font size.

**5. The analysis page is not in Canvas yet.** `assignment-patient-analysis.html` is linked from the chart book and from `assignment-patient-chart.html`, but no Canvas module or course navigation page points at it. **Plan:** add it to the Week 15 module and to the course tools page. The iframe snippet is in the drop notes.

## 7. Reviewer

Reviewed by Claude, September 21, 2026, using axe-core in headless Chromium plus programmatic contrast, focus and tab order measurement on the rendered pages.

Not yet reviewed by a human with a screen reader. Section 6 item 2 is the gap.
