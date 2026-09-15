# -*- coding: utf-8 -*-
"""
The first pass page. One per week.

Sep 14 2026. This replaces the old Step 1 (print your week) and Step 2 (first
pass), which were two pages doing one job. The course introduction video came
off it at the same time: the Canvas module format makes it obsolete.

WHAT THE PAGE SAYS, in order:
  1. Print the prework packet: note sheet, competency list, reference notes.
  2. Read the competencies first, so you know what you are looking for.
  3. Work through the reading, Silverthorn or OpenStax, filling the boxes.
  4. Or take your own handwritten notes and drawings against the competencies.
Then the reason the packet is the easier route, which is the second pass in a
different color: with the packet the two colors sit in the same box, so nothing
has to be hunted for. Then the grading, which is complete or not complete, for
participation.

Run it:  python3 firstpass.py
"""

import io, os
from kit import TOKENS, BRANDBAR, FOOTER, PAGE_CSS, BACK_SVG, CANVAS_MODULES, ICON, esc

OUT = "/home/claude/rebase"
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616/"
OPENSTAX = "https://openstax.org/details/books/anatomy-and-physiology-2e"

EXTRA_CSS = """
/* Two routes, side by side on a wide screen, stacked on a phone. */
.routes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));
        gap:16px;margin:0}
.route{background:var(--white);border-radius:14px;box-shadow:0 1px 3px rgba(0,0,0,.08);
       padding:22px 24px 24px;display:flex;flex-direction:column}
.route .rlab{font-family:var(--display);font-size:11px;font-weight:800;letter-spacing:.18em;
             text-transform:uppercase;color:var(--terra-dark);margin:0 0 6px}
.route h3{font-family:var(--display);font-size:18px;font-weight:800;color:var(--navy);
          letter-spacing:-.01em;margin:0 0 8px}
.route p{margin:0 0 12px;font-size:15px;line-height:1.6;color:var(--navy)}
.route .foot{margin:auto 0 0;padding-top:12px;border-top:1px solid var(--navy-15);
             font-size:14px;color:var(--navy-72);line-height:1.5}
.whyhere{background:var(--navy);color:#fff;border-radius:14px;padding:22px 26px;margin:0 0 22px}
.whyhere h2{font-family:var(--display);font-size:18px;font-weight:800;color:#fff;margin:0 0 8px}
.whyhere p{margin:0 0 10px;font-size:15.5px;line-height:1.62;color:#fff}
.whyhere p:last-child{margin:0}
.whyhere b{color:var(--gold);font-weight:800}
"""


def btn(label, href, kind="pdf", primary=True):
    cls = "btn" if primary else "btn sec"
    return ('<a class="%s" href="%s" target="_blank" rel="noopener">%s%s'
            '<span class="vh"> (opens in a new tab)</span></a>'
            % (cls, href, ICON.get(kind, ""), label))


