# -*- coding: utf-8 -*-
"""Builds canvas-paste-sheet.html, the copy and paste sheet for Canvas.

FOR SCRUBS, NOT FOR STUDENTS. Sep 16 2026. She could not read the markdown
files, which is fair: a .md full of fenced code blocks is a developer format.
This is the same content as one page she opens in a browser, with a Copy
button on every block, so she never has to select text by hand or find the
start and end of a code fence.

Every height here was measured by rendering the page headless at 900px wide,
about what a Canvas module page gives its content, then adding five percent
and rounding up to the nearest fifty. Canvas strips the script tag out of a
pasted page, so the height sender built into each file never runs inside
Canvas and these fixed numbers are what a student actually gets.

Do not put this page in a Canvas module. It is a worksheet for her.
"""

import io, os, html

SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616/"
MODULES = CANVAS + "modules"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(os.path.dirname(HERE))

BUILT = "September 16, 2026"


def frame(f, h, title):
    """The iframe block, in the same shape as the ones already in Canvas."""
    return (
'<p><iframe style="width: 100%%; min-height: %(h)dpx; border: 1px solid #d9dde3; '
'border-radius: 8px;" src="%(site)s%(f)s" width="100%%" height="%(h)d" '
'title="%(t)s" allow="accelerometer; autoplay; clipboard-write; encrypted-media; '
'gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen" '
'loading="lazy"></iframe></p>'
    ) % dict(h=h, site=SITE, f=f, t=title)


# The Enter the Course Here card, read in so there is one copy of it.
ENTER_CARD = io.open(os.path.join(HERE, "enter-card.html"), encoding="utf-8").read().strip()


def blk(name, code, where="", note=""):
    return dict(name=name, code=code, where=where, note=note)


