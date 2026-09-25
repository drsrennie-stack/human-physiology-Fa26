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
  todo=["Choose one: Choice 1, fill in the pre-read on screen, or Choice 2, print it and do it on paper. Both links are below.",
        "In Silverthorn Chapter 5, Membrane Dynamics, read the part near the end on the resting membrane potential. "
        "Then skim Chapter 9, Neurons: Cellular and Network Properties, looking at the headings and the figures.",
        "Answer the questions on the pre-read in a few words each. Short answers are fine.",
        "Save the page as a PDF with the button at the bottom, or photograph your paper copy."],
  note="Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter "
       "title and the topic, and use the search in your eText.",
  links=[("Choice 1: the Week 4 pre-read, to fill in on screen and save as a PDF", "week-04-preread.html"),
         ("Choice 2: the Week 4 pre-read, to print and do on paper (PDF)", "sheets/BIO005-Week4-Preread.pdf")],
  submit_here=["Upload your PDF or photo here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
  turnin=["Upload the PDF or photo to the <strong>Week 4 pre-read</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="First pass, in your first color", time="3 to 4 hours",
  status="Not turned in yet. You upload it in Step 4.",
  intro="This is where you learn the week. You work through the lessons and fill in your Competency Study Guide "
        "in one color as you go.",
  todo=["Choose one: Choice 1, print your Week 4 Competency Study Guide (two to a page, or one to a page for bigger boxes), or Choice 2, open the Week 4 competency list and work the same prompts on your own paper. Pick two pens you can tell apart.",
        "Read the Week 4 competencies first, so you know what you are looking for.",
        "The lessons, videos and notes open Monday, September 28 at 8:00 am. Before then the lessons link shows a Get ready page.",
        "Open the Week 4 lessons and work through them in order. Start with the three walkthroughs: neurons and "
        "neuroglia, then the resting membrane potential, then ion channel gating. Then the lessons on graded "
        "potentials and the action potential, how action potentials carry information, the chemical synapse, "
        "and integration at the synapse.",
        "Watch the short videos as you go, and again whenever you need them. In the walkthroughs, look for the "
        "<strong>Stuck? Watch a short explanation</strong> button on the steps where a video helps.",
        "For each competency, pick prompt A or prompt B and draw it in the box in your first color.",
        "After the three walkthroughs, do the drawing sheet from memory, with the walkthrough closed."],
  links=[("Choice 1: your Week 4 Competency Study Guide, to print (PDF, two competencies to a page)", "sheets/BIO005-note-sheet-week-04.pdf"),
         ("Choice 1, bigger boxes: the same guide with one competency to a page (PDF)", "sheets/BIO005-note-sheet-week-04-tall.pdf"),
         ("Choice 2: the Week 4 competency list, with the same prompts, for your own paper", "week-04-competencies.html"),
         ("The Week 4 lessons and videos, in order (opens Monday, September 28 at 8:00 am)", "lecture-week.html?week=4"),
         ("The Week 4 written notes, one page per lesson (opens Monday, September 28 at 8:00 am)", "week-04-notes.html"),
         ("The Week 4 drawing sheet, for after the three walkthroughs (print it, or open it and draw on your own paper)", "biol005-w04-drawing-sheet.html")],
  turnin=None),

 dict(title="Second pass, in your second color", time="30 to 60 minutes",
  status="Not turned in yet. You upload it in Step 4.",
  intro="You keep working on the same guide you started in your first pass, whichever way you chose: the printed "
        "worksheet or your own paper. Nothing new to print. You go back through the same lessons and add to the same "
        "boxes in your second color. The difference between your two colors shows you what you learned the second time through.",
  todo=["Pick up the guide you started in Step 2, the printed worksheet or your own pages, and switch to your second pen.",
        "Go back through the same Week 4 lessons. Watch a video again any time a part is still unclear.",
        "Add what you missed, fix what was wrong, and add anything that clicked this time, in the same boxes.",
        "Do not erase your first color. The gap between the two colors is the most useful thing on the page."],
  links=[("The Week 4 lessons and videos, in order", "lecture-week.html?week=4"),
         ("The Week 4 written notes, one page per lesson", "week-04-notes.html")],
  turnin=None),

 dict(title="Upload your Competency Study Guide", time="About 10 minutes",
  status="Turned in. Complete or not complete.",
  intro="You turn in your guide with both colors on it, so I can see how the week went for you.",
  todo=["Check that every box has your first color and your second color, whether you used the printed worksheet or your own paper.",
        "Photograph or scan every page, and put them in order, competency 1 first.",
        "Combine all the pages into one PDF. The assignment takes only one document, so a second upload replaces the first. A phone scanning app (Notes on iPhone, Google Drive or Adobe Scan on Android) makes the single PDF for you."],
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
         ("Draw it, the drawing canvas", "mastery-canvas.html")],
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
        "Fill in the lab worksheet as you go. Choose one: Choice 1, on screen, or Choice 2, the printed copy. For each activity it asks what you "
        "measured, what you found, and what you learned.",
        "Answer the two questions at the end of the worksheet.",
        "Save the worksheet as a PDF with the button at the bottom, or photograph your paper copy."],
  note="The exercise has to show complete in Pearson, and the points are on your worksheet. You need both.",
  links=[("Choice 1: the Week 4 lab worksheet, to fill in on screen and save as a PDF", "lab-worksheet-week04.html"),
         ("Choice 2: the Week 4 lab worksheet, to print and do on paper (PDF)", "sheets/BIO005-Week4-Lab-Worksheet.pdf"),
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
  status="Not turned in this week. Camila's chart and analysis are turned in on Sunday, November 1, with Midterm 1.",
  intro="You keep Camila's chart by hand through Week 8. Each week you add that week's numbers and your thinking, "
        "including what you worked out in the case in Step 8.",
  todo=["Open your patient chart and this week's released results.",
        "Copy this week's numbers into your flowsheets first. Copying them by hand is how you notice a trend.",
        "Fill in this week's page: what changed, the problem list, the drawing, and your thinking.",
        "Keep the chart. Do not upload it this week."],
  links=[("Your patient chart", "patient-chart-book.html"),
         ("What you turn in, and when", "assignment-patient-chart.html")],
  turnin=None),

 dict(title="Exam practice part 1, your videos", time="About 1 hour 30 minutes",
  status="Your videos go to me only. Then you post about how it went in the discussion. Think About It, 15 percent of your grade across the term. Part 2 is Discussion 5, next week.",
  intro="", todo=[], links=[],
  submit_here=["Upload everything here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>. Only I see it.",
               "Due " + DUE + "."],
  turnin=None),
]


