/* ============================================================
   BIO 004 Human Anatomy, Fall 2026
   schedule-alt-fall2026.js

   THE ALTERNATE SCHEDULE. NOT LIVE YET.

   Nothing on the site loads this file except the two preview
   pages built for it:
     bio004-course-calendar-alt.html   the term, week by week
     bio004-preread.html               the pre-read for one class day

   The live schedule (bio004-day-card.js, session-links.js,
   bio004-course-calendar.html) is untouched. When this version is
   approved, see CONNECTING IT at the bottom of this comment.

   ------------------------------------------------------------
   THE PATTERN, EVERY WEEK
   ------------------------------------------------------------
   Day 1 (Mon for Class 1, Tue for Classes 2 and 3)
     Start of lecture ... LECTURE TBL on the week's lecture topic
                          (iRAT, tRAT, appeals)
     End of class ....... LAB BRAIN DUMP on the lab done that day

   Day 2 (Wed for Class 1, Thu for Classes 2 and 3)
     Start of lab ....... LAB TBL on the week's labs: the day 1 lab
                          and the day 2 lab
     End of class ....... LECTURE BRAIN DUMP on the week's lecture
                          topic

   Students come to every class day having already started the
   material through the pre-read, including the first class day
   after an exam.

   Lab sessions and their dates are the department's and do not
   move. Lecture topics stay in the same order as the live
   schedule. What changes is which activity sits on which day.

   ------------------------------------------------------------
   CHANGES FROM THE LIVE SCHEDULE (decisions to confirm)
   ------------------------------------------------------------
   1. Starts Mon Oct 12 (Class 1) and Thu Oct 15 (Classes 2 and 3).
      Everything before that stays exactly as it is now, including
      TBL 4 on Thu Oct 8 for Classes 2 and 3.
   2. Lecture TBLs 6 to 11 renumber. Two TBLs are new:
        TBL 7 Endocrine, TBL 10 Reproductive Anatomy.
      Live numbering for comparison: 6 Resp, 7 GI, 8 Renal, 9 CN.
   3. The renal Kahoot (Nov 23 / Nov 24) becomes Lecture TBL 9.
   4. Lab TBLs are new. Class 1 runs Lab TBL 1 to 5. Classes 2 and 3
      run Lab TBL 1 to 6, because Thu Nov 12 meets and Wed Nov 11
      (Veterans Day) does not.
   6. Classes 2 and 3, Thu Nov 12: the live TBL 7 GI moves to Tue
      Nov 10 (Lecture TBL 8). Thursday becomes Lab TBL 4 plus the
      rest of the GI lecture on the accessory organs.
   5. Respiratory, renal and reproductive anatomy now meet their
      TBL before or alongside the guided lecture, not after it.
      That is the point of the pre-read.

   ------------------------------------------------------------
   CONNECTING IT (later, once approved)
   ------------------------------------------------------------
   The live calendar and Today page read their days from
   SESS_MW and SESS_TR inside bio004-day-card.js. BIO004_ALT.toDayCard()
   returns this schedule in exactly that row shape (d, lec, lm, tag,
   lab, pw), so the rows from START onward can replace the matching
   rows there. The day card will also need a new branch for a day
   that has a TBL AND a brain dump, which it does not draw today.
   ============================================================ */

