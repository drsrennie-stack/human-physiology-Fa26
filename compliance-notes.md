# Accessibility compliance notes

## 1. Project

**Project:** BIO 005 Human Physiology course build, Yuba College, Fall 2026. Section BIOL-5-D9286, fully asynchronous online.

**Files covered:**

- `index.html`
- `competency-map.html`
- `course-schedule.html`

**Date:** August 15, 2026

**Reviewer:** Dr. Sharilyn Rennie

This course is delivered entirely online. There is no in-person session where a student could ask for help in the moment, so accessibility is not a compliance checkbox here. It is the whole access path.

## 2. WCAG version and level achieved

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level | Status | Note |
|-----------|-------|--------|------|
| 1.1.1 Non-text content | A | Pass | The only images are inline SVG marks, each with `role="img"` and an accessible name. No raster images. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `main`, `section`, `nav`, `footer`, `article`, `table` with `th scope`, `caption` on the grading table. Lists are real lists. |
| 1.3.2 Meaningful sequence | A | Pass | DOM order matches visual order. Grid reflow does not reorder content. |
| 1.4.1 Use of color | A | Pass | The week-load bars are color-coded, and every bar also carries its minute count and competency count as text. Yield and DOK are tagged with words, not color alone. |
| 1.4.3 Contrast, minimum | AA | Pass | Every text pair audited below. Lowest text pair is 7.12:1. |
| 1.4.6 Contrast, enhanced | AAA | Pass | All text pairs at or above 7:1. |
| 1.4.10 Reflow | AA | Pass | All grids use `repeat(auto-fit, minmax(...))`. No horizontal scroll at 320px. |
| 1.4.11 Non-text contrast | AA | Pass | Form control and chip borders use `--rule-control #767E8C` at 4.09:1 on white. The decorative `--rule-soft` card border is not the only means of distinguishing a card; every card also carries a shadow. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line-height 1.6 body. |
| 2.1.1 Keyboard | A | Pass | Every control is a native `button`, `select`, `input`, `a`, or `details`. No custom widgets, no keyboard traps. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main` is the first focusable element on all three pages. |
| 2.4.2 Page titled | A | Pass | Each page titled with its purpose and the course. |
| 2.4.3 Focus order | A | Pass | Follows DOM order. |
| 2.4.6 Headings and labels | AA | Pass | One `h1` per page, no skipped levels (verified programmatically). Every input has a visible `label` tied by `for` and `id`. |
| 2.4.7 Focus visible | AA | Pass | 3px terra outline, 3px offset, on every focusable element. |
| 2.4.11 Focus not obscured | AA (2.2) | Pass | No sticky or overlaying elements. |
| 2.5.3 Label in name | A | Pass | Visible button text is the start of the accessible name. |
| 2.5.8 Target size | AA (2.2) | Pass | Smallest control is the flag button at 25px tall with 12px horizontal padding, inside a card with generous spacing. No control sits within 24px of another. |
| 3.1.1 Language of page | A | Pass | `lang="en"`. |
| 3.2.3 Consistent navigation | AA | Pass | Same header and footer pattern across all three pages. |
| 3.3.2 Labels or instructions | A | Pass | Every filter has a label. The facet chip group has a group label via `aria-labelledby`. |
| 4.1.2 Name, role, value | A | Pass | Toggle buttons carry `aria-pressed` and update it. Flag buttons carry an `aria-label` naming the competency. |
| 4.1.3 Status messages | AA | Pass | The result count uses `role="status"` with `aria-live="polite"`, so a screen reader announces the new count after a filter change without moving focus. |
| 2.3.3 Animation from interaction | AAA | Pass | `prefers-reduced-motion` disables all transitions and smooth scroll on all three pages. |

## 3. Color contrast audit

Computed with the WCAG relative-luminance formula. Every pair below is one that actually appears in the built pages.

### Text pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| Navy `#08101F` | White `#FFFFFF` | 19.02:1 | AAA |
| Navy `#08101F` | Off-white `#FAFAF9` | 18.21:1 | AAA |
| White `#FFFFFF` | Navy `#08101F` | 19.02:1 | AAA |
| Hero body `#E6E9EF` | Navy `#08101F` | 15.64:1 | AAA |
| Footer body `#C7CEDA` | Navy-darkest `#060A18` | 12.47:1 | AAA |
| Terra-dark `#6B1616` | White `#FFFFFF` | 11.99:1 | AAA |
| Stat label `#C7CEDA` | Stat fill `#111C31` | 10.75:1 | AAA |
| Gold `#DCB45C` | Navy-darkest `#060A18` | 10.08:1 | AAA |
| Gold `#DCB45C` | Navy `#08101F` | 9.71:1 | AAA |
| Navy `#08101F` | Gold `#DCB45C` | 9.71:1 | AAA |
| Terra `#8B1D1D` | White `#FFFFFF` | 9.17:1 | AAA |
| Ink-muted `#3D4860` | White `#FFFFFF` | 9.15:1 | AAA |
| Ink-muted `#3D4860` | Off-white `#FAFAF9` | 8.76:1 | AAA |
| Gold `#DCB45C` | Stat fill `#111C31` | 8.69:1 | AAA |
| Gold-text `#6E5018` | White `#FFFFFF` | 7.44:1 | AAA |
| Teal-text `#2C5F66` | White `#FFFFFF` | 7.15:1 | AAA |
| Gold-text `#6E5018` | Off-white `#FAFAF9` | 7.12:1 | AAA |

