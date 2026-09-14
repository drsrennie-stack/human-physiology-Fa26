# BIO 005 Canvas pages, Week 1 and Week 2

September 14, 2026. Twenty two Canvas pages, written as Canvas native HTML. No iframes,
no scripts, no stylesheet. Everything is inline, which is what the Canvas editor keeps.
The only classes used are Canvas's own (`Button`, `screenreader-only`).

One page per step, and the steps are grouped under the four stages the course site
already uses on its cards: Learn, Practice, Apply, Check. Each page carries its stage
label at the top in the stage's own colour, so a student always knows which part of the
week they are in.

## The four stages, and what sits in each

| Stage | Card name | Steps |
|---|---|---|
| Learn (maroon) | Learn it with Dr. Rennie | 1 print your week, 2 first pass, 3 second pass, 4 upload your note sheet |
| Practice (navy) | Try it from memory | 5 study it for several days |
| Apply (gold) | Use what you learned | 6 lab, 7 your patient, 8 discussion |
| Check (outline) | Find the gaps | 9 Mastery Check, and upload your report |

All of the graded weekly work sits in Apply. Learn, Practice and Check carry no points;
the note sheet upload and the Mastery Check report are marked complete or not complete
and are the participation record.

## How to paste one

1. Pages, + Page. Type the title from the table below exactly. The title becomes the h1
   and the module row label, so the pasted HTML starts at h2.
2. In the editor, click the `</>` icon at the bottom right of the toolbar. Paste the
   whole file. Switch back, check it renders, Save.
3. Add the page to its module, in the order below.

## The pages

| File | Canvas page title | Stage |
|---|---|---|
| `how-every-week-works.html` | How every week works | all four |
| `how-grading-works.html` | How grading works | all four |
| `w01-00-overview.html` | Week 1 overview: How physiology works and what keeps you steady | |
| `w01-01-print-your-week.html` | Week 1, Step 1: Watch the intro, then print your week | Learn |
| `w01-02-first-pass.html` | Week 1, Step 2: First pass, in your first color | Learn |
| `w01-03-second-pass.html` | Week 1, Step 3: Second pass, in your second color | Learn |
| `w01-04-upload-note-sheet.html` | Week 1, Step 4: Upload your note sheet | Learn |
| `w01-05-study-it.html` | Week 1, Step 5: Study it for several days | Practice |
| `w01-06-lab.html` | Week 1, Step 6: Lab, the Reference Range Lab | Apply |
| `w01-07-patient.html` | Week 1, Step 7: Your patient, the preseason physical | Apply |
| `w01-08-discussion.html` | Week 1, Step 8: Two discussions this week | Apply |
| `w01-09-mastery-check.html` | Week 1, Step 9: Mastery Check, and upload your report | Check |
| `w02-00-overview.html` | Week 2 overview: The cell, and how cells talk | |
| `w02-01-print-your-week.html` | Week 2, Step 1: Print your week | Learn |
| `w02-02-first-pass.html` | Week 2, Step 2: First pass, in your first color | Learn |
| `w02-03-second-pass.html` | Week 2, Step 3: Second pass, in your second color | Learn |
| `w02-04-upload-note-sheet.html` | Week 2, Step 4: Upload your note sheet | Learn |
| `w02-05-study-it.html` | Week 2, Step 5: Study it for several days | Practice |
| `w02-06-lab.html` | Week 2, Step 6: Lab, PhysioEx Exercise 8, amylase | Apply |
| `w02-07-patient.html` | Week 2, Step 7: Your patient, the student health visit | Apply |
| `w02-08-discussion.html` | Week 2, Step 8: Discussion 2, predict then check | Apply |
| `w02-09-mastery-check.html` | Week 2, Step 9: Mastery Check, and upload your report | Check |

`page-titles.json` has the same list in machine form.

## Module layout

**Start Here module:** the syllabus, then `How every week works`, then `How grading works`.

Both of those titles matter more than usual, because pages link to each other by title.
Canvas turns a page title into its URL, so `How grading works` has to live at
`/pages/how-grading-works` and `How every week works` at `/pages/how-every-week-works`.
Type them exactly and the cross links work; rename one later and its incoming link breaks.

