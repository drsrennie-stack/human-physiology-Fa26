# -*- coding: utf-8 -*-
"""Builds the front door (index.html) and the off Canvas course home (course.html).

THE DOOR. index.html is now a door and nothing else. Students arriving at the
site root get one question answered, which is where do I go, and two honest
answers: the website, or Canvas, with the same material in both. It carries no
week list, no deadlines and no study tools, because the old index.html carried
all three and that is the page students said sent them in circles.

THE HOME. course.html is the off Canvas mirror of the Canvas modules page. Same
order, same names, same steps. A student who prefers a website gets the course
without Canvas; a student who prefers Canvas never has to see this page.
"""

import io, os, datetime
import kit
from kit import esc, SITE, MODULES, CANVAS
from weeks import WEEKS, PARTS, LIVE, STEPS, pretty, span

OUT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# ---------------------------------------------------------------- START HERE
# Same eight items as the Canvas START HERE module, in the same order, so a
# student who switches between the two never has to relearn the list.
START_HERE = [
    dict(t="How grading works", f="how-grading-works.html",
         d="The four categories, what is not graded, and the scale."),
    dict(t="Textbook, Mastering A&P, Pearson", f="access-pearson.html",
         d="What you are buying, the whole path through Canvas, and what to do when it goes wrong."),
    dict(t="Syllabus and course policies", f="syllabus-fall2026.html",
         d="The full syllabus, including attendance, late work and accommodations."),
    dict(t="Weekly schedule", f="course-schedule.html",
         d="All fifteen weeks with their dates and what each one covers."),
    dict(t="AI use in this course", f="ai-in-this-course.html",
         d="Where you can use it, where you cannot, and how to log it."),
    dict(t="Scholar Points", f="scholar-points.html",
         d="Up to 2.5 percent on your final grade for studying with other people."),
    dict(t="Week 1 discussion: your digital vision board", f="assignment-discussion-01-visionboard.html",
         d="Your introduction to the class. Graded, 10 points."),
    dict(t="How every week works", f="how-every-week-works.html",
         d="The eight steps, in order, the same every week whatever the topic."),
]

ARROW = ('<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
         '<path d="M5.5 2 12 8l-6.5 6" fill="none" stroke="currentColor" stroke-width="2.2" '
         'stroke-linecap="round" stroke-linejoin="round"/></svg>')
LOCK = ('<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
        '<rect x="3.2" y="7" width="9.6" height="7" rx="1.6" fill="none" stroke="currentColor" '
        'stroke-width="1.6"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" '
        'stroke="currentColor" stroke-width="1.6"/></svg>')

