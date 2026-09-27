#!/usr/bin/env python3
"""
tools/make_walkthrough_notes.py

Builds the written notes page for each Week 4 guided walkthrough from
tools/walkthrough_notes_w04.py. Sep 27 2026. The pages are plain, printable
bullet notes: definitions, sequences and tables. The two-column PDFs are made
by tools/make_notes_pdf.py from these pages.

Run: python3 tools/make_walkthrough_notes.py
"""
import html, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
from walkthrough_notes_w04 import NOTES

def e(s): return html.escape(s, quote=False)

SHELL = (ROOT / "week-04-notes.html").read_text(encoding="utf-8")
HEAD_END = SHELL.index("</style>")
STYLE_ADD = """
/* written notes for a walkthrough, Sep 27 2026 */
.notes h2{margin:26px 0 10px}
.notes h3{font-size:16px;color:var(--navy);margin:16px 0 6px}
.notes ul,.notes ol{margin:0 0 14px;padding-left:22px;max-width:70ch}
.notes li{margin:0 0 7px}
.notes dl{margin:0 0 14px;max-width:70ch}
.notes dt{font-weight:800;color:var(--navy);margin:10px 0 2px}
.notes dd{margin:0 0 0 18px}
.notes .tbl{overflow-x:auto;margin:0 0 16px}
.notes table{border-collapse:collapse;width:100%;font-size:15px;background:#fff}
.notes th,.notes td{border:1px solid var(--line);padding:7px 9px;text-align:left;vertical-align:top}
.notes th{background:var(--navy-tint);font-weight:800}
header.top a{color:var(--gold)}
header.top a:hover{color:#fff}
.notes .use{background:#fff;border-radius:12px;padding:16px 20px;margin:0 0 20px;box-shadow:0 1px 3px rgba(11,21,48,.08)}
@media print{.notes .use{box-shadow:none;border:1px solid #999}}
"""

def block(b):
    k = b[0]
    if k == "p": return "<p>%s</p>\n" % e(b[1])
    if k == "h3": return "<h3>%s</h3>\n" % e(b[1])
    if k == "ul": return "<ul>\n" + "".join("  <li>%s</li>\n" % e(x) for x in b[1]) + "</ul>\n"
    if k == "ol": return "<ol>\n" + "".join("  <li>%s</li>\n" % e(x) for x in b[1]) + "</ol>\n"
    if k == "defs":
        return "<dl>\n" + "".join("  <dt>%s</dt><dd>%s</dd>\n" % (e(t), e(d)) for t, d in b[1]) + "</dl>\n"
    if k == "table":
        h = "".join('<th scope="col">%s</th>' % e(x) for x in b[1])
        rows = "".join("<tr>" + "".join(("<th scope=\"row\">%s</th>" if i == 0 else "<td>%s</td>") % e(c) for i, c in enumerate(r)) + "</tr>\n" for r in b[2])
        return '<div class="tbl"><table><thead><tr>%s</tr></thead><tbody>\n%s</tbody></table></div>\n' % (h, rows)
    raise ValueError(k)

def page(n):
    s = SHELL[:HEAD_END] + STYLE_ADD + SHELL[HEAD_END:]
    s = re.sub(r"<title>[^<]*</title>", "<title>%s, written notes &middot; BIO 005 Human Physiology</title>" % e(n["title"]), s, 1)
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    pdf = "notes/BIO005-Week4-Walkthrough-Notes-%s.pdf" % n["slug"]
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week 4 · Written notes</p>\n'
            '  <h1>%s</h1>\n  <p>The written notes for the %s walkthrough%s.</p>\n'
            '  <p><b>To print:</b> <a href="%s" target="_blank" rel="noopener">these notes as a two-column PDF<span class="mm-vh"> (opens in a new tab)</span></a>.</p>\n'
            '</div></header>\n' % (e(n["title"]), e(n["title"].lower() if n["title"] != "The resting membrane potential" else "resting membrane potential"), (". " + e(n["comps"])) if n["comps"] else "", pdf))
    body = ['<main id="main"><div class="wrap notes">\n',
            '<div class="use"><p><b>How to use these notes.</b> Work through <a href="%s" target="_top">the walkthrough</a> first, writing each prediction on your worksheet before you press Show me. '
            'Then read these notes to fill in anything you missed, and use them to review. They are the same facts in a form you can study from, not a copy of the slides.</p></div>\n' % n["walk"]]
    for t, blocks in n["sections"]:
        body.append("<section>\n<h2>%s</h2>\n" % e(t) + "".join(block(x) for x in blocks) + "</section>\n")
    body.append("</div></main>")
    s = s[:a] + head + "\n" + "".join(body) + s[b:]
    (ROOT / n["file"]).write_text(s, encoding="utf-8")
    print("built", n["file"])

if __name__ == "__main__":
    for n in NOTES: page(n)
