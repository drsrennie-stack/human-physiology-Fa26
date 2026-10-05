#!/usr/bin/env python3
"""
tools/build_lab_week05_neuro.py

Builds lab-week05-neuro-exam.html, the Week 5 lab: the neurological exam.
Oct 4 2026. Scrubs asked for a lab built on the parts of the neuro exam: what
each test checks, the pathway and where its cell bodies and tracts are, what
normal looks like, and one ABNORMAL finding with the student's interpretation.

Students run the normal exam on a partner and watch the abnormal findings in
the University of Utah NeuroLogic Exam videos (Larsen and Stensaas,
neurologicexam.med.utah.edu, CC BY-NC-SA). The videos are linked, never
copied. Only these Utah URLs were verified on Oct 4 2026: the site index by
exam, the cranial nerve normal and abnormal pages, and the motor abnormal page.
The other parts point students to the site index, where each exam has a
Normal Exam and an Abnormal Examples link.

Covers the four Week 5 lab competencies: 7 reflex testing and reaction time,
15 tactile mapping (two-point discrimination), 24 vision testing, 25 hearing
and balance testing. Shell, styles, saving and printing come from
lab-worksheet-week04.html, so it behaves like the Week 4 worksheet.

Run: python3 tools/build_lab_week05_neuro.py
"""
import html, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = (ROOT / "lab-worksheet-week04.html").read_text(encoding="utf-8")
e = lambda s: html.escape(s, quote=False)

U = "https://neurologicexam.med.utah.edu/adult/html/"
UTAH_INDEX = U + "site_index_by_exam.html"
UTAH_CN_N, UTAH_CN_A, UTAH_MOT_A = U + "cranialnerve_normal.html", U + "cranialnerve_abnormal.html", U + "motor_abnormal.html"

def ulink(url, text):
    return '<a href="%s" target="_blank" rel="noopener">%s<span class="vh"> (University of Utah, opens in a new tab)</span></a>' % (url, e(text))

def field(fid, label, tall=False):
    return ('<div class="q"><label for="%s">%s</label><textarea id="%s" name="%s"%s></textarea></div>\n'
            % (fid, label, fid, fid, ' class="tall"' if tall else ""))

def draw(task):
    return '<div class="draw" role="img" aria-label="Empty box for your drawing: %s"><span class="dlab">Draw it on paper: %s</span></div>\n' % (e(task), e(task))

def table(head, rows, rid):
    h = "".join('<th scope="col">%s</th>' % e(x) for x in head) + '<th scope="col">Your partner</th>'
    body = ""
    for i, r in enumerate(rows):
        cells = "".join(('<th scope="row">%s</th>' if j == 0 else "<td>%s</td>") % e(c) for j, c in enumerate(r))
        fid = "%s%d" % (rid, i + 1)
        body += ('<tr>%s<td><label class="vh" for="%s">Your partner\'s result: %s</label>'
                 '<input type="text" id="%s" name="%s"></td></tr>\n' % (cells, fid, e(r[0]), fid, fid))
    return '<div class="tbl"><table><thead><tr>%s</tr></thead><tbody>\n%s</tbody></table></div>\n' % (h, body)

def abnormal(pid, where, example):
    return ('<div class="abn"><h3>One abnormal finding, and what it means</h3>\n'
            '<p>%s %s</p>\n' % (where, example) +
            field(pid + "x1", "What did you see? Describe the finding in plain words, and say which side.") +
            field(pid + "x2", "Which structure is damaged, and on which side? Name the nerve, nucleus or tract, and where its cell bodies are.") +
            field(pid + "x3", "Is this an upper motor neuron, lower motor neuron, sensory or cerebellar problem? What in the finding tells you?", True) +
            '</div>\n')

PARTS = []

