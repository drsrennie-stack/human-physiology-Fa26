/* ============================================================
   BIO 004 Human Anatomy, Fall 2026
   bio004-path.js

   Renders "Your Path This Week" on a week page: the same four
   stages in the same order every week,

     1 LEARN  ->  2 PRACTICE  ->  3 APPLY  ->  4 CHECK

   so a student can open any week and answer, within seconds:
   where do I start, what is Dr. Rennie teaching me, where do I
   practice retrieving it, where do I use it, and how do I know
   I am ready for the lecture exam and the lab practical.

   WHAT IT DOES NOT DO
   -------------------
   It adds no assignments. Every link below already existed on
   the week page, the dock or the hubs. This organizes them into
   the four stages and makes the sequence Atlas -> Loops -> Check
   impossible to miss.

   SOURCES (all already loaded by the week pages)
     window.BIO004_SESSIONS       schedule-fall2026.js, the dates
     window.BIO004_SESSION_LINKS  session-links.js, each day's material
     window.BIO004_WEEK_LINKS     week-links.js, the week's sheet and video
     window.BIO004_PATH           bio004-path-data.js, per-week facts
                                  and the "You're Ready When" list

   HOW TO WIRE A PAGE
   ------------------
     <div data-week-path="5"></div>
     ... keep the existing <section class="card" data-week-days="5">
         anywhere on the page; this script moves it into stage 3 ...
     <script src="bio004-path-data.js"></script>
     <script src="bio004-path.js"></script>

   Workbooks are excluded on purpose. The pre-work sheet is the
   door she wants students to use; the workbook layer stays
   unlinked. Do not add day.workbooks to gather().
   ============================================================ */

