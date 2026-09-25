# -*- coding: utf-8 -*-
"""Builds course-tools.html, the course tools dock as its own page.

WHY THIS EXISTS. Sep 15 2026. The tools dock was a floating launcher injected
by bio005-dock.js on every page, which cannot go in a Canvas module. Scrubs
liked the look of it, the dark panel and the gradient icon tiles, so this is
the same design as a flat page she can iframe into Canvas once and be done.

WHAT IS IN IT. Only tools that are their own standalone HTML file. Nothing
here touches Mastery OS, which is out for now. The Practice Exam and Gap
Finder stays, because it is built on physiology and it is standalone.

WHAT IS DELIBERATELY LEFT OUT. Four pages still load bio005-nav.js and so
still carry the old site chrome: accessibility.html, competency-map.html,
clinical-physiology-lab-manual.html and osmosis-iv-fluids-lab.html. Adding
them would put a second set of menus inside the Canvas frame, which is the
exact thing this rebuild is undoing. They go in once they are standalone.
"""

import io, os

SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616/"
MODULES = CANVAS + "modules"
OFFICE = CANVAS + "discussion_topics/711800"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(os.path.dirname(HERE))

# The dock's icon set, unchanged, so the tiles read the same as the dock did.
I = {
 "brain": '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 4 1V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-4 1"/>',
 "cards": '<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 9h6M7 13h4"/><path d="M21 8v9a2 2 0 0 1-2 2"/>',
 "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
 "cal":   '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 "people":'<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.2"/><path d="M22 20v-2a4 4 0 0 0-3-3.8"/>',
 "home":  '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
 "doc":   '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 "pencil":'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 "target":'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
 "flask": '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M6.5 15h11"/>',
 "play":  '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/>',
}

MARK = ('<svg viewBox="40 10 125 148" width="26" height="31" role="img" '
        'aria-label="BIO 005 Human Physiology"><g transform="translate(22.03,6.53) scale(4.73)"><circle cx="8" cy="8" r="4.2" fill="#7E93B8"/><circle cx="17" cy="8" r="4.2" fill="#C06A58"/><circle cx="26" cy="8" r="4.2" fill="#C9A14A"/><rect x="5.5" y="15" width="5" height="14" rx="2.5" fill="#7E93B8"/><rect x="14.5" y="15" width="5" height="14" rx="2.5" fill="#C06A58"/><rect x="23.5" y="15" width="5" height="14" rx="2.5" fill="#C9A14A"/></g></svg>')


def tool(name, sub, url, icon, tone, ext=False):
    return dict(name=name, sub=sub, url=url, icon=icon, tone=tone, ext=ext)


GROUPS = [
 ("Practice", "Getting it back out of your head. None of this is graded.", [
   tool("Rx Cards", "Spaced recall. The ones you miss come back tomorrow",
        "rx-cards.html", "cards", "gold"),
   tool("Brain Dump", "Spin a prompt, do it on paper, then tick off what you left out",
        "competency-brain-dump.html", "brain", "navy"),
   tool("Book problems", "Work them forward, then backward from the answer",
        "assignment-bookproblems.html", "doc", "navy"),
   tool("Three ways to practice", "All three on one page, if you cannot decide",
        "study-buttons.html", "target", "gold"),
 ]),
 ("Check yourself", "Find out what you cannot do yet, while it is still cheap.", [
   tool("Practice Exam and Gap Finder", "Questions on this week's competencies, then the gaps by name",
        "practice-exam.html", "target", "gold"),
   tool("Your patient chart", "The chart you keep all term, one entry a week",
        "patient-chart-book.html", "doc", "terra"),
 ]),
 ("Learn it", "First pass, then second pass in a different color.", [
   tool("Week 1 concept videos", "Every Week 1 video, with its notes PDF",
        "concept-videos-week01.html", "play", "navy"),
   tool("Weeks 2 and 3 concept videos", "All 63 videos for the cell block",
        "concept-videos-week03.html", "play", "terra"),
   tool("Competency Study Guide", "The sheet you fill in both passes",
        "note-sheet.html", "pencil", "gold"),
 ]),
 ("Labs", "Work the page top to bottom. It is built to be worked, not skimmed.", [
   tool("Reference Range Lab", "Where a normal range on a lab report comes from",
        "reference-range-lab.html", "flask", "terra"),
   tool("Amylase lab", "PhysioEx Exercise 8, the enzyme run",
        "enzyme-amylase-lab.html", "flask", "navy"),
 ]),
 ("The course", "Where things are and how the course runs.", [
   tool("Course home", "The whole course as a list", "course.html", "home", "navy"),
   tool("Weekly schedule", "All fifteen weeks with their dates",
        "course-schedule.html", "cal", "navy"),
   tool("How every week works", "The eight steps, whatever the topic is",
        "how-every-week-works.html", "target", "gold"),
   tool("Syllabus", "Policies, dates, exam windows", "syllabus-fall2026.html", "doc", "navy"),
   tool("Scholar Points", "Up to 2.5 percent for studying with other people",
        "scholar-points.html", "people", "gold"),
   tool("Virtual Office", "Ask a question where the whole class sees the answer",
        OFFICE, "people", "terra", ext=True),
   tool("Canvas", "Turn work in, see grades", MODULES, "globe", "navy", ext=True),
 ]),
]


