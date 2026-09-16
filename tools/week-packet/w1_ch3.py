# -*- coding: utf-8 -*-
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *

B=[]; A=B.append

def clinic(rows):
    return tbl("What this means in the clinic", ["Field","What it means","Example"], rows)

A(sec("Three equations, and what each one is for"))
A(tbl("The quantitative tools", ["Equation","Units","What it says"],
 [["Total body load = intake + production &minus; excretion &minus; metabolism",
   "An amount, not a concentration",
   "A concentration can change for two entirely different reasons. Either the amount of substance changed, or the volume it is dissolved in changed"],
  ["Mass flow = concentration &times; volume flow",
   "mg/min = mg/mL &times; mL/min",
   "Delivery is not the same as concentration. A normal oxygen concentration with a collapsed cardiac output still starves the tissue"],
  ["Clearance = rate of removal &divide; plasma concentration",
   "mL/min, a volume per unit time, not an amount per unit time",
   "The volume of plasma completely cleared of a substance per minute. No real volume is ever fully cleared"]]))
A(hold("Load is not a concentration",
  "Load is the total amount of a substance in the body. Never conclude that the amount changed without first ruling out that the volume changed. A rising plasma sodium can mean sodium was gained or water was lost, and the treatments are opposite."))
A(ul(["Mass flow is why shock kills people whose blood looks normal. The concentration is fine and the delivery is not.",
      "Expressing removal as a clearance makes it independent of how much of the substance happens to be present, which is why it is the number used to set drug doses."]))
A(clinic([
 ["Nursing","Intake and output charting is just what went in minus what came out. Record it loosely and the problem hides in the gap","A patient in positive balance across three shifts has gained fluid, and the daily weight usually shows it before anything else does"],
 ["Radiologic technology","Contrast follows the same rule as everything else. What you put in stays in the patient until the kidney clears it out","A patient who had contrast yesterday has not finished clearing it today. A repeat study too soon adds to a load that is still there, which is why prior studies get checked before the next injection"],
 ["Medicine","A number can rise because there is more of the substance, or because there is less water, and those two need opposite treatments","A rising sodium can mean sodium was gained or water was lost. Treating the wrong one moves the patient in the wrong direction"],
 ["Respiratory therapy","Extra fluid ends up in the lung, and water in the lung gets in the way of gas crossing over","A patient several liters positive becomes harder to oxygenate, and the chest film tends to follow the balance sheet"]]))

A(sec("Mass balance"))
A(ul(["Mass balance is <b>in minus out</b>, and nothing more.",
      "What comes in must leave. Intake plus production on one side, excretion plus metabolism on the other.",
      "If the two sides are equal, the total body load is constant. That is what steady state means for a substance.",
      "If one arrow gets bigger and nothing else changes, the load moves. That is the whole of the prediction."]))
A(prob(1,
 "A solute is at steady state in the body. Intake is 150 mmol per day. The body produces 30 mmol per day of it and metabolism destroys 20 mmol per day. How much must be excreted per day to hold the total body load constant? Then say what happens if excretion falls to 120 mmol per day and nothing else changes.",
 "Total body load = intake + production &minus; excretion &minus; metabolism. Numbers chosen to practice the equation, not laboratory values.",
 ["For the load to be constant, the change in load per day must be zero.",
  "0 = intake + production &minus; excretion &minus; metabolism.",
  "0 = 150 + 30 &minus; excretion &minus; 20.",
  "Everything in must be matched by everything out: 150 + 30 = 180 in, and 20 of that is destroyed by metabolism.",
  "Excretion = 180 &minus; 20 = <b>160 mmol per day</b>.",
  "Now drop excretion to 120 and change nothing else: 150 + 30 &minus; 120 &minus; 20 = <b>+40 mmol per day</b>.",
  "The body gains 40 mmol of this solute every day, and it keeps gaining until one of the other three arrows moves.",
  "<b>Draw:</b> a person with two arrows in and two arrows out, numbers on each, and the balance written underneath.",
  "<b>Carry:</b> a load that is rising is not a mystery. One of four arrows moved, and the equation tells you which ones to check."]))
