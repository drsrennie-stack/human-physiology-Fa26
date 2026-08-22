# BIO 005 Human Physiology, Yuba College, Fall 2026

Section BIOL-5-D9286, Sutter Internet (NET). Lecture and lab both fully asynchronous online.
Dr. Sharilyn Rennie.

Built on the BIO 004 Human Anatomy course architecture (`drsrennie-stack/new-build-bio4-solano`), rebuilt for physiology and for an online course with no TBL.

---

## What is in here

### Student facing

| File | What it is |
|---|---|
| `welcome.html` | **Course home.** Forked from the BIO 004 `welcome.html`. Aurora hero, greeting cycler, guided tour of the tools, module and week gate. |
| `index.html` | Redirect to `welcome.html`, same pattern as the anatomy repo. |
| `mastery-physio-os-standalone.html` | **Single file build of the OS.** Every dependency inlined. Double click it and it works, no server and no sibling files. Regenerate it after any change in `os/`, and never edit it by hand. |
| `week-01.html` | **Week 1 course material.** The lecture content, at the depth the competencies ask for. Ten sections, seven concept checks with the answer behind a button, three data tables, and a worked case at the end. This is the pattern for weeks 2 to 15. |
| `before-you-start.html` | **Readiness checks.** Two boxes, chemistry and anatomy. Each is a short quiz, one question at a time, then a recommendation: either go straight to week 1, or a short review of only the two or three things they missed. |
| `os/mastery-physio-os.html` | **Mastery Physio OS.** Forked from the BIO 004 Mastery OS, running on physiology data. Ten views: Today, Dashboard, Competencies, Weaknesses, Recall, Self-Tutoring, Evidence, Learning Skills, Coach, Study Together. Course tools dock and Hootie included. |
| `competency-recall.html` | Competency-level retrieval practice. Stands in for the card bank until it is written. |
| `anatomy-review.html` | **Optional anatomy review.** All 4,674 BIO 004 cards, own spacing engine, own storage keys. Cannot move a physiology mastery bar. |
| `competency-study-guide.html` | **Forked from `module-1-structure-list.html`.** All 268 competencies by module and topic, tagged Lecture and Lab, tick boxes, sidebar contents, find-a-competency search, print stylesheet. |
| `course-schedule.html` | Fifteen weeks, five modules, exam windows. |
| `physiology-course-home.html` | Earlier course home. Superseded by `welcome.html`, kept until you decide which to keep. |
| `workbook_week01_fluid-homeostasis.html` | Week 1 workbook |
| `workbook_week02_membranes-transport.html` | Week 2 workbook |
| `workbook_week03_membrane-potential.html` | Week 3 workbook |

### Instructor facing

| File | What it is |
|---|---|
| `competency-map.html` | Filter, search, flag, week-load chart, exam blueprints, CSV export. |
| `physiology-course-map.html` | Course architecture overview. |

### Data

| File | What it is |
|---|---|
| `bio005-competencies.js` | **Source of truth.** 268 competencies. Everything reads this. |
| `bio005-competencies.csv` | The same list as a spreadsheet, same schema as `BIO004Fall2026Competencies.csv`. |
| `bio005-schedule-fall2026.js` | Term data, weekly containers, exam windows, grading skeleton, open decisions. |
| `readiness-check.js` | The two readiness sets: 8 chemistry concepts and 10 questions, 10 anatomy concepts and 11 questions. **Resource links are marked "Link to add" where a URL is not filled in.** |

### Design and compliance

| File | What it is |
|---|---|
| `assets/brand.css` | **Single source of truth for the palette.** Every new page links it. |
| `BRAND-MIGRATION.md` | What was repainted on Aug 17 and what is still to do. Read this. |
| `compliance-notes.md` | WCAG 2.2 audit. A project is not complete until this exists and is current. |
| `PLACEHOLDERS.md` | Everything still unconfirmed, ordered by what blocks what. |
| `CONVERSION-PLAN.md` | **What to keep, convert and retire from the anatomy build,** with the counts behind each call. |
| `LANGUAGE.md` | **How this course talks to students.** Plain and exact. The banned word list and what to say instead. |
| `tools/language-audit.py` | Scans every student page for instructor and build vocabulary. Run before you push. |
| `tools/build-standalone.py` | **Rebuilds `mastery-physio-os-standalone.html` from `os/`.** Run it after any change in `os/`. Pass any other page to get a self-contained copy of that page to send. Until Aug 21 there was no such tool and the standalone was built by hand, which is how two copies of the same file drift apart. |



### Opening these files

Most pages in this repo are **multi file**. They load the dock, Hootie, the competency data and the schedule from sibling files. Opening one on its own, outside the repo folder, gives you an unstyled page with no data. That is not a broken build, it is a page without its dependencies.

