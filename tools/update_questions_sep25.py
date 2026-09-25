#!/usr/bin/env python3
"""
tools/update_questions_sep25.py

One-time refresh of the answered questions, Sep 25 2026, so Hootie and
course-questions.html describe the course as it runs now: the weekly
loop with the pre-read and two passes, the Competency Study Guide marked
complete or not complete, the Mastery Check standard (one week, at least
50 questions, every competency, 80 percent), the three-question
whiteboard midterm, the exam practice in Weeks 4 and 5, the study tools,
Week 8 as the exam week, and Midterm 2 covering Weeks 9 to 14.

The page and the generated bank had drifted apart in 11 answers (Scholar
Points came back Sep 13 and was fixed only in the bank, for one). This
takes the bank as the base, applies the edits below, and writes every
question back into course-questions.html, so the page is the single
source again. Then run:

    node tools/build_question_bank.js
"""
import json, re, pathlib, subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / "course-questions.html"

bank = json.loads(subprocess.check_output(
    ["node", "-e", "global.window={};require('./bio005-question-bank.js');"
                   "console.log(JSON.stringify(window.BIO005_QUESTIONS))"], cwd=ROOT))
by = {e["id"]: e for e in bank}

def L(href, text):
    return '<a href="%s" target="_top">%s</a>' % (href, text)

MIDTERM = ("Each midterm has three multiple choice questions, and you record yourself for the whole of each one. "
           "You get 10 minutes to plan and build a physiological model on a whiteboard, from memory with no notes, "
           "then 5 minutes to teach it out loud, and you finish by giving your answer. The model and your teaching "
           "are worth 75 percent of the points for that question, and your answer is worth 25 percent.")

LOOP = ("<ol><li>The pre-read: a quick look at the headings and figures, with a few short questions. Turned in.</li>"
        "<li>First pass, in your first color: work through the week's lessons and videos in order, filling each box of "
        "your Competency Study Guide as you go.</li>"
        "<li>Second pass, in your second color: go back through the same lessons and add what you missed and fix what "
        "was wrong. Do not erase the first color.</li>"
        "<li>Upload your Competency Study Guide with both colors on it.</li>"
        "<li>Study it for several days: Rx Cards, brain dumps, and drawing from memory.</li>"
        "<li>The Mastery Check, and upload the report.</li>"
        "<li>The lab: PhysioEx, then the worksheet.</li>"
        "<li>Your application case, worked into your patient chart.</li>"
        "<li>Your patient chart: this week's numbers and your thinking.</li>"
        "<li>The discussion: post by Friday, replies by Sunday.</li></ol>")