(function () {
  'use strict';

  var ATLAS = 'https://share.articulate.com/UOHEe3p6DmTC4nXuUTE02';
  var LOOPS = 'https://drsrennie-stack.github.io/loops/';
  var IOA   = 'https://www.medmasterscollaborative.com/muscle-charts-i-o-a-inn';
  var OPENSTAX = 'https://openstax.org/details/books/anatomy-and-physiology-2e';

  var KEY = 'bio004-section';
  var TRACK = { 'mw': 'mw', 'tr-am': 'tr', 'tr-eve': 'tr' };

  /* ---------- helpers ---------- */

  function section() {
    var s = null;
    try {
      var m = location.search.match(/[?&]sec=([^&#]+)/);
      if (m) s = decodeURIComponent(m[1]);
    } catch (e) {}
    if (!TRACK[s]) { try { s = localStorage.getItem(KEY); } catch (e) { s = null; } }
    return TRACK[s] ? s : null;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var I = {
    learn:    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/>',
    practice: '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    apply:    '<path d="M6 3v6a6 6 0 0 0 12 0V3"/><path d="M12 15v2a4 4 0 0 0 8 0v-1"/><circle cx="20" cy="14" r="2"/>',
    check:    '<path d="M20 6L9 17l-5-5"/>',
    doc:      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    pencil:   '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    play:     '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/>',
    globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    flask:    '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M6.5 15h11"/>',
    cards:    '<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 9h6M7 13h4"/><path d="M21 8v9a2 2 0 0 1-2 2"/>',
    loop:     '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    people:   '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.2"/><path d="M22 20v-2a4 4 0 0 0-3-3.8"/>',
    brain:    '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 4 1V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-4 1"/>',
    eye:      '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff:   '<path d="M17.9 17.9A10 10 0 0 1 12 19c-7 0-11-7-11-7a18 18 0 0 1 5.1-5.9M9.9 4.2A9.6 9.6 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M1 1l22 22"/>'
  };
  function icon(k) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (I[k] || '') + '</svg>';
  }

  /* One deduplicated list per kind across the week's class days,
     in the order the days fall, for the student's own track. If
     the track has nothing (a direct link with no section saved),
     fall back to the union of both tracks so the page never
     renders empty. */
  function gather(week) {
    var links = window.BIO004_SESSION_LINKS || {};
    var sessions = window.BIO004_SESSIONS || {};
    var out = { sheets: [], notes: [], videos: [], slides: [], lab: [], exam: null };
    var seen = {};
    function take(day) {
      if (!day) return;
      if (day.exam) out.exam = day.exam;
      ['sheets', 'notes', 'videos', 'lab'].forEach(function (k) {
        (day[k] || []).forEach(function (item) {
          var id = k + '|' + item.u;
          if (seen[id]) return;
          seen[id] = 1;
          out[k].push(item);
        });
      });
      if (day.slides && !seen['slides|' + day.slides.u]) {
        seen['slides|' + day.slides.u] = 1;
        out.slides.push(day.slides);
      }
    }
    var track = TRACK[section()];
    var tracks = track ? [track] : ['mw', 'tr'];
    tracks.forEach(function (t) {
      (sessions[t] || []).forEach(function (s) { if (s.wk === week) take(links[s.date]); });
    });
    if (!out.sheets.length && !out.videos.length && !out.lab.length) {
      /* Nothing for this track: try dates directly. */
      Object.keys(links).forEach(function (d) { if (links[d].wk === week) take(links[d]); });
    }
    return out;
  }

  /* ---------- markup builders ---------- */

  function link(item, opts) {
    opts = opts || {};
    var a = el('a', 'lk' + (opts.lead ? ' lead' : ''));
    a.href = item.u;
    if (opts.ext) { a.target = '_blank'; a.rel = 'noopener'; }
    else a.target = '_top';
    var ic = el('span', 'lk-ic', icon(opts.icon || 'doc'));
    ic.setAttribute('aria-hidden', 'true');
    a.appendChild(ic);
    var w = el('span', 'lk-w');
    var t = el('span', 'lk-t');
    if (opts.n) t.appendChild(el('span', 'lk-num', String(opts.n)));
    t.appendChild(document.createTextNode(item.t));
    w.appendChild(t);
    if (opts.sub) w.appendChild(el('span', 'lk-s', opts.sub));
    a.appendChild(w);
    return a;
  }

  function grid(items) {
    var g = el('div', 'prework wp-grid');
    items.forEach(function (n) { if (n) g.appendChild(n); });
    return g;
  }

  function stageHead(n, name, q, key) {
    var h = el('div', 'wp-shead');
    h.innerHTML =
      '<span class="wp-chip wp-' + key + '" aria-hidden="true">' + n + '</span>' +
      '<span class="wp-sicon wp-' + key + '" aria-hidden="true">' + icon(key) + '</span>' +
      '<div class="wp-stitle"><span class="wp-sname">' + esc(name) + '</span>' +
      '<h2 id="wp-h-' + key + '"><span class="wp-sr">' + n + '. ' + esc(name) + '. </span>' + esc(q) + '</h2></div>';
    return h;
  }

  function sub(title, text, cls) {
    var s = el('div', 'wp-sub' + (cls ? ' ' + cls : ''));
    s.appendChild(el('h3', null, esc(title)));
    if (text) s.appendChild(el('p', 'wp-p', text));
    return s;
  }

  /* ---------- the strip ---------- */

  var STAGES = [
    { key: 'learn',    n: 1, name: 'Learn',    q: 'What do I need to understand and recognize?' },
    { key: 'practice', n: 2, name: 'Practice', q: 'Can I produce this without looking at the answer?' },
    { key: 'apply',    n: 3, name: 'Apply',    q: 'Can I use the anatomy, not just name it?' },
    { key: 'check',    n: 4, name: 'Check',    q: 'If the exam were today, what could I actually do?' }
  ];

  function strip(week, exam) {
    var s = el('section', 'card wp-strip');
    s.id = 'path';
    s.setAttribute('aria-labelledby', 'wp-strip-h');
    /* Not a heading on purpose. The site's reading format folds the page
       at each h2 and keeps whatever sits before the first one open, so
       the strip stays visible while the stages below fold. */
    s.appendChild(el('p', 'wp-eyebrow', 'Your path this week'));
    s.appendChild(el('p', 'wp-strip-title', 'Where do I start? Right here, and work down the page.')).id = 'wp-strip-h';

    var row = el('ol', 'wp-stages');
    row.setAttribute('aria-label', 'The four stages, in order');
    STAGES.forEach(function (st, i) {
      var li = el('li', 'wp-stage');
      var a = el('a', 'wp-tile wp-t-' + st.key);
      a.href = '#path-' + st.key;
      a.innerHTML =
        '<span class="wp-chip wp-' + st.key + '" aria-hidden="true">' + st.n + '</span>' +
        '<span class="wp-sicon wp-' + st.key + '" aria-hidden="true">' + icon(st.key) + '</span>' +
        '<span class="wp-tname">' + esc(st.name) + '</span>' +
        '<span class="wp-tq">' + esc(st.q) + '</span>';
      li.appendChild(a);
      if (i < STAGES.length - 1) {
        var ar = el('span', 'wp-arrow', '&rarr;');
        ar.setAttribute('aria-hidden', 'true');
        li.appendChild(ar);
      }
      row.appendChild(li);
    });
    s.appendChild(row);

    s.appendChild(el('p', 'wp-how',
      '<strong>Here\'s how to work through this week.</strong> First, learn the structures and concepts with me. ' +
      'Next, practice pulling them from memory and identifying them without labels. ' +
      'Then use what you know to solve anatomical or clinical problems. ' +
      'Finally, check your gaps before the exam does.'));

    if (exam) {
      s.appendChild(el('p', 'note wp-examnote',
        '<strong>Exam ' + exam + ' is this week.</strong> Start at stage 4, <a href="#path-check">Check</a>, to find out what you can do cold, ' +
        'then go back to stage 2, <a href="#path-practice">Practice</a>, for whatever you missed. Stage 1 also starts the next topic, so do not skip it.'));
    }
    return s;
  }

  /* ---------- stage 1 LEARN ---------- */

  function learn(d, wk, meta, week) {
    var s = el('section', 'card wp-card wp-s-learn');
    s.id = 'path-learn';
    s.setAttribute('aria-labelledby', 'wp-h-learn');
    s.appendChild(stageHead(1, 'Learn', 'What do I need to understand and recognize?', 'learn'));

    /* A. Learn It With Dr. Rennie: sheet, notes, video, in her order. */
    var a = sub('Learn It With Dr. Rennie',
      'I\'ll walk you through the major structures, relationships and features you need to recognize this week. ' +
      'Work in this order. The sheet comes first, with my notes open beside you. The video is there to check what you did, not to hand it to you.',
      'wp-lead');
    var items = [];
    var n = 1;
    /* Module for this week, boundary weeks belong to the later module,
       the same rule module-nav.js and the competency packet use. */
    var modN = null;
    (window.BIO004_MODULES || []).forEach(function (m) { if ((m.weeks || []).indexOf(week) >= 0) modN = m.n; });
    items.push(link({ u: 'bio004-competency-packet.html' + (modN ? '#module-' + modN : ''), t: 'Competencies' + (modN ? ' for Module ' + modN : '') }, { lead: true, icon: 'target', n: n,
      sub: 'Read these first. Every one is something the exam will ask you to do' }));
    items.push(link({ u: 'brain-dump-practice.html', t: 'This week\'s brain dump prompts' }, { lead: true, icon: 'pencil', n: n,
      sub: 'See what you will be asked to write in class, before you start the sheet' }));
    n++;
    var sheets = d.sheets.length ? d.sheets : (wk.worksheet ? [{ u: wk.worksheet, t: 'This week\'s pre-work sheet' }] : []);
    sheets.forEach(function (it) {
      items.push(link({ u: it.u, t: 'Pre-work sheet: ' + it.t }, { lead: true, icon: 'pencil', n: n, sub: 'Work this first, with the notes open' }));
    });
    if (sheets.length) n++;
    d.notes.forEach(function (it) {
      items.push(link({ u: it.u, t: 'My notes: ' + it.t }, { lead: true, icon: 'doc', n: n, sub: 'Keep these open while you work the sheet' }));
    });
    if (d.notes.length) n++;
    var vids = d.videos.length ? d.videos : (wk.lecture ? [{ u: wk.lecture, t: 'This week\'s concept video' }] : []);
    vids.forEach(function (it) {
      items.push(link({ u: it.u, t: 'Concept video: ' + it.t }, { lead: true, icon: 'play', n: n, sub: 'Watch it after the sheet, not before' }));
    });
    if (vids.length) n++;
    d.slides.forEach(function (it) {
      items.push(link({ u: it.u, t: 'Slides: ' + it.t }, { icon: 'doc', n: n, sub: 'For review after class' }));
    });
    a.appendChild(grid(items));
    s.appendChild(a);

    /* B. Learn to See It: lab sprints and the Digital Atlas. */
    var b = sub('Learn to See It',
      'Use this week\'s lab sprints and the Digital Atlas to learn what each structure looks like and the feature that makes it identifiable. ' +
      'Turn it, compare it to its neighbors, and find the one thing that separates them.');
    var seeItems = [];
    d.lab.forEach(function (it) {
      seeItems.push(link({ u: it.u, t: 'Lab sprint: ' + it.t }, { icon: 'flask', sub: 'Every structure you are responsible for at this station' }));
    });
    seeItems.push(link({ u: ATLAS, t: 'Digital Atlas' }, { ext: true, icon: 'globe', sub: 'Turn the structures around and look at them. Learn to see it here.' }));
    if (meta.histology) {
      seeItems.push(link({ u: 'histology-help.html', t: 'Histology help' }, { icon: 'flask', sub: 'Every free slide tool, sorted by the kind of help you need' }));
    }
    b.appendChild(grid(seeItems));
    b.appendChild(el('p', 'note',
      'Looking at labeled material makes it feel familiar. Familiar is not the same as being able to identify it on an exam. ' +
      'Once you can recognize it here, move to <a href="#path-practice">stage 2</a> and take the labels away.'));
    s.appendChild(b);

    /* C. Build the Details. */
    var c = sub('Build the Details', 'When you want a second explanation, more figures, or the exact scope of the exam.');
    c.appendChild(grid([
      link({ u: 'course-materials.html', t: 'Course materials by module' }, { icon: 'doc', sub: 'Notes, pre-work, videos and decks, all in one place' }),
      link({ u: 'bio004-exam-modules.html', t: 'Exam modules' }, { icon: 'target', sub: 'Exactly what each exam covers' }),
      link({ u: OPENSTAX, t: 'OpenStax reference' }, { ext: true, icon: 'globe', sub: 'Free online book for a second explanation. Not required.' })
    ]));
    s.appendChild(c);
    return s;
  }

  /* ---------- stage 2 PRACTICE ---------- */

  function practice(d, meta) {
    var s = el('section', 'card wp-card wp-s-practice');
    s.id = 'path-practice';
    s.setAttribute('aria-labelledby', 'wp-h-practice');
    s.appendChild(stageHead(2, 'Practice', 'Can I produce this without looking at the answer?', 'practice'));

    var a = sub('Close It. Cover It. Retrieve It.',
      'Looking at anatomy can make it feel familiar. Familiarity is not the same as being able to identify it on an exam. Practice without the labels.',
      'wp-lead');

    var vs = el('div', 'wp-vs');
    vs.setAttribute('role', 'img');
    vs.setAttribute('aria-label', 'Looking is not the same as retrieving');
    vs.innerHTML =
      '<span class="wp-vs-a">' + icon('eye') + '<span>Looking</span><small>The label is there and it feels familiar</small></span>' +
      '<span class="wp-vs-ne" aria-hidden="true">&ne;</span>' +
      '<span class="wp-vs-b">' + icon('eyeoff') + '<span>Retrieving</span><small>The label is gone and you produce the name</small></span>';
    a.appendChild(vs);

    var items = [
      link({ u: LOOPS, t: 'Loops: Now Retrieve It' }, { ext: true, lead: true, icon: 'loop', n: 1,
        sub: 'Once you recognize the structures in the Digital Atlas, switch to Loops and identify them without the answer in front of you' }),
      link({ u: 'recall-rx.html', t: 'Recall Rx: course cards due today' }, { lead: true, icon: 'cards', n: 2,
        sub: 'Its own app. Answer from memory first, then flip. Later in the week, not the same night' }),
      link({ u: 'recall-cards.html', t: 'My Recall Cards: build your own' }, { icon: 'cards',
        sub: 'Your own cards, text or photo, with a daily review. Stays on your device' }),
      link({ u: 'brain-dump-practice.html', t: 'Brain dump practice' }, { lead: true, icon: 'pencil', n: 3,
        sub: 'Its own app. Spin for a prompt, set a clock, write it on paper from memory, then check yourself against the key points' }),
      link({ u: 'mastery-canvas.html', t: 'Draw it from memory' }, { icon: 'pencil',
        sub: 'Draw the structure first, then check it against the list' })
    ];
    if (meta.histology) {
      items.push(link({ u: 'bio004-tissue-chart-practice.html', t: 'Tissue Chart Practice' }, { icon: 'cards',
        sub: 'The whole chart behind reveal boxes, same slides as lab. Flip to Recall and reveal as you go' }));
    }
    if (meta.muscles) {
      items.push(link({ u: IOA, t: 'Muscle charts, I O A' }, { ext: true, icon: 'cards',
        sub: 'Origins, insertions, actions and innervation, drilled without the answers showing' }));
    }
    a.appendChild(grid(items));
    s.appendChild(a);

    /* Getting Ready for Lab, the six steps. */
    var lab = sub('Getting Ready for Lab', 'This is what I mean by retrieval for a practical. Six steps, every structure, every week.');
    var steps = el('ol', 'wp-steps');
    [
      ['Look', 'Learn the structure and its distinguishing features.'],
      ['Cover', 'Remove the label or the name.'],
      ['Identify', 'Say or write the answer from memory.'],
      ['Vary', 'Find the same structure on a different image, model, slide or specimen.'],
      ['Explain', 'What feature told you what it was?'],
      ['Repeat later', 'Come back to it after time has passed.']
    ].forEach(function (p) {
      steps.appendChild(el('li', 'wp-step', '<b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span>'));
    });
    lab.appendChild(steps);
    s.appendChild(lab);

    if (meta.histology) {
      var h = sub('Histology: Don\'t Memorize the Picture',
        'A slide on the exam will not be the one you studied. For every tissue, answer these four out loud or on paper:');
      var q = el('ol', 'wp-qs');
      ['What tissue am I looking at?',
       'What features led me to that answer?',
       'Where would I find this tissue in the body?',
       'What does its structure allow it to do?'].forEach(function (t) { q.appendChild(el('li', null, esc(t))); });
      h.appendChild(q);
      h.appendChild(el('p', 'note',
        '<strong>Describe the structure, not the picture.</strong> Useful: interconnected plates and struts, parallel bundles, multiple layers, flattened surface cells, large open spaces. ' +
        'Memory aid only: looks like a spiderweb, cherry blossoms, bubbles, tree branches. Keep your analogies if they help you, but learn the real features, because those are what let you identify a slide you have never seen.'));
      s.appendChild(h);
    }
    return s;
  }

  /* ---------- stage 3 APPLY ---------- */

  function apply(daysHost) {
    var s = el('section', 'card wp-card wp-s-apply');
    s.id = 'path-apply';
    s.setAttribute('aria-labelledby', 'wp-h-apply');
    s.appendChild(stageHead(3, 'Apply', 'Can I use the anatomy rather than just name it?', 'apply'));

    var a = sub('Use What You Know',
      'Now take the structures you\'ve learned and use them to solve an anatomical or clinical problem. ' +
      'Most of this happens in class with your team, which is why class time is not spent lecturing. Come in with stages 1 and 2 done and you will be the one your team turns to.',
      'wp-lead');
    s.appendChild(a);

    if (daysHost) {
      /* Move the existing class-days block in here. week-schedule.js
         has already rendered into it; moving the node keeps that. */
      daysHost.classList.remove('card');
      daysHost.classList.add('wp-days');
      var oldH = daysHost.querySelector('h2');
      if (oldH) {
        var h3 = el('h3', null, 'In class and lab this week');
        oldH.parentNode.replaceChild(h3, oldH);
      }
      s.appendChild(daysHost);
    }

    var b = sub('Between classes', 'Ways to use it with other people, any day of the week.');
    b.appendChild(grid([
      link({ u: 'kahoots.html', t: 'Kahoots' }, { icon: 'play', sub: 'Every class Kahoot by module. Play the rematch any time' }),
      link({ u: 'games.html', t: 'Anatomy Games' }, { icon: 'cards', sub: 'Taboo, Memory Match and more, played out loud with a team' }),
      link({ u: 'study-session-signup.html', t: 'Study With Me' }, { icon: 'people', sub: 'Host a session or join a classmate, online or in person. Bring this week\'s lab sprint' })
    ]));
    s.appendChild(b);
    return s;
  }

  /* ---------- stage 4 CHECK ---------- */

  function check(week, meta) {
    var s = el('section', 'card wp-card wp-s-check');
    s.id = 'path-check';
    s.setAttribute('aria-labelledby', 'wp-h-check');
    s.appendChild(stageHead(4, 'Check', 'If the exam were today, what could I actually do?', 'check'));

    var a = sub('Find Your Gaps Before the Exam Does',
      'Check yourself with nothing open: no notes, no labels, no answers. Then let what you find send you back to the right stage, not to more rereading.',
      'wp-lead');
    a.appendChild(grid([
      link({ u: 'mastery-os-fall-2026.html#s-weak', t: 'Gap finder in Mastery OS' }, { lead: true, icon: 'brain', n: 1,
        sub: 'Your weak spots, by competency, and a plan around them' }),
      link({ u: 'bio004-practice-exam-builder.html', t: 'Practice Exam Builder' }, { lead: true, icon: 'target', n: 2,
        sub: 'Build a fresh full-format exam any time, then track your scores' }),
      link({ u: 'practice-lecture-exam.html', t: 'Practice exam, paper format' }, { icon: 'doc',
        sub: 'A 100 point paper in the real format, scored, with the reasoning' }),
      link({ u: 'bio004-readiness.html', t: 'Readiness check' }, { icon: 'target',
        sub: 'The check for today opens here at class time, with your class code' })
    ]));
    s.appendChild(a);

    /* Lab: can you do it cold? */
    var lab = sub('Can You Do It Cold?', 'Before you call yourself ready for the lab practical, ask:');
    var q = el('ul', 'wp-qs');
    ['Can I identify it without a label?',
     'Can I identify it on a different image, model or specimen?',
     'Can I identify it when the orientation changes?',
     'Can I identify it under practical-exam timing?',
     'Can I explain what feature told me what it was?'].forEach(function (t) { q.appendChild(el('li', null, esc(t))); });
    lab.appendChild(q);
    lab.appendChild(el('p', 'wp-p',
      'If the answer is no, go back to Loops for retrieval practice. Use the Digital Atlas only when you need to relearn or clarify a structure.'));

    var loop = el('div', 'wp-loop');
    loop.setAttribute('aria-label', 'The lab feedback loop: Atlas, then Loops, then Check');
    loop.innerHTML =
      '<div class="wp-loop-row" aria-hidden="true">' +
        '<span class="wp-lp wp-learn">Atlas</span><span class="wp-arrow">&rarr;</span>' +
        '<span class="wp-lp wp-practice">Loops</span><span class="wp-arrow">&rarr;</span>' +
        '<span class="wp-lp wp-check">Check</span>' +
      '</div>' +
      '<ul class="wp-triage">' +
        '<li><span class="wp-tq2">Don\'t know what you\'re looking at?</span><a class="wp-lp wp-learn" href="' + ATLAS + '" target="_blank" rel="noopener">Back to the Atlas</a></li>' +
        '<li><span class="wp-tq2">Know it when you see the answer, but can\'t name it?</span><a class="wp-lp wp-practice" href="' + LOOPS + '" target="_blank" rel="noopener">Back to Loops</a></li>' +
        '<li><span class="wp-tq2">Can identify it on your own, on a specimen you did not practice on?</span><span class="wp-lp wp-check">Ready</span></li>' +
      '</ul>';
    lab.appendChild(loop);
    s.appendChild(lab);

    /* You're Ready When, tailored to the week. */
    var ready = (meta.ready || []).slice();
    if (ready.length) {
      var r = sub('You\'re Ready When…', 'Check these honestly. An unchecked box is not a failure. It tells you which stage to go back to.');
      var list = el('ul', 'wp-ready');
      var saved = {};
      try { saved = JSON.parse(localStorage.getItem('bio004-ready-w' + week) || '{}') || {}; } catch (e) { saved = {}; }
      ready.forEach(function (t, i) {
        var id = 'wp-ready-' + week + '-' + i;
        var li = el('li', null);
        var cb = el('input', null);
        cb.type = 'checkbox'; cb.id = id; cb.checked = !!saved[i];
        cb.addEventListener('change', function () {
          saved[i] = cb.checked;
          try { localStorage.setItem('bio004-ready-w' + week, JSON.stringify(saved)); } catch (e) {}
        });
        var lb = el('label', null, esc(t));
        lb.setAttribute('for', id);
        li.appendChild(cb); li.appendChild(lb);
        list.appendChild(li);
      });
      r.appendChild(list);
      r.appendChild(el('p', 'wp-p wp-small', 'Your checks save on this device only. Nobody else sees them.'));
      s.appendChild(r);
    }
    return s;
  }

  /* ---------- styles ---------- */

  var CSS =
    '.wp-strip .wp-stages{list-style:none;margin:6px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}' +
    '@media(max-width:760px){.wp-strip .wp-stages{grid-template-columns:1fr 1fr}}' +
    '@media(max-width:420px){.wp-strip .wp-stages{grid-template-columns:1fr;gap:8px}' +
      '.wp-stages .wp-tile{display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto auto;column-gap:10px;row-gap:2px;align-items:center;padding:12px 14px}' +
      '.wp-stages .wp-tile .wp-chip{grid-row:1/3;width:28px;height:28px}.wp-stages .wp-tile .wp-sicon{grid-row:1/3;width:34px;height:34px;margin:0}' +
      '.wp-stages .wp-tile .wp-tname{margin:0}.wp-stages .wp-tile .wp-tq{font-size:.9rem}}' +
    '.wp-stage{position:relative;display:flex;align-items:stretch}' +
    '.wp-tile{flex:1;display:flex;flex-direction:column;gap:6px;text-decoration:none;color:#08101F;background:#fff;border:1px solid rgba(11,21,48,.12);border-radius:14px;padding:16px 16px 14px;box-shadow:0 1px 3px rgba(0,0,0,.08);transition:transform 200ms ease,box-shadow 200ms ease}' +
    '.wp-tile:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(0,0,0,.10)}' +
    '.wp-tname{font-family:"DM Sans",system-ui,sans-serif;font-weight:700;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:#7A2A22;margin-top:2px}' +
    '.wp-tq{font-weight:700;font-size:.93rem;line-height:1.35;color:#08101F}' +
    '.wp-arrow{display:none}' +
    '@media(min-width:761px){.wp-arrow{display:block;position:absolute;right:-12px;top:22px;font-weight:800;color:#7A2A22;z-index:1;font-size:1.05rem}}' +
    '.wp-chip{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;font-family:"DM Sans",system-ui,sans-serif;font-weight:800;font-size:.95rem;flex:none}' +
    '.wp-sicon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;flex:none}' +
    '.wp-sicon svg{width:22px;height:22px}' +
    '.wp-tile .wp-chip{width:30px;height:30px}' +
    '.wp-tile .wp-sicon{width:36px;height:36px;margin-top:2px}' +
    /* stage colors: the same four every week */
    '.wp-learn{background:#08101F;color:#fff}' +
    '.wp-practice{background:#7A2A22;color:#fff}' +
    '.wp-apply{background:#DCB45C;color:#08101F}' +
    '.wp-check{background:#fff;color:#08101F;box-shadow:inset 0 0 0 2px #08101F}' +
    '.wp-eyebrow{font-family:"DM Sans",system-ui,sans-serif;font-weight:700;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:#7A2A22;margin:0 0 3px}' +
    '.wp-strip-title{margin:0 0 14px;font-size:1.25rem;font-weight:800;letter-spacing:-.01em;color:#08101F;line-height:1.25}' +
    '.wp-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}' +
    '.wp-how{margin:16px 0 0;font-size:.98rem;line-height:1.6;color:#08101F}' +
    '.wp-examnote a{color:#7A2A22;font-weight:700}' +
    /* stage cards */
    '.wp-card{padding-top:20px}' +
    '.wp-shead{display:flex;align-items:center;gap:12px;margin-bottom:6px}' +
    '.wp-stitle{display:flex;flex-direction:column;gap:2px;min-width:0}' +
    '.wp-sname{font-family:"DM Sans",system-ui,sans-serif;font-weight:700;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:#7A2A22}' +
    '.wp-card h2{margin:0!important;padding-left:0!important;font-size:1.25rem}' +
    '.wp-card h2::before{content:none!important}' +
    '.wp-card .wp-sub{margin-top:18px}' +
    '.wp-card .wp-sub h3{margin:0 0 4px;font-size:1.05rem;font-weight:800;letter-spacing:-.01em;color:#08101F}' +
    '.wp-card .wp-lead h3{font-size:1.22rem}' +
    '.wp-p{margin:0 0 12px;font-size:.95rem;line-height:1.6;color:#08101F}' +
    '.wp-small{font-size:.82rem;opacity:.75;margin:10px 0 0}' +
    '.wp-grid{margin-top:8px}' +
    '.wp-card .lk{align-items:flex-start}' +
    '.wp-card .lk-ic{width:40px;height:40px;margin-top:1px}' +
    '.wp-card .lk-ic svg{width:20px;height:20px}' +
    '.wp-card .lk.lead{border-width:1.5px;border-color:rgba(11,21,48,.28)}' +
    '.wp-card .lk.lead .lk-t{font-size:1.02rem}' +
    '.wp-card .lk.lead .lk-ic{width:46px;height:46px}' +
    '.wp-card .lk.lead .lk-ic svg{width:24px;height:24px}' +
    '.wp-s-learn .lk-ic{background:#08101F;color:#fff}' +
    '.wp-s-practice .lk-ic{background:#7A2A22;color:#fff}' +
    '.wp-s-apply .lk-ic{background:#DCB45C;color:#08101F}' +
    '.wp-s-check .lk-ic{background:#fff;color:#08101F;box-shadow:inset 0 0 0 2px #08101F}' +
    '.wp-s-apply .lk-num,.wp-s-check .lk-num{background:#08101F;color:#fff}' +
    /* looking vs retrieving */
    '.wp-vs{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin:6px 0 16px;padding:14px 12px;border:1px solid rgba(11,21,48,.12);border-radius:12px;background:#fff}' +
    '.wp-vs-a,.wp-vs-b{display:flex;flex-direction:column;align-items:center;text-align:center;gap:2px;min-width:150px;max-width:220px}' +
    '.wp-vs svg{width:26px;height:26px}' +
    '.wp-vs-a{color:#4B5262}.wp-vs-a span{font-weight:700;text-decoration:line-through;text-decoration-thickness:2px}' +
    '.wp-vs-b{color:#7A2A22}.wp-vs-b span{font-weight:800;font-size:1.05rem}' +
    '.wp-vs small{font-size:.8rem;line-height:1.35;color:#08101F}' +
    '.wp-vs-ne{font-size:1.9rem;font-weight:800;color:#08101F;line-height:1}' +
    /* six steps */
    '.wp-steps{list-style:none;margin:8px 0 0;padding:0;display:grid;grid-template-columns:repeat(6,1fr);gap:8px;counter-reset:wps}' +
    '@media(max-width:760px){.wp-steps{grid-template-columns:repeat(3,1fr)}}' +
    '@media(max-width:460px){.wp-steps{grid-template-columns:1fr 1fr}}' +
    '.wp-step{background:#fff;border:1px solid rgba(11,21,48,.12);border-radius:12px;padding:12px 12px 12px;display:flex;flex-direction:column;gap:4px;counter-increment:wps}' +
    '.wp-step b{font-size:.98rem;color:#08101F}' +
    '.wp-step b::before{content:counter(wps);display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#7A2A22;color:#fff;font-family:"DM Sans",system-ui,sans-serif;font-size:.74rem;font-weight:800;margin-right:7px;vertical-align:middle}' +
    '.wp-step span{font-size:.84rem;line-height:1.45;color:#08101F}' +
    /* question lists */
    '.wp-qs{margin:4px 0 10px;padding-left:1.25rem}' +
    '.wp-qs li{margin:.3rem 0;font-size:.95rem}' +
    /* loop and triage */
    '.wp-loop{margin-top:12px}' +
    '.wp-loop-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}' +
    '.wp-loop-row .wp-arrow{display:inline;position:static;font-size:1.1rem}' +
    '.wp-lp{display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.86rem;letter-spacing:.04em;padding:8px 16px;border-radius:999px;text-decoration:none;white-space:nowrap}' +
    '.wp-triage{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}' +
    '.wp-triage li{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 14px;border:1px solid rgba(11,21,48,.12);border-radius:12px;background:#fff}' +
    '.wp-tq2{font-weight:700;font-size:.95rem;flex:1;min-width:200px}' +
    'a.wp-lp:hover{filter:brightness(1.12)}' +
    /* ready when */
    '.wp-ready{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}' +
    '.wp-ready li{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border:1px solid rgba(11,21,48,.12);border-radius:12px;background:#fff}' +
    '.wp-ready input{width:22px;height:22px;flex:none;margin:2px 0 0;accent-color:#08101F;cursor:pointer}' +
    '.wp-ready label{font-size:.96rem;line-height:1.5;cursor:pointer}' +
    '.wp-ready input:checked + label{text-decoration:line-through;text-decoration-color:rgba(8,16,31,.5)}' +
    /* moved class-days block */
    '.wp-days{margin-top:16px}' +
    '.wp-days h3{margin:0 0 10px;font-size:1.05rem;font-weight:800;color:#08101F}' +
    /* hide the old card counter on every card now that the stages carry their own numbers */
    'main .card h2::before{content:none!important}main .card h2{padding-left:0!important}' +
    '@media(prefers-reduced-motion:reduce){.wp-tile{transition:none}.wp-tile:hover{transform:none}}';

  function injectCSS() {
    if (document.getElementById('bio004-path-css')) return;
    var st = document.createElement('style');
    st.id = 'bio004-path-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* iframe height sender for Canvas / Kajabi embeds. Guarded so a
     page that already sends its own height does not send twice. */
  function heightSender() {
    if (window.__bio004PathHeight) return;
    window.__bio004PathHeight = true;
    var id = (location.pathname.split('/').pop() || 'week').replace(/\.html$/, '');
    function send() {
      try {
        parent.postMessage({ type: 'resize', id: id,
          height: (window.BIO004_CONTENT_HEIGHT ? window.BIO004_CONTENT_HEIGHT() : document.body.scrollHeight) }, '*');
      } catch (e) {}
    }
    window.addEventListener('load', send);
    window.addEventListener('resize', send);
    if (window.ResizeObserver) { try { new ResizeObserver(send).observe(document.body); } catch (e) {} }
    send();
  }

  /* ---------- build ---------- */

  function build(host, week) {
    var d = gather(week);
    var wk = (window.BIO004_WEEK_LINKS || {})[week] || {};
    var meta = (window.BIO004_PATH || {})[week] || {};
    var exam = meta.exam || d.exam || null;

    injectCSS();
    host.innerHTML = '';

    host.appendChild(strip(week, exam));
    host.appendChild(learn(d, wk, meta, week));
    host.appendChild(practice(d, meta));
    var daysHost = document.querySelector('[data-week-days]');
    host.appendChild(apply(daysHost));
    host.appendChild(check(week, meta));
  }

  function run() {
    var hosts = document.querySelectorAll('[data-week-path]');
    for (var i = 0; i < hosts.length; i++) {
      var w = parseInt(hosts[i].getAttribute('data-week-path'), 10);
      if (w) { try { build(hosts[i], w); } catch (e) { try { console.error('bio004-path', e); } catch (x) {} } }
    }
    heightSender();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
