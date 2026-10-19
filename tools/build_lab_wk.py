#!/usr/bin/env python3
"""
tools/build_lab_wk.py

Builds the Week 6 and Week 7 lab pages. Oct 17 2026.
  lab-week06-muscle.html     PhysioEx Exercise 2, all activities, plus a grip
                             fatigue count at home (the substitute for surface
                             EMG named in physioex-lab-map-fall2026.md)
  lab-week07-hormones.html   an autonomic test at home, PhysioEx Exercise 4
                             (glucose and insulin, hormone replacement, cortisol
                             and ACTH) and Exercise 12 (ELISA), a standard curve
                             to read, and the hormone cycle sheet
                             (lab-week08-hormone-cycle.html)

Same shell, saving, printing and paste blocking as the Week 4 and Week 5 lab
pages (lab-worksheet-week04.html, tools/build_lab_week05_neuro.py). The clinical
correlation and the three look-back questions come from bio005-lab-plan.js, so
the lab page and the lab plan say the same thing.

PhysioEx activities are named by topic, in the order PhysioEx lists them,
because Pearson sometimes renumbers them (physioex-lab-map-fall2026.md).

Run: python3 tools/build_lab_wk.py      (both weeks)
"""
import html, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import build_lab_week05_neuro as N
from week_label import relabel

SRC = (ROOT / "lab-worksheet-week04.html").read_text(encoding="utf-8")
e = N.e
field, table, draw = N.field, N.table, N.draw

OWN = ('<section class="card" aria-labelledby="h-own">\n  <h2 id="h-own">Write every answer in your own words</h2>\n  <p>Do not copy from the book, the notes, a website, a classmate or an AI tool, even if you change a few words. '
       'Read the source, look away, and then write what you understood. If you cannot say it without looking, that tells you what to go back and study. Your own words, even rough ones, are what I want to see.</p>\n</section>\n\n')
HOW = ('<section class="card" aria-labelledby="h-how">\n  <h2 id="h-how">What goes in each box</h2>\n  <ol class="steps">\n'
       '    <li><strong>What did you measure?</strong> Name what you changed and what you recorded, with units.</li>\n'
       '    <li><strong>What were your findings?</strong> Give the actual results, with numbers. What went up, what went down, and what stayed the same.</li>\n'
       '    <li><strong>What did you learn?</strong> Explain why the results came out that way, using the physiology from this week. This is the most important box.</li>\n  </ol>\n'
       '  <p class="note">Your worksheet is graded once PhysioEx shows each activity complete. The PhysioEx Lab Report that Pearson makes is not this worksheet and earns no points.</p>\n</section>\n')

CSS_ADD = """
/* Week 6 and 7 labs, Oct 17 2026 */
.act{margin:0 0 6px}
.rec{background:#fff;border-radius:8px;margin:6px 0 4px}
.rec .q label{color:var(--maroon-dark)}
td input{min-width:5em}
"""


def activity(pid, n, name, extra=""):
    return ('<section class="card" aria-labelledby="h-%s">\n<h2 id="h-%s">Activity %d</h2>\n<p class="act">%s</p>\n' % (pid, pid, n, e(name))
            + field(pid + "m", "What did you measure?") + field(pid + "f", "What were your findings?") + field(pid + "l", "What did you learn?", True)
            + (('<div class="rec">\n' + extra + '</div>\n') if extra else "") + '</section>\n')


def rows_table(head, rows, rid):
    """a table where the student fills every cell after the first column"""
    h = "".join('<th scope="col">%s</th>' % e(x) for x in head)
    body = ""
    for i, r in enumerate(rows):
        cells = '<th scope="row">%s</th>' % e(r)
        for j, col in enumerate(head[1:]):
            fid = "%s%d_%d" % (rid, i + 1, j + 1)
            cells += '<td><label class="vh" for="%s">%s, %s</label><input type="text" id="%s" name="%s"></td>' % (fid, e(r), e(col), fid, fid)
        body += "<tr>%s</tr>\n" % cells
    return '<div class="tbl"><table><thead><tr>%s</tr></thead><tbody>\n%s</tbody></table></div>\n' % (h, body)