SECTIONS = [

 ("start", "START HERE", "Read once, before Week 1 work is due.", [
   blk("Enter the Course Here -->, the iframe",
       frame("index.html", 1300, "BIO 005 Human Physiology, enter the course"),
       "Canvas page: Enter the Course Here -->",
       "The door, framed. Its Enter button carries target=_top when it detects "
       "it is in a frame, so one click navigates the whole browser window out "
       "of Canvas and onto the course website, where the site's own navigation "
       "takes over. Back returns them to Canvas. Tested: the top window leaves, "
       "the frame is gone."),
   blk("Enter the Course Here -->, the card instead", ENTER_CARD,
       "Canvas page: Enter the Course Here --> (alternative)",
       "Same page without a frame, if you would rather not fight the height. "
       "Canvas rewrites iframe attributes when a page is saved from the rich "
       "editor, which is why the height keeps reverting. There is no frame "
       "here, so there is nothing to rewrite. Two buttons: stay in Canvas, or "
       "leave for the website."),
   blk("Course Tools", frame("course-tools.html", 1900, "BIO 005 course tools"),
       "Canvas page: Course Tools",
       "The old floating dock as a flat page. Every tile opens in its own tab."),
   blk("Course home, the whole course as a list",
       frame("course.html", 3750, "BIO 005 course home"),
       "Canvas page: Course home"),
   blk("How Grading Works", frame("how-grading-works.html", 3200, "How grading works"),
       "Canvas page: How Grading Works"),
   blk("Textbook/Mastering A&P/Pearson",
       frame("access-pearson.html", 5700, "Textbook, Mastering A and P, Pearson"),
       "Canvas page: Textbook/Mastering A&P/Pearson"),
   blk("Study With Me", frame("study-with-me.html", 1900, "Study With Me"),
       "Canvas page: Study With Me",
       "Short on purpose. One button opens the calendar."),
   blk("Study With Me calendar",
       frame("study-with-me-calendar.html", 2170, "Study With Me calendar"),
       "Canvas page: Study With Me calendar",
       'The live sign-up calendar, same app as the anatomy one with the tutors, the paid tier and the lab taken out. Students post sessions and sign up here themselves, so nothing needs pushing to add one. It needs its own Apps Script URL pasted into the file first, see the CONFIG block at the top.'),
   blk("Scholar Points", frame("scholar-points.html", 6150, "Scholar Points"),
       "Canvas page: Scholar Points"),
   blk("Syllabus & Course Policies",
       frame("syllabus-fall2026.html", 18800, "Syllabus and course policies"),
       "Canvas page: Syllabus & Course Policies",
       "Long page. It carries its own contents list at the top."),
   blk("Weekly Schedule", frame("course-schedule.html", 2550, "Weekly schedule"),
       "Canvas page: Weekly Schedule",
       "Weeks 2 and 3 are one row. Week 4 opens September 28."),
   blk("AI Use in this Course", frame("ai-in-this-course.html", 2500, "AI use in this course"),
       "Canvas page: AI Use in this Course"),
   blk("Week 1 Discussion: Digital Vision Board/Introduction",
       frame("assignment-discussion-01-visionboard.html", 2400, "Your digital vision board"),
       "Canvas discussion: Week 1 Discussion",
       "The instructions. The discussion itself stays the Canvas discussion, "
       "and the page links to it."),
   blk("How Every Week Works",
       frame("how-every-week-works.html", 3950, "How every week works"),
       "Canvas page: How Every Week Works",
       "The eight steps, topic free. Point a lost student here."),
 ]),

 ("w01", "Week 1", "September 8 to 13. How physiology works and what keeps you steady.", [
   blk("Week 1 overview", frame("w01-overview.html", 3900, "BIO 005 Week 1 overview"),
       "Canvas page: Week 1 | Foundations in Physiology"),
   blk("Step 1, Your first pass",
       frame("w01-step-01-first-pass.html", 2600, "BIO 005 Week 1, Step 1"),
       "Canvas page: Week 1, Step 1"),
   blk("Step 2, Concept videos, second pass",
       frame("concept-videos-week01.html", 3300, "BIO 005 Week 1 concept videos"),
       "Canvas page: Week 1, Step 2",
       "This one is tall because the whole concept list is on the page. If you "
       "would rather it scrolled inside a shorter frame, change both the "
       "min-height and the height to 1500."),
   blk("Step 3, Upload your note sheet",
       frame("w01-step-03-upload-note-sheet.html", 1450, "BIO 005 Week 1, Step 3"),
       "Canvas page: Week 1, Step 3"),
   blk("Step 4, Study it for several days",
       frame("w01-step-04-study-it.html", 1450, "BIO 005 Week 1, Step 4"),
       "Canvas page: Week 1, Step 4",
       "Carries the four study buttons."),
   blk("Step 5, Lab, the Reference Range Lab",
       frame("w01-step-05-lab.html", 1000, "BIO 005 Week 1, Step 5"),
       "Canvas page: Week 1, Step 5"),
   blk("Step 6, Your patient, the preseason physical",
       frame("w01-step-06-patient.html", 1050, "BIO 005 Week 1, Step 6"),
       "Canvas page: Week 1, Step 6"),
   blk("Step 7, Two discussions this week",
       frame("w01-step-07-discussions.html", 3450, "BIO 005 Week 1, Step 7"),
       "Canvas page: Week 1, Step 7"),
   blk("Step 8, Mastery Check, and upload your report",
       frame("w01-step-08-mastery-check.html", 1050, "BIO 005 Week 1, Step 8"),
       "Canvas page: Week 1, Step 8"),
 ]),

 ("w02", "Weeks 2 and 3",
  "September 14 to 27, one block. The cell: structure, transport and signaling. "
  "Everything is due Sunday, September 27.", [
   blk("Weeks 2 and 3 overview", frame("w02-overview.html", 4350, "BIO 005 Weeks 2 and 3 overview"),
       "Canvas page: Week 2 | The Cell, and How Cells Talk"),
   blk("Step 1, Your first pass",
       frame("w02-step-01-first-pass.html", 2650, "BIO 005 Weeks 2 and 3, Step 1"),
       "Canvas page: Week 2, Step 1"),
   blk("Step 2, Concept videos, second pass",
       frame("concept-videos-week03.html", 6050, "BIO 005 Weeks 2 and 3 concept videos"),
       "Canvas page: Week 2, Step 2",
       "All 63 videos are on this page, so the index makes it tall. For a "
       "shorter frame that scrolls inside itself, change both the min-height "
       "and the height to 1500."),
   blk("Step 3, Upload both note sheets",
       frame("w02-step-03-upload-note-sheets.html", 1400, "BIO 005 Weeks 2 and 3, Step 3"),
       "Canvas page: Week 2, Step 3"),
   blk("Step 4, Study it for several days",
       frame("w02-step-04-study-it.html", 1650, "BIO 005 Weeks 2 and 3, Step 4"),
       "Canvas page: Week 2, Step 4",
       "Carries the four study buttons."),
   blk("Step 5, Lab, PhysioEx Exercise 8, amylase",
       frame("w02-step-05-lab.html", 1100, "BIO 005 Weeks 2 and 3, Step 5"),
       "Canvas page: Week 2, Step 5"),
   blk("Step 6, Your patient, the IV fluids case",
       frame("w02-step-06-patient.html", 1300, "BIO 005 Weeks 2 and 3, Step 6"),
       "Canvas page: Week 2, Step 6"),
   blk("Step 7, Discussion, predict then check",
       frame("w02-step-07-discussion.html", 2750, "BIO 005 Weeks 2 and 3, Step 7"),
       "Canvas page: Week 2, Step 7"),
   blk("Step 8, Mastery Check, and upload your report",
       frame("w02-step-08-mastery-check.html", 1150, "BIO 005 Weeks 2 and 3, Step 8"),
       "Canvas page: Week 2, Step 8"),
 ]),
]

