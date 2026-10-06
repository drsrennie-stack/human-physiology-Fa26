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

# Oct 5 2026, Scrubs: Canvas is home. Students work down the Canvas module and
# each item opens one site page. With CANVAS_ONLY on, Start here offers no
# second route through the website. Set it to False to bring the two routes back.
CANVAS_ONLY = True
TWO_WAYS = ('<p style="margin:14px auto 0;font-family:%s;font-size:15.5px;line-height:1.6;color:#0B1530;max-width:54ch">You can work this week two ways, and they hold the same steps in the same order under the same names. You turn everything in on Canvas either way. Pick whichever one suits how you like to work.</p>')
ONE_WAY = ('<p style="margin:14px auto 0;font-family:%s;font-size:15.5px;line-height:1.6;color:#0B1530;max-width:54ch">Work down this module from top to bottom. Each item opens the page for that step, and you turn in the work for it here in Canvas.</p>')

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
sys.path.insert(0, str(ROOT / "tools"))
from build_week_entry import STEPS   # same step names, times and order as the loop page

NAVY, MAROON, MDARK, INK_SOFT = "#0B1530", "#8B3A2E", "#6E2D24", "#414B5C"
FONT = "'Plus Jakarta Sans','Open Sans','Helvetica Neue',Arial,sans-serif"
CARD = ("background:#FFFFFF;border-radius:8px;padding:22px 24px;margin:0 0 18px 0;"
        "border:1px solid #D9DDE3;")  # Canvas strips box-shadow, so a hairline border stands in
EYEBROW = ("margin:0 0 8px 0;font-size:0.85em;font-weight:700;"
           "color:%s;" % MAROON)  # Canvas strips letter-spacing and text-transform
