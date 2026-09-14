#!/usr/bin/env python3
"""
Builds the BIO 005 Canvas weekly pages as Canvas Rich Content Editor HTML.

Rules baked in:
  - No <script>, no <style>, no external CSS. Canvas strips them. Everything is
    inline style on plain elements, which the Canvas sanitizer keeps.
  - Canvas keeps the classes "Button", "Button--primary" and "screenreader-only",
    so those are the only classes used.
  - Headings start at h2. Canvas renders the page title as the h1.
  - Every link that leaves Canvas opens in a new tab and says so to a screen
    reader. One visible sentence in the Start Here box says it to everyone.
  - No em dashes. No italics. Times are Pacific and say so.
"""
import html, pathlib

BASE = "https://drsrennie-stack.github.io/human-physiology-Fa26/"
CANVAS = "https://yccd.instructure.com/courses/42616"
CANVAS_SYLLABUS = CANVAS + "/assignments/syllabus"

# What students print lives in Google Drive, on "anyone with the link" sharing,
# checked September 14. A Drive link leaves Canvas, so these buttons open in a
# new tab and the page carries the line telling students to close it to come
# back. Set id to None for a sheet that does not exist yet: it then renders as a
# plain name under a "Not posted yet" line rather than a button that goes
# nowhere.
def drive(file_id):
    return "https://drive.google.com/file/d/%s/view" % file_id

PRINT_PDF = {
    (1, "notes"):      dict(id=drive("1AN276f3jUYM9HcV9QqHa2HYSLy0_YcNs"),
                            label="Week 1 note sheet: introduction to physiology"),
    (2, "cell-notes"): dict(id=drive("1JQPur4khec-RYzhiA7gD-n1R9Oc0fC2b"),
                            label="Note sheet"),
    (2, "cell-comps"): dict(id=drive("1ezl37N5urBe-fA5F_TczXkBYM-q5dKDA"),
                            label="Competency list"),
    (2, "phys-notes"): dict(id=drive("1w_M1mYyA4z94RlEG_zdNERRoLAbnbiwZ"),
                            label="Note sheet"),
    (2, "phys-comps"): dict(id=drive("1Upk5YUdoK1Zcr2KphTYFjIOcA0bs4RTu"),
                            label="Competency list"),
}

def pdf_btn(week, kind, primary=True):
    """A button if the sheet exists, nothing if it does not."""
    e = PRINT_PDF[(week, kind)]
    if not e["id"]:
        return ""
    return btn(e["label"], e["id"], primary=primary)

def pdf_pending(week, *kinds):
    """One plain line naming sheets that are not posted yet. Renders as nothing
    once they all have links, so the page cleans itself up."""
    missing = [PRINT_PDF[(week, k)] for k in kinds if not PRINT_PDF[(week, k)]["id"]]
    if not missing:
        return ""
    names = "".join('<li style="margin:0 0 6px 0;">%s</li>' % html.escape(m["label"])
                    for m in missing)
    return ('<p style="margin:14px 0 6px 0;line-height:1.6;color:%s;">'
            '<strong>Not posted yet.</strong> These are on their way and will appear here as buttons:</p>'
            '<ul style="margin:0 0 4px 0;padding-left:1.2em;line-height:1.55;color:%s;">%s</ul>'
            % (MUTED, MUTED, names))

OUT = pathlib.Path(__file__).parent / "canvas-pages"
OUT.mkdir(exist_ok=True)

# Palette of record for the physiology site (bio-005-brand). Every text colour
# below measures at least 7:1 on white except the muted grey, which is 7.3:1.
NAVY = "#0B1530"
MAROON = "#8B3A2E"
MAROON_DARK = "#6E2D24"
MUTED = "#4F576A"
LINE = "#D9DDE3"        # 1px card border, decorative only
TINT = "#ECEFF4"        # navy tint, used only behind the due list

CARD = ("background:#FFFFFF;border:1px solid %s;border-radius:8px;"
        "padding:20px 22px;margin:0 0 18px 0;box-shadow:0 1px 3px rgba(0,0,0,0.08);" % LINE)

def sr(text):
    return '<span class="screenreader-only">%s</span>' % html.escape(text)

def btn(label, href, primary=True, new_tab=True):
    """A Canvas button. Primary is maroon on white text (10.2:1)."""
    if primary:
        style = ("display:inline-block;margin:6px 8px 6px 0;padding:11px 18px;border-radius:6px;"
                 "background-color:%s;border:2px solid %s;color:#FFFFFF;font-weight:700;"
                 "text-decoration:none;min-height:24px;" % (MAROON, MAROON))
    else:
        style = ("display:inline-block;margin:6px 8px 6px 0;padding:11px 18px;border-radius:6px;"
                 "background-color:#FFFFFF;border:2px solid %s;color:%s;font-weight:700;"
                 "text-decoration:none;min-height:24px;" % (NAVY, NAVY))
    tail = ""
    attrs = ""
    if new_tab:
        attrs = ' target="_blank" rel="noopener"'
        tail = sr(" (opens in a new tab)")
    return ('<a class="Button Button--primary" style="%s" href="%s"%s>%s%s</a>'
            % (style, href, attrs, html.escape(label), tail))

def p(text, extra=""):
    """extra can override margin or colour; whichever it sets is left out of the
    base so the style attribute never carries the same property twice."""
    colour = "" if "color:" in extra else "color:%s;" % NAVY
    margin = "" if "margin:" in extra else "margin:0 0 12px 0;"
    return '<p style="%sline-height:1.6;%s%s">%s</p>' % (margin, colour, extra, text)

def h2(text, id_=None):
    idattr = ' id="%s"' % id_ if id_ else ""
    return ('<h2%s style="margin:28px 0 12px 0;font-size:1.5em;line-height:1.25;color:%s;">%s</h2>'
            % (idattr, NAVY, html.escape(text)))

def sub(text):
    """A heading inside a step card, for a page that carries two things a
    student has to tell apart. h3, because the card sits under the page h1 and
    the stage line; a rule above it does the separating so no accent bar is
    needed."""
    return ('<h3 style="margin:26px 0 10px 0;padding-top:18px;border-top:1px solid %s;'
            'font-size:1.2em;line-height:1.3;color:%s;">%s</h3>' % (LINE, NAVY, html.escape(text)))

def ul(items):
    lis = "".join('<li style="margin:0 0 8px 0;">%s</li>' % i for i in items)
    return ('<ul style="margin:0 0 12px 0;padding-left:1.2em;line-height:1.55;color:%s;">%s</ul>'
            % (NAVY, lis))

def row(*buttons):
    """A button row inside the body, for a card that needs more than one."""
    return '<p style="margin:8px 0 4px 0;">%s</p>' % "".join(buttons)

def step_card(n, title, body_html, buttons, when=None, graded=None):
    """One numbered step. The number is part of the heading text, so a screen
    reader hears 'Step 3, Second pass' and nothing is carried by colour alone."""
    when_html = ""
    if when:
        when_html = ('<p style="margin:0 0 10px 0;font-size:0.9em;font-weight:700;letter-spacing:0.04em;'
                     'text-transform:uppercase;color:%s;">%s</p>' % (MAROON_DARK, html.escape(when)))
    graded_html = ""
    if graded:
        graded_html = ('<p style="margin:12px 0 0 0;font-size:0.95em;color:%s;"><strong>Graded.</strong> %s</p>'
                       % (MUTED, graded))
    return ('<div style="%s">'
            '<h3 style="margin:0 0 8px 0;font-size:1.25em;line-height:1.3;color:%s;">'
            '<span style="display:inline-block;min-width:2.1em;padding:2px 10px;margin-right:10px;border-radius:999px;'
            'background-color:%s;color:#FFFFFF;font-size:0.85em;text-align:center;">Step %d</span>%s</h3>'
            '%s%s<p style="margin:8px 0 0 0;">%s</p>%s</div>'
            % (CARD, NAVY, NAVY, n, html.escape(title), when_html, body_html, "".join(buttons), graded_html))

def start_here(week, title, opens, closes, hours, due_rows, book):
    due_items = "".join(
        '<li style="margin:0 0 8px 0;"><strong>%s</strong> %s</li>' % (html.escape(what), html.escape(when))
        for what, when in due_rows)
    return (
        '<p style="margin:0 0 6px 0;font-size:0.85em;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:%s;">'
        'BIO 005 Human Physiology &middot; Week %d of 15</p>' % (MAROON_DARK, week)
        + '<div style="%s">' % CARD
        + '<h2 id="start-here" style="margin:0 0 12px 0;font-size:1.5em;line-height:1.25;color:%s;">Start here</h2>' % NAVY
        + p('<strong>Where you are.</strong> Week %d runs %s through %s. Everything below is this week, and only this week.' % (week, opens, closes))
        + p('<strong>What to do.</strong> Work down this page from top to bottom. Each step has one job and the buttons for it. Buttons that lead to the course site open in a new tab; come back to this tab to keep your place.')
        + p('<strong>How long.</strong> Plan on about %s this week, spread across the week rather than in one sitting. That is the minimum for a passing grade, not for an A.' % hours)
        + p('<strong>Your book.</strong> %s' % book)
        + '<div style="background-color:%s;border-radius:6px;padding:14px 18px;margin:14px 0 0 0;">' % TINT
        + '<h3 style="margin:0 0 8px 0;font-size:1.1em;color:%s;">Due this week (all times Pacific)</h3>' % NAVY
        + '<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul></div>' % (NAVY, due_items)
        + '</div>'
    )

