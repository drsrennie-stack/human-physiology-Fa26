# -*- coding: utf-8 -*-
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *

B=[]; A=B.append

A(sec("The two questions that classify everything"))
A(p("Every transport mechanism in the body answers the same two questions. Ask them in this order and you never have to memorise a list."))
A(cmap("The map to put any new substance on", "Which way is it going relative to its own gradient, and is the cell paying?", [
 ("Down the gradient, no energy", [
   "<b>Simple diffusion.</b> Crosses the lipid unaided",
   "<b>Facilitated diffusion.</b> Needs a protein, still free",
   "<b>Osmosis.</b> The same thing, for water"]),
 ("Against the gradient, energy spent", [
   "<b>Primary active.</b> The protein burns ATP itself",
   "<b>Secondary active.</b> Spends a gradient another pump built"]),
 ("Too big for any protein", [
   "<b>Endocytosis.</b> Wrapped in membrane, brought in",
   "<b>Exocytosis.</b> Wrapped in membrane, sent out"]),
 ("Across a whole sheet of cells", [
   "<b>Transcellular.</b> Through the cells, two membranes",
   "<b>Paracellular.</b> Between them, past the tight junctions"])]))
A(hold("Hold onto this",
  "A student who knows the sodium potassium pump is primary and SGLT1 is secondary has understood the only difference that matters: where the ATP was spent."))

A(sec("Simple diffusion, and what sets its speed"))
A(sub("What diffusion is"))
A(ul(["Molecules move from where there are more of them to where there are fewer.",
      "Nobody pushes them. There are simply more ways to be spread out than stacked in a corner.",
      "No energy and no protein required.",
      "At equilibrium molecules keep moving both ways, but the two rates are equal. Equilibrium is a standoff, not a stillness."]))
A(sub("Fick's law, the four variables"))
A(tbl("Change one and the rate follows", ["Variable","Effect on rate","What it looks like clinically"],
 [["Concentration gradient","Steeper gradient, faster","A low arterial oxygen widens the alveolar gradient"],
  ["Surface area","More area, faster","Emphysema destroys alveolar walls and cuts area"],
  ["Membrane thickness","Thicker, slower","Fibrosis thickens the barrier"],
  ["Diffusion distance","Further, slower","Pulmonary oedema puts fluid in the way"]]))
A(sub("What crosses the lipid unaided, in order"))
A(ol(["<b>Small nonpolar gases.</b> Oxygen, carbon dioxide. Straight through, fast.",
      "<b>Small uncharged polar molecules.</b> Water, urea. Slowly.",
      "<b>Large polar molecules.</b> Glucose, amino acids. Not without a protein.",
      "<b>Ions.</b> Sodium, potassium, calcium, chloride. Never without a protein, whatever their size."]))
A(hold("Why this order is worth knowing cold",
  "It decides which mechanism a substance is forced to use. If a question tells you the molecule is charged, you already know a protein is involved before you know anything else about it."))

A(prob(1,
 "A patient develops pulmonary oedema, which puts a layer of fluid between the air and the blood and doubles the distance oxygen must travel. Nothing else changes. What happens to oxygen transfer, and why is the patient breathless rather than simply tired?",
 "Fick's law: rate rises with gradient and area, falls with thickness and distance.",
 ["Distance went up. Gradient, area and thickness are unchanged.",
  "Distance sits in the denominator, so doubling it roughly <b>halves</b> the rate of transfer.",
  "Less oxygen crosses per second, so arterial oxygen falls.",
  "Chemoreceptors respond to that fall by driving ventilation up, and that is what the patient feels as breathlessness.",
  "<b>Draw:</b> two boxes with a barrier between, the barrier drawn twice, thin and thickened, distance labelled on both.",
  "<b>Carry:</b> nothing was wrong with the oxygen, the haemoglobin or the gradient. One geometric variable moved and the system followed."]))

A(sec("Osmosis, osmolarity and tonicity"))
A(sub("Osmosis in one line"))
A(ul(["Water moves toward the side with <b>more solute</b>, because more solute means less water per litre.",
      "Track the water, not the solute. Tracking the solute is where marks are lost.",
      "Osmotic pressure is the pressure needed to <b>stop</b> that movement, not a push the solutes exert."]))
