/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   Complete course competency map. Source of truth for Mastery OS,
   the schedule builder, the spaced-recall bank, and the gap finder.

   Built from the BIO 004 Human Anatomy competency schema so every
   downstream tool (weakness dashboard, card bank, exam blueprints)
   works without modification.

   SCOPE BOUNDARY
   This is a physiology course. Every competency is a mechanism, a
   regulation, a calculation, or a prediction. Structure appears only
   where the structure explains the function. Pure identification
   competencies belong in anatomy and are not listed here.

   FIELDS
     id       stable slug, never renumber once cards are tagged to it
     module   1 to 5, matches the five exam blocks
     week     provisional week placement, moves when the calendar lands
     system   fine-grained topic tag
     general  coarse body-system tag for filtering and the dashboard
     name     the specific competency, short
     can      the student-facing "I can" statement, one sentence
     dok      depth of knowledge, 1 recall, 2 apply, 3 analyze, 4 transfer
     yield    core (must know), high (important), support (if time)
     est      estimated minutes of focused study to reach mastery
     facets   how it gets assessed and practiced:
              lecture, lab, graph, calc, data, clinical, draw, model

   DELIVERY
   Section BIOL-5-D9286, Sutter Internet (NET). Lecture and lab are
   BOTH fully asynchronous online. There is no synchronous meeting and
   no in-person lab, so no TBL structure (no iRAT, no tRAT, no in-room
   application activity). Everything has to work without the
   instructor present. The 'lab' facet in this file means a virtual or
   at-home lab task, not a room.

   TERM
   Sep 8 2026 (Tue) through Dec 16 2026 (Wed). That is 14 full
   instructional weeks plus a short 3-day closing week.
     Week 1 .... Tue Sep 8 to Sun Sep 13   (short, term opens Tuesday)
     Weeks 2-14  Mon to Sun
     Week 15 ... Mon Dec 14 to Wed Dec 16  (3 days, closes the term)
   Census 9/27/2026. Last day to drop 11/21/2026.

   PLACEHOLDER NOTE
   Module assignment is the stable part; week is the movable part.
   Week 15 is only three days and currently carries immune,
   reproductive, and the integration capstone. That is the trim
   candidate if the term runs tight. See PLACEHOLDERS.md.
   ============================================================ */

