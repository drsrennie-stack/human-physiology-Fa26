# BIO 005 Week 1, handoff pack

Everything built in this thread, August 31 2026, for Dr. Sharilyn Rennie.
Repo: `github.com/drsrennie-stack/human-physiology-Fa26`
Live at: `https://drsrennie-stack.github.io/human-physiology-Fa26/`

All HTML files in this pack are already uploaded to the repo and live. They are included here so the other thread has the exact source.

---

## 1. What is in the pack

### The lecture pair, Week 1

| File | What it is |
|---|---|
| `concept-videos-week01.html` | The continuous concept video player. All 20 Week 1 videos. Press play once and it runs the whole week, one concept into the next, with a toggle to stop that. Any concept is clickable to jump straight there. Each concept carries its own slide deck link and Drive notes PDF link. Watched concepts get a navy checkmark stored per device. The NotebookLM homeostasis podcast sits at the bottom of the index. |
| `slides-P-*.html` (20 files) | One steppable deck per concept, built from her Drive notes PDFs. Title slide on terra, then title-plus-boxes slides where each box zooms open to a big line with the key words in red. Controls: Back, Next, slide counter, Reset the slides, Pen, Present, Print the packet. Present opens a separate window and scales the slide to fit the screen. Print goes single ink, all boxes opened, one slide per page. |

Deck filenames, in course order:

```
slides-P-what-is-physiology.html            P-01
slides-P-systems-theory.html                P-02
slides-P-emergent-properties.html           P-03
slides-P-approaches.html                    P-04
slides-P-translational-medicine.html        P-05
slides-P-homeostasis.html                   P-06
slides-P-internal-external-environment.html P-07
slides-P-mass-balance.html                  P-08
slides-P-mass-flow.html                     P-09
slides-P-clearance.html                     P-10
slides-P-homeostasis-not-equilibrium.html   P-11
slides-P-control-systems.html               P-12
slides-P-reflex-control.html                P-13
slides-P-negative-feedback.html             P-14
slides-P-negative-feedback-example.html     P-15
slides-P-positive-feedback.html             P-16
slides-P-feedforward-control.html           P-17
slides-P-biological-rhythms.html            P-18
slides-P-science-of-physiology.html         P-19
slides-P-experimental-design.html           P-20
```

### The Canvas front door

| File | What it is |
|---|---|
| `canvas-home.html` | The Canvas home page card. One card, two doors: Enter Course to `welcome.html`, Read the Syllabus to `start-here.html`, plus a quiet link to `course-entry.html` for the setup check. White ground, house palette, everything AAA. Both buttons open in a new tab so Canvas keeps its place. |

Canvas embed snippet, height is measured not guessed (the card peaks at 767px on a phone):

```html
<p><iframe title="BIO 005 Human Physiology"
  src="https://drsrennie-stack.github.io/human-physiology-Fa26/canvas-home.html"
  width="100%" height="780" style="width:100%;height:780px;border:0"></iframe></p>
```

This does **not** replace `course-entry.html`. That page is the five minute setup check with the device rail and stays where it is under "Do this first".

### The Canvas course card images

| File | What it is |
|---|---|
| `canvas-card-biol005-terra.png` | **The one in use.** Terra ground, giant 005, stacked course name. 1200 x 669, which is the 262:146 ratio Canvas uses, so it does not crop. |
| `canvas-card-biol005-navy-tintproof.png` | Fallback only. Monochrome white on navy `#08101F`, for the case where Canvas's Color Overlay is on. Not needed now that the overlay is off. |

Background on the fallback, in case it comes up again: Canvas composites the course color over the card image at exactly 0.6 opacity, measured live from `.ic-DashboardCard__header_hero`. At 60 percent the tint swallows hue and only lightness survives, so the terra card measures 2.54:1 under a terra overlay. The monochrome navy card measures 3.97:1 under the same overlay and 19:1 with it off. The overlay is a per-user setting, so students may still see the card tinted on their own dashboards. This is aesthetics, not compliance: Canvas prints the course name, code and term as real text below the image, so the card art is never the accessible label.

### The teaching guide

| File | What it is |
|---|---|
| `teaching-guide-week01.html` | Instructor teaching notes for all 20 decks, keyed slide by slide, 85 content slides. Each slide gets three things: **Open with**, the sentence said before any box is opened; **As the boxes open**, what to add beyond what is on screen; **Do this**, the physical move, a pause, a drawing, a question, or something students write. Each deck also gets a "before you start" and a "close the deck with" line. Generated from the same data the decks are built from, and the build fails if a deck's note count does not match its slide count, so a note can never drift from its slide. Instructor copy, not linked from any student page. |
| `teaching-guide-week01.docx` | Same content as a Word file, 28 pages, US Letter, one deck per page, real heading styles so it carries an outline. Ships alongside the HTML, matching the lab manual convention. |