A(prob(2,
 "A patient's plasma sodium has risen since yesterday. Using total body load, list the two ways that number could have risen and say what you have to rule out before you treat it.",
 "A concentration is an amount divided by a volume. Either term can change.",
 ["Plasma sodium is a <b>concentration</b>: sodium amount divided by the volume it is dissolved in.",
  "A concentration rises if the numerator rises. Sodium was gained, so intake exceeded excretion.",
  "A concentration also rises if the denominator falls. Water was lost, and the sodium that was already there is now in less water.",
  "Nothing about the number itself tells you which happened. Both produce the same reading.",
  "The two situations need <b>opposite</b> treatments, so treating the wrong one moves the patient in the wrong direction.",
  "What settles it is the balance sheet: what went in, what came out, and what the daily weight did.",
  "<b>Draw:</b> the same number written as a fraction twice, once with the top raised, once with the bottom lowered.",
  "<b>Carry:</b> never conclude the amount changed without ruling out that the volume changed."]))

A(sec("Units and unit conversion"))
A(tbl("The math Unit 1 assumes you already have", ["Skill","Where it turns up in this week"],
 [["Metric prefixes and unit conversion","90 mg/dL and 0.9 mg/mL are the same quantity written two ways. Convert first, then multiply"],
  ["Counting particles, not molecules","Molarity counts molecules. Osmolarity counts particles. They are not the same number"],
  ["Rates, and what per means","Mass flow is mg per minute. Clearance is mL per minute. The word per is doing the work"],
  ["Reading a graph","Every data set in the lab arrives as a graph before it arrives as a conclusion"],
  ["What a log scale does","pH is on the list of things this week assumes you already have, and pH is a log scale"],
  ["In minus out","The mass balance equation is this and nothing more"],
  ["Charge, and why mEq is not mM","Charge is what a milliequivalent counts, so the two numbers are not interchangeable"],
  ["Sanity checking an answer","Carry the units through the arithmetic. A wrong answer usually announces itself in the units before you spot it in the number"]]))
A(ul(["The units this course asks you to convert among are <b>molarity, osmolarity, milliequivalents, mmHg, liters per minute and percent solutions</b>.",
      "Build yourself a conversion map: one box per unit, arrows between the ones you can convert between, the conversion written along each arrow.",
      "Mark the two you keep getting wrong. Those are the two to practice, and nobody else can tell you which two they are."]))
A(prob(3,
 "Plasma glucose is 90 mg/dL and renal plasma flow is 600 mL/min. How much glucose is delivered to the kidney per minute?",
 "Mass flow = concentration &times; volume flow. The units have to match before you multiply.",
 ["The concentration is per deciliter. The flow is per minute in milliliters. They do not match, so convert first.",
  "There are 100 mL in a dL, so 90 mg/dL = 90 &divide; 100 = <b>0.9 mg/mL</b>.",
  "Now the units line up: mg/mL &times; mL/min leaves mg/min.",
  "Mass flow = 0.9 mg/mL &times; 600 mL/min = <b>540 mg/min</b>.",
  "Essentially none of it appears in the urine.",
  "So something is moving 540 mg of glucose per minute back across an epithelium, against its gradient. That transporter is the subject of Week 14.",
  "<b>Draw:</b> the unit cancellation written out, mL over mL crossed through, so you can see why the answer has to be mg/min.",
  "<b>Carry:</b> convert, then multiply, then check that the units of your answer are the units the question asked for."]))

A(sec("Graphing and data interpretation"))
A(ol(["Put the <b>independent variable on the x axis</b>. That is what the experimenter deliberately changed.",
      "Put the <b>dependent variable on the y axis</b>. That is what was measured in response.",
      "Label both axes with the quantity and its unit. An unlabeled axis is not a graph.",
      "Read direction first: is the line going up or down as x increases?",
      "Then read slope: where is it steep, where is it flat?",
      "Then read trend: what is the shape doing overall, across the whole range?"]))
A(tbl("Three shapes worth being able to sketch", ["Shape","How to read it"],
 [["A straight line","The dependent variable changes by the same amount for every step in the independent variable, right across the range"],
  ["A curve that rises then flattens","The response climbs, then stops climbing. Something is running out, or a ceiling has been reached"],
  ["A curve that rises then falls","The relationship reverses past a peak. More of the independent variable stops helping and starts hurting"]]))
A(hold("What a steep slope and a flat slope are telling you",
  "A steep slope means a small change in the independent variable produces a large change in the measured one, so the system is sensitive there. A flat slope means the measured variable barely moves, so the system is insensitive there, or already at its limit. Mark both on every graph you sketch."))
