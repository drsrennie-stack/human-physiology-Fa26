# -*- coding: utf-8 -*-
"""
Design kit for the BIO 005 off Canvas site.

FORKED FROM virtual-office.html, Sep 15 2026. That page is the reference for
this site and the rule is to fork it rather than invent a layout. The first
version of this kit invented one, and lost the brand: the three figure mark,
the two tone wordmark, the two tone headline, the dark navy signature panel,
the gold dot footer. This version carries all of it.

BRAND OF RECORD, Sep 6 2026, from the live medmasterscollaborative.com system:
  navy #0B1530, navy-deep #060A18, navy-tint #ECEFF4, maroon #8B3A2E,
  maroon-dark #6E2D24, gold #C9A14A, gold-deep #8A6D33, white cards,
  off-white #FAFAF9 page, bone #F5F1E8 on the dark band only.
  Open Sans 800 for headlines. Plus Jakarta Sans for everything else.
  The three figure mark runs navy, maroon, gold, and the third figure is gold.
  Gold never carries text or a border on a light page. Use gold-deep there.
  No italics. No decorative bars closing a section. White cards lift off the
  page with a shadow, never a border.

ONE FILE, TWO HOMES. Every page works on the site and inside a Canvas iframe:
  - opened directly it carries the full chrome, sticky brand bar and the dark
    footer, exactly like virtual-office.html.
  - inside a Canvas iframe the site chrome comes off and one gold Back to
    Canvas modules button takes its place, because Canvas already wraps the
    page in its own navigation and two sets of menus is what sent students in
    circles.
The page ships with both and removes the wrong one in a synchronous script
before paint, so nothing flickers. If that script never runs the site chrome
is what stays, because a student stranded on the open web is the worse case.
"""

import io, os, html

HERE = os.path.dirname(os.path.abspath(__file__))

SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616/"
MODULES = CANVAS + "modules"
HOME = "course.html"

# HER mark, the blocky one: three circle heads over three rounded rectangle
# bodies, authored at viewBox 0 0 34 34 in the shared brand bar. Sep 16 2026:
# this used to draw the other figure, the one with the flowing body, which was
# never her logo. The site had been running both since her Sep 8 upload.
# Navy, maroon, gold, left to right, and the third figure is gold.
MARK = ('<svg viewBox="40 10 125 148" width="22" height="26" role="img" '
        'aria-label="BIO 005 Human Physiology, course home"><g transform="translate(22.03,6.53) scale(4.73)"><circle cx="8" cy="8" r="4.2" fill="#0B1530"/><circle cx="17" cy="8" r="4.2" fill="#8B3A2E"/><circle cx="26" cy="8" r="4.2" fill="#C9A14A"/><rect x="5.5" y="15" width="5" height="14" rx="2.5" fill="#0B1530"/><rect x="14.5" y="15" width="5" height="14" rx="2.5" fill="#8B3A2E"/><rect x="23.5" y="15" width="5" height="14" rx="2.5" fill="#C9A14A"/></g></svg>')

# Fallback tokens, identical to assets/brand.css, so a page still renders
# right in a preview or opened straight from disk. On the live site brand.css
# loads first and these repeat the same values.
TOKENS = """:root{
  --navy:#0B1530; --navy-deep:#060A18; --navy-tint:#ECEFF4;
  --gold:#C9A14A; --gold-ink:#060A18; --gold-deep:#8A6D33;
  --maroon:#8B3A2E; --maroon-dark:#6E2D24;
  --white:#FFFFFF; --offwhite:#FAFAF9; --bone:#F5F1E8;
  --ink-soft:#414B5C; --line:rgba(11,21,48,0.16);
  --display:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  --body:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
}"""

