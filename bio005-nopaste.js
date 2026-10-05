/* BIO 005, Oct 5 2026. On-screen worksheets: answers are typed, not pasted.
   Pasting or dropping text into an answer box is turned off, and so is
   copying or cutting text from the page. A short note says why. Typing,
   saving and Print or save as PDF all work as before. */
(function () {
  var note;
  function tell(msg) {
    if (!note) {
      note = document.createElement('div');
      note.setAttribute('role', 'status');
      note.style.cssText = 'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);z-index:2147483001;max-width:min(92vw,460px);' +
        'background:#0B1530;color:#fff;font:600 15px/1.45 "Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;' +
        'padding:12px 18px;border-radius:12px;box-shadow:0 6px 20px rgba(11,21,48,.3);text-align:center;display:none';
      document.body.appendChild(note);
    }
    note.textContent = msg;
    note.style.display = 'block';
    clearTimeout(note._t);
    note._t = setTimeout(function () { note.style.display = 'none'; }, 3200);
  }
  function inBox(t) { return t && t.closest && t.closest('textarea, input, [contenteditable="true"]'); }
  document.addEventListener('paste', function (e) {
    if (inBox(e.target)) { e.preventDefault(); tell('Pasting is turned off on this worksheet. Type your answer in your own words.'); }
  }, true);
  document.addEventListener('drop', function (e) {
    if (inBox(e.target)) { e.preventDefault(); tell('Dropping text is turned off on this worksheet. Type your answer in your own words.'); }
  }, true);
  ['copy', 'cut'].forEach(function (ev) {
    document.addEventListener(ev, function (e) { e.preventDefault(); tell('Copying is turned off on this worksheet.'); }, true);
  });
}());
