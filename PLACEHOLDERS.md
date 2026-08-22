# What is still needed

BIO 005 Human Physiology, Yuba College, Fall 2026. Section BIOL-5-D9286.

Ordered by what blocks what. The first group has to be answered before anything else gets built, because the answers change the shape of every week page.

## Group 1, blocks the week pages

**1. Lab delivery.** Lab is asynchronous online. Which is it:

- A purchased virtual lab (Labster, PhysioEx, HAPS-aligned simulation)
- A home-lab kit students buy
- Simulations you build yourself, the way you built the ABG Tutor and the hemodynamics worksheet
- Some mix

This decides the Practice beat on all 15 weeks and touches the `lab` facet on 12 competencies. It is the single biggest open item.

**2. Exam proctoring.** Are exams proctored, and by what? A proctored exam cannot be a four-day window, which would collapse the exam-window design and change five dates.

**3. Textbook and courseware.** OpenStax Anatomy and Physiology 2e, Silverthorne, Sherwood, other. Reading assignments hang off this on every week page.

**4. Grading weights.** Categories are set in `bio005-schedule-fall2026.js` under `BIO005_GRADING`. The weights are all `null`. Needed for the syllabus, the grade calculator, and the Canvas gradebook.

## Group 2, calendar confirmations

**5. Yuba Fall 2026 observed holidays.** Veterans Day (Wed Nov 11) and Thanksgiving (Thu Nov 26 and Fri Nov 27) are assumed from the standard California community college calendar, not confirmed against the Yuba 2026-2027 academic calendar. In an asynchronous course they do not cancel a meeting, but nothing graded should be due on them.

**6. Exam 4 and Thanksgiving.** This is the one date in the term that needs a deliberate decision. Week 12 runs Nov 23 to Nov 29, and its natural exam close (Sunday Nov 29) sits on the holiday weekend. The scaffold currently proposes opening Exam 4 on Wed Nov 25 and closing it Tue Dec 1 so it straddles the break instead of landing inside it. The alternative is pulling the whole module forward a week. Either works, but it has to be chosen rather than defaulted into.

**7. All five exam windows plus the final.** Everything currently marked PLACEHOLDER. Proposals in the file:

| Exam | Covers | Proposed opens | Proposed closes |
|------|--------|----------------|-----------------|
| Exam 1 | Weeks 1 to 3 | Fri Sep 25 | Sun Sep 27 |
| Exam 2 | Weeks 4 to 6 | Fri Oct 16 | Sun Oct 18 |
| Exam 3 | Weeks 7 to 9 | Fri Nov 6 | Sun Nov 8 |
| Exam 4 | Weeks 10 to 12 | Wed Nov 25 | Tue Dec 1 |
| Exam 5 | Weeks 13 to 14 | Fri Dec 11 | Sun Dec 13 |
| Final | Cumulative | Mon Dec 14 | Wed Dec 16 |

Two things worth keeping when you adjust these. Exam 1 closes on census day (Sep 27), so posting feedback before census lets a student decide on evidence rather than on a feeling. Exam 3 closes Nov 8 and the last day to drop is Nov 21, so students have three graded exams in hand before that decision.

## Group 3, the structural call

**8. Week 15 is three days.** Mon Dec 14 to Wed Dec 16. It currently carries immune physiology, reproductive physiology, and the integration capstone, seven competencies and about 200 study minutes, and the cumulative final closes it. That is too much for three days.

Three ways out:

- **Trim.** Immune and reproductive are the lowest-yield block in the map. Reduce them to a survey and keep the capstone.
- **Shift.** Move immune and reproductive into Week 14 and give Week 15 to the final alone. Week 14 is already the heaviest week at 280 minutes, so this makes a bad week worse.
- **Rebalance earlier.** Pull one topic block forward out of Module 3 or 4 and give Module 5 a genuine third week. This is the cleanest fix and the most work, because it moves four to six competencies and shifts two exam windows.

Recommendation is trim, then revisit after you see how the cohort is doing at Exam 3.

## Group 4, nice to resolve before the term opens

9. Whether the spaced-recall card bank gets built for physiology, and if so whether it launches in Week 1 or mid-term. If it launches Week 1 it can be a graded category. If mid-term, it cannot.
10. Whether the Mastery OS gap finder and weakness dashboard get wired in. They read this competency schema without modification, so the work is configuration, not a rebuild.
11. Canvas course card design, following the BIO 004 pattern (giant numerals, small letterspaced code above, vertical rule, stacked course name). Physiology has no day pattern to encode, so the secondary line would be the delivery mode instead.
12. Whether the drawing-based synthesis submissions go through Canvas upload, a Google Form, or a tool you build.

## Known week-load imbalance

For reference when you make the Week 15 call. Course average is 208 study minutes per week.