def icon_svg(k):
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" '
            'focusable="false">%s</svg>' % I[k])


def tile(t):
    href = t["url"] if t["ext"] else (SITE + t["url"])
    ext = ('<span class="ext" aria-hidden="true">&#8599;</span>'
           '<span class="vh"> (opens in a new tab)</span>') if t["ext"] else \
          '<span class="vh"> (opens in a new tab)</span>'
    return ('<li><a class="tile" href="%s" target="_blank" rel="noopener">'
            '<span class="ic %s">%s</span>'
            '<span class="tx"><span class="n">%s%s</span><span class="s">%s</span></span>'
            '</a></li>' % (href, t["tone"], icon_svg(t["icon"]), t["name"], ext, t["sub"]))


def group(title, sub, tools):
    return ('<section class="grp" aria-labelledby="g-%s">'
            '<h2 id="g-%s">%s</h2><p class="gs">%s</p>'
            '<ul class="grid" role="list">%s</ul></section>'
            % (title.lower().replace(" ", "-"), title.lower().replace(" ", "-"),
               title, sub, "".join(tile(t) for t in tools)))


PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Course tools &middot; BIO 005 Human Physiology</title>
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<meta name="description" content="Every BIO 005 study tool in one place: Rx Cards, Brain Dump, book problems, the Practice Exam and Gap Finder, the labs, the concept videos and your patient chart.">
<style>
:root{
  --navy:#0B1530; --navy-deep:#060A18; --gold:#C9A14A; --gold-ink:#060A18;
  --maroon:#8B3A2E; --bone:#F5F1E8;
  --display:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  --body:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0}
html{-webkit-text-size-adjust:100%%}
body{
  font-family:var(--body);background:var(--navy-deep);color:#fff;
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased
}
h1,h2{font-family:var(--display);font-weight:800;letter-spacing:-.022em;margin:0}
em,i{font-style:normal}
a{color:var(--gold)}
:focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:4px}
.vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0 0 0 0);white-space:nowrap;border:0}
.skip{position:absolute;left:-9999px;top:0;z-index:90;background:var(--gold);
  color:var(--gold-ink);padding:12px 18px;font-weight:800;text-decoration:none}
.skip:focus{left:0;top:0}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}

/* ---------- head ---------- */
header.top{padding:26px 0 6px}
.brand{display:flex;align-items:center;gap:10px}
.wm{display:block;font-family:var(--display);font-size:16px;font-weight:800;
  color:#fff;letter-spacing:-.02em;line-height:1.05}
.wm b{color:var(--gold);font-weight:800}
.wmsub{display:block;font-family:var(--body);font-size:8px;font-weight:700;
  letter-spacing:.3em;text-transform:uppercase;color:#AEB8C6;margin-top:3px}
.eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;
  color:var(--gold);margin:24px 0 10px}
h1{font-size:clamp(28px,5vw,40px);line-height:1.12;max-width:20ch}
h1 span{color:var(--gold)}
.lede{margin:14px 0 0;color:#C8D0DC;max-width:62ch;font-size:16.5px}
.chip-back{
  display:inline-flex;align-items:center;gap:8px;min-height:46px;margin:20px 0 0;
  background:var(--gold);border:2px solid var(--gold);color:var(--gold-ink);
  border-radius:999px;padding:9px 18px;text-decoration:none;
  font-family:var(--body);font-weight:800;font-size:13.5px
}
.chip-back:hover{background:#E0BC6C;border-color:#E0BC6C;color:var(--gold-ink)}

/* ---------- groups and tiles, lifted from the old dock ---------- */
main{padding:10px 0 20px}
.grp{margin:34px 0 0}
.grp h2{font-size:13px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;
  color:var(--gold);margin:0 0 4px}
.gs{margin:0 0 14px;font-size:14.5px;color:#AEB8C6;max-width:62ch}
.grid{list-style:none;margin:0;padding:0;
  display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%%,250px),1fr));
  gap:12px;align-items:stretch}
.grid > li{display:flex;margin:0}
.tile{
  position:relative;display:flex;align-items:flex-start;gap:12px;width:100%%;
  text-decoration:none;background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.13);border-radius:16px;padding:14px;
  transition:transform .16s ease,background .16s ease,border-color .16s ease
}
.tile:hover{transform:translateY(-2px);background:rgba(255,255,255,.13);
  border-color:var(--gold)}
