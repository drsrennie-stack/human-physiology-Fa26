#!/usr/bin/env python3
"""
tools/make_topic_notes.py

Nov 8 2026. Written notes for the Part 2 topics (Weeks 9 to 15) and the reproduction notes,
in the same two-column paper layout as the Week 6 and 7 walkthrough notes, set a little larger
and with more space between lines so they read more easily (her request, Nov 8 2026).

Source for each topic: tools/notes/<slug>.notes.json
  {"slug","week","title","comps","blurb","book","ostax",
   "sections":[{"h","letter"?,"book","videos"?:[[title,url]],"blocks":[...]}]}
Block types are the walkthrough-notes ones: p, h3, ul, ol, defs, table.

Writes, for each topic:
  biol005-w<NN>-<slug>-notes.html            the on-screen notes (paper look, two columns)
  notes/BIO005-Week<N>-Notes-<slug>.pdf       the printable PDF (two columns)
and, for each Part 2 week, week-<NN>-notes.html, which lists that week's topics.

Run: python3 tools/make_topic_notes.py            pages and PDFs for every topic
     python3 tools/make_topic_notes.py --no-pdf   pages only
"""
import asyncio, html, json, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import make_walkthrough_notes as base
import make_walkthrough_notes_wk as wk
from week_label import relabel, L as WLAB

e = base.e
SRC = ROOT / "tools/notes"
SITE = "drsrennie-stack.github.io/human-physiology-Fa26/"

# which topics each week's notes page lists, in teaching order
WEEKS = {
 9: ["heart"], 10: ["vessels-bp"], 11: ["blood", "lymph-immunity"], 12: ["digestion"],
 13: ["breathing", "acid-base"], 14: ["kidney", "fluid-electrolytes"], 15: ["acid-base"],
}
WEEK_TITLE = {9: "The heart as a pump", 10: "Pressure, flow, and holding blood pressure steady",
              11: "Blood and how the body defends itself", 12: "Digestion, and how you use food for fuel", 13: "Breathing, gas transport, and the fast pH lever",
              14: "The kidney and body fluid balance", 15: "The slow pH lever, putting it together, and Midterm 2"}
WEEK_NOTE = {12: "The notes on metabolism and the metabolic hormones (growth hormone, thyroid, cortisol, insulin and glucagon) post with the lecture.",
             13: "The acid-base notes cover this week's fast pH lever (buffers and breathing) and Week 15's slow lever (the kidney).",
             15: "Review the kidney half of the Week 13 acid-base notes: renal control of pH, the four disorders, compensation, and reading a blood gas. The link below opens the notes at that part."}

# Dr. Rennie's own videos for the Week 9 and 10 lecture sections (tools: /root/work/videos/part2_videos.py)
VIDS = {}
try:
    sys.path.insert(0, "/root/work/videos")
    import part2_videos as P
    for k in P.W9:
        VIDS[(9, k)] = [(t, P.YT + v) for t, v in P.W9[k]]
    for k in P.W10:
        VIDS[(10, k)] = [("Lecture video: %s, starts at %s" % (t, P.mmss(s)) if s else "Lecture video: %s" % t,
                          P.LOOM10 + ("?t=%d" % s if s else "")) for t, s in P.W10[k]]
except Exception as ex:  # the page still builds without them
    print("no video map:", ex)

READ_CSS = """<style data-read>
/* Nov 8 2026: a little larger and airier than the Week 6 and 7 notes */
@media screen{
body.paper .notes{font-size:16.5px;line-height:1.62}
body.paper .notes section{column-gap:44px}
body.paper .notes section>h2{font-size:21px;margin:30px 0 8px}
body.paper .notes h3{font-size:16.5px;margin:16px 0 5px}
body.paper .notes p{margin:0 0 11px}
body.paper .notes li{margin:0 0 8px}
body.paper .notes table{font-size:15px}
body.paper .notes th,body.paper .notes td{padding:8px 10px}
body.paper .notes .figref{font-size:15px;color:#414B5C;margin:0 0 10px}
body.paper .notes .lt{color:#8B3A2E;font-weight:800}
body.paper .notes .cref{font-size:15px;margin:0 0 6px;column-span:all}body.paper .notes .cref b{color:#8B3A2E}
}
</style>
"""

COMPS = json.loads((ROOT / "tools/notes/competencies-numbered.json").read_text(encoding="utf-8"))
WHERE = {}
for _w, _lst in COMPS.items():
    for _c in _lst:
        WHERE.setdefault(_c["id"], (int(_w), _c["n"], _c["name"]))

def nums(xs):
    xs = [str(x) for x in xs]
    return xs[0] if len(xs) == 1 else ", ".join(xs[:-1]) + " and " + xs[-1]

