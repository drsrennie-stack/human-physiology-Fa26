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


VIDNOTE = '<p class="figref"><b>Dr. Rennie&rsquo;s videos for this part:</b> %s.</p>\n'


def my_videos(week, n):
    """Oct 18 2026: notes heading -> Dr. Rennie's own videos on the walkthrough steps in that part, in step order."""
    vf = ROOT / "tools/walkthroughs" / ("w%02d-%s.videos.json" % (week, n["slug"]))
    sf = ROOT / "tools/walkthroughs" / ("w%02d-%s.scene.js" % (week, n["slug"]))
    if not vf.exists():
        return {}
    d = json.loads(vf.read_text(encoding="utf-8"))
    pmap = n.get("prep_map", {})
    out, cur = {}, None
    for kind, val in re.findall(r'\b(sec|title):"([^"]+)"', sf.read_text(encoding="utf-8")):
        if kind == "sec":
            cur = pmap.get(val, val)
            continue
        for _, k, _ in d["SUP"].get(val, []):
            v = d["V"].get(k, {})
            if v.get("s") == "Dr. Rennie" and cur:
                lst = out.setdefault(cur, [])
                if v["u"] not in [x["u"] for x in lst]:
                    lst.append(v)
    return out


# Oct 18 2026, her call: the on-screen notes should look like the PDF. So these pages
# turn off the site's reading mode and folding (every section stays open), drop the
# dark header band, and set the notes on a white sheet with the PDF's running head,
# maroon section headings and two columns inside each section on a wide screen.
PAPER_CSS = """<style data-paper>
@media screen{
body.paper{background:#ECEFF4}
body.paper header.top{background:transparent;color:#0B1530;padding:0;margin:24px 0 0}
body.paper header.top .wrap{max-width:8.5in;margin:0 auto;background:#fff;padding:34px 48px 4px;border-radius:6px 6px 0 0;box-shadow:0 1px 3px rgba(11,21,48,.08)}
body.paper header.top .pkick{margin:0 0 4px;font-size:15px;color:#0B1530}
body.paper main{padding-top:0;margin-top:0}
body.paper header.top{margin-bottom:0}
body.paper header.top .eyebrow{color:#8B3A2E;font-size:12px;letter-spacing:.2em;margin:0 0 6px}
body.paper header.top h1{color:#000;font-size:clamp(26px,3.6vw,32px);max-width:none;margin:2px 0 8px}
body.paper header.top p{color:#0B1530;max-width:none;font-size:16px}
body.paper header.top a{color:#8B3A2E}
body.paper header.top a:hover{color:#6E2D24}
body.paper main .wrap.notes{max-width:8.5in;margin:0 auto 48px;background:#fff;padding:14px 48px 40px;border-radius:0 0 6px 6px;box-shadow:0 8px 16px rgba(11,21,48,.08)}
body.paper .notes{color:#000;font-size:15px;line-height:1.5}
body.paper .notes .use{border:0;box-shadow:0 1px 6px rgba(11,21,48,.14);border-radius:6px;padding:14px 18px;max-width:none}
body.paper .notes section{columns:2 280px;column-gap:34px;margin:0 0 6px}
body.paper .notes section>h2{column-span:all;color:#8B3A2E;font-size:19px;margin:22px 0 6px}
body.paper .notes section>.figref,body.paper .notes .tbl{column-span:all}
body.paper .notes h3{color:#000;font-size:15.5px;margin:12px 0 4px;break-after:avoid}
body.paper .notes p,body.paper .notes ul,body.paper .notes ol,body.paper .notes dl{max-width:none}
body.paper .notes li,body.paper .notes dt,body.paper .notes dd{break-inside:avoid}
body.paper .notes ol,body.paper .notes ul{break-inside:auto}
}
@media screen and (max-width:760px){
body.paper header.top .wrap,body.paper main .wrap.notes{padding-left:20px;padding-right:20px;border-radius:0}
body.paper .notes section{columns:1}
}
@media print{body.paper header.top .pkick{display:none}}
</style>
"""


def page(week, n):
    s = base.SHELL[:base.HEAD_END] + base.STYLE_ADD + base.SHELL[base.HEAD_END:]
    s = re.sub(r"<title>[^<]*</title>", "<title>%s, written notes &middot; BIO 005 Human Physiology</title>" % e(n["title"]), s, count=1)
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    pdf = "notes/BIO005-Week%d-Walkthrough-Notes-%s.pdf" % (week, n["slug"])
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week %d · Written notes</p>\n'
            '  <h1>%s</h1>\n  <p>The written notes for the %s walkthrough. %s.</p>\n'
            '  <p><b>To print:</b> <a href="%s" target="_blank" rel="noopener">these notes as a two-column PDF<span class="mm-vh"> (opens in a new tab)</span></a>. Already printed the Week %d notes? You do not need to print these again.</p>\n'
            '</div></header>\n' % (week, e(n["title"]), e(re.sub(r"^the ", "", n["title"].lower())), e(n["comps"]), pdf, week))
    body = ['<main id="main"><div class="wrap notes">\n',
            '<div class="use"><p><b>How to use these notes.</b> Work through <a href="%s" target="_top">the walkthrough</a> first, writing each prediction on your worksheet before you press Show me. '
            'Then read these notes to fill in anything you missed, and use them to review. They are the same facts in a form you can study from, not a copy of the walkthrough.</p></div>\n' % n["walk"]]
    mine = my_videos(week, n)
    for sec in n["sections"]:
        t = sec["h"]
        vids = mine.get(t, [])
        vline = (VIDNOTE % ", ".join('<a href="%s" target="_blank" rel="noopener">%s<span class="mm-vh"> (Dr. Rennie video, opens in a new tab)</span></a>' % (v["u"], e(v["n"])) for v in vids)) if vids else ""
        body.append("<section id=\"%s\">\n<h2>%s</h2>\n" % (re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-"), e(t))
                    + (FIGNOTE % e(sec["book"]) if sec.get("book") else "") + vline
                    + "".join(base.block(tuple(x)) for x in sec["blocks"]) + "</section>\n")
    body.append("</div></main>")
    s = s[:a] + head + "\n" + "".join(body) + s[b:]
    s = s.replace("Week 4", "Week %d" % week)
    assert s.count('<html lang="en">') == 1 and s.count("<body>") == 1
    s = s.replace('<html lang="en">', '<html lang="en" data-fold="off">', 1)
    s = s.replace("<body>", '<body class="paper" data-no-reading-mode data-collapse="off">', 1)
    s = s.replace('<script src="bio005-collapse.js"></script>', "")
    s = s.replace("</head>", PAPER_CSS + "</head>", 1)
    k = '  <p class="eyebrow">BIO 005 · Week %d · Written notes</p>\n' % week
    assert s.count(k) == 1
    s = s.replace(k, k + '  <p class="pkick">BIO 005 Human Physiology · Week %d notes · Dr. Sharilyn Rennie</p>\n' % week)
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
