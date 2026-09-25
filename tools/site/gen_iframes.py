# -*- coding: utf-8 -*-
"""Writes CANVAS-START-HERE-IFRAMES.md.

Heights are measured, not guessed: every page was rendered headless at 900px
wide, which is about what a Canvas module page gives its content, and the
number below is that height with four percent of headroom. Canvas strips the
script tag out of a pasted page, so the height sender in each file never runs
inside Canvas and the fixed height is what a student actually gets.
"""
import io, os

SITE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(os.path.dirname(HERE))

PAGES = [
 ("Course Tools", "course-tools.html", 1870,
  "The old floating tools dock as a flat page: every study tool, every lab, the "
  "Practice Exam and Gap Finder, grouped, with the same icons. Mastery OS is out. "
  "Every tile opens in its own tab."),
 ("Course home, the whole course as a list", "course.html", 3750,
  "The off Canvas mirror of this modules page. Same order, same names."),
 ("How Grading Works", "how-grading-works.html", 3150, ""),
 ("Textbook/Mastering A&P/Pearson", "access-pearson.html", 5700, ""),
 ("Scholar Points", "scholar-points.html", 6150,
  "Up to 2.5 percent for studying with other people, and why it is not extra credit."),
 ("Syllabus & Course Policies", "syllabus-fall2026.html", 18580,
  "Long page. It has its own contents list at the top that jumps down the page."),
 ("Weekly Schedule", "course-schedule.html", 2500,
  "Weeks 2 and 3 are one row. Week 4 opens September 28."),
 ("AI Use in this Course", "ai-in-this-course.html", 2450, ""),
 ("Week 1 Discussion: Digital Vision Board/Introduction",
  "assignment-discussion-01-visionboard.html", 2340,
  "The instructions page. The discussion itself is still the Canvas discussion, "
  "and the page links to it."),
 ("How Every Week Works", "how-every-week-works.html", 3890,
  "The eight steps, topic free, with the big numbers. This is the one to point "
  "a lost student at."),
]

o = io.StringIO()
w = o.write
w("# Canvas paste blocks: START HERE\n\n")
w("Built September 15, 2026. Every page below works in two places from one file. ")
w("Inside a Canvas iframe it shows no site navigation at all, just a gold Back to ")
w("Canvas modules button. Opened directly on the website it shows a Course home ")
w("link and a link across to Canvas instead. It picks which one before the page ")
w("paints, so nothing flickers.\n\n")
w("Paste each block into the Canvas HTML editor for that page.\n\n")
w("---\n\n")

# ENTER THE COURSE HERE, TWO WAYS.
# Sep 16 2026. The framed version works: the door detects the frame and gives
# its button target="_top", which navigates the whole browser window rather
# than the frame, so one click takes the student out of Canvas and onto the
# site. The card is the alternative for when the iframe height is a nuisance,
# because Canvas rewrites iframe attributes on a save from the rich editor.
CARD = io.open(os.path.join(HERE, "enter-card.html"), encoding="utf-8").read().strip()

w("## Enter the Course Here -->\n\n")
w("**The iframe.** The door detects that it is framed and switches its button ")
w("to `target=\"_top\"` with the full GitHub Pages address, so one click ")
w("navigates the whole browser window out of Canvas and onto the course ")
w("website, where the site's own navigation takes over. Back brings them to ")
w("Canvas.\n\n")
w("```html\n")
w('<p><iframe style="width: 100%%; min-height: 1300px; border: 1px solid #d9dde3; '
  'border-radius: 8px;" src="%sindex.html" width="100%%" height="1300" '
  'title="BIO 005 Human Physiology, enter the course" allow="accelerometer; autoplay; '
  'clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" '
  'allowfullscreen="allowfullscreen" loading="lazy"></iframe></p>\n' % SITE)
w("```\n\n")
w("**Or the card, no iframe.** Same page without a frame, if you would rather ")
w("not fight the height: Canvas rewrites iframe attributes when a page is saved ")
w("from the rich editor, which is why it keeps reverting. Two buttons, stay in ")
w("Canvas or leave for the website.\n\n")
w("```html\n" + CARD + "\n```\n\n")
w("---\n\n")

for i, (title, f, h, note) in enumerate(PAGES, 1):
    w("## %d. %s\n\n" % (i, title))
    if note:
        w("%s\n\n" % note)
    w("File: `%s`\n\n" % f)
    w("```html\n")
    w('<iframe id="bio005-%s" src="%s%s"\n' % (f.replace(".html", ""), SITE, f))
    w('        title="%s" width="100%%" height="%d"\n' % (title.replace('"', "'"), h))
    w('        style="width:100%;border:0;overflow:hidden" scrolling="no"\n')
    w('        loading="lazy"></iframe>\n')
    w("```\n\n")

w("---\n\n")
w("## About the heights\n\n")
w("Each height was measured by rendering the page at 900px wide, about what a ")
w("Canvas module page gives its content, then adding four percent of headroom. ")
w("Canvas strips the script tag out of a pasted page, so the height sender built ")
w("into each file never runs inside Canvas and these fixed numbers are what a ")
w("student actually gets. If a page ever looks cut off, raise its number.\n\n")
w("On a phone the pages get taller, because the cards stack. The iframe scrolls ")
w("inside itself in that case rather than clipping, so nothing is lost.\n\n")
w("---\n\n")
w("## What changed on these pages\n\n")
w("- **Weeks 2 and 3 are one block everywhere.** The schedule, the syllabus and ")
w("the course home all show a single row for September 14 to 27, everything due ")
w("Sunday September 27. There is no separate Week 3 row left for a student to find.\n")
w("- **Week 4 opens Monday, September 28.** That date is on the door, the course ")
w("home, the schedule and the syllabus.\n")
w("- **The syllabus schedule had a duplicated row.** Old Weeks 3 and 4 both read ")
w("\"Membrane potential, neurons and synapses\". That is fixed, and the weeks after ")
w("it renumbered, which moved Midterm 1 to Week 8 and Midterm 2 coverage to Weeks ")
w("9 to 14.\n")
w("- **Loop and Mastery OS wording is gone** from the syllabus, the grading page ")
w("and the how it works page. Those described a structure the course no longer ")
w("uses. Everything now describes the eight steps.\n")
w("- **The brand is back.** Sep 15 2026: the first version of these pages was ")
w("built on an invented layout and lost the three figure mark, the two tone ")
w("wordmark, the two tone headline, the dark navy signature band and the gold ")
w("dot footer. They are all forked from virtual-office.html now, which is the ")
w("reference page for this site.\n")
w("- **Numbered lists get big numbers.** 44px gold circles, Plus Jakarta Sans ")
w("at 800, and the numbering runs straight through a procedure even when it is ")
w("split across cards.\n")
w("- **Scholar Points is on the list.** It was missing from START HERE and from ")
w("the course home.\n")
w("- **The door breaks out of the frame.** Framed, its button switches to the ")
w("real site address with target=_top, which navigates the whole browser window ")
w("rather than the frame, so the student genuinely leaves Canvas.\n")
w("- **How Every Week Works is new.** It replaces the old How this course works, ")
w("which still described four stages and a loop.\n")

io.open(os.path.join(OUT, "CANVAS-START-HERE-IFRAMES.md"), "w", encoding="utf-8").write(o.getvalue())
print("CANVAS-START-HERE-IFRAMES.md %d bytes, %d pages" % (len(o.getvalue()), len(PAGES)))