A(sub("The two words students confuse"))
A(tbl("Osmolarity against tonicity", ["","Osmolarity","Tonicity"],
 [["What it counts","Every dissolved particle","Only solutes that <b>cannot cross</b> the membrane"],
  ["Depends on a membrane?","No. Measure it in a beaker","Yes. The word is meaningless until you name a membrane"],
  ["Normal body value","About 300 mOsM","Isotonic is about 300 mOsM of nonpenetrating solute"],
  ["Tells you cell volume?","No","Yes. This is the one that matters to a cell"]]))
A(hold("The single most tested idea in this half",
  "A 300 mOsM urea solution is <b>isosmotic</b> with the cell and will still <b>burst</b> a red blood cell. Urea crosses the membrane, enters the cell, and water follows it in. Isosmotic and hypotonic at the same time. The two words are not synonyms."))
A(prob(2,
 "A red cell is dropped into each of three solutions. A: 300 mOsM sodium chloride. B: 300 mOsM urea. C: 150 mOsM sodium chloride. Sodium chloride does not cross the red cell membrane; urea does. Predict each, and give both words.",
 "Cell interior is about 300 mOsM, all of it nonpenetrating.",
 ["<b>A.</b> Nonpenetrating outside equals nonpenetrating inside. Water has no reason to move. <b>Isosmotic, isotonic, no volume change.</b>",
  "<b>B.</b> Count only nonpenetrating solute outside: zero. The cell has 300 inside and there is none outside, so water moves in.",
  "Urea also moves in down its own gradient, raising inside osmolarity and pulling in still more water. The cell swells and lyses. <b>Isosmotic but hypotonic.</b>",
  "<b>C.</b> Half the nonpenetrating solute outside that the cell has inside, so water moves in and the cell swells. <b>Hyposmotic and hypotonic.</b>",
  "<b>Draw:</b> three cells in three beakers, a water arrow in each, and write both words separately under each so you are forced to notice when they disagree.",
  "<b>Carry:</b> osmolarity is a property of a solution. Tonicity only exists once a membrane is named."]))

A(sec("Facilitated diffusion"))
A(ul(["Protein mediated, still <b>passive</b>, still downhill, still no ATP. The protein is a door, not an engine.",
      "Take the gradient away and movement stops. Reverse the gradient and the protein carries the cargo the other way.",
      "Glucose enters most cells this way, through the GLUT family."]))
A(tbl("Two features that come with using a protein", ["Feature","What it means","How you spot it on a graph"],
 [["Specificity","A carrier binds a particular shape. GLUT carries sugars, not amino acids","Not visible on a rate graph; visible in what the cell will and will not take up"],
  ["Saturation","A finite number of carriers. Fill them all and the rate stops rising","The curve flattens. Simple diffusion is a straight line that keeps climbing"]]))
A(sub("Channels against carriers"))
A(tbl("Both are proteins, and they work differently", ["","Channel","Carrier"],
 [["Shape","An open pore","A binding site that changes shape"],
  ["Speed","Very fast, millions of ions a second","Much slower"],
  ["Cargo","Ions and water","Larger solutes such as glucose"],
  ["Controlled by","Gating: voltage, chemical or mechanical","Availability and saturation"]]))

A(sec("Primary active transport"))
A(p("A cell at equilibrium with its surroundings is dead. Life is the business of holding gradients that would rather collapse, and this is the protein that does it."))
A(seq("The sodium potassium ATPase, one cycle",
 [("Three sodium ions bind inside","The pump is open to the cytosol and sodium is scarce there, so it binds readily."),
  ("ATP is hydrolysed","A phosphate is transferred to the pump and it changes shape."),
  ("Three sodium are released outside","Against their gradient, into a fluid already high in sodium."),
  ("Two potassium ions bind outside","The new shape has a high affinity for potassium."),
  ("The phosphate comes off","The pump returns to its original shape."),
  ("Two potassium are released inside","Against their gradient. The cycle is ready to run again.")]))
A(tbl("What the pump buys the cell", ["Consequence","Why it follows","Where it matters later"],
 [["Low sodium inside","Three sodium leave per cycle, continuously","Every secondary transporter runs on this gradient"],
  ["High potassium inside","Two potassium enter per cycle","Sets up the resting membrane potential in Week 3"],
  ["The cell is electrogenic","Three positive out, two positive in, net one positive out","A small direct contribution to the negative resting potential"],
  ["A large metabolic bill","A substantial share of resting metabolic rate","Explains why ischaemia causes cells to swell within minutes"]]))
A(sub("Other primary pumps worth naming"))
A(ul(["<b>Calcium ATPase.</b> Holds cytosolic calcium about ten thousand times lower than outside, which is what makes calcium usable as a signal.",
      "<b>Proton pump.</b> Acidifies gastric juice, and the target of proton pump inhibitors."]))