window.BIO005_COMPETENCIES = [

/* ============================================================
   MODULE 1  Foundations, membranes, and cell signaling
   Weeks 1 to 3. Exam 1.
   ============================================================ */

  { id:"m1-physiology-scope", module:1, week:1, system:"Foundations", general:"Foundations",
    name:"What physiology asks",
    can:"State the difference between an anatomical question and a physiological question, and rewrite a structure question as a mechanism question.",
    dok:2, yield:"core", est:10, facets:["lecture"] },

  { id:"m1-levels-function", module:1, week:1, system:"Foundations", general:"Foundations",
    name:"Levels of function",
    can:"Trace one function from the molecular level to the whole-organism level and name what is doing the work at each level.",
    dok:2, yield:"core", est:15, facets:["lecture","draw"] },

  { id:"m1-homeostasis", module:1, week:1, system:"Foundations", general:"Foundations",
    name:"Homeostasis and setpoints",
    can:"Define homeostasis, setpoint, and normal range, and explain why a regulated variable oscillates around its setpoint instead of holding still.",
    dok:2, yield:"core", est:15, facets:["lecture","graph"] },

  { id:"m1-feedback-negative", module:1, week:1, system:"Foundations", general:"Foundations",
    name:"Negative feedback loops",
    can:"Label the receptor, control center, and effector in an unfamiliar negative feedback loop and predict what happens when the variable is pushed off setpoint.",
    dok:3, yield:"core", est:20, facets:["lecture","draw","clinical"] },

  { id:"m1-feedback-positive", module:1, week:1, system:"Foundations", general:"Foundations",
    name:"Positive feedback and feedforward",
    can:"Give physiological examples of positive feedback and feedforward control and explain what ends a positive feedback loop.",
    dok:2, yield:"high", est:15, facets:["lecture","clinical"] },

  { id:"m1-fluid-compartments", module:1, week:1, system:"Body Fluids", general:"Foundations",
    name:"Body fluid compartments",
    can:"State the approximate volumes of total body water, intracellular fluid, interstitial fluid, and plasma, and name what separates each compartment.",
    dok:1, yield:"core", est:15, facets:["lecture","calc"] },

  { id:"m1-ion-distribution", module:1, week:1, system:"Body Fluids", general:"Foundations",
    name:"Ion distribution across the membrane",
    can:"State which ions are concentrated inside versus outside the cell and explain what maintains that difference.",
    dok:2, yield:"core", est:15, facets:["lecture","draw"] },

  { id:"m1-ph-buffers", module:1, week:1, system:"Chemical Basis", general:"Foundations",
    name:"pH and buffering",
    can:"Explain what a buffer does to a pH change and identify the physiological buffer systems by where they act.",
    dok:2, yield:"core", est:15, facets:["lecture","calc"] },

  { id:"m1-protein-shape-function", module:1, week:2, system:"Chemical Basis", general:"Foundations",
    name:"Protein shape drives function",
    can:"Explain how a change in protein conformation changes its activity, and predict the effect of denaturation on a channel, enzyme, or receptor.",
    dok:3, yield:"high", est:15, facets:["lecture","clinical"] },

  { id:"m1-enzyme-kinetics", module:1, week:2, system:"Chemical Basis", general:"Foundations",
    name:"Enzyme activity and saturation",
    can:"Read a rate-versus-substrate curve, identify saturation, and explain how competitive and noncompetitive inhibitors change it.",
    dok:3, yield:"high", est:20, facets:["lecture","graph"] },

  { id:"m1-membrane-structure", module:1, week:2, system:"Membrane Transport", general:"Cell Physiology",
    name:"Membrane structure and permeability",
    can:"Predict from a molecule's size, charge, and lipid solubility whether it crosses the bilayer unaided or requires a protein.",
    dok:3, yield:"core", est:20, facets:["lecture","model"] },

  { id:"m1-diffusion", module:1, week:2, system:"Membrane Transport", general:"Cell Physiology",
    name:"Simple diffusion and Fick's law",
    can:"Name the variables in Fick's law and predict how changing surface area, distance, gradient, or permeability changes the diffusion rate.",
    dok:3, yield:"core", est:20, facets:["lecture","calc","graph"] },

  { id:"m1-osmosis-tonicity", module:1, week:2, system:"Membrane Transport", general:"Cell Physiology",
    name:"Osmosis, osmolarity, and tonicity",
    can:"Calculate osmolarity, distinguish osmolarity from tonicity, and predict cell volume change in a given solution.",
    dok:3, yield:"core", est:25, facets:["lecture","calc","clinical"] },

  { id:"m1-facilitated-diffusion", module:1, week:2, system:"Membrane Transport", general:"Cell Physiology",
    name:"Channels and facilitated diffusion",
    can:"Compare leak, voltage-gated, ligand-gated, and mechanically gated channels, and explain why carrier-mediated transport saturates but channel flux does not.",
    dok:3, yield:"core", est:20, facets:["lecture","graph","model"] },

  { id:"m1-active-transport", module:1, week:3, system:"Membrane Transport", general:"Cell Physiology",
    name:"Primary and secondary active transport",
    can:"Distinguish primary from secondary active transport, trace where the energy comes from in each, and classify a transporter as a symporter or antiporter.",
    dok:3, yield:"core", est:20, facets:["lecture","model","draw"] },

  { id:"m1-sodium-potassium-pump", module:1, week:3, system:"Membrane Transport", general:"Cell Physiology",
    name:"The sodium-potassium pump",
    can:"Describe the pump cycle including its 3:2 stoichiometry and explain the two things the pump accomplishes for the cell.",
    dok:2, yield:"core", est:20, facets:["lecture","draw","model"] },

  { id:"m1-vesicular-transport", module:1, week:3, system:"Membrane Transport", general:"Cell Physiology",
    name:"Vesicular transport",
    can:"Distinguish phagocytosis, pinocytosis, receptor-mediated endocytosis, and exocytosis, and state when a cell needs each.",
    dok:2, yield:"high", est:15, facets:["lecture"] },

  { id:"m1-epithelial-transport", module:1, week:3, system:"Membrane Transport", general:"Cell Physiology",
    name:"Transepithelial transport",
    can:"Explain how apical and basolateral membranes differ in their transporters and trace glucose from lumen to blood across an epithelium.",
    dok:3, yield:"high", est:20, facets:["lecture","draw","model"] },

  { id:"m1-resting-membrane-potential", module:1, week:3, system:"Membrane Potential", general:"Cell Physiology",
    name:"Resting membrane potential",
    can:"Explain why the resting potential is negative and closer to the potassium equilibrium potential than the sodium one.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","model"] },

  { id:"m1-nernst-ghk", module:1, week:3, system:"Membrane Potential", general:"Cell Physiology",
    name:"Equilibrium potential",
    can:"Use the Nernst equation to find an ion's equilibrium potential and explain what the Goldman equation adds that Nernst does not.",
    dok:3, yield:"high", est:25, facets:["lecture","calc"] },

  { id:"m1-driving-force", module:1, week:3, system:"Membrane Potential", general:"Cell Physiology",
    name:"Electrochemical driving force",
    can:"Given Vm and an ion's equilibrium potential, state the direction the ion will move if its channel opens.",
    dok:3, yield:"core", est:20, facets:["lecture","calc","model"] },

  { id:"m1-signaling-overview", module:1, week:3, system:"Cell Signaling", general:"Cell Physiology",
    name:"Modes of cell communication",
    can:"Distinguish gap junction, contact-dependent, paracrine, autocrine, endocrine, and neural signaling by distance and speed.",
    dok:2, yield:"core", est:15, facets:["lecture"] },

  { id:"m1-receptor-types", module:1, week:3, system:"Cell Signaling", general:"Cell Physiology",
    name:"Receptor classes",
    can:"Compare ion channel receptors, G protein-coupled receptors, enzyme-linked receptors, and intracellular receptors by location, speed, and duration of response.",
    dok:3, yield:"core", est:25, facets:["lecture","model"] },

  { id:"m1-second-messengers", module:1, week:3, system:"Cell Signaling", general:"Cell Physiology",
    name:"Second messenger cascades",
    can:"Trace the cAMP and the IP3/DAG pathways from ligand binding to cellular response and explain what amplification buys the cell.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","model"] },

  { id:"m1-dose-response", module:1, week:3, system:"Cell Signaling", general:"Cell Physiology",
    name:"Dose-response, agonists, and antagonists",
    can:"Read a dose-response curve, define affinity and efficacy, and predict the curve shift produced by a competitive antagonist.",
    dok:3, yield:"high", est:20, facets:["lecture","graph","clinical"] },

  { id:"m1-receptor-regulation", module:1, week:3, system:"Cell Signaling", general:"Cell Physiology",
    name:"Up-regulation, down-regulation, and tolerance",
    can:"Explain how chronic exposure to a ligand changes receptor number and connect that to drug tolerance and withdrawal.",
    dok:3, yield:"high", est:15, facets:["lecture","clinical"] },

