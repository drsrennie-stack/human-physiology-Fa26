# Patient chart, instructor key

BIO 005 Human Physiology, Yuba College, Fall 2026
Dr. Sharilyn Rennie

Covers Weeks 3 to 15 of `bio005-patient-chart.js`. Weeks 1 and 2 were posted before this rebuild and are keyed separately.

Not for student distribution.

---

## 1. Every number that can be checked, checked

Everything below was computed from the values as they sit in the data file. If a student's arithmetic disagrees with a line here, the first thing to do is re-read the chart with them, because the chart is what the arithmetic came from.

### Camila, acid-base

| Item | Working | Result |
|---|---|---|
| Arrival pH, Henderson-Hasselbalch | 6.1 + log(4 ÷ (0.03 × 14)) | 7.08, charted as 7.09 |
| Arrival respiratory compensation, Winter's | 1.5 × 4 + 8 ± 2 = 12 to 16 | measured 14, appropriate |
| Arrival anion gap | 128 − 96 − 4 | 28 |
| 18:00 pH, Henderson-Hasselbalch | 6.1 + log(13 ÷ (0.03 × 26)) | 7.32, charted as 7.31 |
| 18:00 Winter's | 1.5 × 13 + 8 ± 2 = 25.5 to 29.5 | measured 26, appropriate |
| 18:00 anion gap | 140 − 112 − 13 | 15 |
| Delta gap vs delta bicarbonate | gap fell 28 → 15, a fall of 13; bicarbonate rose 4 → 13, a rise of 9 | the gap closed faster than the bicarbonate recovered, so a non-gap acidosis has appeared |
| Albumin correction | albumin 4.2 then 3.9, so the correction moves the gap by under 0.5 | does not change any reading in her |
| Corrected sodium, factor 1.6 | 128 + 1.6 × (642 − 100) ÷ 100 | 136.7 |
| Corrected sodium, factor 2.4 | 128 + 2.4 × (642 − 100) ÷ 100 | 141.0 |
| Calculated total osmolarity | 2(128) + 642/18 + 34/2.8 | 303.8 against a measured 305, so no osmolal gap |
| Calculated effective osmolarity | 2(128) + 642/18 | 291.7 |

The two sodium correction factors differ by 4.3 mEq/L here, which is the whole reason Week 3 question 4 asks which one was used. Either is accepted with the factor stated. Neither is accepted without.

### Dale, acid-base

| Gas | Henderson-Hasselbalch | Winter's expected | Verdict |
|---|---|---|---|
| Day 1, pH 7.32, PaCO₂ 30, HCO₃ 15 | 7.32 | 28.5 to 32.5 | compensation appropriate |
| Day 2 04:00, pH 7.25, PaCO₂ 38, HCO₃ 16 | 7.25 | 30 to 34 | **not** compensating; a respiratory acidosis has been added |
| Day 2 08:00 ventilated, pH 7.24, PaCO₂ 44, HCO₃ 18 | 7.24 | 35 to 39 | deliberate permissive hypercapnia |
| Day 4 proned, pH 7.36, PaCO₂ 40, HCO₃ 22 | 7.36 | 41 to 45 | close to normal |
| Day 7, pH 7.31, PaCO₂ 40, HCO₃ 20 | 7.32 | 36 to 40 | appropriate |
| Day 15, pH 7.36, PaCO₂ 38, HCO₃ 21 | 7.37 | 37.5 to 41.5 | appropriate |

Anion gaps, and why the albumin correction is the point:

| Day | Raw gap | Albumin | Corrected gap | Reading |
|---|---|---|---|---|
| Day 1 | 132 − 98 − 15 = 19 | 2.9 | 19 + 2.5(4.0 − 2.9) = 21.8 | high gap acidosis, lactate 4.6 plus retained renal acids |
| Day 7 | 141 − 114 − 20 = 7 | 2.1 | 7 + 2.5(4.0 − 2.1) = 11.8 | gap now normal, bicarbonate still 20, chloride 114: a hyperchloremic non-gap acidosis has replaced it |
| Day 15 | 140 − 108 − 21 = 11 | 2.6 | 11 + 2.5(4.0 − 2.6) = 14.5 | settling, small residual gap |

Day 1 delta check: the corrected gap rose 21.8 − 12 = 9.8 while bicarbonate fell 24 − 15 = 9. Roughly one to one, so on Day 1 there is a single high gap acidosis and nothing else. That matters because the Day 7 gas is where the second acidosis appears, and a student who found two on Day 1 has made an error.