HOME_CSS = """
/* THE COURSE HOME, Sep 16 2026.
   It mirrors the Canvas modules in content and in navigation, same items in
   the same order under the same names, but it is not a copy of Canvas to look
   at. Her note: make it pretty, like the rest of her pages. So START HERE is a
   card grid, each open week is a white card with its eight steps numbered in
   gold, and the weeks that have not opened sit quietly underneath in a smaller
   grid rather than taking the same visual weight as the week someone is
   actually working. */

.modhead{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin:36px 0 14px}
.modhead h2{font-family:var(--display);font-size:13px;font-weight:800;letter-spacing:.2em;
  text-transform:uppercase;color:var(--maroon);margin:0}
.modhead .sub{margin:0;font-size:14.5px;color:var(--ink-soft)}

/* ---- START HERE, a compact list ---- */
/* Her note, Sep 16: eight cards is too many cards. These are eight short
   readings, so they are a list of eight lines. */
.rows{list-style:none;margin:0;padding:0;background:#fff;border-radius:12px;
  box-shadow:0 1px 3px rgba(11,21,48,.08);overflow:hidden}
.rows > li{margin:0;border-top:1px solid var(--line)}
.rows > li:first-child{border-top:0}
.rowlink{display:flex;align-items:center;gap:14px;min-height:56px;padding:12px 18px;
  text-decoration:none;color:var(--navy)}
a.rowlink:hover{background:var(--navy-tint)}
.rowlink .t{flex:0 0 auto;font-family:var(--display);font-weight:800;font-size:15.5px;
  letter-spacing:-.015em;line-height:1.3}
.rowlink .d{flex:1 1 auto;min-width:0;font-size:14px;color:var(--ink-soft);line-height:1.4}
.rowlink .go{flex:none;color:var(--maroon)}
@media (max-width:760px){
  .rowlink{align-items:flex-start;flex-wrap:wrap;gap:4px 14px;padding:14px 18px}
  .rowlink .t{flex:1 1 100%}
  .rowlink .d{flex:1 1 100%}
  .rowlink .go{position:absolute;right:18px}
  .rows > li{position:relative}
}

/* ---- the dark signature band ---- */
.band{background:var(--navy-deep);color:var(--bone);border-radius:14px;
  padding:30px 32px 32px;margin:34px 0 0}
.band .eyebrow{color:var(--gold);margin:0 0 9px}
.band h2{color:#fff;font-size:clamp(20px,2.8vw,26px);margin:0 0 10px}
.band p{color:var(--bone);margin:0 0 16px;max-width:64ch}
.band .btns{display:flex;flex-wrap:wrap;gap:10px;margin:0}
.band .b{display:inline-flex;align-items:center;gap:9px;min-height:48px;padding:13px 22px;
  border-radius:8px;text-decoration:none;font-weight:800;font-size:14px;
  background:var(--gold);border:2px solid var(--gold);color:var(--gold-ink)}
.band a.b:hover{background:#E0BC6C;border-color:#E0BC6C;color:var(--gold-ink)}
.band .b.sec{background:transparent;border-color:var(--gold);color:var(--gold)}
.band a.b.sec:hover{background:var(--gold);color:var(--gold-ink)}
.band :focus-visible{outline-color:var(--gold)}

/* ---- an open week, collapsible ----
   Her note, Sep 16: make the week collapsible from the Open now header.
   A native details and summary rather than a scripted panel, so it keeps
   keyboard support and the right semantics with no JavaScript, and it still
   works if a script never runs. The current week starts open and the earlier
   one starts closed. */
.wk{background:#fff;border-radius:14px;box-shadow:0 1px 3px rgba(11,21,48,.08);
  margin:16px 0 0;overflow:hidden}
.wk > summary{list-style:none;cursor:pointer;display:flex;align-items:flex-start;
  gap:14px;flex-wrap:wrap;padding:22px 26px;transition:background 160ms ease}
.wk > summary::-webkit-details-marker{display:none}
.wk > summary:hover{background:var(--navy-tint)}
.wk > summary:focus-visible{outline:3px solid var(--maroon);outline-offset:-3px}
.wkhead{flex:1 1 300px;min-width:0}
.wkhead .lab{font-size:10.5px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;
  color:var(--maroon);margin:0 0 6px}
.wkhead h3{font-family:var(--display);font-size:clamp(19px,2.4vw,24px);font-weight:800;
  letter-spacing:-.022em;margin:0;line-height:1.16}
.wkhead .dates{margin:8px 0 0;font-size:14.5px;color:var(--ink-soft);max-width:60ch}
.wkright{flex:0 0 auto;display:flex;align-items:center;gap:12px}
.open{font-family:var(--display);font-size:10.5px;font-weight:800;letter-spacing:.18em;
  text-transform:uppercase;color:#fff;background:var(--maroon);border-radius:999px;
  padding:7px 14px}
.chev{color:var(--maroon);display:flex;transition:transform 200ms ease}
.wk[open] > summary .chev{transform:rotate(180deg)}
.wkbody{padding:0 26px 22px}
.wkopen{display:inline-flex;align-items:center;gap:8px;min-height:44px;
  font-size:10.5px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;
  color:var(--maroon);text-decoration:none}
.wkopen:hover{text-decoration:underline}
.wsteps{list-style:none;margin:8px 0 0;padding:14px 0 0;border-top:1px solid var(--line);
  display:grid;gap:2px}
.wsteps > li{margin:0}
.wstep{display:flex;align-items:center;gap:14px;min-height:54px;padding:8px 10px;
  border-radius:10px;text-decoration:none;color:var(--navy)}
a.wstep:hover{background:var(--navy-tint)}
.wstep .n{flex:0 0 auto;width:34px;height:34px;border-radius:999px;background:var(--gold);
  color:var(--gold-ink);font-family:var(--body);font-weight:800;font-size:15px;
  display:flex;align-items:center;justify-content:center}
.wstep .l{flex:1 1 auto;min-width:0;font-weight:700;font-size:15.5px;line-height:1.3}
.wstep .go{flex:none;color:var(--maroon)}
@media (prefers-reduced-motion:reduce){.chev{transition:none}}

/* ---- weeks that have not opened ---- */
.later{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:12px;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))}
.later > li{margin:0}
.lcard{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(11,21,48,.06);
  padding:16px 18px;display:flex;align-items:flex-start;gap:12px}
.lcard .lk{flex:0 0 auto;color:var(--ink-soft);margin-top:2px}
.lcard .lt{font-family:var(--display);font-weight:800;font-size:15px;letter-spacing:-.015em;
  color:var(--ink-soft);display:block;line-height:1.25}
.lcard .ld{display:block;font-size:13.5px;color:var(--ink-soft);margin-top:3px;line-height:1.45}
.lcard .lw{display:block;font-size:10.5px;font-weight:800;letter-spacing:.16em;
  text-transform:uppercase;color:var(--maroon);margin-top:7px}

.partline{font-family:var(--display);font-size:12px;font-weight:800;letter-spacing:.16em;
  text-transform:uppercase;color:var(--ink-soft);margin:30px 0 4px}
"""