# Discussion 4 and 5 are one exam practice in two parts. Sep 25 2026, Scrubs:
# Week 4, part 1: for each multiple choice question, build the model with a
# brain dump, choose the answer, then teach it on video; turned in to me only,
# so it is a Canvas assignment. Week 5, part 2: the rubrics come out, students
# score their own work and analyze it, and that is the Week 5 discussion.
# The rubrics are NOT on the part 1 page on purpose.
SOURCES = ("Everything in this practice comes from the Week 2 competencies on primary active transport, secondary "
           "active transport and transepithelial transport: the Na+/K+ ATPase, the Na+/Ca2+ exchanger, SGLT, GLUT2 "
           "and ouabain. Nothing here needs Week 4.")

PRACTICE = dict(
 intro="This is part 1 of a two-week practice run of your exam format. This week you work two multiple choice "
       "questions the way the exam asks you to, one at a time, on video: 15 minutes preparing your answer by building a model from memory, "
       "then 5 minutes presenting it and giving your answer. Next week, in Discussion 5, you check your work against the real "
       "rubrics and analyze what it shows you.",
 how=["Close your notes, the slides and the book, and keep them closed until you have turned everything in. The point is to find out what you can do from memory.",
      "Do one question at a time. Each question is one video: 15 minutes preparing your answer on camera, then 5 minutes presenting it. Finish question 1 completely before you read question 2.",
      "There are no rubrics this week. You will see them next week, so do your honest best now and do not look anything up.",
      "Keep your models and your videos. You need them for part 2."],
 questions=[
  dict(q="A drug partly inhibits the Na+/K+ ATPase in a heart muscle cell. Trace the effect on intracellular Na+, "
         "on calcium removal by the Na+/Ca2+ exchanger, and on the strength of contraction.",
       options=["A. Intracellular Na+ falls, the exchanger removes more Ca2+, and contraction weakens",
                "B. Intracellular Ca2+ is unchanged, because the exchanger runs on ATP and does not depend on the pump",
                "C. Intracellular Na+ rises, the exchanger removes less Ca2+, and contraction strengthens",
                "D. Intracellular Na+ rises, the exchanger removes more Ca2+, and contraction weakens"],
       key="C",
       dump="Build the model that answers question 1. Draw a heart muscle cell "
            "membrane with the Na+/K+ ATPase and the Na+/Ca2+ exchanger in it. Show which way Na+, K+ and Ca2+ move "
            "through each one and what powers each. Then trace what partly inhibiting the pump does, step by step, "
            "until you reach the strength of contraction."),
  dict(q="Ouabain is added to an intestinal epithelial cell. Trace the effect on intracellular Na+ and then on "
         "glucose uptake through SGLT at the apical membrane.",
       options=["A. Intracellular Na+ is unchanged, because SGLT keeps it low",
                "B. Intracellular Na+ rises, the Na+ gradient shrinks, and SGLT glucose uptake falls",
                "C. Intracellular Na+ rises, the Na+ gradient steepens, and SGLT glucose uptake rises",
                "D. Intracellular Na+ falls, and SGLT glucose uptake rises"],
       key="B",
       dump="Build the model that answers question 2. Draw an intestinal "
            "epithelial cell with the lumen on the apical side and the blood on the basolateral side. Trace one glucose "
            "molecule from the lumen to the blood: name the transporter at each membrane, which membrane it sits on, "
            "and whether each step is uphill or downhill for glucose. Add the Na+/K+ ATPase, then trace what ouabain "
            "changes, step by step, until you reach glucose uptake."),
 ],
 prep="Start recording in Canvas Studio before you begin, and set a timer for 15 minutes. Prepare your answer on camera: build your "
      "model from memory as a brain dump, on a whiteboard or on paper, and think out loud as you go. I want to see you "
      "working it out, so keep the camera on you and on what you are drawing the whole time. A phone video is fine.",
 teach="Keep recording. Set a timer for 5 minutes and present your answer as if to a classmate who missed class: walk "
       "through your model in order, explain why each wrong answer cannot be right, and finish by giving your answer.",
 choose="Write down the answer you gave at the end of your video, and how sure you are: sure, fairly sure, or guessing.",
 turnin=["Your two videos from Canvas Studio, one for each question, each with the 15 minutes of preparing and the 5 minutes of presenting.",
         "The transcript of each video. In Canvas Studio, open the video, go to the Captions tab and choose Request, with English as the language. When the captions are ready, use Review and Publish, fix only the words the machine got wrong, then Download the caption file. Do not reword what you said.",
         "Your answer to each question, and how sure you were.",
         "A photo of each finished model."],
)

