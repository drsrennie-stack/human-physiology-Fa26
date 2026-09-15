# -*- coding: utf-8 -*-
"""
The weekly overview page. One per week, all from this file.

WHAT THIS PAGE IS FOR. It teaches the PROCEDURE, not the topic. A student
should be able to read any week's overview and come away knowing the order to
work in and why that order is the method, whether the week is about the cell,
the kidney or acid base. The topic only ever fills in the blanks.

So the sequence below is written once, generically, and a week supplies only
what is genuinely week-specific: its number, its title, its dates, its reading,
the name of its lab, its case and its discussion, and its own done-when list.
A week that needs a different shape (Week 2 splits its reading into two halves)
passes its own `steps` and overrides just that part.

ADDING A WEEK. Copy the last entry in WEEKS, change the fields, run this file.
Nothing else needs touching. Fields left out fall back to the generic text.

    python3 tools/week-overview/build.py

It writes w<NN>-overview.html into the repo root, one per week listed.

The design system, the standalone rules and the accessibility record all match
the step pages and the concept video pages. No site chrome, no Hootie, no tools
dock. Back to Canvas modules, target _top, is the only way off the page.
"""

import io, os, html, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
CSS = io.open(os.path.join(HERE, "_overview.css"), encoding="utf-8").read()
BRANDBAR = io.open(os.path.join(HERE, "_brandbar.html"), encoding="utf-8").read()

CANVAS = "https://yccd.instructure.com/courses/42616/"
VIRTUAL_OFFICE = CANVAS + "discussion_topics/711800"


def esc(t):
    return html.escape(t, quote=False)


# ---------------------------------------------------------------------------
# THE PROCEDURE. This is the part that does not change from week to week.
# {braces} are filled from the week's own fields; anything a week does not set
# falls back to the DEFAULTS below.
# ---------------------------------------------------------------------------

SEQUENCE = [
 dict(n="1", stage="learn", title="Print your week",
      when="{print_when}",
      what="Everything you work from this week, on paper: the note sheet, the competency "
           "list and the written notes. Print it before you start, so you are working with "
           "paper in front of you instead of switching windows."),

 dict(n="2", stage="learn", title="Read it, then watch it",
      when="{read_when}",
      what="First pass in one color, from {reading_short} or the written notes, filling each "
           "box on the note sheet as you go. Then switch colors, watch the concept videos, "
           "and add what the video gave you that the reading did not. Leave the gaps. The "
           "gaps are what tell you where to go back."),

 dict(n="3", stage="learn", title="Upload your note sheet",
      when="After your second pass, by Sunday",
      what="Photograph every page with both colors on it and upload it in Canvas. I am not "
           "grading it. Turning it in is how you show you are participating.",
      tag="Graded: complete or not complete"),

 dict(n="4", stage="practice", title="Study it for several days",
      when="{study_when}",
      what="Now the note sheet closes and the material has to come back out of your head. "
           "Brain dumps, drawing from memory, recall cards, book problems. Pick more than "
           "one. Four short sessions beat one long one, because the forgetting in between "
           "is what makes it stick.",
      tag="Not graded, and the step that decides your exam score", tagstyle="plain"),

 dict(n="5", stage="apply", title="Lab, {lab}",
      when="{lab_when}",
      what="{lab_what}",
      tag="Graded: Investigation"),

 dict(n="6", stage="apply", title="Your patient, {case}",
      when="{case_when}",
      what="{case_what}",
      tag="Graded: Application"),

 dict(n="7", stage="apply", title="{discussion}",
      when="{discussion_when}",
      what="{discussion_what}",
      tag="Graded: Thinking"),

 dict(n="8", stage="check", title="Mastery Check, and upload your report",
      when="{check_when}",
      what="Thirty questions on this week's competencies, nothing open. It names the "
           "competencies that cost you points. Do one or do ten, then upload the report. "
           "The score is for you, not for a grade.",
      tag="Graded: complete or not complete"),
]

DEFAULTS = dict(
  print_when="Monday, about 20 minutes plus printing",
  read_when="Monday to Thursday",
  study_when="Every day from Thursday, about an hour a day",
  lab_when="Wednesday to Sunday, about 3 hours",
  lab_what="Work the lab page top to bottom, record what it asks for, and turn it in as one file.",
  case_when="Saturday, about 90 minutes",
  case_what="One more entry in the chart you keep all term. Draw this week's mechanism by hand, "
            "answer the written questions, and log any AI you used.",
  discussion="Discussion, predict then check",
  discussion_when="Post by Friday; two replies by Sunday",
  discussion_what="Make your prediction before you look anything up, then say what actually "
                  "happened and what you did about the difference.",
  check_when="Saturday or Sunday, 30 to 60 minutes",
  reading_short="the chapter",
  lead="Do not jump ahead. Every step assumes the one before it happened.",
  whats_next="",
)

