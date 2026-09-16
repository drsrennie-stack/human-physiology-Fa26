# -*- coding: utf-8 -*-
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *
B=[]; A=B.append

A(sec("One body, many rooms"))
A(ul(["Every cell sits in fluid, and the composition of that fluid is what every control loop from Week 1 was defending.",
      "Cells only ever feel the <b>interstitial fluid</b> around them. When a later week names a regulated variable, it is almost always an extracellular value.",
      "Blood is the only compartment we can sample easily, and it is the smallest."]))
A(tbl("Body fluid compartments in a 70 kg adult", ["Compartment","Fraction","Volume","What it is"],
 [["Total body water","About 60 percent of body mass","42 L","Everything below, added up"],
  ["Intracellular fluid","Two thirds of total body water","28 L","Inside cells. Most of your water is here"],
  ["Extracellular fluid","One third of total body water","14 L","Everything outside cells"],
  ["Interstitial fluid","About three quarters of the ECF","10 to 11 L","Between cells. What a cell actually touches"],
  ["Plasma","About one quarter of the ECF","3 L","The fluid part of blood. About 5 L of blood in total"]]))
A(tbl("What each compartment is made of", ["Ion","Inside cells","Outside cells","Held that way by"],
 [["Sodium","Low","High, about 140 mmol/L","The sodium potassium pump"],
  ["Potassium","High","Low, about 4 mmol/L","The sodium potassium pump"],
  ["Calcium","Very low","Higher","Calcium pumps"],
  ["Protein","High","Low in interstitial fluid, higher in plasma","Size. Protein cannot cross freely"]]))
A(hold("Why a blood test tells you about a compartment you did not sample",
  "A lab reports plasma sodium and potassium. Plasma is part of the ECF, so those values describe the ECF well. They describe the ICF only by inference, which is why a normal serum potassium does not guarantee a normal total body potassium."))

A(sec("Two things called a membrane"))
A(ul(["<b>The plasma membrane</b> is the lipid bilayer around one cell.",
      "<b>A tissue membrane</b> is a sheet of cells lining a cavity, like the pleura or the peritoneum.",
      "Same word, two scales. The one that matters here is the first."]))
A(sub("Lipids build the wall by themselves"))
A(ol(["A phospholipid has a phosphate head that likes water and two fatty acid tails that do not.",
      "Drop them in water and they arrange themselves so the tails hide from it. No energy is spent and nothing assembles them.",
      "The result is a bilayer: heads out to the water on both sides, tails in the middle.",
      "That oily middle is the barrier. It is why a charged particle cannot cross without a protein, which is the whole of the next chapter."]))
A(tbl("What is in the membrane, and what each part does", ["Component","What it contributes"],
 [["Phospholipids","The bilayer itself, and the oily barrier in the middle"],
  ["Cholesterol","Buffers fluidity. Keeps the membrane from getting too stiff when cold or too loose when warm"],
  ["Integral proteins","Cross the membrane. Channels, carriers, pumps and receptors are all integral"],
  ["Peripheral proteins","Sit on one face. Often anchoring or enzymatic"],
  ["Glycolipids and glycoproteins","Carbohydrate on the outer face. Cell identity and recognition"]]))
A(hold("Fluid mosaic, in plain terms",
  "Fluid because the components drift about in the plane of the membrane rather than being fixed. Mosaic because proteins are scattered through it rather than forming a layer."))

A(sec("Inside the cell"))
A(tbl("The organelles, grouped by what they are for", ["Organelle","What it does","Worth knowing"],
 [["Nucleus","Holds DNA, controls transcription","The nuclear envelope has pores that let RNA out"],
  ["Ribosomes","Build proteins","Free in the cytosol, or bound to rough ER"],
  ["Rough ER","Makes proteins for export or for membranes","Rough because ribosomes stud it"],
  ["Smooth ER","Makes lipids, stores calcium","In muscle it is the sarcoplasmic reticulum, the calcium store"],
  ["Golgi apparatus","Modifies, sorts and packages proteins into vesicles","The despatch department"],
  ["Lysosomes","Digest what the cell takes in or wears out","Where a phagosome ends up"],
  ["Peroxisomes","Break down fatty acids and detoxify","Produce and then destroy hydrogen peroxide"],
  ["Mitochondria","Make ATP","Their own DNA, inherited maternally"]]))
A(sub("The cytoskeleton"))
A(tbl("Three filament types, thinnest to thickest", ["Filament","Made of","What it does"],
 [["Microfilaments","Actin","Shape, movement, the pseudopods of phagocytosis, and contraction with myosin"],
  ["Intermediate filaments","Various proteins, keratin among them","Mechanical strength. What desmosomes anchor to"],
  ["Microtubules","Tubulin","Tracks for vesicle transport, the mitotic spindle, and the core of cilia and flagella"]]))

