# Accessibility compliance notes, course-entry.html

Append this to `compliance-notes.md` in the repo, or keep it beside it. It follows the same structure as the existing sections.

---

## 1. Project, files, date

- **Project:** BIO 005 Human Physiology, Yuba College, Fall 2026
- **Files covered:** `course-entry.html` (the Canvas front door), and the Canvas page embed in `canvas-embed-snippet.html`
- **Date:** August 22, 2026
- **Live URL once pushed:** https://drsrennie-stack.github.io/human-physiology-Fa26/course-entry.html

---

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA as the floor, Level AAA where it was reachable.

| Criterion | Level | Status | Where it shows up on this page |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | The logo mark and every status icon are `aria-hidden`, with the meaning carried in real text beside them. The drawing canvas has an accessible name and fallback text inside the element. |
| 1.3.1 Info and relationships | A | Pass | One `h1`, `h2` per card, `h3` per step. Real `header`, `main`, `aside`, `nav`, `footer`, `section` with `aria-labelledby`. The check items are a list, not a stack of divs. |
| 1.3.2 Meaningful sequence | A | Pass | Reading order matches visual order. The side column follows the main column in the source, so nothing is announced out of turn. |
| 1.3.4 Orientation | AA | Pass | No orientation lock. Verified at 390px and 1280px wide. |
| 1.3.5 Identify input purpose | AA | N/A | No form fields collect personal information. There are no form fields at all. |
| 1.4.1 Use of color | A | Pass | Every check state carries three signals: a drawn icon (clock, check, triangle), a text tag (Not checked, Ready, Needs attention), and a border treatment (dashed, solid, solid). Color is never the only cue. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. Lowest text pair is 7.11:1. |
| 1.4.6 Contrast, enhanced | **AAA** | **Pass** | Every text pair on the page is at or above 7:1. |
| 1.4.10 Reflow | AA | Pass | Zero horizontal overflow at 390px, measured. Single column below 920px. |
| 1.4.11 Non-text contrast | AA | Pass | State borders are 6.12:1 (locked), 4.87:1 (attention), 16.5:1 (ready). All above the 3:1 floor. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.6, nothing clips when spacing is overridden. |
| 2.1.1 Keyboard | A | Pass | Every control is reachable and operable by keyboard. See section 4. |
| 2.1.2 No keyboard trap | A | Pass | Nothing traps focus. No modal on this page. |
| 2.4.1 Bypass blocks | A | Pass | Skip link as the first focusable element, visible on focus. |
| 2.4.3 Focus order | A | Pass | Verified programmatically, listed in section 4. |
| 2.4.4 Link purpose | A | Pass | Every link reads on its own. No "click here", no bare "read more". |
| 2.4.6 Headings and labels | AA | Pass | Headings describe their section. Button text says what the button does. |
| 2.4.7 Focus visible | AA | Pass | 3px outline with 3px offset. Navy on light surfaces, gold-light on the two maroon surfaces so it stays visible there. |
| 2.4.11 Focus not obscured | AA | Pass | Nothing is sticky or fixed on this page, so no focused element can be covered. |
| 2.5.3 Label in name | A | Pass | Visible button text is the accessible name in every case. |
| 2.5.8 Target size, minimum | AA | Pass | Measured. Smallest button is Mark drawing as handled at 192 by 32px, above the 24px floor. Primary buttons are 44px and up, Enter the course is 56px. The one 16px-tall target is the Skip the setup text link, which qualifies under the equivalent-control exception: the Enter the course button directly above it goes to the same page. |
| 3.1.1 Language of page | A | Pass | `lang="en"` on the html element. |
| 3.2.1 On focus | A | Pass | Focus never changes context. |
| 3.2.2 On input | A | Pass | Nothing happens without a deliberate click. |
| 3.3.1 Error identification | A | Pass | A failed check names the problem in text and gives the fix in text, both inside the same list item. |
| 4.1.2 Name, role, value | A | Pass | `aria-disabled` on the Enter button rather than `disabled`, so it stays focusable and a screen reader user can find out why it is not active yet. |
| 4.1.3 Status messages | AA | Pass | One `role="status"` `aria-live="polite"` region announces the result of every check without moving focus. |
| 2.3.1 Three flashes | A | Pass | No flashing. |
| 2.2.1 Timing adjustable | A | Pass | No time limits. The one timer closes the pop-up test window after six seconds and affects nothing on the page. |
| 2.3.3 Animation from interactions | AAA | Pass | `prefers-reduced-motion` turns off every transition and the card hover lift, and switches smooth scrolling to instant. |

