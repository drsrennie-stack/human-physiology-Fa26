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
   The section is listed as asynchronous. Live study sessions
   exist and are the best-value way to earn Scholar Points, but
   every point available through a live session is also available
   through an asynchronous route. syncRequired is false on every
   line in this file and it needs to stay that way.

   CONFIRM WITH THE YUBA DISTANCE EDUCATION COORDINATOR before
   publishing anything involving live sessions.
   ============================================================ */

window.BIO005_CREDIT = {

  status: "SKELETON. Weights are suggestions. Confirm before publishing.",

  /* Suggested weights total 100. Scholar Points sit on top as a
     capped bonus, which is what keeps them from being a
     requirement to be somewhere at a set hour. */
  suggestedTotal: 100,

  lines: [

    { id:"checkpoints",
      name:"Weekly checkpoint",
      short:"Prove what you learned this week",
      category:"Weekly work",
      count:15, cadence:"One per week, closes Sunday 11:59 pm",
      suggestedWeight:10,
      ai:"closed",
      aiNote:"Canvas quiz. No AI.",
      verification:"Canvas quiz, auto-scored, pulls from that week competency ids plus spaced items from earlier weeks.",
      syncRequired:false,
      purpose:"This is what replaces attendance. Low stakes on purpose. Its real job is telling you and me which competencies did not land, early enough to do something about it.",
      note:"The miss data from these is what students draw their project problem from in Week 8." },

    { id:"drawings",
      name:"Drawing and voice-over",
      short:"Draw the mechanism from memory, then explain it out loud",
      category:"Weekly work",
      count:15, cadence:"One per week, closes Sunday 11:59 pm",
      suggestedWeight:10,
      ai:"closed",
      aiNote:"Hand drawn on paper. No digital devices, no AI, no tracing. Photograph it and record 60 to 90 seconds explaining what you drew.",
      verification:"Complete or incomplete, with five students audited at random each week. The voice is the part that cannot be handed to you.",
      syncRequired:false,
      purpose:"Producing the mechanism from memory and then checking it is the whole method of this course. It is also the assessment that still works when nobody is proctoring the room.",
      note:"Alternate path for a student who cannot record audio: screen-recorded annotated drawing with typed narration, or a scheduled typed session with me. Stated in the syllabus from day one." },

    { id:"labs",
      name:"Virtual lab",
      short:"The lab component, asynchronous",
      category:"Lab",
      count:15, cadence:"One per week",
      suggestedWeight:20,
      ai:"open",
      aiNote:"AI allowed as a resource while you work.",
      verification:"Lab submission. Format depends on the lab delivery decision.",
      syncRequired:false,
      purpose:"Lecture and lab are both asynchronous online in this section, so the lab has to be something a student can actually do alone at home.",
      note:"PLACEHOLDER. Delivery undecided: purchased virtual lab, home kit, or simulations built in house. Scrubs is uploading the lab and procedure documents. This weight is a guess until the labs are known." },

    { id:"exams",
      name:"Unit exams 1 through 5",
      short:"One per module",
      category:"Exams",
      count:5, cadence:"End of each module, windowed",
      suggestedWeight:20,
      ai:"closed",
      aiNote:"No AI.",
      verification:"Canvas, windowed rather than clock-timed so night shift and childcare are not penalized.",
      syncRequired:false,
      purpose:"Breadth. The exams and the checkpoints are what cover all 137 competencies. The project covers a handful of them deeply.",
      note:"Proctoring undecided. A proctored exam cannot be a multi-day window, so this decision changes five dates." },

    { id:"final",
      name:"Cumulative final",
      short:"Everything, once",
      category:"Exams",
      count:1, cadence:"Week 15, Dec 14 to 16",
      suggestedWeight:10,
      ai:"closed",
      aiNote:"No AI.",
      verification:"Canvas.",
      syncRequired:false,
      purpose:"Retention across the whole term, not just the last module.",
      note:"" },

    { id:"teaching",
      name:"Teaching video",
      short:"Three minutes, teach it without notes",
      category:"Show me you know it",
      count:4, cadence:"Once per module",
      suggestedWeight:10,
      ai:"closed",
      aiNote:"No script on screen, no slides. Your hand and your drawing visible while you talk.",
      verification:"Three minute hard cap. Prompt assigned at random from a pool of six to eight when the window opens, so sharing does not help. Four-line rubric.",
      syncRequired:false,
      purpose:"This is the asynchronous version of an oral exam. It is the single strongest evidence in the course that the understanding belongs to the student.",
      note:"The Week 14 one is the presentation of the student's own project, so it does not add a grading round." },

    { id:"build1",
      name:"Build One",
      short:"Everyone builds the same game, with their own physiology in it",
      category:"AI Project Lab",
      count:1, cadence:"Weeks 2 to 7, presented Week 7",
      suggestedWeight:7,
      ai:"open",
      aiNote:"AI is the fabrication shop. You are the physiologist directing it. You supply every physiological claim and you verify it.",
      verification:"The working file submitted to Canvas, the live GitHub Pages link, and the full AI transcript. The transcript is graded on how you directed it and what you caught, so a transcript with no corrections in it scores low.",
      syncRequired:false,
      purpose:"Learn the build once, on a known-good target, with everyone on the same engine so support is one conversation instead of thirty.",
      note:"Common engine is Which Way Does It Move. Each student picks their own topic from Modules 1 and 2." },

    { id:"build2",
      name:"Build Two",
      short:"Find a real learning problem and solve it",
      category:"AI Project Lab",
      count:1, cadence:"Weeks 8 to 15",
      suggestedWeight:8,
      ai:"open",
      aiNote:"Same rule. AI builds, you supply and verify the physiology.",
      verification:"Written problem statement, the physiology spec (AI closed), the working tool, the AI transcript, a peer error hunt, and the Week 14 teaching video about your own tool.",
      syncRequired:false,
      purpose:"Transfer. You have built one, now find a problem you or your classmates actually have and solve it.",
      note:"The problem must come off the student's own miss list from Weeks 1 to 7. The tool has to make someone learn it, not look it up." },

    { id:"discussions",
      name:"Discussions",
      short:"Two running threads",
      category:"Discussion",
      count:null, cadence:"Success and Mastery runs all term. Build Log runs Weeks 8 to 15.",
      suggestedWeight:5,
      ai:"closed",
      aiNote:"Write these yourself. A discussion post is a place to think out loud, and AI thinking out loud for you defeats the point.",
      verification:"Posted and responded to.",
      syncRequired:false,
      purpose:"Thread one is about how to succeed and reach mastery in physiology, and it pairs with the checkpoint data. Thread two is the build log, where you post progress, stuck points, and what the AI got wrong.",
      note:"The what-the-AI-got-wrong posts accumulate into a running class list. That list is worth keeping and reusing next term." }

  ],

  /* ============================================================
     SCHOLAR POINTS
     A capped bonus, not a requirement, which is what keeps the
     live sessions optional in an asynchronous section.

     Every point available through a live route is also available
     through an asynchronous route. A student who can never make a
     live session can still max this category out.
     ============================================================ */

  scholar: {
    name: "Scholar Points",
    kind: "Capped bonus on top of 100",
    suggestedCap: 3,
    suggestedTarget: 6,
    unit: "point",
    rule: "Earn points through any mix of the routes below. No single route can supply more than half your total, so you have to do at least two different kinds of thing.",
    syncRequired: false,
    fairnessNote: "Live sessions are the best-value route and most students will choose them. Nobody is required to attend one. Confirm the whole category with the Yuba DE coordinator before publishing.",

    routes: [
      { id:"host-live", name:"Host a live Study With Me session", points:3, mode:"live",
        what:"Set your own time, pick an activity, post it to the board, run it.",
        evidence:"Host log: date and time, who attended, which competencies you covered, and one artifact. A photo of the shared drawing or a screenshot of the Kahoot results.",
        why:"Hosting is worth the most because teaching it is the best way to learn it. That is not a motivational line, it is why this route pays triple." },

      { id:"attend-live", name:"Attend a live Study With Me session", points:1, mode:"live",
        what:"Show up and participate. Camera on with a virtual background is the expectation.",
        evidence:"The host lists you on their log.",
        why:"Participating means participating. Watching silently does not count, and the host will not list you if you did not engage.",
        access:"If you cannot be on camera, take part by voice and in chat. You do not have to explain why." },

      { id:"host-async", name:"Run an async study thread", points:3, mode:"async",
        what:"Pick one competency, post a prompt to the board, respond to everyone who answers, and post a summary of where people went wrong.",
        evidence:"The thread itself.",
        why:"This is hosting without the clock. Same work, same value, no time zone required." },

      { id:"drawing-clinic", name:"Post a mechanism drawing and coach two people on theirs", points:2, mode:"async",
        what:"Hand draw a mechanism, post it, and give real feedback on two classmates' drawings. Real feedback names something specific that is wrong or missing.",
        evidence:"Your post and your two responses.",
        why:"Finding the error in someone else's mechanism is harder than drawing your own." },

      { id:"walkthrough", name:"Record a walkthrough others use", points:2, mode:"async",
        what:"Record yourself working through something difficult, post it, and answer the questions it generates.",
        evidence:"The recording and your replies.",
        why:"Same skill as the teaching video, lower stakes, and it helps somebody." },

      { id:"attend-async", name:"Work through someone's async thread or walkthrough", points:1, mode:"async",
        what:"Answer the prompt or work the walkthrough, and post what you got wrong and why.",
        evidence:"Your post.",
        why:"Saying out loud what you got wrong is most of the value. This route only counts if you do that part." }
    ],

    activities: [
      { id:"kahoot",   name:"Kahoot round",        note:"Fast, social, good for a warm up. Not the whole session." },
      { id:"loop-draw",name:"Loop drawings",       note:"One person starts a mechanism, passes it, next person adds the following step. Everybody draws." },
      { id:"taboo",    name:"Physiology Taboo",    note:"Explain the concept without the four obvious words." },
      { id:"pictionary",name:"Mechanism Pictionary", note:"Draw it, others name it. Physiology draws well because it is gradients, loops, and cascades." },
      { id:"which-way",name:"Which Way Does It Move", note:"Run somebody's Build One tool as the session activity." },
      { id:"quiz-each",name:"Quiz each other cold", note:"No notes open. The point is retrieval, not review." },
      { id:"case",     name:"Walk a case",         note:"One patient, reveal the vitals one at a time, name the compensation before the next reveal." }
    ],

    hostRules: [
      "Post your session to the board at least 24 hours ahead so people can plan.",
      "45 to 60 minutes. Longer sessions lose people.",
      "Everybody works. If one person is talking and five are watching, it is a lecture, and you already have those.",
      "Pick one activity and one topic. A session that tries to cover a whole module covers nothing.",
      "Submit your host log within 48 hours."
    ]
  },

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
