# -*- coding: utf-8 -*-
"""
Design kit for the BIO 005 Week 1 standalone step pages.

These pages are embedded in Canvas modules as iframes, so they carry the
same rules the Week 1 and Week 2 concept video pages carry:

  - no site chrome. No bio005-nav.js, no Hootie, no course tools dock, no
    floating back widget. Canvas supplies the navigation around the frame.
  - Back to Canvas modules, target _top, is the only way off the page.
  - links go to a PDF, to a Canvas submission page, or to one of the four
    interactive tools that live on the course site and have no PDF
    equivalent: the Reference Range Lab, the Mastery Check, the patient
    case, and the study tools. Nothing else.

The tokens, brandbar and footer are lifted from concept-videos-week01.html
so the two page types cannot drift apart.
"""

import io, os, html

HERE = os.path.dirname(os.path.abspath(__file__))
TOKENS = io.open(os.path.join(HERE, "_tokens.css"), encoding="utf-8").read()
BRANDBAR = io.open(os.path.join(HERE, "_brandbar.html"), encoding="utf-8").read()
FOOTER = io.open(os.path.join(HERE, "_footer.html"), encoding="utf-8").read()

CANVAS_MODULES = "https://yccd.instructure.com/courses/42616/modules"

PAGE_CSS = """
/* Layout */
main{max-width:860px;margin:0 auto;padding:30px max(20px,4vw) 10px}

/* Cards */
.card{
  background:var(--white);border-radius:14px;box-shadow:0 1px 3px rgba(0,0,0,.08);
  padding:24px 26px 26px;margin:0 0 22px
}
.card > :first-child{margin-top:0}
.card > :last-child{margin-bottom:0}
.card h2{
  font-family:var(--display);font-size:19px;font-weight:800;color:var(--navy);
  letter-spacing:-.01em;margin:0 0 4px
}
.card h3{
  font-family:var(--display);font-size:16px;font-weight:800;color:var(--navy);
  letter-spacing:-.01em;margin:22px 0 6px
}
.card p{margin:0 0 13px;font-size:15.5px;line-height:1.62;color:var(--navy)}
.card p.lede{color:var(--navy-72);margin:0 0 16px;max-width:78ch}
.card b{font-weight:800;color:var(--terra-dark)}
.card ul{margin:0 0 14px;padding-left:22px}
.card ul li{margin:0 0 7px;font-size:15.5px;line-height:1.55}

/* The numbered list, same as the second pass directions on the video page.
   Columns when there is room, one column under 760px. The numbers are CSS
   counters off the list, so the sequence stays right if a step is added. */
.steps{
  list-style:none;counter-reset:hstep;margin:0 0 6px;padding:0;
  display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));
  gap:14px 26px
}
.steps.one{grid-template-columns:1fr;gap:14px}
.steps li{
  counter-increment:hstep;position:relative;padding-left:38px;
  font-size:15.5px;color:var(--navy);line-height:1.55
}
.steps li::before{
  content:counter(hstep);position:absolute;left:0;top:-1px;
  width:27px;height:27px;border-radius:50%;
  background:var(--terra);color:#fff;
  font-family:var(--display);font-weight:800;font-size:14px;
  display:flex;align-items:center;justify-content:center
}

/* Buttons */
.btns{display:flex;flex-wrap:wrap;gap:9px;margin:18px 0 0}
.btn{
  display:inline-flex;align-items:center;gap:8px;min-height:46px;
  padding:11px 17px;border-radius:var(--r-card);text-decoration:none;
  font-family:var(--body);font-weight:700;font-size:14.5px;
  background:var(--terra);border:2px solid var(--terra);color:#fff
}
.btn:hover{background:var(--terra-dark);border-color:var(--terra-dark)}
.btn.sec{background:var(--white);border-color:var(--navy);color:var(--navy)}
.btn.sec:hover{background:var(--navy-tint)}
.btn svg{flex:none}
.pending{
  display:inline-flex;align-items:center;min-height:46px;padding:11px 17px;
  border-radius:var(--r-card);background:var(--navy-tint);color:var(--navy-72);
  font-weight:700;font-size:14.5px
}

/* Graded strip and the due line */
.graded{
  margin:18px 0 0;padding:13px 15px;border-radius:var(--r-card);
  background:var(--navy-tint);color:var(--navy);font-size:14.5px;line-height:1.55
}
.graded b{color:var(--terra-dark)}

/* Next step */
.next{
  margin:4px 0 0;padding:16px 18px;border-radius:14px;background:var(--white);
  box-shadow:0 1px 3px rgba(0,0,0,.08);font-size:15px;line-height:1.6;color:var(--navy)
}
.next b{font-weight:800;color:var(--terra-dark)}

@media (max-width:760px){.card{padding:20px 20px 22px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
"""