PAGE_CSS = """
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0}
html{-webkit-text-size-adjust:100%}
body{
  font-family:var(--body);background:var(--offwhite);color:var(--navy);
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased;
  font-variant-numeric:lining-nums
}
h1,h2,h3{font-family:var(--display);font-weight:800;letter-spacing:-.022em;margin:0}
em,i,cite,dfn,var,address{font-style:normal;color:var(--maroon)}
p{margin:0 0 14px}
a{color:var(--maroon);text-underline-offset:3px}
a:hover{color:var(--maroon-dark)}
:focus-visible{outline:3px solid var(--maroon);outline-offset:3px;border-radius:3px}
[hidden]{display:none!important}
.vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0 0 0 0);white-space:nowrap;border:0}
.skip{position:absolute;left:-9999px;top:0;z-index:90;background:var(--navy);
  color:#fff;padding:12px 18px;font-weight:700;text-decoration:none}
.skip:focus{left:0;top:0}
.wrap{max-width:1000px;margin:0 auto;padding:0 20px}
.wrap.wide{max-width:1160px}

/* ---------- brand bar ---------- */
.brandbar{position:sticky;top:0;z-index:60;background:#fff;
  border-bottom:1px solid var(--line);padding:13px 0}
.brandbar .wrap{display:flex;align-items:center;gap:11px;flex-wrap:wrap}
.mark{display:flex;align-items:center;gap:9px;text-decoration:none}
.wm{display:block;font-family:var(--display);font-size:16px;font-weight:800;
  color:var(--navy);letter-spacing:-.02em;line-height:1.05}
.wm b{color:var(--maroon);font-weight:800}
.wmsub{display:block;font-family:var(--body);font-size:8px;font-weight:700;
  letter-spacing:.3em;text-transform:uppercase;color:var(--ink-soft);margin-top:3px}
.course{margin-left:auto;font-family:var(--body);font-size:9.5px;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;color:var(--ink-soft)}

/* ---------- hero ---------- */
.back{display:inline-block;margin:22px 0 0;font-size:10.5px;font-weight:700;
  letter-spacing:.24em;text-transform:uppercase;text-decoration:none;color:var(--maroon)}
.back:hover{text-decoration:underline}
.eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;
  color:var(--maroon);margin:0 0 10px}
.hero{padding:14px 0 30px}
.hero h1{font-size:clamp(28px,5vw,42px);line-height:1.12;max-width:18ch}
.hero h1 span{color:var(--maroon)}
.lede{margin-top:14px;color:var(--ink-soft);max-width:60ch;font-size:17px}

/* ---------- framed inside Canvas ----------
   One class on <html>, set before paint, switches the whole chrome. It has to
   be a class rather than the hidden attribute on each element: the script runs
   in the middle of the document, so the footer is not parsed yet and setting
   .hidden on it silently did nothing. A class on the root element applies to
   everything, whenever it gets parsed. */
.framed #siteBar,.framed #siteBack,.framed #siteFoot{display:none}
.framed #frameHead{display:block}
#frameHead{display:none}
.framehead{padding:20px 0 6px}
.chip-back{
  display:inline-flex;align-items:center;gap:8px;min-height:46px;
  background:var(--gold);border:2px solid var(--gold);color:var(--gold-ink);
  border-radius:999px;padding:9px 18px;text-decoration:none;
  font-family:var(--body);font-weight:800;font-size:13.5px
}
.chip-back:hover{background:var(--gold-deep);border-color:var(--gold-deep);color:#fff}

/* ---------- cards ---------- */
main{padding:0 0 10px}
.card{
  background:#fff;border:0;border-radius:12px;padding:24px 26px;margin:0 0 18px;
  box-shadow:0 1px 3px rgba(11,21,48,.08);
  transition:transform 200ms ease,box-shadow 200ms ease
}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(11,21,48,.10)}
.card > :first-child{margin-top:0}
.card > :last-child{margin-bottom:0}
.card h2{font-size:clamp(19px,2.4vw,23px);margin:0 0 8px}
.card h3{font-size:17px;margin:22px 0 6px}
.card p{margin:0 0 13px;max-width:68ch}
.card p.lede{margin:0 0 16px}
.card b{color:var(--maroon-dark);font-weight:800}
.card ul,.card ol{margin:0 0 14px;padding-left:20px}
.card li{margin:0 0 9px;max-width:66ch}
.card table{border-collapse:collapse;width:100%;margin:0 0 6px;font-size:15px}
.card th,.card td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);
  vertical-align:top}
.card th{font-family:var(--display);font-weight:800;font-size:12px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--ink-soft)}
.tablewrap{overflow-x:auto;margin:0 0 14px}

/* ---------- numbered steps: big numbers, Plus Jakarta Sans ----------
   Her note, Sep 15 2026: a numbered list gets big numbers and Jakarta. The
   numeral is the body face at 800, not the headline face, and the circle is
   44px so it reads as a step marker across the room rather than a bullet.
   Gold ground with near black ink is 7.6:1, which clears AAA. */
.steps{list-style:none;margin:18px 0 6px;padding:0;counter-reset:hstep;
  display:grid;gap:20px}
.steps.two{grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px 32px}
/* The number is positioned, not a flex item. A flex li turns every inline
   child into its own column, which broke a step written as "<b>Label.</b>
   then the sentence" into two ragged columns. Absolute keeps the text flowing
   as ordinary text however the step is written. */
.steps > li{position:relative;padding-left:62px;min-height:46px;margin:0;max-width:74ch}
.steps > li::before{
  content:counter(hstep);counter-increment:hstep;
  position:absolute;left:0;top:0;
  width:44px;height:44px;border-radius:999px;
  background:var(--gold);color:var(--gold-ink);
  font-family:var(--body);font-weight:800;font-size:20px;line-height:44px;
  text-align:center
}
.steps > li > :first-child{margin-top:0}
.steps > li > :last-child{margin-bottom:0}
.steps > li h3{font-size:16px;margin:0 0 5px;padding-top:9px}
.steps > li h3 + p{margin-top:0}

/* ---------- buttons ----------
   Sep 16 2026. The secondary button used to be an outline: white fill, navy
   border, navy text. Her note was that it does not read as a button, and she
   is right, an empty box on a near-white page is a box. There are no clear
   buttons on this site now. Every button is a solid block of color with cream
   text, lifted off the page on a shadow at rest and lifting further on hover,
   which is what the cards already do.

   Two colors, and the color says which kind of thing it is. Darker terra
   cotta is the action the page was built for. Very dark navy is everything
   else. Cream on maroon-dark is 9.03 to 1 and cream on navy is 16.0 to 1,
   both past AAA at this size.

   Navy here is #0B1530, not navy-deep #060A18. Navy-deep reads as black on a
   screen, which was her note, so it is kept for ink on gold and nothing else. */
.btns{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 0}
.btn{
  display:inline-flex;align-items:center;gap:9px;min-height:46px;padding:13px 22px;
  border-radius:8px;text-decoration:none;font-family:var(--body);
  font-weight:800;font-size:14px;letter-spacing:.02em;
  background:var(--maroon-dark);border:none;color:var(--bone);
  box-shadow:0 6px 14px -5px rgba(11,21,48,.45),0 2px 5px -2px rgba(11,21,48,.30);
  transition:background 160ms ease,transform 200ms ease,box-shadow 200ms ease
}
a.btn:hover,a.btn:focus-visible{
  background:#5C2520;color:var(--bone);transform:translateY(-2px);
  box-shadow:0 14px 26px -8px rgba(11,21,48,.46),0 4px 9px -3px rgba(11,21,48,.30)
}
.btn.sec{background:var(--navy);color:var(--bone)}
a.btn.sec:hover,a.btn.sec:focus-visible{background:#1A2A4E;color:var(--bone)}

/* ---------- the graded strip ---------- */
.graded{
  margin:18px 0 0;padding:13px 16px;border-radius:8px;background:var(--navy-tint);
  color:var(--navy);font-size:14.5px;line-height:1.55;max-width:none
}
.graded b{color:var(--maroon-dark)}

/* ---------- footer, the dark band ---------- */
footer{background:var(--navy);color:var(--bone);padding:30px 0 36px;margin-top:40px}
footer a{color:var(--bone);text-decoration:underline}
footer a:hover{color:var(--gold)}
footer :focus-visible{outline-color:var(--gold)}
.flinks{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;font-size:14px}
.dot{color:var(--gold)}
.fleg{margin:16px 0 0;font-size:13px;color:var(--bone);max-width:74ch;opacity:.86}

@media (max-width:620px){
  .course{margin-left:0;flex-basis:100%}
  .card{padding:20px 20px}
  .steps > li{padding-left:54px}
  .steps > li::before{width:38px;height:38px;font-size:18px;line-height:38px}
}
@media (prefers-reduced-motion:reduce){
  *{transition:none!important;animation:none!important}
  .card:hover{transform:none}
}
@media print{
  .skip,.brandbar,.back,.framehead,footer{display:none}
  body{background:#fff;font-size:10pt}
  .card{box-shadow:none;border-top:1px solid #000;border-radius:0;padding:8pt 0;
    break-inside:avoid;page-break-inside:avoid}
  .steps > li::before{background:#fff;color:#000;border:1px solid #000}
  h1,h2,h3{break-after:avoid;page-break-after:avoid}
  a{color:#000;text-decoration:none}
}
"""

