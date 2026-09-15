# Canvas paste blocks: START HERE

Built September 15, 2026. Every page below works in two places from one file. Inside a Canvas iframe it shows no site navigation at all, just a gold Back to Canvas modules button. Opened directly on the website it shows a Course home link and a link across to Canvas instead. It picks which one before the page paints, so nothing flickers.

Paste each block into the Canvas HTML editor for that page.

---

## 1. Enter the Course Here -->

The front door. One button into the website, and the note that Canvas carries the same material. Students who came in through Canvas do not need this one, so it is optional as a module item.

File: `index.html`

```html
<iframe id="bio005-index" src="https://drsrennie-stack.github.io/human-physiology-Fa26/index.html"
        title="Enter the Course Here -->" width="100%" height="1000"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 2. Course home, the whole course as a list

The off Canvas mirror of this modules page. Same order, same names.

File: `course.html`

```html
<iframe id="bio005-course" src="https://drsrennie-stack.github.io/human-physiology-Fa26/course.html"
        title="Course home, the whole course as a list" width="100%" height="2650"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 3. How Grading Works

File: `how-grading-works.html`

```html
<iframe id="bio005-how-grading-works" src="https://drsrennie-stack.github.io/human-physiology-Fa26/how-grading-works.html"
        title="How Grading Works" width="100%" height="3030"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 4. Textbook/Mastering A&P/Pearson

File: `access-pearson.html`

```html
<iframe id="bio005-access-pearson" src="https://drsrennie-stack.github.io/human-physiology-Fa26/access-pearson.html"
        title="Textbook/Mastering A&P/Pearson" width="100%" height="4130"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 5. Syllabus & Course Policies

Long page. It has its own contents list at the top that jumps down the page.

File: `syllabus-fall2026.html`

```html
<iframe id="bio005-syllabus-fall2026" src="https://drsrennie-stack.github.io/human-physiology-Fa26/syllabus-fall2026.html"
        title="Syllabus & Course Policies" width="100%" height="17700"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 6. Weekly Schedule

Weeks 2 and 3 are one row. Week 4 opens September 28.

File: `course-schedule.html`

```html
<iframe id="bio005-course-schedule" src="https://drsrennie-stack.github.io/human-physiology-Fa26/course-schedule.html"
        title="Weekly Schedule" width="100%" height="2330"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 7. AI Use in this Course

File: `ai-in-this-course.html`

```html
<iframe id="bio005-ai-in-this-course" src="https://drsrennie-stack.github.io/human-physiology-Fa26/ai-in-this-course.html"
        title="AI Use in this Course" width="100%" height="2360"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 8. Week 1 Discussion: Digital Vision Board/Introduction

The instructions page. The discussion itself is still the Canvas discussion, and the page links to it.

File: `assignment-discussion-01-visionboard.html`

```html
<iframe id="bio005-assignment-discussion-01-visionboard" src="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-discussion-01-visionboard.html"
        title="Week 1 Discussion: Digital Vision Board/Introduction" width="100%" height="2120"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 9. How Every Week Works

The eight steps, topic free. This is the one to point a lost student at.

File: `how-every-week-works.html`

```html
<iframe id="bio005-how-every-week-works" src="https://drsrennie-stack.github.io/human-physiology-Fa26/how-every-week-works.html"
        title="How Every Week Works" width="100%" height="3630"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

---

## About the heights

Each height was measured by rendering the page at 900px wide, about what a Canvas module page gives its content, then adding four percent of headroom. Canvas strips the script tag out of a pasted page, so the height sender built into each file never runs inside Canvas and these fixed numbers are what a student actually gets. If a page ever looks cut off, raise its number.

On a phone the pages get taller, because the cards stack. The iframe scrolls inside itself in that case rather than clipping, so nothing is lost.

---

## What changed on these pages

- **Weeks 2 and 3 are one block everywhere.** The schedule, the syllabus and the course home all show a single row for September 14 to 27, everything due Sunday September 27. There is no separate Week 3 row left for a student to find.
- **Week 4 opens Monday, September 28.** That date is on the door, the course home, the schedule and the syllabus.
- **The syllabus schedule had a duplicated row.** Old Weeks 3 and 4 both read "Membrane potential, neurons and synapses". That is fixed, and the weeks after it renumbered, which moved Midterm 1 to Week 8 and Midterm 2 coverage to Weeks 9 to 14.
- **Loop and Mastery OS wording is gone** from the syllabus, the grading page and the how it works page. Those described a structure the course no longer uses. Everything now describes the eight steps.
- **How Every Week Works is new.** It replaces the old How this course works, which still described four stages and a loop.
