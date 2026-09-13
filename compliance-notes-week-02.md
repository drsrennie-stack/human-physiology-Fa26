# Accessibility compliance notes, Week 2

**Scope: this pass only.** This file covers the three Week 2 lecture files and nothing else. It does not replace `compliance-notes.md`, the course-wide record in the repo root, and it must not be uploaded under that name.

Naming follows the pattern already in the repo (`compliance-notes-site-nav.md`): one file per audited scope, so each pass adds a record instead of overwriting the last one.

## 1. Project

**Project:** BIO 005 Human Physiology, Week 2, Build the Molecular Toolkit
**Files covered:** `m02-slides.html`, `m02-notes.html`, `m02-chem-review.html`
**Institution:** Yuba College, Fall 2026
**Date:** September 13, 2026. Replaces the September 6 version, which covered two files.
**Reviewer:** Dr. Sharilyn Rennie (build and audit prepared for review)

---

## 2. WCAG version and level achieved

Target: WCAG 2.2 AA as the floor, AAA where achievable. All three files share one stylesheet pattern, so results apply to all three unless a row says otherwise.

| Criterion | Level | Result | Note |
|-----------|-------|--------|------|
| 1.1.1 Non-text content | A | Pass | No informational images. The drawing canvas is `aria-hidden` and is a recording aid, not content. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `nav`, `main`, `footer`, `section`. All 8 tables use `caption` with `th scope="col"` and `th scope="row"`. Equation keys are definition lists. Review checkboxes are real inputs wrapped in labels. |
| 1.3.2 Meaningful sequence | A | Pass | DOM order matches reading order. |
| 1.4.3 Contrast minimum | AA | Pass | See section 3. Lowest text pair is 5.62:1. |
| 1.4.4 Resize text | AA | Pass | Type in rem, layout relative, no fixed pixel heights on text containers. |
| 1.4.6 Contrast enhanced | AAA | Pass with one exception | Every text pair is 7:1 or better except the small uppercase block-tag label on the review page at 5.62:1. See section 7. |
| 1.4.10 Reflow | AA | Pass | Single column at narrow widths. All 8 tables sit in `overflow-x:auto` wrappers, so the body never scrolls sideways. |
| 1.4.11 Non-text contrast | AA | Pass | Control borders use `--ink-soft` at 9.56:1. Focus ring 11.1:1. Checkbox accent is maroon at 11.1:1. |
| 1.4.12 Text spacing | AA | Pass | Line height 1.6 to 1.65, no fixed-height text boxes. |
| 2.1.1 Keyboard | A | Pass by inspection | Every control is a real `button`, `a` or `input`. See section 4. |
| 2.1.2 No keyboard trap | A | Pass | No modals, no focus capture. |
| 2.4.1 Bypass blocks | A | Pass | Skip link first focusable element on all three files. |
| 2.4.2 Page titled | A | Pass | Three distinct descriptive titles. |
| 2.4.3 Focus order | A | Pass | Hidden slides use the `hidden` attribute, so their controls leave the tab order. |
| 2.4.6 Headings and labels | AA | Pass | One `h1` per file, no skipped levels on any of the three. Verified by parsing the full heading tree. |
| 2.4.7 Focus visible | AA | Pass | 3px maroon `:focus-visible` outline with 2px offset. |
| 2.4.11 Focus not obscured | AA (2.2) | Pass | Only the slide control bar is sticky, and focus moves downward into content. |
| 2.5.3 Label in name | A | Pass | Visible text is the accessible name. Pen swatches carry `aria-label` since they have no text. |
| 2.5.8 Target size minimum | AA (2.2) | Pass | Every control at least 32 by 32 CSS pixels. Pills 40px tall, swatches 32px, checkbox inside a padded label. |
| 3.1.1 Language of page | A | Pass | `lang="en"`. |
| 3.2.3 Consistent navigation | AA | Pass | Same brand bar and footer across all three files, and the footer now cross-links the three. |
| 3.3.2 Labels or instructions | A | Pass | The sorting activity prints upper and lower limits beside every value. The review page explains its triage method before the first block. |
| 4.1.2 Name, role, value | A | Pass | `aria-expanded` on every collapsible, `aria-pressed` on every toggle, `aria-controls` resolving to real ids. Verified: 0 dangling references, 0 unnamed buttons, 0 duplicate ids across all three files. |
| 4.1.3 Status messages | AA | Pass | Hidden `role="status"` region announces slide changes, reset and pen state. Sorting feedback inserted with `role="status"`. Definition panels `aria-live="polite"`. Review page tally updates in place. |

