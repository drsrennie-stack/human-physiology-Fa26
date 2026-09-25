#!/usr/bin/env python3
"""
tools/week-packet/make_tagged.py

Renders the week packets and competency lists as TAGGED PDF/UA-1 files with
WeasyPrint, instead of Chromium's print-to-PDF, which writes no structure
tree. Sep 25 2026.

    python3 tools/week-packet/make_tagged.py

Needs the packet HTML built first (build.py for Week 2, w1_build.py for
Week 1; both write into /home/claude/packet, which is this folder) and the
competency lists from competency_list.py. Writes print/*.pdf in the repo.
"""
import sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools"))
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration
FC = FontConfiguration()   # needed so the inline @font-face fonts actually load
from make_pdf import stamp, audit

FONTS = (ROOT / "assets" / "fonts-site.css").read_text()

def page_css(runner):
    # running head and foot, the same text Chromium printed as header and footer;
    # WeasyPrint marks margin boxes as artifacts, so they stay out of the reading order
    return CSS(font_config=FC, string=FONTS + """
      @page { size: letter; margin: 0.62in 0.7in;
        @top-left { content: "%s"; font: 700 6.6pt 'Plus Jakarta Sans', sans-serif;
                    letter-spacing: .2em; color: #8B3A2E; text-transform: uppercase; }
        @bottom-left { content: "Dr. Sharilyn Rennie"; font: 6.6pt 'Plus Jakarta Sans', sans-serif; color: #414B5C; }
        @bottom-right { content: counter(page); font: 6.6pt 'Plus Jakarta Sans', sans-serif; color: #414B5C; } }
      @page :first { @top-left { content: none; } }
      body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    """ % runner)

JOBS = [
  ("w1-packet.html", "print/BIO005-Week1-Packet.pdf", "BIO 005 Week 1 packet",
   "Week 1 study packet: tables, sequences and concept maps for each part", "BIO 005 Week 1 packet"),
  ("packet.html", "print/BIO005-Week2-Packet.pdf", "BIO 005 Week 2 packet",
   "Week 2 study packet: the cell, transport and signaling", "BIO 005 Week 2 packet"),
  ("w1-competency-list.html", "print/BIO005-Week1-Competency-List.pdf", "BIO 005 Week 1 competency list",
   "Every Week 1 competency with boxes for Read, Drew it and From memory", "BIO 005 Week 1 competencies"),
  ("w2-competency-list.html", "print/BIO005-Week2-Competency-List.pdf", "BIO 005 Week 2 competency list",
   "Every Week 2 competency with boxes for Read, Drew it and From memory", "BIO 005 Week 2 competencies"),
]

def main():
    for src, out, title, desc, runner in JOBS:
        s = HERE / src
        if not s.exists():
            print("skip", src, "(build it first)"); continue
        target = ROOT / out
        HTML(filename=str(s), base_url=str(ROOT) + "/").write_pdf(
            target, stylesheets=[page_css(runner)], font_config=FC, pdf_variant="pdf/ua-1")
        stamp(target, title, desc)
        print(out, audit(target))

if __name__ == "__main__":
    main()
