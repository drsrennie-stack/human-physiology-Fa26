# -*- coding: utf-8 -*-
"""
Builds the Week 2 step pages from Step 3 on.

Step 1, Your first pass, comes from firstpass.py. Step 2 is the concept video
page, concept-videos-week03.html, which carries all 63 Week 2 videos.

Sep 15 2026: every Week 2 due date moved to Sunday, September 27. Weeks 2 and
3 are one long stretch with the material and nothing is due in between, so the
deadline sits at the end of it rather than in the middle.

LINK POLICY, same as Week 1. A link goes to a PDF, a Canvas submission page,
or one of the interactive tools that has no PDF equivalent and lives on the
course site.
"""

import io, os
from kit import (page, card, btn, btns, steps, ul, p, graded, esc)

OUT = "/home/claude/rebase"
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616/"

DUE = "Sunday, September 27, 10:00 pm Pacific"

PAGES = []

# ============================================================ STEP 3
PAGES.append(dict(
 step=3, stage="Learn", title="Upload both note sheets",
 when="After your second pass, by Sunday, September 27",
 lead=p("Both halves, both colors, photographed and uploaded.", "lede"),
 body=(
  card(
    '<h2>What I am looking for</h2>',
    p("I am not grading the sheets. I mark them complete or not complete, and I read enough to "
      "see how the week went for you. Turning them in is how you show you are participating, and "
      "participating is a condition of staying enrolled."),
    p("One file is fine if you can combine them. Two files is fine too."),
    p("<b>Handwritten and on paper, in your two colors.</b> A typed sheet closes the gap between "
      "the passes, and that gap is the whole point."),
  )
  + card(
    '<h2>How to photograph them</h2>',
    steps([
      "One page at a time, flat on the table, in good light, straight down rather than at an angle.",
      "Check that both colors are readable. If the second color is pale, take it again nearer a window.",
      "Keep the two halves in order, the cell and tissues first, then transport and signaling, so "
      "I can follow your week.",
      "Combine the pages into one file, or upload two, and turn it in.",
    ]),
    p("Photograph each page as you finish it rather than all of them on the last night. Losing a "
      "sheet costs you no points and a great deal of work."),
    btns(btn("Upload your Week 2 note sheets", CANVAS + "assignments", "canvas")),
    graded("<b>Graded.</b> Complete or not complete, for participation. Due " + DUE + "."),
  )),
 next="<b>When this is done:</b> go to Step 4, study it for several days."))

# ============================================================ STEP 4
PAGES.append(dict(
 step=4, stage="Practice", title="Study it for several days",
 when="Every day from Thursday, about an hour a day",
 lead=p("Now both note sheets close and the material has to come back out of your head.", "lede"),
 body=(
  card(
    '<h2>Little and often, not one long night</h2>',
    p("Four short sessions beat one long one, because the forgetting in between is what makes the "
      "memory stick. Pick from these and try more than one. None of it is graded."),
    '<h3>Rx Cards</h3>',
    p("Spaced recall cards for this week. Rate your confidence honestly. A confident wrong answer "
      "is the one the cards will chase."),
    '<h3>Draw it from memory</h3>',
    p("Redraw one note sheet box on a blank canvas with nothing open, then check it against the sheet."),
    '<h3>Brain dump</h3>',
    p("Take a competency prompt cold, on paper. This is what the midterm feels like."),
    '<h3>Book problems</h3>',
    p("Work them forward before you look, then backward from the answer to see how the author got there."),
    '<h3>Study With Me</h3>',
    p("Do any of the above with other people and quiz each other."),
    btns(btn("Rx Cards", SITE + "rx-cards.html", "tool"),
         btn("Draw it from memory", SITE + "mastery-canvas.html", "tool", primary=False),
         btn("Brain dump practice", SITE + "competency-brain-dump.html", "tool", primary=False),
         btn("Book problems", SITE + "assignment-bookproblems.html?week=2", "tool", primary=False),
         btn("Study With Me", SITE + "study-with-me.html", "tool", primary=False)),
  )
  + card(
    '<h2>One thing worth doing this week specifically</h2>',
    p("Put the two halves side by side. Take one structure from the anatomy sheet and say what "
      "transport or signaling job it does on the physiology sheet. <b>That link is what the exam "
      "asks for</b>, and it is the thing that does not come from studying either half on its own."),
  )),
 next="<b>When this is done:</b> go to Step 5, the amylase lab."))