def done_list(week, items, next_week_text):
    lis = "".join('<li style="margin:0 0 8px 0;">%s</li>' % html.escape(i) for i in items)
    return (h2("You are done with Week %d when" % week, "done")
            + '<div style="%s"><ul style="margin:0;padding-left:1.2em;color:%s;line-height:1.5;">%s</ul>'
              '<p style="margin:14px 0 0 0;color:%s;">%s</p></div>' % (CARD, NAVY, lis, NAVY, next_week_text))

def help_block():
    return (h2("If you get stuck", "help")
            + '<div style="%s">' % CARD
            + p('Ask in the Virtual Office first. Other students usually have the same question, and I answer there so everyone sees it. '
                'Hootie, the question button in the corner of every course site page, knows the syllabus and can answer most how-does-this-course-work questions on the spot. '
                'For anything private, message me in Canvas.')
            + '<p style="margin:8px 0 0 0;">'
            + btn("Virtual Office", CANVAS + "/discussion_topics/711800", primary=False, new_tab=False)
            + btn("Accessibility and how this site was built", BASE + "accessibility.html", primary=False)
            + '</p></div>')

SHORT = {
    "Cell anatomy: read it, then watch it": "cell-anatomy",
    "Cell physiology and transport: read it, then watch it": "cell-physiology",
    "Upload both note sheets": "upload-note-sheets",
    "Watch the course introduction, then print your week": "print-your-week",
    "Print your week": "print-your-week",
    "First pass, in your first color: the book and the notes": "first-pass",
    "Second pass, in your second color: the videos": "second-pass",
    "Upload your note sheet": "upload-note-sheet",
    "Study it for several days": "study-it",
    "Take the Mastery Check and upload your report": "mastery-check",
    "Lab: the Reference Range Lab (Investigate It)": "lab",
    "Lab: PhysioEx Exercise 8, the amylase assay (Investigate It)": "lab",
    "Your patient: the preseason physical (Use It)": "patient",
    "Your patient: the student health visit (Use It)": "patient",
    "Two discussions this week (Think About It)": "discussion",
    "Discussion 2: predict, then check (Think About It)": "discussion",
}

# The four stages the course site already uses on its cards, with the card
# colours. Every step belongs to exactly one stage, and the stages run in this
# order, so the Canvas module reads the same way the site does.
# Measured on white: Learn 7.66:1, Practice 18.04:1, Apply 7.46:1, Check 18.04:1.
STAGE_ORDER = ["Learn", "Practice", "Apply", "Check"]
STAGE_STYLE = {
    "Learn":    ("#8B3A2E", "#FFFFFF", "#8B3A2E"),
    "Practice": ("#0B1530", "#FFFFFF", "#0B1530"),
    "Apply":    ("#C9A14A", "#0B1530", "#C9A14A"),
    "Check":    ("#FFFFFF", "#0B1530", "#0B1530"),
}
STAGE_TAGLINE = {
    "Learn":    ("Learn it with Dr. Rennie",
                 "Read first with your note sheet open, then watch me teach it, then go back and add what changed."),
    "Practice": ("Try it from memory",
                 "Get it back without looking. Brain dumps, drawing, recall cards, book problems. Mistakes here are useful and none of it is graded."),
    "Apply":    ("Use what you learned",
                 "The lab, the application case and the discussion, all graded. Plus your patient chart, which you keep all term and turn in once in December."),
    "Check":    ("Find the gaps",
                 "A thirty question check on this week's competencies. Nothing here is graded. A low score tells you exactly what to go back to."),
}
STAGE = {
    "Cell anatomy: read it, then watch it": "Learn",
    "Cell physiology and transport: read it, then watch it": "Learn",
    "Upload both note sheets": "Learn",
    "Watch the course introduction, then print your week": "Learn",
    "Print your week": "Learn",
    "First pass, in your first color: the book and the notes": "Learn",
    "Second pass, in your second color: the videos": "Learn",
    "Upload your note sheet": "Learn",
    "Study it for several days": "Practice",
    "Lab: the Reference Range Lab (Investigate It)": "Apply",
    "Lab: PhysioEx Exercise 8, the amylase assay (Investigate It)": "Apply",
    "Your patient: the preseason physical (Use It)": "Apply",
    "Your patient: the student health visit (Use It)": "Apply",
    "Two discussions this week (Think About It)": "Apply",
    "Discussion 2: predict, then check (Think About It)": "Apply",
    "Take the Mastery Check and upload your report": "Check",
}

def stage_chip(stage, trailing=""):
    """The stage label, then the week and step in plain text beside it."""
    bg, fg, border = STAGE_STYLE[stage]
    chip = ('<span style="display:inline-block;vertical-align:middle;padding:4px 13px;border-radius:999px;'
            'background-color:%s;border:2px solid %s;color:%s;font-size:0.8em;font-weight:800;'
            'letter-spacing:0.1em;text-transform:uppercase;">%s</span>' % (bg, border, fg, stage))
    rest = ''
    if trailing:
        rest = (' <span style="display:inline-block;vertical-align:middle;font-size:0.85em;font-weight:700;'
                'letter-spacing:0.08em;text-transform:uppercase;color:%s;">%s</span>' % (MAROON_DARK, trailing))
    return '<p style="margin:0 0 14px 0;">' + chip + rest + '</p>'

# Canvas page titles. The page title is the h1 and the module row label, so it
# has to carry the whole step on its own, without a colon inside a colon.
PAGE_TITLE = {
    "Cell anatomy: read it, then watch it": "Cell anatomy, read it then watch it",
    "Cell physiology and transport: read it, then watch it": "Cell physiology and transport, read it then watch it",
    "Upload both note sheets": "Upload both note sheets",
    "Watch the course introduction, then print your week": "Watch the intro, then print your week",
    "Print your week": "Print your week",
    "First pass, in your first color: the book and the notes": "First pass, in your first color",
    "Second pass, in your second color: the videos": "Second pass, in your second color",
    "Upload your note sheet": "Upload your note sheet",
    "Study it for several days": "Study it for several days",
    "Take the Mastery Check and upload your report": "Mastery Check, and upload your report",
    "Lab: the Reference Range Lab (Investigate It)": "Lab, the Reference Range Lab",
    "Lab: PhysioEx Exercise 8, the amylase assay (Investigate It)": "Lab, PhysioEx Exercise 8, amylase",
    "Your patient: the preseason physical (Use It)": "Your patient, the preseason physical",
    "Your patient: the student health visit (Use It)": "Your patient, the student health visit",
    "Two discussions this week (Think About It)": "Two discussions this week",
    "Discussion 2: predict, then check (Think About It)": "Discussion 2, predict then check",
}

def eyebrow(text):
    return ('<p style="margin:0 0 14px 0;font-size:0.85em;font-weight:700;letter-spacing:0.08em;'
            'text-transform:uppercase;color:%s;">%s</p>' % (MAROON_DARK, text))

def help_line(lead="Stuck on this step?"):
    """One quiet line at the foot of every page. Not a card, so it never
    competes with the step itself."""
    return ('<p style="margin:22px 0 0 0;padding-top:14px;border-top:1px solid %s;font-size:0.95em;color:%s;">'
            + lead + ' Ask in the <a style="color:%s;font-weight:700;" '
            'href="%s/discussion_topics/711800">Virtual Office</a>, or ask Hootie, the question button in the '
            'corner of every course site page.</p>') % (LINE, MUTED, MAROON_DARK, CANVAS)

def new_tab_note(buttons):
    """Canvas opens off-site links in a new tab, and a brand new tab has no Back
    button history, so say plainly how to get back. Only shown when a button
    actually leaves Canvas."""
    off_site = [b for b in buttons if 'target="_blank"' in b]
    if not off_site:
        return ''
    which = "That button opens" if len(off_site) == 1 else "Those buttons open"
    return ('<p style="margin:12px 0 0 0;font-size:0.95em;color:%s;">%s in a new browser tab. '
            'When you are finished there, close that tab and you are back on this page. Nothing you '
            'do here is lost.</p>' % (MUTED, which))

