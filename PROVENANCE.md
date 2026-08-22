# Where every number in this build came from

BIO 005 Human Physiology, Yuba College, Fall 2026.

The rule for this course is that nothing is presented as more certain than it is. This file is the audit. Three categories: **confirmed** came from a real source, **computed** was derived arithmetically from something else in this repo, **estimate** is an authored guess.

An estimate is not a problem. An estimate wearing the costume of a measurement is.

---

## Confirmed

From the section listing you sent.

| Fact | Value | Source |
|------|-------|--------|
| Section | BIOL-5-D9286 | Section listing |
| Campus and mode | Sutter Internet (NET), asynchronous online, lecture and lab | Section listing |
| Term start and end | Sep 8 2026 to Dec 16 2026 | Section listing |
| Census | Sep 27 2026 | Section listing |
| Last day to drop | Nov 21 2026 | Section listing |
| Seats and waitlist | 30 and 10 | Section listing |

## Computed

Arithmetic on the confirmed facts or on data in this repo. Correct given their inputs.

| Figure | Value | Derived from |
|--------|-------|--------------|
| Instructional weeks | 14 full plus a 3-day Week 15 | Calendar arithmetic on Sep 8 to Dec 16 |
| Every week open and close date | 15 rows | Calendar arithmetic, verified against day of week |
| Competency count | 137 | Counted from the map |
| Weekly study minutes per week | 120 to 280, average 208 | Sum of the `est` field per week. **Correct arithmetic on estimated inputs.** |
| Total study load | about 52 hours | Same. Same caveat. |
| Scholar Points reachability | async-only routes can reach the target, live-only routes can too through repetition | Checked both directions against the route values |
| Grade weights total | 100 | Summed and verified |
| Every contrast ratio in compliance-notes.md | as listed | WCAG relative luminance formula, computed not eyeballed |

## Estimates

Authored guesses. Reasonable, defensible, and not measurements. Every one of these should be replaced with a real number once a cohort has actually run.

| Figure | Value | What it feeds | How to replace it |
|--------|-------|---------------|-------------------|
| Competency `est` minutes | 10 to 40 per competency | The week-load chart, the 52-hour total, and the 3.5 study hours on the main sheet | Ask students to log actual time on a sample of competencies in Weeks 2 to 4 |
| Lecture segments and guided notes | 2.5 hrs/week | Main sheet total | Time your own recordings once they exist |
| Reading | 2.0 hrs/week | Main sheet total | Depends on the textbook decision |
| Drawing and voice-over | 1.0 hr/week | Main sheet total | Observable from Week 2 submissions |
| Weekly checkpoint | 0.75 hr/week | Main sheet total | Canvas reports actual quiz duration |
| Project work averaged | 1.0 hr/week | Main sheet total | Observable in the build log thread |
| Discussion and Scholar Points | 0.5 hr/week | Main sheet total | Observable |
| Teaching video grading time | about 5 hours per term | The workload argument for 4 rounds rather than 15 | Time yourself on the first round |
| All grading weights | 10, 10, 20, 20, 10, 10, 7, 8, 5 | The whole grade model | Your decision, marked "suggested" everywhere it appears |
| Scholar Point values | 3, 1, 3, 2, 2, 1 | The bonus category | Your decision |
| All exam window dates | six windows | The schedule | Your decision, marked PLACEHOLDER in the data |

## Not confirmed, and currently a guess that matters

**The unit count.** The build assumes 3 lecture units plus 1 lab unit. That has not been checked against the Yuba course outline of record. It feeds the Carnegie cross-check on the main sheet.

Because it is unconfirmed, `unitsConfirmed` is set to `false` in `start-here.html`, and the student-facing page does not print the unit sentence at all. It prints an honest note instead. Flip that flag to `true` once you have checked the COR and the cross-check sentence turns back on.

**The Yuba holiday calendar.** Veterans Day Nov 11 and Thanksgiving Nov 26 to 27 are assumed from the standard California community college calendar. Marked `status:'assumed'` in the schedule data.

## Content I wrote that you need to check

**The 137 competency statements.** I authored every one. They follow standard physiology scope and the wording is mine. You are the subject matter expert and they are your course. Read them before they go in front of anyone.

**The eight scenarios in `which-way-demo.html`.** Demonstration content, written to let you judge the format. Two carry nuance that is easy to state wrongly and are flagged in the file header: the hyperkalemia sequence and the passive versus active tension distinction on the length-tension curve.

## Things removed for being fake

**The status pill on the Lecture door.** It said "Start here" and never changed. It borrowed the visual language of your NOW and CATCH UP pills, which in Mastery OS are driven by real state. A pill that always says the same thing on the same card is decoration impersonating a status indicator. Removed. The pill mechanism is still in the CSS and the render loop, so the moment there is real state to show, set `pill` and `pillKind` on a door and it appears.

**The progress bar and the recall count** from your sample card. Not built. "0 of 55 min" and "16 competencies up for recall" require per-student tracking that does not exist yet. A progress bar that never moves is worse than no progress bar, because it teaches students to ignore the interface. Both go in the moment the recall tool and the checkpoint data are wired up.

## Standing rule for this build

If a number cannot be traced to this file, it does not go on a page. If it is an estimate, it says so where a student or a dean can see it, not only in a code comment.
