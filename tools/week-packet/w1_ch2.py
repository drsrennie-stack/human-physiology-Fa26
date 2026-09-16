# -*- coding: utf-8 -*-
import sys; sys.path.insert(0,'/home/claude/packet')
from kit import *

B=[]; A=B.append

def clinic(rows):
    return tbl("What this means in the clinic", ["Field","What it means","Example"], rows)

A(sec("Four kinds of control"))
A(cmap("Ask what is doing the sensing, and how far the signal has to travel",
 "How the body controls a variable", [
 ("Local control", ["One tissue only",
                    "The cell that senses responds",
                    "Low oxygen widens a vessel"]),
 ("Long distance control", ["A reflex, whole body",
                            "Nerves, hormones, or both",
                            "Needs a path to travel"]),
 ("Tonic control", ["Always switched on",
                    "Turn it up or turn it down",
                    "Vessel tone works this way"]),
 ("Antagonistic control", ["Two systems, opposite jobs",
                           "Faster and finer than one",
                           "Insulin and glucagon"])]))
A(tbl("The four, defined", ["Type","What it means"],
 [["Local control","A response restricted to the tissue where the change was detected. The cell that senses the change also produces the response. Falling tissue oxygen dilates nearby arterioles"],
  ["Long distance control","A reflex involving the nervous system, the endocrine system, or both, so a change in one place produces a response somewhere else"],
  ["Tonic control","The signal is continuously on and the response is graded by changing its rate. Sympathetic tone in blood vessels works this way"],
  ["Antagonistic control","Two systems push the variable in opposite directions. Insulin and glucagon on blood glucose. Faster and finer than a single system could be"]]))
A(hold("What decides which one you are looking at",
  "Local control needs no signaling system at all, which makes it fast and limited. Reflex control needs a path, which makes it slower and general. Ask where the sensing happened and where the response appeared. If they are the same place, it is local."))
A(clinic([
 ["Nursing","Knowing whether the response is happening in one spot or across the whole body tells you what to expect when you do something about it","Warming one limb changes blood flow in that limb without changing the patient's core temperature"],
 ["Radiologic technology","Contrast only lights up tissue that is actually getting blood, so the bright areas are a picture of which local vessels are open","A tumor lights up because its own vessels are dilated and leaky, a purely local change. Nothing whole body happened. The bright spot is local blood flow made visible"],
 ["Medicine","Local control does not need nerves or hormones, so it keeps working even when the long distance systems have failed","In a transplanted heart the nerves are cut, and local metabolic control of the coronary vessels still works normally"],
 ["Respiratory therapy","The lung sends blood to the parts that are getting air, and it does that locally, with no instruction from the brain","Low oxygen in one region narrows the vessels there, pushing blood toward regions that are actually being ventilated"]]))

A(sec("The reflex loop"))
A(seq("The seven steps of a reflex control pathway",
 [("Stimulus","The change in the regulated variable that starts the loop."),
  ("Sensor, or receptor","The structure that detects the change."),
  ("Afferent pathway","Carries the signal toward the integrating center. Afferent means arriving."),
  ("Integrating center","Compares the incoming signal with the set point and decides on a response."),
  ("Efferent pathway","Carries the command outward. Efferent means exiting."),
  ("Effector","The muscle or gland that does the physical work of the response."),
  ("Response","The change produced, which feeds back on the sensor and closes the loop.")]))
A(tbl("Use the seven boxes as a differential", ["Box","If this one breaks","What that looks like"],
 [["Sensor","Nothing is detected","The body never learns that anything happened"],
  ["Afferent pathway","Nothing arrives","The change was detected and the news never reached the integrating center"],
  ["Integrating center","The comparison itself is wrong","Fever is a fault here, not in the sensors"],
  ["Efferent pathway","The command is issued and never delivered","The response you are waiting for does not appear"],
  ["Effector","The command arrives and nothing happens","Same picture as a broken efferent path, different address"],
  ["Response","The loop never closes","The sensor keeps reporting the original stimulus"]]))
A(hold("The whole seven step sequence is called the response loop",
  "Every reflex in this course is these seven boxes with different contents, so learn the shape once and then fill it in. When a regulated variable is out of range, the fault is in one of the boxes, and this list is the first thing to write when your patient file goes wrong."))
A(clinic([
 ["Nursing","Name which part of the loop is broken and you know which sign to watch for, and which sign is never going to show up","In a patient on a beta blocker, do not wait for a rising heart rate to tell you they are bleeding. Watch the other signs"],
 ["Radiologic technology","Reactions on the table fall into two groups depending on which pathway is firing, and the two look nothing alike","A patient who goes pale, sweaty and slow pulsed after an injection is a vagal reaction: the efferent nerve output dropped the heart rate. Anaphylaxis drives the heart rate up instead. Same table, opposite pathways"],
 ["Medicine","The seven boxes give you a list of suspects, and each broken box produces its own picture","A patient who cannot raise their heart rate while bleeding may have an intact sensor and a blocked efferent path, which is exactly what a beta blocker does"],
 ["Respiratory therapy","Nearly everything you do starts with a chemoreceptor noticing something, and that is the sensor box of the loop","If the sensor is blunted, the drive to breathe falls even though the stimulus telling it to rise is still there"]]))