# Weeks with no step pages yet. Listed so the sheet covers the whole term and
# it is obvious what is left rather than looking like an oversight.
AHEAD = [
 ("Week 4",  "September 28 to October 4", "Membrane potential, neurons and synapses"),
 ("Week 5",  "October 5 to 11",           "Reflexes, and sensing the world"),
 ("Week 6",  "October 12 to 18",          "Muscle, and how movement gets commanded"),
 ("Week 7",  "October 19 to 25",          "Hormones, the autonomic system, and reproduction"),
 ("Week 8",  "October 26 to November 1",  "Midterm 1"),
 ("Week 9",  "November 2 to 8",           "The heart as a pump"),
 ("Week 10", "November 9 to 15",          "Pressure, flow, and holding blood pressure steady"),
 ("Week 11", "November 16 to 22",         "Blood and how the body defends itself"),
 ("Week 12", "November 23 to 29",         "Digestion, and how you use food for fuel"),
 ("Week 13", "November 30 to December 6", "Breathing, gas transport, and the fast pH lever"),
 ("Week 14", "December 7 to 13",          "The kidney and body fluid balance"),
 ("Week 15", "December 14 to 16",         "The slow pH lever, putting it together, and the final"),
]


def esc(t):
    return html.escape(t, quote=False)


def block_html(i, b):
    bid = "b%d" % i
    return (
'<article class="blk">'
'<div class="bh"><div class="bt"><h3>%(name)s</h3>%(where)s</div>'
'<button type="button" class="copy" data-for="%(id)s">'
'<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
'<rect x="5.2" y="5.2" width="8.3" height="8.3" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/>'
'<path d="M10.8 5.2V3.6a1.6 1.6 0 0 0-1.6-1.6H4a1.6 1.6 0 0 0-1.6 1.6v5.2A1.6 1.6 0 0 0 4 10.4h1.2" '
'fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
'<span class="lbl">Copy</span></button></div>'
'%(note)s'
'<pre id="%(id)s"><code>%(code)s</code></pre>'
'</article>'
    ) % dict(name=esc(b["name"]), id=bid, code=esc(b["code"]),
             where=('<p class="where">%s</p>' % esc(b["where"])) if b["where"] else "",
             note=('<p class="note">%s</p>' % esc(b["note"])) if b["note"] else "")


def section_html(sid, title, sub, blocks, start):
    items = "".join(block_html(start + i, b) for i, b in enumerate(blocks))
    return ('<section id="%s" class="sec"><h2>%s</h2><p class="ss">%s</p>%s</section>'
            % (sid, esc(title), esc(sub), items))


