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
is no height to set and nothing to revert.

Sep 16 2026: made it a welcome rather than a menu. Her note was that a student
landing here should be able to tell at a glance they are in the right place and
have not missed anything, so it now opens with the course mark, the course
number and the course name before it asks them to choose anything.

The two doors match index.html: terra cotta for Canvas on the left with a big
gold arrow pointing at the Canvas menu, navy for the website on the right with
an arrow pointing off the page. No hover states, because Canvas keeps inline
styles and nothing else.

Contrast on the dark blocks: white on maroon 7.66:1, white on navy-deep
19.73:1, the gold arrow 4.22:1 on maroon and 8.16:1 on navy, the white button's
maroon text 7.66:1, the gold button's near black ink 8.16:1.
"""
import io, os

SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
MODULES = "https://yccd.instructure.com/courses/42616/modules"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(os.path.dirname(HERE))

NAVY, NAVY_DEEP, MAROON, GOLD, GOLD_HI, GOLD_INK, INK, BONE = (
    "#0B1530", "#060A18", "#8B3A2E", "#C9A14A", "#E0BC6C", "#060A18",
    "#414B5C", "#F5F1E8")
DISPLAY = "'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
BODY = "'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"

MARK = ('<svg viewBox="40 10 125 148" width="54" height="64" role="img" '
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


def arrow(color, left=False):
    """The big friendly arrow. Left points at the Canvas menu, which runs down
    the left of the screen. Right points off the page at the website.

    Sep 16 2026: this used to be a drawn SVG and Canvas ate it. Canvas strips
    <svg> on save even though it keeps inline style attributes, so the arrows
    were there in the file and gone on the page. These are characters now, at
    54px in the page font. Nothing can strip a character."""
    glyph = "&#8592;" if left else "&#8594;"   # left arrow, right arrow
    return ('<span aria-hidden="true" style="display:inline-block;'
            'font-family:%s;font-size:54px;line-height:1;font-weight:700;'
            'color:%s">%s</span>' % (BODY, color, glyph))


def door(bg, arrow_svg, arrow_right, title, body, href, label, btn_bg, btn_ink,
         btn_border, tiny):
    align = "right" if arrow_right else "left"
    tail = ' target="_top"' if href.startswith("http") and "instructure" in href \
           else ' target="_top"'
    return (
'<div style="flex:1 1 300px;min-width:270px;background:%(bg)s;border-radius:16px;'
'padding:26px 24px 24px;box-shadow:0 10px 24px -8px rgba(11,21,48,.35),'
'0 3px 8px -3px rgba(11,21,48,.25)">'
'<p style="margin:0 0 12px;line-height:0;text-align:%(align)s">%(arrow)s</p>'
'<h3 style="margin:0 0 10px;font-family:%(display)s;font-size:23px;font-weight:800;'
'letter-spacing:-.022em;color:#FFFFFF;line-height:1.15">%(title)s</h3>'
'<p style="margin:0 0 18px;font-family:%(body)s;font-size:15.5px;line-height:1.6;'
'color:%(bone)s">%(text)s</p>'
'<p style="margin:0"><a href="%(href)s"%(tail)s style="display:inline-flex;'
'align-items:center;justify-content:center;min-height:52px;padding:14px 24px;'
'border-radius:8px;background:%(bbg)s;border:2px solid %(bbd)s;color:%(bink)s;'
'text-decoration:none;font-family:%(body)s;font-weight:800;font-size:16px">'
'%(label)s</a></p>'
'<p style="margin:12px 0 0;font-family:%(body)s;font-size:13px;line-height:1.5;'
'color:%(bone)s">%(tiny)s</p>'
'</div>'
    ) % dict(bg=bg, align=align, arrow=arrow_svg, display=DISPLAY, body=BODY,
             title=title, text=body, bone=BONE, href=href, tail=tail,
             bbg=btn_bg, bbd=btn_border, bink=btn_ink, label=label, tiny=tiny)


CARD = (
'<div style="max-width:900px;margin:0 auto;font-family:%(body)s;color:%(navy)s">'

# ---- the welcome, so a student can tell at a glance they are in the right place
'<div style="text-align:center;padding:6px 0 0">'
'<p style="margin:0 0 14px;line-height:0">'
'<img src="%(site)sicon.svg" width="54" height="64" alt="" '
'style="display:inline-block;height:64px;width:auto;border:0">'
'</p>'
'<p style="margin:0 0 12px;font-family:%(body)s;font-size:11px;font-weight:700;'
'letter-spacing:.26em;text-transform:uppercase;color:%(maroon)s">'
'BIO 005 &middot; Yuba College &middot; Fall 2026</p>'
'<h2 style="margin:0 auto;font-family:%(display)s;font-size:34px;font-weight:800;'
'letter-spacing:-.025em;color:%(navy)s;line-height:1.1;max-width:16ch">'
'Welcome to <span style="color:%(maroon)s">Human Physiology.</span></h2>'
'<p style="margin:16px auto 0;font-family:%(body)s;font-size:17px;line-height:1.6;'
'color:%(ink)s;max-width:54ch">You are in the right place. This is the course '
'home, and everything for the term starts from here.</p>'
'<p style="margin:14px auto 0;font-family:%(body)s;font-size:15.5px;line-height:1.6;'
'color:%(navy)s;max-width:54ch">You can navigate this course two ways, and they hold the same '
'material in the same order under the same names. Pick whichever one suits how '
'you like to work.</p>'
'</div>'

# ---- the two doors
'<div style="display:flex;flex-wrap:wrap;gap:20px;align-items:stretch;margin:30px 0 0">'
'%(canvas)s%(web)s'
'</div>'

# ---- the small print
'<div style="max-width:74ch;margin:26px auto 0;background:#FFFFFF;border-radius:12px;'
'box-shadow:0 1px 3px rgba(11,21,48,.08);padding:18px 20px">'
'<p style="margin:0 0 8px;font-family:%(display)s;font-size:14px;font-weight:800;'
'color:%(navy)s">Why there are two of them</p>'
'<p style="margin:0 0 9px;font-family:%(body)s;font-size:13.5px;line-height:1.6;'
'color:%(ink)s">Last spring Canvas went down for a week and students lost access '
'to everything in it. This is my answer to that. The course website is a complete '
'copy that does not depend on Canvas at all, so <b style="color:#6E2D24">if Canvas '
'goes down again you will still have your course</b>. I would send you the link and '
'we would carry on, with nothing to rebuild and nothing lost.</p>'
'<p style="margin:0 0 9px;font-family:%(body)s;font-size:13.5px;line-height:1.6;'
'color:%(ink)s">You are not required to use it. Most of you probably never will. It '
'is there so that a bad week for Canvas is not a bad week for you.</p>'
'<p style="margin:0;font-family:%(body)s;font-size:13.5px;line-height:1.6;'
'color:%(ink)s">Assignments are turned in through Canvas whichever side you work '
'on, so if a step ends in an upload it hands you back here for that one thing.</p>'
'</div>'
'</div>'
) % dict(body=BODY, display=DISPLAY, navy=NAVY, maroon=MAROON, ink=INK, site=SITE,
  canvas=door(MAROON, arrow(GOLD_HI, left=True), False,
     "Stay in Canvas",
     "Everything is here in the modules, down the left side of your screen. Work "
     "through the list in order, top to bottom. If you like Canvas or you are used "
     "to it, this is the one to pick.",
     MODULES, "Go to the modules",
     btn_bg="#FFFFFF", btn_ink=MAROON, btn_border="#FFFFFF",
     tiny="You are already here. Nothing new opens."),
  web=door(NAVY, arrow(GOLD), True,
     "Use the course website",
     "The same course as a plain website, outside Canvas. Cleaner pages and fewer "
     "menus. If the Canvas navigation gets in your way, this is the one to pick.",
     SITE + "course.html", "Open the course website",
     btn_bg=GOLD, btn_ink=GOLD_INK, btn_border=GOLD,
     tiny="This leaves Canvas. Your browser Back button brings you right back."))

io.open(os.path.join(HERE, "enter-card.html"), "w", encoding="utf-8").write(CARD)
print("enter-card.html %d bytes" % len(CARD))
