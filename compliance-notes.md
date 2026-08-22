# Accessibility Compliance Notes

## 1. Project

- **Project:** BIO 005 Human Physiology, Yuba College, Fall 2026
- **Files covered:** schedule.html
- **Date:** August 22, 2026
- **Purpose:** Week by week course schedule page, built for iframe embed in Canvas or Kajabi and for standalone GitHub Pages hosting.

## 2. WCAG version and level achieved

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level | Status | Notes |
|---|---|---|---|
| 1.3.1 Info and Relationships | A | Pass | Semantic header, main, section, article, footer. Heading order h1 to h4 with no skipped levels. Lists marked up as lists. |
| 1.3.2 Meaningful Sequence | A | Pass | DOM order matches visual order. Layout is grid based, no positioning tricks. |
| 1.4.1 Use of Color | A | Pass | Deadline, checkpoint, and current week states carry a text label as well as a color. |
| 1.4.3 Contrast (Minimum) | AA | Pass | See section 3. |
| 1.4.4 Resize Text | AA | Pass | All type in rem or px with responsive clamp on headings. Verified at 200 percent zoom, no loss of content. |
| 1.4.6 Contrast (Enhanced) | AAA | Pass for body and headings | Eyebrow and section label text at 12 to 13px meets AA but not AAA. See limitations. |
| 1.4.10 Reflow | AA | Pass | Single column below 720px. No horizontal scroll at 320px width. |
| 1.4.11 Non-text Contrast | AA | Pass | Card and control borders at 3:1 or better against their background. |
| 1.4.12 Text Spacing | AA | Pass | Line height 1.6, no fixed height containers on text. |
| 2.1.1 Keyboard | A | Pass | See section 4. |
| 2.1.2 No Keyboard Trap | A | Pass | No modals, overlays, or focus capture anywhere on the page. |
| 2.4.1 Bypass Blocks | A | Pass | Skip link to the schedule, visible on focus. |
| 2.4.3 Focus Order | A | Pass | Follows DOM order. |
| 2.4.6 Headings and Labels | AA | Pass | Every section has a heading, including visually hidden headings where the design has no visible one. |
| 2.4.7 Focus Visible | AA | Pass | 3px terra dark outline with 3px offset on every focusable element. |
| 2.4.11 Focus Not Obscured | AA (2.2) | Pass | No sticky or fixed elements that can cover a focused control. |
| 2.5.8 Target Size (Minimum) | AA (2.2) | Pass | Every button has a minimum height of 44px, above the 24px requirement. |
| 3.1.1 Language of Page | A | Pass | lang="en" on the html element. |
| 3.2.3 Consistent Navigation | AA | Pass | Single page, one control group, consistent card pattern across all fifteen weeks. |
| 4.1.2 Name, Role, Value | A | Pass | Disclosure buttons use aria-expanded and aria-controls. Filter chips use aria-pressed. Each disclosure button carries a visually hidden week name so its accessible name is unique. |
| 4.1.3 Status Messages | AA | Pass | Filter result count announced through a role="status" region with aria-live="polite". |
| 2.3.3 Animation from Interactions | AAA | Pass | prefers-reduced-motion disables all transitions, hover lift, and smooth scrolling. |

## 3. Color contrast audit

All ratios calculated against the actual rendered background.

