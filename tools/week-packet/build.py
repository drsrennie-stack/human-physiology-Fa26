# -*- coding: utf-8 -*-
import sys, json; sys.path.insert(0,'/home/claude/packet')
from kit import *
import ch1, ch2, ch3

LOGO = ('<svg viewBox="40 10 125 148" width="74" aria-hidden="true"><g transform="translate(0,18)">'
 '<g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/>'
 '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 '
 'C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g>'
 '<g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/>'
 '<path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 '
 'C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g>'
 '<g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/>'
 '<path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 '
 'C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g></g></svg>')

CH = [
 dict(n=1, title="The Cell and Its Tissues", sub="Structure", src=ch1,
   lede="Where the body keeps its water, what the membrane is built from, what is inside a cell, "
        "and the junctions that turn loose cells into a sheet that can do a job.",
   obj=["State the volumes of the body fluid compartments in a 70 kg adult and name the dominant solute of each.",
        "Describe the fluid mosaic membrane and say what each component contributes.",
        "Name the major organelles and the three cytoskeletal filaments, and say what each one does.",
        "Tell the junction types apart by the job each one does, and predict what fails when one fails.",
        "Explain why an epithelium is polarised and why that matters for everything in Chapter 2."]),
 dict(n=2, title="Transport Across the Membrane", sub="Cellular physiology", src=ch2,
   lede="What crosses the membrane and how. Diffusion and osmosis, the carriers and the pumps, "
        "endocytosis and exocytosis, and how a sheet of cells moves something from the gut into the blood.",
   obj=["Put any substance on the transport map by asking which way it moves relative to its gradient and who pays.",
        "State the variables in Fick's law and predict the effect of changing each one.",
        "Separate osmolarity from tonicity and predict cell volume in a named solution.",
        "Contrast simple diffusion, facilitated diffusion, primary active and secondary active transport.",
        "Describe the forms of vesicular transport and say which cells use each.",
        "Trace glucose across an intestinal epithelium, naming the protein on each membrane."]),
 dict(n=3, title="How Cells Talk to Each Other", sub="Cell signaling", src=ch3,
   lede="One signal molecule reaching the right cell, being recognised, converted into something the "
        "inside of the cell can act on, amplified enough to matter, and then switched off.",
   obj=["Name the signal types by how far they travel and say what sets the speed and reach of each.",
        "Predict where a receptor sits, and the onset and duration of the response, from the solubility of the signal.",
        "Draw the G protein cascade from blank paper, including how it switches itself off.",
        "Name the second messengers and the amplifier enzyme that makes each one.",
        "Explain amplification and say why a cascade with high gain must terminate precisely.",
        "Tell an agonist from an antagonist, and a competitive blocker from a noncompetitive one, from a dose response curve."]),
]

def opener(c):
    return ('<p class="partno">Chapter %d</p><h2 class="ch">%s</h2>'
            '<p class="chsub">%s</p><p class="lede">%s</p>'
            '<div class="bte"><p class="lab">By the end</p><ol>%s</ol></div>'
            % (c['n'], esc(c['title']), esc(c['sub']), esc(c['lede']),
               "".join('<li>%s</li>' % esc(o) for o in c['obj'])))

cover = ('<section class="page cover"><div class="logo">%s</div>'
 '<p class="eyebrow">BIO 005 &middot; Human Physiology &middot; Yuba College</p>'
 '<h1>Week 2 Packet<span class="dot">.</span></h1>'
 '<p class="sub">The Cell &middot; Transport &middot; Signaling</p>'
 '<div class="rule"></div>'
 '<div class="toc">'
 '<div class="row"><span class="n">1</span><span><span class="t">The Cell and Its Tissues</span>'
 '<span class="s">Structure</span></span><span class="p"></span></div>'
 '<div class="row"><span class="n">2</span><span><span class="t">Transport Across the Membrane</span>'
 '<span class="s">Cellular physiology</span></span><span class="p"></span></div>'
 '<div class="row"><span class="n">3</span><span><span class="t">How Cells Talk to Each Other</span>'
 '<span class="s">Cell signaling</span></span><span class="p"></span></div>'
 '</div></section>' % LOGO)

howto = ('<section class="page">'
 '<p class="partno">How to use this</p><h1 class="big">Read it once, then close it<span class="dot">.</span></h1>'
 '<div class="rule"></div>'
 + p("Three chapters, in the order the week teaches them. Chapter 1 is the structure, Chapter 2 is what crosses it, "
     "Chapter 3 is how cells send messages. Read a chapter, then close this and put what you can into the boxes on "
     "your note sheet. What you cannot recall is the gap, and the gap is what the videos are for.")
 + tbl("What is in each chapter, and what it is for", ["Element","What it is","How to use it"],
   [["<b>By the end</b>","The competencies that chapter covers","Read them first. They are what the exam asks"],
    ["Tables","Comparisons, side by side","Cover a column and recite it from memory"],
    ["Sequences","A numbered process, step by step","Redraw the chain on blank paper without looking"],
    ["Concept maps","A question with its branching answers","The question at the top is the one to ask yourself"],
    ["Hold onto this","The idea the section turns on","If you remember one thing per section, this is it"],
    ["Worked problems","A question, then the work in steps","Try it before you read the work. Getting it wrong first is the point"]])
 + hold("Two colors",
     "Work through the first pass in one colour, before the videos. Then switch colours and add what the videos gave "
     "you that the reading did not. The gap between the two colours is the most useful thing on the page, so do not "
     "erase the first pass.")
 + '</section>')

pages = [cover, howto]
for c in CH:
    pages.append('<section class="page">' + opener(c) + "".join(c['src'].B) + '</section>')

html_out = ('<style>%s</style>\n%s' % (CSS, "\n".join(pages)))
open('/home/claude/packet/packet.html','w').write(
 '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">'
 '<title>BIO 005 Week 2 Packet</title>'
 '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap">'
 '</head><body>' + html_out + '</body></html>')
print('packet.html written')
