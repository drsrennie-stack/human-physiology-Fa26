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
        "border:1px solid #D9DDE3;")  # Canvas strips box-shadow, so a hairline border stands in
EYEBROW = ("margin:0 0 8px 0;font-size:0.85em;font-weight:700;"
           "color:%s;" % MAROON)  # Canvas strips letter-spacing and text-transform
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

OPT = ('<span style="display:inline-block;background:#ECEFF4;color:%s;font-weight:700;font-size:0.85em;'
       'padding:1px 8px;border-radius:4px;margin:0 6px 0 0;">Optional</span>' % NAVY)
NOTE = '<span style="color:%s;">(opens the course site in a new tab)</span>' % INK_SOFT

def a_link(label, path):
    return ('<a href="%s%s" target="_blank" rel="noopener" style="%s">%s</a> %s'
            % (SITE, html.escape(path, quote=True), LINK, txt(label), NOTE))

def links_card(items):
    """Sep 25 2026, Scrubs: every item is numbered, so students know they do all of
    them, in order. An either-or is its own box inside the list, Choose one, with
    Choice 1 and Choice 2 kept apart. Anything optional says Optional."""
    lis = []
    for it in items:
        if isinstance(it, dict):
            opts = "".join(
                '<div style="border:1px solid #D9DDE3;border-radius:6px;padding:12px 16px;margin:10px 0 0 0;">'
                '<p style="margin:0 0 4px 0;font-weight:700;color:%s;">Choice %d: %s</p>'
                '<p style="margin:0 0 8px 0;line-height:1.55;color:%s;">%s</p>'
                '<ul style="margin:0;padding-left:1.2em;">%s</ul></div>'
                % (NAVY, k, txt(o["name"]), INK_SOFT, txt(o["text"]),
                   "".join('<li style="margin:0 0 6px 0;line-height:1.55;">%s</li>' % a_link(l, p) for l, p in o["links"]))
                for k, o in enumerate(it["options"], 1))
            lis.append('<li style="%s"><strong>%s.</strong> Pick one of these two.%s</li>' % (LI, txt(it["title"]), opts))
        else:
            label, path = it[0], it[1]
            lis.append('<li style="%s">%s%s</li>' % (LI, OPT if len(it) > 2 else "", a_link(label, path)))
    anyopt = any(not isinstance(it, dict) and len(it) > 2 for it in items)
    lead = ("Do these in order. Each link opens the course site in a new tab, and Canvas stays open in this tab."
            + (" Anything marked Optional is up to you." if anyopt else ""))
    return ('<div style="%s"><h3 style="%s">What you need for this step</h3>'
            '<p style="%s">%s</p><ol style="margin:0;padding-left:1.4em;color:%s;">%s</ol></div>'
            % (CARD, H3, P % INK_SOFT, lead, NAVY, "".join(lis)))

def page(W, i, st, prev_t, next_t, as_assignment=False):
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

    if st["links"]:
        out.append(links_card(st["links"]))

    if as_assignment:
        out.append('<div style="%s"><h3 style="%s">Turn it in here</h3>' % (CARD, H3))
        out.append('<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul>'
                   % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(t)) for t in st["submit_here"])))
        out.append('</div>')
    else:
        out.append('<div style="%s"><h3 style="%s">What you turn in</h3>' % (CARD, H3))
    if as_assignment:
        pass
    elif st["turnin"]:
        out.append('<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul>'
                   % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(t)) for t in st["turnin"])))
    else:
        out.append('<p style="margin:0;line-height:1.6;color:%s;">Nothing is turned in for this step.</p>' % NAVY)
    if not as_assignment:
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

def _kit():
    ul = lambda xs: ('<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul>'
                     % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(x)) for x in xs)))
    ol = lambda xs: ('<ol style="margin:0 0 12px 0;padding-left:1.4em;color:%s;">%s</ol>'
                     % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(x)) for x in xs)))
    opts = lambda xs: ('<ul style="margin:0 0 12px 0;padding-left:0;list-style:none;color:%s;">%s</ul>'
                       % (NAVY, "".join('<li style="%s">%s</li>' % (LI, txt(x)) for x in xs)))
    p = lambda t, c=NAVY: '<p style="%s">%s</p>' % (P % c, txt(t))
    h3 = lambda t: '<h3 style="%s">%s</h3>' % (H3, txt(t))
    h4 = lambda t: '<h4 style="margin:16px 0 8px 0;font-size:1.05em;color:%s;">%s</h4>' % (NAVY, txt(t))
    card = lambda body: '<div style="%s">%s</div>' % (CARD, body)
    return ul, ol, opts, p, h3, h4, card

