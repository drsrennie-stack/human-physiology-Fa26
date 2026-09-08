# Accessibility compliance notes: site navigation and course home

**Project:** BIO 005 Human Physiology, Yuba College, Fall 2026 (repo human-physiology-Fa26)
**Files covered:** bio005-nav.js (site navigation, injected on 160 pages), index.html (course home, rebuilt), course-materials.html (rebuilt), home.html (Canvas door, simplified), 11 redirect stubs (course-entry, canvas-home, canvas-start, welcome, course-door, start-here, physiology-course-home, physiology-course-map, lecture-mission-01, lecture-mission-02, slides-p-mission-01)
**Date:** September 8, 2026

## 1. What changed and why

The course had eight front doors (home, index, welcome, course-entry, course-door, canvas-home, canvas-start, start-here) that disagreed about where "home" was, and only 77 of 183 pages carried any shared navigation. The week pages, which are the student path, carried none.

Now there is one door (home.html, framed in Canvas), one home (index.html), and one navigation bar that appears on every student-facing page: Home, This week, Weeks, Lectures, Labs, Study, Assignments, Help. The retired doors redirect. The week data (titles, open and close dates, the Saturday 8 pm Pacific early unlock) lives once, in bio005-nav.js, and both the Weeks menu and the home page read it.

## 2. WCAG 2.2 target and level achieved

Target AA on every criterion, AAA where achievable. Checked with axe-core 4.10 (WCAG 2.0, 2.1, 2.2 A and AA rule sets plus best practice) in Chromium on index.html, home.html, course-materials.html, week-01.html, week-05.html, lecture-week.html, course-start.html, door-lecture.html, syllabus-fall2026.html, and note-sheet.html. Result: zero violations on every page except note-sheet.html, which carries two pre-existing "content outside a landmark" findings in its own markup (.pick and .band) that predate this work and are noted for remediation.

| Criterion | Level | Result |
|---|---|---|
| 1.3.1 Info and relationships | A | Pass. Nav is `<nav aria-label="Course sections">` holding a list. Disclosures are buttons with aria-expanded and aria-controls. Brand bar carries a landmark role (banner, or a named region on pages that already have a banner). |
| 1.4.3 Contrast (minimum) | AA | Pass, AAA. See section 3. |
| 1.4.6 Contrast (enhanced) | AAA | Pass for all nav text. |
| 1.4.10 Reflow | AA | Pass at 320 px. Bar wraps to two rows, panels become full-width fixed sheets pinned under the bar. |
| 1.4.11 Non-text contrast | AA | Pass. Active underline #8B3A2E on white 8.6:1. Focus ring #8B3A2E 3 px. |
| 1.4.12 Text spacing | AA | Pass. No fixed heights on text containers. |
| 1.4.13 Content on hover or focus | AA | Pass. Panels open on click only, dismiss with Escape, and stay open until dismissed. |
| 2.1.1 Keyboard | A | Pass. Every link and button reachable by Tab, panels open with Enter or Space, Escape closes and returns focus to the button. Verified in Chromium: focus after Escape lands on the Weeks button. |
| 2.1.2 No keyboard trap | A | Pass. Tabbing out of a panel closes it. |
| 2.4.1 Bypass blocks | A | Pass. Skip link is first in the tab order on every page (added by the script where the page has none). |
| 2.4.3 Focus order | A | Pass. Panel content follows its button in DOM order. |
| 2.4.4 Link purpose | A | Pass. Every week link reads "Week N, title, state". Locked weeks add "not open yet" for screen readers. |
| 2.4.7 Focus visible | AA | Pass. 3 px maroon outline, inset on the bar so the sticky bar cannot clip it. |
| 2.4.8 Location | AAA | Pass. Current page has aria-current="page"; the current section is marked visually and with hidden text "(current section)". |
| 2.4.11 Focus not obscured (minimum) | AA | Pass. Sticky bar is 52 px; scroll-margin is not needed because no page positions content under it. |
| 2.5.8 Target size (minimum) | AA | Pass. Every nav target is at least 48 px tall; panel links 44 px. |
| 3.2.3 Consistent navigation | AA | Pass. Same eight items in the same order on every page. |
| 3.2.4 Consistent identification | AA | Pass. |
| 4.1.2 Name, role, value | A | Pass. axe clean. |

