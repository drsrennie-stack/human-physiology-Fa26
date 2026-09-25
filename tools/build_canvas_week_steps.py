#!/usr/bin/env python3
"""
tools/build_canvas_week_steps.py

Builds the Canvas step pages for one week, one paste-ready file per step, from
tools/canvas_steps_weekNN.py. No iframes: each page carries the instructions
in Canvas itself and links out to the course site for the interactive parts,
so it works with a screen reader, a phone, and the Canvas accessibility
checker.

Canvas strips <style> and <script>, so every style is inline. Accessibility
choices, all deliberate:
  - The Canvas page title is the h1. These pages start at h2 and never skip a level.
  - Every link names where it goes, and says in visible text that it opens the
    course site in a new tab (WCAG 2.4.4 and 3.2.5). No "click here".
  - Lists are real <ol>/<ul>. No layout tables. No color-only meaning.
  - Text colors meet AAA on white: navy #0B1530 18.0:1, maroon #8B3A2E 7.7:1,
    maroon-dark #6E2D24 10.2:1, ink-soft #414B5C 8.8:1.
  - Nothing moves, nothing is hidden, nothing depends on a script.

Run:  python3 tools/build_canvas_week_steps.py 4
Out:  _canvas/pages/w04-01-*.html ... w04-10-*.html and _canvas/pages/w04-README.txt
"""
import sys, re, html, importlib, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
sys.path.insert(0, str(ROOT / "tools"))

NAVY, MAROON, MDARK, INK_SOFT = "#0B1530", "#8B3A2E", "#6E2D24", "#414B5C"
FONT = "'Plus Jakarta Sans','Open Sans','Helvetica Neue',Arial,sans-serif"
CARD = ("background:#FFFFFF;border-radius:8px;padding:20px 24px;margin:0 0 18px 0;"
        "box-shadow:0 1px 3px rgba(11,21,48,0.10),0 6px 16px rgba(11,21,48,0.08);")
EYEBROW = ("margin:0 0 8px 0;font-size:0.78em;font-weight:700;letter-spacing:0.18em;"
           "text-transform:uppercase;color:%s;" % MAROON)
H3 = "margin:0 0 10px 0;font-size:1.2em;line-height:1.3;color:%s;" % MDARK
P = "margin:0 0 12px 0;line-height:1.6;color:%s;"
LI = "margin:0 0 10px 0;line-height:1.55;"
LINK = "color:%s;font-weight:700;text-decoration:underline;" % MAROON

def txt(s):
    """Escape everything except <strong>...</strong>."""
    parts = re.split(r"(</?strong>)", s)
    return "".join(p if p in ("<strong>", "</strong>") else html.escape(p, quote=False) for p in parts)

def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:48].rstrip("-")

def page(W, i, st, prev_t, next_t):
    n, total = W.WEEK, len(W.STEPS)
    out = ['<div style="font-family:%s;color:%s;max-width:900px;">' % (FONT, NAVY)]
    out.append('<p style="%s">BIO 005 Human Physiology &middot; Week %d &middot; Step %d of %d</p>'
               % (EYEBROW, n, i, total))
    out.append('<h2 style="margin:0 0 10px 0;font-size:1.8em;line-height:1.2;font-weight:800;color:%s;">'
               '<span style="color:%s;">Step %d.</span> %s</h2>' % (NAVY, MAROON, i, txt(st["title"])))
    out.append('<p style="%s"><strong>Time:</strong> %s. <strong>Counts for:</strong> %s</p>'
               % (P % NAVY, txt(st["time"]), txt(st["status"])))
    out.append('<p style="%s">%s</p>' % (P % NAVY, txt(st["intro"])))

    out.append('<div style="%s"><h3 style="%s">What to do</h3>' % (CARD, H3))
    out.append('<ol style="margin:0;padding-left:1.4em;color:%s;">%s</ol>'
               % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(t)) for t in st["todo"])))
    if st.get("note"):
        out.append('<p style="margin:12px 0 0 0;line-height:1.6;color:%s;">%s</p>' % (INK_SOFT, txt(st["note"])))
    out.append('</div>')

    out.append('<div style="%s"><h3 style="%s">Links</h3>' % (CARD, H3))
    out.append('<p style="%s">Each link opens the course site in a new tab. Canvas stays open in this tab.</p>'
               % (P % INK_SOFT))
    out.append('<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul>' % (NAVY, "".join(
        '<li style="%s"><a href="%s%s" target="_blank" rel="noopener" style="%s">%s</a> '
        '<span style="color:%s;">(opens the course site in a new tab)</span></li>'
        % (LI, SITE, html.escape(path, quote=True), LINK, txt(label), INK_SOFT)
        for label, path in st["links"])))
    out.append('</div>')

    out.append('<div style="%s"><h3 style="%s">What you turn in</h3>' % (CARD, H3))
    if st["turnin"]:
        out.append('<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul>'
                   % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(t)) for t in st["turnin"])))
    else:
        out.append('<p style="margin:0;line-height:1.6;color:%s;">Nothing is turned in for this step.</p>' % NAVY)
    out.append('</div>')

    nav = []
    if next_t:
        nav.append('<strong>Next:</strong> Step %d, %s. Press <strong>Next</strong> at the bottom of this page.'
                   % (i + 1, txt(next_t)))
    else:
        nav.append('<strong>That is the whole week.</strong> If a competency is still not solid, go back to '
                   'Step 5 for it and take the Mastery Check again before Sunday.')
    out.append('<p style="%s">%s</p>' % (P % NAVY, " ".join(nav)))
    out.append('<p style="margin:6px 0 0 0;font-size:0.85em;color:%s;">Dr. Sharilyn Rennie</p>' % INK_SOFT)
    out.append('</div>')
    return "".join(out) + "\n"

def build(n):
    W = importlib.import_module("canvas_steps_week%02d" % n)
    pages_dir = ROOT / "_canvas" / "pages"
    readme = ["Week %d Canvas module, top to bottom. Paste each file into the page with that title "
              "(HTML editor). Put each step's Canvas assignment right after its page if you want the "
              "Next button to land on it." % n, "",
              "Week %d | Start here: %s   ->  w%02d-00-start-here.html  (built by build_canvas_week_start.py)"
              % (n, W.TITLE, n)]
    for i, st in enumerate(W.STEPS, 1):
        prev_t = W.STEPS[i - 2]["title"] if i > 1 else None
        next_t = W.STEPS[i]["title"] if i < len(W.STEPS) else None
        name = "w%02d-%02d-%s.html" % (n, i, slug(st["title"]))
        (pages_dir / name).write_text(page(W, i, st, prev_t, next_t), encoding="utf-8")
        readme.append("Week %d, Step %d | %s   ->  %s" % (n, i, re.sub(r"</?strong>", "", st["title"]), name))
    (pages_dir / ("w%02d-README.txt" % n)).write_text("\n".join(readme) + "\n", encoding="utf-8")
    print("\n".join(readme))

if __name__ == "__main__":
    build(int(sys.argv[1]) if len(sys.argv) > 1 else 4)