def step_page(week, n, total, title, body_html, buttons, when=None, graded=None,
              next_title=None, closes=None, after_buttons="", next_label=None):
    """One Canvas page carrying one step and nothing else.

    n is a label, not an index, because a week can split a step into an a and a
    b half that are the same step done on two bodies of material."""
    buttons = [b for b in buttons if b]
    parts = [stage_chip(STAGE[title], "BIO 005 &middot; Week %d &middot; Step %s of %d" % (week, n, total))]
    if when:
        parts.append('<p style="margin:0 0 16px 0;font-size:1.05em;font-weight:700;color:%s;">%s</p>'
                     % (NAVY, html.escape(when)))
    parts.append('<div style="%s">' % CARD + body_html
                 + ('<p style="margin:8px 0 0 0;">%s</p>' % "".join(buttons) if buttons else '')
                 + new_tab_note(buttons)
                 + after_buttons
                 + ('<p style="margin:14px 0 0 0;font-size:0.95em;color:%s;"><strong>Graded.</strong> %s</p>' % (MUTED, graded)
                    if graded else '')
                 + '</div>')
    if next_title:
        parts.append('<p style="margin:18px 0 0 0;line-height:1.6;color:%s;">'
                     '<strong>When this is done:</strong> use the Next button at the bottom of this page to go to '
                     'Step %s: %s.</p>' % (NAVY, next_label, html.escape(PAGE_TITLE[next_title])))
    else:
        parts.append('<p style="margin:18px 0 0 0;line-height:1.6;color:%s;">'
                     '<strong>That is the last step of Week %d.</strong> Everything is due by %s.</p>'
                     % (NAVY, week, html.escape(closes or "Sunday, 10:00 pm Pacific")))
    parts.append(help_line())
    return "\n".join(parts) + "\n"

def week_pages(week, title, opens, closes, hours, due_rows, book, steps, done_items, next_text):
    """Returns [(filename, canvas page title, html), ...] for one week:
    an overview page, then one page per step, in stage order."""
    # Stage order decides the order of the week. The data below can be written in
    # any order; a stable sort by stage puts Learn, Practice, Apply, Check.
    steps = sorted(steps, key=lambda st: STAGE_ORDER.index(STAGE[st["title"]]))

    # Step labels. A plain week numbers 1..N. A week that splits a step gives
    # both halves the same number and an "a"/"b" suffix, so the pair reads as
    # one step done twice rather than as two different steps, and the count at
    # the top of each page stays honest.
    labels, num = [], 0
    for st in steps:
        if st.get("sub") in ("b", "c"):
            labels.append("%d%s" % (num, st["sub"]))
        else:
            num += 1
            labels.append("%d%s" % (num, st.get("sub", "")))
    total = num

    due_items = "".join(
        '<li style="margin:0 0 8px 0;"><strong>%s</strong> %s</li>' % (html.escape(what), html.escape(when))
        for what, when in due_rows)
    ov = [eyebrow("BIO 005 Human Physiology &middot; Week %d of 15" % week)]
    ov.append('<div style="%s">' % CARD
              + '<h2 style="margin:0 0 12px 0;font-size:1.5em;line-height:1.25;color:%s;">Start here</h2>' % NAVY
              + p('<strong>Where you are.</strong> Week %d runs %s through %s. Everything in this module is this week, and only this week.' % (week, opens, closes))
              + p('<strong>What to do.</strong> Work through the pages in this module in order, top to bottom. Each page is one step with one job, and the Next button at the bottom of a page takes you to the following step. Buttons that lead to the course site open in a new tab; come back to Canvas to keep your place.')
              + p('<strong>How long.</strong> Plan on about %s this week, spread across the week rather than in one sitting. That is the minimum for a passing grade, not for an A.' % hours)
              + p('<strong>Your book.</strong> %s' % book)
              + '<div style="background-color:%s;border-radius:6px;padding:14px 18px;margin:14px 0 0 0;">' % TINT
              + '<h3 style="margin:0 0 8px 0;font-size:1.1em;color:%s;">Due this week (all times Pacific)</h3>' % NAVY
              + '<ul style="margin:0;padding-left:1.2em;color:%s;">%s</ul></div>' % (NAVY, due_items)
              + '</div>')
    ov.append(h2("The week in four stages"))
    ov.append(p("Every week runs through the same four stages in the same order, and each stage holds its own steps. You do not have to hold this list in your head; each step is its own page and the Next button walks you through them. It is here so you can see the shape of the week before you start.",
                extra="color:%s;" % MUTED))

    n = 0
    for stage in STAGE_ORDER:
        mine = [(labels[i], st) for i, st in enumerate(steps) if STAGE[st["title"]] == stage]
        if not mine:
            continue
        name, blurb = STAGE_TAGLINE[stage]
        rows = "".join(
            '<li style="margin:0 0 9px 0;"><strong>Step %s. %s</strong> <span style="color:%s;">%s</span></li>'
            % (i, html.escape(PAGE_TITLE[st["title"]]), MUTED, html.escape(st.get("when", "")))
            for i, st in mine)
        ov.append('<div style="%s">' % CARD
                  + stage_chip(stage)
                  + '<h3 style="margin:0 0 6px 0;font-size:1.2em;color:%s;">%s</h3>' % (NAVY, html.escape(name))
                  + p(html.escape(blurb))
                  + '<ul style="margin:0;padding-left:1.2em;line-height:1.6;color:%s;list-style:none;">%s</ul>' % (NAVY, rows)
                  + '</div>')

    ov.append(h2("You are done with Week %d when" % week))
    lis = "".join('<li style="margin:0 0 8px 0;">%s</li>' % html.escape(i) for i in done_items)
    ov.append('<div style="%s"><ul style="margin:0;padding-left:1.2em;color:%s;line-height:1.5;">%s</ul>'
              '<p style="margin:14px 0 0 0;color:%s;">%s</p></div>' % (CARD, NAVY, lis, NAVY, next_text))
    ov.append(help_line("Not sure where to start, or something is not working?"))

    out = [("w%02d-00-overview.html" % week,
            "Week %d overview: %s" % (week, title),
            "\n".join(ov) + "\n")]
    for i, st in enumerate(steps):
        nxt = steps[i + 1]["title"] if i + 1 < len(steps) else None
        nxt_label = labels[i + 1] if i + 1 < len(steps) else None
        lab = labels[i]
        out.append(("w%02d-%s-%s.html" % (week, lab.zfill(2) if lab.isdigit() else "0" + lab, SHORT[st["title"]]),
                    "Week %d, Step %s: %s" % (week, lab, PAGE_TITLE[st["title"]]),
                    step_page(week, lab, total, st["title"], st["body_html"], st["buttons"],
                              when=st.get("when"), graded=st.get("graded"),
                              next_title=nxt, closes=closes,
                              after_buttons=st.get("after_buttons", ""),
                              next_label=nxt_label)))
    return out