---

## 3. Color contrast audit

PRIMARY teaching palette with the physiology maroon substituted for navy. No sage. No cream.

| Foreground | Background | Ratio | Used for | Result |
|------------|-----------|-------|----------|--------|
| `#22201F` ink | `#FFFFFF` white | 16.22:1 | Body text on cards | AAA |
| `#22201F` ink | `#FAFAF9` page | 15.53:1 | Body text on page | AAA |
| `#6E1F2A` maroon | `#FFFFFF` white | 11.10:1 | Headings, links, button text, checkbox accent | AAA |
| `#6E1F2A` maroon | `#FAFAF9` page | 10.62:1 | Headings on page ground | AAA |
| `#4A4442` ink-soft | `#FFFFFF` white | 9.56:1 | Small print, equation keys, link-kind labels, control borders | AAA |
| `#FFFFFF` white | `#6E1F2A` maroon | 11.10:1 | Header band text, solid button text | AAA |
| `#F3D9AE` | `#6E1F2A` maroon | 8.11:1 | Eyebrow in the header band | AAA |
| `#F0E6E7` | `#6E1F2A` maroon | 9.08:1 | Subhead in the header band | AAA |
| `#6E1F2A` maroon | `#F2EAEB` maroon-tint | 9.38:1 | Completed states on the sorting activity and checked review blocks | AAA |
| `#FFFFFF` white | `#54161F` maroon-deep | 13.89:1 | Solid button hover | AAA |
| `#A0522D` terra-dark | `#FFFFFF` white | 5.62:1 | `h3` subheads at 19px weight 600, and the review page block-tag label at 13px | AAA for the subheads (large text), AA for the block tag |
| `#B8924A` gold | `#FFFFFF` white | 2.90:1 | Progress bar fill only. Never text, never a control boundary. | Decorative, exempt |

State is never carried by color alone. The sorting activity signals a correct answer three ways: tinted fill, solid maroon border, and a text message reading "Correct." A checked review block signals two ways: the checkbox state itself and the tally count above.

---

## 4. Keyboard navigation flow

Verified by structural inspection and an automated pass over the built files. A hands-on browser walkthrough is still outstanding, listed in section 7.

**Slide deck.** Skip link, Previous, Next, Pen, Reset, Print packet, then in-slide controls in reading order, then footer links. Arrow keys move between slides from anywhere except a text field, and there are none on this page. Previous and Next carry the real `disabled` attribute at the ends rather than being styled as disabled. Focus moves to the deck container after a slide change. Hidden slides carry `hidden`, so nothing inside them is reachable while hidden. Every reveal, clinical bar and definition term is a real button, so Enter and Space both work.

**Notes page.** Skip link, table of contents links, Show the answer buttons in reading order, in-page links, footer links.

**Review page.** Skip link, Clear my checkmarks, table of contents links, then per block: the checkbox, the Show the answer button, then the Khan Academy links. Every checkbox sits inside its own label, so the whole pill is a click and focus target.

The pen layer is progressive enhancement: off by default, canvas `aria-hidden`, and every task on the deck is completable without it.

---

## 5. Screen reader readiness

**No screen reader has been run against these files.** What follows is what was actually checked, and what a screen reader pass still needs to confirm.

Checked by parsing the built files:

