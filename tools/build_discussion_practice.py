#!/usr/bin/env python3
"""
tools/build_discussion_practice.py

Builds the course-site worksheets for the two-part exam practice from the same
data as the Canvas pages (tools/canvas_steps_week04.py, PRACTICE and PART2):

  discussion-week04.html   part 1: two questions, a brain dump model for each,
                           the answer and how sure you are, then teaching videos.
                           No rubrics on this page on purpose.
  discussion-week05.html   part 2: the rubrics and the key, with tick boxes, and
                           the analysis questions.

The page shell (brand bar, styles, save-as-you-type script, footer) is taken
from discussion-week04.html, so run this after any shell change there.
Sep 25 2026.

    python3 tools/build_discussion_practice.py
"""
import sys, re, html, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import canvas_steps_week04 as W

def e(s): return html.escape(s, quote=False)

SHELL = (ROOT / "discussion-week04.html").read_text(encoding="utf-8")
A = SHELL.index('<header class="pagehead">')
B = SHELL.index('</div></main>')
HEAD, TAIL = SHELL[:A], SHELL[B:]

def card(hid, title, body):
    return '<section class="card" aria-labelledby="%s">\n  <h2 id="%s">%s</h2>\n%s</section>\n' % (hid, hid, e(title), body)

def steps(xs):
    return '  <ol class="steps">\n' + "".join('    <li>%s</li>\n' % e(x) for x in xs) + '  </ol>\n'

def checks(prefix, xs):
    return ('<ul class="checks">\n' + "".join(
        '  <li><label><input type="checkbox" name="%s%d"> %s</label></li>\n' % (prefix, i, e(x))
        for i, x in enumerate(xs, 1)) + '</ul>\n')

def area(name, label):
    return ('  <div class="q">\n    <label for="%s">%s</label>\n    <textarea id="%s" name="%s"></textarea>\n  </div>\n'
            % (name, e(label), name, name))

def turn(where):
    return card("h-turn", "Save a copy",
        '  <p>%s</p>\n  <button type="button" class="mm-btn" id="printBtn">Print or save as PDF</button>\n'
        '  <p id="saved" aria-live="polite">Your answers save on this device as you type.</p>\n' % e(where))

def part1():
    D = W.PRACTICE
    out = ['<header class="pagehead">\n  <p class="mm-eyebrow">Week 4, exam practice part 1</p>\n'
           '  <h1 class="mm-display">Exam practice part 1: work it the way the <span>exam asks</span>.</h1>\n'
           '  <p class="meta"><strong>Videos to me only, in Canvas, by %s. Your discussion post is due %s, and two replies by %s.</strong></p>\n'
           '  <p>%s</p>\n  <p>%s</p>\n</header>\n' % (e(W.DUE), e(W.DISC4["first_post"]), e(W.DUE), e(D["intro"]), e(W.SOURCES))]
    out.append(card("h-rules", "How to do it", steps(D["how"])))
    for k, q in enumerate(D["questions"], 1):
        body = '  <p class="prompt">%s</p>\n' % e(q["q"])
        body += ('  <fieldset>\n    <legend>Read all four choices now. Mark the one you gave at the end of your video.</legend>\n    <ul class="opts">\n' +
                 "".join('      <li><label><input type="radio" name="mc%d" value="%s"> %s</label></li>\n'
                         % (k, o[0], e(o)) for o in q["options"]) + '    </ul>\n  </fieldset>\n')
        body += '  <h3 class="sub">Step 1. Prepare your answer on camera, 15 minutes</h3>\n  <p>%s</p>\n  <p>%s</p>\n' % (e(D["prep"]), e(q["dump"]))
        body += '  <h3 class="sub">Step 2. Present your answer, 5 minutes</h3>\n  <p>%s</p>\n' % e(D["teach"])
        body += '  <h3 class="sub">Step 3. Write down your answer</h3>\n  <p>Mark the answer you gave in the choices above, then say how sure you are.</p>\n'
        body += ('  <fieldset>\n    <legend>How sure are you?</legend>\n    <ul class="opts">\n' +
                 "".join('      <li><label><input type="radio" name="sure%d" value="%s"> %s</label></li>\n'
                         % (k, v, v.capitalize()) for v in ("sure", "fairly sure", "guessing")) +
                 '    </ul>\n  </fieldset>\n')
        if k < len(D["questions"]):
            body += '  <p><strong>Now go on to question 2.</strong></p>\n'
        out.append(card("h-q%d" % k, "Question %d" % k, body))
    out.append(card("h-post", "What you turn in", steps(D["turnin"]) +
        '  <p>Upload all of it to the <strong>Exam practice part 1, your videos</strong> assignment in Canvas. '
        'Only I see it. Keep your models and videos for next week.</p>\n'))
    G = W.DISC4
    out.append(card("h-disc", "Then post in Discussion 4",
        '  <p>%s</p>\n  <p><strong>%s</strong></p>\n' % (e(G["intro"]), e(G["rule"])) +
        "".join(area("d%d" % k, q) for k, q in enumerate(G["post"], 1)) +
        '  <p><strong>Replies:</strong> %s</p>\n' % e(G["replies"][0].lower() + G["replies"][1:]) +
        '  <p>Your post goes in <strong>%s</strong> in Canvas.</p>\n' % e(G["title"])))
    out.append(turn("Save this page as a PDF if you want a copy of your answers and your post."))
    return "".join(out)