def build(w):
    nn = "%02d" % w["week"]
    body = []

    # ---- 1. print the packet -------------------------------------------
    body.append(
      '<section class="card">'
      '<h2>1. Print your prework packet</h2>'
      '<p class="lede">Three things, and you want all of them on paper before you open the '
      'book. Working from paper is the point; it is what makes the second pass work.</p>'
      '<ol class="steps one">'
      '<li><b>The note sheet.</b> A box for every competency, with the prompts already printed '
      'on it. You are not building anything, just filling it in.</li>'
      '<li><b>The competency list.</b> The %s things you have to be able to do this week, each '
      'with three checkboxes: read it, drew it, did it from memory.</li>'
      '<li><b>The reference notes.</b> The same material written out, with the worked problems '
      'in full, so you have something to read beside the sheet.</li>'
      '</ol>%s'
      '<p>No printer? Rule the boxes onto your own paper. A hand ruled sheet is graded exactly '
      'the same as a printed one.</p>'
      '</section>' % (w["ncomp"], w["print_btns"]))

    # ---- 2. read the competencies first --------------------------------
    body.append(
      '<section class="card">'
      '<h2>2. Read the competencies before you read anything else</h2>'
      '<p>Every exam question, lab and case this week comes off that list. Reading it first is '
      'what turns the chapter from forty pages of text into %s specific things you are hunting '
      'for. Ten minutes here saves you an hour later.</p>'
      '</section>' % w["ncomp_words"])

    # ---- 3. the two routes ---------------------------------------------
    body.append(
      '<section class="card">'
      '<h2>3. Work the material, and fill the boxes</h2>'
      '<p class="lede">Two ways to do this. Both count, both are graded the same, and the '
      'second one is genuinely fine if it is how you work.</p>'
      '<div class="routes">'

      '<div class="route">'
      '<p class="rlab">The easier route</p>'
      '<h3>Use the prework packet</h3>'
      '<p>Work through %s, or the reference notes, and fill each box on the note sheet as you '
      'go. Draw the idea, label it, put the steps in order. Short lists, arrows and pictures '
      'beat sentences running across the page.</p>'
      '<p><b>Pick one pen color and stay in it.</b> Leave every gap you cannot fill. The gaps '
      'are the point; they are what the videos are for.</p>'
      '<p class="foot">This is the route I would take.</p>'
      '</div>'

      '<div class="route">'
      '<p class="rlab">The alternative</p>'
      '<h3>Take your own notes</h3>'
      '<p>Handwritten notes, drawings, mind maps, whatever you already know works for you. One '
      'condition: they have to address the competencies, all %s of them, not just the parts of '
      'the chapter that were interesting.</p>'
      '<p><b>Same rule on color.</b> One color for this pass, and leave the gaps where they are.</p>'
      '<p class="foot">Graded exactly the same as the packet.</p>'
      '</div>'

      '</div>'
      '<div class="btns">%s</div>'
      '<p style="margin:12px 0 0;font-size:14.5px;color:var(--navy-72)">Silverthorn is the '
      'required text. OpenStax is free and says the same things a different way, which helps '
      'when a section is not landing.</p>'
      '</section>' % (w["reading_phrase"], w["ncomp"], w["read_btns"]))

    # ---- why the packet is easier --------------------------------------
    body.append(
      '<div class="whyhere">'
      '<h2>Why the packet is the easier route</h2>'
      '<p>Next comes the second pass. You watch the videos, switch to a different color, and add '
      'what the video gave you that the reading did not.</p>'
      '<p>If your first pass is in the packet, the second color goes into <b>the same box</b>. '
      'You open the sheet, find the competency, add to it. Done.</p>'
      '<p>If your first pass is in your own notes, you have to go find where you wrote about that '
      'competency before you can add anything. Every single time. That hunting is the whole '
      'difference, and by Sunday it adds up to hours.</p>'
      '</div>')

    # ---- grading --------------------------------------------------------
    body.append(
      '<section class="card">'
      '<h2>How this is graded</h2>'
      '<p><b>Complete or not complete.</b> That is the whole rubric. I am not grading the '
      'quality of your boxes, I am not taking points for a thin one, and there is no partial '
      'credit to lose.</p>'
      '<p>It counts for participation, and participating is a condition of staying enrolled. '
      'What I actually do with it is read enough to see how the week went for you, so I can '
      'reach out if something is not landing.</p>'
      '<p>You upload it at the end of the week, after the second pass, with both colors on it. '
      'That step is its own page.</p>'
      '</section>')

    body.append('<p class="next">%s</p>' % w["next"])

    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BIO 005 Human Physiology | Week %(week)d, Step 1: Your first pass</title>
<link rel="stylesheet" href="assets/fonts-site.css">
<meta name="description" content="Week %(week)d, Step 1: print the prework packet, read the competencies, and make your first pass through the material.">
<style>
%(tokens)s
%(css)s
%(extra)s
</style>
</head>
<body>
<a class="skip" href="#main">Skip to this step</a>
%(brandbar)s
<header class="masthead">
  <div class="wrap">
    <p class="eyebrow">BIO 005 &middot; Week %(week)d &middot; Step 1 of %(total)d &middot; LEARN</p>
    <h1>Your first pass</h1>
    <p>%(when)s</p>
    <div class="chiprow">
      <a class="chip chip-back" href="%(modules)s" target="_top">%(backsvg)s Back to Canvas modules</a>
    </div>
  </div>
