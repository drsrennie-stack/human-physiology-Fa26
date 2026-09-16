# -*- coding: utf-8 -*-
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *
B=[]; A=B.append

A(sec("Every pathway is the same five steps"))
A(seq("Learn the shape once and the rest of the course is examples",
 [("Signal","A molecule is released by one cell."),
  ("Receptor","A protein binds it, and binding changes the receptor's shape. That shape change is how information gets in without the molecule entering."),
  ("Transduction","The message is converted into something the inside of the cell can act on."),
  ("Response","The cell opens a channel, runs an enzyme, secretes, contracts or divides."),
  ("Termination","The signal is switched off. Without this step the pathway is a disease, not a control system.")]))

A(sec("Signal types, and how far they travel"))
A(tbl("Sorted by distance, which sets speed and reach", ["Type","How it travels","Distance","Speed and reach"],
 [["Gap junctional","Directly cell to cell through connexon pores","Touching cells","Fastest. Nothing enters the extracellular fluid at all"],
  ["Contact dependent","A membrane molecule binds a receptor on the cell it touches","Touching cells","Immune cells checking each other"],
  ["Autocrine","Released and acts on the cell that released it","Itself","Common in immune signalling and growth control"],
  ["Paracrine","Into the interstitial fluid, onto neighbors","Short. Broken down before it travels","Histamine in an allergic response"],
  ["Neurotransmitter","Across a synaptic cleft onto one target","Very short","Very fast, very precise"],
  ["Hormone","Into the blood","Everywhere","Slow to arrive, long lasting, reaches every cell"]]))
A(hold("No receptor, no response",
  "A hormone in the blood touches every cell you have. What decides which cells respond is not where the signal goes, it is which cells carry a receptor for it. That single idea explains how one hormone does different things in different tissues and nothing at all in most of them."))

A(sec("Where the receptor sits, and what decides that"))
A(p("There are only two places a receptor can be, and one property of the signal decides which."))
A(cmap("Solubility decides everything downstream", "Can the signal molecule cross a lipid bilayer?", [
 ("Lipophobic, water soluble", [
   "Peptides, proteins, catecholamines such as epinephrine",
   "<b>Cannot</b> cross the membrane",
   "Receptor is <b>on the surface</b>",
   "Relayed by proteins already built and waiting",
   "Onset in <b>seconds</b>, stops soon after the signal leaves"]),
 ("Lipophilic, lipid soluble", [
   "Steroid hormones, thyroid hormone",
   "<b>Passes straight through</b> the membrane",
   "Receptor is <b>inside</b>, cytosol or nucleus",
   "Acts on DNA, changes which proteins are made",
   "Onset in <b>hours</b>, lasts hours to days after the signal has gone"])]))
A(hold("You are not memorising onset and duration",
  "You are working them out. Steroid means lipophilic, means intracellular receptor, means gene transcription, means slow and long. Every step follows from the one before it."))
A(sub("One thing to be careful about"))
A(ul(["Lipophilic hormones do not dissolve well in blood, so they travel <b>bound to carrier proteins</b>.",
      "Only the <b>free</b> fraction can enter cells.",
      "That is why a total hormone level and a free hormone level are different measurements, and why the free one is usually the one that matters."]))
A(prob(1,
 "Patient A is given a peptide hormone and reports an effect within minutes that has worn off an hour later. Patient B is given a steroid and feels nothing for hours, but the effect is still measurable two days later. Explain both time courses from the chemistry alone.",
 "Peptides are lipophobic. Steroids are lipophilic.",
 ["<b>A.</b> A peptide cannot cross the membrane, so its receptor is on the surface.",
  "Surface receptors work through proteins already in the cell: G proteins, enzymes, second messengers. Nothing has to be built, so the response begins in seconds to minutes.",
  "Those second messengers are broken down continuously, so when the hormone leaves the signal collapses quickly. Short onset, short duration.",
  "<b>B.</b> A steroid crosses the membrane and binds a receptor inside the cell.",
  "The complex acts on DNA and changes which proteins the cell makes. Transcription and translation take hours; that is the delay.",
  "Once made, those proteins persist until they are degraded, so the effect outlives the hormone. Slow onset, long duration.",
  "<b>Draw:</b> two cells side by side, one with the signal stopping at the surface and a cascade inside, one with the signal walking through to the nucleus. Put a clock on each.",
  "<b>Carry:</b> onset and duration are not facts per hormone. They fall out of where the receptor is, which falls out of solubility."]))

A(sec("The four families of surface receptor"))
A(tbl("Sort almost anything into one of these", ["Family","How it works","Speed","Example"],
 [["Receptor channel","The receptor is itself an ion channel. Ligand binds, channel opens","Milliseconds, the fastest","The neuromuscular junction"],
  ["G protein coupled","Receptor activates a G protein, then an amplifier enzyme, then a second messenger","Seconds","Epinephrine at a beta receptor"],
  ["Receptor enzyme","An enzyme site, usually a kinase, on the receptor's inner face","Seconds to minutes","The insulin receptor"],
  ["Integrin","Linked to the cytoskeleton, transduces mechanical information","Varies","Sensing what the cell is attached to"]]))