Note that his lactate of 4.6 does not account for the whole gap excess of about 10. The remainder is retained acid from a creatinine of 2.6. A student who notices the shortfall and names uremic acids is doing exactly what the section is for.

### Dale, hemodynamics

Mean arterial pressure taken as (systolic + 2 × diastolic) ÷ 3.

| Time | BP | MAP | CVP | CO | SVR, (MAP − CVP) × 80 ÷ CO |
|---|---|---|---|---|---|
| Day 1, 09:00 | 82/46 | 58 | 14 | 4.9 | 718 |
| Day 1, 09:35 after 500 mL | 86/50 | 62 | 18 | 5.1 | not measured |
| Day 1, 11:00 on noradrenaline | 104/58 | 73 | 16 | 5.6 | 814 |
| Day 1, 18:00 plus dobutamine | 108/56 | 73 | 16 | 6.8 | 671 |
| March baseline | 118/70 | 86 | not measured | not measured | not measured |

The 09:35 line is the one to read slowly: 500 mL bought 0.2 L/min of output and cost 4 mmHg of filling pressure and four points of saturation. That is the definition of a ventricle off the steep part of its curve.

Cardiac output check: stroke volume 42 mL × 118 beats = 4.96 L/min, charted as 4.9.
End diastolic volume: 42 ÷ 0.25 = 168 mL, against a normal of about 120. This is the answer to Week 9 question 4 and it is the whole reason his stroke volume is not as bad as his ejection fraction.
Body surface area, Mosteller, for 178 cm and 88 kg: 2.09 m², charted as 2.1. Cardiac index at 18:00: 6.8 ÷ 2.1 = 3.2.

What his output **should** be: fever of 38.9 °C is 1.9 °C above normal, and resting metabolic rate rises roughly 10 percent per degree, so about 19 percent above a basal 1,650 kcal/day, roughly 310 kcal/day of extra demand. Add the work of breathing at a rate of 28. A septic adult with an intact heart typically runs a cardiac index of 3.5 to 5. His 2.3 at arrival is the failure. Accept any estimate in the range 7 to 10 L/min that shows its reasoning; do not accept a number with no route to it.

### Dale, respiratory

| Item | Working | Result |
|---|---|---|
| Predicted body weight | 50 + 0.91 × (178 − 152.4) | 73.3 kg |
| Tidal volume at 6 mL/kg PBW | 6 × 73.3 | 440 mL |
| Tidal volume at 6 mL/kg actual weight | 6 × 89 | 534 mL, which is the point of the medicine prompt |
| Static compliance | 440 ÷ (28 − 12) | 27.5 mL/cmH₂O |
| Driving pressure | 28 − 12 | 16 cmH₂O |
| P to F ratio, Day 1 | 62 ÷ 0.44 | 141 |
| P to F ratio, Day 2 04:00 | 58 ÷ 0.80 | 72.5, charted as 73 |
| P to F ratio, Day 2 08:00 | 78 ÷ 0.70 | 111 |
| P to F ratio, Day 4 proned | 92 ÷ 0.55 | 167 |
| Alveolar to arterial difference, Day 1 | 0.44 × 713 − 30 ÷ 0.8 − 62 | 214 mmHg |
| Arterial oxygen content, Day 2 | 1.34 × 9.6 × 0.88 + 0.003 × 58 | 11.49 mL/dL |
| Arterial oxygen content, March | 1.34 × 12.6 × 0.96 + 0.003 × 90 | 16.48 mL/dL |
| Rapid shallow breathing index | 34 ÷ 0.260 | 131 |
| Anatomic dead space | 2 × 73.3 | 147 mL |
| Alveolar ventilation at the failed trial | (260 − 147) × 34 | 3.84 L/min |
| Alveolar ventilation at a calm 500 mL × 12 | (500 − 147) × 12 | 4.24 L/min |

The last two lines are the punchline of the Week 13 exercise prompt. He is breathing nearly three times as often and moving less fresh air. Accept a dead space estimate anywhere from 2 to 2.2 mL/kg.

Oxygen content: the dissolved term is 0.17 mL/dL against 11.32 carried on hemoglobin, about 1.5 percent. A student who concludes that raising the PaO₂ alone cannot rescue content has the answer.

### Dale, renal

