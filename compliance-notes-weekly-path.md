# Accessibility compliance notes: Weekly Path (Learn, Practice, Apply, Check)

## 1. Project, files, date

BIO 004 Human Anatomy, Fall 2026. The "Your Path This Week" walkthrough on every week page.

Files covered: bio004-path.js (renderer and styles), bio004-path-data.js (per-week checklist data), week-1.html through week-17.html (rewired to the renderer; the old pre-work and lab-extras cards were replaced, the class-days block was kept and moved into stage 3), bio004-dock.js (tiles regrouped into This week, 1 Learn, 2 Practice, 3 Apply, 4 Check, About the course, plus a This week's path tile), bio004-launchpad.html and bio004-launchpad-overlay.js (a four-stage path row above the doors), mastery-canvas.html (the BIO 004 drawing canvas restored from the Aug 21 version after the Sept 7 upload replaced it with the physiology copy).

Date: September 13, 2026.

## 2. WCAG version and level

WCAG 2.2. Target AA everywhere, AAA reached for text contrast on every pair listed below.

1.3.1 Info and relationships: pass. Each stage is a section with a numbered h2; sub-blocks are h3. The four-stage strip is an ordered list. The "You're Ready When" list uses real checkboxes with for and id labels.
1.4.3 and 1.4.6 Contrast: pass at AAA, see section 3.
1.4.10 Reflow: pass. The strip goes from four columns to two to one; tiles become compact rows at phone width. No horizontal scroll at 400 px.
2.1.1 Keyboard: pass, see section 4.
2.4.3 Focus order: pass. Reading order is strip, then stages 1 to 4, then the graded card.
2.4.4 Link purpose: pass. Every link has visible text plus a one-line subtitle; external links open in a new tab and carry rel noopener.
2.4.6 Headings and labels: pass. Stage headings carry the number and stage name for screen readers and for the site's reading format fold, so a folded row reads "2. Practice. Can I produce this without looking at the answer?".
2.4.7 Focus visible: pass. The week pages already define a 3 px terra focus ring on :focus-visible; nothing in the path overrides it.
2.3.3 Animation from interactions: pass. Tile lift is disabled under prefers-reduced-motion.
4.1.2 Name, role, value: pass. Decorative icons are aria-hidden and focusable false. The Looking / Retrieving comparison is a role img with an aria-label. The Atlas, Loops, Check pill row is aria-hidden and the triage list below it carries the same information as text.

## 3. Color contrast audit

| Text | Background | Ratio | Result |
|---|---|---|---|
| Navy #08101F | White #FFFFFF | 19.0:1 | AAA |
| Navy #08101F | Off-white #FAFAF9 | 18.2:1 | AAA |
| White #FFFFFF | Maroon #7A2A22 (stage 2 chip, icon, pills) | 9.6:1 | AAA |
| Maroon #7A2A22 (stage names, eyebrow) | White #FFFFFF | 9.6:1 | AAA |
| Maroon #7A2A22 | Off-white #FAFAF9 | 9.2:1 | AAA |
| Navy #08101F | Gold #DCB45C (stage 3 chip, icon, pills) | 9.7:1 | AAA |
| Muted gray #4B5262 ("Looking", struck through) | White #FFFFFF | 7.8:1 | AAA |
| Navy #08101F (stage 4 chip, outlined) | White #FFFFFF | 19.0:1 | AAA |
| Launchpad path row: same four chip pairs as above on white | | | AAA |
| Dock group headers (existing dock styles, unchanged) | | | as before |

Stage colors are not the only signal. Each stage also carries its number, its name in text, and a distinct icon.

## 4. Keyboard navigation flow verified

Tab reaches, in order: the four stage tiles (each an anchor to its stage), every link inside stage 1, every link inside stage 2, the class-day section buttons already on the page, links in stage 3, links and the two triage links in stage 4, then the five checkboxes. Enter follows links; Space toggles checkboxes. A stage tile opens its folded section, because the site's reading format honours hash navigation. No keyboard trap. Verified in headless Chromium with a scripted tab walk: 50 stops inside the path, in document order, then out to the graded card. Not yet walked by hand on a real device.

## 5. Screen reader testing

Verified against the accessibility tree in Chromium (headless, Playwright). Landmarks: banner, main, contentinfo already on the page. Each stage announces as "region, 1. Learn. What do I need to understand and recognize?" via aria-labelledby. Each link announces its title and subtitle. Checkboxes announce their label text and state. Icon-only elements announce nothing. Not yet run through VoiceOver or NVDA on a real device.

## 6. Known limitations and remediation plan

The old numbered card counter on the graded card was hidden by the path stylesheet, since the stages now carry their own numbers. The graded card keeps its eyebrow.

Checkbox state is stored in localStorage on the student's own device. It is a convenience, not a record, and the page says so.

Text "Learn to See It", "Now Retrieve It" and the six lab steps are English only.

The reading format's folded-row label concatenates the eyebrow and the title on the graded card ("Counts toward your gradeGraded this week"). That is a pre-existing behavior in bio004-reading-mode.js, not introduced here, and is worth a one-line fix in that file.

## 7. Reviewer

Dr. Sharilyn Rennie

## Addendum, Sept 13 2026 (later the same day): Recall Rx as its own app, and the evidence fix

Files: recall-rx.html (new), bio004-spaced-recall.html (redirect retargeted), mastery-evidence.js and mastery-os-fall-2026.html (card-level competency attribution), recall-cards.html (untouched; it is the personal build-your-own deck and stays as it was).

recall-rx.html mounts the same recall engine (recall-view.js) on the same card bank and the same maps Mastery OS uses, so nothing is duplicated. Page chrome matches the week pages: skip link to the cards, one h1, landmarks (banner, main, contentinfo), 3 px terra focus ring, the engine's own controls restyled as real buttons and selects with visible focus. Contrast pairs are the ones in section 3. Verified headless: the engine mounts (4,674 cards), a scripted answer lands in localStorage bio004-recall-v2, and Mastery OS opened in the same browser context reads it as evidence on exactly the competencies that card is tagged to.

Evidence accuracy: before this change a single card credited every competency in its topic (t-tissues holds seven). Both mastery-evidence.js and the repair-run counter in Mastery OS now look up the card-level entry (topicId:cardId from card-competency-fine.js) first and fall back to the topic only when a card has no per-card tag. Simulated in Node: one answered card in t-tissues now produces entries on 2 competencies, not 7.

Known: the engine's own "sure and wrong" note carries a left accent rule from its Mastery OS styling. It is inside recall-view.js and shared with Mastery OS, so it was left alone.
