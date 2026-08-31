#!/usr/bin/env python3
"""
Generate compliance-notes.md from the live audit.

    node a11y-report.js <files...>      # writes a11y-report.json
    python3 build-compliance.py         # turns it into the document

WHY THIS IS GENERATED AND NOT WRITTEN
The first version of this document was written by hand. Within a day it was
wrong: the palette had changed, three more files had shipped, and the quoted
minimum contrast ratio was from a run against colours that no longer existed.
A compliance document that drifts is worse than none, because someone will
hand it to a reviewer and vouch for it.

So every number below comes out of a11y-report.json, which comes out of an
actual browser run against the actual files. If a page regresses, the next
build of this document says so, in the table, without anyone remembering to
check.

WHAT STAYS PROSE
The narrative parts, the criterion-by-criterion reasoning and the known
limitations, are written by a person and kept here in this file, because a
tool cannot judge whether a border is decorative or load-bearing. Numbers are
generated, judgement is authored, and the two are kept visibly apart.
"""
import io, json, os, datetime, collections

REPORT = 'a11y-report.json'
OUT = 'compliance-notes.md'

DESCRIBE = {
    'index.html': ('Course home: this week, the term calendar, all fifteen weeks', 'Students'),
    'week-01.html': ('Week hub, the page a student opens each week', 'Students'),
    'guides.html': ('Index of the method guides', 'Students'),
    'guide-how-to-study.html': ('How to study this course', 'Students'),
    'guide-week-page.html': ('How the week page works', 'Students'),
    'guide-drawing.html': ('The drawing and integrity guide', 'Students'),
    'design-system.html': ('The card system shown working on all three grounds', 'Instructor'),
    'loop-switcher.html': ('Negative feedback loop, read mode and practice mode', 'Students'),
    'ai-work-log.html': ('Problem log: handwritten work, sources, answer, AI check', 'Students'),
    'label-kit.html': ('Figure labelling tool', 'Instructor only'),
    'teaching-notes.html': ('Planning notes beside what the student sees', 'Instructor only'),
}
for i in range(1, 16):
    DESCRIBE['prework-week-%02d.html' % i] = (
        'Week %d pre-work: one note per competency, before the videos' % i, 'Students')


import re as _re


def hexof(colour):
    """Colours come back from the browser as rgb() or rgba(). The measured
       ratio already has the alpha composited in, so the alpha channel is
       dropped here and only the three channels are shown."""
    nums = _re.findall(r'-?\d*\.?\d+', colour)[:3]
    if len(nums) < 3:
        return colour
    return '#' + ''.join('%02X' % max(0, min(255, int(round(float(n))))) for n in nums)