/* ============================================================
   MODULE 2  Neurophysiology and muscle
   Weeks 4 to 6. Exam 2.
   ============================================================ */

  { id:"m2-neuron-function", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"Functional regions of a neuron",
    can:"Match each region of a neuron (dendrites, soma, axon hillock, axon, terminals) to the electrical job it does.",
    dok:2, yield:"core", est:15, facets:["lecture","draw"] },

  { id:"m2-glia-function", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"Glial cells as functional partners",
    can:"State the physiological job of astrocytes, oligodendrocytes, Schwann cells, microglia, and ependymal cells.",
    dok:1, yield:"high", est:15, facets:["lecture"] },

  { id:"m2-graded-potentials", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"Graded potentials",
    can:"Describe how graded potentials vary with stimulus strength, decay with distance, and sum in space and time.",
    dok:3, yield:"core", est:20, facets:["lecture","graph","draw"] },

  { id:"m2-action-potential", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"The action potential",
    can:"Draw a labeled action potential and state which gate is doing what at threshold, peak, repolarization, and afterhyperpolarization.",
    dok:3, yield:"core", est:30, facets:["lecture","graph","draw","model"] },

  { id:"m2-sodium-gates", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"Voltage-gated sodium channel gating",
    can:"Explain the activation and inactivation gates and connect their states to the absolute and relative refractory periods.",
    dok:3, yield:"core", est:25, facets:["lecture","model"] },

  { id:"m2-conduction-velocity", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"Conduction velocity",
    can:"Explain how myelination and axon diameter change conduction velocity and describe saltatory conduction.",
    dok:3, yield:"core", est:20, facets:["lecture","clinical"] },

  { id:"m2-demyelination", module:2, week:4, system:"Neurophysiology", general:"Nervous System",
    name:"Demyelination",
    can:"Predict the functional consequences of losing myelin and connect them to the clinical picture of a demyelinating disease.",
    dok:4, yield:"high", est:15, facets:["lecture","clinical"] },

  { id:"m2-synaptic-transmission", module:2, week:5, system:"Neurophysiology", general:"Nervous System",
    name:"Chemical synaptic transmission",
    can:"Sequence the events from action potential arrival at the terminal to postsynaptic response, including the role of calcium.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","model"] },

  { id:"m2-epsp-ipsp", module:2, week:5, system:"Neurophysiology", general:"Nervous System",
    name:"EPSPs, IPSPs, and integration",
    can:"Predict whether a neuron fires given a set of excitatory and inhibitory inputs and explain where integration happens.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","model"] },

  { id:"m2-neurotransmitters", module:2, week:5, system:"Neurophysiology", general:"Nervous System",
    name:"Neurotransmitters and their receptors",
    can:"Match the major neurotransmitters to their receptor types and typical effects, and explain how the same transmitter can excite one cell and inhibit another.",
    dok:3, yield:"core", est:25, facets:["lecture","clinical"] },

  { id:"m2-synapse-pharmacology", module:2, week:5, system:"Neurophysiology", general:"Nervous System",
    name:"Where drugs act on a synapse",
    can:"Given a drug's mechanism, name the step of synaptic transmission it targets and predict the net effect on the postsynaptic cell.",
    dok:4, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m2-neural-plasticity", module:2, week:5, system:"Neurophysiology", general:"Nervous System",
    name:"Plasticity and learning",
    can:"Describe long-term potentiation and explain how synaptic strength changes with use.",
    dok:2, yield:"support", est:15, facets:["lecture"] },

  { id:"m2-skeletal-ec-coupling", module:2, week:5, system:"Muscle Physiology", general:"Muscular System",
    name:"Excitation-contraction coupling",
    can:"Sequence the events from motor neuron action potential to calcium release, naming the DHP and ryanodine receptors and the triad.",
    dok:3, yield:"core", est:30, facets:["lecture","draw","model"] },

  { id:"m2-nmj", module:2, week:5, system:"Muscle Physiology", general:"Muscular System",
    name:"The neuromuscular junction",
    can:"Describe transmission at the neuromuscular junction and predict the effect of blocking acetylcholine release, its receptor, or acetylcholinesterase.",
    dok:4, yield:"core", est:25, facets:["lecture","clinical","model"] },

  { id:"m2-crossbridge-cycle", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"The crossbridge cycle",
    can:"Order the crossbridge steps and state where ATP binds and where it is hydrolyzed, then explain rigor mortis from that sequence.",
    dok:3, yield:"core", est:30, facets:["lecture","draw","model","clinical"] },

  { id:"m2-sliding-filament", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Sliding filament and band changes",
    can:"State which sarcomere bands narrow, stay the same, or disappear during contraction and explain why.",
    dok:3, yield:"core", est:20, facets:["lecture","draw","graph"] },

  { id:"m2-length-tension", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Length-tension relationship",
    can:"Read a length-tension curve and explain the descending and ascending limbs in terms of filament overlap.",
    dok:3, yield:"core", est:20, facets:["lecture","graph"] },

  { id:"m2-motor-units", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Motor units and recruitment",
    can:"Define a motor unit, explain the size principle, and describe the two ways the nervous system grades muscle force.",
    dok:3, yield:"core", est:20, facets:["lecture","graph","lab"] },

  { id:"m2-twitch-tetanus", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Twitch, summation, and tetanus",
    can:"Read a myogram and explain why increasing stimulus frequency increases force until fused tetanus.",
    dok:3, yield:"core", est:20, facets:["lecture","graph","lab"] },

  { id:"m2-muscle-metabolism", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Muscle energy systems",
    can:"Compare creatine phosphate, anaerobic glycolysis, and oxidative phosphorylation by speed, yield, and duration of use.",
    dok:3, yield:"core", est:20, facets:["lecture","graph"] },

  { id:"m2-fiber-types", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Fiber types and fatigue",
    can:"Compare slow oxidative, fast oxidative-glycolytic, and fast glycolytic fibers, and give the current physiological explanations for fatigue.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m2-smooth-muscle", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Smooth muscle contraction",
    can:"Explain the calcium-calmodulin and myosin light chain kinase pathway and state three ways smooth muscle differs functionally from skeletal muscle.",
    dok:3, yield:"core", est:25, facets:["lecture","model"] },

  { id:"m2-smooth-muscle-tone", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Smooth muscle tone and latch",
    can:"Explain how smooth muscle holds tension at low energy cost and why that matters for vessels and sphincters.",
    dok:3, yield:"high", est:15, facets:["lecture"] },

  { id:"m2-cardiac-muscle", module:2, week:6, system:"Muscle Physiology", general:"Muscular System",
    name:"Cardiac muscle physiology",
    can:"Explain calcium-induced calcium release and state why cardiac muscle cannot be tetanized.",
    dok:3, yield:"core", est:20, facets:["lecture","model"] },

