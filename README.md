# BIO 005 Human Physiology

Interactive clinical physiology labs and the lab manual they belong to. Fourteen weeks, fully online and asynchronous.

Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.

## What students open

Everything at the top level is a single self-contained file. No build step, no dependencies, no external requests. Push and it works on GitHub Pages.

| File | What it is |
|---|---|
| `week-01-foundations.html` | Week 1. Rosa's case, control loops, a seeded twelve patient dataset, the oxygen curve |
| `pulmonary-function-lab.html` | Week 13. Lung volumes, spirometry, PFT interpretation, mechanical ventilation |
| `clinical-physiology-lab-manual.html` | The whole fourteen week manual, readable and printable |
| `clinical-physiology-lab-manual.docx` | The same manual in Word |

Each HTML file carries an iframe height sender, so it sizes itself correctly when embedded in Canvas.

## Compliance

`compliance/` holds one document per deliverable, plus `compliance/index.md`, which is the page to hand to a disability services office or an accreditation review. WCAG 2.2 AA is the floor across the course, AAA wherever it is achievable.

A deliverable is not finished until its document exists and is listed in that index.

## Rebuilding a week

Only needed to change a week's content. Students never touch anything in `src/`.

```
cd src
python3 build.py week01
```

That reads `weeks/week01.js`, inlines the engine and the stylesheet, and writes both a standalone page and an artifact version into `out/`. Move the standalone file to the repo root.

A week is assembled from its parts:

```
cat weeks/parts/w1-*.js > weeks/week01.js
```

### The engine

`src/engine/` is the shared machinery every week inherits. It is the reason weeks 2 through 14 are content work rather than fourteen rebuilds.

| File | What it provides |
|---|---|
| `base.css`, `add.css` | The whole visual system. Palette, surfaces, every component |
| `lab-core.js` | Page shell, tab strip, gating, plain language layer, clickable terms, formulas, multiple choice |
| `lab-parts.js` | Decision charts, matching with three input paths, calculation tables, plotting, the test, the results page |
| `lab-steps.js` | Worked steps and the eliminate-the-distractors question |
| `lab-chart.js` | The patient chart and the clinical note |

### Verifying

```
node verify.js         # the whole lab, plus an accessibility sweep
node verify-case.js    # the walkthrough, including the anti-shortcut check
node verify-chart.js   # charting, the note, and every refusal they should make
```

These need Playwright and a Chromium binary. They walk the page the way a student would and assert on what happens, including the things that are supposed to fail: a blank chart row, an unmeasured value claimed as normal, a correct answer typed into a box that has not been unlocked yet.

## Design commitments

These hold across everything in this repo and are reasoned about in `compliance/index.md`.

- Dragging is never the only way to do anything.
- Colour never carries meaning on its own.
- Nothing is timed, no attempt is capped, nothing locks a student out.
- No external requests. Every page works offline and behind a campus proxy.
- Nothing is stored or transmitted. No student identifier ever persists.
- Gating is completion based, never score based. Getting an answer wrong never blocks anyone.

## Still open

- JAWS and VoiceOver pass before the course goes live.
- The three figure logo is a placeholder built from the design system description, not the real file.
- Weeks 2 to 12 and week 14 are specified in the manual against tools not yet built.
- Week 11's CBC and PCR lab is partly built and has no compliance document yet.
