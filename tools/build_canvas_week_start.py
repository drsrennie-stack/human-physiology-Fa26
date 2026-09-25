#!/usr/bin/env python3
"""
tools/build_canvas_week_start.py

Builds the Canvas "Start here" page for one week: the first item in the week's
Canvas module. It tells students they can work the week two ways, staying in
Canvas or using the interactive week page on the course site, then lists the
steps in order and everything due.

Canvas strips <style> and <script> from pasted pages, so every style here is
inline. Web fonts do not load in Canvas; the font stack falls back to Canvas's
own face. Colors are the MedMasters house palette: navy #0B1530, maroon
#8B3A2E, maroon-dark #6E2D24, white cards lifted by a shadow, no accent bars.

Data comes from tools/week-entry-data.json, the same file build_week_entry.py
uses, so the two pages always agree.

Run:  python3 tools/build_canvas_week_start.py 4
Out:  _canvas/pages/w04-00-start-here.html   (paste into the Canvas page's HTML editor)
"""
import json, sys, html, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
sys.path.insert(0, str(ROOT / "tools"))
from build_week_entry import STEPS   # same step names, times and order as the loop page

NAVY, MAROON, MDARK, INK_SOFT = "#0B1530", "#8B3A2E", "#6E2D24", "#414B5C"
FONT = "'Plus Jakarta Sans','Open Sans','Helvetica Neue',Arial,sans-serif"
CARD = ("background:#FFFFFF;border-radius:8px;padding:22px 24px;margin:0 0 18px 0;"
        "box-shadow:0 1px 3px rgba(11,21,48,0.10),0 6px 16px rgba(11,21,48,0.08);")
EYEBROW = ("margin:0 0 8px 0;font-size:0.78em;font-weight:700;letter-spacing:0.18em;"
           "text-transform:uppercase;color:%s;" % MAROON)
BTN = ("display:inline-block;background:%s;color:#FFFFFF;text-decoration:none;font-weight:800;"
       "font-size:0.85em;letter-spacing:0.12em;text-transform:uppercase;padding:12px 20px;"
       "border-radius:4px;" % MAROON)
PHASE = {'prev': 'Preview', 'learn': 'Learn', 'retr': 'Retrieve', 'check': 'Check', 'assess': 'Use it'}

def e(s): return html.escape(s, quote=True)

def _cap(t): return t[:1].upper() + t[1:]

def printables(W, n):
    """Every PDF the week's steps link to, in one place, so students can print the week at once."""
    if W is None: return ""
    import re as _re
    seen, rows = set(), []
    for i, st in enumerate(W.STEPS, 1):
        for label, path in st["links"]:
            if path.endswith(".pdf") and path not in seen:
                seen.add(path)
                rows.append('<li style="margin:0 0 8px 0;"><a href="%s%s" target="_blank" rel="noopener" '
                            'style="color:%s;font-weight:700;text-decoration:underline;">%s</a> '
                            '<span style="color:%s;">(Step %d. PDF, opens the course site in a new tab)</span></li>'
                            % (SITE, e(path), MAROON, e(_cap(_re.sub(r"^Choice \d: ", "", _re.sub(r"\s*\(PDF\)$", "", _re.sub(r"</?strong>", "", label))))), INK_SOFT, i))
    if not rows: return ""
    return ('<div style="%s"><p style="%s">Printables for Week %d</p>' % (CARD, EYEBROW, n) +
            '<p style="margin:0 0 12px 0;line-height:1.6;color:%s;">You do not have to print anything. If you like '
            'working on paper, here is every printable for the week. Each one is also linked on its own step.</p>' % INK_SOFT +
            '<ul style="margin:0;padding-left:1.2em;line-height:1.5;color:%s;">%s</ul></div>' % (NAVY, "".join(rows)))

