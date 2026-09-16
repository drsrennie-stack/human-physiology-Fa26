# -*- coding: utf-8 -*-
"""Study With Me as a Canvas paste block, inline styles only.

WHY THIS EXISTS. Sep 16 2026. She pasted the whole of study-with-me.html into
a Canvas page. The kit pages are built for two homes, the open web and a Canvas
iframe, and they carry the site footer for the first one. A script in the page
takes the footer off when it detects a frame, and Canvas strips <script>, so
the footer stayed in the document with nothing to render, which is the big
empty box she saw pushing everything down.

A pasted page needs a third build, and this is it. No <style>, no <script>, no
site chrome, no footer. Every rule is an inline style attribute, which is the
one thing the Canvas sanitizer keeps. Nothing here can be stripped, so nothing
here can leave a hole.

Same content as study-with-me.html, same order, same words.
"""
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"

NAVY, MAROON, MAROON_DK, GOLD, GOLD_INK, INK, BONE, LINE = (
    "#0B1530", "#8B3A2E", "#6E2D24", "#C9A14A", "#060A18",
    "#414B5C", "#F5F1E8", "rgba(11,21,48,.08)")
DISPLAY = "'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
BODY = "'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"

CARD = ('background:#FFFFFF;border-radius:12px;padding:24px 26px;margin:0 0 18px;'
        'box-shadow:0 1px 3px rgba(11,21,48,.08)')
SHADOW = ('box-shadow:0 6px 14px -5px rgba(11,21,48,.45),'
          '0 2px 5px -2px rgba(11,21,48,.30)')


def h2(t):
    return ('<h2 style="margin:0 0 8px;font-family:%s;font-size:22px;font-weight:800;'
            'letter-spacing:-.022em;color:%s;line-height:1.2">%s</h2>' % (DISPLAY, MAROON_DK, t))


def p(t, top=0):
    return ('<p style="margin:%dpx 0 14px;font-family:%s;font-size:16px;line-height:1.65;'
            'color:%s">%s</p>' % (top, BODY, NAVY, t))


def btn(label, href, navy=False, newtab=False):
    """Solid, cream text, lifted. Maroon-dark for the thing the card is for,
    navy for everything else. No outline buttons anywhere on this site."""
    bg = NAVY if navy else MAROON_DK
    tail = ' target="_blank" rel="noopener"' if newtab else ' target="_top"'
    return ('<a href="%s"%s style="display:inline-flex;align-items:center;'
            'justify-content:center;min-height:46px;padding:13px 22px;border-radius:8px;'
            'background:%s;color:%s;text-decoration:none;font-family:%s;font-weight:800;'
            'font-size:14px;letter-spacing:.02em;%s">%s</a>'
            % (href, tail, bg, BONE, BODY, SHADOW, label))


def btnrow(*buttons):
    return ('<p style="margin:18px 0 0;display:flex;flex-wrap:wrap;gap:10px">%s</p>'
            % "".join(buttons))


def step(n, lead, rest):
    """Her numbered lists carry a big number. The numeral is a table cell here
    rather than a CSS counter, because counters need a stylesheet and Canvas
    does not keep one."""
    return (
'<tr>'
'<td style="width:62px;padding:0 0 16px;vertical-align:top">'
'<span style="display:inline-block;width:44px;height:44px;border-radius:999px;'
'background:%(gold)s;color:%(gink)s;font-family:%(body)s;font-weight:800;'
'font-size:20px;line-height:44px;text-align:center">%(n)d</span></td>'
'<td style="padding:0 0 16px;vertical-align:top">'
'<p style="margin:8px 0 0;font-family:%(body)s;font-size:16px;line-height:1.6;'
'color:%(navy)s"><b style="color:%(mdk)s">%(lead)s</b> %(rest)s</p></td>'
'</tr>' % dict(gold=GOLD, gink=GOLD_INK, body=BODY, navy=NAVY, mdk=MAROON_DK,
               n=n, lead=lead, rest=rest))


def bullets(items):
    li = "".join(
        '<li style="margin:0 0 7px;font-family:%s;font-size:16px;line-height:1.6;'
        'color:%s">%s</li>' % (BODY, NAVY, x) for x in items)
    return '<ul style="margin:12px 0 0;padding-left:1.15rem">%s</ul>' % li


HTML = (
'<div style="max-width:900px;margin:0 auto;font-family:%(body)s;color:%(navy)s">'

# ---- lede and the one button that matters
'<div style="%(card)s">'
+ p('Work through the physiology with other people from the class, online. It is '
    'optional, it is the best hour you will spend on this course, and it earns '
    '<a href="%(site)sscholar-points.html" target="_top" style="color:%(mdk)s;'
    'font-weight:700">Scholar Points</a>.')
+ btnrow(btn("Open the calendar and sign up", SITE + "study-with-me-calendar.html"))
+ '</div>'

# ---- how it works
'<div style="%(card)s">'
+ h2("How it works")
+ '<table role="presentation" style="border-collapse:collapse;width:100%%;margin:14px 0 0">'
+ step(1, "Open the calendar.",
       "Every session posted there is open to the whole class, mine and other students'.")
+ step(2, "Sign up for one.", "So the host knows who is coming.")
+ step(3, "Show up on camera",
       "for as much of it as you can, and log your hours afterward.")
+ '</table>'
+ p("Want to run one instead? Post it on the calendar so anyone can join, and "
    "hosting adds an hour to your log.", top=6)
+ '</div>'

# ---- what people do
'<div style="%(card)s">'
+ h2("What people do")
+ bullets([
    "Quiz each other on the week's competencies",
    "Run a Kahoot or another learning game",
    "Work the book problems, everyone tries first, then compare",
    "Brain dumps side by side, then hold them up and see what you each left out",
    "One person teaches a mechanism with no notes while everyone else asks awkward questions",
  ])
+ p('<b style="color:%(mdk)s">Not graded work.</b> Your labs, chart entries and '
    'Mastery Checks are yours alone.', top=14)
+ btnrow(btn("Brain Dump", SITE + "competency-brain-dump.html", navy=True),
         btn("Rx Cards", SITE + "rx-cards.html", navy=True),
         btn("Book problems", SITE + "assignment-bookproblems.html", navy=True))
+ '</div>'

# ---- what counts
'<div style="%(card)s">'
+ h2("For the hours to count")
+ bullets([
    "Posted on the calendar and open to everyone",
    "Signed up for",
    "Online and recorded",
    "Everybody on camera the whole time",
    "Log only the time you were actually there",
  ])
+ p("Cameras a problem for you? Come and talk to me rather than skipping it.", top=14)
+ btnrow(btn("Scholar Points, in full", SITE + "scholar-points.html", navy=True))
+ '</div>'

'</div>'
) % dict(body=BODY, navy=NAVY, card=CARD, site=SITE, mdk=MAROON_DK)

OUT = os.path.join(HERE, "paste-study-with-me.html")
io.open(OUT, "w", encoding="utf-8").write(HTML)
print("paste-study-with-me.html %d bytes, no <style>, no <script>" % len(HTML))
assert "<style" not in HTML and "<script" not in HTML
