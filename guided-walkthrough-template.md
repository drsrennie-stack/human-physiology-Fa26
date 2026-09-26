# Guided walkthrough template, BIOL 005

How every guided walkthrough file in this course is built. Follow this and a new
section will match the ones already shipped in look, behavior, and accessibility.

Built from: biol005-w04-rmp-guided.html, biol005-w04-neurons-glia-guided.html,
biol005-w04-channel-gating-guided.html

Companion file: guided-walkthrough-specs.md holds the exact design values.

---

## 1. What a guided walkthrough is

A single self-contained HTML file that teaches one topic as a sequence of steps.
One idea per screen. The same animated figure stays on screen and changes as the
steps advance, rather than a new picture per slide.

Non-negotiable behaviors:

- Story first, numbers and equations later. A student meets the idea in plain
  language before any symbol or value appears.
- The student predicts before seeing. On prediction steps, Next stays locked
  until they click Show me.
- The topic jump menu is locked until they finish a full pass.
- A worksheet sits beside the lesson, saves what they type, and exports to PDF
  for Canvas upload.
- Clinical cases at the end of a section, not the beginning.

---

## 2. File anatomy

One file, assembled from five blocks in this order:

| Block | What it holds | Reused? |
|---|---|---|
| HEAD | doctype, title, CSS, page markup, worksheet markup | Reused as-is, three strings changed |
| ENGINE | el, tx, place, ease, tweenPath, tweenVal, wait, markers, arrow | Reused unchanged |
| SCENE | The SVG for this topic and its show and hide helpers | Written per section |
| STEPS | The STEPS array | Written per section |
| TAIL | support videos, worksheet, player, jump menu, height sender | Reused, four strings changed |

Only SCENE and STEPS are new work per topic.

### Strings to change in HEAD

1. `<title>` becomes `<Topic>, step by step | BIOL 005 Week N`
2. `<h1>` text becomes `<Topic>, step by step`
3. Print header becomes `BIOL 005 Week N: <Topic>, prediction worksheet`

### Strings to change in TAIL

1. `var KEY="bio005-wNN-<slug>-guided-v1";` the localStorage key. It must be unique
   per file or two sections will overwrite each other's saved answers.
2. `FRAME_ID="biol005-wNN-<slug>-guided"` for the iframe height sender.
3. The jump menu start-over sublabel, which names what step 1 is.
4. The `V` and `SUP` objects for support videos, section 6.

Remove any leftover scene-specific hook from the file you copied. The resting
potential file carries a `gK.classList.toggle` line that only makes sense there.

---

## 3. The STEPS array

Each step is an object.

| Field | Required | What it does |
|---|---|---|
| title | yes | Step heading. Also the key SUP uses to attach a video button. |
| text | yes | Array of strings, one per paragraph. The teaching. |
| desc | yes | Plain-language description of what the figure shows, for the aria-live region. Written for someone who cannot see the animation. |
| pre | yes | Sets the figure to its starting state. Must be safe to call repeatedly. |
| play | yes | function(a) returning a Promise. The argument is false when animation is suppressed. It must resolve, or Next stays locked forever. |
| post | no | Sets the figure to its finished state without animating, used when returning to a completed step. If omitted, the player calls pre() then play(false). |
| ask | no | The prediction question. Its presence is what locks Next. |
| ans | no | Array of strings shown after Show me. Required if ask is present. |
| name | no | The science term, revealed after the plain-language idea. |
| auto | no | true plays on arrival with no Show me button. Use for steps with no prediction. |
| sec | no | Starts a new topic. Its presence puts an entry in the jump menu. |
| comp | no | The competency this topic covers. Shown under the section label. |

### Rules for writing steps

- Put sec and comp on the first step of each topic only. The player walks backward
  to find the current one.
- Every ask needs an ans that answers it directly, then teaches one step further.
  The second paragraph of ans is where the science name and the clinical link belong.
- name arrives after the student has the idea, never before.
- Keep captions short. Length limits and the reason for them are in the specs file.
- Total animation per step stays under about four seconds.

---

## 4. The SCENE block

Build the whole figure once at load, then show and hide parts per step. Never
rebuild the SVG between steps.

Standard helpers to define in every scene:

    var REG={};                     // named groups
    function G(name,p){...}         // create and register a group
    function only(list){...}        // show only these groups, hide the rest
    function cap(s){...}            // set the caption line
    function resetAll(){...}        // clear labels, captions, sub-states
    function S(list){only(list);resetAll();}   // the usual first line of pre()

Canvas size, keep-clear zones, stroke weights, and marker sizes are all in the
specs file. Two rules worth repeating here because they cause real bugs:

- Draw order is z-order. Background parts first, foreground last.
- A traveling marker stops short of a filled endpoint so it stays visible.

---

## 5. The worksheet

Comes from TAIL. No per-section work beyond the unique KEY. It provides:

- A name field.
- The current step's prediction box.
- After the reveal, a second box asking what actually happened, whether they were
  right, and what they would change.
- See all my answers.
- Save as PDF for Canvas, which prints the name, date, every question, and only the
  student's own typed answers.

Answers live in the student's browser. The Canvas assignment should tell them to
export the PDF, because clearing site data clears their work.

---

## 6. Support videos

    var V={ key:{u:"<full url>",n:"<video title>"} };
    var SUP={
      "<exact step title>":[["<the question a stuck student would ask>","<V key>",
                             "<plain-language what to listen for>"]]
    };

Rules:

- The SUP key must match the step title exactly.
- Strip tracking parameters from any URL.
- Verify every URL before it ships. A 404 in front of students is worse than no
  button. If a URL cannot be verified, leave the button out and say so in the
  compliance file.
- Write the button label as the student's question, not the video's title.
- Khan Academy is CC BY-NC-SA, so its material can be linked, embedded, and its
  transcripts corrected and reposted with attribution. Ordinary copyrighted
  channels are link or embed only.

---

## 7. Accessibility floor

Full criteria list and measured contrast ratios are in the specs file. The short
version: semantic structure, aria-live scene descriptions, keyboard operable
throughout, focus moved deliberately, 44px minimum targets, visible focus ring,
reduced-motion support, and no state carried by color alone.

---

## 8. Test before delivery

Run headless and confirm:

1. Every step plays and play() resolves. Allow more wait time than the longest
   animation chain in the file, or the test reports a false stuck step.
2. Next is disabled on every step with an ask, until Show me.
3. The jump menu is disabled until the last step, then enabled.
4. Typed answers persist, appear in See all my answers, and reach the print view
   with the student name.
5. No console errors.
6. Screenshot the key scenes and look at them. Automated passes do not catch labels
   hidden behind buttons, wrong draw order, or captions running off the edge.

---

## 9. Delivery

- Naming: biol005-wNN-<slug>-guided.html, lowercase, hyphens.
- Link it from week-NN.html in the Learn section, in teaching order.
- Ship compliance-notes-week-NN-<slug>.md with it. The project is not complete
  without it.
- Add a matching part to the drawing sheet for that week.
- Zip only the files that changed since the last drop. Never push to the repo.

---

## 10. Section order for the Week 4 chapter

1. Neurons and neuroglia
2. Resting membrane potential
3. Channel gating
4. Graded potentials
5. Action potential
6. Conduction
7. Neuromuscular junction

Each section ends by pointing at the next one. Students go through in order.
Before building sections 4 through 7, see build-status-week-04.md, since older
files already cover several of those topics in a different format.
