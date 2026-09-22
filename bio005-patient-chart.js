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
    arc:'Nothing is wrong yet. This is the only chart entry in the term where every number is normal, which is exactly what makes it the most useful one. Everything you read for the next fourteen weeks gets compared to this page.',
    chart:[
      ['Vitals','HR 52, BP 108/64, RR 12, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 99% on room air.'],
      ['Measurements','Weight 61 kg (134 lb), height 168 cm (5 ft 6 in).'],
      ['Labs','Sodium 139 mEq/L, potassium 4.2, chloride 103, bicarbonate 25, glucose 88 mg/dL, creatinine 0.8 mg/dL, hemoglobin 13.4 g/dL, hematocrit 40%.'],
      ['Note','Well. Cleared for full participation. No symptoms, no medications, no family history she knows of.']
    ],
    five:[
      'Name three variables in this chart that are actively regulated. For each one, say what quantity is being held steady and what control system is holding it.',
      'Her resting heart rate is 52. Say whether that is a finding or a baseline, and say exactly what you would need to know to decide.',
      'Explain what a reference range is a range of. Then say why a value inside it is not proof of health, and a value outside it is not proof of disease.',
      'Interpret this chart. Say what it shows and what it cannot show.',
      'Name the one measurement you would add to this baseline today, and say what question it would let you answer in October.'
    ],
    tracks:{
      nursing:{ data:'Orthostatic vitals were done as part of the physical: supine 108/64 with HR 52, standing at one minute 104/66 with HR 64. Documented as normal.',
        go:'a drop of 4 mmHg systolic with a rise of 12 beats is a normal response, not an absent one. Say what the reflex did in those sixty seconds and name each component of the loop. Then say what would have to be true of a later set of orthostatics for you to call it abnormal.' },
      medicine:{ data:'The reference ranges printed beside every result on this panel were derived from a healthy reference population, and are conventionally set to contain the central 95 percent of that population.',
        go:'if a range holds 95 percent of healthy people, work out roughly how often a completely healthy person will fall outside at least one of the eight results on this panel. Then say what that arithmetic means for ordering panels rather than tests, and connect it to why her normal chart is still worth having.' },
      radiology:{ data:'Screening body composition by DEXA: 22% body fat, lean soft tissue 45.1 kg. A screening ECG was done; no echocardiogram was ordered.',
        go:'DEXA does not weigh fat. Say what it physically measures and what assumption turns that measurement into a fat mass. Then say which of her numbers in the main chart is a direct measurement and which is a calculation, and why that distinction will matter in Week 3.' },
      rt:{ data:'Spirometry at the physical: FVC 4.1 L, FEV<sub>1</sub> 3.5 L, FEV<sub>1</sub>/FVC 0.85. Reported as 102% and 104% of predicted.',
        go:'"Percent of predicted" is a comparison, not a measurement. Say what the prediction is built from and why a predicted value is a population statement rather than a statement about her. Then say what her own numbers today buy you that a predicted value never can.' },
      exercise:{ data:'Graded exercise test: VO<sub>2</sub>max 52 mL/kg/min, maximum heart rate 196, lactate threshold at 82% of maximum heart rate.',
        go:'VO<sub>2</sub>max is expressed per kilogram of body mass. Predict what happens to that number if she loses 6 kg without losing any aerobic capacity at all, and say whether that represents an improvement. Then name what you would measure instead to answer the question the ratio was trying to answer.' }
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
    arc:'She did the right thing as she understood it. Two sessions in the heat, and she drank water at every break, about five liters across the day, because she had been told not to get dehydrated. She finished the second session confused and vomiting. Her weight is up, not down. Everything in this entry turns on one idea: water follows solute, and it is the solute that cannot cross that decides where the water goes.',
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
      'Draw her three fluid compartments before practice and after, with volumes and with osmolarity marked on each. Show the water movement between them with arrows, and say which compartment her 2.5 kg went into and which one made her confused.',
      'She drank only water and her sodium fell to 124. Explain the mechanism in terms of what she lost in sweat, what she replaced it with, and why replacing water alone lowers a concentration rather than restoring it.',
      'Look at the three microscopy slides. Name the tonicity of each solution relative to the cell, say which way water moved and why, and name the one property of the solute that decides the answer in every case.',
      'She is given 3% saline, not normal saline and not free water. Predict what each of those three fluids would do to her cell volume, and say why the one chosen is the one that helps.',
      'Her urine osmolality is 380 mOsm/kg while her serum is 256. Say what a healthy kidney would be doing with a serum osmolality that low, say what hers is doing instead, and name the one measurement that would tell you whether her kidney is the problem or is being told to do this.'
    ],
    tracks:{
      nursing:{ data:'Intake across the day was roughly 5 L of plain water by her own count. Output was not measured, but she has voided once since morning and describes it as a small amount. Her weight is up 2.5 kg from a documented preseason weight taken five weeks ago.',
        go:'weight is the most useful number on this page and nobody ordered it. Say what 2.5 kg of gain represents in liters, show the arithmetic, and then explain why a weight gain during a day of heavy sweating is a red flag rather than a reassurance. Then say what you would chart hourly overnight and what number would make you call someone.' },
      medicine:{ data:'Sweat sodium in an unacclimatized athlete runs roughly 40 to 60 mEq/L. Measured serum osmolality is 256 mOsm/kg. Calculated osmolarity from her labs is close to the measured value, so there is no osmolal gap. Urine osmolality is 380 mOsm/kg with a urine sodium of 52 mEq/L.',
        go:'calculate her serum osmolarity from the labs and compare it with the measured 256. Then explain why a urine osmolality of 380 is the abnormal number here, not the sodium. Say what should be happening to ADH at a serum osmolality of 256, what is evidently happening instead, and why exercise plus vomiting explains it. Then say why correcting her sodium too quickly is its own danger, and name what you would be watching.' },
      radiology:{ data:'No imaging was ordered on arrival. Her preseason DEXA showed 22% fat and 45.1 kg of lean soft tissue.',
        go:'her brain sits in a fixed box. Say what a head CT would be looking for in a patient who is confused with a sodium of 124, say what it would physically be measuring, and then say why the CT can be normal while the cell level problem is real. Then explain which compartment DEXA can and cannot see her 2.5 kg in.' },
      rt:{ data:'She is breathing 18 times a minute with a normal saturation. Her bicarbonate is 23. Red cells spend roughly one second in a capillary.',
        go:'her red cells are the cells you can actually see in this case. Using Slide C, say what happens to gas carriage when a red cell swells and bursts, and say what is released into the plasma when it does. Then explain why the biconcave shape on Slide A is not decorative: name two things that shape buys a cell that has one second to finish its work.' },
      exercise:{ data:'Two sessions at 31 &deg;C (88 &deg;F) with heavy sweating through both. She was told to drink at every break and did. She ate nothing between sessions.',
        go:'she followed the advice she was given and it harmed her. Write the advice you would have given instead, in two sentences a seventeen year old would act on, and justify each sentence from the physiology rather than from a rule. Then say what you would weigh, and when, to catch this in the next athlete before anyone is confused on the field.' }
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
    date:'September 22, 06:40', when:'Four days after the training room',
    encounter:'Arrival in the emergency department',
    tools:[
      ['Correcting a sodium for the glucose',
       'Week 2 was about water moving between compartments when a solute pulls on it, and her glucose is exactly such a solute: it stays outside her cells and drags water out with it. That water arrives in the extracellular space and dilutes everything already dissolved there, sodium included. So a measured sodium of 128 is not telling you she has lost sodium. It is telling you the water moved, which is the thing you already studied. The formula only puts a number on a shift you can explain without it: <strong>corrected sodium = measured sodium + 1.6 &times; (glucose &minus; 100) &divide; 100</strong>, with glucose in mg/dL. Some sources use 2.4 rather than 1.6, and here the two differ enough to matter, which is why question 4 asks which one you used.',
       0],
      ['Why her bicarbonate is 4',
       'Bicarbonate is a solute in her extracellular fluid, so it turns up on the same panel as everything else you are working with. Its number is low for a reason that belongs to a system you have not met yet: she is making acid faster than she can buffer it, and bicarbonate is what gets spent doing the buffering. That is the whole of it. Notice the number, and leave it alone. Nothing in this week\'s questions turns on it.',
       15],
      ['Minute ventilation',
       'Respiratory therapy prompt only, and it is a compartment question like every other one this week. Water leaving through her airway is fluid going out of the extracellular space, and unlike her urine it never reaches the intake and output chart. To size that loss you need one number the course has not defined yet: minute ventilation is simply how much air moves in and out each minute, <strong>tidal volume &times; breaths per minute</strong>. Hers is running at roughly four times normal.',
       13]
    ],
    arc:'Nothing new opens this week, and this entry opens nothing new either. It is the same five ideas you worked with last week, which solute cannot cross, which way water goes, what that does to cell volume, and what a signal does when its receptor is empty, put in front of a much harder case. Four days ago she was confused on a field with a sodium of 124. This morning a teammate brought her in. Everything you need is either on this page or was on last week\'s.',
    chart:[
      ['Vitals','HR 128, BP 96/58, RR 32, temperature 36.4 &deg;C (97.5 &deg;F), SpO<sub>2</sub> 99% on room air. Weight 55 kg (121 lb), from 63.5 kg four days ago and 61 kg in August.'],
      ['Examination','Dry mucous membranes, skin tenting, sunken eyes. Drowsy but rousable. Breathing deeply and without effort. She has been passing very large volumes of urine and drinking constantly for about three weeks.'],
      ['Note','Estimated fluid deficit approximately 6 L. First liter of 0.9% sodium chloride started at 06:55.']
    ],
    panels:[
      { name:'Basic metabolic panel', when:'September 22, 06:45', rows:[
        ['Sodium (measured)','128','mEq/L','135 to 145','L'],
        ['Potassium','5.4','mEq/L','3.5 to 5.0','H'],
        ['Chloride','96','mEq/L','98 to 107','L'],
        ['Bicarbonate','4','mEq/L','22 to 29','LL'],
        ['Glucose','642','mg/dL','70 to 99','HH'],
        ['Blood urea nitrogen','34','mg/dL','7 to 20','H'],
        ['Creatinine','1.6','mg/dL','0.5 to 1.0','H']
      ]},
      { name:'Osmolality', when:'September 22, 06:45', rows:[
        ['Serum osmolality (measured)','305','mOsm/kg','275 to 295','H'],
        ['Urine osmolality','320','mOsm/kg','no fixed range, read against serum','']
      ]}
    ],
    five:[
      'Name the compartments involved and say which solute is setting the gradient between them. Say what makes that solute able to set a gradient at all.',
      'Predict which way water has moved between the intracellular and extracellular compartments, and say what has happened to cell volume. Then say why she looks dry on the outside while a specific compartment inside her is being pulled dry too.',
      'Her glucose is 642 mg/dL and her cells have no fuel. Name the transporter that cannot reach the cell membrane without insulin, name two tissues that take up glucose without needing it, and explain how a bloodstream full of glucose and a starving muscle cell are the same fact.',
      'Correct her sodium for the glucose. Say which correction factor you used and that more than one is in use. Then interpret the measured 128: say what it shows and what it cannot show.',
      'Name the one measurement that would change your fluid plan in the next hour, and say what you would do differently for a high result and for a low one.'
    ],
    tracks:{
      nursing:{ data:'Orders: 0.9% sodium chloride, 1 L over the first hour, then reassess. Hourly urine output, hourly point of care glucose, potassium every two hours. Nothing by mouth. Her documented weights are 61 kg in August, 63.5 kg four days ago and 55 kg this morning.',
        go:'0.9% saline is isotonic to plasma and she is profoundly hyperosmolar. Say which compartment the first liter will expand and roughly how much of it stays there, and explain why that is the right first move even though it does nothing to correct her osmolality. Then say what would go wrong if the first liter were 5% dextrose in water instead, and what her three weights tell you that a single weight never could.' },
      medicine:{ data:'Calculated osmolarity is 2 &times; sodium plus glucose divided by 18 plus blood urea nitrogen divided by 2.8, with glucose and urea nitrogen in mg/dL. Effective osmolarity drops the urea term, because urea crosses cell membranes freely.',
        go:'calculate both her total and her effective osmolarity and compare each with the measured 305. Then explain why urea is excluded from the effective figure, using what "effective" has to mean for a solute to pull water across a membrane. Say which of the two numbers predicts her cell volume, and what the closeness of the calculated and measured values rules out.' },
      radiology:{ data:'No imaging on arrival. Bedside ultrasound shows an inferior vena cava that collapses almost completely on inspiration. Iodinated contrast, if given, distributes through plasma and interstitial fluid and does not enter cells.',
        go:'name the compartment iodinated contrast marks out, and say why that makes it a marker of extracellular volume rather than total body water. Then use her chart to argue whether a contrast study should be done this morning, on physiological grounds rather than protocol ones.' },
      rt:{ data:'Respiratory rate 32, deep and unlabored. Insensible loss through the airway rises with minute ventilation, and her minute ventilation is roughly four times normal.',
        go:'she is losing water through her lungs faster than a normal person does, and none of it is measured on the intake and output chart. Say what makes airway loss obligatory, what determines its rate, and roughly what fraction of a 6 L deficit it could account for over a day. Then say why that loss is pure water and what it does to her plasma osmolality.' },
      exercise:{ data:'A hard match in the heat can cost 2 to 3 L of sweat, and sweat is hypotonic to plasma. Her losses over the last three weeks came from an osmotic diuresis, in which the fluid lost is closer to half normal saline.',
        go:'both dehydrate. Say what each type of loss does to plasma osmolality, and explain why the two move it in opposite directions. Then say which compartment gives up water first in each case, and what that predicts about cell volume in a dehydrated athlete versus in Camila this morning.' }
    }
  },

  /* ---------------------------------------------------------- 4 */
  /* Sep 21 2026. Week 4 in the new schedule is membrane potential,
     neurons and synapses. The old Week 4 potassium entry sits here, and
     the synapse half of the old Week 5 entry moved up to join it. */
  4: {
    title:'Membrane Potential, Neurons and Synapses',
    date:'September 22, 07:00 to 11:00', when:'The first four hours of treatment',
    encounter:'Resuscitation, hours 0 to 4',
    arc:'Her potassium is the number that will hurt her if you read it as a quantity rather than as a position. It is high on arrival and low four hours later, and almost none of that is potassium entering or leaving her body. While that is happening, two synapses are doing visible work on her, and they are using different transmitters to serve the same outflow.',
    chart:[
      ['Potassium','07:00: 5.4 mEq/L. 09:00: 4.1. 11:00: 3.1.'],
      ['ECG','07:05: sinus tachycardia at 128, tall peaked T waves, QTc 410 ms. 11:00: T waves flattened, U waves present.'],
      ['Autonomic examination','HR 128. Peripheries cool to the mid-forearm, capillary refill 4 seconds. Skin dry despite the tachycardia. Pupils 4 mm and reactive.'],
      ['Treatment','Insulin infusion started 07:20. Fluids continuing. Potassium chloride added to the infusion at 11:05 and the insulin rate reduced.'],
      ['Note','Total body potassium deficit in this presentation is typically 3 to 5 mEq per kg of body weight, which for her is roughly 165 to 275 mEq, despite the arrival value being above the reference range.']
    ],
    panels:[
      { name:'Potassium series', when:'September 22', rows:[
        ['Potassium, 07:00','5.4','mEq/L','3.5 to 5.0','H'],
        ['Potassium, 09:00','4.1','mEq/L','3.5 to 5.0',''],
        ['Potassium, 11:00','3.1','mEq/L','3.5 to 5.0','L'],
        ['Magnesium, 07:00','1.6','mg/dL','1.7 to 2.4','L'],
        ['Phosphate, 07:00','4.8','mg/dL','2.5 to 4.5','H']
      ]}
    ],
    five:[
      'Name the ion this entry is about and say which way its electrochemical gradient points across a resting cell membrane. Say what holds that gradient in place and what it costs.',
      'Predict what a serum potassium of 5.4 does to the resting membrane potential, and then what 3.1 does. Give the direction for each, and say which of the two she is in more danger from at 11:00.',
      'Explain, gate by gate, why a membrane held depolarized becomes less excitable rather than more, and name the channel state that does it.',
      'Her heart is fast and her skin vessels are shut. Name the transmitter and the receptor at each of those two synapses, and say why one outflow ends at two different receptors. Then interpret her dry skin: say what it shows and what it cannot show about her sympathetic state.',
      'Name the one measurement or event that would make you hold the insulin, and say why holding it is the right move even though her glucose is still high.'
    ],
    tracks:{
      nursing:{ data:'Standing protocol: hold insulin if potassium is below 3.3 mEq/L and replace first. Potassium every two hours while on the infusion. Continuous cardiac monitoring.',
        go:'the protocol says hold the insulin, which feels like withholding treatment from a patient whose glucose is 642. Explain, physiologically, what insulin does to potassium that makes the protocol right. Then say which of the two problems, the glucose or the potassium, will kill her first, and why the ECG is the monitor that tells you.' },
      medicine:{ data:'Three separate forces are acting on where potassium sits: insulin deficiency, acidemia, and an osmotic diuresis that has been running for days. Two of them move potassium out of cells and one of them removes it from the body.',
        go:'name each of the three forces, say whether it shifts potassium or removes it, and say which direction the serum number moves under each. Then explain how a patient can be simultaneously hyperkalemic and severely potassium depleted, and say which of those two facts the treatment is about to reverse first.' },
      radiology:{ data:'There is nothing to image here. The ECG, however, is a recording of a physiological signal from the body surface, in the same sense that any imaging modality records a signal that has traveled through tissue.',
        go:'say what the ECG is actually recording, and be precise: it is not the action potential of a single cell. Explain what summation and volume conduction mean here, and then say why a change in the T wave, which is repolarization, is the first thing potassium alters. Name what the ECG cannot tell you about her potassium.' },
      rt:{ data:'Her pH on arrival was 7.09. Correcting an acidemia, whether by ventilation or by clearing the acid load, shifts potassium into cells. Her respiratory rate of 32 is already doing part of that work.',
        go:'name the exchange that couples hydrogen ion and potassium across the cell membrane, and say which way each moves as pH rises. Then say what would happen to her potassium if someone sedated and intubated her and set a ventilator rate of 14, and why that is one of the most dangerous things you could do to her this morning.' },
      exercise:{ data:'Serum potassium rises during intense exercise, sometimes to 6 mEq/L or above, and returns to baseline within minutes of stopping. The rise comes largely from working muscle and the recovery is largely reuptake.',
        go:'the same number that is an emergency in her is routine in a sprinter. Explain where the potassium comes from during exercise, which pump takes it back, and why the recovery is so fast. Then say what is different about her situation that makes 5.4 dangerous, using time course and total body content in your answer.' }
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
    date:'September 22, and October 20', when:'The first morning, and four weeks later',
    encounter:'Neurological, reflex and sensory assessment',
    arc:'Three loops are on this page and none of them needed a doctor to run. One protects her brain, one defends her blood pressure, and one changed the shape of a lens without anyone noticing until she stopped wearing her contact lenses. Two of the three recover on their own. The interesting question is what you would have to measure to know which.',
    chart:[
      ['Conscious level','06:40 Glasgow Coma Scale 13 (eyes 3, verbal 4, motor 6): drowsy, oriented to person and place but not to time. 10:00 GCS 14. 14:00 GCS 15, fully oriented.'],
      ['Reflexes, September 22','Patellar 1+ and ankle 1+, symmetric, at 06:40; 2+ and symmetric by 14:00. Plantar response flexor throughout. Pupils 4 mm, brisk and equal.'],
      ['Sensory testing, September 22','Light touch and vibration intact at both great toes. A 10 g monofilament was felt at all nine sites on each foot.'],
      ['Sitting up, 07:40','Supine 96/58 with HR 128. At one minute sitting 78/44 with HR 138. She felt faint and was laid flat.'],
      ['Vision','She reports that everything has looked soft for about two weeks and that she stopped wearing her contact lenses because they were not helping. Bedside distance acuity September 22: 20/60 both eyes. October 20: 20/20 both eyes, same prescription, no treatment given to her eyes.'],
      ['Breathing','RR 32, deep and regular, unchanged through the morning.']
    ],
    panels:[
      { name:'Bedside sensory and reflex testing', when:'September 22, 08:10', rows:[
        ['Patellar reflex, both sides','1+','','2+ is the usual normal','L'],
        ['Ankle reflex, both sides','1+','','2+ is the usual normal','L'],
        ['Plantar response','flexor','','flexor',''],
        ['Vibration, 128 Hz at both great toes','felt','','felt',''],
        ['10 g monofilament, 9 sites per foot','felt at 9 of 9','','felt at 9 of 9',''],
        ['Distance acuity, both eyes','20/60','','20/20','L'],
        ['Pupil size and reaction','4 mm, brisk and equal','','2 to 5 mm, brisk','']
      ]}
    ],
    five:[
      'Name the five parts of a reflex arc. Then map her pupillary light reflex onto them, naming the actual structure at each step, and say which part of that arc is the one you are testing when you shine a light in one eye and watch the other.',
      'Her blood pressure fell from 96/58 to 78/44 when she sat up, and her heart rate rose by 10. Name the reflex that should have prevented the fall, name its sensor and where that sensor sits, and say why the response you can see on this page is not enough.',
      'Her distance vision was 20/60 on September 22 and 20/20 four weeks later, with no change in prescription and nothing done to her eyes. Explain the mechanism using what you know about water moving toward solute, name the structure that changed shape, and say why the change took weeks to reverse when her glucose came down in hours.',
      'Interpret reflexes of 1+ at 06:40 and 2+ at 14:00. Say what that change shows and what it cannot show.',
      'Name the one sensory test you would add today that would change what you tell her about the next twenty years, and say what a normal result would and would not rule out.'
    ],
    tracks:{
      nursing:{ data:'The Glasgow Coma Scale is scored from three separate observations: eye opening out of 4, best verbal response out of 5, and best motor response out of 6. She scored E3 V4 M6 at 06:40.',
        go:'the scale is a set of reflexes and responses, not a measure of consciousness itself. For each of the three components, say whether you are testing a sensory pathway, a motor pathway, or the integration between them. Then say what E3 V4 M6 tells you that a bare total of 13 does not, and name a different combination that also totals 13 and would worry you far more.' },
      medicine:{ data:'Large myelinated fibers carry vibration and light touch and conduct at roughly 35 to 75 m/s. Small thinly myelinated and unmyelinated fibers carry pain and temperature and conduct at roughly 0.5 to 30 m/s. Nerve conduction studies record only the large fibers, and the monofilament tests them too.',
        go:'her monofilament and vibration testing are normal today, and a nerve conduction study would be normal as well. Say precisely what that does and does not exclude, naming which fiber population is invisible to both tests. Then say which of her symptoms over the last three weeks, if any, could already have been a small fiber symptom, and write the question you would ask her to find out.' },
      radiology:{ data:'Ocular B-scan ultrasound measures axial length and lens thickness directly, in millimeters. Refractive error is inferred from those measurements plus corneal curvature; visual acuity is not measured by any imaging modality.',
        go:'say what an ocular ultrasound would physically measure on September 22 and again on October 20, and predict the difference between the two. Then say which of her two vision numbers, the acuity or the lens thickness, is the direct measurement and which is the inference, and use that to explain why her prescription was the wrong thing to change in September.' },
      rt:{ data:'Central chemoreceptors in the medulla respond to the pH of cerebrospinal fluid. Peripheral chemoreceptors in the carotid and aortic bodies respond to arterial oxygen, carbon dioxide and hydrogen ion. Hydrogen ions cross the blood brain barrier poorly; carbon dioxide crosses freely. Her arterial pH is 7.09 and her respiratory rate is 32.',
        go:'her drive is enormous and the acid causing it is largely locked out of the compartment the central sensors sample. Say which chemoreceptor population is doing most of the work here and why. Then say what happens to central chemoreceptor drive over the following hours as her carbon dioxide falls, and what that predicts about her respiratory rate as she is treated.' },
      exercise:{ data:'Before she got sick she could balance on one leg with her eyes closed for over 30 seconds, which was recorded at the preseason physical. On hospital day 2 she managed 4 seconds.',
        go:'name the three sensory systems that hold a person upright and say what each one contributes. Then say which one closing your eyes removes, and use her 4 seconds to argue which of the remaining two is most likely impaired. Name the bedside test that would separate them, and say what you would expect it to show in her.' }
    }
  },

  /* ---------------------------------------------------------- 6 */
  6: {
    title:'Muscle, and How Movement Gets Commanded',
    date:'September 25 to October 10', when:'Hospital day 4 through two weeks after discharge',
    encounter:'Mobility assessment and follow-up',
    arc:'She is out of danger and she cannot get out of a chair without pushing off. Three weeks of catabolism and four days of lying still cost her more than she expects, and the recovery does not run in the order she expects either. Her force comes back before her muscle does, which tells you the command and the machinery are two separate things.',
    chart:[
      ['Day 4 assessment','Stands from a chair slowly, using both arms. Walks 40 m with a frame, limited by fatigue rather than breathlessness. Grip strength 22 kg on the right; 32 kg at the preseason physical.'],
      ['Motor examination','Power 4 out of 5 in hip flexion and knee extension, 5 out of 5 at the ankle and in the hands. Tone normal. Reflexes 2+ and symmetric. No fasciculation. Sensation intact.'],
      ['Body composition','Repeat DEXA October 10: lean soft tissue 41.2 kg, from 45.1 kg in August.'],
      ['October 10','Walking normally. Grip 27 kg. Reports that stairs are the thing that still tells her she was ill.'],
      ['November 20','Grip 31 kg. Repeat DEXA lean soft tissue 43.1 kg.']
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
      'Name every link in the chain from the motor cortex to a crossbridge. Then say where in that chain her weakness sits, and say what evidence in this chart rules each of the other links in or out.',
      'Predict what has happened to her maximal force and to her endurance, separately, and say whether they had to change by the same amount.',
      'Explain excitation contraction coupling from the arrival of the action potential at the muscle fiber to the crossbridge, naming the structures and the ion movements. Then say which step is limited when there are simply fewer crossbridges available.',
      'Interpret a grip strength of 22 kg against a baseline of 32 kg. Say what it shows and what it cannot show.',
      'Name the one measurement that would separate loss of muscle from loss of the ability to activate the muscle she still has, and say what each result would mean.'
    ],
    tracks:{
      nursing:{ data:'Sit to stand recorded as 4 repetitions in 30 seconds; 18 would be expected for her age. Falls risk score elevated. She is embarrassed and keeps trying to walk to the bathroom unassisted.',
        go:'the sit to stand test is a physiological measurement wearing everyday clothes. Say what it is actually measuring and which muscle groups and which energy system it loads. Then say why fatigue rather than breathlessness is her limit, and what that single word in the chart tells you about where the problem is not.' },
      medicine:{ data:'A creatine kinase of 340 U/L is mildly raised. Critical illness myopathy, disuse atrophy and a neuropathy would all produce weakness, and they are distinguished by their pattern, their time course and their electrophysiology. Her weakness is proximal, her reflexes are 2+ and her sensation is intact.',
        go:'take the three explanations one at a time and say what each predicts for reflexes, sensation, creatine kinase, and the distribution of the weakness. Then use her chart to rank them, and name the one test that would settle it if the weakness had not resolved.' },
      radiology:{ data:'Ultrasound of the rectus femoris cross sectional area is used in critical care to track muscle mass at the bedside. Her repeat DEXA showed 3.9 kg of lean soft tissue lost.',
        go:'DEXA reports lean soft tissue, and ultrasound reports a cross sectional area. Say what each one actually measures and what has to be assumed to turn either into "muscle". Then explain why a 3.9 kg loss of lean tissue does not translate into a proportional loss of force, and name which direction the error runs.' },
      rt:{ data:'Maximal inspiratory pressure 48 cmH<sub>2</sub>O; a value above about 80 would be expected for her. Peak cough flow reduced. She clears secretions but reports that a deep breath takes effort.',
        go:'the diaphragm is skeletal muscle and it wasted with the rest. Say what maximal inspiratory pressure measures and which muscles generate it. Then explain the mechanics of a cough in three phases, say which phase a weak expiratory effort ruins, and connect that to why respiratory muscle weakness shows up as a clearance problem before it shows up as a gas exchange problem.' },
      exercise:{ data:'By November her grip is back to 31 kg while her lean mass is still 2 kg below baseline. Early strength gains after reloading come substantially from neural adaptation rather than from new contractile protein.',
        go:'her force came back faster than her muscle did. Name the two categories of adaptation involved and say what each one changes. Then explain what neural adaptation means mechanically, in terms of motor unit recruitment and firing rate, and say what that predicts about how quickly she can safely return to contact training.' }
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
    arc:'This is the entry where her diagnosis is actually made, and where the hormones that made her so sick get named. It is also where a thyroid result moves twice without her thyroid ever being the problem, and where a period that stopped in August turns out to be a message from her hypothalamus about how much she has been eating.',
    chart:[
      ['Diagnostic','C-peptide less than 0.1 ng/mL. GAD-65 antibodies positive. Islet antigen 2 antibodies positive. Diagnosis: type 1 diabetes.'],
      ['Stress hormones, on arrival','Cortisol 32 &micro;g/dL. Glucagon elevated. Catecholamines not measured but clinically evident: heart rate 128, cool peripheries, capillary refill 4 seconds.'],
      ['Thyroid','Sep 22: TSH 0.8 mIU/L, free T4 1.0 ng/dL, free T3 low. Sep 28: TSH 6.2. Nov 3: TSH 2.1, free T4 1.1, free T3 normal. No thyroid treatment was given at any point.'],
      ['Reproductive history','Last menstrual period August 30, regular before that. No pregnancy possible. Menses returned November 28.'],
      ['Energy availability, October 20','Reported intake about 1,900 kcal/day. Training cost about 800 kcal/day. Lean mass 41.2 kg. Below roughly 30 kcal per kg of lean mass per day, GnRH pulses are reliably suppressed in study conditions.'],
      ['Autonomic testing, November 3','Resting HR 68. Supine 118/72 with HR 68; standing at one minute 114/76 with HR 84. Beat to beat heart rate variation with deep breathing preserved.'],
      ['Treatment','Insulin infusion, then transitioned to basal and bolus insulin before discharge.']
    ],
    panels:[
      { name:'Reproductive axis', when:'October 20', rows:[
        ['Follicle stimulating hormone','2.4','IU/L','3.5 to 12.5 (follicular)','L'],
        ['Luteinizing hormone','1.8','IU/L','2.4 to 12.6 (follicular)','L'],
        ['Estradiol','18','pg/mL','30 to 100 (follicular)','L'],
        ['Prolactin','11','ng/mL','4 to 23',''],
        ['TSH','2.1','mIU/L','0.4 to 4.0','']
      ]},
      { name:'Pelvic ultrasound', when:'October 20', rows:[
        ['Endometrial thickness','3','mm','8 to 12 before ovulation','L'],
        ['Largest follicle','7','mm','18 to 24 when dominant','L'],
        ['Ovarian volume, right','6.2','mL','3 to 10',''],
        ['Ovarian volume, left','5.8','mL','3 to 10','']
      ]}
    ],
    five:[
      'Name each hormone in this entry, the tissue it acts on, and whether its receptor sits on the cell surface or inside the cell. Say what that location predicts about how quickly each one can change anything.',
      'Adrenaline appears in this chart twice: as a hormone and as the end of a nerve. Draw the sympathetic pathway to her heart and the sympathetic pathway to her adrenal medulla side by side, naming every transmitter and receptor. Say what is structurally different about the second one, and why that difference makes one effect fast and local and the other slower and everywhere.',
      'Predict which way glucagon, cortisol, growth hormone and adrenaline each moved on arrival, and say why they all moved in the same direction at once. Then name what was missing from the loop that would normally have limited them.',
      'Interpret her October reproductive panel: FSH 2.4, LH 1.8, estradiol low, ovaries normal on ultrasound. Say what it shows and what it cannot show, and contrast it point by point with a panel showing high FSH and low estradiol.',
      'Name the one measurement that would change her insulin plan in the next month, and say what a high and a low result would each make you do.'
    ],
    tracks:{
      nursing:{ data:'She is taught basal and bolus dosing before discharge, along with hypoglycemia recognition and treatment. She asks why she needs two different insulins.',
        go:'answer her question physiologically, not procedurally. Say what a healthy pancreas does between meals and what it does after one, and name which of those two jobs each insulin is replacing. Then say what would happen if she took only the basal, and only the bolus, and why the two failures look completely different.' },
      medicine:{ data:'C-peptide is cleaved from proinsulin in a one to one ratio with insulin and is not present in injected insulin. Her thyroid results moved from TSH 0.8 with a low free T3 on September 22, to TSH 6.2 on September 28, to TSH 2.1 with everything normal on November 3, with no treatment at any point.',
        go:'explain what C-peptide is, where it comes from, and why it separates her from a patient with type 2 diabetes who takes insulin. Then read the three thyroid panels as one sequence and say what was happening to the axis at each point. Say whether her thyroid was ever the problem, and name what would have gone wrong if someone had treated the 6.2.' },
      radiology:{ data:'Endometrium 3 mm. Several follicles of 4 to 7 mm, none dominant. In a normal cycle the endometrium reaches roughly 8 to 12 mm before ovulation and a dominant follicle reaches about 18 to 24 mm.',
        go:'the ultrasound is a hormone assay done with sound. Say what the 3 mm endometrium reports about her estradiol exposure over the preceding weeks, and what the absence of a dominant follicle reports about FSH. Then say what normal looking ovaries rule out, and be precise about what they do not.' },
      rt:{ data:'Progesterone stimulates ventilation. In the luteal phase of a normal cycle, resting PaCO<sub>2</sub> is typically 2 to 4 mmHg lower than in the follicular phase, and it falls further in pregnancy.',
        go:'she has had no luteal phase since August, so she has had no progesterone. Predict what that does to her resting PaCO<sub>2</sub> and to her ventilatory response to carbon dioxide, and say where progesterone is acting to produce that effect. Then say what will change about her blood gas once her cycles return, and why that matters when you interpret a single gas in any menstruating patient.' },
      exercise:{ data:'Energy availability is dietary energy intake minus the energy cost of exercise, expressed per kilogram of lean mass. Her October figures are in the chart above.',
        go:'calculate her energy availability in October and say whether it sits above or below the threshold in the chart. Then explain why the reproductive axis is among the first systems to go quiet under an energy deficit and among the last to come back, and say what the return of her period on November 28 tells you about what she was eating in the weeks before it.' }
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
    arc:'Nothing new opens this week and nothing new is asked. This is the week of Midterm 1, and this entry is the review: seven chart entries about one person, read as one person. Then you hand her over, because in Week 9 you pick up a patient who is nothing like her.',
    chart:[
      ['Discharge summary, September 22 to September 27','Admitted with new type 1 diabetes and a severe metabolic disturbance. Treated with intravenous fluid, an insulin infusion and potassium replacement. Transitioned to basal and bolus insulin on day 3. Discharged on day 6, walking with a frame, on twice daily basal insulin with mealtime bolus doses.'],
      ['Where she is on December 5','Weight 59 kg (130 lb), against 61 kg in August and 55 kg on arrival. Grip 31 kg against 32 kg in August. Menses returned November 28. Cleared for full training November 25, playing again since December 1.'],
      ['The numbers that have not gone back','Lean soft tissue 43.1 kg against 45.1 kg in August. C-peptide still undetectable, and it will stay that way.'],
      ['What she says','That the week she cannot remember is the part that frightens her, and that she wants to know whether it will happen again.']
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
      'Pick any three entries from Weeks 1 to 7 and name one regulated variable in each. For each one, name the sensor, the integrator and the effector, and say whether the loop failed, was overwhelmed, or worked correctly and was misread by the people looking at it.',
      'Her potassium was 5.4 while her total body potassium was depleted by roughly 200 mEq. Her measured sodium was 128 while her corrected sodium was 137. Her serum was full of glucose while her muscle cells had no fuel. Name the single idea all three share, and say what it means for how you read any number on any chart.',
      'Trace one molecule of glucose from her September 22 bloodstream to the inside of a muscle cell, and say exactly where the journey stops. Then trace the same molecule on December 5 and say what is standing in for the missing step.',
      'Interpret this file as a whole. Say what seven entries about one patient showed you that seven entries about seven patients could not have, and say what a file like this one cannot show.',
      'Name the one measurement you would have added to her August preseason physical, and say what question it would have let you answer in October.'
    ],
    tracks:{
      nursing:{ data:'She is being discharged from the clinic back to routine care. Your handover goes to a nurse who has never met her and will see her every three months.',
        go:'write the handover, and write it as physiology rather than as a list of events. Name the three things about her that will still be true in a year, the two that were true only during the admission, and the one early sign you would want that nurse to act on without waiting for a clinic appointment. Justify each from a number in her file.' },
      medicine:{ data:'Her problem list at closure has active problems, resolved problems and one that was never a problem at all.',
        go:'write the problem list. For each entry say the week you could first have named it, the evidence that named it, and whether it is active, resolved, or was never a problem. Then answer her actual question, whether it will happen again, in three sentences, and make every clinical claim in them traceable to a number in the file.' },
      radiology:{ data:'Across the whole file she had one screening ECG, two DEXA scans, one pelvic ultrasound and no cross sectional imaging at all.',
        go:'name the single study across the whole file that actually changed what was done to her, and defend the choice. Then name the study that came closest to being unnecessary, and say what question it was answering that a number already on the chart had answered first. Finish by naming one study that was not done and should have been, or say plainly that there is none.' },
      rt:{ data:'She arrived breathing 32 times a minute, deeply and without effort, with a normal oxygen saturation, and nobody touched her airway at any point in the admission.',
        go:'her breathing was the loudest abnormal sign on arrival and it needed no treatment. Explain why, and be precise about what her ventilation was accomplishing. Then say exactly what would have had to change, in her numbers or her muscles, for her respiratory rate of 32 to become the reason to intubate her, and name the measurement that would have caught it first.' },
      exercise:{ data:'She was cleared for full training on November 25 and played her first match on December 1. Her lean mass is still 2 kg below her August value, and she now has to dose insulin around training.',
        go:'write the return to play decision as a physiologist rather than as a form. Name the three systems you cleared, the evidence in the file for each, and the one that is still not back. Then say what changes about her exercise physiology permanently now that the hormone controlling fuel release has to be injected instead of secreted.' }
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
    date:'March 10, and November 4 at 08:40', when:'His last well clinic visit, and the morning he arrived',
    encounter:'Emergency department, arrival',
    tools:[
      ['Why his lactate is 4.6',
       'Lactate is on this page because it is the fastest available answer to the question this week is really about: is the pump keeping up with what the tissues are asking for. When oxygen delivery falls behind demand, cells make ATP by a route that ends in lactate, and it accumulates. That is all you need from it this week, and one question uses it that way. Where the acid that comes with it goes, and why it is genuinely disputed, is Week 15.',
       15],
      ['Reading stroke volume off an echocardiogram',
       'The echo does not see blood volume. It measures the diameter of the outflow tract just below the aortic valve, which gives an area, and it measures how far the column of blood travels through that area in one beat. Area times distance is a volume, and that volume is the stroke volume. It is written out on the chart below so you do not have to do the geometry. What matters for this week is that stroke volume is measured, ejection fraction is a ratio, and they are not the same kind of number.',
       0],
      ['Why his bicarbonate is 15 and his pH is 7.32',
       'Two solutes on his panel belong to a system you reach in Week 15. Notice them, and leave them alone. Nothing this week turns on them.',
       15]
    ],
    arc:'He has had a bad pump for six years and he has lived around it. Then he got an infection, which asks a heart for more output, and his heart has none left to give. The trap on this page is that his cardiac output reads normal. Read it against what a man with a temperature of 38.9 &deg;C (102.0 &deg;F) should be producing and it is not normal at all, and two numbers on this page tell you so.',
    chart:[
      ['Baseline, March 10 clinic','HR 64, BP 118/70, RR 16, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 96% on room air. Weight 88 kg (194 lb), height 178 cm (5 ft 10 in). Echocardiogram: ejection fraction 30%, left ventricle dilated. He walks his dog twice a day and stops once on the hill.'],
      ['November 4, 08:40, arrival','Four days of cough and fever, one day of confusion. Brought in by his daughter. HR 118, BP 82/46, RR 28, temperature 38.9 &deg;C (102.0 &deg;F), SpO<sub>2</sub> 88% on room air and 93% on 6 L by nasal cannula. Weight 91 kg (201 lb).'],
      ['Examination','Confused but rousable. Knees mottled, capillary refill 4 seconds, hands cold to the wrist. Crackles at the right base and through the right mid-zone. Jugular venous pressure raised 8 cm above the sternal angle. Third heart sound present. Pitting edema to mid-shin.'],
      ['ECG, 08:45','Sinus tachycardia at 118. Q waves in V1 to V4, unchanged from March. No ST elevation.'],
      ['Bedside echocardiogram, 09:20','Ejection fraction 25%. Left ventricular internal diameter in diastole 62 mm. Stroke volume 42 mL at a heart rate of 118, so cardiac output 4.9 L/min. Body surface area 2.1 m<sup>2</sup>. Inferior vena cava 2.3 cm with almost no change through the respiratory cycle. Central venous pressure 14 mmHg.'],
      ['Note','He took his morning carvedilol at 07:00, before his daughter found him confused.']
    ],
    panels:[
      { name:'Chemistry', when:'November 4, 08:50', rows:[
        ['Sodium','132','mEq/L','135 to 145','L'],
        ['Potassium','5.1','mEq/L','3.5 to 5.0','H'],
        ['Chloride','98','mEq/L','98 to 107',''],
        ['Bicarbonate','15','mEq/L','22 to 29','L'],
        ['Glucose','268','mg/dL','70 to 99','H'],
        ['Blood urea nitrogen','48','mg/dL','7 to 20','H'],
        ['Creatinine','2.6','mg/dL','0.7 to 1.3','H'],
        ['Albumin','2.9','g/dL','3.5 to 5.0','L']
      ]},
      { name:'Cardiac and perfusion markers', when:'November 4, 08:50', rows:[
        ['Troponin T (high sensitivity)','68','ng/L','under 14','H'],
        ['B-type natriuretic peptide','1,840','pg/mL','under 100 (his March value was 480)','H'],
        ['Lactate','4.6','mmol/L','0.5 to 2.0','H'],
        ['Central venous oxygen saturation','52','%','70 to 80','L']
      ]},
      { name:'Arterial blood gas, on 6 L nasal cannula', when:'November 4, 08:55', rows:[
        ['pH','7.32','','7.35 to 7.45','L'],
        ['PaCO<sub>2</sub>','30','mmHg','35 to 45','L'],
        ['PaO<sub>2</sub>','62','mmHg','80 to 100','L'],
        ['Bicarbonate','15','mEq/L','22 to 26','L'],
        ['SaO<sub>2</sub>','92','%','95 to 100','L']
      ]}
    ],
    five:[
      'Cardiac output has four inputs. Name them, and for each one say which number on this page reports it and which way it has moved since March.',
      'His cardiac output is 4.9 L/min, which sits inside the normal adult range. Say what it should be in a 68 year old man with a temperature of 38.9 &deg;C (102.0 &deg;F) and an infection, show where your estimate comes from, and use the difference to say whether his pump is keeping up. Then name the two numbers on this page that are the evidence it is not.',
      'Explain the Frank-Starling relationship. Draw his curve against a normal one, mark where he was in March and where he is this morning, and use the drawing to predict what another liter of fluid would do to his stroke volume.',
      'Interpret an ejection fraction of 25 percent. Say what it shows and what it cannot show. Then work out his end diastolic volume from the numbers on this page, and use it to explain why his stroke volume is only a third below normal when his ejection fraction is less than half of normal.',
      'Name the one measurement that would change what you give him in the next hour, and say what you would do differently for a high result and for a low one.'
    ],
    tracks:{
      nursing:{ data:'His weight is 91 kg this morning, 88 kg at the March clinic visit. His jugular venous pressure is raised, he has pitting edema to mid-shin, and his blood pressure is 82/46. He has passed 20 mL of urine in the two hours since he arrived.',
        go:'weight is the most useful number on this page and it is the one nobody orders. Say what 3 kg of gain represents in liters and which compartment it is in, showing the arithmetic. Then explain how a man with a blood pressure of 82/46 can be fluid overloaded at the same time, naming the two compartments that are moving in opposite directions. Finish with what you would chart hourly tonight and the single number that would make you call someone.' },
      medicine:{ data:'His troponin is 68 ng/L against a reference of under 14. His ECG shows old Q waves in V1 to V4 and no ST elevation. His heart rate is 118, his diastolic pressure is 46, and his arterial oxygen saturation is 92 percent.',
        go:'a raised troponin is not the same as a blocked artery. Say what troponin is, where in the cell it sits, and give three ways a heart can release it with no coronary occlusion at all. Then use the three numbers above to argue which mechanism is operating here, being specific about what sets coronary blood flow and when in the cardiac cycle the left ventricle actually gets perfused. Finish by saying what your answer changes about the next hour.' },
      radiology:{ data:'Chest radiograph 09:05: consolidation in the right lower and right middle lobes. Cardiothoracic ratio 0.58. Small bilateral pleural effusions. Upper lobe vessels more prominent than lower.',
        go:'a chest film measures shadows, not function. Say what the cardiothoracic ratio physically measures and what has to be assumed before you can call it cardiomegaly, then say why a film taken at the bedside makes that assumption weaker. Name which of the four findings changes what is done this morning, and name the number in his chart that the film could never have given you.' },
      rt:{ data:'His oxygen saturation by pulse oximeter is 93 percent on 6 L. His central venous oxygen saturation, sampled from a catheter tip in the superior vena cava, is 52 percent. His hemoglobin is 11.8 g/dL.',
        go:'both numbers are saturations and they are reporting two completely different things. Say what each one samples and what each one tells you. Then write out the four terms that set oxygen delivery, put his numbers into each, and say which term is failing. Finish by explaining how a man can have an arterial saturation of 93 percent and a central venous saturation of 52 percent at the same time, and what that gap means about extraction.' },
      exercise:{ data:'In March he walked his dog twice a day and stopped once on the hill. Peak oxygen uptake in a man with an ejection fraction of 30 percent typically runs 14 to 18 mL/kg/min, against 30 or more for an untrained man of his age. Resting metabolic rate rises by roughly 10 percent for each degree Celsius of fever.',
        go:'his reserve was gone before he got sick. Say what cardiac reserve is, how it is measured, and what sets its ceiling. Then put a number on the extra oxygen demand a temperature of 38.9 &deg;C (102.0 &deg;F) creates, show the arithmetic, and explain why a pump that copes with a slow walk cannot cope with a fever. Finish by naming what his body is doing instead, and what it costs him.' }
    }
  },

  /* ---------------------------------------------------------- 10 */
  10: {
    title:'Pressure, Flow, and Holding Blood Pressure Steady',
    date:'November 4, 09:00 to 18:00', when:'Day 1, the first nine hours',
    encounter:'Resuscitation and hemodynamic support',
    tools:[
      ['Pulse pressure variation',
       'One number on the chart below comes from a system you reach in Week 13. A ventilator, or a big spontaneous breath, changes the pressure inside the chest with every breath, and that changes how much blood reaches the right heart. If a ventricle is sitting on the steep part of its Frank-Starling curve, that breath to breath change shows up as a swing in the size of the arterial pulse. A large swing, conventionally above about 12 percent, says more filling would raise the output. A small swing says it would not. His is 8 percent.',
       13]
    ],
    arc:'Mean arterial pressure is the product of flow and resistance, and a body can defend it by raising either one. Over nine hours he is asked to do both, and the chart records exactly what each one costs him. The fluid that was meant to help him made his lung worse within twenty-five minutes, and the drug that raised his pressure did not raise his flow.',
    chart:[
      ['09:00, before anything','BP 82/46, mean arterial pressure 58 mmHg. HR 118. Central venous pressure 14 mmHg. Cardiac output 4.9 L/min. Pulse pressure 36 mmHg. Pulse pressure variation 8%.'],
      ['09:10, fluid','500 mL of balanced crystalloid over 20 minutes.'],
      ['09:35, after the fluid','BP 86/50, mean arterial pressure 62 mmHg. Central venous pressure 18 mmHg. Cardiac output 5.1 L/min. SpO<sub>2</sub> fell from 93% to 89% on the same 6 L.'],
      ['09:50','A second 500 mL was considered and not given. Noradrenaline started at 0.05 &micro;g/kg/min through a central line, titrated to 0.22 &micro;g/kg/min by 11:00.'],
      ['11:00','BP 104/58, mean arterial pressure 73 mmHg. HR 104. Central venous pressure 16 mmHg. Cardiac output 5.6 L/min. Lactate 3.4 mmol/L. Urine output 15 mL/h.'],
      ['16:00','Dobutamine added at 5 &micro;g/kg/min.'],
      ['18:00','BP 108/56, mean arterial pressure 73 mmHg. HR 112. Central venous pressure 16 mmHg. Cardiac output 6.8 L/min. Lactate 2.1 mmol/L. Urine output 35 mL/h. Central venous oxygen saturation 66%.'],
      ['Note','He took carvedilol 12.5 mg at 07:00. Lisinopril and spironolactone were held on admission.']
    ],
    panels:[
      { name:'Derived hemodynamics', when:'November 4', rows:[
        ['Mean arterial pressure, 09:00','58','mmHg','70 to 100','L'],
        ['Mean arterial pressure, 11:00','73','mmHg','70 to 100',''],
        ['Systemic vascular resistance, 09:00','718','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200','L'],
        ['Systemic vascular resistance, 11:00','814','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200',''],
        ['Systemic vascular resistance, 18:00','671','dyn&middot;s&middot;cm<sup>&minus;5</sup>','800 to 1,200','L'],
        ['Cardiac index, 18:00','3.2','L/min/m<sup>2</sup>','2.5 to 4.0','']
      ]},
      { name:'Serum albumin and oncotic pressure', when:'November 4', rows:[
        ['Albumin','2.9','g/dL','3.5 to 5.0','L'],
        ['Estimated plasma colloid osmotic pressure','13','mmHg','25 to 28','L']
      ]}
    ],
    five:[
      'Write the equation connecting mean arterial pressure, cardiac output and systemic vascular resistance. Calculate his systemic vascular resistance at 09:00 and at 11:00 from the numbers on this page, show the arithmetic, and say in one sentence what the noradrenaline actually changed.',
      'He was given 500 mL. His central venous pressure rose by 4 mmHg and his cardiac output rose by 0.2 L/min. Using the Frank-Starling curve you drew last week, predict what a second 500 mL would have done. Then say what happened to his oxygen saturation in those twenty-five minutes and name the force that changed to produce it.',
      'Explain the baroreflex: name the sensor, where it sits, the afferent nerve, the integrator, and both efferent limbs. Then say what carvedilol does to that loop, and use it to explain why a heart rate of 118 in him is a larger signal than a heart rate of 118 in a man who takes nothing.',
      'Interpret a mean arterial pressure of 73 at 11:00. Say what it shows and what it cannot show about whether his kidneys and his gut are being perfused, and name the numbers on this page that argue they were not.',
      'Name the one measurement that would tell you whether to add more noradrenaline or to add dobutamine, and say what a high and a low result would each mean.'
    ],
    tracks:{
      nursing:{ data:'The order reads: titrate noradrenaline to a mean arterial pressure of at least 65 mmHg. It does not give a target blood pressure. Urine output is charted hourly and capillary refill every two hours.',
        go:'say why the mean, rather than the systolic, is the number the order chose, and what the mean represents across a whole cardiac cycle that a systolic reading does not. Then name three things you would watch, other than the blood pressure itself, to tell you that the pressure you are creating is actually producing flow. For each one say which finding would tell you it is not, and say which of the three moved first in him.' },
      medicine:{ data:'Noradrenaline acts mainly at alpha-1 receptors with some beta-1 activity. Dobutamine acts mainly at beta-1 receptors with some beta-2 activity. Between 16:00 and 18:00 his cardiac output rose from 5.6 to 6.8 L/min while his systemic vascular resistance fell from 814 to 671, and his mean arterial pressure did not change.',
        go:'take each drug and say which receptor it occupies, which second messenger follows, and what the smooth muscle cell or the myocyte then does. Then explain how adding dobutamine raised his cardiac output and lowered his resistance at the same time, and why the mean arterial pressure held steady through both. Finish by saying what his lactate falling from 3.4 to 2.1 tells you about which of the two changes mattered.' },
      radiology:{ data:'Bedside ultrasound at 09:00: inferior vena cava 2.3 cm with almost no respiratory variation. Lung ultrasound: B-lines in all anterior and lateral zones bilaterally, denser on the right.',
        go:'inferior vena cava diameter is offered as a volume measurement and it is not one. Say what it physically measures, and name two things other than blood volume that change it in him specifically. Then say what a B-line physically is, in terms of what sound does at an interface, and use the fact that they are bilateral and in every zone to argue what is filling his alveoli and where it came from.' },
      rt:{ data:'His oxygen saturation fell from 93 percent to 89 percent within twenty-five minutes of a 500 mL fluid bolus, on the same 6 L of oxygen. His albumin is 2.9 g/dL and his estimated plasma colloid osmotic pressure is 13 mmHg against a normal 25 to 28.',
        go:'the fluid was given to help him and it made his lung worse inside half an hour. Name the four Starling forces at the pulmonary capillary, say which one the bolus changed and by how much, and say which one his albumin had already weakened. Then explain why the same 500 mL would have been far safer in a man with a normal albumin, and name the one feature of the pulmonary circulation that makes it the first place this shows up.' },
      exercise:{ data:'A healthy person meeting a demand for more flow raises cardiac output and drops resistance in the working muscle beds at the same time; mean arterial pressure barely moves. In him, the pressure between 09:00 and 11:00 was held almost entirely by raising resistance.',
        go:'name the two ways a body can defend a mean arterial pressure, and say which one is cheap and which one is expensive. Then explain precisely what raising systemic vascular resistance costs a left ventricle with an ejection fraction of 25 percent, using the word afterload and saying what it does to stroke volume and to myocardial oxygen demand. Finish by naming the organ bed that pays for it first and the number in his chart that shows it paying.' }
    }
  },

  /* ---------------------------------------------------------- 11 */
  11: {
    title:'Blood, and How the Body Defends Itself',
    date:'November 4 to November 8', when:'Day 1 to day 5',
    encounter:'The infection, and the response to it',
    tools:[
      ['Procalcitonin',
       'One number on this panel is not core physiology and the course will not build it. Procalcitonin is a peptide released by many tissues during bacterial infection and suppressed during viral infection. It is on the chart because its fall from 8.4 to 2.1 over four days is evidence about the organism rather than about the response, and one question asks you to separate those two things. Take the number as given.',
       0]
    ],
    arc:'Two things are happening to him and they need separating. There is an organism, and there is what his body is doing about the organism. The antibiotic treats the first one. Almost everything on this page, including the thing that nearly killed him, is the second one. By Day 3 his white cell count has fallen below normal without anyone treating it, and that is worse news than the 19.4 he arrived with.',
    chart:[
      ['Microbiology','Two sets of blood cultures taken Day 1 before antibiotics. Both positive on Day 2 for Streptococcus pneumoniae. Sputum grew the same organism. Urine culture negative. Antibiotics started Day 1 at 09:30.'],
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
      'Name each cell line in a differential count and say what each one does. Then say which line is raised on Day 1, which lines have fallen by Day 3, and which single cell line is doing most of the damage to him.',
      'His white cell count fell from 19.4 to 3.1 with nothing done to it. Give two mechanisms that could produce that fall, say what each one predicts about the bone marrow, and say which one his band count of 18 percent argues for.',
      'Explain what a fever is in control system terms: name the regulated variable, the sensor, the integrator, the effectors, and say precisely what changed. Then say what a temperature of 35.8 &deg;C (96.4 &deg;F) on Day 3, in a man with live bacteria in his blood, means about that loop.',
      'Interpret a platelet count of 84 with an INR of 1.8, a fibrinogen of 180 and a D-dimer of 6,400, in a man who is not bleeding. Say what that pattern shows and what it cannot show.',
      'Name the one measurement that would tell you whether his fall in hemoglobin from 11.8 to 9.6 is dilution, bleeding, or something being made less of, and say what each result would look like.'
    ],
    tracks:{
      nursing:{ data:'On Day 3 he is cold to the touch. His temperature is 35.8 &deg;C (96.4 &deg;F) and the team is more worried than they were on Day 1 when it was 38.9 &deg;C (102.0 &deg;F). His blood cultures are still growing the organism.',
        go:'a normal or low temperature in a septic patient is not reassurance. Say what has to be true of the thermoregulatory loop for a man with live bacteria in his blood to run cold, naming which effectors have stopped working and why. Then say what you would document about him every hour, and name the single observation that would make you escalate before the next set of bloods comes back.' },
      medicine:{ data:'The organism is Streptococcus pneumoniae and it is in his blood. The mediators released in response to it are the same ones that produced the low systemic vascular resistance and the capillary leak you worked with in Week 10.',
        go:'for each of the following, say whether the organism or the response to it is doing the work: his systemic vascular resistance of 718, the fluid in his lungs, his platelet count of 84, his fever, and his central venous oxygen saturation of 52 percent. Then say which of the two you can treat directly, name what the treatment for the other one is, and use that to explain why he keeps getting worse for three days after the correct antibiotic was given.' },
      radiology:{ data:'Day 1 chest film: consolidation confined to the right lower and right middle lobes. Day 3 chest film: opacity now through the left lower zone as well, and increased bilaterally. Heart size unchanged.',
        go:'the film now shows shadow in a lobe that had no organisms in it on Day 1. Name two completely different processes that could put fluid into that lobe and be precise about what each fluid is physically made of and where it crossed. Then say which numbers on this page support each, and finish by saying plainly what the film alone can never settle.' },
      rt:{ data:'Neutrophils reaching an alveolus release proteolytic enzymes and reactive oxygen species. These damage the organism and the alveolar epithelium and the capillary endothelium alongside it. By Day 3 his ratio of arterial oxygen to inspired oxygen fraction has roughly halved.',
        go:'name what an alveolus and its capillary have to be for gas exchange to work, structure by structure and distance by distance. Then say what a neutrophil-rich exudate does to each of those structures. Finish by arguing which is doing more damage to his gas exchange by Day 3, the organism or his own neutrophils, and name the number you would use to make the argument.' },
      exercise:{ data:'A single hard training session raises the circulating white cell count within minutes, often to 12 to 15 &times;10<sup>9</sup>/L, and the count then falls below the starting value for some hours afterwards. Nothing is made or destroyed on that timescale.',
        go:'exercise moves the same number that sepsis moves, and it moves it in both directions within an afternoon. Say where the cells come from in each phase and where they go, and be specific about demargination and about what makes a cell marginate in the first place. Then name two things on this page that make his 19.4 a different kind of number from an athlete\'s 14 after a match, and say which of the two you would trust more.' }
    }
  },

  /* ---------------------------------------------------------- 12 */
  12: {
    title:'Digestion, and How You Use Food for Fuel',
    date:'November 8 to November 16', when:'Day 5 to day 13',
    encounter:'Nutrition, metabolism and the gut',
    tools:[
      ['Nitrogen balance',
       'Protein is the only major fuel that carries nitrogen, and almost all of the nitrogen leaving the body leaves as urea in the urine. So if you measure the protein going in and the urea nitrogen coming out, the difference tells you whether protein is being built or burned. The arithmetic: <strong>nitrogen in = protein intake in grams &divide; 6.25</strong>, and <strong>nitrogen out = urinary urea nitrogen + about 4 g/day</strong> for losses through skin and stool. A negative balance means he is taking his protein from himself. One gram of nitrogen is roughly 6.25 g of protein, which sits in roughly 30 g of wet lean tissue.',
       0],
      ['Respiratory quotient',
       'Respiratory therapy prompt only. The respiratory quotient is the volume of carbon dioxide produced divided by the volume of oxygen consumed. It is about 1.0 when carbohydrate is burned, 0.7 for fat and 0.8 for protein, because those fuels differ in how much oxygen they already carry. The indirect calorimeter that measured his energy expenditure reports it. His is 0.76.',
       13]
    ],
    arc:'He is not eating and he is burning about 600 kcal a day more than a man his size at rest should. The fuel is coming from him. This entry is about where it is coming from, why feeding him is a physiological intervention rather than hotel service, and why the first few days of feeding a starved patient are more dangerous than the starving was.',
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
      'Trace one gram of the protein in his nasogastric feed from the tip of the tube to the inside of a muscle cell. Name the enzyme, the site and the transporter at every step, and say which of those steps a sedated ventilated patient does badly.',
      'His measured energy expenditure is 2,240 kcal/day against a predicted 1,650. Say where the extra 590 is going and name the three hormones driving it. Then calculate his nitrogen balance from the Day 7 figures and use it to predict how much lean tissue he loses over ten days at that rate.',
      'Explain why his glucose is running near 250 on an insulin infusion when he is being given almost no carbohydrate. Name the tissue making the glucose, the substrate it is made from, and the hormones telling it to. Then say why giving him more carbohydrate would not fix it.',
      'Interpret an albumin of 2.2 g/dL. Say what it shows and what it cannot show about his nutrition, and name the two processes other than intake that moved it.',
      'Name the one measurement that would tell you whether his gut is working, and say what you would do differently for each answer.'
    ],
    tracks:{
      nursing:{ data:'Gastric residual volumes of 180 mL and 240 mL were measured four hours apart on Day 5, and the feed was held after the second one. He has absent bowel sounds and has not passed stool since admission. He is sedated and lying flat for a procedure.',
        go:'a residual volume of 240 mL makes people stop a feed. Say what a residual volume actually measures, naming the two separate things that set it, and say what it does not measure. Then argue from his chart whether the feed should have been held, and name what you would watch instead. Finish with the one change to his position or his drugs that would most improve gastric emptying, and say why it works.' },
      medicine:{ data:'His phosphate fell from 2.4 to 1.4 mg/dL, his magnesium to 1.4 and his potassium to 3.2, all within 48 hours of starting the feed and all while he was receiving replacement. He had eaten almost nothing for five days before that.',
        go:'three electrolytes fell together within two days of food arriving. Name the hormone released when carbohydrate reaches the bloodstream and say what it does to each of those three ions and why. Then say what phosphate is needed for inside a cell, name the two molecules that matter most here, and say which organ system fails first when phosphate is 1.4. Connect that failure to what he is being asked to do on the ventilator this week.' },
      radiology:{ data:'Abdominal radiograph Day 5: gas-filled loops of small and large bowel throughout, no air-fluid levels, no free gas under the diaphragm. Nasogastric tube tip projected over the gastric body.',
        go:'say what a plain abdominal film physically measures and what makes gas visible on it at all. Then say what distinguishes a bowel that has stopped moving from a bowel that is blocked, both on the film and at the bedside, and name which finding on his film is the one that separates them. Argue which he has, and say what the film cannot exclude.' },
      rt:{ data:'Carbon dioxide production rises with the amount and the type of fuel burned. His measured respiratory quotient on Day 6 is 0.76. His static lung compliance this week is about 27 mL/cmH<sub>2</sub>O against a normal 50 to 100.',
        go:'say what a respiratory quotient of 0.76 tells you about what he is currently burning. Then work out what would happen to his carbon dioxide production if he were fed a high carbohydrate formula at 130 percent of his measured expenditure, and say what that does to the minute ventilation he has to generate to hold the same pH. Finish by explaining why that matters most on the day someone tries to take him off the ventilator, and name the number you would watch.' },
      exercise:{ data:'Bed rest alone costs roughly 1 percent of muscle mass per day in a healthy young adult. He is 68, septic, sedated, and has been still for five days. On Day 10 he weighs 88 kg, which is exactly what he weighed in March.',
        go:'name the two processes whose balance sets muscle mass and say what critical illness does to each of them. Then explain why feeding him alone will not hold his muscle, name the stimulus that is missing and the pathway it normally switches on, and say what you would actually do about it on Day 5 in a sedated ventilated patient. Finish by saying why the man who weighs 88 kg on Day 10 is not the same man who weighed 88 kg in March, and what a scale can and cannot tell you about that.' }
    }
  },

  /* ---------------------------------------------------------- 13 */
  13: {
    title:'Breathing, Gas Transport, and the Fast pH Lever',
    date:'November 5 to November 10', when:'Day 2 to day 7',
    encounter:'Respiratory failure, ventilation and weaning',
    tools:[
      ['Winter\'s formula',
       'Question 3 asks whether his breathing is doing enough about his acid, and the course does not build the acid-base tools until Week 15. Here is the one you need. When a metabolic acidosis is present, a working respiratory system drops the PaCO<sub>2</sub> to a predictable place: <strong>expected PaCO<sub>2</sub> = 1.5 &times; bicarbonate + 8, plus or minus 2</strong>, with bicarbonate in mEq/L and PaCO<sub>2</sub> in mmHg. If the measured value sits above that range, the lungs are not keeping up and there is a respiratory acidosis on top. This week you use it as a check on muscles. Week 15 is where you build it.',
       15],
      ['The rapid shallow breathing index',
       'A bedside index rather than a piece of physiology, and the course will not build it. It is the respiratory rate divided by the tidal volume in liters. Above about 105 it predicts that a patient taken off the ventilator will not stay off. It is on the chart because the arithmetic behind why fast and shallow fails is exactly this week\'s material.',
       0],
      ['Predicted body weight',
       'Lungs scale with height, not with waistline, so ventilator tidal volumes are set from a predicted body weight calculated from height alone. For a man: <strong>50 + 0.91 &times; (height in cm &minus; 152.4)</strong>. His height is 178 cm, so his predicted body weight is 73 kg, and 6 mL per kg of that is 440 mL. His actual weight on Day 2 is 89 kg.',
       0]
    ],
    arc:'His lung fails in two stages and they are not the same problem. First it gets wet, because of what you worked on in Week 10. Then it gets stiff, because of what you worked on in Week 11. By Day 2 the fast lever that normally holds a pH steady within a minute is being asked to cover for a kidney that has stopped working, and the muscles doing the levering are the same ones that wasted in Week 12.',
    chart:[
      ['Day 1, 08:55, on 6 L nasal cannula','pH 7.32, PaCO<sub>2</sub> 30 mmHg, PaO<sub>2</sub> 62 mmHg, bicarbonate 15 mEq/L, SaO<sub>2</sub> 92%. Estimated inspired oxygen fraction 0.44.'],
      ['Day 2, 04:00, on high flow 60 L/min at inspired oxygen 0.80','pH 7.25, PaCO<sub>2</sub> 38 mmHg, PaO<sub>2</sub> 58 mmHg, bicarbonate 16 mEq/L. Respiratory rate 38, using accessory muscles, unable to finish a sentence.'],
      ['Day 2, 05:10','Intubated. Volume controlled ventilation, tidal volume 440 mL, rate 24, PEEP 12 cmH<sub>2</sub>O, inspired oxygen 0.70.'],
      ['Day 2, 08:00, ventilated','pH 7.24, PaCO<sub>2</sub> 44 mmHg, PaO<sub>2</sub> 78 mmHg, bicarbonate 18 mEq/L. Plateau pressure 28 cmH<sub>2</sub>O with a PEEP of 12. No bicarbonate was given.'],
      ['Day 4, proned 16 hours a day','pH 7.36, PaCO<sub>2</sub> 40 mmHg, PaO<sub>2</sub> 92 mmHg, bicarbonate 22 mEq/L, on inspired oxygen 0.55 and PEEP 12.'],
      ['Day 7, spontaneous breathing trial','Inspired oxygen 0.40, PEEP 8. Trial stopped after 12 minutes. Respiratory rate 34, tidal volume 260 mL. He was not distressed at the start and was sweating at the end.'],
      ['Hemoglobin','11.8 g/dL on Day 1, 9.6 g/dL from Day 3. His March value was 12.6 g/dL with a saturation of 96% on room air.']
    ],
    panels:[
      { name:'Gas exchange, derived', when:'Day 1 and Day 2', rows:[
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 1','141','mmHg','over 300','L'],
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 2, 04:00','73','mmHg','over 300','L'],
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 2, 08:00','111','mmHg','over 300','L'],
        ['PaO<sub>2</sub> to inspired oxygen ratio, Day 4','167','mmHg','over 300','L']
      ]},
      { name:'Respiratory mechanics, Day 2 ventilated', when:'November 5, 08:00', rows:[
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
      'Calculate his arterial oxygen content on Day 2 at 04:00 and at his March baseline, using 1.34 mL of oxygen carried per gram of hemoglobin and 0.003 mL per mmHg dissolved. Show both. Say which of the two terms does almost all the work, and what that means about treating him with oxygen alone.',
      'His alveolar to arterial oxygen difference is very large and it barely improves when the inspired oxygen is raised from 0.44 to 0.80. Name the two mechanisms that produce a low arterial oxygen with a large alveolar to arterial difference, say exactly how raising inspired oxygen separates them, and say which one he has.',
      'Explain the fast pH lever: name the reaction, the enzyme, the organ, and say how a change in breathing changes blood pH within a minute. Then apply Winter\'s formula to his Day 2, 04:00 gas and say whether his lever is working. Say what that answer told the team to do at 05:10.',
      'Interpret a plateau pressure of 28 with a PEEP of 12 and a tidal volume of 440 mL. Calculate his compliance, say what it shows, and say what it cannot show about whether the stiffness is in his lung or in his chest wall.',
      'Name the one measurement that would tell you whether his failed breathing trial on Day 7 is a lung problem or a pump problem, and say what each result would mean.'
    ],
    tracks:{
      nursing:{ data:'From Day 3 he is turned face down for 16 hours a day and supine for 8. His PaO<sub>2</sub> rose from 78 to 92 mmHg while his inspired oxygen was reduced from 0.70 to 0.55. He has a nasogastric feed running, an arterial line, a central line and a urinary catheter.',
        go:'say why turning a patient face down improves oxygenation, using what gravity does to blood flow and to alveolar inflation in a lung heavy with fluid, and be specific about which lung regions change and in which direction. Then name three things you would check every two hours in a proned patient, and for each one say which physiological problem you are guarding against rather than which policy you are following.' },
      medicine:{ data:'His tidal volume was set at 6 mL per kilogram of predicted body weight, which is 440 mL for his height, and his PaCO<sub>2</sub> was deliberately allowed to rise from 30 to 44 mmHg with a pH of 7.24. His actual weight on Day 2 is 89 kg.',
        go:'the team chose to let his carbon dioxide rise and his pH fall. Say what predicted body weight is calculated from and why it is used instead of his actual weight, then say what setting his tidal volume from 89 kg would have given and what that volume would do to an alveolus that is already stiff. Argue why accepting a pH of 7.24 is the better of two bad options, and name the number at which you would stop accepting it.' },
      radiology:{ data:'Day 1 film: consolidation in the right lower and right middle lobes only. Day 2 film: bilateral opacity in all four quadrants. Heart size unchanged from Day 1. His albumin is 2.2 g/dL and his central venous pressure on Day 2 is 16 mmHg.',
        go:'the film cannot tell you whether that water arrived because of a pressure problem or a permeability problem, and the answer changes the treatment completely. Say what each of those two processes physically puts into the alveolus, including what the fluid is made of. Then name two pieces of evidence, one on the film and one off it, that argue for permeability in him, and say what argues the other way.' },
      rt:{ data:'On Day 2 his plateau pressure is 28 cmH<sub>2</sub>O, his PEEP is 12 and his tidal volume is 440 mL. He is sedated and paralyzed for the measurement, so there is no respiratory effort of his own.',
        go:'calculate his static compliance and his driving pressure. Say what each one reports and be explicit about which one includes the PEEP and which does not, and why that difference matters. Then say what both numbers would look like if his chest wall rather than his lung were the stiff part, name the measurement that separates the two, and say what that measurement physically samples.' },
      exercise:{ data:'At the failed trial on Day 7 his respiratory rate was 34 with a tidal volume of 260 mL. His estimated anatomic dead space is 147 mL. A calm breathing pattern for a man his size would be about 500 mL at 12 breaths a minute.',
        go:'a failing breathing trial and a fatiguing athlete both end in fast shallow breaths. Calculate his alveolar ventilation at the trial and at the calm pattern, show both, and say which is larger. Then explain why fast and shallow is efficient for a few minutes and ruinous after that, using dead space and the work of breathing in your answer. Finish by saying what his diaphragm has been doing since Week 12 that makes this failure predictable.' }
    }
  },

  /* ---------------------------------------------------------- 14 */
  14: {
    title:'The Kidney and Body Fluid Balance',
    date:'November 4 to November 18', when:'Day 1 to day 15',
    encounter:'Acute kidney injury on chronic disease',
    tools:[
      ['Fractional excretion of sodium',
       'The kidney filters an enormous amount of sodium and reabsorbs almost all of it, so the useful question is not how much sodium is in the urine but what fraction of the filtered sodium escaped. That fraction is <strong>(urine sodium &times; plasma creatinine) &divide; (plasma sodium &times; urine creatinine) &times; 100</strong>. Below about 1 percent says the tubule is still reabsorbing hard, which is what a tubule does when it is being told the body is short of volume. Above about 2 percent says the tubule has stopped, which usually means it is damaged. It is built this week, and it is written out here so the arithmetic is in front of you.',
       14]
    ],
    arc:'Everyone says his kidney failed because it was not getting enough blood. Look at his central venous pressure of 14 and ask what a filter does when the pressure downstream of it rises. This is the week where the number people forget turns out to be the one doing the damage, and where a creatinine that improves at the end of the file improves partly for a reason that has nothing to do with his kidney.',
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
      'Name the three pressures that set glomerular filtration and say which way each one moved in him on Day 1. Then name the one people forget, and use his central venous pressure of 14 to explain how a filter can fail because of what is happening downstream of it.',
      'His fractional excretion of sodium was 0.4 percent on Day 1 and 2.6 percent on Day 3, and his urine osmolality fell from 520 to 310 mOsm/kg. Say what each pair of numbers reports about the tubule, and name what changed between the two days.',
      'Explain how the kidney defends blood pressure and volume: name the sensor, the enzyme it releases, the two hormones that follow, and the tubule segment each one acts on. Then say what holding his lisinopril and his spironolactone on Day 1 did to that system, and why it was held anyway.',
      'Interpret a creatinine of 2.6 on Day 1 in a man whose baseline is 1.5. Say what it shows and what it cannot show about how much filtration he had actually lost by that morning, and explain why.',
      'Name the one measurement that would tell you whether more diuretic or less fluid is the right move on Day 6, and say what a high and a low result would each mean.'
    ],
    tracks:{
      nursing:{ data:'His cumulative fluid balance on Day 6 is plus 7.4 L. His weight that morning is 94 kg, against 91 kg on admission and 88 kg in March, so the scale has him 3 kg up while the chart says 7.4 L went in. Both records were kept carefully. He is ventilated on a humidified circuit, he has had a fever since admission, and he is losing about 400 g of lean tissue a day.',
        go:'the chart says plus 7.4 L and the scale says plus 3 kg, and neither record is wrong. Account for the missing 4 kg. Name at least two routes of water leaving him that never reach an intake and output chart, one source of water that never appears as intake, and the reason losing tissue makes a scale under-report water gain. Then say what a plus 7.4 L balance means for a man with a central venous pressure of 18, and write the two sentences you would use at the bedside to argue for stopping fluid.' },
      medicine:{ data:'He took 40 mg of furosemide daily at home. On Day 3 a 40 mg intravenous dose produced 60 mL of urine in two hours. Furosemide works from inside the tubule lumen, and it reaches the lumen by being secreted into the proximal tubule by an organic anion transporter. It is more than 90 percent bound to albumin in plasma. His albumin is 2.2 g/dL, his blood urea nitrogen is 62 mg/dL and his chronic kidney disease predates this admission.',
        go:'give three separate physiological reasons a normal dose of furosemide did almost nothing in him, and tie each one to a number on this page. Be precise about where the drug has to be to work and what has to happen for it to get there. Then explain why an infusion was chosen over larger intermittent doses, using the transporter and the time the drug spends at its site of action in your answer.' },
      radiology:{ data:'He had iodinated contrast for a CT of the chest and abdomen on Day 2, when his creatinine was 2.6 and rising. Contrast is freely filtered and not reabsorbed. It raises the viscosity of tubular fluid and constricts the vasa recta. The renal medulla normally runs at an oxygen tension of about 10 to 20 mmHg while performing the most energy-expensive transport in the kidney.',
        go:'say what the CT was being asked to find and whether his chart on Day 2 justified asking. Then say what contrast does to the medulla specifically, and name the one feature of medullary blood supply that makes it the part of the kidney that pays. Finish by saying honestly whether his chart lets you separate contrast injury from what was already happening to him, and what would have had to be recorded for it to do so.' },
      rt:{ data:'On Day 8 his bicarbonate was 13 mEq/L and his ventilator rate was raised from 24 to 30 to hold his pH. His static lung compliance that week is about 27 mL/cmH<sub>2</sub>O. Renal replacement therapy was started the same day.',
        go:'his kidney has stopped doing a job that his lung is now being asked to cover. Say what the kidney normally does with bicarbonate and with hydrogen ion, naming the segment responsible for each, and say how long that response takes compared with the lung. Then work out what running a lung with a compliance of 27 at a rate of 30 costs him, and explain why starting dialysis was, among other things, a treatment for a breathing problem.' },
      exercise:{ data:'In March his estimated glomerular filtration rate was 50 mL/min/1.73 m<sup>2</sup> on a creatinine of 1.5. On Day 15 his creatinine is 2.4 and the estimate is 29. Creatinine is produced from creatine phosphate in muscle at a rate proportional to muscle mass. He has lost roughly 6 kg of lean tissue.',
        go:'his creatinine fell from 3.8 to 2.4 and some of that fall is not his kidney recovering. Explain where creatinine comes from and why losing muscle lowers the number without changing filtration at all. Then say which direction that error pushes an estimated glomerular filtration rate calculated from creatinine, and whether it makes him look better or worse than he is. Finish by naming a measurement that would not be fooled by his lost muscle, and say what it is made by instead.' }
    }
  },

  /* ---------------------------------------------------------- 15 */
  15: {
    title:'The Slow pH Lever, and Putting It Together',
    date:'Both files, read again', when:'November 4 again, and September 22 again',
    encounter:'Integration',
    tools:[
      ['Correcting an anion gap for albumin',
       'Albumin is itself an anion, and most of the normal anion gap is albumin. So a patient with a low albumin has a low apparent gap even when unmeasured acids are piling up. The correction: <strong>corrected gap = measured gap + 2.5 &times; (4.0 &minus; albumin in g/dL)</strong>. It matters in Dale and not in Camila, and one question turns on exactly that.',
       0],
      ['The delta ratio',
       'When one acidosis is layered on another, the arithmetic that separates them compares how far the gap rose with how far the bicarbonate fell. Work out the rise in the anion gap above 12, and the fall in bicarbonate below 24, and compare them. Roughly equal means one high gap acidosis and nothing else. A gap that rose less than the bicarbonate fell means a second, normal gap acidosis is present as well.',
       0]
    ],
    arc:'This is the last entry and it is the first one again, twice. You read Camila\'s arrival gas in Week 3 and were told to leave it alone. You read Dale\'s in Week 9 and were told the same. Read both of them now. Then read the gas each of them had once treatment had been running, which is the one that catches people out, because in both patients the treatment created a second acidosis while it was fixing the first.',
    chart:[
      ['Camila, September 22, 06:45, on arrival','pH 7.09, PaCO<sub>2</sub> 14 mmHg, bicarbonate 4 mEq/L. Sodium 128, chloride 96, albumin 4.2 g/dL, glucose 642 mg/dL, beta-hydroxybutyrate 6.8 mmol/L.'],
      ['Camila, September 22, 18:00, after 6 L of 0.9% saline and an insulin infusion','pH 7.31, PaCO<sub>2</sub> 26 mmHg, bicarbonate 13 mEq/L. Sodium 140, chloride 112, albumin 3.9 g/dL, glucose 198 mg/dL, beta-hydroxybutyrate 1.1 mmol/L.'],
      ['Dale, November 4, 08:55, on arrival','pH 7.32, PaCO<sub>2</sub> 30 mmHg, bicarbonate 15 mEq/L. Sodium 132, chloride 98, albumin 2.9 g/dL, lactate 4.6 mmol/L, creatinine 2.6 mg/dL.'],
      ['Dale, November 5, 04:00, Day 2, before intubation','pH 7.25, PaCO<sub>2</sub> 38 mmHg, bicarbonate 16 mEq/L. Respiratory rate 38, using accessory muscles.'],
      ['Dale, November 10, Day 7, after about 9 L of 0.9% saline over three days','pH 7.31, PaCO<sub>2</sub> 40 mmHg, bicarbonate 20 mEq/L. Sodium 141, chloride 114, albumin 2.1 g/dL, lactate 1.2 mmol/L.'],
      ['Dale, November 18, Day 15, off renal replacement','pH 7.36, PaCO<sub>2</sub> 38 mmHg, bicarbonate 21 mEq/L. Sodium 140, chloride 108, albumin 2.6 g/dL.']
    ],
    panels:[
      { name:'Anion gaps, for you to check', when:'Both patients', rows:[
        ['Camila, arrival, albumin 4.2','you calculate','mEq/L','normal about 12',''],
        ['Camila, 18:00, albumin 3.9','you calculate','mEq/L','normal about 12',''],
        ['Dale, arrival, albumin 2.9','you calculate','mEq/L','normal about 12',''],
        ['Dale, Day 7, albumin 2.1','you calculate','mEq/L','normal about 12',''],
        ['Dale, Day 15, albumin 2.6','you calculate','mEq/L','normal about 12','']
      ]}
    ],
    five:[
      'Name the primary disturbance in each of the six blood gases on this page. For each one say which lever, the fast one or the slow one, is doing the compensating, and whether it is doing enough. Show the Winter\'s check for every gas where a metabolic acidosis is primary.',
      'Calculate the anion gap for Dale on November 4 and on November 10, and correct both for his albumin. Say what the two corrected numbers, read with his chloride, reveal about what happened between those dates, and name the fluid responsible.',
      'Explain the slow lever: name where filtered bicarbonate is reclaimed, where new bicarbonate is made, what the acid is excreted with, and how long the whole response takes. Then say why Dale\'s slow lever could not help him on November 4 and could not help him on November 10, for two completely different reasons.',
      'Interpret Camila\'s 18:00 gas and Dale\'s November 10 gas side by side. Both patients are improving. Both have a new acidosis that was made by the treatment. Say what each gas shows, what neither can show, and what you would change about the fluid in each case.',
      'Both files open with a person who was well and one sentence of history. Name the one measurement you would have added to Camila\'s August physical and the one you would have added to Dale\'s March clinic visit, and for each say what question it would have let you answer later.'
    ],
    tracks:{
      nursing:{ data:'You are handing both patients over: Camila to a clinic nurse who will see her every three months, Dale to a ward nurse taking him from intensive care on Day 15. Neither nurse has met either patient.',
        go:'write both handovers, and write them as physiology rather than as chronology. For each patient name the one number you would want checked first on the receiving unit, the one thing that will still be true in a year, and the one early sign you would want acted on without waiting for a review. Then say, in one sentence for each patient, what the treatment did to them that the illness did not.' },
      medicine:{ data:'The delta ratio and the albumin correction are both in the tools box above. Camila\'s chloride went from 96 to 112 across twelve hours. Dale\'s went from 98 to 114 across three days. Both received 0.9 percent sodium chloride.',
        go:'work the delta ratio for Camila between her two gases and for Dale between his arrival and Day 7 gases, showing the arithmetic for each. Say what each result reveals. Then explain why 0.9 percent saline does this, naming what is actually in the bag and what the body does with each of its two ions, and say what you would have given instead and why its anion behaves differently.' },
      radiology:{ data:'Across both files: Camila had one screening ECG, two DEXA scans and one pelvic ultrasound. Dale had chest films on Days 1, 2 and 3, a CT of the chest and abdomen on Day 2, serial bedside ultrasound, and two echocardiograms.',
        go:'read both files as one. Name the single study across both patients that most changed what was done, and defend it. Then name the single study that did the most harm, say exactly how the harm happened at tissue level, and say what question it was answering that a number already on the chart had answered first. Finish by naming one study that was not done in either patient and should have been, or say plainly that there is none.' },
      rt:{ data:'Camila\'s PaCO<sub>2</sub> rose from 14 to 26 mmHg between 06:45 and 18:00 on September 22, and the team was pleased. Dale\'s PaCO<sub>2</sub> rose from 30 to 38 mmHg between Day 1 and 04:00 on Day 2, and the team intubated him. Both rises are about the same size.',
        go:'the same number moved the same way in both patients and it meant opposite things. Explain why, using Winter\'s formula on each and saying what the expected value was in each case. Then say what a rising PaCO<sub>2</sub> tells you about respiratory muscles when the acid load is unchanged, and name the bedside observation in Dale\'s chart, not a number, that said the same thing at 04:00.' },
      exercise:{ data:'At her November exercise test Camila reached a blood lactate of 11.4 mmol/L with a pH of 7.31, which is the pH she had at 18:00 on the day she nearly died. Dale reached a lactate of 4.6 with a pH of 7.32. Where the protons in exercise acidosis come from is genuinely disputed: the traditional account is that lactic acid dissociates, and a competing account holds that lactate production consumes a proton and the protons come from ATP hydrolysis outrunning oxidative resynthesis.',
        go:'three similar pH values, three completely different states. Say what makes one an emergency, one a normal Tuesday, and one something in between, using the anion gap, the time course, and what happens when the stimulus stops. Then lay out both accounts of the exercise protons, say what each predicts you would measure, and take a position while making clear which parts are settled and which are not.' }
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