.ic{flex:0 0 auto;width:42px;height:42px;border-radius:12px;display:flex;
  align-items:center;justify-content:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.4)}
.ic svg{width:21px;height:21px}
.ic.navy{background:linear-gradient(145deg,#31527a,#16294a);color:#fff}
.ic.gold{background:linear-gradient(145deg,#C9A14A,#A87F2E);color:#0B1530}
.ic.terra{background:linear-gradient(145deg,#8B3A2E,#7A3228);color:#fff}
.tx{min-width:0}
.n{display:block;font-family:var(--body);font-weight:800;font-size:14.5px;color:#fff;
  letter-spacing:-.01em;line-height:1.25}
.s{display:block;font-size:12px;line-height:1.4;color:#C8D0DC;margin-top:3px}
.ext{font-size:10px;color:#F2E2B8;margin-left:5px}

footer{border-top:1px solid rgba(255,255,255,.12);margin-top:40px;padding:22px 0 34px}
footer p{margin:0;font-size:13.5px;color:#AEB8C6}
footer .who{font-family:var(--display);font-weight:800;color:#fff;font-size:14.5px;
  margin-bottom:4px}

@media (max-width:620px){header.top{padding:20px 0 4px}}
@media (prefers-reduced-motion:reduce){
  *{transition:none!important;animation:none!important}
  .tile:hover{transform:none}
}
@media print{.skip,.chip-back{display:none}}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to the tools</a>

<header class="top"><div class="wrap">
  <div class="brand">%(mark)s
    <span><span class="wm">BIO <b>005</b></span><span class="wmsub">Human Physiology</span></span>
  </div>
  <p class="eyebrow">Course tools</p>
  <h1>Everything you can <span>practice with.</span></h1>
  <p class="lede">Every tool in the course, in one place. They all open in their
    own tab, because the ones that keep track of your progress can only do that
    properly outside a frame. Close the tab and you are back here.</p>
  <p><a class="chip-back" href="%(modules)s" target="_top">
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10.5 2 4 8l6.5 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Back to Canvas modules</a></p>
</div></header>

<main id="main"><div class="wrap">
%(groups)s
</div></main>

<footer><div class="wrap">
  <p class="who">Dr. Sharilyn Rennie</p>
  <p>BIO 005 Human Physiology &middot; Fall 2026. If a tool does not work for you,
    tell me in the Virtual Office and I will fix it.</p>
</div></footer>

<!-- STANDALONE ON PURPOSE. This page replaces the floating tools dock that
     bio005-dock.js used to inject, which could not live in a Canvas module.
     It carries no site chrome: no nav bar, no dock, no Hootie, no floating
     back widget. Every tool it links to is its own standalone HTML file.
     Mastery OS is deliberately absent. Do not add the site scripts here. -->
<script>
/* Iframe height sender. Canvas strips script tags from a pasted page, so the
   Canvas iframe carries a measured height and nothing listens for this. It
   stays for the course site and Kajabi, where a listener does exist. */
(function(){
  var FRAME_ID = "bio005-course-tools";
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
""" % dict(mark=MARK, modules=MODULES,
           groups="\n".join(group(t, s, x) for t, s, x in GROUPS))

io.open(os.path.join(OUT, "course-tools.html"), "w", encoding="utf-8").write(PAGE)
n = sum(len(x) for _, _, x in GROUPS)
print("course-tools.html %d bytes, %d groups, %d tools" % (len(PAGE), len(GROUPS), n))
