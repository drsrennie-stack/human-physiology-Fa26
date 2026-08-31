# BIO 005 Human Physiology, Fall 2026

Everything ready to push to `drsrennie-stack/human-physiology-Fa26`.
Built August 30, 2026.

---

## Push this

Copy the contents of **`site/`** into the root of the repo. Twenty-six files.
They are self-contained: no build step on GitHub Pages, no dependencies to
install, and each one carries its own CSS inline so nothing half-loads.

| What | Files |
|---|---|
| Course home, with the calendar carousel, the live current-week marker and the category cards from your teaching-resources index | `index.html` |
| Week hub | `week-01.html` |
| Guides, and the three articles | `guides.html`, `guide-how-to-study.html`, `guide-week-page.html`, `guide-drawing.html` |
| Pre-work notes, all fifteen weeks | `prework-week-01.html` ... `prework-week-15.html` |
| Tools | `loop-switcher.html`, `ai-work-log.html`, `label-kit.html` |
| The design system, shown working | `design-system.html` |
| The design system as a droppable stylesheet | `medmasters-cards.css` |
| Accessibility compliance record | `compliance-notes.md` |
| The raw audit output the record is generated from | `a11y-report.json`, `a11y-tree.json` |

**One thing to know before you push:** `index.html` will replace the redirect
page currently at the repo root. That is intended, but check it is what you
want first.

---

## `instructor/` is yours, and the boundary is now enforced

Your week notes were rendering on the student week page in a cream box:
"Front-load orientation, not content." That is your planning voice, not your
teaching voice, and a student reading "if the term runs tight, this is the
trim" learns something about the course they were never meant to know.

The data now carries two separate fields:

- **`note`** stays yours. It renders on `instructor/teaching-notes.html` and
  nowhere else.
- **`studentNote`** is new, and is the only one a student page will render.

`build/leak-check.py` enforces it. It knows which fields are yours, normalises
the text so a re-wording cannot slip past, checks the rendered page **and** the
HTML comments, and exits non-zero if anything of yours turns up on a student
file. I proved it by putting the leak back: it caught it twice and failed the
build. Run it after every build.

**Six student notes are drafts I wrote** from facts already in your notes:
weeks 1, 3, 8, 10, 11 and 15, covering the short first week, census, the
midterm, Veterans Day, the drop deadline and the final. `teaching-notes.html`
shows yours and theirs side by side so you can read them against each other in
one pass. They need your eye before September 8.

**`teaching-notes.html` is public.** It is not linked from the student site and
it carries a noindex tag, so it will not be stumbled on or found by search, but
GitHub Pages will serve it to anyone who guesses the filename. The page says so
itself. If something genuinely must not be seen, keep it out of the repo rather
than trusting an unlinked page.

---

## Push `data-swap/` too, or the site will contradict itself

**Two files, and they matter more than anything else in this zip.**

Your repo's `bio005-competencies.js` still carries the week numbers from the
sequence you used BEFORE the Aug 24 remap. Seven live pages read that file:
`welcome.html`, `competency-recall.html`, `competency-map.html`,
`course-schedule.html`, `ai-work-log.html`, `unit-05-standalone.html` and the
Mastery OS. The new pre-work pages use the adopted sequence. Push one without
the other and the site tells students two different weeks for the same thing:

| Competency | Your live pages say | The new pre-work says |
|---|---|---|
| Sympathetic and parasympathetic divisions | Week 5 | **Week 6** |
| Crossbridge cycle | Week 6 | **Week 7** |
| Signal types and range | Week 7 | **Week 4** |
| Thyroid hormone | Week 12 | **Week 8** |
| Nernst equation | Week 4 | **Week 3** |

97 of the 268 are affected.

`data-swap/` holds the corrected pair under the **original filenames**, so it
is a straight overwrite of the two files in your repo root and no page needs
editing. Every export is carried through, so nothing that reads them breaks.

I verified that by copying your whole repo, swapping only those two files, and
loading eleven pages before and after: identical line counts, identical export
counts, no new JavaScript errors, and Week 6 correctly showing 25 competencies
instead of 20.

**The competency content itself was never in question.** Your repo file and the
one these pages were built from are identical record for record: same 268 ids,
same names, same can-statements, same dok, yield and est. Only the `week` field
differs, and only because of the remap you adopted.

---

## Read this before you push `nav-patch/`

**`nav-patch/` is optional and it overwrites 39 files you already have.**
Do not copy it in without looking.

