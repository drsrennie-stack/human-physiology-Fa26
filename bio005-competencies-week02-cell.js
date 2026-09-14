/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-competencies-week02-cell.js

   WEEK 2, THE CELL. Silverthorn Chapter 3, Compartmentation:
   Cells and Tissues. Cell anatomy and cell physiology together,
   which is what Scrubs asked for on Sep 14 2026.

   DRAFT UNTIL SHE SAYS OTHERWISE. This file is loaded by nothing
   yet. It does not change bio005-competencies.js, the card bank,
   the exam blueprint or any week page. Approving it is one merge
   and one regeneration, and that is deliberately a separate step,
   because moving competencies moves 4,980 recall cards with them.

   WHAT THIS SET ASSUMES
   ---------------------
   1. The seven chemistry competencies now sitting in week 2
      (water, pH and buffers, protein structure, enzyme activity,
      ATP and energy coupling, the enzyme assay, ATP pathways) come
      out of the graded week and become the optional chemistry
      review, which is the Sep 13 decision.
   2. The two compartment competencies now sitting in week 3
      (w1-fluid-compartments, w1-compartment-shifts) are Chapter 3
      content and belong with this set, not with transport. They
      are NOT duplicated here; merging moves them.
      That makes week 2 seventeen competencies and leaves week 3
      with fourteen, all of them membrane and transport.
   3. Reading becomes Silverthorn Chapter 3 for week 2 and
      Chapter 5 for week 3. lecture-week.html currently reads
      'Chapter 2 and Chapter 4' for week 2 and 'Chapter 3 and
      Chapter 5' for week 3.
   4. The week 2 lab is still the enzyme assay, PhysioEx Ex 8,
      which belongs to the chemistry set. It needs a new home or a
      new lab. Flagged, not decided here.

   Ids are w2c-* so nothing collides with the existing w1-*, w2-*
   set and so a merge is easy to see in a diff.
   ============================================================ */
