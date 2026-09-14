# Week packet builder

Turns a week's notes into a printable packet in the course's own design system,
and a one page per section competency list to go with it. Built for Week 2; the
same kit runs any week.

## What comes out

- `BIO005-Week2-Packet.pdf`, 26 pages. Cover, a how to use page, then a chapter
  per body of material. The prose is deliberately gone: numbered steps, bullets,
  captioned tables, sequence strips for processes, and concept maps for the
  decisions.
- `BIO005-Week2-Competency-List.pdf`, 3 pages. Every competency grouped, with its
  can-do statement and three checkboxes: Read, Drew it, From memory.

## Run it

    python3 tools/week-packet/build.py          # writes packet.html
    # then render with headless Chromium, Letter, 0.62in top and bottom,
    # 0.7in left and right, displayHeaderFooter on

## Two things that will bite you

**Fonts.** Link `assets/fonts-site.css`, or inline it, and nothing else. The
first build used fonts.googleapis.com, it never loaded in the render, and both
PDFs came out in a fallback face. The repo self hosts Plus Jakarta Sans and Open
Sans as base64 woff2 in that one file precisely so this cannot happen. Check the
result with `pdffonts`; you should see PlusJakartaSans and OpenSans embedded.

**Nothing may split across a page.** Every table, sequence, concept map, callout
and worked problem carries `break-inside:avoid`, and section headings carry
`break-after:avoid` so a heading never sits alone at the foot of a page. Groups
of rows may break; individual rows never do. If you add a new block type to
`kit.py`, add it to that rule or it will split.

## The files

| File | What it is |
|---|---|
| `kit.py` | The design system: CSS, and the helpers `tbl`, `seq`, `cmap`, `hold`, `prob`, `ul`, `ol` |
| `ch1.py` | Chapter 1, the cell and its tissues |
| `ch2.py` | Chapter 2, transport across the membrane |
| `ch3.py` | Chapter 3, how cells talk to each other |
| `build.py` | Assembles the cover, contents, chapter openers and objectives |

To add a week, copy a chapter file, rewrite its blocks, and list it in `CH` in
`build.py` with its title, lede and By the end objectives.

Dr. Sharilyn Rennie