| Foreground | Background | Ratio | Use | AA | AAA |
|---|---|---|---|---|---|
| Navy #1E3D4C | White #FFFFFF | 11.49:1 | Card body text, week titles, h1 | Pass | Pass |
| Navy #1E3D4C | Off white #FAFAF9 | 11.01:1 | Page level text | Pass | Pass |
| Navy #1E3D4C | Navy tint #EDF1F3 | 10.11:1 | Completed week card text | Pass | Pass |
| Muted #435159 | White #FFFFFF | 8.20:1 | Week dates, secondary text | Pass | Pass |
| Muted #435159 | Off white #FAFAF9 | 7.85:1 | Part descriptions, footer | Pass | Pass |
| Terra dark #A0522D | White #FFFFFF | 5.62:1 | Eyebrow, section labels, subhead, part headings | Pass | Pass at large text only |
| Terra dark #A0522D | Off white #FAFAF9 | 5.38:1 | Part headings on page background | Pass | Pass at large text only |
| White #FFFFFF | Navy #1E3D4C | 11.49:1 | Active filter chip, skip link | Pass | Pass |
| White #FFFFFF | Terra dark #A0522D | 5.62:1 | Action button hover state | Pass | Pass at large text only |

Non-text and border contrast:

| Element | Colors | Ratio | Requirement | Status |
|---|---|---|---|---|
| Card border | #d7dee1 on #FAFAF9 | 1.4:1 | Decorative, not a required boundary | Not applicable |
| Button border | Navy #1E3D4C on white | 11.49:1 | 3:1 | Pass |
| Current week border | Gold #B8924A on white | 2.90:1 | 3:1 for a state indicator | See limitations |
| Focus outline | Terra dark #A0522D on white | 5.62:1 | 3:1 | Pass |

Brushed gold and terra cotta are used for borders and state indication only, never as text color, because neither reaches 4.5:1 against white.

## 4. Keyboard navigation flow verified

Tab order, verified end to end:

1. Skip link, hidden until focused, jumps to the schedule region
2. Five filter chips, activated with Enter or Space, pressed state announced
3. Expand all and Go to current week buttons
4. Each week card's disclosure button in schedule order, fifteen total
5. No focusable elements inside collapsed panels, since collapsed panels are removed from the accessibility tree with display none

Verified behaviors: filtering hides cards with the hidden attribute so their buttons leave the tab order entirely; the jump control resets the filter if the target week is hidden, expands that week, scrolls to it, and moves focus to its disclosure button so a keyboard user lands where the page moved.

## 5. Screen reader testing

Verified programmatically in Chromium against the accessibility tree, plus manual markup review:

- Landmarks present: banner, main, contentinfo. Each section carries an accessible name from a visible or visually hidden heading.
- Every disclosure button resolves to a unique accessible name including the week number and title, so a screen reader user hearing a list of buttons can tell them apart.
- Filter chips expose pressed state.
- The status line announces the result count after each filter change.
- Decorative chevrons carry aria-hidden.

Not yet done: a listening pass with NVDA or VoiceOver. See limitations.

## 6. Known limitations and remediation plan

1. **No live screen reader listening pass.** Verification so far is markup and accessibility tree only. Remediation: one pass with VoiceOver on Safari and one with NVDA on Firefox before the page goes live to students, with particular attention to how the filter status line interrupts.
2. **Small terra dark text meets AA but not AAA.** The eyebrow and the uppercase section labels run at 12 to 13px at 5.62:1, short of the 7:1 AAA threshold for normal size text. Remediation options: darken to #8A4524, which reaches 7.1:1, or raise those labels to 14px bold, which qualifies as large text. Neither is required for the AA floor.
3. **Current week gold border at 2.90:1.** Below the 3:1 non-text threshold. Mitigated because the state is never carried by color alone: the card also displays the text "this week" next to the dates. Remediation: darken the gold for this one use, or add a second visual cue such as a heavier border weight, which is already applied at 4px on the left edge.
4. **Google Fonts dependency.** Plus Jakarta Sans and DM Sans load from Google. If that request fails the page falls back to the system UI stack, which changes appearance but not readability or structure. Remediation: self host both faces in the repo if Yuba network policy blocks external font requests.
5. **Print output expands every week.** By design, so the printed schedule is complete. This makes the printed document long, roughly six pages. No remediation planned.

## 7. Reviewer

Prepared for Dr. Sharilyn Rennie. Awaiting instructor review and the screen reader listening pass described above.