STAGE_LABEL = {"learn": "Learn", "practice": "Practice", "apply": "Apply", "check": "Check"}


def fill(text, wk):
    d = dict(DEFAULTS)
    d.update({k: v for k, v in wk.items() if isinstance(v, str)})
    out = text
    for _ in range(3):                       # slots may nest one level
        new = re.sub(r"\{(\w+)\}", lambda m: str(d.get(m.group(1), m.group(0))), out)
        if new == out:
            break
        out = new
    return out


def flow(wk):
    steps = wk.get("steps", SEQUENCE)
    rows = []
    for i, st in enumerate(steps):
        last = (i == len(steps) - 1)
        tag = ""
        if st.get("tag"):
            cls = "tag" if st.get("tagstyle") == "plain" else "tag graded"
            tag = '<span class="%s">%s</span>' % (cls, esc(fill(st["tag"], wk)))
        rows.append(
          '<li%s>'
          '<div class="fnum" aria-hidden="true">%s</div>'
          '<span class="stagechip %s">%s</span>'
          '<h3>%s</h3>'
          '<p class="when">%s</p>'
          '<p class="what">%s</p>%s</li>'
          % ("" if last else ' class="hasnext"', st["n"], st["stage"],
             STAGE_LABEL[st["stage"]], esc(fill(st["title"], wk)),
             esc(fill(st["when"], wk)), fill(st["what"], wk), tag))
    return '<ol class="flow">%s</ol>' % "".join(rows)


def card(title, *blocks, lede=""):
    l = '<p class="lede">%s</p>' % lede if lede else ""
    return ('<section class="card"><h2>%s</h2>%s%s</section>'
            % (esc(title), l, "".join(blocks)))


def due_list(items):
    rows = "".join('<li><b>%s</b><span class="date">%s</span></li>' % (esc(a), esc(b))
                   for a, b in items)
    return '<ul class="due">%s</ul>' % rows


def done_list(items):
    return '<ul class="done">%s</ul>' % "".join("<li>%s</li>" % esc(i) for i in items)


def build(wk):
    nn = "%02d" % wk["week"]
    body = []

    body.append(card("Before you start",
      "<p><b>When it runs.</b> %s</p>" % fill(wk["runs"], wk),
      "<p><b>How long.</b> %s</p>" % fill(wk["hours"], wk),
      "<p><b>Your reading.</b> %s</p>" % fill(wk["reading"], wk)))

    body.append(card("The order you work in", flow(wk), lede=esc(fill(wk.get("lead", DEFAULTS["lead"]), wk))))

    body.append(card("Due this week", due_list(wk["due"]), lede="All times Pacific."))

    body.append(card("You are done with Week %d when" % wk["week"], done_list(wk["done"])))

    nxt = fill(wk.get("whats_next", ""), wk)
    body.append(card("What happens next", nxt,
      '<p class="help">Not sure where to start, or something is not working? Ask in the '
      '<a href="%s">Virtual Office</a>, where your classmates can see the answer too.</p>'
      % VIRTUAL_OFFICE))

    page = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BIO 005 Human Physiology | Week %(week)d overview: %(title)s</title>
<link rel="stylesheet" href="assets/fonts-site.css">
<meta name="description" content="%(desc)s">
<style>
%(css)s
</style>
</head>
<body>
<a class="skip" href="#main">Skip to the week</a>
%(brandbar)s
<header class="masthead">
  <div class="wrap">
    <p class="eyebrow">Week %(week)d of 15</p>
    <h1>%(title)s</h1>
    <p class="sub">%(intro)s</p>
    <div class="chiprow">
      <a class="chip-back" href="%(modules)s" target="_top">
        <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10.5 2 4 8l6.5 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Back to Canvas modules</a>
    </div>
  </div>
</header>

<main id="main">
  <div class="wrap">
%(body)s
  </div>
</main>

<footer>
  <div class="wrap">
    <p class="who">Dr. Sharilyn Rennie</p>
    <p class="role">BIO 005 Human Physiology</p>
  </div>
</footer>