| Item | Working | Result |
|---|---|---|
| Fractional excretion of sodium, Day 1 | (12 × 2.6) ÷ (132 × 59) × 100 | 0.40 percent |
| Fractional excretion of sodium, Day 3 | (48 × 3.8) ÷ (134 × 52) × 100 | 2.62 percent |
| Estimated GFR, creatinine 1.5, age 68, male | CKD-EPI 2021 | 50 mL/min/1.73 m² |
| Estimated GFR, creatinine 2.4, age 68, male | CKD-EPI 2021 | 29 mL/min/1.73 m² |

If your lab reports the older equation the baseline lands nearer 46. Either is fine; the question never turns on the third digit.

Day 6 mass balance, which is the nursing prompt: the chart says plus 7.4 L and the scale says plus 3 kg. The missing 4 kg is made of insensible loss through skin during several febrile days, about 0.5 to 0.8 L a day, minus roughly 0.3 L a day of water produced by oxidation, minus about 2.5 kg of lean tissue burned by Day 6 at the rate the Week 12 nitrogen balance establishes. Losing tissue and gaining water at the same time makes a scale under-report the water. Accept any answer that names insensible loss and tissue loss and gets the direction of each right.

### Dale, nutrition

| Item | Working | Result |
|---|---|---|
| Nitrogen in | 56 g protein ÷ 6.25 | 8.96 g/day |
| Nitrogen out | 18 g urinary urea nitrogen + 4 g other | 22 g/day |
| Nitrogen balance | 8.96 − 22 | −13.0 g/day |
| Protein equivalent | 13.0 × 6.25 | 81 g protein/day |
| Wet lean tissue equivalent | 81 ÷ 0.2 | about 400 g/day, so about 4 kg over ten days |
| Energy expenditure excess | 2,240 − 1,650 | 590 kcal/day |

His weight of 88 kg on Day 10 is exactly his March weight and he has about 4 kg less muscle and about 4 kg more water than he did then. That identity is the Week 12 exercise prompt.

### Camila, energy availability

(1,900 kcal intake − 800 kcal training cost) ÷ 41.2 kg lean mass = 26.7 kcal per kg of lean mass per day, below the threshold of about 30 given in the chart. That is the Week 7 exercise prompt and it is why her axis was still quiet in October.

---

## 2. What each week is actually testing

Short version, for grading at speed. The full intended answers follow.

| Week | Patient | The idea the week turns on | The common wrong turn |
|---|---|---|---|
| 3 | Camila | Water follows the solute that cannot cross | Treating the sodium of 128 as sodium loss |
| 4 | Camila | A serum potassium reports a position, not a quantity | Reading 5.4 as "too much potassium in the body" |
| 5 | Camila | A reflex arc has five parts and you can point at all five | Calling the orthostatic drop dehydration and stopping |
| 6 | Camila | Command and machinery are separable | Attributing all the weakness to lost muscle |
| 7 | Camila | A low output from a gland can mean the floor above is quiet | Reading low FSH with low estradiol as ovarian failure |
| 8 | Camila | Concentration is not content | Summarising the admission instead of arguing about it |
| 9 | Dale | A normal number can be a failing organ | Accepting a cardiac output of 4.9 as adequate |
| 10 | Dale | Pressure can be defended by flow or by resistance, at different prices | Treating a rising MAP as evidence of a working resuscitation |
| 11 | Dale | The organism and the response are two problems | Attributing the shock to the bacteria directly |
| 12 | Dale | Feeding a starved patient is itself dangerous | Blaming the hyperglycemia on the feed |
| 13 | Dale | Shunt does not respond to oxygen | Raising the inspired oxygen and expecting a response |
| 14 | Dale | A filter fails from the downstream side too | Calling every low-output kidney prerenal |
| 15 | Both | Treatment made the second acidosis in both patients | Reading a rising pH as unambiguous improvement |

---

## 3. Week by week, the five questions

Marking rule throughout, the same one the students are told every week: a correct number with no explanation earns half credit.

### Week 3, Camila, catch up on the cell

