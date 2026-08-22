# Brand migration, Aug 17 2026

BIO 005 Human Physiology, Yuba College, Fall 2026.

## What was wrong

This repo carried **four different palettes across ten files**, none of which matched `palettes.md`. Two of them used colors that are explicitly out of the teaching design system.

| Files | Palette in use | Problem |
|---|---|---|
| `physiology-course-home.html` | mocha `#8A4324`, tan `#E0A07F`, ink `#241E1A`, tokens literally named `--sage`, `--sage-deep`, `--sage-light` | **Sage is out of the teaching system.** Nothing in PRIMARY is mocha or tan. |
| `physiology-course-map.html`, all three week workbooks | MCAS: navy `#0B1530`, rust `#8B3A2E`, gold `#C9A14A`, **cream `#F5F1E8`** | **Cream is out of the teaching system.** Cream is preserved for Refinery Aesthetics only. |
| `competency-map.html`, `course-schedule.html`, `index.html` | navy `#08101F`, terra `#8B1D1D`, gold `#DCB45C` | Off-spec on all three. Same drift as the BIO 004 build. |
| new files | PRIMARY | correct |

## What changed

Every off-spec hex was mapped onto PRIMARY and replaced in place. 181 replacements across 10 files.

| Was | Now | Why |
|---|---|---|
| `#08101F`, `#0B1530`, `#241E1A` | `#1E3D4C` | navy |
| `#060A18`, `#050A14`, `#743A1E`, `#6B1616` | `#142a36` | navy-deep |
| `#ECEFF4` | `#EDF1F3` | navy-tint |
| `#8B1D1D`, `#8B3A2E`, `#8A4324` | `#A0522D` | terra-dark |
| `#E0A07F` | `#C2734D` | terra |
| `#DCB45C`, `#C9A14A`, `#B08B3A` | `#B8924A` | brushed gold |
| **`#F5F1E8`** | `#FAFAF9` | **cream removed**, off-white is the only page background |
| `#6B6258`, `#3D4860`, `#5B7480` | `#3C5563` | ink-soft, 7.02:1 on white |
| `#B8BEC8`, `#DCE0E6`, `#C9BEB4` | `#EDF1F3` | rules and borders |

Token **names** carrying banned words were renamed too, so nothing in this repo reads "sage" or "cream" again except the sentences that say those colors are not used:

`--sage` to `--terra-alt`, `--sage-deep` to `--terra-dark-2`, `--sage-light` to `--terra-2`, `--mcas-cream` to `--offwhite-alt`, `--mocha` to `--terra-alt2`, `--tan` to `--terra-3`.

A second semantic pass caught tokens whose name says terra but whose repainted value had landed on navy-deep, and set those to `#A0522D`. Stray `rgba()` values built on the old navies were rebased onto `rgba(30,61,76, ...)`.

## Going forward

`assets/brand.css` is now the single source of truth for this repo. Every new page links it and defines **no palette tokens of its own**. Page-specific rules go in the page; colors never do.

```html
<link rel="stylesheet" href="assets/brand.css">
<style>
/* Page-specific only. All palette tokens live in assets/brand.css. */
</style>
```

Three pages already work this way: `index.html`, `competency-recall.html`, `competency-study-guide.html`. The OS in `os/` is the documented exception, see the update at the bottom of this file.

## Still to do

The seven older files were repainted but **not** refactored onto `brand.css`. They still carry their own `:root` blocks, now holding correct values. That is safe but it is still seven copies of the truth. When you next touch one of these, delete its `:root` and link `brand.css` instead:

- `physiology-course-home.html`
- `physiology-course-map.html`
- `competency-map.html`
- `course-schedule.html`
- `workbook_week01_fluid-homeostasis.html`
- `workbook_week02_membranes-transport.html`
- `workbook_week03_membrane-potential.html`

`README.md` documented the old palette in prose and said "No italics anywhere. No Lora." That contradicts `palettes.md`, which puts Lora italic on usage instructions and body emphasis. The README has been rewritten to match `palettes.md`. Confirm which you actually want, because the new pages use Lora italic for the usage lines.

## One open question for you

`palettes.md` says navy is `#1E3D4C`. The BIO 004 repo `mastery-os-fall-2026.html` sets `--navy:#08101F`, under a comment saying it was repainted **away from** `#08101F` on 2026-08-11. The comment and the value disagree, so one of them is stale.

This repo follows `palettes.md` and uses `#1E3D4C`, because your global instructions name `palettes.md` as the single source of truth. If `#08101F` is what you actually want, say so and both repos get repainted to that instead. What cannot stand is the two of them disagreeing, because that is exactly how four palettes ended up in one repo.

---

## Update, the Mastery Physio OS fork

The OS in `os/` is a fork of `mastery-os-fall-2026.html` from the BIO 004 repo, not a rebuild. It keeps that file's **dark application surface** on purpose: navy `#08101F` canvas, `#0B1530` panels, gold `#DCB45C` on dark.

That is a reversal of what this document said earlier, and the earlier version was wrong. Those values are not drift. They are the app surface of your Mastery OS, which is a different kind of thing from a document page. `palettes.md` describes white cards on off-white, which is right for the syllabus, the study guide, the schedule and the course home, and wrong for a full-bleed dark app.

So the repo now has two documented surfaces:

| Surface | Where | Rule |
|---|---|---|
| Document | everything except `os/` | PRIMARY. White cards on off-white. `assets/brand.css`. |
| Application | `os/mastery-physio-os.html` | The dark OS surface, inherited from the BIO 004 template. Documented at the bottom of `assets/brand.css`. |

Sage and cream are still out of both. Nothing in that part of the repaint changed.

**Item E is still open and it now matters more.** If `palettes.md` is meant to govern the app surface too, the OS needs repainting onto `#1E3D4C` and the BIO 004 OS does as well. If `palettes.md` describes document pages only, then say so in `palettes.md` itself, because as written it reads like it covers everything and that is how it got applied here the first time.