A(sec("Secondary active transport"))
A(ul(["Moves one substance <b>down</b> its gradient and uses the energy released to drag a second <b>up</b> its own.",
      "<b>No ATP touches this protein.</b> The ATP was spent earlier by the sodium potassium pump, building the gradient this one spends.",
      "Poison the pump and every secondary transporter in the cell fails shortly after."]))
A(tbl("The two shapes, and the names are literal", ["Type","Direction","Example","What it achieves"],
 [["Symport","Both the same way","SGLT1: sodium in, glucose in","Glucose absorbed against its gradient in gut and kidney"],
  ["Antiport","Opposite ways","Sodium calcium exchanger: sodium in, calcium out","Keeps cytosolic calcium low between beats"]]))
A(seq("Digoxin, four steps and no new physiology",
 [("Digoxin blocks the sodium potassium pump","Sodium stops leaving the cell."),
  ("Intracellular sodium rises","The inward sodium gradient gets weaker."),
  ("The sodium calcium exchanger slows","It runs on that gradient, so it exports less calcium."),
  ("Intracellular calcium rises","More calcium available per beat, so the heart contracts more forcefully.")]))
A(prob(3,
 "A patient with cholera is losing salt and water fast and no intravenous fluid is available. Oral rehydration solution, water with salt and glucose in it, saves them. Plain salt water does not work nearly as well. Explain why the glucose matters.",
 "Cholera toxin drives chloride and water secretion into the lumen. It does not damage SGLT1 on the apical membrane.",
 ["SGLT1 is a <b>symport</b>: sodium in down its gradient, glucose in against its own, the sodium paying for the glucose.",
  "It needs sodium in the lumen and a sodium gradient across the apical membrane. The basolateral pump keeps intracellular sodium low, so the gradient is there.",
  "With glucose present, every glucose absorbed brings a sodium in with it. Salt alone gives no such coupling.",
  "Sodium accumulating inside is pumped out basolaterally, raising osmolarity in the interstitial fluid.",
  "Water follows that solute by osmosis, out of the lumen and into the body. Water is never actively transported; it follows the sodium.",
  "<b>Draw:</b> one intestinal cell, apical and basolateral membranes, SGLT1 apical, the pump basolateral, a dotted water arrow following the sodium.",
  "<b>Carry:</b> the treatment works because the toxin breaks one pathway and leaves another intact. Knowing which protein sits on which membrane is what lets you see that."]))

A(sec("Transport maximum"))
A(ul(["Any protein mediated transport can saturate, because the number of proteins is finite.",
      "<b>Below the Tm:</b> raise the concentration, raise the rate.",
      "<b>At the Tm:</b> raise the concentration, nothing happens. The excess goes wherever it was headed.",
      "<b>Simple diffusion never saturates.</b> A graph that flattens means a protein is involved."]))
A(seq("Why uncontrolled diabetes puts sugar in the urine",
 [("Plasma glucose rises","More glucose is filtered at the glomerulus."),
  ("Filtered load passes the renal threshold","About 180 to 200 mg/dL of plasma glucose in most people."),
  ("The reabsorption carriers saturate","The transport maximum is around 375 mg/min."),
  ("Glucose remains in the tubule","It appears in the urine. That is glycosuria."),
  ("Water is held in the tubule with it","Glucose is osmotically active, so urine volume rises and the patient is thirsty.")]))
A(hold("One saturated carrier, three symptoms",
  "Sugar in the urine, high urine volume and thirst all come from the same ceiling being crossed. Learn the ceiling and the three fall out of it."))

A(sec("Vesicular transport"))
A(p("Proteins, bacteria and droplets of fluid are far too large for any channel or carrier, so the cell wraps them in a piece of its own membrane."))
A(tbl("The five, and how they differ", ["Process","Direction","How selective","Who does it"],
 [["Phagocytosis","In","A large particle: a bacterium, a dead cell","Specialised cells only: macrophages, neutrophils"],
  ["Pinocytosis","In","Nonselective, whatever is dissolved nearby","Most cells, continuously"],
  ["Receptor mediated endocytosis","In","Very selective, a specific ligand at a receptor","Most cells. LDL and transferrin uptake"],
  ["Exocytosis","Out","The vesicle contents, plus its membrane proteins","All cells. Regulated release is triggered by calcium"],
  ["Transcytosis","In one face, out the other","Carries cargo straight across a cell","Capillary endothelium, for large proteins"]]))
