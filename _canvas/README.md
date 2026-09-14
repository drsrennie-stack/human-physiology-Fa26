# _canvas

Everything that lives inside Canvas, and nothing else.

The leading underscore is deliberate. GitHub Pages runs Jekyll on this repo, and Jekyll
skips any folder whose name starts with an underscore, so nothing in here is published to
drsrennie-stack.github.io. That is what you want: these files are paste sources and print
masters, not web pages. It matches `_holding` and `_superseded`, which already work the
same way.

## What is in here

| Folder | What it holds |
|---|---|
| `pages/` | The Canvas page HTML, one file per page. Open one, copy the whole thing, paste it into the Canvas editor's `</>` view. |
| `print/` | The note sheet PDFs. These get uploaded to Canvas Files, not linked from here. |
| `build/` | The two scripts that generate everything above. |

`PASTE-GUIDE.md` is the instructions: page titles, module order, which links still need
swapping. `page-titles.json` is the same title list in machine form.
`compliance-notes.md` is the accessibility record, and the project is not finished without
it.

## The rule these files follow

A document a student reads goes in Canvas. A tool a student uses stays on the course
website.

That is the whole reason this folder exists. Students were clicking a button, landing on
the course site in a brand new browser tab with no Back history, and getting stranded. So
the syllabus, the grading rules, the weekly instructions and the note sheet all moved into
Canvas, and what stayed on the site is the things that actually do something: the print
pack, the concept videos, the practice exam, Rx Cards, the labs, the patient chart.

The page HTML in `pages/` is written for the Canvas Rich Content Editor, which strips
`<script>` and `<style>` and keeps inline styles. Each file is a fragment, not a whole
page. There is no doctype and no `<head>`, because the Canvas page title becomes the h1
and the content starts at h2.

## Regenerating

The pages:

    python3 build/build_canvas_pages.py

Both weeks are data at the bottom of that script. Copy the Week 2 block, change the week
number, title, dates, chapters, lab, case and discussion, and run it. Steps can be written
in any order; the script sorts them into Learn, Practice, Apply, Check and numbers them
from that. It refuses to write a file containing an em dash, italics, a script or style
block, or Lora.

The note sheet PDFs, from the repo root:

    python3 -m http.server 8777
    node build/make_note_sheet_pdfs.js

They render straight from `note-sheet.html`, so the printed sheet and the website version
can never drift apart. Change the note sheet and rerun this, and every week's PDF is
correct again.

## Still at the repo root

`canvas-home.html` stays where it is. Eight files link to it, and moving it would break
all of them.

Five others could move in here whenever you want: `canvas-start.html`, `canvas-kit.html`,
`canvas-virtual-office-body.html`, `canvas-iframes.md` and
`canvas-assignment-lab-analysis.md`. Nothing links to any of them. They are not in this
drop, because uploading a copy through the GitHub web interface cannot delete the original,
and you would end up with both. Move them when you are next in the repo somewhere you can
delete.

Dr. Sharilyn Rennie