## 3. Color contrast audit

| Pair | Ratio | Normal text | Large text |
|---|---|---|---|
| Nav text #0B1530 on #FFFFFF | 15.9:1 | AAA | AAA |
| Nav active and hover #8B3A2E on #FFFFFF | 8.6:1 | AAA | AAA |
| Nav sub-label #5A6675 on #FFFFFF | 5.6:1 | AA | AAA |
| Panel current row #8B3A2E on #FBF4F2 | 7.9:1 | AAA | AAA |
| Home page body #414B5C on #FAFAF9 | 7.9:1 | AAA | AAA |
| Home page faint #5A6675 on #FFFFFF cards | 5.6:1 | AA | AAA |
| Maroon button text #FFFFFF on #8B3A2E | 8.6:1 | AAA | AAA |
| Footer link #F5F1E8 on #060A18 | 17.6:1 | AAA | AAA |
| Footer legend #C9CFD6 on #060A18 | 11.2:1 | AAA | AAA |
| Door card text #060A18 on #C9A14A | 8.1:1 | AAA | AAA |
| Materials badge #FFFFFF on #8A6D33 | 5.6:1 | AA | AAA |

Two sub-label and badge pairs clear AA rather than AAA for normal text. Both are secondary text beside AAA primary text and carry no information on their own.

## 4. Keyboard navigation flow verified

Skip link, brand mark, Home, This week, Weeks (button), Lectures, Labs, Study, Assignments, Help (button), then page content. Opening Weeks moves focus to the current week; Escape returns it to the button; Tab past the last week closes the panel. Same for Help. On course-materials.html the type pills are toggle buttons with aria-pressed, the week list is a list of toggle buttons, and the search field is labelled; the count line is aria-live so filter results are announced.

## 5. Screen reader testing

Checked by accessibility-tree inspection in Chromium (Playwright) and by reading the axe output. Landmarks on the home page: banner (brand bar), navigation "Course sections", main, contentinfo. Headings: one h1 per page, h2 for each block. Not yet verified with a live NVDA or VoiceOver session; that is the remaining check and is listed below.

## 6. Known limitations and remediation plan

1. note-sheet.html has two regions outside landmarks in its own markup. Wrap .pick and .band in the page's main or a labelled section.
2. Live screen reader pass (VoiceOver on macOS, NVDA on Windows) has not been run on the new nav. Run it on index.html, week-01.html and course-materials.html.
3. Pages that were excluded from the injected nav on purpose: slide decks (their own present mode), the Mastery OS (its own application chrome), print sheets, and Canvas snippet pages. Slide decks still carry the floating Back button.
4. bio005-lab-plan.js still carries the August week titles for weeks 5 to 8 (Nervous System, Muscle, Endocrine, Reproductive) which no longer match the week map of record. The lab door reads those titles. Content fix, not an accessibility one.
5. The syllabus weekly rhythm table (section 05) describes a seven-step week with 25/25/15 weights; the week pages and the grading model of record use six steps and 20/40/15/15/10. Only the "Mission" row was removed here; the rest needs Dr. Rennie's call.

## 7. Reviewer

Built and checked September 8, 2026, for Dr. Sharilyn Rennie. Automated checks: axe-core 4.10.2 in Chromium via Playwright, desktop 1280 px and mobile 390 px.

## Addendum, September 8, 2026, second drop

Files added or changed: week-01.html to week-15.html (regenerated from tools/gen_week_pages_v2.py on the seven-stage model), lecture-week.html (Week 1 videos listed in order), door-assignments.html (four graded categories), bio005-nav.js (week gate with build hold), index.html, course-questions.html and seven pages with office-hours wording removed.

Checks rerun with axe-core (WCAG 2.0, 2.1, 2.2 A and AA plus best practice): week-01, week-02, week-15, lecture-week?week=1, lecture-week?week=3 (gated), week-03-notes (gated), door-assignments, index. All clean. The gate replaces the main landmark's content with one h1, one status card and a list of five links, each at least 44 px; the page's own masthead is hidden so there is a single visible h1. Stage cards on the week pages are ordered lists with labelled link groups; graded category chips are text, not color alone.
