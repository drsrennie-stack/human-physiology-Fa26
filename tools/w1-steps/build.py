# -*- coding: utf-8 -*-
"""
Builds the Week 1 step pages from Step 3 on.

Step 1, Your first pass, is built by firstpass.py, which makes the same page
for every week. Step 2 is the concept video page, concept-videos-week01.html,
which already exists and is built the same way. Sep 14 2026: the old Step 1
(print your week) and Step 2 (first pass) were folded into one page and the
course introduction video came off, so the week is eight steps, not nine.

LINK POLICY, decided Sep 14 2026. A link on one of these pages goes to exactly
one of three places:
  1. a PDF,
  2. a Canvas submission page,
  3. one of the interactive tools that has no PDF equivalent and lives on the
     course site: the Reference Range Lab, the Mastery Check, the Week 1 case
     and patient chart, and the five study tools.
Everything that used to be a link to a document on the course site is now a
PDF, and the two Week 1 PDFs that did not exist were built for this drop.
"""

import io, os
from kit import (page, card, btn, btns, steps, ul, p, graded, pending, esc, deck)

OUT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616/"

# --- the PDFs -------------------------------------------------------------
NOTE_SHEET = "https://drive.google.com/file/d/1AN276f3jUYM9HcV9QqHa2HYSLy0_YcNs/view"
PACKET     = SITE + "print/BIO005-Week1-Packet.pdf"
COMPLIST   = SITE + "print/BIO005-Week1-Competency-List.pdf"

DUE = "Sunday, September 13, 10:00 pm Pacific"

PAGES = []

# STEPS 1 AND 2 moved out. They are now one page, 'Your first pass',
# built by firstpass.py. The course introduction video came off with them:
# the Canvas module format made it obsolete. Sep 14 2026.

# ============================================================ STEP 3
PAGES.append(dict(
 step=3, stage="Learn", title="Upload your note sheet",
 when="After your second pass, by Sunday",
 lead=p("Both colors on the page, photographed and uploaded as one file.", "lede"),
 body=(
  card(
    '<h2>What I am looking for</h2>',
    p("I am not grading the sheet. I mark it complete or not complete, and I read enough of it to see how "
      "the week went for you. Turning it in every week is how you show you are participating, and "
      "participating is a condition of staying enrolled."),
    p("Whether you filled the boxes from the book, the packet, the videos or all three is up to you. "
      "The sheet just has to show two passes."),
    p("<b>Handwritten and on paper, in your two colors.</b> A typed sheet closes the gap between the "
      "passes, and that gap is the whole point."),
  )
  + card(
    '<h2>How to photograph it</h2>',
    steps([
      "One page at a time, flat on the table, in good light, straight down rather than at an angle.",
      "Check that both colors are readable. If the second color is pale, take it again nearer a window.",
      "Combine the pages into one file, in order. Most phones do this from the Files or Notes app, and "
      "any free scanner app will too.",
      "Upload that one file in Canvas.",
    ]),
    p("Photograph each page as you finish it rather than all six on Sunday night. Losing the sheet costs "
      "you no points and a great deal of work."),
    btns(btn("Upload your Week 1 note sheet", CANVAS + "assignments/1241504", "canvas")),
    graded("<b>Graded.</b> Complete or not complete, for participation. Due " + DUE + "."),
  )),
 next="<b>When this is done:</b> go to Step 4, study it for several days."))

# ============================================================ STEP 4
PAGES.append(dict(
 step=4, stage="Practice", title="Study it for several days",
 when="Every day from Thursday, about an hour a day",
 lead=p("Now the note sheet closes and the material has to come back out of your head.", "lede"),
 body=(
  card(
    '<h2>Little and often, not one long night</h2>',
    p("Four short sessions beat one long one, because the forgetting in between is what makes the memory "
      "stick. Pick from these and try more than one. None of it is graded."),
    deck(SITE, 1),
    p("These open in a new browser tab, because Rx Cards and Brain Dump both keep track of your "
      "progress and can only do that properly in their own tab. Close the tab and you are back here."),
  )),
 next="<b>When this is done:</b> go to Step 5, the Reference Range Lab."))

# ============================================================ STEP 5
PAGES.append(dict(
 step=5, stage="Apply", title="Lab, the Reference Range Lab",
 when="Wednesday to Sunday, about 3 hours",
 lead=p("Where does a normal range on a lab report actually come from?", "lede"),
 body=(
  card(
    '<h2>What you are doing</h2>',
    steps([
      "Calculate a reference range from a set of measurements.",
      "Decide which results fall in range and which fall out of it.",
      "Plot three serial results by hand and say what the trend means.",
      "Record what the lab page asks for as you go, and turn it in as one file in Canvas.",
    ]),
    p("Work the lab page top to bottom. It is built to be worked in order, not skimmed."),
    btns(btn("Open the Reference Range Lab", SITE + "reference-range-lab.html", "tool"),
         btn("Turn the lab in", CANVAS + "assignments/1240111", "canvas", primary=False)),
    graded("<b>Graded.</b> Investigation category. Due " + DUE + "."),
  )),
 next="<b>When this is done:</b> go to Step 6, your patient."))

