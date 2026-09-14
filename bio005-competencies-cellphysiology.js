/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-competencies-cellphysiology.js

   CELL PHYSIOLOGY. Silverthorn Chapter 4, Energy and Cellular
   Metabolism. How the cell does work, as opposed to what the cell
   is made of, which is the Chapter 3 set in
   bio005-competencies-week02-cell.js.

   Ten competencies: enzyme control, ATP coupling, catabolism and
   anabolism, glycolysis, the pyruvate fork and lactate, the citric
   acid cycle and electron transport, fuel choice, matching supply
   to demand, transcription and translation, and where a new protein
   ends up.

   WHICH WEEK THIS IS, unsettled as of Sep 14 2026.
   Week 2 is cells and tissues, Scrubs' call. Week 3 as it stands in
   the repo is Silverthorn Chapter 5, membrane dynamics: fluid
   compartments, diffusion, osmolarity and tonicity, the carriers,
   transport maximum, vesicular and transepithelial transport, with
   its lab (PhysioEx Ex 1) and its recall cards already built.

   So both this set and the transport set have a claim on the words
   "cell physiology" and only one of them can be week 3. Nothing here
   is wired to a week until she says which.

   Three competencies already in the repo overlap this set and would
   merge rather than duplicate: w1-enzyme-function, w1-atp-energy and
   w14-atp-pathways, all currently sitting in the week 2 chemistry
   group. Their recall cards travel with them.

   DRAFT. Loaded by nothing. Changes no existing file.
   ============================================================ */