# THE TOOLS LIVE HERE, NOT ON EVERY PAGE. Sep 16 2026.
# The old floating dock rode on every page, which is part of what sent students
# in circles, and inside a Canvas frame it is actively wrong: Canvas already
# wraps the page in navigation. So the tools are a destination, reachable three
# ways and no more: the Course Tools item in the Canvas module, the button on
# the course home, and this footer link, which puts them one click from any
# site page without any floating chrome. The step pages get nothing, because a
# step page has one job. Step 4 is the exception that proves it: it carries the
# four study buttons inline, because that is the step where a student is
# actually choosing how to practice.
FOOTER = """<footer><div class="wrap">
  <nav class="flinks" aria-label="Course links">
    <a href="course.html">Course home</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="course-schedule.html">Schedule</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="syllabus-fall2026.html">Syllabus</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="how-every-week-works.html">How every week works</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="course-tools.html">Course tools</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="ai-in-this-course.html">AI in this course</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="accessibility.html">Accessibility</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="virtual-office.html">Virtual Office</a><span class="dot" aria-hidden="true">&middot;</span>
    <a href="%(canvas)s" target="_blank" rel="noopener">Canvas<span class="vh"> (opens in a new tab)</span></a>
  </nav>
  <p class="fleg">BIO 005 Human Physiology &middot; Fall 2026 &middot; Dr. Sharilyn Rennie<br>
     If a page does not work for you, tell me in the Virtual Office and I will fix it.</p>
</div></footer>""" % dict(canvas=CANVAS)