# ============================================================ STEP 6
PAGES.append(dict(
 step=6, stage="Apply", title="Your patient, the preseason physical",
 when="Saturday, about 90 minutes",
 lead=p("Meet your patient. Every week you add one entry to their chart.", "lede"),
 body=(
  card(
    '<h2>What one chart entry needs</h2>',
    steps([
      "Draw this week's control loop by hand.",
      "Answer the written questions on the case page.",
      "Log any AI you used, and what you used it for.",
      "Add the entry to your chart in order, behind the ones before it.",
      "Upload the entry in Canvas.",
    ]),
    p("This week's encounter is the preseason physical. The case page walks you through all five."),
    btns(btn("Open the Week 1 case", SITE + "assignment-apply.html?week=1", "tool"),
         btn("Your patient chart, all term", SITE + "patient-chart-book.html", "tool", primary=False),
         btn("Turn in your chart entry", CANVAS + "assignments", "canvas", primary=False)),
    graded("<b>Graded.</b> Application category. Due " + DUE + "."),
  )),
 next="<b>When this is done:</b> go to Step 7, the two discussions."))

# ============================================================ STEP 7
D1 = CANVAS + "discussion_topics/712733"
D2 = CANVAS + "discussion_topics/713315"
PAGES.append(dict(
 step=7, stage="Apply", title="Two discussions this week",
 when="Discussion 1 by Friday; Discussion 2 by Sunday",
 lead=p("Everything you need for both is on this page, and each one has its own submit button underneath "
        "it. Do them in the order they appear.", "lede"),
 body=(
  card(
    p("<b>Discussion 2 asks about your Mastery Check</b>, so take that first, at Step 8, then come back "
      "here and write it. Both are due the same night."),
  )
  + card(
    '<h2>Discussion 1: your digital vision board</h2>',
    p("Before we talk physiology, it is important to me to know who you are, and for you to get to know "
      "each other. This class runs online, so we do not get the accidental version of this, the talking "
      "before lecture starts. We are doing it on purpose, in week one, before anything else. This is your "
      "introduction, and there is no separate introduce yourself post to do as well."),
    '<h3>What you are making</h3>',
    p("A vision board is a collage: several images arranged together so they read as one picture. Photos, "
      "cut outs, words, colors, whatever gets it across. Build it in Canva, in Google Slides, in a photo "
      "app, or on paper with scissors and glue and then photograph it. What you turn in is "
      "<b>one image file</b> of the finished collage."),
    p("Cover four things, weighted however you like."),
    steps([
      "<b>Who you are.</b> Photos of yourself if you are comfortable, and only what you are happy for "
      "classmates to see.",
      "<b>What matters to you.</b> People, places, things you care about, what you do when you are not "
      "in class.",
      "<b>Why you are taking this class.</b> The real reason. It is required for my program is a real "
      "reason and you can say so.",
      "<b>Where you are going.</b> What you are working toward, in school or after it.",
    ]),
    '<h3>On privacy, and I mean this</h3>',
    p("Share only what you want classmates to have. Do not put your address, your workplace, your "
      "schedule, your phone number, or anything with a document number on it into the board. If you "
      "would rather not include photos of yourself, use images that represent you instead. Nobody loses "
      "a point for that. If there is something you want me to know but not the class, message me in the "
      "Canvas Inbox."),
    '<h3>Three ways to build it</h3>',
    ul(["<b>Pinterest.</b> Build a board, arrange it, screenshot it. Send the screenshot, not the board link.",
        "<b>One slide.</b> PowerPoint or Google Slides. Drop images and text on one slide, then export "
        "the slide as an image.",
        "<b>All video.</b> Skip the image and make the whole thing as one video, showing and telling as "
        "you go."]),
    '<h3>How to post</h3>',
    p("Attach your board image to the discussion with a short video of you introducing yourself and "
      "walking us through it. A phone video is perfect. Post by <b>Friday, September 11, 10:00 pm "
      "Pacific</b>, so there is someone to meet over the weekend. Then reply to at least two classmates "
      "by <b>Sunday, September 13, 10:00 pm</b>. Real replies, about their board, not nice board."),
    btns(btn("Submit Discussion 1: digital vision board", D1, "canvas")),
  )
  + card(
    '<h2>Discussion 2: what did the evidence tell you?</h2>',
    p("This week you chose how to learn the material. Your Mastery Check then told you whether that "
      "choice worked, before any grade depended on it. This post is where you look at that evidence and "
      "say what you did with it: <b>decision, evidence, adjustment</b>, the same three moves as a "
      "clinical write up, turned on yourself."),
    p("Week 1 is the only week with a Sunday post date, because the vision board is already due Friday "
      "and three of these questions are about a Mastery Check you take later in the week. From Week 2 "
      "on: post by Friday, two replies by Sunday."),
    '<h3>Answer these four</h3>',
    steps([
      "<b>What did your Mastery Check reveal?</b> One specific thing you thought you knew and did not. "
      "Something like: I could name the three parts of a control loop but kept calling the integrating "
      "center a receptor. Not: feedback loops.",
      "<b>What did you do about it?</b> Changed the resource, the approach, drew it, said it out loud, "
      "asked someone. Or kept what you were doing, if you can say how you knew it was working. Not: I "
      "studied more.",
      "<b>What happened when you tried again?</b> Whether it held, and how you could tell. Something "
      "like: I rebuilt the loop from a blank page without looking. Not: it felt better.",
      "<b>The physiology question.</b> What you thought homeostasis meant before this week, and what you "
      "think it means now. If it has not moved, say that, and say what would move it. Not a textbook "
      "definition copied in.",
    ], one=True),
    p("Questions 1 to 3 are the same all fifteen weeks. Only question 4 changes."),
    '<h3>Your numbers are yours</h3>',
    p("You do not have to post your Mastery Check or practice exam results. The score, the count, the "
      "number of attempts can all stay private. Improving a lot, improving a little, holding steady, or "
      "sliding tells your classmates everything useful. Share the numbers too if you want to; that is "
      "your call. Your practice log comes to me separately, as an assignment, so I can reach out if I "
      "see you struggling."),
    '<h3>How to post</h3>',
    p("Four short paragraphs, one per question, one screen. Specific beats long. Text is fine, or a two "
      "minute video of you answering the four questions. Take your Mastery Check first, because three of "
      "the four questions are about it. Post by <b>Sunday, September 13, 10:00 pm Pacific</b>."),
    p("<b>Had a bad week?</b> Say so and answer anyway. I ran out of time, skipped the retrieval, and "
      "the check showed me what that cost is a strong post. You are graded on whether you looked at what "
      "happened and said something true about it, not on whether the week went well."),
    '<h3>Replies</h3>',
    p("Optional this week, required from Week 2. Read a few posts anyway; how other people are studying "
      "is most of the value of the thread."),
    ul(["Take someone's adjustment and ask what happens if they try it on something else.",
        "Name where their reasoning and yours came apart, and ask about it rather than correcting it.",
        "Offer what worked for you on the same gap, specifically enough to do tomorrow.",
        "Great post, I struggled with that too is kind and does not count. Add the sentence that comes "
        "after it."]),
    btns(btn("Submit Discussion 2: what the evidence told you", D2, "canvas")),
    graded("<b>Graded.</b> Thinking category. Discussion 1 post Friday, September 11, 10:00 pm; replies "
           "Sunday, September 13, 10:00 pm. Discussion 2 post Sunday, September 13, 10:00 pm. All Pacific."),
  )),
 next="<b>When this is done:</b> go to Step 8, the Mastery Check."))

