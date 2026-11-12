/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-part2-data.js

   One list of what Part 2 (Weeks 9 to 15, after Midterm 1) asks for each
   week, read by learning-guide.html and your-week.html. Dates come from
   bio005-schedule-fall2026.js. Nothing here changes any other page.

   HOW TO TURN A LINK ON
   A resource with url:"" shows as "not posted yet". When the page is live,
   paste its file name (or Canvas link) into url. Nothing else to edit.

   Author: Dr. Sharilyn Rennie.
   ============================================================ */
window.BIO005_PART2 = {
  course: "BIO 005 Human Physiology",
  college: "Yuba College",
  term: "Fall 2026",
  canvas: "https://yccd.instructure.com/courses/42616",
  canvasModules: "https://yccd.instructure.com/courses/42616/modules",
  canvasDiscussions: "https://yccd.instructure.com/courses/42616/discussion_topics",
  virtualOffice: "https://yccd.instructure.com/courses/42616/discussion_topics/711800",
  pathwayPage: "choose-your-pathway.html",
  midterm2: { label: "Midterm 2", opens: "2026-12-10", closes: "2026-12-14", covers: "Weeks 9 to 14" },
  lastDrop: "2026-11-21",
  /* Nov 8 2026: one unit at a time, aiming for about one unit every five days from the start of Part 2. */
  pace: { start: "2026-11-09", days: 5 },
  observances: [
    { date: "2026-11-11", name: "Veterans Day" },
    { date: "2026-11-26", name: "Thanksgiving" },
    { date: "2026-11-27", name: "Day after Thanksgiving" }
  ],

  /* Cards are graded by how many you work each week, Monday to Sunday. */
  cardBands: [[70, "D"], [105, "C"], [175, "B"], [350, "A"]],

  /* The loop every week runs on. Days are suggested pacing. The hard deadlines are the discussion
     post (Friday 10:00 pm), replies (Sunday 10:00 pm), and everything else at the week close (Sunday 11:59 pm). */
  /* Nov 8 2026: from Week 10 the week runs on the mastery pathway. Every graded piece
     has a target, 70, 80, 90 or 100 percent, and one revision. Week 9 runs as posted. */
  loop: [
    { n: 1, when: "Early in the week", name: "Lecture and drawing",
      what: "Watch the lecture. The note sheet and the click-through slides are recommended. Then do the lecture drawing by hand: normal, disrupted, and the fix.", graded: "Graded, drawing, pick a target" },
    { n: 2, when: "Every day, a little", name: "Rx Cards",
      what: "Spaced recall, a few minutes a day. Recommended, not required.", graded: "Not graded, recommended" },
    { n: 3, when: "Midweek", name: "Two cases",
      what: "Two cases on the week's topic, in the midterm format: decide, draw three panels, and answer the challenge question. Handwritten.", graded: "Graded, cases, pick a target" },
    { n: 4, when: "Midweek", name: "Lab",
      what: "PhysioEx or one of Dr. Rennie's labs. Calculate or read, then explain what it means. Print to PDF and upload.", graded: "Graded, lab, pick a target" },
    { n: 5, when: "By Sunday", name: "Mastery Check",
      what: "Pick your target, answer the questions for that level and every level below it, and upload the report. Two graded attempts; the second uses different questions.", graded: "Graded, Mastery Check, pick a target" },
    { n: 6, when: "When one is open", name: "Project",
      what: "A few projects through the rest of the term, such as the Wiggers diagram, the GI map and the renal map. They take the place of the weekly discussion.", graded: "Graded, project, pick a target" }
  ],

  weeks: [
    { wk: 9, opens: "2026-11-09", closes: "2026-11-15", title: "Heart Physiology",
      page: "week-09.html", competencies: "week-09-competencies.html", notes: "week-09-notes.html", prompts: "note-sheet.html?week=9",
      topicNotes: [{ label: "Heart Physiology", url: "biol005-w09-heart-notes.html", pdf: "notes/BIO005-Week9-Notes-heart.pdf" }],
      lectureVideo: { label: "Lecture video: Week 9 in one player, by chapter", url: "concept-videos-part2.html?week=9" },
      videos: { label: "Concept videos, Week 9: press play once, or start at any topic", url: "concept-videos-part2.html?week=9" },
      study: { label: "Click-through slides: Heart Physiology", url: "li/w9/study.html" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "li/w9/BIO005-W09-Lecture-Sheet-Heart-as-a-Pump.pdf" },
      lab: { label: "Clinical lab: The heart (calculations, EKG, heart sounds, biomarkers)", url: "cardiac-lab.html" },
      discussion: { label: "Discussion 9: Present your cases", url: "discussion-w9-cases.html" },
      cases: { label: "Two cases: a Wiggers diagram case and a cardiac lab case", url: "week09-wiggers-cases.html", url2: "week09-cardiac-lab-cases.html" },
      mastery: "practice-exam.html?week=9", practice: "practice-exam.html?week=9", ungraded: "ungraded-sheet.html?week=9",
      note: "Veterans Day is Wednesday, November 11. Nothing is due that day." },

    { wk: 10, opens: "2026-11-11", closes: "2026-11-22", title: "Blood Vessel Physiology",
      page: "week-10.html", competencies: "week-10-competencies.html", notes: "week-10-notes.html", prompts: "note-sheet.html?week=10",
      topicNotes: [{ label: "Blood Vessel Physiology", url: "biol005-w10-vessels-bp-notes.html", pdf: "notes/BIO005-Week10-Notes-vessels-bp.pdf" }],
      lectureVideo: { label: "Lecture video: Week 10 in one player, by chapter", url: "concept-videos-part2.html?week=10" },
      videos: { label: "Concept videos, Week 10: press play once, or start at any topic", url: "concept-videos-part2.html?week=10" },
      study: { label: "Click-through slides: Pressure, flow and blood pressure", url: "li/w10/study.html" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "li/w10/BIO005-W10-Lecture-Sheet-Pressure-Flow-BP.pdf" },
      lab: { label: "Clinical lab: Hemodynamics (resistance, the pressure numbers, standing up, predicting the system)", url: "hemodynamics-lab.html" },
      discussion: { label: "Discussion 10: Present your cases", url: "discussion-w10.html" },
      mastery: "mastery-pathway.html?week=10", practice: "practice-exam.html?week=10", ungraded: "ungraded-sheet.html?week=10",
      pathway: true, knowIt: "",
      stations: { label: "Lab stations: the cuff and the ankle-brachial index", url: "bp-stations.html" },
      drawing: { label: "Lecture drawing: standing up", url: "week10-drawing.html" },
      cases: { label: "Two cases: swollen ankles, and a fall from a bike", url: "week10-cases.html" },
      project: { label: "Project", url: "" },
      note: "Opens Wednesday, November 11, and runs to November 22, beside Week 9 and then Week 11. The mastery pathway starts this week. The last day to drop is Saturday, November 21." },

    { wk: 11, opens: "2026-11-16", closes: "2026-11-22", title: "Blood and how the body defends itself",
      page: "week-11.html", competencies: "week-11-competencies.html", notes: "week-11-notes.html", prompts: "note-sheet.html?week=11",
      topicNotes: [{ label: "Blood", url: "biol005-w11-blood-notes.html", pdf: "notes/BIO005-Week11-Notes-blood.pdf" }, { label: "Lymph and immunity", url: "biol005-w11-lymph-immunity-notes.html", pdf: "notes/BIO005-Week11-Notes-lymph-immunity.pdf" }],
      videos: { label: "Concept videos, Week 11: press play once, or start at any topic", url: "concept-videos-part2.html?week=11" },
      lectureVideo: { label: "Lecture video: Week 11 in one player, by chapter", url: "concept-videos-part2.html?week=11" },
      study: { label: "Click-through slides: Blood and defense", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: Blood (CBC and PCR pattern lab)", url: "cbc-pcr-lab.html" },
      discussion: { label: "Discussion 11", url: "" },
      mastery: "mastery-pathway.html?week=11", practice: "practice-exam.html?week=11", ungraded: "ungraded-sheet.html?week=11",
      pathway: true, knowIt: "",
      drawing: { label: "Lecture drawing: out of breath on the stairs", url: "week11-drawing.html" },
      cases: { label: "Two cases: a clot after a flight, and the wrong unit of blood", url: "week11-cases.html" },
      project: { label: "Project", url: "" },
      note: "Last day to drop with a grade: Saturday, November 21." },

    { wk: 12, opens: "2026-11-23", closes: "2026-11-29", title: "Digestion, and how you use food for fuel",
      page: "week-12.html", competencies: "week-12-competencies.html", notes: "week-12-notes.html", prompts: "note-sheet.html?week=12",
      topicNotes: [{ label: "Digestion", url: "biol005-w12-digestion-notes.html", pdf: "notes/BIO005-Week12-Notes-digestion.pdf" }],
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: Digestion and fuel", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: Digestion and metabolism", url: "" },
      discussion: { label: "Discussion 12", url: "" },
      mastery: "mastery-pathway.html?week=12", practice: "practice-exam.html?week=12", ungraded: "ungraded-sheet.html?week=12",
      pathway: true, knowIt: "",
      drawing: { label: "Lecture drawing", url: "" },
      cases: { label: "Two cases", url: "" },
      project: { label: "Project", url: "" },
      note: "Thanksgiving week. Thursday and Friday are holidays and nothing is due on them." },

    { wk: 13, opens: "2026-11-30", closes: "2026-12-06", title: "Breathing, gas transport, and the fast pH lever",
      videos: { label: "Concept videos, Week 13: press play once, or start at any topic", url: "concept-videos-part2.html?week=13" },
      page: "week-13.html", competencies: "week-13-competencies.html", notes: "week-13-notes.html", prompts: "note-sheet.html?week=13",
      topicNotes: [{ label: "Breathing and gas transport", url: "biol005-w13-breathing-notes.html", pdf: "notes/BIO005-Week13-Notes-breathing.pdf" }, { label: "Acid-base balance", url: "biol005-w13-acid-base-notes.html", pdf: "notes/BIO005-Week13-Notes-acid-base.pdf" }],
      lectureVideo: { label: "Lecture video: Week 13 in one player, by chapter", url: "concept-videos-part2.html?week=13" },
      study: { label: "Click-through slides: Breathing and gas transport", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: Breathing (spirometry, oxygen transport)", url: "" },
      discussion: { label: "Discussion 13", url: "" },
      mastery: "mastery-pathway.html?week=13", practice: "practice-exam.html?week=13", ungraded: "ungraded-sheet.html?week=13",
      pathway: true, knowIt: "",
      drawing: { label: "Lecture drawing", url: "" },
      cases: { label: "Two cases", url: "" },
      project: { label: "Project", url: "" },
      note: "" },

    { wk: 14, opens: "2026-12-07", closes: "2026-12-13", title: "The kidney and body fluid balance",
      page: "week-14.html", competencies: "week-14-competencies.html", notes: "week-14-notes.html", prompts: "note-sheet.html?week=14",
      topicNotes: [{ label: "The kidney", url: "biol005-w14-kidney-notes.html", pdf: "notes/BIO005-Week14-Notes-kidney.pdf" }, { label: "Fluid and electrolytes", url: "biol005-w14-fluid-electrolytes-notes.html", pdf: "notes/BIO005-Week14-Notes-fluid-electrolytes.pdf" }],
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: The kidney", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: The kidney", url: "" },
      discussion: { label: "Discussion 14", url: "" },
      mastery: "mastery-pathway.html?week=14", practice: "practice-exam.html?week=14", ungraded: "ungraded-sheet.html?week=14",
      pathway: true, knowIt: "",
      drawing: { label: "Lecture drawing", url: "" },
      cases: { label: "Two cases", url: "" },
      project: { label: "Project", url: "" },
      note: "Last full week before Midterm 2." },

    { wk: 15, opens: "2026-12-10", closes: "2026-12-14", title: "The slow pH lever, putting it together, and Midterm 2",
      page: "week-15.html", exam: true, competencies: "week-15-competencies.html", notes: "week-15-notes.html", prompts: "note-sheet.html?week=15",
      topicNotes: [{ label: "Acid-base balance: how the kidney controls pH", url: "biol005-w13-acid-base-notes.html#renal-control-of-ph", pdf: "notes/BIO005-Week13-Notes-acid-base.pdf" }],
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: The slow pH lever", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "No lab this week", url: "" },
      discussion: { label: "No discussion this week", url: "" },
      mastery: "mastery-pathway.html?week=15", practice: "practice-exam.html", ungraded: "ungraded-sheet.html?week=15",
      pathway: true, knowIt: "",
      drawing: { label: "Lecture drawing", url: "" },
      cases: { label: "Two cases", url: "" },
      project: { label: "Project", url: "" },
      note: "Midterm 2 opens Thursday, December 10 and closes Monday, December 14. It covers Weeks 9 to 14." }
  ],

  /* Pages that are the same every week. */
  always: {
    rx: "rx-cards.html", brainDump: "competency-brain-dump.html", draw: "mastery-canvas.html",
    packet: "competency-packet-fall2026.html", packetPdf: "competency-packet-fall2026.pdf",
    printPack: "week-print-pack.html", practiceAll: "practice-exam.html",
    schedule: "course-schedule.html", syllabus: "syllabus-fall2026.html", studyWithMe: "study-with-me.html",
    studyCalendar: "study-with-me-calendar.html", virtualOfficePage: "virtual-office.html", accessibility: "accessibility.html",
    howWeeks: "how-every-week-works.html", home: "index.html", videos: "concept-videos-part2.html", yourWeek: "your-week.html", guide: "learning-guide.html"
  }
};
