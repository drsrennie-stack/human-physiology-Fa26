/**
 * BIO 005 Study With Me, the back end.
 * Dr. Sharilyn Rennie, Human Physiology, Yuba College.
 *
 * WHAT THIS IS
 * study-with-me-calendar.html is the whole front end. It keeps nothing of its
 * own: every session, sign-up and recording link lives in one Google Sheet,
 * and this script is the only thing that touches it. Deploy this as a web app,
 * paste the URL it hands back into API_URL at the top of that HTML file, and
 * the calendar is live.
 *
 * SETUP, ABOUT FIVE MINUTES
 *  1. Make a new Google Sheet. Name it "BIO 005 Study With Me".
 *  2. Extensions > Apps Script. Delete whatever is in the editor.
 *  3. Paste this whole file in. Save.
 *  4. In the function dropdown pick setUpSheets and press Run. Approve the
 *     permission prompt. It builds the three tabs with their headers. Running
 *     it twice is safe, it never touches a tab that already exists.
 *  5. Deploy > New deployment. Type: Web app.
 *       Description:  BIO 005 study sign-up
 *       Execute as:   Me
 *       Who has access: Anyone
 *     Press Deploy and approve again. Copy the /exec URL.
 *  6. Open study-with-me-calendar.html, find the CONFIG block near the top of
 *     the script, and replace PASTE_YOUR_BIO005_APPS_SCRIPT_EXEC_URL_HERE with
 *     that URL. Push the file. Done.
 *
 * WHEN YOU EDIT THIS FILE LATER
 * Deploy > Manage deployments > the pencil > Version: New version > Deploy.
 * Editing and saving alone does not change what the web app serves, which is
 * the one thing about Apps Script that catches everybody out. The URL does not
 * change, so you never have to touch the HTML again.
 *
 * ACCESS
 * "Anyone" is required. The calendar is a plain web page with no login, so a
 * student's browser calls this directly and there is nobody to authenticate
 * as. Nothing here can read your Drive: the script is bound to this one sheet
 * and only ever opens that one.
 *
 * PRIVACY
 * The list action never returns an email address. Host emails and student
 * emails stay in the sheet, where only you can see them. What goes out to the
 * page is the host's name, the topic, the time, and the first name of each
 * person signed up, which is what a student needs to decide whether to come.
 * The door contact is public by design, and the host chooses what it is.
 */

var SESSIONS = 'Sessions';
var SIGNUPS  = 'Signups';
var JOINS    = 'Joins';

var SESSION_COLS = ['id', 'createdAt', 'hostName', 'hostEmail', 'topic', 'date',
                    'time', 'capacity', 'duration', 'zoomLink', 'recordingLink',
                    'attendanceReport', 'reportSubmitted', 'canceled'];
var SIGNUP_COLS  = ['sessionId', 'name', 'email', 'createdAt', 'canceled'];
var JOIN_COLS    = ['sessionId', 'name', 'email', 'joinedAt'];


/* ---------------------------------------------------------------- setup */

function setUpSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  makeTab(ss, SESSIONS, SESSION_COLS);
  makeTab(ss, SIGNUPS, SIGNUP_COLS);
  makeTab(ss, JOINS, JOIN_COLS);
  SpreadsheetApp.getUi().alert(
    'Ready.\n\nNow: Deploy > New deployment > Web app, execute as me, access ' +
    'anyone. Paste the /exec URL into API_URL in study-with-me-calendar.html.');
}

function makeTab(ss, name, cols) {
  if (ss.getSheetByName(name)) return;          // never clobber real data
  var sh = ss.insertSheet(name);
  sh.getRange(1, 1, 1, cols.length).setValues([cols]).setFontWeight('bold');
  sh.setFrozenRows(1);
}

function tab(name) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) throw new Error('Sheet "' + name + '" is missing. Run setUpSheets once.');
  return sh;
}


/* ---------------------------------------------------------------- routing */

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'list';
    if (action !== 'list') throw new Error('Unknown action: ' + action);
    return json({ ok: true, sessions: listSessions() });
  } catch (err) {
    return json({ ok: false, error: String(err.message || err) });
  }
}

