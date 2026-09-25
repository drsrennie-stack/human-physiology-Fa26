# -*- coding: utf-8 -*-
"""Generates body/course-schedule.html from the week map of record.

Written rather than hand kept, because the schedule lives in three places a
student can see (this page, the course home and the syllabus) and hand keeping
three copies is how Week 3 ended up on the site twice.
"""
import io, os
from weeks import WEEKS, PARTS, LIVE, pretty, span

HERE = os.path.dirname(os.path.abspath(__file__))

# The exam windows, phrased so they read as a sentence after the week's own
# subject rather than repeating it. Week 8's subject is already "Midterm 1".
EXAM = {"w08": "The exam window is October 26 to 28.",
        "w15": "The final window is December 14 to 16."}

rows = []
part = None
for w in WEEKS:
    if w["part"] != part:
        part = w["part"]
        rows.append('<tr><td colspan="4"><b>%s</b></td></tr>' % PARTS[part])
    if w["key"] in LIVE:
        state = "Open now"
    else:
        state = "Opens " + pretty(w["opens"])
    detail = w["title"]
    if w.get("note"):
        detail += ". " + w["note"]
    if w["key"] in EXAM:
        if not detail.endswith("."):
            detail += "."
        detail += " " + EXAM[w["key"]]
    rows.append('<tr><td><b>%s</b></td><td>%s</td><td>%s</td><td>%s</td></tr>'
                % (w["label"], span(w), detail, state))

BODY = """<section class="card">
  <h2>Weeks 2 and 3 are one block</h2>
  <p>I gave you the two weeks together on one set of material, because the cell
    is where this course gets hard and a single week is not enough time to do it
    properly. There is no separate Week 3 to find. It is the same week, twice as
    long.</p>
  <p><b>Everything in the block is due Sunday, September 27.</b> The next week to
    open is Week 4, on Monday, September 28.</p>
</section>

<section class="card">
  <h2>All fifteen weeks</h2>
  <p>A week opens at 8:00 am Pacific on its Monday and everything in it is due
    Sunday night, unless that week's page says otherwise. Discussions are the
    usual exception, because the first post is due earlier in the week so replies
    have something to reply to.</p>
  <div class="tablewrap">
    <table>
      <thead><tr><th scope="col">Week</th><th scope="col">Dates</th><th scope="col">What it covers</th><th scope="col">Status</th></tr></thead>
      <tbody>
%(rows)s
      </tbody>
    </table>
  </div>
</section>

<section class="card">
  <h2>The same eight steps every week</h2>
  <p>Whatever the topic, the week runs the same way: your first pass on paper,
    the concept videos in a second color, upload the Competency Study Guide, study it for
    several days, the lab, your patient chart entry, the discussion, then the
    Mastery Check.</p>
  <div class="btns">
    <a class="btn sec" href="how-every-week-works.html">How every week works</a>
    <a class="btn sec" href="course.html">Back to the course list</a>
  </div>
</section>
""" % dict(rows="\n".join("        " + r for r in rows))

io.open(os.path.join(HERE, "body", "course-schedule.html"), "w", encoding="utf-8").write(BODY)
print("body/course-schedule.html %6d bytes, %d rows" % (len(BODY), len(rows)))