PARTS.append(("p1", "Part 1. Mental status", "About 5 minutes",
  "<p>Every neurological exam starts here, because a person who is confused cannot give reliable answers on the rest. You are checking the cerebral cortex as a whole.</p>",
  ["Test", "What it checks", "Normal"],
  [["Orientation", "Ask their name, where they are, the date, and why they are here", "Correct on all four: person, place, time, situation"],
   ["Attention", "Spell WORLD backward, or count back from 100 by 7s", "D L R O W, or 93, 86, 79, 72, 65"],
   ["Memory", "Say three words, then ask for them again after 5 minutes", "All three recalled"],
   ["Language", "Name two objects you point to, and repeat a sentence", "Names both, repeats it exactly"]],
  None,
  abnormal("p1", "Open the " + ulink(UTAH_INDEX, "NeuroLogic Exam site index") + ", find Mental Status Exam, and choose Abnormal Examples.",
           "Pick one patient. This week's patient, Camila, was charted with a Glasgow Coma Scale of 13 on her first morning, so watch for what a reduced level of consciousness looks like.")))

PARTS.append(("p2", "Part 2. Cranial nerves", "About 20 minutes",
  "<p>The twelve cranial nerves carry sensation and movement for the head and neck, and Table 10.1 in your textbook lists each one as sensory, motor or mixed. Most of their nuclei, the clusters of cell bodies in the brainstem, sit in a predictable order from top to bottom: III and IV in the midbrain, V, VI, VII and VIII in the pons, and IX, X and XII in the medulla. CN I and II connect straight to the forebrain, and CN XI comes from the upper cervical spinal cord. Watch the "
  + ulink(UTAH_CN_N, "normal cranial nerve exam videos") + " before you try it on your partner.</p>"
  "<p class=\"safe\">Use your phone flashlight for the pupils only for a second or two at a time. Skip the gag reflex: you will see it in the video instead.</p>",
  ["Nerve", "How you test it", "Where the cell bodies are", "Normal"],
  [["I olfactory", "Eyes closed, one nostril blocked, identify coffee or soap", "Olfactory receptor neurons in the nasal epithelium", "Identifies it, each side"],
   ["II optic", "Read small print one eye at a time; count fingers in each quarter of their vision; light in one eye", "Retinal ganglion cells", "Reads it; sees fingers in all four quarters; both pupils constrict"],
   ["III, IV, VI", "Follow your finger in an H with their eyes, head still", "III and IV: midbrain. VI: pons", "Both eyes move together fully, no double vision"],
   ["V trigeminal", "Light touch on forehead, cheek and jaw; clench the teeth and feel the masseter", "Sensory: trigeminal ganglion. Motor: pons", "Feels all three areas equally; masseters firm on both sides"],
   ["VII facial", "Raise the eyebrows, close the eyes tight, smile, puff the cheeks", "Motor nucleus in the pons", "Both sides move equally"],
   ["VIII vestibulocochlear", "Rub your fingers beside each ear", "Spiral and vestibular ganglia; nuclei at the pons and medulla", "Hears it equally on both sides"],
   ["IX, X", "Say ah and watch the soft palate and uvula", "Medulla", "Palate rises evenly, uvula stays in the midline"],
   ["XI accessory", "Shrug against your hands; turn the head against your hand", "Upper cervical spinal cord", "Strong and equal"],
   ["XII hypoglossal", "Stick the tongue straight out, then push it into each cheek", "Medulla", "Tongue comes out in the midline, strong both ways"]],
  "a brainstem from the side as three stacked boxes, midbrain, pons and medulla, with the upper cervical cord below. Write each cranial nerve from III to XII beside the level where its nucleus sits.",
  abnormal("p2", "Open the " + ulink(UTAH_CN_A, "abnormal cranial nerve exam videos") + " and pick one.",
           "Good choices: the 6th nerve palsy and the 3rd nerve palsy under Versions, the 12th nerve lesion, or the 9th and 10th nerve deficit. A cranial nerve or its nucleus is a lower motor neuron, so think about which side the weakness is on.")))