# ============================================================ STEP 8
PAGES.append(dict(
 step=8, stage="Check", title="Mastery Check, and upload your report",
 when="Saturday or Sunday, 30 to 60 minutes",
 lead=p("Find out what is actually in your head, before a grade depends on it.", "lede"),
 body=(
  card(
    '<h2>How it works</h2>',
    steps([
      "Generate a practice exam on Week 1. Thirty questions, nothing open.",
      "Take it. It shows you every answer and the reasoning behind it.",
      "Read what it names as the competencies that cost you points.",
      "Do it again if you want. Do one or do ten.",
      "Save the report and upload it in Canvas.",
    ]),
    p("The report is tracked complete or not complete. <b>The score is for you, not for a grade.</b> I "
      "look at it so I can reach out if something is not landing."),
    btns(btn("Take a Week 1 Mastery Check", SITE + "practice-exam.html?week=1", "tool"),
         btn("Upload the report in Canvas", CANVAS + "assignments/1240401", "canvas", primary=False)),
    graded("<b>Graded.</b> Complete or not complete. Due " + DUE + "."),
  )),
 next="<b>That is the last step of Week 1.</b> Everything is due by " + DUE + "."))

# ============================================================ write
NAMES = {3: "upload-note-sheet", 4: "study-it", 5: "lab", 6: "patient",
         7: "discussions", 8: "mastery-check"}

written = []
for d in PAGES:
    html_out = page(step=d["step"], total=8, title=d["title"], stage=d["stage"],
                    when=d["when"], lead=d["lead"], body=d["body"], nextline=d["next"])
    name = "w01-step-%02d-%s.html" % (d["step"], NAMES[d["step"]])
    io.open(os.path.join(OUT, name), "w", encoding="utf-8").write(html_out)
    written.append((name, len(html_out)))

for n, b in written:
    print("%-36s %6d bytes" % (n, b))
print("%d pages" % len(written))