Automated audit: axe-core 4.x, full WCAG 2.0 A/AA, 2.1 A/AA, 2.2 AA and best-practice rule sets, run against the page in its completed state after the system check has been run. **0 violations, 39 passing rule groups.** The single "incomplete" result is the decorative arrow glyph inside the Enter button, which is `aria-hidden` and is flagged only because axe cannot measure contrast on a character with no text meaning.

---

## 3. Color contrast audit

Every pair measured, all AAA for text.

### Text on light surfaces

| Foreground | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| Navy `#08101F` | White `#FFFFFF` | 19.02:1 | Pass | Pass |
| Navy `#08101F` | Off-white `#FAFAF9` | 18.21:1 | Pass | Pass |
| Navy `#08101F` | Navy-tint `#ECEFF4` (completed rows) | 16.50:1 | Pass | Pass |
| Maroon-dark `#5E201A` (h3, kickers) | White | 12.37:1 | Pass | Pass |
| Ink-soft `#414B5C` (body, tags) | White | 8.80:1 | Pass | Pass |
| Ink-soft `#414B5C` | Off-white | 8.43:1 | Pass | Pass |
| Gold-text `#6E5018` (Needs attention tag) | White | 7.44:1 | Pass | Pass |

### Text on the two maroon surfaces

| Foreground | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| White `#FFFFFF` | Maroon `#7A2A22` | 9.63:1 | Pass | Pass |
| Gold-light `#F0DCA8` (eyebrows, Step 3 kicker, skip link) | Maroon `#7A2A22` | 7.11:1 | Pass | Pass |

### Buttons and chips

| Foreground | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| White | Navy `#08101F` (primary buttons) | 19.02:1 | Pass | Pass |
| Navy | White (secondary buttons) | 19.02:1 | Pass | Pass |
| Navy | Gold-light `#F0DCA8` (Enter the course) | 14.04:1 | Pass | Pass |
| Navy | White chips on maroon | 19.02:1 | Pass | Pass |

### Footer

| Foreground | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| White | Navy-darkest `#060A18` | 19.73:1 | Pass | Pass |
| Gold-light `#F0DCA8` | Navy-darkest `#060A18` | 14.57:1 | Pass | Pass |

### Non-text, 3:1 floor

| Element | Colors | Ratio | Result |
|---|---|---|---|
| Locked check, dashed border | `#5A6273` on white | 6.12:1 | Pass |
| Needs attention, solid border | `#8A6D33` on white | 4.87:1 | Pass |
| Ready check, solid border | `#08101F` on `#ECEFF4` | 16.50:1 | Pass |
| Focus ring, light surfaces | `#08101F` on `#FAFAF9` | 18.21:1 | Pass |
| Focus ring, maroon surfaces | `#F0DCA8` on `#7A2A22` | 7.11:1 | Pass |

Card borders at `#D5DAE2` are 1.40:1 and are decorative only. Card boundaries are carried by the shadow lift, and no state or meaning depends on that border, so the 3:1 rule does not apply to it.

Note on palette: bright gold `#B8924A` is 2.77:1 on white and does not carry text or state. It is not used for either on this page. Two darker golds do that work instead, `#8A6D33` for borders and `#6E5018` for text.

