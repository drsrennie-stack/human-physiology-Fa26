/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   hootie.js

   Hootie the Knowfish, on the week pages.

   WHAT THIS IS, AND WHAT IT IS NOT
   --------------------------------
   This is NOT an AI. There is no model behind it and no network
   call. It is a grounded answerer: it reads the course data
   already loaded on the page and answers questions it can answer
   from that data with certainty.

   It knows, because the data says so:
     - what is happening this week, today, and next class
     - which module the course is in, and which weeks it covers
     - when the student's next exam is, and how many days away
     - what a given exam covers
     - the pre-work sequence and how to study for this course

   It does NOT know physiology content, and it says so plainly rather
   than guessing. A student asking "what is the difference between
   compact and spongy bone" gets pointed at the notes packet, the
   week's material and the competency list. Guessing at physiology would be
   worse than useless in a course where the answer gets examined.

   The whole answering surface is one function, hootieAnswer(),
   which takes a question and a context object and returns a
   reply. Everything it depends on is in that context. If a real
   model is ever wired in behind a proxy, that one function is the
   only thing that changes, and the 17 pages stay untouched.

   HOW TO MOUNT
   ------------
       <script src="schedule-fall2026.js"></script>
       <script src="section-sync.js"></script>
       <script src="hootie.js"></script>

   It mounts a launcher button in the bottom corner by itself. To
   scope it to a week, the page's nav already carries the week
   number and Hootie reads it:

       <div data-module-nav data-week="5"></div>

   Suppress it on a page with:

       <body data-hootie="off">

   ACCESSIBILITY
   -------------
   The panel is a labeled dialog. The launcher is a real button
   with aria-expanded. The transcript is an aria-live polite log
   so replies are announced. Focus moves into the input on open
   and back to the launcher on close. Escape closes. Nothing here
   depends on color alone.
   ============================================================ */