BACK_SVG = ('<svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
            '<path d="M10.5 2 4 8l6.5 6" fill="none" stroke="currentColor" stroke-width="2.2" '
            'stroke-linecap="round" stroke-linejoin="round"/></svg>')

ICON = {
 "pdf": ('<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">'
         '<path d="M3 1.5h6.5L13 5v9.5H3z" fill="none" stroke="currentColor" stroke-width="1.6" '
         'stroke-linejoin="round"/><path d="M9.3 1.7V5H12.8" fill="none" stroke="currentColor" '
         'stroke-width="1.6" stroke-linejoin="round"/></svg>'),
 "canvas": ('<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">'
            '<path d="M8 11V2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
            '<path d="M4.6 5.6 8 2.2l3.4 3.4" fill="none" stroke="currentColor" stroke-width="1.7" '
            'stroke-linecap="round" stroke-linejoin="round"/>'
            '<path d="M2.4 13.5h11.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'),
 "tool": ('<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">'
          '<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/>'
          '<path d="M6.6 5.4 11 8l-4.4 2.6z" fill="currentColor"/></svg>'),
}


def esc(t):
    return html.escape(t, quote=False)


def p(t, cls=""):
    return '<p%s>%s</p>' % ((' class="%s"' % cls) if cls else "", t)


def ul(items):
    return "<ul>" + "".join("<li>%s</li>" % i for i in items) + "</ul>"


def steps(items, one=False):
    """A numbered list. Use for anything a student does in an order.
    Three or fewer go in one column; in a grid they leave a hole on the
    second row that reads as a missing step."""
    cls = "steps one" if (one or len(items) <= 3) else "steps"
    return '<ol class="%s">%s</ol>' % (cls, "".join("<li>%s</li>" % i for i in items))


def btn(label, href, kind="pdf", primary=True, newtab=True):
    """A link off the page. kind picks the icon and the new tab wording."""
    cls = "btn" if primary else "btn sec"
    tab = ""
    if newtab:
        tab = ' target="_blank" rel="noopener"'
        label_out = label + '<span class="vh"> (opens in a new tab)</span>'
    else:
        tab = ' target="_top"'
        label_out = label
    return '<a class="%s" href="%s"%s>%s%s</a>' % (cls, href, tab, ICON.get(kind, ""), label_out)


def pending(label):
    """A PDF that is not posted yet. Deliberately not a link, so nobody is
    sent to an empty Canvas Files tab to look for it."""
    return '<span class="pending">%s, not posted yet</span>' % esc(label)


def btns(*items):
    return '<div class="btns">%s</div>' % "".join(i for i in items if i)


def card(*blocks):
    return '<section class="card">%s</section>' % "".join(blocks)


def graded(t):
    return '<p class="graded">%s</p>' % t


def page(step, total, title, stage, when, lead, body, nextline):
    """One standalone step page, ready to iframe into a Canvas module."""
    frame_id = "bio005-w1-step-%02d" % step
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BIO 005 Human Physiology | Week 1, Step %(step)d: %(title)s</title>
<link rel="stylesheet" href="assets/fonts-site.css">
<meta name="description" content="%(desc)s">
<style>
%(tokens)s
%(css)s
</style>
</head>
<body>
<a class="skip" href="#main">Skip to this step</a>
%(brandbar)s
<header class="masthead">
  <div class="wrap">
    <p class="eyebrow">BIO 005 &middot; Week 1 &middot; Step %(step)d of %(total)d &middot; %(stage)s</p>
    <h1>%(title)s</h1>
    <p>%(when)s</p>
    <div class="chiprow">
      <a class="chip chip-back" href="%(modules)s" target="_top">%(backsvg)s Back to Canvas modules</a>
    </div>
  </div>
</header>

<main id="main">
%(lead)s
%(body)s
  <p class="next">%(nextline)s</p>
</main>

%(footer)s

<!-- STANDALONE ON PURPOSE. This page sits in a Canvas module as an iframe, so
     it carries no site chrome: no nav bar, no course tools dock, no Hootie, no
     floating back widget. Canvas's own navigation is already around the frame,
     and two sets of menus in one screen is what was sending students in
     circles. Do not add the site scripts to this file. -->
<script>
/* Iframe height sender. Canvas strips script tags from a pasted page, so the
   Canvas iframe carries a fixed height and nothing listens for this. It stays
   for the course site and Kajabi, where a listener does exist. */
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
})();
</script>
</body>
</html>
""" % dict(step=step, total=total, title=esc(title), stage=stage.upper(), when=esc(when),
           lead=lead, body=body, nextline=nextline, tokens=TOKENS, css=PAGE_CSS,
           brandbar=BRANDBAR, footer=FOOTER, modules=CANVAS_MODULES, backsvg=BACK_SVG,
           frame=frame_id, desc=esc("Week 1, Step %d of %d: %s. %s" % (step, total, title, when)))