Three ways to avoid it:

- Unzip or clone the **whole repo** and open `welcome.html` from inside that folder.
- Or open `mastery-physio-os-standalone.html`, which has everything inlined and works from anywhere.
- Or make a self-contained copy of any page before sending it:

```bash
python3 tools/build-standalone.py week-01.html   # writes week-01-standalone.html
```

Never send a single page out of this repo unless it is a standalone build. A loose multi-file page opens with no styling and no data, which looks like a broken build and is not one.

---

## The competency set

268 competencies. 234 lecture, 132 lab, 98 both, 34 lab only. 192 core. Estimated 111 hours of focused student study across 15 weeks.

| Mod | Scope | Weeks | Comps | Lecture | Lab |
|---|---|---|---|---|---|
| 1 | Foundations, membranes and cell signaling | 1 to 3 | 49 | 40 | 24 |
| 2 | Neurophysiology and muscle physiology | 4 to 6 | 50 | 44 | 29 |
| 3 | Sensory, motor, autonomic and endocrine | 7 to 9 | 46 | 40 | 21 |
| 4 | Cardiovascular and respiratory | 10 to 12 | 63 | 56 | 32 |
| 5 | Renal, digestive, metabolic, immune, reproductive | 13 to 15 | 60 | 54 | 26 |
| | **All five modules** | 1 to 15 | **268** | **234** | **132** |

### Scope boundary

This is a physiology course. Every competency is a mechanism, a regulation, a calculation, or a prediction. Structure appears only where structure explains function. Pure identification competencies belong in BIO 004 and are not in this list.

### Schema

```js
{ id, n, module, week, system, general, name, can, dok, yield, est, facets, lecture, lab }
```

Matches the BIO 004 schema, so the Mastery OS, the card bank, and the gap finder read it unmodified. `BIO005_MODULES` carries both the old keys (`n`, `weeks` as an array, `focus`) and the new ones (`module`, `weeksLabel`, `count`), so `competency-map.html` and `course-schedule.html` keep working against it.

**Never renumber an `id` once cards are tagged to it.** Add new ones at the end instead.

---

## Design system

PRIMARY teaching palette, per `palettes.md` at the workspace root. `assets/brand.css` is the implementation.

Navy `#1E3D4C`, navy-deep `#142a36`, navy-tint `#EDF1F3`, brushed gold `#B8924A`, terra cotta `#C2734D`, terra-dark `#A0522D`, white `#FFFFFF` for cards, off-white `#FAFAF9` for the page.

Plus Jakarta Sans for display, DM Sans for eyebrow labels, Lora italic for usage instructions and body emphasis. White cards on off-white, lifting 2px on hover. Thin 1px borders. No bookend decorative bars. No pastel tints. No shaded card backgrounds.

**No sage. No cream.** Both were in this repo before Aug 17 and both are out of the teaching design system. See `BRAND-MIGRATION.md`.

Interactive states, and completed is never green: locked is gray dashed, unlocked is gold solid, completed is navy solid on a navy-tint fill.

---

## Build rules

Every HTML deliverable in this repo:

- links `assets/brand.css` and defines **no palette tokens of its own**. The one documented exception is `os/mastery-physio-os.html`, which is a dark application surface, not a document page. See `BRAND-MIGRATION.md`.
- has the iframe height-sender before `</body>`, posting `{id, height}` with a `ResizeObserver` plus load and resize listeners
- puts `target="_top"` on every internal and same-domain link, `target="_blank" rel="noopener"` on external ones
- meets WCAG 2.2 AA as a floor and AAA where the palette allows
- uses no em dashes, anywhere, including code comments
- passes `python3 tools/language-audit.py`. No DOK, yield, facets, asynchronous, module or build notes on a student page. See `LANGUAGE.md`.
- signs student-facing material "Dr. Sharilyn Rennie" with no credential suffix

---

## Local preview

Everything is static. No build step and no dependencies.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

GitHub Pages serves it as-is from the repo root.

---

## Student privacy

No student names, IDs, emails, or grades belong in this repo, ever. The Mastery Physio OS stores each student's progress in **their own browser only**, via `localStorage`. Nothing is transmitted, nothing is collected, and nothing reaches the instructor. Export and import exist so a student can move their own progress between their own devices.

---

## Status

The competency set is final. The course architecture is built.

**Week 1 course material is written and shipped** (`week-01.html`). It is the pattern for the other fourteen: ten sections, a competency link line under each heading, concept checks with the answer behind a button, real data tables, and a worked case at the end that runs the whole week through one patient in six steps. Weeks 2 to 15 are not written. Approve or redirect week 1 before the next fourteen get built to the same shape, because changing the shape afterwards means rewriting all of them.