PARTS.append(("p3", "Part 3. Motor", "About 10 minutes",
  "<p>The motor exam follows the corticospinal pathway from the last unit: an upper motor neuron with its cell body in the motor cortex, crossing at the bottom of the medulla, and a lower motor neuron with its cell body in the ventral horn of the spinal cord. Look first, then feel, then test.</p>"
  "<p>Strength is graded from 0 to 5: 0 no contraction, 1 a flicker, 2 moves only with gravity removed, 3 moves against gravity, 4 moves against some resistance, 5 normal strength.</p>",
  ["Test", "How you do it", "Normal"],
  [["Bulk", "Compare the muscles of the two sides by eye", "Equal, no wasting, no twitching under the skin"],
   ["Tone", "Partner relaxed; bend and straighten the elbow and knee slowly", "Slight, even resistance; not floppy, not stiff"],
   ["Strength", "Push against shoulders, elbows, wrists, hips, knees and ankles, one side then the other", "5 of 5, equal on both sides"],
   ["Pronator drift", "Arms straight out, palms up, eyes closed, for 20 seconds", "Both arms stay level, palms stay up"]],
  "the corticospinal pathway from the motor cortex to a muscle of the right hand. Mark the upper motor neuron's cell body, where it crosses, and the lower motor neuron's cell body.",
  abnormal("p3", "Watch an abnormal example from the " + ulink(UTAH_INDEX, "site index") + ": under Motor Exam, choose Abnormal Examples.",
           "Ask yourself whether the weakness comes with high tone and brisk reflexes, or with low tone, wasting and twitching. That one question separates upper from lower motor neuron.")))

PARTS.append(("p4", "Part 4. Reflexes and reaction time", "About 20 minutes",
  "<p>Each tendon reflex tests one reflex arc and the segments of the cord that run it. Tap the tendon briskly with the side of your fingers or the rubber edge of a kitchen spatula. Grade each reflex 0 to 4+: 0 absent, 1+ less than usual, 2+ normal, 3+ brisker than usual, 4+ very brisk, often with clonus. Compare left with right.</p>"
  "<p>If a reflex is hard to get, try the Jendrassik maneuver: your partner hooks the fingers of both hands and pulls hard at the moment you tap.</p>",
  ["Reflex", "Where you tap", "Cord segments", "Normal"],
  [["Biceps", "Your thumb on the biceps tendon at the inner elbow; tap your thumb", "C5 and C6", "2+, elbow bends a little"],
   ["Triceps", "Just above the elbow at the back, arm hanging bent", "C7", "2+, elbow straightens a little"],
   ["Patellar (knee jerk)", "Just below the kneecap, legs dangling", "L2 to L4", "2+, the leg kicks"],
   ["Achilles (ankle jerk)", "The heel cord, foot held slightly bent up", "S1", "2+, the foot points down"],
   ["Plantar response", "Stroke the outer edge of the sole firmly, heel to toes, with a capped pen", "Corticospinal tract and S1", "Toes curl down"],
   ["Ruler drop", "Drop a ruler between their fingers without warning, 5 tries; record the average in cm", "Eyes, brain, cord, hand", "About 10 to 20 cm, which is about 140 to 200 ms"]],
  "the reflex arc for the knee jerk on a spinal cord cross section, with all five parts labeled and the synapse counted. Beside it, draw the much longer path for catching the ruler.",
  abnormal("p4", "Open the " + ulink(UTAH_MOT_A, "abnormal motor exam videos") + " and watch the tendon reflexes or the pathological reflexes.",
           "Convert your ruler distance to time with milliseconds = 45.15 times the square root of the centimeters, and in your interpretation say why a reflex can never be as slow as your reaction time.")))