1. Extracellular and intracellular, with the extracellular split into plasma and interstitial. The solute setting the gradient is glucose, and it sets one because without insulin it is largely excluded from muscle and fat, so it stays outside and is osmotically effective there.
2. Water has moved out of cells into the extracellular space; cells have shrunk. She looks dry outside because the osmotic diuresis has taken extracellular volume with it, and the intracellular compartment is being pulled down at the same time by the glucose gradient. Both compartments are down, for two different reasons.
3. GLUT4, which needs insulin to translocate to the membrane. Tissues that do not need it: brain and red cells on GLUT1, liver on GLUT2, kidney and gut on SGLT. A bloodstream full of glucose and a starving muscle cell are the same fact because the glucose cannot get through the door without the signal.
4. Corrected sodium 136.7 with the 1.6 factor or 141.0 with 2.4; the factor must be named. The measured 128 shows where sodium sits relative to water right now. It cannot show how much sodium is in her, and the corrected figure says she has not lost sodium at all. Accept a student who argues the 2.4 factor is better supported at a glucose above 400, which it is.
5. Best answers: hourly point of care glucose, or potassium. Strong answers argue for potassium and say that a fall below 3.3 stops the insulin, which is Week 4's question arriving early. Accept urine output with a reason.

### Week 4, Camila, membrane potential, neurons and synapses

1. Potassium. Chemical gradient outward, electrical gradient inward; at rest the two nearly balance near the potassium equilibrium potential. Held by the sodium-potassium ATPase at the cost of one ATP per three sodium out and two potassium in.
2. 5.4 raises extracellular potassium, so the equilibrium potential moves toward zero and the membrane depolarises. 3.1 does the reverse and hyperpolarises. At 11:00 the greater danger is the 3.1, because it is falling fast, it lengthens repolarisation, and the U waves say the ventricle is already showing it.
3. Sustained depolarisation holds voltage-gated sodium channels in the inactivated state. Inactivation is removed by repolarisation, not by time alone, so a membrane that never repolarises never recovers its available channels. Fewer available channels means a smaller upstroke and eventually no propagated action potential.
4. Heart: noradrenaline from postganglionic sympathetic fibres onto beta-1 receptors. Skin vessels: noradrenaline onto alpha-1. One outflow, two receptors, because the receptor is a property of the target tissue, not of the transmitter. Her dry skin shows that the sympathetic cholinergic fibres to eccrine sweat glands are not being driven, or have nothing to work with; it cannot show whether her sympathetic outflow to other beds is high or low, which is what the tachycardia and the cool peripheries are for.
5. A potassium below about 3.3. Holding the insulin is right because insulin drives potassium into cells and the glucose will not kill her in the next hour while a potassium of 2.8 might.

### Week 5, Camila, reflexes and sensing the world

1. Receptor, afferent pathway, integrating centre, efferent pathway, effector. Pupillary light reflex: retinal ganglion cells, optic nerve, pretectal nucleus and Edinger-Westphal nucleus bilaterally, oculomotor nerve with the ciliary ganglion, sphincter pupillae. The consensual response tests the crossing at the pretectal level, which is why you watch the other eye.
2. The baroreflex. Sensor: stretch receptors in the carotid sinus and aortic arch. Afferents: glossopharyngeal from the carotid sinus, vagus from the arch. The response is visible, a heart rate rise of 10, but it is nothing like enough, because the reflex can only redistribute a volume that is not there. Accept any answer that names the loop and then says the loop cannot manufacture volume.
3. Sustained hyperglycemia raises glucose in the aqueous humour, and glucose entering the lens is reduced to sorbitol, which is trapped and osmotically active. Water follows it into the lens, the lens swells and its refractive power changes. The structure is the lens. It lagged behind the blood glucose because sorbitol leaves slowly, so the osmotic load persists for weeks after the plasma glucose is normal.
4. 1+ at arrival shows depressed reflex responsiveness, consistent with a metabolic cause. 2+ by the afternoon shows it was reversible and tracked her treatment. Neither value can show whether a peripheral nerve is damaged, because a metabolic depression and a neuropathy both give you a low number on one occasion.
5. The best answer is a test of small fibre function: temperature or pinprick testing, or quantitative sensory testing. A normal result today rules out nothing about her next twenty years, because she has had diabetes for weeks, not years. Accept a student who says plainly that today's test is a baseline rather than a prediction, which is the honest version.

### Week 6, Camila, muscle and how movement gets commanded

