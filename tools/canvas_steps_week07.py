# -*- coding: utf-8 -*-
"""
Week 7 content for the Canvas step pages. Oct 17 2026, copied from
canvas_steps_week06.py and rewritten for Week 7. tools/build_canvas_week_steps.py
turns this into one paste-ready page per step.

Text may use <strong> only. Everything else is escaped by the builder.
"""

WEEK = 7
TITLE = "Hormones, the autonomic system, and reproduction"
DUE = "Sunday, November 1 at 10:00 pm"

WALKS = [
 ("Walkthrough 1: The autonomic nervous system", "biol005-w07-autonomic-guided.html"),
 ("Walkthrough 2: How hormones work", "biol005-w07-hormones-guided.html"),
 ("Walkthrough 3: The hypothalamus and pituitary", "biol005-w07-pituitary-guided.html"),
 ("Walkthrough 4: Reproductive hormones", "biol005-w07-reproduction-guided.html"),
]
NOTES = [
 ("Notes 1: The autonomic nervous system", "biol005-w07-autonomic-walkthrough-notes.html"),
 ("Notes 2: How hormones work", "biol005-w07-hormones-walkthrough-notes.html"),
 ("Notes 3: The hypothalamus and pituitary", "biol005-w07-pituitary-walkthrough-notes.html"),
 ("Notes 4: Reproductive hormones", "biol005-w07-reproduction-walkthrough-notes.html"),
]

