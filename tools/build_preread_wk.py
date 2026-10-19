#!/usr/bin/env python3
"""
tools/build_preread_wk.py

Builds week-06-preread.html and week-07-preread.html. Oct 17 2026.

Same page as week-05-preread.html: the same head, styles, brand bar, footer,
save-as-you-type script, print copies, height sender and paste blocking
(bio005-nopaste.js). Only the content inside <main> changes, and it comes from
the WEEKS data below.

One difference from Week 5 on purpose: the figures are named by what they
show, not by figure number, because the 9th edition figure numbers for these
chapters have not been checked yet. Students find each one with the search
in their eText.

Run: python3 tools/build_preread_wk.py 6   (or 7, or no number for both)
"""
import html, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
from week_label import relabel
SHELL = (ROOT / "week-05-preread.html").read_text(encoding="utf-8")
OPENSTAX = "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction"

def e(s): return html.escape(s, quote=False)

GOAL_OPTS = [("new", "This is new to me"), ("heard", "I have heard of it"), ("explain", "I could explain it now")]

WEEKS = {
 6: dict(
  title="Muscle, and how movement gets commanded",
  desc="Week 6 pre-read worksheet for BIO 005: skeletal muscle and the control of movement.",
  intro=("This is a quick look ahead, not a full read. Look at the headings and the figures, answer the questions below in a few words, and move on. "
         "You will learn all of it properly in the walkthroughs, and it will make much more sense because you have already seen it once. "
         "<strong>This week covers parts of three chapters: Chapter 13 (muscles), Chapter 12 (the motor neuron and the neuromuscular junction), "
         "and the rest of Chapter 14 (how the brain commands a movement).</strong>"),
  where=[
   "<strong>Read closely, Silverthorn Chapter 13, Muscles:</strong> the whole section on skeletal muscle, and the section on the mechanics of body movement. That covers how a muscle is built, how a nerve signal makes it contract, where its energy comes from, fatigue, fiber types, twitches and motor units. The sections on smooth muscle and cardiac muscle come later in the course, with the heart, so skip them for now.",
   "<strong>Read, Silverthorn Chapter 12, Efferent Division: Autonomic and Somatic Motor Control:</strong> only the section on the somatic motor division, which covers the motor neuron and the neuromuscular junction. The autonomic part of this chapter is next week.",
   "<strong>Read, Silverthorn Chapter 14, Integrative Physiology I: Control of Body Movement:</strong> the section on the integrated control of body movement, which comes after the reflexes you read last week. It covers how the brain plans, starts and adjusts a movement. Skip the last section, on movement in visceral muscles.",
  ],
  ostax=[
   ("10.2 Skeletal Muscle.", "How a skeletal muscle is built, from the whole muscle down to the sarcomere."),
   ("10.3 Muscle Fiber Contraction and Relaxation.", "How the filaments slide, what calcium does, and where the energy comes from."),
   ("10.4 Nervous System Control of Muscle Tension.", "Twitches, summation, tetanus, motor units and the length of the muscle."),
   ("10.5 Types of Muscle Fibers.", "Slow and fast fibers and what each one is good for."),
   ("10.6 Exercise and Muscle Performance.", "What training and disuse do to a muscle."),
   ("14.3 Motor Responses.", "How the brain and spinal cord command and adjust a movement."),
  ],
  figs=[
   ("Chapter 13, skeletal muscle", [
    ("The levels of a skeletal muscle.", "The figure that goes from the whole muscle to a bundle of fibers, one fiber, a myofibril and the thick and thin filaments. Find the T tubules and the sarcoplasmic reticulum around each myofibril."),
    ("The sarcomere.", "Find the Z disc at each end, the dark A band where the thick filaments are, and the light I band that has only thin filaments."),
    ("The thin filament.", "Find actin, the long tropomyosin strand that lies along it, and troponin, the small complex that holds tropomyosin in place."),
    ("Excitation-contraction coupling.", "Follow the action potential down the T tubule. Find the two receptors that touch each other there, one in the T tubule and one in the sarcoplasmic reticulum."),
    ("The crossbridge cycle.", "Find the step where ATP binds to the myosin head and the step where ATP is split. They are not the same step."),
    ("The muscle twitch.", "Line up the muscle action potential with the tension it makes. Find the latent period."),
    ("Summation and tetanus.", "Compare a single twitch, unfused tetanus and fused tetanus."),
    ("The length-tension relationship.", "Find the sarcomere length that gives the most tension."),
   ]),
   ("Chapter 12, the neuromuscular junction", [
    ("The neuromuscular junction.", "Number the events in order, from the action potential arriving at the axon terminal to the muscle fiber firing its own action potential."),
   ]),
   ("Chapter 14, control of movement", [
    ("The integration of movement.", "Find what the cerebellum and the basal ganglia each add, and where the command leaves the brain for the spinal cord."),
   ]),
  ],
  goals=[
   ("Muscle and the neuromuscular junction (Chapters 13 and 12)", [
    "Trace a signal from a motor neuron across the neuromuscular junction to an action potential in the muscle fiber.",
    "Explain how that action potential releases calcium inside the fiber, and how calcium switches on contraction.",
    "Put the steps of the crossbridge cycle in order and say where ATP is used.",
    "Explain what ends a contraction and lets the muscle relax.",
    "Explain how a muscle makes a small force or a large one: twitches, summation and motor units.",
    "Compare the three kinds of muscle fiber and the three ways a muscle makes ATP, and explain fatigue.",
   ]),
   ("Control of movement (Chapter 14)", [
    "Describe how the brain plans, starts and adjusts a movement, and what the cerebellum and basal ganglia each do.",
    "Tell an upper motor neuron problem from a lower motor neuron problem by tone, reflexes and muscle size.",
   ]),
  ],
  find=[
   ("Muscle and the neuromuscular junction (Chapters 13 and 12)", [
    ("What is a motor unit? Why do the muscles that move your eyes have small motor units?", "In Chapter 13, the part on motor units. Search your eText for motor unit."),
    ("At the neuromuscular junction, what neurotransmitter is released, what kind of receptor does it bind, and which way do sodium ions move?", "In Chapter 12, the section on the somatic motor division. Search for neuromuscular junction."),
    ("Name the receptor in the T tubule and the receptor in the sarcoplasmic reticulum that work together to release calcium.", "In Chapter 13, the part on excitation-contraction coupling. Search for ryanodine."),
    ("What does calcium bind to, and what does that binding move out of the way?", "In Chapter 13, the part on how calcium starts contraction. Search for troponin."),
    ("In the crossbridge cycle, what does the binding of ATP do to the myosin head? What does splitting ATP do?", "In Chapter 13, the part on the crossbridge cycle. Search for power stroke."),
    ("What is rigor mortis, and why does it happen?", "Same part of Chapter 13. Search for rigor."),
    ("What is the latent period of a muscle twitch, and what is happening inside the fiber during it?", "In Chapter 13, the part on the muscle twitch. Search for latent period."),
    ("What is the difference between unfused (incomplete) tetanus and fused (complete) tetanus?", "In Chapter 13, the part on summation. Search for tetanus."),
    ("Name the three kinds of skeletal muscle fiber. Which one resists fatigue best, and why?", "In Chapter 13, the part on fiber types. Look for the table that compares them."),
    ("What is the difference between an isotonic and an isometric contraction? Give an example of each.", "In Chapter 13, the section on the mechanics of body movement. Search for isometric."),
   ]),
   ("Control of movement (Chapter 14)", [
    ("What does the cerebellum add to a movement, and what do the basal ganglia add?", "In Chapter 14, the section on the integrated control of body movement. Search for cerebellum."),
   ]),
  ],
  words=["Sarcomere", "Motor unit", "End plate potential", "Excitation-contraction coupling", "Crossbridge", "Tetanus", "Recruitment", "Creatine phosphate", "Muscle fatigue", "Corticospinal tract"],
 ),
 7: dict(
  title="Hormones, the autonomic system, and reproduction",
  desc="Week 7 pre-read worksheet for BIO 005: the autonomic nervous system, hormones and reproduction.",
  intro=("This is a quick look ahead, not a full read. Look at the headings and the figures, answer the questions below in a few words, and move on. "
         "You will learn all of it properly in the walkthroughs, and it will make much more sense because you have already seen it once. "
         "<strong>This week covers parts of three chapters: Chapter 12 (the autonomic nervous system), Chapter 8 (how hormones work, and the hypothalamus and pituitary), "
         "and Chapter 26 (reproductive hormones, pregnancy and birth).</strong> Every section below has a part for each."),
  where=[
   "<strong>Read closely, Silverthorn Chapter 12, Efferent Division: Autonomic and Somatic Motor Control:</strong> the section on the autonomic division. That covers the two branches, sympathetic and parasympathetic, where they leave the spinal cord, their neurotransmitters and receptors, the adrenal medulla, and how drugs act on them. You read the somatic motor part last week.",
   "<strong>Read closely, Silverthorn Chapter 8, Introduction to the Endocrine System:</strong> the whole chapter. It covers what makes a chemical a hormone, the three chemical classes of hormones, how hormone release is controlled, the hypothalamus and the pituitary gland, how hormones interact, and what happens when an endocrine gland makes too much or too little.",
   "<strong>Then, Silverthorn Chapter 26, Reproduction and Development:</strong> read the parts on male reproduction, female reproduction and the menstrual cycle, and pregnancy, labor and delivery, and milk production. Skim the rest of the chapter. The walkthroughs teach what you need from it.",
  ],
  ostax=[
   ("15.1 Divisions of the Autonomic Nervous System.", "The two branches, where they leave the spinal cord, and their neurotransmitters and receptors."),
   ("15.2 Autonomic Reflexes and Homeostasis.", "How the two branches work against each other in the same organ."),
   ("15.4 Drugs that Affect the Autonomic System.", "What blocking or copying a neurotransmitter does."),
   ("17.1 An Overview of the Endocrine System and 17.2 Hormones.", "What hormones are, their chemical classes, how they travel and how their release is controlled."),
   ("17.3 The Pituitary Gland and Hypothalamus.", "The two halves of the pituitary and how the hypothalamus controls each one."),
   ("27.1 and 27.2, the male and female reproductive systems.", "Read the parts on how hormones control sperm production, the ovarian cycle and the uterine cycle."),
   ("28.4 Maternal Changes During Pregnancy, Labor, and Birth, and 28.6 Lactation.", "The hormones of pregnancy, labor and milk."),
  ],
  figs=[
   ("Chapter 12, the autonomic nervous system", [
    ("The two branches side by side.", "Find where each branch leaves the spinal cord and where its ganglia sit, close to the cord or close to the organ."),
    ("The neurotransmitters and receptors.", "Find the neurotransmitter at each synapse and ending, and which kind of receptor it binds."),
    ("The adrenal medulla.", "Find why it is called a modified sympathetic ganglion."),
   ]),
   ("Chapter 8, hormones and the pituitary", [
    ("The three classes of hormones.", "Compare peptide and steroid hormones: how they are made, stored, carried in the blood and where their receptors are."),
    ("The hypothalamus and the pituitary.", "Find the neurons that end in the posterior pituitary, and the small blood vessels, the portal system, that carry hormones to the anterior pituitary."),
    ("A feedback loop with three tiers.", "Follow a hormone from the hypothalamus to the anterior pituitary to a gland, and find the arrows that feed back."),
   ]),
   ("Chapter 26, reproduction", [
    ("The control of sperm production.", "Find which pituitary hormone acts on the Sertoli cells and which acts on the Leydig cells."),
    ("The menstrual cycle.", "Line up the hormone curves, the follicle in the ovary and the lining of the uterus on one time axis. Find the LH surge."),
    ("Labor.", "Find the positive feedback loop that drives contractions."),
   ]),
  ],
  goals=[
   ("The autonomic nervous system (Chapter 12)", [
    "Compare the somatic motor pathway with the two-neuron autonomic pathway.",
    "Compare the sympathetic and parasympathetic branches, and predict what each does to heart rate and to digestion.",
    "Match each autonomic receptor to its neurotransmitter, a place in the body and the response it makes, and predict what a drug that blocks one would do.",
   ]),
   ("Hormones and the pituitary (Chapter 8)", [
    "Sort a hormone as a peptide, steroid or amine, and explain how its class decides how it is stored, carried and received.",
    "Explain why one hormone can act differently in different tissues, and how hormones can work together or against each other.",
    "Trace a hormone axis from the hypothalamus to the pituitary to a gland, with its feedback, and tell a primary disorder from a secondary one.",
   ]),
   ("Reproduction (Chapter 26)", [
    "Explain how hormones control sperm production, the ovarian and uterine cycles, pregnancy, labor and milk.",
   ]),
  ],
  find=[
   ("The autonomic nervous system (Chapter 12)", [
    ("Which branch has its ganglia close to the spinal cord, and which has its ganglia close to or inside the organ?", "In Chapter 12, the section on the autonomic division. Search for sympathetic chain."),
    ("What neurotransmitter do all preganglionic autonomic neurons release, and what kind of receptor does it bind on the next neuron?", "In Chapter 12, the part on autonomic neurotransmitters. Search for nicotinic."),
    ("Which receptor does norepinephrine bind on the heart, and what happens to heart rate when it does?", "In Chapter 12, the part on adrenergic receptors. Search for beta 1 or beta-1."),
    ("Why is the adrenal medulla called a modified sympathetic ganglion?", "In Chapter 12, the part on the adrenal medulla."),
   ]),
   ("Hormones and the pituitary (Chapter 8)", [
    ("Name the three chemical classes of hormones and give one example of each.", "In Chapter 8, the part on the classification of hormones."),
    ("Why do steroid hormones travel in the blood bound to carrier proteins, and what does that do to how long they last?", "In Chapter 8, the part on steroid hormones. Search for half-life."),
    ("How is the anterior pituitary different from the posterior pituitary? Which one is really part of the brain?", "In Chapter 8, the part on the pituitary gland."),
    ("What is the hypothalamic-hypophyseal portal system, and why does the body need it?", "Same part of Chapter 8. Search for portal."),
    ("What is the difference between a primary and a secondary endocrine disorder?", "In Chapter 8, the part on endocrine pathologies. Search for secondary."),
   ]),
   ("Reproduction (Chapter 26)", [
    ("What do the Sertoli cells and the Leydig cells each do?", "In Chapter 26, the part on male reproduction. Search for Leydig."),
    ("What causes the LH surge in the middle of the menstrual cycle, and what does the surge set off?", "In Chapter 26, the part on the menstrual cycle. Search for LH surge."),
    ("Which hormone keeps the corpus luteum alive in early pregnancy, and what makes it?", "In Chapter 26, the part on pregnancy. Search for chorionic."),
   ]),
  ],
  words=["Preganglionic neuron", "Dual innervation", "Muscarinic receptor", "Half-life", "Down-regulation", "Trophic hormone", "Long-loop negative feedback", "Posterior pituitary", "Corpus luteum", "Positive feedback"],
 ),
}


