# Canvas paste blocks: START HERE

Built September 15, 2026. Every page below works in two places from one file. Inside a Canvas iframe it shows no site navigation at all, just a gold Back to Canvas modules button. Opened directly on the website it shows a Course home link and a link across to Canvas instead. It picks which one before the page paints, so nothing flickers.

Paste each block into the Canvas HTML editor for that page.

---

## Enter the Course Here -->

**The iframe.** The door detects that it is framed and switches its button to `target="_top"` with the full GitHub Pages address, so one click navigates the whole browser window out of Canvas and onto the course website, where the site's own navigation takes over. Back brings them to Canvas.

```html
<p><iframe style="width: 100%; min-height: 1300px; border: 1px solid #d9dde3; border-radius: 8px;" src="https://drsrennie-stack.github.io/human-physiology-Fa26/index.html" width="100%" height="1300" title="BIO 005 Human Physiology, enter the course" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen" loading="lazy"></iframe></p>
```

**Or the card, no iframe.** Same page without a frame, if you would rather not fight the height: Canvas rewrites iframe attributes when a page is saved from the rich editor, which is why it keeps reverting. Two buttons, stay in Canvas or leave for the website.

```html
<div style="max-width:900px;margin:0 auto;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#0B1530"><div style="text-align:center;padding:6px 0 0"><p style="margin:0 0 14px;line-height:0"><img src="https://drsrennie-stack.github.io/human-physiology-Fa26/icon.svg" width="54" height="64" alt="" style="display:inline-block;height:64px;width:auto;border:0"></p><p style="margin:0 0 12px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#8B3A2E">BIO 005 &middot; Yuba College &middot; Fall 2026</p><h2 style="margin:0 auto;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:34px;font-weight:800;letter-spacing:-.025em;color:#0B1530;line-height:1.1;max-width:16ch">Welcome to <span style="color:#8B3A2E">Human Physiology.</span></h2><p style="margin:16px auto 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;line-height:1.6;color:#414B5C;max-width:54ch">You are in the right place. This is the course home, and everything for the term starts from here.</p><p style="margin:14px auto 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#0B1530;max-width:54ch">You can navigate this course two ways, and they hold the same material in the same order under the same names. Pick whichever one suits how you like to work.</p></div><div style="display:flex;flex-wrap:wrap;gap:20px;align-items:stretch;margin:30px 0 0"><div style="flex:1 1 300px;min-width:270px;background:#8B3A2E;border-radius:16px;padding:26px 24px 24px;box-shadow:0 10px 24px -8px rgba(11,21,48,.35),0 3px 8px -3px rgba(11,21,48,.25)"><p style="margin:0 0 12px;line-height:0;text-align:left"><span aria-hidden="true" style="display:inline-block;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:54px;line-height:1;font-weight:700;color:#E0BC6C">&#8592;</span></p><h3 style="margin:0 0 10px;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:23px;font-weight:800;letter-spacing:-.022em;color:#FFFFFF;line-height:1.15">Stay in Canvas</h3><p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#F5F1E8">Everything is here in the modules, down the left side of your screen. Work through the list in order, top to bottom. If you like Canvas or you are used to it, this is the one to pick.</p><p style="margin:0"><a href="https://yccd.instructure.com/courses/42616/modules" target="_top" style="display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:14px 24px;border-radius:8px;background:#FFFFFF;border:2px solid #FFFFFF;color:#8B3A2E;text-decoration:none;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-weight:800;font-size:16px">Go to the modules</a></p><p style="margin:12px 0 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#F5F1E8">You are already here. Nothing new opens.</p></div><div style="flex:1 1 300px;min-width:270px;background:#0B1530;border-radius:16px;padding:26px 24px 24px;box-shadow:0 10px 24px -8px rgba(11,21,48,.35),0 3px 8px -3px rgba(11,21,48,.25)"><p style="margin:0 0 12px;line-height:0;text-align:right"><span aria-hidden="true" style="display:inline-block;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:54px;line-height:1;font-weight:700;color:#C9A14A">&#8594;</span></p><h3 style="margin:0 0 10px;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:23px;font-weight:800;letter-spacing:-.022em;color:#FFFFFF;line-height:1.15">Use the course website</h3><p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#F5F1E8">The same course as a plain website, outside Canvas. Cleaner pages and fewer menus. If the Canvas navigation gets in your way, this is the one to pick.</p><p style="margin:0"><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/course.html" target="_top" style="display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:14px 24px;border-radius:8px;background:#C9A14A;border:2px solid #C9A14A;color:#060A18;text-decoration:none;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-weight:800;font-size:16px">Open the course website</a></p><p style="margin:12px 0 0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#F5F1E8">This leaves Canvas. Your browser Back button brings you right back.</p></div></div><div style="max-width:74ch;margin:26px auto 0;background:#FFFFFF;border-radius:12px;box-shadow:0 1px 3px rgba(11,21,48,.08);padding:18px 20px"><p style="margin:0 0 8px;font-family:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:800;color:#0B1530">Why there are two of them</p><p style="margin:0 0 9px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13.5px;line-height:1.6;color:#414B5C">Last spring Canvas went down for a week and students lost access to everything in it. This is my answer to that. The course website is a complete copy that does not depend on Canvas at all, so <b style="color:#6E2D24">if Canvas goes down again you will still have your course</b>. I would send you the link and we would carry on, with nothing to rebuild and nothing lost.</p><p style="margin:0 0 9px;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13.5px;line-height:1.6;color:#414B5C">You are not required to use it. Most of you probably never will. It is there so that a bad week for Canvas is not a bad week for you.</p><p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13.5px;line-height:1.6;color:#414B5C">Assignments are turned in through Canvas whichever side you work on, so if a step ends in an upload it hands you back here for that one thing.</p></div></div>
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
        title="Textbook/Mastering A&P/Pearson" width="100%" height="5700"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

## 5. Scholar Points

Up to 2.5 percent for studying with other people, and why it is not extra credit.

File: `scholar-points.html`

```html
<iframe id="bio005-scholar-points" src="https://drsrennie-stack.github.io/human-physiology-Fa26/scholar-points.html"
        title="Scholar Points" width="100%" height="6150"
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
