# -*- coding: utf-8 -*-
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *

B=[]; A=B.append

def clinic(rows):
    return tbl("What this means in the clinic", ["Field","What it means","Example"], rows)

A(sec("What physiology is"))
A(tbl("The words this course uses precisely", ["Term","What it means"],
 [["Physiology","The study of the normal functioning of a living organism and its parts, including the physical and chemical processes involved"],
  ["Anatomy","The study of structure. Physiology asks what that structure does, and by what mechanism"],
  ["Pathophysiology","What function looks like when a normal mechanism fails. Not a separate subject, the same mechanisms running wrong"],
  ["Emergent property","A property of the whole system that none of its individual parts possesses. Blood pressure, consciousness, urine concentrating ability"],
  ["Teleological answer","An answer that says what something is <b>for</b>. Useful shorthand, not an explanation"],
  ["Mechanistic answer","An answer that says <b>how</b> something happens. This is what physiology means by an explanation, and what earns credit"]]))
A(hold("The answer that earns the mark",
  "A teleological answer says what something is for. A mechanistic answer says how it happens. Both can be true at once, and only one of them is physiology."))

A(sub("The six levels of organization"))
A(seq("Molecules at the bottom, the organism at the top",
 [("Molecules","Ions, proteins, lipids, nucleotides."),
  ("Cells","The smallest unit that is alive."),
  ("Tissues","Cells of one type working together."),
  ("Organs","Several tissues doing one job."),
  ("Organ systems","Organs sharing a function."),
  ("The organism","Emergent properties appear only here.")]))
A(hold("Why the level you answer at matters",
  "Function at one level cannot be fully predicted from the level below it, which is why molecules alone do not explain a heartbeat. When a question asks you to place a process, place it where you would see it happening, then say which level actually explains it. Those are often not the same level."))

A(sec("Structure and function"))
A(tbl("Three questions that turn a structure into a prediction", ["Ask this","What it gets you"],
 [["What does this form allow?","Form sets what it can do"],
  ["What is this wall separating?","Walls decide what mixes"],
  ["How much surface is available?","Surface area sets exchange"]]))
A(ol(["Draw the structure as it normally is.",
      "Draw it again with <b>one</b> feature changed.",
      "Beside the second drawing, write what the function can no longer do.",
      "Write why that loss <b>follows from</b> the change, rather than being a separate problem alongside it.",
      "Do it a second time in a different organ system. Two systems, one shared reason, is what the competency asks for."]))
A(hold("The sentence that gets marked",
  "The lost function has to follow from the structural change. If your answer would still make sense with the structure left intact, you have written two facts side by side instead of one explanation."))

A(sec("The internal environment"))
A(p("Homeostasis has to be defending something specific. This is what it is defending. Cells never touch the outside world, only the fluid immediately around them, and Claude Bernard called that fluid the milieu interieur."))
A(tbl("Read it from the outside in", ["Compartment","What it is","How much"],
 [["External environment","Everything the body is not. Air, water, food, temperature, whatever you are standing in","Outside"],
  ["Gut lumen and airways","Open to the outside at both ends, so still external. A substance is only inside you once it has crossed an epithelium","Outside"],
  ["<b>Internal environment</b>, the ECF","All fluid outside cells. This is what homeostasis defends, and this is the fluid a lab value is out of range in","About one third of total body water"],
  ["Interstitial fluid","ECF sitting between cells. The fluid that actually bathes most tissue","About three quarters of the ECF"],
  ["Plasma","The liquid part of blood. The only ECF compartment that circulates quickly, which is why it is the one you sample","About one quarter of the ECF"],
  ["Intracellular fluid, ICF","Fluid inside cells, separated from the internal environment by one cell membrane and held at a completely different composition","About two thirds of total body water"]]))
A(sub("Numbers worth carrying"))
A(ul(["Total body water is about <b>60 percent</b> of body mass in an average adult male, closer to <b>50 percent</b> in an average adult female.",
      "Of that, roughly <b>two thirds is ICF</b> and <b>one third is ECF</b>.",
      "Of the ECF, roughly <b>three quarters is interstitial fluid</b> and <b>one quarter is plasma</b>."]))