def part2():
    D = W.PART2
    out = ['<header class="pagehead">\n  <p class="mm-eyebrow">Week 5, exam practice part 2</p>\n'
           '  <h1 class="mm-display">Discussion 5: check your work and <span>analyze it</span>.</h1>\n'
           '  <p class="meta"><strong>First post due %s. Two replies due %s.</strong></p>\n'
           '  <p>%s</p>\n</header>\n' % (e(D["first_post"]), e(D["due"]), e(D["intro"]))]
    out.append(card("h-rules", "How to do it", steps(D["how"])))
    body = ""
    for k, (t, pts) in enumerate(D["dump_rubrics"], 1):
        body += '  <h3 class="sub">%s</h3>\n' % e(t) + checks("bd%dr" % k, pts)
    out.append(card("h-bd", "Check your models", body))
    out.append(card("h-key", "Check your answers", steps(D["keys"])))
    body = '  <p>%s</p>\n' % e(D["scoring"])
    for k, (t, pts) in enumerate(D["teach_rubrics"], 1):
        body += '  <h3 class="sub">%s</h3>\n' % e(t) + checks("t%dr" % k, pts)
    out.append(card("h-teach", "Check your presenting", body))
    body = "".join(area("a%d" % k, q) for k, q in enumerate(D["analysis"], 1))
    out.append(card("h-reflect", "Analyze it", body))
    out.append(card("h-post", "What to post", steps(D["post"]) +
        '  <p><strong>Replies:</strong> %s</p>\n' % e(D["replies"][0].lower() + D["replies"][1:])))
    out.append(turn("Save this page as a PDF if you want a copy of your checks and answers. "
                    "Your post goes in the Week 5 discussion in Canvas."))
    return "".join(out)

def write(name, body, n, title):
    s = HEAD + body + TAIL
    s = re.sub(r"<title>[^<]*</title>", "<title>%s &middot; BIO 005 Human Physiology</title>" % title, s, 1)
    s = re.sub(r'var KEY = "bio005-w\d+-discussion[^"]*";', 'var KEY = "bio005-w%02d-discussion-v2";' % n, s)
    s = re.sub(r'var FRAME_ID = "bio005-week-\d+-discussion";', 'var FRAME_ID = "bio005-week-%02d-discussion";' % n, s)
    back = ('href="week-04-entry.html" target="_top">&larr; Week 4 start page' if n == 4
            else 'href="week-%02d.html" target="_top">&larr; Week %d' % (n, n))
    s = re.sub(r'href="week-[^"]*" target="_top">&larr; Week \d+[^<]*', back, s, 1)
    s = re.sub(r'<meta name="description" content="[^"]*">',
               '<meta name="description" content="BIO 005 %s: practice the exam format on cell transport.">' % title, s, 1)
    (ROOT / name).write_text(s, encoding="utf-8")
    print("built", name)

if __name__ == "__main__":
    b1, b2 = part1(), part2()
    write("discussion-week05.html", b2, 5, "Discussion 5, exam practice part 2")
    write("discussion-week04.html", b1, 4, "Exam practice part 1 and Discussion 4")