def rowlink(item):
    return ('<li><a class="rowlink" href="%s"><span class="t">%s</span>'
            '<span class="d">%s</span><span class="go">%s</span></a></li>'
            % (item["f"], esc(item["t"]), esc(item["d"]), ARROW))


CHEV = ('<svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
        '<path d="M3 5.5 8 10.5l5-5" fill="none" stroke="currentColor" stroke-width="2.2" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg>')


def open_week(w, expanded):
    """An open week. The header is the toggle, so a student can fold a week
    they are done with. Same items, same order, same names as the Canvas
    module."""
    steps = "".join(
        '<li><a class="wstep" href="%s"><span class="n">%s</span>'
        '<span class="l">%s</span><span class="go">%s</span></a></li>'
        % (f, esc(n), esc(t), ARROW)
        for n, t, f in STEPS.get(w["key"], []))
    return (
'<details class="wk"%(op)s>'
'<summary><div class="wkhead">'
'<p class="lab">%(label)s</p><h3>%(title)s</h3><p class="dates">%(dates)s%(note)s</p>'
'</div><span class="wkright"><span class="open">Open now</span>'
'<span class="chev">%(chev)s</span></span></summary>'
'<div class="wkbody">'
'<a class="wkopen" href="%(key)s-overview.html">The whole week on one page %(arrow)s</a>'
'<ol class="wsteps" role="list">%(steps)s</ol>'
'</div></details>'
    ) % dict(op=" open" if expanded else "", label=esc(w["label"]),
             title=esc(w["title"]), dates=esc(span(w)),
             note=(". " + esc(w["note"])) if w.get("note") else "",
             key=w["key"], arrow=ARROW, chev=CHEV, steps=steps)


def later_week(w):
    return ('<li><div class="lcard"><span class="lk">%s</span><span>'
            '<span class="lt">%s. %s</span><span class="ld">%s</span>'
            '<span class="lw">Opens %s</span></span></div></li>'
            % (LOCK, esc(w["label"]), esc(w["title"]), esc(span(w)),
               esc(pretty(w["opens"]))))


def build_home():
    out = []
    out.append('<p class="lede">The whole course, in the order you do it. It is the '
               'same material as Canvas, under the same names, so you can switch '
               'between the two whenever you like without losing your place.</p>')

    out.append('<div class="modhead"><h2>Start here</h2>'
               '<p class="sub">Read these once, before Week 1 work is due.</p></div>')
    out.append('<ul class="rows" role="list">%s</ul>'
               % "".join(rowlink(i) for i in START_HERE))

    out.append(
'<section class="band">'
'<p class="eyebrow">However you take it</p>'
'<h2>Every week runs the same eight steps.</h2>'
'<p>The topic changes, the procedure does not. Once you have done one week you '
'already know how to do the rest, which means your attention goes on the '
'physiology instead of on figuring out what I want.</p>'
'<div class="btns">'
'<a class="b" href="how-every-week-works.html">How every week works</a>'
'<a class="b sec" href="course-tools.html">All the study tools</a>'
'</div></section>')

    for part in sorted(PARTS):
        rows = [w for w in WEEKS if w["part"] == part]
        if not rows:
            continue
        out.append('<p class="partline">%s</p>' % esc(PARTS[part]))
        live = [w for w in rows if w["key"] in LIVE]
        later = [w for w in rows if w["key"] not in LIVE]
        for w in live:
            out.append(open_week(w, expanded=(w is live[-1])))
        if later:
            out.append('<ul class="later" role="list">%s</ul>'
                       % "".join(later_week(w) for w in later))

    body = "\n".join(out) + """
<section class="band" style="margin-top:34px">
  <p class="eyebrow">Turning work in</p>
  <h2>Assignments still go through Canvas.</h2>
  <p>Whichever side you work on, anything graded is submitted in Canvas. When a
    step ends in an upload it will hand you over for that one thing and bring you
    straight back.</p>
  <div class="btns">
    <a class="b sec" href="%s" target="_blank" rel="noopener">Open Canvas<span class="vh"> (opens in a new tab)</span></a>
  </div>
</section>
""" % MODULES

    page = kit.page(
        slug="course-home", title="Course home", eyebrow="Human Physiology \u00b7 Fall 2026",
        h1="Your course,", h1_tail="start to finish.",
        blurb="Start here reading, then the weeks in order. Week 1 and Weeks 2 and 3 are open now.",
        body=body, wide=True, home_is_self=True, extra_css=HOME_CSS)
    io.open(os.path.join(OUT, "course.html"), "w", encoding="utf-8").write(page)
    print("course.html            %6d bytes" % len(page))