A(sec("The G protein cascade, step by step"))
A(p("This is the pathway to draw from blank paper, because so much else is a variation on it. The parts: a receptor crossing the membrane seven times, a G protein with alpha, beta and gamma subunits, an amplifier enzyme, and a second messenger."))
A(seq("One pass through the cascade, and how it switches itself off",
 [("At rest","The alpha subunit holds GDP. Everything is quiet."),
  ("Ligand binds the receptor outside","The receptor changes shape."),
  ("The receptor grips the G protein","The alpha subunit swaps GDP for GTP. This is the switch turning on."),
  ("The alpha subunit separates","It moves along the inner face of the membrane to the amplifier enzyme."),
  ("The amplifier enzyme runs","It produces a great deal of second messenger."),
  ("A protein kinase is activated","It adds phosphate groups to target proteins and changes what they do. Phosphorylation is the cell's general purpose on switch."),
  ("The alpha subunit hydrolyses its own GTP","It reassembles with beta and gamma. The switch turns itself off.")]))
A(hold("The G protein is a timer as well as a switch",
  "How long the alpha subunit takes to hydrolyse its GTP sets how long the signal lasts. Cholera toxin locks that subunit so it cannot, the switch jams on, cAMP stays high, chloride and water pour into the gut. That is the diarrhoea."))

A(sec("Second messengers"))
A(p("The hormone is the first messenger and never gets in. The second messenger is what carries the news around the cytosol."))
A(tbl("The ones to know", ["Messenger","Amplifier enzyme","What it activates","Seen in"],
 [["Cyclic AMP","Adenylyl cyclase, from ATP","Protein kinase A","Epinephrine at a beta receptor"],
  ["IP3 and DAG","Phospholipase C, cutting a membrane phospholipid in two","IP3 opens calcium channels on the ER; DAG activates protein kinase C","Many peptide hormones"],
  ["Calcium","Released from the ER or entering from outside","Calmodulin, troponin","Contraction, secretion, almost everything"],
  ["Cyclic GMP","Guanylyl cyclase","Protein kinase G","Nitric oxide relaxing smooth muscle"]]))
A(hold("Why calcium works as a messenger at all",
  "The cell holds cytosolic calcium about ten thousand times lower than outside, using the calcium pumps from the transport chapter. Opening a channel for a moment therefore produces a large proportional change. The low resting level is what makes the signal readable."))

A(sec("Amplification"))
A(ul(["A hormone is present in blood at roughly a billionth of a mole per litre. The response can be enormous.",
      "The gap between those two is amplification, and it is a property of the <b>cascade</b>, not of the hormone."]))
A(seq("Where the gain comes from, epinephrine in a liver cell",
 [("One ligand, one receptor","But the receptor activates many G proteins while the ligand is bound."),
  ("Each G protein switches on an amplifier enzyme","Multiplication one."),
  ("Each enzyme makes many molecules of second messenger","Multiplication two, and the biggest."),
  ("Each second messenger activates a kinase, which phosphorylates many targets","Multiplication three."),
  ("Each phosphorylated enzyme works on many glycogen molecules","Multiplication four. One hormone molecule ends up producing on the order of a hundred million glucose molecules.")]))
A(tbl("Two consequences, and they pull in opposite directions", ["Consequence","Why","What it forces"],
 [["Sensitivity","Four multiplying steps","A cell can respond to a vanishingly small signal, which is how hormones work at the concentrations they do"],
  ["Fragility","The same four steps","A cascade with that much gain must be shut off precisely, or a trace of signal runs away"]]))

A(sec("Receptor enzymes and intracellular receptors"))
A(seq("The insulin receptor, and why it ties this week together",
 [("Insulin binds its receptor","No G protein. The receptor itself carries a tyrosine kinase site on its inner face."),
  ("The receptor autophosphorylates","Then phosphorylates a chain of intracellular proteins in turn."),
  ("Vesicles carrying GLUT4 move to the surface","And fuse with the plasma membrane."),
  ("Glucose uptake rises in muscle and fat","The last step is exocytosis inserting a facilitated diffusion carrier: three ideas from this week in one pathway.")]))
A(sub("Intracellular receptors, the lipophilic route"))
A(ol(["The hormone crosses the membrane on its own.",
      "It binds its receptor in the cytosol or the nucleus.",
      "The complex binds DNA at a response element.",
      "Transcription of specific genes changes, so the cell makes different proteins.",
      "The cell's behavior changes for as long as those proteins last."]))
A(p("Cortisol and the sex steroids work this way. So does thyroid hormone, which is not a steroid but is lipophilic and behaves like one here."))