| Week | Comps | Minutes | Note |
|------|-------|---------|------|
| 1 | 8 | 120 | Short week, opens Tuesday |
| 2 | 6 | 120 | |
| 3 | 12 | 245 | Exam 1 week |
| 4 | 7 | 140 | |
| 5 | 7 | 165 | |
| 6 | 10 | 210 | Exam 2 week |
| 7 | 9 | 195 | |
| 8 | 10 | 215 | |
| 9 | 10 | 250 | Exam 3 week |
| 10 | 8 | 215 | Veterans Day |
| 11 | 11 | 250 | Last day to drop |
| 12 | 10 | 250 | Exam 4 week, Thanksgiving |
| 13 | 11 | 265 | |
| 14 | 11 | 280 | Heaviest week, Exam 5 |
| 15 | 7 | 200 | Three days only, plus the final |

The back half of the term runs consistently heavier than the front half. That is normal for physiology, since the early modules are tools and the later modules apply them, but it is worth knowing before a student tells you about it in Week 13.

## Not needed yet

Nothing in this build assumes a section number beyond BIOL-5-D9286, a room, or a meeting time, because there are none. If a second section is added later, the data files are already structured to hold more than one.

---

## Added Aug 17 2026, blocks nothing but needs an answer

**A. Term start date. Asked seven times, still open, and it is now also in `welcome.html` week math and on the week 1 cover.** Scrubs said the course starts **Sept 5**. Sept 5 2026 is a Saturday, and the section listing says the term runs **Tue Sep 8 to Wed Dec 16**. Sep 8 is what is coded everywhere: `bio005-schedule-fall2026.js`, `BIO005_META`, and `CONFIG.termStart` in `mastery-physio-os.html`. If Sept 5 is right, change `CONFIG.termStart` in `mastery-physio-os.html` and the term dates in the schedule file, and every derived date follows. Until then Sep 8 stands.

**B. Which competency list is canonical.** Resolved in favour of the 268 list. `bio005-competencies.js` now holds 268 competencies, replacing the earlier 137. The old file is still in git history at the previous commit if any of it needs recovering. Everything downstream reads the new file and has been verified against it.

**C. DOK distribution.** The 268 list runs 160 at DOK 3, 101 at DOK 2, 7 at DOK 1. Physiology skews to predict and trace so this is expected, but it does not match the BIO 004 shape, which is mostly DOK 2. Accept, or re-level some DOK 3 items down.

**D. Which course home to keep.** There are now two: the new `index.html` and the older `physiology-course-home.html`. Both are branded correctly. Pick one and delete the other, or make one redirect to the other the way the BIO 004 repo does.

**E. Navy hex. RESOLVED Aug 21 2026.** Scrubs chose the dark navy. Every page in the repo is now on `#08101F`, so the document pages and the app surface finally agree and there is one navy. `palettes.md` still says `#1E3D4C` and is now behind the repo. See item W.

**F. Estimated study minutes.** The `est` field on each competency is derived from DOK and yield, not measured. It totals 111 hours across the term, which drives the "est. hours left" number on the Mastery Physio OS dashboard and the week-load chart on the competency map. Sanity check it against what you know real students spend.

**G. Lab facet coverage.** 132 competencies are tagged lab, written as physiology labs: spirometry, ECG, blood pressure and orthostatic testing, EMG and grip fatigue, urinalysis, ABG interpretation, enzyme assay, glucose tolerance, blood typing, nerve conduction, and simulations. Group 1 item 1 above, the lab delivery decision, has to be able to deliver these or the tags need rewriting.

**H. The card bank.** The single biggest remaining build item for the OS. 268 competencies need cards written against them, and every card must carry a competency id or answering it moves no mastery bar. Until then Recall points students at `competency-recall.html`.

**I. What replaces Loops.** Loops is short lab identification walkthroughs shot over cadaver and slide material. That format does not carry to an online physiology course. Scrubs is choosing the replacement. Whatever it is, keep the shape in `os/loops-index.js` and the Today view and the per-competency resource buttons pick it up automatically.

**J. Accessibility audit of the OS.** The fork has not been audited. See section 8 of `compliance-notes.md`.

**K. Does palettes.md govern the app surface.** The OS keeps the BIO 004 dark surface. If `palettes.md` is meant to cover applications as well as documents, the OS needs repainting and so does the BIO 004 one. If it covers documents only, say so in `palettes.md`.

**L. `index.css` 404.** `physiology-course-home.html`, `physiology-course-map.html` and all three workbooks request an `index.css` that is not in the repo. Pre-existing, not introduced here. Either commit the file or remove the reference.

**M. `competency-recall.html` is not your design.** It is the one page in this repo that was invented rather than forked. It works, and it is the only retrieval practice available while the card bank is empty. Re-fork or retire it once the bank exists.

**N. Two course homes still.** `welcome.html` (forked, live) and `physiology-course-home.html` (earlier build). Pick one.

