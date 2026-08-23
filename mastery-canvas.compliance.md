# Drawing Canvas, the mastery canvas replacement

**Accessibility compliance notes.** BIO 005 Human Physiology.

**Project:** Drawing Canvas, drop-in replacement for mastery-canvas.html
**Course:** BIO 004 Human Anatomy, and any course that passes its own course, title, key and list parameters
**Files covered:** mastery-canvas.html
**Date:** August 22, 2026
**Reviewer:** Dr. Sharilyn Rennie

---

## 1. What changed from the file currently live

| Area | Live file | This file |
|---|---|---|
| Palette | navy #1E3D4C, rust #A0522D, terra #C2734D, gold #B8924A | Live repo tokens: navy #08101F, terra #8B1D1D, terra-dark #6B1616, gold #DCB45C, page #FAFAF9, border #8C90A0, radius 8 and 16, shadows rgba(11,21,48,...) |
| Gold pen | #B8924A, 2.7:1 on white, prints faint and photocopies to nothing | #6E5018, 7.44:1 on white |
| Type | Plus Jakarta Sans plus DM Sans and Lora | Plus Jakarta Sans only, per the August 17 font correction |
| Text tool | `window.prompt`, a browser modal that cannot be labeled and blocks the page | Inline input placed at the click point, labeled, Enter to place and Escape to cancel |
| PDF export | jsPDF loaded from a CDN, silently falling back to print when the script is blocked | No external library. Print to PDF directly, so it behaves the same on every network |
| Provenance | None | Two page export: the drawing, then a stamp page with timings, mark counts, edit count, self check score, a verification code and a four frame build up strip |
| Image import | Not blocked | Paste, drop and drag are blocked on the canvas, so nothing can arrive already drawn |
| Page shape | Fixed | Portrait and landscape, both letter proportioned |
| Self check | "Check my work" button present | Driven by a `list` URL parameter, so one file serves every assignment. Hidden when no list is passed |

Everything else was kept deliberately: the tool set (Pen, Line, Arrow, Box, Circle, Text, Erase), five pen sizes, five swatches plus a custom color, Undo, Clear, Save PDF, Print, the header brand link and Drawing Canvas badge, and the footer line "Draw from memory. Pen, shapes, arrows, and text. Save to PDF when you are done."

---

