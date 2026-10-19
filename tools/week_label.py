"""
tools/week_label.py

Oct 18 2026, Scrubs: Canvas numbers the modules by the calendar. The
reflexes and senses unit (site Week 5) ran two calendar weeks, "Weeks 5 and 6"
in Canvas, so site Week 6 (muscle) is Week 7 to students, site Week 7
(hormones) is Week 8, and site Week 8 (Midterm 1) is Week 9.

The site keeps its own numbers inside: data, file names and every ?week=
address are unchanged. relabel() changes only the number a student reads,
"Week 6" to "Week 7" and so on, never "week=6", "week-06" or "Week6".
Discussion numbers are not touched: they count up one at a time
(Discussion 6 is the first discussion after Discussion 5).

The same map is in bio005-week-label.js for the pages that build labels in
the browser. Keep the two the same. Site Week 9 (the heart) reads Week 10;
site Week 10 is left alone for now, and from Week 11 on the numbers agree.
"""
import re

LABEL = {6: 7, 7: 8, 8: 9, 9: 10}


def L(n):
    n = int(n)
    return LABEL.get(n, n)


def relabel(s):
    s = re.sub(r"\b(Weeks)( |&nbsp;)(\d{1,2})( (?:to|through|and) )(\d{1,2})\b",
               lambda m: "%s%s%s%s%s" % (m[1], m[2], L(m[3]), m[4], L(m[5])), s)
    s = re.sub(r"\b(Week|WEEK)( |&nbsp;)(\d{1,2})\b",
               lambda m: "%s%s%s" % (m[1], m[2], L(m[3])), s)
    return s
