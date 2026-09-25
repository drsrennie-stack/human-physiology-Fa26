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
           '  <h1 class="mm-display">Discussion 4: work it the way the <span>exam asks</span>.</h1>\n'
           '  <p class="meta"><strong>Turned in to me only, in Canvas, by %s.</strong></p>\n'
           '  <p>%s</p>\n  <p>%s</p>\n</header>\n' % (e(W.DUE), e(D["intro"]), e(W.SOURCES))]
    out.append(card("h-rules", "How to do it", steps(D["how"])))
    for k, q in enumerate(D["questions"], 1):
        body = '  <p class="prompt">%s</p>\n' % e(q["q"])
        body += '  <h3 class="sub">Brain dump: build your model</h3>\n  <p>%s</p>\n' % e(q["dump"])
        body += area("bd%d" % k, "Your brain dump. On paper is fine, then photograph it.")
        body += ('  <fieldset>\n    <legend>Choose your answer.</legend>\n    <ul class="opts">\n' +
                 "".join('      <li><label><input type="radio" name="mc%d" value="%s"> %s</label></li>\n'
                         % (k, o[0], e(o)) for o in q["options"]) + '    </ul>\n  </fieldset>\n')
        body += ('  <fieldset>\n    <legend>How sure are you?</legend>\n    <ul class="opts">\n' +
                 "".join('      <li><label><input type="radio" name="sure%d" value="%s"> %s</label></li>\n'
                         % (k, v, v.capitalize()) for v in ("sure", "fairly sure", "guessing")) +
                 '    </ul>\n  </fieldset>\n')
        out.append(card("h-q%d" % k, "Question %d" % k, body))
    out.append(card("h-teach", "Teach it on video", '  <p>%s</p>\n' % e(D["teach"])))
    out.append(card("h-post", "What you turn in", steps(D["turnin"]) +
        '  <p>Upload all of it to the <strong>Discussion 4, exam practice part 1</strong> assignment in Canvas. '
        'Only I see it. Keep your brain dumps and videos for next week.</p>\n'))
    out.append(turn("Save this page as a PDF if you want a copy of your brain dumps and answers."))
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
    out.append(card("h-bd", "Check your brain dumps", body))
    out.append(card("h-key", "Check your answers", steps(D["keys"])))
    body = '  <p>%s</p>\n' % e(D["scoring"])
    for k, (t, pts) in enumerate(D["teach_rubrics"], 1):
        body += '  <h3 class="sub">%s</h3>\n' % e(t) + checks("t%dr" % k, pts)
    out.append(card("h-teach", "Check your teaching", body))
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
    write("discussion-week04.html", b1, 4, "Discussion 4, exam practice part 1")
