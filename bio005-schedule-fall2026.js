/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   Section BIOL-5-D9286, Sutter Internet (NET)
   FULLY ASYNCHRONOUS ONLINE, lecture and lab.

   Schedule scaffold. Built AFTER the competency map, so every week
   here exists to carry a specific set of competencies rather than a
   chapter number. Read bio005-competencies.js first.

   ------------------------------------------------------------
   WHAT IS CONFIRMED AND WHAT IS A PLACEHOLDER
   ------------------------------------------------------------
   CONFIRMED, from the section listing:
     Term runs 9/8/2026 to 12/16/2026
     Lecture asynchronous online, lab asynchronous online
     Census 9/27/2026
     Last day to drop 11/21/2026
     Capacity 30, waitlist 10

   PLACEHOLDER, needs Scrubs to confirm:
     Exam windows (opens and closes below are proposed, not set)
     Weekly open and close times of day
     Whether proctoring is required for exams
     Whether the lab is a virtual lab product, a home-lab kit, or
       instructor-built simulations
     Grading weights
     Textbook and courseware
     Yuba holiday observances for Fall 2026 (Veterans Day and
       Thanksgiving are assumed below from the standard calendar)

   ------------------------------------------------------------
   ASYNCHRONOUS DESIGN RULES BAKED INTO THIS SCHEDULE
   ------------------------------------------------------------
   1. A week is a container with an open and a close, not a meeting.
      Every week opens Monday 12:00 am and closes Sunday 11:59 pm,
      except Week 1 (opens Tue Sep 8) and Week 15 (closes Wed Dec 16).
   2. Every week has the same four beats so students never have to
      relearn the container: Prime, Build, Practice, Prove.
   3. Nothing requires the instructor to be present at a moment.
   4. Checkpoints replace attendance. Each week has one low-stakes
      graded checkpoint that closes on time.
   5. Exams are windows. An exam that opens Friday and closes Monday
      night works for students on night shift, which is most of a
      physiology cohort headed for nursing.
   ============================================================ */

window.BIO005_TERM = {
  course:   'BIO 005 Human Physiology',
  section:  'BIOL-5-D9286',
  college:  'Yuba College',
  campus:   'Sutter Internet (NET)',
  term:     'Fall 2026',
  delivery: 'Asynchronous online, lecture and lab',
  start:    '2026-09-08',
  end:      '2026-12-16',
  census:   '2026-09-27',
  lastDrop: '2026-11-21',
  weeklyOpen:  'Monday 12:00 am',
  weeklyClose: 'Sunday 11:59 pm',
  instructor:  'Dr. Sharilyn Rennie',

  /* Assumed from the standard California community college calendar.
     CONFIRM against the Yuba 2026-2027 academic calendar. In an
     asynchronous course these do not cancel a class meeting, but
     nothing graded should be due on them. */
  observances: [
    { date:'2026-11-11', day:'Wed', name:'Veterans Day',  status:'assumed' },
    { date:'2026-11-26', day:'Thu', name:'Thanksgiving',  status:'assumed' },
    { date:'2026-11-27', day:'Fri', name:'Day after Thanksgiving', status:'assumed' }
  ]
};

/* ============================================================
   THE WEEKLY CONTAINER
   Same four beats every week. Students learn the container once.
   ============================================================ */

window.BIO005_WEEK_SHAPE = [
  { beat:'Prime',
    when:'Open Monday',
    what:'A short orientation page and a prediction task. Students commit to an answer before instruction, which is what makes the correction stick.',
    graded:'ungraded, but completion-tracked' },
  { beat:'Build',
    when:'Monday to Wednesday',
    what:'Recorded lecture segments broken at competency boundaries, each under 12 minutes, with a guided notes page that has blanks the video fills.',
    graded:'ungraded' },
  { beat:'Practice',
    when:'Wednesday to Saturday',
    what:'The virtual lab task plus the drawing-based synthesis for the week. Students produce the mechanism from memory, then check it against the key.',
    graded:'lab submission plus drawing check' },
  { beat:'Prove',
    when:'Closes Sunday 11:59 pm',
    what:'Weekly checkpoint quiz drawn from that week competency IDs, plus spaced-recall items pulled from earlier weeks.',
    graded:'weekly checkpoint' }
];

/* ============================================================
   WEEK BY WEEK
   competencies: the exact ids from bio005-competencies.js that this
   week is responsible for. This is the link that lets the schedule
   page, the exam blueprint, and the gap finder stay in sync.
   ============================================================ */