parts, n = [], 0
nav = []
for sid, title, sub, blocks in SECTIONS:
    parts.append(section_html(sid, title, sub, blocks, n))
    nav.append('<a href="#%s">%s</a>' % (sid, esc(title)))
    n += len(blocks)
nav.append('<a href="#ahead">Weeks 4 to 15</a>')

ahead_rows = "".join(
    '<tr><td><b>%s</b></td><td>%s</td><td>%s</td></tr>' % (esc(a), esc(b), esc(c))
    for a, b, c in AHEAD)

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Canvas paste sheet &middot; BIO 005 Human Physiology</title>
<link rel="stylesheet" href="assets/fonts-site.css">
<meta name="description" content="Every Canvas block for BIO 005, with a copy button on each one. For Dr. Rennie, not for students.">
<style>
:root{
  --navy:#0B1530; --navy-deep:#060A18; --navy-tint:#ECEFF4;
  --gold:#C9A14A; --gold-ink:#060A18; --gold-deep:#8A6D33;
  --maroon:#8B3A2E; --maroon-dark:#6E2D24;
  --offwhite:#FAFAF9; --bone:#F5F1E8; --ink-soft:#414B5C; --line:rgba(11,21,48,0.16);
  --display:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  --body:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0}
body{font-family:var(--body);background:var(--offwhite);color:var(--navy);
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--display);font-weight:800;letter-spacing:-.022em;margin:0}
em,i{font-style:normal}
a{color:var(--maroon)}
:focus-visible{outline:3px solid var(--maroon);outline-offset:3px;border-radius:4px}
.wrap{max-width:1000px;margin:0 auto;padding:0 20px}

header.top{background:var(--navy-deep);color:#fff;padding:34px 0 30px}
header.top h1{font-size:clamp(26px,4.6vw,38px);color:#fff;line-height:1.12}
header.top h1 span{color:var(--gold)}
header.top .eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.26em;
  text-transform:uppercase;color:var(--gold);margin:0 0 10px}
header.top p{margin:14px 0 0;color:#C8D0DC;max-width:70ch}
header.top b{color:#fff}

nav.jump{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid var(--line);
  padding:11px 0}
nav.jump .wrap{display:flex;flex-wrap:wrap;gap:8px}
nav.jump a{display:inline-flex;align-items:center;min-height:38px;padding:7px 14px;
  border-radius:999px;background:var(--navy-deep);color:var(--bone);text-decoration:none;
  font-weight:800;font-size:13px;box-shadow:0 3px 8px -3px rgba(11,21,48,.40)}
nav.jump a:hover{background:#12203F;color:var(--bone)}

main{padding:8px 0 40px}
.sec{margin:34px 0 0}
.sec h2{font-size:clamp(20px,3vw,26px);margin:0 0 4px}
.ss{margin:0 0 4px;color:var(--ink-soft);max-width:70ch}

.blk{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(11,21,48,.08);
  padding:18px 20px 16px;margin:16px 0 0}
.bh{display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap}
.bt{flex:1 1 300px;min-width:0}
.blk h3{font-size:17px;margin:0}
.where{margin:4px 0 0;font-size:13px;font-weight:800;letter-spacing:.02em;color:var(--maroon)}
.note{margin:10px 0 0;font-size:14.5px;line-height:1.55;color:var(--ink-soft);max-width:70ch}
.copy{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;min-height:44px;
  padding:10px 18px;border-radius:8px;border:none;background:var(--maroon-dark);
  color:var(--bone);font-family:var(--body);font-weight:800;font-size:14px;cursor:pointer;
  box-shadow:0 6px 14px -5px rgba(11,21,48,.45),0 2px 5px -2px rgba(11,21,48,.30);
  transition:background 140ms ease,transform 200ms ease,box-shadow 200ms ease}
.copy:hover{background:#5C2520;transform:translateY(-2px);
  box-shadow:0 14px 26px -8px rgba(11,21,48,.46),0 4px 9px -3px rgba(11,21,48,.30)}
.copy.done{background:var(--navy-deep)}
pre{margin:12px 0 0;background:var(--navy-deep);color:#E6EAF1;border-radius:10px;
  padding:14px 16px;overflow-x:auto;max-height:230px;overflow-y:auto}
pre code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:12.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word}

table{border-collapse:collapse;width:100%%;margin:14px 0 0;font-size:15px;background:#fff;
  border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(11,21,48,.08)}
th,td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line)}
th{font-family:var(--display);font-weight:800;font-size:12px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--ink-soft)}
.tablewrap{overflow-x:auto}