# ============================================================ STEP 5
PAGES.append(dict(
 step=5, stage="Apply", title="Lab, PhysioEx Exercise 8, amylase",
 when="Any time in the two weeks, about 3 hours",
 lead=p("Your first PhysioEx lab. What a protein can do while it holds its shape.", "lede"),
 body=(
  card(
    '<h2>What you are doing</h2>',
    p("Amylase is a protein, and this week is about what proteins in and on the cell can do while "
      "they hold their shape. Run the amylase activity only. Pepsin and lipase wait for Week 11."),
    steps([
      "Open PhysioEx through Access Pearson in the Canvas course menu.",
      "Run the amylase assay, varying temperature and then pH.",
      "Plot activity against each by hand.",
      "Record what the lab page asks for on the analysis sheet, and turn that sheet in.",
    ]),
    p("<b>The controls are the whole point of the assay.</b> They are what let you claim the "
      "change was the enzyme and not something else in the tube."),
    btns(btn("Open the Week 2 lab instructions", SITE + "assignment-physioex.html?week=2", "tool"),
         btn("Lab analysis sheet", SITE + "lab-report-form.html", "tool", primary=False),
         btn("Turn the lab in", CANVAS + "assignments", "canvas", primary=False)),
    graded("<b>Graded.</b> Investigation category. Due " + DUE + "."),
  )),
 next="<b>When this is done:</b> go to Step 6, your patient."))

# ============================================================ STEP 6
PAGES.append(dict(
 step=6, stage="Apply", title="Your patient, the student health visit",
 when="About 90 minutes",
 lead=p("Your patient is back, thirsty, tired, and losing weight while eating more.", "lede"),
 body=(
  card(
    '<h2>What this entry asks</h2>',
    p("Follow what the insulin to glucagon ratio switches on and off inside her cells. Insulin "
      "acts through a receptor enzyme on the cell surface, which is one of this week's "
      "competencies, so <b>the pathway you drew in Step 1 is where this case starts</b>."),
    steps([
      "Draw the loop by hand.",
      "Answer the written questions on the case page.",
      "Log any AI you used, and what you used it for.",
      "Add the entry to your chart behind the Week 1 one.",
      "Upload the entry in Canvas.",
    ]),
    btns(btn("Open the Week 2 case", SITE + "assignment-apply.html?week=2", "tool"),
         btn("Your patient chart, all term", SITE + "patient-chart-book.html", "tool", primary=False),
         btn("Turn in your chart entry", CANVAS + "assignments", "canvas", primary=False)),
    graded("<b>Graded.</b> Application category. Due " + DUE + "."),
  )),
 next="<b>When this is done:</b> go to Step 7, the discussion."))

