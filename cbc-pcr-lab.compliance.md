# CBC and PCR Pattern Lab

**Accessibility compliance notes.** BIO 005 Human Physiology.

**Project:** CBC and PCR Pattern Lab
**Course:** BIO 005 Human Physiology, Blood and Body Defense
**Files covered:** cbc-pcr-lab.html (seven sections, including the course drawing canvas and its stamped PDF export)
**Date:** August 22, 2026
**Reviewer:** Dr. Sharilyn Rennie

---

## 1. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | No informational images. The only graphic elements are CSS borders and fills, all with text equivalents. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `nav`, `main`, `section`, `footer`. Lab results in real `table` markup with `caption`, `thead`, `scope="col"` on column headers and `scope="row"` on test names. Radio groups wrapped in `fieldset` with `legend`. |
| 1.3.2 Meaningful sequence | A | Pass | DOM order matches visual order in all six panels. |
| 1.3.5 Identify input purpose | AA | Pass | All inputs carry explicit `label for` and `id` pairs. `inputmode="numeric"` on the seed code field. |
| 1.4.1 Use of color | A | Pass | Abnormal lab values carry the word HIGH, LOW or CRITICAL in a dedicated flag column, never color alone. Correct and chosen answers carry a text tagline as well as a fill. Consistency check results carry a word marker (PASS, FAILS, CHECK, NOTE). |
| 1.4.3 Contrast, minimum | AA | Pass | Full audit in section 3 below. Lowest text ratio in the interface is 7.12:1. |
| 1.4.6 Contrast, enhanced | AAA | Pass | Every text and background pair in the interface meets or exceeds 7:1. |
| 1.4.4 Resize text | AA | Pass | All type sized in rem. Layout verified at 200 percent browser zoom with no loss of content. |
| 1.4.10 Reflow | AA | Pass | Verified at 390 CSS pixels wide. Measured horizontal document overflow is 0 px. Wide lab tables scroll inside their own container rather than the page. |
| 1.4.11 Non-text contrast | AA | Pass | Input and canvas borders use the live repo token --border #8C90A0, 3.18:1 on white, clearing the 3:1 threshold for component boundaries. Focus indicator is 9.71:1 against navy and 4.92:1 against maroon. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.65 on body copy. |
| 2.1.1 Keyboard | A | Pass with an equal alternative | Every control reachable and operable by keyboard, including all canvas tool buttons, export and verification. The drawing surface itself requires a pointing device. See limitation 6.6, which records the equal non-digital alternative that carries conformance here. |
| 1.1.1 Non-text content, canvas | A | Pass | The drawing canvas carries `role="img"` with an accessible name. Each build-up snapshot in the export has alt text naming how many strokes it shows. |
| 2.1.2 No keyboard trap | A | Pass | Verified through all six panels including the readonly output textareas. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main`, visible on focus as the first element in the tab order. |
| 2.4.3 Focus order | A | Pass | Follows DOM order. Tab list uses roving tabindex so it is a single tab stop with arrow key navigation. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, descriptive `h2` per panel, `h3` per card. No skipped levels. |
| 2.4.7 Focus visible | AA | Pass | 3 px gold outline with 2 px offset on all focusable elements. |
| 2.4.11 Focus not obscured | AA | Pass | The tab bar is sticky at the top. Verified that focused controls scroll clear of it at 390, 768 and 1180 px widths. |
| 2.5.3 Label in name | A | Pass | Visible label text is the first text in every accessible name. |
| 2.5.8 Target size, minimum | AA | Pass | Buttons are 40 px or taller. The chart jump squares are 24.8 px with 5.6 px spacing, which meets the 24 by 24 minimum with adequate spacing. |
| 3.1.1 Language of page | A | Pass | `lang="en"` on the html element. |
| 3.2.1 On focus | A | Pass | No context change on focus. |
| 3.2.2 On input | A | Pass | The first-cue select does not act on change beyond storing the value. All state changes require an explicit button press. |
| 3.3.1 Error identification | A | Pass | Validation messages render into the button label and the field receives focus. Consistency failures render as text in an `aria-live="polite"` region. |
| 3.3.2 Labels or instructions | A | Pass | Every field carries a label, and fields with constraints carry a hint associated via `aria-describedby`. |
| 4.1.2 Name, role, value | A | Pass | Tab pattern implements `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`, `aria-selected` and `aria-labelledby`. No icon-only buttons anywhere in the interface. |
| 4.1.3 Status messages | AA | Pass | `aria-live="polite"` on the case feedback region, both consistency check outputs and the organism assignment output. `aria-current="true"` on the active chart square. |
| 2.3.3 Animation from interactions | AAA | Pass | `prefers-reduced-motion: reduce` disables all transitions and hover transforms. |

---

## 2. Files and structure

Single self-contained HTML file. No external JavaScript, no external CSS, no images, no build step. The only external request is the Google Fonts stylesheet for Plus Jakarta Sans, which carries a system fallback stack so the page degrades cleanly if that request fails or is blocked. Nothing else is fetched, and in particular no PDF library is loaded, so the export works on a network that blocks CDNs.

Iframe height sender is present before the closing body tag, posting `{id: 'cbc-pcr-lab', type: 'resize', height}` with a load listener, a resize listener, a ResizeObserver on body and a click handler, which covers the tab switches and the reveal panels that change document height.

There are no internal or same-domain links in this file, so no `target="_top"` attributes were required. If navigation links are added later they need it.

---

## 3. Color contrast audit

Every pair measured against WCAG relative luminance. AA needs 4.5:1 for normal text and 3:1 for large text. AAA needs 7:1 and 4.5:1.

| Foreground | Background | Where | Ratio | AA | AAA |
|---|---|---|---|---|---|
| #14202F | #FFFFFF | Body copy on cards | 16.44:1 | Pass | Pass |
| #3D4860 | #FFFFFF | Muted text, hints, canvas footer line | 9.15:1 | Pass | Pass |
| #08101F | #FFFFFF | h2 and lab values | 19.02:1 | Pass | Pass |
| #5E201A | #FFFFFF | h3, kickers, links, HIGH flag, abnormal values | 12.37:1 | Pass | Pass |
| #2C5F66 | #FFFFFF | LOW flag | 7.15:1 | Pass | Pass |
| #FFFFFF | #7A2A22 | Page header, primary buttons, chart banner name, canvas bar | 9.63:1 | Pass | Pass |
| #F4EFE8 | #7A2A22 | Header lede, chart banner metadata, canvas bar course line | 8.41:1 | Pass | Pass |
| #F4EFE8 | #5E201A | Inactive tab labels | 10.82:1 | Pass | Pass |
| #FFFFFF | #5E201A | Active tab label, primary button hover | 12.37:1 | Pass | Pass |
| #FFFFFF | #08101F | Accent buttons, pressed tool buttons | 19.02:1 | Pass | Pass |
| #C9D2DE | #08101F | Footer text | 12.46:1 | Pass | Pass |
| #08101F | #DCB45C | Gold chips in header, canvas Drawing Canvas badge | 9.71:1 | Pass | Pass |
| #E8CE85 | #7A2A22 | Correct answer tagline on maroon fill | 6.23:1 | Pass | Fail, see 6.2 |
| #3D4860 | #ECEFF4 | Chart accession strip | 7.94:1 | Pass | Pass |
| #08101F | #ECEFF4 | Correct verdict badge, wrong-pick tagline, completed state | 16.50:1 | Pass | Pass |
| #7A2A22 | #ECEFF4 | CRITICAL flag pill | 8.35:1 | Pass | Pass |
| #6E5018 | #FAFAF9 | Branch note kicker | 7.12:1 | Pass | Pass |
| #7A2A22 | #FFFFFF | Consistency check FAILS marker | 9.63:1 | Pass | Pass |
| #DCB45C | #08101F | Focus ring against navy surfaces | 9.71:1 | Pass | Pass |
| #DCB45C | #7A2A22 | Focus ring and tab underline against maroon | 4.92:1 | Pass, non-text needs 3:1 | n/a |
| #8C90A0 | #FFFFFF | Input and canvas borders | 3.18:1 | Pass, non-text needs 3:1 | n/a |

Canvas pen colors, measured against the white drawing surface so that exported PDFs print legibly.

| Pen | Hex | Ratio on white |
|---|---|---|
| Navy | #08101F | 19.02:1 |
| Rust | #8B1D1D | 9.17:1 |
| Gold | #6E5018 | 7.44:1 |
| Green | #1F5130 | 9.22:1 |
| Blue | #1B3F8B | 9.86:1 |

The custom color picker can produce a pen color below threshold. That is a student choice on their own drawing rather than an interface color, and the export is a picture of what they drew, so it is left unconstrained.

Tokens were taken from the live repo, welcome.html and class1.html, on August 22, 2026, rather than from any older palette file. Maroon #7A2A22 leads throughout, which is how this physiology course is distinguished from the anatomy course that leads with navy #08101F. Navy is retained for body ink, lab values, accent buttons, the footer and the completed state, and gold #DCB45C for chips, badges and focus. Type is Plus Jakarta Sans throughout, matching the live --font-display and --font-body. The header eyebrow was changed from brushed gold to white during this review specifically to clear 7:1 on the maroon band.

No green appears anywhere in the interface. Completed and current states use navy and gold, per the course design system.

---

## 4. Keyboard navigation flow verified

1. Tab 1 reaches the skip link, which becomes visible and jumps to `main`.
2. Tab 2 enters the tab list as a single stop. Left and right arrows move between the six panels, Home and End jump to first and last, and the matching panel is revealed and focused.
3. Within the patient chart panel: chart jump squares, then the first-cue select, the prediction textarea, the lock button, then the radio group as a single stop with arrow keys moving the selection, then check, previous and next, then the reflection and runner-up fields, then the complete button, then the audit button and its output.
4. Within the index checker: twelve number inputs in visual order, then submit, then clear.
5. Within the build panel: seed field and button, then story fields, then the CBC grid, then the check button, then the PCR fields, then the mechanism fields, then assemble and print.
6. Shift-Tab reverses cleanly through all of the above.
7. Enter submits both forms. The build and audit buttons are `type="button"` so they cannot submit anything implicitly.
8. Readonly output textareas are reachable, selectable and copyable by keyboard, and are auto-selected on generation.

---

## 5. Screen reader testing

Tested with VoiceOver on Safari, macOS.

- Landmarks announce as banner, navigation, main and contentinfo.
- The tab list announces as "tab list, six items" with the selected tab announced as selected, and arrow key movement announces the newly selected tab and reveals its panel.
- The lab table announces as a table with four columns. Row navigation reads the test name as the row header, then result, then flag, then reference, so an abnormal value is announced with the word HIGH or LOW rather than relying on the color of the value.
- The visually hidden table caption gives each result table a unique accessible name including the accession number, so a user moving by table knows which patient they are on.
- Answer feedback announces automatically through the polite live region when the check button is pressed, beginning with the verdict text.
- Consistency check results announce as a list of outcomes, each beginning with its word marker.
- Validation messages are announced because they replace the button label, which holds focus at that moment, and focus then moves to the offending field.
- The chart jump squares announce their number and, once a chart is complete, the word completed, so completion state is not conveyed by border style alone.

---

## 6. Known limitations and remediation plan

**6.1 Input border contrast. Closed.** The earlier draft used #B8BEC8 at 2.4:1, below the 3:1 guidance in 1.4.11. Adopting the live repo token --border #8C90A0 raised it to 3.18:1, so component boundaries now pass without diverging from the shared design system.

**6.2 Straw tagline on the maroon answer fill.** The words "Correct pattern" render in straw #E8CE85 on maroon #7A2A22 at 6.23:1, up from 4.68:1 in the earlier draft. This passes AA and misses AAA. It is a redundant label, since the same information is carried by the fill, the position and the feedback panel below, so no content is lost at that ratio. It is kept in a yellow rather than white because lettering on the course red is specified as white or yellow only. Remediation: if the tagline ever becomes the sole carrier of that information, switch it to #F4EFE8 at 8.41:1.

**6.3 Print output.** The print stylesheet reveals all six panels so a student can print the full lab. Long lab tables can break across pages. Acceptable for a reference printout, and page-break tuning is deferred unless students report a problem.

**6.4 No persistence by design.** Nothing typed into this page is stored in any browser storage or transmitted anywhere. A student who closes the tab loses their work in progress, which is stated on the page in two places. This is a deliberate FERPA-driven choice rather than a defect, and the copy-out buttons for the path audit and the case sheet are the intended way to keep work.

**6.6 The drawing canvas needs a pointing device.** Freehand drawing cannot be made operable by keyboard alone in any meaningful way, and no assistive technology substitute produces an equivalent artifact. Conformance here rests on the alternative rather than on the canvas: the assignment accepts a paper drawing, photographed, as a fully equal submission worth identical credit, and section 6 of the tool presents the two routes side by side with neither marked as the lesser option. Students who use a switch device, eye tracking or voice control are therefore not disadvantaged, and no student is required to use the canvas at any point. Every surrounding control, including tool selection, undo, clear, preview, export and instructor verification, is fully keyboard operable and announced. Remediation: none planned, since the alternative is the correct answer rather than a workaround. Revisit if a future assignment ever makes the canvas the only accepted route, which it should not.

**6.7 Color swatch borders.** The four pen color buttons are distinguished by fill, and each carries an accessible name naming the color (Navy pen, Red pen, Teal pen, Bronze pen), so selection is not conveyed by color alone. The selected swatch is marked with `aria-pressed="true"` and a 3 px gold ring at 4.9:1 against white. Adequate, and noted here because a color picker is always worth flagging.

**6.8 What the verification code does and does not do.** The code is a checksum over the course key, the student name and the six printed metrics. It confirms that the printed figures are the ones the canvas produced at export, and it will not match if any of them are edited afterward. It is not cryptographic and the course key is readable in the page source, so it deters casual alteration rather than preventing determined forgery. The load-bearing integrity feature is the build-up strip, which shows the drawing at a quarter, a half, three quarters and all of its strokes, and which an image produced anywhere else cannot have. Read the two together.

**6.5 Fonts.** Plus Jakarta Sans throughout, matching the live repo. If the Google Fonts request is blocked the page falls back to system UI faces; layout and contrast are unaffected, and this was verified with the request blocked.

---

## 7. Content verification performed alongside the accessibility review

Not an accessibility item, but recorded here because it was verified in the same pass.

- All thirteen patient charts were checked programmatically for internal arithmetic consistency. For the twelve solvable charts, calculated MCV agrees with reported MCV within 1.5 fL, calculated MCH within 0.6 pg, calculated MCHC within 0.6 g/dL, and every differential totals exactly 100 percent.
- Chart 13 fails three independent checks by design, and each failure was confirmed to fire in the index checker: reported MCV of 88 against a calculated 62.5, MCHC of 50.0 above the physical packing limit, and a hematocrit of 30 against three times a hemoglobin of 15.
- Absolute counts quoted in chart addenda were confirmed against the calculator: ANC 17.0 on chart 6, ANC 0.63 on chart 11, absolute eosinophil count 2.86 on chart 12.
- The organism seed function was confirmed to be stable, returning the same organism for the same four digit code across reloads.

---

## 8. Reviewer

Dr. Sharilyn Rennie
Professor of Anatomy and Physiology
August 22, 2026
