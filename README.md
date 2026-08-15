# BIO 005 Human Physiology, Yuba College, Fall 2026

Course build folder. Section BIOL-5-D9286, Sutter Internet (NET), fully asynchronous online for both lecture and lab.

Built from the BIO 004 Human Anatomy template (`drsrennie-stack/new-build-bio4-solano`) so the downstream tools carry over without rewriting: the Mastery OS gap finder, the spaced-recall card bank, the weakness dashboard, and the exam blueprint all read the same competency schema.

## What is in here now

| File | What it is |
|------|------------|
| `bio005-competencies.js` | The competency map. 137 competencies across 5 exam modules. Source of truth for everything else. |
| `bio005-schedule-fall2026.js` | Term data, the weekly container, the 15 weeks, proposed exam windows, grading skeleton, open decisions. |
| `competency-map.html` | Working tool. Filter, search, flag, see week load, pull exam blueprints, export CSV. |
| `course-schedule.html` | Student-facing schedule. Every date derived from the data file. |
| `index.html` | Landing redirect. |
| `PLACEHOLDERS.md` | Everything still needed, ordered by what blocks what. |
| `compliance-notes.md` | WCAG 2.2 audit for the two HTML pages. |

## The build order, and why

Competencies first, schedule second. The schedule exists to carry a specific set of competencies each week rather than to march through chapters, so every week in `bio005-schedule-fall2026.js` names the exact competency ids it is responsible for. That link is what lets the schedule page, the exam blueprint, and the gap finder stay in sync when a date moves.

## The one thing that makes this course different from BIO 004

BIO 004 is anatomy, in person, Team-Based Learning. BIO 005 is physiology, fully asynchronous, no synchronous meeting and no in-person lab. That means:

- No TBL structure. No iRAT, no tRAT, no appeals, no in-room application activity. None of it survives the move to asynchronous.
- Weekly checkpoints replace attendance.
- Exams are windows, not clock times.
- The drawing-based synthesis carries more weight, because it is the integrity mechanism that still works when nobody is proctoring the room.
- Accessibility is not a nice-to-have. For an online-only cohort it is the difference between access and exclusion.

## Scope boundary

Every competency here is a mechanism, a regulation, a calculation, or a prediction. Structure appears only where the structure explains the function. Pure identification competencies belong in anatomy and are deliberately absent.

## Editing

Edit the two `.js` data files. Both HTML pages read from them and follow automatically. Do not type a date into the markup.

Competency ids are stable slugs. Once a recall card, an exam item, or a gradebook column is tagged to an id, do not renumber it. Add new ids instead.

## Design system

Navy `#08101F`, navy-darkest `#060A18`, navy-tint `#ECEFF4`, terra `#8B1D1D`, terra-dark `#6B1616`, gold `#DCB45C`, off-white `#FAFAF9`, teal `#2C5F66` for physiology semantics. Plus Jakarta Sans for display, DM Sans for eyebrow labels. Radius 8px on blocks, 16px on cards. No italics anywhere. No em dashes. No decorative bookend bars. No sage, no cream, no Lora.

Both HTML pages carry the iframe height-sender before the closing body tag and rewrite links at runtime so internal links get `target="_top"` and external links get `target="_blank" rel="noopener"`.

## Student privacy

Nothing in this repo stores a student name, id, email, or grade. The flag state in `competency-map.html` is instructor-only and lives in browser storage on one machine. Keep it that way.

Dr. Sharilyn Rennie
