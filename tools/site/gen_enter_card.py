# -*- coding: utf-8 -*-
"""The 'Enter the Course Here' card, pasted into Canvas, never iframed.

WHY NOT AN IFRAME. Sep 15 2026. The door was embedded in that Canvas page as
an iframe and it trapped students: a link inside a frame loads inside the
frame, so pressing Enter left them on the same Canvas page. Scrubs also could
not keep the iframe height, because Canvas rewrites iframe attributes when the
page is saved from the rich editor, so her edit kept reverting.

Both problems have the same fix: there is no iframe. This is a plain block of
inline styled HTML pasted straight onto the Canvas page. Canvas strips <script>
and <style> but keeps inline style attributes, so it survives the editor. There
is no height to set and nothing to revert, and the website button carries
target="_blank" with the full GitHub Pages address, so it genuinely leaves
Canvas.

TWO DOORS, SAID PLAINLY. A student picks one. Canvas keeps them here. The
website opens in its own tab. Same material either way.
"""
import io, os

SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
MODULES = "https://yccd.instructure.com/courses/42616/modules"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(os.path.dirname(HERE))

NAVY, MAROON, MAROON_D, GOLD, INK, LINE = (
    "#0B1530", "#8B3A2E", "#6E2D24", "#C9A14A", "#414B5C", "rgba(11,21,48,0.16)")
DISPLAY = "'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
BODY = "'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"

MARK = ('<svg viewBox="40 10 125 148" width="34" height="40" role="img" '
        'aria-label="BIO 005 Human Physiology">'
        '<g transform="translate(0,18)">'
        '<g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/>'
        '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 '
        'L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g>'
        '<g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/>'
        '<path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 '
        'L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g>'
        '<g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/>'
        '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 '
        'L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g>'
        '</g></svg>')


def choice(title, sub, body_text, href, label, newtab, primary):
    """One of the two doors."""
    if newtab:
        tail = ' target="_blank" rel="noopener"'
        note = ('<p style="margin:12px 0 0;font-family:%s;font-size:13.5px;color:%s">'
                'Opens in a new tab. Canvas stays open behind it.</p>' % (BODY, INK))
    else:
        tail = ' target="_top"'
        note = ('<p style="margin:12px 0 0;font-family:%s;font-size:13.5px;color:%s">'
                'You are already here. Nothing new opens.</p>' % (BODY, INK))
    btn = ("background:%s;border:2px solid %s;color:#FFFFFF"
           % (MAROON, MAROON)) if primary else (
           "background:#FFFFFF;border:2px solid %s;color:%s" % (NAVY, NAVY))
    return (
'<div style="flex:1 1 300px;min-width:280px;background:#FFFFFF;border-radius:12px;'
'box-shadow:0 1px 3px rgba(11,21,48,.08);padding:24px 24px 22px">'
'<p style="margin:0 0 8px;font-family:%(body)s;font-size:10.5px;font-weight:700;'
'letter-spacing:.26em;text-transform:uppercase;color:%(maroon)s">%(sub)s</p>'
'<h3 style="margin:0 0 10px;font-family:%(display)s;font-size:21px;font-weight:800;'
'letter-spacing:-.022em;color:%(navy)s;line-height:1.15">%(title)s</h3>'
'<p style="margin:0 0 18px;font-family:%(body)s;font-size:15.5px;line-height:1.6;'
'color:%(navy)s">%(text)s</p>'
'<p style="margin:0"><a href="%(href)s"%(tail)s style="display:inline-flex;'
'align-items:center;gap:9px;min-height:48px;padding:13px 24px;border-radius:8px;'
'%(btn)s;text-decoration:none;font-family:%(body)s;font-weight:800;font-size:15px">'
'%(label)s</a></p>%(note)s</div>'
    ) % dict(body=BODY, display=DISPLAY, maroon=MAROON, navy=NAVY, sub=sub,
             title=title, text=body_text, href=href, tail=tail, btn=btn,
             label=label, note=note)


CARD = (
'<div style="max-width:860px;margin:0 auto;font-family:%(body)s;color:%(navy)s">'

'<div style="display:flex;align-items:center;gap:10px;margin:0 0 6px">%(mark)s'
'<span><span style="display:block;font-family:%(display)s;font-size:17px;font-weight:800;'
'letter-spacing:-.02em;color:%(navy)s;line-height:1.05">BIO <b style="color:%(maroon)s">005</b></span>'
'<span style="display:block;font-family:%(body)s;font-size:8px;font-weight:700;'
'letter-spacing:.3em;text-transform:uppercase;color:%(ink)s;margin-top:3px">Human Physiology</span>'
'</span></div>'

'<h2 style="margin:14px 0 8px;font-family:%(display)s;font-size:30px;font-weight:800;'
'letter-spacing:-.022em;color:%(navy)s;line-height:1.12">Two ways to take this course. '
'<span style="color:%(maroon)s">Pick either one.</span></h2>'
'<p style="margin:0 0 6px;font-family:%(body)s;font-size:17px;line-height:1.6;color:%(ink)s;'
'max-width:62ch">The material is identical in both places, in the same order, under the '
'same names. Nothing is hidden on one side. You can switch whenever you like, and you will '
'not lose your place.</p>'
'<p style="margin:0 0 22px;font-family:%(body)s;font-size:15.5px;line-height:1.6;color:%(navy)s;'
'max-width:62ch">Assignments are turned in through Canvas whichever one you use, so if a step '
'ends in an upload it will hand you back here for that one thing.</p>'

'<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:stretch">%(canvas)s%(web)s</div>'

'<p style="margin:22px 0 0;font-family:%(body)s;font-size:14.5px;line-height:1.6;color:%(ink)s">'
'Not sure? Start in Canvas. If the navigation gets in your way, come back and open the '
'website instead.</p>'
'</div>'
) % dict(body=BODY, display=DISPLAY, navy=NAVY, maroon=MAROON, ink=INK, mark=MARK,
  canvas=choice("Stay in Canvas", "Option 1",
     "Everything is here in the modules. Work down the list in order, top to bottom. "
     "This is the one to pick if you like Canvas or you are used to it.",
     MODULES, "Go to the modules", newtab=False, primary=False),
  web=choice("Use the course website", "Option 2",
     "The same course as a plain website, outside Canvas. Cleaner pages and fewer menus. "
     "This is the one to pick if the Canvas navigation gets in your way.",
     SITE + "course.html", "Open the course website", newtab=True, primary=True))

io.open(os.path.join(HERE, "enter-card.html"), "w", encoding="utf-8").write(CARD)
print("enter-card.html %d bytes" % len(CARD))
