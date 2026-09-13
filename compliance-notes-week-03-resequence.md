# Accessibility compliance notes

## 1. Project

BIO 005 Human Physiology, Week 3 resequence: the cell and cell signaling from Dr. Rennie's recorded concept videos, transport moved to Week 4, and the competency map for Weeks 3 to 8 re-cut to match.

Files covered:

- `concept-videos-week03.html` (25 concepts) and `concept-videos-week04.html` (38 concepts), built on the Week 1 concept video page
- `slides-P-C01.html` to `slides-P-C18.html` and `slides-P-S01.html` to `slides-P-S07.html`, one deck per Week 3 concept, built on the Week 1 per-concept deck
- `week-03-competencies.html` to `week-08-competencies.html`, regenerated with her generator on the same page shell
- `week-03.html` to `week-08.html`, `week-04-notes.html` to `week-08-notes.html`, `lecture-week.html`, `door-lecture.html`, `note-sheet.html`, `competencies-by-week.html`, `syllabus-fall2026.html`, `bio005-nav.js`, `bio005-schedule-fall2026.js`, `bio005-week-grid.js`, `assets/bio005-sheet-data.js`, `tools/prompts/week03.json` to `week08.json`: titles, counts and competency lists only
- `biol005-w03-compartments-notes.html` and `-slides.html`: close-out renumbered to the new Week 3 list

Date: September 13, 2026.

## 2. WCAG version and target

WCAG 2.2. Level AA met on every criterion checked. AAA met for text contrast, reduced motion and focus appearance. Every new page is a copy of an already audited shell (the Week 1 concept video page and the Week 1 per-concept deck) with only the data changed, so the landmarks, skip links, focus styles, live regions, keyboard handling and print rules are inherited unchanged.

## 3. Color contrast audit

Same pairs as the Week 1 pages: navy #0B1530 on white 18.04:1, terra #8B3A2E on white 7.66:1 (the `hot` emphasis in deck boxes), white on terra 7.66:1 (masthead and topband), navy-72 #4A5265 on white 7.56:1. Gold never carries text on a light background.

## 4. Keyboard navigation

Concept video pages: every concept in the index is a button, the player controls are buttons, the autoplay toggle is a real checkbox with a label, and the now-playing text is an `aria-live` status. Deck pages: Back, Next, Reset, Pen, Present and Print are buttons; each reveal box is a button with `aria-expanded`; arrow keys move between slides; Reset closes every box. Competency pages: each prompt is a checkbox with a label and ticks persist per device.

## 5. Screen reader

Checked against the accessibility tree in Chromium (Playwright). Deck headings carry the concept title as h1 and one h2 per slide. The video page announces the concept number and title on every change. The competency pages keep the h2 per group and h3 per competency.

Not yet done: a manual pass with VoiceOver and NVDA.

## 6. Known limitations and remediation

- The videos are on YouTube and the notes are Drive PDFs. Caption quality on the YouTube videos and the tagging of the Drive PDFs are hers to verify; neither is checked here.
- `bio005-competencies.js` is not in any drop in Downloads, so the `week` field on the 89 moved competencies could not be updated at the source. Every generated page and data file in this drop is correct, but pages that read `bio005-competencies.js` at runtime (the study guide, the packet print page, the Mastery OS week filter) will keep showing the old weeks until that file is patched. Send the file and it gets patched in one pass.
- `bio005-lab-plan.js` was not touched. Its week keys already differed from the week pages before this change.

## 7. Reviewer

Built and checked by Claude for Dr. Sharilyn Rennie. Headless checks: zero console errors on every new and changed page (YouTube and the site's own script includes excluded, since they are not served in the test), 25 and 38 concepts render and index correctly, each deck steps, reveals and resets, and the six competency pages count 11, 20, 23, 25, 24 and 22.
