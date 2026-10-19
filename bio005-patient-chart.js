/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-patient-chart.js

   THE PATIENT CHART. Two patients, fifteen weeks, five entry points.

   WHAT THIS IS. Use It is 25 percent of the grade and runs every
   week. This file is that assignment. The whole class follows the
   same patients for the whole term. In Week 1 a student picks an
   entry point, nursing, medicine, radiology, respiratory therapy,
   or exercise and allied health, and stays in it. Every week they
   get the same chart everyone else gets, plus the data their
   discipline would actually have on its desk, plus a prompt written
   from that desk. All five entry points assess the same
   competencies. Nobody gets an easier version.

   ------------------------------------------------------------
   TWO PATIENTS, AND WHERE THE HANDOVER SITS
   ------------------------------------------------------------
   PATIENT A, Camila Reyes, carries Weeks 1 to 8. She is a well
   nineteen year old who becomes acutely unwell and recovers. Her
   file is one system at a time: a cell, a membrane, a nerve, a
   muscle, a hormone. Week 8 closes her file, which is the right
   week for it because Week 8 is Midterm 1 and opens no new
   competencies.

   PATIENT B, Dale Whitcomb, carries Weeks 9 to 15. He is 68, he
   arrives already carrying a failing heart and a damaged kidney,
   and he gets an infection on top of both. His file is the opposite
   shape: no system acts alone, and every week's answer depends on a
   system taught in another week. That is deliberate. Weeks 9 to 14
   are the integrated systems, cardiac, vascular, blood and immune,
   digestive, respiratory and renal, and a patient who only has one
   thing wrong cannot teach them.

   Both files are read again in Week 15, side by side.

   ------------------------------------------------------------
   HOW THE CHART IS ORDERED, which students ask about every year
   ------------------------------------------------------------
   The chart is not read in date order. You read one week of
   physiology at a time, and the chart entry for that week is the
   part of the story where that physiology is on stage. Camila's
   Week 5 goes back to her first morning in the emergency department
   because that is where her reflexes are on stage, and her Week 7
   runs six weeks past discharge because that is when the
   reproductive axis has something to say. Dale's Week 13 steps back
   to his second day because that is the day his lung failed. Each
   entry carries its own dates so the story stays coherent.

   ------------------------------------------------------------
   WHAT CHANGED, Sep 21 2026
   ------------------------------------------------------------
   Rebuilt against the schedule in bio005-schedule-fall2026.js, which
   moved everything after Week 2 by one week when chemistry became an
   optional Week 0 and Week 3 became a catch up week.

     - Weeks 1 and 2 are unchanged, byte for byte. Those two entries
       are posted and students are working in them.
     - Week 3 is now a catch up week. It opens no new competencies,
       so its entry is a second pass at Week 2's physiology on a
       harder case rather than new material.
     - Weeks 4 to 7 were realigned. The old Week 5 nervous system
       entry split: membrane potential and synapses moved up into
       Week 4, and reflexes and the senses became Week 5. The old
       Week 7 endocrine entry and the old Week 8 reproductive entry
       merged into Week 7, which is now hormones, the autonomic
       system and reproduction.
     - Week 8 is Midterm 1 week and opens no new competencies, so it
       closes Camila's file and hands over to Dale.
     - Weeks 9 to 15 are new, and are Dale.

   ------------------------------------------------------------
   THE FORWARD REFERENCE PROBLEM, and how it is handled
   ------------------------------------------------------------
   A real patient does not present her physiology in course order,
   so a chart entry in Week 3 can contain a bicarbonate of 4 when
   acid-base is Week 15. Three rules govern this.

     1. A NUMBER MAY APPEAR BEFORE ITS WEEK. A student can read
        "bicarbonate 4" in Week 3 without being asked anything about
        it. Charts have numbers on them. That is not a problem.
     2. A TOOL MAY NOT BE ASKED FOR BEFORE IT IS TAUGHT OR HANDED
        OVER. Where a week's prompt needs a formula, a rule or a
        definition the course has not reached, the week carries a
        'tools' entry: the tool written out in full, and the week the
        student will actually build it. The page renders this as
        "Before you start" above the chart. Being handed a tool and
        told plainly that you are being handed it is honest; being
        expected to already have it is not.
     3. WHERE THE ASK OVERREACHED, THE ASK WAS CUT.

   Each 'tools' item is [name, what the student is given, the week it
   is properly built]. A 0 means the course never builds it formally
   and the student keeps what is written here. Weeks with nothing to
   hand over have no 'tools' key and the page renders no box.

   ------------------------------------------------------------
   WHY THIS IS HARD TO HAND TO A CHATBOT
   ------------------------------------------------------------
   Nothing in this file asks for a fact. Every question asks the
   student to read a number that is only meaningful against another
   number somewhere else in the same file: Camila's potassium of 5.4
   against a total body deficit of 200 mEq, Dale's cardiac output of
   4.9 against a fever of 38.9 degrees, his creatinine of 2.4 on
   Day 15 against six kilograms of lost muscle. A tool that has not
   read the whole chart and held it together cannot answer these, and
   a student who has not done the same thing cannot either.

   ------------------------------------------------------------
   ACCURACY
   ------------------------------------------------------------
   Every value here is internally consistent and meant to be checked.
   Both arrival blood gases satisfy Henderson-Hasselbalch, every
   respiratory compensation was checked against Winter's formula,
   every anion gap closes, every corrected sodium works out,
   hemoglobin and hematocrit hold their usual ratio, and the
   hemodynamic numbers satisfy the pressure, flow and resistance
   relationship at each time point. Students are asked to do that
   arithmetic, so it has to survive it. Worked values are in
   instructor/patient-chart-key.md.

   ACCESSIBILITY. This file is data only. It is rendered by
   assignment-apply.html, patient-sheet.html and
   patient-chart-book.html, and the compliance notes for the
   rendering live with those pages.
   ============================================================ */

