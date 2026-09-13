# Drop, September 13 2026: Rx Cards and the four-stage intro page

Upload everything in this zip to the repo root, keeping the folder structure (os/ and tools/ have files in here). Everything overwrites in place.

## What is new

- rx-cards.html: the recall card tool. Spaced recall on the existing 4980-card bank, gets harder as a student proves a competency, per-browser progress under bio005-rx-v1. Supports ?week=N (weeks 1 to N in play) and ?week=N&only=1 (that week only).
- rx-cards.compliance.md and tools/test_rx_cards.js.

## What changed

- how-this-course-works.html now describes the four stages the week pages actually use: Learn, Practice, Apply, Check. The stage explorer, the "loop at stage four" section, and the choice lists were rewritten to match.
- Every student-facing recall link now goes to rx-cards.html instead of the Mastery OS: the fifteen week pages, door-study, course-materials, course-questions, course-schedule, lecture-week, sitemap, study-with-me, welcome, welcome-tour, the site footer (bio005-nav.js), the dock (bio005-dock.js, both copies), the locked-week list (bio005-gate.js), and the Hootie answers (bio005-faq.js, bio005-question-bank.js). The dock's Today tile now opens the course home and its Mastery OS tile is now the Practice Exam and Gap Finder.
- tools/gen_week_pages_v3.py writes the Rx Cards tile, so regenerating the week pages will not bring the old link back.

## Not touched

- lecture-week.html still points Week 2 at biol005-m02-molecular-toolkit-*. That is waiting on the Week 2 work in progress; when the m02-* set is final, the manifest entries for week 2 need to change to m02-slides.html, m02-notes.html and m02-chem-review.html.
- mastery-physio-os.html, mastery-physio-os-standalone.html and os/ stay in the repo. Nothing links to them from a student page. Delete them by hand in GitHub when you are ready.
