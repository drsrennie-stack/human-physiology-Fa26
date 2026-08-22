/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   schedule-fall2026.js

   What the dock and Hootie read for dates and module scope.
   Generated from bio005-schedule-fall2026.js so there is one
   calendar, not two. Edit that file, then regenerate this.

   Every exam window here is a PROPOSAL, not a setting.
   Holiday closures are assumed from the standard California
   community college calendar and are not confirmed against Yuba.
   ============================================================ */

window.BIO005_MODULES_SCHEDULE = [
 {
  "n": 1,
  "weeks": [
   1,
   2,
   3
  ],
  "exam": 1,
  "title": "Foundations, membranes and cell signaling",
  "detail": "Exam 1 window 2026-09-25 to 2026-09-27. Proposed, not set."
 },
 {
  "n": 2,
  "weeks": [
   4,
   5,
   6
  ],
  "exam": 2,
  "title": "Neurophysiology and muscle physiology",
  "detail": "Exam 2 window 2026-10-16 to 2026-10-18. Proposed, not set."
 },
 {
  "n": 3,
  "weeks": [
   7,
   8,
   9
  ],
  "exam": 3,
  "title": "Sensory, motor, autonomic and endocrine physiology",
  "detail": "Exam 3 window 2026-11-06 to 2026-11-08. Proposed, not set."
 },
 {
  "n": 4,
  "weeks": [
   10,
   11,
   12
  ],
  "exam": 4,
  "title": "Cardiovascular and respiratory physiology",
  "detail": "Exam 4 window 2026-11-25 to 2026-12-01. Proposed, not set."
 },
 {
  "n": 5,
  "weeks": [
   13,
   14,
   15
  ],
  "exam": 5,
  "title": "Renal, digestive, metabolic, immune and reproductive physiology",
  "detail": "Exam 5 window 2026-12-11 to 2026-12-13. Proposed, not set."
 }
];

/* The OS reads BIO005_MODULES from bio005-competencies.js. This file
   only adds the calendar view of those modules, under its own name so
   it cannot clobber the competency module list. */
if (!window.BIO005_MODULES) { window.BIO005_MODULES = window.BIO005_MODULES_SCHEDULE; }

window.BIO005_SECTIONS = {
 "course": "BIO 005 Human Physiology",
 "term": "Fall 2026",
 "college": "Yuba College",
 "start": "2026-09-08",
 "end": "2026-12-16",
 "closures": [
  {
   "date": "2026-11-11",
   "name": "Veterans Day, assumed"
  },
  {
   "date": "2026-11-26",
   "name": "Thanksgiving, assumed"
  },
  {
   "date": "2026-11-27",
   "name": "Thanksgiving Friday, assumed"
  }
 ],
 "sections": [
  {
   "key": "net",
   "label": "Sutter Internet (NET), fully online",
   "crn": "BIOL-5-D9286",
   "detail": "Lecture and lab both asynchronous. Weeks open Monday 12:00 am and close Sunday 11:59 pm."
  }
 ],
 "duties": []
};

window.BIO005_SESSIONS = {
 "net": [
  {
   "wk": 1,
   "opens": "2026-09-08",
   "closes": "2026-09-13",
   "title": "Homeostasis: how your body holds itself steady",
   "exam": null,
   "note": "Short week, term opens on a Tuesday. Front-load orientation, not content."
  },
  {
   "wk": 2,
   "opens": "2026-09-14",
   "closes": "2026-09-20",
   "title": "How things get in and out of a cell",
   "exam": null,
   "note": null
  },
  {
   "wk": 3,
   "opens": "2026-09-21",
   "closes": "2026-09-27",
   "title": "Membrane potential, and how cells send signals",
   "exam": "Exam 1",
   "note": "Census is Sun Sep 27, the same day this week closes. Exam 1 feedback should be posted before census so students choosing to drop can decide on evidence."
  },
  {
   "wk": 4,
   "opens": "2026-09-28",
   "closes": "2026-10-04",
   "title": "The action potential: how a nerve signal fires",
   "exam": null,
   "note": null
  },
  {
   "wk": 5,
   "opens": "2026-10-05",
   "closes": "2026-10-11",
   "title": "How nerve cells talk to each other, and to muscle",
   "exam": null,
   "note": null
  },
  {
   "wk": 6,
   "opens": "2026-10-12",
   "closes": "2026-10-18",
   "title": "How muscle contracts and makes force",
   "exam": "Exam 2",
   "note": null
  },
  {
   "wk": 7,
   "opens": "2026-10-19",
   "closes": "2026-10-25",
   "title": "How you see, hear, taste, smell and feel",
   "exam": null,
   "note": null
  },
  {
   "wk": 8,
   "opens": "2026-10-26",
   "closes": "2026-11-01",
   "title": "How you move, and what your body runs automatically",
   "exam": null,
   "note": null
  },
  {
   "wk": 9,
   "opens": "2026-11-02",
   "closes": "2026-11-08",
   "title": "Hormones: your body's slower control system",
   "exam": "Exam 3",
   "note": "Exam 3 closes Nov 8. The last day to drop is Nov 21, so students have three graded exams in hand before that decision. Keep it that way."
  },
  {
   "wk": 10,
   "opens": "2026-11-09",
   "closes": "2026-11-15",
   "title": "How the heart pumps blood",
   "exam": null,
   "note": "Veterans Day falls Wed Nov 11 inside this week. Nothing graded should be due that day."
  },
  {
   "wk": 11,
   "opens": "2026-11-16",
   "closes": "2026-11-22",
   "title": "Blood pressure and blood flow, and how they stay steady",
   "exam": null,
   "note": "Last day to drop is Sat Nov 21, inside this week."
  },
  {
   "wk": 12,
   "opens": "2026-11-23",
   "closes": "2026-11-29",
   "title": "Breathing, and how oxygen gets to your cells",
   "exam": "Exam 4",
   "note": "THANKSGIVING WEEK. Thu Nov 26 and Fri Nov 27 are holidays. The natural Exam 4 close (Sun Nov 29) sits on the holiday weekend. The proposed window below opens Wed Nov 25 and closes Tue Dec 1 so it straddles the break instead of landing in it. This is the one date in the term that needs a deliberate decision."
  },
  {
   "wk": 13,
   "opens": "2026-11-30",
   "closes": "2026-12-06",
   "title": "How your kidneys control water and salt",
   "exam": null,
   "note": null
  },
  {
   "wk": 14,
   "opens": "2026-12-07",
   "closes": "2026-12-13",
   "title": "Blood pH, digestion, and how you use food for fuel",
   "exam": "Exam 5",
   "note": null
  },
  {
   "wk": 15,
   "opens": "2026-12-14",
   "closes": "2026-12-16",
   "title": "Immune defense, reproduction, and putting it all together",
   "exam": "Cumulative final",
   "note": "Three days only. This week carries immune and reproductive physiology plus the integration capstone, and the cumulative final closes it. If the term runs tight, this is the trim: immune and reproductive are the lowest-yield block in the map, and the integration capstone can move to Week 14 as the drawing task."
  }
 ]
};
