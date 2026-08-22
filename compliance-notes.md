# Accessibility Compliance Notes

## 1. Project

**Project:** BIO 005 Human Physiology, Module 1 slide deck
**Files covered:** `slides-p-introduction-to-physiology.html`
**Slide type code:** P (Physiology)
**Date:** August 17, 2026
**Revision:** 2, after a full computed-style contrast sweep across every interaction state
**Reviewer:** Dr. Sharilyn Rennie

---

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non-text Content | A | Pass | All 8 diagrams are inline SVG with `role="img"` and `aria-labelledby` pointing at a `<title>` and a `<desc>`. No `<img>` elements in the file. |
| 1.3.1 Info and Relationships | A | Pass | One `<h1>`, one `<h2>` per slide, `<h3>` inside cards. Heading order verified with no skipped levels. `header`, `main`, `footer` landmarks present. Comparison table uses `<caption>`, `<thead>`, and `scope` on every header cell. |
| 1.3.2 Meaningful Sequence | A | Pass | DOM order matches visual order in both scroll mode and present mode. |
| 1.3.4 Orientation | AA | Pass | No orientation lock. Layout reflows in portrait and landscape. |
| 1.4.1 Use of Color | A | Pass | Color never carries meaning alone. Feedback direction is conveyed by arrow direction, dashed vs solid line, and text labels, not by red vs teal. |
| 1.4.3 Contrast (Minimum) | AA | Pass | All pairs 4.5:1 or better. See section 3. |
| 1.4.6 Contrast (Enhanced) | AAA | Partial | Almost every pair reaches 7:1. Two sit between 4.5:1 and 7:1 and are listed as known limitations in section 6. |
| 1.4.4 Resize Text | AA | Pass | All type is set in relative units or `clamp()`. Page remains usable at 200% zoom. |
| 1.4.10 Reflow | AA | Pass | No horizontal page scroll at 320px, 375px, 390px, 768px, 1024px, or 1440px. The one data table is exempt under the criterion and is additionally wrapped in a keyboard-scrollable region. |
| 1.4.11 Non-text Contrast | AA | Pass | Card borders, focus rings, arrowheads, and diagram strokes all exceed 3:1 against their backgrounds. |
| 1.4.12 Text Spacing | AA | Pass | No fixed heights on text containers. Line height 1.5 or greater in body copy. |
| 2.1.1 Keyboard | A | Pass | Every interactive element is reachable and operable by keyboard. Reveal boxes respond to Enter and Space. Present mode responds to arrows, Space, A, T, and Escape. |
| 2.1.2 No Keyboard Trap | A | Pass | The zoom dialog traps focus intentionally while open and releases it on Escape or Close, returning focus to the element that opened it. |
| 2.4.1 Bypass Blocks | A | Pass | Skip link to `#deck` is the first focusable element and becomes visible on focus. |
| 2.4.2 Page Titled | A | Pass | Title identifies course, slide type, and topic. |
| 2.4.3 Focus Order | A | Pass | Focus order follows reading order. Opening the zoom moves focus to its Close button. Closing restores focus. |
| 2.4.6 Headings and Labels | AA | Pass | Every slide heading names its content. Every button has a visible label or an `aria-label`. |
| 2.4.7 Focus Visible | AA | Pass | 3px solid outline with 3px offset on every focusable element. Outline switches to gold in present mode so it stays visible on the navy background. |
| 2.4.11 Focus Not Obscured | AA | Pass | The present bar and clock are fixed but do not overlap focusable slide content; slides carry bottom padding to clear the bar. |
| 2.5.3 Label in Name | A | Pass | Accessible names match visible text on all buttons. |
| 2.5.8 Target Size (Minimum) | AA | Pass | All buttons measure at least 34px in the smaller dimension; present-mode controls are 44px or larger. No button measured under 24px. |
| 3.1.1 Language of Page | A | Pass | `lang="en"` on `<html>`. |
| 3.2.1 On Focus | A | Pass | Focus alone never changes context. |
| 3.2.2 On Input | A | Pass | No forms in this deck. |
| 4.1.2 Name, Role, Value | A | Pass | Reveal boxes carry `role="button"`, `tabindex="0"`, and `aria-expanded` that updates on open and close. Zoom uses `role="dialog"`, `aria-modal="true"`, and an accessible name. |
| 4.1.3 Status Messages | AA | Pass | Slide counter uses `aria-live="polite"`. Timer completion message uses `role="status"`. The ticking timer itself is `aria-live="off"` so it does not flood a screen reader every second. |

---

## 3. Color contrast audit

Measured with the WCAG relative luminance formula. All ratios rounded down.

