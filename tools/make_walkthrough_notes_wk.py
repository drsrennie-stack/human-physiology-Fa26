#!/usr/bin/env python3
"""
tools/make_walkthrough_notes_wk.py

Week 6 and Week 7 copy of tools/make_walkthrough_notes_w05.py. Oct 17 2026.
Builds the written notes page for each walkthrough of the week, and the
week's notes page that lists them (week-0N-notes.html), from the same shell,
styles and printing rules as Week 5. The PDFs come from
tools/make_notes_pdf.py N.

The notes for each walkthrough live beside its scene, in
tools/walkthroughs/w0N-<slug>.notes.json:
  {"title", "h1", "start", "ostax", "comps", "blurb", "prep_map",
   "sections": [{"h": heading, "book": Silverthorn pointer, "blocks": [...]}]}
Block types are the Week 4 and Week 5 ones: ["p", text] ["h3", text]
["ul", [..]] ["ol", [..]] ["defs", [[term, def]]] ["table", [header], [[row]]].
The book pointer names the chapter and the part to read, for example
"Chapter 13, the part on excitation-contraction coupling". No figure numbers
are given until they are checked against the 9th edition.

Run: python3 tools/make_walkthrough_notes_wk.py 6
"""
import html, json, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / "tools" / "walkthroughs"))
import make_walkthrough_notes as base
from assemble_wk import WEEKS
from week_label import relabel

e = base.e
FIGNOTE = '<p class="figref"><b>In your textbook:</b> Silverthorn %s.</p>\n'

# what each week's lab covers, for the line under the list on the notes page
LABLINE = {
 6: "Competencies 15 and 16 are the grip fatigue test and the twitch and tetanus simulation, and they are done in lab.",
 7: "Competencies 6, 15 and 22 are autonomic testing, the hormone assay and reading the hormone cycle graphs, and they are done in lab.",
}
TITLES = {6: "Muscle, and how movement gets commanded", 7: "Hormones, the autonomic system, and reproduction"}


def load(week):
    out = []
    for slug in WEEKS[week]:
        f = ROOT / "tools/walkthroughs" / ("w%02d-%s.notes.json" % (week, slug))
        if f.exists():
            n = json.loads(f.read_text(encoding="utf-8"))
            n["slug"] = slug
            n["file"] = "biol005-w%02d-%s-walkthrough-notes.html" % (week, slug)
            n["walk"] = "biol005-w%02d-%s-guided.html" % (week, slug)
            out.append(n)
    return out


def page(week, n):
    s = base.SHELL[:base.HEAD_END] + base.STYLE_ADD + base.SHELL[base.HEAD_END:]
    s = re.sub(r"<title>[^<]*</title>", "<title>%s, written notes &middot; BIO 005 Human Physiology</title>" % e(n["title"]), s, count=1)
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    pdf = "notes/BIO005-Week%d-Walkthrough-Notes-%s.pdf" % (week, n["slug"])
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week %d · Written notes</p>\n'
            '  <h1>%s</h1>\n  <p>The written notes for the %s walkthrough. %s.</p>\n'
            '  <p><b>To print:</b> <a href="%s" target="_blank" rel="noopener">these notes as a two-column PDF<span class="mm-vh"> (opens in a new tab)</span></a>. Already printed the Week %d notes? You do not need to print these again.</p>\n'
            '</div></header>\n' % (week, e(n["title"]), e(n["title"].lower()), e(n["comps"]), pdf, week))
    body = ['<main id="main"><div class="wrap notes">\n',
            '<div class="use"><p><b>How to use these notes.</b> Work through <a href="%s" target="_top">the walkthrough</a> first, writing each prediction on your worksheet before you press Show me. '
            'Then read these notes to fill in anything you missed, and use them to review. They are the same facts in a form you can study from, not a copy of the walkthrough.</p></div>\n' % n["walk"]]
    for sec in n["sections"]:
        t = sec["h"]
        body.append("<section id=\"%s\">\n<h2>%s</h2>\n" % (re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-"), e(t))
                    + (FIGNOTE % e(sec["book"]) if sec.get("book") else "")
                    + "".join(base.block(tuple(x)) for x in sec["blocks"]) + "</section>\n")
    body.append("</div></main>")
    s = s[:a] + head + "\n" + "".join(body) + s[b:]
    s = s.replace("Week 4", "Week %d" % week)
    for bad in ("—", "<em", "<i>", "Lora"):
        assert bad not in s, (n["slug"], bad)
    (ROOT / n["file"]).write_text(relabel(s), encoding="utf-8")
    print("built", n["file"])


def hub(week, notes):
    s = (ROOT / "week-05-notes.html").read_text(encoding="utf-8")
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    items = "".join(
        '<li><b>%s.</b> %s %s.<br><a href="%s" target="_top">The walkthrough</a> &middot; <a href="%s" target="_top">the written notes</a> &middot; '
        '<a href="notes/BIO005-Week%d-Walkthrough-Notes-%s.pdf" target="_blank" rel="noopener">notes to print (PDF) <span class="mm-vh">(opens in a new tab)</span></a></li>'
        % (e(n["title"]), e(n["blurb"]), e(n["comps"]), n["walk"], n["file"], week, n["slug"]) for n in notes)
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week %d · Control Systems</p>\n  <h1>%s</h1>\n'
            '  <p>The walkthroughs and written notes for this week, topic by topic.</p>\n'
            '  <p><b>To print:</b> <a href="notes/BIO005-Week%d-Notes-all.pdf" target="_blank" rel="noopener">all the Week %d notes in one PDF<span class="mm-vh"> (opens in a new tab)</span></a>, set in two columns to save paper. Each topic also has its own PDF, linked beside it below. Already printed them from the printables page? You do not need to print them again.</p>\n</div></header>\n'
            % (week, e(TITLES[week]), week, week))
    body = ('<main id="main"><div class="wrap">\n<section>\n  <h2>What this week covers</h2>\n'
            '  <p>Work through the topics in order, because each one uses the one before it. Each topic has two parts that go together: the walkthrough, which is the lecture, with a worksheet beside it where you type each prediction before you press Show me; and written notes to study from afterward, in bullets, definitions and sequences.</p>\n'
            '  <ol class="plain">%s</ol>\n'
            '  <p>%s The full list with both prompts for each competency is on <a href="week-%02d-competencies.html" target="_top">the Week %d competency list</a>.</p>\n'
            '</section>\n</div></main>' % (items, e(LABLINE[week]), week, week))
    s = s[:a] + head + "\n" + body + s[b:]
    s = re.sub(r"<title>[^<]*</title>", "<title>Week %d notes &middot; BIO 005 Human Physiology</title>" % week, s, count=1)
    s = s.replace("Week 5", "Week %d" % week)
    (ROOT / ("week-%02d-notes.html" % week)).write_text(relabel(s), encoding="utf-8")
    print("built week-%02d-notes.html" % week)


if __name__ == "__main__":
    week = int(sys.argv[1])
    notes = load(week)
    only = sys.argv[2:]
    for n in notes:
        if not only or n["slug"] in only:
            page(week, n)
    if len(notes) == len(WEEKS[week]):
        hub(week, notes)