# ----------------------------------------------------------------------------
# WEEK 1
# ----------------------------------------------------------------------------
W1 = dict(
    week=1,
    title="How physiology works and what keeps you steady",
    opens="Tuesday, September 8",
    closes="Sunday, September 13, 10:00 pm Pacific",
    hours="14 hours",
    book=("Silverthorn, <strong>Chapter 1</strong> (Introduction to Physiology) and the homeostasis and control pathway sections "
          "of <strong>Chapter 6</strong>. If you do not have the book yet, the notes in Step 2 carry the same material, "
          "and the free OpenStax text is linked there."),
    due_rows=[
        ("Discussion 1, your vision board:", "post by Friday, September 11, 10:00 pm; replies by Sunday, September 13, 10:00 pm."),
        ("Discussion 2, what the evidence told you:", "post by Sunday, September 13, 10:00 pm. Replies are optional this week only."),
        ("Note sheet upload, both passes:", "Sunday, September 13, 10:00 pm. Complete or not complete."),
        ("Lab, the Reference Range Lab:", "Sunday, September 13, 10:00 pm."),
        ("Application, your patient's preseason physical:", "Sunday, September 13, 10:00 pm."),
        ("Mastery Check report:", "Sunday, September 13, 10:00 pm. Complete or not complete."),
    ],
    steps=[
        dict(title="Watch the course introduction, then print your week",
             when="Tuesday, about 45 minutes plus printing",
             body_html=p("The introduction is about thirty minutes and shows you every part of the course once.")
                       + p("Then print your note sheet. There is a box per competency with the prompts already on it, so you are not building anything, just filling it in. Print it and you have the paper you need for the rest of the week.")
                       + p("If you also want the <strong>brain dump paper</strong> for prompts A and B, the print pack builds that for you: tick what you want and print.")
                       + p("No printer? Rule the boxes onto your own paper. A hand ruled sheet is graded exactly the same as a printed one."),
             buttons=[btn("Watch the course introduction", BASE + "index.html#intro"),
                      pdf_btn(1, "notes"),
                      btn("Open the Week 1 print pack", BASE + "week-print-pack.html?week=1", primary=False)],
             after_buttons=pdf_pending(1, "notes")),
        dict(title="First pass, in your first color: the book and the notes",
             when="Tuesday to Thursday, about 3 hours",
             body_html=p("Pick one pen color and keep it for this pass. Read Chapter 1 and the control sections of Chapter 6, or read my notes, and fill in each box on the note sheet as you go: draw the idea, label it, put the steps in order. "
                         "Then try the two competency prompts (A and B) for each box on the brain dump paper. Leave every gap you cannot fill. The gaps are the point; they tell you what the videos have to give you.")
                       + p("Keep the writing to drawings, labels, arrows and short lists. Sentences running across the page do not help you on exam day."),
             buttons=[btn("Read the Week 1 notes", BASE + "biol005-m01-maintain-control-notes.html"),
                      btn("The 12 competencies, with what each one asks", BASE + "competency-study-guide.html?week=1", primary=False),
                      btn("OpenStax, free second explanation", "https://openstax.org/details/books/anatomy-and-physiology-2e", primary=False)]),
        dict(title="Second pass, in your second color: the videos",
             when="Thursday and Friday, about 3 hours",
             body_html=p("Switch pens. Press play on the first concept video and let the week run; there are twenty short videos, and the list on the page lets you jump to the one that matches the box you are working on. "
                         "Every time the video gives you something the reading did not, add it to the same box in the second color. When you are done, the sheet shows you exactly where your reading was thin.")
                       + p("The notes print. There is a Print button at the top of the notes page, so you can have them on paper beside the note sheet rather than switching windows."),
             buttons=[btn("Watch the Week 1 concept videos", BASE + "concept-videos-week01.html"),
                      btn("Slides and notes for Week 1", BASE + "lecture-week.html?week=1", primary=False)]),
        dict(title="Upload your note sheet",
             when="After your second pass, by Sunday",
             body_html=p("Photograph or scan every page of your note sheet with both colors on it and upload it as one file in Canvas. I am not grading the sheet. I mark it complete or not complete, and I read enough of it to see how the week went for you. "
                         "Turning it in every week is how you show you are participating, and participating is a condition of staying enrolled. Whether you filled the boxes from the book, my notes, the videos or all three is up to you; the sheet just has to show two passes.")
                       + p("<strong>How to photograph it.</strong>")
                       + '<ul style="margin:0 0 12px 0;padding-left:1.2em;line-height:1.55;color:%s;">'
                         '<li style="margin:0 0 8px 0;">One page at a time, flat on the table, in good light, straight down rather than at an angle.</li>'
                         '<li style="margin:0 0 8px 0;">Both colors have to be readable. If the second color is pale, take it again nearer a window.</li>'
                         '<li style="margin:0 0 8px 0;">Combine the pages into one file, in order, and upload that one file. Most phones will do this from the Files or Notes app; any free scanner app will too.</li>'
                         '<li style="margin:0 0 8px 0;">Photograph each page as you finish it rather than all six on Sunday night. Losing the sheet costs you no points and a great deal of work.</li>'
                         '<li style="margin:0 0 8px 0;">Handwritten and on paper, in your two colors. A typed sheet closes the gap between the passes, and that gap is the whole point.</li></ul>' % NAVY,
             buttons=[btn("Upload your Week 1 note sheet in Canvas", CANVAS + "/assignments/1241504", primary=True, new_tab=False),],
             graded="Complete or not complete, for participation. Due Sunday, September 13, 10:00 pm Pacific."),
        dict(title="Study it for several days",
             when="Every day from Thursday, about an hour a day",
             body_html=p("Now the note sheet closes and the material has to come back out of your head. Do a little every day; four short sessions beat one long one, because the forgetting in between is what makes the memory stick. Pick from these, and try more than one:")
                       + '<ul style="margin:0 0 12px 0;padding-left:1.2em;line-height:1.55;">'
                         '<li><strong>Rx Cards.</strong> Spaced recall cards for this week. Rate your confidence honestly; a confident wrong answer is the one the cards will chase.</li>'
                         '<li><strong>Draw it from memory.</strong> Redraw one note sheet box on a blank canvas with nothing open, then check it against the sheet.</li>'
                         '<li><strong>Brain dump.</strong> Take a competency prompt cold, on paper. This is what the midterm feels like.</li>'
                         '<li><strong>Book problems.</strong> Work them forward before you look, and backward from the answer to see how the author got there.</li>'
                         '<li><strong>Study With Me.</strong> Do any of the above with other people and quiz each other.</li></ul>',
             buttons=[btn("Rx Cards", BASE + "rx-cards.html"),
                      btn("Draw it from memory", BASE + "mastery-canvas.html", primary=False),
                      btn("Brain dump practice", BASE + "competency-brain-dump.html", primary=False),
                      btn("Book problems", BASE + "assignment-bookproblems.html?week=1", primary=False),
                      btn("Study With Me", BASE + "study-with-me.html", primary=False)]),
        dict(title="Take the Mastery Check and upload your report",
             when="Saturday or Sunday, 30 to 60 minutes",
             body_html=p("Generate a practice exam on Week 1 (thirty questions, nothing open) and take it. It shows you every answer and the reasoning behind it, then names the competencies that cost you points. "
                         "Do one or do ten. Then save the report and upload it in Canvas so I can see how the week went and reach out if something is not landing. The report is tracked complete or not complete; the score is for you, not for a grade."),
             buttons=[btn("Take a Week 1 Mastery Check", BASE + "practice-exam.html?week=1"),
                      btn("How to save and upload your report", BASE + "assignment-practice-log.html", primary=False),
                      btn("Upload the report in Canvas", CANVAS + "/assignments/1240401", primary=False, new_tab=False)],
             graded="Complete or not complete. Due Sunday, September 13, 10:00 pm Pacific."),
        dict(title="Lab: the Reference Range Lab (Investigate It)",
             when="Wednesday to Sunday, about 3 hours",
             body_html=p("Where does a \"normal range\" on a lab report come from? This week you calculate one, decide which results are in or out of range, and plot three serial results by hand. "
                         "Work the lab page top to bottom, record what it asks for, and turn it in as one file in Canvas."),
             buttons=[btn("Open the Reference Range Lab", BASE + "reference-range-lab.html"),
                      btn("Turn the lab in", CANVAS + "/assignments/1240111", primary=False, new_tab=False)],
             graded="Investigation category. Due Sunday, September 13, 10:00 pm Pacific."),
        dict(title="Your patient: the preseason physical (Use It)",
             when="Saturday, about 90 minutes",
             body_html=p("Meet your patient. Every week you add one entry to their chart: draw this week's control loop by hand, answer the written questions, and log any AI you used. "
                         "This week's encounter is the preseason physical. The case page walks you through the five things every entry needs."),
             buttons=[btn("Open the Week 1 case", BASE + "assignment-apply.html?week=1"),
                      btn("Your patient chart, all term", BASE + "patient-chart-book.html", primary=False),
                      btn("Turn in your chart entry", CANVAS + "/assignments", primary=False, new_tab=False)],
             graded="Application category. Due Sunday, September 13, 10:00 pm Pacific."),
        dict(title="Two discussions this week (Think About It)",
             when="Discussion 1 by Friday; Discussion 2 by Sunday",
             body_html=(
               p("There are two discussions in Week 1. Everything you need for both is on this page, "
                 "and each one has its own submit button underneath it. Do them in the order they appear.")
               + p("Discussion 2 asks about your Mastery Check, so take that first, at Step 9, and then come back here and write it. "
                   "Both are due the same night.")

               # ---------- Discussion 1, the vision board ----------
               + sub("Discussion 1: your digital vision board")
               + p("Before we talk physiology, it is important to me to know who you are, and for you to get to know "
                   "each other. This class runs online, so we do not get the accidental version of this, the talking "
                   "before lecture starts. We are doing it on purpose, in week one, before anything else. "
                   "This is your introduction, and there is no separate introduce yourself post to do as well.")
               + p("<strong>What you are making.</strong> A vision board is a collage: several images arranged together "
                   "so they read as one picture. Photos, cut outs, words, colors, whatever gets it across. Build it in "
                   "Canva, in Google Slides, in a photo app, or on paper with scissors and glue and then photograph it. "
                   "What you turn in is <strong>one image file</strong> of the finished collage. Cover four things, "
                   "weighted however you like:")
               + ul(["<strong>Who you are.</strong> Photos of yourself if you are comfortable; only what you are happy "
                     "for classmates to see.",
                     "<strong>What matters to you.</strong> People, places, things you care about, what you do when you "
                     "are not in class.",
                     "<strong>Why you are taking this class.</strong> The real reason. It is required for my program is "
                     "a real reason and you can say so.",
                     "<strong>Where you are going.</strong> What you are working toward, in school or after it."])
               + p("<strong>On privacy, and I mean this.</strong> Share only what you want classmates to have. Do not put "
                   "your address, your workplace, your schedule, your phone number, or anything with a document number on "
                   "it into the board. If you would rather not include photos of yourself, use images that represent you "
                   "instead; nobody loses a point for that. If there is something you want me to know but not the class, "
                   "message me in the Canvas Inbox.")
               + p("<strong>Three ways to build it.</strong>")
               + ul(["<strong>Pinterest.</strong> Build a board, arrange it, screenshot it. Send the screenshot, not the "
                     "board link.",
                     "<strong>One slide.</strong> PowerPoint or Google Slides, drop images and text on one slide, export "
                     "the slide as an image.",
                     "<strong>All video.</strong> Skip the image and make the whole thing as one video, showing and "
                     "telling as you go."])
               + p("<strong>How to post.</strong> Attach your board image to the discussion with a short video of you "
                   "introducing yourself and walking us through it. A phone video is perfect. Post by <strong>Friday, "
                   "September 11, 10:00 pm Pacific</strong>, so there is someone to meet over the weekend. Then reply to "
                   "at least two classmates by <strong>Sunday, September 13, 10:00 pm</strong>. Real replies, about their "
                   "board, not nice board.")
               + row(btn("Submit Discussion 1: digital vision board",
                         CANVAS + "/discussion_topics/712733", new_tab=False))

               # ---------- Discussion 2, the metacognitive discussion ----------
               + sub("Discussion 2: what did the evidence tell you?")
               + p("This week you chose how to learn the material. Your Mastery Check then told you whether that choice "
                   "worked, before any grade depended on it. This post is where you look at that evidence and say what "
                   "you did with it: <strong>decision, evidence, adjustment</strong>, the same three moves as a clinical "
                   "write up, turned on yourself.")
               + p("Week 1 is the only week with a Sunday post date, because the vision board is already due Friday and "
                   "three of these questions are about a Mastery Check you take later in the week. From Week 2 on: post "
                   "by Friday, two replies by Sunday.")
               + p("<strong>Answer these four.</strong>")
               + ul(["<strong>1. What did your Mastery Check reveal?</strong> One specific thing you thought you knew and "
                     "did not. Something like: I could name the three parts of a control loop but kept calling the "
                     "integrating center a receptor. Not: feedback loops.",
                     "<strong>2. What did you do about it?</strong> Changed the resource, the approach, drew it, said it "
                     "out loud, asked someone. Or kept what you were doing, if you can say how you knew it was working. "
                     "Not: I studied more.",
                     "<strong>3. What happened when you tried again?</strong> Whether it held, and how you could tell. "
                     "Something like: I rebuilt the loop from a blank page without looking. Not: it felt better.",
                     "<strong>4. The physiology question.</strong> What you thought homeostasis meant before this week, "
                     "and what you think it means now. If it has not moved, say that, and say what would move it. Not a "
                     "textbook definition copied in."])
               + p("Questions 1 to 3 are the same all fifteen weeks. Only question 4 changes.")
               + p("<strong>Your numbers are yours.</strong> You do not have to post your Mastery Check or practice exam "
                   "results. The score, the count, the number of attempts can all stay private. Improving a lot, improving "
                   "a little, holding steady, or sliding tells your classmates everything useful. Share the numbers too if "
                   "you want to; that is your call. Your practice log comes to me separately, as an assignment, so I can "
                   "reach out if I see you struggling.")
               + p("<strong>How to post.</strong> Four short paragraphs, one per question, one screen. Specific beats long. "
                   "Text is fine, or a two minute video of you answering the four questions. Take your Mastery Check first, "
                   "because three of the four questions are about it. Post by <strong>Sunday, September 13, 10:00 pm "
                   "Pacific</strong>.")
               + p("<strong>Had a bad week?</strong> Say so and answer anyway. I ran out of time, skipped the retrieval, and "
                   "the check showed me what that cost is a strong post. You are graded on whether you looked at what "
                   "happened and said something true about it, not on whether the week went well.")
               + p("<strong>Replies.</strong> Optional this week, required from Week 2. Read a few posts anyway; how other "
                   "people are studying is most of the value of the thread. Take someone's adjustment and ask what happens "
                   "if they try it on something else. Name where their reasoning and yours came apart, and ask about it "
                   "rather than correcting it. Offer what worked for you on the same gap, specifically enough to do "
                   "tomorrow. Great post, I struggled with that too is kind and does not count; add the sentence that "
                   "comes after it.")
               + row(btn("Submit Discussion 2: what the evidence told you",
                         CANVAS + "/discussion_topics/713315", new_tab=False))
             ),
             buttons=[],
             graded="Thinking category. Discussion 1 post Friday, September 11, 10:00 pm; replies Sunday, September 13, 10:00 pm. Discussion 2 post Sunday, September 13, 10:00 pm. All Pacific."),
    ],
    done_items=[
        "Your note sheet has two colors on it, you can say which boxes are still thin, and it is uploaded.",
        "You have done at least one Mastery Check and uploaded the report.",
        "The Reference Range Lab is turned in.",
        "Your patient's first chart entry is turned in.",
        "Both discussion posts are up, and your vision board replies are done.",
    ],
    next_text="Week 2 opens Monday, September 14, and unlocks early on Saturday, September 12 at 8:00 pm Pacific if you have finished and submitted this week.",
)

