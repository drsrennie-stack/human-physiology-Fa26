# BIO 005 push package, v2

Built Aug 24, 2026. **Replaces the earlier package I sent today. Do not upload
that one.**

## What changed between v1 and v2

The first package migrated the course from 268 competencies to 258, renamed 191
competency ids, and re-tagged 3,887 cards. It was built to the Aug 23 schedule
of record, which was the newest thing in front of me when I started.

You then confirmed the decision recorded Aug 24: **keep 268, keep every
competency id, merge nothing.** Adopt only the Aug 23 week ORDER, and keep the
week titles in student language rather than as textbook noun phrases.

That makes this a far smaller and safer change, and v1 is now wrong. This is v2.

| | v1 (do not use) | **v2 (this one)** |
|---|---|---|
| Competencies | 268 to 258 | **268, unchanged** |
| Competency ids renamed | 191 | **0** |
| Sensory competencies | 18 merged to 8 | **18, un-merged** |
| Cards re-tagged to a new competency | 3,887 | **0** |
| Card fields that change | `competencyId`, `week`, `tags` | **`week` only** |
| Week titles | textbook noun phrases | **student language** |
| `cards/` in the package | 36 files | **none needed** |

---

## How to push it

1. Upload everything here to the repo root, keeping folder structure
   (`os/` and `tools/` land in the matching folders).
2. Work through `DELETE-THESE.md`. Uploading overwrites but cannot delete.
3. Open `course-schedule.html` and `competency-map.html` once each. Both were
   built against five modules and now read three parts.

**You do not need to re-upload `cards/`.** Not one card file changed. Card
`week` values are derived from `bio005-competencies.js` when the bank is
assembled, so shipping the rebuilt `os/bio005-card-bank.js` is enough.

---

## What is in the package

| File | What it is |
|---|---|
| `bio005-competencies.js` | **268 competencies, 3 parts, new `week` field.** Ids untouched. |
| `bio005-week-reassignment.csv` | Audit trail. All 268, old week to new week, with the reason. |
| `bio005-schedule-fall2026.js` | New week titles and competency lists. Grading weights now **adopted**, not placeholder. Six-step week shape, credit model block. |
| `os/bio005-card-bank.js` | Rebuilt. Only `week` values differ. |
| `os/card-competency-map.js` | Same 5,014 entries with identical values, reordered by the new part grouping. |
| `os/schedule-fall2026.js` | Rebuilt. The dock and Hootie were reading five modules, old titles, four exam windows that do not exist. |
| `course-schedule.html` | Copy fixes. It is data driven, so the schedule itself flows from the js. |
| `course-entry.html` | One line: a favicon declaration. Your Canvas front door 404'd on every load. |
| `tools/retag_weeks_268.py` | The script that did the reassignment. Rerunnable. |
| `tools/assemble_bank.py` | Patched, see defects below. |
| `WEEK-REASSIGNMENT-REPORT.md` | Per-week loads and the one thing to look at. |
| `DELETE-THESE.md` | Seven safe deletions, six things that look deletable and are not. |

---

## The reassignment, in numbers

| | |
|---|---|
| Competencies in | 268 |
| Competencies out | **268** |
| Moved to a different week | 209 |
| Stayed put | 59 |
| **Competency ids changed** | **0** |
| **Cards whose `competencyId` changed** | **0** |
| Cards whose `week` changed | 3,887 |

I verified the last two rather than assuming them. I rebuilt the bank and
compared it card by card against the one in your repo: same 4,980 card keys,
and **the only field that differs anywhere across all 4,980 is `week`.** The
bridge file `card-competency-map.js` came back with the same 5,014 keys and
identical values, differing only in key order.

That is the check that matters. It means no card changed which competency it
proves, so no mastery bar moves for the wrong reason.

The rebuilt bank also reports the same yield split as your build document
records: 192 core, 67 high, 9 support. Nothing drifted.

---

## One thing worth your attention