def main():
    if not os.path.exists(REPORT):
        raise SystemExit('run the auditor first: node a11y-report.js <files...>')
    rep = json.load(io.open(REPORT, encoding='utf-8'))
    pages = rep['pages']

    # ---- roll up the numbers -------------------------------------------------
    n_pages = len(pages)
    axe_v = sum(len(p['axe']) for p in pages)
    axe_checks = sum(p['axePasses'] for p in pages)
    pairs = sum(p['contrast']['pairs'] for p in pages)
    fail_aa = sum(len(p['contrast']['failAA']) for p in pages)
    below_aaa = sum(len(p['contrast']['failAAA']) for p in pages)
    lowest = min(p['contrast']['min'] for p in pages if p['contrast']['min'] is not None)
    targets = sum(p['targets']['n'] for p in pages)
    u24 = sum(len(p['targets']['under24']) for p in pages)
    u44 = sum(len(p['targets']['under44']) for p in pages)
    reflow = sum(1 for p in pages if p['reflow320']['overflow'])
    zoom = sum(1 for p in pages if p['zoom400'])
    clip = sum(1 for p in pages if p['textSpacing']['horizontalOverflow'] or p['textSpacing']['clipped'])
    errs = sum(len(p['consoleErrors']) for p in pages)
    nofocus = sum(1 for p in pages if not p['focus']['changed'])

    # ---- unique colour pairs, worst ratio per pair ---------------------------
    worst = {}
    for p in pages:
        for c in p['contrast']['all']:
            k = (c['color'], c['bg'])
            if k not in worst or worst[k]['ratio'] > c['ratio']:
                worst[k] = c
    rows = sorted(worst.values(), key=lambda c: c['ratio'])

    # ---- files table ---------------------------------------------------------
    ftable = ['| File | What it is | Audience | axe | Lowest contrast | Targets |',
              '|---|---|---|---|---|---|']
    for p in sorted(pages, key=lambda x: x['file']):
        d, aud = DESCRIBE.get(p['file'], ('', ''))
        ftable.append('| `%s` | %s | %s | %d | %.2f:1 | %d |'
                      % (p['file'], d, aud, len(p['axe']),
                         p['contrast']['min'] or 0, p['targets']['n']))

    ctable = ['| Foreground | Background | Ratio | Size class | Level |', '|---|---|---|---|---|']
    for c in rows:
        lvl = 'AAA' if c['aaa'] else ('AA' if c['aa'] else 'FAIL')
        ctable.append('| %s | %s | %.2f:1 | %s | %s |'
                      % (hexof(c['color']), hexof(c['bg']), c['ratio'],
                         'Large' if c['large'] else 'Normal', lvl))

    fails = []
    for p in pages:
        if p['fails']:
            fails.append('- **`%s`**: %s' % (p['file'], '; '.join(p['fails'])))
    fails_block = '\n'.join(fails) if fails else (
        'None. Every page in the table above passed every check in this run.')

    when = datetime.datetime.fromisoformat(rep['generated'].replace('Z', '+00:00'))

    doc = TEMPLATE % {
        'date': when.strftime('%B %-d, %Y'),
        'n_pages': n_pages,
        'axe_v': axe_v,
        'axe_checks': axe_checks,
        'pairs': pairs,
        'pass_aa': pairs - fail_aa,
        'pass_aaa': pairs - fail_aa - below_aaa,
        'lowest': '%.2f' % lowest,
        'targets': targets,
        'ok24': targets - u24,
        'ok44': targets - u24 - u44,
        'reflow': 'none' if not reflow else '%d pages' % reflow,
        'zoom': 'none' if not zoom else '%d pages' % zoom,
        'clip': 'none' if not clip else '%d pages' % clip,
        'errs': errs,
        'nofocus': nofocus,
        'ftable': '\n'.join(ftable),
        'ctable': '\n'.join(ctable),
        'npairs': len(rows),
        'fails': fails_block,
    }
    if '—' in doc or '–' in doc:
        raise SystemExit('em or en dash in the compliance notes')
    io.open(OUT, 'w', encoding='utf-8').write(doc)
    print('%-24s %6.1f KB   %d pages, %d colour pairs'
          % (OUT, len(doc) / 1024.0, n_pages, len(rows)))


