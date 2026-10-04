# -*- coding: utf-8 -*-
"""
Week 5 content for the Canvas step pages. Oct 4 2026, copied from
canvas_steps_week04.py and rewritten for Week 5. tools/build_canvas_week_steps.py
turns this into one paste-ready page per step.

Text may use <strong> only. Everything else is escaped by the builder.
"""

WEEK = 5
TITLE = "Reflexes, and sensing the world"
DUE = "Sunday, October 11 at 10:00 pm"

STEPS = [
 dict(title="Pre-read, before anything else", time="30 minutes at most",
  status="Turned in. Complete or not complete.",
  intro="A quick look ahead, not a full read. You look at the headings and figures and answer a few short questions, "
        "so the walkthroughs make more sense when you get to them.",
  todo=["Choose how you will do the pre-read, in the Choose one box below: on screen, or on paper.",
        "Read closely: in Silverthorn Chapter 14, Integrative Physiology I: Control of Body Movement, only the part on neural reflexes "
        "and skeletal muscle reflexes; and in Chapter 10, The Central Nervous System, only the parts on cerebrospinal fluid, the "
        "blood-brain barrier and the spinal cord. Then in Chapter 11, Sensory Physiology, read the general properties of sensory "
        "systems and the somatic senses, including pain, and only skim the special senses, using the figures and the chapter's Visual Summary.",
        "Answer the questions on the pre-read in a few words each. Short answers are fine.",
        "Save the page as a PDF with the button at the bottom, or photograph your paper copy."],
  note="Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter "
       "title and the topic, and use the search in your eText.",
  links=[dict(title="Choose one: how you will do the pre-read",
      options=[dict(name="On screen", text="Type your answers on the page, then save it as a PDF with the button at the bottom.",
                    links=[("Open the Week 5 pre-read", "week-05-preread.html")]),
               dict(name="On paper", text="Print it, answer by hand, then photograph or scan it.",
                    links=[("The Week 5 pre-read, to print (PDF)", "sheets/BIO005-Week5-Preread.pdf")])])],
  submit_here=["Upload your PDF or photo here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
  turnin=["Upload the PDF or photo to the <strong>Week 5 pre-read</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="First pass, in your first color", time="3 to 4 hours",
  status="Not turned in yet. You upload it in Step 4.",
  intro="This is where you learn the week. You work through the walkthroughs and fill in your Competency Study Guide "
        "in one color as you go.",
  todo=["Choose how you will do your Competency Study Guide, in the Choose one box below: the printed worksheet, or your own paper. Pick two pens you can tell apart.",
        "Read the Week 5 competencies first, so you know what you are looking for.",
        "The walkthroughs and notes open Monday, October 5 at 8:00 am. Before then the lessons link shows a Get ready page.",
        "Open the Week 5 lessons and work through the six walkthroughs in order. Give spinal reflexes the most time, since it is the biggest topic of the week. The order is spinal reflexes, then sensory receptors and coding, "
        "then spinal pathways, touch and pain, then cerebrospinal fluid and the blood-brain barrier, then vision, then hearing, "
        "balance, taste and smell.",
        "Each walkthrough has a worksheet in the right-hand column. Every time it asks you to predict, type your prediction there first. Show me stays locked until you do, and Next stays locked until you press Show me.",
        "After each walkthrough, read its written notes to fill in anything you missed.",
        "For each competency, pick prompt A or prompt B and draw it in the box in your first color."],
  links=[dict(title="Choose one: how you will do your Competency Study Guide",
      options=[dict(name="Print the ready-made worksheet", text="A box for each competency with both prompts printed beside it. Print whichever size you like.",
                    links=[("The Study Guide, two competencies to a page (PDF)", "sheets/BIO005-note-sheet-week-05.pdf"),
                           ("The Study Guide, one competency to a page, for bigger boxes (PDF)", "sheets/BIO005-note-sheet-week-05-tall.pdf")]),
               dict(name="Use your own paper", text="The same competencies and the same prompts on one page. Work them in a notebook or on blank paper.",
                    links=[("The Week 5 competency list", "week-05-competencies.html")])]),
         ("The Week 5 walkthroughs, in order (opens Monday, October 5 at 8:00 am)", "lecture-week.html?week=5"),
         dict(title="Choose one: how you will read the Week 5 written notes (they open Monday, October 5 at 8:00 am)",
              options=[dict(name="On screen", text="The notes for each walkthrough, one page each.",
                            links=[("The Week 5 written notes", "week-05-notes.html")]),
                       dict(name="On paper", text="The same notes, all in one PDF, in two columns to save paper.",
                            links=[("The Week 5 written notes to print (PDF)", "notes/BIO005-Week5-Notes-all.pdf")])])],
  turnin=None),

 dict(title="Second pass, in your second color", time="30 to 60 minutes",
  status="Not turned in yet. You upload it in Step 4.",
  intro="You keep working on the same guide you started in your first pass, whichever way you chose: the printed "
        "worksheet or your own paper. Nothing new to print. You go back through the same walkthroughs and add to the same "
        "boxes in your second color. The difference between your two colors shows you what you learned the second time through.",
  todo=["Pick up the guide you started in Step 2, the printed worksheet or your own pages, and switch to your second pen.",
        "Go back through the same Week 5 walkthroughs. Once you have finished a walkthrough, its topic menu at the top lets you jump straight to the part you need.",
        "Add what you missed, fix what was wrong, and add anything that clicked this time, in the same boxes.",
        "Do not erase your first color. The gap between the two colors is the most useful thing on the page."],
  links=[("The Week 5 walkthroughs, in order", "lecture-week.html?week=5"),
         ("The Week 5 written notes, the same ones you used in your first pass, on screen or printed", "week-05-notes.html", "optional")],
  turnin=None),

 dict(title="Upload your Competency Study Guide", time="About 10 minutes",
  status="Turned in. Complete or not complete.",
  intro="This is the Competency Study Guide you printed at the start of the week, or your own labeled pages, that you filled in during Step 2 and Step 3. You upload it here with both colors on it, so I can see how the week went for you.",
  todo=["Check that every box has your first color and your second color, whether you used the printed worksheet or your own paper.",
        "Photograph or scan every page, and put them in order, competency 1 first.",
        "Combine all the pages into one PDF. The assignment takes only one document, so a second upload replaces the first. A phone scanning app (Notes on iPhone, Google Drive or Adobe Scan on Android) makes the single PDF for you."],
  links=[("How the Competency Study Guide works, if you want the details", "assignment-notesheet.html?week=5", "optional")],
  submit_here=["Upload the one file here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
  turnin=["Upload the one file to the <strong>Week 5 Competency Study Guide</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="Study it for several days", time="4 sessions of 30 to 45 minutes, on different days",
  status="Not turned in. No points.",
  intro="Getting the material back out of your head is what makes it stay. Spread these sessions across the week "
        "instead of doing them in one sitting.",
  todo=["Do Rx Cards for Week 5. They get harder as you get them right, and every answer comes with the reason.",
        "Do a brain dump: pick a competency, close everything, and write or draw all you can. Then check it and "
        "note what you left out.",
        "Go back to the walkthrough or its notes when a brain dump shows a gap you cannot fill from your guide."],
  links=[("Rx Cards", "rx-cards.html?week=5&only=1"),
         ("Try It From Memory, the brain dump", "competency-brain-dump.html?week=5")],
  turnin=None),

 dict(title="Mastery Check, and upload your reports", time="30 to 50 minutes per try, at least 3 tries",
  status="Turned in. No points, but every try's report has to be turned in.",
  intro="The Mastery Check tells you which competencies are solid and which need another round. Each try is a "
        "fresh set of about 30 questions, which is more than one question for most Week 5 competencies.",
  todo=["Open the Mastery Check. It is set to Week 5 and 30 questions.",
        "Do at least 3 tries, with Study it (Step 5) in between. Aim for 80 percent before you stop. You can always do more.",
        "After each try, the report lists the competencies you missed. Go back to Step 5 for those, then take it again. If you could not "
        "start a competency at all, go back to Step 3 for that one.",
        "Save the report from every try as a PDF. The weekly practice log puts every try in one PDF, if that is easier."],
  links=[("The Week 5 Mastery Check", "practice-exam.html?week=5&n=30"),
         ("How to save and upload your reports, if you need help with it", "assignment-practice-log.html", "optional")],
  submit_here=["Upload your reports here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Upload the report from every try, at least 3."],
  turnin=["Upload the reports to the <strong>Week 5 Mastery Check</strong> assignment in Canvas.",
          "Due " + DUE + ". Upload the report from every try, at least 3."]),

 dict(title="Lab, the sensory and reflex lab", time="2 to 3 hours",
  status="Graded. Investigate It, 25 percent of your grade across the term.",
  intro="There is no PhysioEx this week, because PhysioEx has no sensory exercise. Instead you collect real data on "
        "yourself: reaction time, two-point discrimination, vision, hearing range and balance. All you need is a ruler, "
        "a paperclip, your phone, and one other person for the first test.",
  todo=["Open the sensory and reflex lab and print all three pages. Print page 3 at 100 percent, with fit to page turned off, or the charts come out the wrong size. There is a bar on page 3 to check it with.",
        "Run each test on yourself and record your data in the tables as you go.",
        "These are demonstrations of how your senses and reflexes work, not eye exams, hearing tests or medical screens. If something you notice worries you, take it to a clinician.",
        "Photograph or scan all three pages and combine them into one PDF."],
  links=[("The Week 5 sensory and reflex lab", "lab-week05-sensory-reflex.html")],
  submit_here=["Upload your lab pages here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + "."],
  turnin=["Upload the lab pages to the <strong>Week 5 lab</strong> assignment in Canvas.",
          "Due " + DUE + "."]),

 dict(title="Your patient, in Rounds", time="About 1 hour 30 minutes",
  status="Nothing uploaded this week. Camila's case ends at Midterm 1, and that week you upload the whole chart as one PDF, due Sunday, November 1.",
  intro="Rounds is Camila's online chart, laid out like a hospital record. It walks you through this week's case one step at a time, "
        "and you type everything into it, so nothing is printed. Everything for the case is in Rounds, so it is the only page you need for this step.",
  todo=["Open Rounds for Week 5 and follow the steps down the left side, in order.",
        "Write your prediction first. The rest of the note, the Flowsheet, and the Results open after that.",
        "File this week's numbers in the Flowsheet. Rounds tells you which cells do not match the record, so you can fix them.",
        "Answer the five questions and your entry point's question, then write your note.",
        "Draw the control loop on paper and label it with your name and Week 5. Keep a photo of it."],
  links=[("Rounds: Week 5", "patient-rounds.html?week=5")],
  turnin=None),

 dict(title="Check your chart", time="About 10 minutes",
  status="Nothing uploaded this week. It is a quick check that this week's chart is finished.",
  intro="A quick look to make sure nothing is missing before you move on.",
  todo=["In Rounds, click the <strong>My entries</strong> tab on the right. If anything says <strong>Not written yet</strong>, go back and finish it.",
        "Go to the last step, <strong>Sign and export</strong>. Type your name and click <strong>Export this week to PDF</strong>.",
        "Save that PDF. You upload the whole chart once, at the end of the case, in the week of Midterm 1."],
  links=[("Rounds: Week 5", "patient-rounds.html?week=5")],
  turnin=None),

 dict(title="Exam practice, two new timed questions", time="About 1 hour",
  status="Your two videos go to me only and are graded complete or incomplete. You score them yourself against the rubrics next week.",
  intro="", todo=[], links=[], turnin=None),
]

SOURCES = ("Both questions come from this week's material: one from the spinal pathways, and one from phototransduction. "
           "Do Discussion 5 first, since its post is due Friday. These two are due Sunday.")

PRACTICE = dict(
 # Oct 4 2026: the two quizzes do not exist yet. Scrubs builds them in Canvas
 # (New Quizzes, 28 minutes each, Studio in the answer box, Question 2 locked
 # until Question 1 is submitted) from the question file kept OUT of this
 # public repo, then swaps the two URLs below for the real quiz links and
 # reruns: python3 tools/build_canvas_week_steps.py 5
 quizzes=[("Exam practice, Week 5, Question 1", "https://yccd.instructure.com/courses/42616/quizzes"),
          ("Exam practice, Week 5, Question 2", "https://yccd.instructure.com/courses/42616/quizzes")],
 intro="This is your second practice run of the exam format, on this week's material. It runs exactly like last week's: in each of "
       "two timed quizzes you get one exam question, build a model on a whiteboard from memory that answers it, and teach that model "
       "on video. On the exam, you will not be allowed to redo a question if you do not follow these directions or do not turn in your video.",
 need=["A whiteboard and a marker",
       "A computer with a camera and microphone, in Chrome, Edge, Safari or Firefox",
       "A quiet place where no one will interrupt you for 30 minutes, once for each question"],
 before=["Do a short test recording in Canvas Studio before you start, so you know your camera, microphone and screen recording work. Delete it afterward.",
         "Aim your camera so it sees both you and your whiteboard.",
         "Close your notes, the walkthroughs, the book, every other tab and window, and any AI tool. Keep them closed until you have submitted.",
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
 after="Only I see your videos. Question 2 opens after you submit Question 1. Keep your videos: next week you check them against the answer key and the rubrics, the same way you check last week's in Discussion 5.",
)

AFTER_PRACTICE = "<strong>That is the whole week.</strong> If a competency is still not solid, go back to Step 5 for it and take the Mastery Check again before Sunday."

# Week 5 has two Canvas items for step 10. Discussion 5 was built last week, from
# canvas_steps_week04.PART2, and is listed first because its post is due Friday.
EXTRA_ITEMS = ["Week %(n)d, Step %(i)d | Discussion 5, exam practice part 2   ->  w05-10-discussion-5-exam-practice-part-2.html  (Canvas DISCUSSION, already built with Week 4: paste into its description, then add the rubrics and the key on Monday, October 5. Put it ABOVE the exam practice page in the module.)"]
