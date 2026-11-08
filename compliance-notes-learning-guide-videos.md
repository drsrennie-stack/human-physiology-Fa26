# Compliance notes: Learning Guide, video library, Week 9 and 10 video lists

Project: BIO 005 Human Physiology, Fall 2026. Date: November 8, 2026.

Files covered: `learning-guide.html`, `index.html`, `physiology-videos.html`, `bio005-part2-data.js` (video links only),
`li/w9/study.html` and `site/li/w9/study.html`, `li/w10/study.html` and `site/li/w10/study.html` (video lists only).

## WCAG version and level

WCAG 2.2 AA met throughout; AAA met for all body text contrast.

- 1.3.1 Info and relationships: rows are `section` elements labeled by their own `h2`; side menus are `nav` landmarks labeled by their headings; link lists are real lists. AA.
- 1.4.3 / 1.4.6 Contrast: see the table below. AAA for text.
- 2.1.1 Keyboard: every link, the week menu and the week buttons work from the keyboard; each video list is a native `details` element, opened with Enter or Space. AA.
- 2.4.1 Bypass blocks: skip link first on the guide and the video page. AA.
- 2.4.4 Link purpose: every video link names the video; links that open a new tab say so to screen readers. AA.
- 2.4.7 / 2.4.11 Focus visible and not obscured: 3 px focus ring on every control. AA.
- 2.5.8 Target size: links are at least 42 px tall; video list buttons at least 32 px. AA.
- 2.3.3 Animation from interactions: the New pointer stops moving under prefers-reduced-motion. AAA.

## Color contrast audit

| Text | Background | Ratio | Result |
|---|---|---|---|
| Row heading #7A2E24 | Row tint #E1E5ED / #F3E8D2 / #EFDCD6 | 7.41 / 7.70 / 7.08 | AAA |
| Row text #2A3949 | Row tint #F3E8D2 / #E1E5ED | 9.71 / 9.34 | AAA |
| Link text #060B1A | White | 19.62 | AAA |
| Band eyebrow and stats #E3C27D | Band #060B1A to #1B2A4A | 11.47 to 8.32 | AAA |
| Band text #DCE2EE | Band at its lightest #1B2A4A | 10.94 | AAA |
| Pill text #060B1A | Gold #E3C27D | 11.47 | AAA |
| Video list label #8B3A2E | White | 7.66 | AAA |
| Video start times #414B5C | White | 8.80 | AAA |
| Video page title word #C9624C | Band at its lightest #1B2A4A | 3.61 | AA large text (54 px bold) |

## Keyboard navigation flow verified

Learning Guide: skip link, week menu, the six rows in order, then Quick links, Part 2 weeks, More help.
Study pages: the video list sits right under the competency line on the first slide of each section. Opening it does not
reveal a box or move to another slide; the arrow keys still move one reveal at a time.

## Screen reader testing

Verified from the accessibility tree in headless Chromium: heading order H1 then H2 (guide) and H1, H2, H3 (video page)
with none skipped, named landmarks, no empty link names. The New pointer is hidden from screen readers and replaced
by the visually hidden word "New:". No manual NVDA, JAWS or VoiceOver pass yet.

## Known limitations and plan

1. Loom start times use `?t=` seconds. If Loom ever ignores the parameter, the button still names the start time.
2. No manual screen reader pass. Plan: one VoiceOver pass on the guide before Week 11 opens.

## Reviewer

Claude, November 8, 2026.

## Added the same day: the mastery pathway pages

Files: `choose-your-pathway.html`, `mastery-pathway.html`, `week10-drawing.html`, `week10-cases.html`, the target picker in
`hemodynamics-lab.html`, the pathway rows in `learning-guide.html` and `your-week.html`, and the grading pages.

- Target choices are real radio buttons in a `fieldset` with a `legend`, so a screen reader announces the group and each level.
  The Mastery Check questions are each a `fieldset` whose `legend` is the question; multiple-answer questions use checkboxes and say so.
- Errors (no name, no target, unanswered questions) are announced in a `role="alert"` region and focus moves to the first problem.
- After submitting, focus moves to the report. Right and wrong are said in words, not by color alone.
- Level tables use `th scope="row"` for each level and a hidden caption.
- Contrast: all text pairs reuse the tokens measured above (AAA). Right and wrong feedback: #1E5A3A on #EAF3EE and #7A2E24 on #F9EDEA, both above 7:1.
- Print: the drawing page prints three tall empty boxes in black and white; the case and policy pages print black on white.
- Verified in headless Chromium at 1280 px and 390 px: no script errors, no sideways scrolling, headings in order.

## Week 11 pathway pages, Nov 8 2026
Files: week11-drawing.html, week11-cases.html, cbc-pcr-lab.html (pathway card), physiology-videos.html (Week 11 section).
- Same shell as the Week 10 pathway pages (common.py): one h1, h2 per card, h3 inside; level tables with scope="col"/"row" headers and a hidden caption.
- Links: internal target="_top", external target="_blank" rel="noopener" with a "(opens in a new tab)" note for screen readers. Checked by script: no link without a target.
- Render check at 1280 and 390 px wide: no page errors, no sideways scroll, no italic text, no em dashes.
- CBC lab: the target picker is a fieldset with a legend; each radio has a label (for/id). Heading order inside the lab is the lab's own and unchanged.
- Contrast: same tokens as the Week 10 pages (AAA for body text).

## Written notes for Weeks 7 to 15 (topic notes), Nov 8 2026
Files: biol005-w07-reproduction-notes.html, biol005-w09-heart-notes.html, biol005-w10-vessels-bp-notes.html, biol005-w11-blood-notes.html, biol005-w11-lymph-immunity-notes.html, biol005-w14-kidney-notes.html, biol005-w14-fluid-electrolytes-notes.html, biol005-w15-acid-base-notes.html, week-09 to week-15 notes pages, and the matching PDFs in notes/.
- Same paper shell as the Week 6 and 7 walkthrough notes: one h1, an h2 per section, h3 inside; tables with th scope; every section open (no folding).
- PDFs: tagged PDF/UA-1 with structure tree, language en-US and title (checked by tools/make_pdf.py audit). Two columns, 9.8 pt text, black ink with course-red headings.
- Links: internal target="_top", external target="_blank" rel="noopener" with a screen-reader "(opens in a new tab)" note. Each section names its numbered competencies with links to that week's competency list.
- Render check at 1280 and 390 px: no page errors, no sideways scroll, no italic text, no em dashes.
- Content: written from Dr. Rennie's notes and the course competency lists, then checked by a separate reviewer for accuracy; no publisher figures or text.