# ----------------------------------------------------------------------------
# WEEK 2
# ----------------------------------------------------------------------------
W2 = dict(
    week=2,
    title="The cell: structure, transport and signaling",
    opens="Monday, September 14",
    closes="Sunday, September 20, 10:00 pm Pacific",
    hours="18 hours, which is more than any other week",
    book=("Two halves, two chapters. <strong>Chapter 3</strong> (Compartmentation: Cells and Tissues) is the anatomy half: the cell, "
          "its membrane, its organelles and the four tissue types. <strong>Chapter 5</strong> (Membrane Dynamics) is the physiology half: "
          "what crosses the membrane and how, diffusion, osmosis and the pumps. The signaling competencies at the end of the week come "
          "from <strong>Chapter 6</strong> (Communication, Integration and Homeostasis)."),
    due_rows=[
        ("Discussion 2:", "post by Friday, September 18, 10:00 pm; replies by Sunday, September 20, 10:00 pm."),
        ("Both note sheets, both passes:", "Sunday, September 20, 10:00 pm. Complete or not complete."),
        ("Lab, PhysioEx Exercise 8, amylase:", "Sunday, September 20, 10:00 pm."),
        ("Application, your patient's student health visit:", "Sunday, September 20, 10:00 pm."),
        ("Mastery Check report:", "Sunday, September 20, 10:00 pm. Complete or not complete."),
    ],
    steps=[
        dict(title="Print your week",
             when="Monday, about 20 minutes plus printing",
             body_html=(
               p("Week 2 comes in two halves, and each half has its own note sheet and its own competency list. Print all four before you start.")
               + p("Work the halves in order. The anatomy is the structure, and the physiology is what that structure does, so the second half only makes sense once you can see where it is happening. Step 2a is the anatomy start to finish, Step 2b is the physiology.")

               + sub("A. Foundations of the cell and tissues")
               + p("Organelles, the membrane itself, and the four tissue types. The note sheet has a box per competency with the prompts already on it. The competency list says what each box is asking you for, so keep it beside you while you fill them in.")
               + row(pdf_btn(2, "cell-notes"), pdf_btn(2, "cell-comps", primary=False))

               + sub("B. Cellular physiology and transport mechanisms")
               + p("What that anatomy does: what crosses the membrane and how, diffusion and osmosis, the pumps, how a signal arrives and how it is switched off. Same shape, a note sheet and a competency list.")
               + row(pdf_btn(2, "phys-notes"), pdf_btn(2, "phys-comps", primary=False))

               + p("No printer? Rule the boxes onto your own paper. A hand ruled sheet is graded exactly the same as a printed one.",
                   extra="margin:24px 0 0 0;")
             ),
             buttons=[],
             after_buttons=pdf_pending(2, "cell-notes", "cell-comps", "phys-notes", "phys-comps")),

        dict(title="Cell anatomy: read it, then watch it",
             sub="a",
             when="Monday to Wednesday, about 4 hours",
             body_html=(
               p("This is the first half, start to finish, on one page. Work the <strong>Foundations of the cell and tissues</strong> note sheet only. Leave the physiology sheet alone until Step 2b.")
               + sub("First pass, in your first color")
               + p("Pick one pen color and keep it for this pass. Read Chapter 3 and fill in each box as you go: draw the structure, label it, say what it is for. Then try the A and B prompts on the brain dump paper. Leave every gap you cannot fill. The gaps are the point; they tell you what the videos have to give you.")
               + p("Keep it to drawings, labels, arrows and short lists. Sentences running across the page do not help you on exam day.")
               + sub("Second pass, in your second color")
               + p("Switch pens. Work through the cell videos and add what the video gives you that the reading did not, in the same boxes. When you are done the sheet shows you exactly where your reading was thin. The video list lets you jump to the one that matches the box you are on.")
               + p("Open the slides beside the video if you want to pause on a diagram or print a deck to draw on.")
             ),
             buttons=[btn("Read the Week 2 notes: cells and tissues", BASE + "biol005-w03-compartments-notes.html"),
                      btn("Watch the cell videos", BASE + "concept-videos-week03.html"),
                      btn("Slides and notes", BASE + "lecture-week.html?week=2", primary=False),
                      btn("OpenStax, free second explanation", "https://openstax.org/details/books/anatomy-and-physiology-2e", primary=False)]),

        dict(title="Cell physiology and transport: read it, then watch it",
             sub="b",
             when="Wednesday to Friday, about 5 hours",
             body_html=(
               p("Now the second half, same two passes, on the <strong>Cellular physiology and transport mechanisms</strong> note sheet. This is the bigger of the two halves, so give it the extra day.")
               + sub("First pass, in your first color")
               + p("Read Chapter 5 for what crosses the membrane and how, and the signaling sections of Chapter 6 for how a message arrives and gets switched off, or read my transport notes, which cover the same ground with five worked problems. Fill the boxes as you read: draw the gradient, draw the protein, put the steps in order. Then take the A and B prompts cold on the brain dump paper and leave the gaps.")
               + p("Two things are worth drawing rather than writing every time: the direction a substance is moving relative to its gradient, and whether the cell is spending energy to move it. Those two together are most of this half.")
               + sub("Second pass, in your second color")
               + p("Switch pens and work the transport videos, then the signaling ones. There are more videos here than in any other half of the course, so use the list to jump to the box you are on rather than watching straight through. Add what the video gives you in the second color.")
             ),
             buttons=[btn("Read the transport notes", BASE + "biol005-w02-transport-notes.html"),
                      btn("Watch the transport videos", BASE + "concept-videos-week04.html"),
                      btn("Watch the signaling videos", BASE + "concept-videos-week03.html#signaling"),
                      btn("Slides and notes", BASE + "lecture-week.html?week=2", primary=False),
                      btn("The competencies, with what each one asks", BASE + "competency-study-guide.html?week=2", primary=False)]),

        dict(title="Upload both note sheets",
             when="After your second pass, by Sunday",
             body_html=p("Photograph or scan every page of <strong>both</strong> note sheets with both colors on them and upload them in Canvas. One file is fine if you can combine them; two files is fine too. I am not grading the sheets. I mark them complete or not complete, and I read enough to see how the week went for you. "
                         "Turning them in every week is how you show you are participating, and participating is a condition of staying enrolled.")
                       + p("<strong>How to photograph them.</strong>")
                       + ul(["One page at a time, flat on the table, in good light, straight down rather than at an angle.",
                             "Both colors have to be readable. If the second color is pale, take it again nearer a window.",
                             "Keep the two halves in order, anatomy first, then physiology, so I can follow your week.",
                             "Photograph each page as you finish it rather than all of them on Sunday night. Losing a sheet costs you no points and a great deal of work.",
                             "Handwritten and on paper, in your two colors. A typed sheet closes the gap between the passes, and that gap is the whole point."]),
             buttons=[btn("Upload your Week 2 note sheets in Canvas", CANVAS + "/assignments", primary=True, new_tab=False)],
             graded="Complete or not complete, for participation. Due Sunday, September 20, 10:00 pm Pacific."),

        dict(title="Study it for several days",
             when="Every day from Thursday, about an hour a day",
             body_html=p("Now both note sheets close and the material has to come back out of your head. Do a little every day; four short sessions beat one long one, because the forgetting in between is what makes the memory stick. Pick from these, and try more than one:")
                       + ul(["<strong>Rx Cards.</strong> Spaced recall cards for this week. Rate your confidence honestly; a confident wrong answer is the one the cards will chase.",
                             "<strong>Draw it from memory.</strong> Redraw one note sheet box on a blank canvas with nothing open, then check it against the sheet.",
                             "<strong>Brain dump.</strong> Take a competency prompt cold, on paper. This is what the midterm feels like.",
                             "<strong>Book problems.</strong> Work them forward before you look, and backward from the answer to see how the author got there.",
                             "<strong>Study With Me.</strong> Do any of the above with other people and quiz each other."])
                       + p("One thing worth doing this week specifically: put the two halves side by side. Take one structure from the anatomy sheet and say what transport or signaling job it does on the physiology sheet. That link is what the exam asks for."),
             buttons=[btn("Rx Cards", BASE + "rx-cards.html"),
                      btn("Draw it from memory", BASE + "mastery-canvas.html", primary=False),
                      btn("Brain dump practice", BASE + "competency-brain-dump.html", primary=False),
                      btn("Book problems", BASE + "assignment-bookproblems.html?week=2", primary=False),
                      btn("Study With Me", BASE + "study-with-me.html", primary=False)]),
        dict(title="Take the Mastery Check and upload your report",
             when="Saturday or Sunday, 30 to 60 minutes",
             body_html=p("Generate a practice exam on Week 2, or on Weeks 1 and 2 together, and take it with nothing open. It shows you every answer and the reasoning, then names the competencies that cost you points. "
                         "Save the report and upload it in Canvas. Complete or not complete; the score is yours."),
             buttons=[btn("Take a Week 2 Mastery Check", BASE + "practice-exam.html?week=2"),
                      btn("How to save and upload your report", BASE + "assignment-practice-log.html", primary=False),
                      btn("Upload the report in Canvas", CANVAS + "/assignments", primary=False, new_tab=False)],
             graded="Complete or not complete. Due Sunday, September 20, 10:00 pm Pacific."),
        dict(title="Lab: PhysioEx Exercise 8, the amylase assay (Investigate It)",
             when="Wednesday to Sunday, about 3 hours",
             body_html=p("Your first PhysioEx lab. Amylase is a protein, and this week is about what proteins in and on the cell can do while they hold their shape. You run the amylase activity only (pepsin and lipase wait for Week 11), vary temperature and pH, and plot activity against each by hand. "
                         "The controls are the whole point of the assay: they are what let you claim the change was the enzyme.")
                       + p("Open PhysioEx through Access Pearson in the Canvas course menu. The lab page tells you which activities to run and what to record; the lab analysis sheet is what you turn in."),
             buttons=[btn("Open the Week 2 lab instructions", BASE + "assignment-physioex.html?week=2"),
                      btn("Lab analysis sheet", BASE + "lab-report-form.html", primary=False),
                      btn("Turn the lab in", CANVAS + "/assignments", primary=False, new_tab=False)],
             graded="Investigation category. Due Sunday, September 20, 10:00 pm Pacific."),
        dict(title="Your patient: the student health visit (Use It)",
             when="Saturday, about 90 minutes",
             body_html=p("Your patient is back, on September 18, thirsty, tired and losing weight while eating more. This week's entry asks you to follow what the insulin to glucagon ratio switches on and off inside her cells. Insulin acts through a receptor enzyme on the cell surface, one of this week's competencies, so the pathway you drew in Step 2 is where this case starts. "
                         "Draw the loop by hand, answer the written questions, log any AI you used, and turn the entry in."),
             buttons=[btn("Open the Week 2 case", BASE + "assignment-apply.html?week=2"),
                      btn("Your patient chart, all term", BASE + "patient-chart-book.html", primary=False),
                      btn("Turn in your chart entry", CANVAS + "/assignments", primary=False, new_tab=False)],
             graded="Application category. Due Sunday, September 20, 10:00 pm Pacific."),
        dict(title="Discussion 2: predict, then check (Think About It)",
             when="Post by Friday; replies by Sunday",
             body_html=(
               p("One post, two parts. First the physiology, worked as a prediction you then check. Then the honest part: what the week's evidence told you about your own learning and what you did about it. Both halves are required, and the second one is not a formality. This is the shape every discussion takes from here to Week 15.")
               + p("Part 2 asks about your Mastery Check, so take that first at Step 8 and then come back and write this. Your post is due Friday and the Mastery Check report is due Sunday, so do the check early in the week.")

               # ---------------- Part 1, the physiology ----------------
               + sub("Part 1. The physiology: predict, then check")
               + p("This week is about what holds cells together and what that buys the tissue. Junctions are not decoration. What a tissue can do, and what goes wrong when it fails, usually comes straight back to which junctions are holding it.")
               + p("<strong>Pick one place in the body.</strong>")
               + ul(["The lining of your small intestine, where food is on one side and your blood is on the other.",
                     "Cardiac muscle, at the intercalated disc between two heart cells.",
                     "The outer layer of your skin, which is pulled and stretched all day."])
               + p("<strong>Predict first, before you look anything up.</strong> Two lines: which kind of junction do you think is doing most of the work in that place, and what is the first thing that would go wrong if it failed? Write it down and do not change it.")
               + p("<strong>Then work it properly.</strong>")
               + ul(["Name the junctions actually present there. Most tissues use more than one, so name each and say what it is built from and what it anchors to inside the cell.",
                     "Say what each one buys that tissue: does it seal the gap between cells, hold them together against pulling, or let ions and small molecules pass from one cell into the next?",
                     "Pick one substance and say how it gets from one side of that tissue to the other: through the cells, or between them. Then say which junction decides that.",
                     "Follow one failure all the way out. Take the junction you named in your prediction, break it, and trace it to something a person would actually notice or a clinician would measure.",
                     "One sentence on why this tissue has the junctions it has and not the others. What is the job that made this the right answer?"])
               + p("<strong>Attach your hand drawn sketch</strong>, photographed or scanned. Two neighboring cells side by side, every junction labeled, and arrows showing what can pass and what cannot. The post does not count without it.")

               # ---------------- Part 2, the metacognition ----------------
               + sub("Part 2. What the evidence told you")
               + p("You chose how to learn this week, and two things told you whether that choice worked: your prediction above, and your Mastery Check. Both gave you evidence before any grade depended on it. This half is where you look at that evidence and say what you did with it. The move is <strong>decision, evidence, adjustment</strong>, the same three steps as a clinical write up, turned on yourself.")
               + p("<strong>Answer all four.</strong>")
               + ul(["<strong>1. How did your prediction do?</strong> Right, half right, or wrong, and name the specific idea that had to change. The two that catch people out most this week are assuming a junction that holds cells together also seals the space between them, and forgetting that a sheet of cells has a route between the cells as well as through them. Say what you were assuming that made the wrong prediction feel right.",
                     "<strong>2. What did your Mastery Check reveal?</strong> One specific thing you thought you knew and did not. Something like: I could list the junction types but could not say which one a drug would have to get past. Not: cell junctions.",
                     "<strong>3. What did you do about it?</strong> Changed the resource, changed the approach, drew it, said it out loud, asked someone. Or kept what you were doing, if you can say how you knew it was working. Not: I studied more.",
                     "<strong>4. What happened when you tried again?</strong> Whether it held, and how you could tell. Something like: I redrew the intercalated disc from a blank page without looking. Not: it felt better."])
               + p("<strong>Your numbers are yours.</strong> You do not have to post your Mastery Check score, your attempt count, or anything else with a number on it. Improving a lot, improving a little, holding steady, or sliding tells your classmates everything useful. Share the numbers too if you want to; that is your call. Your practice log comes to me separately as an assignment, so I can reach out if I see you struggling.")
               + p("<strong>Had a bad week?</strong> Say so and answer anyway. I ran out of time, skipped the retrieval, and the check showed me what that cost is a strong post. You are graded on whether you looked at what happened and said something true about it, not on whether the week went well.")

               + p("<strong>Replies, two of them, by Sunday.</strong> Reply to two people who picked a different place than you did. Say one thing their tissue can do that yours cannot and name the junction that is the reason, and then take up something from their Part 2: an adjustment worth stealing, or a place where their reasoning and yours came apart. Great post, I struggled with that too is kind and does not count. Add the sentence that comes after it.")
             ),
             buttons=[btn("Post in Canvas", CANVAS + "/discussion_topics/712810", new_tab=False)],
             graded="Thinking category. Post Friday, September 18, 10:00 pm; two replies Sunday, September 20, 10:00 pm. Pacific."),
    ],
    done_items=[
        "Both note sheets have two colors on them, you can say which boxes are still thin, and both are uploaded.",
        "You can draw one full signal pathway, ligand to response, from memory.",
        "You can take one substance and say whether it crosses the membrane with the gradient or against it, and whether the cell pays for the trip.",
        "You have done at least one Mastery Check and uploaded the report.",
        "The amylase lab analysis sheet is turned in.",
        "Your patient's second chart entry is turned in.",
        "Your discussion post and both replies are up.",
    ],
    next_text="Week 3, neurons, action potentials and synapses, opens Monday, September 21, and unlocks early on Saturday, September 19 at 8:00 pm Pacific if you have finished and submitted this week.",
)