def fixed_table(head, rows):
    h = "".join('<th scope="col">%s</th>' % e(x) for x in head)
    body = "".join("<tr>" + "".join(('<th scope="row">%s</th>' if j == 0 else "<td>%s</td>") % e(c) for j, c in enumerate(r)) + "</tr>\n" for r in rows)
    return '<div class="tbl"><table><thead><tr>%s</tr></thead><tbody>\n%s</tbody></table></div>\n' % (h, body)


def card(pid, title, inner, meta=None):
    return ('<section class="card" aria-labelledby="h-%s">\n<h2 id="h-%s">%s</h2>\n' % (pid, pid, e(title))
            + ('<p class="meta">%s</p>\n' % e(meta) if meta else "") + inner + '</section>\n')


def lookback(qs, big=1):
    return card("look", "Look back at your thinking", "".join(field("m%d" % (i + 1), e(q), i == big) for i, q in enumerate(qs)))


def turnin(w, due, extra):
    return ('<section class="card" aria-labelledby="h-turn">\n<h2 id="h-turn">Turn it in</h2>\n'
            '<p>Save this page as a PDF with the button below. %s If you worked on the printed worksheet, scan or photograph every page instead. '
            'Combine everything into one PDF and upload it to the Week %d lab assignment in Canvas. Due %s at 10:00 pm.</p>\n'
            '<button type="button" class="mm-btn" id="printBtn">Print or save as PDF</button>\n<p id="saved" aria-live="polite">Your answers save on this device as you type.</p>\n</section>\n'
            % (extra, w, due))