EDIT = {
 "q1": (None, "<p>Open the week's <b>Start here</b> page in Canvas, or the week page on the course site, and follow the "
        "steps in order. Every week runs the same loop:</p>" + LOOP +
        "<p>Everything is due Sunday at 10:00 pm, except the first discussion post, which is due Friday.</p>"),
 "q2": (None, "<p>Read the " + L("syllabus-fall2026.html", "syllabus") + ", buy Pearson access through Access Pearson "
        "in Canvas, post your Week 1 vision board discussion, and start the Week 1 Competency Study Guide. That is a "
        "full first day.</p>"),
 "q10": (None, "<p>Open the week's <b>Start here</b> page in Canvas. It lists the week's steps in order with every due "
         "date, and it lets you choose how to work: stay in Canvas and press Next through the module, or open the "
         "interactive week page on the course site. Both have the same steps and the same due dates, and you turn "
         "everything in through Canvas either way.</p>"),
 "q18": ("I do not know what to do. What is the exact order?",
         "<p>Every week is the same ten steps, in this order:</p>" + LOOP +
         "<p>For the lab, run PhysioEx first, then complete the worksheet. If a step does not work for the way you "
         "learn, see the next question: the method bends, the course requirements do not.</p>"),
 "q19": (None, "<p>Then adjust it. The order is the default because it works for most people, not a rule you can "
         "fail. If the lessons stall you, start with the videos. If writing is slow for you, talk your answer out "
         "loud first, then write it. What has to survive any change, because it is how this course is built: at some "
         "point you answer from memory rather than while looking, your two colors stay honest about what came from "
         "your first pass and what came from your second, PhysioEx runs before the worksheet, and the Sunday "
         "deadline does not move. If you want help designing your version, bring it to office hours.</p>"),
 "q20": (None, "<p>Fifteen weeks with two midterms. Midterm 1 comes at the end of Week 8 and covers Weeks 1 to 7. "
         "Midterm 2 is at the front of Week 15 and covers Weeks 9 to 14. Weeks 2 and 3 run as one combined block, and "
         "Week 8 has no new teaching. Every week has its own page with the same steps, and the "
         + L("course-schedule.html", "schedule") + " shows the whole term.</p>"),
 "q22": (None, "<p>The week's title, its competencies, the steps in order with links, and what is due and when. On "
         "some weeks it also carries the clinical correlation videos.</p>"),
 "q31": (None, "<p>Hootie the Knowfish, the Ask Hootie button in the bottom right corner of the course pages. Ask "
         "where things are, what is due, or how something works, in plain words. Hootie does not answer physiology "
         "questions, because those are what you are examined on.</p>"),
 "q38": ("What is the Course tools button?",
         "<p>The button in the bottom left corner of the course pages. It opens with your study tools on top: "
         + L("rx-cards.html", "Rx Cards") + ", the " + L("competency-brain-dump.html", "Brain Dump") + ", the "
         + L("practice-exam.html", "Mastery Check") + " and "
         + L("mastery-physio-os-standalone.html?open=drawknow", "Draw It to Know It") + ". Below those are this week, "
         "your Competency Study Guide, the labs, the schedule and the syllabus. Type a few letters to find a tool.</p>"),
 "q42": (None, "<p>Four categories. Show Me What You Know, the two exams, 35 percent. Investigate It, the labs, 25 "
         "percent. Use It, your application cases and patient chart, 25 percent. Think About It, the discussions, 15 "
         "percent. The pre-read, the Competency Study Guide and the Mastery Check carry no points on purpose; you "
         "still turn them in each week and they are marked complete or not complete. Full detail in the "
         + L("syllabus-fall2026.html", "syllabus") + ".</p>"),
 "q47": (None, "<p>They are not graded for content. You upload the guide each week with both colors on it, and it is "
         "marked complete or not complete. What matters is that both passes are there and honest, because the gap "
         "between your two colors is what tells you what to study.</p>"),
 "q48": (None, "<p>One post a week, due Friday at 10:00 pm, and replies due Sunday at 10:00 pm. Most weeks the post "
         "asks what your Mastery Check showed you, what you did about it, and what happened when you tried again, "
         "plus one question about the physiology. Weeks 4 and 5 are an exam practice instead: see the question about "
         "the exam practice. The Canvas discussion states the details each week.</p>"),
 "q50": (None, "<p>No. Book problems carry no points and nothing is submitted. They are listed on the Week 1 to 3 "
         "pages as practice, and there are two ways to use them: work them forwards if you have a way in, or work "
         "them backwards by reading a solution and writing why each step is there, then reproducing it from blank "
         "paper.</p>"),
 "q55": (None, "<p>One midterm is 17.5 percent of the grade, and there is a lot of the grade left. Find the gap with "
         "the Mastery Check, come to office hours, and fix it before the next block, because physiology compounds.</p>"),
 "q57": ("Why do the Competency Study Guides carry no points?",
         "<p>Because they are where you find out what you do not know, and that only works if the guide is honest "
         "rather than tidy. They are what makes everything else possible, and they double as your midterm study "
         "guide, so the payoff comes on the exam, not on the sheet. You still upload it each week, marked complete "
         "or not complete.</p>"),
 "q63": (None, "<p>Participation in an online course is submitted work. Each week that means the pre-read, your "
         "Competency Study Guide, your Mastery Check report, your lab, your application case and your discussion. "
         "Census is September 27, and I certify who is actively participating from what has been turned in.</p>"),
 "q64": (None, "<p>No. The four categories and their weights are fixed for the term: 35, 25, 25 and 15. What you see "
         "in the " + L("syllabus-fall2026.html", "syllabus") + " is the whole deal.</p>"),
 "q66": (None, "<p>A weekly guide with one box for each competency you must be able to do that week, and two prompts "
         "for each box to choose from. You fill it in two passes, one color each, as you work through the week's "
         "lessons, then upload it. It is your study guide for the rest of the week and for the midterm.</p>"),
 "q68": ("Is my Competency Study Guide graded for accuracy?",
         "<p>No. It is marked complete or not complete. What counts is that both passes are there, in two colors, "
         "from your own work.</p>"),
 "q70": (None, "<p>Two colors telling the truth. First color: what you built on your first pass through the lessons. "
         "Second color: what you added or fixed on your second pass. A drawing or a sequence you could teach from, not "
         "a copied sentence. If your guide can carry you through a brain dump without the book, it is good.</p>"),
 "q71": (None, "<p>On the week's page and in the week's Canvas module, as a printable PDF and on screen, posted when "
         "the week opens. The printable one says Competency Study Guide at the top.</p>"),
 "q73": (None, "<p>Upload what you have by Sunday at 10:00 pm. Partial beats nothing, and the late policy applies "
         "after the deadline.</p>"),
 "q75": (None, "<p>Plan on three to four hours for the first pass and 30 to 60 minutes for the second, spread across "
         "a few sittings early in the week.</p>"),
 "q76": (None, "<p>Your first color is your first pass through the week's lessons and videos. Your second color is "
         "everything you add or fix on the second pass. Never erase the first color. The result reads at a glance: "
         "the second color is exactly what you still need to commit to memory, and that is where your studying "
         "goes.</p>"),
 "q79": ("Is there a Competency Study Guide in a midterm week?",
         "<p>Week 8 has no new material, so there is no guide that week. Monday to Wednesday is for review, and "
         "Midterm 1 runs Thursday to Sunday. Week 15 is only three days, and Midterm 2 runs during it.</p>"),
 "q95": (None, "<p>" + MIDTERM + " The model shows the mechanism: label it, explain each step and say why it "
         "happens.</p>"),
 "q99": (None, "<p>No. Each midterm is a window, not an hour. Midterm 1 opens Thursday, October 29 at 8:00 am and "
         "closes Sunday, November 1 at 10:00 pm. Midterm 2 opens Monday, December 14 at 8:00 am and closes Wednesday, "
         "December 16 at 10:00 pm. You pick when inside the window.</p>"),
 "q100": (None, "<p>No notes, no book, nothing open, including during the 10 minutes you spend building your model. "
          "You, a whiteboard and your own head, on camera the whole time. That is the point of the format.</p>"),
 "q101": (None, "<p>A phone propped up so it sees you and the whole whiteboard works fine. Keep recording for the "
          "whole question: the 10 minutes of building your model and the 5 minutes of teaching it. Submission "
          "instructions are on the exam in Canvas.</p>"),
 "q102": (None, "<p>About 15 minutes for each question: 10 minutes to build your model and 5 minutes to teach it, "
          "ending with your answer. There are three questions on each midterm.</p>"),
 "q104": (None, "<p>Three multiple choice questions built from that block's competencies in the "
          + L("competency-packet.html", "packet") + ". If you can build and teach the model behind each "
          "competency from memory, you are ready.</p>"),
 "q105": (None, "<p>Weeks 4 and 5 are a full practice run of the format before it counts. And every week's study "
          "step practices the model part: building a mechanism from memory and explaining it out loud.</p>"),
 "q107": (None, "<p>Each window is several days long so a bad day cannot sink you. Record early and submit early.</p>"),
 "q116": ("What happens to regular work during the midterm weeks?",
          "<p>Week 8 has no new teaching: Monday to Wednesday is yours to review, and Midterm 1 runs Thursday to "
          "Sunday. Midterm 2 runs during the three days of Week 15.</p>"),
 "q117": ("Can I choose which question I get?",
          "<p>No. The exam gives you the questions. Your model is how you work out each answer, and every question "
          "comes from the competencies you have already studied.</p>"),
 "q118": (None, "<p>A whiteboard and markers, decent light, and a phone propped where it sees you and the whole board. "
          "Set them up before you press record.</p>"),
 "q155": (None, "<p>Midterms have their own windows of several days. Inside the window, any time. After it closes, "
          "it is closed.</p>"),
 "q160": (None, "<p>A workable shape: the pre-read first, your first pass in two or three sittings early in the week, "
          "the second pass and the upload, study sessions spread over several days, your discussion post by Friday, "
          "and the Mastery Check, lab and case by Sunday. Never all of it on Sunday.</p>"),
 "q162": (None, "<p>The last teaching week before each midterm, Week 7 and Week 14, usually asks the most, because "
          "new material and review overlap. Week 8 itself has no new teaching.</p>"),
 "q166": (None, "<p>No. The weeks open on schedule, and the rhythm is how the course works. Two weeks are open at a "
          "time, so you can work one week ahead.</p>"),
 "q177": (None, "<p>Watch each concept's video during your first pass, alongside its lesson, and again whenever a "
          "part is still unclear. In the walkthroughs, look for the Stuck? Watch a short explanation button. Fill "
          "that competency's box in your first color as you go, then add and fix in your second color on your second "
          "pass.</p>"),
 "q178": (None, "<p>Clear your Rx Cards, retry this week's error log rows cold, do a brain dump or two, and skim next "
          "week's Start here page so Monday starts warm.</p>"),
 "q183": ("What is the exam practice in Weeks 4 and 5?",
          "<p>A full practice run of the midterm format before it counts, on material from Week 2.</p>"
          "<p><b>Week 4.</b> Two multiple choice questions, one at a time, one video each: 15 minutes preparing your "
          "answer on camera by building a model from memory, then 5 minutes presenting it and giving your answer. The "
          "videos go to me only, through an assignment. Then you post in Discussion 4 about how it went, where you got "
          "stuck, and what you will do about it, and you help each other with solutions.</p>"
          "<p><b>Week 5.</b> The rubrics and the answer key come out. You score your own models, answers and "
          "presenting, and analyze what it shows you in Discussion 5.</p>"),
 "q220": (None, "<p>Not reflexively. One midterm is 17.5 percent, and there is a lot of the grade left. Look at the "
          "math and come talk to me before the last day to drop with a W, Saturday, November 21.</p>"),
}