# ------------------------------------------------------------------- the door
DOOR = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BIO 005 Human Physiology &middot; Yuba College, Fall 2026</title>
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brand.css">
<meta name="description" content="BIO 005 Human Physiology, Yuba College, Fall 2026. The course runs in Canvas and on this website, with the same material in both. Pick whichever one you prefer.">
<style>
%(tokens)s
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0}
body{font-family:var(--body);background:var(--offwhite);color:var(--navy);
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2{font-family:var(--display);font-weight:800;letter-spacing:-.022em;margin:0}
em,i{font-style:normal;color:var(--maroon)}
a{color:var(--maroon);text-underline-offset:3px}
:focus-visible{outline:3px solid var(--maroon);outline-offset:3px;border-radius:3px}
[hidden]{display:none!important}
.vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0 0 0 0);white-space:nowrap;border:0}
.wrap{max-width:1000px;margin:0 auto;padding:0 20px}

/* brand bar, the same one every page carries */
.brandbar{background:#fff;border-bottom:1px solid var(--line);padding:13px 0}
.brandbar .wrap{display:flex;align-items:center;gap:11px;flex-wrap:wrap}
.mark{display:flex;align-items:center;gap:9px;text-decoration:none}
.wm{display:block;font-family:var(--display);font-size:16px;font-weight:800;
  color:var(--navy);letter-spacing:-.02em;line-height:1.05}
.wm b{color:var(--maroon);font-weight:800}
.wmsub{display:block;font-family:var(--body);font-size:8px;font-weight:700;
  letter-spacing:.3em;text-transform:uppercase;color:var(--ink-soft);margin-top:3px}
.course{margin-left:auto;font-family:var(--body);font-size:9.5px;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;color:var(--ink-soft)}

.door{padding:58px 0 20px;text-align:center}
.door .bigmark{margin:0 0 24px}
.eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;
  color:var(--maroon);margin:0 0 12px}