/* ============================================================
   MODULE 3  Sensory, motor, autonomic, and endocrine control
   Weeks 7 to 9. Exam 3.
   ============================================================ */

  { id:"m3-sensory-transduction", module:3, week:7, system:"Sensory Physiology", general:"Nervous System",
    name:"Sensory transduction",
    can:"Explain how a stimulus becomes a receptor potential and then a train of action potentials, and how intensity is encoded.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","model"] },

  { id:"m3-receptor-adaptation", module:3, week:7, system:"Sensory Physiology", general:"Nervous System",
    name:"Adaptation and receptive fields",
    can:"Distinguish tonic from phasic receptors, and explain how receptive field size sets two-point discrimination.",
    dok:3, yield:"high", est:20, facets:["lecture","graph","lab"] },

  { id:"m3-somatosensory", module:3, week:7, system:"Sensory Physiology", general:"Nervous System",
    name:"Somatosensory pathways",
    can:"Trace touch, proprioception, pain, and temperature from receptor to cortex and state where each pathway crosses.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","clinical"] },

  { id:"m3-pain", module:3, week:7, system:"Sensory Physiology", general:"Nervous System",
    name:"Nociception and pain modulation",
    can:"Distinguish fast and slow pain, explain referred pain, and describe gate control and descending modulation.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m3-vision", module:3, week:7, system:"Special Senses", general:"Nervous System",
    name:"Phototransduction and visual processing",
    can:"Explain why photoreceptors hyperpolarize to light and trace the signal from rod or cone to the visual cortex.",
    dok:3, yield:"core", est:25, facets:["lecture","model","clinical"] },

  { id:"m3-vision-optics", module:3, week:7, system:"Special Senses", general:"Nervous System",
    name:"Accommodation and refractive error",
    can:"Explain accommodation and predict the corrective lens needed for myopia, hyperopia, and presbyopia.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical","lab"] },

  { id:"m3-hearing", module:3, week:7, system:"Special Senses", general:"Nervous System",
    name:"Hearing",
    can:"Trace sound from the tympanic membrane to the auditory cortex and explain how the cochlea encodes pitch and loudness.",
    dok:3, yield:"core", est:25, facets:["lecture","model","clinical"] },

  { id:"m3-equilibrium", module:3, week:7, system:"Special Senses", general:"Nervous System",
    name:"Equilibrium",
    can:"Explain how the semicircular canals detect rotation and the otolith organs detect linear acceleration and head position.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m3-chemical-senses", module:3, week:7, system:"Special Senses", general:"Nervous System",
    name:"Taste and smell",
    can:"Compare taste and olfactory transduction and explain why olfaction reaches the cortex without a thalamic relay.",
    dok:2, yield:"support", est:15, facets:["lecture"] },

  { id:"m3-reflex-arc", module:3, week:8, system:"Motor Control", general:"Nervous System",
    name:"Spinal reflexes",
    can:"Diagram a monosynaptic stretch reflex and a polysynaptic withdrawal reflex with reciprocal inhibition, and predict the result of a lesion at any point.",
    dok:4, yield:"core", est:25, facets:["lecture","draw","clinical","lab"] },

  { id:"m3-muscle-spindle-gto", module:3, week:8, system:"Motor Control", general:"Nervous System",
    name:"Muscle spindles and Golgi tendon organs",
    can:"Compare what the muscle spindle and the Golgi tendon organ each sense and how each changes motor output.",
    dok:3, yield:"core", est:20, facets:["lecture","model"] },

  { id:"m3-motor-hierarchy", module:3, week:8, system:"Motor Control", general:"Nervous System",
    name:"Motor control hierarchy",
    can:"Describe how cortex, basal ganglia, cerebellum, brainstem, and spinal cord divide the work of producing movement.",
    dok:3, yield:"core", est:25, facets:["lecture","clinical"] },

  { id:"m3-upper-lower-motor", module:3, week:8, system:"Motor Control", general:"Nervous System",
    name:"Upper versus lower motor neuron signs",
    can:"Distinguish upper from lower motor neuron lesions by tone, reflexes, and atrophy, and localize a lesion from a described deficit.",
    dok:4, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m3-cortex-eeg-sleep", module:3, week:8, system:"Integrative CNS", general:"Nervous System",
    name:"Cortical function, EEG, and sleep",
    can:"Relate EEG patterns to states of consciousness and describe the physiological differences between REM and non-REM sleep.",
    dok:2, yield:"support", est:20, facets:["lecture","graph"] },

  { id:"m3-memory-language", module:3, week:8, system:"Integrative CNS", general:"Nervous System",
    name:"Learning, memory, and language",
    can:"Distinguish working, declarative, and procedural memory and name the structures each depends on.",
    dok:2, yield:"support", est:15, facets:["lecture","clinical"] },

  { id:"m3-ans-organization", module:3, week:8, system:"Autonomic Nervous System", general:"Nervous System",
    name:"Autonomic organization",
    can:"Compare sympathetic and parasympathetic divisions by outflow, ganglion location, and preganglionic and postganglionic fiber length.",
    dok:2, yield:"core", est:20, facets:["lecture","draw"] },

  { id:"m3-ans-receptors", module:3, week:8, system:"Autonomic Nervous System", general:"Nervous System",
    name:"Autonomic neurotransmitters and receptors",
    can:"Match alpha 1, alpha 2, beta 1, beta 2, nicotinic, and muscarinic receptors to their transmitters, locations, and effects.",
    dok:3, yield:"core", est:30, facets:["lecture","clinical"] },

  { id:"m3-ans-effects", module:3, week:8, system:"Autonomic Nervous System", general:"Nervous System",
    name:"Predicting autonomic effects",
    can:"Given a drug or a stimulus, predict its effect on heart rate, airway diameter, pupil size, gut motility, and blood pressure.",
    dok:4, yield:"core", est:25, facets:["lecture","clinical"] },

  { id:"m3-adrenal-medulla", module:3, week:8, system:"Autonomic Nervous System", general:"Nervous System",
    name:"The adrenal medulla as a modified ganglion",
    can:"Explain why the adrenal medulla makes the sympathetic response longer lasting and more widespread than direct innervation alone.",
    dok:3, yield:"high", est:15, facets:["lecture"] },

  { id:"m3-hormone-classes", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Hormone classes and their handling",
    can:"Compare peptide, steroid, and amine hormones by synthesis, storage, transport, receptor location, and speed of response.",
    dok:3, yield:"core", est:25, facets:["lecture","model"] },

  { id:"m3-hormone-regulation", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Hormone secretion control",
    can:"Explain humoral, neural, and hormonal control of secretion and trace a negative feedback loop through a three-tier axis.",
    dok:3, yield:"core", est:25, facets:["lecture","draw"] },

  { id:"m3-hypothalamic-pituitary", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Hypothalamic-pituitary axes",
    can:"Distinguish anterior from posterior pituitary control and trace each tropic hormone to its target and end hormone.",
    dok:3, yield:"core", est:30, facets:["lecture","draw","clinical"] },

  { id:"m3-growth-hormone", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Growth hormone",
    can:"Describe growth hormone's direct and IGF-mediated effects and the consequences of excess or deficiency before and after epiphyseal closure.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m3-thyroid", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Thyroid hormone",
    can:"Describe thyroid hormone synthesis and action, and interpret TSH and free T4 values to localize a thyroid problem.",
    dok:4, yield:"core", est:25, facets:["lecture","data","clinical"] },

  { id:"m3-adrenal-cortex", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Adrenal cortex hormones",
    can:"Match each cortical zone to its hormone and describe the metabolic and immune actions of cortisol.",
    dok:3, yield:"core", est:25, facets:["lecture","clinical"] },

  { id:"m3-stress-response", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"The stress response",
    can:"Compare the fast sympathetic-adrenal response with the slower HPA axis response and describe the cost of chronic activation.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m3-pancreatic-hormones", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Insulin and glucagon",
    can:"Describe insulin and glucagon actions on liver, muscle, and adipose, and predict blood glucose after a meal and after a fast.",
    dok:4, yield:"core", est:30, facets:["lecture","graph","clinical"] },

  { id:"m3-diabetes", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Diabetes mellitus physiology",
    can:"Explain the mechanism behind polyuria, polydipsia, and ketoacidosis, and contrast type 1 and type 2 pathophysiology.",
    dok:4, yield:"core", est:25, facets:["lecture","clinical","data"] },

  { id:"m3-calcium-homeostasis", module:3, week:9, system:"Endocrine", general:"Endocrine System",
    name:"Calcium homeostasis",
    can:"Explain how parathyroid hormone, calcitriol, and calcitonin act on bone, kidney, and gut to hold plasma calcium in range.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","clinical"] },