### Body text and UI

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Navy `#08101F` | White `#FFFFFF` | 19.02 | AAA |
| Navy `#08101F` | Off-white `#FAFAF9` | 18.21 | AAA |
| Muted `#3D4860` | White `#FFFFFF` | 9.15 | AAA |
| Muted `#3D4860` | Off-white `#FAFAF9` | 8.76 | AAA |
| Terra `#8B1D1D` | White `#FFFFFF` | 9.17 | AAA |
| Terra `#8B1D1D` | Off-white `#FAFAF9` | 8.78 | AAA |
| Gold-ink `#6B5214` | White `#FFFFFF` | 7.39 | AAA |
| Gold-ink `#6B5214` | Off-white `#FAFAF9` | 7.07 | AAA |
| Teal `#1F4E55` | White `#FFFFFF` | 9.21 | AAA |
| Teal `#1F4E55` | Off-white `#FAFAF9` | 8.82 | AAA |
| Slide number `#555F70` | White `#FFFFFF` | 6.45 | AA |

### On navy surfaces

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| White `#FFFFFF` | Navy `#08101F` | 19.02 | AAA |
| Gold `#DCB45C` | Navy `#08101F` | 9.71 | AAA |
| Light `#DDE2EA` | Navy `#08101F` | 14.62 | AAA |
| Faint `#A8B3C6` | Navy `#08101F` | 8.99 | AAA |
| Light `#DDE2EA` | Navy chip `#16233C` | 12.05 | AAA |
| Gold `#DCB45C` | Navy chip `#16233C` | 8.01 | AAA |
| Title accent `#F0A08A` | Navy `#08101F` | 9.15 | AAA |

### Buttons, badges, and chips

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Navy `#08101F` | Gold button `#DCB45C` | 9.71 | AAA |
| White `#FFFFFF` | Terra badge `#8B1D1D` | 9.17 | AAA |
| White `#FFFFFF` | Teal badge `#1F4E55` | 9.21 | AAA |

### Inside the SVG diagrams

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Navy `#08101F` | Gold box `#DCB45C` | 9.71 | AAA |
| Navy `#08101F` | Range band `#EDF1F3` | 16.73 | AAA |

### Physiology red header and title slide, added in revision 2

The red top is the course-type signal for Physiology decks. Lettering on red is white and yellow only. Navy is used only on the gold and white elements that sit on top of the red, never directly on it, because navy on this red measures 2.08:1 and fails.

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| White `#FFFFFF` | Terra header `#8B1D1D` | 9.17 | AAA |
| Gold-lite `#FBEBC8` | Terra header `#8B1D1D` | 7.78 | AAA |
| On-red body `#F2EFEF` | Terra header `#8B1D1D` | 8.02 | AAA |
| Gold `#DCB45C` | Terra title slide `#8B1D1D` | 4.68 | AA (large display type only) |
| Terra `#8B1D1D` | White type chip `#FFFFFF` | 9.17 | AAA |
| Gold `#DCB45C` | Navy chip circle `#08101F` | 9.71 | AAA |
| Navy `#08101F` | Gold Present button `#DCB45C` | 9.71 | AAA |
| White `#FFFFFF` | Navy keycap `#08101F` | 19.02 | AAA |

### Opened state, rebuilt in revision 2

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Navy `#08101F` | Navy-tint opened card `#EDF1F3` | 16.73 | AAA |
| Muted `#3D4860` | Navy-tint opened card `#EDF1F3` | 8.05 | AAA |
| Teal `#1F4E55` | Navy-tint opened card `#EDF1F3` | 8.11 | AAA |
| Gold-ink `#6B5214` | Navy-tint opened card `#EDF1F3` | 6.50 | AA |
| Gold ring `#DCB45C` | Navy opened panel `#08101F` | 9.71 | AAA |

### De-pinked diagram fills, revision 2

Pale rose `#FBEFEA` and pale teal `#E7EFF1` were removed from every diagram. Compartment boxes are now white with colored strokes, and background fields are neutral grey.

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Terra `#8B1D1D` | White cell fill `#FFFFFF` | 9.17 | AAA |
| Teal `#1F4E55` | White cell fill `#FFFFFF` | 9.21 | AAA |
| Navy `#08101F` | ECF field `#E3E8EE` | 15.43 | AAA |
| Navy `#08101F` | Outer field `#F4F6F9` | 17.57 | AAA |
| Muted `#3D4860` | ECF field `#E3E8EE` | 7.43 | AAA |
| Gold-lite `#FBEBC8` | Terra diagram box `#8B1D1D` | 7.78 | AAA |

**Result: zero pairs below 4.5:1 in any interaction state.**

---

## 3b. Automated state sweep, and the defect it caught