---

## 4. Keyboard navigation flow, verified

Focus order, read programmatically from the rendered page:

1. Skip to the setup steps (visible on focus, jumps to `#main`)
2. Site logo, back to the course home
3. Run the system check
4. Test opening a new tab
5. Mark drawing as handled
6. Open the print dialog
7. Enter the course
8. Skip the setup and go straight to the course home
9. Before you start
10. Course schedule
11. What you do and what it is worth
12. Competency study guide

Verified behaviors:

- Every control is reachable with Tab and operable with Enter or Space.
- The Enter the course button uses `aria-disabled`, not `disabled`. Before the check has been run it is still focusable, and activating it announces why it is not ready and sends focus to the Run the system check button rather than silently doing nothing.
- The drawing canvas is deliberately not in the tab order, because there is nothing a keyboard user can do inside it. The Mark drawing as handled button beside it is the keyboard and screen reader path, and it also opens the door to an alternative arrangement for a student who cannot draw with a pointer at all.
- No focus trap, no sticky element that can cover a focused control.

---

## 5. Screen reader testing

**What has been verified so far, and by what:** the semantic structure, accessible names, roles, and live region were verified programmatically with axe-core against the rendered DOM, plus a manual read of the accessibility tree. Landmarks resolve as `banner`, `main`, `complementary`, `contentinfo`, and `navigation`. The heading outline is a single `h1` followed by `h2` per card and `h3` per step, with no skipped levels. The `role="status"` region announces each check result without stealing focus.

**What has not been done yet:** no run through NVDA, JAWS, or VoiceOver with a live voice. That is a human pass and it should happen before students land on this page, ideally on the live GitHub Pages URL rather than a local file, and once inside the Canvas iframe as well. The three things worth listening for specifically:

1. That the result announcement after Run the system check is read once and in full, not clipped and not repeated per item.
2. That the Enter the course button announces its disabled state and its describedby text before the check is run.
3. That the drawing item makes sense read aloud, given that its canvas is skipped.

Update this section with the reader, the version, and the date once that pass is done.

---

## 6. Known limitations and remediation plan

| Limitation | Effect | Plan |
|---|---|---|
| No live screen reader pass yet | Structure is verified, spoken experience is not | Run NVDA on Windows and VoiceOver on macOS against the live URL, then fill in section 5 |
| Locked state on the maroon Step 3 panel uses a white dashed border, not the system gray | Slight deviation from the palette's locked state, which is gray dashed | Deliberate. Gray `#5A6273` on maroon is 1.9:1 and would be invisible. White dashed keeps the locked reading at 9.63:1. Worth a line in `palettes.md` naming the maroon-surface exception |
| Saved progress check can fail inside the Canvas iframe | Some browsers block storage for a cross-site frame, so students may see Needs attention on a device that is actually fine | Already handled in the page: when it detects it is inside a frame it says so and tells the student to open the course in its own tab and re-run. No further work needed unless the message reads as alarming in testing |
| Canvas strips script tags from page content | The iframe height-sender in the page has nothing listening on the Canvas side, so the frame stays at its set height and scrolls internally | Accepted. The embed snippet sets a 900px frame and puts an Open in its own tab link above it. If Canvas theme JavaScript is ever available, a listener there would make the frame auto-size, and the sender is already in the page waiting for it |
| Page is tall, about 3,800px on desktop and 6,200px on a phone | Long scroll inside the Canvas frame | Watch this once real students use it. If it reads as too long, the side column can move below the fold on desktop or the four door cards can move to the course home |
| Fonts load from Google Fonts | If the network blocks that host, type falls back | Fallback stack is system UI fonts. Nothing about layout or contrast depends on Plus Jakarta Sans loading |

---

## 7. Reviewer

Built and audited for Dr. Sharilyn Rennie, August 22, 2026. Automated audit: axe-core, 0 violations. Human screen reader pass outstanding, see section 5.