# ============================================================ STEP 7
D2 = CANVAS + "discussion_topics/712810"
PAGES.append(dict(
 step=7, stage="Apply", title="Discussion 2, predict then check",
 when="Post by Friday, September 25; two replies by Sunday, September 27",
 lead=p("One post, two parts. The physiology worked as a prediction you then check, then what the "
        "week's evidence told you about your own learning. Both halves are required. This is the "
        "shape every discussion takes from here to Week 15.", "lede"),
 body=(
  card(
    p("<b>Part 2 asks about your Mastery Check</b>, so take that first at Step 8, then come back "
      "and write this."),
  )
  + card(
    '<h2>Part 1. The physiology: predict, then check</h2>',
    p("This week is about what holds cells together and what that buys the tissue. Junctions are "
      "not decoration. What a tissue can do, and what goes wrong when it fails, usually comes "
      "straight back to which junctions are holding it."),
    '<h3>Pick one place in the body</h3>',
    ul(["The lining of your small intestine, where food is on one side and your blood is on the other.",
        "Cardiac muscle, at the intercalated disc between two heart cells.",
        "The outer layer of your skin, which is pulled and stretched all day."]),
    '<h3>Predict first, before you look anything up</h3>',
    p("Two lines: which kind of junction do you think is doing most of the work in that place, and "
      "what is the first thing that would go wrong if it failed? <b>Write it down and do not "
      "change it.</b>"),
    '<h3>Then work it properly</h3>',
    steps([
      "Name the junctions actually present there. Most tissues use more than one, so name each and "
      "say what it is built from and what it anchors to inside the cell.",
      "Say what each one buys that tissue: does it seal the gap between cells, hold them together "
      "against pulling, or let ions and small molecules pass from one cell to the next?",
      "Pick one substance and say how it gets from one side of that tissue to the other, through "
      "the cells or between them. Then say which junction decides that.",
      "Follow one failure all the way out. Take the junction you named in your prediction, break "
      "it, and trace it to something a person would notice or a clinician would measure.",
      "One sentence on why this tissue has the junctions it has and not the others. What is the "
      "job that made this the right answer?",
    ]),
    p("<b>Attach your hand drawn sketch</b>, photographed or scanned. Two neighboring cells side "
      "by side, every junction labeled, and arrows showing what can pass and what cannot. The post "
      "does not count without it."),
  )
  + card(
    '<h2>Part 2. What the evidence told you</h2>',
    p("You chose how to learn this week, and two things told you whether that choice worked: your "
      "prediction above, and your Mastery Check. Both gave you evidence before any grade depended "
      "on it. The move is <b>decision, evidence, adjustment</b>, the same three steps as a "
      "clinical write up, turned on yourself."),
    '<h3>Answer all four</h3>',
    steps([
      "<b>How did your prediction do?</b> Right, half right, or wrong, and name the specific idea "
      "that had to change. The two that catch people out most this week are assuming a junction "
      "that holds cells together also seals the space between them, and forgetting that a sheet of "
      "cells has a route between the cells as well as through them. Say what you were assuming "
      "that made the wrong prediction feel right.",
      "<b>What did your Mastery Check reveal?</b> One specific thing you thought you knew and did "
      "not. Something like: I could list the junction types but could not say which one a drug "
      "would have to get past. Not: cell junctions.",
      "<b>What did you do about it?</b> Changed the resource, changed the approach, drew it, said "
      "it out loud, asked someone. Or kept what you were doing, if you can say how you knew it was "
      "working. Not: I studied more.",
      "<b>What happened when you tried again?</b> Whether it held, and how you could tell. "
      "Something like: I redrew the intercalated disc from a blank page without looking. Not: it "
      "felt better.",
    ], one=True),
    '<h3>Your numbers are yours</h3>',
    p("You do not have to post your Mastery Check score, your attempt count, or anything else with "
      "a number on it. Improving a lot, improving a little, holding steady, or sliding tells your "
      "classmates everything useful. Share the numbers too if you want to; that is your call. Your "
      "practice log comes to me separately as an assignment, so I can reach out if I see you "
      "struggling."),
    '<h3>Replies</h3>',
    p("Two of them, by Sunday, September 27. Take someone's adjustment and ask what happens if they "
      "try it on something else. Name where their reasoning and yours came apart, and ask about it "
      "rather than correcting it. Offer what worked for you on the same gap, specifically enough to "
      "do tomorrow."),
    btns(btn("Submit Discussion 2", D2, "canvas")),
    graded("<b>Graded.</b> Thinking category. Post Friday, September 25, 10:00 pm. Replies "
           "Sunday, September 27, 10:00 pm. All Pacific."),
  )),
 next="<b>When this is done:</b> go to Step 8, the Mastery Check."))

# ============================================================ STEP 8
PAGES.append(dict(
 step=8, stage="Check", title="Mastery Check, and upload your report",
 when="30 to 60 minutes, and do it early enough to act on it",
 lead=p("Find out what is actually in your head, before a grade depends on it.", "lede"),
 body=(
  card(
    '<h2>How it works</h2>',
    steps([
      "Generate a practice exam on Week 2, or on Weeks 1 and 2 together.",
      "Take it with nothing open.",
      "It shows you every answer and the reasoning behind it, then names the competencies that "
      "cost you points.",
      "Do it again if you want. Do one or do ten.",
      "Save the report and upload it in Canvas.",
    ]),
    p("<b>Take this early in the two weeks, not on the last night.</b> Discussion 2 asks what it "
      "told you and what you did about it, and you cannot answer that if you took it an hour "
      "before the deadline."),
    p("The report is tracked complete or not complete. <b>The score is for you, not for a grade.</b>"),
    btns(btn("Take a Week 2 Mastery Check", SITE + "practice-exam.html?week=2", "tool"),
         btn("Upload the report in Canvas", CANVAS + "assignments", "canvas", primary=False)),
    graded("<b>Graded.</b> Complete or not complete. Due " + DUE + "."),
  )),
 next="<b>That is the last step of Week 2.</b> Everything is due by " + DUE + ". Week 3 adds no new "
      "work, so the two weeks are yours to do this properly."))

NAMES = {3: "upload-note-sheets", 4: "study-it", 5: "lab", 6: "patient",
         7: "discussion", 8: "mastery-check"}

if __name__ == "__main__":
    for d in PAGES:
        out = page(step=d["step"], total=8, title=d["title"], stage=d["stage"],
                   when=d["when"], lead=d["lead"], body=d["body"], nextline=d["next"])
        out = out.replace("bio005-w1-step-", "bio005-w2-step-").replace("Week 1 &middot;", "Week 2 &middot;")
        out = out.replace("Week 1, Step %d:" % d["step"], "Week 2, Step %d:" % d["step"])
        name = "w02-step-%02d-%s.html" % (d["step"], NAMES[d["step"]])
        io.open(os.path.join(OUT, name), "w", encoding="utf-8").write(out)
        print("%-36s %6d bytes" % (name, len(out)))