def esc(t):
    return html.escape(t, quote=False)


def p(t, cls=""):
    return '<p%s>%s</p>' % ((' class="%s"' % cls) if cls else "", t)


def card(*blocks):
    return '<section class="card">%s</section>' % "".join(blocks)


def steps(items, two=False):
    """A numbered list. Big gold numerals in Plus Jakarta Sans."""
    cls = "steps two" if two else "steps"
    return '<ol class="%s" role="list">%s</ol>' % (
        cls, "".join("<li>%s</li>" % i for i in items))


def ul(items):
    return "<ul>" + "".join("<li>%s</li>" % i for i in items) + "</ul>"


def btn(label, href, primary=True, newtab=False, top=False):
    cls = "btn" if primary else "btn sec"
    if newtab:
        tail = ' target="_blank" rel="noopener"'
        label = label + '<span class="vh"> (opens in a new tab)</span>'
    elif top:
        tail = ' target="_top"'
    else:
        tail = ''
    return '<a class="%s" href="%s"%s>%s</a>' % (cls, href, tail, label)


def btns(*items):
    return '<div class="btns">%s</div>' % "".join(i for i in items if i)


def page(slug, title, eyebrow, h1, h1_tail, blurb, body,
         wide=False, home_is_self=False, extra_css=""):
    """One page that works on the site and inside a Canvas iframe.

    h1 and h1_tail make the two tone headline: h1 sits in navy, h1_tail in
    maroon after it. Pass h1_tail="" for a single tone heading, but almost
    every page should have one, because the color break is what makes the
    headline read as this course rather than as any page on the internet.
    """
    frame_id = "bio005-" + slug
    head = esc(h1) + (' <span>%s</span>' % esc(h1_tail) if h1_tail else "")
    backlink = "" if home_is_self else (
        '<div class="wrap%s"><a class="back" href="%s">&larr; Course home</a></div>'
        % (" wide" if wide else "", HOME))
    w = " wide" if wide else ""
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%(title)s &middot; BIO 005 Human Physiology</title>
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brand.css">
<meta name="description" content="%(desc)s">
<script>
/* Pick the chrome before paint, from the head, so nothing flickers and so the
   footer is covered even though it has not been parsed yet. Inside a Canvas
   iframe the sticky brand bar, the Course home link and the dark footer are
   all wrong, because Canvas already wraps the page in its own navigation, and
   two sets of menus in one screen is what sent students in circles. Opened
   directly they are exactly right. If this never runs the site chrome stays,
   which is the safer failure: a student stranded on the open web is worse
   than one extra link inside Canvas. */
