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
    competencies:["w1-levels-function", "w1-structure-function", "w1-homeostasis", "w1-feedback-components", "w1-feedback-types", "w1-feedforward", "w1-control-pathways", "w1-mass-balance", "w1-fluid-compartments", "w1-compartment-shifts", "w1-units-conversion", "w1-lab-graphing", "w1-lab-experimental-design", "w1-lab-measurement-error", "w1-water-properties", "w1-ph-buffers", "w1-protein-function", "w1-enzyme-function", "w1-atp-energy", "w1-lab-enzyme-assay"] },

  { wk:2, module:1, opens:'2026-09-14', closes:'2026-09-20',
    title:'Getting across the membrane',
    competencies:["w2-membrane-structure", "w2-permeability", "w2-fick-diffusion", "w2-osmolarity-tonicity", "w2-osmosis-cell-volume", "w2-lab-diffusion-osmosis", "w2-lab-rbc-tonicity", "w2-facilitated-diffusion", "w2-primary-active-transport", "w2-secondary-active-transport", "w2-transport-maximum", "w2-vesicular-transport", "w2-transepithelial-transport", "w2-lab-transport-sim", "w2-electrochemical-gradient", "w2-nernst", "w2-resting-potential", "w2-ion-channels", "w2-potential-terms", "w2-lab-membrane-potential"] },

  { wk:3, module:1, opens:'2026-09-21', closes:'2026-09-27',
    title:'Pumps, potentials, and the language cells use',
    note:'Census is Sun Sep 27, the same day this week closes. Exam 1 feedback should be posted before census so students choosing to drop can decide on evidence.',
    exam:{ n:1, name:'Exam 1', covers:[1,2,3], opens:'2026-09-25', closes:'2026-09-27', status:'PLACEHOLDER' },
    competencies:["w3-signal-types", "w3-receptor-location", "w3-gpcr-pathway", "w3-second-messengers", "w3-catalytic-intracellular-receptors", "w3-signal-amplification", "w3-receptor-modulation", "w3-signal-termination", "w3-lab-dose-response"] },

  { wk:4, module:2, opens:'2026-09-28', closes:'2026-10-04',
    title:'The action potential',
    competencies:["w4-neuron-classes", "w4-neuron-regions", "w4-glia-functions", "w4-myelin", "w4-axonal-transport", "w4-graded-potentials", "w4-action-potential", "w4-threshold", "w4-intensity-coding", "w4-refractory", "w4-conduction-velocity", "w4-ion-disturbance", "w4-lab-ap-simulation", "w4-lab-nerve-conduction"] },

  { wk:5, module:2, opens:'2026-10-05', closes:'2026-10-11',
    title:'Synapses and the start of contraction',
    competencies:["w5-synaptic-sequence", "w5-neurotransmitters", "w5-neurotransmitter-removal", "w5-postsynaptic-potentials", "w5-summation-integration", "w5-presynaptic-modulation", "w5-synaptic-plasticity", "w5-electrical-synapses", "w5-lab-synapse-sim", "w5-reflex-arc", "w5-stretch-reflex", "w5-golgi-tendon", "w5-withdrawal-reflex", "w5-spinal-pathways", "w5-csf-bbb", "w5-lab-reflex-testing"] },

  { wk:6, module:2, opens:'2026-10-12', closes:'2026-10-18',
    title:'How muscle makes force',
    exam:{ n:2, name:'Exam 2', covers:[4,5,6], opens:'2026-10-16', closes:'2026-10-18', status:'PLACEHOLDER' },
    competencies:["w6-nmj", "w6-ec-coupling", "w6-crossbridge-cycle", "w6-calcium-regulation", "w6-relaxation", "w6-twitch", "w6-summation-tetanus", "w6-motor-units", "w6-length-tension", "w6-contraction-types", "w6-fiber-types", "w6-muscle-energetics", "w6-fatigue", "w6-muscle-adaptation", "w6-lab-emg-fatigue", "w6-lab-muscle-sim", "w6-smooth-muscle", "w6-smooth-regulation", "w6-cardiac-muscle", "w6-muscle-comparison"] },

  { wk:7, module:3, opens:'2026-10-19', closes:'2026-10-25',
    title:'Sensing the world',
    competencies:["w7-transduction", "w7-receptor-classes", "w7-stimulus-coding", "w7-receptive-fields", "w7-receptor-adaptation", "w7-somatosensory-pathways", "w7-pain-modulation", "w7-lab-tactile-mapping", "w7-vision-optics", "w7-phototransduction", "w7-visual-processing", "w7-vision-clinical", "w7-hearing-transduction", "w7-hearing-clinical", "w7-equilibrium", "w7-chemical-senses", "w7-lab-vision-tests", "w7-lab-hearing-tests"] },

  { wk:8, module:3, opens:'2026-10-26', closes:'2026-11-01',
    title:'Moving, and running the background',
    competencies:["w8-motor-hierarchy", "w8-corticospinal", "w8-cerebellum-basal-ganglia", "w8-umn-lmn", "w8-ans-organization", "w8-ans-divisions", "w8-ans-receptors", "w8-ans-tone", "w8-adrenal-medulla", "w8-ans-pharmacology", "w8-lab-autonomic-testing"] },

  { wk:9, module:3, opens:'2026-11-02', closes:'2026-11-08',
    title:'Hormones, the slow control system',
    note:'Exam 3 closes Nov 8. The last day to drop is Nov 21, so students have three graded exams in hand before that decision. Keep it that way.',
    exam:{ n:3, name:'Exam 3', covers:[7,8,9], opens:'2026-11-06', closes:'2026-11-08', status:'PLACEHOLDER' },
    competencies:["w9-hormone-classes", "w9-hormone-transport", "w9-hormone-receptors", "w9-hormone-interactions", "w9-hormone-release", "w9-hypothalamic-pituitary", "w9-endocrine-pathology", "w9-posterior-pituitary", "w9-growth-hormone", "w9-thyroid", "w9-adrenal-cortex", "w9-stress-response", "w9-calcium-homeostasis", "w9-islet-hormones", "w9-diabetes", "w9-lab-glucose-tolerance", "w9-lab-hormone-assay"] },

  { wk:10, module:4, opens:'2026-11-09', closes:'2026-11-15',
    title:'The heart as a pump',
    note:'Veterans Day falls Wed Nov 11 inside this week. Nothing graded should be due that day.',
    competencies:["w10-plasma", "w10-hematocrit", "w10-rbc-hemoglobin", "w10-erythropoiesis", "w10-rbc-destruction", "w10-leukocytes", "w10-hemostasis", "w10-coagulation", "w10-fibrinolysis", "w10-blood-types", "w10-lab-hematocrit", "w10-lab-blood-typing", "w10-pacemaker-potential", "w10-cardiac-ap", "w10-conduction-system", "w10-cardiac-refractory", "w10-ecg-basics", "w10-ecg-interpretation", "w10-lab-ecg"] },

  { wk:11, module:4, opens:'2026-11-16', closes:'2026-11-22',
    title:'Pressure, flow, and holding blood pressure steady',
    note:'Last day to drop is Sat Nov 21, inside this week.',
    competencies:["w11-cardiac-cycle", "w11-pv-loop", "w11-heart-sounds", "w11-stroke-volume", "w11-cardiac-output", "w11-frank-starling", "w11-preload-afterload", "w11-cardiac-regulation", "w11-lab-heart-sounds", "w11-flow-resistance", "w11-vessel-function", "w11-blood-pressure", "w11-local-blood-flow", "w11-capillary-exchange", "w11-edema", "w11-lymph-return", "w11-venous-return", "w11-lab-bp-measurement", "w11-baroreflex", "w11-cv-hormonal", "w11-exercise-cv", "w11-shock-compensation"] },

  { wk:12, module:4, opens:'2026-11-23', closes:'2026-11-29',
    title:'Breathing and gas transport',
    note:'THANKSGIVING WEEK. Thu Nov 26 and Fri Nov 27 are holidays. The natural Exam 4 close (Sun Nov 29) sits on the holiday weekend. The proposed window below opens Wed Nov 25 and closes Tue Dec 1 so it straddles the break instead of landing in it. This is the one date in the term that needs a deliberate decision.',
    exam:{ n:4, name:'Exam 4', covers:[10,11,12], opens:'2026-11-25', closes:'2026-12-01', status:'PLACEHOLDER, spans the break on purpose' },
    competencies:["w12-respiratory-functions", "w12-ventilation-mechanics", "w12-intrapleural-pressure", "w12-compliance", "w12-surfactant", "w12-airway-resistance", "w12-lung-volumes", "w12-spirometry-patterns", "w12-dead-space", "w12-lab-spirometry", "w12-partial-pressures", "w12-gas-diffusion", "w12-va-q-matching", "w12-oxygen-transport", "w12-hb-curve-shifts", "w12-co2-transport", "w12-bohr-haldane", "w12-oxygen-content", "w12-respiratory-centers", "w12-chemoreceptors", "w12-ventilation-adaptation", "w12-lab-ventilation-response"] },

  { wk:13, module:5, opens:'2026-11-30', closes:'2026-12-06',
    title:'The kidney and body fluid balance',
    competencies:["w13-kidney-functions", "w13-nephron-function", "w13-renal-processes", "w13-filtration-membrane", "w13-gfr-forces", "w13-gfr-regulation", "w13-renal-clearance", "w13-clearance-inference", "w13-proximal-reabsorption", "w13-renal-threshold", "w13-tubular-secretion", "w13-countercurrent", "w13-adh-water-balance", "w13-raas", "w13-natriuretic-peptides", "w13-potassium-handling", "w13-micturition", "w13-lab-urinalysis", "w13-lab-renal-calculation", "w13-buffer-systems", "w13-respiratory-ph-control", "w13-renal-ph-control", "w13-acid-base-disorders", "w13-acid-base-compensation", "w13-lab-abg-interpretation", "w13-volume-osmolarity"] },

  { wk:14, module:5, opens:'2026-12-07', closes:'2026-12-13',
    title:'Acid-base, digestion, and fuel',
    exam:{ n:5, name:'Exam 5', covers:[13,14], opens:'2026-12-11', closes:'2026-12-13', status:'PLACEHOLDER' },
    competencies:["w14-digestive-processes", "w14-gi-motility", "w14-gi-regulation", "w14-digestive-phases", "w14-gastric-secretion", "w14-pancreatic-bile-secretion", "w14-carb-protein-absorption", "w14-lipid-absorption", "w14-liver-function", "w14-large-intestine", "w14-lab-digestion-enzymes", "w14-atp-pathways", "w14-absorptive-state", "w14-postabsorptive-state", "w14-glucose-regulation", "w14-metabolic-rate", "w14-thermoregulation", "w14-lab-metabolic-rate"] },

  { wk:15, module:5, opens:'2026-12-14', closes:'2026-12-16', short:true,
    title:'Defense, reproduction, and putting it together',
    note:'Three days only. This week carries immune and reproductive physiology plus the integration capstone, and the cumulative final closes it. If the term runs tight, this is the trim: immune and reproductive are the lowest-yield block in the map, and the integration capstone can move to Week 14 as the drawing task.',
    exam:{ n:6, name:'Cumulative final', covers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], opens:'2026-12-14', closes:'2026-12-16', status:'PLACEHOLDER' },
    competencies:["w15-innate-immunity", "w15-inflammation", "w15-adaptive-immunity", "w15-antibodies", "w15-immune-memory", "w15-immune-dysfunction", "w15-hpg-axis", "w15-male-reproductive", "w15-ovarian-cycle", "w15-uterine-cycle", "w15-pregnancy-hormones", "w15-parturition-lactation", "w15-lab-cycle-graphs", "w15-integration-case", "w15-exercise-integration", "w15-drawing-synthesis"] }
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
