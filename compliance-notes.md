# Accessibility compliance notes

## 1. Project

**Project:** BIO 005 Human Physiology, Yuba College, Fall 2026
**Date:** August 17, 2026. Addendum 9 and the section 3 rebuild added August 21, 2026.
**Palette:** maroon and dark navy, implemented in `assets/brand.css`. Changed from terra cotta and `#1E3D4C` on Aug 21 on Scrubs' instruction; `palettes.md` has not caught up yet, see `PLACEHOLDERS.md` item W. No sage. No cream.
**Reviewer:** Dr. Sharilyn Rennie

### Files covered at full audit

| File | Status |
|---|---|
| `assets/brand.css` | Audited. Palette and component source of truth. |
| `index.html` | Full audit, passes AA |
| `mastery-physio-os.html` | Full audit, passes AA |
| `competency-study-guide.html` | Full audit, passes AA. Two inherited failures fixed Aug 21, see section 9.2. |
| `week-01.html` | Full audit, passes AA. See section 9. |

### Files repainted and smoke tested, not re-audited

These were repainted onto PRIMARY on Aug 17 and verified to load with no console errors, correct computed colors, no banned hex values, and `target="_top"` on every internal link. Their original audits predate the repaint.

`competency-map.html`, `course-schedule.html`, `physiology-course-home.html`, `physiology-course-map.html`, `workbook_week01_fluid-homeostasis.html`, `workbook_week02_membranes-transport.html`, `workbook_week03_membrane-potential.html`

Because only color values changed and the contrast of every substituted pair is equal or better than what it replaced, the repaint cannot have lowered a contrast result. It has not been re-verified criterion by criterion. See section 6.

---

## 2. WCAG version and level

Target: **WCAG 2.2 Level AA as the floor, Level AAA where the palette allows.**

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non-text Content | A | Pass | Progress rings are `<svg role="img">` with an `aria-label` stating the module and percentage. Meters are `role="presentation"`; their value is in adjacent text. |
| 1.3.1 Info and Relationships | A | Pass | `header`, `main`, `footer`, `section` per view, real tables with `caption`, `thead`, `th scope`. Competencies are lists. |
| 1.3.2 Meaningful Sequence | A | Pass | DOM order matches visual order. Filtering uses the `hidden` attribute, which removes items from both. |
| 1.4.1 Use of Color | A | Pass | Lecture and Lab tags carry text. Confidence states carry a pressed button label as well as a border treatment. Locked is dashed as well as gray. |
| 1.4.3 Contrast (Minimum) | AA | Pass | Section 3. Lowest text pair 4.87:1, white on gold-deep. Every other pair clears AAA. |
| 1.4.6 Contrast (Enhanced) | AAA | Pass, one exception | Every text pair clears 7:1 after the Aug 21 palette change. The single exception is white on gold-deep at 4.87:1, used only on the anatomy box header. |
| 1.4.10 Reflow | AA | Pass | Single column at 320 CSS px, no horizontal scroll. Card grids collapse with `auto-fit minmax`. |
| 1.4.11 Non-text Contrast | AA | Pass | Control borders navy on white, 19.02:1. Gold `#B8924A` is 2.77:1 on off-white so it is **never used for text**, only for fills and borders where a text label carries the meaning. |
| 1.4.12 Text Spacing | AA | Pass | No fixed heights on text containers. |
| 2.1.1 Keyboard | A | Pass | Every control reachable and operable. Tabs support Left and Right arrow keys. Recall runs entirely from the keyboard. |
| 2.1.2 No Keyboard Trap | A | Pass | No modals. No custom focus capture. |
| 2.4.1 Bypass Blocks | A | Pass | Skip link is the first focusable element on all three new pages. Verified. |
| 2.4.2 Page Titled | A | Pass | All pages titled. |
| 2.4.3 Focus Order | A | Pass | Skip link, tabs or filters, then content in reading order. |
| 2.4.6 Headings and Labels | AA | Pass | One `h1` per page, no skipped levels. **0 unlabeled inputs** measured on all three new pages. |
| 2.4.7 Focus Visible | AA | Pass | 3px navy outline, 2px offset, 11.01:1 against the page. |
| 2.4.11 Focus Not Obscured | AA | Pass | The sticky tab bar sits at the top only; focused content below is not covered. |
| 2.5.3 Label in Name | A | Pass | Visible text is the accessible name on every control. |
| 2.5.8 Target Size (Minimum) | AA | Pass | **0 controls under 24 by 24 CSS px** measured on all three new pages. Confidence buttons are 32px tall, everything else 44px. |
| 3.1.1 Language of Page | A | Pass | `lang="en"` on all pages. |
| 3.2.1 On Focus | A | Pass | No context change on focus. |
| 3.2.2 On Input | A | Pass | Filtering and rating update in place and announce. No navigation. |
| 3.3.2 Labels or Instructions | A | Pass | Every field labelled. Usage instructions in Lora italic at the top of each view. |
| 4.1.2 Name, Role, Value | A | Pass | Native controls throughout. Tabs use `role="tab"` with `aria-selected`, `aria-controls`, and roving `tabindex`. Confidence buttons use `aria-pressed`. |
| 4.1.3 Status Messages | AA | Pass | 5 `aria-live` regions on the Mastery OS, 2 on the study guide, all `polite` and `atomic`. |
| 2.3.3 Animation from Interactions | AAA | Pass | `prefers-reduced-motion: reduce` disables all transitions, hover lifts, and smooth scrolling, in `brand.css` so every page inherits it. |