A(prob(1,
 "A patient on a beta blocker is bleeding. Their heart rate does not rise. Name the box that is broken, say which boxes are intact, and say which sign you should therefore not be waiting for.",
 "Beta blockers act on the efferent side of the cardiovascular reflex, not on the sensors.",
 ["Write the seven boxes out before you decide anything: stimulus, sensor, afferent path, integrating center, efferent path, effector, response.",
  "<b>Stimulus.</b> Blood volume is falling. Real, and present.",
  "<b>Sensor and afferent path.</b> Intact. The change is detected and the signal arrives.",
  "<b>Integrating center.</b> Intact. It compares and issues a command to raise heart rate.",
  "<b>Efferent path.</b> <b>Blocked.</b> The command is issued and the heart never receives it.",
  "So the response never appears, and heart rate stays flat while the patient goes on bleeding.",
  "The flat heart rate is not evidence that nothing is wrong. It is evidence that one box is out of service.",
  "<b>Draw:</b> the seven boxes in a row, with a cross through the efferent arrow and a tick over the first four.",
  "<b>Carry:</b> naming the broken box tells you which sign to watch and, just as usefully, which sign is never going to show up."]))

A(sec("Feedback types"))
A(tbl("The three patterns, compared on the only three things that separate them",
 ["Pattern","What the response does","What it is for","How it stops"],
 [["Negative feedback","Opposes the stimulus","Holding a variable near a set point","Shuts itself off as the variable comes back"],
  ["Positive feedback","Reinforces the stimulus","Driving a process to completion","Needs an outside event to end it"],
  ["Feedforward","Acts before the variable has changed at all","Blunting a change you can see coming","Ends when the anticipated load arrives, or does not"]]))
A(p("Three patterns cover almost every loop in this course. They differ in one thing only: what the response does to the stimulus that triggered it."))
A(hold("Negative and positive are directions, not verdicts",
  "Positive feedback is not the body malfunctioning and negative feedback is not the body being cautious. Negative means the response subtracts from the stimulus and positive means it adds to it. That is the whole distinction, and it says nothing about whether the outcome is good for the patient."))

A(sub("Negative feedback"))
A(ul(["The response <b>opposes</b> the stimulus that produced it.",
      "Stabilizing. It shuts itself off as the variable returns toward the set point.",
      "It cannot prevent the initial change, only correct it, which is why regulated variables oscillate."]))
A(seq("Thermoregulation, worked all the way through",
 [("Core temperature falls","A cold room. This is the stimulus."),
  ("Thermoreceptors detect it","In the skin and in the hypothalamus. These are the sensors."),
  ("The hypothalamus compares it with the set point","Near 37 C (98.6 F). This is the integrating center."),
  ("Sympathetic and motor output leave","These are the efferent signals."),
  ("Vessels constrict and muscle shivers","These are the effectors."),
  ("Heat production rises and heat loss is cut","Core temperature returns toward the set point, and the sensors stop reporting cold.")]))
A(hold("Reproduce this one from memory",
  "Draw the seven boxes, then run body temperature through them with the real anatomy written in each box. Then do it again with blood glucose. Those two are what the competency names."))
A(clinic([
 ["Nursing","A body that is still fixing the problem looks different from one that has run out of room, and telling those apart is most of assessment","A brief drop on standing that recovers is the loop working. A drop that stays down is the loop failing"],
 ["Radiologic technology","Every time you sit a patient up or lay them flat you are running this loop live and watching what it does","Sitting a patient up from a supine scan drops their pressure for a few seconds before the reflex catches it. In an older or dehydrated patient the catch is slow, and that is the moment they go down. It is why you move them in stages and stay with them"],
 ["Medicine","Negative feedback cannot stop a change from happening. It can only pull it back, so the value always moves first","Blood pressure dips on standing before the reflex catches it. The dip is normal. Failing to recover from it is not"],
 ["Respiratory therapy","Breathing harder is the body's negative feedback answer to carbon dioxide going up","Rising carbon dioxide normally drives ventilation up. If the carbon dioxide is high and ventilation is not rising, the loop is broken somewhere"]]))

A(sub("Positive feedback"))
A(ul(["The response <b>reinforces</b> the stimulus, pushing the variable further from where it started.",
      "Destabilizing by design, so it needs an event <b>outside the loop</b> to stop it.",
      "Oxytocin in labor, stopped by delivery. The clotting cascade, stopped when the vessel seals. Sodium entry during an action potential, stopped by channel inactivation.",
      "Positive feedback with no off switch describes dying: uncontrolled hemorrhage and runaway hyperkalemia both work this way."]))