# ----------------------------------------------------------------------------
# THE ONCE-ONLY PAGE: how every week works
# ----------------------------------------------------------------------------
def how_every_week_works():
    """The once-only page, built around the four stages so a student meets the
    same four words here that they meet on the site cards and in every module."""
    parts = [eyebrow("BIO 005 Human Physiology &middot; Read once, use every week")]
    parts.append('<div style="%s">' % CARD
                 + '<h2 style="margin:0 0 12px 0;font-size:1.5em;line-height:1.25;color:%s;">Every week has the same four stages</h2>' % NAVY
                 + p("Learn, Practice, Apply, Check. Every week of this course runs through those four in that order, and each stage holds a few steps. You learn the shape once, in Week 1, and after that you spend your attention on the physiology instead of on finding things.")
                 + p("Each step is its own page in Canvas, with one job on it and the buttons for that job. The Next button at the bottom takes you to the following step, so you are never deciding what to do next.")
                 + p("Three things you should be able to answer in five seconds anywhere in the course: where am I, what do I do next, and what is due. The stage label at the top of every page answers the first, the Next button answers the second, and the week overview answers the third.")
                 + '</div>')
    parts.append(h2("The four stages, and the steps inside them"))
    stage_steps = {
        "Learn": [("Print your week", "Competency list, note sheet, brain dump paper. Printing is optional; ruling the boxes onto your own paper is treated exactly the same."),
                  ("First pass, in your first color", "Read the book chapters or my notes and fill in the note sheet boxes with drawings, labels and short lists. Try the competency prompts. Leave the gaps."),
                  ("Second pass, in your second color", "Watch the week's videos in order and add what they gave you that the reading did not. The second color shows you exactly where your reading was thin."),
                  ("Upload your note sheet", "Photograph or scan the sheet with both colors on it and upload it. Marked complete or not complete, never graded for a score. It is how you show you are participating.")],
        "Practice": [("Study it for several days", "About an hour a day: recall cards, draw it from memory, brain dumps, book problems, Study With Me. Spacing is the whole trick, because the forgetting in between is what makes it stick.")],
        "Apply": [("Lab", "The week's lab, with a sheet you fill in by hand and turn in. Graded, Investigation."),
                  ("Your patient", "One entry in your patient's chart each week: draw the loop, answer the questions, log your AI use. Graded, Application."),
                  ("Discussion", "One post carrying some physiology from the week and what you learned about your own thinking. Post Friday, replies Sunday. Graded, Thinking.")],
        "Check": [("Mastery Check, and upload your report", "A practice exam on the week with nothing open, then upload the report. Complete or not complete. A low score is information, not a grade: it names the competencies to go back to.")],
    }
    n = 0
    for stage in STAGE_ORDER:
        name, blurb = STAGE_TAGLINE[stage]
        rows = ""
        for title, body in stage_steps[stage]:
            n += 1
            rows += ('<li style="margin:0 0 10px 0;"><strong>Step %d. %s</strong> %s</li>'
                     % (n, html.escape(title), html.escape(body)))
        parts.append('<div style="%s">' % CARD
                     + stage_chip(stage)
                     + '<h3 style="margin:0 0 6px 0;font-size:1.2em;color:%s;">%s</h3>' % (NAVY, html.escape(name))
                     + p(html.escape(blurb))
                     + '<ul style="margin:0;padding-left:1.2em;line-height:1.6;color:%s;list-style:none;">%s</ul>' % (NAVY, rows)
                     + '</div>')
    parts.append(h2("Why two colors"))
    parts.append('<div style="%s">' % CARD
                 + p("The note sheet is one big box per competency, and you fill each box twice. The first pass, from the book and the notes, is done before you watch anything. That pass is your baseline: what your own reading produced. The second pass, from the videos, goes into the same box in a different color. When you are done, the second color is a map of what the reading did not give you, and that map is what you study from.")
                 + p("Do it in this order. A student who watches the video first recognizes the material instead of producing it, and the sheet stops showing the gap that makes the week work.")
                 + p("Keep it to drawings, labels, arrows and short lists. If you need words, put them in small boxes with arrows between them, in the order things happen. Sentences running across the page do not count, because that is not how the exam will ask you.")
                 + '</div>')
    parts.append(h2("When things are due"))
    parts.append('<div style="%s">' % CARD
                 + p("<strong>Friday, 10:00 pm Pacific:</strong> your discussion post.")
                 + p("<strong>Sunday, 10:00 pm Pacific:</strong> your discussion replies, the lab, your patient chart entry, your note sheet upload, and your Mastery Check report.")
                 + p("Every week opens on its Monday. If you have finished and submitted the current week, the next one unlocks early on Saturday at 8:00 pm Pacific so you can start over the weekend. Late work: up to 24 hours late loses half the credit, and after that it is a zero. Plan for emergencies.")
                 + '</div>')
    parts.append(h2("Participation, and staying enrolled"))
    parts.append('<div style="%s">' % CARD
                 + p("Two things are turned in every week that carry no points: your note sheet, after both passes, and your Mastery Check report. Each is marked complete or not complete. They are how I see that you are working through the week, and how I know when to reach out. A student who stops turning them in is not participating in the class, and continued participation is a condition of staying enrolled. This is not a hoop. The sheet is the work, and uploading it takes two minutes.")
                 + '</div>')
    parts.append(h2("What is graded"))
    parts.append('<div style="%s">' % CARD
                 + '<ul style="margin:0;padding-left:1.2em;line-height:1.6;color:%s;">' % NAVY
                 + '<li><strong>Knowledge, 35 percent.</strong> Two draw and teach midterms.</li>'
                 + '<li><strong>Investigation, 25 percent.</strong> The weekly lab.</li>'
                 + '<li><strong>Application, 25 percent.</strong> The weekly patient case and your chart.</li>'
                 + '<li><strong>Thinking, 15 percent.</strong> The weekly discussion.</li></ul>'
                 + p("All of the graded work sits in the Apply stage, plus the two midterms. Learn, Practice and Check carry no points on purpose, so you can do them the way that works for your brain. The note sheet upload and the Mastery Check report are tracked complete or not complete because they show me you are in the course.",
                     extra="margin-top:12px;")
                 + '<p style="margin:8px 0 0 0;">'
                 + btn("How grading works, in full", CANVAS + "/pages/how-grading-works", primary=False, new_tab=False)
                 + btn("Course syllabus", CANVAS_SYLLABUS, primary=False, new_tab=False) + '</p></div>')
    parts.append(help_line("Not sure where to start, or something is not working?"))
    return "\n".join(parts) + "\n"


