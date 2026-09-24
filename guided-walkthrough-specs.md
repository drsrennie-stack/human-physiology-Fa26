# Guided walkthrough design specs, BIOL 005

Exact build values for the Week 4 walkthroughs and the drawing sheet. Every number
here is what the shipped files use. Companion to guided-walkthrough-template.md,
which covers structure and content. This file covers appearance and behavior.

Source files: biol005-w04-neurons-glia-guided.html, biol005-w04-rmp-guided.html,
biol005-w04-channel-gating-guided.html, biol005-w04-drawing-sheet.html

---

## 1. Tokens

Declared once on :root. Never hardcode a color anywhere else in the file.

| Token | Value | Used for |
|---|---|---|
| --navy | #0B1530 | Body text, headings, primary buttons, progress fill |
| --navy-deep | #060A18 | Hover on navy buttons only |
| --navy-tint | #ECEFF4 | Progress bar track, menu hover, membrane fill |
| --maroon | #8B3A2E | Prediction border, section eyebrow, links, focus ring |
| --maroon-dark | #6E2D24 | Maroon hover |
| --gold | #C9A14A | Reserved, not used for text |
| --gold-deep | #8A6D33 | Gate graphics, trigger zone wedge, large shapes only |
| --ink2 | #414B5C | Secondary text, figure labels, field borders |
| --line | #C9CED8 | Hairline borders on answer boxes and the scene frame |
| --page | #FAFAF9 | Page background |
| --card | #FFFFFF | Every card |
| --shadow | 0 1px 3px rgba(0,0,0,0.08) | Card at rest |
| --shadow2 | 0 8px 16px rgba(0,0,0,0.10) | Card or button on hover, jump menu |

Fonts, self-hosted through assets/fonts-site.css. No Google Fonts request.

| Token | Stack | Used for |
|---|---|---|
| --head | "Open Sans","Segoe UI",Arial,sans-serif | h1 and h2 only, weight 800 |
| --body | "Plus Jakarta Sans","Segoe UI",Arial,sans-serif | Everything else |

Italics are switched off globally with `em,i,cite,dfn{font-style:normal}`. Keep that
rule in every file.

---

## 2. Type scale

| Element | Size | Weight | Color |
|---|---|---|---|
| Body | 1.0625rem, line-height 1.55 | 400 | navy |
| Page h1 | clamp(1.1rem, 2.2vw, 1.45rem) | 800 head | navy |
| Course line above h1 | .85rem | 600 | ink2 |
| Step heading, h2 | clamp(1.3rem, 2.4vw, 1.7rem) | 800 head | navy |
| Section eyebrow | .85rem | 700 | maroon |
| Prediction question | 1.08rem | 700 | navy |
| Small labels | .85rem to .95rem | 700 | maroon or navy by context |
| Figure text .t | 15 to 17 SVG units | 700 | #414B5C |
| Figure text .tn | 17 to 30 | 800 | #0B1530 |
| Figure text .tm | 16 to 22 | 800 | #8B3A2E |
| Figure text .iw, inside a filled shape | 15 to 24 | 800 | #FFFFFF |

Prose lines cap at 72ch. Apply to paragraphs, prediction boxes, answer boxes, and
support blocks.

---

## 3. Page layout

Two columns, lesson and worksheet.

    .layout  max-width 1400px, padding 18px 20px 40px
             grid-template-columns: minmax(0,1fr) 380px
             gap 20px, align-items start

The worksheet column is a fixed 380px. The lesson column takes the rest.

Inside the lesson card, a second grid holds the figure and the text.

    .stage-grid  grid-template-columns: minmax(0,1.2fr) minmax(0,1fr)
                 gap 22px, align-items start
    .scene-col   sticky, so the figure stays beside the text while it scrolls

Cards are background #fff, border-radius 14px, box-shadow var(--shadow). No borders,
no accent bars, no tinted card backgrounds.

### Breakpoints

| Width | What changes |
|---|---|
| 1250px and under | .stage-grid collapses to one column. The figure moves above the text, gets a white background and 8px bottom padding, and #scene max-height drops to 38vh |
| 1050px and under | .layout collapses to one column. The worksheet moves below the lesson, loses sticky, and gains a collapse toggle |

---

## 4. The figure

| Property | Value |
|---|---|
| SVG viewBox | 0 0 900 560, every file |
| Rendered width | 100%, height auto |
| Max height | 62vh desktop, 38vh at 1250px and under |
| Frame | 1px var(--line), border-radius 12px, overflow hidden |

Keep-clear zones inside the 900 by 560 canvas:

- Bottom right, roughly x 620 to 900 and y 460 to 560, holds the Watch again button.
  Nothing goes there.
- Captions sit at x 392, y 526, anchored middle, 18px, class tn. Keep caption text
  under about 40 characters or it runs under the button.
- A voltage meter or other readout goes on the left, x 70 to 270, y 400 to 474.

Drawing rules:

- Draw order is z-order. Background elements first. A cell body drawn after its
  dendrites will cover them.
- A moving marker stops short of any filled endpoint so it stays visible. In the
  neuron file the signal stops at x 790, not on the terminal knobs at 812.
- Stroke weights: membranes and major outlines 4 to 5, axons and fibers 8 to 11,
  small connectors 3 to 7.
- Ion and marker radius 13 at full size, 8 when weakened, 4 when nearly gone, 0 to
  disappear.

