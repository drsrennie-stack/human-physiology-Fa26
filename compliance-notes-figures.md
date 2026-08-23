# Accessibility compliance notes

**Project:** BIO 005 Human Physiology, figure tooling
**Files covered:** `loop-switcher.html`, `label-kit.html`
**Date:** August 23, 2026
**Standard:** WCAG 2.2. Level AA is the floor. AAA achieved on every text pair except where noted.

---

## 1. What these files are

`loop-switcher.html` is an interactive figure. One negative feedback loop, five sets of labels: the generic parts, body temperature, blood glucose, blood pressure, plasma calcium. Selecting a system refills the same boxes.

`label-kit.html` is an authoring tool. It puts real text labels on top of unlabeled generated art, and outputs a finished figure block for a notes page or a slide.

Both are self contained. Neither depends on a stylesheet, script or image outside itself, apart from the Google font, which has a full fallback stack.

---

## 2. Criteria and level achieved

| Criterion | Level | Result |
|---|---|---|
| 1.1.1 Non-text content | A | Pass. The SVG in the loop switcher carries `role="img"` and a `<title>` that changes with the loop. Every label in the loop is also present as real text in a mirrored table. The label kit's art carries author supplied `alt`, and every overlay label appears again in a text list under the figure. |
| 1.3.1 Info and relationships | A | Pass. Real `<table>` with `<th scope="row">`, real `<figure>` and `<figcaption>`, `<main>` landmark, heading order h1 to h2 to h3 with no skips. |
| 1.3.2 Meaningful sequence | A | Pass. DOM order matches visual order. The overlay SVG is `aria-hidden` so labels are read once, from the text list, not twice. |
| 1.4.3 Contrast, minimum | AA | Pass, see section 3. |
| 1.4.6 Contrast, enhanced | AAA | Pass on every text pair. |
| 1.4.10 Reflow | AA | Pass. No horizontal page scroll at 320 px. The diagram and the art plate each scroll inside their own container so the page body never does. |
| 1.4.11 Non-text contrast | AA | Pass. Every box outline, leader line, control border and focus ring is at or above 3:1 against its background. |
| 1.4.12 Text spacing | AA | Pass. No fixed heights on text containers. |
| 2.1.1 Keyboard | A | Pass. Full tab list keyboard pattern: arrow keys move between loops, Home and End jump to the ends, only the selected tab is in the tab order. The label kit's button and text area are reachable and operable. |
| 2.1.2 No keyboard trap | A | Pass. |
| 2.4.3 Focus order | A | Pass. |
| 2.4.6 Headings and labels | AA | Pass. |
| 2.4.7 Focus visible | AA | Pass. 3 px navy outline, 3 px offset, on every focusable element. |
| 2.4.11 Focus not obscured | AA | Pass. No sticky or overlapping elements. |
| 2.5.8 Target size, minimum | AA | Pass. Every loop tab is at least 44 px tall. The Copy button is 44 px. |
| 3.2.1 On focus | A | Pass. Focus alone never changes the loop. Selection requires a click or an arrow key. |
| 4.1.2 Name, role, value | A | Pass. `role="tablist"`, `role="tab"` with `aria-selected` and `aria-controls`, a single `role="tabpanel"` whose `aria-labelledby` follows the selected tab. |
| 4.1.3 Status messages | AA | Pass. A visually hidden `role="status"` region announces which loop is now showing, without moving focus. |
| 2.3.3 Animation from interactions | AAA | Pass. `prefers-reduced-motion` disables all transitions. |

Automated check: axe-core 4.x, rule sets wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa and best-practice. **0 violations on both files.**

---

## 3. Color contrast audit

Measured, not estimated. Ratios computed from the WCAG relative luminance formula.

### loop-switcher.html

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Box label navy `#08101F` | white `#FFFFFF` | 19.02 | AAA |
| Box label navy `#08101F` | navy tint `#ECEFF4` | 16.50 | AAA |
| Role label gold `#624612` | white `#FFFFFF` | 8.73 | AAA |
| Role label gold `#624612` | navy tint `#ECEFF4` | 7.58 | AAA |
| Arrow label maroon `#5E201A` | white `#FFFFFF` | 12.37 | AAA |
| Tab text navy `#08101F` | white `#FFFFFF` | 19.02 | AAA |
| Selected tab white `#FFFFFF` | maroon `#7A2A22` | 9.63 | AAA |
| Table row header `#5E201A` | off white `#FAFAF9` | 11.85 | AAA |
| Body and caption `#3D4759` | off white `#FAFAF9` | 8.96 | AAA |
| Note text navy `#08101F` | gold pale `#F7EFD9` | 16.58 | AAA |
| **Non-text** navy box outline `#08101F` | white | 19.02 | Pass, 3:1 needed |
| **Non-text** sensor box outline `#8A6D33` | white | 4.87 | Pass |
| **Non-text** effector box outline `#7A2A22` | white | 9.63 | Pass |
| **Non-text** unselected tab border `#7C8798` | white | 3.64 | Pass |

