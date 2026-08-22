/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   readiness-check.js

   Two readiness checks a student takes before the term starts:
   chemistry and anatomy. Each one is a list of what physiology
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

   Chemistry has 10 questions, anatomy has 11, because anatomy has
   ten concepts and the heart earns two questions. Every concept on
   both lists is tested by at least one question. That is the rule
   that matters, not a round number.

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
    { id:'ions', name:'Ions and charge',
      need:'Sodium, potassium, calcium and chloride carry charge, and that charge is what makes a nerve fire and a muscle contract.',
      usedIn:'Weeks 2 to 6, and everywhere after',
      review:'OpenStax Anatomy and Physiology 2e, chapter 2, the section on ions and ionic bonds. Link to add.' },
    { id:'conc', name:'Concentration and gradients',
      need:'What a concentration is, and what it means for something to be more concentrated on one side of a membrane than the other.',
      usedIn:'Week 2 onward. This is the single most used idea in the course.',
      review:'OpenStax 2e chapter 3, membrane transport. Link to add.' },
    { id:'water', name:'Water, polarity and solubility',
      need:'Why water dissolves salt but not fat, and what hydrophilic and hydrophobic mean.',
      usedIn:'Week 2, membranes. Week 9, why some hormones need a carrier and others do not.',
      review:'OpenStax 2e chapter 2, water. Link to add.' },
    { id:'ph', name:'Acids, bases and pH',
      need:'What pH measures, which direction is more acidic, and roughly what blood pH is.',
      usedIn:'Week 12 gas transport, and all of week 14.',
      review:'OpenStax 2e chapter 2, inorganic compounds. Link to add.' },
    { id:'buffer', name:'Buffers',
      need:'What a buffer does when acid is added, in one sentence.',
      usedIn:'Week 14. Acid base is the topic students most often say they were not ready for.',
      review:'OpenStax 2e chapter 26, acid base balance, first section only. Link to add.' },
    { id:'protein', name:'Proteins and shape',
      need:'That a protein does its job because of its shape, and that heat or a pH change can wreck that shape.',
      usedIn:'Week 1 enzymes, week 2 transporters, week 9 receptors.',
      review:'OpenStax 2e chapter 2, proteins. Link to add.' },
    { id:'energy', name:'ATP and energy',
      need:'That ATP is the cell’s energy currency and that splitting it releases energy the cell can use.',
      usedIn:'Week 2 pumps, week 6 muscle, week 14 metabolism.',
      review:'OpenStax 2e chapter 2, ATP. Link to add.' },
    { id:'units', name:'Units and simple calculation',
      need:'Reading and converting the units this course uses: molar and millimolar, mmHg, litres per minute, percent.',
      usedIn:'Every calculation in the course. Week 11 and week 13 in particular.',
      review:'No reading needed. Practice on the questions below and see the worked answers.' }
  ],
  questions: [
    { id:'c1', concept:'ions', level:1,
      q:'Which of these carries a positive charge?',
      options:['Chloride, Cl minus','Potassium, K plus','Bicarbonate, HCO3 minus','Phosphate, PO4 3 minus'],
      answer:1,
      why:'Potassium is a cation, a positively charged ion. The other three are anions. This matters immediately: the resting membrane potential is set mostly by potassium sitting where it does.' },
    { id:'c2', concept:'conc', level:1,
      q:'A solution has more solute per litre than the one next to it. Left alone, and free to move, which way does the solute go?',
      options:['From the more concentrated side to the less','From the less concentrated side to the more','It does not move without energy','It splits evenly instantly'],
      answer:0,
      why:'Down its concentration gradient, high to low, no energy needed. This one sentence explains most of weeks 2 and 12.' },
    { id:'c3', concept:'water', level:1,
      q:'A molecule is described as hydrophobic. What does that tell you?',
      options:['It dissolves easily in water','It carries a strong negative charge','It does not mix with water and will sit in fat','It is always a protein'],
      answer:2,
      why:'Water fearing. The middle of a cell membrane is hydrophobic, which is exactly why charged things like sodium cannot simply drift through and need a protein.' },
    { id:'c4', concept:'ph', level:1,
      q:'Blood pH is about 7.4. A blood pH of 7.1 is:',
      options:['More acidic than normal','More basic than normal','Normal for exercise','Not possible'],
      answer:0,
      why:'Lower pH means more acidic. Note how small the number change is. A shift from 7.4 to 7.1 is a serious clinical problem, and that narrowness is the reason week 14 exists.' },
    { id:'c5', concept:'protein', level:2,
      q:'An enzyme is heated well past body temperature and stops working, even after it cools. The best explanation is:',
      options:['It ran out of substrate','Its shape was changed and the active site no longer fits','It was diluted','Enzymes only work once'],
      answer:1,
      why:'Denaturation. Shape is function, and once the shape goes the job goes with it. The same logic explains why a fever above a certain point is dangerous.' },
    { id:'c6', concept:'energy', level:2,
      q:'A cell moves sodium out against its concentration gradient. What must be true?',
      options:['It happens faster than diffusion','It requires energy, usually from ATP','It only happens in nerve cells','Sodium must be uncharged first'],
      answer:1,
      why:'Moving anything against its gradient costs energy. The sodium potassium pump spends a large share of your resting energy doing exactly this, all day.' },
    { id:'c7', concept:'units', level:2,
      q:'A solution is 0.15 molar. In millimolar that is:',
      options:['1.5 mM','15 mM','150 mM','1500 mM'],
      answer:2,
      why:'Milli means one thousandth, so multiply by 1000. 0.15 M is 150 mM, which happens to be roughly the sodium concentration outside your cells.' },
    { id:'c8', concept:'buffer', level:3,
      q:'Acid is added to a buffered solution. Compared with adding the same acid to pure water, the pH:',
      options:['Falls much less','Falls much more','Rises','Does not change at all'],
      answer:0,
      why:'A buffer resists the change, it does not prevent it. That distinction is worth holding on to, because compensation in week 14 works the same way: it limits the damage, it does not undo it.' },
    { id:'c9', concept:'conc', level:3,
      q:'Two compartments are separated by a membrane that lets water through but not glucose. Compartment A has more glucose. Water will:',
      options:['Move from A to B','Move from B to A','Not move, glucose is the one that moves','Move both ways equally forever'],
      answer:1,
      why:'Water moves toward the higher solute concentration, so from B into A. If you got this, osmosis in week 2 will not surprise you. If you did not, work that one section before the term.' },
    { id:'c10', concept:'water', level:3,
      q:'A hormone is fat soluble. Which is most likely true of how it travels in blood?',
      options:['It dissolves freely in plasma on its own','It needs a carrier protein to travel in plasma','It cannot enter the bloodstream','It is destroyed instantly in plasma'],
      answer:1,
      why:'Blood is mostly water, so a fat soluble hormone needs a carrier to get around. That single fact explains why steroid hormones last hours and peptide hormones last minutes, which is week 9.' }
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
    { id:'cell', name:'The cell and its parts',
      need:'Plasma membrane, nucleus, mitochondria, endoplasmic reticulum. What each one is for.',
      usedIn:'Weeks 1 to 3.',
      review:'Anatomy review cards in this course, Foundations area. Also OpenStax 2e chapter 3.' },
    { id:'tissue', name:'The four tissue types',
      need:'Epithelial, connective, muscle, nervous. Enough to tell them apart and say what each does.',
      usedIn:'Week 2 transport across epithelium, week 6 muscle, week 4 nervous.',
      review:'Anatomy review cards, Foundations area.' },
    { id:'neuron', name:'The neuron',
      need:'Cell body, dendrites, axon, axon terminal, myelin. Which end receives and which end sends.',
      usedIn:'Weeks 4 and 5, which are the hardest weeks in the course for most students.',
      review:'Anatomy review cards, Nervous System area.' },
    { id:'muscle', name:'How skeletal muscle is built',
      need:'Muscle, fibre, myofibril, sarcomere. Nested, biggest to smallest.',
      usedIn:'Week 6.',
      review:'Anatomy review cards, Skeletal and Muscular area.' },
    { id:'heart', name:'The heart',
      need:'Four chambers, four valves, and the path blood takes through them in order.',
      usedIn:'Weeks 10 and 11. If one thing on this list is shaky, make it not be this one.',
      review:'Anatomy review cards, Cardiovascular System: The Heart. 313 cards on this alone.' },
    { id:'vessels', name:'Blood vessel types',
      need:'Artery, arteriole, capillary, venule, vein, and which direction each carries blood.',
      usedIn:'Week 11.',
      review:'Anatomy review cards, Vessels area.' },
    { id:'lung', name:'The respiratory tract',
      need:'Trachea down to alveolus, in order. What an alveolus is next to.',
      usedIn:'Week 12.',
      review:'Anatomy review cards, Respiratory System area.' },
    { id:'nephron', name:'The nephron',
      need:'Glomerulus, capsule, proximal tubule, loop, distal tubule, collecting duct. In order.',
      usedIn:'Week 13. Students who arrive without this spend the whole week catching up.',
      review:'Anatomy review cards, Urinary area. Draw it once from memory before week 13.' },
    { id:'endo', name:'The endocrine glands',
      need:'Where the pituitary, thyroid, adrenals and pancreas are. Not their hormones, just where they are.',
      usedIn:'Week 9.',
      review:'Anatomy review cards, Endocrine area.' },
    { id:'gi', name:'The digestive tract',
      need:'Mouth to anus in order, plus liver, gallbladder and pancreas hanging off it.',
      usedIn:'Week 14.',
      review:'Anatomy review cards, Digestive area.' }
  ],
  questions: [
    { id:'a1', concept:'heart', level:1,
      q:'Blood leaving the left ventricle goes into the:',
      options:['Pulmonary artery','Aorta','Superior vena cava','Left atrium'],
      answer:1,
      why:'Left ventricle to aorta to the whole body. If the path through the heart is not automatic yet, fix that before week 10. It is the spine of two full weeks.' },
    { id:'a2', concept:'vessels', level:1,
      q:'Which vessel is the site of exchange between blood and tissue?',
      options:['Artery','Arteriole','Capillary','Vein'],
      answer:2,
      why:'One cell thick, which is the whole reason it works. Week 11 spends its time on what crosses that wall and why.' },
    { id:'a3', concept:'neuron', level:1,
      q:'Which part of a neuron carries the signal away from the cell body?',
      options:['Dendrite','Axon','Nucleus','Myelin'],
      answer:1,
      why:'Dendrites receive, axon sends. Simple, and everything in weeks 4 and 5 is built on it.' },
    { id:'a4', concept:'lung', level:1,
      q:'Gas exchange in the lung happens at the:',
      options:['Trachea','Bronchus','Bronchiole','Alveolus'],
      answer:3,
      why:'Everything above the alveolus is plumbing. Week 12 splits the airway into exactly that: the part that carries air and the part that exchanges it.' },
    { id:'a5', concept:'muscle', level:2,
      q:'Put these in order, largest to smallest:',
      options:['Sarcomere, myofibril, muscle fibre, muscle','Muscle, muscle fibre, myofibril, sarcomere','Muscle fibre, muscle, sarcomere, myofibril','Myofibril, sarcomere, muscle, muscle fibre'],
      answer:1,
      why:'Whole muscle, then one cell, then the bundles inside the cell, then the unit that actually shortens. Week 6 works down that ladder in order.' },
    { id:'a6', concept:'nephron', level:2,
      q:'Filtrate leaves the glomerular capsule and enters the:',
      options:['Collecting duct','Loop of Henle','Proximal tubule','Distal tubule'],
      answer:2,
      why:'Capsule, proximal tubule, loop, distal tubule, collecting duct. Week 13 asks what happens at each stop, so the order has to be there first.' },
    { id:'a7', concept:'tissue', level:2,
      q:'A tissue lines the inside of the small intestine and controls what gets absorbed. Which type is it?',
      options:['Connective','Epithelial','Muscle','Nervous'],
      answer:1,
      why:'Epithelium lines and covers, and it is selective. Transport across an epithelium is week 2 and it is back again in weeks 13 and 14.' },
    { id:'a8', concept:'heart', level:3,
      q:'Which valve is open while the left ventricle is filling?',
      options:['Aortic','Mitral','Pulmonary','Tricuspid'],
      answer:1,
      why:'Filling means blood entering from the left atrium, so the mitral valve is open and the aortic is shut. Week 11 is largely this question asked four ways.' },
    { id:'a9', concept:'endo', level:3,
      q:'Which gland sits directly below the brain and is attached to the hypothalamus?',
      options:['Thyroid','Adrenal','Pituitary','Pancreas'],
      answer:2,
      why:'That attachment is not a detail, it is the mechanism. Week 9 is mostly the hypothalamus telling the pituitary what to do.' },
    { id:'a11', concept:'cell', level:2,
      q:'A cell type does a great deal of active transport, day and night. Which organelle would you expect a lot of?',
      options:['Nucleus','Mitochondria','Golgi apparatus','Lysosome'],
      answer:1,
      why:'Active transport costs ATP, and mitochondria make it. This is why the proximal tubule cell in your kidney is stuffed with them, which is week 13.' },
    { id:'a10', concept:'gi', level:3,
      q:'Bile is made in the liver. Where is it stored before it is released?',
      options:['Pancreas','Gallbladder','Duodenum','Stomach'],
      answer:1,
      why:'Made in the liver, stored in the gallbladder, released into the duodenum. Week 14 asks why fat digestion fails when that path is blocked.' }
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