def build(n):
    data = json.load(open(ROOT / "tools/week-entry-data.json"))["weeks"][str(n)]
    nn = "%02d" % n
    entry = SITE + "week-%s-entry.html" % nn
    W = None
    try:   # prefer the Canvas step titles, so this list matches the module exactly
        import importlib, re as _re
        W = importlib.import_module("canvas_steps_week%02d" % n)
        steps = "".join(
            '<li style="margin:0 0 8px 0;">%s <span style="color:%s;">(%s)</span></li>'
            % (e(_re.sub(r"</?strong>", "", st["title"])), INK_SOFT, e(st["time"])) for st in W.STEPS)
    except ImportError:
        steps = "".join(
            '<li style="margin:0 0 8px 0;"><strong>%s.</strong> %s <span style="color:%s;">(%s)</span></li>'
            % (e(PHASE[kind]), e(title), INK_SOFT, e(time))
            for key, title, sub, time, kind, letters in STEPS)
    due = "".join('<li style="margin:0 0 8px 0;"><strong>%s:</strong> %s</li>' % (e(a), e(b))
                  for a, b in data["canvas_due"])
    choice = lambda eb, h, body, extra: (
        '<div style="display:inline-block;vertical-align:top;width:47%%;min-width:260px;'
        'box-sizing:border-box;margin:0 2%% 16px 0;%s">'
        '<p style="%s">%s</p>'
        '<h3 style="margin:0 0 10px 0;font-size:1.3em;line-height:1.25;color:%s;">%s</h3>'
        '%s%s</div>' % (CARD.replace('margin:0 0 18px 0;', ''), EYEBROW, eb, NAVY, h, body, extra))
    p = lambda t, c=NAVY: '<p style="margin:0 0 12px 0;line-height:1.6;color:%s;">%s</p>' % (c, t)

    out = (
      '<div style="font-family:%s;color:%s;max-width:960px;">' % (FONT, NAVY) +
      '<p style="%s">BIO 005 Human Physiology &middot; %s</p>' % (EYEBROW, e(data["n_of"])) +
      '<h2 style="margin:0 0 12px 0;font-size:2em;line-height:1.15;font-weight:800;color:%s;">'
      '<span style="color:%s;">Week %d</span>: %s.</h2>' % (NAVY, MAROON, n, e(data["title"])) +
      p(('Opens %s. Everything is due %s at 10:00 pm Pacific, except your first discussion post, '
         'which is due %s at 10:00 pm.' % (e(data["opens"]), e(data["closes"]), e(data["discussion_first_post"])))
        if data.get("discussion_first_post") else
        'Opens %s. Everything is due %s at 10:00 pm Pacific.' % (e(data["opens"]), e(data["closes"]))) +
      '<h3 style="margin:26px 0 6px 0;font-size:1.35em;color:%s;">Choose how you want to work this week</h3>' % MDARK +
      p('Both ways have the same steps, in the same order, with the same due dates, and you turn in '
        'everything in Canvas either way. Pick the one that feels easier. You can switch at any time.', INK_SOFT) +
      '<div>' +
      choice('Option 1', 'Stay in Canvas',
             p('Work down this module from top to bottom. Each item opens the page for that step and '
               'is where you turn in the work for it.') +
             p('When you finish a page, press <strong>Next</strong> at the bottom to go to the following step.'),
             p('<strong>Start:</strong> press Next below this page.', MAROON)) +
      choice('Option 2', 'Use the interactive week page',
             p('One page that shows the whole week as a loop, from the pre-read to the discussion. Click '
               'any step to open it.') +
             p('It opens in a new tab, so Canvas stays open behind it for turning in your work.'),
             '<p style="margin:4px 0 0 0;"><a href="%s" target="_blank" rel="noopener" style="%s">'
             'Open the Week %d page &#8599;</a></p>' % (entry, BTN, n)) +
      '</div>' +
      '<div style="%s">' % CARD +
      '<p style="%s">This week, in order: the steps in this module</p>' % EYEBROW +
      '<ol style="margin:0;padding-left:1.4em;line-height:1.5;color:%s;">%s</ol>' % (NAVY, steps) +
      '<p style="margin:12px 0 0 0;line-height:1.6;color:%s;">If the Mastery Check shows a competency is '
      'not solid yet, go back to Step 5 for that competency and check again. That loop is part of the '
      'week, not a sign you are behind.</p>' % INK_SOFT +
      '</div>' +
      printables(W, n) +
      '<div style="%s">' % CARD +
      '<p style="%s">Due this week, all times Pacific</p>' % EYEBROW +
      '<ul style="margin:0;padding-left:1.2em;line-height:1.5;color:%s;">%s</ul>' % (NAVY, due) +
      '</div>' +
      '<p style="margin:6px 0 0 0;font-size:0.85em;color:%s;">Dr. Sharilyn Rennie</p>' % INK_SOFT +
      '</div>')
    path = ROOT / ("_canvas/pages/w%s-00-start-here.html" % nn)
    path.write_text(out + "\n", encoding="utf-8")
    print("built", path.relative_to(ROOT))

if __name__ == "__main__":
    build(int(sys.argv[1]) if len(sys.argv) > 1 else 4)