1. Motor cortex, corticospinal tract, anterior horn cell, peripheral nerve, neuromuscular junction, sarcolemma and T tubule, sarcoplasmic reticulum, crossbridge. Her weakness is at the muscle itself. Sensation intact and reflexes 2+ exclude a significant neuropathy; no fasciculation and normal tone argue against an anterior horn problem; creatine kinase only mildly raised and no myoglobinuria argue against a destructive myopathy. Proximal distribution fits disuse and catabolism.
2. Maximal force is down roughly a third by grip. Endurance is down further, because she is also deconditioned aerobically after three weeks of illness and four days in bed. They did not have to change by the same amount and they did not.
3. Action potential along the sarcolemma into the T tubule, dihydropyridine receptor senses the voltage change, mechanically coupled to the ryanodine receptor on the sarcoplasmic reticulum, calcium released, calcium binds troponin C, tropomyosin moves, crossbridges cycle. With fewer myofibrils the limited step is the number of crossbridges available, not any step in the coupling, which is why the coupling is intact and the force is not.
4. Shows a real loss of force generating capacity against her own baseline, which is worth more than any population norm. It cannot show whether the loss is muscle, activation, or effort and pain.
5. Twitch interpolation, or a stimulated versus voluntary force comparison. Accept electromyography with a reason. A simple repeat grip test is not an answer and should be marked as such.

### Week 7, Camila, hormones, the autonomic system and reproduction

1. Insulin, glucagon, adrenaline, FSH, LH, TSH and the gonadotropins all use surface receptors and act in seconds to minutes. Cortisol, thyroid hormone and estradiol use intracellular receptors and change gene transcription, so they act in hours to days. Location predicts the timescale because a surface receptor changes existing proteins and an intracellular one has to make new ones.
2. To the heart: preganglionic fibre from the intermediolateral cell column releasing acetylcholine onto a nicotinic receptor in the sympathetic chain, then a postganglionic fibre releasing noradrenaline onto beta-1. To the adrenal medulla: the preganglionic fibre goes straight to the gland, which is a modified postganglionic neuron, releasing acetylcholine onto nicotinic receptors on chromaffin cells, which release adrenaline into the blood. No second neuron. Fast and local versus slower and everywhere because one delivers transmitter across a synaptic cleft and the other delivers hormone through the circulation.
3. All up. They all rise because they are the stress response and they all raise blood glucose, by glycogenolysis, gluconeogenesis, lipolysis and reduced peripheral uptake. In a person with working beta cells insulin limits the rise. She had none, so nothing capped it.
4. Low gonadotropins with low estradiol and normal ovaries localises the problem above the ovary, at the hypothalamus. It cannot show whether the cause is energy deficit, illness or structural disease, which is what the normal prolactin, normal TSH and her history are for. High FSH with low estradiol would be the opposite: an ovary that cannot respond, with the pituitary shouting at it.
5. Best answers: continuous glucose monitoring, or a documented pattern of fasting and post-meal values. Accept HbA1c with the caveat that it will lag. A student who names hypoglycemia frequency rather than an average is thinking well.

### Week 8, Camila, closing the file

This entry has no new physiology. Grade it as review and reward integration across weeks.

1. Any three loops, correctly parsed. Full marks need the honest third column: her baroreflex worked correctly and was misread as reassurance; her thermoregulatory and reproductive axes were not broken but turned down; her insulin loop actually failed.
2. Concentration is not content. A number tells you where something sits, not how much of it there is. This is the single idea the file was built around.
3. September 22: blood, capillary, interstitial fluid, then stopped at the membrane because GLUT4 is not there. December 5: injected insulin is standing in for the missing secretion, so the transporter reaches the membrane and the journey completes.
4. One patient over seven entries shows change over time in one person against her own baseline, which is what makes a trend readable. It cannot show variation between people, which is what a reference range is for, and it cannot tell you how typical she is.
5. Strongest answers: a fasting glucose or an HbA1c in August, which would have dated the onset. Accept a baseline weight taken more often, or a urinalysis. Reject anything that would not have answered a question she later raised.

### Week 9, Dale, the heart as a pump