A(ul(["Figure 4 of the lecture notes, the regulated variable oscillating inside a shaded normal range around a dashed set point, is a physiological graph. Time is on the x axis because time is what is being allowed to run.",
      "A flat reading on that graph does not by itself tell you the system is idle. Write down what it does and does not tell you."]))

A(sec("How we know any of this"))
A(tbl("The words an experiment is described in", ["Term","What it means"],
 [["Independent variable","What the experimenter deliberately changes"],
  ["Dependent variable","What is measured in response to that change"],
  ["Control","An otherwise identical condition in which the independent variable is not changed"],
  ["Placebo","An inactive treatment used to separate the effect of a substance from the effect of being treated"],
  ["Blind study","The participant does not know which group they are in"],
  ["Double blind study","Neither the participant nor the person measuring the outcome knows"],
  ["Reference range","The band of values covering the middle 95 percent of a healthy reference population. Not a definition of health"],
  ["Biological variability","Real differences between healthy people. Not measurement error, and not something to be averaged away"]]))
A(hold("What the control rules out",
  "The control condition is identical in every respect except the one you changed. Everything the two conditions share is therefore ruled out as an explanation of the difference, which leaves the independent variable. Write that as a full sentence naming what your control rules out, because that is the part that gets marked."))

A(sub("Random error against systematic error"))
A(tbl("Two kinds of error, and only one of them averages away", ["","Random error","Systematic error"],
 [["On a target","Shots scattered all around the center","Shots grouped tightly, but off center"],
  ["In five repeats","The dots scatter around the right value","The dots sit together in the wrong place"],
  ["Does repeating and averaging fix it?","<b>Yes.</b> The scatter shrinks as you average more measurements","<b>No.</b> Averaging a biased measurement gives you a precise wrong answer"],
  ["How you detect it","Spread across repeats of the same measurement","Comparison against a known standard or a second method"]]))
A(ul(["This is why physiological measurements are repeated and averaged: repetition is the defense against random error.",
      "It is no defense at all against systematic error, which is why the instrument has to be checked separately.",
      "<b>Biological variability is neither.</b> It is real difference between healthy people, and averaging it away throws information out."]))
A(clinic([
 ["Nursing","One number on its own tells you very little. What that number did since last time tells you a lot","A creatinine at the top of normal that doubled since yesterday is a bigger problem than one that is mildly high and unchanged"],
 ["Radiologic technology","You check lab numbers before giving contrast, and a number outside the normal range does not automatically mean stop","A creatinine sitting slightly high and unchanged for a year is a different situation from one that doubled this week. Both print with the same flag on the report. Only one of them changes what happens next"],
 ["Medicine","Normal ranges are built to cover most healthy people, not every healthy person, so about one healthy person in twenty gets flagged on any given test","Run a twenty analyte panel on a completely healthy person and something comes back flagged more often than not"],
 ["Respiratory therapy","A blood gas is one photo of something that is still moving","The same value on the way up and on the way down mean opposite things about where the patient is heading"]]))

A(prob(4,
 "A completely healthy person has a twenty analyte panel run. One result comes back flagged. How surprised should you be, and what does the flagged value actually justify doing?",
 "A reference range is defined to cover the middle 95 percent of a healthy reference population.",
 ["If the range covers the middle 95 percent of healthy people, then <b>5 percent</b> of healthy people fall outside it on any one test.",
  "5 percent is one in twenty. So each individual test flags <b>one healthy person in twenty</b>, by construction, with nothing wrong.",
  "Run twenty independent tests on one healthy person and you have twenty chances for that to happen.",
  "The odds of at least one flag are close to even. Something coming back flagged is the ordinary outcome, not the surprising one.",
  "So a flagged value is a <b>reason to look further, not an answer</b>.",
  "What to look at next is the trend. A creatinine at the top of normal that doubled since yesterday is a bigger problem than one that is mildly high and unchanged. Both print with the same flag.",
  "<b>Draw:</b> a normal curve with the middle 95 percent shaded and the two tails left white, then twenty tick marks for twenty tests.",
  "<b>Carry:</b> one number on its own tells you very little. What that number did since last time tells you a lot, and the story only shows up across the whole set."]))