### label-kit.html

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Overlay label `#08101F` | white halo on art | 19.02 | AAA |
| Step number navy `#08101F` | gold disc `#DCB45C` | 9.71 | AAA |
| Key list text navy `#08101F` | white | 19.02 | AAA |
| Button white | maroon `#7A2A22` | 9.63 | AAA |
| Button white, hover | maroon dark `#5E201A` | 12.37 | AAA |
| **Non-text** leader line `#08101F` | white | 19.02 | Pass |
| **Non-text** anchor dot `#7A2A22` | white | 9.63 | Pass |
| **Non-text** step disc border `#5C4110` | white | 9.47 | Pass |
| **Non-text** text area border `#7C8798` | white | 3.64 | Pass |

Every overlay label carries a white halo behind it via `paint-order: stroke`, so a label keeps its contrast even where it crosses a filled region of the art.

Card borders and table row separators use `#A3ACBA`, which is 2.29:1 against white. These are decorative separators. The information they sit around is conveyed by table semantics and layout, so 1.4.11 does not apply to them. They were lightened deliberately so they do not compete with the diagram.

---

## 4. Keyboard navigation verified

**loop-switcher.html**
Tab reaches the selected loop tab. Left and right arrows, and up and down arrows, move the selection and the focus together. Home selects the first loop, End the last. Tab again moves into the panel, which is focusable so a keyboard user can scroll the diagram horizontally. Tab again leaves the figure. Unselected tabs are removed from the tab order, so the loop selector is one stop, not five.

**label-kit.html**
Tab reaches the Copy figure block button, then the markup text area, which is read only and selectable. The coordinate readout is a status region and is never a tab stop, which is correct: it is output, not a control. The click to read coordinates feature is a convenience for the author and has a keyboard equivalent, which is typing the numbers directly into the `LABELS` array.

---

## 5. Screen reader testing

Verified with the accessibility tree as rendered by Chromium, and by inspecting computed roles and accessible names.

- The loop diagram is announced as an image with the name "Negative feedback loop, plasma calcium falling", and that name updates when the loop changes.
- The mirrored table is reached next and reads as seven rows, each announced as "Stimulus, Plasma calcium falls below the setpoint" and so on, so a student who cannot see the diagram gets the whole loop in order.
- Changing loops announces "Now showing plasma calcium falling" through the status region, without stealing focus.
- The overlay SVG in the label kit is `aria-hidden`, so labels are announced once, from the text list, rather than twice in unpredictable order.
- Landmarks: one `main`. Headings: h1, then h2, then h3, no skipped level.

**Not yet verified with a screen reader in the student's own environment.** See section 6.

---

## 6. Known limitations and remediation plan

1. **No test yet with JAWS, NVDA or VoiceOver on real hardware.** The accessibility tree is correct and the pattern is a standard one, but automated inspection is not the same as listening to it. Plan: test with VoiceOver on macOS and NVDA on Windows before the course opens on September 7, 2026.
2. **The loop diagram scrolls sideways below about 680 px.** The alternative was shrinking the text until it failed contrast and legibility at small sizes. The mirrored table carries the whole content at any width, so nothing is lost, but a phone user has to scroll the picture. Accepted, and revisit if student feedback says otherwise.
3. **Overlay label size scales with the figure.** On a very narrow screen the label kit's plate has a 620 px minimum width and scrolls, which sets a floor under the label size. Watch this on the first real labeled figure and raise the floor if labels read small.
4. **The Google font is a network request.** If it fails the page falls back to the system UI font stack, and the loop switcher re-measures its line breaks once fonts settle. No layout breaks either way.
5. **`icon.svg` must exist in the same folder** when these files are pushed to the repo, or the favicon 404s. Harmless, but tidy it up on push.

---

## 7. Reviewer

Prepared for Dr. Sharilyn Rennie, BIO 005 Human Physiology, Yuba College.
Automated audit: axe-core, 0 violations. Contrast ratios computed directly, not sampled.
Manual screen reader verification on student hardware is outstanding and is listed above.
