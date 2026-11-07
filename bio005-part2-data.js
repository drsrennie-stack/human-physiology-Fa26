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
  midterm2: { label: "Midterm 2", opens: "2026-12-14", closes: "2026-12-16", covers: "Weeks 9 to 14" },
  lastDrop: "2026-11-21",
  observances: [
    { date: "2026-11-11", name: "Veterans Day" },
    { date: "2026-11-26", name: "Thanksgiving" },
    { date: "2026-11-27", name: "Day after Thanksgiving" }
  ],

  /* Cards are graded by how many you work each week, Monday to Sunday. */
  cardBands: [[70, "D"], [105, "C"], [175, "B"], [350, "A"]],

  /* The loop every week runs on. Days are suggested pacing. The hard deadlines are the discussion
     post (Friday 10:00 pm), replies (Sunday 10:00 pm), and everything else at the week close (Sunday 11:59 pm). */
  loop: [
    { n: 1, when: "Monday to Wednesday", name: "Lecture and note sheet",
      what: "Print the note sheet. Watch the walk-through lecture and fill the sheet in as the boxes are revealed. Submit your completed sheet in Canvas; that is your notes grade. The written course notes and the competency prompts are there for the read-through version.", graded: "Graded, note sheet" },
    { n: 2, when: "Every day, a little", name: "Rx Cards",
      what: "Cards are graded by volume, Monday to Sunday: 70 is a D, 105 a C, 175 a B, 350 an A. Enter your name once in the cards page so your daily count is kept for you, and print the weekly report on Sunday.", graded: "Graded, card report" },
    { n: 3, when: "Wednesday to Friday", name: "Clinical lab",
      what: "An interactive lab with cases. You calculate or read, then explain what it means in your own words; the check does not open until you have written your interpretation. Print to PDF and upload.", graded: "Graded, lab" },
    { n: 4, when: "Post Friday 10:00 pm, replies Sunday 10:00 pm", name: "Discussion",
      what: "A different question each week. Your post uses the week's physiology; your second reply says what you got wrong in your first post and what changed your mind.", graded: "Graded, discussion" },
    { n: 5, when: "By Sunday 11:59 pm", name: "Mastery Check",
      what: "The full set of questions on the week's competencies, nothing open. It is not done until every question is answered.", graded: "Graded, Mastery Check" },
    { n: 6, when: "Any time, as often as you like", name: "Randomized practice exam",
      what: "A shuffled exam drawn from the week's pool, with a gap finder that tells you which competency to go back to. Not graded; this is how you find out before the Mastery Check does.", graded: "Not graded" }
  ],

  weeks: [
    { wk: 9, opens: "2026-11-09", closes: "2026-11-15", title: "The heart as a pump",
      page: "week-09.html", competencies: "week-09-competencies.html", notes: "week-09-notes.html", prompts: "note-sheet.html?week=9",
      lectureVideo: { label: "Walk-through lecture video", url: "https://yccd.instructure.com/courses/42616/modules" },
      study: { label: "Click-through slides: The heart as a pump", url: "li/w9/study.html" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "li/w9/BIO005-W09-Lecture-Sheet-Heart-as-a-Pump.pdf" },
      lab: { label: "Clinical lab: The heart (calculations, EKG, heart sounds, biomarkers)", url: "cardiac-lab.html" },
      discussion: { label: "Discussion 9: The engineering team", url: "discussion-w9-engineering.html" },
      mastery: "practice-exam.html?week=9", practice: "practice-exam.html?week=9", ungraded: "ungraded-sheet.html?week=9",
      note: "Veterans Day is Wednesday, November 11. Nothing is due that day." },

    { wk: 10, opens: "2026-11-09", closes: "2026-11-22", title: "Pressure, flow, and holding blood pressure steady",
      page: "week-10.html", competencies: "week-10-competencies.html", notes: "week-10-notes.html", prompts: "note-sheet.html?week=10",
      lectureVideo: { label: "Walk-through lecture video", url: "https://yccd.instructure.com/courses/42616/modules" },
      study: { label: "Click-through slides: Pressure, flow and blood pressure", url: "li/w10/study.html" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "li/w10/BIO005-W10-Lecture-Sheet-Pressure-Flow-BP.pdf" },
      lab: { label: "Clinical lab: Hemodynamics (resistance, the pressure numbers, standing up, predicting the system)", url: "hemodynamics-lab.html" },
      discussion: { label: "Discussion 10", url: "" },
      mastery: "practice-exam.html?week=10", practice: "practice-exam.html?week=10", ungraded: "ungraded-sheet.html?week=10",
      note: "This week runs two weeks, November 9 to 22, beside Week 9 and then Week 11. The last day to drop is Saturday, November 21." },

    { wk: 11, opens: "2026-11-16", closes: "2026-11-22", title: "Blood and how the body defends itself",
      page: "week-11.html", competencies: "week-11-competencies.html", notes: "week-11-notes.html", prompts: "note-sheet.html?week=11",
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: Blood and defense", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: Blood (CBC and PCR pattern lab)", url: "cbc-pcr-lab.html" },
      discussion: { label: "Discussion 11", url: "" },
      mastery: "practice-exam.html?week=11", practice: "practice-exam.html?week=11", ungraded: "ungraded-sheet.html?week=11",
      note: "Last day to drop with a grade: Saturday, November 21." },

    { wk: 12, opens: "2026-11-23", closes: "2026-11-29", title: "Digestion, and how you use food for fuel",
      page: "week-12.html", competencies: "week-12-competencies.html", notes: "week-12-notes.html", prompts: "note-sheet.html?week=12",
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: Digestion and fuel", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: Digestion and metabolism", url: "" },
      discussion: { label: "Discussion 12", url: "" },
      mastery: "practice-exam.html?week=12", practice: "practice-exam.html?week=12", ungraded: "ungraded-sheet.html?week=12",
      note: "Thanksgiving week. Thursday and Friday are holidays and nothing is due on them." },

    { wk: 13, opens: "2026-11-30", closes: "2026-12-06", title: "Breathing, gas transport, and the fast pH lever",
      page: "week-13.html", competencies: "week-13-competencies.html", notes: "week-13-notes.html", prompts: "note-sheet.html?week=13",
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: Breathing and gas transport", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: Breathing (spirometry, oxygen transport)", url: "" },
      discussion: { label: "Discussion 13", url: "" },
      mastery: "practice-exam.html?week=13", practice: "practice-exam.html?week=13", ungraded: "ungraded-sheet.html?week=13",
      note: "" },

    { wk: 14, opens: "2026-12-07", closes: "2026-12-13", title: "The kidney and body fluid balance",
      page: "week-14.html", competencies: "week-14-competencies.html", notes: "week-14-notes.html", prompts: "note-sheet.html?week=14",
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: The kidney", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "Clinical lab: The kidney", url: "" },
      discussion: { label: "Discussion 14", url: "" },
      mastery: "practice-exam.html?week=14", practice: "practice-exam.html?week=14", ungraded: "ungraded-sheet.html?week=14",
      note: "Last full week before Midterm 2." },

    { wk: 15, opens: "2026-12-14", closes: "2026-12-16", title: "The slow pH lever, putting it together, and Midterm 2",
      page: "week-15.html", exam: true, competencies: "week-15-competencies.html", notes: "week-15-notes.html", prompts: "note-sheet.html?week=15",
      lectureVideo: { label: "Walk-through lecture video", url: "" },
      study: { label: "Click-through slides: The slow pH lever", url: "" },
      noteSheet: { label: "Lecture note sheet, print and fill in", url: "" },
      lab: { label: "No lab this week", url: "" },
      discussion: { label: "No discussion this week", url: "" },
      mastery: "practice-exam.html?week=15", practice: "practice-exam.html", ungraded: "ungraded-sheet.html?week=15",
      note: "Three days only. Midterm 2 runs Monday, December 14 to Wednesday, December 16 and covers Weeks 9 to 14." }
  ],

  /* Pages that are the same every week. */
  always: {
    rx: "rx-cards.html", brainDump: "competency-brain-dump.html", draw: "mastery-canvas.html",
    packet: "competency-packet-fall2026.html", packetPdf: "competency-packet-fall2026.pdf",
    printPack: "week-print-pack.html", practiceAll: "practice-exam.html",
    schedule: "course-schedule.html", syllabus: "syllabus-fall2026.html", studyWithMe: "study-with-me.html",
    studyCalendar: "study-with-me-calendar.html", virtualOfficePage: "virtual-office.html", accessibility: "accessibility.html",
    howWeeks: "how-every-week-works.html", home: "index.html", yourWeek: "your-week.html", guide: "learning-guide.html"
  }
};