PARTS.append(("p5", "Part 5. Sensory", "About 15 minutes",
  "<p>Two pathways carry body sensation, and the exam tests them separately. Pain and temperature travel in the spinothalamic tract, which crosses in the spinal cord. Fine touch, vibration and joint position travel in the dorsal columns, which cross in the medulla. Both start with a sensory neuron whose cell body is in a dorsal root ganglion. Keep your partner's eyes closed for every test.</p>"
  "<p class=\"safe\">For sharp, use the point of a clean toothpick or an opened paperclip and press only until it feels sharp. Never break the skin. Use a fresh point for each person.</p>",
  ["Test", "How you do it", "Pathway", "Normal"],
  [["Light touch", "A wisp of tissue on the back of each hand and the top of each foot", "Dorsal columns, with some in the spinothalamic tract", "Feels it everywhere, equal on both sides"],
   ["Sharp or dull", "Mix the point and the blunt end; partner says sharp or dull", "Spinothalamic", "Correct every time, both sides"],
   ["Joint position", "Hold the big toe by its sides and move it a little up or down", "Dorsal columns", "Says up or down correctly"],
   ["Two-point discrimination", "Two points of a bent paperclip at the fingertip and the forearm; find the smallest gap felt as two", "Dorsal columns; small receptive fields", "A few millimeters at the fingertip, several centimeters on the forearm"],
   ["Romberg test", "Feet together, arms at the sides, eyes open then closed, for 30 seconds each, standing right next to you", "Joint position sense, with vision and balance", "Steady with the eyes closed too"]],
  "the spinothalamic tract and the dorsal column pathway from the right foot to the cortex, in two colors. Mark each dorsal root ganglion and the level where each pathway crosses.",
  abnormal("p5", "In the " + ulink(UTAH_INDEX, "site index") + ", under Sensory Exam, choose Abnormal Examples and pick one.",
           "A Romberg test that is steady with the eyes open but unsteady with them closed points to lost joint position sense, not to the cerebellum. Decide which pathway your example has lost.")))

PARTS.append(("p6", "Part 6. Coordination and gait", "About 10 minutes",
  "<p>The cerebellum smooths and times movement, and each side of the cerebellum controls the same side of the body. These tests look for errors in aim, rhythm and balance. Stand beside your partner during the gait tests.</p>",
  ["Test", "How you do it", "Normal"],
  [["Finger to nose", "Touch your finger, then their own nose, back and forth, as you move your finger", "Smooth and accurate, no shaking as the finger arrives"],
   ["Rapid alternating movements", "Pat the thigh with the palm, then the back of the hand, as fast as possible", "Fast and even on both sides"],
   ["Heel to shin", "Lying or sitting, run one heel down the other shin", "Stays on the shin, smooth"],
   ["Gait", "Walk normally, then on the heels, then on the toes", "Even steps, arms swing, steady"],
   ["Tandem walk", "Walk heel to toe along a straight line", "Stays on the line without stepping off"]],
  None,
  abnormal("p6", "In the " + ulink(UTAH_INDEX, "site index") + ", under Coordination Exam or Gait Exam, choose Abnormal Examples and pick one.",
           "If the problem is on one side, decide which side of the cerebellum is damaged, and remember that, unlike the motor cortex, each side of the cerebellum works on its own side of the body.")))