<!-- STANDALONE ON PURPOSE. Built to sit in a Canvas module as an iframe, so it
     carries no site chrome: no nav bar, no course tools dock, no Hootie, no
     floating back widget. Back to Canvas modules, target _top, is the only way
     off the page. Do not add the site scripts to this file.
     GENERATED by tools/week-overview/build.py. Edit the week's data there. -->
<script>
/* Iframe height sender. Canvas strips script tags from a pasted page, so the
   Canvas iframe carries a fixed height and nothing listens for this. It stays
   for the course site and Kajabi, where a listener does exist. */
(function(){
  var FRAME_ID = "bio005-w%(nn)s-overview";
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
""" % dict(week=wk["week"], nn=nn, title=esc(wk["title"]), css=CSS, brandbar=BRANDBAR,
           modules=CANVAS + "modules", body="\n".join("    " + b for b in body),
           intro=esc(fill(wk.get("intro", INTRO_DEFAULT), wk)),
           desc=esc("Week %d of BIO 005: the order you work in, step by step, with what each "
                    "step is and how long it takes." % wk["week"]))
    path = os.path.join(ROOT, "w%s-overview.html" % nn)
    io.open(path, "w", encoding="utf-8").write(page)
    return path, len(page)


INTRO_DEFAULT = ("{nsteps} steps, in this order. Each one gets you ready for the next, so working "
                 "down the list is the method, not just the schedule. Every step below is its own "
                 "page in this module, and the Next button at the foot of a page takes you to the "
                 "one after it.")


# ===========================================================================
# THE WEEKS. Copy an entry, change the fields, run the file.
# ===========================================================================

WEEKS = []

# --------------------------------------------------------------- WEEK 1
WEEKS.append(dict(
  week=1,
  title="How physiology works, and what keeps you steady",
  nsteps="Nine",
  reading_short="Silverthorn Chapter 1",
  runs="Week 1 runs Tuesday, September 8 through Sunday, September 13 at 10:00 pm Pacific. "
       "Everything in this module is this week, and only this week.",
  hours="Plan on about 12 hours, spread across the week rather than done in one sitting. "
        "That is the floor for passing, not the number that earns an A.",
  reading="Silverthorn Chapter 1, and the homeostasis and control pathway sections of Chapter 6.",
  print_when="Tuesday, about 45 minutes plus printing",
  read_when="Tuesday to Thursday, about 3 hours",
  lab="the Reference Range Lab",
  lab_what="Calculate a reference range, decide which results fall in or out of it, and plot "
           "three serial results by hand. Work the lab page top to bottom and turn it in as one file.",
  case="the preseason physical",
  discussion="Two discussions this week",
  discussion_when="Discussion 1 by Friday, September 11; Discussion 2 by Sunday, September 13",
  discussion_what="Your digital vision board introduces you to the class. The second post looks at "
                  "what your Mastery Check told you and what you did about it, so take the check first.",
  due=[("Discussion 1, your digital vision board",
        "Post Friday, September 11, 10:00 pm. Replies Sunday, September 13, 10:00 pm."),
       ("Discussion 2, what the evidence told you",
        "Sunday, September 13, 10:00 pm."),
       ("Your note sheet, both passes",
        "Sunday, September 13, 10:00 pm. Complete or not complete."),
       ("Lab, the Reference Range Lab",
        "Sunday, September 13, 10:00 pm."),
       ("Application, your patient's preseason physical",
        "Sunday, September 13, 10:00 pm."),
       ("Mastery Check report",
        "Sunday, September 13, 10:00 pm. Complete or not complete.")],
  done=["Your note sheet has two colors on it, you can say which boxes are still thin, and it is uploaded.",
        "You can draw a negative feedback loop from memory and label all five parts.",
        "You can say what makes homeostasis different from equilibrium, in your own words.",
        "You have done at least one Mastery Check and uploaded the report.",
        "The Reference Range Lab is turned in.",
        "Your patient's first chart entry is turned in.",
        "Both discussion posts are up, and your two replies to classmates."],
  whats_next="<p><b>Week 2, the cell and how cells talk,</b> opens Wednesday, September 16 at "
             "8:00 pm Pacific. It is the biggest week of the term, about 18 hours, so start it "
             "the evening it opens rather than the following Monday.</p>",
))

# --------------------------------------------------------------- WEEK 2
# Week 2 splits the reading into two halves, so it passes its own step list.
# Everything else falls back to the generic procedure above.
W2_STEPS = [
 SEQUENCE[0],
 dict(n="2a", stage="learn", title="Cell anatomy: read it, then watch it",
      when="Wednesday and Thursday, about 4 hours",
      what="Work the Foundations of the cell and tissues sheet only. First pass in one color "
           "from Chapter 3 or the written notes. Then switch colors, watch the cell videos, and "
           "add what the video gave you that the reading did not. Leave the gaps."),
 dict(n="2b", stage="learn", title="Cell physiology and transport: read it, then watch it",
      when="Thursday and Friday, about 5 hours",
      what="Same two passes on the Cellular physiology and transport sheet. This is the bigger "
           "half, so give it the extra day. Two things are worth drawing rather than writing: "
           "which way a substance moves relative to its gradient, and whether the cell is "
           "spending energy to move it."),
 dict(n="3", stage="learn", title="Upload both note sheets",
      when="After your second pass, by Sunday",
      what="Photograph every page of both sheets with both colors on them and upload them in "
           "Canvas. I am not grading them. Turning them in is how you show you are participating.",
      tag="Graded: complete or not complete"),
] + SEQUENCE[3:]

WEEKS.append(dict(
  week=2,
  title="The cell, and how cells talk",
  nsteps="Nine",
  steps=W2_STEPS,
  reading_short="Chapter 3",
  runs="Week 2 opens Wednesday, September 16 at 8:00 pm Pacific and runs for two weeks. Week 3 "
       "adds nothing new, so this is one long stretch with the material and everything in it is "
       "due together on Sunday, September 27 at 10:00 pm.",
  hours="Plan on about 18 hours. That is more than any other week, which is why you have two "
        "weeks for it. Spread it across the days rather than doing it in one sitting. Eighteen "
        "hours is the floor for passing, not the number that earns an A.",
  reading="Two halves, two chapters. Chapter 3, Compartmentation: Cells and Tissues, is the "
          "anatomy half: the cell, its membrane, its organelles and the four tissue types. "
          "Chapter 5, Membrane Dynamics, is the physiology half: what crosses the membrane and "
          "how, diffusion, osmosis and the pumps. The signaling competencies at the end of the "
          "week come from Chapter 6, Communication, Integration and Homeostasis.",
  lead="Do not jump ahead. Step 3 assumes you did Steps 2a and 2b, and Step 8 only tells you "
       "something useful if Step 4 happened first. You have two weeks, so there is room to do "
       "this in order rather than all at once.",
  study_when="Every day from Thursday, about an hour a day",
  lab="PhysioEx Exercise 8, amylase",
  lab_when="Wednesday to Sunday, about 3 hours",
  lab_what="Run the simulation, record what the lab asks for, and turn the analysis sheet in as "
           "one file.",
  case="the student health visit",
  case_what="The second entry in the chart you keep all term. Draw this week's mechanism by hand, "
            "answer the written questions, and log any AI you used.",
  discussion="Discussion 2, predict then check",
  discussion_when="Post by Friday, September 25; two replies by Sunday, September 27",
  due=[("Discussion 2",
        "Post Friday, September 25, 10:00 pm. Replies Sunday, September 27, 10:00 pm."),
       ("Both note sheets, both passes",
        "Sunday, September 27, 10:00 pm. Complete or not complete."),
       ("Lab, PhysioEx Exercise 8, amylase",
        "Sunday, September 27, 10:00 pm."),
       ("Application, your patient's student health visit",
        "Sunday, September 27, 10:00 pm."),
       ("Mastery Check report",
        "Sunday, September 27, 10:00 pm. Complete or not complete.")],
  done=["Both note sheets have two colors on them, you can say which boxes are still thin, and both are uploaded.",
        "You can draw one full signal pathway, ligand to response, from memory.",
        "You can take one substance and say whether it crosses the membrane with the gradient or against it, and whether the cell pays for the trip.",
        "You have done at least one Mastery Check and uploaded the report.",
        "The amylase lab analysis sheet is turned in.",
        "Your patient's second chart entry is turned in.",
        "Your discussion post and both replies are up."],
  whats_next="<p><b>Week 3 is part of this week.</b> Nothing new opens, and nothing is due in "
             "between. You have the two weeks to work the material properly and to close whatever "
             "the Mastery Check finds. Everything lands together on the 27th.</p>"
             "<p><b>Week 4, membrane potential, neurons and synapses,</b> opens Monday, "
             "September 28 at 8:00 am Pacific.</p>",
))


if __name__ == "__main__":
    for wk in WEEKS:
        path, n = build(wk)
        print("%-40s %6d bytes" % (os.path.basename(path), n))
    print("%d overview pages" % len(WEEKS))