/* ============================================================
   MODULE 4  Cardiovascular and respiratory
   Weeks 10 to 12. Exam 4.
   ============================================================ */

  { id:"m4-cardiac-ap", module:4, week:10, system:"Cardiac Electrophysiology", general:"Cardiovascular System",
    name:"Cardiac action potentials",
    can:"Compare the ventricular myocyte action potential with the SA nodal action potential by phases and by the currents in each.",
    dok:3, yield:"core", est:30, facets:["lecture","graph","model"] },

  { id:"m4-pacemaker", module:4, week:10, system:"Cardiac Electrophysiology", general:"Cardiovascular System",
    name:"Pacemaker activity and rate control",
    can:"Explain the funny current and the pacemaker potential, and predict how sympathetic and parasympathetic input change the slope and the heart rate.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","clinical"] },

  { id:"m4-conduction-timing", module:4, week:10, system:"Cardiac Electrophysiology", general:"Cardiovascular System",
    name:"Conduction through the heart",
    can:"Trace the impulse through the conduction system and explain why the AV nodal delay is necessary.",
    dok:3, yield:"core", est:20, facets:["lecture","draw"] },

  { id:"m4-ecg", module:4, week:10, system:"Cardiac Electrophysiology", general:"Cardiovascular System",
    name:"ECG interpretation basics",
    can:"Match each ECG wave and interval to the electrical event it represents, measure rate, and recognize a rhythm as normal or abnormal.",
    dok:4, yield:"core", est:30, facets:["lecture","data","lab","clinical"] },

  { id:"m4-cardiac-cycle", module:4, week:10, system:"Cardiac Mechanics", general:"Cardiovascular System",
    name:"The cardiac cycle",
    can:"Align pressure, volume, valve position, heart sounds, and the ECG across one cardiac cycle on a Wiggers diagram.",
    dok:4, yield:"core", est:35, facets:["lecture","graph","draw"] },

  { id:"m4-pressure-volume-loop", module:4, week:10, system:"Cardiac Mechanics", general:"Cardiovascular System",
    name:"Pressure-volume loops",
    can:"Read a ventricular pressure-volume loop and predict how it changes with altered preload, afterload, or contractility.",
    dok:4, yield:"high", est:25, facets:["lecture","graph"] },

  { id:"m4-cardiac-output", module:4, week:10, system:"Cardiac Mechanics", general:"Cardiovascular System",
    name:"Cardiac output and its determinants",
    can:"Calculate cardiac output, ejection fraction, and stroke volume, and explain how preload, afterload, and contractility each move stroke volume.",
    dok:3, yield:"core", est:25, facets:["lecture","calc","clinical"] },

  { id:"m4-frank-starling", module:4, week:10, system:"Cardiac Mechanics", general:"Cardiovascular System",
    name:"The Frank-Starling relationship",
    can:"Explain the Frank-Starling mechanism at the sarcomere level and read a family of Starling curves at different contractilities.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","model"] },

  { id:"m4-hemodynamics", module:4, week:11, system:"Hemodynamics", general:"Cardiovascular System",
    name:"Pressure, flow, and resistance",
    can:"Apply the flow equation and Poiseuille's law to predict how a change in vessel radius changes resistance and flow.",
    dok:3, yield:"core", est:25, facets:["lecture","calc","graph"] },

  { id:"m4-vessel-function", module:4, week:11, system:"Hemodynamics", general:"Cardiovascular System",
    name:"Functional roles of the vessel types",
    can:"Match arteries, arterioles, capillaries, venules, and veins to their functional roles, and explain why arterioles set resistance and veins hold volume.",
    dok:3, yield:"core", est:20, facets:["lecture","graph"] },

  { id:"m4-blood-pressure", module:4, week:11, system:"Hemodynamics", general:"Cardiovascular System",
    name:"Arterial blood pressure",
    can:"Calculate pulse pressure and mean arterial pressure and explain what changes each one.",
    dok:3, yield:"core", est:20, facets:["lecture","calc","lab"] },

  { id:"m4-capillary-exchange", module:4, week:11, system:"Microcirculation", general:"Cardiovascular System",
    name:"Capillary exchange and Starling forces",
    can:"Use hydrostatic and colloid osmotic pressures to predict net filtration or reabsorption at a capillary, and explain four mechanisms of edema.",
    dok:4, yield:"core", est:30, facets:["lecture","calc","draw","clinical"] },

  { id:"m4-lymphatic-function", module:4, week:11, system:"Microcirculation", general:"Cardiovascular System",
    name:"Lymphatic return",
    can:"Explain what the lymphatic system returns to circulation and what happens functionally when lymph drainage is blocked.",
    dok:2, yield:"high", est:15, facets:["lecture","clinical"] },

  { id:"m4-local-flow-control", module:4, week:11, system:"Blood Pressure Regulation", general:"Cardiovascular System",
    name:"Local control of blood flow",
    can:"Explain active hyperemia, reactive hyperemia, and myogenic autoregulation, and name the local metabolites that dilate vessels.",
    dok:3, yield:"high", est:20, facets:["lecture","model"] },

  { id:"m4-baroreceptor", module:4, week:11, system:"Blood Pressure Regulation", general:"Cardiovascular System",
    name:"The baroreceptor reflex",
    can:"Trace the baroreceptor reflex from sensor to effector and predict every step of the response to standing up or to hemorrhage.",
    dok:4, yield:"core", est:30, facets:["lecture","draw","clinical","lab"] },

  { id:"m4-raas-adh-bp", module:4, week:11, system:"Blood Pressure Regulation", general:"Cardiovascular System",
    name:"Long-term blood pressure control",
    can:"Explain how the renin-angiotensin-aldosterone system, ADH, and atrial natriuretic peptide set blood pressure over hours to days.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","clinical"] },

  { id:"m4-shock", module:4, week:11, system:"Blood Pressure Regulation", general:"Cardiovascular System",
    name:"Circulatory shock",
    can:"Classify shock by its hemodynamic profile and predict cardiac output, resistance, and compensations in each type.",
    dok:4, yield:"high", est:25, facets:["lecture","clinical","data"] },

  { id:"m4-hemostasis", module:4, week:11, system:"Blood", general:"Cardiovascular System",
    name:"Hemostasis",
    can:"Sequence vascular spasm, platelet plug formation, and coagulation, and state where the intrinsic and extrinsic pathways converge.",
    dok:3, yield:"high", est:25, facets:["lecture","draw","clinical"] },

  { id:"m4-erythropoiesis-control", module:4, week:11, system:"Blood", general:"Cardiovascular System",
    name:"Control of red cell production",
    can:"Explain the erythropoietin feedback loop and predict hematocrit change with altitude, renal failure, or chronic hypoxia.",
    dok:3, yield:"high", est:15, facets:["lecture","clinical"] },

  { id:"m4-ventilation-mechanics", module:4, week:12, system:"Respiratory Mechanics", general:"Respiratory System",
    name:"Mechanics of breathing",
    can:"Explain quiet inspiration and expiration using Boyle's law and describe how intrapleural pressure keeps the lungs inflated.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","model"] },

  { id:"m4-compliance-surfactant", module:4, week:12, system:"Respiratory Mechanics", general:"Respiratory System",
    name:"Compliance, surface tension, and surfactant",
    can:"Explain how surfactant lowers surface tension and stabilizes alveoli, and predict the effect of low compliance or surfactant deficiency.",
    dok:3, yield:"core", est:25, facets:["lecture","clinical","model"] },

  { id:"m4-airway-resistance", module:4, week:12, system:"Respiratory Mechanics", general:"Respiratory System",
    name:"Airway resistance",
    can:"State what sets airway resistance and predict the effect of bronchoconstriction on the work of breathing and on flow.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m4-lung-volumes", module:4, week:12, system:"Respiratory Mechanics", general:"Respiratory System",
    name:"Lung volumes, capacities, and spirometry",
    can:"Label a spirogram, calculate the capacities, compute alveolar ventilation, and distinguish an obstructive from a restrictive pattern.",
    dok:4, yield:"core", est:30, facets:["lecture","graph","calc","lab","data"] },

  { id:"m4-gas-exchange", module:4, week:12, system:"Gas Exchange", general:"Respiratory System",
    name:"Alveolar gas exchange",
    can:"Use partial pressure gradients to explain gas movement at the alveolus and at the tissue, and name what limits diffusion.",
    dok:3, yield:"core", est:25, facets:["lecture","calc","draw"] },

  { id:"m4-vq-matching", module:4, week:12, system:"Gas Exchange", general:"Respiratory System",
    name:"Ventilation-perfusion matching",
    can:"Explain hypoxic pulmonary vasoconstriction and predict blood gases in a shunt versus a dead space problem.",
    dok:4, yield:"high", est:25, facets:["lecture","clinical","data"] },

  { id:"m4-oxygen-transport", module:4, week:12, system:"Gas Transport", general:"Respiratory System",
    name:"Oxygen transport and the dissociation curve",
    can:"Read the oxyhemoglobin dissociation curve, explain its sigmoid shape, and predict shifts from pH, temperature, PCO2, and 2,3-BPG.",
    dok:4, yield:"core", est:30, facets:["lecture","graph","clinical"] },

  { id:"m4-co2-transport", module:4, week:12, system:"Gas Transport", general:"Respiratory System",
    name:"Carbon dioxide transport",
    can:"State the three forms carbon dioxide travels in and explain the chloride shift and the Haldane effect.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","model"] },

  { id:"m4-ventilation-control", module:4, week:12, system:"Gas Transport", general:"Respiratory System",
    name:"Control of ventilation",
    can:"Name the brainstem respiratory centers, compare central and peripheral chemoreceptors, and state which stimulus normally drives ventilation.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","clinical"] },

  { id:"m4-respiratory-adjustments", module:4, week:12, system:"Gas Transport", general:"Respiratory System",
    name:"Respiratory responses to exercise and altitude",
    can:"Predict the ventilatory and blood gas changes during exercise and during acclimatization to altitude.",
    dok:4, yield:"high", est:20, facets:["lecture","data","clinical"] },