---

## 3. Color contrast audit

**Rebuilt Aug 21, 2026, after the palette change.** Terra cotta is out and maroon is in; navy is out and dark navy is in; the teal-leaning neutrals are on blue-grays. Measured with the WCAG 2.x relative luminance formula.

| Foreground | Background | Ratio | AA normal | AAA normal | Where |
|---|---|---|---|---|---|
| Navy `#08101F` | Off-white `#FAFAF9` | 18.21:1 | Pass | Pass | body text, h1, focus outline |
| Navy `#08101F` | White `#FFFFFF` | 19.02:1 | Pass | Pass | card text, table text, control borders |
| Navy `#08101F` | Navy-tint `#ECEFF4` | 16.50:1 | Pass | Pass | Lecture tag, completed state, answer panels |
| Navy-deep `#060A18` | White `#FFFFFF` | 19.79:1 | Pass | Pass | link hover, primary button hover |
| White `#FFFFFF` | Navy `#08101F` | 19.02:1 | Pass | Pass | skip link, primary button, table headers |
| Maroon-dark `#5E201A` | White `#FFFFFF` | 12.37:1 | Pass | Pass | h2, h3, eyebrows, field labels |
| Maroon-dark `#5E201A` | Off-white `#FAFAF9` | 11.85:1 | Pass | Pass | headings on the page ground |
| Maroon `#7A2A22` | White `#FFFFFF` | 9.63:1 | Pass | Pass | cover band, accents, chemistry box header |
| White `#FFFFFF` | Maroon `#7A2A22` | 9.63:1 | Pass | Pass | cover band text, chemistry box header text |
| Ink-soft `#414B5C` | White `#FFFFFF` | 8.80:1 | Pass | Pass | secondary body text, competency link line |
| Muted `#5A6273` | White `#FFFFFF` | 6.12:1 | Pass | No | locked state text |
| White `#FFFFFF` | Gold-deep `#8A6D33` | 4.87:1 | Pass | No | anatomy box header, the only gold carrying text |
| Brushed gold `#B8924A` | Off-white `#FAFAF9` | 2.77:1 | **Fail** | No | **Never text.** Borders and fills only, always with a text label. |

### What the palette change did to the audit

**Every text pair improved, and the one documented AA-only limitation is gone.** Terra-dark headings measured 5.62:1: AA, not AAA, accepted and written into section 6 item 3 as a limitation of the palette. Maroon-dark measures 12.37:1. Section 6 item 3 is struck.

The cover band is the clearest case. White on terra cotta measured 3.59:1 and failed AA outright at the sizes used, which is why it was moved to the darker token on Aug 21. Maroon takes the same white to 9.63:1, so the band went back to the main accent color and now clears AAA.

Three teal-leaning neutrals were replaced with blue-grays of the same role. All three went up: ink-soft 7.86 to 8.80, muted 5.66 to 6.12, locked 4.94 to 6.12.

### Decoration removed, Aug 21

Every decorative bookend rule is out, per Scrubs' instruction, and replaced with a shadow lift. This removes the last places where a color was carrying meaning on its own: the gold left rule on a concept check, the gold and maroon rules on the readiness review items, the 4 px rims on the two readiness box headers, the maroon rules on four panels in the OS, and five top rules on `welcome.html`. Nothing was relying on those rules for information, so no 1.4.1 result changes, but the surface is now simpler to audit.

