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
  todo=["Choose how you will do the pre-read, in the Choose one box below: on screen, or on paper.",
        "In Silverthorn Chapter 5, Membrane Dynamics, read the part near the end on the resting membrane potential. "
        "Then skim Chapter 9, Neurons: Cellular and Network Properties, looking at the headings and the figures.",
        "Answer the questions on the pre-read in a few words each. Short answers are fine.",
        "Save the page as a PDF with the button at the bottom, or photograph your paper copy."],
  note="Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter "
       "title and the topic, and use the search in your eText.",
  links=[dict(title="Choose one: how you will do the pre-read",
      options=[dict(name="On screen", text="Type your answers on the page, then save it as a PDF with the button at the bottom.",
                    links=[("Open the Week 4 pre-read", "week-04-preread.html")]),
               dict(name="On paper", text="Print it, answer by hand, then photograph or scan it.",
                    links=[("The Week 4 pre-read, to print (PDF)", "sheets/BIO005-Week4-Preread.pdf")])])],
  submit_here=["Upload your PDF or photo here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
  turnin=["Upload the PDF or photo to the <strong>Week 4 pre-read</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="First pass, in your first color", time="3 to 4 hours",
  status="Not turned in yet. You upload it in Step 4.",
  intro="This is where you learn the week. You work through the lessons and fill in your Competency Study Guide "
        "in one color as you go.",
  todo=["Choose how you will do your Competency Study Guide, in the Choose one box below: the printed worksheet, or your own paper. Pick two pens you can tell apart.",
        "Read the Week 4 competencies first, so you know what you are looking for.",
        "The lessons, videos and notes open Monday, September 28 at 8:00 am. Before then the lessons link shows a Get ready page.",
        "Open the Week 4 lessons and work through them in order. Start with the five walkthroughs: neurons and "
        "neuroglia, then the resting membrane potential, then ion channel gating, then graded potentials, then the "
        "action potential. Then the lessons on how action potentials carry information, the chemical synapse, "
        "and integration at the synapse.",
        "Watch the short Khan Academy videos as you go, and again whenever you need them. Every topic on the lessons page has a "
        "<strong>Watch the videos</strong> button, and inside the walkthroughs the <strong>Stuck? Watch a short explanation</strong> "
        "button opens the video that goes with that step.",
        "Each walkthrough has a worksheet in the right-hand column. Every time it asks you to predict, type your prediction there first. Show me stays locked until you do, and Next stays locked until you press Show me.",
        "After each walkthrough, read its written notes to fill in anything you missed.",
        "For each competency, pick prompt A or prompt B and draw it in the box in your first color."],
  links=[dict(title="Choose one: how you will do your Competency Study Guide",
      options=[dict(name="Print the ready-made worksheet", text="A box for each competency with both prompts printed beside it. Print whichever size you like.",
                    links=[("The Study Guide, two competencies to a page (PDF)", "sheets/BIO005-note-sheet-week-04.pdf"),
                           ("The Study Guide, one competency to a page, for bigger boxes (PDF)", "sheets/BIO005-note-sheet-week-04-tall.pdf")]),
               dict(name="Use your own paper", text="The same competencies and the same prompts on one page. Work them in a notebook or on blank paper.",
                    links=[("The Week 4 competency list", "week-04-competencies.html")])]),
         ("The Week 4 lessons and videos, in order (opens Monday, September 28 at 8:00 am)", "lecture-week.html?week=4"),
         dict(title="Choose one: how you will read the Week 4 written notes (they open Monday, September 28 at 8:00 am)",
              options=[dict(name="On screen", text="The notes for each walkthrough and lesson, one page each.",
                            links=[("The Week 4 written notes", "week-04-notes.html")]),
                       dict(name="On paper", text="The same notes, all in one PDF, in two columns to save paper.",
                            links=[("The Week 4 written notes to print (PDF)", "notes/BIO005-Week4-Notes-all.pdf")])])],
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
         ("The Week 4 written notes, the same ones you used in your first pass, on screen or printed", "week-04-notes.html", "optional")],
  turnin=None),

 dict(title="Upload your Competency Study Guide", time="About 10 minutes",
  status="Turned in. Complete or not complete.",
  intro="You turn in your guide with both colors on it, so I can see how the week went for you.",
  todo=["Check that every box has your first color and your second color, whether you used the printed worksheet or your own paper.",
        "Photograph or scan every page, and put them in order, competency 1 first.",
        "Combine all the pages into one PDF. The assignment takes only one document, so a second upload replaces the first. A phone scanning app (Notes on iPhone, Google Drive or Adobe Scan on Android) makes the single PDF for you."],
  links=[("How the Competency Study Guide works, if you want the details", "assignment-notesheet.html", "optional")],
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
        "Watch a video again when a brain dump shows a gap you cannot fill from your guide."],
  links=[("Rx Cards", "rx-cards.html"),
         ("Try It From Memory, the brain dump", "competency-brain-dump.html")],
  turnin=None),

 dict(title="Mastery Check, and upload your reports", time="30 to 50 minutes per try, at least 3 tries",
  status="Turned in. No points, but every try's report has to be turned in.",
  intro="The Mastery Check tells you which competencies are solid and which need another round. Each try is a "
        "fresh set of about 30 questions, enough to test every Week 4 competency once.",
  todo=["Open the Mastery Check. It is set to Week 4 and 30 questions.",
        "Do at least 3 tries, with Study it (Step 5) in between. Aim for 80 percent before you stop. You can always do more.",
        "After each try, the report lists the competencies you missed. Go back to Step 5 for those, then take it again. If you could not "
        "start a competency at all, go back to Step 3 for that one.",
        "Save the report from every try as a PDF. The weekly practice log puts every try in one PDF, if that is easier."],
  links=[("The Week 4 Mastery Check", "practice-exam.html?week=4&n=30"),
         ("How to save and upload your reports, if you need help with it", "assignment-practice-log.html", "optional")],
  submit_here=["Upload your reports here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Upload the report from every try, at least 3."],
  turnin=["Upload the reports to the <strong>Week 4 Mastery Check</strong> assignment in Canvas.",
          "Due " + DUE + ". Upload the report from every try, at least 3."]),

 dict(title="Lab, PhysioEx Exercise 3", time="2 to 3 hours",
  status="Graded. Investigate It, 25 percent of your grade across the term.",
  intro="You run PhysioEx Exercise 3, Neurophysiology of Nerve Impulses, and record what you measured and found "
        "on the Week 4 lab worksheet.",
  todo=["Open PhysioEx through <strong>Access Pearson</strong> in the Canvas menu on the left, and run Exercise 3, "
        "Activities 1 to 9.",
        "Fill in the lab worksheet as you go, on screen or on paper, in the Choose one box below. For each activity it asks what you "
        "measured, what you found, and what you learned.",
        "Answer the two questions at the end of the worksheet.",
        "Save the worksheet as a PDF with the button at the bottom, or photograph your paper copy."],
  note="The exercise has to show complete in Pearson, and the points are on your worksheet. You need both.",
  links=[("What to run and record in PhysioEx this week", "assignment-physioex.html?week=4"),
         dict(title="Choose one: how you will do the lab worksheet",
              options=[dict(name="On screen", text="Type your answers on the page, then save it as a PDF with the button at the bottom.",
                            links=[("Open the Week 4 lab worksheet", "lab-worksheet-week04.html")]),
                       dict(name="On paper", text="Print it, fill it in by hand, then photograph or scan it.",
                            links=[("The Week 4 lab worksheet, to print (PDF)", "sheets/BIO005-Week4-Lab-Worksheet.pdf")])])],
  submit_here=["Upload your worksheet here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". PhysioEx Exercise 3 also has to show complete in Pearson."],
  turnin=["Upload the worksheet to the <strong>Week 4 lab</strong> assignment in Canvas.",
          "Due " + DUE + "."]),

 dict(title="Your patient, in Rounds", time="About 1 hour 30 minutes",
  status="Nothing uploaded this week. Camila's case ends at Midterm 1, and that week you upload the whole chart as one PDF, due Sunday, November 1.",
  intro="Rounds is Camila's online chart, laid out like a hospital record. It walks you through this week's case one step at a time, "
        "and you type everything into it, so nothing is printed. Everything for the case is in Rounds, so it is the only page you need for this step.",
  todo=["Open Rounds for Week 4 and follow the steps down the left side, in order.",
        "Write your prediction first. The rest of the note, the Flowsheet, and the Results open after that.",
        "File this week's numbers in the Flowsheet. Rounds tells you which cells do not match the record, so you can fix them.",
        "Answer the five questions and your entry point's question, then write your note.",
        "Draw the control loop on paper and label it with your name and Week 4. Keep a photo of it."],
  links=[("Rounds: Week 4", "patient-rounds.html?week=4")],
  turnin=None),

 dict(title="Check your chart", time="About 10 minutes",
  status="Nothing uploaded this week. It is a quick check that this week's chart is finished.",
  intro="A quick look to make sure nothing is missing before you move on.",
  todo=["In Rounds, click the <strong>My entries</strong> tab on the right. If anything says <strong>Not written yet</strong>, go back and finish it.",
        "Go to the last step, <strong>Sign and export</strong>. Type your name and click <strong>Export this week to PDF</strong>.",
        "Save that PDF. You upload the whole chart once, at the end of the case, in the week of Midterm 1."],
  links=[("Rounds: Week 4", "patient-rounds.html?week=4")],
  turnin=None),

 dict(title="Exam practice part 1, two timed questions", time="About 1 hour, including your Discussion 4 post",
  status="Your two videos go to me only and are graded complete or incomplete. Your meta-analysis of how it went is the public part, posted in Discussion 4. Part 2 of the practice is Discussion 5, next week.",
  intro="", todo=[], links=[], turnin=None),
]