# ------------------------------------------------------------------ Week 6
def week6():
    parts = []
    parts.append(OWN)
    parts.append(card("need", "What you need",
        "<ul>\n<li>PhysioEx, from the Pearson link in Canvas. Open Exercise 2, Skeletal Muscle Physiology.</li>\n"
        "<li>For the grip test at home: a spring clothespin, the kind that pinches, and a timer such as the one on your phone. A partner to keep time helps but is not needed. No clothespin? Squeeze a tennis ball or a rolled-up pair of socks in your fist instead, and say which you used.</li>\n"
        "<li>Paper and a pen for your two graphs, or the printed worksheet. You can type everything else on this page.</li>\n</ul>\n"))
    parts.append(HOW)
    parts.append('<h2 class="parthead">Part 1. PhysioEx Exercise 2, Skeletal Muscle Physiology</h2>\n'
                 '<p>Run every activity in Exercise 2, in the order PhysioEx lists them. Pearson sometimes renumbers activities, so go by the topic named below.</p>\n')
    A = [
     ("a1", "The muscle twitch and the latent period", field("a1x", "How long was the latent period you measured, in milliseconds, and what is happening inside the fiber during it?")),
     ("a2", "The effect of stimulus voltage", field("a2x", "Your threshold voltage and your maximal voltage. In one or two sentences, say what happens to the force between them, and why, in terms of how many fibers are responding.")),
     ("a3", "The effect of stimulus frequency: treppe and wave summation", field("a3x", "The stimulus frequency, or the time between two stimuli, at which summation began.")),
     ("a4", "Tetanus", field("a4x", "The stimulus frequency at which tetanus was complete, with no dips left between stimuli. What is happening to calcium inside the fiber at that frequency?")),
     ("a5", "Fatigue", field("a5x", "How long it took the force to fall by the amount you chose, and what that amount was. Record the time, not just the shape of the trace.")),
     ("a6", "The length-tension relationship", draw("Your length-tension curve, by hand: muscle length on the x axis, active force on the y axis. Plot every point you took, enough to see both sides of the curve, and mark the resting length.")
                                                + field("a6x", "At which length was active force highest? Why does force fall at lengths shorter and longer than that?")),
     ("a7", "Isotonic contractions and the load-velocity relationship", field("a7x", "At which load did the muscle stop shortening, and what kind of contraction was it then?")),
    ]
    for i, (pid, name, x) in enumerate(A):
        parts.append(activity(pid, i + 1, name, x))
    clothes = ["0 to 15 seconds", "15 to 30 seconds", "30 to 45 seconds", "45 to 60 seconds", "60 to 75 seconds", "75 to 90 seconds",
               "90 to 105 seconds", "105 to 120 seconds", "After 2 minutes of rest, 15 seconds"]
    parts.append('<h2 class="parthead">Part 2. Grip fatigue, at home</h2>\n')
    parts.append(card("p2", "Squeeze until your hand tires",
        "<p>PhysioEx shows fatigue in an isolated muscle. This part shows it in yours. There is no surface EMG at home, so you count instead, and Part 2 asks what an EMG would have shown.</p>\n"
        '<ol class="steps">\n'
        "<li>Hold the clothespin between the tip of your thumb and the tip of your index finger of the hand you write with. Rest your forearm on a table.</li>\n"
        "<li>Start the timer. Squeeze the clothespin all the way closed and let it open, as fast as you can, for 2 minutes without stopping.</li>\n"
        "<li>Count the squeezes in every 15 seconds, or have your partner count while you squeeze, and write each count in the table.</li>\n"
        "<li>Put the clothespin down and rest for 2 minutes. Then count one more 15 seconds.</li>\n</ol>\n"
        '<p class="safe">A burning feeling in your forearm is expected and goes away with rest. Stop if you feel sharp pain, and skip this part if you have a hand or wrist injury. Say so on your worksheet instead.</p>\n'
        + rows_table(["Time", "Squeezes"], clothes, "g")
        + draw("Your fatigue graph, by hand: time on the x axis and squeezes per 15 seconds on the y axis, with the after-rest count as a separate point.")
        + field("g1", "Describe what happened to your count over the 2 minutes, with numbers. By how much did it fall from the first 15 seconds to the last?")
        + field("g2", "After 2 minutes of rest, how much came back? What does that tell you about the cause: something that recovers in minutes, or damage to the muscle?", True)
        + field("g3", "Suppose you had held the clothespin closed with the same steady force instead of squeezing it over and over. For a while the force would stay the same even as the muscle tired. What would your nervous system have to do to keep the force the same, and what would a surface EMG recording show as it did?", True)
        + field("g4", "Name one cause of fatigue inside the muscle fibers and one cause in the nervous system. Which one do you think limited your count, and why?", True)))
    parts.append('<h2 class="parthead">Part 3. Clinical correlation</h2>\n')
    parts.append(card("cc", "Sore on Wednesday, not on Monday",
        "<p>An athlete does a session of downhill running on Monday and feels fine that evening. Soreness begins Tuesday afternoon, peaks Wednesday and is gone by Friday. Blood lactate returns to its resting level within about an hour of any hard session. Downhill running loads the thigh muscles while they are lengthening.</p>\n"
        + field("c1", "Use the lactate time course to rule something out. Say plainly what it rules out.")
        + field("c2", "Name what a lengthening contraction does mechanically that a shortening one does not, and connect it to your length-tension curve from Activity 6.", True)
        + field("c3", "Explain the delay of about two days in terms of what has to happen after the damage before you feel it.", True)))
    parts.append(lookback(["What did you predict tetanus would look like before you produced one?",
                           "Where on your own length-tension curve did you expect peak force, and where was it?",
                           "Say one thing about muscle you believed on Monday that you would now state differently."]))
    parts.append(turnin(6, "Sunday, October 25", "Photograph your two graphs."))
    head = ('<header class="pagehead">\n<p class="mm-eyebrow">Week 6 lab</p>\n<h1 class="mm-display">How muscle <span>makes force</span>.</h1>\n'
            '<p class="meta"><strong>2 to 3 hours.</strong> Graded. Investigate It, 25 percent of your grade across the term.</p>\n'
            '<p>This week you run PhysioEx Exercise 2, Skeletal Muscle Physiology, where you stimulate an isolated muscle and record its twitches, summation, tetanus, fatigue, length-tension curve and load-velocity curve. Then you tire out your own hand with a clothespin and compare. Last, one clinical case puts the simulation back into a real body.</p>\n</header>\n')
    return head + "".join(parts)