window.BIO005_CHART = {

  /* Patient A carries Weeks 1 to 8, Patient B carries Weeks 9 to 15.
     Every week below declares which one it belongs to. C.patient is
     kept pointing at A so that any page written before the second
     patient existed still renders. */
  patients: {

    A: {
      id:     'A',
      name:   'Camila Reyes',
      age:    19,
      weeks:  '1 to 8',
      line:   '19 years old. Second year kinesiology student and a midfielder on the college soccer team. No prior medical history, no medications.',
      why:    'You have her for the first half of the term. You will know her better than you expect to.',
      meds:   'None at baseline.',
      allergies: 'None known.'
    },

    B: {
      id:     'B',
      name:   'Dale Whitcomb',
      age:    68,
      weeks:  '9 to 15',
      line:   '68 years old. Retired long haul driver. Anterior heart attack in 2020 with a stent, heart failure since, ejection fraction 30 percent in March. High blood pressure. Type 2 diabetes for 14 years. Chronic kidney disease, baseline creatinine 1.5 mg/dL. Smoked for 40 years, stopped in 2019.',
      why:    'Camila had one thing wrong at a time. He has four, and they are all talking to each other. That is why he arrives in Week 9 and not before.',
      meds:   'Carvedilol 12.5 mg twice daily. Lisinopril 10 mg daily. Furosemide 40 mg daily. Spironolactone 25 mg daily. Atorvastatin 40 mg daily. Metformin 1,000 mg twice daily. Insulin glargine 22 units at night. Aspirin 81 mg daily.',
      allergies: 'None known.'
    }

  },

  /* Entry points. Order is fixed; the page renders them in this order
     and the stored track key is one of these ids. */
  tracks: [
    { id:'nursing',   name:'Nursing',                     desk:'The flowsheet. Vitals, intake and output, what changed since the last check, and what the patient can and cannot do right now.' },
    { id:'medicine',  name:'Medicine',                    desk:'The problem list. Labs, the differential, and the question of which test would move you.' },
    { id:'radiology', name:'Radiology',                   desk:'The images and what they physically measure, as opposed to what gets inferred from them.' },
    { id:'rt',        name:'Respiratory therapy',         desk:'Gas exchange and the work of breathing. Blood gases, ventilation, oxygenation, and the airway.' },
    { id:'exercise',  name:'Exercise and allied health',  desk:'Function and capacity. What the patient could do before, what they can do now, and what has to happen before they go back to it.' }
  ],

  /* Which patient each week belongs to. Weeks 1 and 2 are left exactly
     as they were posted, so this mapping lives here rather than as a key
     inside each of those two entries. */
  patientByWeek: { 1:'A', 2:'A', 3:'A', 4:'A', 5:'A', 6:'A', 7:'A', 8:'A',
                   9:'B', 10:'B', 11:'B', 12:'B', 13:'B', 14:'B', 15:'B' },

  weeks: {
  /* ---------------------------------------------------------- 1 */
  1: {
    title:'Foundations of Physiology',
    date:'August 12', when:'Six weeks before she got sick',
    encounter:'Preseason physical',
    arc:'Nothing is wrong with Camila yet. This is the only chart entry all term where every one of her numbers is normal, and that is exactly why it is so useful. Everything you read about Camila over the next fourteen weeks gets compared back to this page.',
    chart:[
      ['Vitals','HR 52, BP 108/64, RR 12, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 99% on room air.'],
      ['Measurements','Weight 61 kg (134 lb), height 168 cm (5 ft 6 in).'],
      ['Labs','Sodium 139 mEq/L, potassium 4.2, chloride 103, bicarbonate 25, glucose 88 mg/dL, creatinine 0.8 mg/dL, hemoglobin 13.4 g/dL, hematocrit 40%.'],
      ['Note','Well. Cleared for full participation. No symptoms, no medications, no family history she knows of.']
    ],
    five:[
      'Name three variables in Camila\'s chart that her body actively regulates. For each one, say what quantity is being held steady and which control system is holding it there.',
      'Camila\'s resting heart rate is 52. Say whether that is a finding (something abnormal that needs explaining) or her baseline (her normal starting point), and say exactly what you would need to know to decide.',
      'Explain what a reference range is actually a range of. Then explain why one of Camila\'s values falling inside it does not prove she is healthy, and why a value falling outside it would not prove she has a disease.',
      'Interpret Camila\'s chart. Say what it shows about her and what it cannot show.',
      'Name the one measurement you would add to Camila\'s baseline today, and say what question it would let you answer about her in October.'
    ],
    tracks:{
      nursing:{ data:'Camila\'s orthostatic vitals (blood pressure and heart rate lying down and then standing) were taken as part of her physical: lying down 108/64 with HR 52, and standing at one minute 104/66 with HR 64. They were documented as normal.',
        go:'when Camila stood up, her systolic pressure dropped 4 mmHg and her heart rate rose by 12 beats. That is a normal response, not a missing one. Describe what her reflex did in those sixty seconds and name each part of the reflex loop. Then say what would have to be true of a later set of Camila\'s orthostatic vitals for you to call them abnormal.' },
      medicine:{ data:'The reference ranges printed beside every result on Camila\'s panel come from a healthy reference population. By convention, each range is set to include the middle 95 percent of that population.',
        go:'if a range holds 95 percent of healthy people, work out roughly how often a completely healthy person will fall outside the range on at least one of the eight results on Camila\'s panel. Then explain what that arithmetic means when you order a whole panel instead of single tests, and connect it to why Camila\'s normal chart is still worth having.' },
      radiology:{ data:'Camila had a screening DEXA scan for body composition: 22% body fat and 45.1 kg of lean soft tissue. A screening ECG was also done. No echocardiogram was ordered.',
        go:'a DEXA scan does not weigh Camila\'s fat. Say what it physically measures, and what assumption turns that measurement into a fat mass. Then say which of Camila\'s numbers in the main chart is a direct measurement and which is a calculation, and why that difference will matter in Week 3.' },
      rt:{ data:'Camila had spirometry (a breathing test) at her physical: FVC 4.1 L, FEV<sub>1</sub> 3.5 L, FEV<sub>1</sub>/FVC 0.85. These were reported as 102% and 104% of predicted.',
        go:'"Percent of predicted" compares Camila with other people. It is not a direct measurement of her. Say what the predicted value is built from, and why a predicted value describes a population rather than Camila herself. Then say what Camila\'s own numbers today give you that a predicted value never can.' },
      exercise:{ data:'Camila did a graded exercise test: VO<sub>2</sub>max 52 mL/kg/min, maximum heart rate 196, and lactate threshold at 82% of her maximum heart rate.',
        go:'Camila\'s VO<sub>2</sub>max is expressed per kilogram of body mass. Predict what happens to that number if she loses 6 kg without losing any aerobic capacity at all, and say whether that would be a real improvement. Then name what you would measure instead to answer the question the ratio was trying to answer.' }
    }
  },

  /* ---------------------------------------------------------- 2 */
  /* Sep 15 2026. Rewritten. The old entry was an enzyme and insulin case,
     which was Week 2 back when Week 2 was the chemistry. Week 2 is now the
     cell, transport and signaling, and the center of that week is osmosis,
     osmolarity, tonicity and cell volume. This case is built on those, and it
     puts her own red cells under a microscope in three solutions so the
     tonicity competency is something she looks at rather than recites. */
  2: {
    title:'The Cell, Transport and Water',
    date:'September 18', when:'Five weeks after her preseason physical',
    encounter:'Athletic training room, then the emergency department',
    arc:'Camila did the right thing as she understood it. She trained in two sessions in the heat and drank water at every break, about five liters across the day, because she had been told not to get dehydrated. She finished the second session confused and vomiting, and her weight has gone up, not down. Everything in this entry comes down to one idea: water follows solute (dissolved particles), and the solute that cannot cross the membrane is what decides where the water goes.',
    chart:[
      ['History','Two practices, 31 &deg;C (88 &deg;F), heavy sweating through both. She drank plain water at every break, roughly 5 L across the day, and ate nothing between sessions. Headache from mid afternoon. Vomited twice. Confused and unsteady walking off the field.'],
      ['Vitals','HR 96, BP 118/70, RR 18, temperature 37.4 &deg;C (99.3 &deg;F), SpO<sub>2</sub> 98% on room air.'],
      ['Measurements','Weight 63.5 kg (140 lb). Her preseason weight was 61 kg (134 lb). She has gained 2.5 kg across a day of heavy sweating.'],
      ['Labs','Sodium 124 mEq/L, potassium 4.0, chloride 89, bicarbonate 23, glucose 90 mg/dL, BUN 9 mg/dL, creatinine 0.7 mg/dL. Measured serum osmolality 256 mOsm/kg.'],
      ['Urine','Urine osmolality 380 mOsm/kg, urine sodium 52 mEq/L. She has passed very little urine since morning.'],
      ['Microscopy','The lab ran her smear and, as a teaching slide, put her red cells in three solutions and photographed each. Slide A: 0.9% NaCl, cells biconcave and even. Slide B: 3% NaCl, cells shrunken with spiky margins. Slide C: distilled water, cells round and swollen, several burst, with pale ghosts in the background.'],
      ['Note','Given 100 mL of 3% saline over 10 minutes and admitted. She asks why she is being given salt water when she has been drinking water all day.']
    ],
    five:[
      'Draw Camila\'s three fluid compartments before practice and after, with the volume and osmolarity marked on each. Use arrows to show water moving between them, and say which compartment her 2.5 kg went into and which compartment made her confused.',
      'Camila drank only water and her sodium fell to 124. Explain how that happened in terms of what she lost in sweat, what she replaced it with, and why replacing only the water lowers her sodium concentration instead of bringing it back up.',
      'Look at the three microscopy slides from Camila\'s case. For each one, name the tonicity of the solution compared with the cell, say which way water moved and why, and name the one property of the solute that decides the answer every time.',
      'Camila is given 3% saline, not normal saline and not free water (plain water with no solute). Predict what each of those three fluids would do to the volume of her cells, and say why the one her team chose is the one that helps.',
      'Camila\'s urine osmolality is 380 mOsm/kg while her serum osmolality is 256. Say what a healthy kidney would do when serum osmolality is that low, say what her kidney is doing instead, and name the one measurement that would tell you whether her kidney itself is the problem or is being told to do this.'
    ],
    tracks:{
      nursing:{ data:'Camila\'s intake across the day was roughly 5 L of plain water by her own count. Her output was not measured, but she has urinated once since morning and describes it as a small amount. Her weight is up 2.5 kg from a documented preseason weight taken five weeks ago.',
        go:'weight is the most useful number on Camila\'s page, and nobody ordered it. Say how many liters her 2.5 kg gain represents and show the arithmetic. Then explain why gaining weight during a day of heavy sweating is a warning sign rather than a reassurance. Finally, say what you would chart for Camila every hour overnight and what number would make you call someone.' },
      medicine:{ data:'Sweat sodium in an athlete whose body has not yet adjusted to the heat (unacclimatized) runs roughly 40 to 60 mEq/L. Camila\'s measured serum osmolality is 256 mOsm/kg. Her osmolarity calculated from her labs is close to the measured value, so there is no osmolal gap (no meaningful amount of extra solute in Camila\'s blood beyond what her routine labs account for). Her urine osmolality is 380 mOsm/kg with a urine sodium of 52 mEq/L.',
        go:'calculate Camila\'s serum osmolarity from her labs and compare it with the measured 256. Then explain why her urine osmolality of 380 is the abnormal number here, rather than her sodium. Say what should be happening to ADH at a serum osmolality of 256, what is clearly happening instead, and why exercise plus vomiting explains it. Then say why correcting Camila\'s sodium too quickly is a danger of its own, and name what you would be watching for.' },
      radiology:{ data:'No imaging was ordered when Camila arrived. Her preseason DEXA showed 22% fat and 45.1 kg of lean soft tissue.',
        go:'Camila\'s brain sits inside a rigid skull that cannot expand. Say what a head CT would be looking for in a patient who is confused with a sodium of 124, and what the CT would physically be measuring. Then say why the CT can look normal while the problem in her cells is real. Finally, explain which of Camila\'s compartments DEXA can see her 2.5 kg in, and which it cannot.' },
      rt:{ data:'Camila is breathing 18 times a minute with a normal oxygen saturation. Her bicarbonate is 23. Red blood cells spend roughly one second passing through a capillary.',
        go:'Camila\'s red blood cells are the cells you can actually see in this case. Using Slide C, say what happens to the cell\'s ability to carry gases when a red cell swells and bursts, and say what the cell releases into the plasma when it does. Then explain why the biconcave shape on Slide A matters for how the cell works: name two things that shape gives a cell that has only one second to finish its work.' },
      exercise:{ data:'Camila trained in two sessions at 31 &deg;C (88 &deg;F) and sweated heavily through both. She was told to drink at every break, and she did. She ate nothing between sessions.',
        go:'Camila followed the advice she was given, and it harmed her. Write the advice you would have given her instead, in two sentences a seventeen year old would actually follow, and justify each sentence with physiology rather than with a rule. Then say what you would weigh, and when, to catch this in the next athlete before anyone becomes confused on the field.' }
    }
  },


  /* ---------------------------------------------------------- 3 */
  /* Sep 21 2026. Week 3 is a catch up week in the Fall 2026 schedule:
     nothing new opens and Week 2 stays unlocked. So this entry opens no
     new competencies. It is the same physiology as Week 2, transport,
     osmolarity, tonicity, cell volume and signaling, applied to a much
     harder case. The acid-base numbers on the page are handed over and
     explicitly left alone. */
  3: {
    title:'Catch Up on the Cell',
    date:'September 22, 0640', when:'Four days after the training room',
    encounter:'Arrival in the emergency department',
    tools:[
      ['Correcting a sodium for the glucose',
       'In Week 2 you saw water move between compartments when a solute pulls on it. Camila\'s glucose is exactly that kind of solute: it stays outside her cells and pulls water out of them. That water enters the extracellular space and dilutes everything already dissolved there, including sodium. So Camila\'s measured sodium of 128 is not telling you that she has lost sodium. It is telling you that water has moved, which is something you have already studied. The formula simply puts a number on a shift you can explain without it: <strong>corrected sodium = measured sodium + 1.6 &times; (glucose &minus; 100) &divide; 100</strong>, with glucose in mg/dL. Some sources use 2.4 rather than 1.6, and for Camila the two give results far enough apart to matter, which is why question 4 asks which one you used.',
       0],
      ['Why her bicarbonate is 4',
       'Bicarbonate is a solute in Camila\'s extracellular fluid, so it shows up on the same panel as everything else you are working with. It is low for a reason that belongs to a body system you have not studied yet: she is making acid faster than she can buffer it, and bicarbonate gets used up doing the buffering. That is all you need to know for now. Notice the number and leave it alone, because none of this week\'s questions depend on it.',
       15],
      ['Minute ventilation',
       'This is for the respiratory therapy prompt only, and it is a compartment question like every other one this week. Water that Camila loses through her airway is fluid leaving her extracellular space, and unlike her urine, it never shows up on the intake and output chart. To estimate that loss you need one term the course has not defined yet. Minute ventilation is simply how much air moves in and out of the lungs each minute: <strong>tidal volume &times; breaths per minute</strong>, where tidal volume is the size of one breath. Camila\'s is running at roughly four times normal.',
       13]
    ],
    arc:'This week brings no new topics, and neither does this entry. You will use the same five ideas you worked with last week: which solute cannot cross the membrane, which way water moves, what that does to cell volume, and what happens to a signal when there is no hormone on its receptor. Now you apply them to a much harder case. Four days ago Camila was confused on the field with a sodium of 124. This morning a teammate brought her in. Everything you need is either on this page or was on last week\'s.',
    chart:[
      ['Vitals','HR 128, BP 96/58, RR 32, temperature 36.4 &deg;C (97.5 &deg;F), SpO<sub>2</sub> 99% on room air. Weight 55 kg (121 lb), from 63.5 kg four days ago and 61 kg in August.'],
      ['Examination','Dry mucous membranes, skin tenting, sunken eyes. Drowsy but rousable. Breathing deeply and without effort. She has been passing very large volumes of urine and drinking constantly for about three weeks.'],
      ['Note','Estimated fluid deficit approximately 6 L. First liter of 0.9% sodium chloride started at 0655.']
    ],
    panels:[
      { name:'Basic metabolic panel', when:'September 22, 0645', rows:[
        ['Sodium (measured)','128','mEq/L','135 to 145','L'],
        ['Potassium','5.4','mEq/L','3.5 to 5.0','H'],
        ['Chloride','96','mEq/L','98 to 107','L'],
        ['Bicarbonate','4','mEq/L','22 to 29','LL'],
        ['Glucose','642','mg/dL','70 to 99','HH'],
        ['Blood urea nitrogen','34','mg/dL','7 to 20','H'],
        ['Creatinine','1.6','mg/dL','0.5 to 1.0','H']
      ]},
      { name:'Osmolality', when:'September 22, 0645', rows:[
        ['Serum osmolality (measured)','305','mOsm/kg','275 to 295','H'],
        ['Urine osmolality','320','mOsm/kg','no fixed range, read against serum','']
      ]}
    ],
    five:[
      'Name the compartments involved in Camila\'s case and say which solute is setting up the water gradient between them. Then say what property lets that solute set up a gradient at all.',
      'Predict which way water has moved between Camila\'s intracellular and extracellular compartments, and say what has happened to her cell volume. Then explain why Camila looks dry on the outside while one particular compartment inside her is also being pulled dry.',
      'Camila\'s glucose is 642 mg/dL, yet her cells have no fuel. Name the transporter that cannot reach the cell membrane without insulin, name two tissues that take up glucose without needing insulin, and explain how a bloodstream full of glucose and a starving muscle cell are two sides of the same problem.',
      'Correct Camila\'s sodium for her glucose. Say which correction factor you used, and note that more than one is in use. Then interpret her measured sodium of 128: say what it shows and what it cannot show.',
      'Name the one measurement that would change Camila\'s fluid plan in the next hour, and say what you would do differently if the result came back high and if it came back low.'
    ],
    tracks:{
      nursing:{ data:'Camila\'s orders: 0.9% sodium chloride, 1 L over the first hour, then reassess. Hourly urine output, hourly point of care glucose, and potassium every two hours. Nothing by mouth. Her documented weights are 61 kg in August, 63.5 kg four days ago, and 55 kg this morning.',
        go:'0.9% saline is isotonic to plasma, and Camila is profoundly hyperosmolar (her plasma is far too concentrated). Say which compartment the first liter will expand and roughly how much of it stays there. Explain why it is the right first step even though it does nothing to correct her osmolality. Then say what would go wrong if the first liter were 5% dextrose in water instead, and what Camila\'s three weights tell you that a single weight never could.' },
      medicine:{ data:'Camila\'s calculated osmolarity uses this formula: 2 &times; sodium plus glucose divided by 18 plus blood urea nitrogen divided by 2.8, with glucose and urea nitrogen in mg/dL. Effective osmolarity leaves out the urea term, because urea crosses cell membranes freely.',
        go:'calculate both Camila\'s total osmolarity and her effective osmolarity, and compare each with her measured 305. Then explain why urea is left out of the effective figure, using what "effective" has to mean for a solute to pull water across a membrane. Say which of the two numbers predicts her cell volume, and what the closeness of her calculated and measured values rules out.' },
      radiology:{ data:'No imaging was done when Camila arrived. A bedside ultrasound shows that her inferior vena cava (the large vein returning blood to the heart) collapses almost completely when she breathes in. Iodinated contrast, if it were given, would spread through plasma and interstitial fluid and would not enter cells.',
        go:'name the compartment that iodinated contrast marks out, and say why that makes it a marker of extracellular volume rather than total body water. Then use Camila\'s chart to argue whether she should have a contrast study this morning, based on her physiology rather than on protocol.' },
      rt:{ data:'Camila\'s respiratory rate is 32, and her breaths are deep and unlabored. Water lost through the airway without anyone noticing (insensible loss) rises with minute ventilation, and hers is roughly four times normal.',
        go:'Camila is losing water through her lungs faster than a healthy person does, and none of it shows up on the intake and output chart. Say what makes airway water loss unavoidable, what sets its rate, and roughly what fraction of a 6 L deficit it could account for over a day. Then say why that loss is pure water and what it does to Camila\'s plasma osmolality.' },
      exercise:{ data:'A hard match in the heat can cost an athlete 2 to 3 L of sweat, and sweat is hypotonic to plasma (less concentrated than plasma). Camila\'s losses over the last three weeks came from an osmotic diuresis, meaning the glucose in her urine pulled extra water out with it, so the fluid she lost is closer to half normal saline.',
        go:'both kinds of loss dehydrate a person, and both fluids are more dilute than plasma. Say what each loss does to plasma osmolality, and why. Then name the solute that raises plasma osmolality in a sweating athlete and the one that raises it in Camila, say which compartment gives up water first in each case, and predict what happens to cell volume in a dehydrated athlete compared with Camila this morning.' }
    }
  },

  /* ---------------------------------------------------------- 4 */
  /* Sep 21 2026. Week 4 in the new schedule is membrane potential,
     neurons and synapses. The old Week 4 potassium entry sits here, and
     the synapse half of the old Week 5 entry moved up to join it. */
  4: {
    title:'Membrane Potential, Neurons and Synapses',
    date:'September 22, 0700 to 1100', when:'The first four hours of treatment',
    encounter:'Resuscitation, hours 0 to 4',
    arc:'This week is about potassium and Camila\'s nervous system. When Camila arrives, the potassium in her blood is high. Four hours later it is low. Her body did not take in potassium and then lose it in those four hours. Most of the change is potassium moving between her blood and the inside of her cells, so the blood number on its own can fool you. At the same time, her nervous system is working hard. Her heart is racing, the blood vessels in her skin are squeezed shut, and her skin is dry. All three come from the same part of her nervous system, the sympathetic division, but it does not use the same chemical messenger and receptor for each job.',
    chart:[
      ['Potassium','0700: 5.4 mEq/L. 0900: 4.1. 1100: 3.1.'],
      ['ECG','0705: sinus tachycardia at 128, tall peaked T waves, QTc 410 ms. 1100: T waves flattened, U waves present.'],
      ['Autonomic examination','HR 128. Peripheries cool to the mid-forearm, capillary refill 4 seconds. Skin dry despite the tachycardia. Pupils 4 mm and reactive.'],
      ['Treatment','Insulin infusion started 0720. Fluids continuing. Potassium chloride added to the infusion at 1105 and the insulin rate reduced.'],
      ['Note','In a patient this sick with DKA, the body is usually short about 3 to 5 mEq of potassium for every kilogram of body weight. For her that is roughly 165 to 275 mEq missing, even though her first blood value was above the normal range.']
    ],
    panels:[
      { name:'Potassium series', when:'September 22', rows:[
        ['Potassium, 0700','5.4','mEq/L','3.5 to 5.0','H'],
        ['Potassium, 0900','4.1','mEq/L','3.5 to 5.0',''],
        ['Potassium, 1100','3.1','mEq/L','3.5 to 5.0','L'],
        ['Magnesium, 0700','1.6','mg/dL','1.7 to 2.4','L'],
        ['Phosphate, 0700','4.8','mg/dL','2.5 to 4.5','H']
      ]}
    ],
    five:[
      'Which ion is Camila\'s entry about this week? Across a resting cell membrane, which way does that ion tend to move, and why? What keeps its concentration difference in place, and what does that cost the cell?',
      'Predict what a blood potassium of 5.4 does to Camila\'s resting membrane potential. Then predict what 3.1 does. For each, say which way the resting potential moves, and say which one puts Camila in more danger at 1100.',
      'If Camila\'s cells stay partly depolarized, they become harder to fire, not easier. Explain why, one gate at a time, and name the channel state that causes it.',
      'Camila\'s heart is fast and the blood vessels in her skin are squeezed shut. For each one, name the neurotransmitter and the receptor involved, and explain how the same part of the nervous system can cause two different effects. Then look at Camila\'s dry skin. What does it tell you about her sympathetic nervous system, and what can it not tell you?',
      'What one lab result or event would make you stop Camila\'s insulin for now? Why is stopping it the right move, even though her blood sugar is still high?'
    ],
    tracks:{
      nursing:{ data:'The hospital protocol for Camila: if her potassium is below 3.3 mEq/L, stop the insulin and give potassium first. Check her potassium every two hours while the insulin is running. Keep her on a heart monitor the whole time.',
        go:'the protocol says to stop Camila\'s insulin, which feels like holding back treatment from a patient whose blood sugar is 642. Explain what insulin does to potassium that makes the protocol right. Then say which problem is more dangerous for Camila right now, the sugar or the potassium, and why the heart monitor (ECG) is what warns you.' },
      medicine:{ data:'Three things are affecting where Camila\'s potassium is: she has too little insulin, her blood is too acidic, and she has been making huge amounts of urine for days because of the sugar in it. Two of these move potassium out of her cells into her blood. One of them removes potassium from her body.',
        go:'name each of the three, say whether it moves potassium or removes it, and say which way it pushes Camila\'s blood potassium number. Then explain how Camila can have high potassium in her blood while her body is badly short of potassium overall, and say which of those two the treatment will change first.' },
      radiology:{ data:'There is nothing to image in Camila\'s case. But an ECG is a lot like imaging: it records a signal from the body surface that has traveled through tissue to get there.',
        go:'say what an ECG actually records, keeping in mind that it is not the action potential of one cell. Explain how the electrical activity of many heart cells adds up and spreads through the body to reach the skin. Then say why the T wave, which shows the heart repolarizing, is the first part of the ECG that potassium changes. Finally, name one thing the ECG cannot tell you about Camila\'s potassium.' },
      rt:{ data:'Camila\'s blood pH on arrival was 7.09, which is very acidic. When the acid is corrected, either by breathing it off or by clearing it, potassium moves back into cells. Breathing 32 times a minute, she is already doing part of that on her own.',
        go:'name the exchange that links hydrogen ions and potassium across the cell membrane, and say which way each one moves as Camila\'s pH rises. Then say what would happen to her potassium if someone sedated her, put her on a ventilator, and set it to breathe only 14 times a minute, and why that would be one of the most dangerous things to do to Camila this morning.' },
      exercise:{ data:'In a healthy athlete, unlike Camila this week, blood potassium rises during hard exercise, sometimes to 6 mEq/L or higher, and goes back to normal within minutes of stopping. Most of the extra comes out of the working muscles, and most of the recovery is the muscles taking it back in.',
        go:'the same number that is an emergency in Camila is normal in a sprinter. Explain where the potassium comes from during exercise, which pump takes it back, and why it recovers so fast. Then say what is different about Camila that makes 5.4 dangerous, using how long it lasts and how much potassium her body holds overall.' }
    }
  },

  /* ---------------------------------------------------------- 5 */
  /* Sep 21 2026. New entry. Week 5 in the new schedule is reflexes and
     the senses, un-merged and the heaviest week of Part 2. The reflex
     half of the old Week 5 entry is here; the synapse half moved to
     Week 4. Her blurred vision is the sensory spine of the week and it
     resolves without treatment, which is the point. */
  5: {
    title:'Reflexes, and Sensing the World',
    date:'September 22 and 23, and October 20', when:'The first morning, the next day, and four weeks later',
    encounter:'Neurological, reflex and sensory assessment',
    arc:'This week Camila\'s chart shows three automatic processes in her body, and none of them needed a doctor to make them happen. One protects her brain, one defends her blood pressure, and one changed the shape of the lens in her eye. Nobody noticed that last change until she stopped wearing her contact lenses. Two of the three recover on their own, and the question for you is what you would need to measure to tell which two.',
    chart:[
      ['Conscious level','0640: Camila\'s Glasgow Coma Scale was 13 (eyes 3, verbal 4, motor 6). She was drowsy, oriented to person and place but not to time. 1000: GCS 14 (eyes 4, verbal 4, motor 6). Her eyes were open on their own, but she was still unsure of the time. 1400: GCS 15 (eyes 4, verbal 5, motor 6), fully oriented.'],
      ['Reflexes, September 22','Patellar 1+ and ankle 1+, symmetric, at 0640; 2+ and symmetric by 1400. Plantar response flexor throughout. Pupils 4 mm, brisk and equal.'],
      ['Sensory testing, September 22','Light touch and vibration intact at both great toes. A 10 g monofilament was felt at all nine sites on each foot.'],
      ['Sitting up, 0740','On arrival at 0640, Camila\'s heart rate was 128 and her blood pressure 96/58. At 0740, still lying flat (supine), they were the same: 96/58 with HR 128. At one minute sitting 78/44 with HR 138. She felt faint and was laid flat. From 0640 to 1400 she took nothing by mouth, received 5,000 mL of intravenous fluid, and passed 980 mL of urine; nothing else was measured out. Lying flat, her heart rate was 112 at 1000. At 1400 it was 96, with a blood pressure of 108/62.'],
      ['Vision','She reports that everything has looked soft for about two weeks and that she stopped wearing her contact lenses because they were not helping. Bedside distance acuity September 22: 20/60 both eyes. October 20: 20/20 both eyes, same prescription, no treatment given to her eyes.'],
      ['Breathing','RR 32, deep and regular, unchanged through the morning. By 1400 it had slowed to 24.'],
      ['The osmolality order, 0700','The team ordered that Camila\'s plasma osmolality fall by no more than about 3 mOsm/kg per hour. While her plasma stayed concentrated over the past three weeks, her brain cells added solute of their own so they would not shrink, and they cannot clear that solute in an hour. Lowering her osmolality slowly gives them time to catch up. This is the usual explanation for the order, although researchers still debate everything that causes brain swelling during treatment.']
    ],
    panels:[
      { name:'Bedside sensory and reflex testing', when:'September 22, 0810', rows:[
        ['Patellar reflex, both sides','1+','','2+ is the usual normal','L'],
        ['Ankle reflex, both sides','1+','','2+ is the usual normal','L'],
        ['Plantar response','flexor','','flexor',''],
        ['Vibration, 128 Hz at both great toes','felt','','felt',''],
        ['10 g monofilament, 9 sites per foot','felt at 9 of 9','','felt at 9 of 9',''],
        ['Distance acuity, both eyes','20/60','','20/20','L'],
        ['Pupil size and reaction','4 mm, brisk and equal','','2 to 5 mm, brisk','']
      ]},
      { name:'Chemistry from the first day', when:'September 22', rows:[
        ['Glucose, 0645','642','mg/dL','70 to 99','HH'],
        ['Glucose, 0900','486','mg/dL','70 to 99','HH'],
        ['Glucose, 1100','372','mg/dL','70 to 99','H'],
        ['Glucose, 1800','198','mg/dL','70 to 99','H'],
        ['Serum osmolality (measured), 0645','305','mOsm/kg','275 to 295','H'],
        ['Arterial pH, 0645','7.09','','7.35 to 7.45','LL'],
        ['PaCO<sub>2</sub>, 0645','14','mmHg','35 to 45','LL'],
        ['Bicarbonate, 0645','4','mEq/L','22 to 29','LL']
      ]}
    ],
    five:[
      'Name the five parts of a reflex arc. Then map Camila\'s pupillary light reflex onto those five parts, naming the actual structure at each step. Finally, when you shine a light in one of her eyes and watch the other eye, which part of the arc are you testing?',
      'When Camila sat up, her blood pressure fell from 96/58 to 78/44 and her heart rate rose by 10. Name the reflex that should have prevented that fall, and name its sensor and where that sensor sits. Then explain why the response you can see on this page was not enough.',
      'Camila\'s distance vision was 20/60 on September 22 and 20/20 four weeks later, with no change in her prescription and nothing done to her eyes. Explain how this happened using what you know about water moving toward solute, and name the structure in her eye that changed shape. Then explain why the change took weeks to reverse even though her glucose came down in hours.',
      'Camila\'s reflexes were graded 1+ at 0640 and 2+ at 1400. Explain what that change shows and what it cannot show.',
      'Name the one sensory test you would add today that would change what you tell Camila about the next twenty years. Then explain what a normal result would rule out and what it would not.'
    ],
    tracks:{
      nursing:{ data:'The Glasgow Coma Scale is scored from three separate observations: eye opening out of 4, best verbal response out of 5, and best motor response out of 6. Camila scored E3 V4 M6 at 0640.',
        go:'The Glasgow Coma Scale is a set of reflexes and responses. It does not measure consciousness directly. For each of its three parts, say whether you are testing a sensory pathway, a motor pathway, or the brain\'s integration of the two. Then explain what Camila\'s E3 V4 M6 tells you that a total of 13 on its own does not, and name a different combination that also adds up to 13 but would worry you far more.' },
      medicine:{ data:'Large myelinated fibers carry vibration and light touch, and they conduct at roughly 35 to 75 m/s. Small, thinly myelinated and unmyelinated fibers carry pain and temperature, and they conduct at roughly 0.5 to 30 m/s. Nerve conduction studies record only the large fibers, and the monofilament test Camila had also tests the large fibers. Camila\'s symptoms recorded before this admission: about three weeks of passing very large volumes of urine and drinking constantly, and about two weeks of everything looking soft.',
        go:'Camila\'s monofilament and vibration tests are normal today, and a nerve conduction study would be normal too. Explain exactly what those normal results do and do not rule out, and name the group of nerve fibers that neither test can detect. Then say which of her symptoms over the last three weeks, if any, could already have been a small fiber symptom, and write the question you would ask Camila to find out.' },
      radiology:{ data:'An ocular B-scan ultrasound directly measures the length of the eye from front to back (axial length) and the thickness of the lens, in millimeters. Refractive error, the focusing error that glasses or contacts correct, is worked out from those measurements plus the curve of the cornea. No imaging test measures visual acuity, which is how clearly Camila can read an eye chart.',
        go:'Describe what an ocular ultrasound would physically measure in Camila\'s eye on September 22 and again on October 20, and predict the difference between the two. Then, of the two numbers, Camila\'s acuity and the lens thickness an ultrasound would report, say which is a direct measurement and which is an inference. Use that to explain why her prescription was the wrong thing to change in September.' },
      rt:{ data:'Central chemoreceptors in the medulla respond to the pH of cerebrospinal fluid. Peripheral chemoreceptors in the carotid and aortic bodies respond to the oxygen, carbon dioxide and hydrogen ion levels in arterial blood. Hydrogen ions cross the blood brain barrier poorly, but carbon dioxide crosses it freely. On arrival Camila\'s arterial pH was 7.09, her PaCO<sub>2</sub> was 14 mmHg, and her respiratory rate was 32.',
        go:'Camila\'s drive to breathe is enormous, but the acid causing it mostly cannot get into the cerebrospinal fluid that the central chemoreceptors sample. Say which group of chemoreceptors is doing most of the work here, and why. Then say what happens to the central chemoreceptor drive over the next few hours as her acid clears and her carbon dioxide rises back toward normal, and what that predicts about her respiratory rate as she is treated.' },
      exercise:{ data:'Before Camila got sick, she could balance on one leg with her eyes closed for over 30 seconds. That was recorded at her preseason physical. On hospital day 2, September 23, she managed 4 seconds.',
        go:'Name the three sensory systems that keep a person upright, and say what each one contributes. Then say which one closing your eyes removes, and use Camila\'s 4 seconds to argue which of the other two is most likely impaired. Name the bedside test that would tell those two apart, and say what you would expect it to show in Camila.' }
    }
  },

  /* ---------------------------------------------------------- 6 */
  6: {
    title:'Muscle, and How Movement Gets Commanded',
    date:'September 25 to November 20', when:'Hospital day 4 through about eight weeks after discharge',
    encounter:'Mobility assessment and follow-up',
    arc:'Camila is out of danger now, but she cannot get up from a chair without pushing off with her arms. Three weeks of catabolism (her body breaking down its own tissue, muscle included, for fuel) and four days in bed have cost her more strength than she expected. As she recovers, her strength comes back before her muscle size does. That tells you the nerve signal that drives the muscle and the muscle itself recover on different schedules.',
    chart:[
      ['Day 4 assessment','Stands from a chair slowly, using both arms. Walks 40 m with a frame, limited by fatigue rather than breathlessness. Grip strength 22 kg on the right; 32 kg at the preseason physical. Vital signs on day 4: HR 88, BP 112/68, RR 16, temperature 36.9 &deg;C (98.4 &deg;F), SpO<sub>2</sub> 98% on room air, weight 56.5 kg (125 lb). Alert and oriented, GCS 15.'],
      ['Motor examination','Power 4 out of 5 in hip flexion and knee extension, 5 out of 5 at the ankle and in the hands. Tone normal. Reflexes 2+ and symmetric. No fasciculation. Sensation intact.'],
      ['Body composition','Repeat DEXA October 10: lean soft tissue 41.2 kg, from 45.1 kg in August.'],
      ['October 10','Walking normally. Grip 27 kg. Reports that stairs are the thing that still tells her she was ill. HR 72, BP 110/70, weight 58 kg (128 lb).'],
      ['November 20','Grip 31 kg. Repeat DEXA lean soft tissue 43.1 kg. HR 62, BP 110/66, weight 59 kg (130 lb).']
    ],
    panels:[
      { name:'Muscle chemistry', when:'September 25', rows:[
        ['Creatine kinase','340','U/L','30 to 190','H'],
        ['Urine myoglobin','not detected','','not detected',''],
        ['Potassium','4.0','mEq/L','3.5 to 5.0',''],
        ['Calcium (corrected)','9.1','mg/dL','8.5 to 10.2',''],
        ['Phosphate','3.2','mg/dL','2.5 to 4.5','']
      ]}
    ],
    five:[
      'Name every link in the chain from the motor cortex to a crossbridge. Then say where in that chain Camila\'s weakness sits, and explain what evidence in her chart rules each of the other links in or out.',
      'Predict what has happened to Camila\'s maximal force and to her endurance, one at a time, and say whether the two had to change by the same amount.',
      'Explain excitation contraction coupling in Camila\'s muscle, from the moment the action potential arrives at the muscle fiber to the crossbridge, naming the structures and the ion movements. Then say which step is limited when there are simply fewer crossbridges available.',
      'Camila\'s grip strength is 22 kg, against a baseline of 32 kg. Explain what that comparison shows and what it cannot show.',
      'Name the one measurement that would tell you whether Camila has lost muscle or has lost the ability to activate the muscle she still has. Then say what each result would mean.'
    ],
    tracks:{
      nursing:{ data:'Camila\'s sit to stand test was recorded as 4 repetitions in 30 seconds, when 18 would be expected for her age. Her falls risk score is elevated. She is embarrassed and keeps trying to walk to the bathroom without help.',
        go:'The sit to stand test looks like an everyday task, but it is a real physiological measurement. Say what it is actually measuring in Camila, and which muscle groups and which energy system it works. Then explain why fatigue, rather than breathlessness, is what limits her, and what that one word in her chart tells you about where her problem is not.' },
      medicine:{ data:'Camila\'s creatine kinase (an enzyme released from damaged muscle) is 340 U/L, which is mildly raised. Critical illness myopathy, disuse atrophy and a neuropathy would all cause weakness. They are told apart by the pattern of weakness, how it develops over time, and electrical testing of nerve and muscle. Her weakness is proximal (closest to the trunk), her reflexes are 2+ and her sensation is intact.',
        go:'Take the three explanations one at a time and say what each predicts for Camila\'s reflexes, sensation, creatine kinase, and the pattern of her weakness. Then use her chart to rank them, and name the one test that would have settled it if her weakness had not gone away.' },
      radiology:{ data:'In critical care, ultrasound of the cross sectional area of the rectus femoris, a front thigh muscle, is used to track muscle mass at the bedside. Camila\'s repeat DEXA showed that she had lost 3.9 kg of lean soft tissue.',
        go:'DEXA reports lean soft tissue, and ultrasound reports a cross sectional area. Say what each one actually measures and what has to be assumed to turn either result into "muscle". Then explain why Camila\'s 3.9 kg loss of lean tissue does not mean a proportional loss of force, and say which direction the error runs.' },
      rt:{ data:'Camila\'s maximal inspiratory pressure is 48 cmH<sub>2</sub>O, when a value above about 80 would be expected for her. Her peak cough flow is reduced. She can clear her secretions, but she says a deep breath takes effort.',
        go:'The diaphragm is skeletal muscle, and Camila\'s diaphragm wasted along with the rest of her muscles. Say what maximal inspiratory pressure measures and which muscles generate it. Then explain the three phases of a cough, say which phase a weak expiratory (breathing out) effort ruins, and use that to explain why respiratory muscle weakness shows up as trouble clearing secretions before it shows up as a gas exchange problem.' },
      exercise:{ data:'By November, Camila\'s grip is back to 31 kg, while her lean mass is still 2 kg below her baseline. Early strength gains after a muscle is loaded again come largely from neural adaptation, meaning changes in how the nervous system drives the muscle, rather than from new contractile protein.',
        go:'Camila\'s strength came back faster than her muscle did. Name the two kinds of adaptation involved and say what each one changes. Then explain what neural adaptation means mechanically, in terms of motor unit recruitment and firing rate, and say what that predicts about how soon she can safely return to contact training.' }
    }
  },

  /* ---------------------------------------------------------- 7 */
  /* Sep 21 2026. Week 7 in the new schedule carries hormones, the
     autonomic system and reproduction in one week, so the old Week 7
     endocrine entry and the old Week 8 reproductive entry are merged
     here and an autonomic strand added. The energy availability numbers
     sit in the chart rather than in one track, because three of the
     five questions lean on them. */
  7: {
    title:'Hormones, the Autonomic System and Reproduction',
    date:'September 22 to December 5', when:'Admission through the eleven week clinic visit',
    encounter:'Endocrine, autonomic and reproductive follow-up',
    arc:'This is the entry where Camila\'s diagnosis is actually made, and where the hormones that made her so sick are named. It is also where a thyroid result changes twice even though her thyroid was never the problem. And it is where a period that stopped in August turns out to be a signal from her hypothalamus that she has been eating too little for how hard she trains.',
    chart:[
      ['Diagnostic','C-peptide less than 0.1 ng/mL, far below the bottom of a typical fasting reference range (about 0.8 ng/mL; ranges vary by laboratory). GAD-65 antibodies positive. Islet antigen 2 antibodies positive. Diagnosis: type 1 diabetes.'],
      ['Stress hormones, on arrival','Cortisol 32 &micro;g/dL (a typical morning reference range is about 5 to 25; ranges vary by laboratory). Glucagon elevated. Catecholamines not measured but clinically evident: heart rate 128, blood pressure 96/58, cool peripheries, capillary refill 4 seconds. Temperature 36.4 &deg;C (97.5 &deg;F).'],
      ['Thyroid','Sep 22: TSH 0.8 mIU/L, free T4 1.0 ng/dL, free T3 low. Sep 28: TSH 6.2. Nov 3: TSH 2.1, free T4 1.1, free T3 normal. No thyroid treatment was given at any point.'],
      ['Reproductive history','Last menstrual period August 30, regular before that. No pregnancy possible. Menses returned November 28.'],
      ['Energy availability, October 20','Reported intake about 1,900 kcal/day. Training cost about 800 kcal/day. Lean mass 41.2 kg. Below roughly 30 kcal per kg of lean mass per day, GnRH pulses are reliably suppressed in study conditions.'],
      ['Autonomic testing, November 3','Resting HR 68. Supine 118/72 with HR 68; standing at one minute 114/76 with HR 84. Beat to beat heart rate variation with deep breathing preserved. For comparison, on September 22 Camila was sat up rather than stood: lying flat 96/58 with HR 128, and at one minute sitting 78/44 with HR 138. Other vital signs lying down: RR 14, temperature 36.7 &deg;C (98.1 &deg;F), SpO<sub>2</sub> 99% on room air. Weight 58.5 kg (129 lb).'],
      ['Treatment','Insulin infusion, then transitioned to basal and bolus insulin before discharge. Seen in clinic December 5: HR 64, BP 112/70, weight 59 kg (130 lb).']
    ],
    panels:[
      { name:'Reproductive axis', when:'October 20', rows:[
        ['Follicle stimulating hormone','2.4','IU/L','3.5 to 12.5 (follicular)','L'],
        ['Luteinizing hormone','1.8','IU/L','2.4 to 12.6 (follicular)','L'],
        ['Estradiol','18','pg/mL','30 to 100 (follicular)','L'],
        ['Prolactin','11','ng/mL','4 to 23','']
      ]},
      { name:'Pelvic ultrasound', when:'October 20', rows:[
        ['Endometrial thickness','3','mm','8 to 12 before ovulation','L'],
        ['Largest follicle','7','mm','18 to 24 when dominant','L'],
        ['Ovarian volume, right','6.2','mL','3 to 10',''],
        ['Ovarian volume, left','5.8','mL','3 to 10','']
      ]}
    ],
    five:[
      'Name each hormone in Camila\'s entry, the tissue it acts on, and whether its receptor sits on the cell surface or inside the cell. Then explain what that receptor location predicts about how quickly each hormone can change anything.',
      'Adrenaline appears in Camila\'s chart in two roles, as a hormone and as the end of a nerve pathway. Draw the sympathetic pathway to her heart and the sympathetic pathway to her adrenal medulla side by side, naming every transmitter and receptor. Explain what is structurally different about the second pathway, and why that difference makes one effect fast and local and the other slower and felt throughout the body.',
      'Predict which way Camila\'s glucagon, cortisol, growth hormone and adrenaline each moved when she arrived, and explain why they all moved in the same direction at once. Then name what was missing from the loop that would normally have limited them.',
      'Interpret Camila\'s October reproductive panel: FSH 2.4, LH 1.8, low estradiol, and normal ovaries on ultrasound. Say what it shows and what it cannot show. Then compare it point by point with a panel that shows high FSH and low estradiol.',
      'Name the one measurement that would change Camila\'s insulin plan in the next month, and say what you would do if the result were high and what you would do if it were low.'
    ],
    tracks:{
      nursing:{ data:'Before discharge, Camila is taught basal and bolus insulin dosing, along with how to recognize and treat hypoglycemia (low blood sugar). She asks why she needs two different insulins.',
        go:'Answer Camila\'s question with physiology, not with the steps of a procedure. Say what a healthy pancreas does between meals and what it does after a meal, and name which of those two jobs each insulin replaces. Then say what would happen if she took only the basal insulin, and what would happen if she took only the bolus, and explain why the two failures look completely different.' },
      medicine:{ data:'C-peptide is cut from proinsulin in a one to one ratio with insulin, and it is not present in injected insulin. Camila\'s thyroid results moved from TSH 0.8 with a low free T3 on September 22, to TSH 6.2 on September 28, to TSH 2.1 with everything normal on November 3. She had no thyroid treatment at any point.',
        go:'Explain what C-peptide is, where it comes from, and why it separates Camila from a patient with type 2 diabetes who takes insulin. Then read her three thyroid panels as one sequence and say what was happening to the thyroid axis at each point. Say whether her thyroid was ever the problem, and name what would have gone wrong if someone had treated the TSH of 6.2.' },
      radiology:{ data:'Camila\'s endometrium (the lining of the uterus) is 3 mm thick. She has several follicles of 4 to 7 mm, and none is dominant. In a normal cycle, the endometrium reaches roughly 8 to 12 mm before ovulation, and a dominant follicle reaches about 18 to 24 mm.',
        go:'Camila\'s ultrasound works like a hormone test done with sound waves. Say what her 3 mm endometrium tells you about how much estradiol she was exposed to over the previous weeks, and what the absence of a dominant follicle tells you about her FSH. Then say what normal looking ovaries rule out, and be precise about what they do not rule out.' },
      rt:{ data:'Progesterone stimulates breathing. In the luteal phase of a normal cycle (the part of the cycle after ovulation), like the cycles Camila had before August, resting PaCO<sub>2</sub> is typically 2 to 4 mmHg lower than in the follicular phase, and it falls further in pregnancy.',
        go:'Camila has had no luteal phase since August, so she has had no progesterone. Predict what that does to her resting PaCO<sub>2</sub> and to her breathing response to carbon dioxide, and say where in the body progesterone acts to produce that effect. Then say what will change in her blood gas once her cycles return, and why that matters whenever you interpret a single blood gas from any menstruating patient.' },
      exercise:{ data:'Energy availability is the energy taken in from food minus the energy spent in exercise, expressed per kilogram of lean mass. Camila\'s October figures are in the chart above.',
        go:'Calculate Camila\'s energy availability in October and say whether it is above or below the threshold given in the chart. Then explain why the reproductive axis is one of the first systems to be suppressed when energy is short and one of the last to recover. Finally, say what the return of her period on November 28 tells you about what she was eating in the weeks before it.' }
    }
  },

  /* ---------------------------------------------------------- 8 */
  /* Sep 21 2026. New entry. Week 8 is Midterm 1 week: it opens no new
     competencies, the exam covers Weeks 1 to 7, and nothing new should
     land on a student that week. So this entry closes Camila's file
     instead. Every question is cumulative and answerable only from the
     seven entries already done, which makes it review that counts. */
  8: {
    title:'Closing Camila\'s File',
    date:'December 5', when:'Eleven weeks after discharge, reading the whole file',
    encounter:'Discharge summary and case closure',
    arc:'This is Midterm 1 week, so nothing new opens and no new material is asked of you. This entry is your review. You have seven chart entries about Camila, and this time you read them together as the story of one person. Then you hand her over, because in Week 10 you pick up a patient who is nothing like her.',
    chart:[
      ['Discharge summary, September 22 to September 27','Admitted with new type 1 diabetes and a severe metabolic disturbance. Treated with intravenous fluid, an insulin infusion and potassium replacement. Transitioned to basal and bolus insulin on day 4. Discharged on day 6, walking with a frame, on once nightly basal insulin (glargine) with mealtime bolus doses (lispro).'],
      ['Where she is on December 5','Weight 59 kg (130 lb), against 61 kg in August and 55 kg on arrival. Grip 31 kg against 32 kg in August. Menses returned November 28. Cleared for full training November 25, playing again since December 1.'],
      ['The numbers that have not gone back','Lean soft tissue 43.1 kg against 45.1 kg in August. C-peptide still undetectable, and it will stay that way.'],
      ['What she says','That the week she cannot remember is the part that frightens her, and that she wants to know whether it will happen again.'],
      ['Vital signs at three visits','August 12 preseason physical: HR 52, BP 108/64, RR 12, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 99% on room air, weight 61 kg (134 lb). September 22 arrival: HR 128, BP 96/58, RR 32, temperature 36.4 &deg;C (97.5 &deg;F), SpO<sub>2</sub> 99% on room air, weight 55 kg (121 lb), GCS 13. December 5 clinic: HR 64, BP 112/70, RR 14, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 99% on room air, weight 59 kg (130 lb), GCS 15.']
    ],
    panels:[
      { name:'December 5 review panel', when:'December 5', rows:[
        ['Sodium','140','mEq/L','135 to 145',''],
        ['Potassium','4.3','mEq/L','3.5 to 5.0',''],
        ['Chloride','104','mEq/L','98 to 107',''],
        ['Bicarbonate','25','mEq/L','22 to 29',''],
        ['Glucose (fasting)','118','mg/dL','70 to 99','H'],
        ['Creatinine','0.8','mg/dL','0.5 to 1.0',''],
        ['Hemoglobin A1c','7.1','%','under 5.7 (non-diabetic)','H'],
        ['Hemoglobin','13.1','g/dL','12.0 to 15.5',''],
        ['Hematocrit','39','%','36 to 46','']
      ]}
    ],
    five:[
      'Pick any three entries from Camila\'s Weeks 1 to 8 and name one regulated variable in each. For each one, name the sensor, the integrator and the effector. Then say whether the loop failed, was overwhelmed, or worked correctly but was misread by the people looking at it.',
      'Camila\'s potassium was 5.4 while her total body potassium was depleted by roughly 200 mEq. Her measured sodium was 128 while her corrected sodium was 137. Her serum was full of glucose while her muscle cells had no fuel. Name the single idea all three share, and explain what it means for how you read any number on any chart.',
      'Trace one molecule of glucose from Camila\'s bloodstream on September 22 to the inside of a muscle cell, and say exactly where the journey stops. Then trace the same molecule on December 5 and say what is now doing the job of the missing step.',
      'Interpret Camila\'s file as a whole. Say what seven entries about one patient showed you that seven entries about seven different patients could not have, and say what a file like this one cannot show.',
      'Name the one measurement you would have added to Camila\'s August preseason physical, and say what question it would have let you answer in October.'
    ],
    tracks:{
      nursing:{ data:'Camila is being discharged from the clinic back to routine care. Your handover goes to a nurse who has never met her and will see her every three months.',
        go:'Write the handover for Camila, and write it as physiology rather than as a list of events. Name the three things about her that will still be true in a year, the two that were true only while she was in the hospital, and the one early warning sign you would want that nurse to act on without waiting for a clinic appointment. Back up each one with a number from her file.' },
      medicine:{ data:'At the close of Camila\'s file, her problem list has active problems, resolved problems, and one that was never a problem at all.',
        go:'Write Camila\'s problem list. For each entry, say the week you could first have named it, the evidence that named it, and whether it is active, resolved, or was never a problem. Then answer the question she actually asked, whether this will happen again, in three sentences, and make sure every clinical claim in those sentences can be traced to a number in her file.' },
      radiology:{ data:'Across her whole file, Camila had a screening ECG in August, two ECGs on the morning she arrived, a bedside ultrasound of her inferior vena cava that same morning, three DEXA scans (August, October 10 and November 20), one pelvic ultrasound, and no cross sectional imaging, such as CT or MRI, at all.',
        go:'Name the one study in Camila\'s whole file that actually changed what was done for her, and defend your choice. Then name the study that came closest to being unnecessary, and say what question it was answering that a number already on the chart had answered first. Finish by naming one study that was not done and should have been, or say plainly that there is none.' },
      rt:{ data:'Camila arrived breathing 32 times a minute, deeply and without effort, with a normal oxygen saturation. Nobody had to do anything to manage her airway at any point in the admission.',
        go:'Camila\'s breathing was the most obvious abnormal sign when she arrived, and it needed no treatment. Explain why, and be precise about what her breathing was accomplishing. Then say exactly what would have had to change, in her numbers or in her muscles, for her respiratory rate of 32 to become the reason to intubate her, and name the measurement that would have caught that change first.' },
      exercise:{ data:'Camila was cleared for full training on November 25 and played her first match on December 1. Her lean mass is still 2 kg below her August value, and she now has to dose insulin around her training.',
        go:'Write Camila\'s return to play decision the way a physiologist would, not as a form to fill in. Name the three systems you cleared, the evidence in her file for each one, and the one system that is still not back. Then explain what changes permanently about her exercise physiology now that the hormone controlling fuel release has to be injected instead of secreted by her pancreas.' }
    }
  },

  /* ============================================================
     PATIENT B, Dale Whitcomb, Weeks 9 to 15.

     He arrives in Week 9 because Weeks 9 to 14 are the integrated
     systems and a patient with one thing wrong cannot teach them.
     His baseline is the March clinic visit, which is his equivalent
     of Camila's preseason physical: the column every later column
     gets compared to.

     Story dates: he arrives on November 4. Day 1 is November 4 and
     Day 15 is November 18. The weeks are not read in date order.
     ============================================================ */

  /* ---------------------------------------------------------- 9 */
  9: {
    title:'The Heart as a Pump',
    date:'March 10, and November 4 at 0840', when:'His last well clinic visit, and the morning he arrived',
    encounter:'Emergency department, arrival',
    tools:[
      ['Why his lactate is 4.6',
       'Dale\'s lactate is on this page because it is the quickest way to answer the main question of this week: is his heart pumping enough blood to meet what his tissues need? When oxygen delivery falls behind demand, cells make ATP by a pathway that ends in lactate, so lactate builds up in the blood. That is all you need from it this week, and one question uses it that way. Where the acid that comes with lactate goes, and why that is still debated, comes in Week 15.',
       15],
      ['Reading stroke volume off an echocardiogram',
       'The echocardiogram cannot see a volume of blood in Dale\'s heart. It measures the diameter of the outflow tract, the channel just below the aortic valve, and that diameter gives an area. It also measures how far the column of blood moves through that area in one beat. Area times distance gives a volume, and that volume is the stroke volume. The result is written on the chart below, so you do not have to do the geometry yourself. The key point this week is that stroke volume is a measured amount of blood, while ejection fraction is a ratio (the fraction of the blood in the ventricle that is pumped out), so the two are different kinds of numbers.',
       0],
      ['Why his bicarbonate is 15 and his pH is 7.32',
       'Two of the values on Dale\'s chemistry panel belong to a system you study in Week 15. Notice them, but leave them alone for now, because nothing you do this week depends on them.',
       15]
    ],
    arc:'Dale has lived with a weak heart for six years and has built his life around it. Then he got an infection, and an infection asks the heart to pump more blood, which Dale\'s heart has no extra capacity to give. The tricky part of this page is that his cardiac output reads normal. Compare it with what a man with a temperature of 38.9 &deg;C (102.0 &deg;F) should be pumping and you will see it is not normal at all. Two numbers on this page show you that.',
    chart:[
      ['Baseline, March 10 clinic','HR 64, BP 118/70, RR 16, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 96% on room air. Weight 88 kg (194 lb), height 178 cm (5 ft 10 in). Echocardiogram: ejection fraction 30%, left ventricle dilated. He walks his dog twice a day and stops once on the hill.'],
      ['November 4, 0840, arrival','Four days of cough and fever, one day of confusion. Brought in by his daughter. HR 118, BP 82/46, RR 28, temperature 38.9 &deg;C (102.0 &deg;F), SpO<sub>2</sub> 88% on room air and 93% on 6 L by nasal cannula. Weight 91 kg (201 lb).'],
      ['Examination','Confused but rousable. Knees mottled, capillary refill 4 seconds, hands cold to the wrist. Crackles at the right base and through the right mid-zone. Jugular venous pressure raised 8 cm above the sternal angle. Third heart sound present. Pitting edema to mid-shin.'],
      ['ECG, 0845','Sinus tachycardia at 118. Q waves in V1 to V4, unchanged from March. No ST elevation.'],
      ['Bedside echocardiogram, 0920','Ejection fraction 25%. Left ventricular internal diameter in diastole 62 mm. Stroke volume 42 mL at a heart rate of 118, so cardiac output 4.9 L/min. Body surface area 2.1 m<sup>2</sup>. Inferior vena cava 2.3 cm with almost no change through the respiratory cycle. Central venous pressure 14 mmHg.'],
      ['Note','He took his morning carvedilol at 0700, before his daughter found him confused.']
    ],
    panels:[
      { name:'Chemistry', when:'November 4, 0850', rows:[
        ['Sodium','132','mEq/L','135 to 145','L'],
        ['Potassium','5.1','mEq/L','3.5 to 5.0','H'],
        ['Chloride','98','mEq/L','98 to 107',''],
        ['Bicarbonate','15','mEq/L','22 to 29','L'],
        ['Glucose','268','mg/dL','70 to 99','H'],
        ['Blood urea nitrogen','48','mg/dL','7 to 20','H'],
        ['Creatinine','2.6','mg/dL','0.7 to 1.3','H'],
        ['Albumin','2.9','g/dL','3.5 to 5.0','L']
      ]},
      { name:'Cardiac and perfusion markers', when:'November 4, 0850', rows:[
        ['Troponin T (high sensitivity)','68','ng/L','under 14','H'],
        ['B-type natriuretic peptide','1,840','pg/mL','under 100 (his March value was 480)','H'],
        ['Lactate','4.6','mmol/L','0.5 to 2.0','H'],
        ['Central venous oxygen saturation','52','%','70 to 80','L']
      ]},
      { name:'Arterial blood gas, on 6 L nasal cannula', when:'November 4, 0855', rows:[
        ['pH','7.32','','7.35 to 7.45','L'],
        ['PaCO<sub>2</sub>','30','mmHg','35 to 45','L'],
        ['PaO<sub>2</sub>','62','mmHg','80 to 100','L'],
        ['Bicarbonate','15','mEq/L','22 to 26','L'],
        ['SaO<sub>2</sub>','92','%','95 to 100','L']
      ]}
    ],
    five:[
      'Cardiac output depends on four factors. Name them, and for each one say which number on Dale\'s chart reports it and which way it has moved since his March visit.',
      'Dale\'s cardiac output is 4.9 L/min, which is inside the normal adult range. Estimate what it should be in a 68 year old man with a temperature of 38.9 &deg;C (102.0 &deg;F) and an infection, and show where your estimate comes from. Use the difference between the two to say whether his heart is keeping up. Then name the two numbers on this page that show it is not keeping up.',
      'Explain the Frank-Starling relationship. Draw Dale\'s curve next to a normal curve, and mark where he was in March and where he is this morning. Then use your drawing to predict what another liter of fluid would do to his stroke volume.',
      'Interpret Dale\'s ejection fraction of 25 percent. Say what it shows and what it cannot show. Then work out his end diastolic volume (the amount of blood in the ventricle just before it contracts) from the numbers on this page. Use that volume to explain why his stroke volume is only a third below normal when his ejection fraction is less than half of normal.',
      'Name the one measurement that would change what you give Dale in the next hour, and say what you would do differently if the result came back high and if it came back low.'
    ],
    tracks:{
      nursing:{ data:'Dale weighs 91 kg this morning, compared with 88 kg at his March clinic visit. His jugular venous pressure is raised, he has pitting edema up to the middle of his shins, and his blood pressure is 82/46. He has passed 20 mL of urine in the two hours since he arrived.',
        go:'Dale\'s weight is the most useful number on this page, and it is the one nobody orders. Say how many liters of fluid 3 kg of weight gain represents and which body compartment that fluid is in, and show your arithmetic. Then explain how Dale can have a blood pressure of 82/46 and still be fluid overloaded, naming the two compartments that are moving in opposite directions. Finish by saying what you would chart every hour tonight and the one number that would make you call someone.' },
      medicine:{ data:'Dale\'s troponin is 68 ng/L, and the reference value is under 14. His ECG shows old Q waves in V1 to V4 and no ST elevation. His heart rate is 118, his diastolic pressure is 46, and his arterial oxygen saturation is 92 percent.',
        go:'A raised troponin does not mean Dale has a blocked artery. Say what troponin is and where it sits in the heart muscle cell, and give three ways the heart can release troponin when no coronary artery is blocked at all. Then use the three numbers above to argue which of those mechanisms is happening in Dale. Be specific about what sets coronary blood flow and at what point in the cardiac cycle the left ventricle actually receives its blood supply. Finish by saying what your answer changes about the next hour of his care.' },
      radiology:{ data:'Dale\'s chest radiograph at 0905 shows consolidation (air spaces filled with fluid or inflammatory material instead of air) in the right lower and right middle lobes. His cardiothoracic ratio is 0.58. There are small pleural effusions on both sides. The blood vessels in the upper lobes are more prominent than those in the lower lobes.',
        go:'A chest film shows shadows, not how well an organ works. Say what Dale\'s cardiothoracic ratio physically measures and what you have to assume before you can call it cardiomegaly (an enlarged heart). Then explain why a film taken at the bedside makes that assumption weaker. Name which of the four findings changes what the team does for Dale this morning, and name the number in his chart that the film could never have given you.' },
      rt:{ data:'Dale\'s oxygen saturation by pulse oximeter is 93 percent on 6 L. His central venous oxygen saturation, measured in blood drawn from a catheter tip in the superior vena cava, is 52 percent. His hemoglobin is 11.8 g/dL.',
        go:'Both of Dale\'s numbers are saturations, but they report two completely different things. Say what blood each one samples and what each one tells you. Then write out the four terms that determine oxygen delivery, put Dale\'s numbers into each one, and say which term is failing. Finish by explaining how Dale can have an arterial saturation of 93 percent and a central venous saturation of 52 percent at the same time, and what that gap tells you about how much oxygen his tissues are extracting.' },
      exercise:{ data:'In March, Dale walked his dog twice a day and stopped once on the hill. In a man with an ejection fraction of 30 percent, peak oxygen uptake typically runs 14 to 18 mL/kg/min, compared with 30 or more for an untrained man of Dale\'s age. Resting metabolic rate rises by roughly 10 percent for each degree Celsius of fever.',
        go:'Dale had already lost his reserve before he got sick. Say what cardiac reserve is, how it is measured, and what sets its upper limit. Then calculate the extra oxygen demand that a temperature of 38.9 &deg;C (102.0 &deg;F) creates, show your arithmetic, and explain why a heart that can handle a slow walk cannot handle a fever. Finish by naming what Dale\'s body is doing instead, and what that costs him.' }
    }
  },

  /* ---------------------------------------------------------- 10 */
  10: {
    title:'Pressure, Flow, and Holding Blood Pressure Steady',
    date:'November 4, 0900 to 1800', when:'Day 1, the first nine hours',
    encounter:'Resuscitation and hemodynamic support',
    tools:[
      ['Pulse pressure variation',
       'One number on Dale\'s chart below comes from a system you study in Week 13. A ventilator, or a big breath taken on his own, changes the pressure inside the chest with every breath, and that changes how much blood returns to the right side of the heart. If a ventricle is working on the steep part of its Frank-Starling curve, that change from breath to breath shows up as a swing in the size of the pulse in the arteries. A large swing, by convention above about 12 percent, means more fluid would raise cardiac output. A small swing means it would not. Dale\'s is 8 percent.',
       13]
    ],
    arc:'Mean arterial pressure equals blood flow (cardiac output) times resistance, so the body can hold it up by raising either one. Over these nine hours Dale\'s body is pushed to do both, and his chart records what each one costs him. The fluid that was meant to help him made his lungs worse within twenty-five minutes, and the drug that raised his blood pressure did not raise his blood flow.',
    chart:[
      ['0900, before anything','BP 82/46, mean arterial pressure 58 mmHg. HR 118. Central venous pressure 14 mmHg. Cardiac output 4.9 L/min. Pulse pressure 36 mmHg. Pulse pressure variation 8%.'],
      ['0910, fluid','500 mL of balanced crystalloid over 20 minutes.'],
      ['0935, after the fluid','BP 86/50, mean arterial pressure 62 mmHg. Central venous pressure 18 mmHg. Cardiac output 5.1 L/min. SpO<sub>2</sub> fell from 93% to 89% on the same 6 L.'],
      ['0950','A second 500 mL was considered and not given. Noradrenaline started at 0.05 &micro;g/kg/min through a central line, titrated to 0.22 &micro;g/kg/min by 1100.'],
      ['1100','BP 104/58, mean arterial pressure 73 mmHg. HR 104. Central venous pressure 16 mmHg. Cardiac output 5.6 L/min. Lactate 3.4 mmol/L. Urine output 15 mL/h.'],
      ['1600','Dobutamine added at 5 &micro;g/kg/min.'],
      ['1800','BP 108/56, mean arterial pressure 73 mmHg. HR 112. Central venous pressure 16 mmHg. Cardiac output 6.8 L/min. Lactate 2.1 mmol/L. Urine output 35 mL/h. Central venous oxygen saturation 66%.'],
      ['Note','He took carvedilol 12.5 mg at 0700. Lisinopril and spironolactone were held on admission.']
    ],
    panels:[
      { name:'Derived hemodynamics', when:'November 4', rows:[
        ['Mean arterial pressure, 0900','58','mmHg','70 to 100','L'],
        ['Mean arterial pressure, 1100','73','mmHg','70 to 100',''],
        ['Systemic vascular resistance, 0900','718','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200','L'],
        ['Systemic vascular resistance, 1100','814','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200',''],
        ['Systemic vascular resistance, 1800','671','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200','L'],
        ['Cardiac index, 1800','3.2','L/min/m<sup>2</sup>','2.5 to 4.0','']
      ]},
      { name:'Serum albumin and oncotic pressure', when:'November 4', rows:[
        ['Albumin','2.9','g/dL','3.5 to 5.0','L'],
        ['Estimated plasma colloid osmotic pressure','13','mmHg','25 to 28','L']
      ]}
    ],
    five:[
      'Write the equation that connects mean arterial pressure, cardiac output and systemic vascular resistance. Calculate Dale\'s systemic vascular resistance at 0900 and at 1100 from the numbers on this page, and show your arithmetic. Then say in one sentence what the noradrenaline actually changed.',
      'Dale was given 500 mL of fluid. His central venous pressure rose by 4 mmHg and his cardiac output rose by 0.2 L/min. Using the Frank-Starling curve you drew last week, predict what a second 500 mL would have done. Then say what happened to his oxygen saturation in those twenty-five minutes, and name the force that changed to cause it.',
      'Explain the baroreflex. Name the sensor and where it sits, the afferent nerve, the integrator, and both efferent limbs. Then say what carvedilol does to that reflex loop, and use that to explain why a heart rate of 118 in Dale is a bigger warning sign than a heart rate of 118 in a man who takes no medications.',
      'Interpret Dale\'s mean arterial pressure of 73 at 1100. Say what it shows and what it cannot show about whether his kidneys and gut are getting enough blood flow, and name the numbers on this page that suggest they were not.',
      'Name the one measurement that would tell you whether to give Dale more noradrenaline or to add dobutamine, and say what a high result and a low result would each mean.'
    ],
    tracks:{
      nursing:{ data:'Dale\'s order says to titrate noradrenaline, meaning adjust the dose up or down, to keep his mean arterial pressure at least 65 mmHg. It does not give a target blood pressure. His urine output is charted every hour and his capillary refill every two hours.',
        go:'Explain why the order uses Dale\'s mean arterial pressure rather than his systolic pressure, and what the mean represents across a whole cardiac cycle that a systolic reading does not. Then name three things, other than the blood pressure itself, that you would watch to tell you the pressure you are creating is actually producing blood flow. For each one, say which finding would tell you it is not, and say which of the three changed first in Dale.' },
      medicine:{ data:'Noradrenaline acts mainly at alpha-1 receptors, with some beta-1 activity. Dobutamine acts mainly at beta-1 receptors, with some beta-2 activity. Between 1600 and 1800, Dale\'s cardiac output rose from 5.6 to 6.8 L/min while his systemic vascular resistance fell from 814 to 671, and his mean arterial pressure did not change.',
        go:'For each drug, say which receptor it binds, which second messenger follows, and what the smooth muscle cell or the heart muscle cell does next. Then explain how adding dobutamine raised Dale\'s cardiac output and lowered his resistance at the same time, and why his mean arterial pressure stayed steady through both changes. Finish by saying what his lactate falling from 3.4 to 2.1 tells you about which of the two changes mattered.' },
      radiology:{ data:'Dale\'s bedside ultrasound at 0900 shows an inferior vena cava of 2.3 cm with almost no change as he breathes. His lung ultrasound shows B-lines in all the front and side zones of both lungs, denser on the right.',
        go:'Inferior vena cava diameter is often offered as a measure of blood volume, but it is not one. Say what it physically measures, and name two things besides blood volume that change it in Dale specifically. Then explain what a B-line physically is, in terms of what sound does when it reaches a boundary between two materials. Use the fact that Dale\'s B-lines are on both sides and in every zone to argue what is filling his alveoli and where it came from.' },
      rt:{ data:'Dale\'s oxygen saturation fell from 93 percent to 89 percent within twenty-five minutes of a 500 mL fluid bolus, on the same 6 L of oxygen. His albumin is 2.9 g/dL, and his estimated plasma colloid osmotic pressure is 13 mmHg, compared with a normal of 25 to 28.',
        go:'The fluid was given to help Dale, and it made his lungs worse within half an hour. Name the four Starling forces at the pulmonary capillary, say which one the bolus changed and by how much, and say which one his low albumin had already weakened. Then explain why the same 500 mL would have been much safer in a man with a normal albumin. Finally, name the one feature of the pulmonary circulation that makes the lung the first place this problem shows up.' },
      exercise:{ data:'When a healthy person needs more blood flow, cardiac output rises and resistance drops in the working muscles at the same time, so mean arterial pressure barely changes. In Dale, the pressure between 0900 and 1100 was held up almost entirely by raising resistance.',
        go:'Name the two ways a body can hold up mean arterial pressure, and say which one costs the body little and which one costs it a lot. Then explain exactly what raising systemic vascular resistance costs Dale\'s left ventricle, which has an ejection fraction of 25 percent. Use the word afterload, and say what higher resistance does to stroke volume and to the heart muscle\'s oxygen demand. Finish by naming the organ whose blood supply suffers first and the number in Dale\'s chart that shows it suffering.' }
    }
  },

  /* ---------------------------------------------------------- 11 */
  11: {
    title:'Blood, and How the Body Defends Itself',
    date:'November 4 to November 8', when:'Day 1 to day 5',
    encounter:'The infection, and the response to it',
    tools:[
      ['Procalcitonin',
       'One number on Dale\'s panel is not core physiology, and this course will not teach it in depth. Procalcitonin is a peptide that many tissues release during a bacterial infection, and its release is suppressed during a viral infection. It is on Dale\'s chart because its fall from 8.4 to 2.1 over four days tells you about the organism, not about his body\'s response, and one question asks you to separate those two things. Accept the number as given.',
       0]
    ],
    arc:'Two separate things are happening to Dale, and you need to keep them apart. One is the organism, the bacteria infecting him. The other is what his body is doing in response to the organism. The antibiotic treats the first one. Almost everything on this page, including the problem that nearly killed him, comes from the second one. By Day 3 his white cell count has fallen below normal without anyone treating it, and that is worse news than the count of 19.4 he arrived with.',
    chart:[
      ['Microbiology','Two sets of blood cultures taken Day 1 before antibiotics. Both positive on Day 2 for Streptococcus pneumoniae. Sputum grew the same organism. Urine culture negative. Antibiotics started Day 1 at 0930.'],
      ['Temperature','Day 1: 38.9 &deg;C (102.0 &deg;F). Day 3: 35.8 &deg;C (96.4 &deg;F). Day 5: 37.2 &deg;C (99.0 &deg;F).'],
      ['Day 3 note','No bleeding anywhere. No transfusion and no platelets given. Nothing has been done to his blood count. It has changed on its own.'],
      ['Day 5 note','Off noradrenaline since Day 4. Still ventilated.']
    ],
    panels:[
      { name:'Complete blood count, Day 1', when:'November 4', rows:[
        ['White cells','19.4','&times;10<sup>9</sup>/L','4.0 to 11.0','H'],
        ['Neutrophils','88','%','40 to 70','H'],
        ['Band forms','12','%','0 to 5','H'],
        ['Lymphocytes','6','%','20 to 40','L'],
        ['Hemoglobin','11.8','g/dL','13.5 to 17.5','L'],
        ['Hematocrit','35','%','41 to 53','L'],
        ['Platelets','160','&times;10<sup>9</sup>/L','150 to 400','']
      ]},
      { name:'Complete blood count, Day 3', when:'November 6', rows:[
        ['White cells','3.1','&times;10<sup>9</sup>/L','4.0 to 11.0','L'],
        ['Neutrophils','62','%','40 to 70',''],
        ['Band forms','18','%','0 to 5','H'],
        ['Lymphocytes','14','%','20 to 40','L'],
        ['Hemoglobin','9.6','g/dL','13.5 to 17.5','L'],
        ['Hematocrit','29','%','41 to 53','L'],
        ['Platelets','84','&times;10<sup>9</sup>/L','150 to 400','L']
      ]},
      { name:'Coagulation and inflammation', when:'Day 1 and Day 3', rows:[
        ['INR, Day 1','1.2','','0.8 to 1.2',''],
        ['INR, Day 3','1.8','','0.8 to 1.2','H'],
        ['Fibrinogen, Day 3','180','mg/dL','200 to 400','L'],
        ['D-dimer, Day 3','6,400','ng/mL','under 500','H'],
        ['C-reactive protein, Day 3','240','mg/L','under 5','H'],
        ['Procalcitonin, Day 1','8.4','ng/mL','under 0.5','H'],
        ['Procalcitonin, Day 4','2.1','ng/mL','under 0.5','H']
      ]}
    ],
    five:[
      'Name each type of white cell in a differential count and say what each one does. Then say which type is raised in Dale on Day 1, which types have fallen by Day 3, and which single type of cell is doing the most damage to him.',
      'Dale\'s white cell count fell from 19.4 to 3.1 without any treatment aimed at it. Give two mechanisms that could cause that fall, and say what each one predicts about his bone marrow. Then say which mechanism his band count (immature neutrophils) of 18 percent supports.',
      'Explain a fever in control system terms. Name the regulated variable, the sensor, the integrator and the effectors, and say exactly what changed. Then explain what Dale\'s temperature of 35.8 &deg;C (96.4 &deg;F) on Day 3, while he has live bacteria in his blood, tells you about that control loop.',
      'Dale\'s platelet count is 84, his INR is 1.8, his fibrinogen is 180 and his D-dimer is 6,400, and he is not bleeding. Interpret that pattern. Say what it shows and what it cannot show.',
      'Dale\'s hemoglobin fell from 11.8 to 9.6. Name the one measurement that would tell you whether that fall comes from dilution, from bleeding, or from reduced production, and say what the result would look like in each case.'
    ],
    tracks:{
      nursing:{ data:'On Day 3 Dale feels cold to the touch. His temperature is 35.8 &deg;C (96.4 &deg;F), and the team is more worried than they were on Day 1, when it was 38.9 &deg;C (102.0 &deg;F). His blood cultures are still growing the organism.',
        go:'A normal or low temperature in a patient with sepsis is not a reassuring sign. Explain what must be going on in Dale\'s temperature control loop for him to run cold while he has live bacteria in his blood, naming which effectors have stopped working and why. Then say what you would document about Dale every hour, and name the one observation that would make you escalate his care before the next set of blood results comes back.' },
      medicine:{ data:'The organism is Streptococcus pneumoniae, and it is in Dale\'s blood. The chemical signals (mediators) his body releases in response to it are the same ones that caused the low systemic vascular resistance and the leaky capillaries you worked with in Week 10.',
        go:'For each of the following, say whether the organism itself or Dale\'s response to it is causing the problem: his systemic vascular resistance of 718, the fluid in his lungs, his platelet count of 84, his fever, and his central venous oxygen saturation of 52 percent. Then say which of the two you can treat directly, and name the treatment for the other one. Use that to explain why Dale kept getting worse for three days after he was given the correct antibiotic.' },
      radiology:{ data:'Dale\'s Day 1 chest film showed consolidation only in the right lower and right middle lobes. His Day 3 chest film shows opacity, a whiter area where less X-ray gets through, in the left lower zone as well, with more of it on both sides. His heart size is unchanged.',
        go:'Dale\'s film now shows a shadow in a lobe that had no organisms in it on Day 1. Name two completely different processes that could put fluid into that lobe, and be precise about what each fluid is physically made of and where it crossed into the lung. Then say which numbers on this page support each process. Finish by saying plainly what the film alone can never tell you.' },
      rt:{ data:'When neutrophils reach an alveolus, they release protein-digesting enzymes and reactive oxygen species. These damage the organism, and they also damage the alveolar epithelium (the cells lining the air sac) and the capillary endothelium (the cells lining the capillary) right next to it. By Day 3, Dale\'s ratio of arterial oxygen to inspired oxygen fraction has roughly halved.',
        go:'Describe what an alveolus and its capillary need to be like for gas exchange to work, going structure by structure and distance by distance. Then say what an exudate full of neutrophils (protein-rich fluid that leaks out of inflamed vessels) does to each of those structures. Finish by arguing which is doing more damage to Dale\'s gas exchange by Day 3, the organism or his own neutrophils, and name the number you would use to make your argument.' },
      exercise:{ data:'In a healthy athlete, a single hard training session raises the white cell count in the blood within minutes, often to 12 to 15 &times;10<sup>9</sup>/L, and the count then falls below its starting value for some hours afterward. Over that short a time, no white cells are made or destroyed. Keep that pattern in mind as you look at Dale\'s white cell counts.',
        go:'Exercise moves the same number that sepsis moves in Dale, and it moves it both up and down within one afternoon. Say where the white cells come from in each phase and where they go. Be specific about demargination (cells that were clinging to vessel walls letting go into the flowing blood) and about what makes a cell marginate, or cling to the wall, in the first place. Then name two things on this page that make Dale\'s 19.4 a different kind of number from an athlete\'s 14 after a match, and say which of those two things you would trust more.' }
    }
  },

  /* ---------------------------------------------------------- 12 */
  12: {
    title:'Digestion, and How You Use Food for Fuel',
    date:'November 8 to November 16', when:'Day 5 to day 13',
    encounter:'Nutrition, metabolism and the gut',
    tools:[
      ['Nitrogen balance',
       'Protein is the only major fuel that contains nitrogen, and almost all of the nitrogen that leaves the body leaves as urea in the urine. So if you measure the protein going into Dale and the urea nitrogen coming out, the difference tells you whether his body is building protein or burning it. Here is the arithmetic: <strong>nitrogen in = protein intake in grams &divide; 6.25</strong>, and <strong>nitrogen out = urinary urea nitrogen + about 4 g/day</strong> for losses through skin and stool. A negative balance means Dale is taking protein from his own tissues. One gram of nitrogen is roughly 6.25 g of protein, which is found in roughly 30 g of wet lean tissue.',
       0],
      ['Respiratory quotient',
       'This box is for the respiratory therapy prompt only. The respiratory quotient is the volume of carbon dioxide produced divided by the volume of oxygen used. It is about 1.0 when carbohydrate is burned, 0.7 for fat and 0.8 for protein, because those fuels differ in how much oxygen they already contain. The indirect calorimeter that measured Dale\'s energy expenditure reports it. His is 0.76.',
       13]
    ],
    arc:'Dale is not eating, and he is burning about 600 kcal a day more than a resting man his size should. That fuel is coming from his own body. This week\'s entry is about where in his body it comes from, why feeding him is a real physiological treatment rather than a basic service like a hotel meal, and why the first few days of feeding a starved patient are more dangerous than the starving was.',
    chart:[
      ['Day 5','Still ventilated and sedated. Nasogastric feed started at 20 mL/h. Gastric residual volumes 180 mL and 240 mL at the first two checks. Bowel sounds absent. No stool since admission. Metformin was stopped on Day 1.'],
      ['Day 6, indirect calorimetry','Measured resting energy expenditure 2,240 kcal/day. Predicted resting figure for his age, sex, height and weight is about 1,650 kcal/day. Respiratory quotient 0.76.'],
      ['Day 7, nitrogen balance','Protein intake 56 g/day. Urinary urea nitrogen 18 g/day.'],
      ['Day 5 to 7, glucose control','Capillary glucose running 210 to 290 mg/dL on an insulin infusion at 6 units/h. He is receiving almost no carbohydrate.'],
      ['Day 9','First stool. Feed advanced.'],
      ['Day 10','Feed at goal, 55 mL/h, tolerated. Weight 88 kg (194 lb), which is exactly his March weight, reached from 91 kg on admission and 94 kg on Day 6.']
    ],
    panels:[
      { name:'Refeeding electrolytes', when:'Day 4 to Day 6', rows:[
        ['Phosphate, Day 4','2.4','mg/dL','2.5 to 4.5','L'],
        ['Phosphate, Day 6','1.4','mg/dL','2.5 to 4.5','LL'],
        ['Magnesium, Day 6','1.4','mg/dL','1.7 to 2.4','L'],
        ['Potassium, Day 6','3.2','mEq/L','3.5 to 5.0','L'],
        ['Glucose, Day 6','246','mg/dL','70 to 99','H']
      ]},
      { name:'Nutrition and liver markers', when:'Day 5', rows:[
        ['Albumin, Day 1','2.9','g/dL','3.5 to 5.0','L'],
        ['Albumin, Day 5','2.2','g/dL','3.5 to 5.0','L'],
        ['Prealbumin','9','mg/dL','18 to 38','L'],
        ['C-reactive protein','240','mg/L','under 5','H'],
        ['Total bilirubin','2.4','mg/dL','0.2 to 1.2','H'],
        ['ALT','96','U/L','10 to 40','H'],
        ['Alkaline phosphatase','180','U/L','40 to 130','H'],
        ['Hemoglobin A1c, on admission','7.9','%','under 5.7','H']
      ]}
    ],
    five:[
      'Follow one gram of the protein in Dale\'s nasogastric feed from the tip of the tube to the inside of a muscle cell. At every step, name the enzyme, the site and the transporter, and say which of those steps a sedated patient on a ventilator does poorly.',
      'Dale\'s measured energy expenditure is 2,240 kcal/day, compared with a predicted 1,650. Say where the extra 590 is going, and name the three hormones driving it. Then calculate his nitrogen balance from the Day 7 figures and use it to predict how much lean tissue he will lose over ten days at that rate.',
      'Explain why Dale\'s glucose is running near 250 on an insulin infusion when he is getting almost no carbohydrate. Name the tissue making the glucose, the substrate it is made from, and the hormones telling it to make glucose. Then explain why giving him more carbohydrate would not fix the problem.',
      'Interpret Dale\'s albumin of 2.2 g/dL. Say what it shows and what it cannot show about his nutrition, and name the two processes, other than how much he takes in, that moved it.',
      'Name the one measurement that would tell you whether Dale\'s gut is working, and say what you would do differently for each possible answer.'
    ],
    tracks:{
      nursing:{ data:'On Day 5, Dale\'s gastric residual volumes (the amount of fluid drawn back out of his stomach through the tube) were 180 mL and 240 mL, measured four hours apart, and the feed was held after the second one. He has no bowel sounds and has not passed stool since admission. He is sedated and lying flat for a procedure.',
        go:'A residual volume of 240 mL often makes people stop a feed. Say what a residual volume actually measures, naming the two separate things that determine it, and say what it does not measure. Then use Dale\'s chart to argue whether his feed should have been held, and name what you would watch instead. Finish with the one change to Dale\'s position or his medications that would most improve how fast his stomach empties, and explain why it works.' },
      medicine:{ data:'Dale\'s phosphate fell from 2.4 to 1.4 mg/dL, his magnesium fell to 1.4 and his potassium fell to 3.2. All three dropped within 48 hours of starting the feed, even though he was receiving replacement. He had eaten almost nothing for five days before that.',
        go:'Three of Dale\'s electrolytes fell together within two days of food arriving. Name the hormone released when carbohydrate reaches the bloodstream, and say what it does to each of those three ions and why. Then say what a cell needs phosphate for, name the two molecules that matter most here, and say which organ system fails first when phosphate is 1.4. Connect that failure to what Dale is being asked to do on the ventilator this week.' },
      radiology:{ data:'Dale\'s abdominal radiograph on Day 5 shows gas-filled loops of small and large bowel throughout, no air-fluid levels, and no free gas under the diaphragm. The tip of his nasogastric tube appears over the body of the stomach.',
        go:'Say what a plain abdominal film physically measures and what makes gas visible on it at all. Then explain what distinguishes a bowel that has stopped moving from a bowel that is blocked, both on the film and at Dale\'s bedside, and name the finding on his film that separates the two. Argue which one Dale has, and say what the film cannot rule out.' },
      rt:{ data:'Carbon dioxide production rises with the amount and the type of fuel burned. Dale\'s measured respiratory quotient on Day 6 is 0.76. His static lung compliance, a measure of how easily his lungs stretch, is about 27 mL/cmH<sub>2</sub>O this week, compared with a normal of 50 to 100.',
        go:'Say what a respiratory quotient of 0.76 tells you about what Dale is currently burning for fuel. Then work out what would happen to his carbon dioxide production if he were fed a high carbohydrate formula at 130 percent of his measured energy expenditure, and say what that does to the minute ventilation (the volume of air he moves per minute) he must generate to keep the same pH. Finish by explaining why this matters most on the day someone tries to take Dale off the ventilator, and name the number you would watch.' },
      exercise:{ data:'Bed rest alone costs a healthy young adult roughly 1 percent of muscle mass per day. Dale is 68, septic, sedated, and has not moved for five days. On Day 10 he weighs 88 kg, which is exactly what he weighed in March.',
        go:'Name the two processes whose balance determines muscle mass, and say what critical illness does to each of them. Then explain why feeding Dale will not hold on to his muscle by itself, name the stimulus that is missing and the pathway it normally switches on, and say what you would actually do about it on Day 5 for a sedated patient on a ventilator. Finish by explaining why the Dale who weighs 88 kg on Day 10 is not the same as the Dale who weighed 88 kg in March, and what a scale can and cannot tell you about that.' }
    }
  },

  /* ---------------------------------------------------------- 13 */
  13: {
    title:'Breathing, Gas Transport, and the Fast pH Lever',
    date:'November 5 to November 10', when:'Day 2 to day 7',
    encounter:'Respiratory failure, ventilation and weaning',
    tools:[
      ['Winter\'s formula',
       'Question 3 asks whether Dale\'s breathing is doing enough to offset his acid, and the course does not build the acid-base tools until Week 15, so here is the one you need now. When a metabolic acidosis is present (acid building up from a cause other than breathing, which lowers the bicarbonate), healthy lungs breathe off carbon dioxide until the PaCO<sub>2</sub> falls to a predictable value: <strong>expected PaCO<sub>2</sub> = 1.5 &times; bicarbonate + 8, plus or minus 2</strong>, with bicarbonate in mEq/L and PaCO<sub>2</sub> in mmHg. If Dale\'s measured value sits above that range, his lungs are not keeping up, and he has a respiratory acidosis on top of the metabolic one. This week you use the formula to check how well his breathing muscles are coping. Week 15 is where you build it.',
       15],
      ['The rapid shallow breathing index',
       'This is a bedside index rather than a piece of physiology, and the course will not build it. It is the respiratory rate divided by the tidal volume in liters. A value above about 105 predicts that a patient like Dale, once taken off the ventilator, will not manage to stay off it. It is on Dale\'s chart because the arithmetic behind why fast, shallow breathing fails is exactly this week\'s material.',
       0],
      ['Predicted body weight',
       'Lung size follows height, not waistline, so ventilator tidal volumes are set from a predicted body weight calculated from height alone. For a man: <strong>50 + 0.91 &times; (height in cm &minus; 152.4)</strong>. Dale is 178 cm tall, so his predicted body weight is 73 kg, and 6 mL per kg of that is 440 mL. His actual weight on Day 2 is 89 kg.',
       0]
    ],
    arc:'Dale\'s lung fails in two stages, and the two stages are different problems. First his lung fills with fluid, which is what you worked on in Week 10. Then it becomes stiff, which is what you worked on in Week 11. By Day 2, his breathing, the fast lever that normally holds pH steady within a minute, is being asked to make up for a kidney that has stopped working. The breathing muscles doing that extra work are the same muscles that wasted away in Week 12.',
    chart:[
      ['Day 1, 0855, on 6 L nasal cannula','pH 7.32, PaCO<sub>2</sub> 30 mmHg, PaO<sub>2</sub> 62 mmHg, bicarbonate 15 mEq/L, SaO<sub>2</sub> 92%. Estimated inspired oxygen fraction 0.44.'],
      ['Day 2, 0400, on high flow 60 L/min at inspired oxygen 0.80','pH 7.25, PaCO<sub>2</sub> 38 mmHg, PaO<sub>2</sub> 58 mmHg, bicarbonate 16 mEq/L. Respiratory rate 38, using accessory muscles, unable to finish a sentence.'],
      ['Day 2, 0510','Intubated. Volume controlled ventilation, tidal volume 440 mL, rate 24, PEEP 12 cmH<sub>2</sub>O, inspired oxygen 0.70.'],
      ['Day 2, 0800, ventilated','pH 7.24, PaCO<sub>2</sub> 44 mmHg, PaO<sub>2</sub> 78 mmHg, bicarbonate 18 mEq/L. Plateau pressure 28 cmH<sub>2</sub>O with a PEEP of 12. No bicarbonate was given.'],
      ['Day 4, proned 16 hours a day','pH 7.36, PaCO<sub>2</sub> 40 mmHg, PaO<sub>2</sub> 92 mmHg, bicarbonate 22 mEq/L, on inspired oxygen 0.55 and PEEP 12.'],
      ['Day 7, spontaneous breathing trial','Inspired oxygen 0.40, PEEP 8. Trial stopped after 12 minutes. Respiratory rate 34, tidal volume 260 mL. He was not distressed at the start and was sweating at the end.'],
      ['Hemoglobin','11.8 g/dL on Day 1, 9.6 g/dL from Day 3. His March value was 12.6 g/dL with a saturation of 96% on room air.']
    ],
    panels:[
      { name:'Gas exchange, derived', when:'Day 1 and Day 2', rows:[
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 1','141','mmHg','over 300','L'],
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 2, 0400','73','mmHg','over 300','L'],
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 2, 0800','111','mmHg','over 300','L'],
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 4','167','mmHg','over 300','L']
      ]},
      { name:'Respiratory mechanics, Day 2 ventilated', when:'November 5, 0800', rows:[
        ['Tidal volume','440','mL','6 mL per kg predicted body weight',''],
        ['Plateau pressure','28','cmH<sub>2</sub>O','under 30',''],
        ['PEEP','12','cmH<sub>2</sub>O','set',''],
        ['Driving pressure','16','cmH<sub>2</sub>O','under 15','H'],
        ['Static compliance','27.5','mL/cmH<sub>2</sub>O','50 to 100','L']
      ]},
      { name:'Day 7 breathing trial', when:'November 10', rows:[
        ['Respiratory rate','34','breaths/min','12 to 20','H'],
        ['Tidal volume','260','mL','about 440 set on the ventilator','L'],
        ['Rapid shallow breathing index','131','breaths/min/L','under 105 predicts success','H'],
        ['Anatomic dead space, estimated','147','mL','about 2 mL per kg predicted body weight','']
      ]}
    ],
    five:[
      'Calculate Dale\'s arterial oxygen content on Day 2 at 0400 and at his March baseline, using 1.34 mL of oxygen carried per gram of hemoglobin and 0.003 mL of oxygen dissolved per mmHg. Show both calculations. Say which of the two parts of the equation, the oxygen carried on hemoglobin or the dissolved oxygen, accounts for almost all of the content, and explain what that means for treating him with extra oxygen alone.',
      'Dale\'s alveolar to arterial oxygen difference (the gap between the oxygen in his air sacs and the oxygen in his arterial blood) is very large, and it barely improves when his inspired oxygen is raised from 0.44 to 0.80. Name the two mechanisms that cause a low arterial oxygen with a large alveolar to arterial difference, explain exactly how raising the inspired oxygen tells them apart, and say which one Dale has.',
      'Explain the fast pH lever, which is how breathing adjusts blood pH. Name the reaction, the enzyme and the organ involved, and explain how a change in breathing changes blood pH within a minute. Then apply Winter\'s formula to Dale\'s Day 2 gas at 0400 and say whether his fast lever is keeping up. What did that answer tell the team to do at 0510?',
      'Dale has a plateau pressure of 28 with a PEEP of 12 and a tidal volume of 440 mL. Interpret these values: calculate his compliance (how easily his lungs and chest stretch), say what it shows, and say what it cannot show about whether the stiffness is in his lung or in his chest wall.',
      'Name the one measurement that would tell you whether Dale\'s failed breathing trial on Day 7 is a lung problem or a pump problem (a problem with his breathing muscles), and say what each result would mean.'
    ],
    tracks:{
      nursing:{ data:'From Day 3, Dale is turned face down (proned) for 16 hours a day and lies on his back for 8. His PaO<sub>2</sub> rose from 78 to 92 mmHg while his inspired oxygen was lowered from 0.70 to 0.55. He has a nasogastric tube feed running (liquid nutrition through a tube from his nose to his stomach), an arterial line, a central line and a urinary catheter.',
        go:'Explain why turning a patient like Dale face down improves oxygenation. Use what gravity does to blood flow and to how well the alveoli inflate in a lung heavy with fluid, and be specific about which regions of the lung change and in which direction. Then name three things you would check every two hours while Dale is proned, and for each one say which physiological problem you are guarding against, rather than which policy you are following.' },
      medicine:{ data:'Dale\'s tidal volume was set at 6 mL per kilogram of predicted body weight, which is 440 mL for his height. His PaCO<sub>2</sub> was deliberately allowed to rise from 30 to 44 mmHg, with a pH of 7.24. His actual weight on Day 2 is 89 kg.',
        go:'The team chose to let Dale\'s carbon dioxide rise and his pH fall. Say what predicted body weight is calculated from and why it is used instead of his actual weight. Then say what tidal volume setting it from 89 kg would have given, and what that volume would do to an alveolus that is already stiff. Argue why accepting a pH of 7.24 is the better of two bad options, and name the pH at which you would stop accepting it.' },
      radiology:{ data:'Day 1 film: consolidation (air spaces filled in with fluid or inflammatory material) in Dale\'s right lower and right middle lobes only. Day 2 film: opacity in both lungs, across all four quadrants. Heart size unchanged from Day 1. His albumin is 2.2 g/dL and his central venous pressure on Day 2 is 16 mmHg.',
        go:'Dale\'s film cannot tell you whether the water in his lungs arrived because of a pressure problem or a permeability problem (leaky capillaries), and the answer changes the treatment completely. Say what each of those two processes physically puts into the alveolus, including what the fluid is made of. Then name two pieces of evidence that argue for permeability in Dale, one on the film and one elsewhere in his chart, and say what argues the other way.' },
      rt:{ data:'On Day 2, Dale\'s plateau pressure is 28 cmH<sub>2</sub>O, his PEEP is 12 and his tidal volume is 440 mL. He is sedated and paralyzed for the measurement, so he is making no breathing effort of his own.',
        go:'Calculate Dale\'s static compliance and his driving pressure. Say what each one tells you, state clearly which one includes the PEEP and which does not, and explain why that difference matters. Then say what both numbers would look like if his chest wall, rather than his lung, were the stiff part. Name the measurement that separates the two, and say what that measurement physically samples.' },
      exercise:{ data:'At the failed breathing trial on Day 7, Dale\'s respiratory rate was 34 with a tidal volume of 260 mL. His estimated anatomic dead space (the airways, where air moves but no gas exchange happens) is 147 mL. A calm breathing pattern for a man his size would be about 500 mL at 12 breaths a minute.',
        go:'A failing breathing trial and a tiring athlete both end in fast, shallow breaths. Calculate Dale\'s alveolar ventilation at the trial and at the calm pattern, show both, and say which is larger. Then explain why fast, shallow breathing is efficient for a few minutes and harmful after that, using dead space and the work of breathing in your answer. Finish by saying what Dale\'s diaphragm has been doing since Week 12 that makes this failure predictable.' }
    }
  },

  /* ---------------------------------------------------------- 14 */
  14: {
    title:'The Kidney and Body Fluid Balance',
    date:'November 4 to November 18', when:'Day 1 to day 15',
    encounter:'Acute kidney injury on chronic disease',
    tools:[
      ['Fractional excretion of sodium',
       'The kidney filters an enormous amount of sodium and reabsorbs almost all of it. So the useful question for Dale is not how much sodium is in his urine, but what fraction of the filtered sodium escaped into it. That fraction is <strong>(urine sodium &times; plasma creatinine) &divide; (plasma sodium &times; urine creatinine) &times; 100</strong>. A value below about 1 percent says the tubule is still reabsorbing hard, which is what a tubule does when it is getting the signal that the body is short of volume. A value above about 2 percent says the tubule has stopped reabsorbing, which usually means it is damaged. You build this tool this week, and it is written out here so the arithmetic is in front of you.',
       14]
    ],
    arc:'The usual explanation is that Dale\'s kidney failed because it was not getting enough blood. Look also at his central venous pressure of 14, and ask what happens to a filter when the pressure downstream of it rises. This week, the number people tend to overlook turns out to be the one doing the damage. You will also see that his creatinine improves at the end of the file partly for a reason that has nothing to do with his kidney.',
    chart:[
      ['Baseline, March 10','Creatinine 1.5 mg/dL, estimated glomerular filtration rate 50 mL/min/1.73 m<sup>2</sup>. Urine albumin to creatinine ratio 180 mg/g. On lisinopril, spironolactone and furosemide 40 mg daily.'],
      ['Day 1','Creatinine 2.6, blood urea nitrogen 48. Urine output 20 mL in the first two hours. Central venous pressure 14 mmHg. Lisinopril and spironolactone held on admission. Urine microscopy: no casts.'],
      ['Day 2','Iodinated contrast given for a CT of the chest and abdomen.'],
      ['Day 3','Creatinine 3.8, blood urea nitrogen 62, potassium 5.6. Urine output 8 mL/h. Urine microscopy: muddy brown granular casts present. A 40 mg intravenous dose of furosemide produced 60 mL of urine over two hours. A furosemide infusion was started at 10 mg/h.'],
      ['Day 6','Urine output 25 mL/h on the infusion. Weight 94 kg (207 lb), from 91 kg on admission and 88 kg in March. Cumulative fluid balance since admission plus 7.4 L. Central venous pressure 18 mmHg.'],
      ['Day 8','Continuous renal replacement therapy started for a potassium of 6.2, a bicarbonate of 13 and volume he could not shed. Ventilator rate had been raised from 24 to 30 to hold his pH.'],
      ['Day 15','Off renal replacement for 48 hours. Urine output 55 mL/h. Weight 82 kg (181 lb). He has lost roughly 6 kg of lean tissue since admission.']
    ],
    panels:[
      { name:'Urine indices, Day 1', when:'November 4', rows:[
        ['Urine sodium','12','mEq/L','read against the clinical state',''],
        ['Urine creatinine','59','mg/dL','',''],
        ['Fractional excretion of sodium','0.4','%','under 1 suggests an intact tubule','L'],
        ['Urine osmolality','520','mOsm/kg','a concentrating tubule can exceed 600',''],
        ['Urine microscopy','no casts','','','']
      ]},
      { name:'Urine indices, Day 3', when:'November 6', rows:[
        ['Urine sodium','48','mEq/L','read against the clinical state',''],
        ['Urine creatinine','52','mg/dL','',''],
        ['Fractional excretion of sodium','2.6','%','over 2 suggests tubular injury','H'],
        ['Urine osmolality','310','mOsm/kg','plasma osmolality is about 300',''],
        ['Urine microscopy','muddy brown granular casts','','none','H']
      ]},
      { name:'Renal chemistry over the admission', when:'Day 1 to Day 15', rows:[
        ['Creatinine, Day 1','2.6','mg/dL','baseline 1.5','H'],
        ['Creatinine, Day 3','3.8','mg/dL','baseline 1.5','H'],
        ['Creatinine, Day 15','2.4','mg/dL','baseline 1.5','H'],
        ['Estimated glomerular filtration rate, Day 15','29','mL/min/1.73 m<sup>2</sup>','baseline 50','L'],
        ['Potassium, Day 3','5.6','mEq/L','3.5 to 5.0','H'],
        ['Potassium, Day 8','6.2','mEq/L','3.5 to 5.0','HH'],
        ['Bicarbonate, Day 8','13','mEq/L','22 to 29','LL'],
        ['Albumin, Day 5','2.2','g/dL','3.5 to 5.0','L']
      ]}
    ],
    five:[
      'Name the three pressures that set glomerular filtration and say which way each one moved in Dale on Day 1. Then name the one people tend to overlook, and use his central venous pressure of 14 to explain how a filter can fail because of what is happening downstream of it.',
      'Dale\'s fractional excretion of sodium was 0.4 percent on Day 1 and 2.6 percent on Day 3, and his urine osmolality (how concentrated his urine is) fell from 520 to 310 mOsm/kg. Say what each pair of numbers tells you about his tubule, and name what changed between the two days.',
      'Explain how the kidney defends blood pressure and volume: name the sensor, the enzyme it releases, the two hormones that follow, and the tubule segment each hormone acts on. Then say what holding Dale\'s lisinopril and spironolactone on Day 1 did to that system, and why the team held them anyway.',
      'Dale\'s creatinine is 2.6 on Day 1, and his baseline is 1.5. Interpret that value. Say what it shows and what it cannot show about how much filtration he had actually lost by that morning, and explain why.',
      'Name the one measurement that would tell you whether more diuretic or less fluid is the right move for Dale on Day 6, and say what a high result and a low result would each mean.'
    ],
    tracks:{
      nursing:{ data:'Dale\'s cumulative fluid balance on Day 6 is plus 7.4 L. His weight that morning is 94 kg, compared with 91 kg on admission and 88 kg in March, so the scale shows him 3 kg up while the fluid chart puts him 7.4 L up. Both records were kept carefully. He is on a ventilator with a humidified circuit, he has had a fever since admission, and he is losing about 400 g of lean tissue a day.',
        go:'Dale\'s fluid chart says plus 7.4 L and the scale says plus 3 kg, and neither record is wrong. Account for the missing 4 kg. Name at least two ways water leaves him that never reach an intake and output chart, one source of water that never appears as intake, and the reason losing tissue makes a scale under-report water gain. Then say what a plus 7.4 L balance means for a man with a central venous pressure of 18, and write the two sentences you would use at Dale\'s bedside to argue for stopping fluid.' },
      medicine:{ data:'Dale took 40 mg of furosemide daily at home. On Day 3, a 40 mg intravenous dose produced 60 mL of urine in two hours. Furosemide works from inside the tubule lumen (the space the urine flows through), and it reaches the lumen by being secreted into the proximal tubule by an organic anion transporter. In the plasma, more than 90 percent of it is bound to albumin. Dale\'s albumin is 2.2 g/dL, his blood urea nitrogen is 62 mg/dL, and his chronic kidney disease began before this admission.',
        go:'Give three separate physiological reasons a normal dose of furosemide did almost nothing in Dale, and tie each one to a number on this page. Be precise about where the drug has to be to work and what has to happen for it to get there. Then explain why the team chose an infusion over larger intermittent doses, using the transporter and the time the drug spends at its site of action in your answer.' },
      radiology:{ data:'Dale had iodinated contrast for a CT of the chest and abdomen on Day 2, when his creatinine was 2.6 and rising. Contrast is freely filtered and is not reabsorbed. It makes the fluid in the tubules thicker and constricts the vasa recta, the small blood vessels that supply the medulla. The renal medulla normally runs at an oxygen tension of about 10 to 20 mmHg while doing the most energy-expensive transport in the kidney.',
        go:'Say what the CT was being asked to find, and whether Dale\'s chart on Day 2 justified asking. Then say what contrast does to the medulla specifically, and name the one feature of the medulla\'s blood supply that makes it the part of the kidney that is harmed. Finish by saying honestly whether his chart lets you separate contrast injury from what was already happening to his kidney, and what would have needed to be recorded for it to do so.' },
      rt:{ data:'On Day 8, Dale\'s bicarbonate was 13 mEq/L, and his ventilator rate was raised from 24 to 30 to hold his pH. His static lung compliance that week is about 27 mL/cmH<sub>2</sub>O. Renal replacement therapy (dialysis) was started the same day.',
        go:'Dale\'s kidney has stopped doing a job that his lung is now being asked to cover. Say what the kidney normally does with bicarbonate and with hydrogen ion, naming the segment responsible for each, and say how long that response takes compared with the lung. Then work out what running a lung with a compliance of 27 at a rate of 30 costs him, and explain why starting dialysis was, among other things, a treatment for his breathing problem.' },
      exercise:{ data:'In March, Dale\'s estimated glomerular filtration rate was 50 mL/min/1.73 m<sup>2</sup> on a creatinine of 1.5. On Day 15 his creatinine is 2.4 and the estimate is 29. Muscle makes creatinine from creatine phosphate at a rate proportional to muscle mass. Dale has lost roughly 6 kg of lean tissue.',
        go:'Dale\'s creatinine fell from 3.8 to 2.4, and some of that fall is not his kidney recovering. Explain where creatinine comes from and why losing muscle lowers the number without changing filtration at all. Then say which direction that error pushes an estimated glomerular filtration rate calculated from creatinine, and whether it makes Dale look better or worse than he really is. Finish by naming a measurement that would not be fooled by his lost muscle, and say what produces it instead.' }
    }
  },

  /* ---------------------------------------------------------- 15 */
  15: {
    title:'The Slow pH Lever, and Putting It Together',
    date:'Both files, read again', when:'November 4 again, and September 22 again',
    encounter:'Integration',
    tools:[
      ['Correcting an anion gap for albumin',
       'Albumin is itself an anion (a negatively charged particle), and most of the normal anion gap is made up of albumin. So a patient with a low albumin has a lower apparent gap even when unmeasured acids are piling up. The correction is <strong>corrected gap = measured gap + 2.5 &times; (4.0 &minus; albumin in g/dL)</strong>. It matters in Dale and not in Camila, and one question turns on exactly that.',
       0],
      ['The delta ratio',
       'When one acidosis is layered on top of another, as it is in both Camila and Dale, you separate them by comparing how far the anion gap rose with how far the bicarbonate fell. Work out the rise in the anion gap above 12 and the fall in bicarbonate below 24, then compare them. If the two are roughly equal, there is one high gap acidosis and nothing else. If the gap rose less than the bicarbonate fell, a second, normal gap acidosis is present as well.',
       0]
    ],
    arc:'This is the last entry, and it takes you back to the start of both cases. You read Camila\'s arrival blood gas in Week 3 and were told to leave it alone for now. You read Dale\'s in Week 10 and were told the same. Read both of them now. Then read the gas each of them had once treatment had been running for a while. That second gas is the one that catches people out, because in both Camila and Dale the treatment created a second acidosis while it was fixing the first.',
    chart:[
      ['Camila, September 22, 0645, on arrival','pH 7.09, PaCO<sub>2</sub> 14 mmHg, bicarbonate 4 mEq/L. Sodium 128, chloride 96, albumin 4.2 g/dL, glucose 642 mg/dL, beta-hydroxybutyrate 6.8 mmol/L.'],
      ['Camila, September 22, 1800, after 6 L of 0.9% saline and an insulin infusion','pH 7.31, PaCO<sub>2</sub> 26 mmHg, bicarbonate 13 mEq/L. Sodium 140, chloride 112, albumin 3.9 g/dL, glucose 198 mg/dL, beta-hydroxybutyrate 1.1 mmol/L.'],
      ['Dale, November 4, 0855, on arrival','pH 7.32, PaCO<sub>2</sub> 30 mmHg, bicarbonate 15 mEq/L. Sodium 132, chloride 98, albumin 2.9 g/dL, lactate 4.6 mmol/L, creatinine 2.6 mg/dL.'],
      ['Dale, November 5, 0400, Day 2, before intubation','pH 7.25, PaCO<sub>2</sub> 38 mmHg, bicarbonate 16 mEq/L. Respiratory rate 38, using accessory muscles.'],
      ['Dale, November 10, Day 7, after about 9 L of 0.9% saline over three days','pH 7.31, PaCO<sub>2</sub> 40 mmHg, bicarbonate 20 mEq/L. Sodium 141, chloride 114, albumin 2.1 g/dL, lactate 1.2 mmol/L.'],
      ['Dale, November 18, Day 15, off renal replacement','pH 7.36, PaCO<sub>2</sub> 38 mmHg, bicarbonate 21 mEq/L. Sodium 140, chloride 108, albumin 2.6 g/dL.']
    ],
    panels:[
      { name:'Anion gaps, for you to check', when:'Both patients', rows:[
        ['Camila, arrival, albumin 4.2','you calculate','mEq/L','normal about 12',''],
        ['Camila, 1800, albumin 3.9','you calculate','mEq/L','normal about 12',''],
        ['Dale, arrival, albumin 2.9','you calculate','mEq/L','normal about 12',''],
        ['Dale, Day 7, albumin 2.1','you calculate','mEq/L','normal about 12',''],
        ['Dale, Day 15, albumin 2.6','you calculate','mEq/L','normal about 12','']
      ]}
    ],
    five:[
      'Name the primary disturbance in each of the six blood gases from Camila and Dale on this page. For each one, say which lever is doing the compensating, the fast one (breathing) or the slow one (the kidney), and whether it is doing enough. Show the Winter\'s formula check for every gas where a metabolic acidosis is the primary problem.',
      'Calculate Dale\'s anion gap on November 4 and on November 10, and correct both for his albumin. Say what the two corrected numbers, read alongside his chloride, reveal about what happened between those dates, and name the fluid responsible.',
      'Explain the slow pH lever, which is the kidney\'s response to acid: name where filtered bicarbonate is reclaimed, where new bicarbonate is made, what the acid is excreted with, and how long the whole response takes. Then explain why Dale\'s slow lever could not help him on November 4 and could not help him on November 10, for two completely different reasons.',
      'Interpret Camila\'s 1800 gas and Dale\'s November 10 gas side by side. Both patients are improving, and both have a new acidosis that the treatment caused. Say what each gas shows, what neither gas can show, and what you would change about the fluid given to each of them.',
      'Both files open with a person who was well and one sentence of history. Name the one measurement you would have added to Camila\'s August physical and the one you would have added to Dale\'s March clinic visit, and for each, say what question it would have let you answer later.'
    ],
    tracks:{
      nursing:{ data:'You are handing over both patients. Camila is going to a clinic nurse who will see her every three months, and Dale is going to a ward nurse who is taking him from intensive care on Day 15. Neither nurse has met Camila or Dale before.',
        go:'Write a handover for Camila and one for Dale, and build each one around what is happening in their bodies rather than a list of events in order. For each patient, name the one number you would want checked first on the receiving unit, the one thing that will still be true in a year, and the one early warning sign you would want acted on without waiting for a review. Then write one sentence for each patient saying what the treatment did to them that the illness did not.' },
      medicine:{ data:'The delta ratio and the albumin correction are both in the tools box above. Camila\'s chloride went from 96 to 112 over twelve hours. Dale\'s went from 98 to 114 over three days. Both of them received 0.9 percent sodium chloride.',
        go:'Work out the delta ratio for Camila between her two gases, and for Dale between his arrival gas and his Day 7 gas, showing the arithmetic for each. Say what each result reveals. Then explain why 0.9 percent saline does this: name what is actually in the bag and what the body does with each of its two ions. Finally, say what you would have given instead and why its anion behaves differently.' },
      radiology:{ data:'Across both files, Camila had a screening ECG, two ECGs on the morning she arrived, a bedside ultrasound of her inferior vena cava, three DEXA scans and one pelvic ultrasound. Dale had chest films on Days 1, 2 and 3, a CT of the chest and abdomen on Day 2, serial bedside ultrasound, and two echocardiograms.',
        go:'Read Camila\'s file and Dale\'s file as one. Name the single study across both patients that most changed what was done, and defend your choice. Then name the single study that did the most harm, explain exactly how the harm happened at the tissue level, and say what question it was answering that a number already on the chart had answered first. Finish by naming one study that was not done in either patient and should have been, or say plainly that there is none.' },
      rt:{ data:'Camila\'s PaCO<sub>2</sub> rose from 14 to 26 mmHg between 0645 and 1800 on September 22, and the team was pleased. Dale\'s PaCO<sub>2</sub> rose from 30 to 38 mmHg between Day 1 and 0400 on Day 2, and the team intubated him. The two rises are about the same size.',
        go:'The same number moved the same way in Camila and in Dale, and it meant opposite things. Explain why, using Winter\'s formula for each patient and saying what the expected value was in each case. Then say what a rising PaCO<sub>2</sub> tells you about the breathing muscles when the acid load has not changed, and name the bedside observation in Dale\'s chart, not a number, that told the team the same thing at 0400.' },
      exercise:{ data:'At her November exercise test, Camila reached a blood lactate of 11.4 mmol/L with a pH of 7.31, which is the same pH she had at 1800 on the day she nearly died. Dale reached a lactate of 4.6 with a pH of 7.32. Where the protons (hydrogen ions) in exercise acidosis come from is genuinely debated. The traditional explanation is that lactic acid gives up its proton. A competing explanation holds that making lactate actually uses up a proton, and that the protons come from ATP being broken down faster than oxidative metabolism can rebuild it.',
        go:'Camila\'s pH of 7.31 at 1800 on the day she nearly died, her pH of 7.31 at her November exercise test, and Dale\'s pH of 7.32 when his lactate reached 4.6 are three similar values from three completely different states. Say what makes one an emergency, one a normal day, and one something in between, using the anion gap, the time course, and what happens when the stimulus stops. Then lay out both explanations of where the exercise protons come from, say what each one predicts you would measure, and take a position, making clear which parts are settled and which are not.' }
    }
  }

  }
};

/* Weeks 1 to 8 are Camila, Weeks 9 to 15 are Dale. Pages written before
   there was a second patient read C.patient, so it is pointed at A here
   rather than duplicated above. Anything new should read
   C.patients[C.patientByWeek[n]] instead. */
window.BIO005_CHART.patient = window.BIO005_CHART.patients.A;

/* Convenience: which patient a given week belongs to, as an object. */
window.BIO005_CHART.patientFor = function (n) {
  var key = window.BIO005_CHART.patientByWeek[n] || 'A';
  return window.BIO005_CHART.patients[key];
};
