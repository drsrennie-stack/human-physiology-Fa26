/* BIO 005 Human Physiology, Week 1, Unit 1
   Slide deck P, Mission 1, Maintain Control
   Silverthorn chapter 1, plus the homeostasis and communication frame of chapter 6.
   Concept markers divide the deck into recording segments.
   Density pass Sep 5 2026: depth moved into reveal cards, nothing cut.
   Dr. Sharilyn Rennie */

module.exports = {
  id: "slides-p-mission-01-maintain-control",
  letter: "P",
  type: "Physiology",
  week: 1,
  unit: 1,
  topic: "Mission 1, Maintain Control",
  title: "Your patient's numbers are moving, and something is supposed to be stopping that",
  subtitle: "Thirteen concepts on how the body holds itself steady: the internal environment, mass balance, control loops, how a signal travels, and the three kinds of feedback. Recorded one concept at a time.",

  slides: [

    /* ============================================================ MISSION */
    /* ---------------------------------------------------------- 1 */
    {
      k: "title",
      variant: "terra",
      kicker: "Week 1 . Unit 1 . Mission 1",
      h: "Maintain control",
      lede: "Everything your body does depends on keeping conditions inside you steady while the world outside does whatever it wants. That is the whole job.",
      terms: [
        { t: "Internal environment", c: "t" },
        { t: "Homeostasis", c: "t" },
        { t: "Mass balance", c: "l" },
        { t: "Control loop", c: "g" },
        { t: "Negative feedback", c: "g" },
        { t: "Feedforward", c: "l" }
      ],
      big: "A number that stays the same is not being left alone. It is being held."
    },

    /* ---------------------------------------------------------- 2 */
    {
      k: "cards",
      cols: 3,
      kicker: "Before we start . What a mission is",
      h: "Why I keep calling these missions",
      lede: "One word, used all semester. Here is what I mean by it before I use it again.",
      cards: [
        {
          label: "The body's job",
          h: "One job, too big to learn at once",
          p: ["Keep conditions inside steady enough that your cells can keep working. That job is far too big to take in one piece, so I have broken it into smaller jobs."]
        },
        {
          label: "A mission",
          labelClass: "terra",
          h: "A problem you have to earn the answer to",
          p: ["A mission starts with a problem already on the table, usually a patient or a claim somebody is making. You do not get the answer first. You learn the science the problem needs, then decide whether the evidence supports the claim."]
        },
        {
          label: "The five",
          labelClass: "teal",
          h: "Unit 1, Keep the Human Alive",
          list: [
            "1. Maintain control. This week.",
            "2. Build the molecular toolkit.",
            "3. Organize the machinery.",
            "4. Power the system.",
            "5. Coordinate the human."
          ]
        }
      ],
      big: "The problem comes first. The science comes because you need it."
    },

    /* ---------------------------------------------------------- 3 */
    {
      k: "hook",
      kicker: "Beat 1 . The mission",
      h: "Meet the problem",
      hook: {
        icon: "!",
        iconClass: "terra",
        label: "The claim on the table",
        h: "Something in this patient has stopped holding a number steady.",
        say: "Three days of values from one person. Nobody is telling you which system is involved.",
        p: [
          "By the end of this mission you will be able to say whether the body stopped measuring that value, stopped sending the message, or stopped being able to act on it."
        ]
      },
      big: "Sensing, signaling, responding. A number drifts when one of those three has quit."
    },

    /* ---------------------------------------------------------- 4 */
    {
      k: "activity",
      badges: [{ t: "Apply in class", cls: "gold" }],
      kicker: "Beat 1 . The mission",
      h: "Sort these before I say anything",
      lede: "Two piles, in range or out of range. Do not look anything up. Guess where you have to, and mark which ones were guesses.",
      listLabel: "Day 3 values, same patient",
      list: [
        "Sodium 128 mmol/L",
        "Potassium 4.1 mmol/L",
        "Glucose 96 mg/dL",
        "Temperature 37.1 C",
        "Heart rate 104 per minute",
        "Blood pressure 96 over 58",
        "Urine output 2900 mL in 24 hours"
      ],
      big: "Which pile was hardest? That is the one to watch this week.",
      covers: ["w1-lab-graphing"]
    },

    /* ---------------------------------------------------------- 5 */
    {
      k: "text",
      variant: "dark",
      kicker: "Beat 1 . The mission",
      h: "What you are being asked to do",
      lede: "The shape of the whole mission, so you know where this is going.",
      list: [
        "**Learn what steady actually means.** It is not what most people think.",
        "**Learn the parts of a control loop.** Five of them, and each can fail.",
        "**Learn how the message travels.** A sensor nothing listens to is useless.",
        "**Come back to the patient.** Name the part that failed, and defend it."
      ],
      big: "You are not diagnosing. You are locating the failure in a loop."
    },

    /* ============================================================ CONCEPT 1 */
    /* ---------------------------------------------------------- 6 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 1 of 13",
      h: "What physiology asks",
      lede: "Anatomy asks what a thing is. Physiology asks what it does, how it does it, and what happens when conditions change."
    },

    /* ---------------------------------------------------------- 7 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 1 . What physiology asks",
      h: "Physiology is the study of function",
      lede: "Function means what something accomplishes, and the steps by which it accomplishes it.",
      cards: [
        {
          label: "Why the parts list is not enough",
          h: "Naming does not explain",
          p: ["You can know the name of every part of the kidney and still not be able to say why someone is making three liters of urine a day. The parts list does not tell you the behavior."]
        },
        {
          label: "Where anatomy turns up",
          labelClass: "teal",
          h: "Only when a mechanism needs it",
          p: ["Anatomy is still in here, but it appears where structure explains why a process works the way it does. When you need it to follow a mechanism, we go get it."]
        }
      ],
      big: "What does it do, how does it do it, and what changes when conditions change.",
      covers: ["w1-levels-function"]
    },

    /* ---------------------------------------------------------- 8 */
    {
      k: "rows",
      kicker: "Concept 1 . What physiology asks",
      h: "Function shows up at every level",
      lede: "One event, followed up through six levels of organization.",
      rows: [
        { dot: "1", h: "Molecule", p: ["A protein changes shape when something binds to it."] },
        { dot: "2", h: "Cell", p: ["That shape change opens a channel, and ions move."] },
        { dot: "3", h: "Tissue", p: ["Enough cells do it together that the tissue contracts."] },
        { dot: "4", h: "Organ", p: ["The contraction ejects blood."] },
        { dot: "5", h: "System", p: ["Pressure rises in vessels far from the heart."] },
        { dot: "6", h: "Organism", p: ["You stand up without passing out."] }
      ],
      big: "When I ask you to explain a mechanism, tell me which level you are standing on.",
      covers: ["w1-levels-function", "w1-structure-function"]
    },

    /* ---------------------------------------------------------- 9 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 1 . What physiology asks",
      h: "Two ways to answer why",
      lede: "Both get used in real conversations. Only one of them is an explanation.",
      cards: [
        {
          label: "Teleological",
          h: "Answers with the purpose",
          p: ["Why do red blood cells carry oxygen? To supply the tissues."],
          list: [
            "Useful for orienting yourself quickly.",
            "Says nothing about how it happens.",
            "Cannot be tested."
          ]
        },
        {
          label: "Mechanistic",
          labelClass: "terra",
          h: "Answers with the steps",
          p: ["Why do red blood cells carry oxygen? Hemoglobin binds oxygen reversibly, and binding depends on the surrounding oxygen pressure."],
          list: [
            "Tells you what to measure.",
            "Predicts what happens if you change something.",
            "This is the answer I want on exams."
          ]
        }
      ],
      big: "If your answer could not be wrong, it is not yet a mechanism."
    },

    /* ---------------------------------------------------------- 10 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 1 . Where this shows up",
      h: "Why this is not just academic",
      cards: [
        { label: "In medicine", h: "Purpose is not cause", p: ["Giving oxygen because saturation is low helps. It does not tell you whether the problem is ventilation, diffusion, or perfusion, and those are treated differently."] },
        { label: "In nursing", h: "Charting what, versus why", p: ["Urine output dropped is an observation. Output dropped after two hours of poor intake with a rising heart rate is the start of a mechanism."] },
        { label: "In respiratory therapy", h: "The vent does not know your intent", p: ["Changing a setting because a number is low, with no mechanism behind it, is how you correct a number while the real problem keeps moving."] }
      ]
    },

    /* ============================================================ CONCEPT 2 */
    /* ---------------------------------------------------------- 11 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 2 of 13",
      h: "The inside and the outside",
      lede: "Most of your cells never touch the outside world. They sit in a private pool of fluid, and that pool is what has to be defended."
    },

    /* ---------------------------------------------------------- 12 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 2 . The inside and the outside",
      h: "A barrier is what creates an inside",
      lede: "Draw a boundary and you have made two environments that are allowed to differ.",
      cards: [
        {
          label: "The internal environment",
          labelClass: "terra",
          h: "Everything inside the barrier",
          p: ["Your skin and the linings of your gut and airways separate you from the outside. Everything inside that boundary is the internal environment, and your cells live there and nowhere else."]
        },
        {
          label: "Two fluids",
          labelClass: "teal",
          h: "Around the cells, and inside them",
          p: ["Fluid around cells is extracellular fluid. Fluid inside them is intracellular fluid. A cell reads only what is immediately around it, so holding a value steady almost always means holding it steady in extracellular fluid."]
        }
      ],
      big: "A cell cannot tell what your blood sodium is. It can only tell what is touching it.",
      covers: ["w1-fluid-compartments"]
    },

    /* ---------------------------------------------------------- 13 */
    {
      k: "fig",
      kicker: "Concept 2 . Compartments",
      h: "Drawn top down",
      svg: `<svg viewBox="0 0 760 300" role="img" aria-labelledby="cmpT cmpD">
  <title id="cmpT">Body fluid compartments</title>
  <desc id="cmpD">Total body water divides into intracellular fluid, about two thirds, and extracellular fluid, about one third. Extracellular fluid divides again into interstitial fluid and plasma.</desc>
  <rect x="20" y="16" width="720" height="46" rx="8" fill="#EDF1F3" stroke="#08101F" stroke-width="1.5"/>
  <text x="380" y="45" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#08101F">Total body water</text>
  <line x1="380" y1="62" x2="380" y2="80" stroke="#08101F" stroke-width="1.5"/>
  <line x1="200" y1="80" x2="560" y2="80" stroke="#08101F" stroke-width="1.5"/>
  <line x1="200" y1="80" x2="200" y2="98" stroke="#08101F" stroke-width="1.5"/>
  <line x1="560" y1="80" x2="560" y2="98" stroke="#08101F" stroke-width="1.5"/>
  <rect x="60" y="98" width="280" height="70" rx="8" fill="#FFFFFF" stroke="#1F4E55" stroke-width="2"/>
  <text x="200" y="126" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#1F4E55">Intracellular</text>
  <text x="200" y="149" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#3D4860">two thirds</text>
  <rect x="420" y="98" width="280" height="70" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="560" y="126" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#8B1D1D">Extracellular</text>
  <text x="560" y="149" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#3D4860">one third</text>
  <line x1="560" y1="168" x2="560" y2="188" stroke="#8B1D1D" stroke-width="1.5"/>
  <line x1="470" y1="188" x2="650" y2="188" stroke="#8B1D1D" stroke-width="1.5"/>
  <line x1="470" y1="188" x2="470" y2="206" stroke="#8B1D1D" stroke-width="1.5"/>
  <line x1="650" y1="188" x2="650" y2="206" stroke="#8B1D1D" stroke-width="1.5"/>
  <rect x="380" y="206" width="180" height="62" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="470" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#8B1D1D">Interstitial</text>
  <text x="470" y="253" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">bathes the cells</text>
  <rect x="580" y="206" width="140" height="62" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="650" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#8B1D1D">Plasma</text>
  <text x="650" y="253" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">inside vessels</text>
</svg>`,
      cap: "<b>Solid teal, inside cells. Dashed maroon, outside cells.</b> Same code all semester.",
      big: "You sample plasma. You are usually inferring something about interstitial fluid.",
      covers: ["w1-fluid-compartments", "w1-compartment-shifts"]
    },

    /* ---------------------------------------------------------- 14 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 2 . The inside and the outside",
      h: "Why the dashed border matters clinically",
      lede: "Plasma and interstitial fluid trade water freely, which is how people get into trouble.",
      cards: [
        {
          label: "Water moves out",
          labelClass: "terra",
          h: "Total high, circulating low",
          p: ["Because the two extracellular compartments exchange easily, fluid can leave the vessels and sit in the tissue. Total body water can be high while the volume inside the vessels is low."]
        },
        {
          label: "At the bedside",
          labelClass: "gold",
          h: "Both at once is not a contradiction",
          p: ["That is why a swollen patient can still be short on circulating volume. Puffy ankles and a low blood pressure in the same patient is a compartment problem, not a measurement error."]
        }
      ],
      big: "Where the water is matters as much as how much of it there is.",
      lab: "You will sort scenarios by which compartment gained or lost water.",
      covers: ["w1-compartment-shifts"]
    },

    /* ============================================================ CONCEPT 3 */
    /* ---------------------------------------------------------- 15 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 3 of 13",
      h: "Homeostasis, and what it is not",
      lede: "This is the idea the whole course is built on, and it is routinely learned wrong."
    },

    /* ---------------------------------------------------------- 16 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 3 . Homeostasis",
      h: "Active maintenance, not stillness",
      lede: "Homeostasis is the process of keeping conditions inside within a range cells can work in.",
      cards: [
        {
          label: "It is a process",
          labelClass: "terra",
          h: "It costs energy and it can fail",
          p: ["Notice that it is a process, not a state. It runs constantly, it costs energy to run, and it can fail. Nothing about it is passive."]
        },
        {
          label: "It is a range",
          labelClass: "teal",
          h: "Not one pinned number",
          p: ["The value you measure moves inside a range rather than sitting on a single number. Body temperature is not 37.0 all day, and it is not supposed to be."]
        }
      ],
      big: "Homeostasis is not the absence of change. It is change that gets corrected.",
      covers: ["w1-homeostasis"]
    },

    /* ---------------------------------------------------------- 17 */
    {
      k: "table",
      kicker: "Concept 3 . Homeostasis",
      h: "Steady state is not equilibrium",
      caption: "Two situations students mix up constantly",
      cols: ["", "Steady state", "Equilibrium"],
      rows: [
        ["Value changing?", "No, it is held", "No, it settled"],
        ["Still moving?", "Yes, constantly", "Balanced, unforced"],
        ["Costs energy?", "Yes", "No"],
        ["Cut the energy", "It drifts", "Nothing happens"],
        ["Example", "Sodium at 140", "Dissolved sugar"]
      ],
      big: "Your body is in steady state. It is at equilibrium only when it is dead."
    },

    /* ---------------------------------------------------------- 18 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 3 . Predict, then check",
      h: "Decide before you open anything",
      lede: "A patient's potassium has read exactly 4.0 for three days. Is more potassium crossing her cell membranes on day 3 than on day 1, less, or about the same? Decide, then open the card.",
      cards: [
        {
          label: "Check your answer",
          labelClass: "gold",
          h: "You cannot tell",
          p: ["A number that has not moved tells you the rates in and out are matched. It says nothing about how large those rates are. She could be moving very little potassium, or enormous amounts in both directions, and the reading is the same either way."]
        },
        {
          label: "Why it matters",
          labelClass: "terra",
          h: "Stability hides effort",
          p: ["This is the habit to build early. When a value is steady, you have learned something about balance and nothing about magnitude. The work being done to hold it there is invisible in the number."]
        }
      ],
      big: "A stable number tells you two rates are equal. It never tells you what they are."
    },

    /* ---------------------------------------------------------- 19 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 3 . Where this shows up",
      h: "Steady is not the same as safe",
      cards: [
        { label: "In medicine", h: "Normal, under maximum effort", p: ["A patient can hold a normal pH while working extremely hard to do it. The number looks fine right up until the compensation runs out."] },
        { label: "In nursing", h: "Trends beat single values", p: ["One reading is a snapshot. Three readings tell you whether something is being held or quietly sliding, which is the difference that gets escalated."] },
        { label: "In respiratory therapy", h: "Work of breathing is invisible", p: ["Saturation can sit at 94 percent whether the patient is comfortable or exhausted. The number is held. The cost of holding it is not on the monitor."] }
      ],
      big: "Always ask what it is costing the patient to keep that number there."
    },

    /* ============================================================ CONCEPT 4 */
    /* ---------------------------------------------------------- 20 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 4 of 13",
      h: "Mass balance",
      lede: "The bookkeeping rule underneath every steady value in the body."
    },

    /* ---------------------------------------------------------- 21 */
    {
      k: "formula",
      kicker: "Concept 4 . Mass balance",
      h: "What goes in has to be accounted for",
      eq: "Amount in body  =  intake + production  -  excretion  -  metabolism",
      note: "Intake, what you take in by mouth, IV or lungs. Production, what your cells make. Excretion, what leaves intact. Metabolism, what gets converted to something else.",
      after: [
        "In plain language: something is steady when everything adding to it is matched by everything removing it."
      ],
      big: "When a value rises, ask which side of this equation moved.",
      covers: ["w1-mass-balance"]
    },

    /* ---------------------------------------------------------- 22 */
    {
      k: "work",
      badges: [{ t: "Must teach", cls: "terra" }],
      kicker: "Concept 4 . Mass balance",
      h: "A worked case, sodium over one day",
      given: "Total body sodium steady. Intake 4200 mg by mouth. Sweat 300 mg. Stool 100 mg. Urine 3800 mg. No IV fluids, no production, sodium is not metabolized.",
      steps: [
        "Add the inputs. Intake 4200 mg, production 0 mg. Total in, 4200 mg.",
        "Add the outputs. Urine 3800, sweat 300, stool 100. Total out, 4200 mg.",
        "Subtract. 4200 in minus 4200 out equals 0 mg change.",
        "Interpret. Total body sodium did not change, and the kidney did nearly all the adjusting."
      ],
      ans: "Now move one number. She works outside and sweats 1200 mg instead of 300. If urinary sodium does not change, she is down 900 mg for the day.",
      big: "The kidney is the variable here. Almost everything else is fixed by circumstance.",
      covers: ["w1-mass-balance"]
    },

    /* ---------------------------------------------------------- 23 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 4 . Mass balance",
      h: "Two ways to get rid of something",
      lede: "Both remove a substance. Only one means it left the body.",
      cards: [
        {
          label: "Excretion",
          labelClass: "teal",
          h: "The molecule physically leaves",
          p: ["It exits intact, in urine, stool, sweat or exhaled air. Gone from the body and gone from the equation."]
        },
        {
          label: "Metabolism",
          labelClass: "terra",
          h: "The molecule becomes something else",
          p: ["It is chemically changed. Gone as itself, but the atoms are still in you. This decides where you look when something accumulates: if a drug builds up, ask whether the kidney stopped excreting it or the liver stopped converting it. Different organs, different fixes."]
        }
      ],
      big: "Gone from the body and gone from the equation are not the same thing."
    },

    /* ============================================================ CONCEPT 5 */
    /* ---------------------------------------------------------- 24 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 5 of 13",
      h: "Mass flow and clearance",
      lede: "Mass balance says how much. These two say how fast, and by whom."
    },

    /* ---------------------------------------------------------- 25 */
    {
      k: "formula",
      kicker: "Concept 5 . Mass flow",
      h: "How much is arriving per minute",
      eq: "Mass flow  =  concentration  x  volume flow",
      note: "Concentration, amount per volume, such as mg/mL. Volume flow, volume per time, such as mL/min. The volumes cancel, leaving amount per time.",
      after: [
        "Concentration alone never tells you delivery. You need to know how fast the fluid carrying it is moving."
      ],
      big: "Concentration is not delivery. Delivery needs flow."
    },

    /* ---------------------------------------------------------- 26 */
    {
      k: "work",
      badges: [{ t: "Must teach", cls: "terra" }],
      kicker: "Concept 5 . Mass flow",
      h: "Same concentration, different delivery",
      given: "Two patients. Both have arterial oxygen content of 20 mL per 100 mL of blood. Patient A has a cardiac output of 5.0 L/min. Patient B is in shock at 2.5 L/min.",
      steps: [
        "Convert to consistent units. 20 mL per 100 mL is 200 mL of oxygen per liter of blood.",
        "Patient A. 200 mL/L x 5.0 L/min = 1000 mL of oxygen delivered per minute.",
        "Patient B. 200 mL/L x 2.5 L/min = 500 mL of oxygen delivered per minute.",
        "Compare. Identical oxygen content. Half the delivery."
      ],
      ans: "Patient B's blood gas and pulse oximetry can both look reassuring while her tissues receive half the oxygen. The concentration was never the problem.",
      big: "This is why a normal saturation does not by itself mean the tissues are supplied."
    },

    /* ---------------------------------------------------------- 27 */
    {
      k: "formula",
      kicker: "Concept 5 . Clearance",
      h: "Removal, described as a volume",
      eq: "Clearance  =  rate of removal  /  plasma concentration",
      note: "Rate of removal, amount per time, such as mg/min. Plasma concentration, amount per volume, such as mg/mL. The result is a volume per time, mL/min.",
      after: [
        "The volume is made up on purpose. No specific milliliters get emptied. It scores how hard the organ works relative to how much substance is there."
      ],
      big: "A rate of removal expressed as a volume, so you can compare organs and patients."
    },

    /* ---------------------------------------------------------- 28 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 5 . Where this shows up",
      h: "Clearance is a number you will meet constantly",
      cards: [
        { label: "In medicine", h: "Drug dosing", p: ["Nearly every renally cleared drug is dosed off an estimate of clearance. When clearance falls, the same dose produces a higher concentration."] },
        { label: "In nursing", h: "Creatinine is a clearance story", p: ["A rising creatinine usually means clearance dropped, not that the patient suddenly started producing more of it."] },
        { label: "In respiratory therapy", h: "The lung clears too", p: ["Carbon dioxide removal is a clearance problem. Ventilation is the flow term, and when it falls, the concentration climbs."] }
      ]
    },

    /* ============================================================ CONCEPT 6 */
    /* ---------------------------------------------------------- 29 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 6 of 13 . Beat 3, mechanism",
      h: "The parts of a control loop",
      lede: "Five parts. Learn them once and you will recognize them in every system for the rest of the course."
    },

    /* ---------------------------------------------------------- 30 */
    {
      k: "fig",
      kicker: "Concept 6 . The loop",
      h: "Drawn top down",
      svg: `<svg viewBox="0 0 760 340" role="img" aria-labelledby="loopT loopD">
  <title id="loopT">The five parts of a control loop</title>
  <desc id="loopD">A change in the regulated variable is detected by a sensor, which sends input to an integrating center that compares it to a setpoint. The center sends output to an effector, whose response changes the regulated variable back toward the setpoint.</desc>
  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#08101F"/></marker>
    <marker id="arg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#DCB45C"/></marker>
  </defs>
  <rect x="250" y="14" width="260" height="52" rx="8" fill="#EDF1F3" stroke="#08101F" stroke-width="2"/>
  <text x="380" y="38" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#08101F">Regulated variable</text>
  <text x="380" y="57" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">moves off setpoint</text>
  <line x1="380" y1="66" x2="380" y2="88" stroke="#08101F" stroke-width="2" marker-end="url(#ar)"/>
  <rect x="270" y="92" width="220" height="48" rx="8" fill="#FFFFFF" stroke="#1F4E55" stroke-width="2"/>
  <text x="380" y="113" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#1F4E55">1. Sensor</text>
  <text x="380" y="131" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">detects it</text>
  <line x1="380" y1="140" x2="380" y2="162" stroke="#08101F" stroke-width="2" marker-end="url(#ar)"/>
  <text x="396" y="156" font-family="system-ui,sans-serif" font-size="12" fill="#8B1D1D">input</text>
  <rect x="250" y="166" width="260" height="62" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="2"/>
  <text x="380" y="188" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#8B1D1D">2. Integrating center</text>
  <text x="380" y="207" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">compares against the</text>
  <text x="380" y="222" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" font-weight="700" fill="#8B1D1D">3. setpoint</text>
  <line x1="380" y1="228" x2="380" y2="250" stroke="#08101F" stroke-width="2" marker-end="url(#ar)"/>
  <text x="396" y="244" font-family="system-ui,sans-serif" font-size="12" fill="#8B1D1D">output</text>
  <rect x="270" y="254" width="220" height="48" rx="8" fill="#FFFFFF" stroke="#1F4E55" stroke-width="2"/>
  <text x="380" y="275" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#1F4E55">4. Effector</text>
  <text x="380" y="293" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">acts</text>
  <path d="M270 278 L120 278 L120 40 L250 40" fill="none" stroke="#DCB45C" stroke-width="2.5" marker-end="url(#arg)"/>
  <text x="128" y="170" font-family="system-ui,sans-serif" font-size="12.5" font-weight="700" fill="#5A4511">5. Response</text>
  <text x="128" y="187" font-family="system-ui,sans-serif" font-size="12" fill="#3D4860">closes the loop</text>
</svg>`,
      cap: "<b>The gold arrow is what makes it a loop.</b> Without it, this is a chain of events.",
      big: "Sensor, integrating center, setpoint, effector, response.",
      covers: ["w1-feedback-components"]
    },

    /* ---------------------------------------------------------- 31 */
    {
      k: "rows",
      kicker: "Concept 6 . The control loop",
      h: "The same five parts, in a system you know",
      lede: "Body temperature on a cold day.",
      rows: [
        { dot: "1", dotClass: "teal", h: "Sensor", p: ["Cold receptors in the skin, and temperature-sensitive neurons in the hypothalamus."] },
        { dot: "2", dotClass: "terra", h: "Integrating center", p: ["The hypothalamus, comparing what it is getting against what it expects."] },
        { dot: "3", dotClass: "terra", h: "Setpoint", p: ["Around 37 C, and adjustable, which matters when we get to fever."] },
        { dot: "4", dotClass: "teal", h: "Effector", p: ["Skeletal muscle shivering, and smooth muscle in skin vessels constricting."] },
        { dot: "5", dotClass: "gold", h: "Response", p: ["Heat production rises, heat loss falls, core temperature comes back up."] }
      ],
      big: "Every loop this semester fills into these same five boxes.",
      lab: "You will build these five boxes by hand for your own seeded patient, one loop per week.",
      covers: ["w1-feedback-components"]
    },

    /* ---------------------------------------------------------- 32 */
    {
      k: "rows",
      variant: "dark",
      kicker: "Concept 6 . The control loop",
      h: "Any one of the five can be the failure",
      lede: "This is the payoff for learning the parts, and it is what your mission patient is about.",
      rows: [
        { dot: "1", dotClass: "teal", h: "Sensor fails", p: ["The body never learns anything changed, so no response follows. Nothing was detected."] },
        { dot: "2", dotClass: "terra", h: "Signal fails", p: ["The change was detected, and the message never arrived."] },
        { dot: "3", dotClass: "terra", h: "Center fails", p: ["The message arrived and was compared against the wrong setpoint."] },
        { dot: "4", dotClass: "teal", h: "Effector fails", p: ["The order was correct and the machinery could not carry it out."] },
        { dot: "5", dotClass: "gold", h: "Response overwhelmed", p: ["Everything works, and the disturbance is bigger than the loop can handle."] }
      ],
      big: "Five failures, one drifting number. Naming which one is the assignment."
    },

    /* ============================================================ CONCEPT 7 */
    /* ---------------------------------------------------------- 33 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 7 of 13",
      h: "Local control and reflex control",
      lede: "Some problems get solved on the spot. Others need the whole body to hear about it."
    },

    /* ---------------------------------------------------------- 34 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 7 . Two scales of control",
      h: "How far does the message travel?",
      cards: [
        {
          label: "Local control",
          labelClass: "teal",
          h: "Handled where the change happened",
          p: ["A tissue detects a change in its own surroundings and responds, without telling anyone else."],
          list: [
            "Signal travels a very short distance.",
            "Affects only that tissue.",
            "A tissue low on oxygen dilates its own arterioles."
          ]
        },
        {
          label: "Reflex control",
          labelClass: "terra",
          h: "Handled by a long-distance loop",
          p: ["A sensor sends the message to a distant integrating center, which orders effectors elsewhere to respond."],
          list: [
            "Signal travels far, by nerve or blood.",
            "Coordinates several organs at once.",
            "Pressure falls, and the brain adjusts heart and vessels body-wide."
          ]
        }
      ],
      big: "Local control fixes a neighborhood. Reflex control governs the whole country.",
      covers: ["w1-control-pathways"]
    },

    /* ---------------------------------------------------------- 35 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 7 . Predict, then check",
      h: "Decide before you open anything",
      lede: "You stand up quickly and blood pools in your legs. Is the correction that keeps you from fainting local control or reflex control? Decide, then open the card.",
      cards: [
        {
          label: "Check your answer",
          labelClass: "gold",
          h: "Reflex control",
          p: ["Sensors in your large arteries detect the pressure drop, send it to the brainstem, and the response comes back out to your heart and to blood vessels all over your body."]
        },
        {
          label: "Why local could not do it",
          labelClass: "terra",
          h: "The problem and the fix are in different places",
          p: ["The tissue with the problem is your brain. The tissues that have to change are your heart and your leg vessels. Local control cannot reach across that gap, so this needs a loop with range."]
        }
      ],
      big: "When the fix has to happen somewhere other than the problem, you need a reflex."
    },

    /* ============================================================ CONCEPT 8 */
    /* ---------------------------------------------------------- 36 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 8 of 13",
      h: "How a signal gets from here to there",
      lede: "A sensor that nothing listens to is useless. This is the communication half of the loop."
    },

    /* ---------------------------------------------------------- 37 */
    {
      k: "rows",
      kicker: "Concept 8 . Signal types and range",
      h: "Four ways a cell talks to another cell",
      lede: "Arranged by how far the message has to go.",
      rows: [
        { dot: "1", dotClass: "teal", h: "Direct contact", p: ["Molecules pass straight into a neighboring cell through connecting channels, or two cells touch and read each other's surface proteins. Range, touching."] },
        { dot: "2", dotClass: "teal", h: "Local chemical signals", p: ["A cell releases a chemical into the fluid around it. Nearby cells respond, and it is broken down before it can travel. Range, a few cell widths."] },
        { dot: "3", dotClass: "terra", h: "Neural signals", p: ["An electrical signal runs down a neuron, then a chemical is released onto one specific target cell. Range, long, delivered to a single address."] },
        { dot: "4", dotClass: "terra", h: "Hormones", p: ["A chemical goes into the blood and travels everywhere. Only cells with the matching receptor respond. Range, the whole body."] }
      ],
      big: "Two ways to reach a distant target: send to one address, or broadcast and let the receptor decide."
    },

    /* ---------------------------------------------------------- 38 */
    {
      k: "table",
      kicker: "Concept 8 . Signal types and range",
      h: "Two long-distance systems, opposite trade-offs",
      caption: "Same problem, solved two ways",
      cols: ["", "Nervous", "Endocrine"],
      rows: [
        ["Route", "Fixed wired path", "Broadcast in blood"],
        ["Receiver", "Cell at the end", "Anyone with the receptor"],
        ["Onset", "Milliseconds", "Seconds to hours"],
        ["Duration", "Brief", "Sustained"],
        ["Best for", "Fast, precise", "Widespread, lasting"]
      ],
      big: "Speed and precision, or reach and duration. You rarely get both from one system."
    },

    /* ---------------------------------------------------------- 39 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 8 . Why broadcasting works",
      h: "The message reaches everyone, and almost nobody answers",
      lede: "This sounds wasteful. It is what makes hormones workable.",
      cards: [
        {
          label: "Everyone hears it",
          labelClass: "terra",
          h: "And most cells do nothing",
          p: ["A hormone released into the blood reaches essentially every cell within a minute or two. The great majority do nothing at all, because they have no receptor that fits it."]
        },
        {
          label: "So where is the specificity",
          labelClass: "teal",
          h: "In who is equipped to listen",
          p: ["It is not in the delivery. That single fact explains why one hormone can do different things in different tissues, and why a drug given into a vein can act on one organ and largely leave the others alone."]
        }
      ],
      big: "The message goes everywhere. The receptor decides where it counts."
    },

    /* ============================================================ CONCEPT 9 */
    /* ---------------------------------------------------------- 40 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 9 of 13",
      h: "Receptors decide who hears the message",
      lede: "Where the receptor sits, and how many there are, changes what the same signal does."
    },

    /* ---------------------------------------------------------- 41 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 9 . Receptor location",
      h: "Solubility decides where the receptor has to be",
      lede: "The membrane is mostly lipid, so it passes fat-soluble things and blocks water-soluble things.",
      cards: [
        {
          label: "Water soluble signal",
          labelClass: "teal",
          h: "Receptor on the surface",
          p: ["The molecule cannot cross the membrane, so it binds outside and the message is relayed inward by something else."],
          list: [
            "Most hormones, all neurotransmitters.",
            "Fast, nothing has to be built.",
            "Stops quickly once the signal is gone."
          ]
        },
        {
          label: "Lipid soluble signal",
          labelClass: "terra",
          h: "Receptor inside the cell",
          p: ["The molecule crosses the membrane and binds a receptor in the cytoplasm or nucleus, usually changing which genes get read."],
          list: [
            "Steroid hormones, thyroid hormone.",
            "Slow, proteins have to be made.",
            "Lasts long after the signal is gone."
          ]
        }
      ],
      big: "Location decides how fast the response is, and how long it lasts."
    },

    /* ---------------------------------------------------------- 42 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 9 . Amplification",
      h: "One molecule outside can move millions inside",
      lede: "A surface receptor does not relay the message one for one. It multiplies.",
      cards: [
        {
          label: "The cascade",
          labelClass: "terra",
          h: "Each step multiplies the last",
          p: ["The receptor activates a relay molecule, which activates an enzyme, which makes many copies of an internal messenger, and each of those switches on more machinery again."]
        },
        {
          label: "Why you care",
          labelClass: "gold",
          h: "Tiny concentrations, whole-body effects",
          p: ["This is why a hormone present in almost undetectable amounts produces an obvious effect across the patient, and why very small changes in hormone concentration matter clinically."]
        }
      ],
      big: "You can measure a hormone in picograms and see the result across the whole patient."
    },

    /* ---------------------------------------------------------- 43 */
    {
      k: "rows",
      kicker: "Concept 9 . Receptor modulation",
      h: "The same signal does not always give the same response",
      lede: "The target cell adjusts how loudly it listens.",
      rows: [
        { dot: "+", dotClass: "teal", h: "Up regulation", p: ["When a signal has been scarce, the cell adds receptors and becomes more sensitive to what little arrives."] },
        { dot: "-", dotClass: "terra", h: "Down regulation", p: ["When a signal has been high for a long time, the cell removes receptors and responds less. One route to drug tolerance."] },
        { dot: "A", dotClass: "gold", h: "Agonist", p: ["Binds the receptor and produces the same response the natural signal would."] },
        { dot: "B", dotClass: "gold", h: "Antagonist", p: ["Binds the receptor, produces no response, and blocks the natural signal from getting in."] }
      ],
      big: "A patient can have a normal hormone level and an abnormal response, because the receptors changed."
    },

    /* ---------------------------------------------------------- 44 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 9 . Where this shows up",
      h: "Receptors are where most drugs act",
      cards: [
        { label: "In medicine", h: "Beta blockers", p: ["An antagonist at receptors the sympathetic system uses. The signal is still being sent. The receptor no longer passes it on."] },
        { label: "In nursing", h: "Tolerance is physiological", p: ["A patient needing more opioid for the same effect is often showing down regulation, not drug-seeking. The receptors changed."] },
        { label: "In respiratory therapy", h: "Bronchodilators", p: ["An agonist at receptors on airway smooth muscle. Overuse can down regulate them, which is why a rescue inhaler can seem to stop working."] }
      ],
      big: "The detailed pathways come in the hormones week. This week, get the shape."
    },

    /* ============================================================ CONCEPT 10 */
    /* ---------------------------------------------------------- 45 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 10 of 13 . Beat 4, response",
      h: "Negative feedback",
      lede: "The workhorse. Most of the loops you will ever learn are this one."
    },

    /* ---------------------------------------------------------- 46 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 10 . Negative feedback",
      h: "The response opposes the change that started it",
      lede: "Negative here does not mean bad. It means opposite.",
      cards: [
        {
          label: "How it runs",
          labelClass: "terra",
          h: "Detect, oppose, ease off",
          p: ["The variable moves off its setpoint. The loop detects it and responds in the opposite direction. As the variable comes back, the stimulus weakens and the response eases off."]
        },
        {
          label: "Why it is stable",
          labelClass: "teal",
          h: "It turns itself down",
          p: ["That last step is what makes it self-limiting. The loop shuts down as it succeeds, without anything having to tell it to stop."]
        }
      ],
      big: "Negative feedback is stable because success removes the reason it was running.",
      covers: ["w1-feedback-types"]
    },

    /* ---------------------------------------------------------- 47 */
    {
      k: "work",
      badges: [{ t: "Must teach", cls: "terra" }],
      kicker: "Concept 10 . Negative feedback",
      h: "Walk the loop, blood glucose after a meal",
      given: "You eat. Glucose is absorbed from the gut and blood glucose starts to climb above its usual range.",
      steps: [
        "Sensor. Beta cells in the pancreas detect the rising glucose.",
        "Integrating center. The same beta cells compare it against the range they are tuned to.",
        "Output. They secrete insulin into the blood.",
        "Effector. Muscle, fat and liver take glucose out of the blood and store it.",
        "Response. Blood glucose falls back toward its usual range.",
        "Self-limiting step. As glucose falls, the stimulus fades and insulin secretion drops."
      ],
      ans: "Now break one part. If the effector cells stop responding normally to insulin, glucose stays high, the sensor keeps detecting it, and insulin stays high too.",
      big: "When the signal is high and the variable is still wrong, suspect the far end of the loop."
    },

    /* ---------------------------------------------------------- 48 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 10 . Negative feedback",
      h: "Loops overshoot, and that is normal",
      lede: "A loop cannot respond before it has detected something, and detection takes time.",
      cards: [
        {
          label: "The delay",
          labelClass: "terra",
          h: "Correction always arrives late",
          p: ["The variable drifts a little past the setpoint before the correction lands, then the correction carries it a little past on the way back. The value oscillates gently around the setpoint instead of sitting on it."]
        },
        {
          label: "What that means for you",
          labelClass: "gold",
          h: "Wobble is health",
          p: ["A value that moves inside its range is not a sign of failure. A value pinned to exactly one number would be far more suspicious."]
        }
      ],
      big: "Oscillation around the setpoint is what a working loop looks like."
    },

    /* ============================================================ CONCEPT 11 */
    /* ---------------------------------------------------------- 49 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 11 of 13",
      h: "Positive feedback",
      lede: "Rarer, louder, and it needs something outside the loop to shut it down."
    },

    /* ---------------------------------------------------------- 50 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 11 . Positive feedback",
      h: "The response increases the change that started it",
      lede: "The loop reinforces itself, so it accelerates instead of settling.",
      cards: [
        {
          label: "Why it cannot stop",
          labelClass: "terra",
          h: "Nothing inside opposes it",
          p: ["Positive feedback cannot end on its own. It runs until something outside the loop ends the situation. That makes it useful for events that must be driven to completion, and dangerous when it starts by accident."]
        },
        {
          label: "Childbirth",
          labelClass: "teal",
          h: "Delivery ends it",
          p: ["Stretch of the cervix drives oxytocin release, contractions push the baby down, and stretch increases further."]
        },
        {
          label: "Clotting",
          labelClass: "teal",
          h: "The finished clot ends it",
          p: ["Activated clotting factors activate more clotting factors, so a small injury seals quickly."]
        }
      ],
      big: "Positive feedback needs an outside event to stop it. That is the defining feature.",
      covers: ["w1-feedback-types"]
    },

    /* ---------------------------------------------------------- 51 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 11 . Predict, then check",
      h: "Decide before you open anything",
      lede: "A failing heart pumps poorly, so blood pressure drops. The body constricts vessels and speeds the heart, which raises the work the heart has to do, so it pumps even less well. Which kind of feedback? Decide, then open the card.",
      cards: [
        {
          label: "Check your answer",
          labelClass: "gold",
          h: "Positive feedback",
          p: ["Each round makes the next round worse. This is the version nobody wants, and it is why decompensation accelerates rather than drifting."]
        },
        {
          label: "The part worth noticing",
          labelClass: "terra",
          h: "Every single response was appropriate",
          p: ["Constricting vessels and speeding the heart are normal negative feedback responses to a low blood pressure. They are correct corrections that happen to make this particular problem worse."]
        }
      ],
      big: "A correct response to the wrong problem can still drive a patient downhill."
    },

    /* ============================================================ CONCEPT 12 */
    /* ---------------------------------------------------------- 52 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 12 of 13",
      h: "Feedforward, and setpoints that move",
      lede: "Two ways the body beats the delay problem: act early, or change the target."
    },

    /* ---------------------------------------------------------- 53 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 12 . Feedforward",
      h: "Responding before the variable has moved",
      lede: "Feedback is always late, because something has to go wrong before it can be detected.",
      cards: [
        {
          label: "How it works",
          labelClass: "terra",
          h: "Act on a cue, not on the damage",
          p: ["The body uses a cue that reliably predicts a coming disturbance, and starts responding before the regulated variable changes at all."]
        },
        {
          label: "Where you have seen it",
          labelClass: "teal",
          h: "Before the food and before the effort",
          p: ["You see food and start producing saliva and stomach acid before anything is swallowed. Your heart rate rises as you begin to exercise, not after your muscles run short."]
        }
      ],
      big: "Feedback corrects a change. Feedforward anticipates one.",
      covers: ["w1-feedforward"]
    },

    /* ---------------------------------------------------------- 54 */
    {
      k: "rows",
      kicker: "Concept 12 . Moving setpoints",
      h: "The target is not fixed",
      lede: "A loop can work perfectly and still hold a value somewhere new, because the setpoint changed.",
      rows: [
        { dot: "1", dotClass: "teal", h: "Biological rhythms", p: ["Body temperature and many hormones follow a daily cycle. The setpoint at 4 in the morning is not the setpoint at 4 in the afternoon."] },
        { dot: "2", dotClass: "terra", h: "Fever", p: ["The hypothalamic setpoint is deliberately raised. The patient feels cold and shivers because 37 C is now below target, which is why chills come with a rising fever."] },
        { dot: "3", dotClass: "gold", h: "Acclimatization", p: ["Sustained exposure to a new environment resets what the body defends, such as altitude changing how much oxygen-carrying capacity is maintained."] }
      ],
      big: "Before you call a loop broken, check whether it is defending a different number on purpose.",
      covers: ["w1-feedforward"]
    },

    /* ---------------------------------------------------------- 55 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 12 . Where this shows up",
      h: "Setpoints move in patients constantly",
      cards: [
        { label: "In medicine", h: "Treating fever", p: ["Antipyretics work by lowering the raised setpoint, not by cooling the patient directly. Ice packs on a patient whose setpoint is still high just make them shiver harder."] },
        { label: "In nursing", h: "Timing matters", p: ["Values collected at different times of day are not always comparable, because some of them are supposed to differ by the hour."] },
        { label: "In respiratory therapy", h: "Chronic retainers", p: ["Someone who has lived with a high carbon dioxide level for years is defending a different baseline than someone who arrived at that number this morning."] }
      ]
    },

    /* ============================================================ CONCEPT 13 */
    /* ---------------------------------------------------------- 56 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 13 of 13",
      h: "Doing physiology as a science",
      lede: "Everything in this deck came from experiments, and experiments can be done badly."
    },

    /* ---------------------------------------------------------- 57 */
    {
      k: "rows",
      kicker: "Concept 13 . Experimental design",
      h: "What a usable physiology experiment needs",
      rows: [
        { dot: "1", dotClass: "teal", h: "One thing changed on purpose", p: ["The independent variable. If two things changed, you cannot say which one caused the result."] },
        { dot: "2", dotClass: "teal", h: "One thing measured", p: ["The dependent variable. Decide how you will measure it before you start, not after you see the data."] },
        { dot: "3", dotClass: "terra", h: "A control group", p: ["Identical treatment except for the one variable. Without it you have a description, not a comparison."] },
        { dot: "4", dotClass: "terra", h: "Enough subjects", p: ["Biological variation is large. One result is an anecdote."] },
        { dot: "5", dotClass: "gold", h: "Repeatability", p: ["A finding that happens once in one lab is not yet knowledge."] }
      ],
      big: "Change one thing, measure one thing, and have something to compare it to.",
      lab: "You will design and run a small experiment this term, including choosing your control and defending your sample size.",
      covers: ["w1-lab-experimental-design"]
    },

    /* ---------------------------------------------------------- 58 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 13 . Variability",
      h: "Two readings that differ may mean nothing",
      lede: "Some of the difference between measurements is real. Some of it is noise.",
      cards: [
        {
          label: "Where the noise comes from",
          labelClass: "terra",
          h: "The instrument, and the person",
          p: ["Every measurement carries error from the instrument and from whoever used it. On top of that, the same healthy person genuinely varies hour to hour."]
        },
        {
          label: "The question to ask",
          labelClass: "gold",
          h: "Bigger than the usual wander?",
          p: ["When you compare two numbers, the question is not whether they differ. It is whether they differ by more than this measurement and this person normally wander on their own."]
        }
      ],
      big: "Before you explain a difference, establish that there is one.",
      covers: ["w1-lab-measurement-error"]
    },

    /* ============================================================ PREDICT AND PERTURB */
    /* ---------------------------------------------------------- 59 */
    {
      k: "title",
      variant: "dark",
      kicker: "Beat 5 . Predict",
      h: "Now put it to work",
      lede: "You have the parts. These next slides ask you to run them forward on situations nobody has walked you through."
    },

    /* ---------------------------------------------------------- 60 */
    {
      k: "activity",
      badges: [{ t: "Apply in class", cls: "gold" }],
      kicker: "Beat 5 . Predict",
      h: "Six disturbances, same five boxes",
      lede: "Pick one. Do not look up organ systems, you have not been taught them yet. Say what a working body would sense, what message it would send, what it would change, and what would power that change.",
      listLabel: "Pick one",
      list: [
        "You run up a flight of stairs.",
        "You walk outside on a 100 degree day.",
        "You eat a very large meal.",
        "You have not had a drink since yesterday.",
        "You stand up suddenly after lying down.",
        "You arrive at a cabin at 9000 feet."
      ],
      big: "You can reason about all six now, with no organ system detail. That is the point of this week."
    },

    /* ---------------------------------------------------------- 61 */
    {
      k: "title",
      variant: "dark",
      kicker: "Beat 6 . Perturb",
      h: "Now break something",
      lede: "A prediction you cannot revise when a component fails was not really a mechanism."
    },

    /* ---------------------------------------------------------- 62 */
    {
      k: "activity",
      badges: [{ t: "Apply in class", cls: "gold" }],
      kicker: "Beat 6 . Perturb",
      h: "Same disturbance, one part disabled",
      lede: "Go back to what you just worked through and knock out one part. Say what happens now, and how the patient would look different from a working system.",
      listLabel: "Disable one",
      list: [
        "The sensor cannot detect the change.",
        "The message cannot reach the integrating center.",
        "The setpoint has shifted to the wrong value.",
        "The effector cannot generate a full response.",
        "Everything works, and the disturbance is twice as large as the loop was built for."
      ],
      big: "For each one, say what you would see at the bedside. That turns a diagram into a patient."
    },

    /* ---------------------------------------------------------- 63 */
    {
      k: "hook",
      kicker: "Beat 6 . Back to the mission",
      h: "Return to your patient",
      hook: {
        icon: "!",
        iconClass: "terra",
        label: "The claim, revisited",
        h: "Something stopped holding a number steady. Which part?",
        say: "You now have the vocabulary you were missing on slide three.",
        p: [
          "Write the five boxes for the drifting value. Mark clearly what you are assuming rather than what you were told, then name the part you think failed and say what evidence would change your mind."
        ]
      },
      big: "Most of the credit is in the reasoning. A wrong answer reached honestly keeps most of it."
    },

    /* ---------------------------------------------------------- 64 */
    {
      k: "close",
      kicker: "Mission 1 . Close",
      h: "What to carry into next week",
      lede: "Five things. With these, the rest of the semester has somewhere to attach.",
      list: [
        "A steady value is held, and holding it costs energy.",
        "Steady means two rates match, not that they are small.",
        "Every loop: sensor, integrating center, setpoint, effector, response.",
        "One address or broadcast, and the receptor decides who answers.",
        "Negative feedback opposes and self-limits. Positive amplifies and needs an outside stop."
      ],
      big: "Next mission, we go get the molecules that make this possible."
    }

  ]
};
