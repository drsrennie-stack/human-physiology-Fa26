# Drop, September 13 2026: Rx Cards and the four-stage intro page

Upload everything in this zip to the repo root, keeping the folder structure (os/ and tools/ have files in here). Everything overwrites in place.

## What is new

- rx-cards.html: the recall card tool. Spaced recall on the existing 4980-card bank, gets harder as a student proves a competency, per-browser progress under bio005-rx-v1. Supports ?week=N (weeks 1 to N in play) and ?week=N&only=1 (that week only).
- Rx Cards also carries a Your weak spots list (competencies with missed or Hard-rated cards, worst first, a Drill button on each and one for all of them) and a What you did this week strip. A drill ignores the schedule and pulls only the struggled-with cards; a right answer in a drill does not move a card forward a second time in one day.
- rx-cards.compliance.md and tools/test_rx_cards.js.

## What changed

- how-this-course-works.html now describes the four stages the week pages actually use: Learn, Practice, Apply, Check. The stage explorer, the "loop at stage four" section, and the choice lists were rewritten to match.
- Every student-facing recall link now goes to rx-cards.html instead of the Mastery OS: the fifteen week pages, door-study, course-materials, course-questions, course-schedule, lecture-week, sitemap, study-with-me, welcome, welcome-tour, the site footer (bio005-nav.js), the dock (bio005-dock.js, both copies), the locked-week list (bio005-gate.js), and the Hootie answers (bio005-faq.js, bio005-question-bank.js). The dock's Today tile now opens the course home and its Mastery OS tile is now the Practice Exam and Gap Finder.
- tools/gen_week_pages_v3.py writes the Rx Cards tile, so regenerating the week pages will not bring the old link back.

## Not touched

- lecture-week.html still points Week 2 at biol005-m02-molecular-toolkit-*. That is waiting on the Week 2 work in progress; when the m02-* set is final, the manifest entries for week 2 need to change to m02-slides.html, m02-notes.html and m02-chem-review.html.
- mastery-physio-os.html, mastery-physio-os-standalone.html and os/ stay in the repo. Nothing links to them from a student page. Delete them by hand in GitHub when you are ready.

## Use It split, decided Sep 13 2026

Use It stays 25 percent of the course. 20 percent is the weekly case (assignment-apply.html, turned in each Sunday). 5 percent is the patient chart (patient-chart-book.html), kept by hand all term, nothing collected week to week, turned in once as one PDF on Wednesday, December 16, and graded as one piece.

Changed to say that, all in this zip: the fifteen week pages (tile now reads "Use It case: ..." at 20%, the chart attachment reads "Add this week to your chart", the done list has the case as a graded line and the chart as a dashed line dated Dec 16), tools/gen_week_pages_v3.py, assignment-apply.html, patient-chart-book.html, bio005-credit-model.js (new "chart" line, 5), bio005-schedule-fall2026.js (grading note), how-grading-works.html, syllabus-fall2026.html, how-this-course-works.html, welcome.html. Week 1 now attaches the chart book like the other fourteen weeks instead of the digital patient file.

Still open: BIO005-patient-file.html and its instructions describe a different patient (seeded per student, order tokens, weekly PDF upload). It is no longer linked from any week page. Decide whether it is retired or lives somewhere else; until then it stays in the repo untouched. The Canvas assignments for the weekly chart entries, if any exist as separate items, need renaming to the Use It case.

## The chart capstone assignment page (new)

assignment-patient-chart.html is the student instruction page for the Dec 16 Canvas assignment: what the PDF must contain and in what order (face sheet, both vitals flowsheet pages, both lab flowsheet pages, problem list, medication log, the fifteen week pages, AI disclosure), how to scan it, the file name, what a strong chart looks like, and what to do if they fall behind. It is a fork of assignment-apply.html so the two look the same in Canvas. The iframe snippet for the assignment description is at the bottom of CANVAS-IFRAME.txt. Set the Canvas assignment to File upload, PDF only, due Wed Dec 16 10:00 pm, worth 5 percent under Use It. Linked from the chart book, the weekly case page, and how-grading-works.

The chart book already uses the brand of record (navy #0B1530, maroon #8B3A2E, gold #C9A14A, no italics), so no colour change was needed.

## Site navigation: the four stages, Sep 13 2026

bio005-nav.js now puts 1 Learn, 2 Practice, 3 Apply, 4 Check in the middle of the bar on every page, replacing Lectures, Labs, Study and Assignments. Each opens the current week's tools nested the way the week page nests them (Learn: lectures, notes, note sheet, competencies. Practice: brain dump, draw it then teach it, Rx Cards, book problems, Study With Me, Kahoot library, one sheet, and a "Physiology games, opens later this term" placeholder. Apply: the lab, the Use It case, the discussion, how grading works, then a Patient file group with the chart and the Dec 16 instructions. Check: Mastery Check, checklist, upload). The week follows the calendar by itself. On phones the stages collapse into a "Week N tools" button at the bottom right.

The Course tools dock is retired: the script tag is gone from the twenty pages that loaded it, and the six older slide decks plus welcome.html that had the dock without the nav now load bio005-nav.js. practice-exam.html gained the nav. bio005-dock.js and os/bio005-dock.js stay in the repo unused.

One thing to check before Monday: the week gate in bio005-nav.js (the HOLD list) still holds Weeks 2 to 15 closed "while being built." Week 2 opens Monday Sep 14 at 8 am; remove the 2 from HOLD when the Week 2 material is uploaded, or students will see the locked page.