Lowest text pair in the build is 7.12:1, which clears AAA for normal text.

### Non-text and UI component pairs

| Element | Colors | Ratio | Level |
|---------|--------|-------|-------|
| Form control and chip borders | `#767E8C` on white | 4.09:1 | Passes 1.4.11 (needs 3:1) |
| Focus ring | Terra `#8B1D1D` on white | 9.17:1 | Passes |
| Card border `--rule-soft` | `#DCE0E6` on white | 1.35:1 | Decorative only. Cards are also distinguished by shadow, so the border is not the sole indicator. Documented in section 6. |

### Two fixes made during this audit

1. The competency id line was originally `#7B8598` on white at 3.72:1, which fails AA for small text. Changed to ink-muted `#3D4860` at 9.15:1.
2. Form control borders originally used the canonical `--rule #B8BEC8`, which is 1.87:1 on white and fails 1.4.11 for UI components. Added a dedicated `--rule-control #767E8C` token for control borders and left `--rule` for decorative separators, so the canonical palette token is unchanged.

## 4. Keyboard navigation flow verified

`competency-map.html`, tab order:

1. Skip link, to `#main`
2. Search input
3. Module select
4. Body system select
5. Yield select
6. Depth of knowledge select
7. Eight facet chips, each a toggle reporting `aria-pressed`
8. Show flagged only, toggle
9. Reset filters
10. Export what is shown
11. Flag button on each competency card, in reading order

Every filter change re-renders and announces the new count through the live region. Focus is not moved on re-render, so a keyboard user stays where they were.

`course-schedule.html`, tab order:

1. Skip link
2. The `details` summary on each of the 15 weeks, in order

Opening a week expands its competency list in place. No focus jump.

`index.html`, tab order: skip link, then the two course page links.

No keyboard traps. Escape is not needed anywhere because there is no modal or overlay on any page.

## 5. Screen reader testing

Verified structurally in Chromium via the accessibility tree, checking landmarks, heading order, accessible names, and live region wiring:

- One `h1` per page. No skipped heading levels on any page.
- Landmarks present: `banner` (header), `main`, `navigation` (index card list, labeled "Course build pages"), `contentinfo` (footer).
- All 137 flag buttons expose an accessible name of the form "Flag Negative feedback loops for review", so a screen reader user knows what a button flags without reading the surrounding card.
- The facet chip row is a `role="group"` labeled "Filter by how it is practiced" through a visually hidden label.
- The result count is a `role="status"` `aria-live="polite"` region.
- Every table has `th` with `scope`, and the grading table has a `caption`.

**Outstanding.** A pass with an actual screen reader (VoiceOver on Safari and NVDA on Firefox) has not been done yet. That is the remaining item before these pages go in front of students. Structural verification catches missing names and broken landmarks, but it does not catch a page that is technically correct and still exhausting to listen to.

## 6. Known limitations and remediation plan

| Limitation | Impact | Plan |
|------------|--------|------|
| No live screen reader pass yet | Structural checks pass, listening experience unverified | Run VoiceOver on Safari and NVDA on Firefox before the term opens. Priority is `course-schedule.html`, since that is the student-facing page. |
| Fonts load from Google Fonts | A blocked or slow font request falls back to the system stack, which changes rhythm slightly but breaks nothing | Acceptable. The fallback stack is specified on every rule. |
| `--rule-soft` card borders are 1.35:1 | Below the 3:1 non-text threshold | Not a violation, because the border is decorative and every card also carries a shadow, so the boundary is conveyed by more than the border. If a card is ever restyled to drop its shadow, the border has to move to `--rule-control`. |
| Flag state lives in browser storage | Flags do not follow you to another machine, and clearing site data loses them | By design. This is an instructor working tool and the CSV export is the durable copy. |
| Week-load bars have no text alternative as a chart | The chart shape is decorative | Each bar cell already carries its minute count and competency count as visible text, and the whole cell has a `title` naming the week and its dates, so no information exists only in the bar height. |
| Content is not final | The exam windows and grading weights are placeholders | Do not publish `course-schedule.html` to students until `PLACEHOLDERS.md` groups 1 and 2 are resolved. The page carries a visible draft banner until then. |

## 7. Student privacy

No page in this build stores, transmits, or displays a student name, id, email, or grade. The only persisted state anywhere is the instructor flag list in `competency-map.html`, which holds competency ids and nothing else.

## 8. Reviewer

Dr. Sharilyn Rennie
BIO 005 Human Physiology, Yuba College
