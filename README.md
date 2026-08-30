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
| Course home, with the calendar carousel and the live current-week marker | `index.html` |
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

Dr. Sharilyn Rennie
