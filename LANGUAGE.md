# How this course talks to students

BIO 005 Human Physiology, Yuba College.

Every word a student reads has to be **plain and exact**. Plain means they do not need a glossary. Exact means it says the specific thing, not a gesture at it. A title that sounds clever and leaves a student unsure what the week is about fails both tests.

---

## The two tests

Before any student-facing string ships, it passes both:

1. **Plain.** Would a first-term student, reading fast, on a phone, know what this means without asking?
2. **Exact.** Does it name the actual thing? "Moving, and running the background" is not a week title. "How you move, and what your body runs automatically" is.

If a phrase is clever but vague, it fails. Clever is not the goal.

---

## Words that never reach a student

These are instructor and build vocabulary. They belong in the data files and the instructor tools, never on a page a student opens.

| Never on a student page | Say instead |
|---|---|
| DOK, DOK 3, depth of knowledge | Know it, Use it, Work it out |
| yield, high-yield, core, support | Must know, Important, If you have time |
| facets | nothing, it is an internal tag |
| asynchronous | online, on your own time |
| synchronous | at a set time |
| assessed on, examinable | on Exam 3 |
| demonstrate | show |
| module | **unit** (see below) |
| container, beats, cadence | the shape of the week, the four steps |
| scaffold, formative, summative, metacognition | say the actual thing |
| placeholder, TO CONFIRM, in build | either finish it or say "not built yet" in plain words |
| schema, slug, null, JSON, localStorage | nothing, students never see code words |
| TBL, iRAT, tRAT | not in this course at all, leftovers from BIO 004 |

### Instructor tools are exempt

`competency-map.html` and the Instructor Configuration panel inside the OS are for you. DOK, yield and facets are the right words there. Do not strip them from those.

### Real physiology terms are not jargon

"Facilitated diffusion", "ATP yield", "osmolarity" are the vocabulary of the course. Students are here to learn them. The rule is about **administrative and design** vocabulary, not subject vocabulary.

---

## Unit, not module

Student-facing, the five blocks are **Units**. Unit 1 through Unit 5.

`module` still exists as a field name in `bio005-competencies.js` and as an internal id. That is fine, students never see a field name. What they must never see is one page saying Unit 3 and another saying Module 3 for the same thing, which is exactly what was happening before Aug 17.

---

## Week titles

A week title tells a student what they will be able to do by Sunday. It is not a theme, a mood, or a pun.

| Was | Now |
|---|---|
| Pumps, potentials, and the language cells use | Membrane potential, and how cells send signals |
| Moving, and running the background | How you move, and what your body runs automatically |
| Sensing the world | How you see, hear, taste, smell and feel |
| The heart as a pump | How the heart pumps blood |
| Acid-base, digestion, and fuel | Blood pH, digestion, and how you use food for fuel |

The full fifteen live in `bio005-schedule-fall2026.js`. That file is the source. `schedule-fall2026.js` and the copy embedded in the OS are generated from it, so change it there and regenerate, never edit the copies.

---

## The word "competency"

Keep it. It is the spine of the course and your syllabus already defines it plainly: *each one a single thing you should be able to do*.

The rule is that it is **always introduced in plain words the first time it appears on a page**, and that the plain phrasing does the work in labels. "What you should be able to do by Sunday (11 competencies)" is right. "11 competencies" on its own, with no plain gloss anywhere on the page, is not.

---

## Checking

`tools/language-audit.py` scans every student-facing page and reports anything on the banned list. Run it before you push.

```bash
python3 tools/language-audit.py
```

It knows which pages are instructor tools and skips them. It does not catch vague-but-plain writing, which is the harder failure. For that, read the page as a student would and apply the two tests at the top.

---

## Voice: write it the way you say it

Added Aug 21, 2026, from Scrubs: *"Make it sound like it's written by a professor who is talking to students. 'The arithmetic this course needs' sounds formal. I'd be pretty straightforward, like: you know the math you need to understand for physiology."*

Write in **second person**, in the words you would use out loud. A heading is allowed to be a sentence. Contractions are fine. Formal register reads as distance, and distance is the last thing a student who is behind needs.

| Formal | The way you say it |
|---|---|
| The arithmetic this course needs | The math you need for physiology |
| The chemistry, only the parts that do work here | The chemistry you actually need |
| Homeostasis, and the three things it is not | Homeostasis, and the three things people mix it up with |
| Feedback loops, the shape of the whole course | Feedback loops. If you learn one diagram, learn this one |
| Local control and reflex control | Two ways your body controls things |
| Mass balance, the accounting of the body | Mass balance. What goes in, what goes out |
| One problem, everything in it | One patient, everything in it |
| A person faints on a hot day | Somebody faints on a hot day |
| It is arithmetic you already have | You already know how to do it |
| Physiological variables also vary genuinely | And bodies genuinely vary |

The test: **read it out loud.** If you would not say it to a student standing at your desk, rewrite it.

---

## Strategic bolding, for retention

Added Aug 21, 2026, from Scrubs: *"strategic bolding for memory retention."*

Bold is a retrieval cue, not emphasis. A student skimming a page a second time should be able to read only the bold and come away with the thing worth keeping.

**Bold these:**

- the term at the moment it is defined, once, and not again
- the number that has to be memorized: **42 L**, **145 mM**, **7.35 to 7.45**
- the decision rule, the sentence they will actually use on an exam: **same tissue, local, different, reflex**
- the counterintuitive half of a contrast: water leaves cells and **cells shrink**

**Do not bold:**

- whole sentences, more than rarely, and never two in a row
- more than about two things in a paragraph. Bolding everything bolds nothing.
- something already carried by a heading, a table header, or a card label
- anything in a concept-check question. The question has to stay neutral or the bold gives the answer away.