# Discussion 4 and 5 are one exam practice in two parts. Sep 25 2026, Scrubs:
# Week 4, part 1: for each multiple choice question, build the model with a
# brain dump, choose the answer, then teach it on video; turned in to me only,
# so it is a Canvas assignment. Week 5, part 2: the rubrics come out, students
# score their own work and analyze it, and that is the Week 5 discussion.
# The rubrics are NOT on the part 1 page on purpose.
SOURCES = "Both questions come from the Week 2 competencies on membrane transport. Nothing here needs Week 4."

PRACTICE = dict(
 # Sep 27 2026, Scrubs: each question is its own timed New Quiz (28 minutes),
 # with the Studio recording made and embedded inside the quiz. The question
 # text is only in the quizzes, never on this page or the course site.
 quizzes=[("Exam practice part 1, Question 1", "https://yccd.instructure.com/courses/42616/quizzes/384885"),
          ("Exam practice part 1, Question 2", "https://yccd.instructure.com/courses/42616/quizzes/384886")],
 intro="This is a practice run of your exam format. In each of two timed quizzes you get one exam question, build a model on a "
       "whiteboard from memory that answers it, and teach that model on video. On the exam, you will not be allowed to redo a "
       "question if you do not follow these directions or do not turn in your video. That is why we are practicing the process "
       "now, so that on exam day it runs smoothly and all your attention goes to the physiology.",
 need=["A whiteboard and a marker",
       "A computer with a camera and microphone, in Chrome, Edge, Safari or Firefox",
       "A quiet place where no one will interrupt you for 30 minutes, once for each question"],
 before=["Do a short test recording in Canvas Studio before you start, so you know your camera, microphone and screen recording work. Delete it afterward.",
         "Aim your camera so it sees both you and your whiteboard.",
         "Close your notes, the slides, the book, every other tab and window, and any AI tool. Keep them closed until you have submitted.",
         "Read these directions all the way through. The timer starts the moment you open the quiz."],
 timing="Each quiz gives you 28 minutes from the moment it opens, and then it submits itself, whether your video is embedded or not. That covers about 3 minutes to read the question and start recording, 15 minutes to prepare, 5 to 7 minutes to teach, and about 3 minutes to save and embed your video. If you wait before you start recording, those minutes come out of your own time.",
 steps=["Open the quiz. In the answer box, click the Studio button, then <strong>Create</strong>, then <strong>Studio Capture</strong> (Chrome or Edge) or <strong>Screen Capture</strong> (Safari or Firefox). Record your whole screen with your camera on, so your video shows the question on your screen.",
        "Read the question out loud.",
        "Prepare for 15 minutes. Build your model on the whiteboard from memory and think out loud as you go.",
        "Teach for 5 to 7 minutes. Walk through your model in order, as if you were teaching a classmate who missed class. Give your answer by reading it out loud. Then go through each of the other three choices and point to the exact spot on your model that shows why it is wrong. End by stating the correct answer again.",
        "Click <strong>Finish Recording</strong>, add a title, and click <strong>Save Media</strong>.",
        "Click your video's thumbnail, then <strong>Embed Media</strong>. Your video does not attach by itself.",
        "Check that your video shows in the answer box, choose your answer, and click <strong>Submit</strong>."],
 counts=["it opens with the question visible on your screen,",
         "it runs from start to finish without pausing or stopping,",
         "your whiteboard stays in view the whole time, and",
         "nothing else is open on your screen."],
 grading=["Your answer is worth 25 percent.",
          "Your model and how clearly you explain it are worth 75 percent, including showing where each wrong choice breaks down."],
 grading_note="This is not graded like a speech. If you notice a mistake while you are preparing or teaching, say so and fix it right then. You will not lose points for a mistake you correct. What counts is the physiology, following the procedure, and showing that you can organize what you know to answer the question.",
 after="Only I see your videos. Question 2 opens after you submit Question 1. Then post in Discussion 4 about how it went. Next week, in Discussion 5, you check your work against the answer key and the rubric.",
)