def comps_line(week, sec):
    """Nov 8 2026, her call: each part names the numbered competencies it covers, as numbered on that week's competency list."""
    ids = sec.get("comps") or []
    if not ids:
        return ""
    groups = {}
    for i in ids:
        w, n, name = WHERE[i]
        groups.setdefault(w, []).append((n, name, i))
    parts = []
    for w in sorted(groups, key=lambda x: (x != week, x)):
        g = sorted(groups[w])
        lab = ("Competency " if len(g) == 1 else "Competencies ") + nums([n for n, _, _ in g])
        if w != week:
            lab = "Week %d %s" % (w, lab.lower())
        links = "; ".join('<a href="week-%02d-competencies.html#h-%s" target="_top">%s</a>' % (w, i, e(name)) for n, name, i in g)
        parts.append("<b>%s:</b> %s" % (lab, links))
    return '<p class="cref">%s.</p>\n' % ". ".join(parts)

OUTSIDE = ("RegisteredNurseRN", "Ninja Nerd", "Armando Hasudungan", "Medicosis Perfectionalis", "Khan Academy", "Video:")

def videos_line(week, sec):
    """Dr. Rennie's own videos are credited to her; other creators' videos carry the channel name in the title."""
    v = [tuple(x) for x in sec.get("videos", [])]
    if not v and sec.get("letter"):
        v = VIDS.get((week, sec["letter"]), [])
    if not v:
        return ""
    mixed = any(t.startswith(OUTSIDE) for t, _ in v)
    def lab(t):
        if not mixed or t.startswith(OUTSIDE):
            return t[len("Video: "):] if t.startswith("Video: ") else t
        return "Dr. Rennie: " + t
    items = ", ".join('<a href="%s" target="_blank" rel="noopener">%s<span class="mm-vh"> (video, opens in a new tab)</span></a>' % (html.escape(u), e(lab(t))) for t, u in v)
    who = "Videos for this part" if mixed else "Dr. Rennie&rsquo;s videos for this part"
    return '<p class="figref"><b>%s:</b> %s.</p>\n' % (who, items)

def fname(n): return "biol005-w%02d-%s-notes.html" % (n["week"], n["slug"])
def pdfname(n): return "notes/BIO005-Week%d-Notes-%s.pdf" % (n["week"], n["slug"])

USE = {
 9: 'Watch <a href="%s" target="_top">the lecture</a> and work through the click-through slides first. Then read these notes to fill in anything you missed, and use them to review. The section letters match the lecture.',
 10: 'Watch <a href="%s" target="_top">the lecture</a> and work through the click-through slides first. Then read these notes to fill in anything you missed, and use them to review. The section letters match the lecture.',
}
USE_DEFAULT = 'Read these notes alongside your textbook reading for the week, then use them to review. Each part names where to read in Silverthorn and in OpenStax, and links Dr. Rennie&rsquo;s videos where there is one.'

def page(n):
    week = n["week"]
    s = base.SHELL[:base.HEAD_END] + base.STYLE_ADD + base.SHELL[base.HEAD_END:]
    s = re.sub(r"<title>[^<]*</title>", "<title>%s, written notes &middot; BIO 005 Human Physiology</title>" % e(n["title"]), s, count=1)
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week %d · Written notes</p>\n'
            '  <h1>%s</h1>\n  <p>%s %s.</p>\n'
            '  <p><b>To print:</b> <a href="%s" target="_blank" rel="noopener">these notes as a two-column PDF<span class="mm-vh"> (opens in a new tab)</span></a>.</p>\n'
            '</div></header>\n' % (week, e(n["title"]), e(n["blurb"]), e(n["comps"]), pdfname(n)))
    lec = "li/w%d/study.html" % week
    use = (USE[week] % lec) if week in USE else USE_DEFAULT
    body = ['<main id="main"><div class="wrap notes">\n',
            '<div class="use"><p><b>How to use these notes.</b> %s</p>'
            '<p><b>Your textbook:</b> Silverthorn %s. <b>Using OpenStax instead?</b> Anatomy and Physiology 2e, %s.</p></div>\n' % (use, e(n["book"]), e(n["ostax"]))]
    for sec in n["sections"]:
        t = sec["h"]
        lt = ('<span class="lt">%s.</span> ' % e(sec["letter"])) if sec.get("letter") else ""
        body.append('<section id="%s">\n<h2>%s%s</h2>\n' % (re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-"), lt, e(t))
                    + comps_line(week, sec) + (wk.FIGNOTE % e(sec["book"]) if sec.get("book") else "") + videos_line(week, sec)
                    + "".join(base.block(tuple(x)) for x in sec["blocks"]) + "</section>\n")
    body.append("</div></main>")
    s = s[:a] + head + "\n" + "".join(body) + s[b:]
    s = s.replace("Week 4", "Week %d" % week)
    s = s.replace('<html lang="en">', '<html lang="en" data-fold="off">', 1)
    s = s.replace("<body>", '<body class="paper" data-no-reading-mode data-collapse="off">', 1)
    s = s.replace('<script src="bio005-collapse.js"></script>', "")
    s = s.replace("</head>", wk.PAPER_CSS + READ_CSS + "</head>", 1)
    k = '  <p class="eyebrow">BIO 005 · Week %d · Written notes</p>\n' % week
    s = s.replace(k, k + '  <p class="pkick">BIO 005 Human Physiology · Week %d notes · Dr. Sharilyn Rennie</p>\n' % week)
    for bad in ("—", "–", "<em", "<i>", "Lora"):
        assert bad not in s, (n["slug"], bad)
    (ROOT / fname(n)).write_text(relabel(s), encoding="utf-8")
    print("built", fname(n))

def hub(week, notes):
    s = (ROOT / "week-05-notes.html").read_text(encoding="utf-8")
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    anchor = "#renal-control-of-ph" if week == 15 else ""
    items = "".join('<li><b>%s.</b> %s %s.<br><a href="%s%s" target="_top">The written notes</a> &middot; '
                    '<a href="%s" target="_blank" rel="noopener">notes to print (PDF) <span class="mm-vh">(opens in a new tab)</span></a></li>'
                    % (e(n["title"]), e(n["blurb"]), e(n["comps"]), fname(n), anchor, pdfname(n)) for n in notes)
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week %d · Written notes</p>\n  <h1>%s</h1>\n'
            '  <p>The written notes for this week, set in two columns. Each one has its own printable PDF.</p>\n</div></header>\n' % (week, e(WEEK_TITLE[week])))
    body = ('<main id="main"><div class="wrap">\n<section>\n  <h2>This week&rsquo;s notes</h2>\n%s'
            '  <ol class="plain">%s</ol>\n'
            '  <p>The full list of what you should be able to do is on <a href="week-%02d-competencies.html" target="_top">the Week %d competency list</a>.</p>\n'
            '</section>\n</div></main>' % (('  <p>%s</p>\n' % e(WEEK_NOTE[week])) if week in WEEK_NOTE else "", items, week, week))
    s = s[:a] + head + "\n" + body + s[b:]
    s = re.sub(r"<title>[^<]*</title>", "<title>Week %d notes &middot; BIO 005 Human Physiology</title>" % week, s, count=1)
    s = s.replace("Week 5", "Week %d" % week)
    (ROOT / ("week-%02d-notes.html" % week)).write_text(relabel(s), encoding="utf-8")
    print("built week-%02d-notes.html" % week)