A(hold("Food sitting in your stomach has not entered you yet",
  "The gut and the airways are drawn crossing the body wall on purpose. They sit inside the body outline and open to the outside at both ends, so they belong to the external environment. Mucus in the airway counts as outside the body for the same reason."))
A(hold("Why the split between inside and outside cells matters",
  "Sodium is high outside the cell and low inside. Potassium is the reverse. Those two gradients power most of what you study this term."))
A(clinic([
 ["Nursing","Where the extra fluid is sitting is what changes the things you see when you assess the patient","A patient can be visibly swollen, with fluid sitting in the interstitial space, and still be low on volume inside the vessels"],
 ["Radiologic technology","Contrast goes into the blood first and then leaks out into the tissue, so when you scan decides which of those two you are looking at","An arterial phase scan catches contrast still inside the vessels. A delayed scan catches it after it has moved out into the interstitial space. Same injection, two different images, because the contrast moved compartments"],
 ["Medicine","Before you pick an IV fluid you have to decide which fluid space you are trying to fill","A liter of isotonic saline stays largely in the extracellular fluid. A liter of 5 percent dextrose in water spreads across total body water, so much less of it stays in the vessels"],
 ["Respiratory therapy","Mucus in the airway counts as outside the body, in the same way that food sitting in your gut is still outside you","A dry airway is a local humidity problem. It is not the same thing as whole body dehydration, and it is not fixed the same way"]]))

A(prob(1,
 "An average adult male has a body mass of 70 kg. Work out his total body water, then the volume of each compartment, and say which one a blood sample reports on.",
 "Total body water is about 60 percent of body mass in an average adult male. Two thirds of it is ICF, one third ECF. Three quarters of the ECF is interstitial fluid, one quarter is plasma. One kilogram of water is one liter.",
 ["Total body water: 70 &times; 0.60 = <b>42 L</b>.",
  "Intracellular fluid: 42 &times; 2/3 = <b>28 L</b>. Most of the body's water is inside cells.",
  "Extracellular fluid: 42 &minus; 28 = <b>14 L</b>. This is the internal environment.",
  "Interstitial fluid: 14 &times; 3/4 = <b>10.5 L</b>. This is the fluid that bathes the cells.",
  "Plasma: 14 &times; 1/4 = <b>3.5 L</b>. This is the only one that circulates quickly, so it is the one you sample.",
  "If the same person were an average adult female, start from about 50 percent instead of 60 and every number below it changes with it.",
  "<b>Draw:</b> a dashed box for the outside world, the body inside it, an ECF box inside that split into plasma and interstitial fluid, and the ICF below a line marked cell membrane.",
  "<b>Carry:</b> you sample the smallest compartment and report on the one homeostasis is defending."]))

A(sec("Homeostasis is not equilibrium"))
A(tbl("Six definitions that have to be exact", ["Term","What it means"],
 [["Homeostasis","The maintenance of a relatively stable internal environment. The word <b>relatively</b> is load bearing: the variable oscillates, it does not sit still"],
  ["Dynamic steady state","Material and energy move continuously, but the amount in each compartment stays roughly constant. This is what homeostasis actually is"],
  ["Equilibrium","A state in which no further net change occurs and no energy is required to maintain it. A cell at equilibrium with its surroundings is dead"],
  ["Regulated variable","The quantity the body is actually holding in range, such as core temperature, plasma pH, or blood glucose"],
  ["Set point","The target value the integrating center compares against. Set points move: they reset in fever, drift on a circadian cycle, and shift with acclimatization"],
  ["Normal range","The band of values a variable is allowed to occupy. Usually defined to cover the middle 95 percent of a healthy population, so one healthy person in twenty falls outside it"]]))
A(tbl("Equilibrium against steady state", ["","Equilibrium","Steady state"],
 [["Energy cost","Costs no energy to hold","Costs ATP every second"],
  ["Concentrations","End up equal","Gradients are kept unequal"],
  ["Is anything defended?","Nothing is being defended","Actively defended against change"],
  ["Who reaches it","A dead cell, within hours","Only a living cell can hold it"]]))