1. Preload, afterload, contractility, heart rate. Preload: CVP 14 and an IVC that does not collapse, up. Afterload: a MAP of 58, down, which flatters his output. Contractility: ejection fraction 25 from 30, down, and worse than the number looks because it is being measured at a low afterload. Heart rate: 118 from 64, up, and blunted by carvedilol.
2. Should be roughly 7 to 10 L/min. His 4.9 is therefore a failure, not a normal. The two numbers that prove it are the lactate of 4.6 and the central venous oxygen saturation of 52 percent, which together say the tissues are extracting far more than usual and still not getting enough.
3. Standard curve, with his shifted down and right and flattened. March sits on the shoulder; this morning sits on the flat part with a high filling pressure. Another litre moves him along the flat part: almost no extra stroke volume and a large rise in filling pressure, which goes to his lungs.
4. Ejection fraction shows the fraction of the end diastolic volume ejected. It cannot show stroke volume, and it cannot be read without knowing the afterload it was measured at. His end diastolic volume is 42 ÷ 0.25 = 168 mL against a normal of about 120, so a dilated ventricle ejecting a quarter of a large volume gives a nearly adequate stroke volume. That is the whole answer.
5. Best answer: a measure of fluid responsiveness, a passive leg raise or pulse pressure variation. Accept a repeat lactate or a central venous oxygen saturation trend with a reason. Reject "another blood pressure".

### Week 10, Dale, pressure, flow and holding blood pressure steady

1. MAP = cardiac output × systemic vascular resistance, plus a small venous term usually ignored. At 09:00: (58 − 14) × 80 ÷ 4.9 = 718. At 11:00: (73 − 16) × 80 ÷ 5.6 = 814. The noradrenaline raised resistance. It raised the pressure by squeezing, not by improving flow.
2. A second 500 mL would have raised the filling pressure again for essentially no extra output. His saturation fell from 93 to 89 because the pulmonary capillary hydrostatic pressure rose while his plasma oncotic pressure was already low at 13 mmHg, so filtration into the alveolar interstitium increased.
3. Sensor: baroreceptors in the carotid sinus and aortic arch. Afferents: glossopharyngeal and vagus. Integrator: the nucleus tractus solitarius and the medullary cardiovascular centres. Efferents: sympathetic to heart and vessels, parasympathetic vagal to the heart. Carvedilol blocks beta-1 and alpha-1, so the sympathetic limb cannot deliver its full effect. A rate of 118 through a beta blockade means the drive underneath is enormous.
4. Shows that the arterial pressure has been restored to a level most organs can autoregulate around. It cannot show flow, and it cannot show regional perfusion. His urine output of 15 mL/h and his lactate of 3.4 at that moment say at least two beds were still not being perfused.
5. Best answer: central venous oxygen saturation, or a cardiac output measurement. A low saturation with an adequate MAP says the problem is flow, so add dobutamine. A normal or high saturation with a low MAP says the problem is tone, so add noradrenaline.

### Week 11, Dale, blood and how the body defends itself

1. Neutrophils, lymphocytes, monocytes, eosinophils, basophils, with their functions. Raised on Day 1: neutrophils with a left shift. Fallen by Day 3: white cells, platelets and hemoglobin. The cell doing most of the damage to him is the neutrophil.
2. Either consumption exceeding production, or marrow suppression. The band count of 18 percent argues for consumption, because a suppressed marrow does not release immature forms. Accept margination and tissue sequestration as a named mechanism of consumption.
3. Regulated variable: core temperature. Sensor: peripheral and central thermoreceptors, with the preoptic area of the hypothalamus doing the integrating. Pyrogens raise the set point, so the effectors, shivering, vasoconstriction and behaviour, defend a higher value. A temperature of 35.8 °C with live bacteraemia means the loop is not defending any set point: vasoconstriction has failed, thermogenesis has failed, or both.
4. A consumptive coagulopathy: platelets and fibrinogen being used, a prolonged INR from consumed factors, and a D-dimer showing that fibrin has been made and broken down. It cannot show whether he will bleed, and it cannot distinguish disseminated intravascular coagulation from severe sepsis with a similar profile on one set of results.
5. A reticulocyte count, read with haptoglobin and his fluid balance. A high reticulocyte count with low haptoglobin points at destruction; a low reticulocyte count points at production failure, which is the expected answer in acute inflammation; a hemoglobin that corrects when his fluid balance does points at dilution. Accept a stool test for occult blood only if the student says what they expect and why.

### Week 12, Dale, digestion and how you use food for fuel

