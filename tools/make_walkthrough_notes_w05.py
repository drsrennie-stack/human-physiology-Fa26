#!/usr/bin/env python3
"""
tools/make_walkthrough_notes_w05.py

Week 5 copy of tools/make_walkthrough_notes.py. Oct 4 2026. Builds the
written notes page for each Week 5 walkthrough from
tools/walkthrough_notes_w05.py, and the Week 5 notes page that lists them,
week-05-notes.html, from the Week 4 one. Same shell, same styles, same
printing rules. The PDFs come from tools/make_notes_pdf.py 5.

Run: python3 tools/make_walkthrough_notes_w05.py
"""
import html, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import make_walkthrough_notes as base
from walkthrough_notes_w05 import NOTES

e = base.e

# Oct 4 2026: which Silverthorn (9th ed.) figure to open in the eText beside each
# section. Figure numbers only; no publisher images are reproduced.
FIGS = {
 ("reflexes","Step by step: where the signal travels"): "Fig. 14.5 (the knee jerk reflex), Fig. 14.2 (muscle spindles and alpha-gamma coactivation), Fig. 14.3 (Golgi tendon organs) and Fig. 14.6 (the crossed extensor reflex)",
 ("reflexes","The reflex arc"): "Fig. 10.7 (spinal reflexes) and Fig. 14.1 (neural reflexes)",
 ("reflexes","Kinds of reflexes"): "Table 14.1 (classification of neural reflexes) and Fig. 14.1c (autonomic reflexes)",
 ("reflexes","Skeletal muscle reflexes and proprioceptors"): "Fig. 14.2 (muscle spindles)",
 ("reflexes","The stretch reflex"): "Fig. 14.2, Fig. 14.4 (the stretch reflex) and Fig. 14.5 (the knee jerk reflex)",
 ("reflexes","The Golgi tendon organ"): "Fig. 14.3 (Golgi tendon organs)",
 ("reflexes","Withdrawal and crossed extensor reflexes"): "Fig. 14.6 (the crossed extensor reflex)",
 ("reflexes","The brain's control of spinal reflexes"): "Fig. 14.7 (integration of muscle reflexes) and Fig. 14.10 (the corticospinal tract)",
 ("sensory-coding","Step by step: where the signal travels"): "Fig. 11.6 (coding for stimulus intensity and duration) and Fig. 11.5 (lateral inhibition)",
 ("sensory-coding","Receptors and transduction"): "Fig. 11.1 (sensory receptors) and Fig. 11.6",
 ("sensory-coding","Receptor classes"): "Table 11.2 (types of sensory receptors)",
 ("sensory-coding","What the brain is told"): "Fig. 11.3 (sensory pathways) and Fig. 11.4 (localization of sound)",
 ("sensory-coding","Receptive fields and acuity"): "Fig. 11.2 (receptive fields) and Fig. 11.5 (lateral inhibition)",
 ("sensory-coding","Adaptation and habituation"): "Fig. 11.7 (receptor adaptation)",
 ("pathways-pain","Step by step: where the signal travels"): "Fig. 11.8 (somatosensory pathways), Fig. 14.10 (the corticospinal tract) and Fig. 11.11 (referred pain)",
 ("pathways-pain","Inside the spinal cord"): "Fig. 10.6 (organization of the spinal cord)",
 ("pathways-pain","Three long pathways"): "Fig. 11.8 and Fig. 14.10",
 ("pathways-pain","Where these pathways go in the brain"): "Fig. 10.13 (functional areas of the cerebral cortex) and Fig. 11.3 (sensory pathways)",
 ("pathways-pain","Somatic senses and their receptors"): "Fig. 11.10 (sensory receptors in the skin) and Fig. 11.9 (the somatosensory cortex)",
 ("pathways-pain","Pain and its modulation"): "Table 11.3 (classes of somatosensory nerve fibers) and Fig. 11.11 (referred pain)",
 ("csf-bbb","Step by step: where the signal travels"): "Fig. 10.4 (cerebrospinal fluid) and Fig. 10.5 (the blood-brain barrier)",
 ("csf-bbb","Protecting the brain"): "Fig. 10.3 (the central nervous system and the meninges)",
 ("csf-bbb","Cerebrospinal fluid"): "Fig. 10.4 (cerebrospinal fluid)",
 ("csf-bbb","The blood-brain barrier"): "Fig. 10.5 (the blood-brain barrier)",
 ("vision","Step by step: where the signal travels"): "Fig. 11.31 (phototransduction in rods), Fig. 11.25 (pathways for vision and the pupillary reflex) and Fig. 11.26 (optics of the eye)",
 ("vision","Structures of the eye"): "Fig. 11.23 (external anatomy of the eye) and Fig. 11.24 (the eye)",
 ("vision","Focusing light"): "Fig. 11.26 (optics of the eye)",
 ("vision","Photoreceptors and phototransduction"): "Fig. 11.29 (rods and cones), Fig. 11.30 (light absorption by visual pigments) and Fig. 11.31 (phototransduction in rods)",
 ("vision","Processing in the retina and beyond"): "Fig. 11.28 (the retina), Fig. 11.32 (visual fields) and Fig. 11.33 (binocular vision)",
 ("hearing-balance","Step by step: where the signal travels"): "Fig. 11.18 (signal transduction in hair cells), Fig. 11.20 (the auditory pathways), Fig. 11.22 (equilibrium pathways), Fig. 11.13 (taste) and Fig. 11.12 (the olfactory system)",
 ("hearing-balance","Hearing"): "Fig. 11.18 (signal transduction in hair cells), the figure on sensory coding for pitch, and Fig. 11.20 (the auditory pathways)",
 ("hearing-balance","Balance (equilibrium)"): "Fig. 11.21 (equilibrium) and Fig. 11.22 (equilibrium pathways)",
 ("hearing-balance","Taste and smell"): "Fig. 11.12 (the olfactory system) and Fig. 11.13 (taste)",
}
FIGNOTE = '<p class="figref"><b>In your textbook:</b> open Silverthorn %s in your eText beside this section.</p>\n'