/* The page posts text/plain on purpose. An application/json body would make
   the browser send a CORS preflight, and Apps Script does not answer one. */
function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var action = String(body.action || '');
    if (action === 'list')          return json({ ok: true, sessions: listSessions() });
    if (action === 'create')        return json(createSession(body));
    if (action === 'signup')        return json(signUp(body));
    if (action === 'cancel')        return json(cancelSpot(body));
    if (action === 'remove')        return json(cancelSession(body));
    if (action === 'wrapup')        return json(wrapUp(body));
    if (action === 'logJoin')       return json(logJoin(body));
    throw new Error('Unknown action: ' + action);
  } catch (err) {
    return json({ ok: false, error: String(err.message || err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/* ---------------------------------------------------------------- reading */

function rows(name, cols) {
  var vals = tab(name).getDataRange().getValues();
  var out = [];
  for (var r = 1; r < vals.length; r++) {
    if (!String(vals[r][0]).trim()) continue;      // skip blank rows
    var o = { _row: r + 1 };
    for (var c = 0; c < cols.length; c++) o[cols[c]] = vals[r][c];
    out.push(o);
  }
  return out;
}

/* Dates and times come back from the sheet as Date objects if the cell was
   ever formatted as one. The page wants "2026-09-16" and "18:00" as plain
   strings, so both are normalized on the way out. */
function asDateStr(v) {
  if (v instanceof Date) return Utilities.formatDate(v, tz(), 'yyyy-MM-dd');
  return String(v || '').trim();
}
function asTimeStr(v) {
  if (v instanceof Date) return Utilities.formatDate(v, tz(), 'HH:mm');
  var s = String(v || '').trim();
  var m = s.match(/^(\d{1,2}):(\d{2})/);
  return m ? (m[1].length === 1 ? '0' : '') + m[1] + ':' + m[2] : s;
}
function tz() {
  return SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone() ||
         'America/Los_Angeles';
}

function listSessions() {
  var sessions = rows(SESSIONS, SESSION_COLS).filter(function (s) {
    return !truthy(s.canceled);
  });
  var signups = rows(SIGNUPS, SIGNUP_COLS).filter(function (s) {
    return !truthy(s.canceled);
  });

  var byId = {};
  signups.forEach(function (s) {
    var k = String(s.sessionId);
    (byId[k] = byId[k] || []).push({ name: String(s.name || '') });
  });

  return sessions.map(function (s) {
    return {
      id:               String(s.id),
      hostName:         String(s.hostName || ''),
      topic:            String(s.topic || ''),
      date:             asDateStr(s.date),
      time:             asTimeStr(s.time),
      capacity:         Number(s.capacity) || 0,
      duration:         Number(s.duration) || 0,
      zoomLink:         String(s.zoomLink || ''),
      recordingLink:    String(s.recordingLink || ''),
      reportSubmitted:  truthy(s.reportSubmitted),
      attendees:        byId[String(s.id)] || []
      /* hostEmail is deliberately not here. Nothing on the page needs it and
         it is not ours to publish. */
    };
  });
}

function truthy(v) {
  if (v === true) return true;
  var s = String(v || '').trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === 'y' || s === '1';
}


/* ---------------------------------------------------------------- writing */

/* Every write takes the document lock. Two students signing up for the last
   seat at the same moment is the case this exists for. */
function withLock(fn) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}

function newId() {
  return 's' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max || 500);
}

function findSession(id) {
  var all = rows(SESSIONS, SESSION_COLS);
  for (var i = 0; i < all.length; i++) {
    if (String(all[i].id) === String(id)) return all[i];
  }
  return null;
}

function sameEmail(a, b) {
  return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
}

function createSession(b) {
  return withLock(function () {
    var hostName = clean(b.hostName, 60);
    var hostEmail = clean(b.hostEmail, 120);
    var topic = clean(b.topic, 900);        // the page packs extras in here
    var date = clean(b.date, 10);
    var time = clean(b.time, 5);
    if (!hostName || !hostEmail || !topic || !date || !time) {
      throw new Error('Name, email, topic, date and time are all required.');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('That date did not come through.');
    if (!/^\d{1,2}:\d{2}$/.test(time))     throw new Error('That time did not come through.');

    tab(SESSIONS).appendRow([
      newId(), new Date(), hostName, hostEmail, topic, date, time,
      Number(b.capacity) || 0, Number(b.duration) || 0, clean(b.zoomLink, 400),
      '', '', false, false
    ]);
    return { ok: true };
  });
}

function signUp(b) {
  return withLock(function () {
    var id = clean(b.id, 40);
    var name = clean(b.name, 60);
    var email = clean(b.email, 120);
    if (!id || !name || !email) throw new Error('Please add your name and email.');

    var sess = findSession(id);
    if (!sess) throw new Error('That session is no longer posted.');
    if (truthy(sess.canceled)) throw new Error('That session was canceled.');

    var mine = rows(SIGNUPS, SIGNUP_COLS).filter(function (s) {
      return String(s.sessionId) === id && !truthy(s.canceled);
    });
    for (var i = 0; i < mine.length; i++) {
      if (sameEmail(mine[i].email, email)) {
        throw new Error('You are already signed up for this one.');
      }
    }
    var cap = Number(sess.capacity) || 0;
    if (cap > 0 && mine.length >= cap) throw new Error('That session just filled up.');

    tab(SIGNUPS).appendRow([id, name, email, new Date(), false]);
    return { ok: true };
  });
}

function cancelSpot(b) {
  return withLock(function () {
    var id = clean(b.id, 40);
    var email = clean(b.email, 120);
    if (!id || !email) throw new Error('Enter the email you signed up with.');

    var sh = tab(SIGNUPS);
    var all = rows(SIGNUPS, SIGNUP_COLS);
    var hit = 0;
    for (var i = 0; i < all.length; i++) {
      if (String(all[i].sessionId) === id && sameEmail(all[i].email, email) &&
          !truthy(all[i].canceled)) {
        sh.getRange(all[i]._row, SIGNUP_COLS.indexOf('canceled') + 1).setValue(true);
        hit++;
      }
    }
    if (!hit) throw new Error('No sign-up found for that email on this session.');
    return { ok: true };
  });
}

function cancelSession(b) {
  return withLock(function () {
    var id = clean(b.id, 40);
    var email = clean(b.hostEmail, 120);
    var sess = findSession(id);
    if (!sess) throw new Error('That session is no longer posted.');
    if (!sameEmail(sess.hostEmail, email)) {
      throw new Error('That email does not match the host of this session.');
    }
    tab(SESSIONS).getRange(sess._row, SESSION_COLS.indexOf('canceled') + 1).setValue(true);
    return { ok: true };
  });
}

function wrapUp(b) {
  return withLock(function () {
    var id = clean(b.id, 40);
    var email = clean(b.hostEmail, 120);
    var sess = findSession(id);
    if (!sess) throw new Error('That session is no longer posted.');
    if (!sameEmail(sess.hostEmail, email)) {
      throw new Error('That email does not match the host of this session.');
    }
    var sh = tab(SESSIONS);
    var rec = clean(b.recordingLink, 400);
    var rep = clean(b.attendanceReport, 20000);
    if (rec) sh.getRange(sess._row, SESSION_COLS.indexOf('recordingLink') + 1).setValue(rec);
    if (rep) sh.getRange(sess._row, SESSION_COLS.indexOf('attendanceReport') + 1).setValue(rep);
    sh.getRange(sess._row, SESSION_COLS.indexOf('reportSubmitted') + 1).setValue(true);
    return { ok: true };
  });
}

/* Best effort, and it must never throw. The page fires this as the student is
   navigating away to the meeting, so a failure here cannot be allowed to stop
   them getting in. */
function logJoin(b) {
  try {
    tab(JOINS).appendRow([clean(b.id, 40), clean(b.name, 60),
                          clean(b.email, 120), new Date()]);
  } catch (e) {}
  return { ok: true };
}