| Check | Result across all three files |
|-------|-------------------------------|
| One `h1` per page, no skipped heading levels | Pass, 0 skips |
| Every `aria-controls` resolves to an existing element | Pass, 0 dangling |
| Every button has an accessible name | Pass, 0 unnamed |
| No duplicate ids | Pass |
| Every table has a caption and scoped headers | Pass, 8 of 8 |
| Every checkbox has a programmatic label | Pass |
| Landmarks present, navigation labelled | Pass |
| Status regions wired to slide change, reset, pen, sorting feedback and the review tally | Pass |
| Internal links `target="_top"`, external links `target="_blank" rel="noopener"` | Pass, 0 exceptions |
| No em dashes, no italic markup or CSS, Lora not referenced, no sage or cream | Pass, 0 occurrences of each |

Still to confirm with a screen reader: how the slide change announcement reads in practice, whether revealed answer text is picked up immediately after its button, and whether the checked review block state reads clearly.

---

## 6. Site build standards checked

- iframe height sender before the closing body tag on all three files, sending `{ id, frameHeight, height }` by `postMessage`, wired to `ResizeObserver`, load and resize, and fired again after every slide change, reveal and checkbox change.
- All internal and same-domain links carry `target="_top"`. All 28 external links (26 Khan Academy, 2 Canvas) carry `target="_blank" rel="noopener"`.
- Global footer on all three files, now cross-linking the three parts of the week.
- `prefers-reduced-motion` respected on all three.
- Print stylesheets reveal every slide and every hidden answer, so the packet prints complete.
- Review page browser storage uses the key `bio005-m02-chem-review`, correctly prefixed so it cannot collide with the anatomy repo on the shared GitHub Pages origin. Every read and write is wrapped in try/catch and the page renders correctly with no stored value.
- No content classification labels on any student-facing page. They live in `m02-coverage-map.md`.
- Student-facing byline is "Dr. Sharilyn Rennie" with no credential suffix.
- Every temperature in Celsius with Fahrenheit in parentheses.

### Khan Academy links

All 26 links on the review page were taken verbatim from live Khan Academy search results at build time on September 13, 2026. None were constructed or guessed. They were not individually opened in a browser, because Khan Academy renders its course pages in the browser and the page source returned no content to check against.

The review page tells students that Khan Academy is an outside resource, that nothing there is graded, and asks them to report a moved link. Khan Academy reorganizes course paths periodically, so a click-through before the week opens and again each term is worth the five minutes.

---

## 7. Known limitations and remediation plan

1. **Small label contrast.** The block tags on the review page ("Block 1" and so on) use terra-dark `#A0522D` at 5.62:1, which passes AA but not AAA for text under 18.66px. They are decorative wayfinding and the block number also appears in the table of contents. **Remediation for AAA everywhere:** change `.tag` color to `var(--maroon)`, which is 11.1:1. One line, no other effect. This is now the only element on any of the three files below AAA.

2. **Maroon hex not confirmed against the repo.** Set as `--maroon: #6E1F2A` and `--maroon-deep: #54161F` at the top of each file. If the repo differs, swap those two lines. Every figure in section 3 would need rechecking after a swap, and those two values are the only inputs.

3. **Manual testing outstanding.** Two passes are owed before publication: a hands-on keyboard walkthrough in a browser, and a screen reader pass. NVDA on Firefox and VoiceOver on Safari would cover most of your students.

4. **Drawing canvas is not an accessible input.** A recording aid, hidden from assistive technology, off by default, and nothing depends on it. No remediation planned.

5. **Review page state is per browser.** Checkmarks live in that browser only and are lost in a private window or on another device. That is acceptable because the page is optional and ungraded. If it ever becomes graded, the state would need to move somewhere durable.

6. **Content on an optional page.** Four chapter learning outcomes now sit on a page students are not required to open. This is a pedagogical decision rather than an accessibility one, but it has an accessibility dimension: a student who needs that material most is the least likely to seek it out. The mitigation built in is slide 5 of the deck, which names every assumed idea explicitly and links to the review, so nothing is silently missing. Worth watching in the first week.

---

## 8. Reviewer

Built and audited September 13, 2026. Submitted to Dr. Sharilyn Rennie for review and sign-off before publication.