/* ============================================================
   MODULE 5  Renal, acid-base, digestive, metabolism, immune,
             and reproductive physiology
   Weeks 13 to 15. Exam 5, then the cumulative final.
   ============================================================ */

  { id:"m5-renal-functions", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Functions of the kidney",
    can:"List the kidney's regulatory functions beyond waste removal and name the hormone it makes or activates for each.",
    dok:2, yield:"core", est:15, facets:["lecture"] },

  { id:"m5-nephron-processes", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Filtration, reabsorption, secretion, excretion",
    can:"Write the excretion equation and state, for any substance, which of the three processes act on it.",
    dok:3, yield:"core", est:20, facets:["lecture","calc","draw"] },

  { id:"m5-gfr", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Glomerular filtration rate",
    can:"Use the glomerular Starling forces to explain what sets GFR and predict GFR change when afferent or efferent arteriole tone changes.",
    dok:4, yield:"core", est:30, facets:["lecture","calc","model","clinical"] },

  { id:"m5-gfr-regulation", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Autoregulation and tubuloglomerular feedback",
    can:"Explain myogenic autoregulation and tubuloglomerular feedback and the role of the macula densa.",
    dok:3, yield:"core", est:25, facets:["lecture","model"] },

  { id:"m5-clearance", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Renal clearance",
    can:"Calculate clearance and use it to decide whether a substance was net reabsorbed or net secreted.",
    dok:3, yield:"core", est:25, facets:["lecture","calc","data"] },

  { id:"m5-tubular-transport", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Tubular reabsorption and transport maximum",
    can:"Describe reabsorption along the nephron segment by segment and use transport maximum and renal threshold to explain glucosuria in diabetes.",
    dok:4, yield:"core", est:30, facets:["lecture","graph","clinical"] },

  { id:"m5-countercurrent", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Countercurrent multiplier and exchanger",
    can:"Explain how the loop of Henle builds the medullary osmotic gradient and how the vasa recta preserves it.",
    dok:4, yield:"core", est:30, facets:["lecture","draw","model"] },

  { id:"m5-urine-concentration", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Concentrating and diluting the urine",
    can:"Explain how ADH changes collecting duct permeability and predict urine volume and osmolarity after water loading or dehydration.",
    dok:4, yield:"core", est:25, facets:["lecture","clinical","data"] },

  { id:"m5-sodium-water-balance", module:5, week:13, system:"Fluid and Electrolyte", general:"Urinary System",
    name:"Sodium and water balance",
    can:"Explain how aldosterone, ADH, and atrial natriuretic peptide together set sodium and water excretion, and connect that to blood volume and pressure.",
    dok:4, yield:"core", est:30, facets:["lecture","draw","clinical"] },

  { id:"m5-potassium-balance", module:5, week:13, system:"Fluid and Electrolyte", general:"Urinary System",
    name:"Potassium balance",
    can:"Explain how the kidney handles potassium and predict the effect of hyperkalemia and hypokalemia on excitable tissue.",
    dok:4, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m5-micturition", module:5, week:13, system:"Renal Physiology", general:"Urinary System",
    name:"Micturition",
    can:"Describe the micturition reflex and how voluntary control is layered on top of it.",
    dok:2, yield:"high", est:15, facets:["lecture","clinical"] },

  { id:"m5-acid-base-principles", module:5, week:14, system:"Acid-Base", general:"Urinary System",
    name:"Acid-base balance",
    can:"Explain how the bicarbonate buffer system, the lungs, and the kidneys each defend pH, and state how fast each acts.",
    dok:3, yield:"core", est:30, facets:["lecture","calc","model"] },

  { id:"m5-abg-interpretation", module:5, week:14, system:"Acid-Base", general:"Urinary System",
    name:"Interpreting an arterial blood gas",
    can:"Classify a blood gas as respiratory or metabolic, acidosis or alkalosis, and state whether compensation is absent, partial, or full.",
    dok:4, yield:"core", est:30, facets:["lecture","data","clinical","lab"] },

  { id:"m5-renal-acid-handling", module:5, week:14, system:"Acid-Base", general:"Urinary System",
    name:"Renal compensation",
    can:"Explain bicarbonate reabsorption, new bicarbonate generation, and ammonium and phosphate buffering in the tubule.",
    dok:3, yield:"high", est:25, facets:["lecture","draw"] },

  { id:"m5-gi-motility", module:5, week:14, system:"Digestive Physiology", general:"Digestive System",
    name:"GI motility",
    can:"Distinguish peristalsis from segmentation, describe slow waves and the interstitial cells of Cajal, and name what controls each sphincter.",
    dok:3, yield:"core", est:25, facets:["lecture","model"] },

  { id:"m5-gi-regulation", module:5, week:14, system:"Digestive Physiology", general:"Digestive System",
    name:"Neural and hormonal control of digestion",
    can:"Compare the enteric nervous system with autonomic input, and match gastrin, secretin, CCK, and GIP to their triggers and actions.",
    dok:3, yield:"core", est:25, facets:["lecture","draw","clinical"] },

  { id:"m5-gastric-secretion", module:5, week:14, system:"Digestive Physiology", general:"Digestive System",
    name:"Gastric secretion",
    can:"Explain how the parietal cell makes hydrochloric acid, name the three phases of secretion, and describe how the stomach protects itself.",
    dok:3, yield:"core", est:25, facets:["lecture","model","clinical"] },

  { id:"m5-digestion-absorption", module:5, week:14, system:"Digestive Physiology", general:"Digestive System",
    name:"Digestion and absorption of nutrients",
    can:"For carbohydrate, protein, and fat, name the enzymes, the final absorbable form, and the route each takes out of the enterocyte.",
    dok:3, yield:"core", est:30, facets:["lecture","draw"] },

  { id:"m5-liver-bile", module:5, week:14, system:"Digestive Physiology", general:"Digestive System",
    name:"Liver, bile, and the pancreas",
    can:"Explain bile's role in fat emulsification, describe enterohepatic circulation, and state what pancreatic secretion contributes.",
    dok:3, yield:"core", est:25, facets:["lecture","clinical"] },

  { id:"m5-metabolic-states", module:5, week:14, system:"Metabolism", general:"Metabolism",
    name:"Absorptive and postabsorptive states",
    can:"Describe the fuel flows and dominant hormones in the fed state and the fasted state, and state what supplies the brain in each.",
    dok:3, yield:"core", est:25, facets:["lecture","graph","clinical"] },

  { id:"m5-energy-balance", module:5, week:14, system:"Metabolism", general:"Metabolism",
    name:"Energy balance and appetite",
    can:"Define metabolic rate and its determinants, and describe how leptin, ghrelin, and the hypothalamus regulate intake.",
    dok:2, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m5-thermoregulation", module:5, week:14, system:"Metabolism", general:"Metabolism",
    name:"Thermoregulation",
    can:"Diagram temperature regulation as a negative feedback loop and explain fever as a setpoint change rather than a control failure.",
    dok:3, yield:"high", est:20, facets:["lecture","draw","clinical"] },

  { id:"m5-innate-immunity", module:5, week:15, system:"Immune Physiology", general:"Immune System",
    name:"Innate defenses",
    can:"Describe the physical barriers, phagocytes, complement, interferons, and the inflammatory response, and explain what makes inflammation useful and what makes it harmful.",
    dok:3, yield:"core", est:25, facets:["lecture","clinical"] },

  { id:"m5-adaptive-immunity", module:5, week:15, system:"Immune Physiology", general:"Immune System",
    name:"Adaptive immunity",
    can:"Compare humoral and cell-mediated immunity, describe antigen presentation, and explain immunological memory and how vaccines use it.",
    dok:3, yield:"core", est:30, facets:["lecture","draw","clinical"] },

  { id:"m5-immune-dysfunction", module:5, week:15, system:"Immune Physiology", general:"Immune System",
    name:"When immunity misfires",
    can:"Distinguish hypersensitivity, autoimmunity, and immunodeficiency by mechanism and give a clinical example of each.",
    dok:3, yield:"high", est:20, facets:["lecture","clinical"] },

  { id:"m5-male-reproductive", module:5, week:15, system:"Reproductive Physiology", general:"Reproductive System",
    name:"Male reproductive physiology",
    can:"Trace the hypothalamic-pituitary-gonadal axis in the male and describe testosterone's actions and its feedback control.",
    dok:3, yield:"core", est:25, facets:["lecture","draw"] },

  { id:"m5-female-cycle", module:5, week:15, system:"Reproductive Physiology", general:"Reproductive System",
    name:"The ovarian and uterine cycles",
    can:"Align FSH, LH, estrogen, and progesterone with the ovarian and uterine phases and explain the LH surge as positive feedback.",
    dok:4, yield:"core", est:35, facets:["lecture","graph","draw","clinical"] },

  { id:"m5-pregnancy-lactation", module:5, week:15, system:"Reproductive Physiology", general:"Reproductive System",
    name:"Pregnancy, parturition, and lactation",
    can:"Explain hCG's role in maintaining the corpus luteum, describe parturition as positive feedback, and compare milk production with milk ejection.",
    dok:3, yield:"high", est:25, facets:["lecture","clinical"] },

  { id:"m5-integration-case", module:5, week:15, system:"Integration", general:"Integration",
    name:"Multi-system integration",
    can:"Given a clinical scenario, trace the disturbance across at least three systems and name the compensations each one mounts.",
    dok:4, yield:"core", est:40, facets:["lecture","clinical","draw","data"] }

];