(function(){
  var framed = false;
  try { framed = (window.top !== window.self); } catch(e){ framed = true; }
  if(framed) document.documentElement.className += " framed";
}());
</script>
<style>
%(tokens)s
%(css)s
%(extra)s
</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>

<div class="brandbar" id="siteBar"><div class="wrap%(w)s">
  <a class="mark" href="%(home)s">%(mark)s
    <span><span class="wm">BIO <b>005</b></span><span class="wmsub">Human Physiology</span></span>
  </a>
  <span class="course">BIO 005 &middot; Fall 2026</span>
</div></div>

<div id="siteBack">%(backlink)s</div>

<div class="framehead" id="frameHead"><div class="wrap%(w)s">
  <a class="chip-back" href="%(modules)s" target="_top">
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10.5 2 4 8l6.5 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Back to Canvas modules</a>
</div></div>

<header class="hero"><div class="wrap%(w)s">
  <p class="eyebrow">%(eyebrow)s</p>
  <h1>%(head)s</h1>
  <p class="lede">%(blurb)s</p>
</div></header>

<main id="main"><div class="wrap%(w)s">
%(body)s
</div></main>

<div id="siteFoot">%(footer)s</div>

<script>
/* Iframe height sender. Canvas strips script tags from a pasted page, so the
   Canvas iframe carries a measured height and nothing listens for this. It
   stays for the course site and Kajabi, where a listener does exist. */
(function(){
  var FRAME_ID = "%(frame)s";
  function sendHeight(){
    var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
                     document.body.offsetHeight, document.documentElement.offsetHeight);
    try{ window.parent.postMessage({ id: FRAME_ID, frameId: FRAME_ID, type: "resize", height: h }, "*"); }catch(e){}
  }
  window.addEventListener("load", sendHeight);
  window.addEventListener("resize", sendHeight);
  if(typeof ResizeObserver !== "undefined"){
    try{ new ResizeObserver(sendHeight).observe(document.body); }catch(e){}
  }
  setTimeout(sendHeight, 400);
  setTimeout(sendHeight, 1500);
}());
</script>
</body>
</html>
""" % dict(title=esc(title), desc=esc(blurb), tokens=TOKENS, css=PAGE_CSS,
           extra=extra_css, mark=MARK, home=HOME, backlink=backlink, w=w,
           modules=MODULES, eyebrow=esc(eyebrow), head=head, blurb=esc(blurb),
           body=body, footer=FOOTER, frame=frame_id)
