/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-week-label.js

   Oct 18 2026, Scrubs: Canvas numbers the modules by the calendar. The
   reflexes and senses unit (Week 5 on this site) ran two calendar weeks, so
   in Canvas it is "Weeks 5 and 6", and the weeks after it are Week 7
   (muscle), Week 8 (hormones) and Week 9 (Midterm 1).

   This site keeps its own week numbers inside: the data, the file names and
   every ?week= address stay as they are (week=6 is still muscle). Only the
   number a student READS goes through BIO005_WL, so a page linked from the
   Canvas Week 7 module says Week 7.

   Site Week 9 (the heart, Nov 9 to 15) is calendar week 10, so it reads Week 10;
   without this it would share the label Week 9 with Midterm 1. Site Week 10
   runs Nov 9 to 22, alongside Weeks 9 and 11, so it is left as Week 10 until
   Scrubs decides how Canvas shows it. From Week 11 on the two numbers agree.
   ============================================================ */
window.BIO005_WEEK_LABELS = { 6: 7, 7: 8, 8: 9, 9: 10 };
window.BIO005_WL = function (n) {
  var k = parseInt(n, 10);
  return (k in window.BIO005_WEEK_LABELS) ? window.BIO005_WEEK_LABELS[k] : n;
};