A(hold("The standard example",
  "Extracellular sodium near 145 mM, intracellular sodium near 12 mM, held apart by a pump spending ATP every second of your life. Stop paying and the two numbers meet, which is equilibrium, which is death."))
A(sub("Why the line on the graph is wavy"))
A(ul(["A regulated variable moves up and down inside its normal range, crossing the set point line rather than sitting on it.",
      "The variable is essentially <b>never</b> exactly at the set point.",
      "Negative feedback cannot prevent a change, only correct it, so oscillation is the normal result and not a sign of failure.",
      "A flat reading is worth a second look. Steady is not the same as still."]))
A(clinic([
 ["Nursing","When blood flow drops, cells can no longer hold their gradients, and you see that in the patient before you see it in the labs","Cool mottled skin and a rising lactate are gradient failure becoming visible at the bedside"],
 ["Radiologic technology","A nuclear medicine tracer only builds up where cells are still alive and still spending energy, so the picture is a map of which tissue is still working","Technetium sestamibi concentrates in heart muscle because living mitochondria maintain their charge gradient. Dead tissue cannot, so it takes up nothing, and that is what makes the cold spot on the scan"],
 ["Medicine","Every gradient in the body costs energy to hold, and that bill never stops while the patient is alive","When perfusion stops, the sodium potassium pump stops with it, potassium leaks out of cells, and measured plasma potassium rises"],
 ["Respiratory therapy","Breathing is muscle work, and that work is the price of keeping carbon dioxide moving out","A patient who is tiring can no longer afford that gradient, which is why carbon dioxide starts to climb as they wear out"]]))
A(prob(2,
 "A cell is left in a solution until nothing about it changes any more and no energy is being spent on it. Name the state it has reached, say whether it is alive, and contrast it with what a living cell is doing with its sodium.",
 "Equilibrium is a state in which no further net change occurs and no energy is required to maintain it. Extracellular sodium sits near 145 mM, intracellular sodium near 12 mM.",
 ["Nothing is changing and nothing is being spent. By definition that is <b>equilibrium</b>.",
  "Homeostasis is not equilibrium. It is a <b>dynamic steady state</b>: material and energy move continuously, but the amount in each compartment stays roughly constant.",
  "Equilibrium ends with concentrations equal and nothing being defended. Steady state keeps gradients unequal and defends them.",
  "Equilibrium costs nothing to hold. Steady state costs ATP every second.",
  "So the cell in the question is <b>dead</b>. Equilibrium is what a dead cell reaches within hours.",
  "The living cell is holding extracellular sodium near 145 mM against intracellular sodium near 12 mM, and paying for that difference continuously.",
  "<b>Draw:</b> two cells side by side, one with the sodium numbers apart and a pump drawn on it, one with the numbers equal and no pump.",
  "<b>Carry:</b> steady is not still, and it is not free."]))

A(sec("The six themes"))
A(cmap("Use this as the spine of your Week 1 note sheet, one box per branch", "Physiology, six themes", [
 ("Structure and function", ["Form sets what it can do",
                             "Walls decide what mixes",
                             "Surface area sets exchange"]),
 ("Energy", ["Gradients cost ATP",
             "Steady state is not free",
             "Metabolism pays for it"]),
 ("Information flow", ["Chemical signals",
                       "Electrical signals",
                       "Signal, receptor, response"]),
 ("Homeostasis", ["A variable held in range",
                  "Sensor, integrator, effector",
                  "Failure looks like disease"]),
 ("Compartmentation", ["Inside against outside cells",
                       "Plasma against interstitial",
                       "Organelles inside the cell"]),
 ("Mass balance", ["What comes in must leave",
                   "Intake plus production",
                   "Clearance removes it"])]))
A(hold("Two themes, every time",
  "Every mechanism this term sits on at least two of these. Take any mechanism from any week and name the two. If you cannot name two, you have memorized the mechanism without understanding where it came from, and naming them is the fastest check there is."))