SVG text uses the classes .t, .tn, .tm, .iw from section 2. No inline fill colors on
text.

---

## 5. Components

### Progress bar
Track 8px tall, radius 99px, background navy-tint. Fill navy, width transitions over
.3s. Step count beside it at .9rem, weight 700, ink2.

### Prediction box
border 1px solid var(--maroon), border-radius 12px, padding 12px 16px, max-width 72ch.
Label above in maroon at .85rem weight 700. Question at 1.08rem weight 700. This is
the one place a colored border is used, because it marks the step where the student
has to do something before moving on.

### Answer box
Same shape, border 1px solid var(--line), label in navy.

### Science name chip
Navy pill: background var(--navy), color #fff, border-radius 99px, padding 3px 12px,
font-weight 700, font-size .92rem.

### Support video button
White, radius 10px, shadow at rest and shadow2 on hover, min-height 44px, padding
8px 14px. The "Listen for" line sits under it at .88rem, weight 500, ink2, indented
14px. Opens in a new tab with rel="noopener".

### Controls
Buttons are min-height 48px, padding 0 22px, font-size 1rem, radius 10px, 1px navy
border. Primary is navy with white text, the rest are white with navy text. The
Watch again button sits absolutely at right 10px, bottom 10px inside the figure
frame, min-height 44px.

### Worksheet fields
width 100%, border 1px solid var(--ink2), border-radius 10px, padding 9px 11px,
font 1rem body. Textareas min-height 110px, resize vertical, line-height 1.45.
Entry cards use shadow and no border. In the See all view they switch to a 1px line
border and no shadow.

---

## 6. Motion

| Rule | Value |
|---|---|
| Layer cross-fade | opacity .45s ease |
| Progress fill | width .3s |
| Card and button hover | 200ms ease on transform and box-shadow |
| Single tween in a step | 260ms to 1400ms |
| Whole step, all tweens summed | Under about four seconds |
| Reduced motion | prefers-reduced-motion disables transitions and animations, and every play() jumps to its end state |

Timings that have worked: a jump between nodes 260ms, an ion crossing a membrane
900ms, a voltage sweep 700 to 1300ms, a pause between beats 120 to 400ms.

Every play() must resolve. A step whose promise never settles leaves Next disabled
permanently.

---

## 7. States and gating

| State | Rule |
|---|---|
| Step with ask | Next disabled until Show me is clicked, using the disabled attribute, never color alone |
| Step with auto | Plays on arrival, no Show me button |
| Jump menu | Disabled until the last step, labelled so students know why |
| Jump targets | Topic starts only, never mid-topic steps |
| Saved progress | localStorage, key bio005-wNN-<slug>-guided-v1, unique per file |

Never use green for a completed state. Completed is navy on navy-tint.

---

## 8. Accessibility floor

- Skip link, off-screen at top -60px, appears at top 12px on focus.
- Focus ring everywhere: outline 3px solid var(--maroon), outline-offset 3px,
  border-radius 4px.
- All controls at least 44px high, 48px for the main lesson controls.
- Every scene has a desc string written so the step still teaches with the figure
  unseen. It goes to an aria-live polite region.
- Decorative SVG is aria-hidden. A scaffold figure the student draws on gets
  role="img" and an aria-label describing what is already drawn.
- Focus moves to the step heading on advance, and to the answer box on reveal.
- aria-expanded on the jump menu and the worksheet toggle.
- Contrast, measured, all AAA for text: navy on white 18.04:1, navy on page 17.27:1,
  maroon on white 7.66:1, ink2 on white 8.80:1, white on navy 18.04:1, navy on
  navy-tint 15.65:1. Gold-deep on white is 4.87:1, which is AA for large text only,
  so it never carries text.

---

## 9. Print

The walkthrough's print view is the worksheet, not the lesson.

Hidden in print: .top, .stage, .skip, .ws-actions, .ws-toggle, .ws .sub,
currentEntry, wsCount, allToggle, and all live form fields.
Shown in print: the print-only header, allAnswers, and .pcopy blocks which carry the
typed text as white-space pre-wrap so answers print without form controls.

Entries print with a 1px #888 border, no shadow, break-inside avoid. Body font 11pt.

### Drawing sheet print rules

| Property | Value |
|---|---|
| @page margin | 14mm |
| Body font | 11.5pt |
| Each part | page-break-before always, first part excepted |
| Each task | page-break-inside avoid |
| Drawing box border | 1px solid #000 in print, 1px var(--ink2) on screen |

Drawing box heights: .draw 230px, .draw.short 150px, .draw.tall 320px.
Writing areas are open blocks with no rules inside, sized to the answer: 110px for a
short answer, 132px for a short list, 168px for four sentences, 204px for a full
explanation. Never put ruled lines inside a writing block.

Grids are 1fr 1fr or 1fr 1fr 1fr with 14px gap, collapsing to one column at 700px.

---

## 10. Content rules that affect layout

- One idea per screen. If a step needs more than three paragraphs, it is two steps.
- Story before numbers. No symbol or value appears until the idea it stands for has
  been built in plain language.
- The science name arrives after the idea, in the navy chip, never before.
- Clinical cases go at the end of a section, not the opening.
- Lab values always carry their normal range beside them, since a student cannot
  judge a value they have not been given limits for.
- Temperatures in Celsius with Fahrenheit in parentheses.
- Byline and signature is Dr. Sharilyn Rennie, no credential suffix.
- No em dashes anywhere, including comments and code.