1. Feed enters the stomach; pepsin begins protein digestion at low pH; pancreatic trypsin, chymotrypsin and carboxypeptidases continue it in the duodenum; brush border peptidases finish; amino acids cross the enterocyte on sodium-coupled transporters, di- and tripeptides on PepT1; portal blood to the liver; then to muscle on system L and other carriers. The step a sedated ventilated patient does badly is gastric emptying and motility.
2. The extra 590 kcal is the fever, the work of breathing and the inflammatory response. Cortisol, glucagon and catecholamines drive it. Nitrogen balance: 8.96 − 22 = −13 g/day, about 81 g of protein, about 400 g of wet lean tissue a day, so about 4 kg over ten days.
3. Hepatic gluconeogenesis from amino acids, glycerol and lactate, driven by cortisol, glucagon and catecholamines, with insulin resistance at the muscle. More carbohydrate does not fix it because the problem is production plus resistance, not a shortage of substrate; adding substrate adds to the output.
4. Shows that albumin is low. It cannot show his nutritional state, because albumin has a half-life of about 20 days and cannot fall that fast from intake alone. The two other processes are capillary leak redistributing albumin into the interstitium, and a liver that has switched from albumin to acute phase protein synthesis. The C-reactive protein of 240 is the evidence.
5. Best answers: whether he passes stool, or tolerance of an advancing feed rate. Accept gastric residual volume only if the student says what they would and would not do with it, since the Week 12 nursing prompt is about exactly that.

### Week 13, Dale, breathing, gas transport and the fast pH lever

1. Day 2: 1.34 × 9.6 × 0.88 + 0.003 × 58 = 11.49 mL/dL. March: 1.34 × 12.6 × 0.96 + 0.003 × 90 = 16.48 mL/dL. The hemoglobin-bound term does about 98.5 percent of the work. Oxygen alone cannot rescue content when the carrier is down and the saturation is already near its ceiling.
2. Shunt and ventilation-perfusion mismatch. Raising the inspired oxygen corrects mismatch, because low ratio units still receive some ventilation and their capillary blood can be re-saturated. It does not correct shunt, because shunted blood sees no alveolar gas at all. His oxygen barely moved from 0.44 to 0.80, so he is shunting.
3. Carbon dioxide plus water to carbonic acid to bicarbonate and hydrogen ion, catalysed by carbonic anhydrase, with the lung removing the carbon dioxide and pulling the reaction left. Changing minute ventilation changes PaCO₂ within a breath or two, so pH follows within a minute. Winter's on the Day 2 04:00 gas: expected 30 to 34, measured 38. The lever is failing. That is why he was intubated an hour later.
4. Compliance 440 ÷ 16 = 27.5 mL/cmH₂O, badly reduced. It shows that the respiratory system as a whole is stiff. It cannot show whether the stiffness is lung or chest wall, because the plateau pressure is measured at the airway and sees both in series.
5. Best answer: a measurement that separates ventilatory failure from cardiac failure during the trial. A gas taken at the end of the trial showing a rising PaCO₂ points at the muscles; an echocardiogram, a rising B-type natriuretic peptide or a rising filling pressure during the trial points at weaning-induced pulmonary edema, which is a real entity in a man with an ejection fraction of 25 percent.

### Week 14, Dale, the kidney and body fluid balance

1. Glomerular capillary hydrostatic pressure, favouring filtration, down with his MAP of 58. Bowman's space hydrostatic pressure, opposing, up. Glomerular capillary oncotic pressure, opposing, low because his albumin is low, which slightly helps. The forgotten one is the pressure downstream: a renal vein and interstitium at a central venous pressure of 14 raises Bowman's and interstitial pressure and cuts net filtration pressure, which is why congestion damages a kidney without any fall in arterial pressure.
2. Day 1: a fractional excretion of 0.4 percent with a urine osmolality of 520 says the tubule is intact and reabsorbing hard, which is what it does when it is told volume is short. Day 3: 2.6 percent with an osmolality of 310, essentially isosthenuric, with muddy brown casts, says the tubule has stopped. What changed is that a functional response became tubular injury.
3. Sensor: the macula densa and the afferent arteriole baroreceptor, with renal sympathetic input. Enzyme: renin. Hormones: angiotensin II, acting on the proximal tubule and the arterioles, and aldosterone, acting on the principal cell of the collecting duct. Holding lisinopril and spironolactone removed the brake on that system and allowed it to run. It was held anyway because angiotensin II is what holds the efferent arteriole tight and preserves filtration pressure in a low-flow state, and blocking it in shock drops GFR further, and because spironolactone in a man with a potassium of 5.1 and a failing kidney is dangerous.
4. Shows that filtration has fallen. It cannot show by how much on that morning, because creatinine is a lagging indicator: it has to accumulate, so a man whose GFR fell to near zero overnight may still read 2.6 at 08:40. The Day 3 value of 3.8 is partly reporting what happened on Day 1.
5. Best answer: something that reports filling pressure or congestion, a central venous pressure trend, bedside ultrasound of the inferior vena cava and lungs, or an echocardiogram. High filling pressure with congestion says remove fluid, and the failure to respond to diuretic is the argument for renal replacement. Low filling pressure would say the diuretic is the wrong move entirely.