A(sec("Turning the volume up and down"))
A(tbl("The cell changes how loudly it hears", ["","What happens","When","Where you meet it"],
 [["Down regulation","Receptors removed from the surface or fewer made","Sustained high signal","Drug tolerance. Why a constant infusion works less well than a pulsed one"],
  ["Up regulation","More receptors made, the cell becomes more sensitive","Sustained low signal","A denervated muscle becomes hypersensitive to acetylcholine"]]))
A(tbl("Molecules that bind receptors", ["Term","Binds?","Activates?","What it does to the response"],
 [["Full agonist","Yes","Yes","Can produce the maximum response"],
  ["Partial agonist","Yes","Partly","Activates, but cannot reach the maximum however much you give"],
  ["Competitive antagonist","Yes, same site","No","Blocks, but enough agonist outcompetes it. Curve shifts right, maximum unchanged"],
  ["Noncompetitive antagonist","Yes, elsewhere","No","Cannot be outcompeted. The maximum itself comes down"]]))
A(hold("Why the competitive distinction is clinical, not academic",
  "It decides whether more agonist can rescue the patient. You can out dose a competitive blocker. You cannot out dose a noncompetitive one; you support the patient until the drug clears."))

A(sec("Signal termination"))
A(p("Nothing above matters unless the signal can be stopped."))
A(tbl("Five ways a signal ends", ["Route","How","Example"],
 [["The ligand leaves or is destroyed","Broken down, taken back up, or cleared","Acetylcholinesterase clears the cleft in about a millisecond"],
  ["The receptor stops responding","Internalised or chemically modified so it no longer couples","Receptor desensitisation"],
  ["The switch turns itself off","The G protein hydrolyses its GTP","Built into every G protein cascade"],
  ["The second messenger is destroyed","Enzymes break it down continuously","Phosphodiesterase breaks down cAMP; calcium is pumped back out"],
  ["The phosphate comes off","Phosphatases reverse what the kinases did","Every on switch has a matching off switch"]]))
A(tbl("Failure to terminate is a category of disease", ["What fails","Mechanism","Result"],
 [["Cholera toxin","Locks the G protein alpha subunit on","cAMP stays high, chloride and water pour into the gut"],
  ["Some endocrine tumours","A mutation leaves a receptor active with no ligand at all","Continuous hormone output with no signal"],
  ["Sildenafil, on purpose","Inhibits the phosphodiesterase that breaks down cGMP","The relaxing signal lasts longer. Termination blocked as the therapy"]]))
A(hold("Knowing how a pathway is switched off tells you where a drug can act",
  "Half the drugs in this chapter do not touch the receptor at all. They work on the off switch."))

A(sec("Dose and response"))
A(ul(["Plot response against dose and the curve rises slowly, then steeply, then flattens.",
      "The flattening is <b>saturation</b>: a finite number of receptors, all occupied. Past that point more drug adds nothing and side effects are all that is left.",
      "It is the same idea as the transport maximum in the last chapter.",
      "Plot dose on a <b>logarithmic</b> axis and the same data becomes a tidy S shape, which is why nearly every published curve is drawn that way."]))
A(tbl("Two numbers, and they are independent", ["","What it measures","What it means","A low or high value"],
 [["EC50","Potency","The dose giving half the maximum response","Lower EC50 means more potent, you need less drug"],
  ["Maximal response","Efficacy","How much the drug can do at its best","A higher ceiling means it can do more"]]))
A(hold("The commonest error here",
  "A very potent drug with a low ceiling is worse for a severe problem than a less potent drug with a high one. A partial agonist has lower efficacy no matter how potent it is. Potency is how much you need; efficacy is how much you get."))
A(prob(2,
 "Two dose response curves are drawn for the same agonist. In experiment one a blocker shifts the curve right with the same maximum. In experiment two a different blocker lowers the maximum with no rightward shift. Identify each, and say which patient you could rescue with more agonist.",
 "Competitive antagonists bind the same site as the agonist. Noncompetitive ones do not.",
 ["<b>One.</b> The maximum is unchanged, so every receptor can still give a full response if the agonist reaches it.",
  "That is a <b>competitive antagonist</b>. The two compete for one site, so raising agonist wins the competition.",
  "The rightward shift means a higher EC50: more drug for the same effect. Potency fell, efficacy did not.",
  "<b>Two.</b> The maximum is lower, so some receptors cannot respond at any agonist concentration.",
  "That is a <b>noncompetitive antagonist</b>. Raising the agonist does not help, because the problem is not competition for the site.",
  "Efficacy fell. EC50 may be unchanged.",
  "<b>Clinically:</b> you can out dose the competitive blocker. You cannot out dose the other one.",
  "<b>Draw:</b> one set of axes, three curves, control and both blockers, with EC50 marked on each."]))