window.BIO005_CELL_PHYSIOLOGY = {
  reading: "Silverthorn Chapter 4, Energy and Cellular Metabolism",
  title: "Cell physiology, how the cell does work",
  week: null,
  status: "draft, week not assigned",
  competencies: [
    { id:"w2p-enzyme-control",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"How enzymes control what a cell does",
      can:"Explain how an enzyme speeds a reaction by lowering activation energy without being used up, and name three things a cell can change to turn a pathway up or down.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw an energy hill twice, side by side: the reaction without the enzyme and the same reaction with it. Mark the activation energy on both and the starting and ending energy, which do not change. Beside that, draw an enzyme with its substrate going in and the product coming out, with the enzyme still there at the end. One line: what the enzyme changed and what it did not.",
      b:"Draw a pathway of four steps, A to B to C to D, with a different enzyme at each arrow. Then show three different ways the cell could slow this pathway down: less enzyme, an inhibitor sitting on one enzyme, and the end product D feeding back. Label each one. Under it, one line on which of the three acts fastest." },

    { id:"w2p-atp-coupling",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"ATP and coupled reactions",
      can:"Explain why a cell uses ATP as its energy currency rather than storing energy in one large molecule, and show how splitting ATP drives a reaction that would not run on its own.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw ATP with its three phosphates, then draw it splitting to ADP and a free phosphate with the energy released marked. Beside it, draw a reaction that will not run on its own, and show the two coupled, with arrows for where the energy goes. One line on what coupled means.",
      b:"Draw a cell with three jobs going at once that all cost ATP: a pump moving a solute uphill, a motor protein carrying a vesicle, and a muscle protein pulling. Show ATP going in at each, and draw the ADP coming back to be recharged. One line under it on how long a cell's stored ATP would last without that recharging." },

    { id:"w2p-catabolism-anabolism",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"Catabolism and anabolism",
      can:"Tell catabolic from anabolic pathways by what happens to the molecules and to the energy, and place a given process on the correct side.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a large molecule breaking into small ones on one side of the box and small ones being built into a large one on the other. Mark which side releases energy and which side costs it, and put ATP on the correct side of each arrow. Label four real processes, two on each side.",
      b:"Draw a person's metabolic state twice: two hours after a large meal, and eighteen hours into a fast. In each, show which direction the arrows are running for glucose, for glycogen and for fat. One line under both on why the body cannot run both directions on the same pathway at the same time." },

    { id:"w2p-glycolysis",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"Glycolysis",
      can:"State where glycolysis happens, what goes in and what comes out including the net ATP and NADH, and explain why this pathway still runs when oxygen is absent.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a cell and put glycolysis in the correct compartment. Show one glucose going in and draw everything that comes out: the pyruvate, the net ATP, and the NADH. Mark the two ATP spent at the start and the four made later, so the net is visible on the drawing. One line on why this pathway does not need oxygen.",
      b:"Draw two cells side by side, both running glycolysis: one with plenty of oxygen and one with none. Show what happens to the pyruvate in each. Mark the ATP yield under each cell. One line on why the cell with no oxygen has to keep recycling something, and what it recycles." },

    { id:"w2p-pyruvate-fork",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"The fork after pyruvate, and lactate",
      can:"Predict what a cell does with pyruvate given its oxygen supply, and explain why lactate production allows glycolysis to keep running.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw pyruvate at a fork with two roads. Down one road, oxygen is available and pyruvate enters the mitochondrion. Down the other, it does not, and pyruvate becomes lactate. On the lactate road, show the NADH being turned back into NAD plus, and draw an arrow returning that NAD plus to glycolysis. One line: why glycolysis stops without that return.",
      b:"Draw a sprinting leg muscle and a heart muscle at the same moment. Show the fuel path each one is using and where the lactate is going. Then draw the liver taking that lactate in. One line under it on why a rising blood lactate in a sick patient is a warning about oxygen delivery." },

    { id:"w2p-aerobic-atp",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"The citric acid cycle and the electron transport chain",
      can:"Say which mitochondrial space each aerobic stage runs in, trace an electron from a fuel molecule to oxygen, and state the approximate total ATP yield from one glucose.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw one mitochondrion large, with the matrix and the inner membrane labelled. Put the citric acid cycle in the matrix and the electron transport chain in the inner membrane. Show NADH carrying electrons from the cycle to the chain, protons being pushed across, and them coming back through the ATP maker. Mark where oxygen sits and what it becomes.",
      b:"Draw a running total of ATP across the whole path for one glucose: glycolysis, pyruvate entry, the cycle, then the chain. Put the number at each stage and the total at the end, and mark that the total is approximate. Under it, one line naming which single stage produces most of it and why losing oxygen collapses that stage first." },

    { id:"w2p-fuel-choice",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"Fats, proteins and fuel choice",
      can:"Explain how fats and proteins enter the same energy pathways as glucose, and predict which fuel the body draws on given how long it has been since the last meal.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw the shared pathway down the middle of the box, from fuel to the cycle to ATP. Then bring three entry arrows into it: glucose, a fatty acid, and an amino acid, each joining at the point where it actually enters. Label each entry point. One line on why fat cannot be turned back into glucose in any useful amount.",
      b:"Draw a timeline across the box from the end of a meal out to three days of fasting. Above it, draw which fuel is carrying the body at each stage, in order. Mark where glycogen runs out and where the body starts breaking down protein. One line on what that last stage costs the patient." },

    { id:"w2p-supply-demand",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"Matching supply to demand",
      can:"Explain how a cell adjusts its energy production when demand rises, and name the structural changes a tissue makes when high demand is sustained over weeks.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a muscle cell at rest and the same cell working hard. Show what rises in the working cell: oxygen use, ATP turnover, blood flow. Draw the signal that tells the mitochondria to speed up. One line on how fast this adjustment happens.",
      b:"Draw the same muscle cell after eight weeks of endurance training beside an untrained one. Show what has physically changed: mitochondria, capillaries, enzyme amount. Under the pair, one line on why the trained cell can hold the same workload at a lower lactate." },

    { id:"w2p-protein-synthesis",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"Transcription and translation",
      can:"Trace the making of a protein from gene to finished chain, name where each step happens, and explain how one gene can yield more than one protein.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw the nucleus and the cytosol, and run the whole path across both: DNA, the transcript being made, the editing step, the exit through the pore, the ribosome reading it, and the chain coming off. Label the compartment for each step. Mark the one step that happens only in the nucleus.",
      b:"Draw one gene with its coding pieces and its non coding pieces marked differently. Then draw two different finished transcripts made from that same gene by keeping different pieces, and the two different proteins that result. One line under it on why this matters for how many proteins a body can make." },

    { id:"w2p-protein-fate",
      module:1, week:null, system:"Cell physiology", general:"Cell physiology",
      name:"Where a new protein ends up",
      can:"Predict whether a newly made protein stays in the cytosol, lands in a membrane, or is secreted, based on where its ribosome was and what happens to it afterward.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw one cell with two ribosomes: one floating free and one on the rough ER. Follow the protein from each to its destination, with the ER, Golgi and vesicle drawn for the one that needs them. Label the three possible endings. One line on what decided which route the protein took.",
      b:"Draw a cell whose Golgi has stopped working, and follow a protein that was meant to be secreted. Show where it gets stuck and what builds up. Under it, one line on what the cell stops delivering to the body and who notices." },

  ]
};