BTN = ("display:inline-block;background:%s;color:#FFFFFF;text-decoration:none;font-weight:800;"
       "font-size:0.95em;padding:12px 20px;"
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
        flat = []
        for it in st["links"]:
            if isinstance(it, dict):
                for o in it["options"]: flat += [(l, pth) for l, pth in o["links"]]
            else: flat.append((it[0], it[1]))
        for label, path in flat:
            if path.endswith(".pdf") and path not in seen:
                seen.add(path)
                rows.append('<li style="margin:0 0 8px 0;"><a href="%s%s" target="_blank" rel="noopener" '
                            'style="color:%s;font-weight:700;text-decoration:underline;">%s</a> '
                            '<span style="color:%s;">(Step %d. PDF, opens the course site in a new tab)</span></li>'
                            % (SITE, e(path), MAROON, e(_cap(_re.sub(r"^Choice \d(, [^:]*)?: ", "", _re.sub(r"\s*\(PDF\)$", "", _re.sub(r"</?strong>", "", label))))), INK_SOFT, i))
    if not rows: return ""
    return ('<div style="%s"><p style="%s">Printables for Week %d</p>' % (CARD, EYEBROW, n) +
            '<p style="margin:0 0 12px 0;line-height:1.6;color:%s;"><strong>Nothing has to be printed.</strong> You can work on your own paper instead: label every page with your name, Week %d, the step, and the competency number or question number each answer goes with. If you like '
            'working on paper, here is every printable for the week. Each one is also linked on its own step. If you print them here, you do not need to print them again when a step links the same sheet.</p>' % (INK_SOFT, n) +
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
        '<div style="flex:1 1 260px;min-width:0;margin:0;%s">'
        '<p style="%s">%s</p>'
        '<h3 style="margin:0 0 10px 0;font-size:1.3em;line-height:1.25;color:%s;">%s</h3>'
        '%s%s</div>' % (CARD.replace('margin:0 0 18px 0;', ''), EYEBROW, eb, NAVY, h, body, extra))
    p = lambda t, c=NAVY: '<p style="margin:0 0 12px 0;line-height:1.6;color:%s;">%s</p>' % (c, t)

    # Sep 27 2026, Scrubs: the top of every week's Start here page looks like the
    # course home page students already know (tools/site/enter-card.html): the
    # centered welcome, then the two big cards, maroon Stay in Canvas and navy
    # Use the week page.
    F = "'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
    FH = "'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
    SH = "box-shadow:0 10px 24px -8px rgba(11,21,48,.35),0 3px 8px -3px rgba(11,21,48,.25)"
    # Oct 5 2026: a week whose discussion replies are due before the week closes
    # (Week 5) names the reply date too, so this line matches the due list below.
    dates = (('Opens %s. Everything is due %s at 10:00 pm Pacific, except Discussion %s: your post is due %s '
              'and your two replies are due %s, both at 10:00 pm.' % (e(data["opens"]), e(data["closes"]), n, e(data["discussion_first_post"]), e(data["discussion_replies"])))
             if data.get("discussion_replies") else
             ('Opens %s. Everything is due %s at 10:00 pm Pacific, except your first discussion post, '
              'which is due %s at 10:00 pm.' % (e(data["opens"]), e(data["closes"]), e(data["discussion_first_post"])))
             if data.get("discussion_first_post") else
             'Opens %s. Everything is due %s at 10:00 pm Pacific.' % (e(data["opens"]), e(data["closes"])))
    def bigcard(bg, arrow, acol, align, h, body, btn_href, btn_text, btn_bg, btn_fg, target, note):
        return ('<div style="flex:1 1 300px;min-width:270px;background:%s;border-radius:16px;padding:26px 24px 24px;%s">'
                '<p style="margin:0 0 12px;line-height:0;text-align:%s"><span aria-hidden="true" style="display:inline-block;font-family:%s;font-size:54px;line-height:1;font-weight:700;color:%s">%s</span></p>'
                '<h3 style="margin:0 0 10px;font-family:%s;font-size:23px;font-weight:800;letter-spacing:-.022em;color:#FFFFFF;line-height:1.15">%s</h3>'
                '<p style="margin:0 0 18px;font-family:%s;font-size:15.5px;line-height:1.6;color:#F5F1E8">%s</p>'
                '<p style="margin:0"><a href="%s" target="%s"%s style="display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:14px 24px;border-radius:8px;background:%s;border:2px solid %s;color:%s;text-decoration:none;font-family:%s;font-weight:800;font-size:16px">%s</a></p>'
                '<p style="margin:12px 0 0;font-family:%s;font-size:13px;line-height:1.5;color:#F5F1E8">%s</p></div>'
                % (bg, SH, align, F, acol, arrow, FH, h, F, body, btn_href, target,
                   ' rel="noopener"' if target == "_blank" else "", btn_bg, btn_bg, btn_fg, F, btn_text, F, note))
    out = (
      '<div style="font-family:%s;color:%s;max-width:960px;">' % (FONT, NAVY) +
      '<div style="text-align:center;padding:6px 0 0">'
      '<p style="margin:0 0 14px;line-height:0"><img src="%sicon.svg" width="54" height="64" alt="" style="display:inline-block;height:64px;width:auto;border:0"></p>' % SITE +
      '<p style="margin:0 0 12px;font-family:%s;font-size:11px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#8B3A2E">BIO 005 &middot; %s</p>' % (F, e(data["n_of"])) +
      '<h2 style="margin:0 auto;font-family:%s;font-size:34px;font-weight:800;letter-spacing:-.025em;color:#0B1530;line-height:1.1;max-width:22ch">Week %d: <span style="color:#8B3A2E">%s.</span></h2>' % (FH, n, e(data["title"])) +
      '<p style="margin:16px auto 0;font-family:%s;font-size:17px;line-height:1.6;color:#414B5C;max-width:54ch">%s</p>' % (F, dates) +
      (TWO_WAYS if not CANVAS_ONLY else ONE_WAY) % F +
      '</div>'
      '<div style="display:flex;flex-wrap:wrap;gap:20px;align-items:stretch;margin:30px 0 26px">' +
      bigcard("#8B3A2E", "&#8592;", "#E0BC6C", "left", "Stay in Canvas",
              "Work down this module from top to bottom. Each item opens the page for that step and is where you turn in the work for it. When you finish a page, press <b>Next</b> at the bottom.",
              "https://yccd.instructure.com/courses/42616/modules", "Go to the modules", "#FFFFFF", "#8B3A2E", "_top",
              "Or press Next at the bottom of this page to start Step 1.") +
      ("" if CANVAS_ONLY else
      bigcard("#0B1530", "&#8594;", "#C9A14A", "right", "Use the Week %d page" % n,
              "The whole week on one page, as one line of steps from the pre-read to the discussion, with the pages for each step listed under it.",
              entry, "Open the Week %d page" % n, "#C9A14A", "#060A18", "_blank",
              "It opens in a new tab, so Canvas stays open behind it for turning in your work.")) +
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