PARTS.append(("p7", "Part 7. The special senses", "About 25 minutes",
  "<p>PhysioEx has no exercise on the special senses, so this part is hands-on. Each test shows one idea from the vision and hearing, balance, taste and smell walkthroughs. Do each test on yourself first, then on your partner.</p>"
  "<p class=\"safe\">Shine the flashlight for a second or two at a time. Do the balance test standing next to a wall or a counter you can grab.</p>"
  "<div class=\"target\" role=\"img\" aria-label=\"Blind spot target: a plus sign on the left and a solid dot on the right, about 7.5 centimeters apart\"><span>+</span><span>&#9679;</span></div>",
  ["Test", "How you do it", "What it shows", "Normal"],
  [["Blind spot", "Cover the left eye. Stare at the + above with the right eye, at arm's length, and slowly bring the page closer. Measure the distance when the dot disappears", "The optic disc, where the optic nerve leaves, has no photoreceptors", "The dot vanishes at one distance, then comes back as you get closer"],
   ["Near point", "Cover one eye. Bring small print toward the open eye until it blurs. Measure eye to page in cm", "Accommodation: how round the lens can get", "About 10 cm at age 20, farther with age as the lens stiffens"],
   ["Pupils, light", "Dim room. Shine the light into one eye and watch both pupils", "Pupillary light reflex: CN II in, midbrain, CN III out to both eyes", "Both pupils constrict, equally"],
   ["Pupils, near", "Have your partner look from across the room to your fingertip 20 cm from their nose", "The near response: eyes turn in, pupils constrict, lens rounds up", "Both eyes turn in and both pupils get smaller"],
   ["Humming Weber", "Hum steadily. Then press a finger into one ear canal and keep humming", "Blocking the canal imitates a conductive hearing loss", "Centered with both ears open; louder in the blocked ear"],
   ["Flavor with the nose held", "Hold the nose, chew a flavored jelly bean or candy, and name the flavor. Then let go", "Flavor needs smell as well as taste", "Only sweet with the nose held; the flavor appears when you let go"],
   ["Smell adaptation", "Sniff coffee or soap every 10 seconds for 1 minute; rate it 0 to 10 each time", "Olfactory receptors adapt to a steady odor", "The rating falls over the minute"],
   ["One-leg stand", "Stand on one leg beside a wall, eyes open, then eyes closed; time each up to 30 seconds", "Balance combines vision, the vestibular system and joint position sense", "Shorter with the eyes closed"]],
  "the visual pathway from both eyes through the chiasm to the cortex, and mark where the blind spot is in the right eye's retina and in its visual field.",
  abnormal("p7", "Open the " + ulink(UTAH_CN_A, "abnormal cranial nerve exam videos") + " and watch the Cranial Nerve 2 visual fields example or the Cranial Nerve 8 Weber and Rinne example.",
           "Use what your own humming Weber test showed you to explain which way the sound goes and what that says about the lesion.")))

def section(pid, title, time, intro, head, rows, drawing, abn):
    out = ['<section class="card" aria-labelledby="h-%s">\n<h2 id="h-%s">%s</h2>\n<p class="meta">%s</p>\n%s\n' % (pid, pid, e(title), e(time), intro)]
    out.append("<h3>What you test, and what is normal</h3>\n" + table(head, rows, pid + "r"))
    if drawing:
        out.append("<h3>Draw the pathway</h3>\n" + draw(drawing))
    out.append(abn)
    return "".join(out) + "</section>\n"

CSS = """
/* Week 5 neuro exam lab, Oct 4 2026 */
.tbl{overflow-x:auto;margin:0 0 14px}
table{border-collapse:collapse;width:100%;font-size:15px;background:#fff}
th,td{border:1px solid var(--line-control);padding:7px 9px;text-align:left;vertical-align:top}
thead th{background:var(--navy-tint,#ECEFF4)}
td input{width:100%;box-sizing:border-box;min-height:40px;padding:6px 8px;border:1px solid var(--line-control);border-radius:4px;font:15px/1.4 var(--body)}
.draw{border:1px solid var(--line-control);border-radius:8px;min-height:230px;padding:10px 12px;margin:0 0 14px;background:#fff}
.dlab{font-size:14px;color:#414B5C}
.abn h3{margin-top:10px}
.safe{font-size:15px;color:#414B5C}
textarea.tall{min-height:8em}
.target{display:flex;gap:7.5cm;align-items:center;font-size:30px;font-weight:800;margin:6px 0 12px;color:#000}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media print{td input{border:0;border-bottom:1px solid #000;border-radius:0}.draw{min-height:2.6in;border:1px solid #000;break-inside:avoid}table{font-size:9pt}th,td{border:1px solid #000}}
"""

