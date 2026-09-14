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

Week 1 is the same shape, with three differences: Step 1 also carries the course
introduction video, Step 8 carries both discussions on one page with a submit button
under each, and both Week 1 discussion topics already exist (712733 and 713315), so
there is no discussion to create for Week 1.

Putting each assignment straight after its step page means the student never has to go
looking for where to turn something in. Set the page requirement to "Mark as done" if you
want the module progress bar to fill in as they work. Leave prerequisites and sequential
unlocking off: the Next button already gives them the order, and a hard lock on top of it
is the thing they were complaining about.

## Week 1 Step 8 carries both discussions in full

That page used to be four buttons: instructions for each discussion out on the course
website, and a post button for each. Two of those four left Canvas, which is exactly the
trip students were getting stranded on. Both sets of instructions are written into the
Canvas page now, each under its own heading, each followed by its own submit button:
Submit Discussion 1 goes to topic 712733, Submit Discussion 2 to topic 713315. Nothing on
the page leaves Canvas.

The two pages on the course site, `assignment-discussion-01-visionboard.html` and
`assignment-discussion-01-metacognition.html`, are not linked from Canvas any more. Leave
them where they are; nothing else points at them and they cost nothing.

One ordering note: Discussion 2 asks what the evidence told them, and the evidence is
their Mastery Check, which sits in Check at Step 9. The Step 8 page says so at the top:
take the Mastery Check first, then come back and write it. Both are due the same night.

1A and 1B are gone as labels. They are Discussion 1 and Discussion 2 everywhere now, on
the step page, the overview and the due list.

## The repo drop has to be pushed first

Week 1 Step 1 still has a print pack button, and on the live site it opens on whatever
week today is rather than on Week 1, because the live copy of `week-print-pack.html`
ignores `?week=`. The fix is in `repo-drop-v2`, which is still unpushed. Week 2 Step 1 no
longer has that button at all. Everything else Week 2 depends on is also waiting on that
push: the live site still has Week 2 as the chemistry week.

## What students print now lives in Canvas

Printing used to send a student out to the course website, which is the trip they were
getting stranded on. Everything they print is a PDF in Canvas Files now.

| Week | Button | File to upload |
|---|---|---|
| W1 Step 1 | Week 1 note sheet, ready to print (PDF) | `BIO005-note-sheet-week-01.pdf` |
| W2 Step 1 | Foundations of the cell and tissues (PDF) | `BIO005-Week2-CELL-DRAFT-NoteSheet.pdf` |
| W2 Step 1 | Cellular physiology and transport mechanisms (PDF) | `BIO005-CellPhysiology-DRAFT-NoteSheet.pdf` |
| W2 Step 1 | The 11 Week 2 competencies (PDF) | `BIO005-CellPhysiology-DRAFT-Competencies.pdf` |

To wire them: Files, Upload, drop them in, and publish each one or students see a lock.
Click a file and the address bar reads `.../courses/42616/files/NNNNNNN?...`. The number
after `files/` is the id. Either send me the four ids and I will regenerate, or open the
page file, find `href="https://yccd.instructure.com/courses/42616/files"` and make it
`.../files/NNNNNNN/download?wrap=1`. They are in page order, so the first `files` href in
`w02-01-print-your-week.html` is Foundations of the cell and tissues, the second is
Cellular physiology and transport mechanisms, the third is the competencies.

The filenames live in the `PRINT_PDF` table at the top of `build_canvas_pages.py`, beside
the id each one needs, so the two can never get crossed.

Week 2 Step 1 no longer carries the print pack. Week 2 comes in two halves and each half
has its own note sheet, which the page now says: Foundations of the cell and tissues is
the anatomy, Cellular physiology and transport mechanisms is what that anatomy does,
worked in that order, with the competency list beside them.

Only Week 1 still uses a generated note sheet. `BIO005-note-sheet-week-01.pdf` ships in
this drop, rendered from `note-sheet.html` by `make_note_sheet_pdfs.js`. The Week 2 PDF I
generated earlier is superseded by your two and is not in this drop.

Step 4 of both weeks also lost its off-site button. The photographing instructions that
used to live on `assignment-notesheet.html` are written into the Canvas page now, so
uploading the sheet takes a student nowhere at all.

A printed note sheet is mostly empty drawing boxes, which a screen reader cannot narrate.
`note-sheet.html` stays on the course site as the equivalent accessible version, with the
same prompts as real text in reading order, and it is where a student using a reader
should be sent. That is recorded in the compliance notes.

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
| W1 Step 7 | Turn in your chart entry | the Week 1 Use It assignment |
| W2 Step 4 | Upload your Week 2 note sheet in Canvas | the Week 2 note sheet assignment |
| W2 Step 6 | Turn the lab in | the Week 2 lab assignment |
| W2 Step 7 | Turn in your chart entry | the Week 2 Use It assignment |
| W2 Step 9 | Upload the report in Canvas | the Week 2 Mastery Check report assignment |

Two links depend on the page titles rather than on an assignment: the `How grading works`
and `Course syllabus` buttons at the foot of `How every week works`, and the matching pair
at the foot of `How grading works`. They work as soon as those pages exist under those
exact titles.

Five left, plus the four print PDFs above. Already wired: Week 1 lab (assignment 1240111), Week 1 Mastery Check report
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