footer{border-top:1px solid var(--line);margin-top:40px;padding:22px 0 40px}
footer p{margin:0;font-size:14px;color:var(--ink-soft)}
footer .who{font-family:var(--display);font-weight:800;color:var(--navy);margin-bottom:4px}

@media (max-width:620px){.copy{width:100%%;justify-content:center}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>

<header class="top"><div class="wrap">
  <p class="eyebrow">BIO 005 &middot; Fall 2026 &middot; For you, not for students</p>
  <h1>Canvas paste sheet. <span>One copy button each.</span></h1>
  <p>Every block that goes into a Canvas page, in module order. Open the Canvas
    page, click the HTML editor button, delete what is there, paste, and save.
    <b>Built %(built)s.</b></p>
  <p>Do not put this page in a Canvas module. It is a worksheet for you.</p>
</div></header>

<nav class="jump" aria-label="Jump to a section"><div class="wrap">%(nav)s</div></nav>

<main><div class="wrap">
%(sections)s

<section id="ahead" class="sec">
  <h2>Weeks 4 to 15</h2>
  <p class="ss">No step pages built yet, so there is nothing to paste for these.
    They are here so the sheet covers the whole term and it is clear what is
    left rather than looking like something went missing.</p>
  <div class="tablewrap"><table>
    <thead><tr><th scope="col">Week</th><th scope="col">Dates</th><th scope="col">Subject</th></tr></thead>
    <tbody>%(ahead)s</tbody>
  </table></div>
</section>

<section class="sec">
  <h2>Two things worth knowing</h2>
  <div class="blk">
    <h3>Heights</h3>
    <p class="note">Every height was measured by rendering the page at 900px
      wide, about what a Canvas module page gives its content, then adding five
      percent. Canvas strips the script tag out of a pasted page, so the height
      sender built into each file never runs inside Canvas and these fixed
      numbers are what a student actually gets. If a page ever looks cut off,
      raise both the min-height and the height.</p>
  </div>
  <div class="blk">
    <h3>Why the height keeps reverting</h3>
    <p class="note">Canvas rewrites iframe attributes when you save a page from
      the rich editor. Edit in the HTML editor and save from there, without
      toggling back to the rich view, and the height sticks.</p>
  </div>
</section>
</div></main>

<footer><div class="wrap">
  <p class="who">Dr. Sharilyn Rennie</p>
  <p>BIO 005 Human Physiology &middot; Fall 2026</p>
</div></footer>

<script>
/* Copy buttons. navigator.clipboard needs a secure context, which a file
   opened straight from disk is not in every browser, so there is a selection
   fallback that works everywhere. */
(function(){
  function flash(btn, text){
    var lbl = btn.querySelector(".lbl"), was = lbl.textContent;
    lbl.textContent = text; btn.classList.add("done");
    setTimeout(function(){ lbl.textContent = was; btn.classList.remove("done"); }, 1400);
  }
  document.addEventListener("click", function(e){
    var btn = e.target.closest ? e.target.closest(".copy") : null;
    if(!btn) return;
    var pre = document.getElementById(btn.getAttribute("data-for"));
    if(!pre) return;
    var text = pre.textContent;
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(text).then(function(){ flash(btn, "Copied"); },
        function(){ fallback(); });
    } else { fallback(); }
    function fallback(){
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch(err) { ok = false; }
      document.body.removeChild(ta);
      flash(btn, ok ? "Copied" : "Select it and copy");
    }
  });
}());
</script>
</body>
</html>
""" % dict(built=BUILT, nav="".join(nav), sections="\n".join(parts), ahead=ahead_rows)

io.open(os.path.join(OUT, "canvas-paste-sheet.html"), "w", encoding="utf-8").write(PAGE)
print("canvas-paste-sheet.html %d bytes, %d blocks" % (len(PAGE), n))