/* ============================================================
   MODULE INDEX
   Kept separate from the competency array so the schedule builder,
   the exam blueprint, and the viewer can all read one source.
   Exam dates are PLACEHOLDERS. In an asynchronous course an exam is
   a window, not a clock time, so each carries opens/closes instead
   of a single date. Confirm the windows before publishing.
   ============================================================ */

window.BIO005_MODULES = [
  { n:1, title:"Foundations, membranes, and cell signaling",
    weeks:[1,2,3],
    exam:"Exam 1", examOpens:null, examCloses:null,
    focus:"Homeostasis, transport, membrane potential, and signal transduction. Everything later in the course is an application of this module." },
  { n:2, title:"Neurophysiology and muscle",
    weeks:[4,5,6],
    exam:"Exam 2", examOpens:null, examCloses:null,
    focus:"Excitable tissue: action potentials, synapses, and how electrical events become mechanical force." },
  { n:3, title:"Sensory, motor, autonomic, and endocrine control",
    weeks:[7,8,9],
    exam:"Exam 3", examOpens:null, examCloses:null,
    focus:"The two long-range control systems, neural and hormonal, and how they share the work of regulation." },
  { n:4, title:"Cardiovascular and respiratory",
    weeks:[10,11,12],
    exam:"Exam 4", examOpens:null, examCloses:null,
    focus:"Bulk transport of oxygen and carbon dioxide, and the pressure and flow rules that govern both pumps." },
  { n:5, title:"Renal, acid-base, digestive, metabolic, immune, and reproductive",
    weeks:[13,14,15],
    exam:"Exam 5, then the cumulative final", examOpens:null, examCloses:null,
    focus:"Long-term regulation of volume, composition, and pH, plus nutrient handling, defense, and reproduction." }
];

/* Convenience lookups used by the viewer and the gap finder. */
window.BIO005_META = {
  course:  "BIO 005 Human Physiology",
  code:    "BIOL-5-D9286",
  college: "Yuba College",
  campus:  "Sutter Internet (NET)",
  term:    "Fall 2026",
  delivery:"Fully asynchronous online, lecture and lab",
  start:   "2026-09-08",
  end:     "2026-12-16",
  census:  "2026-09-27",
  lastDrop:"2026-11-21",
  seats:   30,
  waitlist:10,
  instructor: "Dr. Sharilyn Rennie",
  totalCompetencies: window.BIO005_COMPETENCIES.length,
  facetList: ["lecture","lab","graph","calc","data","clinical","draw","model"],
  yieldList: ["core","high","support"],
  dokLabels: { 1:"Recall", 2:"Apply", 3:"Analyze", 4:"Transfer" }
};
