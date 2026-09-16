# -*- coding: utf-8 -*-
"""Wraps each page's body fragment in the site shell.

The fragments in tools/site/body/ hold content only: a run of
<section class="card"> blocks and nothing else. No headers, no footers, no
navigation. The shell in kit.py supplies all of that, and supplies the right
one depending on whether the page is being read on the site or inside a
Canvas iframe.
"""
import io, os
import kit

HERE = os.path.dirname(os.path.abspath(__file__))
BODY = os.path.join(HERE, "body")
OUT = os.path.dirname(os.path.dirname(HERE))

PAGES = [
 dict(slug="how-grading-works", out="how-grading-works.html",
      title="How grading works", eyebrow="Start here",
      h1="How grading", h1_tail="works.",
      blurb="Four categories, a scale, and a short list of things that are deliberately not graded."),
 dict(slug="access-pearson", out="access-pearson.html",
      title="Textbook, Mastering A&P, Pearson", eyebrow="Start here",
      h1="Your book and", h1_tail="Mastering A&P.",
      blurb="What you are buying, the whole path through Canvas, and what to do when it goes wrong."),
 dict(slug="ai-in-this-course", out="ai-in-this-course.html",
      title="AI use in this course", eyebrow="Start here",
      h1="AI use in", h1_tail="this course.",
      blurb="Where you can use it, where you cannot, and how to log it."),
 dict(slug="scholar-points", out="scholar-points.html",
      title="Scholar Points", eyebrow="Start here",
      h1="Scholar", h1_tail="Points.",
      blurb="Up to 2.5 percent on your final grade for studying with other people, and why it is not extra credit."),
 dict(slug="syllabus", out="syllabus-fall2026.html",
      title="Syllabus and course policies", eyebrow="Start here &middot; Fall 2026",
      h1="Syllabus and", h1_tail="course policies.",
      blurb="The full syllabus for BIO 005 Human Physiology, Yuba College, Fall 2026.", wide=True),
 dict(slug="vision-board", out="assignment-discussion-01-visionboard.html",
      title="Week 1 discussion: your digital vision board",
      eyebrow="Week 1 &middot; Discussion &middot; Graded",
      h1="Your digital", h1_tail="vision board.",
      blurb="Your introduction to the class, and the first thing due in Week 1."),
 dict(slug="how-every-week-works", out="how-every-week-works.html",
      title="How every week works", eyebrow="Start here",
      h1="How every", h1_tail="week works.",
      blurb="Eight steps, in order, the same every week whatever the topic is."),
 dict(slug="course-schedule", out="course-schedule.html",
      title="Weekly schedule", eyebrow="Start here &middot; Fall 2026",
      h1="The whole term,", h1_tail="week by week.",
      blurb="All fifteen weeks with their dates. Weeks 2 and 3 are one block, and everything in it is due September 27.", wide=True),
]

if __name__ == "__main__":
    for d in PAGES:
        src = os.path.join(BODY, d["slug"] + ".html")
        if not os.path.exists(src):
            print("%-44s SKIPPED, no fragment yet" % d["out"]); continue
        body = io.open(src, encoding="utf-8").read().strip()
        html = kit.page(slug=d["slug"], title=d["title"], eyebrow=d["eyebrow"],
                        h1=d["h1"], h1_tail=d["h1_tail"], blurb=d["blurb"],
                        body=body, wide=d.get("wide", False))
        io.open(os.path.join(OUT, d["out"]), "w", encoding="utf-8").write(html)
        print("%-44s %6d bytes" % (d["out"], len(html)))
