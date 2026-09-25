# -*- coding: utf-8 -*-
"""Build CANVAS-STUDY-BUTTONS.md: inline-styled study-activity cards for Canvas pages.

Canvas' Rich Content Editor sanitizer drops <script> and <style> but keeps inline
style attributes, so every card below carries its own styles inline. Nothing here
reads state from anywhere, so the cards work on any page in any module.
"""
import io, os

BASE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
MODULES = "https://yccd.instructure.com/courses/42616/modules"

NAVY = "#0B1530"; CARD = "#101B35"; GOLD = "#C9A14A"; GOLDS = "#E3C87E"
STEEL = "#7E93B8"; GREY = "#D9DEE8"

FONT = ("'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,"
        "'Segoe UI',sans-serif")

ICON = {
"rx": '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M7 9.5h8M7 13h5"/>',
"bd": '<path d="M13.5 3.5 20.5 10.5 9 22H3v-6z"/><path d="M11.5 5.5 18.5 12.5"/>',
"bp": ('<path d="M3.5 4.5h6a3 3 0 0 1 2.5 1.4A3 3 0 0 1 14.5 4.5h6v13h-6a3 3 0 0 0-2.5 '
       '1.4A3 3 0 0 0 9.5 17.5h-6z"/><path d="M12 5.9v13"/>'),
"swm": ('<circle cx="8.5" cy="8" r="3.2"/><circle cx="16.5" cy="9.5" r="2.6"/>'
        '<path d="M3 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M15 14.8c3 .2 5 2.1 5 4.7"/>'),
}

CARDS = [
 dict(key="rx",  slug="rx-cards",      file="rx-cards.html",
      title="Rx Cards", what="Spaced cards", tile=STEEL, head=STEEL,
      why="The ones you miss come back tomorrow. The ones you know come back later.",
      mins="12 min", png="button-rx-cards.png"),
 dict(key="bd",  slug="brain-dump",    file="competency-brain-dump.html",
      title="Brain Dump", what="From memory, then check", tile=GOLD, head=GOLDS,
      why="Spin a prompt, draw it on paper with nothing open, then tick off what you left out.",
      mins="20 min", png="button-brain-dump.png"),
 dict(key="bp",  slug="book-problems", file="assignment-bookproblems.html",
      title="Book Problems", what="Work it, then work it backward", tile=GOLD, head=GOLDS,
      why="Try it before you look. Then start from the answer and see how the author got there.",
      mins="15 min", png="button-book-problems.png"),
]


def tile(c):
    return (
      '<span style="width:74px;height:74px;border-radius:19px;display:flex;'
      'align-items:center;justify-content:center;background:%s;color:%s;margin:0 auto 20px">'
      '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" '
      'focusable="false">%s</svg></span>' % (c["tile"], NAVY, ICON[c["key"]])
    )


def card(c, width="100%"):
    return (
'<a href="%(base)s%(file)s" target="_blank" rel="noopener" '
'style="display:block;box-sizing:border-box;width:%(w)s;max-width:320px;text-align:center;'
'background:%(card)s;border:2px solid %(card)s;border-radius:20px;padding:30px 22px 26px;'
'text-decoration:none;font-family:%(font)s">'
'%(tile)s'
'<span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;'
'color:%(head)s;line-height:1.15;margin:0 0 9px">%(title)s</span>'
'<span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">'
'%(what)s</span>'
'<span style="display:block;color:%(grey)s;font-size:14.5px;line-height:1.5;margin:0 0 18px">'
'%(why)s</span>'
'<span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;'
'text-transform:uppercase;color:%(gold)s">%(mins)s</span>'
'<span class="screenreader-only">, opens in a new tab</span>'
'</a>'
    ) % dict(base=BASE, file=c["file"], w=width, card=CARD, font=FONT, tile=tile(c),
             head=c["head"], title=c["title"], what=c["what"], grey=GREY,
             why=c["why"], gold=GOLD, mins=c["mins"])