def main_html(w, d):
    out = ['<main id="main"><div class="wrap">\n<header class="pagehead">\n'
           '  <p class="mm-eyebrow">Week %d, before the first pass</p>\n'
           '  <h1 class="mm-display">Week %d <span>pre-read</span>.</h1>\n'
           '  <p class="meta"><strong>About 30 minutes.</strong> Graded complete or incomplete. Do this before the first pass.</p>\n'
           '  <p>%s</p>\n</header>\n' % (w, w, d["intro"])]
    out.append('\n<section class="card" aria-labelledby="h-own">\n  <h2 id="h-own">Write every answer in your own words</h2>\n'
               '  <p>Do not copy from the book, the notes, a website, a classmate or an AI tool, even if you change a few words. Read the source, look away, and then write what you understood. If you cannot say it without looking, that tells you what to go back and study. Your own words, even rough ones, are what I want to see.</p>\n</section>\n')
    out.append('\n<section class="card" aria-labelledby="h-where">\n  <h2 id="h-where">Where to look</h2>\n'
               + "".join("  <p>%s</p>\n" % p for p in d["where"])
               + '  <p class="note">Chapter numbers are for the 9th edition. Other editions number things differently, so go by the chapter title and the topic, and use the search in your eText to find it.</p>\n</section>\n')
    out.append('\n<section class="card" aria-labelledby="h-openstax">\n  <h2 id="h-openstax">No Silverthorn textbook? Use OpenStax</h2>\n'
               '  <p>If you chose not to buy the textbook, use the free OpenStax book, <a href="%s" target="_blank" rel="noopener">Anatomy and Physiology 2e</a>, and do the same pre-read with it. Read these sections:</p>\n  <ul>\n' % OPENSTAX
               + "".join("    <li><strong>%s</strong> %s</li>\n" % (e(a), e(b)) for a, b in d["ostax"])
               + '  </ul>\n'
               '  <p><strong>About the figures.</strong> The figures listed on this page are the ones in Silverthorn. For each one, look for a picture of the same thing in those OpenStax sections. If you cannot find a matching picture, write your own list instead: on a sheet of paper, list each picture you did find in those sections and write one sentence about what it shows. Upload that page with your pre-read.</p>\n'
               '  <p>The Find it questions still work with OpenStax. Search the OpenStax sections for the same key words.</p>\n</section>\n')
    figs = ['\n<section class="card" aria-labelledby="h-figs">\n  <h2 id="h-figs">Figures to look at closely</h2>\n'
            '  <p class="lead">These are the most important figures for this week. Find each one in your eText by what it shows, using the search for the words in bold. Read its labels, and look for the thing named after it.</p>\n']
    for h, items in d["figs"]:
        figs.append('  <h3 class="sub">%s</h3>\n  <ul>\n' % e(h) + "".join("    <li><strong>%s</strong> %s</li>\n" % (e(a), e(b)) for a, b in items) + "  </ul>\n")
    figs.append("</section>\n")
    out.append("".join(figs))
    g = ['\n<section class="card" aria-labelledby="h-goals">\n  <h2 id="h-goals">What this reading should help you do</h2>\n'
         '  <p class="lead">Read each goal and pick the answer that fits you right now. There is no wrong answer here.</p>\n']
    n = 0
    for h, items in d["goals"]:
        g.append('  <h3 class="sub">%s</h3>\n' % e(h))
        for it in items:
            n += 1
            g.append('  <fieldset>\n    <legend>%s</legend>\n    <div class="choices">\n' % e(it)
                     + "".join('      <label><input type="radio" name="g%d" value="%s"> %s</label>\n' % (n, v, t) for v, t in GOAL_OPTS)
                     + "    </div>\n  </fieldset>\n")
    g.append("</section>\n")
    out.append("".join(g))
    f = ['\n<section class="card" aria-labelledby="h-find">\n  <h2 id="h-find">Find it</h2>\n'
         '  <p class="lead">Each answer is in the part of the chapter named. A few words is enough.</p>\n']
    n = 0
    for h, items in d["find"]:
        f.append('  <h3 class="sub">%s</h3>\n' % e(h))
        for q, where in items:
            n += 1
            f.append('  <div class="q">\n    <label for="f%d">%s</label>\n    <span class="where">%s</span>\n    <textarea id="f%d" name="f%d"></textarea>\n  </div>\n' % (n, e(q), e(where), n, n))
    f.append("</section>\n")
    out.append("".join(f))
    out.append('\n<section class="card" aria-labelledby="h-words">\n  <h2 id="h-words">Words to know</h2>\n'
               "  <p class=\"lead\">Find each term in the reading. Write what it means in your own words, not the book's. If you are working on paper, add a quick sketch. If you are typing, give one example instead.</p>\n"
               + "".join('  <div class="q"><label for="w%d"><span class="term">%s</span></label><textarea id="w%d" name="w%d"></textarea></div>\n' % (i + 1, e(t), i + 1, i + 1) for i, t in enumerate(d["words"]))
               + "</section>\n")
    out.append('\n<section class="card" aria-labelledby="h-know">\n  <h2 id="h-know">Before you start the walkthroughs</h2>\n'
               '  <div class="q">\n    <label for="k1">Which of this week\'s topics looks hardest to you right now, and why?</label>\n    <textarea id="k1" name="k1"></textarea>\n  </div>\n'
               '  <div class="q">\n    <label for="k2">Write one question you want the walkthroughs to answer.</label>\n    <textarea id="k2" name="k2"></textarea>\n  </div>\n</section>\n')
    out.append('\n<section class="card" aria-labelledby="h-turn">\n  <h2 id="h-turn">Turn it in</h2>\n'
               '  <p>Save this page as a PDF with the button below and upload it to the Week %d pre-read assignment in Canvas. If you worked on paper, upload a photo of your pages instead.</p>\n'
               '  <button type="button" class="mm-btn" id="printBtn">Print or save as PDF</button>\n'
               '  <p id="saved" aria-live="polite">Your answers save on this device as you type.</p>\n</section>\n</div></main>' % w)
    return "".join(out)