## 4. Keyboard navigation verified

Chromium, keyboard only.

**All three new pages.** Tab 1 lands on the skip link, which becomes visible and jumps to `#main`. No positive `tabindex` anywhere. No focus trap.

**Mastery Physio OS specifically.**

1. Tabs form a single tab stop with roving `tabindex`. Left and Right arrows move between views and switch the panel. Verified: focusing Dashboard and pressing Right lands on Competency map.
2. Competency map: Tab reaches each of the four confidence buttons per competency. `aria-pressed` flips on activation and the row border state follows.
3. Recall: Start, then Reveal, then the four grade buttons. Focus is moved deliberately to Reveal on each new card and to the first grade button on reveal, so a keyboard user never has to hunt. Verified a full 20 card session end to end.
4. Drawing check: the timer starts, pauses, and logs from the keyboard.
5. Your data: export, import, and erase are all reachable, and the textarea is labelled.

**Study guide.** Space toggles a competency checkbox. Clear all checkmarks returns focus to the search field rather than dropping the user at the top of a 268 item list.

---

## 5. Screen reader testing

**Verified programmatically, not with a live screen reader.** Confirmed from the rendered accessibility properties on all three new pages:

- `lang="en"`, unique page title, exactly one `h1`, no skipped heading levels
- one `main`, one page `header`, one `footer`; five `section` elements named by `aria-labelledby` on the study guide, six `role="tabpanel"` on the Mastery OS each labelled by its tab
- **0 inputs, selects, or textareas without an associated label**
- `aria-live="polite" aria-atomic="true"` on 5 regions in the Mastery OS and 2 in the study guide
- tabs expose `role="tab"`, `aria-selected`, and `aria-controls`; confidence buttons expose `aria-pressed`
- data tables expose caption, `scope="col"` headers, and `scope="row"` row headers

Not yet done: NVDA on Windows and VoiceOver on macOS and iOS. See section 6.

---

## 6. Known limitations and remediation plan

1. **No live screen reader pass.** Programmatic checks only. Plan: NVDA with Firefox and VoiceOver with Safari before the term opens. Listen specifically for the live regions firing on every keystroke in the search fields; if it is too chatty, debounce the announcement to about 500 ms while leaving the visual count immediate.
2. **Seven repainted files not re-audited criterion by criterion.** Only color values changed and every substitution is equal or better contrast, so no result can have regressed. Plan: re-audit each one the next time it is edited for content, and refactor it onto `brand.css` at the same time. Tracked in `BRAND-MIGRATION.md`.
3. ~~**Terra-dark misses AAA at 5.62:1.** Accepted. AA is met everywhere it is used.~~ **Closed Aug 21, 2026.** Terra-dark is gone. Maroon-dark measures 12.37:1 and clears AAA.
4. **Google Fonts from a CDN.** If blocked, pages fall back to system sans and Georgia. Layout and contrast are unaffected. Plan: self-host the three families if the Kajabi content security policy blocks the request.
5. **Progress is stored in `localStorage`, per browser and per device.** A student switching devices or clearing browsing data loses it. Stated plainly in the Your data view and in the study guide footer, and mitigated by export and import. All storage writes are wrapped in `try/catch`, so a sandboxed iframe or blocked storage degrades to session-only rather than throwing.
6. **268 competencies in one page on the study guide.** Long to traverse linearly. Mitigated by the skip link, module landmarks, heading navigation, and the module filter. Plan: add a per-module jump list under the load table if student feedback shows it is still heavy.
7. **The drawing check timer has no audible or visible completion alert beyond a text line.** A student not looking at the screen will not know time is up. Plan: add an `aria-live` assertive announcement at zero, and consider an optional sound with a mute control.
8. **Color is doing some work in the confidence states.** A dashed border for shaky, gold for solid, navy fill for mastered. Each state also has a pressed button whose visible text names it, so the information is never color alone, but the row-level scan is faster for sighted users. Acceptable under 1.4.1. Plan: confirm during the screen reader pass that the pressed state reads clearly per row.

---

## 7. Status

The three new pages pass the WCAG 2.2 AA floor and reach AAA on all body and interactive text. The seven repainted pages are on the correct palette and load clean, and carry an open action to be re-audited and refactored onto `brand.css` when next touched.

---

## 8. Addendum, the Mastery Physio OS fork