</header>

<main id="main">
%(body)s
</main>

%(footer)s

<!-- STANDALONE ON PURPOSE. This page sits in a Canvas module as an iframe, so it
     carries no site chrome: no nav bar, no course tools dock, no Hootie, no
     floating back widget. Back to Canvas modules, target _top, is the only way
     off the page. Do not add the site scripts to this file.
     GENERATED by tools/w1-steps/firstpass.py. -->
<script>
/* Iframe height sender. Canvas strips script tags from a pasted page, so the
   Canvas iframe carries a fixed height and nothing listens for this. It stays
   for the course site and Kajabi, where a listener does exist. */
(function(){
  var FRAME_ID = "bio005-w%(nn)s-first-pass";
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
""" % dict(week=w["week"], nn=nn, total=w["total"], when=esc(w["when"]),
           tokens=TOKENS, css=PAGE_CSS, extra=EXTRA_CSS, brandbar=BRANDBAR, footer=FOOTER,
           modules=CANVAS_MODULES, backsvg=BACK_SVG,
           body="\n".join("  " + b for b in body))


# ===========================================================================
WEEKS = [

 dict(week=1, total=8,
   when="Tuesday to Thursday, about 3 hours plus printing",
   ncomp="twelve", ncomp_words="twelve",
   reading_phrase="Silverthorn Chapter 1 and the control sections of Chapter 6",
   print_btns='<div class="btns">'
     + btn("Week 1 note sheet (PDF)",
           "https://drive.google.com/file/d/1AN276f3jUYM9HcV9QqHa2HYSLy0_YcNs/view", "pdf")
     + btn("Week 1 competency list (PDF)", SITE + "print/BIO005-Week1-Competency-List.pdf", "pdf")
     + btn("Week 1 reference notes (PDF)", SITE + "print/BIO005-Week1-Packet.pdf", "pdf", primary=False)
     + '</div>',
   read_btns=btn("OpenStax, free second explanation", OPENSTAX, "tool"),
   next="<b>When this is done:</b> go to Step 2, the concept videos, and make your second pass "
        "in a second color."),

 dict(week=2, total=8,
   when="Wednesday to Friday, about 9 hours plus printing",
   ncomp="twenty five", ncomp_words="twenty five",
   reading_phrase="Silverthorn Chapter 3 and Chapter 5, plus the signaling half of Chapter 6",
   print_btns='<p style="margin:0 0 6px;font-size:14.5px;color:var(--navy-72)">'
     'Week 2 comes in two halves, so there are two note sheets and two competency lists. '
     'Print all of it.</p><div class="btns">'
     + btn("Note sheet: the cell and tissues (PDF)",
           "https://drive.google.com/file/d/1JQPur4khec-RYzhiA7gD-n1R9Oc0fC2b/view", "pdf")
     + btn("Note sheet: transport and signaling (PDF)",
           "https://drive.google.com/file/d/1w_M1mYyA4z94RlEG_zdNERRoLAbnbiwZ/view", "pdf")
     + btn("Competency list, all 25 (PDF)", SITE + "print/BIO005-Week2-Competency-List.pdf", "pdf", primary=False)
     + btn("Week 2 reference notes (PDF)", SITE + "print/BIO005-Week2-Packet.pdf", "pdf", primary=False)
     + '</div>',
   read_btns=btn("OpenStax, free second explanation", OPENSTAX, "tool"),
   next="<b>When this is done:</b> go to Step 2, the concept videos, and make your second pass "
        "in a second color. All sixty three videos are on one page."),
]


if __name__ == "__main__":
    for w in WEEKS:
        out = build(w)
        name = "w%02d-step-01-first-pass.html" % w["week"]
        io.open(os.path.join(OUT, name), "w", encoding="utf-8").write(out)
        print("%-34s %6d bytes" % (name, len(out)))