# Week 4 has two Canvas items for step 10: the assignment above (videos, to me
# only) and this discussion, where students talk about how it went and help each
# other with the gaps. No answers and no rubrics until Week 5.
DISC4 = dict(
 title="Discussion 4, how your exam practice went",
 first_post="Friday, October 2 at 10:00 pm", due=DUE,
 intro="Once you have submitted both Exam practice quizzes, come here and post your meta-analysis: a look back at how you did the practice. This is the public part; your videos stay with me. It is not "
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
 # Sep 27 2026: the rubrics and the answer key are kept out of this public repo until
 # the practice quizzes close. Scrubs pastes the full Discussion 5 into Canvas on Oct 5.
 locked="The rubrics and the answer key appear in Discussion 5 in Canvas on Monday, October 5, after the practice quizzes close.",
 week=5, title="Discussion 5, exam practice part 2", time="About 1 hour",
 first_post="Friday, October 9 at 10:00 pm", due="Sunday, October 11 at 10:00 pm",
 status="Graded. Think About It, 15 percent of your grade across the term.",
 intro="Last week you worked two exam questions on video: for each one you spent 15 minutes building a model to "
       "prepare your answer, then 5 to 7 minutes teaching it. This week you check that work against the rubrics I use on the exam, then look "
       "closely at what it shows you about how you learn.",
 how=["Open your two Exam practice quizzes from last week. Each one holds your video and the answer you chose. Your videos are also in your Studio library.",
      "Watch the 15 minutes of preparing in each video and check the model you built against its rubric. Pause the video on your finished whiteboard to check it. A point counts only if you clearly said or drew it.",
      "Check your two answers against the key.",
      "Watch the 5 to 7 minutes of teaching in each video and count the points you clearly made.",
      "Answer the analysis questions, then post."],
 scoring="On the exam, each question is scored the same way: your model and your teaching are worth 75 percent of "
         "the points for that question, and your answer is worth 25 percent.",
 analysis=["For each question, were you right, and how sure did you feel when you gave your answer at the end of your video? Say whether each one was sure and right, sure and wrong, unsure and right, or unsure and wrong.",
           "Where did your model first go wrong or leave something out? Name the exact step.",
           "Was that a gap, something you did not know, or a misconception, something you were sure of that is not true? How can you tell?",
           "Compare your model score with your presenting score for the same question. Did presenting it out loud show you anything that building the model did not?",
           "What will you do differently before the midterm because of this?"],
 post=["Your scores: each model (for example 5 of 6), each answer (right or not), and each presentation (for example 7 of 9).",
       "Your answers to the five analysis questions."],
 replies="Read two classmates' posts. In each reply, name one thing in their analysis that you noticed in your own "
         "work too, and suggest one study move that could help, with a sentence on why.",
)
