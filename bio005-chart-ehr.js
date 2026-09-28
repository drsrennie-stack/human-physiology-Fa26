/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-chart-ehr.js

   THE STRUCTURED HALF OF THE CHART.

   bio005-patient-chart.js holds the case: the story, the released
   results, the five questions and the five entry point prompts. It
   is not touched by this file and it does not know this file exists.

   This file holds the things a hospital chart keeps in a grid rather
   than in a paragraph: vital signs filed against a time, intake and
   output, the medication administration record, the active orders,
   and the banner that sits across the top of every screen. Together
   the two files let patient-chart-ehr.html lay the case out the way
   an electronic record lays a patient out, with the same data the
   paper chart carries.

   WHY IT IS A SEPARATE FILE, Sep 22 2026.
     1. Weeks 1 and 2 of the case file are posted and students are
        working in them. Nothing in this rebuild edits that file.
     2. assignment-apply.html, patient-sheet.html and
        patient-chart-book.html keep reading the case file exactly as
        they did. A page that does not need the grid does not load it.
     3. The grid is the part a student types into, so it is the part
        that gets checked against a source. Keeping the source in its
        own file makes the checking obvious rather than clever.

   HOW THE STUDENT USES IT. They do not read values off this file.
   They read them out of the week's note and results, the way a nurse
   reads them off a monitor and a lab report, and they type them into
   an empty flowsheet. The app then compares what they typed with what
   is here and tells them where it differs. The transcription is the
   work; the check is what paper could never do.

   NOT AN IMITATION OF ANY VENDOR. The layout follows conventions
   every inpatient record shares, a banner, activity tabs, a time
   ordered flowsheet, a medication record and a navigator down the
   side. It carries no vendor's branding, colors or wording, and it
   uses the PRIMARY palette like everything else in this course.

   ACCURACY, AND WHICH VALUES ARE NEW. Two kinds of number live here.

   The first kind came straight out of bio005-patient-chart.js. Those
   are checked back against it by script on every build, so the two
   files cannot drift apart. 206 values are in this category.

   The second kind is new, because a flowsheet has more rows than a
   paragraph does. A narrative says she arrived at 06:40 and was
   herself by 14:00; a flowsheet needs a heart rate at 10:00 as well.
   Interval vital signs, the fluid volumes, the weights between two
   stated weights, and the millilitre conversions of quantities the
   case gives in litres are all written here and appear nowhere in
   the case file. They are constrained rather than invented, and
   tools/check_ehr_chart.js is what constrains them. It fails if a
   mean arterial pressure does not follow from its own blood
   pressure, or if an intake and output column does not add up. It
   also lists every interval value that runs past what the story
   states that week, with the range, so a human can confirm the
   direction of travel. At the last run: 37 pressures and 37 fluid
   sums correct, 302 values straight from the case file, 104 written
   for the flowsheet, and 6 that legitimately run past the story
   because the patient is recovering.

   The derived values, mean arterial pressures, resistances and
   fluid balances, are worked out in instructor/patient-chart-key.md.

   ROW KEYS. The app owns the row labels and the grouping; a week
   supplies a sparse object per time column and any key it leaves out
   renders as an empty cell, which is what a real flowsheet looks
   like. Keys in use:

     hr bp map rr temp spo2 o2 wt gcs pupils dtr uo
     cvp co sv svr scvo2 ef
     vt rateSet peep fio2 pplat
     k cr glu lac hgb ph paco2 pao2 hco3

   ============================================================ */