A(hold("The ending is the part people leave out",
  "For every positive feedback example you write down, write the outside event that shuts it off next to it. An answer that names the amplification and not the ending is half an answer."))

A(sub("Feedforward control"))
A(ul(["The body responds to a signal that <b>predicts</b> a change, before the regulated variable has moved.",
      "Salivating and secreting gastric acid at the smell of food. Heart rate rising in the seconds before exercise begins.",
      "Feedforward buys time. It cannot correct an error, because at that moment there is no error."]))
A(hold("The distinction, one line each",
  "Negative feedback reacts to what already happened. Feedforward reacts to what is about to happen. Positive feedback commits to what is happening now."))

A(sec("Set points move"))
A(tbl("Three things that move a set point, on three different timescales",
 ["What moves it","Timescale","What you see"],
 [["Fever","Hours","A deliberately raised set point, not a broken thermostat. You shiver and feel cold while your temperature is already climbing, because the body reads 37 C (98.6 F) as too cold against the new target"],
  ["Circadian rhythm","A daily cycle","Core temperature, cortisol and blood pressure all have a normal range that depends on the hour"],
  ["Acclimatization","Days to weeks","Hematocrit rises at altitude. Sweat sodium falls in a hot climate"]]))
A(hold("Feedforward against acclimatization, the question that separates them",
  "Ask how long the change took. Feedforward happens in seconds, before the load arrives, and it ends when the load arrives or does not. Acclimatization takes days to weeks and moves the target itself."))
A(clinic([
 ["Nursing","Cool a patient who is shivering and you are fighting the thermostat instead of turning it down","Shivering generates heat, so external cooling during the rise can drive the temperature higher rather than lower"],
 ["Radiologic technology","Scanner rooms are kept cold for the machine, and the patient's thermostat reacts to that whether you want it to or not","A cold, uncovered patient shivers, and shivering is movement, and movement is motion artifact. The warm blanket is an image quality tool, not just a comfort measure"],
 ["Medicine","In a fever the thermostat is not broken. It has been turned up, and the body is working hard to reach the new number","The patient shivers while their temperature is already climbing, because the body reads its current temperature as too cold against the new target"],
 ["Respiratory therapy","If carbon dioxide stays high for long enough, the sensor stops treating it as an emergency and settles on a new normal","In long standing carbon dioxide retention the body adapts to a higher normal, so the textbook number is no longer that patient's target"]]))

A(prob(2,
 "A patient with a fever is shivering hard. Their temperature is already climbing. Explain why they feel cold, and say why external cooling at this moment can make the number go up rather than down.",
 "Fever is a raised set point, not a broken thermostat. Shivering is an effector response and it generates heat.",
 ["The integrating center has been given a <b>new, higher set point</b>. Nothing is broken.",
  "The sensors report the current core temperature honestly. The comparison is now made against the new target.",
  "Against that new target, 37 C (98.6 F) reads as <b>too cold</b>, so the loop issues a warming command.",
  "The effectors do what they are told: vessels constrict and muscle shivers. That is why the patient feels cold while the number rises.",
  "Cool them externally now and you have not moved the set point. You have widened the gap the loop is trying to close.",
  "The loop answers by shivering harder, and shivering generates heat, so the temperature can rise rather than fall.",
  "<b>Draw:</b> a set point line that steps upward, with the temperature line climbing to meet it, and mark the interval where the patient feels cold.",
  "<b>Carry:</b> before you fight a response, check whether the set point moved. Cool a shivering patient and you are fighting the thermostat instead of turning it down."]))
A(prob(3,
 "Two people are described. One is standing on a start line and their heart rate rises in the seconds before the race begins. The other has been at altitude for three weeks and their hematocrit has risen. Say which is feedforward and which is acclimatization, and give the one question that separates them.",
 "Feedforward acts on a signal that predicts a change, before the regulated variable has moved. Acclimatization resets a set point over days to weeks.",
 ["<b>Ask how long the change took.</b> That is the question that separates them, and it settles both cases at once.",
  "<b>The start line.</b> Heart rate rises in <b>seconds</b>, and it rises before the exercise has changed anything the body is regulating.",
  "Nothing is out of range yet, so there is no error to correct. The body is acting on a prediction. That is <b>feedforward</b>.",
  "It ends when the anticipated load arrives, or does not. Feedforward buys time, it cannot correct an error.",
  "<b>Altitude.</b> Three weeks is not seconds. Nothing is being anticipated, and the change has become the new normal.",
  "A set point has been reset over days to weeks. That is <b>acclimatization</b>. Sweat sodium falling in a hot climate is the same thing in a different system.",
  "<b>Draw:</b> one timeline in seconds with the response drawn before the load, and one timeline in weeks with the target line itself moving.",
  "<b>Carry:</b> feedforward acts before a change and leaves the set point alone. Acclimatization moves the set point and takes weeks to do it."]))
