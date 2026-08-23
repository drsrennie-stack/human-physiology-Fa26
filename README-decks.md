# Five slide decks, Weeks 1 and 2

BIO 005 Human Physiology. Dr. Sharilyn Rennie.

## What to do with this

Copy the five `slides-p-*.html` files into the **repo root**, beside `slides-p-introduction-to-physiology.html`. They are self contained and expect nothing except `icon.svg` and `bio005-dock.js` as siblings, which are already there.

Copy the five `compliance/*.compliance.md` files into **`compliance/`**. Then open `compliance/index-rows.md`, which is not a deliverable, it is a note to you: it holds the five rows to paste into `compliance/index.md` and three prose changes the index now needs.

`_deck-source/` is the generator. You do not need it to ship the decks. You need it to change them.

## The five decks

| File | Week | Topic | Slides | Figures |
|---|---|---|---|---|
| `slides-p-quantitative-skills.html` | 1 | Quantitative Skills for Physiology | 30 | 3 |
| `slides-p-chemical-foundations.html` | 1 | Chemical Foundations | 36 | 4 |
| `slides-p-membrane-structure-and-diffusion.html` | 2 | Membrane Structure and Diffusion | 33 | 4 |
| `slides-p-membrane-transport.html` | 2 | Membrane Transport | 34 | 4 |
| `slides-p-membrane-potential.html` | 2 | Membrane Potential | 34 | 4 |

That completes the two by three grid your build tracker asks for, except for Week 1 Foundations, which already exists.

## Competencies

I followed `bio005-competencies.csv`, the 268 row set, because you asked for the most comprehensive. Every one of the 20 Week 1 and 20 Week 2 competencies is taught, and every slide that teaches one carries a line at the bottom linking into `competency-study-guide.html` at the right anchor.

**Lab competencies are taught in the lecture decks**, as you asked, each with a gold bordered annotation reading "You will do this in lab" that says what the student will actually do and how the slide connects. There are 55 of those across the five decks. They print.

## What is different from the existing deck

Three things I changed rather than copied, because your own `compliance/index.md` forbids them:

1. **The fonts are inlined.** The Introduction deck links `fonts.googleapis.com`, which contradicts "no web fonts, no CDN, no external requests" in your index. These five make zero external requests, verified with request interception. They cost about 69 KB each for four inlined faces.
2. **There is a `noscript` block.** It says the slides read and print without JavaScript, names what is lost, and carries a style rule that forces every box open, so the fallback is real rather than a message.
3. **There is a brand mark in the header.** Your Aug 22 audit lists the Introduction deck among eight pages with no logo slot.

## How to change a deck

```
cd _deck-source
node build-decks.js
```

It reads `content/<deck-id>.js` and writes `<deck-id>.html`. Every slide is a small object with a `k` for its kind. The engine CSS and JS in `engine/` are lifted from your Introduction deck so all six decks behave identically. The build strips any em dash that gets in and tells you it did.

To add a sixth deck, drop a new file in `content/` and rebuild. To change a number, change it in one place.

## Three things in your repo that these decks surfaced

Not fixed by me, because they are your files and two of them are content decisions.

1. **`workbook_week02_membranes-transport.html`, Part 3 Q4.** It gives eight teaspoons of sugar as "about 400 mM glucose" and expects the answer hypertonic. Eight level teaspoons is about 32 g per litre, roughly 94 mM of sucrose, about 250 mOsm/L once sucrase splits it, which is mildly **hypo**tonic. The right answer is that the drink fails for want of sodium, not for tonicity. The deck now rests the answer on the sodium.
2. **`src/weeks/parts/w1-f-curve.js` line 167, duplicated at `src/weeks/week01.js` line 1888.** "It cannot tell you whether the oxygen pressure is 80 or 130." On your own curve, 130 gives about 99 percent, not 96. The teaching point survives if you frame it as the accuracy of the clip, which is what the deck now does.
3. **Week numbering.** `workbook_week03_membrane-potential.html` is titled Week 3, but `bio005-competencies.csv` puts every membrane potential competency in Week 2 and makes Week 3 Cell Signaling. I refer to it as "the membrane potential lab packet" with no week number, so the pointer is right whichever way you resolve it. Related: that packet uses Na+ 15 mmol/L inside, giving an equilibrium potential of +60 mV, while the competency set and the other decks use 12, giving +66 mV. The deck names the difference out loud rather than hiding it.

## Verification

Every deck, every one of these, by automated test rather than by eye:

- Zero external requests.
- Zero contrast failures at AA **and at AAA**, measured on computed styles in three card states: at rest, marked opened, and open. Lowest ratio anywhere is 7.78:1. Your index says every document in the folder reports the same AAA shortfall on the gold eyebrow at 5.75:1. These decks do not have it.
- No horizontal scrolling at 320, 375, 768, 1024 or 1440 pixels.
- No skipped heading level. No control without an accessible name.
- Present mode, the zoom dialog, its focus trap and its focus restoration all confirmed working on all five.
- In print, zero reveal bodies stay hidden, so a printed deck is complete.
- 19 figures, every one with `role="img"`, a resolving `aria-labelledby`, a `title`, a `desc` carrying the landmark values, and no text under 13 pixels.

Two contrast defects were found and fixed during the build. The second is worth your attention because **it also affects the existing Introduction deck**: the gold card label `#6B5214` measures 7.39:1 on a white card but drops to **6.50:1** once a card takes the opened state and its background becomes `#EDF1F3`. A single pass sweep never sees it. These decks use `#5A4511`.

The physiology was fact checked adversarially, line by line, every worked example recomputed by hand and every figure traced against the numbers in the prose. Seventeen errors were found and corrected before this build, including one that would have taught a factor of ten thousand wrong and one that had two slides in the same deck contradicting each other on cholesterol.

Dr. Sharilyn Rennie
