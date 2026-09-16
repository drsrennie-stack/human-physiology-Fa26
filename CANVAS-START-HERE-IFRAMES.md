# Canvas paste blocks: START HERE

Built September 15, 2026. Every page below works in two places from one file. Inside a Canvas iframe it shows no site navigation at all, just a gold Back to Canvas modules button. Opened directly on the website it shows a Course home link and a link across to Canvas instead. It picks which one before the page paints, so nothing flickers.

Paste each block into the Canvas HTML editor for that page.

---

## Enter the Course Here -->

**The iframe.** The door detects that it is framed and switches its button to `target="_top"` with the full GitHub Pages address, so one click navigates the whole browser window out of Canvas and onto the course website, where the site's own navigation takes over. Back brings them to Canvas.

```html
<p><iframe style="width: 100%; min-height: 1100px; border: 1px solid #d9dde3; border-radius: 8px;" src="https://drsrennie-stack.github.io/human-physiology-Fa26/index.html" width="100%" height="1100" title="BIO 005 Human Physiology, enter the course" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen" loading="lazy"></iframe></p>
```

**Or the card, no iframe.** Same page without a frame, if you would rather not fight the height: Canvas rewrites iframe attributes when a page is saved from the rich editor, which is why it keeps reverting. Two buttons, stay in Canvas or leave for the website.

```html
<div style="max-width:860px;margin:0 auto;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#0B1530"><div style="display:flex;align-items:center;gap:10px;margin:0 0 6px"><svg viewBox="40 10 125 148" width="34" height="40" role="img" aria-label="BIO 005 Human Physiology"><g transform="translate(0,18)"><g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g><g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/><path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g><g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g></g></svg><span><span style="display:block;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;font-weight:800;letter-spacing:-.02em;color:#0B1530;line-height:1.05">BIO <b style="color:#8B3A2E">005</b></span><span style="display:block;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#414B5C;margin-top:3px">Human Physiology</span></span></div><h2 style="margin:14px 0 8px;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:30px;font-weight:800;letter-spacing:-.022em;color:#0B1530;line-height:1.12">Two ways to take this course. <span style="color:#8B3A2E">Pick either one.</span></h2><p style="margin:0 0 6px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;line-height:1.6;color:#414B5C;max-width:62ch">The material is identical in both places, in the same order, under the same names. Nothing is hidden on one side. You can switch whenever you like, and you will not lose your place.</p><p style="margin:0 0 22px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#0B1530;max-width:62ch">Assignments are turned in through Canvas whichever one you use, so if a step ends in an upload it will hand you back here for that one thing.</p><div style="display:flex;flex-wrap:wrap;gap:18px;align-items:stretch"><div style="flex:1 1 300px;min-width:280px;background:#FFFFFF;border-radius:12px;box-shadow:0 1px 3px rgba(11,21,48,.08);padding:24px 24px 22px"><p style="margin:0 0 8px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#8B3A2E">Option 1</p><h3 style="margin:0 0 10px;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:21px;font-weight:800;letter-spacing:-.022em;color:#0B1530;line-height:1.15">Stay in Canvas</h3><p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#0B1530">Everything is here in the modules. Work down the list in order, top to bottom. This is the one to pick if you like Canvas or you are used to it.</p><p style="margin:0"><a href="https://yccd.instructure.com/courses/42616/modules" target="_top" style="display:inline-flex;align-items:center;gap:9px;min-height:48px;padding:13px 24px;border-radius:8px;background:#FFFFFF;border:2px solid #0B1530;color:#0B1530;text-decoration:none;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-weight:800;font-size:15px">Go to the modules</a></p><p style="margin:12px 0 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13.5px;color:#414B5C">You are already here. Nothing new opens.</p></div><div style="flex:1 1 300px;min-width:280px;background:#FFFFFF;border-radius:12px;box-shadow:0 1px 3px rgba(11,21,48,.08);padding:24px 24px 22px"><p style="margin:0 0 8px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#8B3A2E">Option 2</p><h3 style="margin:0 0 10px;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:21px;font-weight:800;letter-spacing:-.022em;color:#0B1530;line-height:1.15">Use the course website</h3><p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#0B1530">The same course as a plain website, outside Canvas. Cleaner pages and fewer menus. This is the one to pick if the Canvas navigation gets in your way.</p><p style="margin:0"><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/course.html" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;min-height:48px;padding:13px 24px;border-radius:8px;background:#8B3A2E;border:2px solid #8B3A2E;color:#FFFFFF;text-decoration:none;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-weight:800;font-size:15px">Open the course website</a></p><p style="margin:12px 0 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13.5px;color:#414B5C">Opens in a new tab. Canvas stays open behind it.</p></div></div><p style="margin:22px 0 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#414B5C">Not sure? Start in Canvas. If the navigation gets in your way, come back and open the website instead.</p></div>
```

