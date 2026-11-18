# Accessibility compliance notes: Blood Lab Circuit

## 1. Project
- Project: Blood Lab Circuit (labeled Human Physiology, no course code)
- Files covered: blood-lab-circuit.html (the circuit page), cbc-tutor.html (Station 1), blood-typing.html (Station 2), esr.html (Station 3). Each is a single file with nothing else to upload.
- Date: November 17, 2026
- What changed in cbc-tutor.html: the worksheet sentence was removed, and a Back to the Blood Lab Circuit link was added. The full audit of that file is in the CBC tutor's own compliance notes.

## 2. WCAG version and level
Target: WCAG 2.2 AA, AAA contrast where achievable. The table covers the two new stations and the circuit page.

| Criterion | Status |
|---|---|
| 1.1.1 Non-text content | Met, with one note. Teaching drawings have descriptive text. In the practice cases, reading the well or the tube is the task, so the picture's label names it without giving the result. Each case offers the result in words instead: "Describe the reactions in words" (blood typing) and "Show the reading" (ESR). |
| 1.3.1 Info and relationships | Met. Landmarks, ordered headings, tables with captions and th scope, fieldset and legend on every question, radio groups named per well. Concept maps are nested lists. |
| 1.4.1 Use of color | Met. Clumped and smooth wells differ in pattern, not only color. Plasma and red cells in the tube differ in lightness and are labeled. Correct and incorrect feedback is text. |
| 1.4.3 / 1.4.6 Contrast | AAA for all text. See section 3. |
| 1.4.10 Reflow | Met. Checked at 400px wide with no sideways scrolling. Wide tables scroll inside a focusable region. |
| 1.4.13 Content on hover or focus | Met. Term definitions open on click or Enter and close with Escape. |
| 2.1.1 Keyboard | Met in code. See section 4. |
| 2.2.2 Pause, stop, hide | Met. The intro advances every 7 seconds and stops at the menu. Pause, Back, Continue and Skip intro are always available. No autoplay with reduced motion turned on. |
| 2.3.3 Motion | Met. prefers-reduced-motion removes all animation and transitions. |
| 2.4.1 Bypass blocks | Met. Skip link to main on every page. |
| 2.4.7 / 2.4.11 Focus visible | Met. 3px outline on every interactive element. |
| 2.5.8 Target size | Met. Controls are 40 to 44px or larger. |
| 3.3.1 / 3.3.3 Error identification and suggestion | Met. Wrong well readings are marked per well with a hint on how to tell clumped from smooth. A wrong tube reading says how to count down the scale. Walk-through questions say where to look. |
| 3.3.2 Labels | Met. Every input has a label or an accessible name. |
| 4.1.2 Name, role, value | Met. Tabs use tablist, tab and tabpanel. Terms use aria-expanded. Wells in the reaction reader are toggle buttons with aria-pressed and a spoken state. |
| 4.1.3 Status messages | Met. Feedback, the reaction reader result and the ESR checker result are in aria-live regions. |

## 3. Color contrast audit (calculated)

| Text | Background | Ratio | Result |
|---|---|---|---|
| Ink #060B1A | White #FFFFFF | 19.62 | AAA |
| Ink #060B1A | Page #FAFAF9 | 18.78 | AAA |
| Intro text #1A2233 | White #FFFFFF | 15.90 | AAA |
| Maroon #7A1F2B | White #FFFFFF | 10.20 | AAA |
| Muted #414B5A | White #FFFFFF | 8.83 | AAA |
| Tube labels, ink #060B1A | Plasma #F4EBC3 | 16.36 | AAA |
| Clumps #7A1F2B | Well #FBF5F5 | 9.46 | Graphic, passes 3:1 |
| Red cells #7A1F2B | Plasma #F4EBC3 | 8.51 | Graphic, passes 3:1 |
| White #FFFFFF | Dark band #060B1A | 19.62 | AAA |
| Band body text #E7EAF0 | Dark band #060B1A | 16.28 | AAA |
| Gold eyebrow #D2A94E | Dark band #060B1A | 8.90 | AAA |
| Highlight and numerals #E0566A | Dark band #060B1A | 5.33 | AAA for large text. Used only on large text. |
| Control borders #6B7483 | White #FFFFFF | 4.72 | Passes 3:1 for controls and graphics |

## 4. Keyboard navigation flow (checked in code, not yet by hand)
- Circuit page: skip link, then Open station 1, 2 and 3.
- Each station home: Skip intro, Back, Pause or Play, Continue, then Learn, Practice and Quiz, the tool button, and Back to the Blood Lab Circuit.
- Inside a station: Back to the Blood Lab Circuit, Home, the four tabs (arrow keys move between them), then the panel.
- Blood typing case: Give me a random case, the case list, seven wells with a Clumped or Smooth choice each, Check my readings, five walk-through questions in order, the blood type question, then the next-step question.
- ESR case: Give me a random case, the case list, the reading box, Check my reading, Show the reading, four walk-through questions in order, then the interpretation question.
- Focus moves to the heading of each new step as it opens.

## 5. Testing done
- Blood typing data check, all 44 cases: each of the eight blood types appears five times, four cases are forward and reverse mismatches, twelve have a positive screen, and no patient repeats. Every blood type question and next-step question has four different choices with exactly one correct.
- ESR data check, all 40 cases: eight patterns with five cases each. Every case was checked against the reference table and against the age estimate, and no case falls between the two. Every interpretation question has four different choices with exactly one correct.
- Scripted full run in headless Chrome: all 40 ESR cases from the tube reading to the saved message, including a wrong reading first, and six blood typing cases including a mismatch case and a positive screen.
- All four pages loaded with no script errors, no missing files and no sideways scroll at 400px.
- Automated checks on every tab of every page: one h1, no skipped heading levels, every input labeled, every button and link named, outside links open in a new tab with rel noopener, the circuit links carry target="_top".
- Text check on all four files: no em dashes, no italics, no mention of a worksheet.
- Not yet done: a pass with VoiceOver or NVDA, and a manual keyboard pass in a real browser.

## 6. Known limitations and remediation
- The wells and tubes are drawings made for these tutors. There is no photograph of a real agglutination reaction or a real Westergren tube. Photographs with a Creative Commons license can be added later if wanted.
- Reactions are shown as clumped or smooth only. Real reactions are graded from weak to strong, and the Learn page says so.
- The antibody screen uses two screening cells. Many labs use three.
- ESR reference ranges are the adult values from American Family Physician (men under 50: 15, women under 50: 20, men 50 and older: 20, women 50 and older: 30 mm/hr). The source table reads "under 50" and "over 50". Age 50 is treated as the older group in the ESR checker, and no practice case uses a 50-year-old.
- The ESR tube drawing shows 0 to 160 mm so the scale is large enough to read. The label under it says the scale continues to 200 mm. No case has a result above 124.
- A tube reading within 1 mm is accepted.
- The patients are teaching cases written for these tutors. They are not real people.
- Back to the Blood Lab Circuit shows only on the course site (github.io). It is hidden in the Claude preview, where that page is not next to the station.
- Progress saves in the browser only, per device.
- Fonts load from Google Fonts. If blocked, the pages fall back to system fonts.
- The iframe height sender is in every file. Canvas does not listen for it, so a Canvas embed needs a fixed height.

## 7. Reviewer
Drafted by Claude. Awaiting review by Dr. Sharilyn Rennie.