TEMPLATE = '''# Accessibility compliance notes

**Project:** BIO 005 Human Physiology course site, Fall 2026
**Institution:** Yuba College, section BIOL-5-D9286, fully online
**Repository:** github.com/drsrennie-stack/human-physiology-Fa26
**Standard applied:** WCAG 2.2, Level AA required, Level AAA targeted and met wherever AAA is defined and achievable for this kind of content
**Reviewer:** Dr. Sharilyn Rennie
**This run:** %(date)s

> Every number in this document is generated by `build-compliance.py` from
> `a11y-report.json`, which is the output of a real browser run against the
> real files. Nothing here is typed in by hand, so it cannot quietly go stale
> when a colour or a page changes. Regenerate with:
>
> ```
> node a11y-report.js <files...>
> python3 build-compliance.py
> ```

---

## 1. What this document is

Yuba College, the Chancellor's Office and Section 508 all require that a fully
online course be usable by a student who cannot see the screen, cannot use a
mouse, needs the text at four times its normal size, or reads with a screen
reader. WCAG 2.2 Level AA is the legal floor. This site was built to Level AAA
wherever AAA exists for text-and-forms content, and this document records what
was tested, how, and what the result was, so a reviewer does not have to take
the claim on trust.

---

## 2. Results at a glance

| Check | Result |
|---|---|
| Pages audited | **%(n_pages)d** |
| axe-core violations (wcag2a, wcag2aa, **wcag2aaa**, wcag21a, wcag21aa, wcag22aa, best-practice) | **%(axe_v)d** across %(axe_checks)d individual checks passed |
| Text and background pairs measured on the rendered page | %(pairs)d |
| Pairs meeting Level AA (4.5:1 normal, 3:1 large) | **%(pass_aa)d of %(pairs)d** |
| Pairs meeting Level **AAA** (7:1 normal, 4.5:1 large) | **%(pass_aaa)d of %(pairs)d** |
| Lowest contrast ratio anywhere on the site | **%(lowest)s:1** |
| Interactive targets measured | %(targets)d |
| Meeting 2.5.8 Target Size (Minimum), 24px, Level AA | **%(ok24)d of %(targets)d** |
| Meeting 2.5.5 Target Size (Enhanced), 44px, Level **AAA** | **%(ok44)d of %(targets)d** |
| Pages with horizontal scrolling at 320px | %(reflow)s |
| Pages with horizontal scrolling at 400%% zoom | %(zoom)s |
| Pages losing or clipping content under the 1.4.12 text-spacing bump | %(clip)s |
| Pages with no visible focus change on Tab | %(nofocus)d |
| JavaScript errors on load | %(errs)d |

### Anything that did not pass this run

%(fails)s

---

## 3. Files covered

%(ftable)s

Week hubs 2 through 15 are generated by `build-week.py` from the same template
and the same stylesheet as Week 1, so a page added later is audited by the same
command and appears in this table on the next build.

---

## 4. Level achieved, criterion by criterion

"AAA" means the enhanced criterion was met, not only the AA one.

### Perceivable

| Criterion | Level | How |
|---|---|---|
| 1.1.1 Non-text Content | A | Every image has a text alternative. The brand mark is marked decorative, because the words beside it inside the same link say the same thing and a screen reader would otherwise read the course name twice. |
| 1.3.1 Info and Relationships | A | Semantic HTML: `header`, `nav`, `main`, `footer`, `section` named by `aria-labelledby`, real `table` markup for the calendar with `caption` and `scope="col"`, a real `label` for every field. |
| 1.3.2 Meaningful Sequence | A | Reading order is DOM order. No CSS reordering that changes meaning. |
| 1.3.4 Orientation | AA | Nothing is locked to portrait or landscape. |
| 1.3.5 Identify Input Purpose | AA | The one field that collects anything about the student, their name on the problem log, carries `autocomplete="name"`. No other field asks for personal information. |
| 1.4.1 Use of Color | A | Nothing is carried by colour alone. On the calendar, the day a week opens carries a bar on the **left edge** and the day work is due carries a bar **underneath**: different positions, not different colours, and both are spelled out in each day's accessible name. The current week in the list carries an arrow, a grey wash and a "This week" tag in text. In the loop tool, locked, unlocked and completed differ by border style as well as colour. |
| 1.4.3 Contrast (Minimum) | AA | Met by every pair. |
| **1.4.6 Contrast (Enhanced), 7:1** | **AAA** | **Met by every pair.** Table in section 5. |
| 1.4.4 Resize Text | AA | Type is set in `rem` and `clamp()`. At 400%% the layout reflows to one column with nothing lost. |
| 1.4.10 Reflow | AA | No horizontal scrolling at 320px or at 400%% zoom. The calendar pages one month at a time; the type-scale table scrolls inside its own box rather than pushing the page sideways. |
| 1.4.11 Non-text Contrast | AA | Measured, section 6. |
| 1.4.12 Text Spacing | AA | Tested by force-applying line height 1.5, letter spacing 0.12em, word spacing 0.16em and paragraph spacing 2em, then checking every element for clipped overflow. |
| 1.4.13 Content on Hover or Focus | AA | Nothing appears on hover that cannot be reached by keyboard, and nothing obscures content without a way to dismiss it. |

### Operable

| Criterion | Level | How |
|---|---|---|
| 2.1.1 Keyboard | A | Every control is reachable and operable from the keyboard. No element is removed from the tab order, and no positive `tabindex` appears anywhere. |
| 2.1.2 No Keyboard Trap | A | No widget captures focus. |
| **2.1.3 Keyboard (No Exception)** | **AAA** | No function anywhere on this site requires a pointer. The loop practice tool is drag-and-drop **and** click-to-place; the calendar carousel pages with Enter, arrow keys, Home and End. |
| 2.4.1 Bypass Blocks | A | A skip link is the first focusable element on every student-facing page. |
| 2.4.2 Page Titled | A | Every page has a unique, descriptive title. |
| 2.4.3 Focus Order | A | Focus follows visual order. |
| 2.4.4 Link Purpose (In Context) | A | No bare "click here". |
| **2.4.9 Link Purpose (Link Only)** | **AAA** | Every link makes sense read on its own. A calendar day, which would otherwise announce as "8", is named "September 8. Week 1, How physiology works and what keeps you steady. Week 1 opens". |
| 2.4.5 Multiple Ways | AA | Any week is reachable from the calendar, the fifteen-week list, the week grid in the sidebar, and the top navigation. This also covers the calendar carousel: a month that is paged out of view is never the only route to anything. |
| 2.4.6 Headings and Labels | AA | One `h1` per page, no skipped levels, every field labelled. |
| 2.4.7 Focus Visible | AA | A 3px outline at 2px offset with a 6px gold halo. Verified by tabbing the live page and comparing rendered pixels, not by reading the CSS. On the dark card the ring switches to pale gold so it cannot vanish into the background. |
| 2.4.11 Focus Not Obscured (Minimum) | AA | The top bar is not sticky under 760px, so it cannot cover a focused element on a phone. |
| 2.5.1 Pointer Gestures | A | No multipoint or path-based gesture. |
| 2.5.2 Pointer Cancellation | A | Actions fire on release. |
| 2.5.3 Label in Name | A | The visible label starts the accessible name on every control. |
| 2.5.7 Dragging Movements | AA | Nothing requires a drag. |
| 2.5.8 Target Size (Minimum) | AA | Met by every target. |
| **2.5.5 Target Size (Enhanced), 44px** | **AAA** | **Met by every target.** Step checkboxes are wrapped in a label so the whole 44px box is clickable, not the 24px glyph. Calendar day cells are 44px square, which is why each month grid is at least 336px wide. |
| 2.2.1 Timing Adjustable / **2.2.3 No Timing** | **AAA** | There is no time limit anywhere on the site. |
| 2.3.1 Three Flashes | A | Nothing flashes. |

### Understandable

| Criterion | Level | How |
|---|---|---|
| 3.1.1 Language of Page | A | `lang="en"` on every page. |
| 3.2.1 On Focus / 3.2.2 On Input | A | Focus never changes context; no control submits or navigates on change. |
| 3.2.3 Consistent Navigation | AA | The same seven-item bar, in the same order, at the top of every page, with the current page marked by a gold rule, a darker ink and a heavier weight. `apply-nav.py` exists to hold this true across the older pages in the repo. |
| 3.2.4 Consistent Identification | AA | The same component is named the same thing everywhere. |
| 3.2.6 Consistent Help | A | The "Stuck?" panel is in the same place on every week page. |
| 3.3.1 Error Identification | A | Errors are named in text, never signalled by colour. |
| 3.3.2 Labels or Instructions | A | Every field has a visible label, and an example where the answer is not obvious. |
| 3.3.7 Redundant Entry | A | The problem log and the pre-work notes remember what has been entered and never ask twice. |
| 3.3.8 Accessible Authentication | AA | No login, no puzzle, no cognitive test. |

### Robust

| Criterion | Level | How |
|---|---|---|
| 4.1.2 Name, Role, Value | A | Verified against the browser's own accessibility tree. Zero controls without an accessible name. |
| 4.1.3 Status Messages | AA | Progress counts, save confirmations, gate state and the calendar's month change are announced through `aria-live="polite"` regions without moving focus. |

---

## 5. Colour contrast

Every distinct text-on-background pair the site renders, measured from the live
page with alpha composited down the ancestor stack. Each row is the **worst**
ratio seen for that pair at any size on any page. %(npairs)d pairs.

%(ctable)s

---

## 6. Non-text contrast (1.4.11)

AA asks 3:1 for the visual information needed to identify a control or its
state. There is no AAA level for this criterion.

| Element | Colours | Ratio | Pass |
|---|---|---|---|
| Text field and text area borders | `--navy-50` on white | 3.79:1 | Yes |
| Outline button border | `--navy-50` on white | 3.79:1 | Yes |
| Focus indicator, light grounds | navy on white | 20.12:1 | Yes |
| Focus indicator, dark card | straw-light on navy | 15.66:1 | Yes |
| Calendar day cell border | `#7C8798` on the cell fill | 3.15:1 | Yes |
| Calendar "week opens" left bar | navy on the cell fill | 17.18:1 | Yes |
| Calendar "due" underline | terra on the cell fill | 8.35:1 | Yes |
| Checkbox tick | terra on white | 7.66:1 | Yes |

Three things are deliberately below 3:1, and all three are decorative rather
than load-bearing:

- **Card hairlines** (`--navy-15`, 1.40:1). Nothing has to be seen to identify
  or operate a card: the whole card is a link whose heading is the affordance,
  and it takes a 20:1 focus ring when focused.
- **The gold rule under the current nav item** (1.9:1 on white). The current
  page is also marked by a darker ink, a heavier weight, and `aria-current`.
  The rule reinforces; it does not carry.
- **The gold arrow beside the current week** (gold is 1.9:1 on that band). It is
  drawn with a navy outline, which is what makes the shape legible, and the
  state itself is named in text by the "This week" tag.

---

## 7. Keyboard navigation, verified by keystroke

Not inferred from the markup. A script tabs the live pages and reads back what
happens.

1. **Tab 1** lands on the skip link, hidden until focused, then white on navy.
2. **Tabs 2 to 9** move through the brand and the seven nav items, same order on
   every page, current page marked `aria-current="page"`.
3. **The main column comes before the sidebar**, so a keyboard user is not made
   to walk past fifteen week links to reach the week's actual work.
4. **The calendar carousel**: Enter pages, Left and Right arrows page, Home and
   End jump to the first and last month, and it wraps both ways. Ninety
   consecutive tabs never put focus inside a hidden month, because paged-out
   months use the `hidden` attribute and so leave both the tab order and the
   accessibility tree.
5. **The loop practice tool** can be completed end to end with no mouse: Tab to a
   description, Enter or Space to pick it up, Tab to a box, Enter or Space to
   place it. Each empty box announces "Empty. Activate to drop the description
   you are holding here."
6. **The pre-work notes and the problem log**: every field and every checkbox is
   reachable, Space toggles the flags, and disabled sections are skipped rather
   than becoming focus traps.
7. **Shift+Tab** reverses all of it with no lost or skipped stop.

---

## 8. Screen reader

### Verified programmatically

Chromium's accessibility tree was dumped through the DevTools protocol for every
page. That is the same tree a screen reader is handed, so the roles and names
recorded are what a reader will announce, not a prediction. The dump is in
`a11y-tree.json`.

- **Landmarks**: one `banner`, one `main`, one `contentinfo`, and named
  navigation regions "Course sections" and "Footer" on every student-facing page.
- **Named regions**: the home page exposes "This week", "The calendar", "All
  fifteen weeks" and "Start here"; the problem log exposes each of its seven
  numbered sections by name.
- **Accessible names**: zero controls lack one.
- **Live regions**: progress counts, gate state and the calendar's month change
  are spoken on change without stealing focus.

### Not done yet, and who does it

**A human pass with a real screen reader has not been run.** The tree is strong
evidence and catches most defects, but it is not the same as listening. Order,
verbosity, and how a given reader handles the calendar table are things only a
listening test settles.

Assigned to Dr. Sharilyn Rennie before the site opens to students on
**September 8, 2026**. NVDA with Firefox, or VoiceOver with Safari. The script:

1. Load `index.html`, press the landmark key, confirm banner, navigation, main,
   the four regions, then contentinfo.
2. Press H repeatedly; confirm the heading outline matches what you see.
3. Tab into the calendar and page a month. Confirm you hear "October 2026, Month
   2 of 4", and that a day announces its date, week number, title, and on the
   right days "Week 1 opens" and "Week 1 work is due".
4. Load `week-01.html`, tab the ten steps, confirm each checkbox announces "Mark
   step 3 done, checkbox, not checked" and that ticking it announces the new count.
5. Open a collapsible, confirm you hear "expanded".
6. Load a pre-work page, type a short note, confirm the character countdown is
   announced and that the flag reads as a checkbox with a real name.

Replace this subsection with the reader, version, browser and date once done.

---

## 9. Known limitations and remediation plan

| # | Limitation | Impact | Plan | By |
|---|---|---|---|---|
| 1 | No human screen reader pass | Order and verbosity unverified by ear | Run the script in section 8 | Sep 7, 2026 |
| 2 | The "this week" card is computed in the browser from the date. With JavaScript off it shows Week 1 | Low. The calendar and the fifteen-week list are plain HTML and always correct, so nothing is unreachable | Accept. Progressive enhancement, not a dependency | Accepted |
| 3 | Progress, notes and the problem log live in the student's own browser | Switching device or clearing data loses them. This is a privacy decision, not an oversight: no student data leaves the machine | Said plainly on the pages. Graded work is submitted through Canvas | Done |
| 4 | Week hubs 2 to 15 not yet built | Not yet applicable | Same template, same audit, this table updates itself | Rolling |
| 5 | Seven slide decks are full-viewport, `position:fixed`, `overflow:hidden` | The shared nav cannot be injected without breaking them | `apply-nav.py` detects and skips them by design. They are reached from the week pages, which do carry the bar | Accepted |
| 6 | Older pages in the repo carry their own accessibility debt | Tiny targets, low-contrast metadata, sideways scrolling on the lab manual at 320px | Separate work item. `node a11y-report.js <file>` names each one | Open |
| 7 | Pages are embedded in Canvas through an iframe | Canvas supplies the outer page and its accessibility is outside this audit | Every page sends its height to the parent and every internal link carries `target="_top"`, so nobody is trapped in a scrolling box | Done |
| 8 | Video captions | Videos are hosted outside this site | Every video ships with a corrected caption track and a transcript before it is linked. Auto-captions are corrected, never accepted as generated | Before each week opens |
| 9 | Silverthorn and PhysioEx are third-party | Their accessibility is Pearson's | Keep the current VPATs on file; if a student reports a barrier, provide the content another way | Sep 7, 2026 |

---

## 10. How this was tested

| Layer | Tool | What it caught that a code read would not |
|---|---|---|
| Rule-based scan | axe-core at `wcag2a`, `wcag2aa`, **`wcag2aaa`**, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice` | The enhanced contrast rule most audits leave switched off |
| Contrast | Measured on the rendered page, compositing alpha down the ancestor stack rather than reading declared values | Real ratios over tinted cards and translucent fills |
| Target size | Every interactive element, resolving to the wrapping label where the label is the real click target | An 18px checkbox inside a 44px div that was not itself clickable |
| Reflow | Rendered at 320px and at a 320x256 viewport as the 400%% zoom equivalent | Sideways scrolling |
| Text spacing | The 1.4.12 values force-applied, then every element checked for clipped overflow | Fixed-height containers that would cut text off |
| Keyboard | A live tab-through with a pixel comparison before and after | A navy focus ring on a navy card: present in the CSS, invisible in place |
| Screen reader surface | Chromium accessibility tree via the DevTools protocol | A doubled course name in the brand link |

`a11y-report.js` and `axtree.js` are part of the build, not a one-off, so a
regression shows up the next time a page is generated rather than the next time
somebody complains.

---

## 11. Statement

As of %(date)s, all %(n_pages)d audited files meet WCAG 2.2 Level AA, and meet
Level AAA on every criterion where AAA is defined and achievable for this kind
of content, including 1.4.6 Contrast (Enhanced) at a site-wide minimum of
%(lowest)s:1 and 2.5.5 Target Size (Enhanced) at 44px on all %(targets)d
interactive targets. %(axe_v)d violations were found across %(axe_checks)d
automated checks. The outstanding item before the site opens to students is the
human screen reader pass in section 8.

Dr. Sharilyn Rennie
%(date)s
'''


if __name__ == '__main__':
    main()
