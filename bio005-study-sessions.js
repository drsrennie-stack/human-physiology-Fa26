/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-study-sessions.js

   THE STUDY WITH ME CALENDAR.

   study-with-me.html opens on this list. A student lands on what
   is actually happening this week rather than on two screens of
   explanation, which is the whole point of the page.

   ------------------------------------------------------------
   HOW TO ADD A SESSION
   ------------------------------------------------------------
   Copy one of the blocks below, change the fields, and push the
   file. Nothing else has to change. Past sessions drop off the
   calendar on their own the morning after they happen, so the
   list can be left alone once a session is over.

     date     "2026-09-16"    always YYYY-MM-DD
     start    "18:00"         24 hour clock, Pacific
     end      "19:30"         24 hour clock, Pacific
     title    what you are working on, in plain words
     lead     "instructor" or "student"
     who      the name shown on the card
     where    the app it runs on: "Zoom", "Google Meet", "Discord".
              Sessions are online only, because the recording is what
              lets an hour count toward Scholar Points.
     link     the join link, or leave it "" and the card says to
              watch Canvas for it
     note     one optional line, for anything the card does not
              already say

   Only date, start, title and lead are required. Everything else
   can be "" and the card still reads properly.

   ------------------------------------------------------------
   WHEN STUDENTS CAN POST THEIR OWN
   ------------------------------------------------------------
   A static site cannot take a student's post, so right now they
   go through the Canvas discussion thread and this file carries
   the sessions. If the Apps Script signup from BIO 004 is ever
   deployed for physiology, paste its URL into API below and the
   page will merge student-posted sessions into this same
   calendar. Until then leave it "" and nothing tries to load.
   ============================================================ */

window.BIO005_SWM_API = "";

/* THE SIGNUP AND ONBOARDING PAGE.

   Where a student goes to put their own session on this calendar,
   or to sign up for one. Paste its address here, whether that is
   the physiology copy of the BIO 004 signup app or any other page
   you point them at. Until it is filled in, the page shows only
   the "Log your hours" button rather than offering a dead link,
   and the empty calendar tells them to send you the details. */
window.BIO005_SWM_SIGNUP = "";

window.BIO005_SESSIONS = [

  /* ---------- EXAMPLE, DELETE OR EDIT ----------
     Left here so the calendar has something in it the first time
     a student opens the page, and so the shape of a real entry is
     obvious. Change it to your first real drop-in. */
  {
    date:  "2026-09-16",
    start: "18:00",
    end:   "19:00",
    title: "Week 1 drop in: homeostasis and feedback loops",
    lead:  "instructor",
    who:   "Dr. Rennie",
    where: "Zoom",
    link:  "",
    note:  "Bring a question or bring nothing. Stay ten minutes or the whole hour."
  }

];