def row(cards):
    inner = "".join(
        '<div style="flex:1 1 240px;display:flex;justify-content:center">%s</div>' % card(c)
        for c in cards)
    return ('<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:stretch">'
            + inner + '</div>')


def img_button(c):
    return (
'<p><a href="%s%s" target="_blank" rel="noopener">'
'<img src="PASTE_YOUR_CANVAS_FILE_URL_HERE/%s" alt="%s. %s. Opens in a new tab." '
'style="max-width:320px;height:auto;border:0"></a></p>'
    ) % (BASE, c["file"], c["png"], c["title"], c["what"])


out = io.StringIO()
w = out.write

w("# Canvas paste blocks: study activity buttons\n\n")
w("Built %s. Source page: `study-buttons.html`.\n\n" % "September 15, 2026")
w("Three practice activities, renamed for physiology. Nothing connects to Mastery OS, ")
w("nothing reads state, and none of them is graded, so a card can sit on any page ")
w("in any module without breaking.\n\n")
w("Every card opens in a new browser tab. Rx Cards and Brain Dump keep score, and ")
w("browsers block that storage inside a Canvas iframe, so a new tab is the only way ")
w("their progress survives.\n\n")
w("---\n\n")

w("## Option A. The whole page as an iframe\n\n")
w("Use this when you want all three on one Canvas page. Paste in the HTML editor.\n\n")
w("```html\n")
w('<iframe id="bio005-study-buttons" src="%sstudy-buttons.html"\n' % BASE)
w('        title="Three ways to practice" width="100%" height="1420"\n')
w('        style="width:100%;border:0;overflow:hidden" scrolling="no"\n')
w('        loading="lazy"></iframe>\n')
w("```\n\n")
w("The page sends its own height, so Canvas resizes it. The 1420 is only the fallback ")
w("before the first message arrives.\n\n")
w("---\n\n")

w("## Option B. One card, pasted straight onto a page\n\n")
w("No iframe. These are plain inline styled links, so they survive the Canvas editor ")
w("and they stay readable on a phone. Paste one into the HTML editor wherever you ")
w("want the button to sit.\n\n")

for c in CARDS:
    w("### %s\n\n" % c["title"])
    w("Goes to `%s`.\n\n" % c["file"])
    w("```html\n%s\n```\n\n" % card(c))

w("---\n\n")
w("## Option C. All three in a row, no iframe\n\n")
w("Wraps to two, then one, as the screen narrows.\n\n")
w("```html\n%s\n```\n\n" % row(CARDS))

w("---\n\n")
w("## Option D. The rendered PNG as the button\n\n")
w("If you would rather drop in the picture: upload the PNG to Canvas Files, insert ")
w("it on the page, then switch to the HTML editor and wrap it in the link below. ")
w("Replace the placeholder with the file URL Canvas gives the image.\n\n")
w("The alt text matters. A bare image link reads as the filename to a screen reader, ")
w("which tells a student nothing.\n\n")
for c in CARDS:
    w("**%s**\n\n```html\n%s\n```\n\n" % (c["title"], img_button(c)))

w("PNG files in the drop:\n\n")
for c in CARDS:
    w("- `%s`, the %s card on its own\n" % (c["png"], c["title"]))
w("- `button-all-four.png`, the old four card image. It still shows Study With Me, so do not use it until it is re-rendered with three cards\n\n")

w("---\n\n")
w("## Back to modules\n\n")
w("The standalone page already carries a Back to Canvas modules button pointing at\n\n")
w("```\n%s\n```\n\n" % MODULES)
w("The single cards in Option B and Option C do not, on purpose. They sit on a Canvas ")
w("page, so the student is already in Canvas.\n")

path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "CANVAS-STUDY-BUTTONS.md")
open(path, "w", encoding="utf-8").write(out.getvalue())
print("wrote", path, len(out.getvalue()), "bytes")