### Week 15, both patients, the slow lever and integration

1. Camila arrival: high anion gap metabolic acidosis, fast lever compensating, appropriate by Winter's. Camila 18:00: metabolic acidosis, now mixed high gap and non-gap, compensation appropriate. Dale Day 1: high anion gap metabolic acidosis, compensation appropriate. Dale Day 2 04:00: metabolic acidosis with a superimposed respiratory acidosis, compensation inadequate. Dale Day 7: normal anion gap metabolic acidosis, compensation appropriate. Dale Day 15: near-normal, compensation appropriate.
2. November 4: raw gap 19, corrected 21.8. November 10: raw gap 7, corrected 11.8. Between those dates the high gap acidosis resolved as the lactate cleared, and a hyperchloremic non-gap acidosis appeared in its place, which is why the bicarbonate is still 20. The chloride of 114 names the cause and the fluid is 0.9 percent sodium chloride.
3. Filtered bicarbonate is reclaimed in the proximal tubule by carbonic anhydrase and the sodium-hydrogen exchanger. New bicarbonate is generated in the distal nephron and collecting duct by alpha intercalated cells. The acid leaves buffered, mostly as ammonium and as titratable acid on phosphate. The full response takes two to five days. On November 4 it could not help because it had had no time and because his kidney was already injured. On November 10 it could not help because his kidney was still injured and on renal replacement, and because chloride was arriving faster than any tubule could handle.
4. Camila's 18:00 gas shows a rising pH, a clearing gap and a closing ketone load, with a new hyperchloremic acidosis underneath it. Dale's November 10 gas shows a cleared lactate with the same new hyperchloremic acidosis. Neither gas can show whether the patient's underlying problem is resolving, only what the current acid-base position is. In both cases switch the fluid to a balanced crystalloid whose anion is metabolisable.
5. Camila: a fasting glucose or HbA1c in August, which would have dated her onset. Dale: something that measured reserve rather than a level, a six minute walk distance, a peak oxygen uptake, or a B-type natriuretic peptide as a baseline, which would have told you in November how much he had left. Reward any answer that names a capacity rather than a concentration.

---

## 4. Track prompts

The five entry point prompts are graded on the same rule and are not separately keyed here, with three exceptions that are easy to mark wrongly.

**Week 4, respiratory therapy.** Sedating and ventilating her at a rate of 14 would drop her minute ventilation below what her acid load requires, her pH would fall, potassium would shift out of cells, and her serum potassium would rise. The danger is real and it is the reason spontaneously breathing patients in this state are not casually intubated. A student who says the potassium would fall has the direction backwards and has not found the hydrogen-potassium exchange.

**Week 10, medicine.** Dobutamine raising cardiac output while lowering systemic vascular resistance, with the mean arterial pressure unchanged, is the beta-2 mediated vasodilation offsetting the rise in flow. Students often call this a failure of the drug. It is not: his lactate fell from 3.4 to 2.1 and his central venous oxygen saturation rose to 66 percent, so flow improved and that is what he needed.

**Week 14, exercise.** The point is that a falling creatinine can be muscle loss rather than renal recovery, and that an estimated GFR built on creatinine therefore overestimates function in a wasted patient. The measurement that is not fooled is cystatin C, which is made by all nucleated cells rather than by muscle. Accept a timed creatinine clearance only if the student notices it has the same problem in the numerator.

---

## 5. Two things to watch for in the pile

**A student who is never wrong in Week 15 or in the analysis.** Section 6 of the analysis is 20 points and it exists because a file with no wrong turns in it is a file that was written backwards from the answer. Say so in the feedback rather than in the mark, the first time.

**An answer that is fluent and sourceless.** Every question in this file requires a number that only exists in this chart. An answer that explains the physiology beautifully and never touches Camila or Dale has been written by something that did not read the chart. Ask for the number.

Dr. Sharilyn Rennie
