# Accessibility compliance notes: Your weekly path through physiology

## 1. Project, files, date

BIO 005 Human Physiology, Yuba College, Fall 2026. A one screen overview of the seven
steps every week of the course follows, built to be embedded as an iframe in Canvas and
to print on one landscape page.

File covered: `weekly-path.html`.

Date: September 14, 2026.

## 2. WCAG version and level

Target: WCAG 2.2 AA as the floor, AAA where achievable.

| Criterion | Level reached | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | One h1, one h2 for the path, one h3 per step and per note. The seven steps are a real `ol`, the three notes a real `ul`, and each step's detail is a real `ul` inside its card. No layout tables. |
| 1.3.2 Meaningful sequence | AA | DOM order is the step order, one through seven, then the three notes, then the closing line. The visual left-to-right order matches it at every breakpoint. |
| 1.4.1 Use of colour | AA | Each step carries its number as text in a circle and its name as a heading. The chevrons between cards are CSS pseudo-elements and decorative; remove every one and the sequence still reads from the numbers and the reading order. |
| 1.4.3 / 1.4.6 Contrast | AAA | See section 3. Every pair is above 7:1. |
| 1.4.4 Resize text | AA | No fixed heights on text; cards grow with content and equalize by grid stretch. |
| 1.4.10 Reflow | AA | Checked at 1320, 1100, 800 and 400px: seven columns, then four, then two, then one. No horizontal scroll at any width. |
| 1.4.12 Text spacing | AA | Line height 1.35 to 1.6 throughout, no clipped text containers. |
| 2.1.1 Keyboard | AA | Two focusable elements, both native links: the skip link and Back to Canvas modules. Nothing needs a mouse. |
| 2.4.1 Bypass blocks | A | Skip link to `#main` is the first focusable element. |
| 2.4.4 Link purpose | AAA | Both links name their destination. |
| 2.4.7 Focus visible | AA | 3px terra focus ring, offset 3px. No outline is removed. |
| 2.5.5 / 2.5.8 Target size | AAA | The Back to Canvas modules chip is 44px tall. |
| 3.1.5 Reading level | AAA where practical | Short sentences, plain language, one idea per bullet. |
| 3.2.5 Change on request | AAA | Nothing moves, opens or refreshes on its own. The card lift on hover is a transform only, and it is disabled under `prefers-reduced-motion`. |

Not applicable: no images beyond decorative SVG, no forms, no media, no timed content.

## 3. Colour contrast audit

Measured with the WCAG relative luminance formula.

| Text | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| Navy `#0B1530` body and bullets | White `#FFFFFF` | 18.04:1 | pass | pass |
| Navy on the page ground | Off-white `#FAFAF9` | 17.45:1 | pass | pass |
| Muted `#4A5265` supporting text | Off-white | 8.05:1 | pass | pass |
| Terra dark `#6E2D24` step subtitle | White | 10.18:1 | pass | pass |
| Terra `#8B3A2E` in the section heading | Off-white | 7.41:1 | pass | pass |
| White numeral | Terra `#8B3A2E` circle | 7.66:1 | pass | pass |
| White masthead text | Navy `#0B1530` | 18.04:1 | pass | pass |
| Gold `#C9A14A` eyebrow | Navy `#0B1530` | 7.46:1 | pass | pass |
| Navy on the back chip | Gold `#C9A14A` | 7.46:1 | pass | pass |
| White closing line | Navy `#0B1530` | 18.04:1 | pass | pass |
| White Submit mark | Navy `#0B1530` | 18.04:1 | pass | pass |

The 1px `rgba(11,21,48,.15)` card borders and the payoff rule are separators carrying no
meaning, so they fall outside 1.4.11.

## 4. Keyboard navigation

Two tab stops, both native links, in reading order. No focus traps, no positive tabindex.
Canvas supplies its own skip link, landmarks and navigation around the iframe.

## 5. Screen reader testing

Checked with the Chromium accessibility tree:

- The h1 names the page, and the h2 names the list that follows it.
- The seven steps announce as an ordered list with seven items, and each item opens with
  its step name as an h3, so heading navigation walks the sequence.
- Each step's bullets announce as a nested list with a count.
- The number circles, the step icons, the chevrons between cards and the course mark all
  carry `aria-hidden="true"`, so nothing decorative is read out. The step numbers are
  also carried by the ordered list itself.
- The Submit mark on step 6 is real text, not an icon alone, so it is announced.

A live test with VoiceOver in Safari inside Canvas is still to be done by the reviewer.

## 6. Known limitations and remediation

- Canvas strips `<script>` from a pasted page, so the Canvas iframe carries a fixed height
  and the page's own height sender has no listener there. The sender stays in the file for
  the course site and Kajabi.
- The print stylesheet sets Letter landscape and is tuned to fit one page at the current
  wording. Adding more than about four bullets to a step, or a fifth line to a note, will
  push it to a second page. Check the print preview after any copy change.
- The chevrons between cards are dropped in print and at phone width, where the cards
  stack and the numbers do the work on their own.
- The page states the course's general weekly shape. It is not a substitute for a given
  week's own step pages, which carry the actual due dates and submission links.

## 7. Reviewer

Built and checked by Claude for Dr. Sharilyn Rennie, September 14, 2026. Final in-Canvas
review with a screen reader: Dr. Sharilyn Rennie.