window.BIO005_WEEKS = [

  { wk:1, module:1, opens:'2026-09-08', closes:'2026-09-13', short:true,
    title:'How physiology works and what keeps you steady',
    note:'Short week, term opens on a Tuesday. Front-load orientation, not content.',
    extras:['Start Here module','Syllabus quiz','Introduction post','Tech check and Canvas tour'],
    competencies:['m1-physiology-scope','m1-levels-function','m1-homeostasis','m1-feedback-negative','m1-feedback-positive','m1-fluid-compartments','m1-ion-distribution','m1-ph-buffers'] },

  { wk:2, module:1, opens:'2026-09-14', closes:'2026-09-20',
    title:'Getting across the membrane',
    competencies:['m1-protein-shape-function','m1-enzyme-kinetics','m1-membrane-structure','m1-diffusion','m1-osmosis-tonicity','m1-facilitated-diffusion'] },

  { wk:3, module:1, opens:'2026-09-21', closes:'2026-09-27',
    title:'Pumps, potentials, and the language cells use',
    note:'Census is Sun Sep 27, the same day this week closes. Exam 1 feedback should be posted before census so students choosing to drop can decide on evidence.',
    exam:{ n:1, name:'Exam 1', covers:[1,2,3], opens:'2026-09-25', closes:'2026-09-27', status:'PLACEHOLDER' },
    competencies:['m1-active-transport','m1-sodium-potassium-pump','m1-vesicular-transport','m1-epithelial-transport','m1-resting-membrane-potential','m1-nernst-ghk','m1-driving-force','m1-signaling-overview','m1-receptor-types','m1-second-messengers','m1-dose-response','m1-receptor-regulation'] },

  { wk:4, module:2, opens:'2026-09-28', closes:'2026-10-04',
    title:'The action potential',
    competencies:['m2-neuron-function','m2-glia-function','m2-graded-potentials','m2-action-potential','m2-sodium-gates','m2-conduction-velocity','m2-demyelination'] },

  { wk:5, module:2, opens:'2026-10-05', closes:'2026-10-11',
    title:'Synapses and the start of contraction',
    competencies:['m2-synaptic-transmission','m2-epsp-ipsp','m2-neurotransmitters','m2-synapse-pharmacology','m2-neural-plasticity','m2-skeletal-ec-coupling','m2-nmj'] },

  { wk:6, module:2, opens:'2026-10-12', closes:'2026-10-18',
    title:'How muscle makes force',
    exam:{ n:2, name:'Exam 2', covers:[4,5,6], opens:'2026-10-16', closes:'2026-10-18', status:'PLACEHOLDER' },
    competencies:['m2-crossbridge-cycle','m2-sliding-filament','m2-length-tension','m2-motor-units','m2-twitch-tetanus','m2-muscle-metabolism','m2-fiber-types','m2-smooth-muscle','m2-smooth-muscle-tone','m2-cardiac-muscle'] },

  { wk:7, module:3, opens:'2026-10-19', closes:'2026-10-25',
    title:'Sensing the world',
    competencies:['m3-sensory-transduction','m3-receptor-adaptation','m3-somatosensory','m3-pain','m3-vision','m3-vision-optics','m3-hearing','m3-equilibrium','m3-chemical-senses'] },

  { wk:8, module:3, opens:'2026-10-26', closes:'2026-11-01',
    title:'Moving, and running the background',
    competencies:['m3-reflex-arc','m3-muscle-spindle-gto','m3-motor-hierarchy','m3-upper-lower-motor','m3-cortex-eeg-sleep','m3-memory-language','m3-ans-organization','m3-ans-receptors','m3-ans-effects','m3-adrenal-medulla'] },

  { wk:9, module:3, opens:'2026-11-02', closes:'2026-11-08',
    title:'Hormones, the slow control system',
    note:'Exam 3 closes Nov 8. The last day to drop is Nov 21, so students have three graded exams in hand before that decision. Keep it that way.',
    exam:{ n:3, name:'Exam 3', covers:[7,8,9], opens:'2026-11-06', closes:'2026-11-08', status:'PLACEHOLDER' },
    competencies:['m3-hormone-classes','m3-hormone-regulation','m3-hypothalamic-pituitary','m3-growth-hormone','m3-thyroid','m3-adrenal-cortex','m3-stress-response','m3-pancreatic-hormones','m3-diabetes','m3-calcium-homeostasis'] },

  { wk:10, module:4, opens:'2026-11-09', closes:'2026-11-15',
    title:'The heart as a pump',
    note:'Veterans Day falls Wed Nov 11 inside this week. Nothing graded should be due that day.',
    competencies:['m4-cardiac-ap','m4-pacemaker','m4-conduction-timing','m4-ecg','m4-cardiac-cycle','m4-pressure-volume-loop','m4-cardiac-output','m4-frank-starling'] },

  { wk:11, module:4, opens:'2026-11-16', closes:'2026-11-22',
    title:'Pressure, flow, and holding blood pressure steady',
    note:'Last day to drop is Sat Nov 21, inside this week.',
    competencies:['m4-hemodynamics','m4-vessel-function','m4-blood-pressure','m4-capillary-exchange','m4-lymphatic-function','m4-local-flow-control','m4-baroreceptor','m4-raas-adh-bp','m4-shock','m4-hemostasis','m4-erythropoiesis-control'] },

  { wk:12, module:4, opens:'2026-11-23', closes:'2026-11-29',
    title:'Breathing and gas transport',
    note:'THANKSGIVING WEEK. Thu Nov 26 and Fri Nov 27 are holidays. The natural Exam 4 close (Sun Nov 29) sits on the holiday weekend. The proposed window below opens Wed Nov 25 and closes Tue Dec 1 so it straddles the break instead of landing in it. This is the one date in the term that needs a deliberate decision.',
    exam:{ n:4, name:'Exam 4', covers:[10,11,12], opens:'2026-11-25', closes:'2026-12-01', status:'PLACEHOLDER, spans the break on purpose' },
    competencies:['m4-ventilation-mechanics','m4-compliance-surfactant','m4-airway-resistance','m4-lung-volumes','m4-gas-exchange','m4-vq-matching','m4-oxygen-transport','m4-co2-transport','m4-ventilation-control','m4-respiratory-adjustments'] },

  { wk:13, module:5, opens:'2026-11-30', closes:'2026-12-06',
    title:'The kidney and body fluid balance',
    competencies:['m5-renal-functions','m5-nephron-processes','m5-gfr','m5-gfr-regulation','m5-clearance','m5-tubular-transport','m5-countercurrent','m5-urine-concentration','m5-sodium-water-balance','m5-potassium-balance','m5-micturition'] },

  { wk:14, module:5, opens:'2026-12-07', closes:'2026-12-13',
    title:'Acid-base, digestion, and fuel',
    exam:{ n:5, name:'Exam 5', covers:[13,14], opens:'2026-12-11', closes:'2026-12-13', status:'PLACEHOLDER' },
    competencies:['m5-acid-base-principles','m5-abg-interpretation','m5-renal-acid-handling','m5-gi-motility','m5-gi-regulation','m5-gastric-secretion','m5-digestion-absorption','m5-liver-bile','m5-metabolic-states','m5-energy-balance','m5-thermoregulation'] },

  { wk:15, module:5, opens:'2026-12-14', closes:'2026-12-16', short:true,
    title:'Defense, reproduction, and putting it together',
    note:'Three days only. This week carries immune and reproductive physiology plus the integration capstone, and the cumulative final closes it. If the term runs tight, this is the trim: immune and reproductive are the lowest-yield block in the map, and the integration capstone can move to Week 14 as the drawing task.',
    exam:{ n:6, name:'Cumulative final', covers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], opens:'2026-12-14', closes:'2026-12-16', status:'PLACEHOLDER' },
    competencies:['m5-innate-immunity','m5-adaptive-immunity','m5-immune-dysfunction','m5-male-reproductive','m5-female-cycle','m5-pregnancy-lactation','m5-integration-case'] }
];