def _head(n, i, total, title, time, status):
    return ('<div style="font-family:%s;color:%s;max-width:900px;">' % (FONT, NAVY) +
            '<p style="%s">BIO 005 Human Physiology &middot; Week %d &middot; Step %d of %d</p>' % (EYEBROW, n, i, total) +
            '<h2 style="margin:0 0 10px 0;font-size:1.8em;line-height:1.2;font-weight:800;color:%s;">'
            '<span style="color:%s;">Step %d.</span> %s</h2>' % (NAVY, MAROON, i, txt(title)) +
            '<p style="%s"><strong>Time:</strong> %s. <strong>Counts for:</strong> %s</p>' % (P % NAVY, txt(time), txt(status)))

def practice1(W, i, st):
    """Discussion 4, part 1: a Canvas ASSIGNMENT, turned in to me only. Everything is on this page.
    No rubrics here on purpose; they come out in part 2 next week."""
    D, n, total = W.PRACTICE, W.WEEK, len(W.STEPS)
    ul, ol, opts, p, h3, h4, card = _kit()
    o = [_head(n, i, total, st["title"], st["time"], st["status"])]
    o.append(p(D["intro"]))
    o.append(p(W.SOURCES, INK_SOFT))
    o.append(card(h3("How to do it") + ol(D["how"])))
    for k, q in enumerate(D["questions"], 1):
        o.append(card(h3("Question %d" % k) + p("<strong>" + q["q"] + "</strong>") + opts(q["options"]) +
                      h4("Step 1. Prepare your answer on camera, 15 minutes") + p(D["prep"]) + p(q["dump"]) +
                      h4("Step 2. Present your answer, 5 minutes") + p(D["teach"]) +
                      h4("Step 3. Write down your answer") + p(D["choose"]) +
                      (p("<strong>Now go on to question 2.</strong>") if k < len(D["questions"]) else "")))
    o.append(card(h3("Turn it in here") + p("Upload all of this to this assignment. Only I see it.") + ul(D["turnin"]) +
                  ul(st["submit_here"])))
    o.append(p("<strong>Then:</strong> post about how it went in <strong>" + W.DISC4["title"] + "</strong>, the next "
               "item in this module. <strong>Next week:</strong> Discussion 5 is part 2. You get the rubrics, score your "
               "own work, and write about what it shows you."))
    o.append('<p style="margin:6px 0 0 0;font-size:0.85em;color:%s;">Dr. Sharilyn Rennie</p></div>' % INK_SOFT)
    return "".join(o) + "\n"

def disc4(W, i):
    """Week 4 discussion: how the practice went, no answers, solutions for each other."""
    D, n, total = W.DISC4, W.WEEK, len(W.STEPS)
    ul, ol, opts, p, h3, h4, card = _kit()
    o = [_head(n, i, total, D["title"], "About 30 minutes", "Graded. Think About It, 15 percent of your grade across the term.")]
    o.append(p("<strong>Your post is due " + D["first_post"] + ".</strong> Two replies are due " + D["due"] + "."))
    o.append(p(D["intro"]))
    o.append(card(h3("Before you post") + p(D["rule"])))
    o.append(card(h3("What to write in your post") + p("Answer each one in two or three sentences.") + ol(D["post"])))
    o.append(card(h3("Replies") + p(D["replies"])))
    o.append(p("<strong>Next week:</strong> Discussion 5 is part 2. You get the rubrics and the key, score your own "
               "work, and write about what it shows you."))
    o.append('<p style="margin:6px 0 0 0;font-size:0.85em;color:%s;">Dr. Sharilyn Rennie</p></div>' % INK_SOFT)
    return "".join(o) + "\n"