A(sec("From cells to tissues: junctions"))
A(p("A sheet of cells is only useful if the cells are held together and the gaps between them are controlled. Three junction types do three different jobs, and mixing them up is the commonest error in this chapter."))
A(cmap("Ask what job the tissue needs done", "What does this junction have to achieve?", [
 ("Seal the gap between cells", [
   "<b>Tight junction</b> (zonula occludens)",
   "Built from claudins and occludins",
   "Controls the <b>paracellular</b> route",
   "Intestine, kidney tubule, blood brain barrier"]),
 ("Hold cells together against pulling", [
   "<b>Desmosome</b> (macula adherens)",
   "Cadherins anchored to intermediate filaments",
   "Resists shear and stretch",
   "Epidermis, cardiac muscle"]),
 ("Let signals pass cell to cell", [
   "<b>Gap junction</b>",
   "Connexons forming a pore",
   "Ions and small molecules pass directly",
   "Cardiac muscle, smooth muscle"]),
 ("Anchor a cell to what is under it", [
   "<b>Hemidesmosome</b>",
   "Anchors a basal cell to the basement membrane",
   "Keeps an epithelium attached to its base",
   "The base of the epidermis"])]))
A(hold("The distinction worth carrying into the discussion",
  "A junction that holds cells together does not necessarily seal the space between them. Desmosomes are strong and leaky; tight junctions are sealing and comparatively weak. A tissue usually needs both."))
A(tbl("What happens when a junction fails", ["Junction","Failure","What a person notices"],
 [["Tight junction","The paracellular seal is lost","Leak across the epithelium. In the gut, diarrhoea"],
  ["Desmosome","Cells come apart under stress","Blistering. Pemphigus vulgaris attacks a desmosomal protein"],
  ["Gap junction","Cells stop coupling electrically","In the heart, conduction slows and arrhythmia becomes likely"]]))

A(sec("Epithelia: the sheets that decide what enters"))
A(ul(["An epithelium is <b>polarized</b>: an apical face toward the lumen, a basolateral face toward the blood, and different proteins on each.",
      "It sits on a <b>basement membrane</b>.",
      "It has no blood vessels of its own, so it is fed by diffusion from below. That limits how thick it can be.",
      "It is the interface where the transport chapter happens."]))
A(tbl("Named by shape and by layers", ["","Types","Where and why"],
 [["Shape","Squamous, cuboidal, columnar","Flat for diffusion, taller where secretion or absorption is the job"],
  ["Layers","Simple (one), stratified (many), pseudostratified","One layer for exchange, many for protection"],
  ["Simple squamous","One flat layer","Alveoli and capillaries. As thin as possible, because Fick's law rewards it"],
  ["Simple columnar","One tall layer","Intestine. Room for the machinery of absorption"],
  ["Stratified squamous","Many flat layers","Skin and oesophagus. Built to be abraded and replaced"]]))
A(sub("Connective tissue, muscle and nerve, in brief"))
A(tbl("The other three tissue types", ["Tissue","Defining feature","Examples"],
 [["Connective","Cells scattered in an extracellular matrix. The matrix is the tissue","Bone, cartilage, blood, fat, tendon"],
  ["Muscle","Contracts","Skeletal, cardiac, smooth"],
  ["Nervous","Conducts electrical signals","Neurons and neuroglia"]]))
A(hold("The skin is all four in one organ",
  "Stratified squamous epithelium on top, connective tissue beneath it, smooth muscle at the hair follicles, and nerve endings throughout. If you can find all four in a section of skin, you can find them anywhere."))

A(prob(1,
 "A 70 kg adult is 60 percent water. Divide that water into compartments, then say how much blood the patient has if blood is 40 percent cells by volume.",
 "ICF is two thirds of total body water, ECF one third. Plasma is about a quarter of the ECF. One kilogram of water is one litre.",
 ["Total body water: 70 &times; 0.60 = <b>42 L</b>.",
  "Intracellular: 42 &times; 2/3 = <b>28 L</b>. Most of the body's water is inside cells.",
  "Extracellular: 42 &minus; 28 = <b>14 L</b>.",
  "Plasma: 14 &times; 1/4 = <b>3.5 L</b>, usually rounded to about 3 L. Interstitial fluid is the rest, about 10.5 L.",
  "Blood is plasma plus cells. If cells are 40 percent, plasma is 60 percent, so blood = 3 &divide; 0.60 = <b>5 L</b>.",
  "<b>Draw:</b> a 42 L tank, two thirds inside cells, and of the outside third only a quarter in the vessels.",
  "<b>Carry:</b> blood is the smallest compartment and the only one we sample easily."]))
A(prob(2,
 "A patient has watery diarrhoea for two days. Using the compartments, say which one is depleted first, what the body does about it, and why blood pressure is the thing that eventually falls.",
 "Fluid lost from the gut comes out of the ECF. Water moves between compartments by osmosis.",
 ["Fluid is lost from the gut lumen, which draws directly on the <b>extracellular</b> fluid.",
  "Plasma is part of the ECF, so plasma volume falls with it.",
  "If the fluid lost is roughly isotonic, ECF osmolarity barely changes, so water does not shift out of cells to help. The ECF absorbs the whole loss.",
  "Plasma is only about a fifth of the ECF, and the ECF is only a third of body water, so a loss that is small next to total body water is large next to plasma.",
  "Falling plasma volume means less venous return, less stroke volume, and eventually a fall in blood pressure.",
  "<b>Draw:</b> the three compartments with an arrow leaving the ECF, and mark which one the blood pressure sensors are sitting in.",
  "<b>Carry:</b> the compartment a loss comes out of decides how fast it becomes dangerous, not the size of the loss alone."]))
