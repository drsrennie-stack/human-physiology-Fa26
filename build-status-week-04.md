# Week 4 build status

BIOL 005 Human Physiology. Written September 24, 2026.

This is the honest inventory. It separates what was built in the guided walkthrough
format from what already existed in the repo in other formats, because the two
overlap and that overlap needs a decision from you.

---

## 1. Guided walkthroughs, built and tested

The format with one idea per screen, prediction gating, a worksheet sidebar with
PDF export, and Khan support buttons.

| File | Steps | Predictions | Topics | Support buttons | Size |
|---|---|---|---|---|---|
| biol005-w04-neurons-glia-guided.html | 44 | 33 | 7 | 3 steps | 100 KB |
| biol005-w04-rmp-guided.html | 35 | 28 | 12 | 14 steps | 78 KB |
| biol005-w04-channel-gating-guided.html | 16 | 13 | 6 | 1 step | 48 KB |

What was verified on each, by running them headlessly:

- Every step plays and its animation promise resolves.
- Next is disabled on every prediction step until Show me is clicked.
- The topic jump menu stays disabled until the last step, then unlocks.
- Typed answers persist, appear in See all my answers, and reach the print view
  with the student name attached.
- No console errors.
- Key scenes screenshotted and inspected, not just passed by the automated run.

Update, September 24, 2026: the neurons and glia walkthrough is now the only
student-facing lesson for that topic, so it was extended from 22 steps to 44 to
teach every element of Week 4 competencies 7 to 11, the note sheet prompts, and
the recall cards. It now opens with the map of the nervous system. All checks
above were repeated on the 44-step version, plus a reduced motion pass and a
keyboard-only pass.

Fixes made after visual inspection: sodium was bouncing off the membrane instead
of passing through the channel in the resting potential file; dendrites were
drawing on top of the cell body; labels and captions were running under the Watch
again button; the inactivation gate was blocking at the wrong end of the pore.

## 2. Drawing sheet, built

biol005-w04-drawing-sheet.html. Five parts, 24 drawing boxes, 10 open writing
blocks with no ruled lines. Prints to eleven pages with a page break before each
part. Covers the three guided walkthroughs above and nothing else yet. On
September 24, Part 1 gained a nervous system map box and Part 2 gained an axonal
transport box.

## 3. Documentation, written

- guided-walkthrough-template.md, the structure and content rules
- guided-walkthrough-specs.md, the exact design values
- build-status-week-04.md, this file

## 4. Compliance notes

- compliance-notes-week-04-neurons-glia.md
- compliance-notes-week-04-channel-gating.md
- compliance-notes-week-04-drawing-sheet.md

Each carries its contrast audit, keyboard flow, and open limitations.

---

## 5. What already existed in the repo, not built this session

These files predate this session. Every topic below has a full set of notes,
slides, story slides, a draw-along page, and transcripts.

| Topic | Formats present | Guided walkthrough? |
|---|---|---|
| neurons-glia | notes, slides, story slides, story draw-along, transcripts, all retired September 24 | Yes, now the only student-facing lesson |
| membrane-potential | notes, slides, story slides, story draw-along, transcripts | Yes, as rmp-guided |
| channel-gating | none | Yes, new |
| action-potential | notes, slides, story slides, story draw-along, transcripts | No |
| ap-conduction | notes, slides, story slides, story draw-along, transcripts | No |
| synapse | notes, slides, story slides, story draw-along, transcripts | No |
| synaptic-integration | notes, slides, story slides, story draw-along, transcripts | No |
| rmp-balloon-to-equation | slides only | Superseded by rmp-guided |

Note that the action-potential story files are titled "Graded potentials and the
action potential," so graded potentials is already covered there rather than being
a separate topic.

---

## 6. The decision this raises

Three of the seven chapter topics now exist in two formats, and four exist only in
the older format. Before more walkthroughs get built, worth deciding:

1. Do the guided walkthroughs replace the story slides and draw-along pages for a
   topic, or sit alongside them as a different route through the same material?
2. If they replace, the old files should come off the student-facing pages so
   students are not choosing between two versions of the same lesson.
3. If they sit alongside, week-04.html needs to say plainly which is which and when
   to use each.

Decided for neurons and glia on September 24, 2026: the guided walkthrough
replaces the older format. The notes, slides, story slides, draw-along, and
transcripts for that topic are retired and are being unlinked. The other topics
are still open.

Right now week-04.html links the three new walkthroughs and the drawing sheet.
It does not link the older story files, so students currently see the new route
only.

---

## 7. Known gaps, all formats

1. Hand screen reader pass with NVDA in Chrome and VoiceOver in Safari has not been
   done on any file. Automated checks only.
2. Khan support buttons are thin outside the resting potential walkthrough. The
   mapping table supplied earlier covered resting potential, graded potentials,
   action potentials, and propagation, so neurons and glia and channel gating have
   only the URLs that could be verified independently. Khan Academy could not be
   reached from the build environment on September 24, so the new neurons and
   glia steps (map, glia, myelin, transport) have no support buttons yet.
3. The drawing sheet covers three topics, not the chapter.
4. Competency mismatches flagged earlier are unresolved: the eleven stated
   objectives do not line up with bio005-competencies.js, and the Nernst competency
   still says "Calculate" although calculation is no longer required.
5. lecture-week.html does not link any of the new files.
6. Week 4 is still gated closed in bio005-nav.js.