window.BIO004_ALT = (function () {
  'use strict';

  var START = { mw: '2026-10-12', tr: '2026-10-15' };

  /* ---------- material, by topic ----------
     Every file name was checked against the repo. They are the
     same files session-links.js already points at, grouped by
     topic instead of by date. */
  var LECTURE = {
    heart: {
      name: 'The Heart and Cardiac Conduction',
      notes:  [['m3-heart-notes.html','The Heart'],['m3-conduction-notes.html','Cardiac Conduction']],
      sheets: [['m3-heart-worksheet.html','Heart pre-work sheet']],
      videos: [['heart-concept-videos.html','The Heart'],['cardiac-conduction-concept-videos.html','Cardiac Conduction']],
      slides: [['slides-heart-anatomy.html','Heart Anatomy slides']],
      guide:  [['heart-study-guide.html','Heart study guide'],['cardiac-electrophysiology-study-guide.html','Cardiac conduction study guide']]
    },
    muscle: {
      name: 'Muscle Microanatomy and the Sarcomere',
      notes:  [['m3-muscle-notes.html','Muscle Tissue'],['m3-fascicles-notes.html','Fascicle Arrangement']],
      sheets: [['m3-muscle-worksheet.html','Muscle pre-work sheet']],
      videos: [['muscle-tissue-concept-videos.html','Muscle Tissue and Microanatomy']],
      slides: [['slides-muscle-microanatomy.html','Muscle Microanatomy slides']],
      guide:  [['muscle-tissue-study-guide.html','Muscle tissue study guide']]
    },
    blood: {
      name: 'Blood',
      notes:  [['m3-blood-notes.html','Blood']],
      sheets: [['m3-vessels-blood-worksheet.html','Blood Vessels and Blood pre-work sheet']],
      videos: [['blood-concept-videos.html','Blood']],
      slides: [['slides-blood.html','Blood slides']],
      guide:  []
    },
    resp: {
      name: 'Respiratory Anatomy and Histology',
      notes:  [['m4-respiratory-notes.html','The Respiratory System']],
      sheets: [['m4-resp-worksheet.html','Respiratory and Lymphatic pre-work sheet']],
      /* Respiratory is Module 4 only. The old m3-respiratory pages now forward here. */
      videos: [['respiratory-concept-videos.html','The Respiratory System']],
      slides: [['slides-respiratory-anatomy.html','Respiratory Anatomy slides']],
      guide:  [['respiratory-study-guide.html','Respiratory study guide']]
    },
    endocrine: {
      name: 'The Endocrine System',
      notes:  [['m4-endocrine-notes.html','The Endocrine System']],
      sheets: [['m4-urinary-worksheet.html','Urinary and Endocrine pre-work sheet (endocrine parts)']],
      videos: [['endocrine-concept-videos.html','The Endocrine System']],
      slides: [['slides-endocrine.html','Endocrine slides']],
      guide:  []
    },
    gi: {
      name: 'The Digestive System',
      notes:  [['m4-alimentary-notes.html','The Alimentary Canal'],['m4-accessory-notes.html','Accessory Digestive Organs']],
      sheets: [['m4-digest-worksheet.html','Digestive System pre-work sheet']],
      videos: [['alimentary-concept-videos.html','The Alimentary Canal'],['accessory-digestive-concept-videos.html','Accessory Digestive Organs'],['gi-concept-videos.html','GI Overview']],
      slides: [['slides-gi-alimentary-canal.html','Alimentary Canal slides'],['slides-gi-accessory-structures.html','Accessory Structures slides']],
      guide:  [['gi-anatomy-study-guide.html','Digestive anatomy study guide']]
    },
    renal: {
      name: 'Renal Anatomy',
      notes:  [['m4-urinary-notes.html','The Urinary System']],
      sheets: [['m4-urinary-worksheet.html','Urinary and Endocrine pre-work sheet (urinary parts)']],
      videos: [['urinary-concept-videos.html','The Urinary System']],
      slides: [['slides-renal-anatomy.html','Renal Anatomy slides']],
      guide:  [['renal-anatomy-study-guide.html','Renal anatomy study guide']]
    },
    repro: {
      name: 'Reproductive Anatomy',
      notes:  [['m4-male-repro-notes.html','Male Reproductive System'],['m4-female-repro-notes.html','Female Reproductive System']],
      sheets: [['m4-repro-worksheet.html','Reproductive System pre-work sheet']],
      videos: [['reproductive-male-concept-videos.html','Male Reproductive System'],['reproductive-female-concept-videos.html','Female Reproductive System']],
      slides: [['slides-reproductive-systems.html','Reproductive Systems slides']],
      guide:  [['reproductive-anatomy-study-guide.html','Reproductive anatomy study guide']]
    },
    cranial: {
      name: 'The Brainstem and Cranial Nerves',
      notes:  [['m5-brainstem-notes.html','The Brainstem'],['m5-cranial-notes.html','Cranial Nerves']],
      sheets: [['m5-brain-worksheet.html','Brain and Brainstem pre-work sheet']],
      videos: [['cranial-nerves-concept-videos.html','Cranial Nerves']],
      slides: [['slides-cranial-nerves.html','Cranial Nerves slides']],
      guide:  [['cranial-nerves-study-guide.html','Cranial nerves study guide']]
    }
  };

  var MUSCLE_CHART = ['https://www.medmasterscollaborative.com/muscle-charts-i-o-a-inn','Muscle charts: origin, insertion, action, innervation'];

  var LAB = {
    faceChestBack: {
      name: 'Muscles of the Face, Chest and Back',
      list:    [['module-3-structure-list.html#h-back-thorax-lab','Module 3 list: Muscles of the Back and Thorax']],
      sprints: [['head-neck-muscles-lab-sprint.html','Head and Neck Muscles'],['chest-anterior-brachium-muscles-lab-sprint.html','Chest and Anterior Brachium Muscles'],['posterior-thorax-shoulder-muscles-lab-sprint.html','Posterior Thorax, Shoulder and Posterior Brachium']],
      notes:   [['m3-back-thorax-notes.html','Back and Thorax Muscles']],
      muscle:  true
    },
    upperArm: {
      name: 'Muscles and NAV of the Upper Arm; Anterior Forearm',
      list:    [['module-3-structure-list.html#h-upper-limb-lab','Module 3 list: Muscles of the Upper Extremity'],['module-3-structure-list.html#h-thorax-limb-arteries','Module 3 list: Arteries and Veins of the Upper Limb'],['module-3-structure-list.html#h-upper-limb-nerves','Module 3 list: Nerves of the Upper Limb']],
      sprints: [['chest-anterior-brachium-muscles-lab-sprint.html','Chest and Anterior Brachium Muscles'],['antebrachium-muscles-lab-sprint.html','Antebrachium (Forearm) Muscles']],
      notes:   [['m3-arm-muscles-notes.html','Arm Muscles']],
      muscle:  true
    },
    postForearm: {
      name: 'Muscles and NAV of the Posterior Forearm',
      list:    [['module-3-structure-list.html#h-upper-limb-lab','Module 3 list: Muscles of the Upper Extremity'],['module-3-structure-list.html#h-thorax-limb-arteries','Module 3 list: Arteries and Veins of the Upper Limb'],['module-3-structure-list.html#h-upper-limb-nerves','Module 3 list: Nerves of the Upper Limb']],
      sprints: [['antebrachium-muscles-lab-sprint.html','Antebrachium (Forearm) Muscles']],
      notes:   [['m3-arm-muscles-notes.html','Arm Muscles'],['m3-limb-vessels-notes.html','Upper Limb Vessels and Nerves']],
      sheets:  [['m3-limb-vessels-worksheet.html','Upper Limb Vessels and Nerves pre-work sheet']],
      muscle:  true
    },
    resp: {
      name: 'Thoracic Anatomy (Respiratory) and Respiratory Histology',
      list:    [['module-4-structure-list.html#h-respiratory-lab','Module 4 list: The Respiratory System']],
      sprints: [['respiratory-lab-sprint.html','Respiratory System']],
      notes:   [['m4-respiratory-notes.html','The Respiratory System']]
    },
    antThigh: {
      name: 'Anterior Thigh Muscles and NAV',
      list:    [['BIO004-Structure-List.html#h-unit-4','Lab structure list: Limb Muscles, Respiratory and Digestive']],
      sprints: [['thigh-muscles-lab-sprint.html','Thigh Muscles']],
      notes:   [],
      muscle:  true
    },
    postThigh: {
      name: 'Posterior Thigh Muscles and NAV',
      list:    [['BIO004-Structure-List.html#h-unit-4','Lab structure list: Limb Muscles, Respiratory and Digestive']],
      sprints: [['thigh-muscles-lab-sprint.html','Thigh Muscles']],
      notes:   [],
      muscle:  true
    },
    leg: {
      name: 'Anterior and Posterior Lower Leg Muscles',
      list:    [['BIO004-Structure-List.html#h-unit-4','Lab structure list: Limb Muscles, Respiratory and Digestive']],
      sprints: [['leg-muscles-lab-sprint.html','Leg Muscles']],
      notes:   [],
      muscle:  true
    },
    giAll: {
      name: 'GI Organs, Primary and Accessory',
      list:    [['module-4-structure-list.html#h-alimentary-lab','Module 4 list: The Alimentary Canal'],['module-4-structure-list.html#h-accessory-lab','Module 4 list: The Accessory Digestive Organs']],
      sprints: [['alimentary-canal-lab-sprint.html','Alimentary Canal'],['accessory-digestive-organs-lab-sprint.html','Accessory Digestive Organs'],['abdominal-wall-lab-sprint.html','Abdominal Wall and Peritoneal Cavity']],
      notes:   [['m4-alimentary-notes.html','The Alimentary Canal'],['m4-accessory-notes.html','Accessory Digestive Organs']]
    },
    giPrimary: {
      name: 'GI Organs (Primary)',
      list:    [['module-4-structure-list.html#h-alimentary-lab','Module 4 list: The Alimentary Canal']],
      sprints: [['alimentary-canal-lab-sprint.html','Alimentary Canal'],['abdominal-wall-lab-sprint.html','Abdominal Wall and Peritoneal Cavity']],
      notes:   [['m4-alimentary-notes.html','The Alimentary Canal']]
    },
    giAccessory: {
      name: 'GI Organs (Accessory)',
      list:    [['module-4-structure-list.html#h-accessory-lab','Module 4 list: The Accessory Digestive Organs']],
      sprints: [['accessory-digestive-organs-lab-sprint.html','Accessory Digestive Organs']],
      notes:   [['m4-accessory-notes.html','Accessory Digestive Organs']]
    },
    renal: {
      name: 'Renal Anatomy',
      list:    [['module-4-structure-list.html#h-urinary-lab','Module 4 list: The Urinary System']],
      sprints: [['urinary-system-lab-sprint.html','Urinary System']],
      notes:   [['m4-urinary-notes.html','The Urinary System']]
    },
    repro: {
      name: 'Male and Female Reproductive Anatomy',
      list:    [['module-4-structure-list.html#h-male-repro-lab','Module 4 list: The Male Reproductive System'],['module-4-structure-list.html#h-female-repro-lab','Module 4 list: The Female Reproductive System']],
      sprints: [['reproductive-male-lab-sprint.html','Male Reproductive System'],['reproductive-female-lab-sprint.html','Female Reproductive System']],
      notes:   [['m4-male-repro-notes.html','Male Reproductive System'],['m4-female-repro-notes.html','Female Reproductive System']]
    },
    brain: {
      name: 'CNS Brain, Meninges and CSF',
      list:    [['module-5-structure-list.html#h-brain-lab','Module 5 list: The Brain'],['module-5-structure-list.html#h-meninges-csf-lab','Module 5 list: Meninges, Ventricles and CSF']],
      sprints: [['cns-meninges-csf-lab-sprint.html','Meninges, Ventricles and CSF']],
      notes:   [['m5-brain-notes.html','The Brain'],['m5-meninges-notes.html','Meninges and CSF']]
    },
    brainstemCN: {
      name: 'Brainstem (CNS) and Cranial Nerves (PNS)',
      list:    [['module-5-structure-list.html#h-brainstem-cerebellum-lab','Module 5 list: The Brainstem and Cerebellum'],['module-5-structure-list.html#h-cranial-nerves-lab','Module 5 list: The Cranial Nerves']],
      sprints: [['cns-brainstem-lab-sprint.html','The Brainstem'],['cranial-nerves-lab-sprint.html','Cranial Nerves']],
      notes:   [['m5-brainstem-notes.html','The Brainstem'],['m5-cranial-notes.html','Cranial Nerves']]
    },
    cord: {
      name: 'CNS Spinal Cord and Spinal Nerves',
      list:    [['module-5-structure-list.html#h-spinal-cord-lab','Module 5 list: The Spinal Cord'],['module-5-structure-list.html#h-peripheral-nerves-lab','Module 5 list: Peripheral Nerves and Plexuses']],
      sprints: [['cns-spinal-cord-lab-sprint.html','Spinal Cord'],['nerve-plexuses-lab-sprint.html','Spinal Nerves and Plexuses']],
      notes:   [['m5-cord-notes.html','The Spinal Cord'],['m5-plexus-notes.html','Nerve Plexuses']]
    }
  };

  /* ---------- the days ----------
     kind     'd1' lecture TBL + lab brain dump
              'd2' lab TBL + lecture brain dump
              'exam', 'holiday'
     lec      what happens in lecture (the live schedule's wording
              where the lecture itself did not change)
     lecTopic lecture topic(s) the pre-read prepares
     labTopic lab topic(s) for today's lab
     tbl      { kind, n, topics } topics are LECTURE or LAB keys
     bd       { kind, topics }    end-of-class brain dump        */
  function D1(d, n, lecTopics, lec, labTopic, note){
    return { d:d, kind:'d1', lec:lec, lecTopic:lecTopics, labTopic:[labTopic],
      tbl:{ kind:'lecture', n:n, topics:lecTopics },
      bd:{ kind:'lab', topics:[labTopic] }, note:note||'' };
  }
  function D2(d, n, labTopics, todayLab, lec, lecTopics, bdTopics, note){
    return { d:d, kind:'d2', lec:lec, lecTopic:lecTopics, labTopic:[todayLab],
      tbl:{ kind:'lab', n:n, topics:labTopics },
      bd:{ kind:'lecture', topics:bdTopics }, note:note||'' };
  }
  function EX(d, n){ return { d:d, kind:'exam', exam:n, lec:'Exam ' + n, labTopic:[], lecTopic:[] }; }
  function OFF(d, name){ return { d:d, kind:'holiday', lec:name + ', No Class', labTopic:[], lecTopic:[] }; }

  var MW = [
    D1('2026-10-12', 4, ['heart','muscle'], 'Lecture TBL 4: Heart Anatomy, Cardiac Conduction and Muscle Microanatomy', 'faceChestBack'),
    D2('2026-10-14', 1, ['faceChestBack','upperArm'], 'upperArm', 'Blood Cell Interactive Lecture', ['blood'], ['heart','muscle']),
    D1('2026-10-19', 5, ['blood'], 'Lecture TBL 5: Blood', 'postForearm'),
    EX('2026-10-21', 3),
    D1('2026-10-26', 6, ['resp'], 'Lecture TBL 6: Respiratory Anatomy and Histology, then the Guided Walk-Through', 'resp',
       'First class after Exam 3. The TBL runs on the pre-read, so the respiratory reading is due before class.'),
    D2('2026-10-28', 2, ['resp','antThigh'], 'antThigh', 'Endocrine Guided Walk-Through Activity', ['endocrine'], ['resp']),
    D1('2026-11-02', 7, ['endocrine'], 'Lecture TBL 7: Endocrine System', 'postThigh'),
    D2('2026-11-04', 3, ['postThigh','leg'], 'leg', 'Guided DITKI GI Map Activity I and II', ['gi'], ['endocrine']),
    D1('2026-11-09', 8, ['gi'], 'Lecture TBL 8: GI System', 'giAll',
       'No Lab TBL or lecture brain dump this week. Wednesday is Veterans Day.'),
    OFF('2026-11-11', "Veteran's Day"),
    EX('2026-11-16', 4),
    D2('2026-11-18', 4, ['renal'], 'renal', 'Exam 4 Rebuttals; Guided Renal Map', ['renal'], ['renal'],
       'First class after Exam 4. The Lab TBL runs on the renal pre-read, before you have seen the kidney in lab.'),
    D1('2026-11-23', 9, ['renal'], 'Lecture TBL 9: Renal Anatomy', 'repro',
       'Replaces the renal Kahoot. No Wednesday class this week (Travel Day).'),
    OFF('2026-11-25', 'Travel Day'),
    D1('2026-11-30', 10, ['repro'], 'Lecture TBL 10: Reproductive Anatomy', 'brain'),
    D2('2026-12-02', 5, ['brain','brainstemCN'], 'brainstemCN', 'Clinical: Cranial Nerve Exam Stations', ['cranial'], ['repro']),
    D1('2026-12-07', 11, ['cranial'], 'Lecture TBL 11: Cranial Nerves', 'cord'),
    EX('2026-12-09', 5)
  ];

  var TR = [
    D2('2026-10-15', 1, ['faceChestBack','upperArm'], 'upperArm', 'Blood Cell Interactive Lecture', ['blood'], ['heart','muscle'],
       'First week of the new pattern. Tuesday Oct 13 is Professional Development, so the Lab TBL covers last Thursday\'s lab (face, chest and back) and today\'s.'),
    D1('2026-10-20', 5, ['blood'], 'Lecture TBL 5: Blood', 'postForearm'),
    EX('2026-10-22', 3),
    D1('2026-10-27', 6, ['resp'], 'Lecture TBL 6: Respiratory Anatomy and Histology, then the Guided Walk-Through', 'resp',
       'First class after Exam 3. The TBL runs on the pre-read, so the respiratory reading is due before class.'),
    D2('2026-10-29', 2, ['resp','antThigh'], 'antThigh', 'Endocrine Guided Walk-Through Activity', ['endocrine'], ['resp']),
    D1('2026-11-03', 7, ['endocrine'], 'Lecture TBL 7: Endocrine System', 'postThigh'),
    D2('2026-11-05', 3, ['postThigh','leg'], 'leg', 'Guided DITKI GI Map Activity I', ['gi'], ['endocrine']),
    D1('2026-11-10', 8, ['gi'], 'Lecture TBL 8: GI System, then Guided DITKI GI Map Activity II', 'giPrimary'),
    D2('2026-11-12', 4, ['giPrimary','giAccessory'], 'giAccessory', 'Guided GI Accessory Organs Activity', ['gi'], ['gi']),
    EX('2026-11-17', 4),
    D2('2026-11-19', 5, ['renal'], 'renal', 'Guided Renal Map', ['renal'], ['renal'],
       'First class after Exam 4. The Lab TBL runs on the renal pre-read, before you have seen the kidney in lab.'),
    D1('2026-11-24', 9, ['renal'], 'Lecture TBL 9: Renal Anatomy', 'repro',
       'Replaces the renal Kahoot. No Thursday class this week (Thanksgiving).'),
    OFF('2026-11-26', 'Thanksgiving'),
    D1('2026-12-01', 10, ['repro'], 'Lecture TBL 10: Reproductive Anatomy', 'brain'),
    D2('2026-12-03', 6, ['brain','brainstemCN'], 'brainstemCN', 'Clinical: Cranial Nerve Exam Stations', ['cranial'], ['repro']),
    D1('2026-12-08', 11, ['cranial'], 'Lecture TBL 11: Cranial Nerves', 'cord'),
    EX('2026-12-10', 5)
  ];

  /* Lab TBL numbers differ by section because Classes 2 and 3 get one
     more Lab TBL (Nov 12) while Class 1 loses that Wednesday to
     Veterans Day. Class 1 runs Lab TBL 1 to 5, Classes 2 and 3 run 1 to 6. */

  var SECTIONS = {
    mw: { label:'Mon / Wed, CRN 80650', d1:'Monday', d2:'Wednesday',
          lecT:'12:30 to 1:50 pm, VC 118', labT:'2:00 to 4:50 pm, VC 1137', sess:MW },
    tr: { label:'Tue / Thu', d1:'Tuesday', d2:'Thursday',
          lecT:null, labT:null, sess:TR }
  };
  var TIMES = {
    'tr-am':  { label:'Tue / Thu morning, CRN 80654', lecT:'9:30 to 10:45 am, VC 212', labT:'11:00 am to 1:50 pm, VC 1137' },
    'tr-eve': { label:'Tue / Thu evening, CRN 80655', lecT:'5:30 to 6:45 pm, VC 118',  labT:'7:00 to 9:50 pm, VC 1137' },
    'mw':     { label:'Mon / Wed, CRN 80650',         lecT:'12:30 to 1:50 pm, VC 118', labT:'2:00 to 4:50 pm, VC 1137' }
  };
  var ALIAS = { 'mw':'mw','class1':'mw','tr-am':'tr','tr-eve':'tr','class2':'tr','class3':'tr' };

  function labName(k){ return LAB[k] ? LAB[k].name : ''; }
  function lecName(k){ return LECTURE[k] ? LECTURE[k].name : ''; }
  function names(keys, fn){ return (keys||[]).map(fn).join(' and '); }

  /* the live day-card row shape, for connecting later */
  function toDayCard(sec){
    return (SECTIONS[ALIAS[sec]] || {sess:[]}).sess.map(function(s){
      if(s.kind === 'holiday') return { d:s.d, lec:s.lec, lm:'holiday', tag:'No class', lab:null, pw:null };
      if(s.kind === 'exam') return { d:s.d, lec:s.lec, lm:'exam', tag:'Exam ' + s.exam, lab:'Exam ' + s.exam,
        pw:{ t:'Study for Exam ' + s.exam, l:'' } };
      var tag = s.kind === 'd1' ? 'TBL ' + s.tbl.n : 'Lab TBL ' + s.tbl.n;
      return { d:s.d, lec:s.lec, lm:'tbl', tag:tag, lab:names(s.labTopic, labName),
        pw:{ t:'Pre-read for ' + (s.kind === 'd1' ? 'Lecture' : 'Lab') + ' TBL ' + s.tbl.n,
             l:'bio004-preread.html?day=' + s.d } };
    });
  }

  return {
    START: START, labName: labName, lecName: lecName, toDayCard: toDayCard, LECTURE: LECTURE, LAB: LAB, MUSCLE_CHART: MUSCLE_CHART, TIMES: TIMES,
    track: function(sec){ return ALIAS[sec] || null; },
    sessions: function(sec){ var t = SECTIONS[ALIAS[sec]]; return t ? t.sess.slice() : []; },
    days: function(sec){ var t = SECTIONS[ALIAS[sec]]; return t ? { d1:t.d1, d2:t.d2 } : null; },
    day: function(sec, iso){
      var s = this.sessions(sec);
      for(var i=0;i<s.length;i++){ if(s[i].d === iso) return s[i]; }
      return null;
    }
  };
})();