def how_grading_works():
    """The grading reference, as a Canvas page rather than an off-site link, so
    a student reading it can use Back and the module Next button to return."""
    def cat(pct, name, body_html):
        return ('<div style="%s">' % CARD
                + '<p style="margin:0 0 4px 0;font-size:0.85em;font-weight:800;letter-spacing:0.08em;'
                  'text-transform:uppercase;color:%s;">%s of your grade</p>' % (MAROON_DARK, pct)
                + '<h3 style="margin:0 0 8px 0;font-size:1.25em;color:%s;">%s</h3>' % (NAVY, html.escape(name))
                + body_html + '</div>')

    parts = [eyebrow("BIO 005 Human Physiology &middot; Start here, read once")]
    parts.append('<div style="%s">' % CARD
                 + p("Four categories, each named for what it asks you to do rather than for the format it arrives in. "
                     "The work that carries the most weight is the work that proves the reasoning is yours.")
                 + p("All four sit in the Apply stage of the week, except the two midterms. Everything in Learn, Practice "
                     "and Check carries no points, and the reason for that is at the bottom of this page.")
                 + '</div>')

    parts.append(h2("The four categories"))
    parts.append(cat("35 percent", "Knowledge",
        p("Two exams, 17.5 percent each. They are not multiple choice. You draw a physiological pathway and teach it out "
          "loud on video, with no notes.")
        + p("Midterm 1 covers Weeks 1 to 7, in a window from October 26 to 28. Midterm 2 covers Weeks 8 to 14, in a window "
            "from December 14 to 16. Each one is a three day window rather than an hour, so you can pick your time.")))
    parts.append(cat("25 percent", "Investigation",
        p("The weekly labs. You generate and interpret real physiological output and write it up in the same structure a "
          "clinical write up uses: question, prediction, evidence, interpretation, conclusion.")
        + p("Where a week uses PhysioEx, it takes both halves. PhysioEx has to show complete in Pearson, and the points "
            "live on your worksheet.")))
    parts.append(cat("25 percent", "Application",
        p("<strong>20 percent is your weekly application case</strong>, chosen from three or four set in different rooms and "
          "turned in each Sunday. They differ in context, not in rigor, and every one of them assesses the same underlying "
          "competency.")
        + p("<strong>5 percent is your patient chart</strong>, the capstone. You keep it by hand all term, adding each week's "
            "data and your thinking about it, and nothing is collected week to week. The finished chart is turned in once, on "
            "Wednesday, December 16, and graded as one piece.")))
    parts.append(cat("15 percent", "Thinking",
        p("One discussion post a week, carrying the physiology and your thinking about it together: the decision you made, "
          "the evidence, and what you adjusted.")
        + p("The initial post is due Friday at 10:00 pm Pacific, so there is something for your classmates to reply to. "
            "Replies are due Sunday at 10:00 pm Pacific.")))

    parts.append(h2("What is not graded, and why that is deliberate"))
    parts.append('<div style="%s">' % CARD
                 + p("Several things you do every week carry no points at all.")
                 + '<ul style="margin:0 0 12px 0;padding-left:1.2em;line-height:1.6;color:%s;">' % NAVY
                 + '<li style="margin:0 0 10px 0;"><strong>The note sheet and the retrieval work.</strong> This is where you '
                   'find out what you do not know. Grading it would push you to make it look finished instead of honest, and '
                   'an honest sheet with gaps in it is worth more to you than a tidy one.</li>'
                 + '<li style="margin:0 0 10px 0;"><strong>The practice items.</strong> Predict, commit, check, correct, '
                   'explain. Getting these wrong is the point of doing them.</li>'
                 + '<li style="margin:0 0 10px 0;"><strong>The book problems.</strong> Work them forwards if you have a way '
                   'in. If you open one and have no idea how to start, read the worked solution and write beside each line '
                   'why that step is there, then reproduce it from blank paper.</li>'
                 + '<li style="margin:0 0 10px 0;"><strong>The Mastery Check.</strong> No points and no penalty, and you can '
                   'take it as many times as you want. It does score you, and it does more than that: it reports competency '
                   'by competency, separates what you got wrong while feeling sure from what you got wrong while unsure, and '
                   'tells you what to go back to. None of those numbers reach the gradebook.</li>'
                 + '<li style="margin:0 0 10px 0;"><strong>Spaced recall.</strong> Week 3 has to still be there in October, '
                   'and spacing is what does that.</li></ul>'
                 + p("None of this is optional in any way that matters. It is the whole route to the four categories above.")
                 + '</div>')

    parts.append(h2("The two things you turn in that carry no points"))
    parts.append('<div style="%s">' % CARD
                 + p("Your note sheet, after both passes, and your Mastery Check report. Each is marked complete or not "
                     "complete, never scored. They are how I see that you are working through the week, and how I know when "
                     "to reach out. A student who stops turning them in is not participating in the class, and continued "
                     "participation is a condition of staying enrolled.")
                 + '</div>')

    parts.append(h2("Late work"))
    parts.append('<div style="%s">' % CARD
                 + p("Up to 24 hours late loses half the credit. After 24 hours it is a zero. You have the whole week and you "
                     "choose your own hours, so plan for the emergency rather than around it.")
                 + '<p style="margin:8px 0 0 0;">'
                 + btn("Course syllabus", CANVAS_SYLLABUS, primary=False, new_tab=False)
                 + btn("How every week works", CANVAS + "/pages/how-every-week-works", primary=False, new_tab=False)
                 + '</p></div>')
    parts.append(help_line("Not sure how something will be graded?"))
    return "\n".join(parts) + "\n"