def build():
    s = SRC
    i = s.index("</style>"); s = s[:i] + CSS + s[i:]
    a = s.index('<main id="main">'); b = s.index("</main>") + len("</main>")
    main = ['<main id="main"><div class="wrap">\n<header class="pagehead">\n'
            '<p class="mm-eyebrow">Week 5 lab</p>\n<h1 class="mm-display">The <span>neurological exam</span>.</h1>\n'
            '<p class="meta"><strong>2 to 3 hours.</strong> Graded. Investigate It, 25 percent of your grade across the term.</p>\n'
            '<p>This week you run the parts of a real neurological exam on a partner: mental status, the cranial nerves, motor, reflexes, sensory, and coordination and gait. Then you test the special senses by hand. For every part you write down what the test checks and what normal looks like, and you draw the pathway it tests. Then you watch one patient with an abnormal finding in the University of Utah NeuroLogic Exam videos and work out where the problem is.</p>\n'
            '<p>The videos come from NeuroLogic Exam: An Anatomical Approach, by the University of Utah, shared under a Creative Commons license. ' + ulink(UTAH_INDEX, "The whole site, listed by exam") + '. Each part of the exam has a Normal Exam and an Abnormal Examples page.</p>\n</header>\n'
            '<section class="card" aria-labelledby="h-need">\n<h2 id="h-need">What you need</h2>\n<ul>\n'
            '<li>A partner who agrees to be examined. A family member or a friend is fine. You are learning the exam, not diagnosing anyone.</li>\n'
            '<li>Your phone flashlight, a tissue, coffee or soap to smell, a flavored jelly bean or hard candy, a clean toothpick or an opened paperclip, a capped pen, a ruler, and a rubber kitchen spatula if you have one.</li>\n'
            '<li>Paper and a pen for the five drawings, or the printed worksheet. You can type everything else on this page.</li>\n</ul>\n'
            '<p class="safe">This is practice of an exam, not a medical test, and nothing here can tell you whether anything is wrong with your partner. If you notice something that worries you, that is a question for a clinician.</p>\n</section>\n'
            '<section class="card" aria-labelledby="h-name">\n<h2 id="h-name">Your name</h2>\n'
            + field("stuname", "Your name") + field("partner", "Who you examined (first name or relationship is enough)") + '</section>\n']
    for p in PARTS:
        main.append(section(*p))
    main.append('<section class="card" aria-labelledby="h-look">\n<h2 id="h-look">Look back at your thinking</h2>\n'
                + field("m1", "Before you started, which part of the exam did you expect to be hardest to do, and why?")
                + field("m2", "Which abnormal finding was hardest to place, and what finally told you where the problem was?", True)
                + field("m3", "Name one thing you would do differently the next time you examine someone.")
                + '</section>\n'
                '<section class="card" aria-labelledby="h-turn">\n<h2 id="h-turn">Turn it in</h2>\n'
                '<p>Save this page as a PDF with the button below. Photograph your five drawings. If you worked on the printed worksheet, scan or photograph every page instead. Combine the PDF and the photos into one PDF and upload it to the Week 5 lab assignment in Canvas. Due Sunday, October 11 at 10:00 pm.</p>\n'
                '<button type="button" class="mm-btn" id="printBtn">Print or save as PDF</button>\n<p id="saved" aria-live="polite">Your answers save on this device as you type.</p>\n</section>\n</div></main>')
    s = s[:a] + "".join(main) + s[b:]
    s = re.sub(r"<title>[^<]*</title>", "<title>Week 5 lab, the neurological exam &middot; BIO 005 Human Physiology</title>", s, 1)
    for x, y in [("lab-worksheet-week04", "lab-week05-neuro-exam"), ("week-04-entry.html", "week-05-entry.html"),
                 ("Week 4", "Week 5"), ("week04", "week05"), ("w04", "w05"), ("week-04-lab", "week-05-neuro-lab"),
                 ('"textarea, input[type=radio], input[type=checkbox]"', '"textarea, input[type=text], input[type=radio], input[type=checkbox]"'), ('"bio005-w05-lab"', '"bio005-w05-neuro-lab"')]:
        s = s.replace(x, y)
    for bad in ("\u2014", "<em", "<i>", "Lora", "font-style:italic"):
        assert bad not in s, bad
    (ROOT / "lab-week05-neuro-exam.html").write_text(s, encoding="utf-8")
    print("built lab-week05-neuro-exam.html")

if __name__ == "__main__":
    build()
