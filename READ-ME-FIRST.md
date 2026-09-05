# Five files, one drag. September 5 2026.

These go in the repo root, on top of the bundle you already have. Select all five
and drag them into GitHub's upload box. Do not upload this file.

## site-check.html, the thing you asked for

Open it from the course site, not from your desktop, and press "Check the whole site".
It reads every page, follows every link, and tells you four things:

**Links going nowhere.** Which page is missing and which pages point at it. The 404
catches these so nobody is stranded, but a student still clicked something that did
not work.

**Real problems.** A page with no language set, no title, no navigation script, or an
internal link missing target="_top", which is the one that opens the course inside
itself when a student clicks it in Canvas.

**Worth a look, probably fine.** The tool reads a page before its JavaScript runs, so
a page that builds its heading or its landmark in script shows up here even though it
is correct in a browser. Check one by eye once and you can ignore that entry from then
on. It says so on the page, so it does not train you to ignore the report.

**Pages nothing links to.** Pages that exist but cannot be reached by clicking. Fine
for instructor pages. Not fine for anything else.

Copy the report gives you markdown for a compliance note. Print gives you a PDF.

There is a quick check button that does structure only and skips the link crawl, for
when you have changed one page and want an answer in ten seconds.

## What it found the first time I ran it

Four things, and one of them was mine.

**`os/os/mastery-physio-os.html` in competency-recall.html.** When I fixed that link
earlier today I added the `os/` prefix to a path that already had it. The fixed file
is in here. That is the honest case for having a checker: I introduced a broken link
while fixing broken links, and a tool caught it rather than a student.

**`bio005-quick-access.html` from welcome.html.** The comment beside that link says it
is for the student who wants a plainer list of the same material. That is exactly what
`sitemap.html` is, so it now points there.

**`guides.html` from index.html, three times.** The nav item and the "How this course
works" button. That is what `course-materials.html` does now, so they point there.

**`guide-how-to-study.html` from index.html.** Left alone deliberately. That page does
not exist and I am not going to guess which of your pages you meant, because sending a
student to the wrong page is worse than the 404 catching them gracefully. Tell me what
it should point at, or write the page, and it is one line.

Also a mailto link with the page name in its subject line was being read as a broken
frame target. That was the tool being wrong, and it is fixed.

## Where it stands now

84 pages read, 739 links followed, zero real problems, zero pages nothing links to,
one broken link left and it is the one above.

## screen-reader-log.html

The other tool, if you want it in the repo rather than just in Downloads. Sixteen
pages that cover all ninety-nine, the four checks with the VoiceOver keystrokes
written in, and a record with dates and times you can copy or screenshot.

Both tools are instructor pages. Neither is on the student site map or in the dock, so
nobody will find them who should not.

## One thing to consider

Run the site check after every upload. It takes about a minute and it is the difference
between you finding a broken link and a student finding it during the week the course
is being reviewed.