# ------------------------------------------------------------------ Week 7
STD = [("0", "0.05"), ("0.5", "0.15"), ("1", "0.25"), ("2", "0.45"), ("5", "1.05"), ("10", "1.85")]


def week7():
    parts = [OWN]
    parts.append(card("need", "What you need",
        "<ul>\n<li>PhysioEx, from the Pearson link in Canvas. You use Exercise 4, Endocrine System Physiology, and Exercise 12, Serological Testing.</li>\n"
        "<li>For the heart rate test at home: a timer, a place to lie down, and your own pulse at the wrist or the side of the neck. A phone or watch that shows heart rate helps but is not needed.</li>\n"
        "<li>The hormone cycle sheet for Part 4, printed or open on screen, and a pencil. Paper and a pen for your standard curve, or the printed worksheet. You can type everything else on this page.</li>\n</ul>\n"))
    parts.append(HOW)
    # Part 1
    parts.append('<h2 class="parthead">Part 1. Your autonomic nervous system, at home</h2>\n')
    parts.append(card("p1", "Heart rate with breathing, and with standing up",
        '<p>Your heart rate is set from moment to moment by the two branches of the autonomic nervous system. These two tests let you watch them work. Find your pulse at the thumb side of your wrist, or at the side of your neck, with two fingers, not your thumb.</p>\n'
        '<h3>Test A. Breathing</h3>\n<ol class="steps">\n'
        "<li>Sit quietly for 5 minutes.</li>\n<li>Count your pulse for 30 seconds while breathing normally, and double it. Do this twice and write both.</li>\n"
        "<li>Now breathe slowly, about 5 seconds in and 5 seconds out, for one minute, with your fingers on your pulse. Notice when the beats come closer together and when they spread apart. If a phone or watch shows your heart rate, read the highest number while you breathe in and the lowest while you breathe out, for three breaths.</li>\n</ol>\n"
        + rows_table(["Breathing test", "Your result"], ["Resting heart rate, first count (beats per minute)", "Resting heart rate, second count (beats per minute)", "During slow breathing: faster on the breath in or the breath out?", "Highest and lowest rates, if you have a phone or watch reading"], "ba")
        + '<h3>Test B. Standing up</h3>\n<ol class="steps">\n'
        "<li>Lie flat for 5 minutes. Count your pulse for 30 seconds and double it.</li>\n<li>Stand up and stay still. Count your pulse for 30 seconds starting at 1 minute, and again starting at 3 minutes.</li>\n</ol>\n"
        '<p class="safe">If you feel dizzy or light-headed, sit or lie back down right away. Skip Test B if you have ever fainted on standing up or have a heart condition, and say so on your worksheet. This is practice of a test, not a medical test.</p>\n'
        + rows_table(["Standing test", "Heart rate (beats per minute)"], ["Lying down, after 5 minutes", "Standing, at 1 minute", "Standing, at 3 minutes"], "st")
        + field("h1", "In Test A, your heart rate rose and fell with your breathing within a beat or two. Which branch of the autonomic nervous system was being turned down and back up to do that, and how does the speed of the change tell you?", True)
        + field("h2", "In Test B, what happened to your heart rate when you stood, with numbers? Standing lets blood pool in your legs. Trace the reflex: what sensed the change, which branch took over, and which receptor on the heart carried out the change.", True)
        + field("h3", "Which receptor on the blood vessels helped you stay standing without fainting, and what did it make the vessels do?")))
    # Part 2
    parts.append('<h2 class="parthead">Part 2. PhysioEx Exercise 4, Endocrine System Physiology</h2>\n'
                 '<p>Run these three activities, in the order PhysioEx lists them. Pearson sometimes renumbers activities, so go by the topic named below. The activity on metabolism and thyroid hormone is not part of this week; you do it in Week 12, with metabolism.</p>\n')
    parts.append(activity("a1", 1, "Plasma glucose, insulin, and diabetes mellitus",
        field("a1x", "Draw or describe the glucose tolerance curves you made, with the starting glucose marked on each. Which curve fits diabetes, and what feature of the curve told you?")))
    parts.append(activity("a2", 2, "Hormone replacement therapy",
        field("a2x", "Which treatment kept bone density closest to normal after the ovaries were removed? Use your numbers.")))
    parts.append(activity("a3", 3, "Measuring cortisol and adrenocorticotropic hormone (ACTH)",
        rows_table(["Patient", "Cortisol: high, normal or low", "ACTH: high, normal or low", "Your diagnosis, and primary or secondary"], ["Patient 1", "Patient 2", "Patient 3", "Patient 4", "Patient 5"], "ca")
        + '<p class="note">Use as many rows as PhysioEx gives you patients.</p>\n'
        + field("a3x", "Pick one patient whose two levels moved in opposite directions and one whose levels moved in the same direction. Explain how negative feedback produces each pattern, and where in the axis each problem must be.", True)))
    # Part 3
    parts.append('<h2 class="parthead">Part 3. Measuring a hormone you cannot see</h2>\n')
    parts.append(activity("a4", 4, "PhysioEx Exercise 12, the ELISA activity",
        field("a4x", "In one or two sentences, what does the color in a well tell you, and what has to be stuck to the well for any color to appear?")))
    parts.append(card("sc", "Read an unknown off a standard curve",
        "<p>A hormone assay works like the ELISA you just ran, but it measures how much hormone is in a sample. You first run standards, samples with known amounts of hormone, and record the color each one makes as a number called absorbance. The line through those points is the standard curve. Then you read your patient's sample off it. Below are practice standards for an assay of thyroid-stimulating hormone (TSH), where more hormone gives more color.</p>\n"
        + fixed_table(["TSH in the standard (mIU per L)", "Absorbance"], STD)
        + draw("Your standard curve, by hand: TSH on the x axis and absorbance on the y axis. Plot all six standards and draw the line through them. Then draw the guide lines you use to read each unknown.")
        + field("s1", "Sample A gives an absorbance of 0.65. Read its TSH off your curve. Show the guide lines on your drawing and write the value here.")
        + field("s2", "Sample B gives an absorbance of 2.40, above your highest standard. What should the lab do with sample B, and why can you not just extend the line?", True)
        + field("s3", "The usual reference range for TSH is about 0.4 to 4.0 mIU per L. Is sample A in range? What is the one more test you would want before saying anything about this person's thyroid?")))
    # Part 4
    parts.append('<h2 class="parthead">Part 4. Reading the hormone cycle</h2>\n')
    parts.append(card("p4", "The hormone cycle sheet",
        '<p>Open <a href="lab-week08-hormone-cycle.html" target="_top" class="b5-keep">the hormone cycle sheet</a>. It has two graphs of one 28 day cycle and ten questions. Work it on paper: print it, or copy the graphs onto your own paper. You will mark the day of ovulation, label the phases, and redraw one curve, so it has to be done by hand. Photograph both pages and add them to the PDF you upload.</p>\n'
        + field("p4x", "After you finish the sheet: which hormone peak did you use to place ovulation, and does ovulation come before or after that peak?")))
    parts.append('<h2 class="parthead">Part 5. Clinical correlation</h2>\n')
    parts.append(card("cc", "TSH 8.4 with a normal free T4",
        "<p>A patient has a TSH of 8.4 mIU per L, above the usual 0.4 to 4.0, and a free T4 of 1.1 ng per dL, which is inside the reference range. TSH is released by the anterior pituitary, and thyroid hormone feeds back on the pituitary and the hypothalamus. A small change in T4 makes a much larger change in TSH.</p>\n"
        + field("c1", "Say which end of this axis is failing, and say how the two numbers together tell you that.", True)
        + field("c2", "Explain why the pituitary hormone leaves its reference range before the thyroid hormone does.", True)
        + field("c3", "Use your standard curve to say what a sensitive assay is, and why that matters for measuring TSH.")))
    parts.append(lookback(["Before the cortisol and ACTH activity, which patient did you expect to be hardest to place, and why?",
                           "What did the data show, and what did you have to change about the axis you had drawn in your head?",
                           "Name the one thing about feedback that is now clearer than it was, and say what made it clear."]))
    parts.append(turnin(7, "Sunday, November 1", "Photograph your standard curve and both pages of the hormone cycle sheet."))
    head = ('<header class="pagehead">\n<p class="mm-eyebrow">Week 7 lab</p>\n<h1 class="mm-display">Hormones and the <span>autonomic system</span>.</h1>\n'
            '<p class="meta"><strong>2 to 3 hours.</strong> Graded. Investigate It, 25 percent of your grade across the term.</p>\n'
            '<p>This week has five short parts. You watch your own autonomic nervous system change your heart rate. You run three PhysioEx endocrine activities, including one where you diagnose patients from two hormone levels. You run the ELISA and read an unknown off a standard curve. You read one menstrual cycle from its hormone graphs. And one clinical case ties it together.</p>\n</header>\n')
    return head + "".join(parts)


