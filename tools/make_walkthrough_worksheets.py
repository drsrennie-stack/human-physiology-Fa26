#!/usr/bin/env python3
"""
tools/make_walkthrough_worksheets.py

A printable worksheet PDF for each Week 4 guided walkthrough, plus one packet.
Sep 27 2026, Scrubs: students need a study guide they complete with the
walkthrough, on paper, so they can draw. Each prediction the walkthrough asks
gets a box to write or draw the prediction before pressing Show me, and a
smaller box for what actually happened. The walkthrough's matching part of the
drawing sheet follows, to do from memory at the end.

The predictions are read from the walkthrough pages themselves (the See all my
answers view), so the worksheet always matches the walkthrough. Needs node and
Playwright. Output: sheets/BIO005-Week4-Worksheet-<slug>.pdf and
sheets/BIO005-Week4-Worksheets-all.pdf, tagged PDF/UA-1.

Run: python3 tools/make_walkthrough_worksheets.py
"""
import html, json, pathlib, re, subprocess, sys, os
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import make_pdf as M
from weasyprint import HTML

def e(s): return html.escape(s, quote=False)

# walkthrough slug, title, drawing sheet sections (by heading id) for Part 2
WALKS = [
 ("neurons-glia", "Neurons and neuroglia", ["t1", "t2"]),
 ("rmp", "The resting membrane potential", ["t3"]),
 ("channel-gating", "Ion channel gating", ["t4"]),
 ("graded-potentials", "Graded potentials", ["t4b"]),
]

JS = r"""
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const out = {};
  for (const s of JSON.parse(process.argv[2])) {
    const p = await b.newPage(); await p.goto('file://' + process.argv[3] + '/biol005-w04-' + s + '-guided.html');
    await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
    await p.click('#allToggle'); await p.waitForTimeout(200);
    out[s] = await p.$$eval('#allAnswers .entry', es => es.map(e => ({num: e.querySelector('.num').textContent, q: e.querySelector('.q').textContent})));
  }
  process.stdout.write(JSON.stringify(out)); await b.close();
})();
"""

def predictions():
    js = pathlib.Path("/tmp/bio005_preds.js"); js.write_text(JS)
    env = dict(os.environ, NODE_PATH=subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip())
    r = subprocess.run(["node", str(js), json.dumps([w[0] for w in WALKS]), str(ROOT)], capture_output=True, text=True, env=env, check=True)
    return json.loads(r.stdout)

DS = (ROOT / "biol005-w04-drawing-sheet.html").read_text(encoding="utf-8")
def drawing_part(hid):
    i = DS.index('aria-labelledby="%s"' % hid)
    a = DS.rindex("<section", 0, i); b = DS.index("</section>", i) + len("</section>")
    s = DS[a:b]
    s = re.sub(r'<p class="sub">.*?</p>', "", s, count=1, flags=re.S)
    s = re.sub(r'(<h2 id="[^"]+">)Part \d+\. ', r'\1', s, count=1)
    return s

CSS = """
@page{size:letter;margin:0.5in 0.55in 0.55in;
  @bottom-left{content:"BIO 005 · Week 4 · %(title)s worksheet";font:7pt 'Plus Jakarta Sans',sans-serif;color:#555}
  @bottom-right{content:"page " counter(page) " of " counter(pages);font:7pt 'Plus Jakarta Sans',sans-serif;color:#555}}
html,body{margin:0;background:#fff}
body{font-family:'Plus Jakarta Sans',sans-serif;font-size:9.6pt;line-height:1.35;color:#0B1530}
h1{font-family:'Open Sans','Plus Jakarta Sans',sans-serif;font-weight:800;font-size:17pt;margin:0 0 4pt;line-height:1.1}
.kick{font-size:7.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8B3A2E;margin:0 0 3pt}
.names{display:flex;gap:18pt;margin:8pt 0 8pt}
.names div{flex:1;border-bottom:0.8pt solid #000;padding-top:14pt;font-size:8pt;color:#333}
.how{border:0.8pt solid #999;border-radius:4pt;padding:6pt 9pt;margin:0 0 10pt}
.how p{margin:0 0 3pt}
.how ol{margin:0;padding-left:14pt}
.how li{margin:0 0 2pt}
h2{font-family:'Open Sans','Plus Jakarta Sans',sans-serif;font-weight:800;font-size:12pt;color:#6E2D24;margin:10pt 0 6pt}
.pred{break-inside:avoid;page-break-inside:avoid;margin:0 0 6pt}
.pred .n{font-size:7.6pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8B3A2E;margin:0 0 1pt}
.pred .q{font-weight:700;margin:0 0 3pt}
.box{border:0.8pt solid #000;border-radius:4pt;padding:2pt 5pt;font-size:7pt;color:#555}
.box.p{height:0.95in}
.box.r{height:0.42in;margin-top:2pt}
.part2{margin-top:12pt}
section.topic{margin:0 0 6pt}
section.topic > h2{font-size:12pt;color:#6E2D24;margin:0 0 6pt}
.task{margin:0 0 10pt;page-break-inside:avoid}
.task h3{font-size:10pt;margin:0 0 3pt}
.task p.ask{margin:0 0 5pt}
.task p.tip{margin:4pt 0 4pt;color:#333;font-size:8.8pt}
.draw{border:0.8pt solid #000;border-radius:4pt;min-height:2.1in}
.draw.short{min-height:1.35in}
.draw.tall{min-height:2.9in}
.draw svg{display:block;width:100%%;height:auto}
.write{border:0.8pt solid #000;border-radius:4pt;margin:5pt 0 0}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:9pt}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9pt}
.cellcap{font-weight:700;font-size:8.6pt;margin:0 0 3pt}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
em,i{font-style:normal}
"""