Three of fifteen lab cases exist. The items in `PLACEHOLDERS.md` block several of the remaining weeks, and the lab delivery decision blocks all of them.

### What a week page contains, so the next fourteen match

1. Cover with the week title from `bio005-schedule-fall2026.js`, the open and close dates, and the byline.
2. Contents, one entry per section, with a one-line description of each.
3. **How to use this page**, then a **Read this part twice** note naming the specific way students lose this week.
4. A **Start here** section listing what they should be able to do by Sunday, as a real checklist with tick boxes.
5. Numbered sections. Each opens with a **On the course list** line linking every competency it teaches to its anchor in `competency-study-guide.html`.
6. Explanation in `.tblock` cards using `ul.idlist.plain`, which is the same card without the checklist tick boxes and columns, because teaching prose is not a checklist.
7. **Concept checks**, answer behind a button, at the end of any section where a student can be wrong without noticing.
8. A **Pull it together** section: one case, worked in the order that is the method for the whole course.


---

## The OS, and what is still in build

`os/mastery-physio-os.html` is a **fork** of `mastery-os-fall-2026.html` from the BIO 004 repo, not a rebuild. It keeps the shell, the onboarding, the Today view, the dock, Hootie and all ten views, and swaps the data layer to physiology.

Everything in `os/` is loaded by that one page:

| File | State |
|---|---|
| `../bio005-competencies.js` | Live. 268 competencies. |
| `schedule-fall2026.js` | Live. Generated from `bio005-schedule-fall2026.js`, so there is one calendar. |
| `resources.js` | Live. Per-competency links, only to pages that exist. |
| `draw-checklists.js` | Live. 128 entries, generated from the competency set. |
| `rubrics.js`, `mastery-evidence.js`, `section-sync.js`, `recall-view.js`, `bio005-dock.js`, `dock-coachmark.js`, `bio005-reading-mode.js`, `hootie.js` | Live. Ported from BIO 004 with the copy rewritten for an async physiology course. |
| `bio005-card-bank.js` | **In build.** Empty. Cards must be written against the 268 physiology competencies. |
| `card-competency-map.js` | **In build.** Empty. Every card must be tagged to a competency id or answering it moves no mastery bar. |
| `loops-index.js`, `loops-stations.js` | **In build.** Loops does not carry to an online physiology course. Scrubs is choosing the replacement. |
| `bio005-pretest.js` | **In build.** `available()` returns false, so the OS does not offer it. |

Every in-build module is shape-correct and read defensively, so the OS runs end to end with no console errors and those views show an honest "not built yet" state rather than breaking. Fill a module and its view lights up. Nothing else has to change.

While the card bank is empty, the Recall view points students at `competency-recall.html`, which does competency-level retrieval and works today.

### Course copy rewritten in the fork

BIO 004 is in person and team based. BIO 005 is neither. The fork rewrote 47 TBL references, 18 iRAT, 16 tRAT, 28 cadaver, 9 histology and 5 structure-list references into async physiology vocabulary: weekly checkpoints instead of TBL, trace and data reading instead of specimen identification, graph and curve reading instead of histology. The escape-room and drawing-bank content was rewritten with physiology questions. The onboarding section chooser now offers the one online section instead of three in-person ones.


---

## What was forked, and what was invented

Three rounds of this project produced pages that did not look like your work. The rule now is: **fork the template, do not invent the page.**

| Page | Forked from |
|---|---|
| `welcome.html` | `welcome.html` (BIO 004) |
| `competency-study-guide.html` | `module-1-structure-list.html` (BIO 004) |
| `os/mastery-physio-os.html` | `mastery-os-fall-2026.html` (BIO 004) |
| `week-01.html` | `competency-study-guide.html`, which forked `module-1-structure-list.html` (BIO 004) |
| `competency-recall.html` | **Invented.** Kept only because it does working competency-level retrieval while the card bank is empty. It does not match the design language and should be re-forked or retired once the card bank exists. |

Your design language, for anything built next:

- Sticky brand bar: figure mark, two-tone wordmark (`Human` navy + `Physiology` terra), eyebrow beneath in DM Sans caps
- Two-tone `h1`, one word in terra inside navy
- Eyebrow, then heading, then a lede with bold inline emphasis
- **Dark navy panel blocks inside light pages**, with a gold eyebrow and numbered pill buttons
- Numbered pills in gold, terra and white
- Solid terra CTA, uppercase, with an arrow
- Course tools dock bottom left and Ask Hootie bottom right, on every page
- Sidebar contents card with a numbered TOC and a search, on long pages

`palettes.md` specifies your colors. It does not describe any of the layout above, which is why reading it alone produced generic pages. That gap is worth closing in `palettes.md` itself.
