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
  todo=["Open the Week 4 pre-read on screen, or download the printable copy if you would rather work on paper.",
        "In Silverthorn Chapter 5, Membrane Dynamics, read the part near the end on the resting membrane potential. "
        "Then skim Chapter 9, Neurons: Cellular and Network Properties, looking at the headings and the figures.",
        "Answer the questions on the pre-read in a few words each. Short answers are fine.",
        "Save the page as a PDF with the button at the bottom, or photograph your paper copy."],
  note="Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter "
       "title and the topic, and use the search in your eText.",
  links=[("The Week 4 pre-read, to fill in on screen", "week-04-preread.html"),
         ("The Week 4 pre-read, to print and do on paper (PDF)", "sheets/BIO005-Week4-Preread.pdf")],
  submit_here=["Upload your PDF or photo here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
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
  submit_here=["Upload the one file here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
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
  submit_here=["Upload your report here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Upload the attempt that meets the standard."],
  turnin=["Upload the report to the <strong>Week 4 Mastery Check</strong> assignment in Canvas.",
          "Due " + DUE + ". Upload the attempt that meets the standard."]),

 dict(title="Lab, PhysioEx Exercise 3", time="2 to 3 hours",
  status="Graded. Investigate It, 25 percent of your grade across the term.",
  intro="You run PhysioEx Exercise 3, Neurophysiology of Nerve Impulses, and record what you measured and found "
        "on the Week 4 lab worksheet.",
  todo=["Open PhysioEx through <strong>Access Pearson</strong> in the Canvas menu on the left, and run Exercise 3, "
        "Activities 1 to 9.",
        "Fill in the lab worksheet as you go, on screen or on the printable copy. For each activity it asks what you "
        "measured, what you found, and what you learned.",
        "Answer the two questions at the end of the worksheet.",
        "Save the worksheet as a PDF with the button at the bottom, or photograph your paper copy."],
  note="The exercise has to show complete in Pearson, and the points are on your worksheet. You need both.",
  links=[("The Week 4 lab worksheet, to fill in on screen", "lab-worksheet-week04.html"),
         ("The Week 4 lab worksheet, to print and do on paper (PDF)", "sheets/BIO005-Week4-Lab-Worksheet.pdf"),
         ("What to run and record in PhysioEx this week", "assignment-physioex.html?week=4")],
  submit_here=["Upload your worksheet here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". PhysioEx Exercise 3 also has to show complete in Pearson."],
  turnin=["Upload the worksheet to the <strong>Week 4 lab</strong> assignment in Canvas.",
          "Due " + DUE + "."]),

 dict(title="Your application case", time="About 1 hour",
  status="Not turned in this week. Your work goes into your patient chart.",
  intro="This week's case is Camila Reyes, the first four hours of her treatment. You use the week's physiology "
        "to explain what is happening to her, and that thinking goes into your patient chart, which is how you "
        "track her across the term.",
  todo=["Open this week's case and read the chart.",
        "Work through the five questions, using the physiology from this week, and the prompt for your entry point.",
        "Write your answers on this week's page of your patient chart, so they stay with her numbers.",
        "Keep your chart. Nothing from the case is uploaded this week."],
  links=[("This week's case: resuscitation, hours 0 to 4", "assignment-apply.html?week=4"),
         ("Your patient chart", "patient-chart-book.html")],
  turnin=None),

 dict(title="Your patient, this week's findings", time="About 30 minutes",
  status="Not turned in this week. The whole chart is turned in once, on Wednesday, December 16.",
  intro="You keep Camila's chart by hand all term. Each week you add that week's numbers and your thinking, "
        "including what you worked out in the case in Step 8.",
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

# The discussion carries everything in Canvas itself: the prompts, the rubrics
# (folded, so students open them only after they finish a part), the question,
# the reflection and what to post. Sep 25 2026, Scrubs: one page, not two.
DISCUSSION = dict(
 intro="This week's discussion is a practice run of your exam format. It uses only material you have already "
       "learned: every prompt comes from the Week 2 competencies on primary active transport, secondary active "
       "transport and transepithelial transport, including the pump, SGLT, GLUT2, the sodium calcium exchanger and "
       "ouabain. Nothing here needs Week 4, so you can put your attention on the format itself: brain dumps from memory, "
       "then one multiple choice question you work out with a physiological model, present on video, and then answer. Doing it "
       "once now means the exam will not be the first time.",
 how=["Close your notes, the slides, and the book for Parts 1 and 2. The point is to find out what you can do from memory.",
      "Give each brain dump about 10 minutes. Write or draw everything you can on paper, then stop.",
      "Open a rubric only after you finish that part. Check honestly: a point counts only if you clearly said it."],
 dumps=[
  ("Brain dump 1: the pump that powers another transporter",
   "Trace how the Na+/K+ ATPase powers calcium removal by the Na+/Ca2+ exchanger in a heart muscle cell. Then "
   "predict what happens to intracellular Ca2+ and to contraction strength if the pump is partly inhibited, and explain why.",
   ["The pump uses ATP to keep intracellular Na+ low, storing energy in the inward Na+ gradient",
    "The exchanger is an antiporter that moves Na+ in and Ca2+ out",
    "Na+ flowing downhill into the cell provides the energy to push Ca2+ out against its gradient",
    "Pump inhibition lets intracellular Na+ rise and flattens the Na+ gradient",
    "The exchanger has less driving force, so Ca2+ removal slows",
    "Intracellular Ca2+ rises and contraction becomes stronger"]),
  ("Brain dump 2: glucose from the gut to the blood",
   "Trace one glucose molecule from the lumen of the small intestine to the blood. Name the transporter at each "
   "membrane, say which membrane it sits on, state whether each step is uphill or downhill for glucose, and explain "
   "why the Na+/K+ ATPase is essential even though it never touches glucose.",
   ["SGLT on the apical membrane moves glucose into the cell with Na+",
    "The apical step is uphill for glucose, powered by Na+ moving downhill",
    "Glucose accumulates inside the cell to a high concentration",
    "GLUT2 on the basolateral membrane moves glucose out by facilitated diffusion, downhill",
    "Glucose then diffuses into the capillary",
    "The Na+/K+ ATPase on the basolateral membrane keeps intracellular Na+ low, which is what makes the apical Na+ step downhill"])],
 question="Ouabain is added to an intestinal epithelial cell. Trace the effect on intracellular Na+ and then on "
          "glucose uptake through SGLT at the apical membrane.",
 options=["A. Intracellular Na+ is unchanged, because SGLT keeps it low",
          "B. Intracellular Na+ rises, the Na+ gradient shrinks, and SGLT glucose uptake falls",
          "C. Intracellular Na+ rises, the Na+ gradient steepens, and SGLT glucose uptake rises",
          "D. Intracellular Na+ falls, and SGLT glucose uptake rises"],
 scoring="This is the exam question format, in the same order as the exam. You read the question and its four "
         "choices, take 10 minutes to prepare a physiological model from memory, present the model on video, and finish by giving "
         "your answer. The model and how you present it are worth 75 percent of the question's points, and your answer "
         "is worth 25 percent.",
 model="Set a timer for 10 minutes. With your notes, the slides and the book closed, design a physiological model that works out the answer. Draw an "
       "intestinal epithelial cell with its apical side facing the lumen and its basolateral side facing the blood. Put "
       "the Na+/K+ ATPase and SGLT on the correct membranes. Use arrows to show where Na+ and glucose move normally, and "
       "label which steps are uphill and which are downhill. Then mark what ouabain changes, step by step, until you "
       "reach glucose uptake. Photograph your model.",
 teach="Record a video of 2 to 3 minutes, with no notes. Present your model first: walk through it in order, from "
       "ouabain to the pump to Na+ to SGLT to glucose, and use it to explain why each wrong answer cannot be right. "
       "Finish by giving your answer, the letter and what it says. A phone video is fine.",
 answer_rubric=["I finished with B: intracellular Na+ rises, the Na+ gradient shrinks, and SGLT glucose uptake falls"],
 model_rubric=["My model is an intestinal epithelial cell with the lumen on the apical side and the blood on the basolateral side",
    "It puts SGLT on the apical membrane and the Na+/K+ ATPase on the basolateral membrane",
    "Arrows show Na+ and glucose moving normally, labeled uphill or downhill: glucose moves uphill through SGLT, powered by Na+ moving downhill",
    "It marks ouabain blocking the Na+/K+ ATPase, so Na+ is no longer pumped out",
    "It shows intracellular Na+ rising and the Na+ gradient across the apical membrane flattening",
    "It shows SGLT losing its energy source, so glucose uptake falls",
    "In my video I presented the model in order, from ouabain to glucose uptake, before I gave my answer",
    "I explained why C is wrong: the gradient cannot steepen when Na+ is rising inside",
    "I explained why D is wrong: Na+ cannot fall when its only exit, the pump, is blocked",
    "I explained why A is wrong: SGLT brings Na+ into the cell, so it cannot be what keeps Na+ low"],
 reflect=["Before you started, how confident were you, and was that confidence right?",
          "What did you get right, and what did you miss? Use your rubric checks.",
          "What will you do differently before the midterm because of this?"],
 post=["Photos of your two brain dumps and your physiological model.",
       "The letter you gave as your answer.",
       "Your video presenting your model. Use the media button in the reply box to record or upload it.",
       "Your rubric results: points for each brain dump (for example 5 of 6), whether your letter was right, and your model points (for example 8 of 10).",
       "Your three answers from Part 3."],
 replies="Watch two classmates' model videos. In each reply, name one step their model explained clearly and "
         "one thing you would add to the model, with a sentence on why it matters.",
 first_post="Friday, October 2 at 10:00 pm",
 onscreen=("If you would rather type your answers and tick the rubrics on screen, the same worksheet is on the "
           "course site. It is optional; everything you need is on this page.", "discussion-week04.html"),
)