Those 39 files are your existing pages with the shared nav bar added, so the
menu is the same everywhere. The site has no consistent navigation today: 21 of
46 pages carry no site menu at all, and the rest carry five different ones.
That is WCAG 3.2.3 Consistent Navigation, a Level AA criterion.

`DRY-RUN-REPORT.txt` lists exactly what each file gets and why. Nothing is
deleted: a page with its own in-page jump menu keeps it, a page with its own
footer keeps that, and a page with its own skip link keeps that too. The seven
slide decks are skipped on purpose, because they are full-viewport and the bar
would break them.

The safer route is to regenerate rather than copy:

```
python3 build/apply-nav.py --dry *.html    # see what would change
python3 build/apply-nav.py *.html          # do it, in place
```

Run it in a clean working tree so `git diff` shows you exactly what moved.
It is safe to run twice: a page that already has the bar is skipped.

---

## Rebuilding

Needs Python 3 and Node. From inside `build/`:

```
python3 build-home.py                       # index.html
python3 build-week.py weeks/w01.json        # a week hub
python3 build-guide.py guides/*.json        # the guides and their index
python3 build-prework.py all                # all fifteen pre-work pages
python3 build-spec.py                       # design-system.html
python3 build-css.py                        # medmasters-cards.css
```

Everything reads `build/data/`, which holds the 268 competencies and the
fifteen-week schedule. Change a competency there and every page that mentions
it is correct on the next build. Nothing is hand-typed twice.

### The stylesheet lives in one place

`build-week.py` holds the tokens and the card system. `build-home.py`,
`build-guide.py`, `build-prework.py` and `build-spec.py` all import it, and
`build-css.py` emits `medmasters-cards.css` from the same source. There is no
second copy to keep in sync, which is why the palette change went through
cleanly.

---

## Checking accessibility

```
node a11y-report.js ../site/*.html    # writes a11y-report.json
python3 build-compliance.py           # turns it into compliance-notes.md
python3 leak-check.py                 # fails if your notes reached a student page
```

The compliance record is **generated**, not written. Every number in it comes
from a real browser run against the real files, so it cannot quietly go stale
when a colour changes. If a page regresses, the next build says so in the
table without anyone remembering to check.

The auditor runs more than the legal floor: axe-core with `wcag2aaa` switched
on, measured contrast on the rendered page rather than declared values, target
size against the 44px enhanced rule, reflow at 320px and at 400% zoom, the
1.4.12 text-spacing bump, and a live keyboard tab-through that compares pixels
to prove the focus ring actually renders.

Last run: **25 pages, 0 violations across 1055 checks, 666 of 666 colour pairs
at AAA, lowest ratio 7.32:1, all 1034 targets at 44px.**

---

## Still open

1. **The human screen reader pass.** Everything above is the accessibility tree,
   which is strong evidence but is not the same as listening. Section 8 of
   `compliance-notes.md` has a six-step NVDA or VoiceOver script, about fifteen
   minutes. This is the one thing genuinely outstanding before September 8.
2. **Week hubs 2 to 15.** Week 1 is built; the other fourteen need their step
   specs written. Same builder, same audit.
3. ~~Week 12, Thanksgiving.~~ **Decided Aug 30.** Weeks 12 and 13 keep their
   content and their opening dates. Nothing is due on Sun Nov 29. The two weeks
   share one deadline, **Sun Dec 6, 11:59 pm**, so the break sits inside a
   fourteen-day window instead of against a due date. Set in
   `build/data/` via `apply-remap.js`; every page reads it through one helper.
4. **Points for the pre-work.** It is the spine of the week and a bigger ask
   than a 5-point knowledge check. Worth moving points to it rather than adding
   to the total.
5. **Older pages carry their own accessibility debt** that the new pages do not:
   28px buttons on the lab manual, low-contrast metadata, sideways scrolling at
   320px. `node a11y-report.js <file>` names each one. Separate work item.
6. **`competency-recall.html` renders "Unit undefined, 0 comps"** in its Mastery
   by unit panel, on your current live site, before any of my changes. The data
   is fine; the page is not reading it correctly. Worth a look, separate from
   anything here.
7. **The Mastery OS keeps its own embedded copy** of the competency map in
   `os/card-competency-map.js`, so it does not pick up the swap and still shows
   the old weeks. It needs regenerating from the same source or it will drift
   away from the rest of the site.

Dr. Sharilyn Rennie
