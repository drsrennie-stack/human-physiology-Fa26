#!/usr/bin/env python3
"""
tools/make_instructor_preview.py

instructor-preview-week04.html: one page for Scrubs to look through every
Week 4 walkthrough with nothing locked (?preview=1), and every support video
the walkthroughs link, listed under the walkthrough and step that uses it.
Sep 27 2026. The videos are read from each walkthrough's own V and SUP
tables, so this page always matches what students see.

Run: python3 tools/make_instructor_preview.py
"""
import html, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
def e(s):
    s = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), s)
    return html.escape(s, quote=True)

WALKS = [("neurons-glia", "Neurons and neuroglia"), ("rmp", "The resting membrane potential"),
         ("channel-gating", "Ion channel gating"), ("graded-potentials", "Graded potentials"),
         ("action-potential", "The action potential")]

def videos(src):
    ka = re.search(r'var KA="([^"]*)"', src)
    blk = src[src.index("var V={"):]
    if ka: blk = blk.replace('KA+"', '"' + ka.group(1))
    V = dict(re.findall(r'(\w+):\{u:"([^"]+)",n:"[^"]*"\}', blk))
    N = dict(re.findall(r'(\w+):\{u:"[^"]+",n:"([^"]*)"\}', blk))
    out = []
    sup = src[src.index("var V={"):src.index("function supportHTML")].replace('"+M+"', "\u2212")
    for m in re.finditer(r'(?:"([^"]+)"|SUP\["([^"]+)"\])\s*[:=]\s*\[((?:\["[^"]*","\w+","[^"]*"\],?)+)\]', sup):
        step = (m.group(1) or m.group(2)).replace('"+M+"', "−")
        for q, k, _ in re.findall(r'\["([^"]*)","(\w+)","([^"]*)"\]', m.group(3)):
            out.append((step, q, N.get(k, ""), V.get(k, "")))
    return out

SHELL = (ROOT / "week-04-notes.html").read_text(encoding="utf-8")
a = SHELL.index('<header class="top">'); b = SHELL.index("</div></main>") + len("</div></main>")
rows = []
for slug, title in WALKS:
    f = ROOT / f"biol005-w04-{slug}-guided.html"
    if not f.exists(): continue
    src = f.read_text(encoding="utf-8")
    steps = len(re.findall(r'\n\{(?:sec:|title:)', src))
    vids = videos(src)
    li = "".join(f'<li><b>{e(s)}</b>: {e(q)} <a href="{e(u)}" target="_blank" rel="noopener">{e(n)}<span class="mm-vh"> (opens in a new tab)</span></a></li>' for s, q, n, u in vids)
    rows.append(f'<section><h2>{e(title)}</h2>'
                f'<p><a href="biol005-w04-{slug}-guided.html?preview=1" target="_top">Preview the walkthrough with nothing locked</a> &middot; '
                f'<a href="biol005-w04-{slug}-guided.html" target="_top">what students see</a> &middot; '
                f'<a href="biol005-w04-{slug}-walkthrough-notes.html" target="_top">written notes</a></p>'
                + (f'<p>Support videos ({len(vids)}), by step:</p><ul>{li}</ul>' if vids else '<p>No support videos on this walkthrough yet.</p>')
                + '</section>')
head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week 4 · For Dr. Rennie</p>\n'
        '  <h1>Week 4 preview</h1>\n  <p>Every walkthrough with nothing locked, and every Khan Academy video it links, under the step it goes with. '
        'In preview mode you do not have to type a prediction before Show me, Next is always on, and the topic menu is open from the start. '
        'Anything you type still saves in your browser only.</p>\n'
        '</div></header>\n')
body = '<main id="main"><div class="wrap">\n' + "\n".join(rows) + '\n</div></main>'
s = SHELL[:a] + head + body + SHELL[b:]
s = re.sub(r"<title>[^<]*</title>", "<title>Week 4 preview &middot; BIO 005 Human Physiology</title>", s, 1)
s = s.replace("<head>", '<head>\n<meta name="robots" content="noindex">', 1)
(ROOT / "instructor-preview-week04.html").write_text(s, encoding="utf-8")
print("built instructor-preview-week04.html")