/* ============================================================
   GRADING SKELETON
   All weights are PLACEHOLDERS. The categories are chosen to work
   without the instructor present, which is the async constraint.
   ============================================================ */

window.BIO005_GRADING = {
  status: 'PLACEHOLDER, weights not set',
  categories: [
    { key:'checkpoints', name:'Weekly checkpoints',        weight:null, n:15,
      note:'One per week, low stakes, closes Sunday. This is what replaces attendance.' },
    { key:'lab',         name:'Virtual lab submissions',   weight:null, n:15,
      note:'Lab is asynchronous online. The delivery method is still undecided.' },
    { key:'drawing',     name:'Drawing-based synthesis',   weight:null, n:null,
      note:'Student produces the mechanism from memory, then checks against the key. This is the integrity mechanism in a course with no proctor in the room.' },
    { key:'exams',       name:'Unit exams 1 to 5',         weight:null, n:5,
      note:'Windowed, not timed to a clock hour.' },
    { key:'final',       name:'Cumulative final',          weight:null, n:1 },
    { key:'recall',      name:'Spaced recall participation', weight:null, n:null,
      note:'Optional category. Include only if the recall tool is wired in by week 1.' }
  ]
};

/* ============================================================
   OPEN DECISIONS THAT CHANGE THE SCHEDULE
   These are the ones that would force a rebuild if answered late.
   ============================================================ */

window.BIO005_OPEN_DECISIONS = [
  { id:'exam-proctoring',
    q:'Are exams proctored, and if so by what (Respondus, Proctorio, a testing center)?',
    affects:'Exam windows. A proctored exam cannot be a four-day window.' },
  { id:'lab-delivery',
    q:'Is the lab a purchased virtual lab, a home kit, or simulations you build?',
    affects:'Every week Practice beat, and the lab facet on 12 competencies.' },
  { id:'exam-4-thanksgiving',
    q:'Exam 4 window across Thanksgiving: open Wed Nov 25 and close Tue Dec 1, or pull the whole thing forward a week?',
    affects:'Weeks 11 through 13.' },
  { id:'week-15-trim',
    q:'Week 15 is three days and carries immune, reproductive, and the capstone. Keep, or trim immune and reproductive to a survey?',
    affects:'7 competencies and the final exam blueprint.' },
  { id:'grading-weights',
    q:'Category weights.',
    affects:'Syllabus, grade calculator, Canvas gradebook setup.' },
  { id:'textbook',
    q:'Textbook and any courseware (OpenStax A&P 2e, Silverthorne, other).',
    affects:'Reading assignments on every week page.' },
  { id:'yuba-calendar',
    q:'Confirm Yuba Fall 2026 observed holidays.',
    affects:'Weeks 10 and 12.' }
];
