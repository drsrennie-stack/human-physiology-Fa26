/* case-claim.js, Nov 8 2026. Claim one case from a numbered set, so no two students work the same case.
   Claims go to Dr. Rennie's Google Form; the page reads the form's published response sheet (CSV) and crosses
   out every case already claimed in the current round. When every case in a set has been claimed, the set
   reopens for the next round. No names are sent or shown: only the set, the case number and a random token.
   Settings live in case-claim-config.js (window.CASE_CLAIM). Case content is in window.CASE_SET on the page. */
(function () {
  "use strict";
  var CFG = window.CASE_CLAIM || {}, SET = window.CASE_SET;
  if (!SET) return;
  var live = !!(CFG.formAction && CFG.csv && CFG.entrySet && CFG.entryCase && CFG.entryToken);
  var KEY = "bio005-claim-" + SET.set, TKEY = "bio005-twist-" + SET.set;
  var $ = function (id) { return document.getElementById(id); };
  function load(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var N = SET.cases.length, counts = {}, rowsFor = {}, mine = load(KEY), status = $("ccStatus");
  function say(t) { if (status) status.textContent = t; }

  function csv(t) {
    var r = [], row = [], f = "", q = false;
    for (var i = 0; i < t.length; i++) { var c = t[i];
      if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && t[i + 1] === "\n") i++; row.push(f); r.push(row); row = []; f = ""; }
      else f += c; }
    if (f || row.length) { row.push(f); r.push(row); }
    return r;
  }
  function tally(text) {
    var rows = csv(text), h = (rows.shift() || []).map(function (x) { return x.trim().toLowerCase(); });
    var iS = h.indexOf("set"), iC = h.indexOf("case"), iT = h.indexOf("token");
    counts = {}; rowsFor = {};
    rows.forEach(function (r) {
      if ((r[iS] || "").trim() !== SET.set) return;
      var c = parseInt(r[iC], 10); if (!(c >= 1 && c <= N)) return;
      (rowsFor[c] = rowsFor[c] || []).push((r[iT] || "").trim());
      counts[c] = (counts[c] || 0) + 1;
    });
  }
  function round() { var m = Infinity; for (var c = 1; c <= N; c++) m = Math.min(m, counts[c] || 0); return m; }

  function drawList() {
    var r = round(), box = $("ccList"); if (!box) return;
    box.innerHTML = SET.cases.map(function (k) {
      var taken = (counts[k.n] || 0) > r && !(mine && mine.n === k.n);
      var me = mine && mine.n === k.n;
      return '<li><button type="button" class="cc-b' + (taken ? " taken" : "") + (me ? " mine" : "") + '" data-n="' + k.n + '"' +
        (taken || mine ? ' aria-disabled="true"' : "") + '><span class="cc-n">' + k.n + '</span><span class="cc-t">' + esc(k.title) + '</span>' +
        '<span class="cc-s">' + (me ? "Your case" : taken ? "Taken" : "Open") + "</span></button></li>";
    }).join("");
    box.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { pick(+b.getAttribute("data-n")); }); });
  }
  function showCase() {
    var out = $("ccMine"); if (!out) return;
    if (!mine) { out.hidden = true; return; }
    var k = SET.cases[mine.n - 1]; out.hidden = false;
    $("ccMineBody").innerHTML =
      '<p class="kicker">Case ' + k.n + '</p><h2>' + esc(k.title) + "</h2><p>" + esc(k.patient) + "</p>" +
      '<table><caption class="sr">Your patient&rsquo;s numbers</caption><thead><tr><th scope="col">Measure</th><th scope="col">Your patient</th><th scope="col">Normal</th></tr></thead><tbody>' +
      k.numbers.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") + "</tbody></table>" +
      "<h3>Learn this first</h3><ul class=\"tight\">" + k.learn.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      "<h3>Draw by hand</h3><ol class=\"tight\">" + k.draw.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>" +
      "<h3>Explain in writing, next to your drawing</h3><ol class=\"tight\">" + k.explain.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>" +
      "<h3>Point to it</h3><p><b>" + esc(k.point) + "</b></p>" +
      '<p class="note">Write <b>Case ' + k.n + '</b> and today&rsquo;s date at the top of every page, in your own handwriting.</p>';
    var tw = load(TKEY), tb = $("ccTwist");
    if (tb) { var has = tw !== null && tw !== undefined; tb.hidden = false; $("ccTwistOut").innerHTML = has ? twistHtml(tw) : ""; $("ccTwistBtn").hidden = has; }
  }
  function twistHtml(i) { var t = SET.twists[i]; return '<p class="kicker">Twist ' + t.n + '</p><p><b>' + esc(t.text) + "</b></p><p>" + esc(t.redraw) + '</p><p class="note">Write <b>Case ' + mine.n + ", Twist " + t.n + "</b> at the top of your redraw.</p>"; }

  function pick(n) {
    if (mine) return;
    var r = round();
    if ((counts[n] || 0) > r) { say("Case " + n + " is taken. Pick an open one."); return; }
    var token = Math.random().toString(36).slice(2, 10);
    mine = { n: n, token: token, at: Date.now() }; save(KEY, mine);
    if (live) {
      var body = new URLSearchParams(); body.append(CFG.entrySet, SET.set); body.append(CFG.entryCase, String(n)); body.append(CFG.entryToken, token);
      fetch(CFG.formAction, { method: "POST", mode: "no-cors", body: body }).catch(function () {});
      say("Case " + n + " is yours. It is saved, and the list updates for everyone else within a few minutes.");
    } else {
      say("Case " + n + " is yours on this device. Claiming is not connected yet, so tell Dr. Rennie your case number in the discussion.");
    }
    counts[n] = (counts[n] || 0) + 1; drawList(); showCase();
    var m = $("ccMine"); if (m) m.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function checkClash() {
    if (!mine || !live || !rowsFor[mine.n]) return false;
    var list = rowsFor[mine.n], k = list.indexOf(mine.token), r = round();
    // someone else claimed the same case first in this round, while other cases were still open
    if (k > 0 && k > r && r === 0) {
      say("Someone claimed case " + mine.n + " a moment before you. Please pick another open case.");
      mine = null; save(KEY, null); save(TKEY, null); return true;
    }
    return false;
  }
  var tbtn = $("ccTwistBtn");
  if (tbtn) tbtn.addEventListener("click", function () {
    var cur = load(TKEY); if (!mine || (cur !== null && cur !== undefined)) return;
    var i = Math.floor(Math.random() * SET.twists.length); save(TKEY, i);
    $("ccTwistOut").innerHTML = twistHtml(i); tbtn.hidden = true;
  });
  function refresh() {
    if (!live) { drawList(); showCase(); say(mine ? "" : "Pick a case number."); return; }
    fetch(CFG.csv + (CFG.csv.indexOf("?") < 0 ? "?" : "&") + "t=" + Date.now()).then(function (r) { return r.text(); })
      .then(function (t) { tally(t); var clash = checkClash(); drawList(); showCase(); if (!mine && !clash) say("Round " + (round() + 1) + ". Pick an open case."); })
      .catch(function () { drawList(); showCase(); say("The claim list could not load. Refresh the page in a minute."); });
  }
  refresh();
})();