**Week 2 module.** Use a Canvas text header for each stage (the + button in the module,
change the type to Text Header), so the module list itself shows the four categories with
the steps under them. The step pages say "use the Next button," so the order here is what
makes that true.

1. Page, Week 2 overview.
2. **Text header: LEARN, learn it with Dr. Rennie**
3. Page, Step 1 Print your week.
4. Page, Step 2 First pass.
5. Page, Step 3 Second pass.
6. Page, Step 4 Upload your note sheet.
7. **Assignment,** Week 2 note sheet. File upload, one file. Display grade as
   Complete/Incomplete, 0 points, in a Participation group weighted 0 percent. Due Sun
   Sep 20, 10:00 pm.
8. **Text header: PRACTICE, try it from memory**
9. Page, Step 5 Study it for several days.
10. **Text header: APPLY, use what you learned**
11. Page, Step 6 Lab.
12. **Assignment,** Week 2 lab, PhysioEx Exercise 8 amylase. Investigation group.
    Description: the `assignment-physioex.html?week=2` iframe from `canvas-iframes.md`.
    Due Sun Sep 20, 10:00 pm.
13. Page, Step 7 Your patient.
14. **Assignment,** Week 2 application case. Application group. Description: the
    `assignment-apply.html?week=2` iframe. Due Sun Sep 20, 10:00 pm.
15. Page, Step 8 Discussion.
16. **Discussion,** Week 2. Thinking group. Body: the Week 2 block from
    `CANVAS-DISCUSSIONS.txt`. Post due Fri Sep 18, replies Sun Sep 20.
17. **Text header: CHECK, find the gaps**
18. Page, Step 9 Mastery Check.
19. **Assignment,** Week 2 Mastery Check report. File upload, Complete/Incomplete, 0
    points, due Sun Sep 20, 10:00 pm.

Week 1 is the same shape. Its only difference is two discussions in Apply rather than
one, and Step 1 also carries the course introduction video.

Putting each assignment straight after its step page means the student never has to go
looking for where to turn something in. Set the page requirement to "Mark as done" if you
want the module progress bar to fill in as they work. Leave prerequisites and sequential
unlocking off: the Next button already gives them the order, and a hard lock on top of it
is the thing they were complaining about.

## One ordering note for Week 1

Discussion 1B asks students what the evidence told them, and the evidence is their
Mastery Check, which now sits in Check at Step 9. The Step 8 page says so: do Step 9
first, then come back and write 1B. Both are due the same night.

## The repo drop has to be pushed first

Three of the Week 1 Step 1 buttons point at the course website. Two of them work on the
live site today; the Week 1 print pack button does not, because the live copy of
`week-print-pack.html` ignores `?week=` and always opens on whatever week today is. The
`?week=` support is in `repo-drop-v2`, so until that is pushed to GitHub, that button
lands on the wrong week. The same is true of everything else Week 2 depends on: the live
site still has Week 2 as the chemistry week.

## The note sheet is a PDF in Canvas now

The note sheet used to be a button out to `note-sheet.html` on the course site, which
meant a student had to leave Canvas just to get the paper the whole week runs on. It is a
document, not a tool, so it moved into Canvas as a PDF.

Two files ship with this drop: `BIO005-note-sheet-week-01.pdf` (six pages, twelve
competencies) and `BIO005-note-sheet-week-02.pdf` (six pages, eleven competencies). Both
are two competencies to a page, both carry the A and B prompts and the drawing boxes, and
both are rendered straight from `note-sheet.html` so nothing drifts from the website
version.

To wire them:

1. Files, Upload, drop both PDFs in. Put them in a folder called Note sheets if you want
   them tidy; the link does not care.
2. Click the file. The address bar reads
   `.../courses/42616/files/NNNNNNN?module_item_id=...`. The number after `files/` is the
   file id.
3. Open `w01-01-print-your-week.html`, find `href="https://yccd.instructure.com/courses/42616/files"`,
   and make it `.../files/NNNNNNN/download?wrap=1`. Same in `w02-01-print-your-week.html`
   with the Week 2 id. Or send me the two ids and I will regenerate both pages.

Set both files to Published in Files, or students see a lock instead of the sheet.