---

## 1. Course Tools

The old floating tools dock as a flat page: every study tool, every lab, the Practice Exam and Gap Finder, grouped, with the same icons. Mastery OS is out. Every tile opens in its own tab.

File: `course-tools.html`

```html
<iframe id="bio005-course-tools" src="https://drsrennie-stack.github.io/human-physiology-Fa26/course-tools.html"
        title="Course Tools" width="100%" height="1870"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 2. Course home, the whole course as a list

The off Canvas mirror of this modules page. Same order, same names.

File: `course.html`

```html
<iframe id="bio005-course" src="https://drsrennie-stack.github.io/human-physiology-Fa26/course.html"
        title="Course home, the whole course as a list" width="100%" height="3750"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 3. How Grading Works

File: `how-grading-works.html`

```html
<iframe id="bio005-how-grading-works" src="https://drsrennie-stack.github.io/human-physiology-Fa26/how-grading-works.html"
        title="How Grading Works" width="100%" height="3150"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 4. Textbook/Mastering A&P/Pearson

File: `access-pearson.html`

```html
<iframe id="bio005-access-pearson" src="https://drsrennie-stack.github.io/human-physiology-Fa26/access-pearson.html"
        title="Textbook/Mastering A&P/Pearson" width="100%" height="4120"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 5. Scholar Points

Up to 2.5 percent for studying with other people, and why it is not extra credit.

File: `scholar-points.html`

```html
<iframe id="bio005-scholar-points" src="https://drsrennie-stack.github.io/human-physiology-Fa26/scholar-points.html"
        title="Scholar Points" width="100%" height="4810"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 6. Syllabus & Course Policies

Long page. It has its own contents list at the top that jumps down the page.

File: `syllabus-fall2026.html`

```html
<iframe id="bio005-syllabus-fall2026" src="https://drsrennie-stack.github.io/human-physiology-Fa26/syllabus-fall2026.html"
        title="Syllabus & Course Policies" width="100%" height="18580"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 7. Weekly Schedule

Weeks 2 and 3 are one row. Week 4 opens September 28.

File: `course-schedule.html`

```html
<iframe id="bio005-course-schedule" src="https://drsrennie-stack.github.io/human-physiology-Fa26/course-schedule.html"
        title="Weekly Schedule" width="100%" height="2500"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 8. AI Use in this Course

File: `ai-in-this-course.html`

```html
<iframe id="bio005-ai-in-this-course" src="https://drsrennie-stack.github.io/human-physiology-Fa26/ai-in-this-course.html"
        title="AI Use in this Course" width="100%" height="2450"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 9. Week 1 Discussion: Digital Vision Board/Introduction

The instructions page. The discussion itself is still the Canvas discussion, and the page links to it.

File: `assignment-discussion-01-visionboard.html`

```html
<iframe id="bio005-assignment-discussion-01-visionboard" src="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-discussion-01-visionboard.html"
        title="Week 1 Discussion: Digital Vision Board/Introduction" width="100%" height="2340"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 10. How Every Week Works

The eight steps, topic free, with the big numbers. This is the one to point a lost student at.

File: `how-every-week-works.html`

```html
<iframe id="bio005-how-every-week-works" src="https://drsrennie-stack.github.io/human-physiology-Fa26/how-every-week-works.html"
        title="How Every Week Works" width="100%" height="3890"
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
- **The brand is back.** Sep 15 2026: the first version of these pages was built on an invented layout and lost the three figure mark, the two tone wordmark, the two tone headline, the dark navy signature band and the gold dot footer. They are all forked from virtual-office.html now, which is the reference page for this site.
- **Numbered lists get big numbers.** 44px gold circles, Plus Jakarta Sans at 800, and the numbering runs straight through a procedure even when it is split across cards.
- **Scholar Points is on the list.** It was missing from START HERE and from the course home.
- **The door breaks out of the frame.** Framed, its button switches to the real site address with target=_top, which navigates the whole browser window rather than the frame, so the student genuinely leaves Canvas.
- **How Every Week Works is new.** It replaces the old How this course works, which still described four stages and a loop.