**O. Week titles rewritten Aug 17.** The fifteen week titles were vague ("Pumps, potentials, and the language cells use", "Moving, and running the background"). They now say what the student will be able to do. Source of truth is `bio005-schedule-fall2026.js`; `schedule-fall2026.js` and the copy inside the OS are generated from it. Read them and change any you disagree with, then regenerate.

**P. Student language.** `LANGUAGE.md` now holds the rule and `tools/language-audit.py` enforces it. The audit is clean as of Aug 17. It catches banned words, it does not catch vague-but-plain writing, which is the harder failure.

**Q. Grade weights on the course home.** The Hootie answer for "how do grades work" now says the weights are not set yet, because they are not. Fix that answer in `welcome.html` once the weights exist.

**R. Readiness check resource links.** `readiness-check.js` names where to review each concept. Nine of the eighteen say "Link to add" because I will not invent a URL. Fill those in, or record short videos and point at those instead, which is what you said you wanted. The anatomy ones already point at the review deck in this repo and need nothing.

**S. Readiness questions.** 21 questions across the two checks, mixed difficulty, every concept covered. They are written and working. Change any wording you disagree with in `readiness-check.js`, but they do not need a review pass before the term.

---

## Added August 21, 2026

**T. Google Fonts on six pages.** `welcome.html`, `os/mastery-physio-os.html`, the standalone build, `competency-recall.html`, `physiology-course-home.html` and `physiology-course-map.html` still fetch DM Sans and Plus Jakarta Sans from `fonts.googleapis.com` on load. Everything else in the repo embeds them. A third-party font request is render-blocking, fails behind a strict content security policy, and leaves the page in a fallback face. `course-schedule.html` was moved to embedded fonts on Aug 21 and is the pattern. The reason the others were left is size: the eight faces are about 136 KB, and the standalone build is already 705 KB. Your call whether every page pays that to be genuinely self-contained. My recommendation is yes for the student pages and yes for the standalone in particular, since a single file that still needs the internet to look right is only half standalone.

**U. What replaces the two course homes.** `welcome.html` and `physiology-course-home.html` both still exist and both claim to be the front door. Still unresolved, still item from Aug 17, and now `welcome.html` is the one the schedule, the week page and the dock all link to. Retiring `physiology-course-home.html` is the low-risk move.

**V. Weeks 2 to 15 course material.** Week 1 is written and is the pattern. The other fourteen are not. Roughly, at week 1's depth, each week is a substantial piece of writing, and the lab delivery decision (item 1) constrains what the Practice part of each week can even say. Approve or redirect the shape of week 1 before the rest get built to match it.

**W. `palettes.md` is behind the repo.** On Aug 21 Scrubs replaced terra cotta with maroon and navy with dark navy, and removed the teal from the neutral grays. `palettes.md` at the workspace root still specifies the old PRIMARY palette, and every project CLAUDE.md points at it as the single source of truth. Until it is updated, a new session reading `palettes.md` will repaint this repo backwards. The current values are in `assets/brand.css` with the reasoning and the measured ratios.

| Token | Was | Now |
|---|---|---|
| navy | `#1E3D4C` | `#08101F` |
| navy hover | `#142a36` | `#060A18` |
| navy tint | `#EDF1F3` | `#ECEFF4` |
| terra cotta | `#C2734D` | maroon `#7A2A22` |
| terra dark | `#A0522D` | maroon dark `#5E201A` |
| ink soft | `#3C5563` | `#414B5C` |
| muted gray | `#5C6970`, `#5B7480` | `#5A6273` |
| border gray | `#CFD6DA` | `#D1D5DB` |

Gold is unchanged: `#B8924A` on light, `#8A6D33` where white text sits on it, `#DCB45C` on the dark app surface.

**X. The three lab workbooks are still on the old MedMasters tokens.** `workbook_week01`, `02` and `03` define `--mcas-rust` and friends and were not part of the Aug 17 repaint or the Aug 21 one. They are the only files left carrying that vocabulary. They should be moved onto `assets/brand.css` the next time they are edited.

**Y. Resource links for the math box.** The nine math concepts point at the week 1 material, which exists, so unlike the chemistry box there are no dead "Link to add" fields. If you want outside practice for unit conversion or reading a graph, name it and I will add it. The chemistry box still has nine "Link to add" fields waiting on you.

**Z. The `units` arrays are my reading of your `usedIn` text, not your call.** `readiness-check.js` now tags every concept with which of the five units uses it, and `tools/build-unit-prereqs.py` builds each week page's prerequisite block from that. I derived the tags from the `usedIn` sentence already on each concept. Unit 1 currently comes out at 8 chemistry, 2 anatomy, 8 math. Worth a look: if a concept is tagged into a unit it does not really serve, that unit's block gets noisy, and if one is missing a unit a student arrives short. Fix the array, rerun the tool, and every week page updates.