def page(n):
    s = base.SHELL[:base.HEAD_END] + base.STYLE_ADD + base.SHELL[base.HEAD_END:]
    s = re.sub(r"<title>[^<]*</title>", "<title>%s, written notes &middot; BIO 005 Human Physiology</title>" % e(n["title"]), s, 1)
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    pdf = "notes/BIO005-Week5-Walkthrough-Notes-%s.pdf" % n["slug"]
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week 5 · Written notes</p>\n'
            '  <h1>%s</h1>\n  <p>The written notes for the %s walkthrough. %s.</p>\n'
            '  <p><b>To print:</b> <a href="%s" target="_blank" rel="noopener">these notes as a two-column PDF<span class="mm-vh"> (opens in a new tab)</span></a>. Already printed the Week 5 notes? You do not need to print these again.</p>\n'
            '</div></header>\n' % (e(n["title"]), e(n["title"].lower()), e(n["comps"]), pdf))
    body = ['<main id="main"><div class="wrap notes">\n',
            '<div class="use"><p><b>How to use these notes.</b> Work through <a href="%s" target="_top">the walkthrough</a> first, writing each prediction on your worksheet before you press Show me. '
            'Then read these notes to fill in anything you missed, and use them to review. They are the same facts in a form you can study from, not a copy of the walkthrough.</p></div>\n' % n["walk"]]
    for t, blocks in n["sections"]:
        fig = FIGS.get((n["slug"], t))
        body.append("<section>\n<h2>%s</h2>\n" % e(t) + (FIGNOTE % e(fig) if fig else "") + "".join(base.block(x) for x in blocks) + "</section>\n")
    body.append("</div></main>")
    s = s[:a] + head + "\n" + "".join(body) + s[b:]
    s = s.replace("Week 4", "Week 5")
    (ROOT / n["file"]).write_text(s, encoding="utf-8")
    print("built", n["file"])