Static color-pair checking is not enough, because a component can pass at rest and fail once a state class is applied. Revision 2 added a scripted sweep that loads the page, forces every one of the 101 reveal boxes into each state in turn, and then walks every text node computing its resolved color against its first opaque ancestor background.

**States swept:** at rest, opened, expanded, and inside the zoom dialog in present mode.

**Defect found:** the opened state recolored each box's eyebrow and heading to terra `#8B1D1D`. On white cards that was fine. On the dark panels and dark slides it put terra on navy, measuring **2.08:1** on `#08101F` and **1.71:1** on `#16233C`, against a 4.5:1 requirement. It affected 35 text elements across the deck and was invisible until a box had been opened, which is why it survived the revision 1 review.

**Fix:** the opened state no longer recolors text at all. It now uses the documented completed-state treatment instead. Light cards get a navy border on a navy-tint fill. Dark panels get a 2px inset gold ring, drawn with `box-shadow` so nothing shifts by a pixel when the state changes.

**Second defect found in the same sweep:** the timer's helper text used `#A8B3C6` on the off-white page, measuring 2.03:1 when the clock was toggled on outside present mode. Changed to `#3D4860`, now 8.76:1.

**Current result across all four states: zero text failures, zero pseudo-element failures.**

---

## 4. Keyboard navigation flow, verified

1. `Tab` from page load reaches the skip link, which becomes visible and jumps to the deck.
2. `Tab` continues to the Present button, then into the deck in reading order.
3. Every reveal box (101 in this deck) receives focus in document order and opens with `Enter` or `Space`.
4. Opening a box in present mode moves focus to the zoom dialog's Close button.
5. `Tab` and `Shift+Tab` cycle within the open dialog and cannot escape it.
6. `Escape` closes the dialog and returns focus to the box that was opened.
7. In present mode: `ArrowRight` and `Space` open the next unopened box, then advance the slide. `ArrowLeft` steps back. `A` marks every box on the slide as seen. `T` shows and hides the timer and moves focus to its Start button. `Escape` exits present mode and returns focus to the Present button.
8. The comparison table on slide 32 is inside a `role="region"` with `tabindex="0"`, so it can be scrolled sideways from the keyboard.
9. No mouse-only interactions anywhere in the file.

---

## 5. Screen reader testing

**Verified programmatically in this build:**

- Landmark structure: one `banner`, one `main`, one `contentinfo`.
- Heading tree walks h1 to h2 to h3 with no skipped levels across all 42 slides.
- All 8 diagrams expose a short `<title>` and a full sentence `<desc>` describing the pathway, so a non-sighted student gets the content of the figure rather than the word "image".
- All 101 reveal boxes expose `role="button"` and an `aria-expanded` value that updates on open and close.
- Zoom overlay exposes `role="dialog"`, `aria-modal="true"`, and the accessible name "Expanded detail".
- Slide counter announces politely on change. The timer does not announce every second.
- Zero buttons without an accessible name.
- Duplicate `id` values are stripped from cloned content when a box is zoomed, so the accessibility tree stays valid.

**Still to do before the deck goes live to students:**

- A pass with VoiceOver on Safari and a pass with NVDA on Firefox, confirming the diagram descriptions read as intended and the zoom dialog announces correctly on open. Recorded here as an open item rather than claimed as done.

---

## 6. Known limitations and remediation plan

| Item | Impact | Plan |
|---|---|---|
| Gold `#DCB45C` on the red title slide measures 4.68:1. It is used only for the accent phrase at 32px to 56px display size, where the requirement is 3:1, so it clears AA and AAA for large text but not the 7:1 body-text bar. | Low | Intentional. This is the yellow-on-red that makes the deck read as Physiology at a glance. Never use this pair below 24px. |
| Gold-ink `#6B5214` on the navy-tint opened card measures 6.50:1, so AA but not AAA. | Low | Acceptable. If it needs to reach AAA, darken to `#5A4410`. |
| Screen reader verification with VoiceOver and NVDA has not been performed. | Medium | Run before the deck is posted for students. |
| The zoom overlay reproduces a card's inner HTML. Nested interactive elements inside a card would be duplicated, though none exist in this deck. | Low | If a future slide puts a link or button inside a card, remove it from the cloned content or exclude that card from the reveal system. |
| The floating timer can be dragged anywhere on screen, including over content. | Low | By design, it is an instructor tool used during live teaching. It is hidden by default and does not appear for students reading the deck in scroll mode. |
| Fonts load from Google Fonts. If the network blocks that request, the deck falls back to the system UI stack. | Low | Layout and contrast were verified with the fallback stack in place, so nothing breaks. |
| The deck is not translated. | Low | Out of scope. |

---

## 7. Reviewer

Dr. Sharilyn Rennie
BIO 005 Human Physiology
August 17, 2026