def practice2(W):
    """Discussion 5, part 2: a Canvas DISCUSSION. The rubrics and the key are on it."""
    D = W.PART2
    ul, ol, opts, p, h3, h4, card = _kit()
    o = [_head(D["week"], 10, 10, D["title"], D["time"], D["status"])]
    o.append(p("<strong>Your post is due " + D["first_post"] + ".</strong> Two replies are due " + D["due"] + "."))
    o.append(p(D["intro"]))
    o.append(card(h3("How to do it") + ol(D["how"])))
    body = h3("Check your models")
    for t, pts in D["dump_rubrics"]:
        body += h4(t) + ul(pts)
    o.append(card(body))
    o.append(card(h3("Check your answers") + ul(D["keys"])))
    body = h3("Check your presenting") + p(D["scoring"])
    for t, pts in D["teach_rubrics"]:
        body += h4(t) + ul(pts)
    o.append(card(body))
    o.append(card(h3("Analyze it") + p("Answer each one in two or three sentences.") + ol(D["analysis"])))
    o.append(card(h3("What to post") + p("Press <strong>Reply</strong> on this discussion and include:") + ul(D["post"]) +
                  h4("Replies") + p(D["replies"]) +
                  p("Post by " + D["first_post"] + ". Two replies by " + D["due"] + ".")))
    o.append('<p style="margin:6px 0 0 0;font-size:0.85em;color:%s;">Dr. Sharilyn Rennie</p></div>' % INK_SOFT)
    return "".join(o) + "\n"

def build(n):
    W = importlib.import_module("canvas_steps_week%02d" % n)
    pages_dir = ROOT / "_canvas" / "pages"
    readme = ["Week %d Canvas module, top to bottom. Title each module item exactly as below, and paste "
              "the file into its body or description in the HTML editor." % n, "",
              "Week %d | Start here: %s   ->  w%02d-00-start-here.html  (built by build_canvas_week_start.py)"
              % (n, W.TITLE, n)]
    for i, st in enumerate(W.STEPS, 1):
        prev_t = W.STEPS[i - 2]["title"] if i > 1 else None
        next_t = W.STEPS[i]["title"] if i < len(W.STEPS) else None
        name = "w%02d-%02d-%s.html" % (n, i, slug(st["title"]))
        t = re.sub(r"</?strong>", "", st["title"])
        if i == len(W.STEPS) and hasattr(W, "PRACTICE"):
            name = name.replace(".html", "-ASSIGNMENT.html")
            (pages_dir / name).write_text(practice1(W, i, st), encoding="utf-8")
            readme.append("Week %d, Step %d | %s   ->  %s  (Canvas ASSIGNMENT, turned in to me only: paste into its description)" % (n, i, t, name))
            if hasattr(W, "DISC4"):
                nd = "w%02d-10b-%s.html" % (n, slug(W.DISC4["title"]))
                (pages_dir / nd).write_text(disc4(W, i), encoding="utf-8")
                readme.append("Week %d, Step %d | %s   ->  %s  (Canvas DISCUSSION: paste into its description)" % (n, i, W.DISC4["title"], nd))
            if hasattr(W, "PART2"):
                P2 = W.PART2
                n2 = "w%02d-10-%s.html" % (P2["week"], slug(P2["title"]))
                (pages_dir / n2).write_text(practice2(W), encoding="utf-8")
                readme.append("")
                readme.append("NEXT WEEK: Week %d, Step 10 | %s   ->  %s  (Canvas DISCUSSION: paste into its description)" % (P2["week"], P2["title"], n2))
            continue
        if st.get("submit_here"):
            name = name.replace(".html", "-ASSIGNMENT.html")
            (pages_dir / name).write_text(page(W, i, st, prev_t, next_t, True), encoding="utf-8")
            readme.append("Week %d, Step %d | %s   ->  %s  (Canvas ASSIGNMENT: paste into its description)" % (n, i, t, name))
        elif i == len(W.STEPS):
            readme.append("Week %d, Step %d | %s   ->  w%02d-10-discussion-prompt.html  (Canvas DISCUSSION: paste into its description)" % (n, i, t, n))
            continue
        else:
            (pages_dir / name).write_text(page(W, i, st, prev_t, next_t), encoding="utf-8")
            readme.append("Week %d, Step %d | %s   ->  %s  (Canvas PAGE)" % (n, i, t, name))
    (pages_dir / ("w%02d-README.txt" % n)).write_text("\n".join(readme) + "\n", encoding="utf-8")
    print("\n".join(readme))

if __name__ == "__main__":
    build(int(sys.argv[1]) if len(sys.argv) > 1 else 4)