A(seq("Receptor mediated endocytosis, step by step",
 [("The ligand binds its surface receptor","LDL binding the LDL receptor, for example."),
  ("Loaded receptors gather in a coated pit","The inner face of that patch is coated with clathrin."),
  ("The pit invaginates and pinches off","A coated vesicle enters the cytosol."),
  ("The coat is shed and the vesicle sorts its cargo","Receptors are usually recycled to the surface."),
  ("The cargo is delivered","LDL goes to the lysosome and its cholesterol is released for use.")]))
A(prob(4,
 "A child has a plasma cholesterol several times normal from a young age, with the same pattern in the family. The LDL receptor is defective. Explain why plasma cholesterol is high, and name the step that failed.",
 "LDL carries cholesterol in blood. Cells take it up by receptor mediated endocytosis.",
 ["LDL is far too large to cross by any protein route, so uptake must be <b>receptor mediated endocytosis</b>.",
  "The receptor binds LDL at the surface and loaded receptors gather in a clathrin coated pit.",
  "With a defective receptor, LDL is never bound, so no pit forms and no vesicle is taken in. <b>The very first step fails.</b>",
  "The cholesterol is not missing from the body. It is in the plasma and cannot get out of it.",
  "Cells sense they are short of cholesterol and synthesise more of their own, which makes plasma levels worse.",
  "<b>Draw:</b> a cell surface with receptors and LDL outside, a coated pit forming in the normal case, then the same drawing with the receptor crossed out.",
  "<b>Carry:</b> a transport defect does not always mean too little of something. Here there is far too much, in the wrong compartment, because the door into the right one is broken."]))

A(sec("Transepithelial transport"))
A(p("Everything above crossed one membrane. Absorbing a nutrient means crossing a whole sheet of cells, in one side and out the other."))
A(ul(["An epithelial cell is <b>polarized</b>: the apical membrane facing the lumen carries different proteins from the basolateral membrane facing the blood.",
      "<b>Tight junctions</b> are what keep the two sets from mixing. This is where the anatomy of the first half and the physiology of this half meet.",
      "There are two routes across: <b>transcellular</b>, through the cells, and <b>paracellular</b>, between them."]))
A(seq("Glucose from the gut into the blood, three proteins on two membranes",
 [("SGLT1, apical membrane","Secondary active transport. Sodium comes in down its gradient and drags glucose in against its own."),
  ("GLUT2, basolateral membrane","Facilitated diffusion. Glucose leaves down its gradient into the interstitial fluid."),
  ("Sodium potassium ATPase, basolateral membrane","Primary active transport. Throws sodium out so the apical gradient never runs down."),
  ("Water follows","By osmosis, transcellular and paracellular, following the solute that just moved.")]))
A(hold("Three mechanisms, one molecule, one trip",
  "This is the pathway to draw from blank paper. At every step ask the same two questions: which way relative to the gradient, and who is paying."))
A(tbl("How leaky the paracellular route is depends on the junctions", ["Epithelium","Tight junctions","What that allows"],
 [["Proximal tubule","Leaky","A good deal passes between the cells. Bulk reabsorption"],
  ["Distal nephron","Tight","Almost nothing passes between. Fine control of what is kept"],
  ["Bladder","Very tight","Urine is held without leaking back into the body"],
  ["Small intestine","Moderately leaky","Water and some ions follow solute between the cells"]]))
A(prob(5,
 "A drug blocks only the basolateral sodium potassium pump in an intestinal cell. Glucose absorption across the epithelium falls to almost nothing within minutes, even though the drug never touched SGLT1. Explain the sequence.",
 "SGLT1 is apical and is a sodium glucose symport. GLUT2 is basolateral and is facilitated diffusion.",
 ["The pump was throwing sodium out basolaterally, holding intracellular sodium low.",
  "Block it and sodium stops leaving. Intracellular sodium begins to rise.",
  "SGLT1 runs on the sodium gradient across the apical membrane. As intracellular sodium rises, that gradient shrinks.",
  "With a small gradient there is little energy to spend, so SGLT1 can no longer drag glucose in against its gradient. Apical uptake falls.",
  "Nothing is wrong with SGLT1. Its fuel supply was cut off two steps upstream.",
  "<b>Draw:</b> the polarized cell again, the pump crossed out, rising sodium written inside, the arrow through SGLT1 getting thinner.",
  "<b>Carry:</b> this is what secondary means. Every secondary transporter is one pump failure away from stopping."]))