(function () {
  'use strict';

  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseISO(iso) {
    var p = String(iso).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function fmt(iso) {
    var d = parseISO(iso);
    return DOW[d.getDay()] + ' ' + MON[d.getMonth()] + ' ' + d.getDate();
  }
  function todayISO() {
    try {
      var m = location.search.match(/[?&]today=(\d{4}-\d{2}-\d{2})/);
      if (m) return m[1];
    } catch (e) {}
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function daysBetween(a, b) {
    return Math.round((parseISO(b) - parseISO(a)) / 86400000);
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Session text carries trusted markup AND HTML entities from the
     schedule file (<strong>, &middot;, &amp;). Strip the tags and
     DECODE the entities, otherwise esc() re-escapes the ampersand
     and students read "Week 7 checkpoint". */
  var _dec = document.createElement('textarea');
  function plain(s) {
    _dec.innerHTML = String(s).replace(/<[^>]+>/g, '');
    return _dec.value.replace(/\s+/g, ' ').trim();
  }

  /* ----------------------------------------------------------
     CONTEXT. Everything Hootie is allowed to know.
     ---------------------------------------------------------- */
  /* REWRITTEN Sep 25 2026. The old context read BIO005_SESSIONS[mw|tr]
     and BIO005_SECTIONS.sections[class1], the shape of the BIO 004
     in-person schedule. BIO 005's schedule file keys its rows 'net',
     so every date answer came back empty ("I do not have week 4 in the
     schedule") and the exam answer said "lecture exam and lab practical
     on the same day". This course runs on weeks with an open and a
     close, two midterm windows, and three Parts, so that is what the
     context holds now. Titles come from bio005-schedule-fall2026.js
     when a page has it loaded, and from this table when it does not,
     so Hootie works on every page. */
  var WEEKS = [
    {wk:1,  opens:'2026-09-08', closes:'2026-09-13', title:'How physiology works and what keeps you steady'},
    {wk:2,  opens:'2026-09-14', closes:'2026-09-27', title:'The cell: structure, transport and signaling',
     note:'Weeks 2 and 3 run as one block, and everything in it is due Sunday, September 27.'},
    {wk:3,  opens:'2026-09-21', closes:'2026-09-27', title:'Catch up on the cell',
     note:'A catch up week. Nothing new opens, and Week 2 stays open so you can finish it.'},
    {wk:4,  opens:'2026-09-28', closes:'2026-10-04', title:'Membrane potential, neurons and synapses'},
    {wk:5,  opens:'2026-10-05', closes:'2026-10-11', title:'Reflexes, and sensing the world'},
    {wk:6,  opens:'2026-10-12', closes:'2026-10-18', title:'Muscle, and how movement gets commanded'},
    {wk:7,  opens:'2026-10-19', closes:'2026-10-25', title:'Hormones, the autonomic system, and reproduction'},
    {wk:8,  opens:'2026-10-26', closes:'2026-11-01', title:'Midterm 1', exam:1,
     note:'No new teaching. Monday to Wednesday is yours to review, and Midterm 1 runs Thursday to Sunday. Camila\'s chart and analysis are due Sunday, November 1, when Midterm 1 closes.'},
    {wk:9,  opens:'2026-11-02', closes:'2026-11-08', title:'The heart as a pump'},
    {wk:10, opens:'2026-11-09', closes:'2026-11-15', title:'Pressure, flow, and holding blood pressure steady'},
    {wk:11, opens:'2026-11-16', closes:'2026-11-22', title:'Blood and how the body defends itself',
     note:'The last day to drop with a W is Saturday, November 21.'},
    {wk:12, opens:'2026-11-23', closes:'2026-11-29', title:'Digestion, and how you use food for fuel',
     note:'Thanksgiving week. The Sunday deadline does not move, so plan ahead.'},
    {wk:13, opens:'2026-11-30', closes:'2026-12-06', title:'Breathing, gas transport, and the fast pH lever'},
    {wk:14, opens:'2026-12-07', closes:'2026-12-13', title:'The kidney and body fluid balance'},
    {wk:15, opens:'2026-12-14', closes:'2026-12-16', title:'The slow pH lever, and putting it together', exam:2,
     note:'The finals week, three days. Midterm 2 runs these same days, and everything is due Wednesday, December 16 at 10:00 pm, including Dale\'s chart and analysis.'}
  ];
  var PARTS = [
    {n:1, title:'Foundations',        weeks:[1,2,3]},
    {n:2, title:'Control systems',    weeks:[4,5,6,7,8]},
    {n:3, title:'Systems in action',  weeks:[9,10,11,12,13,14,15]}
  ];
  var MIDTERMS = [
    {n:1, opens:'2026-10-29', openTime:'8:00 am', closes:'2026-11-01', closeTime:'10:00 pm', covers:'Weeks 1 to 7', week:8},
    {n:2, opens:'2026-12-14', openTime:'8:00 am', closes:'2026-12-16', closeTime:'10:00 pm', covers:'Weeks 9 to 14', week:15}
  ];
  function addDays(iso, n) {
    var d = parseISO(iso); d.setDate(d.getDate() + n);
    function p(x) { return (x < 10 ? '0' : '') + x; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function buildContext() {
    var src = window.BIO005_WEEKS;
    var weeks = WEEKS.map(function (w) {
      var s = src && src[w.wk - 1];
      return (s && s.title && w.wk !== 8) ? Object.assign({}, w, {title: s.title.replace(/,? and the final$/, '')}) : w;
    });
    var today = todayISO();
    var state = 'during', curWk = 1;
    if (today < weeks[0].opens) { state = 'before'; curWk = 1; }
    else if (today > weeks[weeks.length - 1].closes) { state = 'after'; curWk = 15; }
    else weeks.forEach(function (w) { if (w.opens <= today) curWk = w.wk; });

    var nav = document.querySelector('[data-module-nav][data-week]') || document.querySelector('[data-week]');
    var viewWk = nav ? parseInt(nav.getAttribute('data-week'), 10) : null;
    if (!(viewWk >= 1 && viewWk <= 15)) {
      var m = location.pathname.match(/week-(\d{2})/);
      viewWk = m ? parseInt(m[1], 10) : null;
    }
    var nextExam = MIDTERMS.filter(function (x) { return x.closes >= today; })[0] || null;
    return {
      weeks: weeks, today: today, state: state, curWk: curWk, viewWk: viewWk,
      exams: MIDTERMS, nextExam: nextExam, section: 'net',
      week: function (n) { return weeks.filter(function (w) { return w.wk === n; })[0] || null; },
      moduleOf: function (wk) { return PARTS.filter(function (p) { return p.weeks.indexOf(wk) > -1; }); },
      links: window.BIO005_WEEK_LINKS || {}
    };
  }

  /* ----------------------------------------------------------
     FORMATTERS
     ---------------------------------------------------------- */
  function weekHref(wk) { return 'week-' + (wk < 10 ? '0' : '') + wk + '.html'; }

  function weekLine(ctx, wk) {
    var w = ctx.week(wk);
    if (!w) return 'The term runs Weeks 1 to 15. There is no Week ' + wk + '.';
    var part = ctx.moduleOf(wk)[0];
    var s = '<b>Week ' + wk + ': ' + esc(w.title) + '.</b>' + (part ? ' Part ' + part.n + ', ' + esc(part.title) + '.' : '');
    var opened = w.opens <= ctx.today;
    if (wk === 15) {
      s += ' Opens ' + fmt(w.opens) + ' at 8:00 am.';
    } else {
      s += (opened ? ' Opened ' : ' Opens ') + fmt(w.opens) + ' at 8:00 am. ';
      if (wk !== 8) s += 'Your first discussion post is due ' + fmt(addDays(w.closes, -2)) + ' at 10:00 pm, and everything else is due '
                       + fmt(w.closes) + ' at 10:00 pm.';
    }
    if (w.note) s += '<br>' + esc(w.note);
    if (w.exam) s += '<br>' + examLine(ctx, MIDTERMS[w.exam - 1]);
    if (ctx.state === 'during' && wk === ctx.curWk) s += '<br>This is the week you are in now.';
    else if (!opened) s += '<br>It has not opened yet.';
    s += '<br>' + ilink(weekHref(wk), 'Open the Week ' + wk + ' page') + '. In Canvas, start with that week\'s <b>Start here</b> page.';
    return s;
  }

  function examLine(ctx, ex) {
    if (!ex) return 'Both midterms are behind you.';
    var s = '<b>Midterm ' + ex.n + '</b> opens ' + fmt(ex.opens) + ' at ' + ex.openTime + ' and closes '
      + fmt(ex.closes) + ' at ' + ex.closeTime + ' Pacific. It covers ' + ex.covers + ' and is worth 17.5 percent.';
    if (ex.opens <= ctx.today && ctx.today <= ex.closes) s += ' <b>It is open now.</b>';
    else if (ex.opens > ctx.today) {
      var d = daysBetween(ctx.today, ex.opens);
      s += ' That is ' + (d === 1 ? 'tomorrow' : 'in ' + d + ' days') + '.';
    }
    return s;
  }

  /* Links for a week, only if the week-links file has been filled in. */
  function weekResources(ctx, wk) {
    var L = ctx.links[wk] || {};
    var out = [];
    if (L.lecture)   out.push('<a href="' + esc(L.lecture) + '" target="_top">the concept walkthrough for week ' + wk + '</a>');
    if (L.worksheet) out.push('<a href="' + esc(L.worksheet) + '" target="_top">the guided worksheet</a>');
    return out;
  }

  /* ----------------------------------------------------------
     THE ANSWERING SURFACE

     Merged from two Hooties that both already existed:

     - welcome.html knew the COURSE. Grading weights, how checkpoints
       work, who to contact, where to go when you are drowning.
       It had no idea what day it was.
     - The week-page version knew the SCHEDULE. Dates, modules,
       exam scope, per-section rooms. It could not answer a single
       question about how the course actually runs.

     Each covered the other's gap exactly, so this is one matcher
     over one answer bank rather than two half-Hooties.

     The intent matcher is welcome.html's: score every intent by
     how many of its keywords appear, highest score wins. Order
     matters on a tie, so the list runs most urgent first. A
     student typing "I am drowning and behind" must reach
     'struggle' before anything else, which is why it sits near
     the top and why 'contact' sits above it: someone asking who
     to email needs the address, not a pep talk.

     Everything anatomical still gets refused. That has not
     changed and should not.
     ---------------------------------------------------------- */

  /* Order is the tie-break. Most urgent first. Sep 25 2026: added the
     study tools, the Competency Study Guide, the pre-read, the exam
     practice and the patient chart, and took 'recall' and 'flashcard'
     off the Mastery Check so a question about cards reaches Rx Cards. */
  var INTENTS = [
    {id:'contact',  kw:['contact','email','e-mail','reach','who do i','who should i','talk to','office hour','professor','instructor','teacher','rennie','tutor','tutoring','accommodat','disab','dsp','tech ','technolog','login','log in','canvas help','password','it help']},
    {id:'struggle', kw:['struggl','behind','failing','fail ','so hard','too hard','confus','overwhelm','stress','anxious','burn','falling','fall behind','drowning','give up','quit','really hard','cant keep','can not keep','keep up','lost and','hate this','crying','panic']},
    {id:'ai',       kw:['ai ','a.i','chatgpt','chat gpt','gpt','claude','gemini','copilot','artificial intelligence','use ai','using ai','ai on','cheat','cheating','plagiar','academic integrity','integrity']},
    {id:'examprac', kw:['exam practice','practice run','discussion 4','discussion 5','teaching video','practice the exam','practice exam format','15 minutes','record my answer']},
    {id:'grades',   kw:['grade','grading','points','percent','weight','how much is','worth','scholar point','extra credit','curve','my grade','pass the class','passing','gpa']},
    {id:'exams',    kw:['exam','test','midterm','whiteboard','how many test','final']},
    {id:'tbl',      kw:['tbl','team based','team-based','irat','trat','readiness','team quiz','attendance','attend']},
    {id:'tools',    kw:['course tools','study tools','tools','dock','all the tools','study things']},
    {id:'rx',       kw:['rx card','rx cards','flashcard','flash card','recall card','cards','spaced']},
    {id:'braindump',kw:['brain dump','braindump','spin','randomizer','random prompt','try it from memory']},
    {id:'drawit',   kw:['draw it','draw it to know','drawing canvas','draw to know','know it']},
    {id:'mastery',  kw:['mastery','mastery check','gap finder','50 questions','80 percent','report','cram','study engine','mastery os']},
    {id:'studyguide',kw:['study guide','competency study guide','note sheet','notesheet','two color','second color','first color','first pass','second pass','pass 1','pass 2','two passes']},
    {id:'preread',  kw:['pre-read','preread','pre read']},
    {id:'chart',    kw:['patient chart','patient file','flowsheet','my patient','application case','use it case','the case']},
    {id:'study',    kw:['study with me','co-study','study session','study group','sign up','study hours','engagement hour','scholar point','study partner','host a session','study buddy']},
    {id:'atlas',    kw:['atlas','3d','viewer','explore structure','anatomy review','refresher']},
    /* The 'loops' intent is retired, Sep 7 2026: "how do feedback loops
       work" is a physiology question, not a request for a lab tool. */
    {id:'practice', kw:['practice question','practice q','practice items','predict commit','book problem']},
    {id:'prework',  kw:['pre-work','prework','packet','before class','homework','tonight','what should i do','assignment','steps','order','the loop']},
    {id:'howstudy', kw:['how do i study','how should i study','memor','forget','remember','stick','retain','draw','retrieval','revise','review']},
    {id:'week',     kw:['this week','today','due','coming up','next class','whats due','what is due','what is on','schedule','deadline']},
    {id:'module',   kw:['module','unit','part ','where are we','what are we on','what are we doing']},
    {id:'find',     kw:['where are','where do i find','where can i find','how do i find','cant find','can not find',
                     'cannot find','where is the','looking for','how do i get to','how do i open','where would i',
                     'lecture video','concept video','the videos','worksheet','my notes','the notes',
                     'find the','navigate','get around','lost']},
    {id:'room',     kw:['room','what time','when does','which section','my section','crn','building','which room','what room','zoom','meet']},
    {id:'start',    kw:['start','begin','where do i','first','brand new','beginning','what do i do','orientation','new here','getting started','get started']}
  ];

  function matchIntent(text) {
    var q = ' ' + text.toLowerCase() + ' ';
    var best = null, bestScore = 0;
    INTENTS.forEach(function (it) {
      var score = 0;
      it.kw.forEach(function (k) { if (q.indexOf(k) !== -1) score++; });
      if (score > bestScore) { bestScore = score; best = it.id; }
    });
    return bestScore > 0 ? best : null;
  }

  /* Sep 25 2026: course-links.js was never built for this course, so
     a('masteryOS') printed the bare word "masteryOS" into answers. The
     links live here now. */
  var LINKS = {
    masteryOS: ['mastery-physio-os-standalone.html', 'the Mastery OS'],
    calendar:  ['course-schedule.html', 'course calendar'],
    study:     ['study-with-me.html', 'Study With Me'],
    rx:        ['rx-cards.html', 'Rx Cards'],
    dump:      ['competency-brain-dump.html', 'Brain Dump'],
    draw:      ['mastery-physio-os-standalone.html?open=drawknow', 'Draw It to Know It'],
    check:     ['practice-exam.html', 'Mastery Check'],
    home:      ['course-start.html', 'course home'],
    guide:     ['note-sheet.html', 'Competency Study Guide'],
    chart:     ['patient-chart-book.html', 'patient chart'],
    faq:       ['course-questions.html', 'answered questions page'],
    office:    ['virtual-office.html', 'virtual office'],
    grading:   ['how-grading-works.html', 'How grading works']
  };
  function a(key, text) {
    var l = LINKS[key];
    return l ? ilink(l[0], text || l[1]) : (text || key);
  }
  function wq(url, wk) { return wk ? url + (url.indexOf('?') > -1 ? '&' : '?') + 'week=' + wk : url; }
  function secL() { return {syllabus: 'syllabus-fall2026.html', hub: 'course-schedule.html'}; }
  /* Pages in the os/ folder load their own copy of this file; their links need ../ */
  var BASE = /\/os\/[^\/]*$/.test(location.pathname) ? '../' : '';
  function ilink(url, text) {
    if (!/^(https?:|\/|#|mailto:|\.\.\/)/.test(url)) url = BASE + url;
    return '<a href="' + url + '" target="_top">' + text + '</a>';
  }

  var MIDTERM_FORMAT = 'Each midterm has three multiple choice questions, and you record yourself for the whole of each one. '
    + 'You get 10 minutes to plan and build a physiological model on a whiteboard, from memory with no notes, then 5 minutes '
    + 'to teach it out loud, and you finish by giving your answer. The model and your teaching are worth 75 percent of the '
    + 'points for that question, and your answer is worth 25 percent. You record in Canvas Studio and turn in each video with its transcript, the caption file you download from Studio.';

  /* The weekly loop, the same ten steps every week, in the order the
     Canvas module and the Start here page list them. */
  function prework(ctx, wk) {
    return '<p>From Week 4 on, every week is the same ten steps, in this order. The week\'s <b>Start here</b> page in Canvas lists them with every due date. Weeks 1 to 3 keep the steps on their own pages.</p>'
      + '1. <b>The pre-read.</b> About 30 minutes: skim the headings and figures and answer a few short questions. Upload it.'
      + '<br>2. <b>First pass, in your first color.</b> Work through the week\'s lessons and videos in order, filling each box of your ' + a('guide') + '.'
      + '<br>3. <b>Second pass, in your second color</b>, on the same guide you started, printed or on your own paper. Go back through the same lessons. Add what you missed and fix what was wrong. Do not erase the first color.'
      + '<br>4. <b>Upload your Competency Study Guide</b> with both colors on it.'
      + '<br>5. <b>Study it for several days.</b> ' + a('rx') + ', the ' + a('dump') + ', ' + a('draw') + ', ' + a('study') + '.'
      + '<br>6. <b>The ' + a('check') + '</b>, and upload the report.'
      + '<br>7. <b>The lab.</b> PhysioEx first, then the worksheet.'
      + '<br>8. <b>Your application case</b>, worked into your patient chart.'
      + '<br>9. <b>Your patient chart.</b> This week\'s numbers and your thinking.'
      + '<br>10. <b>The discussion.</b> Post by Friday, replies by Sunday.'
      + (wk ? '<br><br>' + ilink(weekHref(wk), 'Open the Week ' + wk + ' page') + '.' : '');
  }

  function answerFor(id, ctx) {
    var wk = ctx.viewWk || ctx.curWk;
    var s = secL(ctx);

    switch (id) {

      case 'start':
        return '<p>Three moves and you are ahead:</p>'
          + '1. Open this week\'s <b>Start here</b> page in Canvas. It tells you what the week is and lets you work it in Canvas or on the interactive week page.'
          + '<br>2. Follow the steps in order, starting with the pre-read. Ask me about the steps and I will list them.'
          + '<br>3. Skim your ' + ilink(s.syllabus, 'syllabus') + ' once, so you know how grading and deadlines work.'
          + '<br><br>' + weekLine(ctx, wk);

      case 'week': {
        var parts = [];
        if (ctx.state === 'before') parts.push('The term has not started yet. Week 1 opens <b>' + fmt(ctx.weeks[0].opens) + '</b>.');
        else if (ctx.state === 'after') parts.push('The term has ended.');
        parts.push(weekLine(ctx, wk));
        if (ctx.state === 'during' && ctx.viewWk && ctx.viewWk !== ctx.curWk) parts.push('The week you are in now is Week ' + ctx.curWk + '.');
        parts.push('The whole term is on your ' + a('calendar') + '.');
        return parts.filter(Boolean).join('<br><br>');
      }

      case 'struggle':
        return '<p>This is normal and it is fixable. Try this, in order:</p>'
          + '1. Take a ' + a('check') + ' on the week. The report names the competencies that are not solid yet.'
          + '<br>2. Work those with ' + a('rx') + ' and the ' + a('dump') + ', a little every day.'
          + '<br>3. Join a ' + a('study') + ' session, or set one up.'
          + '<br>4. Come to office hours, Wednesdays 9:00 to 10:00 am on Zoom, or book free tutoring at (530) 751-5558.'
          + '<br><br>Reach out early. Do not wait for the next exam, and do not wait until you feel you have earned the right to ask.'
          + (ctx.nextExam ? '<br><br>' + examLine(ctx, ctx.nextExam) : '');

      case 'ai':
        return '<p>The short version: AI is open on some things, closed on others, and the line is about whether the work is evidence of <b>your</b> reasoning.</p>'
          + '<p><b>Closed.</b> The exams, the discussions, and anything where the point is that you can do it yourself. Retrieval is closed too, not because you would be caught, but because using AI there defeats the only reason to do it.</p>'
          + '<p><b>Open, with disclosure.</b> Labs and application cases. Say what you used it for. The reasoning still has to be yours, and it is what gets graded.</p>'
          + '<p>The full lists, and how I use AI to build this course, are on <a href="ai-in-this-course.html" target="_blank" rel="noopener">How AI is used in this course</a>.</p>';

      case 'grades':
        return '<p>Four categories:</p>'
          + '<b>35%</b> Show Me What You Know. Two midterms, 17.5 percent each.'
          + '<br><b>25%</b> Investigate It. The weekly labs.'
          + '<br><b>25%</b> Use It. Your weekly application cases and your patient chart.'
          + '<br><b>15%</b> Think About It. The weekly discussion.'
          + '<br><br>The pre-read, your Competency Study Guide and the Mastery Check carry <b>no points</b>, on purpose. You still turn them in each week, and they are marked complete or not complete. They are the route to the four above, not extras.'
          + '<br><br>There is no curve and no back-end extra credit. There is a front-end version: <a href="scholar-points.html" target="_top">Scholar Points</a>, up to a 2.5 percent bump earned by studying with other people across the term. More on ' + a('grading') + ' and in your ' + ilink(s.syllabus, 'syllabus') + '.';

      case 'exams':
        return '<p>Two midterms, no final.</p>'
          + examLine(ctx, MIDTERMS[0]) + '<br>' + examLine(ctx, MIDTERMS[1])
          + '<br><br>' + MIDTERM_FORMAT
          + '<br><br>Weeks 4 and 5 are a full practice run of this format before it counts. Ask me about the exam practice for the details.';

      case 'examprac':
        return '<p>Weeks 4 and 5 are a practice run of the midterm format, on material from Week 2.</p>'
          + '<p><b>Week 4.</b> Two multiple choice questions, one at a time, one video each: 15 minutes preparing your answer on camera by building a model from memory, then 5 minutes presenting it and giving your answer. The videos go to Dr. Rennie only, through the <b>Exam practice part 1</b> assignment. Then you post in <b>Discussion 4</b> about how it went, where you got stuck and what you will do about it, and you help each other with solutions. Do not post your answers.</p>'
          + '<p><b>Week 5.</b> The rubrics and the answer key come out in <b>Discussion 5</b>. You score your own models, answers and presenting, and write about what it shows you.</p>'
          + '<p>' + ilink('discussion-week04.html', 'The Week 4 exam practice page') + '.</p>';

      case 'tbl':
        return '<p>There is no TBL in this course. No teams, no iRAT or tRAT, and nothing that meets at a set time. BIO 005 is fully online and asynchronous.</p>'
          + '<p>Participation is what you turn in: each week that is the pre-read, your Competency Study Guide, your Mastery Check report, your lab, your application case and your discussion. Census is September 27.</p>';

      case 'tools':
        return '<p>Press <b>Course tools</b> in the bottom left corner of any course page. Your study tools are at the top:</p>'
          + a('rx', 'Rx Cards') + ': spaced recall that gets harder as you prove it.'
          + '<br>The ' + a('dump', 'Brain Dump') + ': a random competency and prompt, done on paper from memory, then checked against what the prompt asked for.'
          + '<br>' + a('study', 'Study With Me') + ': study with other people. Optional, and it earns Scholar Points.'
          + '<br>The ' + a('check', 'Mastery Check') + ': at least 50 questions and 80 percent to count, and a report you upload.'
          + '<br>' + a('draw', 'Draw It to Know It') + ': draw a mechanism from memory, then check it.';

      case 'rx':
        return '<p>' + a('rx') + ' are your spaced recall practice. Cards come back on a schedule, get harder as you get them right, and every answer comes with the reason.</p>'
          + '<p>Open them every day and clear what is due. Little and often beats big and rare. You rate how sure you are before you check, and a card you were sure of and got wrong comes back sooner.</p>';

      case 'braindump':
        return '<p>The ' + a('dump') + ' picks a random competency and prompt for you. Pick a week and press <b>Spin</b>. Do the prompt on paper, from memory, with everything closed. Then press <b>Check my work</b> and tick only what is actually on your paper against the list of what the prompt asked for.</p>'
          + '<p>The competencies you keep leaving pieces out of collect in a weakest list, so you know what to drill next. This is the closest thing to how the midterm feels.</p>';

      case 'drawit':
        return '<p>' + a('draw') + ' is in the Mastery OS. It asks how sure you feel about a competency, then gives you a prompt: draw the mechanism or build a small map from memory on the canvas, then open the self check list and mark what you covered.</p>'
          + '<p>When you went in confident and came out patchy, it moves that competency up your weak spot list.</p>';

      case 'mastery':
        return '<p>The ' + a('check') + ' is a practice exam you build yourself. An attempt counts when it covers <b>one week</b>, has <b>at least 50 questions</b>, tests <b>every competency</b> that week, and you score <b>80 percent or higher</b>. The report says Met or Not yet for each of those.</p>'
          + '<p>Take it as many times as you like; each try is a fresh set of questions. If it says Not yet, go back to the competencies it lists, then take it again. When an attempt meets the standard, save the report as a PDF and upload it in Canvas. It carries no points and is marked complete or not complete.</p>'
          + '<p>' + a('masteryOS', 'The Mastery OS') + ' is your study engine alongside it: spaced recall across all 268 competencies and a gap finder that shows what is weak.</p>';

      case 'studyguide':
        return '<p>Your ' + a('guide', 'Competency Study Guide') + ' has one box for each competency that week, with two prompts to choose from. You draw in the box. Words go in little boxes with arrows between them, in the order things happen.</p>'
          + '<p><b>First pass, first color:</b> work through the week\'s lessons and videos, filling each box as you go. <b>Second pass, second color:</b> on the same pages you started, printed worksheet or your own paper, go back through, add what you missed and fix what was wrong. Never erase the first color; the second color is exactly what you still need to commit to memory.</p>'
          + '<p>Upload it each week with both colors on it. It is marked complete or not complete, not graded for content. The printable PDF for each week is linked on the guide page and on the week\'s Start here page.</p>'
          + (wk ? '<p>' + ilink(wq('note-sheet.html', wk), 'Your Week ' + wk + ' Competency Study Guide') + '.</p>' : '');

      case 'preread':
        return '<p>The pre-read is the first step of every week, about 30 minutes. It is a quick look ahead, not a full read: you look at the headings and figures in that week\'s chapters and answer a few short questions, so the lessons make more sense when you get to them.</p>'
          + '<p>Fill it in on screen or on the printable copy, then upload it in Canvas. It is marked complete or not complete.</p>';

      case 'chart':
        return '<p>You follow your patients by hand, in your ' + a('chart') + '. Each week you copy that week\'s numbers into your flowsheets and add what changed, your problem list, a drawing and your thinking, including what you worked out in that week\'s application case.</p>'
          + '<p>There are two patients, one at a time. Until Midterm 1 you work only on Camila, Weeks 1 to 8. Her chart and her analysis are turned in on Sunday, November 1, with Midterm 1, and Midterm 1 includes a question about her, answered from memory. The analysis is a recorded chart walk: 10 to 15 minutes on camera with only your handwritten chart, reasoning out loud from your own numbers, recorded in Canvas Studio and turned in with its transcript. Then you pick up Dale for Weeks 9 to 15, and his chart and chart walk are due Wednesday, December 16. Each is half of the 5 percent.</p>'
          + '<p>The weekly case itself is not uploaded; your thinking goes into the chart. ' + ilink('assignment-patient-chart.html', 'What you turn in, and when') + '.</p>';

      case 'study':
        return '<p>' + a('study') + ' is the room for this. I post my own drop-in times, and you can set up your own session any week you want one. Nothing about it is required.</p>'
          + '<p>The hours do earn <a href="scholar-points.html" target="_top">Scholar Points</a>: up to a 2.5 percent bump on your final course percentage, thirty hours for the full amount, three hours a week that can count. Sessions have to be recorded with cameras on, and whoever hosts gets one extra hour on top of the time the session ran. You log your hours on the Scholar Points page and upload the week in Canvas.</p>'
          + '<p>Office hours are Wednesdays 9:00 to 10:00 am on Zoom, drop in.</p>';

      case 'atlas':
        return 'The interactive Atlas belongs to the anatomy course, not this one. What you want here is the <a href="anatomy-review.html" target="_top">anatomy refresher</a>: the anatomy this course leans on, with self-checks, so you can close a gap early rather than find it at the midterm.';

      case 'practice':
        return '<p>Book problems are listed on the Week 1 to 3 pages. They carry no points and nothing is submitted. Work them forwards if you have a way in, or backwards by reading a solution and writing why each step is there.</p>'
          + '<p>From Week 4 on, your practice is ' + a('rx') + ', the ' + a('dump') + ', ' + a('draw') + ' and the ' + a('check') + '.</p>';

      case 'contact':
        return '<p><b>Anything private: your grade, an extension, something going on in your life.</b> Message Dr. Rennie in the Canvas Inbox, or email srennie@yccd.edu (about 48 to 72 hours on weekdays).</p>'
          + '<p><b>Anything about the course itself</b> goes in the ' + a('office') + ' instead, where the answer reaches everyone. Say what your question is, what you already tried, and where it stopped answering your question.</p>'
          + '<p><b>Office hours.</b> Wednesdays 9:00 to 10:00 am on Zoom, drop in, no appointment needed.</p>'
          + '<p><b>Accommodations.</b> Yuba DSPS, dspsinfo@yccd.edu. Set this up in Week 1, then tell Dr. Rennie your approved accommodations.</p>';

      case 'prework':
        return prework(ctx, wk);

      case 'howstudy':
        return 'Rereading feels productive and does almost nothing. Three things work in this course:'
          + '<br><br><b>Retrieve cold.</b> Blank paper, everything closed, write everything you know before you look at anything. The ' + a('dump') + ' does this for you.'
          + '<br><b>Draw it.</b> If you cannot draw the mechanism from memory and explain it out loud, you do not know it yet. That is also the midterm.'
          + '<br><b>Space it.</b> Recall it today, again in two days, then further out. ' + a('rx') + ' do the spacing for you.'
          + '<br><br>When you get something wrong, name which kind of wrong it was: could not recall it, recalled it wrong, or knew it but could not apply it. Those three need different repairs.';

      case 'module': {
        var p = ctx.moduleOf(wk)[0];
        return PARTS.map(function (x) {
          return (x === p ? '<b>' : '') + 'Part ' + x.n + ', ' + esc(x.title) + ': Weeks ' + x.weeks[0] + ' to ' + x.weeks[x.weeks.length - 1] + (x === p ? '</b> (you are here)' : '');
        }).join('<br>') + '<br><br>Midterm 1 covers Weeks 1 to 7. Midterm 2 covers Weeks 9 to 14.';
      }

      case 'find': {
        var fq = (ctx && ctx.q) ? String(ctx.q).toLowerCase() : '';
        var specific = '';
        if (/video|lecture/.test(fq))
          specific = 'The week\'s lessons and videos, in order, are in ' + ilink(wq('lecture-week.html', wk), 'the Week ' + wk + ' lessons') + ', and linked from the week page under Learn.';
        else if (/guide|note ?sheet|worksheet|pre-?work|packet|sheet/.test(fq))
          specific = 'Your ' + ilink(wq('note-sheet.html', wk), 'Week ' + wk + ' Competency Study Guide') + ' has the printable PDF linked at the top. The pre-read and the lab worksheet are on the week page and its Start here page in Canvas.';
        else if (/note/.test(fq))
          specific = 'The written notes for each week are on the week page, under Learn.';
        else if (/lab|physioex/.test(fq))
          specific = 'The lab is on the week page, under Apply, and PhysioEx itself opens through Access Pearson in Canvas.';
        else if (/card|recall|flashcard|quiz/.test(fq))
          specific = a('rx') + ' are in Course tools, at the top.';
        else if (/syllabus|policy|grade/.test(fq))
          specific = 'Your ' + ilink(s.syllabus, 'syllabus') + ' is in Course tools, and in the footer of every page.';

        return '<p>Everything is behind one button, so there is only one thing to remember.</p>'
          + '<b>Look at the bottom left corner of the page.</b> There is a button marked <b>Course tools</b>. '
          + 'Your study tools are at the top, then this week, your Competency Study Guide, the lessons, the labs, the schedule and the syllabus. Type a few letters to find one.'
          + (specific ? '<br><br>' + specific : '')
          + '<br><br>In Canvas, every week starts with its <b>Start here</b> page, which links everything for that week.';
      }

      case 'room':
        return 'Nothing in this course meets at a set time or in a room. BIO 005 is fully online and asynchronous. The only live time is office hours, Wednesdays 9:00 to 10:00 am on Zoom, and that is optional.';
    }
    return null;
  }

  /* One function, everything it needs passed in. Swap this for a
     proxied model call if free-form content answers are ever
     wanted, and the 22 pages do not change. */

  /* ----------------------------------------------------------
     THE 248 ANSWERS THAT ARE ALREADY WRITTEN DOWN

     Scrubs, Sep 7 2026: anything a student asks that the course
     questions page already answers should be answered here, not
     shrugged at. bio005-question-bank.js is generated from
     course-questions.html, so the page stays the single source
     and Hootie never drifts from it.

     This runs AFTER the intent matcher, because an intent answer
     knows what week it is and a stored answer does not. It runs
     BEFORE the refusal, because "I do not know" is the wrong
     reply to a question with an answer already on the site.

     Scoring is deliberately dumb and predictable: overlap of
     meaningful words between the question asked and the stored
     question, weighted so a word in the stored question counts
     more than a word buried in its answer. A weak best match is
     no match, because a confidently wrong answer is worse than
     an honest miss.
     ---------------------------------------------------------- */
  var STOP = {' the':1,a:1,an:1,and:1,are:1,as:1,at:1,be:1,but:1,by:1,can:1,do:1,does:1,
    for:1,from:1,get:1,how:1,i:1,if:1,in:1,is:1,it:1,me:1,my:1,of:1,on:1,or:1,should:1,
    that:1,the:1,then:1,this:1,to:1,was:1,what:1,when:1,where:1,which:1,who:1,why:1,
    will:1,with:1,you:1,your:1,am:1,we:1,us:1,so:1,any:1,'':1};

  function words(t) {
    return String(t || '').toLowerCase().replace(/<[^>]+>/g, ' ')
      .split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && !STOP[w]; });
  }

  function searchBank(q) {
    var bank = window.BIO005_QUESTIONS;
    if (!bank || !bank.length) return null;
    var asked = words(q);
    if (asked.length < 2) return null;

    var best = null, bestScore = 0, runnerUp = null;
    bank.forEach(function (e) {
      if (!e.__qw) { e.__qw = words(e.q); e.__aw = words(e.a); }
      var score = 0;
      asked.forEach(function (w) {
        if (e.__qw.indexOf(w) > -1) score += 3;
        else if (e.__aw.indexOf(w) > -1) score += 1;
      });
      /* a short stored question matched fully beats a long one matched partly */
      score = score / Math.sqrt(e.__qw.length + 2);
      if (score > bestScore) { runnerUp = best; bestScore = score; best = e; }
    });

    /* Below this the match is noise. Tuned so a two word question with one
       real overlap does not fire. */
    if (!best || bestScore < 1.15) return null;

    var html = '<p>' + esc(best.q) + '</p>' + best.a;
    if (runnerUp) {
      html += '<p class="hoot-more">Not what you meant? The '
        + '<a href="course-questions.html" target="_top">answered questions page</a> has '
        + bank.length + ' of these, and you can filter it by typing a word.</p>';
    }
    return html;
  }

  function hootieAnswer(qRaw, ctx) {
    var q = String(qRaw || '').toLowerCase().trim();
    if (!q) return { html: 'Ask me what is due this week, when the next midterm is, how grading works, or what to do next.' };

    /* buildContext returns null on any page that does not carry the schedule
       globals. Every date aware branch below then throws, and the student sees
       a dead assistant rather than an answer. The stored answers do not need a
       context at all, so on a null context go straight to them. */
    if (!ctx) {
      var only = searchBank(q);
      if (only) return { html: only, intent: 'bank' };
      return { html: 'I cannot see the schedule from this page. The '
        + '<a href="course-questions.html" target="_top">answered questions page</a> covers most of what students ask, '
        + 'and the <a href="virtual-office.html" target="_top">virtual office</a> is where to put anything it does not.' };
    }

    /* Explicit week number wins over everything. */
    var wkAsk = q.match(/week\s*(\d{1,2})/);
    if (wkAsk) {
      var n = parseInt(wkAsk[1], 10);
      if (n >= 1 && n <= 15) return { html: weekLine(ctx, n) };
      return { html: 'The term runs Weeks 1 to 15. There is no Week ' + n + '.' };
    }

    /* Explicit exam number. Any digit, so "exam 9" is corrected
       rather than silently answered with the next exam. */
    var exAsk = q.match(/(?:exam|midterm)\s*(\d+)/);
    if (exAsk) {
      var want = parseInt(exAsk[1], 10);
      var ex = ctx.exams.filter(function (e) { return e.n === want; })[0];
      if (!ex) return { html: 'There are two exams in this course, Midterm 1 and Midterm 2. There is no exam ' + want + '.' };
      return { html: examLine(ctx, ex) + '<br><br>' + MIDTERM_FORMAT };
    }

    var id = matchIntent(q);
    if (id) {
      ctx.q = q;
      var html = answerFor(id, ctx);
      if (html) return { html: html, intent: id };
    }

    /* A physiology question must never be answered from the course bank
       on a stray word match ("how do feedback loops WORK" once matched
       "Can I work ahead?"). Content questions go straight to the refusal. */
    var physio = /\b(loops?|feedback|potential|ions?|sodium|potassium|calcium|chloride|neurons?|synapse|muscles?|heart|cardiac|blood|kidneys?|renal|hormones?|insulin|glucose|oxygen|co2|pressure|membrane|channels?|receptors?|enzymes?|ph|acid|osmosis|diffusion|transport|pump|atpase|nerve|reflex|gfr|ventilation|hemoglobin)\b/;
    var courseWord = /\b(due|week|exam|midterm|grade|points?|upload|submit|canvas|study guide|cards?|brain dump|mastery|discussion|lab|lecture|notes|videos?|page|deadline|syllabus|where)\b/;
    var stored = (physio.test(q) && !courseWord.test(q)) ? null : searchBank(q);
    if (stored) return { html: stored, intent: 'bank' };

    /* Physiology content, or anything else. Say so; do not guess. */
    var fw = ctx.viewWk || ctx.curWk;
    return { html:
      'I did not quite catch that, and I will not guess at physiology when the answer is going to be examined.'
      + '<br><br>I can help with where to start, what is due this week, the weekly steps, grading, the midterms, the study tools, how to study, and who to contact.'
      + '<br><br>For content, go to ' + ilink(wq('lecture-week.html', fw), 'this week\'s lessons') + ', the written notes on the ' + ilink(weekHref(fw), 'week page') + ', or your Competency Study Guide.'
      + '<br><br>Still stuck? Post it in the ' + a('office') + ', or bring it to office hours, Wednesdays 9:00 to 10:00 am on Zoom. A question you had to fight for is worth asking out loud.',
      unanswered: true };
  }

  /* ----------------------------------------------------------
     UI
     ---------------------------------------------------------- */
  var CSS = [
    '.hoo-btn{position:fixed;right:18px;bottom:18px;z-index:60;display:inline-flex;align-items:center;gap:8px;',
    '  font:inherit;font-size:.85rem;font-weight:700;cursor:pointer;padding:11px 16px;border-radius:999px;',
    '  background:var(--navy,#0B1530);color:#fff;border:1px solid var(--navy,#0B1530);',
    '  box-shadow:0 8px 16px rgba(0,0,0,.18);transition:transform 180ms ease,box-shadow 180ms ease}',
    '.hoo-btn:hover{transform:translateY(-2px);box-shadow:0 12px 22px rgba(0,0,0,.22)}',
    '.hoo-btn .fish{line-height:0;display:inline-flex;background:#fff;border-radius:50%;padding:2px}',
    /* Sits ABOVE the launcher, not beside it. Beside meant guessing
       the pill's width, and the guess was wrong once the label and
       the mark were in place, so the bubble overlapped the button. */
    '.hoo-nudge{position:fixed;right:18px;bottom:82px;z-index:59;',
    '  background:var(--gold,#C9A14A);color:var(--navy,#0B1530);',
    "  font-family:var(--eb,inherit);font-size:12.5px;font-weight:700;white-space:nowrap;",
    '  padding:7px 12px;border-radius:9px;box-shadow:0 6px 14px rgba(0,0,0,.18)}',
    ".hoo-nudge::after{content:'';position:absolute;bottom:-6px;right:22px;border:6px solid transparent;border-top-color:var(--gold,#C9A14A)}",
    '.hoo-nudge[hidden]{display:none}',
    '.hoo-panel{position:fixed;right:18px;bottom:76px;z-index:61;width:min(390px,calc(100vw - 36px));',
    '  max-height:min(560px,calc(100vh - 110px));display:none;flex-direction:column;',
    '  background:#fff;border:1px solid var(--line,rgba(11,21,48,.12));border-radius:var(--radius,16px);',
    '  box-shadow:0 18px 44px rgba(0,0,0,.24);overflow:hidden}',
    '.hoo-panel.on{display:flex}',
    '.hoo-hd{display:flex;align-items:center;gap:9px;padding:12px 14px;background:var(--navy,#0B1530);color:#fff}',
    '.hoo-hd .fish{line-height:0;display:inline-flex;background:#fff;border-radius:50%;padding:2px}',
    '.hoo-hd h2{margin:0;font-size:.95rem;font-weight:700;color:#fff}',
    '.hoo-hd .sub{margin:1px 0 0;font-size:11.5px;color:#fff;opacity:.85}',
    '.hoo-x{margin-left:auto;background:transparent;border:0;color:#fff;cursor:pointer;font-size:1.25rem;line-height:1;padding:3px 6px;border-radius:7px}',
    '.hoo-x:hover{background:rgba(255,255,255,.16)}',
    '.hoo-log{flex:1;overflow-y:auto;padding:13px 14px;display:flex;flex-direction:column;gap:10px;background:var(--offwhite,#F3F5F8)}',
    '.hoo-msg{max-width:92%;padding:10px 12px;border-radius:13px;font-size:13.5px;line-height:1.55}',
    '.hoo-msg.bot{background:#fff;border:1px solid var(--line,rgba(11,21,48,.12));color:var(--navy,#0B1530);align-self:flex-start}',
    '.hoo-msg.you{background:var(--navy,#0B1530);color:#fff;align-self:flex-end}',
    '.hoo-msg a{color:var(--maroon-dark,#8B3A2E);font-weight:700}',
    '.hoo-msg.you a{color:var(--gold,#C9A14A)}',
    '.hoo-name{display:block;font-family:var(--eb,inherit);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;',
    '  color:var(--maroon-dark,#8B3A2E);font-weight:700;margin-bottom:4px}',
    '.hoo-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px;border-top:1px solid var(--line,rgba(11,21,48,.12));background:#fff}',
    '.hoo-chip{font:inherit;font-size:11.5px;font-weight:700;cursor:pointer;padding:6px 10px;border-radius:999px;',
    '  background:#fff;color:var(--navy,#0B1530);border:1px solid var(--line,rgba(11,21,48,.12))}',
    '.hoo-chip:hover{border-color:var(--maroon-dark,#8B3A2E)}',
    '.hoo-form{display:flex;gap:7px;padding:10px 14px;border-top:1px solid var(--line,rgba(11,21,48,.12));background:#fff}',
    '.hoo-in{flex:1;font:inherit;font-size:13.5px;padding:9px 11px;border-radius:10px;',
    '  border:1.5px solid var(--line,rgba(11,21,48,.12));background:var(--offwhite,#F3F5F8);color:var(--navy,#0B1530)}',
    '.hoo-send{font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;padding:9px 14px;border-radius:10px;',
    '  background:var(--gold,#C9A14A);color:var(--navy,#0B1530);border:1px solid var(--gold,#C9A14A)}',
    '.hoo-btn:focus-visible,.hoo-x:focus-visible,.hoo-chip:focus-visible,.hoo-in:focus-visible,.hoo-send:focus-visible{',
    '  outline:3px solid var(--gold,#C9A14A);outline-offset:2px}',
    '@media (prefers-reduced-motion:reduce){.hoo-btn{transition:none}.hoo-btn:hover{transform:none}}',
    /* Every fixed element Hootie owns. The nudge was missing from this
       list and printed as a gold pill across the foot of the page. */
    '@media print{.hoo-btn,.hoo-panel,.hoo-nudge{display:none !important}}'
  ].join('');

  /* Six of these are welcome.html's, kept because they are framed
     the way a stuck student actually thinks. "I'm struggling" is
     the one that matters most and the schedule-only version had no
     answer for it at all. */
  var CHIPS = [
    'Where do I start?',
    "What's due this week?",
    'What are the weekly steps?',
    'Where are the study tools?',
    'How do the midterms work?',
    "I'm struggling",
    'How does grading work?',
    'Who do I contact?'
  ];

  /* The real Hootie. This mark already existed in welcome.html, a
     pufferfish in a mortarboard with round glasses and a maroon bow
     tie, drawn in the Mastery OS palette. Reused here rather than
     redrawn, so there is one Hootie across the site instead of two.
     Source of truth: the hootieBtn svg in welcome.html. */
  function hootieMark(size) {
    return '<svg viewBox="0 0 64 64" width="' + size + '" height="' + size + '" aria-hidden="true" focusable="false">'
      + '<path d="M20 39 L6 28 Q3 39 6 50 Z" fill="#C9A14A"/>'
      + '<ellipse cx="35" cy="40" rx="19" ry="16" fill="#E8CE85"/>'
      + '<ellipse cx="37" cy="44" rx="12" ry="9" fill="#F2E2B0"/>'
      + '<path d="M28 25 Q36 21 44 25 L42 31 Q36 34 30 31 Z" fill="#0B1530"/>'
      + '<path d="M36 11 L55 20 L36 29 L17 20 Z" fill="#0B1530"/>'
      + '<circle cx="36" cy="20" r="1.5" fill="#C9A14A"/>'
      + '<path d="M36 20 L53 21 L53 32" fill="none" stroke="#C9A14A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<circle cx="53" cy="34" r="2.4" fill="#C9A14A"/>'
      + '<circle cx="31" cy="39" r="7" fill="#FFFFFF" stroke="#0B1530" stroke-width="2.4"/>'
      + '<circle cx="45" cy="39" r="7" fill="#FFFFFF" stroke="#0B1530" stroke-width="2.4"/>'
      + '<path d="M37.6 39 H38.4" stroke="#0B1530" stroke-width="2.2"/>'
      + '<circle cx="32" cy="40" r="3" fill="#0B1530"/>'
      + '<circle cx="44" cy="40" r="3" fill="#0B1530"/>'
      + '<circle cx="33.1" cy="38.8" r="1" fill="#FFFFFF"/>'
      + '<circle cx="45.1" cy="38.8" r="1" fill="#FFFFFF"/>'
      + '<path d="M33 46 Q38 51 43 46 Q38.5 48.5 33 46 Z" fill="#8B3A2E"/>'
      + '<path d="M31 49 L31 55 L36.5 52 Z" fill="#8B3A2E"/>'
      + '<path d="M42 49 L42 55 L36.5 52 Z" fill="#8B3A2E"/>'
      + '<rect x="35" y="50.2" width="3" height="3.6" rx="1" fill="#6E2D24"/>'
      + '</svg>';
  }

  function mount() {
    if (document.body.getAttribute('data-hootie') === 'off') return;
    var ctx = buildContext();
    if (!ctx) return;                       /* no data, no Hootie */

    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hoo-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'hoo-panel');
    btn.innerHTML = '<span class="fish" aria-hidden="true">' + hootieMark(26) + '</span>Ask Hootie';

    var panel = document.createElement('div');
    panel.className = 'hoo-panel';
    panel.id = 'hoo-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', 'Ask Hootie the Knowfish about the course');

    panel.innerHTML =
      '<div class="hoo-hd">'
      + '<span class="fish" aria-hidden="true">' + hootieMark(30) + '</span>'
      + '<div><h2>Hootie the Knowfish</h2><p class="sub">The course, your week and your exams</p></div>'
      + '<button type="button" class="hoo-x" aria-label="Close Hootie">&times;</button>'
      + '</div>'
      + '<div class="hoo-log" id="hoo-log" role="log" aria-live="polite" aria-label="Conversation with Hootie"></div>'
      + '<div class="hoo-chips" id="hoo-chips"></div>'
      + '<form class="hoo-form" id="hoo-form">'
      + '<label class="sr-only" for="hoo-in" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">Your question</label>'
      + '<input class="hoo-in" id="hoo-in" type="text" autocomplete="off" placeholder="Ask about the course...">'
      + '<button type="submit" class="hoo-send">Ask</button>'
      + '</form>';

    /* "Stuck? Ask Hootie." Borrowed from welcome.html, where it is
       the thing that actually gets students to open the panel. It is
       role="status" so it is announced once, and it retires the
       moment Hootie is opened so it does not nag. */
    var nudge = document.createElement('div');
    nudge.className = 'hoo-nudge';
    nudge.setAttribute('role', 'status');
    nudge.textContent = 'Stuck? Ask Hootie.';

    document.body.appendChild(btn);
    document.body.appendChild(nudge);
    document.body.appendChild(panel);

    var log = panel.querySelector('#hoo-log');
    var chips = panel.querySelector('#hoo-chips');
    var form = panel.querySelector('#hoo-form');
    var input = panel.querySelector('#hoo-in');

    function say(who, html) {
      var d = document.createElement('div');
      d.className = 'hoo-msg ' + who;
      d.innerHTML = (who === 'bot' ? '<span class="hoo-name">Hootie</span>' : '') + html;
      log.appendChild(d);
      log.scrollTop = log.scrollHeight;
    }

    function ask(q) {
      say('you', esc(q));
      var a = hootieAnswer(q, buildContext() || ctx);
      say('bot', a.html);
    }

    CHIPS.forEach(function (t) {
      var c = document.createElement('button');
      c.type = 'button';
      c.className = 'hoo-chip';
      c.textContent = t;
      c.addEventListener('click', function () { ask(t); });
      chips.appendChild(c);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      input.value = '';
      ask(v);
    });

    var greeted = false;
    function open() {
      nudge.hidden = true;
      panel.classList.add('on');
      btn.setAttribute('aria-expanded', 'true');
      if (!greeted) {
        greeted = true;
        var c = buildContext() || ctx;
        var wk = c.viewWk || c.curWk;
        var hi = 'I know how this course runs, what is due each week, the study tools, and the midterm dates. I do not answer physiology questions, and I will tell you when a question is outside what I can answer.';
        if (c.state === 'during') {
          var cw = c.week(c.curWk), pt = c.moduleOf(c.curWk)[0];
          hi += '<br><br>Right now you are in <b>Week ' + c.curWk + (cw ? ', ' + esc(cw.title) : '') + '</b>'
            + (pt ? ', Part ' + pt.n : '') + '.';
        } else if (c.state === 'before') {
          hi += '<br><br>The term starts <b>' + fmt(c.weeks[0].opens) + '</b>.';
        }
        if (c.viewWk && c.viewWk !== c.curWk) hi += ' You are looking at Week ' + c.viewWk + '.';
        say('bot', hi);
      }
      input.focus();
    }
    function close() {
      panel.classList.remove('on');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }

    btn.addEventListener('click', function () {
      panel.classList.contains('on') ? close() : open();
    });
    panel.querySelector('.hoo-x').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('on')) close();
    });
  }

  /* COURSE TOOLS ON EVERY HOOTIE PAGE, Sep 25 2026. The dock is loaded by
     bio005-nav.js, and 70 pages load Hootie without the nav, so a student
     there could ask Hootie but had no Course tools button. Where the dock
     is not already on the page, load it from beside this file. The dock
     checks for Hootie before loading it, so neither loads twice. */
  (function loadDock() {
    if (/[?&]embed=/.test(location.search)) return;
    if (document.querySelector('script[src*="bio005-dock.js"]') || window.BIO005_DOCK || window.__BIO005_DOCK__) return;
    if (document.body && document.body.getAttribute('data-dock') === 'off') return;
    var here = document.querySelector('script[src*="hootie.js"]');
    var src = here ? here.getAttribute('src').replace(/hootie\.js.*$/, 'bio005-dock.js') : 'bio005-dock.js';
    var el = document.createElement('script');
    el.src = src; el.async = false; el.onerror = function () {};
    (document.head || document.body).appendChild(el);
  })();

  /* Exposed for testing and for a future swap of the answer layer. */
  window.BIO005_HOOTIE = { answer: hootieAnswer, context: buildContext };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