def check(s, name):
    bad = []
    if "—" in s: bad.append("em dash")
    if "<em>" in s or "<i>" in s or "font-style:italic" in s: bad.append("italics")
    if "<script" in s or "<style" in s: bad.append("script or style block")
    if "Lora" in s: bad.append("Lora")
    if bad: raise SystemExit("%s failed checks: %s" % (name, ", ".join(bad)))

import json
# Clear every generated page first. Step files are named by their number, and the
# numbers move when a step changes stage, so a stale file from an earlier run
# would otherwise sit in the folder looking current.
for old_file in list(OUT.glob("w0*.html")) + list(OUT.glob("how-*.html")) + list(OUT.glob("week-0*-canvas-page.html")):
    old_file.unlink()

pages = [("how-every-week-works.html", "How every week works", how_every_week_works()),
         ("how-grading-works.html", "How grading works", how_grading_works())]
pages += week_pages(**W1)
pages += week_pages(**W2)

index = []
for name, page_title, content in pages:
    check(content, name)
    (OUT / name).write_text(content, encoding="utf-8")
    index.append({"file": name, "canvas_page_title": page_title, "bytes": len(content)})
    print("%-34s %-62s %6d bytes" % (name, page_title, len(content)))
(OUT / "page-titles.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
print("\n%d pages" % len(pages))