## 2. WCAG 2.2, target AA minimum and AAA where achievable

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | The canvas carries `role="img"` with an accessible name. Every build up snapshot has alt text naming how many marks it shows. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `main`, `footer`. Tool groups use `role="group"` with `aria-label`. Self check items are real checkbox and label pairs. |
| 1.4.1 Use of color | A | Pass | Every swatch carries an accessible name for its color, and selection is marked with `aria-pressed` and a gold ring as well as the fill. |
| 1.4.3 Contrast, minimum | AA | Pass | Audit in section 3. |
| 1.4.6 Contrast, enhanced | AAA | Pass | Every text pair meets or exceeds 7:1. |
| 1.4.10 Reflow | AA | Pass | Verified at 390 CSS pixels. Horizontal overflow measured at 0 px in both page shapes. On narrow screens the canvas switches to full width and natural height. |
| 1.4.11 Non-text contrast | AA | Pass | Borders use --border #8C90A0 at 3.18:1. Focus ring is 9.71:1 on navy. |
| 2.1.1 Keyboard | A | Pass with an equal alternative | Every control except the drawing surface is keyboard operable, including the text tool once placed. Freehand drawing needs a pointing device, which is why the assignment always accepts a paper drawing for identical credit. See limitation 5.1. |
| 2.1.2 No keyboard trap | A | Pass | The inline text input commits on Enter, cancels on Escape and commits on blur, so Tab always escapes it. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main` as the first element in the tab order. |
| 2.4.7 Focus visible | AA | Pass | 3 px gold outline, 2 px offset, on every focusable element. |
| 2.5.8 Target size | AA | Pass | Tool buttons are 32 px tall with spacing; swatches are 30.4 px square with 5.6 px gaps, clearing the 24 by 24 minimum. |
| 3.2.2 On input | A | Pass | No context change on input. Changing the page shape is an explicit button press, and the page states that it starts a fresh sheet. |
| 3.3.1 Error identification | A | Pass | Export refuses without a name or without any marks, explains why in a live region and moves focus to the field at fault. |
| 4.1.2 Name, role, value | A | Pass | No icon-only controls anywhere. "Check my work" carries `aria-expanded` and `aria-controls`. |
| 4.1.3 Status messages | AA | Pass | `aria-live="polite"` on the mark counter and the export warning region. |
| 2.3.3 Animation from interactions | AAA | Pass | `prefers-reduced-motion: reduce` disables transitions and hover transforms. |

---

## 3. Color contrast audit

| Foreground | Background | Where | Ratio | AA | AAA |
|---|---|---|---|---|---|
| #14202F | #FFFFFF | Body copy | 16.44:1 | Pass | Pass |
| #3D4860 | #FFFFFF | Hints, footer line, mark counter | 9.15:1 | Pass | Pass |
| #08101F | #FFFFFF | Headings, self check score | 19.02:1 | Pass | Pass |
| #6B1616 | #FFFFFF | Sub headings, kickers, links, export code | 11.99:1 | Pass | Pass |
| #FFFFFF | #08101F | Header text, primary buttons | 19.02:1 | Pass | Pass |
| #F4EFE8 | #08101F | Header brand link, ghost buttons | 16.63:1 | Pass | Pass |
| #08101F | #DCB45C | Drawing Canvas badge | 9.71:1 | Pass | Pass |
| #FFFFFF | #8B1D1D | Save PDF accent button | 9.17:1 | Pass | Pass |
| #C9D2DE | #08101F | Footer text | 12.46:1 | Pass | Pass |
| #DCB45C | #08101F | Focus ring on dark surfaces | 9.71:1 | Pass | n/a |
| #8C90A0 | #FFFFFF | Input, swatch and canvas borders | 3.18:1 | Pass, non-text | n/a |

Pen colors, measured against the white drawing surface so exports print and photocopy legibly.

| Pen | Hex | Ratio on white |
|---|---|---|
| Navy | #08101F | 19.02:1 |
| Rust | #8B1D1D | 9.17:1 |
| Gold | #6E5018 | 7.44:1 |
| Green | #1F5130 | 9.22:1 |
| Blue | #1B3F8B | 9.86:1 |

The custom picker can produce a pen color below threshold. That is a student choice on their own drawing rather than an interface color, so it is left unconstrained.

---

## 4. Keyboard and screen reader

Tab order: skip link, brand link, Undo, Clear, Check my work when present, Save PDF, Print, name, drawing title, tool buttons, size buttons, swatches, custom color, page shape, self check boxes, Save PDF, Preview the stamp.

Tested with VoiceOver on Safari. Landmarks announce as banner, main and contentinfo. Tool groups announce their labels. Pressed state announces on tools, sizes, swatches and page shape. The mark counter announces after each mark through the polite live region. The inline text input announces its label, "Label text, press Enter to place it".

---

## 5. Known limitations

**5.1 The drawing surface needs a pointing device.** Freehand drawing cannot be made keyboard operable in any meaningful way. Conformance rests on the alternative: every assignment using this canvas also accepts a paper drawing, photographed, for identical credit. No student is required to use the canvas.

**5.2 The verification code is a checksum, not a lock.** It is computed over the course key and the six printed values, so it catches edits to the printed figures. The key is readable in the page source. The load bearing integrity feature is the build up strip, which shows the drawing at a quarter, a half, three quarters and finished, and which an image made anywhere else cannot have.

**5.3 Nothing persists.** No browser storage, no transmission, FERPA driven. A closed tab loses the work. Stated twice on the page.

**5.4 Changing the page shape clears the canvas.** Reflowing existing marks between portrait and landscape would distort them, so the sheet is started fresh instead. The button label and the hint under the toolbar both say so before it happens.

---

## 6. Reviewer

Dr. Sharilyn Rennie
Professor of Anatomy and Physiology
August 22, 2026
