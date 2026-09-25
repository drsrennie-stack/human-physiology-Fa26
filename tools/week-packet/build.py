# -*- coding: utf-8 -*-
import sys, json; sys.path.insert(0,'/home/claude/packet')
from kit import *
import ch1, ch2, ch3

LOGO = ('<svg viewBox="40 10 125 148" width="74" aria-hidden="true"><g transform="translate(22.03,6.53) scale(4.73)"><circle cx="8" cy="8" r="4.2" fill="#0B1530"/><circle cx="17" cy="8" r="4.2" fill="#8B3A2E"/><circle cx="26" cy="8" r="4.2" fill="#C9A14A"/><rect x="5.5" y="15" width="5" height="14" rx="2.5" fill="#0B1530"/><rect x="14.5" y="15" width="5" height="14" rx="2.5" fill="#8B3A2E"/><rect x="23.5" y="15" width="5" height="14" rx="2.5" fill="#C9A14A"/></g></svg>')

CH = [
 dict(n=1, title="The Cell and Its Tissues", sub="Structure", src=ch1,
   lede="Where the body keeps its water, what the membrane is built from, what is inside a cell, "
        "and the junctions that turn loose cells into a sheet that can do a job.",
   obj=["State the volumes of the body fluid compartments in a 70 kg adult and name the dominant solute of each.",
        "Describe the fluid mosaic membrane and say what each component contributes.",
        "Name the major organelles and the three cytoskeletal filaments, and say what each one does.",
        "Tell the junction types apart by the job each one does, and predict what fails when one fails.",
        "Explain why an epithelium is polarized and why that matters for everything in Part 2."]),
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
    return ('<p class="partno">Part %d</p><h2 class="ch">%s</h2>'
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
 + p("Three parts, in the order the week teaches them. Part 1 is the structure, Part 2 is what crosses it, "
     "Part 3 is how cells send messages. Read a part, then close this and put what you can into the boxes on "
     "your Competency Study Guide. What you cannot recall is the gap, and the gap is what the videos are for.")
+ p("<b>Part 1, 2 and 3 are this packet's own parts, not Silverthorn's chapters.</b> In the book, the compartments and the membrane are Chapter 3, everything that crosses the membrane is Chapter 5, and the signaling is Chapter 6.")
 + tbl("What is in each part, and what it is for", ["Element","What it is","How to use it"],
   [["<b>By the end</b>","The competencies that part covers","Read them first. They are what the exam asks"],
    ["Tables","Comparisons, side by side","Cover a column and recite it from memory"],
    ["Sequences","A numbered process, step by step","Redraw the chain on blank paper without looking"],
    ["Concept maps","A question with its branching answers","The question at the top is the one to ask yourself"],
    ["Hold onto this","The idea the section turns on","If you remember one thing per section, this is it"],
    ["Worked problems","A question, then the work in steps","Try it before you read the work. Getting it wrong first is the point"]])
 + hold("Two colors",
     "Work through the first pass in one color, before the videos. Then switch colors and add what the videos gave "
     "you that the reading did not. The gap between the two colors is the most useful thing on the page, so do not "
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
