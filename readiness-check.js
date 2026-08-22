/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   readiness-check.js

   Three readiness checks a student takes before the term starts:
   chemistry, anatomy and math. Each one is a list of what physiology
   assumes you already know, the places to review it, and a ten
   question check that tells you whether you need to.

   THE POINT OF THE CHECK
   It is not a grade and it is not a gate. It answers one question:
   do I need to spend a weekend on this, or can I go straight into
   week 1. A student who scores well should be told to move on. A
   student who misses things should be told which things, not just
   a number.

   HOW EACH QUESTION IS BUILT
     id        stable, never renumber
     concept   which concept it tests, matches a concept id below
     level     1 easy, 2 middling, 3 harder
     q         the question
     options   four choices
     answer    index of the correct one
     why       shown after answering, whether right or wrong

   Levels are mixed on purpose. A student who can only do the level
   1 items has a real gap even if they got seven right, so the
   result is scored by concept, not only by total.

   Chemistry has 10 questions, anatomy has 11 because it has ten
   concepts and the heart earns two, and math has 10. Every concept
   on all three lists is tested by at least one question. That is the
   rule that matters, not a round number.

   UNITS
   Every concept carries a units array saying which of the five units
   actually uses it. That is what lets a week page open with only its
   own prerequisites instead of all twenty seven. It is data here, in
   one place, rather than a judgment repeated on fifteen pages.
   Generated into the week pages by tools/build-unit-prereqs.py.

   RESOURCE LINKS
   Every concept has a 'review' field naming where to go. Where a
   URL is not filled in, it says so plainly rather than pointing at
   a link that does not exist. Scrubs fills those in. Nothing here
   is invented.
   ============================================================ */

