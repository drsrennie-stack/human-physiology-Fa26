/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   Section BIOL-5-D9286, asynchronous online, lecture and lab.

   THE CREDIT MODEL
   Every single thing a student does for credit in this course,
   what it is worth, how often it happens, whether AI is allowed
   on it, and how it gets verified.

   This is the skeleton. Weights are SUGGESTIONS to react to, not
   settings. Nothing here is published until Scrubs confirms.

   ------------------------------------------------------------
   THE RULE THIS WHOLE MODEL IS BUILT ON
   ------------------------------------------------------------
   Weight follows verification. The categories that produce the
   strongest evidence of a student's own reasoning carry the most
   grade. In a course with no proctor in the room, that means the
   drawings and the teaching videos matter more than they would in
   a face to face section, not less.

   ------------------------------------------------------------
   NOTHING IN THIS COURSE REQUIRES A STUDENT TO BE PRESENT
   AT A PARTICULAR TIME
   ------------------------------------------------------------
   The section is listed as asynchronous. syncRequired is false on
   every line in this file and it needs to stay that way.

   SCHOLAR POINTS ARE NOT IN THIS COURSE. They are a BIO 004
   anatomy mechanic. The block that used to sit at the bottom of
   this file described a capped bonus of three points earned
   through live sessions, and what-you-do.html was rendering it as
   though students could earn it. Removed Sep 10 2026 on Scrubs'
   instruction: "remove scholar points and bonus, that is only
   anatomy." Four categories, totalling 100, no curve, no extra
   credit.
   ============================================================ */

window.BIO005_CREDIT = {

  status: "Weights of record, set by Scrubs Sep 7 2026. Four categories, totalling 100.",

  /* The four categories total 100. Every category is asynchronous:
     nothing in this course requires a student to be present at a
     particular time. */
  suggestedTotal: 100,

  lines: [

    { id:"exams",
      name:"Show Me What You Know",
      short:"Exams",
      category:"Show Me What You Know",
      count:2, cadence:"Midterm 1 window Oct 26 to 28. Midterm 2 window Dec 14 to 16.",
      suggestedWeight:35,
      ai:"closed",
      aiNote:"No notes, no AI. Draw and teach on video.",
      verification:"Video of the student drawing a pathway and teaching it out loud with no notes. The strongest evidence in the course that the reasoning is the student's own.",
      syncRequired:false,
      purpose:"Recognizing a correct answer and building one from nothing are different skills. Only one of them transfers to a clinical program, and this format can tell them apart.",
      note:"17.5 percent each. Every week's Retrieve step is this task in miniature, ungraded, so the format is familiar long before it counts." },

    { id:"labs",
      name:"Investigate It",
      short:"Labs",
      category:"Investigate It",
      count:15, cadence:"One per week, due Sunday 10:00 pm",
      suggestedWeight:25,
      ai:"open-with-disclosure",
      aiNote:"Data and interpretation must be the student's own. Disclose any AI used and what it was used for.",
      verification:"Worksheet and data record in the student's handwriting, with the prediction written before the data. Where PhysioEx is used it must show complete in Pearson before the worksheet is graded.",
      syncRequired:false,
      purpose:"Question, prediction, evidence, interpretation, conclusion. The prediction comes before the data, and that order is where most of the learning sits.",
      note:"PhysioEx carries no points and is only the gate. Points live on the worksheet." },

    { id:"apply",
      name:"Use It",
      short:"Applications and the patient file",
      category:"Use It",
      count:15, cadence:"One case per week, accumulating into the patient file",
      suggestedWeight:25,
      ai:"open-with-disclosure",
      aiNote:"The reasoning must be the student's own and is what is graded. Disclose any AI used.",
      verification:"Each case asks the same five moves: name the variable and its control system, predict, explain the mechanism step by step, interpret the evidence, justify the conclusion and name what would change it.",
      syncRequired:false,
      purpose:"Three or four cases a week set in nursing, medicine, radiology and exercise or allied health. The student chooses the room. Every case assesses the same underlying competency, so the context varies and the rigor does not.",
      note:"This is where the choice is real and the standard is not. The cases accumulate into the patient file, which is the capstone." },

    { id:"discussions",
      name:"Think About It",
      short:"Discussions and metacognition",
      category:"Think About It",
      count:15, cadence:"Initial post Friday 10:00 pm, replies Sunday 10:00 pm",
      suggestedWeight:15,
      ai:"closed",
      aiNote:"This is the student's own thinking about their own week. There is nothing here for AI to do.",
      verification:"One post carrying the physiology and the student's thinking about it together. Decision, evidence, adjustment.",
      syncRequired:false,
      purpose:"What did your Mastery Check reveal, what did you do about it, and what happened when you tried again. Plus one physiology question that changes weekly.",
      note:"Students are told explicitly NOT to post their Mastery Check result. A number turns the thread into a leaderboard and teaches nobody anything." }

  ],

  /* ------------------------------------------------------------
     UNGRADED, AND DELIBERATELY SO

     None of this is optional in any way that matters. It is the
     entire route to the four graded categories, and the students
     who skip it are the ones who reach a midterm able to
     recognize a pathway and unable to draw one.
     ------------------------------------------------------------ */
  ungraded: [
    { id:"notesheet", name:"Note sheet and retrieval",
      why:"This is where a student finds out what they do not know. Grading it would push them to make it look finished rather than honest, and an honest sheet with gaps in it is worth more to them than a tidy one." },
    { id:"practice", name:"Practice items",
      why:"Predict, commit, check, correct, explain. Getting these wrong is the point of doing them." },
    { id:"masterycheck", name:"Mastery Check",
      why:"No points, no penalty, unlimited attempts, and it never reports a score. Every competency is asked at two levels, Retrieve and Use It, and the result is a line per competency plus a specific next move. A percentage is a grade wearing a different hat and it tells a student nothing about what to do on Tuesday." },
    { id:"recall", name:"Spaced recall cards, Mastery OS",
      why:"Week 3 has to still be there in October. Spacing is what does that, and putting points on it would turn it into a task to complete rather than a habit." }
  ],

  /* ============================================================
     SCHOLAR POINTS
     A capped bonus, not a requirement, which is what keeps the
     live sessions optional in an asynchronous section.

     Every point available through a live route is also available
     through an asynchronous route. A student who can never make a
     live session can still max this category out.
     ============================================================ */

  /* The Scholar Points block was removed Sep 10 2026. It is an anatomy
     mechanic and has never been part of this course. Nothing renders it
     and nothing should reintroduce it. */

  /* ============================================================
     AI POLICY, THE WHOLE THING IN ONE PLACE
     ============================================================ */

  aiPolicy: {
    headline: "AI is allowed in this course. It is a tool for learning the material, not a substitute for knowing it.",
    open: [
      "Reading and lecture material. Ask it to explain something a different way, generate practice questions, or check your understanding.",
      "Virtual labs.",
      "Build One and Build Two. AI is the fabrication shop. You are the physiologist directing it."
    ],
    closed: [
      "Discussion posts. Write your own thinking.",
      "Canvas quizzes and all exams.",
      "Every drawing. Hand drawn on paper, no digital devices, no tracing, no AI-generated images.",
      "Teaching videos. No script on screen.",
      "The physiology spec for Build Two."
    ],
    why: "You are going to work alongside AI for your whole career. What will separate you is whether you can tell when it is wrong. You cannot do that without knowing the physiology yourself, which is what everything on the closed list is protecting."
  }
};
