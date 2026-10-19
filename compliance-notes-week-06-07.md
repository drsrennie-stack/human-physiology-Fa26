# Compliance notes, Weeks 6 and 7

BIO 005 Human Physiology. October 18, 2026. Scope: the site Week 6 and Week 7 build (Canvas Weeks 7 and 8), made the same way as Week 5. Students read the Canvas week numbers through bio005-week-label.js; file names keep the site numbers.

Files covered: the eight walkthroughs (biol005-w06-*-guided.html, biol005-w07-*-guided.html) and their written notes pages, week-06-notes.html, week-07-notes.html, week-06-preread.html, week-07-preread.html, lab-week06-muscle.html, lab-week07-hormones.html, lab-week08-hormone-cycle.html (relabeled as Part 4 of the Week 7 lab), lecture-week.html (Weeks 6 and 7 added), the Canvas pages in _canvas/pages/w06-* and w07-*, and the PDFs in notes/ and sheets/ for Weeks 6 and 7.

## WCAG version and level

WCAG 2.2 AA throughout, AAA for text contrast. Same shells as Week 5, so the skip link, focus ring, heading focus on each walkthrough step, live region for the figure description, labeled worksheet fields, reduced motion handling and print view are the same code.

## Color contrast

Same palette as Week 5, every text pair checked on white:

| Text | Background | Ratio | Result |
|---|---|---|---|
| Navy #0B1530 | White #FFFFFF | 18.0:1 | AAA |
| Maroon #8B3A2E | White #FFFFFF | 7.7:1 | AAA |
| Maroon dark #6E2D24 | White #FFFFFF | 10.2:1 | AAA |
| Ink #414B5C | White #FFFFFF | 8.8:1 | AAA |
| Navy #0B1530 | Yellow video button #FFD23F | 12.5:1 | AAA |

Gold #C9A14A and the tissue and fluid tints are fills and rings only and never carry text. In Weeks 6 and 7 the click instructions in the figures now have a white halo behind them, so no line passes through the words.

## Keyboard

Every walkthrough was played from start to finish by an automated student: it typed each prediction, pressed Show me, and clicked every target in the figure. Next stays locked until each hands-on action is done, and the target can also be triggered with Enter or Space. The Enlarge view closes with Escape and returns focus to its button.

## Screen reader

Automated checks only, the same as Week 5: every input has a label, headings do not skip a level, each figure has a full text description that names what to click, and the description is read through a live region when a step changes. No hand pass with NVDA or VoiceOver.

## Checked

All 56 page loads (each page as a student and in preview) were opened in headless Chromium, with no script errors and no failed requests. Every link on every new page resolves. The prompt arrows in all 195 click instructions were checked so none crosses its own words, and no label runs off a figure. No page contains italics, an em dash, or the Lora font, and the spelling check found no British spellings.

## Known limits and plan

1. Several support videos were confirmed by title and channel but could not be watched from the build environment. Their "listen for" lines are kept general. Some steps have no video because none could be verified; the template leaves a button out rather than ship one that might be wrong.
2. Silverthorn pointers name the chapter and the part to read rather than a figure number, because the 9th edition figure numbers for these chapters were not checked.
3. The pre-read and lab PDFs were printed from Chromium, not tagged PDF/UA. The notes PDFs were made by tools/make_notes_pdf.py and are tagged.
4. Third-party videos are linked, not copied, and their captions were not checked.

Reviewer: Dr. Sharilyn Rennie