NEW = [  # (after_id, entry)
 ("q42", {"id": "q251", "q": "What is the Mastery Check, and when does it count?",
  "a": "<p>A practice exam you build yourself in the " + L("practice-exam.html", "Mastery Check") + ". An attempt "
       "counts when it covers one week, has at least 50 questions, tests every competency that week, and you score 80 "
       "percent or higher. The report says Met or Not yet for each of those. Take it as many times as you like; each "
       "try is a fresh set of questions. When an attempt meets the standard, save the report as a PDF and upload it. "
       "It carries no points, and it is marked complete or not complete.</p>"}),
 ("q66", {"id": "q252", "q": "What is the pre-read?",
  "a": "<p>The first step of every week, about 30 minutes. A quick look ahead, not a full read: you look at the "
       "headings and figures in that week's chapters and answer a few short questions, so the lessons make more sense "
       "when you get to them. Fill it in on screen or on the printable copy, then upload it. It is marked complete or "
       "not complete.</p>"}),
 ("q169", {"id": "q253", "q": "What is the Brain Dump tool?",
  "a": "<p>The " + L("competency-brain-dump.html", "Brain Dump") + " picks a random competency and prompt for you. "
       "Pick a week and press Spin. Do the prompt on paper, from memory, with everything closed. Then press Check my "
       "work and tick only what is actually on your paper against the list of what the prompt asked for. The "
       "competencies you keep leaving pieces out of collect in a weakest list, so you know what to drill next.</p>"}),
 ("q253", {"id": "q254", "q": "What is Draw It to Know It?",
  "a": "<p>A drawing exercise in the " + L("mastery-physio-os-standalone.html?open=drawknow", "Mastery OS") + ". It "
       "asks how sure you feel about a competency, then gives you a prompt: draw the mechanism or build a small map "
       "from memory on the canvas, then open the self check list and mark what you covered. When you went in "
       "confident and came out patchy, it moves that competency up your weak spot list.</p>"}),
 ("q254", {"id": "q255", "q": "Where are all the study tools in one place?",
  "a": "<p>Press <b>Course tools</b> in the bottom left corner of any course page. Your study tools are at the top: "
       + L("rx-cards.html", "Rx Cards") + ", the " + L("competency-brain-dump.html", "Brain Dump") + ", the "
       + L("practice-exam.html", "Mastery Check") + " and "
       + L("mastery-physio-os-standalone.html?open=drawknow", "Draw It to Know It") + ".</p>"}),
 ("q42", {"id": "q256", "q": "What is the patient chart?",
  "a": "<p>One patient you follow all term, by hand. Each week you copy that week's numbers into your flowsheets and "
       "add what changed, your problem list, a drawing and your thinking, including what you worked out in that week's "
       "application case. Nothing is uploaded weekly. The whole " + L("patient-chart-book.html", "chart") + " is "
       "turned in once, on Wednesday, December 16.</p>"}),
]

for k, (q, a) in EDIT.items():
    if q: by[k]["q"] = q
    by[k]["a"] = a

page = PAGE.read_text(encoding="utf-8")

def block(e):
    return ('<details class="qa" id="%s"><summary>%s</summary><div class="ans">%s</div></details>'
            % (e["id"], re.sub(r"&(?!#?\w+;)", "&amp;", e["q"]).replace("<", "&lt;"), e["a"]))

pat = re.compile(r'<details class="qa" id="(q\d+)"><summary>[\s\S]*?</summary><div class="ans">[\s\S]*?</div></details>')
page = pat.sub(lambda m: block(by[m.group(1)]) if m.group(1) in by else m.group(0), page)

for after, e in NEW:
    if ('id="%s"' % e["id"]) in page:
        page = pat.sub(lambda m: block(e) if m.group(1) == e["id"] else m.group(0), page)
        continue
    m = re.search(r'<details class="qa" id="%s">[\s\S]*?</details>' % after, page)
    page = page[:m.end()] + "\n" + block(e) + page[m.end():]

PAGE.write_text(page, encoding="utf-8")
print("course-questions.html updated:", len(EDIT), "answers edited,", len(NEW), "added")