def pdf(n):
    import make_notes_pdf as NP
    from weasyprint import HTML
    prep = NP.PREP
    for a_, b_ in [("font-size:8.6pt!important;line-height:1.34!important", "font-size:9.8pt!important;line-height:1.46!important"),
                   ("main h2{font-size:10.6pt!important}", "main h2{font-size:12pt!important}"),
                   ("main h3{font-size:9.2pt!important}", "main h3{font-size:10.4pt!important}"),
                   ("h2{font-size:10.6pt!important;line-height:1.2!important;margin:9pt 0 3pt!important", "h2{font-size:12pt!important;line-height:1.2!important;margin:13pt 0 4pt!important"),
                   ("h3{font-size:9.2pt!important;line-height:1.22!important;margin:6pt 0 2pt!important", "h3{font-size:10.4pt!important;line-height:1.22!important;margin:8pt 0 3pt!important"),
                   ("main table{font-size:7.4pt!important}", "main table{font-size:8.4pt!important}"),
                   ("table{width:100%!important;border-collapse:collapse!important;font-size:7.4pt!important", "table{width:100%!important;border-collapse:collapse!important;font-size:8.4pt!important"),
                   ("p{margin:0 0 4pt!important", "p{margin:0 0 5.5pt!important"),
                   ("li{margin:0 0 1.5pt!important", "li{margin:0 0 3pt!important"),
                   ("column-gap:0.24in", "column-gap:0.32in"),
                   ("th, td{padding:1.8pt 3pt!important", "th, td{padding:2.6pt 4pt!important")]:
        assert a_ in prep, a_
        prep = prep.replace(a_, b_)
    title = n["title"]
    js = "(" + prep + ")(" + json.dumps([title, WLAB(n["week"]), fname(n), SITE]) + ")"
    h = asyncio.run(NP.M.render(fname(n), None, title, None, prep=js))
    target = ROOT / pdfname(n)
    target.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=h, base_url=str(ROOT) + "/").write_pdf(target, pdf_variant="pdf/ua-1", uncompressed_pdf=False)
    NP.M.stamp(target, "BIO 005 Week %d notes: %s" % (WLAB(n["week"]), title), "Written notes for %s, printable, two columns" % title)
    print("  ", pdfname(n), NP.M.audit(target))

if __name__ == "__main__":
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    notes = {}
    for f in sorted(SRC.glob("*.notes.json")):
        n = json.loads(f.read_text(encoding="utf-8"))
        notes[n["slug"]] = n
        if not only or n["slug"] in only:
            page(n)
            if "--no-pdf" not in sys.argv:
                pdf(n)
    for w, slugs in WEEKS.items():
        have = [notes[s] for s in slugs if s in notes]
        if have:
            hub(w, have)