def sheet(slug, title, preds, parts, single=True):
    n = len(preds)
    body = ['<p class="kick">BIO 005 Human Physiology · Week 4 · Walkthrough worksheet · Dr. Sharilyn Rennie</p>',
            '<h1>%s</h1>' % e(title),
            '<div class="names"><div>Name</div><div>Date</div></div>' if single else '',
            '<div class="how"><p><b>Use this sheet while you work through the %s walkthrough.</b> It has %d predictions.</p><ol>'
            '<li>When a step asks you to predict, write or draw your prediction in the top box, in pencil or your first color. Type it into the worksheet beside the walkthrough too. Next stays locked until you press Show me.</li>'
            '<li>Press Show me. In the bottom box, in a second color, write what actually happened and whether you were right. If you were not, write what you would change.</li>'
            '<li>When you finish the walkthrough, close it and do Part 2 from memory. Then reopen it and correct Part 2 in your second color. What you had to fix is what to study.</li>'
            '</ol></div>' % (e(title.lower() if not title.startswith("The ") else title[4:]), n),
            '<h2>Part 1. Your predictions</h2>']
    for p in preds:
        m = re.match(r"Prediction (\d+) of (\d+): (.*)", p["num"])
        body.append('<div class="pred"><p class="n">Prediction %s of %s · %s</p><p class="q">%s</p>'
                    '<div class="box p">My prediction, before Show me</div><div class="box r">What happened, and was I right?</div></div>'
                    % (m.group(1), m.group(2), e(m.group(3)), e(p["q"])))
    body.append('<div class="part2"><h2>Part 2. Draw it from memory</h2>' + "".join(drawing_part(h) for h in parts) + '</div>')
    return "".join(body)

def write(target, title, inner, desc, css_title):
    doc = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>%s</title>'
           '<link rel="stylesheet" href="assets/fonts-site.css"><style>%s</style></head><body><main>%s</main></body></html>'
           % (e(title), CSS % {"title": css_title}, inner))
    target.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=doc, base_url=str(ROOT) + "/").write_pdf(target, pdf_variant="pdf/ua-1", uncompressed_pdf=False)
    M.stamp(target, title, desc)
    print("  ", target.name, M.audit(target))

def main():
    P = predictions()
    allparts = []
    for slug, title, parts in WALKS:
        inner = sheet(slug, title, P[slug], parts)
        write(M.OUT / ("sheets/BIO005-Week4-Worksheet-%s.pdf" % slug), "BIO 005 Week 4 worksheet: %s" % title, inner,
              "Prediction boxes for the %s walkthrough and the drawing part to do from memory" % title, title)
        allparts.append('<div style="page-break-before:always">%s</div>' % inner if allparts else inner)
    write(M.OUT / "sheets/BIO005-Week4-Worksheets-all.pdf", "BIO 005 Week 4 walkthrough worksheets", "".join(allparts),
          "Every Week 4 walkthrough worksheet in teaching order", "Walkthrough")

if __name__ == "__main__":
    main()
