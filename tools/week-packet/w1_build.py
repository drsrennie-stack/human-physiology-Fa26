# -*- coding: utf-8 -*-
"""Assembles the BIO 005 Week 1 packet.

Same kit and same rules as the Week 2 build. The fonts file is inlined rather
than linked, because a linked web font does not load in the headless render and
the PDF comes out in a fallback face.
"""
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *
import w1_ch1, w1_ch2, w1_ch3

FONTS = '/home/claude/rebase/assets/fonts-site.css'

# The house display face, exactly as the Week 2 packet shipped it. The site sets
# headlines in Open Sans and everything else in Plus Jakarta Sans.
DISP = ".cover h1,h1.big,h2.ch{font-family:'Open Sans','Plus Jakarta Sans',system-ui,sans-serif}"

LOGO = ('<svg viewBox="40 10 125 148" width="74" aria-hidden="true"><g transform="translate(22.03,6.53) scale(4.73)"><circle cx="8" cy="8" r="4.2" fill="#0B1530"/><circle cx="17" cy="8" r="4.2" fill="#8B3A2E"/><circle cx="26" cy="8" r="4.2" fill="#C9A14A"/><rect x="5.5" y="15" width="5" height="14" rx="2.5" fill="#0B1530"/><rect x="14.5" y="15" width="5" height="14" rx="2.5" fill="#8B3A2E"/><rect x="23.5" y="15" width="5" height="14" rx="2.5" fill="#C9A14A"/></g></svg>')

CH = [
 dict(n=1, title="What Physiology Is, and the Internal Environment", sub="Foundations", src=w1_ch1,
   lede="What the subject is asking, the six levels it asks at, the fluid homeostasis is defending, "
        "why a steady state is not an equilibrium, and the six themes every mechanism this term sits on.",
   obj=["Define physiology and place a given process at the correct level of organization from molecule to organism, then state the level at which that process is best explained.",
        "Predict how a change in the structure of a molecule, cell, tissue, or organ alters its function, using examples from two different organ systems.",
        "Name the body fluid compartments, give the fraction of body water in each, and say which one homeostasis defends.",
        "Define homeostasis, regulated variable and set point, and distinguish homeostasis from chemical equilibrium and from steady state.",
        "Name the six themes and say which two a given mechanism sits on."]),
 dict(n=2, title="Control Systems and Feedback", sub="Homeostatic control", src=w1_ch2,
   lede="The four kinds of control, the seven boxes every reflex is made of, what a person looks like "
        "when each box fails, the three feedback patterns, and the three things that move a set point.",
   obj=["Distinguish a local control pathway from a long distance reflex pathway and classify a given response as one or the other.",
        "Diagram a negative feedback loop labeling stimulus, sensor, afferent path, integrating center, efferent path, effector and response, and trace body temperature or blood glucose through every step.",
        "Use the seven boxes as a differential and say what you would see in a person when each one fails.",
        "Distinguish negative from positive feedback by the direction of the response, give a physiological example of each, and explain why a positive feedback loop needs an outside event to end it.",
        "Explain anticipatory feedforward control and acclimatization, and identify which one is operating in a given scenario."]),
 dict(n=3, title="The Quantitative Tools, and How We Know", sub="Method and measurement", src=w1_ch3,
   lede="Three equations, the units they are written in, how to build and read a graph, the words an "
        "experiment is described in, and why one flagged value on a panel is not an answer.",
   obj=["Apply the mass balance equation to a solute or to body water and calculate the intake, production and output combination that holds the amount in the body constant.",
        "Convert among the units used in physiology including molarity, osmolarity, milliequivalents, mmHg, liters per minute and percent solutions.",
        "Construct a labeled graph with the independent variable on the x axis, and read slope, direction and trend from a physiological data set.",
        "Identify the hypothesis, independent variable, dependent variable and control condition in a physiology experiment and state what the control rules out.",
        "Distinguish random from systematic error and explain why physiological measurements are repeated and averaged."]),
]

def opener(c):
    return ('<p class="partno">Part %d</p><h2 class="ch">%s</h2>'
            '<p class="chsub">%s</p><p class="lede">%s</p>'
            '<div class="bte"><p class="lab">By the end</p><ol>%s</ol></div>'
            % (c['n'], esc(c['title']), esc(c['sub']), esc(c['lede']),
               "".join('<li>%s</li>' % esc(o) for o in c['obj'])))

toc_rows = "".join(
 '<div class="row"><span class="n">%d</span><span><span class="t">%s</span>'
 '<span class="s">%s</span></span><span class="p"></span></div>'
 % (c['n'], esc(c['title']), esc(c['sub'])) for c in CH)

cover = ('<section class="page cover"><div class="logo">%s</div>'
 '<p class="eyebrow">BIO 005 &middot; Human Physiology &middot; Yuba College</p>'
 '<h1>Week 1 Packet<span class="dot">.</span></h1>'
 '<p class="sub">Foundations &middot; Control &middot; The Tools</p>'
 '<div class="rule"></div>'
 '<div class="toc">%s</div></section>' % (LOGO, toc_rows))

howto = ('<section class="page">'
 '<p class="partno">How to use this</p><h1 class="big">Read it once, then close it<span class="dot">.</span></h1>'
 '<div class="rule"></div>'
 + p("Three parts, in the order the week teaches them. Part 1 is what the subject is and what it defends. "
     "Part 2 is the machinery that does the defending. Part 3 is the arithmetic and the evidence underneath "
     "both. Read a part, then close this and put what you can into the boxes on your Competency Study Guide. What you "
     "cannot recall is the gap, and the gap is what the videos are for.")
 + p("<b>Part 1, 2 and 3 are this packet's own parts, not Silverthorn's chapters.</b> In the book, Week 1 is Chapter 1 plus the homeostasis and control pathway sections of Chapter 6. Where ATP comes up here it is being spent, not taught; the energy chemistry is Chapter 4, in the optional review week.")
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
 + p("Dr. Sharilyn Rennie")
 + '</section>')

pages = [cover, howto]
for c in CH:
    pages.append('<section class="page">' + opener(c) + "".join(c['src'].B) + '</section>')

fonts = open(FONTS).read()
html_out = '<style>%s</style>\n<style>%s\n%s</style>\n%s' % (fonts, CSS, DISP, "\n".join(pages))
open('/home/claude/packet/w1-packet.html','w').write(
 '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">'
 '<title>BIO 005 Week 1 Packet</title>'
 '</head><body>' + html_out + '</body></html>')
print('w1-packet.html written')