.door h1{font-size:clamp(32px,6vw,52px);line-height:1.08;margin:0 auto;max-width:14ch}
.door h1 span{color:var(--maroon)}
.door .term{margin:16px auto 0;font-size:17px;color:var(--ink-soft);max-width:52ch}
.enter{
  display:inline-flex;align-items:center;gap:11px;min-height:60px;margin:32px 0 0;
  padding:17px 34px;border-radius:8px;background:var(--maroon);
  border:2px solid var(--maroon);color:#fff;text-decoration:none;
  font-family:var(--body);font-weight:800;font-size:17px;letter-spacing:.01em;
  transition:background 160ms ease
}
a.enter:hover{background:var(--maroon-dark);border-color:var(--maroon-dark);color:#fff}
.newtab{margin:12px 0 0;font-size:14px;color:var(--ink-soft)}

/* the dark band, the same signature panel the site uses */
.panel{background:var(--navy-deep);color:var(--bone);padding:40px 0 44px;margin:44px 0 0}
.panel .eyebrow{color:var(--gold)}
.panel h2{color:#fff;font-size:clamp(21px,3vw,27px);margin:0 0 12px}
.panel p{color:var(--bone);margin:0 0 14px;max-width:62ch}
.panel .canvas{
  display:inline-flex;align-items:center;gap:9px;min-height:48px;margin:8px 0 0;
  padding:13px 24px;border-radius:8px;background:transparent;border:2px solid var(--gold);
  color:var(--gold);text-decoration:none;font-weight:800;font-size:14px;
  letter-spacing:.02em;transition:background 160ms ease
}
.panel a.canvas:hover{background:var(--gold);color:var(--gold-ink)}
.panel :focus-visible{outline-color:var(--gold)}

footer{background:var(--navy-deep);color:var(--bone);padding:0 0 36px}
footer .fleg{margin:0;font-size:13px;color:var(--bone);opacity:.86}
footer .who{font-family:var(--display);font-weight:800;color:#fff;margin:0 0 4px;font-size:15px}
footer a{color:var(--bone)}
footer a:hover{color:var(--gold)}

@media (max-width:620px){.course{margin-left:0;flex-basis:100%%}.door{padding:40px 0 16px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
</head>
<body>

<div class="brandbar"><div class="wrap">
  <a class="mark" href="course.html">%(mark)s
    <span><span class="wm">BIO <b>005</b></span><span class="wmsub">Human Physiology</span></span>
  </a>
  <span class="course">Yuba College &middot; Fall 2026</span>
</div></div>

<main class="door" id="main"><div class="wrap">

  <div class="bigmark">%(bigmark)s</div>

  <p class="eyebrow">Yuba College &middot; Fall 2026</p>
  <h1>BIO 005 <span>Human Physiology.</span></h1>
  <p class="term">%(term)s</p>

  <a class="enter" id="enter" href="course.html">
    <span id="enterLabel">Enter the course</span>
    <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5.5 2 12 8l-6.5 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
  <p class="newtab" id="enterNote" hidden>This leaves Canvas and opens the course website, with its own navigation. Your browser Back button brings you back to Canvas.</p>

</div></main>

<script>
/* THE DOOR BREAKS OUT OF THE FRAME, PROPERLY.
   A plain relative link loads course.html inside the Canvas frame, so the
   student is still on a Canvas page and it looks like the button did nothing.
   Sep 15 2026: Scrubs hit that. Sep 16: she is right that a framed page can
   leave, and this is how. target="_top" navigates the whole browser window,
   not the frame, so one click takes the student out of Canvas entirely and
   onto the course website, where the site's own navigation takes over. Back
   returns them to Canvas whenever they want it.

   _top rather than _blank on purpose: she asked for the alternate route to
   live outside Canvas, and a new tab leaves them straddling both. */
(function(){
  var framed = false;
  try { framed = (window.top !== window.self); } catch(e){ framed = true; }
  if(!framed) return;
  var a = document.getElementById("enter");
  a.setAttribute("href", "%(site)scourse.html");
  a.setAttribute("target", "_top");
  document.getElementById("enterLabel").textContent = "Enter the course website";
  document.getElementById("enterNote").hidden = false;
}());
</script>

<section class="panel"><div class="wrap">
  <p class="eyebrow">If you would rather use Canvas</p>
  <h2>You can. It is the same course.</h2>
  <p>The material is identical in both places, in the same order, under the same
    names. Nothing here is extra credit and nothing there is hidden from this side.</p>
  <p>Assignments are turned in through Canvas whichever one you use, so if a step
    ends in an upload it hands you to Canvas for that one thing.</p>
  <p><a class="canvas" href="%(modules)s" target="_blank" rel="noopener">Go to the Canvas modules<span class="vh"> (opens in a new tab)</span></a></p>
</div></section>

<footer><div class="wrap">
  <p class="who">Dr. Sharilyn Rennie</p>
  <p class="fleg">Stuck on either side? Tell me in the
    <a href="virtual-office.html">Virtual Office</a> and I will fix it.</p>
</div></footer>

</body>
</html>
"""

def build_door():
    term = "Week 1 and Weeks 2 and 3 are open. Week 4 opens Monday, September 28."
    bigmark = kit.MARK.replace('width="22" height="26"', 'width="52" height="62"')
    s = DOOR % dict(tokens=kit.TOKENS, modules=MODULES, term=term, site=SITE,
                    mark=kit.MARK, bigmark=bigmark)
    io.open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(s)
    print("index.html             %6d bytes" % len(s))


if __name__ == "__main__":
    build_home()
    build_door()
