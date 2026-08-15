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