BLURB = {
 "reflexes": "The reflex arc and its five parts, the four ways reflexes are sorted, monosynaptic and polysynaptic reflexes, the muscle spindle and stretch reflex with reciprocal inhibition and gamma motor neurons, the Golgi tendon organ, the withdrawal and crossed extensor reflexes, muscle tone, how the brain turns reflexes up and down, the Babinski sign, upper and lower motor neuron lesions, and how reflexes are graded and timed.",
 "sensory-coding": "Transduction and the receptor potential, frequency and population coding, the five receptor classes, the labeled line and how location, intensity and duration are coded, receptive fields and lateral inhibition, and tonic and phasic receptors.",
 "pathways-pain": "Gray and white matter, the horns and roots of the cord, the dorsal column, spinothalamic and corticospinal tracts and where each one crosses, a cut through half the cord, the somatosensory homunculus, fast and slow pain, referred pain, the dorsal horn gate and the endogenous opioids.",
 "csf-bbb": "Where cerebrospinal fluid is made, how it flows and where it is reabsorbed, hydrocephalus, the blood-brain barrier, what crosses it and how, and the few places it is missing.",
 "vision": "Refraction and accommodation, the pupillary light reflex, myopia, hyperopia, presbyopia and astigmatism, phototransduction in a rod, rods and cones, and the visual pathway with two lesions.",
 "hearing-balance": "Sound from the eardrum to the hair cell, pitch and loudness, the Weber and Rinne tests, the semicircular canals and the otolith organs, and how taste and smell are transduced and where they go.",
}

def hub():
    s = (ROOT / "week-04-notes.html").read_text(encoding="utf-8")
    a = s.index('<header class="top">'); b = s.index("</div></main>") + len("</div></main>")
    items = "".join(
        '<li><b>%s.</b> %s %s.<br><a href="%s" target="_top">The walkthrough</a> &middot; <a href="%s" target="_top">the written notes</a> &middot; '
        '<a href="notes/BIO005-Week5-Walkthrough-Notes-%s.pdf" target="_blank" rel="noopener">notes to print (PDF) <span class="mm-vh">(opens in a new tab)</span></a></li>'
        % (e(n["title"]), e(BLURB[n["slug"]]), e(n["comps"]), n["walk"], n["file"], n["slug"]) for n in NOTES)
    head = ('<header class="top"><div class="wrap">\n  <p class="eyebrow">BIO 005 · Week 5 · Control Systems</p>\n  <h1>Reflexes, and sensing the world</h1>\n'
            '  <p>The walkthroughs and written notes for this week, topic by topic.</p>\n'
            '  <p><b>To print:</b> <a href="notes/BIO005-Week5-Notes-all.pdf" target="_blank" rel="noopener">all the Week 5 notes in one PDF<span class="mm-vh"> (opens in a new tab)</span></a>, set in two columns to save paper. Each topic also has its own PDF, linked beside it below. Already printed them from the Start here page? You do not need to print them again.</p>\n</div></header>\n')
    body = ('<main id="main"><div class="wrap">\n<section>\n  <h2>What this week covers</h2>\n'
            '  <p>Work through the topics in order, because each one uses the one before it. Each topic has two parts that go together: the walkthrough, which is the lecture, with a worksheet beside it where you type each prediction before you press Show me; and written notes to study from afterward, in bullets, definitions and sequences.</p>\n'
            '  <ol class="plain">%s</ol>\n'
            '  <p>Competencies 7, 15, 24 and 25 are reflex testing, tactile mapping, vision testing and hearing testing, and they are done in lab. The full list with both prompts for each competency is on <a href="week-05-competencies.html" target="_top">the Week 5 competency list</a>.</p>\n'
            '</section>\n</div></main>' % items)
    s = s[:a] + head + "\n" + body + s[b:]
    s = s.replace("Week 4", "Week 5")
    (ROOT / "week-05-notes.html").write_text(s, encoding="utf-8")
    print("built week-05-notes.html")

if __name__ == "__main__":
    for n in NOTES: page(n)
    hub()
