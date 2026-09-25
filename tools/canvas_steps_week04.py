# -*- coding: utf-8 -*-
"""
Week 4 content for the Canvas step pages. tools/build_canvas_week_steps.py
turns this into one paste-ready page per step. To make another week, copy
this file to canvas_steps_weekNN.py and rewrite the words; the structure and
the styling come from the builder.

Every step has:
  title    the Canvas page title after "Week N, Step M | "
  time     how long it takes
  status   what it counts for, in one short line
  intro    one or two sentences on what this step is for
  todo     numbered things to do, in order
  links    (label, course site path) pairs; every one opens the course site in a new tab
  turnin   None when nothing is turned in, else a list of short sentences
Text may use <strong> only. Everything else is escaped by the builder.
"""

WEEK = 4
TITLE = "Membrane potential, neurons and synapses"
DUE = "Sunday, October 4 at 10:00 pm"

STEPS = [
 dict(title="Pre-read, before anything else", time="30 minutes at most",
  status="Turned in. Complete or not complete.",
  intro="A quick look ahead, not a full read. You look at the headings and figures and answer a few short questions, "
        "so the lessons make more sense when you get to them.",
  todo=["Open the Week 4 pre-read.",
        "In Silverthorn Chapter 5, Membrane Dynamics, read the part near the end on the resting membrane potential. "
        "Then skim Chapter 9, Neurons: Cellular and Network Properties, looking at the headings and the figures.",
        "Answer the questions on the pre-read in a few words each. Short answers are fine.",
        "Save the page as a PDF with the button at the bottom, or photograph your paper copy."],
  note="Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter "
       "title and the topic, and use the search in your eText.",
  links=[("The Week 4 pre-read", "week-04-preread.html")],
  turnin=["Upload the PDF or photo to the <strong>Week 4 pre-read</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="First pass, in your first color", time="3 to 4 hours",
  status="Not turned in yet. You upload it in Step 4.",
  intro="This is where you learn the week. You work through the lessons and fill in your Competency Study Guide "
        "in one color as you go.",
  todo=["Print your Week 4 Competency Study Guide, or open it on a tablet. Pick two pens you can tell apart.",
        "Read the Week 4 competencies first, so you know what you are looking for.",
        "Open the Week 4 lessons and work through them in order. Start with the three walkthroughs: neurons and "
        "neuroglia, then the resting membrane potential, then ion channel gating. Then the lessons on graded "
        "potentials and the action potential, how action potentials carry information, the chemical synapse, "
        "and integration at the synapse.",
        "Watch the short videos as you go, and again whenever you need them. In the walkthroughs, look for the "
        "<strong>Stuck? Watch a short explanation</strong> button on the steps where a video helps.",
        "For each competency, pick prompt A or prompt B and draw it in the box in your first color.",
        "After the three walkthroughs, do the drawing sheet from memory, with the walkthrough closed."],
  links=[("Your Week 4 Competency Study Guide, to print (PDF)", "sheets/BIO005-note-sheet-week-04.pdf"),
         ("Your Week 4 Competency Study Guide, on screen", "note-sheet.html?week=4"),
         ("The Week 4 competencies", "week-04-competencies.html"),
         ("The Week 4 lessons, in order", "lecture-week.html?week=4"),
         ("The Week 4 drawing sheet", "biol005-w04-drawing-sheet.html")],
  turnin=None),

 dict(title="Second pass, in your second color", time="30 to 60 minutes",
  status="Not turned in yet. You upload it in Step 4.",
  intro="You go back through the same lessons and add to the same boxes in your second color. The difference "
        "between your two colors shows you what you learned the second time through.",
  todo=["Switch to your second pen.",
        "Go back through the same Week 4 lessons. Watch a video again any time a part is still unclear.",
        "Add what you missed, fix what was wrong, and add anything that clicked this time, in the same boxes.",
        "Do not erase your first color. The gap between the two colors is the most useful thing on the page."],
  links=[("The Week 4 lessons, in order", "lecture-week.html?week=4"),
         ("Your Week 4 Competency Study Guide, on screen", "note-sheet.html?week=4")],
  turnin=None),

 dict(title="Upload your Competency Study Guide", time="About 10 minutes",
  status="Turned in. Complete or not complete.",
  intro="You turn in your guide with both colors on it, so I can see how the week went for you.",
  todo=["Check that every box has your first color and your second color.",
        "Photograph or scan every page, in order.",
        "Put all the pages into one file, a PDF if you can."],
  links=[("How the Competency Study Guide works", "assignment-notesheet.html")],
  turnin=["Upload the one file to the <strong>Week 4 Competency Study Guide</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="Study it for several days", time="4 sessions of 30 to 45 minutes, on different days",
  status="Not turned in. No points.",
  intro="Getting the material back out of your head is what makes it stay. Spread these sessions across the week "
        "instead of doing them in one sitting.",
  todo=["Do Rx Cards for Week 4. They get harder as you get them right, and every answer comes with the reason.",
        "Do a brain dump: pick a competency, close everything, and write or draw all you can. Then check it and "
        "note what you left out.",
        "Draw a mechanism from nothing on the drawing canvas, then check it against your guide.",
        "Watch a video again when a brain dump shows a gap you cannot fill from your guide."],
  links=[("Rx Cards", "rx-cards.html"),
         ("Try It From Memory, the brain dump", "competency-brain-dump.html"),
         ("Draw it, the drawing canvas", "mastery-canvas.html"),
         ("Study With Me, optional group study", "study-with-me.html")],
  turnin=None),

 dict(title="Mastery Check, and upload your report", time="35 to 50 minutes per try",
  status="Turned in. No points, but it has to be turned in.",
  intro="The Mastery Check tells you which competencies are solid and which need another round. Take it as many "
        "times as you like; each try is a fresh set of questions.",
  todo=["Open the Mastery Check. It is set to Week 4 and 50 questions.",
        "An attempt counts as your Mastery Check when it covers one week, has at least 50 questions, tests every "
        "competency, and you score 80 percent or higher. The report says Met or Not yet for each of those.",
        "If it says Not yet, go back to Step 5 for the competencies it lists, then take it again. If you could not "
        "start a competency at all, go back to Step 3 for that one.",
        "When an attempt meets the standard, open the report and save it as a PDF."],
  links=[("The Week 4 Mastery Check", "practice-exam.html?week=4&n=50"),
         ("How to save and upload your report", "assignment-practice-log.html")],
  turnin=["Upload the report to the <strong>Week 4 Mastery Check</strong> assignment in Canvas.",
          "Due " + DUE + ". Upload the attempt that meets the standard."]),

 dict(title="Lab, PhysioEx Exercise 3", time="2 to 3 hours",
  status="Graded. Investigate It, 25 percent of your grade across the term.",
  intro="You run PhysioEx Exercise 3, Neurophysiology of Nerve Impulses, and record what you measured and found "
        "on the Week 4 lab worksheet.",
  todo=["Open PhysioEx through <strong>Access Pearson</strong> in the Canvas menu on the left, and run Exercise 3, "
        "Activities 1 to 9.",
        "Fill in the lab worksheet as you go. For each activity it asks what you measured, what you found, and "
        "what you learned.",
        "Answer the two questions at the end of the worksheet.",
        "Save the worksheet as a PDF with the button at the bottom, or photograph your paper copy."],
  note="The exercise has to show complete in Pearson, and the points are on your worksheet. You need both.",
  links=[("The Week 4 lab worksheet", "lab-worksheet-week04.html"),
         ("What to run and record in PhysioEx this week", "assignment-physioex.html?week=4")],
  turnin=["Upload the worksheet to the <strong>Week 4 lab</strong> assignment in Canvas.",
          "Due " + DUE + "."]),

 dict(title="Your application case", time="About 1 hour",
  status="Graded. Use It, 20 percent of your grade across the term.",
  intro="This week's case is Camila Reyes, the first four hours of her treatment. You use the week's physiology "
        "to explain what is happening to her.",
  todo=["Open this week's case and read the chart.",
        "Put your entry point at the top of your page. Use the same one every week.",
        "Answer all five questions in order and numbered, then the prompt for your entry point. About a page in "
        "total. Handwritten is fine.",
        "Add your AI disclosure at the end, even if it is one line saying you used none.",
        "Photograph or scan it into one PDF, in order."],
  links=[("This week's case: resuscitation, hours 0 to 4", "assignment-apply.html?week=4")],
  turnin=["Upload the PDF to the <strong>Week 4 application case</strong> assignment in Canvas and wait for the "
          "confirmation screen.",
          "Due " + DUE + "."]),

 dict(title="Your patient, this week's findings", time="About 30 minutes",
  status="Not turned in this week. The whole chart is turned in once, on Wednesday, December 16.",
  intro="You keep Camila's chart by hand all term. Each week you add that week's numbers and your thinking.",
  todo=["Open your patient chart and this week's released results.",
        "Copy this week's numbers into your flowsheets first. Copying them by hand is how you notice a trend.",
        "Fill in this week's page: what changed, the problem list, the drawing, and your thinking.",
        "Keep the chart. Do not upload it this week."],
  links=[("Your patient chart", "patient-chart-book.html"),
         ("What you turn in on December 16", "assignment-patient-chart.html")],
  turnin=None),

 dict(title="Discussion 4, practice the exam format", time="About 1 hour",
  status="Graded. Think About It, 15 percent of your grade across the term.",
  intro="This discussion is a practice run of your exam format, done on cell transport from Week 2. The material "
        "is familiar, so you can put your attention on the format itself.",
  todo=["Open the Week 4 discussion page and do Parts 1 and 2 with your notes, the slides and the book closed.",
        "Do the two brain dumps, about 10 minutes each, then check each one against its rubric.",
        "Answer the hard question, design a model that answers it, and record a 2 to 3 minute teaching video.",
        "Check your video against the rubric, then answer the three reflection questions.",
        "Post in the Week 4 discussion in Canvas."],
  links=[("The Week 4 discussion page", "discussion-week04.html")],
  turnin=["Your post goes in the <strong>Week 4 discussion</strong> in Canvas by Friday, October 2 at 10:00 pm.",
          "Two replies by " + DUE + ". In each reply, name one point they explained clearly and one point you "
          "would add, with a sentence on why it matters."]),
]