STEPS = [
 dict(title="Pre-read, before anything else", time="30 minutes at most",
  status="Turned in. Complete or not complete.",
  intro="A quick look ahead, not a full read. You look at the headings and figures and answer a few short questions, "
        "so the walkthroughs make more sense when you get to them.",
  todo=["Choose how you will do the pre-read, in the Choose one box below: on screen, or on paper.",
        "<strong>If you have the Silverthorn textbook,</strong> read these parts closely. In Chapter 12, read the section on the autonomic division: its two branches, where they leave the spinal cord, their neurotransmitters and receptors, and how drugs act on them. "
        "Read all of Chapter 8, which covers what makes a chemical a hormone, the three kinds of hormone, the hypothalamus and pituitary, and what happens when a gland makes too much or too little. "
        "Then in Chapter 26, read the parts on male reproduction, the menstrual cycle, and pregnancy, birth and milk, and skim the rest.",
        "<strong>If you are using the free OpenStax book instead,</strong> read these sections. 15.1, 15.2 and 15.4 cover the autonomic nervous system and the drugs that act on it. "
        "17.1 and 17.2 cover what hormones are and how they work. 17.3 covers the pituitary gland and hypothalamus. 27.1 and 27.2 cover the male and female reproductive systems; read the parts on hormones. "
        "28.4 covers pregnancy, labor and birth, and 28.6 covers milk.",
        "<strong>About the figures, if you use OpenStax.</strong> The pre-read names each figure by what it shows. Look for a picture of the same thing in those OpenStax sections. "
        "If you cannot find a matching picture, write your own list instead: on a sheet of paper, list each picture you did find in those sections and write one sentence about what it shows. Upload that page with your pre-read.",
        "Answer the questions on the pre-read in a few words each. Short answers are fine.",
        "Save the page as a PDF with the button at the bottom, or photograph your paper copy."],
  note="Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter "
       "title and the topic, and use the search in your eText.",
  links=[dict(title="Choose one: your textbook",
      options=[dict(name="Silverthorn, if you bought it", text="Human Physiology: An Integrated Approach, 9th edition. This is the textbook for the course. You read it online through Pearson, from the Pearson link in Canvas. The list above tells you which parts to read.",
                    links=[]),
               dict(name="OpenStax, free, if you did not buy the textbook", text="Anatomy and Physiology 2e. A free online textbook that covers the same physiology. The list above tells you which sections to read, and what to do when a picture does not match.",
                    links=[("The free OpenStax textbook, Anatomy and Physiology 2e", "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction")])]),
         dict(title="Choose one: how you will do the pre-read",
      options=[dict(name="On screen", text="Type your answers on the page, then save it as a PDF with the button at the bottom.",
                    links=[("Open the Week 7 pre-read", "week-07-preread.html")]),
               dict(name="On paper", text="Print it, answer by hand, then photograph or scan it.",
                    links=[("The Week 7 pre-read, to print (PDF)", "sheets/BIO005-Week7-Preread.pdf")])])],
  submit_here=["Upload your PDF or photo here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>. If you used OpenStax and made a handwritten figure sheet, upload it with your pre-read.",
          "Due " + DUE + ". Complete or not complete."],
  turnin=["Upload the PDF or photo to the <strong>Week 7 pre-read</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="First pass, in your first color", time="3 to 4 hours",
  status="Not turned in yet. You upload it in Step 4.",
  intro="This is where you learn the week. You work through the walkthroughs and fill in your Competency Study Guide "
        "in one color as you go.",
  todo=["Choose how you will do your Competency Study Guide, in the Choose one box below: the printed worksheet, or your own paper. Pick two pens you can tell apart.",
        "Read the Week 7 competencies first, so you know what you are looking for.",
        "The walkthroughs, the written notes and the Competency Study Guide all open Monday, October 26 at 8:00 am.",
        "Work through the four walkthroughs in order, because each one builds on the one before it. The order is the autonomic nervous system, then how hormones work, "
        "then the hypothalamus and pituitary, then reproductive hormones. The last one is the longest, so leave the most time for it.",
        "Each walkthrough has a worksheet in the right-hand column. Every time it asks you to predict, type your prediction there first. Show me stays locked until you do, and Next stays locked until you press Show me. "
        "On many steps the figure asks you to click something, like a nerve to fire or a hormone to release, and Next stays locked until you do.",
        "After each walkthrough, read its written notes to fill in anything you missed.",
        "For each competency, pick prompt A or prompt B and draw it in the box in your first color."],
  links=[dict(title="Choose one: how you will do your Competency Study Guide",
      options=[dict(name="Print the ready-made worksheet", text="A box for each competency with both prompts printed beside it. Print whichever size you like.",
                    links=[("The Study Guide, two competencies to a page (PDF)", "sheets/BIO005-note-sheet-week-07.pdf"),
                           ("The Study Guide, one competency to a page, for bigger boxes (PDF)", "sheets/BIO005-note-sheet-week-07-tall.pdf")]),
               dict(name="Use your own paper", text="The same competencies and the same prompts on one page. Work them in a notebook or on blank paper.",
                    links=[("The Week 7 competency list", "week-07-competencies.html")])])]
        + [(WALKS[0][0] + " (opens Monday, October 26 at 8:00 am)", WALKS[0][1])] + WALKS[1:]
        + [dict(title="Choose one: how you will read the Week 7 written notes",
              options=[dict(name="On screen", text="The notes for each walkthrough, one page each.", links=NOTES),
                       dict(name="On paper", text="The same notes, all in one PDF, in two columns to save paper.",
                            links=[("The Week 7 written notes to print (PDF)", "notes/BIO005-Week7-Notes-all.pdf")])])],
  turnin=None),

 dict(title="Second pass, in your second color", time="30 to 60 minutes",
  status="Not turned in yet. You upload it in Step 4.",
  intro="You keep working on the same guide you started in your first pass, whichever way you chose: the printed "
        "worksheet or your own paper. Nothing new to print. You go back through the same walkthroughs and add to the same "
        "boxes in your second color. The difference between your two colors shows you what you learned the second time through.",
  todo=["Pick up the guide you started in Step 2, the printed worksheet or your own pages, and switch to your second pen.",
        "Go back through the same Week 7 walkthroughs, linked below. Once you have finished a walkthrough, its topic menu at the top lets you jump straight to the part you need.",
        "Add what you missed, fix what was wrong, and add anything that clicked this time, in the same boxes.",
        "Do not erase your first color. The gap between the two colors is the most useful thing on the page."],
  links=WALKS + [("The Week 7 written notes to print, the same ones you used in your first pass (PDF)", "notes/BIO005-Week7-Notes-all.pdf", "optional")],
  turnin=None),

 dict(title="Upload your Competency Study Guide", time="About 10 minutes",
  status="Turned in. Complete or not complete.",
  intro="This is the Competency Study Guide you printed at the start of the week, or your own labeled pages, that you filled in during Step 2 and Step 3. You upload it here with both colors on it, so I can see how the week went for you.",
  todo=["Check that every box has your first color and your second color, whether you used the printed worksheet or your own paper.",
        "Photograph or scan every page, and put them in order, competency 1 first.",
        "Combine all the pages into one PDF. The assignment takes only one document, so a second upload replaces the first. A phone scanning app (Notes on iPhone, Google Drive or Adobe Scan on Android) makes the single PDF for you."],
  links=[("How the Competency Study Guide works, if you want the details", "assignment-notesheet.html?week=7", "optional")],
  submit_here=["Upload the one file here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Complete or not complete."],
  turnin=["Upload the one file to the <strong>Week 7 Competency Study Guide</strong> assignment in Canvas.",
          "Due " + DUE + ". Complete or not complete."]),

 dict(title="Study it for several days", time="4 sessions of 30 to 45 minutes, on different days",
  status="Not turned in. No points.",
  intro="Getting the material back out of your head is what makes it stay. Spread these sessions across the week "
        "instead of doing them in one sitting.",
  todo=["Do Rx Cards for Week 7. They get harder as you get them right, and every answer comes with the reason.",
        "Do a brain dump: pick a competency, close everything, and write or draw all you can. Then check it and "
        "note what you left out.",
        "Go back to the walkthrough or its notes when a brain dump shows a gap you cannot fill from your guide."],
  links=[("Rx Cards", "rx-cards.html?week=7&only=1"),
         ("Try It From Memory, the brain dump", "competency-brain-dump.html?week=7")],
  turnin=None),

 dict(title="Mastery Check, and upload your report", time="30 to 50 minutes per try, at least 3 tries",
  status="Turned in. No points, but every try's report has to be turned in.",
  intro="The Mastery Check tells you which competencies are solid and which need another round. Each try is a "
        "fresh set of about 30 questions, which is more than one question for most Week 7 competencies.",
  todo=["Open the Mastery Check. It is set to Week 7 and 30 questions.",
        "Do at least 3 tries, with Study it (Step 5) in between. Aim for 80 percent before you stop. You can always do more.",
        "After each try, the report lists the competencies you missed. Go back to Step 5 for those, then take it again. If you could not "
        "start a competency at all, go back to Step 3 for that one.",
        "Save the report from every try as a PDF. The weekly practice log puts every try in one PDF, if that is easier."],
  links=[("The Week 7 Mastery Check", "practice-exam.html?week=7&n=30"),
         ("How to save and upload your reports, if you need help with it", "assignment-practice-log.html", "optional")],
  submit_here=["Upload your reports here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + ". Upload the report from every try, at least 3."],
  turnin=["Upload the reports to the <strong>Week 7 Mastery Check</strong> assignment in Canvas.",
          "Due " + DUE + ". Upload the report from every try, at least 3."]),

 dict(title="Lab, hormones and the autonomic system", time="2 to 3 hours",
  status="Graded. Investigate It, 25 percent of your grade across the term.",
  intro="This week's lab has five short parts. You watch your own autonomic nervous system change your heart rate, run three PhysioEx endocrine activities and the ELISA, "
        "read an unknown off a standard curve, read one menstrual cycle from its hormone graphs, and work one clinical case.",
  todo=["Choose how you will do the worksheet, in the Choose one box below: printed and filled in by hand, or typed on screen. Either way, open the lab page for the directions.",
        "Do the two heart rate tests at home (Part 1). Read the safety note first: if you feel dizzy, sit or lie down right away.",
        "Open PhysioEx from the Pearson link in Canvas. Run the three Exercise 4 activities named on the lab page (Part 2), then the ELISA activity in Exercise 12 (Part 3). Fill in each activity's boxes while it is fresh, with your actual numbers.",
        "Draw the standard curve by hand and read the unknowns off it (Part 3). Then work the hormone cycle sheet by hand (Part 4).",
        "Answer the clinical case and the three look back questions.",
        "Scan or photograph every page, or save the typed page as a PDF and add photos of your standard curve and both pages of the hormone cycle sheet, and combine everything into one PDF."],
  note="Your worksheet is graded once PhysioEx shows each activity complete. The PhysioEx Lab Report that Pearson makes is not the worksheet.",
  links=[("The Week 7 lab: directions and the worksheet", "lab-week07-hormones.html"),
         dict(title="Choose one: how you will do the lab worksheet",
              options=[dict(name="On paper, by hand", text="Print it and fill in the boxes, the tables, the standard curve and the hormone cycle sheet by hand. The hormone cycle sheet is the last two pages.",
                            links=[("The Week 7 lab worksheet, to print (PDF)", "sheets/BIO005-Week7-Lab-Worksheet.pdf")]),
                       dict(name="On screen", text="Type your results and answers on the lab page, then save it as a PDF. Do the standard curve and the hormone cycle sheet on paper and photograph them.",
                            links=[("Open the Week 7 lab", "lab-week07-hormones.html")])])],
  submit_here=["Upload your one PDF here, with <strong>Start Assignment</strong> at the top of this page, then <strong>Submit Assignment</strong>.",
          "Due " + DUE + "."],
  turnin=["Upload your one PDF to the <strong>Week 7 lab</strong> assignment in Canvas.",
          "Due " + DUE + "."]),

 dict(title="Your application case", time="About 1 hour 30 minutes",
  status="Nothing uploaded this week. Camila's case ends at Midterm 1, and that week you upload the whole chart as one PDF, due Sunday, November 8.",
  intro="Rounds is Camila's online chart, laid out like a hospital record. This week her diagnosis is made and the hormones that made her so sick get named, "
        "and the case walks you through it one step at a time. You type everything into Rounds, so nothing is printed, and it is the only page you need for this step.",
  todo=["Open Rounds for Week 7 and follow the steps down the left side, in order.",
        "Write your prediction first. The rest of the note, the Flowsheet, and the Results open after that.",
        "File this week's numbers in the Flowsheet. Rounds tells you which cells do not match the record, so you can fix them.",
        "Answer the five questions and your entry point's question, then write your note.",
        "Draw the control loop on paper and label it with your name and Week 7. Keep a photo of it."],
  links=[("Rounds: Week 7", "patient-rounds.html?week=7")],
  turnin=None),

 dict(title="Check your chart", time="About 10 minutes",
  status="Nothing uploaded this week. It is a quick check that this week's chart is finished.",
  intro="A quick look to make sure nothing is missing before you move on.",
  todo=["In Rounds, click the <strong>My entries</strong> tab on the right. If anything says <strong>Not written yet</strong>, go back and finish it.",
        "Go to the last step, <strong>Sign and export</strong>. Type your name and click <strong>Export this week to PDF</strong>.",
        "Save that PDF. You upload the whole chart once, at the end of the case, in the week of Midterm 1."],
  links=[("Rounds: Week 7", "patient-rounds.html?week=7")],
  turnin=None),

 dict(title="Exam practice, two timed questions", time="About 2 hours",
  status="Complete or incomplete. The answer keys are on the quizzes and in Discussion 7, so those pages are pasted from the private paste sheet, not built from this file.",
  intro="", todo=[], links=[], turnin=None),
]


# Oct 17 2026: the Step 10 pages (Discussion 7 with the Week 6 key, the Week 7
# practice and its two quizzes) carry answer keys, so they are kept out of this public repo.