def build(w):
    d = WEEKS[w]
    s = SHELL
    a = s.index('<main id="main">'); b = s.index("</div></main>") + len("</div></main>")
    s = s[:a] + main_html(w, d) + s[b:]
    reps = [("<title>Week 5 pre-read &middot; BIO 005 Human Physiology</title>", "<title>Week %d pre-read &middot; BIO 005 Human Physiology</title>" % w),
            ('content="Week 5 pre-read worksheet for BIO 005: the resting membrane potential and neurons."', 'content="%s"' % d["desc"]),
            ('<a class="mm-back" href="week-05-entry.html" target="_top">&larr; Week 5 start page</a>', '<a class="mm-back" href="week-%02d.html" target="_top">&larr; Week %d</a>' % (w, w)),
            ('var KEY = "bio005-w05-preread";', 'var KEY = "bio005-w%02d-preread";' % w),
            ('var FRAME_ID = "bio005-week-05-preread";', 'var FRAME_ID = "bio005-week-%02d-preread";' % w)]
    for x, y in reps:
        assert s.count(x) == 1, x
        s = s.replace(x, y)
    assert "Week 5" not in s and "week-05" not in s, re.findall(r".{40}(?:Week 5|week-05).{40}", s)[:3]
    for bad in ("—", "<em", "<i>", "Lora"):
        assert bad not in s, bad
    (ROOT / ("week-%02d-preread.html" % w)).write_text(relabel(s), encoding="utf-8")
    print("built week-%02d-preread.html" % w)


if __name__ == "__main__":
    for w in ([int(sys.argv[1])] if len(sys.argv) > 1 else sorted(WEEKS)):
        build(w)