Step 4 also lost its off-site button. The photographing instructions that used to live on
`assignment-notesheet.html` are written into the Canvas page now, so uploading the sheet
takes a student nowhere at all.

The PDF is a print artifact: a drawing box is a box, and a screen reader cannot narrate a
blank square. `note-sheet.html` stays on the course site as the equivalent accessible
version, with the same prompts as real text in reading order, and it is what a student
using a reader should be pointed at. That is recorded in the compliance notes.

## Getting back from an off-site button

Canvas opens every link to the course website in a new browser tab, which is right, but a
brand new tab has no Back history, so pressing Back does nothing and a student feels
stranded. Two fixes are in this drop.

First, every page with an off-site button now carries one line underneath saying the
button opens a new tab and that closing that tab puts them back on the page.

Second, the two reference documents no longer leave Canvas at all. `How grading works` is
now a Canvas page in this drop rather than a link to the site, and the Syllabus button
points at the Canvas Syllabus tab. Both are internal links, so Back, the breadcrumb and
the module Next button all behave. Put the syllabus PDF on the Canvas Syllabus tab as an
attachment, or upload it to Canvas Files and link it there.

The rule worth keeping for the rest of the term: a document a student reads goes in
Canvas, and a tool a student uses stays on the site. The print pack, the videos, the note
sheet, Rx Cards, the practice exam and the labs are all tools and belong off-site in a new
tab. The syllabus, the grading rules and anything else they will read and then need to
come back from belong in Canvas.

## The links to swap

Every button to the course site is finished and tested. Buttons to Canvas point at the
real item where it exists; where the assignment did not exist when this was built, the
button points at the course Assignments index so it never goes nowhere. Open the file,
find the `href`, replace it once the assignment is made.

| Page | Button | Swap for |
|---|---|---|
| W1 Step 1 | Week 1 note sheet, ready to print (PDF) | the file link for `BIO005-note-sheet-week-01.pdf` |
| W2 Step 1 | Week 2 note sheet, ready to print (PDF) | the file link for `BIO005-note-sheet-week-02.pdf` |
| W1 Step 7 | Turn in your chart entry | the Week 1 Use It assignment |
| W2 Step 4 | Upload your Week 2 note sheet in Canvas | the Week 2 note sheet assignment |
| W2 Step 6 | Turn the lab in | the Week 2 lab assignment |
| W2 Step 7 | Turn in your chart entry | the Week 2 Use It assignment |
| W2 Step 9 | Upload the report in Canvas | the Week 2 Mastery Check report assignment |

Two links depend on the page titles rather than on an assignment: the `How grading works`
and `Course syllabus` buttons at the foot of `How every week works`, and the matching pair
at the foot of `How grading works`. They work as soon as those pages exist under those
exact titles.

Seven left, two of them the note sheet PDFs above. Already wired: Week 1 lab (assignment 1240111), Week 1 Mastery Check report
(assignment 1240401), Week 1 note sheet upload (assignment 1241504), Discussion 1A
vision board (topic 712733), Discussion 1B
metacognition (topic 713315), Week 2 discussion (topic 712810, the one learning-lab.html
already links; confirm it is the Week 2 topic), Virtual Office (topic 711800).

## The grade categories

Renamed September 14: Knowledge 35 percent, Investigation 25 percent, Application 25
percent, Thinking 15 percent. All twenty two pages use the new names. The course website
still says Show Me What You Know, Investigate It, Use It and Think About It in
`how-grading-works.html`, the assignment pages and the syllabus, so the site needs a sweep
to match before students meet both versions.

## The note sheet upload

Every week has a note sheet assignment: file upload, Complete/Incomplete, no points. The
pages say it is not graded for a score, it shows you are participating, and participating
is a condition of staying enrolled. The same wording is now on `assignment-notesheet.html`
on the course site, which used to say nothing is submitted.

## Regenerating for later weeks

`build_canvas_pages.py` holds both weeks as data. Copy the Week 2 block, change the week
number, title, dates, book chapters, lab, case and discussion, run it, and Week 3 comes
out as its own overview plus nine step pages in stage order. Steps can be written in any
order in the data; the script sorts them into Learn, Practice, Apply, Check and numbers
them from that. It refuses to write a file containing an em dash, italics, a script or
style block, or Lora.