def build(w, fname, title, body):
    s = SRC
    i = s.index("</style>"); s = s[:i] + N.CSS + CSS_ADD + ".parthead{font-family:\"Open Sans\",system-ui,sans-serif;font-weight:800;font-size:clamp(22px,3.2vw,27px);color:var(--navy);margin:34px 0 4px}\n" + s[i:]
    a = s.index('<main id="main">'); b = s.index("</main>") + len("</main>")
    s = s[:a] + '<main id="main"><div class="wrap">\n' + body + '</div></main>' + s[b:]
    s = re.sub(r"<title>[^<]*</title>", "<title>%s &middot; BIO 005 Human Physiology</title>" % title, s, count=1)
    stem = fname[:-5]
    for x, y in [("lab-worksheet-week04", stem), ("week-04-entry.html", "week-%02d.html" % w), ("Week 4", "Week %d" % w),
                 ('"textarea, input[type=radio], input[type=checkbox]"', '"textarea, input[type=text], input[type=radio], input[type=checkbox]"'),
                 ("week04", "week%02d" % w), ("w04", "w%02d" % w), ("bio005-week-04-lab", "bio005-week-%02d-lab" % w)]:
        s = s.replace(x, y)
    assert "Week 4" not in s, re.findall(r".{40}Week 4.{40}", s)[:2]
    for bad in ("—", "<em", "<i>", "Lora", "font-style:italic"):
        assert bad not in s, bad
    if "bio005-nopaste.js" not in s:
        i = s.rfind("</body>")
        s = s[:i] + '<script src="bio005-nopaste.js" defer></script>\n' + s[i:]
    (ROOT / fname).write_text(relabel(s), encoding="utf-8")
    print("built", fname)


if __name__ == "__main__":
    build(6, "lab-week06-muscle.html", "Week 6 lab, how muscle makes force", week6())
    build(7, "lab-week07-hormones.html", "Week 7 lab, hormones and the autonomic system", week7())