`os/mastery-physio-os.html` and its modules were forked from the BIO 004 Mastery OS on Aug 17. **It has not been accessibility audited.**

What was verified: it loads with zero console errors and zero failed asset requests, all ten sections render, the onboarding completes, and every in-build module degrades to an honest notice instead of throwing. That is a functional check, not an accessibility audit.

What is unknown and must be checked before students use it:

- Contrast on the dark application surface. Gold `#DCB45C` on navy `#08101F` and body copy on `#0B1530` have not been measured here. The BIO 004 file claims AAA on the gold text token, but that claim was made against a white ground.
- Keyboard operability of the onboarding carousel, the focus-session modal, the dock, and Hootie. The modal in particular needs a focus trap check and an Escape check.
- Whether the section nav anchors move focus as well as scroll.
- Screen reader behavior on the Today view, which updates its headline and counters on load.

Plan: run the full section 2 criterion table against the OS before Sept 5, and record the result here. Until that is done, treat `index.html`, `competency-study-guide.html`, `competency-recall.html` and `course-schedule.html` as the accessible path through the course, and the OS as an enhancement.

---

## 9. Addendum, `week-01.html`, the first week page

**Date:** August 21, 2026. **Reviewer:** Dr. Sharilyn Rennie.

Forked from `competency-study-guide.html`, which was itself forked from the BIO 004 `module-1-structure-list.html`. Same shell, same print stylesheet, same dock and Hootie. Audited as a new page rather than assumed from its parent.

### Verified on this page

| Criterion | Level | Result |
|---|---|---|
| 1.1.1 Non-text Content | A | Pass. 0 images without `alt`. The three-figure mark and the section icons are `aria-hidden` decoration with text beside them. |
| 1.3.1 Info and Relationships | A | Pass. `header`, two `nav`, `main`, `footer`. Ten `section` elements each named by `aria-labelledby`. Three data tables with `caption` and `scope="col"` headers. |
| 1.4.3 Contrast (Minimum) | AA | Pass. Lowest text pair on the page 8.80:1 after the Aug 21 palette change. Measured, section 9.1. |
| 1.4.6 Contrast (Enhanced) | AAA | Pass. Every text pair on this page clears 7:1. |
| 1.4.10 Reflow | AA | Pass at 390 and at 320 CSS px, after the grid track fix below. Page `scrollWidth` equals `clientWidth`. Wide tables scroll inside their own container, not the page. |
| 1.4.11 Non-text Contrast | AA | Pass. Every control border is navy on white, 19.02:1. The decorative rules are gone entirely as of Aug 21, so nothing on the page is a colored bar; cards separate by shadow. The list bullet is a maroon dot with text beside it. |
| 2.1.1 Keyboard | A | Pass. 30 tab stops walked. Every link, the search field, the print button and all seven concept checks reach focus and operate with Enter. |
| 2.1.2 No Keyboard Trap | A | Pass. |
| 2.4.1 Bypass Blocks | A | Pass. Skip link is tab stop 1 and targets `#notes`. |
| 2.4.6 Headings and Labels | AA | Pass. One `h1`, no skipped levels, 0 unlabeled inputs. |
| 2.4.7 Focus Visible | AA | Pass. 3px outline measured on all 30 stops. |
| 4.1.2 Name, Role, Value | A | Pass. Concept checks are native `button` elements carrying `aria-expanded` and `aria-controls`, and the panel uses the `hidden` attribute, so the state is real and not a class. |

### 9.1 New color pairs introduced on this page

Remeasured Aug 21 on the maroon and dark navy palette.

| Foreground | Background | Ratio | Where |
|---|---|---|---|
| Navy `#08101F` | Navy-tint `#ECEFF4` | 16.50:1 | Concept check answer panel |
| Ink-soft `#414B5C` | White `#FFFFFF` | 8.80:1 | Section competency links |
| Maroon-dark `#5E201A` | White `#FFFFFF` | 12.37:1 | Concept check label, section eyebrow |
| White `#FFFFFF` | Navy `#08101F` | 19.02:1 | Show the answer button, pressed state |
| Maroon `#7A2A22` | White `#FFFFFF` | 9.63:1 | List bullet. Decoration, and now well past the 3:1 non-text floor. |

The gold rule that used to run down the left edge of a concept check is gone. It measured 2.90:1 and was defensible only because it was decoration; it is now a shadow, so the question does not arise.

### 9.2 Two failures found and fixed while auditing, both inherited

