/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   assets/bio005-prompts.js

   Draws a structured drawing prompt: a bold question, the steps as
   bullets, and the one line answer at the end. Sep 25 2026, Scrubs asked
   for prompts that can be skimmed instead of read as a block paragraph.

   A structured prompt lives on a competency as it.ax and it.bx in
   assets/bio005-sheet-data.js:
     { q: "the question",
       do: ["a step", { sub: ["a", "b"] }, "another step"],
       one: "what to write in one line" }
   A { sub: [...] } entry is a short list that belongs to the step before it.
   Weeks without structured prompts keep their paragraph, it.a and it.b.

   BIO005_PROMPT.get(it, 'a')    the structured prompt, or null
   BIO005_PROMPT.html(p)         the markup: p.pq, then ul.pdo
   BIO005_PROMPT.steps(p)        one line per step, for a checklist
   BIO005_PROMPT.aiText(it, side, week)  text to paste into ChatGPT, after drawing
   BIO005_PROMPT.copy(text, button)       copies it and says so on the button
   ============================================================ */
(function(){
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function lower(s){ return s.charAt(0).toLowerCase() + s.slice(1); }
  function groups(p){
    var out = [];
    (p.do || []).forEach(function(s){
      if (typeof s === 'string') out.push({ t: s, sub: [] });
      else if (out.length) out[out.length - 1].sub = s.sub || [];
    });
    return out;
  }
  window.BIO005_PROMPT = {
    get: function(it, side){ return (it && it[side + 'x']) || null; },
    html: function(p){
      return '<p class="pq">' + esc(p.q) + '</p><ul class="pdo">' +
        groups(p).map(function(g){
          return '<li>' + esc(g.t) + (g.sub.length
            ? '<ul>' + g.sub.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</li>';
        }).join('') +
        '<li class="pone"><b>In one line:</b> ' + esc(lower(p.one)) + '</li></ul>';
    },
    steps: function(p){
      return groups(p).map(function(g){
        return g.sub.length ? g.t.replace(/:$/, '') + ': ' + g.sub.join(', ') + '.' : g.t;
      }).concat(['In one line: ' + lower(p.one)]);
    },
    /* The text a student copies into ChatGPT after they have drawn: the
       prompt, then a request to describe (not draw) what an accurate answer
       shows and to check the photo of their own drawing against it. Image
       generators are not reliable for labeled physiology graphs, so the AI is
       asked for words and a check, never a picture. */
    aiText: function(it, side, week){
      var px = this.get(it, side), body;
      if (px) {
        body = px.q + '\n' + groups(px).map(function(g){
          return '- ' + g.t + (g.sub.length ? '\n' + g.sub.map(function(x){ return '    - ' + x; }).join('\n') : '');
        }).join('\n') + '\n- In one line: ' + lower(px.one);
      } else body = it[side] || '';
      return 'I am a student in BIO 005 Human Physiology (college, majors level). I drew the prompt below from memory, with nothing open. I will attach a photo of my drawing.\n\n' +
        'Topic: ' + it.name + (week ? ' (Week ' + week + ')' : '') + '\n' +
        'I should be able to: ' + it.can + '\n\n' +
        'The prompt:\n' + body + '\n\n' +
        'Please do three things:\n' +
        '1. Describe in words what an accurate drawing for this prompt must show: every label, axis, arrow, value, and relationship. Do not make an image. Use the values given in the prompt.\n' +
        '2. Check my photo against that description. Tell me what is correct, what is missing, and what is wrong, and explain the physiology behind each fix.\n' +
        '3. Tell me whether my one line answer is right, and why.\n' +
        'If you are not certain about something, say so instead of guessing.';
    },
    copy: function(text, btn, done){
      function ok(){ if (btn){ var t = btn.textContent; btn.textContent = done || 'Copied. Paste it into ChatGPT'; setTimeout(function(){ btn.textContent = t; }, 4000); } }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
      function fallback(){
        var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.left = '-9999px'; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch(e){} document.body.removeChild(ta);
      }
    },
    css: '.pq{font-weight:800;color:#0B1530;margin:0 0 8px}' +
         '.pdo{margin:0;padding-left:1.2em}.pdo li{margin:0 0 5px}' +
         '.pdo ul{margin:5px 0 0;padding-left:1.2em;list-style:disc}' +
         '.pdo .pone{list-style:none;margin-left:-1.2em;margin-top:8px}'
  };
})();