### Documentation

| File | What it is |
|---|---|
| `compliance-notes.md` | WCAG 2.2 audit covering the video page, all 20 decks, and the Canvas home card. Per-criterion table, full contrast audit with measured ratios, keyboard flow, screen reader notes, known limitations, privacy. |

---

## 2. The wiring that is still missing

This is the part the other thread needs to do. The videos and decks are live but they are a **closed loop**: they link to each other and nothing in the course links into them.

Current link graph, verified against the repo:

- `concept-videos-week01.html` is linked by exactly one thing, the 20 decks.
- The 20 decks are linked by exactly one thing, the video page.
- `week-01.html` and `week-01-foundations.html` link to neither.
- `index.html` has a **Lecture** nav item pointing at `course-materials.html`, and that file does not exist in the repo.

A student walking the normal path, welcome into week 1, never reaches any of it. Two fixes, independent of each other:

1. **Build `course-materials.html`.** The Lecture nav item is already aimed at it, so this fixes a dead nav link and gives the videos and decks a permanent home. New file, touches nothing existing.
2. **Add a lecture block to the real Week 1 page**, linking the video page and that week's decks.

**Open decision blocking fix 2:** `week-01.html` and `week-01-foundations.html` both exist. Only `week-01.html` has inbound links, from `welcome.html`. `week-01-foundations.html` is larger and has its own compliance file but zero inbound links. Neither title matches the adopted schedule. Somebody has to name the real Week 1 page before it gets wired.

---

## 3. Conventions these files follow

So anything built alongside them matches.

- **Palette.** Navy `#0B1530`, terra `#8B3A2E` as the only accent, white ground, 0.5px `rgba(11,21,48,.15)` hairline borders with no shadow, 8px card radius, 4px button radius. Muted body text is `#4F576A`, which is the corrected `--navy-55`, since the spec value flattened to `#797E8D` at 4.05:1 and failed the AA floor. No gold. Terra `#8B3A2E` is 7.66:1 on white and must never be tinted lighter for text.
- **Type.** Plus Jakarta Sans body, Open Sans display. Normal zeros, no slashed zeros.
- **Physiology signal.** Terra header band, where anatomy reads navy.
- **House rules honored throughout.** No em dashes, no italics, no Lora, no sage, no cream, no pastel fills, no bookend bars, no green for completed states.
- **Every HTML file carries** the iframe height-sender before the closing body tag, `target="_top"` on internal links, `target="_blank" rel="noopener"` on external ones, a skip link, a visible focus ring, a polite status region, and `prefers-reduced-motion` handling.
- **Storage keys are `bio005-` prefixed** so they cannot collide with the anatomy repo, which shares the `drsrennie-stack.github.io` origin.

---

## 4. Fix already applied

**Slide overflow, fixed August 31.** Slides with several boxes open were running past the bottom of the fixed 1280 by 720 stage and getting clipped. The content is now measured after every open, close, reset, resize and font load and scaled just enough to fit, so nothing is cut off and no text had to be shortened. Verified across all 20 decks, 85 slides, every box open, at two viewport sizes. The transform is cleared before printing. **The 20 deck files in this pack are the fixed versions and need re-uploading to the repo.**

---

## 5. Open items, not blockers

1. **Three QR study-tool cards** are not on these pages yet. They need URLs for the study guide questions, the pre-work, and the spaced recall cards.
2. **Small-type treatment.** The eyebrow and signature were flagged as not reading well. Recommended fix is eyebrow to 12px / 700 / .16em and signature to 16px / 600 / .01em, with small text moving off Open Sans to Figtree. Not applied yet, and it would need to go everywhere at once to stay consistent.
3. **The clearance deck, P-10.** The source PDF lists the liver as the primary organ of clearance and puts the kidney under secondary alongside sweat, saliva, breast milk and hair, which reads like a column artifact from the slide layout. The deck says liver and kidneys are primary. Confirm before this goes to students.
4. **Deck P-15** was rebuilt as a clean baroreceptor walkthrough rather than reusing the scanned Pearson figure in the source PDF, so the file is safe to post publicly.
5. **Captions.** All 20 videos should have reviewed caption tracks in YouTube Studio rather than auto-captions.
6. **The syllabus page does not exist.** The build tracker still lists it as not built and calls it the one thing a college will ask for. `start-here.html` is currently standing in as Syllabus and grading.