window.BIO005_EHR = {

  /* The banner. What sits across the top of every screen, and what a
     clinician checks before touching anything. Location changes week
     to week and is carried on the week instead. */
  banner: {
    A: {
      mrn:'MR-004182', sex:'Female', dob:'March 4, 2007 (19 years)',
      allergies:'No known drug allergies',
      code:'Full code',
      isolation:'None',
      attending:'Dr. A. Okonjo, internal medicine',
      note:'Weight is a vital sign in this patient. It is charted at every encounter and it is the number the case turns on twice.'
    },
    B: {
      mrn:'MR-119640', sex:'Male', dob:'January 22, 1958 (68 years)',
      allergies:'No known drug allergies',
      code:'Full code, reviewed with his daughter on admission',
      isolation:'Droplet precautions from Day 1 until the organism was identified',
      attending:'Dr. A. Okonjo, internal medicine, with critical care',
      note:'Four chronic problems arrive with him. Read the home medication list before you read anything else; three of his numbers make no sense without it.'
    }
  },

  /* Group order and labels for the flowsheet. The app renders groups
     in this order and rows within a group in this order. */
  groups: [
    { id:'vs',    name:'Vital signs', rows:[
      ['hr','Heart rate','beats/min','50 to 100'],
      ['bp','Blood pressure','mmHg','90/60 to 120/80'],
      ['map','Mean arterial pressure','mmHg','70 to 100'],
      ['rr','Respiratory rate','breaths/min','12 to 20'],
      ['temp','Temperature','&deg;C (&deg;F)','36.5 to 37.5 (97.7 to 99.5)'],
      ['spo2','Oxygen saturation','%','95 to 100'],
      ['o2','Oxygen delivered','','room air'],
      ['wt','Weight','kg (lb)','compare with the baseline column']
    ]},
    { id:'neuro', name:'Neurological', rows:[
      ['gcs','Glasgow Coma Scale','out of 15','15'],
      ['pupils','Pupils','mm and reaction','2 to 5 mm, brisk and equal'],
      ['dtr','Deep tendon reflexes','grade','2+ and symmetric']
    ]},
    { id:'hemo',  name:'Hemodynamics', rows:[
      ['cvp','Central venous pressure','mmHg','2 to 8'],
      ['co','Cardiac output','L/min','4 to 8'],
      ['sv','Stroke volume','mL','60 to 100'],
      ['svr','Systemic vascular resistance','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200'],
      ['scvo2','Central venous O<sub>2</sub> saturation','%','70 to 80'],
      ['ef','Ejection fraction','%','55 to 70']
    ]},
    { id:'resp',  name:'Respiratory support', rows:[
      ['vt','Tidal volume','mL','6 mL per kg predicted body weight'],
      ['rateSet','Set rate','breaths/min','set by the team'],
      ['peep','PEEP','cmH<sub>2</sub>O','set by the team'],
      ['fio2','Inspired oxygen fraction','','0.21 on room air'],
      ['pplat','Plateau pressure','cmH<sub>2</sub>O','under 30']
    ]},
    { id:'poc',   name:'Point of care and bedside', rows:[
      ['k','Potassium','mEq/L','3.5 to 5.0'],
      ['glu','Glucose','mg/dL','70 to 99'],
      ['cr','Creatinine','mg/dL','see the patient baseline'],
      ['lac','Lactate','mmol/L','0.5 to 2.0'],
      ['hgb','Hemoglobin','g/dL','see the patient baseline'],
      ['uo','Urine output','mL/h','over 0.5 mL per kg per hour']
    ]},
    { id:'gas',   name:'Arterial blood gas', rows:[
      ['ph','pH','','7.35 to 7.45'],
      ['paco2','PaCO<sub>2</sub>','mmHg','35 to 45'],
      ['pao2','PaO<sub>2</sub>','mmHg','80 to 100'],
      ['hco3','Bicarbonate','mEq/L','22 to 26']
    ]}
  ],

  /* Intake and output rows, in the order a shift totals them. */
  ioRows: [
    ['oral','Oral or enteral','mL'],
    ['iv','Intravenous','mL'],
    ['totalIn','Total in','mL'],
    ['urine','Urine','mL'],
    ['other','Other measured','mL'],
    ['totalOut','Total out','mL'],
    ['net','Net for the period','mL'],
    ['cum','Running total since admission','mL']
  ],

  weeks: {

  /* ---------------------------------------------------------- 1 */
  1: {
    prefiled:true,   /* already charted on paper in Week 1; the app files it and says so */
    location:'Student health, sports medicine clinic',
    encounterType:'Outpatient, preseason screening',
    /* Weeks 1 and 2 of the case file predate the results panels, and that
       file is not edited. The panels live here instead so the Results tab
       is not empty for the two weeks students have already done. */
    panels:[
      { name:'Basic metabolic panel', when:'August 12, 09:30', rows:[
        ['Sodium','139','mEq/L','135 to 145',''],
        ['Potassium','4.2','mEq/L','3.5 to 5.0',''],
        ['Chloride','103','mEq/L','98 to 107',''],
        ['Bicarbonate','25','mEq/L','22 to 29',''],
        ['Glucose','88','mg/dL','70 to 99',''],
        ['Creatinine','0.8','mg/dL','0.5 to 1.0','']
      ]},
      { name:'Complete blood count', when:'August 12, 09:30', rows:[
        ['Hemoglobin','13.4','g/dL','12.0 to 15.5',''],
        ['Hematocrit','40','%','36 to 46','']
      ]},
      { name:'Screening studies', when:'August 12', rows:[
        ['DEXA body fat','22','%','16 to 30 in a female athlete',''],
        ['DEXA lean soft tissue','45.1','kg','no fixed range',''],
        ['FVC','4.1','L','102% of predicted',''],
        ['FEV<sub>1</sub>','3.5','L','104% of predicted',''],
        ['FEV<sub>1</sub> to FVC ratio','0.85','','over 0.75',''],
        ['VO<sub>2</sub> max','52','mL/kg/min','high for her age and sex',''],
        ['Maximum heart rate','196','beats/min','age predicted about 201','']
      ]}
    ],
    flow:[
      { t:'Aug 12, 09:10', hr:'52', bp:'108/64', map:'79', rr:'12', temp:'36.8 (98.2)', spo2:'99', o2:'Room air', wt:'61 (134)', gcs:'15' },
      { t:'Aug 12, 09:14 standing', hr:'64', bp:'104/66', map:'79' }
    ],
    io:null,
    mar:[],
    orders:[
      ['Preparticipation physical evaluation','Screening','Aug 12','Completed'],
      ['12 lead ECG, screening','Cardiology reading','Aug 12','Resulted, normal'],
      ['DEXA body composition','Sports medicine','Aug 12','Resulted'],
      ['Spirometry','Sports medicine','Aug 12','Resulted']
    ],
    coach:{
      predict:"Before you open anything: she is a nineteen year old athlete at a preseason physical and nothing is wrong with her. What do you expect her resting heart rate to be, and why?",
      read:"Read this one slowly even though nothing is wrong. It is the only entry all term where every number is normal, and every column you fill in for the next seven weeks gets compared back to this one.",
      lesson:["time", "Her standing blood pressure was taken one minute after the supine one. Why would a chart insist on recording that minute?"],
      vitals:"A resting heart rate of 52 in an athlete is not the same finding as a resting heart rate of 52 in someone who has never trained. File it, and notice the chart cannot yet tell you which one you are looking at.",
      io:"Nothing was measured in or out today. What would have to be true of a visit for intake and output to be worth charting at all?",
      results:"This panel is normal. That is not the same as proving she is well. What would a panel have to show before you would call someone healthy?",
      problems:"A problem list can be empty. If you cannot name a problem from this chart, write none, and say what you would need to see before you opened one.",
      mar:"She is on no medications. Why is an empty medication record still worth printing on a chart?",
      note:"Your assessment today is a baseline statement. Say what she can do, not what is wrong, because nothing is."
    }
  },

  /* ---------------------------------------------------------- 2 */
  2: {
    prefiled:true,   /* already charted on paper in Week 2; the app files it and says so */
    location:'Athletic training room, then emergency department',
    encounterType:'Emergency, admitted',
    panels:[
      { name:'Basic metabolic panel', when:'September 18, 17:40', rows:[
        ['Sodium','124','mEq/L','135 to 145','LL'],
        ['Potassium','4.0','mEq/L','3.5 to 5.0',''],
        ['Chloride','89','mEq/L','98 to 107','L'],
        ['Bicarbonate','23','mEq/L','22 to 29',''],
        ['Glucose','90','mg/dL','70 to 99',''],
        ['Blood urea nitrogen','9','mg/dL','7 to 20',''],
        ['Creatinine','0.7','mg/dL','0.5 to 1.0','']
      ]},
      { name:'Osmolality', when:'September 18, 17:40', rows:[
        ['Serum osmolality (measured)','256','mOsm/kg','275 to 295','L'],
        ['Urine osmolality','380','mOsm/kg','read against the serum',''],
        ['Urine sodium','52','mEq/L','read against the clinical state','']
      ]}
    ],
    flow:[
      { t:'Sep 18, 17:20', hr:'96', bp:'118/70', map:'86', rr:'18', temp:'37.4 (99.3)', spo2:'98', o2:'Room air', wt:'63.5 (140)', gcs:'14' }
    ],
    io:[
      { t:'Sep 18, the day', oral:'5,000', iv:'0', totalIn:'5,000', urine:'not measured', other:'Vomited twice, volume not recorded', totalOut:'not measured', net:'not calculable', cum:'not calculable' }
    ],
    mar:[
      ['Sodium chloride 3%','100 mL','Intravenous over 10 minutes','Sep 18, 18:05','Given']
    ],
    orders:[
      ['Admit to observation','Medicine','Sep 18, 18:00','Active'],
      ['Sodium chloride 3%, 100 mL over 10 minutes','One dose, then reassess','Sep 18, 18:00','Completed'],
      ['Serum sodium every 2 hours','While correcting','Sep 18, 18:00','Active'],
      ['Strict intake and output','Hourly','Sep 18, 18:00','Active'],
      ['Nothing by mouth','Until reviewed','Sep 18, 18:00','Active']
    ],
    coach:{
      predict:"She trained twice in the heat, sweated hard through both sessions, and drank about five litres of plain water. Before you look at her weight: up, down, or the same?",
      read:"Her intake is charted and her output is not. That is real, it happens on every ward, and one of this week's questions turns on the gap.",
      lesson:["weight", "Her weight is on the vital signs flowsheet and not in the note. What does putting it in the grid let you do that a sentence would not?"],
      vitals:"File the weight and put it beside the August weight. Two numbers, five weeks apart, and between them is the whole case.",
      io:"Five litres in and an output nobody wrote down. What is the honest thing to chart in the urine row, and why is a blank better than a guess?",
      results:"Read the sodium and the measured osmolality together rather than one after the other. What are they telling you twice?",
      problems:"You can open a problem here without knowing the cause. What can you name from the chart alone?",
      mar:"She was given salt water after drinking water all day. Before you judge it, what would you want to know about the concentration of what she was given?",
      note:"Your assessment has to account for a weight that went up on a day of heavy sweating. Do not smooth that over."
    }
  },

  /* ---------------------------------------------------------- 3 */
  3: {
    location:'Emergency department, resuscitation bay 2',
    encounterType:'Emergency, admitted',
    flow:[
      { t:'Sep 22, 06:40', hr:'128', bp:'96/58', map:'71', rr:'32', temp:'36.4 (97.5)', spo2:'99', o2:'Room air', wt:'55 (121)', gcs:'13', pupils:'4 mm, reactive', glu:'642', k:'5.4', cr:'1.6' }
    ],
    io:[
      { t:'Sep 22, 06:40 to 07:40', oral:'0', iv:'1,000', totalIn:'1,000', urine:'40', other:'0', totalOut:'40', net:'+960', cum:'+960' }
    ],
    mar:[
      ['Sodium chloride 0.9%','1,000 mL','Intravenous over 1 hour','Sep 22, 06:55','Running']
    ],
    orders:[
      ['Sodium chloride 0.9%, 1 L over the first hour, then reassess','Fluid resuscitation','Sep 22, 06:50','Active'],
      ['Hourly urine output','Nursing','Sep 22, 06:50','Active'],
      ['Hourly point of care glucose','Nursing','Sep 22, 06:50','Active'],
      ['Potassium every 2 hours','Laboratory','Sep 22, 06:50','Active'],
      ['Nothing by mouth','Until reviewed','Sep 22, 06:50','Active'],
      ['Continuous cardiac monitoring','Nursing','Sep 22, 06:50','Active']
    ],
    coach:{
      predict:"Four days ago she weighed 63.5 kg and was overloaded with water. She has been passing very large volumes of urine since. Before you look: what has her weight done, and what has happened inside her cells?",
      read:"Nothing new opens this week. Everything you need was taught in Week 2, and this is the same physiology on a much harder patient. If a question feels like it needs something you have not met, read it again.",
      lesson:["trend", "Three weights now sit in one row: 61, 63.5 and 55 kg. What can you see in a row that you could not see in three separate notes?"],
      vitals:"File today's weight, then run your eye along the whole row before you move on. Which of the three numbers is the one you would have wanted first?",
      io:"One hour of fluid is charted. At this rate, how long would it take to replace a six litre deficit, and what does that arithmetic tell you about the plan?",
      results:"Two numbers on this panel belong to a system you reach in Week 15. The chart tells you which and tells you to leave them alone. Which two, and how did you know?",
      problems:"You can now name several problems you could not name on Tuesday. Write the evidence beside each, because in four weeks you will not remember why you opened it.",
      mar:"The first litre is isotonic saline and she is profoundly hyperosmolar. What question would you ask the person who wrote that order?",
      note:"Your assessment is about where water has gone, not about what she is called. A diagnosis is not required and is not what is being marked."
    }
  },

  /* ---------------------------------------------------------- 4 */
  4: {
    location:'Emergency department, resuscitation bay 2',
    encounterType:'Emergency, admitted',
    flow:[
      { t:'Sep 22, 07:00', hr:'128', bp:'96/58', map:'71', rr:'32', k:'5.4', glu:'642', pupils:'4 mm, reactive' },
      { t:'Sep 22, 09:00', hr:'116', k:'4.1', glu:'486' },
      { t:'Sep 22, 11:00', hr:'104', k:'3.1', glu:'372' }
    ],
    io:[
      { t:'Sep 22, 07:00 to 11:00', oral:'0', iv:'3,000', totalIn:'3,000', urine:'420', other:'0', totalOut:'420', net:'+2,580', cum:'+3,540' }
    ],
    mar:[
      ['Sodium chloride 0.9%','continuous','Intravenous','Sep 22, 06:55 onward','Running'],
      ['Insulin, regular, infusion','0.1 units/kg/h','Intravenous','Sep 22, 07:20','Started'],
      ['Insulin, regular, infusion','rate reduced','Intravenous','Sep 22, 11:05','Rate changed'],
      ['Potassium chloride','added to the infusion','Intravenous','Sep 22, 11:05','Started']
    ],
    orders:[
      ['Insulin infusion per protocol','Hold if potassium is below 3.3 mEq/L','Sep 22, 07:15','Active'],
      ['Potassium every 2 hours while on the infusion','Laboratory','Sep 22, 07:15','Active'],
      ['Continuous cardiac monitoring','Nursing','Sep 22, 06:50','Active'],
      ['12 lead ECG on arrival and at 4 hours','Cardiology','Sep 22, 07:00','Resulted twice']
    ],
    coach:{
      predict:"Her potassium was 5.4 on arrival. She has been losing potassium in her urine for three weeks. Before you look at the next two values: which way does the number go over the next four hours, and which way does her total body potassium go?",
      read:"Three potassium values four hours apart, and almost none of the movement is potassium entering or leaving her. File all three before you try to explain any of them.",
      lesson:["source", "The potassium in the flowsheet came from a laboratory and the ECG changes came from a machine at the bedside. Which one is closer to the membrane, and why does a chart keep both?"],
      vitals:"Put the potassium row and the ECG findings in the same columns. One is measuring the serum and one is watching what the serum is doing to a cell.",
      io:"Fluid has been running for four hours. How much of what went in do you think is still in her bloodstream, and what would you need to know to answer properly?",
      results:"A value inside the reference range at 09:00 is not reassurance here. What is it on its way to?",
      problems:"Open a problem for the potassium even though the arrival value was high. In the evidence field, say which direction the danger is now coming from.",
      mar:"The protocol says hold the insulin below a certain potassium. Before you read the number: what do you think insulin does to where potassium sits?",
      note:"Your plan should contain one thing you would stop, not only things you would give."
    }
  },

  /* ---------------------------------------------------------- 5 */
  5: {
    location:'Emergency department, then medical ward',
    encounterType:'Inpatient, day 1',
    flow:[
      { t:'Sep 22, 06:40', hr:'128', bp:'96/58', map:'71', rr:'32', gcs:'13', pupils:'4 mm, brisk and equal', dtr:'1+ symmetric' },
      { t:'Sep 22, 07:40 sitting', hr:'138', bp:'78/44', map:'55' },
      { t:'Sep 22, 10:00', hr:'112', rr:'32', gcs:'14' },
      { t:'Sep 22, 14:00', hr:'96', bp:'108/62', map:'77', rr:'24', gcs:'15', dtr:'2+ symmetric' }
    ],
    io:[
      { t:'Sep 22, 06:40 to 14:00', oral:'0', iv:'5,000', totalIn:'5,000', urine:'980', other:'0', totalOut:'980', net:'+4,020', cum:'+4,020' }
    ],
    mar:[
      ['Sodium chloride 0.9%','continuous','Intravenous','Sep 22, 06:55 onward','Running'],
      ['Insulin, regular, infusion','continuous','Intravenous','Sep 22, 07:20 onward','Running'],
      ['Potassium chloride','in the infusion','Intravenous','Sep 22, 11:05 onward','Running']
    ],
    orders:[
      ['Hourly neurological observations','Nursing','Sep 22, 07:00','Active'],
      ['Limit the fall in plasma osmolality to about 3 mOsm/kg per hour','Medicine','Sep 22, 07:00','Active'],
      ['Bedside visual acuity','Nursing','Sep 22, 08:00','Resulted'],
      ['10 g monofilament and 128 Hz vibration testing, both feet','Nursing','Sep 22, 08:10','Resulted'],
      ['Lie and stand blood pressure','Nursing','Sep 22, 07:40','Resulted']
    ],
    coach:{
      predict:"She is drowsy, her blood pressure is 96/58 and she is about to be sat upright for the first time. What do you expect her blood pressure and her heart rate to do in the first minute?",
      read:"Three loops are on this page and none of them needed a doctor to run. One protects her brain, one defends her blood pressure, and one quietly changed the shape of a lens.",
      lesson:["components", "The Glasgow Coma Scale is charted as three numbers, not one. What does E3 V4 M6 tell a nurse at handover that a total of 13 does not?"],
      vitals:"Chart the scale as its parts. Then chart the reflex grades, which are also a number standing in for an observation someone made with their hands.",
      io:"Nothing about her fluid chart explains her conscious level this morning. What on this page does?",
      results:"The sitting blood pressure is the result that matters most this week and it came from a nurse with a cuff, not from a laboratory. Why did nobody order it?",
      problems:"One problem you open today resolves by this afternoon and one does not resolve for four weeks. Which is which, and how can you tell so early?",
      mar:"No drug was given for any of the three findings this week. What does that tell you about where the problem actually sits?",
      note:"Your assessment should say what her reflexes tell you and, just as clearly, what they cannot."
    }
  },

  /* ---------------------------------------------------------- 6 */
  6: {
    location:'Medical ward, then outpatient clinic',
    encounterType:'Inpatient day 4, then follow-up',
    flow:[
      { t:'Sep 25, day 4', hr:'88', bp:'112/68', map:'83', rr:'16', temp:'36.9 (98.4)', spo2:'98', o2:'Room air', wt:'56.5 (125)', gcs:'15', dtr:'2+ symmetric' },
      { t:'Oct 10', hr:'72', bp:'110/70', map:'83', wt:'58 (128)' },
      { t:'Nov 20', hr:'62', bp:'110/66', map:'81', wt:'59 (130)' }
    ],
    io:null,
    mar:[
      ['Insulin glargine','12 units','Subcutaneous, at night','Sep 25 onward','Given'],
      ['Insulin lispro','with meals, per scale','Subcutaneous','Sep 25 onward','Given']
    ],
    orders:[
      ['Physiotherapy assessment and mobility plan','Therapy','Sep 25','Active'],
      ['Grip dynamometry, right hand','Therapy','Sep 25, Oct 10, Nov 20','Resulted three times'],
      ['Sit to stand, 30 seconds','Therapy','Sep 25','Resulted'],
      ['Maximal inspiratory pressure','Respiratory therapy','Sep 25','Resulted'],
      ['Repeat DEXA body composition','Sports medicine','Oct 10, Nov 20','Resulted twice']
    ],
    coach:{
      predict:"She survived, she is four days in, and she is about to stand up. Before you read the assessment: do you expect her weakness to be worse in her hands or in her hips, and why?",
      read:"Her force comes back before her muscle does. Both numbers are on this chart, and the gap between them is the week.",
      lesson:["absent", "The motor examination charts no fasciculation, normal tone and intact sensation. Why does a chart record things that were not found?"],
      vitals:"There is a function row on this flowsheet that is not a vital sign in any textbook. Grip strength is a physiological measurement and it belongs in the grid with the rest.",
      io:"Nothing is being measured in or out now. What replaced fluid balance as the number worth following this week?",
      results:"A creatine kinase of 340 is raised and it is not the answer. What would a much higher value have meant, and what does this one rule out?",
      problems:"Weakness is a finding, not a problem. How would you write it so that you could be shown wrong?",
      mar:"Her medication record has changed shape completely since Week 4. What kind of medicine is she on now, and what does that say about where she is in the illness?",
      note:"Your plan should say what she is allowed to do this week, in words she could act on without calling anyone."
    }
  },

  /* ---------------------------------------------------------- 7 */
  7: {
    location:'Endocrinology and gynecology clinics',
    encounterType:'Outpatient follow-up',
    flow:[
      { t:'Sep 22, admission', hr:'128', bp:'96/58', map:'71', temp:'36.4 (97.5)' },
      { t:'Nov 3, clinic supine', hr:'68', bp:'118/72', map:'87', rr:'14', temp:'36.7 (98.1)', spo2:'99', o2:'Room air', wt:'58.5 (129)' },
      { t:'Nov 3, standing 1 min', hr:'84', bp:'114/76', map:'89' },
      { t:'Dec 5, clinic', hr:'64', bp:'112/70', map:'84', wt:'59 (130)' }
    ],
    io:null,
    mar:[
      ['Insulin glargine','14 units','Subcutaneous, at night','Nov 3','Continuing'],
      ['Insulin lispro','with meals, per ratio','Subcutaneous','Nov 3','Continuing']
    ],
    orders:[
      ['C-peptide, GAD-65 and islet antigen 2 antibodies','Endocrinology','Sep 22','Resulted'],
      ['Thyroid function, serial','Endocrinology','Sep 22, Sep 28, Nov 3','Resulted three times'],
      ['Reproductive hormone panel','Gynecology','Oct 20','Resulted'],
      ['Pelvic ultrasound','Gynecology','Oct 20','Resulted'],
      ['Cardiovascular autonomic function testing','Endocrinology','Nov 3','Resulted'],
      ['Dietitian review, energy availability','Sports medicine','Oct 20','Completed']
    ],
    coach:{
      predict:"Her periods stopped at the end of August and have not come back. Her ovaries are normal on ultrasound. Before you look at the panel: do you expect her FSH to be high or low, and what would each answer mean?",
      read:"Three axes are being read on one page: the pancreas, the thyroid and the reproductive axis. Two of them were never the problem, and telling which is the skill.",
      lesson:["derived", "Energy availability is not measured, it is calculated from an intake, a training cost and a lean mass. How should a chart show a number nobody read off a machine?"],
      vitals:"Her standing blood pressure barely moves and her heart rate rises by 16. Compare that with the same test on September 22. What recovered?",
      io:"Nothing to chart here. Which of her three axes would you have most wanted a fluid chart for, and why did nobody need one?",
      results:"A thyroid result that moves twice with no treatment is a result about something other than the thyroid. What would have happened if someone had treated the 6.2?",
      problems:"At least one problem on your list should close this week. Closing a problem is a clinical act. What is your evidence for closing it?",
      mar:"Two insulins, given at different times, doing different jobs. Before you read why: what does a pancreas do between meals that it does not do after one?",
      note:"Your plan has to mention food. If it does not, read the energy availability line again."
    }
  },

  /* ---------------------------------------------------------- 8 */
  8: {
    location:'Outpatient clinic, discharge review',
    encounterType:'Case closure',
    flow:[
      { t:'Aug 12, baseline', hr:'52', bp:'108/64', map:'79', rr:'12', temp:'36.8 (98.2)', spo2:'99', o2:'Room air', wt:'61 (134)' },
      { t:'Sep 22, arrival', hr:'128', bp:'96/58', map:'71', rr:'32', temp:'36.4 (97.5)', spo2:'99', o2:'Room air', wt:'55 (121)', gcs:'13' },
      { t:'Dec 5, clinic', hr:'64', bp:'112/70', map:'84', rr:'14', temp:'36.8 (98.2)', spo2:'99', o2:'Room air', wt:'59 (130)', gcs:'15' }
    ],
    io:null,
    mar:[
      ['Insulin glargine','14 units','Subcutaneous, at night','Dec 5','Continuing, indefinitely'],
      ['Insulin lispro','with meals, per ratio','Subcutaneous','Dec 5','Continuing, indefinitely']
    ],
    orders:[
      ['Discharge from the acute service to routine diabetes care','Medicine','Dec 5','Completed'],
      ['Hemoglobin A1c every 3 months','Endocrinology','Dec 5','Standing'],
      ['Annual foot and retinal screening','Endocrinology','Dec 5','Standing'],
      ['Clearance for full training and competition','Sports medicine','Nov 25','Completed']
    ],
    coach:{
      predict:"You are about to close her file. Before you read the discharge summary: name the one thing about her that will still be true in ten years.",
      read:"Nothing new opens this week either. Read the seven entries you already have as one person, which is a different job from reading them one at a time.",
      lesson:["closing", "Closing a chart means saying which problems are resolved, which are permanent, and which were never problems. Why is that third category the one that teaches you something?"],
      vitals:"Three columns, four months apart, in one grid. Run your finger along the weight row and say out loud what happened to her.",
      io:"No fluid chart at a clinic visit. Which single measurement replaced it as the thing worth checking every three months?",
      results:"Her A1c of 7.1 covers the last three months, which includes the weeks before anyone knew. What can that number report, and what can it not?",
      problems:"Go back through the whole list and mark each entry active, resolved, or never a problem. How many are in the third group?",
      mar:"Her medication list is two drugs and it will not get shorter. What does a permanent medication list change about how she is followed?",
      note:"Write this one as a handover to someone who has never met her, because that is what it is."
    }
  },

  /* ---------------------------------------------------------- 9 */
  9: {
    location:'Emergency department, resuscitation bay 1',
    encounterType:'Emergency, admitted to intensive care',
    flow:[
      { t:'Mar 10, baseline clinic', hr:'64', bp:'118/70', map:'86', rr:'16', temp:'36.8 (98.2)', spo2:'96', o2:'Room air', wt:'88 (194)', ef:'30', cr:'1.5', hgb:'12.6' },
      { t:'Nov 4, 08:40 arrival', hr:'118', bp:'82/46', map:'58', rr:'28', temp:'38.9 (102.0)', spo2:'88', o2:'Room air', wt:'91 (201)', gcs:'14' },
      { t:'Nov 4, 08:50 on oxygen', spo2:'93', o2:'6 L nasal cannula', k:'5.1', glu:'268', cr:'2.6', lac:'4.6', hgb:'11.8' },
      { t:'Nov 4, 09:20 echo', cvp:'14', co:'4.9', sv:'42', scvo2:'52', ef:'25' }
    ],
    io:[
      { t:'Nov 4, 08:40 to 10:40', oral:'0', iv:'500', totalIn:'500', urine:'20', other:'0', totalOut:'20', net:'+480', cum:'+480' }
    ],
    mar:[
      ['Carvedilol','12.5 mg','Oral, at home','Nov 4, 07:00','Taken at home'],
      ['Ceftriaxone','2 g','Intravenous','Nov 4, 09:30','Given'],
      ['Azithromycin','500 mg','Intravenous','Nov 4, 09:40','Given'],
      ['Sodium chloride, balanced crystalloid','500 mL','Intravenous over 20 minutes','Nov 4, 09:10','Given'],
      ['Lisinopril','10 mg','Oral','Nov 4','HELD on admission'],
      ['Spironolactone','25 mg','Oral','Nov 4','HELD on admission'],
      ['Metformin','1,000 mg','Oral','Nov 4','HELD on admission']
    ],
    orders:[
      ['Admit to intensive care','Critical care','Nov 4, 09:45','Active'],
      ['Blood cultures, two sets, before antibiotics','Microbiology','Nov 4, 09:00','Collected'],
      ['Ceftriaxone and azithromycin','Community acquired pneumonia','Nov 4, 09:25','Active'],
      ['Bedside echocardiogram','Critical care','Nov 4, 09:10','Resulted'],
      ['Chest radiograph, portable','Radiology','Nov 4, 09:05','Resulted'],
      ['Arterial line','Critical care','Nov 4, 09:15','Placed'],
      ['Central venous catheter','Critical care','Nov 4, 09:20','Placed'],
      ['Hourly urine output','Nursing','Nov 4, 09:00','Active'],
      ['Hold lisinopril, spironolactone and metformin','Medicine','Nov 4, 09:00','Active']
    ],
    coach:{
      predict:"A 68 year old man with a heart that ejects 30 percent arrives with four days of fever. Before you look at anything: is his cardiac output going to be high, low, or normal, and what should it be?",
      read:"A new patient, and he arrives already carrying four problems. Read his home medication list before his vital signs; three of the numbers on this page make no sense without it.",
      lesson:["heldmed", "Three of his home medications are charted as HELD, not removed. What is the difference, and who needs to see it?"],
      vitals:"File the heart rate of 118, then go back to the medication record and see what he took at 07:00. That is the most useful thing you will do today. What does it change?",
      io:"Twenty millilitres of urine in two hours. What is that per hour per kilogram, and is it enough?",
      results:"His cardiac output sits inside the normal range. Chart it anyway. What should a man with a temperature of 38.9 degrees Celsius be producing?",
      problems:"Four of his problems existed before this morning. Open them anyway and mark them chronic. Why do the acute ones only make sense against them?",
      mar:"He took a beta blocker at 07:00 and arrived at 08:40 with a heart rate of 118. What would that heart rate have been without the drug?",
      note:"Your assessment has to hold two ideas at once: he is underfilled where it matters and overfilled where you can see it."
    }
  },

  /* ---------------------------------------------------------- 10 */
  10: {
    location:'Intensive care, bed 4',
    encounterType:'Inpatient, day 1',
    flow:[
      { t:'Nov 4, 09:00', hr:'118', bp:'82/46', map:'58', rr:'28', spo2:'93', o2:'6 L nasal cannula', cvp:'14', co:'4.9', sv:'42', svr:'718', lac:'4.6', scvo2:'52', uo:'10' },
      { t:'Nov 4, 09:35 after 500 mL', hr:'116', bp:'86/50', map:'62', spo2:'89', o2:'6 L nasal cannula', cvp:'18', co:'5.1' },
      { t:'Nov 4, 11:00 on noradrenaline', hr:'104', bp:'104/58', map:'73', cvp:'16', co:'5.6', svr:'814', lac:'3.4', uo:'15' },
      { t:'Nov 4, 18:00 plus dobutamine', hr:'112', bp:'108/56', map:'73', cvp:'16', co:'6.8', svr:'671', lac:'2.1', scvo2:'66', uo:'35' }
    ],
    io:[
      { t:'Nov 4, 09:00 to 18:00', oral:'0', iv:'2,400', totalIn:'2,400', urine:'190', other:'0', totalOut:'190', net:'+2,210', cum:'+2,690' }
    ],
    mar:[
      ['Balanced crystalloid','500 mL','Intravenous over 20 minutes','Nov 4, 09:10','Given'],
      ['Balanced crystalloid, second bolus','500 mL','Intravenous','Nov 4, 09:40','NOT GIVEN, cancelled'],
      ['Noradrenaline','0.05 micrograms/kg/min, titrated to 0.22','Intravenous infusion','Nov 4, 09:50','Running'],
      ['Dobutamine','5 micrograms/kg/min','Intravenous infusion','Nov 4, 16:00','Running'],
      ['Carvedilol','12.5 mg','Oral','Nov 4, evening dose','HELD']
    ],
    orders:[
      ['Titrate noradrenaline to a mean arterial pressure of at least 65 mmHg','Nursing','Nov 4, 09:50','Active'],
      ['Continuous cardiac output monitoring','Critical care','Nov 4, 09:20','Active'],
      ['Hourly urine output and capillary refill every 2 hours','Nursing','Nov 4, 09:00','Active'],
      ['Lactate every 2 hours until under 2.0','Laboratory','Nov 4, 09:00','Active'],
      ['Lung ultrasound','Critical care','Nov 4, 09:30','Resulted'],
      ['Hold carvedilol while on vasopressor support','Medicine','Nov 4, 10:00','Active']
    ],
    coach:{
      predict:"He is about to be given 500 mL of fluid. His central venous pressure is already 14. Before you look: what happens to his cardiac output, and what happens to his oxygen saturation?",
      read:"Nine hours, four sets of numbers, and two decisions. One of the decisions was to not give something, and it is on the medication record as cancelled. Find it.",
      lesson:["derived", "Mean arterial pressure and systemic vascular resistance are both calculated, not measured. Where should a calculated number sit on a chart, and what has to travel with it?"],
      vitals:"Chart the central venous pressure in the same column as the cardiac output every time. Neither means much alone.",
      io:"Nine hours, 2,400 mL in and 190 mL out. Before you judge that: what is his kidney being asked to do at a mean pressure of 58?",
      results:"You are asked to calculate a resistance. Take the numbers off your own flowsheet rather than out of the paragraph. Did you get the same answer twice?",
      problems:"Shock is not a problem list entry. What kind, what is your evidence, and would you be willing to change it at 18:00?",
      mar:"A bolus that was ordered and then cancelled is still on the record. Why does a chart keep the thing that did not happen?",
      note:"Your plan should name the number you would titrate to and the number that would tell you the titration is not working."
    }
  },

  /* ---------------------------------------------------------- 11 */
  11: {
    location:'Intensive care, bed 4',
    encounterType:'Inpatient, days 1 to 5',
    flow:[
      { t:'Nov 4, day 1', hr:'118', bp:'82/46', map:'58', rr:'28', temp:'38.9 (102.0)', spo2:'93', o2:'6 L nasal cannula', hgb:'11.8', lac:'4.6' },
      { t:'Nov 6, day 3', hr:'104', bp:'98/54', map:'69', temp:'35.8 (96.4)', spo2:'94', o2:'Ventilated, FiO2 0.60', hgb:'9.6', lac:'2.4' },
      { t:'Nov 8, day 5', hr:'92', bp:'112/60', map:'77', temp:'37.2 (99.0)', spo2:'95', o2:'Ventilated, FiO2 0.50', hgb:'9.4', lac:'1.6' }
    ],
    io:[
      { t:'Nov 6, day 3', oral:'0', iv:'2,900', totalIn:'2,900', urine:'290', other:'0', totalOut:'290', net:'+2,610', cum:'+6,100' },
      { t:'Nov 8, day 5', oral:'480', iv:'1,800', totalIn:'2,280', urine:'620', other:'0', totalOut:'620', net:'+1,660', cum:'+7,900' }
    ],
    mar:[
      ['Ceftriaxone','2 g','Intravenous daily','Nov 4 onward','Given'],
      ['Azithromycin','500 mg','Intravenous daily','Nov 4 onward','Given'],
      ['Noradrenaline','titrated','Intravenous infusion','Stopped Nov 7','Stopped, day 4'],
      ['Paracetamol','1 g','Intravenous, as needed for fever','Nov 4 to 6','Given twice'],
      ['Enoxaparin','40 mg','Subcutaneous daily','Nov 4 onward','Given']
    ],
    orders:[
      ['Blood cultures, two sets','Microbiology','Nov 4','Positive Nov 5, Streptococcus pneumoniae'],
      ['Sputum culture','Microbiology','Nov 4','Same organism'],
      ['Urine culture','Microbiology','Nov 4','No growth'],
      ['Procalcitonin, day 1 and day 4','Laboratory','Nov 4, Nov 7','Resulted'],
      ['Full blood count and coagulation daily','Laboratory','Nov 4 onward','Active'],
      ['Droplet precautions','Infection control','Nov 4','Active until the organism was identified']
    ],
    coach:{
      predict:"He has the right antibiotic in him from hour one. Before you look at Day 3: is his white cell count higher or lower than the 19.4 he arrived with?",
      read:"Two things are happening to him and they need separating: there is an organism, and there is what his body is doing about the organism. The antibiotic treats one of them.",
      lesson:["trend", "His temperature is charted at Day 1, Day 3 and Day 5 in one row. What does the shape of that row tell you that any single value could not?"],
      vitals:"The temperature row is the one to chart carefully this week. Day 3 is lower than Day 1. Is that better news or worse?",
      io:"His urine output is rising while he is still critically ill. What else on the chart changed at the same time?",
      results:"His white cell count fell with nothing done to it. Chart both counts side by side and look at the band forms. What are they saying?",
      problems:"Mark on your list which problems are the organism and which are the response. Which list is longer?",
      mar:"Paracetamol was given twice for fever and then stopped. If fever is a defended set point, what were you doing when you gave it?",
      note:"Your assessment should say why he was still deteriorating three days after the correct antibiotic was given."
    }
  },

  /* ---------------------------------------------------------- 12 */
  12: {
    location:'Intensive care, bed 4',
    encounterType:'Inpatient, days 5 to 13',
    flow:[
      { t:'Nov 8, day 5', hr:'92', bp:'112/60', map:'77', temp:'37.2 (99.0)', wt:'93 (205)', glu:'246', k:'3.2' },
      { t:'Nov 9, day 6', hr:'90', bp:'114/62', map:'79', wt:'94 (207)', glu:'268' },
      { t:'Nov 13, day 10', hr:'84', bp:'118/66', map:'83', temp:'36.9 (98.4)', wt:'88 (194)', glu:'186', k:'4.0' },
      { t:'Nov 16, day 13', hr:'80', bp:'120/68', map:'85', wt:'86 (190)', glu:'162' }
    ],
    io:[
      { t:'Nov 8, day 5', oral:'480', iv:'1,800', totalIn:'2,280', urine:'620', other:'0', totalOut:'620', net:'+1,660', cum:'+7,900' },
      { t:'Nov 13, day 10', oral:'1,320', iv:'900', totalIn:'2,220', urine:'1,750', other:'1,400 on renal replacement', totalOut:'3,150', net:'&minus;930', cum:'+4,100' }
    ],
    mar:[
      ['Nasogastric feed, standard 1 kcal/mL','20 mL/h, advanced to 55 mL/h','Enteral','Nov 8 to Nov 13','Running'],
      ['Insulin, regular, infusion','6 units/h','Intravenous','Nov 8 onward','Running'],
      ['Potassium phosphate','replacement','Intravenous','Nov 9','Given'],
      ['Magnesium sulfate','2 g','Intravenous','Nov 9','Given'],
      ['Metformin','1,000 mg','Oral','Since Nov 4','HELD, whole admission'],
      ['Thiamine','200 mg','Intravenous daily','Nov 8 onward','Given']
    ],
    orders:[
      ['Nasogastric feed, start 20 mL/h and advance as tolerated','Dietetics','Nov 8','Active'],
      ['Indirect calorimetry','Dietetics','Nov 9','Resulted'],
      ['24 hour urinary urea nitrogen','Laboratory','Nov 10','Resulted'],
      ['Phosphate, magnesium and potassium every 12 hours for 72 hours','Laboratory','Nov 8','Active, refeeding protocol'],
      ['Abdominal radiograph','Radiology','Nov 8','Resulted'],
      ['Gastric residual volume every 4 hours','Nursing','Nov 8','Active']
    ],
    coach:{
      predict:"He has eaten nothing for five days and is about to be fed. Before you look at the electrolytes: which way do his phosphate, magnesium and potassium move once the feed starts?",
      read:"He is not eating and he is burning about 600 kcal a day more than a man his size should at rest. The fuel is coming from him.",
      lesson:["unmeasured", "Some of what he loses each day never reaches an intake and output chart. Where would you record a loss you cannot measure, and what should you write?"],
      vitals:"Watch the weight row across these four columns and hold it against the running fluid total. They disagree and both are right. Which do you believe?",
      io:"On Day 10 his net balance is negative for the first time. What on the medication record made that possible?",
      results:"Three electrolytes fell together within two days of food arriving. Chart them in one column so the pattern is visible rather than described. What single event explains all three?",
      problems:"Open a problem for the feeding itself. Something given to help him caused a new one. Does that change how you would write it?",
      mar:"Metformin has been held since Day 1 and nobody has restarted it. What would you want to check before anyone did?",
      note:"Your plan should say what you would feed and what you would not, and why the difference matters to a man on a ventilator."
    }
  },

  /* ---------------------------------------------------------- 13 */
  13: {
    location:'Intensive care, bed 4',
    encounterType:'Inpatient, days 2 to 7',
    flow:[
      { t:'Nov 4, day 1, 08:55', rr:'28', spo2:'92', o2:'6 L nasal cannula, FiO2 0.44', ph:'7.32', paco2:'30', pao2:'62', hco3:'15', hgb:'11.8' },
      { t:'Nov 5, day 2, 04:00', rr:'38', spo2:'90', o2:'High flow 60 L/min, FiO2 0.80', ph:'7.25', paco2:'38', pao2:'58', hco3:'16', hgb:'9.6' },
      { t:'Nov 5, day 2, 08:00', rr:'24', spo2:'96', o2:'Ventilated', ph:'7.24', paco2:'44', pao2:'78', hco3:'18', vt:'440', rateSet:'24', peep:'12', fio2:'0.70', pplat:'28' },
      { t:'Nov 7, day 4, proned', rr:'24', spo2:'97', o2:'Ventilated, proned 16 h/day', ph:'7.36', paco2:'40', pao2:'92', hco3:'22', vt:'440', rateSet:'24', peep:'12', fio2:'0.55' },
      { t:'Nov 10, day 7, breathing trial', rr:'34', spo2:'94', o2:'Ventilated, pressure support', vt:'260', peep:'8', fio2:'0.40' }
    ],
    io:[
      { t:'Nov 5, day 2', oral:'0', iv:'3,100', totalIn:'3,100', urine:'240', other:'0', totalOut:'240', net:'+2,860', cum:'+5,550' }
    ],
    mar:[
      ['Propofol','sedation, titrated','Intravenous infusion','Nov 5, 05:10 onward','Running'],
      ['Fentanyl','analgesia, titrated','Intravenous infusion','Nov 5, 05:10 onward','Running'],
      ['Cisatracurium','neuromuscular blockade','Intravenous','Nov 5, 05:10 and for mechanics','Given, short course'],
      ['Noradrenaline','titrated','Intravenous infusion','Stopped Nov 7','Stopped']
    ],
    orders:[
      ['Intubate and ventilate','Critical care','Nov 5, 05:05','Completed 05:10'],
      ['Volume controlled ventilation, 6 mL/kg predicted body weight','Critical care','Nov 5, 05:10','Active'],
      ['Prone positioning 16 hours a day','Critical care','Nov 7','Active'],
      ['Arterial blood gas every 4 hours, then as needed','Laboratory','Nov 4','Active'],
      ['Daily spontaneous breathing trial once criteria met','Critical care','Nov 10','Attempted, failed'],
      ['Chest radiograph daily','Radiology','Nov 4 onward','Active']
    ],
    coach:{
      predict:"At 04:00 on Day 2 his bicarbonate is 16 and his carbon dioxide is 38. Before you apply any formula: is his breathing keeping up with his acid, or falling behind?",
      read:"His lung fails in two stages and they are not the same problem. First it gets wet, which is Week 10. Then it gets stiff, which is Week 11.",
      lesson:["settings", "From the third column on, this flowsheet has ventilator rows in it. Which of those numbers did a person choose and which did his body produce? Why must a chart show the difference?"],
      vitals:"File the ventilator settings in their own group, away from the vital signs. What would go wrong if a set rate sat in the same row as a measured one?",
      io:"His fluid balance is still strongly positive on Day 2. What is that doing to the lung you are about to ventilate?",
      results:"The 04:00 gas on Day 2 decided everything that followed. Chart it, then apply the formula in the tools box. What did that answer tell the team to do at 05:05?",
      problems:"You can name what his lung is doing without naming a syndrome. Try it. Which is more useful at handover?",
      mar:"He was paralysed briefly so the mechanics could be measured. Why does a plateau pressure need a patient who is not breathing?",
      note:"Your assessment should say why a rising carbon dioxide was allowed on purpose in one column and was an emergency in another."
    }
  },

  /* ---------------------------------------------------------- 14 */
  14: {
    location:'Intensive care, bed 4',
    encounterType:'Inpatient, days 1 to 15',
    flow:[
      { t:'Mar 10, baseline', bp:'118/70', map:'86', wt:'88 (194)', cr:'1.5', uo:'normal' },
      { t:'Nov 4, day 1', bp:'82/46', map:'58', wt:'91 (201)', cvp:'14', cr:'2.6', uo:'10' },
      { t:'Nov 6, day 3', bp:'98/54', map:'69', wt:'92 (203)', cvp:'16', cr:'3.8', k:'5.6', uo:'8' },
      { t:'Nov 9, day 6', bp:'114/62', map:'79', wt:'94 (207)', cvp:'18', cr:'3.6', uo:'25' },
      { t:'Nov 11, day 8', bp:'116/64', map:'81', wt:'93 (205)', cvp:'17', cr:'3.4', k:'6.2', hco3:'13', uo:'20' },
      { t:'Nov 18, day 15', bp:'124/72', map:'89', wt:'82 (181)', cvp:'9', cr:'2.4', k:'4.2', uo:'55' }
    ],
    io:[
      { t:'Nov 9, day 6, cumulative since admission', oral:'8,600', iv:'22,400', totalIn:'31,000', urine:'19,200', other:'4,400 insensible, estimated', totalOut:'23,600', net:'+7,400', cum:'+7,400' },
      { t:'Nov 18, day 15, cumulative since admission', oral:'21,000', iv:'26,900', totalIn:'47,900', urine:'29,400', other:'21,600 renal replacement and insensible', totalOut:'51,000', net:'&minus;3,100', cum:'&minus;3,100' }
    ],
    mar:[
      ['Furosemide','40 mg','Intravenous, single dose','Nov 6, day 3','Given, 60 mL of urine in 2 hours'],
      ['Furosemide','10 mg/h','Intravenous infusion','Nov 6 onward','Running'],
      ['Lisinopril','10 mg','Oral','Since Nov 4','HELD, whole admission'],
      ['Spironolactone','25 mg','Oral','Since Nov 4','HELD, whole admission'],
      ['Continuous renal replacement therapy','ultrafiltration and clearance','Extracorporeal','Nov 11 to Nov 16','Stopped Nov 16'],
      ['Iodinated contrast','CT of chest and abdomen','Intravenous','Nov 5, day 2','Given']
    ],
    orders:[
      ['Hold lisinopril and spironolactone','Medicine','Nov 4','Active'],
      ['Urine sodium, creatinine, osmolality and microscopy','Laboratory','Nov 4 and Nov 6','Resulted twice'],
      ['Furosemide infusion, 10 mg/h','Medicine','Nov 6','Active'],
      ['Renal ultrasound','Radiology','Nov 6','Normal size, no obstruction'],
      ['Continuous renal replacement therapy','Nephrology','Nov 11','Completed Nov 16'],
      ['Daily weight on the bed scale','Nursing','Nov 4 onward','Active']
    ],
    coach:{
      predict:"His blood pressure is low and his kidney has stopped. Before you look at the central venous pressure: is the problem what is arriving at the kidney, what is leaving it, or both?",
      read:"Everyone will tell you his kidney failed because it was not getting enough blood. Look at the central venous pressure column and ask what a filter does when the pressure downstream of it rises.",
      lesson:["compare", "Two sets of urine indices, two days apart, saying opposite things. What has to be true of a chart before a comparison like that is trustworthy?"],
      vitals:"The weight row and the running fluid total are the argument this week. Chart both. Which one do you believe, and what are the other one's blind spots?",
      io:"On Day 6 the chart says plus 7.4 litres and the scale says plus 3 kilograms. Where are the other four?",
      results:"Two sets of urine indices, two days apart, saying opposite things about the tubule. What changed between them?",
      problems:"His kidney problem is not new. Write the chronic one and the acute one as two entries. Why do they need different evidence?",
      mar:"Two of his home medications have been held for fifteen days and one of them normally protects his kidney. What is the argument for holding it anyway?",
      note:"Your plan should contain a number that would make you stop the diuretic, not only a reason to continue it."
    }
  },

  /* ---------------------------------------------------------- 15 */
  15: {
    location:'Both files, read again',
    encounterType:'Integration',
    flow:[
      { t:'Camila, Sep 22, 06:45', ph:'7.09', paco2:'14', hco3:'4', rr:'32' },
      { t:'Camila, Sep 22, 18:00', ph:'7.31', paco2:'26', hco3:'13', rr:'24' },
      { t:'Dale, Nov 4, 08:55', ph:'7.32', paco2:'30', pao2:'62', hco3:'15', rr:'28' },
      { t:'Dale, Nov 5, 04:00', ph:'7.25', paco2:'38', pao2:'58', hco3:'16', rr:'38' },
      { t:'Dale, Nov 10, day 7', ph:'7.31', paco2:'40', hco3:'20', rr:'24' },
      { t:'Dale, Nov 18, day 15', ph:'7.36', paco2:'38', hco3:'21', rr:'18' }
    ],
    io:null,
    mar:[
      ['Sodium chloride 0.9%','6 L over 12 hours','Intravenous','Camila, Sep 22','Given'],
      ['Sodium chloride 0.9%','about 9 L over 3 days','Intravenous','Dale, Nov 4 to 6','Given']
    ],
    orders:[
      ['Read both files again','Physiology','Dec 14','Active'],
      ['Arterial blood gas, serial','Laboratory','Both patients','Resulted']
    ],
    coach:{
      predict:"Both patients improved, and both of them left a treatment behind in their blood. Before you calculate anything: what do you think went into both of them in large volumes, and what did it carry?",
      read:"This is the last entry and it is the first one again, twice. You were told in Week 3 and again in Week 9 to notice two numbers and leave them alone. Pick them up now.",
      lesson:["compare", "Six gases from two different people, in one grid. What makes that a fair comparison, and what would make it a misleading one?"],
      vitals:"Chart all six in one flowsheet. The comparison is the assignment, and it only works if the rows line up.",
      io:"Camila got six litres in twelve hours and Dale about nine over three days. Which of them had less time to deal with it?",
      results:"One correction on this page, the albumin correction, changes the answer in one patient and not the other. Which, and why?",
      problems:"Add one final problem to each list: the one the treatment created. Both patients have one.",
      mar:"The same bag of fluid appears on both medication records. What is actually in it, and what does the body do with each of its two ions?",
      note:"Write one assessment that covers both people. That is the point of the week, and the end of term analysis asks for it at greater length."
    }
  }

  }
};
