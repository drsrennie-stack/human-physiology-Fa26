# -*- coding: utf-8 -*-
"""The week map of record for the off Canvas site.

WEEKS 2 AND 3 ARE ONE BLOCK. Sep 15 2026. Scrubs gave students the two weeks
together to work through the cell properly, and everything in it is due
Sunday September 27. There is no separate Week 3 row anywhere a student can
see, because two rows where one week of work exists is what makes people
think they have missed something. The next week to open is Week 4, on Monday
September 28.

Each entry:
  key      the file stem the week uses on the site
  label    what a student sees, e.g. "Weeks 2 and 3"
  opens    Monday of the block, ISO
  due      Sunday everything in the block is due, ISO
  title    the week's subject
  part     1, 2 or 3
"""

PARTS = {
    1: "Part 1, Foundations",
    2: "Part 2, Control systems",
    3: "Part 3, Systems in action",
}

WEEKS = [
    dict(key="w01", label="Week 1",       opens="2026-09-08", due="2026-09-13", part=1,
         title="How physiology works and what keeps you steady"),
    dict(key="w02", label="Weeks 2 and 3", opens="2026-09-14", due="2026-09-27", part=1,
         title="The cell: structure, transport and signaling",
         note="Two weeks on one set of material. Everything is due September 27."),
    dict(key="w04", label="Week 4",       opens="2026-09-28", due="2026-10-04", part=2,
         title="Membrane potential, neurons and synapses"),
    dict(key="w05", label="Week 5",       opens="2026-10-05", due="2026-10-11", part=2,
         title="Reflexes, and sensing the world"),
    dict(key="w06", label="Week 6",       opens="2026-10-12", due="2026-10-18", part=2,
         title="Muscle, and how movement gets commanded"),
    dict(key="w07", label="Week 7",       opens="2026-10-19", due="2026-10-25", part=2,
         title="Hormones, the autonomic system, and reproduction"),
    dict(key="w08", label="Week 8",       opens="2026-10-26", due="2026-11-01", part=2,
         title="Midterm 1"),
    dict(key="w09", label="Week 9",       opens="2026-11-02", due="2026-11-08", part=3,
         title="The heart as a pump"),
    dict(key="w10", label="Week 10",      opens="2026-11-09", due="2026-11-15", part=3,
         title="Pressure, flow, and holding blood pressure steady"),
    dict(key="w11", label="Week 11",      opens="2026-11-16", due="2026-11-22", part=3,
         title="Blood and how the body defends itself"),
    dict(key="w12", label="Week 12",      opens="2026-11-23", due="2026-11-29", part=3,
         title="Digestion, and how you use food for fuel"),
    dict(key="w13", label="Week 13",      opens="2026-11-30", due="2026-12-06", part=3,
         title="Breathing, gas transport, and the fast pH lever"),
    dict(key="w14", label="Week 14",      opens="2026-12-07", due="2026-12-13", part=3,
         title="The kidney and body fluid balance"),
    dict(key="w15", label="Week 15",      opens="2026-12-14", due="2026-12-16", part=3,
         title="The slow pH lever, putting it together, and the final"),
]

# The blocks whose step pages are built and wired. Everything else shows its
# open date and nothing else, which is honest: the page does not exist yet.
LIVE = {"w01", "w02"}

MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


def pretty(iso, weekday=False):
    """2026-09-27 -> September 27, or Sunday, September 27."""
    y, m, d = (int(x) for x in iso.split("-"))
    out = "%s %d" % (MONTHS[m - 1], d)
    if weekday:
        import datetime
        out = datetime.date(y, m, d).strftime("%A") + ", " + out
    return out


def span(w):
    """September 14 to September 27, collapsing a repeated month."""
    a, b = pretty(w["opens"]), pretty(w["due"])
    if a.split()[0] == b.split()[0]:
        b = b.split()[1]
    return a + " to " + b

# ---------------------------------------------------------------- the steps
# The eight step pages behind each open week, in the same order and under the
# same names as the Canvas module items. This is what makes the website a real
# alternative rather than a summary of one: a student can walk the whole week
# here and never open Canvas except to turn something in.
STEPS = {
 "w01": [
   ("1", "Your first pass",                        "w01-step-01-first-pass.html"),
   ("2", "Concept videos, second pass",            "concept-videos-week01.html"),
   ("3", "Upload your Competency Study Guide",                 "w01-step-03-upload-note-sheet.html"),
   ("4", "Study it for several days",              "w01-step-04-study-it.html"),
   ("5", "Lab, the Reference Range Lab",           "w01-step-05-lab.html"),
   ("6", "Your patient, the preseason physical",   "w01-step-06-patient.html"),
   ("7", "Two discussions this week",              "w01-step-07-discussions.html"),
   ("8", "Mastery Check, and upload your report",  "w01-step-08-mastery-check.html"),
 ],
 "w02": [
   ("1", "Your first pass",                        "w02-step-01-first-pass.html"),
   ("2", "Concept videos, second pass",            "concept-videos-week03.html"),
   ("3", "Upload both Competency Study Guides",                "w02-step-03-upload-note-sheets.html"),
   ("4", "Study it for several days",              "w02-step-04-study-it.html"),
   ("5", "Lab, PhysioEx Exercise 8, amylase",      "w02-step-05-lab.html"),
   ("6", "Your patient, the IV fluids case",       "w02-step-06-patient.html"),
   ("7", "Discussion, predict then check",         "w02-step-07-discussion.html"),
   ("8", "Mastery Check, and upload your report",  "w02-step-08-mastery-check.html"),
 ],
}