# Week 4 has two Canvas items for step 10: the assignment above (videos, to me
# only) and this discussion, where students talk about how it went and help each
# other with the gaps. No answers and no rubrics until Week 5.
DISC4 = dict(
 title="Discussion 4, how your exam practice went",
 first_post="Friday, October 2 at 10:00 pm", due=DUE,
 intro="Once your two videos are uploaded to the assignment, come to the discussion and talk about the experience. This is not "
       "about the right answers. You will check those next week. It is about how working from memory felt, where it "
       "broke down, and what you can do about it, and about helping each other find ways to fix the gaps.",
 rule="Do not post which answers you chose. Everyone checks their answers against the key next week, and seeing "
      "someone else's letter first would take that away from them.",
 post=["What was it like to prepare on camera, from memory, for 15 minutes? How did it feel, and what surprised you?",
       "How sure were you of each answer, and what was that confidence based on?",
       "Where did you get stuck, or reach for something you could not pull from memory? Name the exact step.",
       "What will you do to fill that gap so you can do it from memory next time? Be specific: what you will do, when, and how you will know it worked.",
       "What is one thing that helped you think out loud on camera that someone else could try?"],
 replies="Read two classmates' posts. In each reply, offer a solution for a gap they named: a study move, a way to "
         "think about that step, or a way to remember it, with a sentence on why you think it would work.",
)