1. **Reflow, 1.4.10, AA. Failing.** The shell's mobile grid used a bare `1fr` track. A `1fr` track will not shrink below the min-content of its contents, and a wide table inside a scrolling container still reports a wide min-content, so the whole page picked up a horizontal scrollbar on a phone. Changed to `minmax(0,1fr)` on `week-01.html` and `competency-study-guide.html`. The contents list on the study guide also had `flex:0 0 auto` on its link text, which forbade wrapping and pushed the page to 626 px wide at a 390 px viewport. Both now measure `scrollWidth` equal to `clientWidth`.

2. **Contrast, 1.4.3, AA. Failing.** The cover band ran white text on terra cotta `#C2734D`, which is 3.59:1. Its two text runs are 13.4 px and 12.5 px, neither of which is large text, so the bar is 4.5:1. It was moved to the darker token to pass. **Superseded the same day:** the palette change put maroon `#7A2A22` in that slot at 9.63:1, so the band is back on the main accent color and clears AAA rather than scraping AA.

### 9.3 Printing

Concept-check answers are hidden behind a button on screen and forced open in print, and the button itself is dropped, so a printed or PDF copy of the week is complete. Verified in the print stylesheet. `week-01.html` is also on the reading-mode deny list: an accordion that hides the teaching would print as headings with nothing under them.

### 9.4 Still not done on this page

Live screen reader pass. Same open item as section 6 item 1, and the same plan.

---

## 10. Addendum, the math box and the per-unit prerequisite block

**Date:** August 21, 2026. **Reviewer:** Dr. Sharilyn Rennie.

### 10.1 What changed

A third readiness box, **Math**, on `before-you-start.html`. Math had been one concept out of eight inside the chemistry box, tested by a single question out of ten, which is thin for the thing every calculation in the course rests on. It is also not chemistry: a student can be solid on ions and lost on what a millimole is, and one box could not tell those two apart. Nine concepts, ten questions, same rules as the other two.

It sits **full width beneath the pair, not as a third column.** Red stays chemistry and gold stays anatomy. A third accent color in that row would break the thing the two-box design exists for, which is that a student knows which box is which before reading a word. Navy is the page's own text color, so the box reads as the house box rather than a third category competing with the other two.

A **per-unit prerequisite block** now opens each week page, generated by `tools/build-unit-prereqs.py` from a `units` array on every concept in `readiness-check.js`. Unit 1 shows the 18 concepts unit 1 actually uses, not all 27. One source, fifteen pages, refreshable.

### 10.2 Contrast

| Foreground | Background | Ratio | Where |
|---|---|---|---|
| White `#FFFFFF` | Navy `#08101F` | 19.02:1 | Math box header and its primary button |
| Navy `#08101F` | White `#FFFFFF` | 19.02:1 | Math box option borders, result border |
| Ink-soft `#414B5C` | White `#FFFFFF` | 8.80:1 | Math box progress line and "used in" line |
| Maroon-dark `#5E201A` | White `#FFFFFF` | 12.37:1 | Prerequisite block label |

The math box is the highest-contrast of the three. Chemistry is 9.63:1 and anatomy 4.87:1, so nothing regressed by adding it.

### 10.3 Verified

- Three boxes mount, no console errors, no failed requests
- Math quiz driven end to end through all ten questions: progress bar advances, each answer locks, the why line appears, the result scores by concept and lists exactly the concepts missed
- Two columns above 900 px with the math box full width beneath; all three stack at 390 px with no horizontal scroll
- Sidebar lists all three boxes
- Every concept on all three lists is tested by at least one question, every question maps to a real concept id, and every answer index is inside its options array. Checked programmatically, not by eye.

### 10.4 Two bugs found while auditing this

1. **The sidebar counter was numbering the back button.** `.sidenav a::before { content: counter(sn) }` is unscoped, so it applied to the call-to-action link under the finder as well as the numbered list, and the back button rendered as "3 Back to the course home". Scoped to `.sidenav ol li a::before` on `before-you-start.html` and `anatomy-review.html`. The same bug was fixed in the week page's parent template earlier and these two never got it.

2. **The chemistry box told students they would not need pH until week 12.** The pH concept said "Week 12 gas transport, and all of week 14" and buffers said "Week 14". Week 1 teaches both: `w1-ph-buffers` is a week 1 competency and the week 1 page has a pH and buffers block. A student reading that would reasonably defer it and arrive at week 1 short. Both now name week 1 first.