window.BIO005_WEEK02_CELL = {
  week: 2,
  module: 1,
  reading: 'Silverthorn Chapter 3, Compartmentation: Cells and Tissues',
  title: 'The cell, inside and at work',
  status: 'draft, awaiting approval',
  competencies: [
    { id:"w2c-compartments",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Compartmentation as a principle",
      can:"Name the three functional compartments of the body, say which one a given fluid or structure belongs to, and explain why a substance in a lumen open to the outside world has not yet entered the body.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a person in outline, then draw the digestive tract running through them as an open tube. Shade the three compartments in three different ways: the lumen open to the outside, the extracellular fluid, and the inside of cells. Put a swallowed pill, a drop of plasma and a potassium ion on your drawing, each in the compartment it is in. One line under it: what the pill has to cross before it counts as being in the body.",
      b:"Draw a single cell sitting in tissue, with a capillary beside it. Mark the intracellular fluid, the interstitial fluid and the plasma, and draw the barrier between each pair. Label which barrier is leaky and which is tight. Under the drawing, one line naming the compartment a drug reaches first after an injection into a vein." },

    { id:"w2c-membrane-anatomy",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Structure of the cell membrane",
      can:"Draw the fluid mosaic membrane with the phospholipid bilayer, membrane proteins, cholesterol and surface carbohydrates, and state what each component contributes to the membrane's job.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a stretch of membrane in cross section, big enough to fill half the box. Put in the two phospholipid layers with heads and tails drawn differently, then add a channel protein, a protein that sits only in the outer layer, a cholesterol molecule and a carbohydrate chain. Label each one with what it does, not just its name.",
      b:"Draw the same membrane twice, side by side. In the first, the membrane is cold and packed with cholesterol. In the second it is warm with little cholesterol. Show the difference in how tightly the tails sit. Under both, one line on what fluidity changes about the membrane's work." },

    { id:"w2c-cytoplasm",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Cytoplasm, cytosol and inclusions",
      can:"Distinguish cytoplasm, cytosol and inclusions, and give an example of a stored inclusion and the cell type that keeps it.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a cell with its outline and nucleus only, then shade the cytosol one way and circle the region the word cytoplasm covers. Add a glycogen granule and a lipid droplet as inclusions, each labelled with a cell type that stores it. One line: what makes an inclusion different from an organelle.",
      b:"Draw three cells in a row: a liver cell after a meal, a fat cell, and a muscle cell after a sprint. In each, draw the inclusions you would expect to find and how much. Under the row, one line on what the inclusions tell you about what that cell does for a living." },

    { id:"w2c-cytoskeleton",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"The cytoskeleton and motor proteins",
      can:"Compare microfilaments, intermediate filaments and microtubules by what they are made of and what they do, and describe how a motor protein moves a load along a microtubule.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw one cell and run all three filament types through it, each drawn differently and labelled with its protein and its job. Then draw a motor protein walking a vesicle along a microtubule, with an arrow for the direction and a mark for where the ATP goes in.",
      b:"Draw a nerve cell with a long axon. Show a vesicle made at the cell body being carried to the end, and a worn out mitochondrion being carried back. Label the track and the direction of each trip. One line under it on what happens to the far end of that axon if the track breaks." },

    { id:"w2c-surface-structures",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Cilia, flagella and microvilli",
      can:"Tell cilia, flagella and microvilli apart by structure and function, and predict what fails when the cilia of a given tissue stop moving.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw three cell surfaces side by side, one with cilia, one with a flagellum, one with microvilli. Draw each structure to scale with the cell and mark whether it moves. Label the tissue where you would find each, and beside each one write what the cell gains from it.",
      b:"Draw the lining of an airway with a layer of mucus on top and cilia underneath, arrows showing which way the mucus travels. Then draw the same airway with the cilia paralysed by cigarette smoke. Show what happens to the mucus and to anything trapped in it. One line on why that patient coughs." },

    { id:"w2c-nucleus",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"The nucleus and the path from gene to protein",
      can:"Describe the structure of the nucleus and the nucleolus and trace, in order, the steps from a gene in the nucleus to a finished protein leaving the cell.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw the nucleus with its double membrane, a nuclear pore, chromatin and the nucleolus. Then run an arrow chain out of the pore and across the cytosol: transcript, ribosome, rough ER, Golgi, vesicle, outside. Label what happens to the protein at each stop.",
      b:"Draw two cells: one making a large amount of a secreted protein and one making almost none. Show the difference in the size of the nucleolus and the amount of rough ER in each. Under the two, one line naming a real cell that looks like the first drawing and what it secretes." },

    { id:"w2c-er-ribosomes",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Ribosomes and the endoplasmic reticulum",
      can:"Distinguish rough from smooth endoplasmic reticulum by structure and function, and predict which one is abundant in a cell given what that cell makes or does.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a cell with both kinds of ER drawn clearly differently, with ribosomes shown on one and free ribosomes floating in the cytosol as well. Label three jobs of the smooth ER. Beside the drawing, one line on the difference in destination between a protein made on a free ribosome and one made on a bound ribosome.",
      b:"Draw three cells: a pancreatic cell making digestive enzymes, a liver cell handling a drug, and a skeletal muscle cell storing calcium. In each, draw the ER the way you expect it to look. Under the row, one line on how a cell's ER tells you its job before anyone tells you its name." },

    { id:"w2c-golgi-secretion",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"The Golgi apparatus and secretion",
      can:"Describe how the Golgi modifies and sorts proteins into vesicles, and distinguish constitutive secretion from regulated secretion using a named example of each.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw the Golgi stack with a receiving face and a shipping face, a vesicle arriving from the ER and three vesicles leaving for three different destinations. Label each destination. Mark on your drawing where the protein gets modified.",
      b:"Draw two secreting cells side by side. In one, vesicles fuse with the membrane as soon as they are made. In the other, vesicles sit stacked under the membrane waiting for a signal, and you draw the signal arriving. Label each pattern and name a real cell that uses it. One line: why a cell would hold its product back." },

    { id:"w2c-lysosomes-peroxisomes",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Lysosomes and peroxisomes",
      can:"State what lysosomes and peroxisomes each break down and why each is kept inside a membrane, and explain what accumulates in a cell when one of these organelles fails.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a cell taking in a worn out organelle and a bacterium, and follow each one to a lysosome. Mark the inside of the lysosome with its pH and label the enzymes. Beside that, draw a peroxisome with what it handles. One line on why the cell keeps these enzymes behind a membrane rather than loose in the cytosol.",
      b:"Draw a cell whose lysosomal enzyme for one particular molecule is missing. Show what happens over time, three panels: early, later, and the cell failing. Under the panels, one line on why a disease like that shows up in the tissues that handle the most of that molecule." },

    { id:"w2c-mitochondria",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Mitochondrial structure and ATP",
      can:"Draw the mitochondrion with both membranes, the cristae and the matrix, say which step of energy production happens in each space, and explain why cristae are folded.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw one mitochondrion large enough to fill half the box, with the outer membrane, the inner membrane folded into cristae, the intermembrane space and the matrix all labelled. Mark where the citric acid cycle runs and where the electron transport chain sits. One line on what the folding buys the cell.",
      b:"Draw three cells and give each the number of mitochondria you expect: a cardiac muscle cell, a skin cell, and a red blood cell. Under the row, one line on what the count predicts about how that cell makes its ATP and what happens to it when oxygen runs short." },

    { id:"w2c-junctions",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Cell junctions and what each one permits",
      can:"Compare gap junctions, tight junctions and anchoring junctions by structure and by what can pass, and predict which junction a given tissue depends on.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw two cells side by side, joined by all three junction types stacked one above the other. Draw each junction differently and label what it lets through: ions, fluid, nothing, or mechanical pull. Beside each, name a tissue that needs it.",
      b:"Draw a sheet of gut lining with tight junctions holding the cells together, and show a molecule trying to get from the lumen to the blood by going between cells. Then draw the same sheet with the tight junctions loosened by inflammation. Show what now gets through. One line on what that does to the patient." },

    { id:"w2c-epithelia",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Epithelial tissue types",
      can:"Name the functional types of epithelium, match each to a location in the body, and explain how the shape and layering of the cells fit the work that epithelium does.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw five short strips of epithelium, one for each functional type, with the cell shape and the number of layers drawn correctly. Label each with a location and the job it does there. Under them, one line on what a single flat layer buys you and what it costs you.",
      b:"Draw a cross section of the airway from trachea down to alveolus, and show the epithelium changing as you go. Mark where it stops being ciliated and where it thins to one layer. One line on why the change happens where it does." },

    { id:"w2c-connective-matrix",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Connective tissue and the extracellular matrix",
      can:"Describe the two parts of the extracellular matrix, name the protein fibers and what each contributes, and explain how the matrix makes a tissue stiff, stretchy or slippery.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw a patch of connective tissue with the cells small and scattered and the matrix taking most of the space. Draw collagen fibers and elastin fibers differently and label what each does under load. Show the ground substance around them. One line on which component you would change to make this tissue stiffer.",
      b:"Draw three tissues: a tendon, an artery wall, and cartilage in a joint. In each, draw the fiber arrangement that gives it the property it needs. Under the row, one line on what a defect in collagen would do to all three at once." },

    { id:"w2c-muscle-neural-tissue",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Muscle and neural tissue",
      can:"Identify the three muscle tissue types and the two cell types of neural tissue by structure, and state what makes both tissue classes excitable.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw skeletal, cardiac and smooth muscle side by side, with the striations, the cell shape, the nuclei and the intercalated discs drawn where they belong. Label which are under voluntary control. One line on what all three share that makes them muscle.",
      b:"Draw a neuron and a supporting glial cell together, labelling the parts of the neuron that receive and the part that sends. Then draw a muscle cell beside them. Under the drawing, one line on what excitable means and what both tissues do with that property." },

    { id:"w2c-cell-turnover",
      module:1, week:2, system:"The cell", general:"The cell",
      name:"Cell growth, death and tissue remodeling",
      can:"Distinguish apoptosis from necrosis by what triggers each and what the tissue around it does, and explain why a tissue's rate of turnover predicts how well it recovers from injury.",
      dok:2, yield:"core", est:15, facets:["lecture"],
      a:"Draw two dying cells side by side. In one, the cell shrinks, packages itself and is taken up by a neighbor with no mess. In the other, the cell swells, bursts and spills its contents, and you draw the inflammation that follows. Label each process and what set it off.",
      b:"Draw three tissues on a scale from fast turnover to none: gut lining, liver, and cardiac muscle. Show roughly how often cells are replaced in each. Under the scale, one line on why a heart attack leaves a scar and a scraped gut lining does not." },

  ]
};