**Week 5 carries 35 competencies. Weeks 4 and 5 carry 64 between them. The
average week is 18.**

That is the direct cost of keeping the sensory competencies un-merged, and it is
a real consequence of the decision, not a reason to reverse it. Weeks 4 and 5
now hold what four weeks used to hold: neurons, action potentials, synapses,
reflexes, sensory, special senses, motor, and autonomic.

Worth deciding now rather than in October whether Week 5 gets a lighter
workbook. There is one lever that does not touch a single id: move the six
membrane potential competencies from Week 4 back to Week 3, which gives Week 3
twenty two and Week 4 twenty three.

I flagged it in `bio005-schedule-fall2026.js` as a week note so it renders on the
schedule page rather than living only in a document.

---

## Note on the ids

After this pass, 209 of the 268 ids carry a `w` prefix that no longer matches
the week the competency is taught in. `w9-thyroid` is taught in Week 12.

This is deliberate and harmless. Renaming the prefixes is exactly what would
have forced a re-tag of all 4,980 cards, and avoiding that was the point.
**Read the `week` field. Nothing should ever parse the prefix.** I put that
warning in the header of the generated file too.

---

## Three defects found and fixed along the way

1. **The bank reported itself incomplete.** `assemble_bank.py` decided
   completeness with `len(modules) < 5`. With three parts that is always true,
   so a finished 4,980-card bank rendered an "in progress" notice to students.
   It now compares against the parts actually defined.
2. **The OS calendar was behind the course.** `os/schedule-fall2026.js` carried
   five modules, the old week titles, and four exam windows.
3. **The Canvas front door 404'd on every load.** `course-entry.html` declared
   no favicon.

## Two content fixes on the schedule page

- It told students the competencies are "what the exams are written from."
  Your model has no exams. Now reads knowledge checks, chart entries and case
  conference.
- The header comment said "Do not publish to students until the exam windows are
  confirmed," which would have held the page back forever.

---

## Credit model, now in the code

BIO 005 is 4 units: 3 lecture plus 1 lab. At 54 student hours per unit that is
216 hours, and over 15 weeks:

| | Hours per week |
|---|---|
| Lecture equivalent | 3.6 |
| Lab | 3.6 |
| Outside work | 7.2 |
| **Total** | **14.4** |

The six steps in `BIO005_WEEK_SHAPE` total 864 minutes, which is 14.4 hours
exactly. Only 632 of those are assigned work. The other 232 are genuine
independent study, and the syllabus should say so rather than pretend the week
is lighter than the units require.

**Open:** you have described lab as 6 to 8 hours a week. One lab unit funds 3.6.
Confirm against the course outline of record before the syllabus goes out.

---

## What "verified" means

- All five JavaScript files pass `node --check`.
- Eight pages loaded in headless Chromium with the package applied, including
  the Mastery OS: **zero console errors, zero failed requests on all eight.**
- `course-schedule.html` renders the adopted order in the new titles: Week 3
  Getting across the membrane, Week 9 The heart as a pump, Week 11 Blood and how
  the body defends itself.
- The OS reports `inBuild: false`, "The bank is complete", 4,980 cards,
  **268 competencies**, 3 parts.
- The assembler's validator passed with zero errors: every card has all required
  fields, four distinct options, an in-range correct answer, DOK 1 to 3, and a
  `competencyId` that resolves. **268 of 268 competencies have cards.**
- No em dashes, no en dashes, no ", ND" or ", MD" anywhere in the package.

## One defect found and not fixed

**Five pages still fetch fonts from Google:** `course-schedule.html`,
`welcome.html`, `index.html`, `course-entry.html`, `start-here.html`.

You had a pass that embedded fonts and it worked on `competency-study-guide.html`
and `week-01.html`. These five were missed. I left it alone because inlining a
font stack blind risks breaking type on pages I would not see fail, and the
working pattern already exists to copy from. Say the word.

Dr. Sharilyn Rennie