window.BIO005_READINESS = {

/* ==========================================================
   CHEMISTRY
   ========================================================== */
chemistry: {
  key: 'chem',
  title: 'Chemistry you need',
  blurb: 'Physiology runs on a handful of chemistry ideas. Not a whole chemistry course, these eight. If they are solid, the course will make sense. If they are not, week 2 will feel much harder than it is.',
  concepts: [
    { id:'ions', units:[1,2,3,4,5], name:'Ions and charge',
      need:'Sodium, potassium, calcium and chloride carry charge, and that charge is what makes a nerve fire and a muscle contract.',
      usedIn:'Weeks 2 to 6, and everywhere after',
      review:'OpenStax Anatomy and Physiology 2e, chapter 2, the section on ions and ionic bonds. Link to add.' },
    { id:'conc', units:[1,2,3,4,5], name:'Concentration and gradients',
      need:'What a concentration is, and what it means for something to be more concentrated on one side of a membrane than the other.',
      usedIn:'Week 2 onward. This is the single most used idea in the course.',
      review:'OpenStax 2e chapter 3, membrane transport. Link to add.' },
    { id:'water', units:[1,3,4,5], name:'Water, polarity and solubility',
      need:'Why water dissolves salt but not fat, and what hydrophilic and hydrophobic mean.',
      usedIn:'Week 2, membranes. Week 9, why some hormones need a carrier and others do not.',
      review:'OpenStax 2e chapter 2, water. Link to add.' },
    { id:'ph', units:[1,4,5], name:'Acids, bases and pH',
      need:'What pH measures, which direction is more acidic, and roughly what blood pH is.',
      usedIn:'Week 1, the day you meet buffers. Again in week 12 gas transport, and all of week 14.',
      review:'OpenStax 2e chapter 2, inorganic compounds. Link to add.' },
    { id:'buffer', units:[1,5], name:'Buffers',
      need:'What a buffer does when acid is added, in one sentence.',
      usedIn:'Week 1, then week 14. Acid base is the topic students most often say they were not ready for.',
      review:'OpenStax 2e chapter 26, acid base balance, first section only. Link to add.' },
    { id:'protein', units:[1,2,3], name:'Proteins and shape',
      need:'That a protein does its job because of its shape, and that heat or a pH change can wreck that shape.',
      usedIn:'Week 1 enzymes, week 2 transporters, week 9 receptors.',
      review:'OpenStax 2e chapter 2, proteins. Link to add.' },
    { id:'energy', units:[1,2,5], name:'ATP and energy',
      need:'That ATP is the cell’s energy currency and that splitting it releases energy the cell can use.',
      usedIn:'Week 2 pumps, week 6 muscle, week 14 metabolism.',
      review:'OpenStax 2e chapter 2, ATP. Link to add.' },
    { id:'units', units:[1,2,3,4,5], name:'Units and simple calculation',
      need:'Reading and converting the units this course uses: molar and millimolar, mmHg, liters per minute, percent.',
      usedIn:'Every calculation in the course. Week 11 and week 13 in particular.',
      review:'No reading needed. Practice on the questions below and see the worked answers.' }
  ],
  questions: [
    { id:'c1', concept:'ions', units:[1,2], level:1,
      q:'Which of these carries a positive charge?',
      options:['Chloride, Cl minus','Potassium, K plus','Bicarbonate, HCO3 minus','Phosphate, PO4 3 minus'],
      answer:1,
      why:'Potassium is a cation, a positively charged ion. The other three are anions. This matters immediately: the resting membrane potential is set mostly by potassium sitting where it does.' },
    { id:'c2', concept:'conc', units:[1,2], level:1,
      q:'A solution has more solute per liter than the one next to it. Left alone, and free to move, which way does the solute go?',
      options:['From the more concentrated side to the less','From the less concentrated side to the more','It does not move without energy','It splits evenly instantly'],
      answer:0,
      why:'Down its concentration gradient, high to low, no energy needed. This one sentence explains most of weeks 2 and 12.' },
    { id:'c3', concept:'water', units:[1], level:1,
      q:'A molecule is described as hydrophobic. What does that tell you?',
      options:['It dissolves easily in water','It carries a strong negative charge','It does not mix with water and will sit in fat','It is always a protein'],
      answer:2,
      why:'Water fearing. The middle of a cell membrane is hydrophobic, which is exactly why charged things like sodium cannot simply drift through and need a protein.' },
    { id:'c4', concept:'ph', units:[1], level:1,
      q:'Blood pH is about 7.4. A blood pH of 7.1 is:',
      options:['More acidic than normal','More basic than normal','Normal for exercise','Not possible'],
      answer:0,
      why:'Lower pH means more acidic. Note how small the number change is. A shift from 7.4 to 7.1 is a serious clinical problem, and that narrowness is the reason week 14 exists.' },
    { id:'c5', concept:'protein', units:[1,2,3], level:2,
      q:'An enzyme is heated well past body temperature and stops working, even after it cools. The best explanation is:',
      options:['It ran out of substrate','Its shape was changed and the active site no longer fits','It was diluted','Enzymes only work once'],
      answer:1,
      why:'Denaturation. Shape is function, and once the shape goes the job goes with it. The same logic explains why a fever above a certain point is dangerous.' },
    { id:'c6', concept:'energy', units:[1,2,5], level:2,
      q:'A cell moves sodium out against its concentration gradient. What must be true?',
      options:['It happens faster than diffusion','It requires energy, usually from ATP','It only happens in nerve cells','Sodium must be uncharged first'],
      answer:1,
      why:'Moving anything against its gradient costs energy. The sodium potassium pump spends a large share of your resting energy doing exactly this, all day.' },
    { id:'c7', concept:'units', units:[1,2], level:2,
      q:'A solution is 0.15 molar. In millimolar that is:',
      options:['1.5 mM','15 mM','150 mM','1500 mM'],
      answer:2,
      why:'Milli means one thousandth, so multiply by 1000. 0.15 M is 150 mM, which happens to be roughly the sodium concentration outside your cells.' },
    { id:'c8', concept:'buffer', units:[1,5], level:3,
      q:'Acid is added to a buffered solution. Compared with adding the same acid to pure water, the pH:',
      options:['Falls much less','Falls much more','Rises','Does not change at all'],
      answer:0,
      why:'A buffer resists the change, it does not prevent it. That distinction is worth holding on to, because compensation in week 14 works the same way: it limits the damage, it does not undo it.' },
    { id:'c9', concept:'conc', units:[1,2,3,4,5], level:3,
      q:'Two compartments are separated by a membrane that lets water through but not glucose. Compartment A has more glucose. Water will:',
      options:['Move from A to B','Move from B to A','Not move, glucose is the one that moves','Move both ways equally forever'],
      answer:1,
      why:'Water moves toward the higher solute concentration, so from B into A. If you got this, osmosis in week 2 will not surprise you. If you did not, work that one section before the term.' },
    { id:'c10', concept:'water', units:[1,3,4,5], level:3,
      q:'A hormone is fat soluble. Which is most likely true of how it travels in blood?',
      options:['It dissolves freely in plasma on its own','It needs a carrier protein to travel in plasma','It cannot enter the bloodstream','It is destroyed instantly in plasma'],
      answer:1,
      why:'Blood is mostly water, so a fat soluble hormone needs a carrier to get around. That single fact explains why steroid hormones last hours and peptide hormones last minutes, which is week 9.' },
    /* ---- Later units, same concepts, the depth that unit asks for.
       The point of a per-unit page is that pH in unit 1 is what the
       scale means, and pH in unit 5 is a compensating patient. The
       same question in both places would defeat it. ---- */
    { id:'c11', concept:'ions', units:[2], level:2,
      q:'At rest a neuron holds potassium high inside and sodium high outside. Which is doing the work of keeping it that way?',
      options:['Diffusion through open channels','The sodium potassium pump, using ATP','Osmosis','The negative charge on proteins'],
      answer:1,
      why:'Diffusion runs the gradient down. The pump spends ATP to hold it up. Take the ATP away and the gradient collapses within minutes, which is week 4.' },
    { id:'c12', concept:'energy', units:[2], level:3,
      q:'A muscle runs out of ATP completely. What happens to the crossbridges?',
      options:['They release and the muscle relaxes','They stay attached and the muscle stiffens','They cycle faster','Nothing, ATP is only needed to contract'],
      answer:1,
      why:'ATP is needed to detach a crossbridge, not just to attach it. No ATP means no release, which is rigor. Week 6 turns on this, and it surprises most people.' },
    { id:'c13', concept:'protein', units:[3], level:2,
      q:'A drug binds a receptor, produces no response of its own, and blocks the natural hormone from binding. The drug is:',
      options:['An agonist','An antagonist','A second messenger','An enzyme'],
      answer:1,
      why:'It occupies the site without triggering the shape change that produces a response. Beta blockers work exactly this way, which is weeks 8 and 11.' },
    { id:'c14', concept:'water', units:[3], level:2,
      q:'A hormone acts on a receptor inside the cell rather than on the surface. What must be true of it?',
      options:['It is water soluble','It is fat soluble and crosses the membrane','It is a large protein','It is charged'],
      answer:1,
      why:'Only something fat soluble crosses the membrane to reach an internal receptor. That also means it needs a carrier protein in the blood and acts slowly and for a long time. Week 9.' },
    { id:'c15', concept:'ions', units:[3], level:3,
      q:'Calcium inside a resting cell is kept about ten thousand times lower than outside. Why is that useful for signaling?',
      options:['It saves ATP','A small amount entering is a large proportional change, so it makes a clean signal','Calcium is toxic at any level','It keeps the cell electrically neutral'],
      answer:1,
      why:'A signal has to stand out from the background. Keeping resting calcium almost at zero is what makes a small influx readable, and it is why calcium is the messenger in muscle, in synapses and in secretion.' },
    { id:'c16', concept:'ph', units:[4], level:3,
      q:'Blood arriving at hard working muscle is more acidic than blood leaving the lungs. What does that do to hemoglobin?',
      options:['It holds oxygen more tightly','It releases oxygen more readily','It stops binding oxygen at all','No effect, pH does not reach hemoglobin'],
      answer:1,
      why:'Lower pH lowers hemoglobin affinity, so oxygen comes off where it is needed most. This is the Bohr effect and it is week 12. It is also the payoff for knowing what pH does to protein shape.' },
    { id:'c17', concept:'conc', units:[4], level:2,
      q:'Oxygen moves from the alveolus into the capillary because:',
      options:['The lungs pump it across','Its partial pressure is higher in the alveolus','Hemoglobin pulls it across the membrane','The capillary is at lower total pressure'],
      answer:1,
      why:'Gases diffuse down their own partial pressure gradient, and nothing spends energy to move them. This is the same gradient idea from week 2, in a different costume.' },
    { id:'c18', concept:'ph', units:[5], level:3,
      q:'Arterial blood: pH 7.28, carbon dioxide high, bicarbonate normal. This is:',
      options:['Respiratory acidosis','Metabolic acidosis','Respiratory alkalosis','Metabolic alkalosis'],
      answer:0,
      why:'The pH is low, so acidosis. Carbon dioxide is the acid the lungs control, and it is the value that moved, so it is respiratory. Bicarbonate is normal, so the kidney has not compensated yet. Week 14 is this, four times over.' },
    { id:'c19', concept:'buffer', units:[5], level:3,
      q:'Bicarbonate is not the strongest buffer in the body. Why is it the one that matters most in blood?',
      options:['There is more of it than anything else','Both of its halves are regulated separately, by the lungs and the kidney','It works at any pH','It never runs out'],
      answer:1,
      why:'A closed buffer eventually saturates. Bicarbonate is open at both ends: the lungs blow off carbon dioxide and the kidney handles bicarbonate. That is what makes acid base a whole body problem rather than a chemistry one.' },
    { id:'c20', concept:'water', units:[5], level:2,
      q:'Fat digestion needs bile salts. What are they doing?',
      options:['Breaking the chemical bonds in fat','Breaking large fat droplets into small ones so enzymes can reach more surface','Absorbing the fat directly','Neutralizing stomach acid'],
      answer:1,
      why:'Bile salts emulsify. Fat does not dissolve in water, so without them enzymes only reach the outside of a big droplet. This is solubility from week 1 turning into a clinical problem in week 14.' },
    { id:'c21', concept:'ions', units:[4], level:2,
      q:'Cardiac muscle will not contract at all if calcium cannot enter from outside the cell. What does that tell you about it?',
      options:['It is identical to skeletal muscle','It depends on extracellular calcium in a way skeletal muscle does not','It does not use calcium','It contracts without ATP'],
      answer:1,
      why:'Skeletal muscle has enough calcium stored internally to run a contraction. Cardiac muscle needs an outside trigger, which is why calcium channel blockers slow the heart and barely touch skeletal muscle. Week 11.' },
    { id:'c22', concept:'units', units:[4], level:2,
      q:'Blood pressure of 120 over 80 is measured in:',
      options:['Millimolar','Millimeters of mercury','Milliequivalents','Liters per minute'],
      answer:1,
      why:'mmHg, millimeters of mercury, is a pressure unit, and it is also how the partial pressures of oxygen and carbon dioxide are reported in week 12. Same unit, two very different numbers: 120 for arterial pressure, about 100 for arterial oxygen.' }
  ]
},

/* ==========================================================
   ANATOMY
   ========================================================== */
anatomy: {
  key: 'anat',
  title: 'Anatomy you need',
  blurb: 'Physiology asks how things work, so it assumes you know what the things are. You do not need to relearn anatomy. You need these ten structures solid enough that when I say "the afferent arteriole" you are not lost.',
  concepts: [
    { id:'cell', units:[1], name:'The cell and its parts',
      need:'Plasma membrane, nucleus, mitochondria, endoplasmic reticulum. What each one is for.',
      usedIn:'Weeks 1 to 3.',
      review:'Anatomy review cards in this course, Foundations area. Also OpenStax 2e chapter 3.' },
    { id:'tissue', units:[1,2,5], name:'The four tissue types',
      need:'Epithelial, connective, muscle, nervous. Enough to tell them apart and say what each does.',
      usedIn:'Week 2 transport across epithelium, week 6 muscle, week 4 nervous.',
      review:'Anatomy review cards, Foundations area.' },
    { id:'neuron', units:[2,3], name:'The neuron',
      need:'Cell body, dendrites, axon, axon terminal, myelin. Which end receives and which end sends.',
      usedIn:'Weeks 4 and 5, which are the hardest weeks in the course for most students.',
      review:'Anatomy review cards, Nervous System area.' },
    { id:'muscle', units:[2], name:'How skeletal muscle is built',
      need:'Muscle, fiber, myofibril, sarcomere. Nested, biggest to smallest.',
      usedIn:'Week 6.',
      review:'Anatomy review cards, Skeletal and Muscular area.' },
    { id:'heart', units:[4], name:'The heart',
      need:'Four chambers, four valves, and the path blood takes through them in order.',
      usedIn:'Weeks 10 and 11. If one thing on this list is shaky, make it not be this one.',
      review:'Anatomy review cards, Cardiovascular System: The Heart. 313 cards on this alone.' },
    { id:'vessels', units:[4], name:'Blood vessel types',
      need:'Artery, arteriole, capillary, venule, vein, and which direction each carries blood.',
      usedIn:'Week 11.',
      review:'Anatomy review cards, Vessels area.' },
    { id:'lung', units:[4], name:'The respiratory tract',
      need:'Trachea down to alveolus, in order. What an alveolus is next to.',
      usedIn:'Week 12.',
      review:'Anatomy review cards, Respiratory System area.' },
    { id:'nephron', units:[5], name:'The nephron',
      need:'Glomerulus, capsule, proximal tubule, loop, distal tubule, collecting duct. In order.',
      usedIn:'Week 13. Students who arrive without this spend the whole week catching up.',
      review:'Anatomy review cards, Urinary area. Draw it once from memory before week 13.' },
    { id:'endo', units:[3], name:'The endocrine glands',
      need:'Where the pituitary, thyroid, adrenals and pancreas are. Not their hormones, just where they are.',
      usedIn:'Week 9.',
      review:'Anatomy review cards, Endocrine area.' },
    { id:'gi', units:[5], name:'The digestive tract',
      need:'Mouth to anus in order, plus liver, gallbladder and pancreas hanging off it.',
      usedIn:'Week 14.',
      review:'Anatomy review cards, Digestive area.' }
  ],
  questions: [
    { id:'a1', concept:'heart', units:[4], level:1,
      q:'Blood leaving the left ventricle goes into the:',
      options:['Pulmonary artery','Aorta','Superior vena cava','Left atrium'],
      answer:1,
      why:'Left ventricle to aorta to the whole body. If the path through the heart is not automatic yet, fix that before week 10. It is the spine of two full weeks.' },
    { id:'a2', concept:'vessels', units:[4], level:1,
      q:'Which vessel is the site of exchange between blood and tissue?',
      options:['Artery','Arteriole','Capillary','Vein'],
      answer:2,
      why:'One cell thick, which is the whole reason it works. Week 11 spends its time on what crosses that wall and why.' },
    { id:'a3', concept:'neuron', units:[2,3], level:1,
      q:'Which part of a neuron carries the signal away from the cell body?',
      options:['Dendrite','Axon','Nucleus','Myelin'],
      answer:1,
      why:'Dendrites receive, axon sends. Simple, and everything in weeks 4 and 5 is built on it.' },
    { id:'a4', concept:'lung', units:[4], level:1,
      q:'Gas exchange in the lung happens at the:',
      options:['Trachea','Bronchus','Bronchiole','Alveolus'],
      answer:3,
      why:'Everything above the alveolus is plumbing. Week 12 splits the airway into exactly that: the part that carries air and the part that exchanges it.' },
    { id:'a5', concept:'muscle', units:[2], level:2,
      q:'Put these in order, largest to smallest:',
      options:['Sarcomere, myofibril, muscle fiber, muscle','Muscle, muscle fiber, myofibril, sarcomere','Muscle fiber, muscle, sarcomere, myofibril','Myofibril, sarcomere, muscle, muscle fiber'],
      answer:1,
      why:'Whole muscle, then one cell, then the bundles inside the cell, then the unit that actually shortens. Week 6 works down that ladder in order.' },
    { id:'a6', concept:'nephron', units:[5], level:2,
      q:'Filtrate leaves the glomerular capsule and enters the:',
      options:['Collecting duct','Loop of Henle','Proximal tubule','Distal tubule'],
      answer:2,
      why:'Capsule, proximal tubule, loop, distal tubule, collecting duct. Week 13 asks what happens at each stop, so the order has to be there first.' },
    { id:'a7', concept:'tissue', units:[1,2,5], level:2,
      q:'A tissue lines the inside of the small intestine and controls what gets absorbed. Which type is it?',
      options:['Connective','Epithelial','Muscle','Nervous'],
      answer:1,
      why:'Epithelium lines and covers, and it is selective. Transport across an epithelium is week 2 and it is back again in weeks 13 and 14.' },
    { id:'a8', concept:'heart', units:[4], level:3,
      q:'Which valve is open while the left ventricle is filling?',
      options:['Aortic','Mitral','Pulmonary','Tricuspid'],
      answer:1,
      why:'Filling means blood entering from the left atrium, so the mitral valve is open and the aortic is shut. Week 11 is largely this question asked four ways.' },
    { id:'a9', concept:'endo', units:[3], level:3,
      q:'Which gland sits directly below the brain and is attached to the hypothalamus?',
      options:['Thyroid','Adrenal','Pituitary','Pancreas'],
      answer:2,
      why:'That attachment is not a detail, it is the mechanism. Week 9 is mostly the hypothalamus telling the pituitary what to do.' },
    { id:'a11', concept:'cell', units:[1], level:2,
      q:'A cell type does a great deal of active transport, day and night. Which organelle would you expect a lot of?',
      options:['Nucleus','Mitochondria','Golgi apparatus','Lysosome'],
      answer:1,
      why:'Active transport costs ATP, and mitochondria make it. This is why the proximal tubule cell in your kidney is stuffed with them, which is week 13.' },
    { id:'a10', concept:'gi', units:[5], level:3,
      q:'Bile is made in the liver. Where is it stored before it is released?',
      options:['Pancreas','Gallbladder','Duodenum','Stomach'],
      answer:1,
      why:'Made in the liver, stored in the gallbladder, released into the duodenum. Week 14 asks why fat digestion fails when that path is blocked.' },
    /* ---- Later units, deeper. ---- */
    { id:'a12', concept:'cell', units:[1], level:2,
      q:'Which structure is the boundary that every transport question in week 2 is about?',
      options:['The nuclear envelope','The plasma membrane','The cell wall','The cytoskeleton'],
      answer:1,
      why:'The plasma membrane is the border. Every gradient, every pump and every channel in week 2 is about getting something across it.' },
    { id:'a13', concept:'neuron', units:[3], level:3,
      q:'A sensory neuron carries information toward the central nervous system. Where is its cell body?',
      options:['In the spinal cord gray matter','In a dorsal root ganglion, just outside the cord','In the muscle it serves','In the brainstem'],
      answer:1,
      why:'Sensory cell bodies sit outside the cord in the dorsal root ganglion, which is why the reflex arc diagram in week 7 has that bulge on the way in. Motor cell bodies are inside.' },
    { id:'a14', concept:'heart', units:[4], level:3,
      q:'Which valve is open during ventricular filling?',
      options:['The aortic valve','The mitral valve','The pulmonary valve','All four'],
      answer:1,
      why:'Filling means blood moving from atrium to ventricle, so the valve between them is open and the outflow valves are shut. Getting the valve state right at each phase is most of the cardiac cycle in week 11.' },
    { id:'a15', concept:'nephron', units:[5], level:3,
      q:'Which part of the nephron does most of the reabsorption, taking back about two thirds of what was filtered?',
      options:['The glomerulus','The proximal tubule','The loop of Henle','The collecting duct'],
      answer:1,
      why:'The proximal tubule is the bulk worker: about two thirds of filtered water and sodium comes back there, before any of the fine adjustment happens further along. Week 13.' },
    { id:'a16', concept:'gi', units:[5], level:2,
      q:'Most nutrient absorption happens in which part of the tract?',
      options:['Stomach','Small intestine','Large intestine','Esophagus'],
      answer:1,
      why:'The stomach mostly digests and the large intestine mostly recovers water. The small intestine is where absorption happens, and its folds, villi and microvilli are why. Surface area is the whole story, and that is structure explaining function again.' }
  ]
},

/* ==========================================================
   MATH
   Added Aug 21 2026. Until now, math was one concept out of eight
   inside the chemistry box, tested by a single question, which is
   thin for the thing every calculation in the course rests on. It
   is also not chemistry. A student can be fine on ions and lost on
   what a millimole is, and the chemistry box could not tell those
   two apart.

   Nine concepts, ten questions, same rules as the other two: every
   concept tested at least once, levels mixed on purpose, scored by
   concept so a student who got the easy ones right is still told
   what is missing.
   ========================================================== */
math: {
  key: 'math',
  title: 'Math you need',
  blurb: 'There is not much math in this course and none of it is hard. What there is, you need to be able to do without stopping to think, because a question about the kidney should never turn into a question about unit conversion.',
  concepts: [
    { id:'units', units:[1,2,3,4,5], name:'Metric prefixes and unit conversion',
      need:'Milli, micro and kilo, and moving between them without looking it up. Multiply molar by 1,000 to get millimolar.',
      usedIn:'Every calculation in the course. Weeks 11 and 13 in particular.',
      review:'No reading needed. Work the practice questions in this box until the conversions are automatic.' },
    { id:'osm', units:[1,2,5], name:'Counting particles, not molecules',
      need:'Osmolarity counts particles. A salt that splits into two ions contributes twice what a sugar that does not split contributes.',
      usedIn:'Week 2 tonicity, and every fluid problem after it.',
      review:'The math section of the week 1 material, the units table.' },
    { id:'prop', units:[4], name:'Proportions and percent change',
      need:'If one number doubles and another halves, what happens to their product. Percent of a starting value, not of the final one.',
      usedIn:'Week 11, cardiac output equals heart rate times stroke volume. Week 12, gas exchange.',
      review:'The math section of the week 1 material.' },
    { id:'rate', units:[1,4,5], name:'Rates, and what per means',
      need:'A rate is an amount per unit time, and it needs both parts. 5 liters is not a rate. 5 liters per minute is.',
      usedIn:'Week 11 cardiac output, week 12 ventilation, week 13 clearance, and the week 1 enzyme assay.',
      review:'The math section of the week 1 material.' },
    { id:'graph', units:[1,2,4,5], name:'Reading a graph',
      need:'Which variable goes on which axis, reading a value off a curve, and knowing that a steep part of a curve means a small change in x makes a big change in y.',
      usedIn:'Half of your lab work. Week 12 in particular, where the whole point of the oxygen curve is which part of it you are on.',
      review:'The math section of the week 1 material, reading a graph.' },
    { id:'log', units:[1,4,5], name:'What a log scale does',
      need:'You do not need to calculate logs. You need to know that one pH unit is a tenfold change, so 7.0 to 6.0 is ten times more acidic, not a little more.',
      usedIn:'Week 12 and all of week 14.',
      review:'The chemistry section of the week 1 material, pH and buffers.' },
    { id:'balance', units:[1,5], name:'In minus out',
      need:'If more comes in than goes out the amount rises, and by how much. This is arithmetic, and it is the most used tool in the first unit.',
      usedIn:'Week 1 mass balance, week 13 renal handling, week 14 acid base.',
      review:'The mass balance section of the week 1 material.' },
    { id:'charge', units:[1,2], name:'Charge, and why mEq is not mM',
      need:'Milliequivalents count charge. For a singly charged ion the two numbers are the same. For calcium, which carries two charges, they are not.',
      usedIn:'Weeks 4 and 6, and any lab value reported in mEq.',
      review:'The math section of the week 1 material, the units table.' },
    { id:'est', units:[1,2,3,4,5], name:'Sanity checking an answer',
      need:'Knowing roughly what a normal value is, so an answer that is a hundred times off looks wrong to you before you hand it in.',
      usedIn:'Every calculation. This is the skill that catches the misplaced decimal.',
      review:'No reading. The normal values live in the week material as you meet them.' }
  ],
  questions: [
    { id:'m1', concept:'units', units:[1,2], level:1,
      q:'A solution is 0.15 molar. In millimolar that is:',
      options:['1.5 mM','15 mM','150 mM','1,500 mM'],
      answer:2,
      why:'Molar times 1,000 gives millimolar. 0.15 times 1,000 is 150 mM, which happens to be about the sodium concentration outside your cells.' },
    { id:'m2', concept:'rate', units:[1], level:1,
      q:'Which of these is a rate?',
      options:['5 liters','70 beats','5 liters per minute','120 mmHg'],
      answer:2,
      why:'A rate is an amount per unit time and it needs both halves. Cardiac output is about 5 liters per minute, and that per minute is not decoration.' },
    { id:'m3', concept:'graph', units:[1,2], level:1,
      q:'You change the temperature and measure the reaction rate. Which goes on the x axis?',
      options:['Reaction rate','Temperature','Either one','Whichever has more values'],
      answer:1,
      why:'What you changed goes on x, what you measured goes on y. Temperature is what you changed. Backwards is the most common thing marked wrong on a lab submission.' },
    { id:'m4', concept:'balance', units:[1], level:1,
      q:'Someone takes in 2,500 mL of water a day and puts out 2,900 mL. After two days they are:',
      options:['400 mL down','800 mL down','400 mL up','In balance'],
      answer:1,
      why:'400 mL short each day, so 800 mL down after two. This is the whole of mass balance, and it is the most used tool in the first unit.' },
    { id:'m5', concept:'osm', units:[1,2,5], level:2,
      q:'A 1 M solution of glucose and a 1 M solution of sodium chloride. Which has the higher osmolarity?',
      options:['Glucose','Sodium chloride','They are the same','Cannot tell without temperature'],
      answer:1,
      why:'Osmolarity counts particles. Glucose stays whole, so 1 M is about 1 osmolar. Sodium chloride splits into two ions, so 1 M is close to 2 osmolar. This is why the two pull water differently in week 2.' },
    { id:'m6', concept:'prop', units:[4], level:2,
      q:'Cardiac output is heart rate times stroke volume. Heart rate doubles and stroke volume falls by half. Cardiac output:',
      options:['Doubles','Falls by half','Stays about the same','Quadruples'],
      answer:2,
      why:'Times two and then times one half leaves you where you started. Week 11 turns on exactly this, which is why a very fast heart that cannot fill does not help.' },
    { id:'m7', concept:'charge', units:[1,2], level:2,
      q:'A lab value reads 2.5 mEq per liter of calcium. In millimolar that is:',
      options:['5.0 mM','2.5 mM','1.25 mM','0.25 mM'],
      answer:2,
      why:'Milliequivalents count charge, and calcium carries two charges per ion, so you halve it. 2.5 mEq is 1.25 mM. For sodium or potassium, one charge each, the two numbers are the same.' },
    { id:'m8', concept:'log', units:[1,4,5], level:3,
      q:'Blood pH falls from 7.4 to 6.4. The hydrogen ion concentration has:',
      options:['Gone up by one unit','Gone up ten times','Gone down ten times','Roughly doubled'],
      answer:1,
      why:'The pH scale is logarithmic, so one unit is a tenfold change, and lower pH means more hydrogen ion. This is why a drop that looks small on paper is an emergency in week 14.' },
    { id:'m9', concept:'est', units:[1,2,3,4,5], level:3,
      q:'You calculate a cardiac output of 480 liters per minute. The most useful next step is:',
      options:['Report it, the math is the math','Check for a misplaced decimal or a unit error','Repeat the measurement','Average it with your partner\'s answer'],
      answer:1,
      why:'Normal is about 5 liters per minute, so 480 is a hundredfold off and almost certainly a units slip. Knowing roughly what normal looks like is what catches this, and it is a real skill.' },
    { id:'m10', concept:'graph', units:[1,2,4,5], level:3,
      q:'On the oxygen curve in week 12, the steep part means that in that range:',
      options:['A small change in oxygen pressure barely changes saturation','A small change in oxygen pressure changes saturation a lot','Saturation is constant','The curve is measured less accurately'],
      answer:1,
      why:'A steep slope means a small change in x produces a large change in y. That is why tissues sit on the steep part, where a little pressure drop unloads a lot of oxygen.' },
    /* ---- Later units, same concepts, deeper. ---- */
    { id:'m11', concept:'units', units:[3], level:3,
      q:'A hormone circulates at about 10 picomolar. Plasma sodium is about 140 millimolar. The hormone is roughly:',
      options:['Ten times less concentrated','A thousand times less concentrated','Ten million times less concentrated','About the same'],
      answer:2,
      why:'Milli is a thousandth, pico is a trillionth, so there are nine orders of magnitude between the prefixes, then the 140 against 10. Hormones work at vanishingly low concentrations, which is why receptor affinity matters so much in week 9.' },
    { id:'m12', concept:'est', units:[3], level:2,
      q:'You calculate a circulating hormone concentration of 2 molar. The most useful next step is:',
      options:['Report it','Check the calculation, hormones circulate around a billion times lower than that','Repeat the assay','Convert it to millimolar and report that'],
      answer:1,
      why:'2 molar is roughly seawater. Knowing the rough size of a normal value is what catches a slipped prefix, and prefixes are where these go wrong.' },
    { id:'m13', concept:'rate', units:[4], level:3,
      q:'Cardiac output is 5 L per minute and heart rate is 50 beats per minute. Stroke volume is:',
      options:['250 mL','100 mL','10 mL','50 mL'],
      answer:1,
      why:'5 liters per minute divided by 50 beats per minute is 0.1 liters per beat, which is 100 mL. Watch the units through the division: liters per minute over beats per minute leaves liters per beat.' },
    { id:'m14', concept:'log', units:[5], level:3,
      q:'A patient goes from pH 7.4 to pH 7.1. Hydrogen ion concentration has gone up by roughly:',
      options:['Half','Double','Ten times','A hundred times'],
      answer:1,
      why:'0.3 of a pH unit is about a doubling, because log 2 is close to 0.3. A whole unit is tenfold. This is why a pH that looks barely changed on the chart is a real problem in week 14.' },
    { id:'m15', concept:'balance', units:[5], level:3,
      q:'A substance is freely filtered, then neither reabsorbed nor secreted. Its clearance equals:',
      options:['Renal blood flow','Glomerular filtration rate','Urine flow rate','Zero'],
      answer:1,
      why:'If everything filtered leaves in the urine and nothing is added or taken back, then the volume of plasma cleared per minute is exactly the volume filtered per minute. That is why inulin and creatinine are used to measure GFR in week 13. It is mass balance with a kidney around it.' },
    { id:'m16', concept:'osm', units:[5], level:2,
      q:'Urine osmolarity is 1,200 mOsM and plasma is 290 mOsM. The kidney is:',
      options:['Getting rid of water','Holding onto water and concentrating the urine','Failing','Losing solute'],
      answer:1,
      why:'Urine four times as concentrated as plasma means water was pulled back and solute was left behind. Concentrated urine is a working kidney conserving water, which is week 13.' },
    { id:'m17', concept:'rate', units:[5], level:3,
      q:'Clearance is reported in mL per minute. What is actually being measured?',
      options:['How much urine is made per minute','The volume of plasma completely cleared of that substance per minute','How fast blood flows through the kidney','The concentration in the urine'],
      answer:1,
      why:'It is a virtual volume, not a real one. No literal milliliter is emptied. It is the volume of plasma that would have to be stripped completely to account for the amount appearing in urine, and that framing is what makes week 13 make sense.' },
    { id:'m18', concept:'graph', units:[2], level:2,
      q:'On an action potential traced against time, the steepest upstroke means:',
      options:['Voltage is changing fastest there','Voltage is highest there','The most sodium is present','The recording is noisy'],
      answer:0,
      why:'Slope is rate of change, so the steep part is where voltage moves fastest, not where it is greatest. Peak and steepest are different points on that trace, and week 4 asks about both.' },
    { id:'m19', concept:'units', units:[4], level:3,
      q:'Arterial oxygen is about 100 mmHg and arterial pressure is about 100 mmHg. What does that tell you?',
      options:['They are measuring the same thing','Nothing, the same unit can describe unrelated quantities','Oxygen drives blood pressure','One of the two numbers is wrong'],
      answer:1,
      why:'A unit tells you the kind of quantity, not what it belongs to. Both are pressures and the coincidence is meaningless. Reading a value without reading what it is a value of is how a number ends up in the wrong equation.' }
  ]
},

/* ==========================================================
   HOW THE RESULT IS WORDED
   Scored by concept, not only by total, so a student who scrapes
   seven out of ten by getting every easy one right is still told
   what they are missing.
   ========================================================== */
verdicts: [
  { min:9, headline:'You are ready. Go straight into week 1.',
    body:'Nothing here needs your weekend. If a specific thing comes up later you can always come back to this page.' },
  { min:7, headline:'You are close. Look at the few below and then start.',
    body:'This is a normal result and it is not a problem. Spend an hour on what you missed, not a weekend on everything.' },
  { min:5, headline:'Worth a session before week 1.',
    body:'You have most of it. The gaps below are the ones that will slow you down in the weeks named, so it is cheaper to fix them now than in week 10.' },
  { min:0, headline:'Start here rather than in week 1.',
    body:'This is useful to know now instead of in October, and it is completely fixable. Work the list below first, then come back and take this again. Message me if you want a hand deciding where to start.' }
]
};