PART2 = dict(
 week=5, title="Discussion 5, exam practice part 2", time="About 1 hour",
 first_post="Friday, October 9 at 10:00 pm", due="Sunday, October 11 at 10:00 pm",
 status="Graded. Think About It, 15 percent of your grade across the term.",
 intro="Last week you worked two exam questions on video: for each one you spent 15 minutes building a model to "
       "prepare your answer, then 5 minutes presenting it. This week you check that work against the rubrics I use on the exam, then look "
       "closely at what it shows you about how you learn.",
 how=["Open your two videos, the photos of your models and your answers from last week.",
      "Watch the 15 minutes of preparing in each video and check the model you built against its rubric. A point counts only if you clearly said or drew it.",
      "Check your two answers against the key.",
      "Watch the 5 minutes of presenting in each video and count the points you clearly made.",
      "Answer the analysis questions, then post."],
 scoring="On the exam, each question is scored the same way: your model and your teaching are worth 75 percent of "
         "the points for that question, and your answer is worth 25 percent.",
 dump_rubrics=[
  ("Model 1, the pump and the exchanger (6 points)",
   ["The pump uses ATP to keep intracellular Na+ low, storing energy in the inward Na+ gradient",
    "The exchanger is an antiporter that moves Na+ in and Ca2+ out",
    "Na+ flowing downhill into the cell provides the energy to push Ca2+ out against its gradient",
    "Pump inhibition lets intracellular Na+ rise and flattens the Na+ gradient",
    "The exchanger has less driving force, so Ca2+ removal slows",
    "Intracellular Ca2+ rises and contraction becomes stronger"]),
  ("Model 2, glucose from the gut to the blood (6 points)",
   ["SGLT on the apical membrane moves glucose into the cell with Na+",
    "The apical step is uphill for glucose, powered by Na+ moving downhill",
    "Glucose accumulates inside the cell to a high concentration",
    "GLUT2 on the basolateral membrane moves glucose out by facilitated diffusion, downhill",
    "Glucose then diffuses into the capillary",
    "The Na+/K+ ATPase on the basolateral membrane keeps intracellular Na+ low, which is what makes the apical Na+ step downhill"])],
 keys=["Question 1: C. Intracellular Na+ rises, the exchanger removes less Ca2+, and contraction strengthens.",
       "Question 2: B. Intracellular Na+ rises, the Na+ gradient shrinks, and SGLT glucose uptake falls."],
 teach_rubrics=[
  ("Presenting question 1 (9 points)",
   ["I explained that the Na+/K+ ATPase uses ATP to pump Na+ out, keeping intracellular Na+ low",
    "I explained that the exchanger is an antiporter that lets Na+ in and pushes Ca2+ out, powered by Na+ moving downhill",
    "I explained that partly inhibiting the pump lets intracellular Na+ rise and flattens the Na+ gradient",
    "I explained that the exchanger then has less driving force, so less Ca2+ is removed and intracellular Ca2+ rises",
    "I explained that more Ca2+ inside the cell makes contraction stronger",
    "I explained why A is wrong: Na+ cannot fall when the pump that removes it is slowed",
    "I explained why B is wrong: the exchanger does not use ATP, it runs on the Na+ gradient, so it depends on the pump",
    "I explained why D is wrong: a flatter Na+ gradient means the exchanger removes less Ca2+, not more",
    "I presented my model in order, with arrows for Na+, K+ and Ca2+, before I gave my answer"]),
  ("Presenting question 2 (9 points)",
   ["I explained that ouabain blocks the Na+/K+ ATPase, so Na+ is no longer pumped out",
    "I explained that SGLT sits on the apical membrane and the pump on the basolateral membrane",
    "I explained that SGLT uses the energy of Na+ moving downhill into the cell to pull glucose in uphill",
    "I explained that when Na+ builds up inside, the gradient across the apical membrane flattens",
    "I explained that SGLT loses its energy source, so glucose uptake falls",
    "I explained why A is wrong: SGLT brings Na+ into the cell, so it cannot be what keeps Na+ low",
    "I explained why C is wrong: the gradient cannot steepen when Na+ is rising inside",
    "I explained why D is wrong: Na+ cannot fall when its only exit, the pump, is blocked",
    "I presented my model in order, with arrows for Na+ and glucose, before I gave my answer"])],
 analysis=["For each question, were you right, and how sure were you when you answered? Say whether each one was sure and right, sure and wrong, unsure and right, or unsure and wrong.",
           "Where did your model first go wrong or leave something out? Name the exact step.",
           "Was that a gap, something you did not know, or a misconception, something you were sure of that is not true? How can you tell?",
           "Compare your model score with your presenting score for the same question. Did presenting it out loud show you anything that building the model did not?",
           "What will you do differently before the midterm because of this?"],
 post=["Your scores: each model (for example 5 of 6), each answer (right or not), and each presentation (for example 7 of 9).",
       "Your answers to the five analysis questions."],
 replies="Read two classmates' posts. In each reply, name one thing in their analysis that you noticed in your own "
         "work too, and suggest one study move that could help, with a sentence on why.",
)
