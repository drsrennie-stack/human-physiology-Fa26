# -*- coding: utf-8 -*-
"""
tools/week-packet/competency_list.py

Builds the printable competency list for a week (w1-competency-list.html,
w2-competency-list.html) in this folder. make_tagged.py then renders each one
to a tagged PDF/UA-1 file in print/. Sep 25 2026.

    python3 tools/week-packet/competency_list.py 1 2

The wording of every competency comes from bio005-competencies.js, so the
list always matches the site. The groups, their short labels and the order
are set per week below, the same as the lists students already used.
"""
import sys, json, subprocess, pathlib, html

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent

WEEKS = {
  1: dict(sub="How physiology works, and what keeps you steady", count="twelve",
          groups=[("Foundations of Physiology", "Homeostasis and control"),
                  ("Quantitative Skills for Physiology", "Method and measurement")],
          order=None),
  2: dict(sub="The cell, transport and signaling", count="twenty five",
          groups=[("Cell anatomy and tissues", "Structure", 4),
                  ("Cell physiology and transport", "What crosses the membrane", 12),
                  ("Cell signaling", "How cells talk to each other", 9)],
          order=None),
}

CSS = """
*{box-sizing:border-box}
body{margin:0;color:#0B1530;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:9.4pt;line-height:1.42}
.eyebrow{margin:0 0 6px;font-size:7pt;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#8B3A2E}
h1{font-family:'Open Sans','Plus Jakarta Sans',sans-serif;font-weight:800;font-size:26pt;line-height:1.05;letter-spacing:-.02em;margin:0}
h1 .dot{color:#8B3A2E}
.sub{margin:6px 0 16px;font-size:11pt;font-weight:700}
.namedate{display:flex;gap:22px;margin:0 0 10px}
.namedate span{flex:1;border-bottom:1px solid #0B1530;padding:10px 0 2px;font-size:7.6pt;font-weight:700;color:#414B5C}
.lead{margin:0 0 12px}
.how{background:#fff;border:1px solid #D9DDE3;border-radius:6px;padding:10px 14px;margin:0 0 16px}
.how h2{margin:0 0 6px;font-size:7pt;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8B3A2E}
.how p{margin:0 0 4px;font-size:8.6pt}
section{margin:0 0 6px}
.gh{display:flex;align-items:baseline;gap:10px;border-bottom:1px solid #0B1530;padding:6px 0 4px;margin:8px 0 0;break-after:avoid}
.gh h2{margin:0;font-family:'Open Sans','Plus Jakarta Sans',sans-serif;font-weight:800;font-size:12.5pt}
.gh .lab{font-size:6.8pt;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8B3A2E}
.gh .n{margin-left:auto;font-size:8pt;font-weight:700;color:#414B5C}
ol{list-style:none;margin:0;padding:0}
li{position:relative;padding:8px 0 8px 32px;border-bottom:1px solid #D9DDE3;break-inside:avoid;page-break-inside:avoid;overflow:hidden}
.num{position:absolute;left:0;top:8px;font-weight:800;color:#8B3A2E}
.txt{margin-right:136px}
.txt h3{margin:0 0 2px;font-size:9.6pt;font-weight:800}
.txt p{margin:0;color:#414B5C;font-size:8.6pt}
.boxes{position:absolute;right:0;top:10px;display:flex;gap:8px}
.bx{width:34px;text-align:center;font-size:5.8pt;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#414B5C;line-height:1.15}
.bx .sq{display:block;width:11px;height:11px;border:1.2px solid #0B1530;border-radius:2px;margin:0 auto 3px}
"""

def e(s): return html.escape(s, quote=False)

def comps():
    js = "global.window={};require('./bio005-competencies.js');console.log(JSON.stringify(window.BIO005_COMPETENCIES))"
    return json.loads(subprocess.check_output(["node", "-e", js], cwd=ROOT))

BOXES = ('<span class="boxes" role="group" aria-label="Tick boxes: Read, Drew it, From memory">'
         + "".join('<span class="bx"><span class="sq"></span>%s</span>' % t
                   for t in ("Read", "Drew it", "From memory")) + '</span>')

def build(w):
    cfg = WEEKS[w]
    items = [c for c in comps() if c["week"] == w]
    out, k = [], 0
    for g in cfg["groups"]:
        name, lab = g[0], g[1]
        mine = items[k:k + g[2]] if len(g) > 2 else [c for c in items if c["system"] == name]
        if len(g) > 2: k += g[2]
        rows = []
        for c in mine:
            n = items.index(c) + 1
            rows.append('<li><span class="num">%d</span><div class="txt"><h3>%s</h3><p>%s</p></div>%s</li>'
                        % (n, e(c["name"]), e(c["can"]), BOXES))
        out.append('<section><div class="gh"><h2>%s</h2><span class="lab">%s</span>'
                   '<span class="n">%d competencies</span></div><ol>%s</ol></section>'
                   % (e(name), e(lab), len(mine), "".join(rows)))
    doc = """<!DOCTYPE html><html lang="en-US"><head><meta charset="utf-8">
<title>BIO 005 Week %(w)d competency list</title><style>%(css)s</style></head><body><main>
<p class="eyebrow">BIO 005 &middot; Human Physiology &middot; Week %(w)d</p>
<h1>Competency list<span class="dot">.</span></h1>
<p class="sub">%(sub)s</p>
<div class="namedate"><span>Name</span><span>Date</span></div>
<p class="lead">These are the %(count)s things you have to be able to do by Sunday. Every exam question, lab and case in Week %(w)d comes from this list. Tick a box only when it is true.</p>
<div class="how"><h2>How to use the three boxes</h2>
<p><strong>Read.</strong> You have read it, in the book or the notes, and it made sense at the time.</p>
<p><strong>Drew it.</strong> You have drawn or worked it with the notes open beside you.</p>
<p><strong>From memory.</strong> You did it on blank paper with nothing open. This is the only box that predicts an exam score, and it is the one to chase. A row with the first two ticked and the third empty is exactly where your study time should go.</p></div>
%(body)s
</main></body></html>""" % dict(w=w, css=CSS, sub=e(cfg["sub"]), count=cfg["count"], body="".join(out))
    p = HERE / ("w%d-competency-list.html" % w)
    p.write_text(doc, encoding="utf-8")
    print("built", p.name, len(items), "competencies")

if __name__ == "__main__":
    for a in sys.argv[1:] or ["1", "2"]:
        build(int(a))
