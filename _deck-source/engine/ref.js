
/* ---------- present mode ---------- */
(function(){
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var on = false, idx = 0;
  var progress = document.getElementById('progress');
  var pcount = document.getElementById('pcount');

  function show(i){
    if (i < 0) i = 0;
    if (i > slides.length - 1) i = slides.length - 1;
    idx = i;
    if (window.__zoomOpen && window.__zoomOpen()) window.__zoomClose(true);
    slides.forEach(function(s, k){ s.classList.toggle('is-current', k === idx); });
    pcount.textContent = (idx + 1) + ' / ' + slides.length;
    progress.style.width = (((idx + 1) / slides.length) * 100) + '%';
  }
  function enter(i){
    on = true;
    document.body.classList.add('present');
    show(i || 0);
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function(){});
  }
  function exit(){
    on = false;
    document.body.classList.remove('present');
    slides.forEach(function(s){ s.classList.remove('is-current'); });
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function(){});
    var b = document.getElementById('presentBtn'); if (b) b.focus();
  }

  document.getElementById('presentBtn').addEventListener('click', function(){ enter(0); });
  document.getElementById('prevBtn').addEventListener('click', function(){ show(idx - 1); });
  document.getElementById('nextBtn').addEventListener('click', function(){ show(idx + 1); });
  document.getElementById('exitBtn').addEventListener('click', exit);

  document.getElementById('deck').addEventListener('click', function(e){
    if (!on) return;
    if (e.target.closest('button,a,input,label,select,summary,.present-bar,.clock,.rv')) return;
    if (!(window.__rvNext && window.__rvNext())) show(idx + 1);
  });

  document.addEventListener('keydown', function(e){
    if (!on) return;
    var tag = (e.target && e.target.tagName ? e.target.tagName : '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); if (!(window.__rvNext && window.__rvNext())) show(idx + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); if (window.__zoomOpen && window.__zoomOpen()) { window.__zoomClose(); } else show(idx - 1); }
    else if (e.key === ' ' && tag !== 'button'){ e.preventDefault(); if (!(window.__rvNext && window.__rvNext())) show(idx + 1); }
    else if (e.key === 'Escape'){ if (!(window.__zoomOpen && window.__zoomOpen())) exit(); }
  });
  document.addEventListener('fullscreenchange', function(){ if (!document.fullscreenElement && on){ exit(); } });
  if (/[?#&]present/.test(location.href)) enter(0);
})();

/* ---------- floating clock ---------- */
(function(){
  var clock = document.getElementById('clock');
  var face = document.getElementById('clockFace');
  var timeEl = document.getElementById('clockTime');
  var startBtn = document.getElementById('cStart');
  var total = 300, left = 300, running = false, tick = null, lastSlide = null;

  function fmt(s){ var m = Math.floor(s/60), r = s%60; return m + ':' + (r<10?'0':'') + r; }
  function paint(){
    timeEl.textContent = fmt(left);
    clock.classList.toggle('warn', running && left > 0 && left <= 30);
    clock.classList.toggle('done', left === 0);
    startBtn.textContent = running ? 'Pause' : (left === total || left === 0 ? 'Start' : 'Resume');
  }
  function stop(){ running = false; if (tick){ clearInterval(tick); tick = null; } paint(); }
  function start(){
    if (left === 0){ left = total; }
    running = true;
    timeEl.setAttribute('aria-live','off');
    tick = setInterval(function(){
      left = Math.max(0, left - 1);
      if (left === 0){ stop(); }
      paint();
    }, 1000);
    paint();
  }
  function setTotal(s){ total = Math.max(30, s); left = total; stop(); }
  function toggle(){
    clock.classList.toggle('show');
    if (clock.classList.contains('show')) startBtn.focus();
  }

  startBtn.addEventListener('click', function(){ running ? stop() : start(); });
  document.getElementById('cReset').addEventListener('click', function(){ left = total; stop(); });
  document.getElementById('cPlus').addEventListener('click', function(){ left += 30; if (!running) total = left; paint(); });
  document.getElementById('cMinus').addEventListener('click', function(){ left = Math.max(0, left - 30); if (!running) total = Math.max(30, left); paint(); });
  document.getElementById('clockBtn').addEventListener('click', toggle);

  document.addEventListener('keydown', function(e){
    var tag = (e.target && e.target.tagName ? e.target.tagName : '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 't' || e.key === 'T'){ e.preventDefault(); toggle(); }
  });

  var obs = new MutationObserver(function(){
    var cur = document.querySelector('.slide.is-current');
    if (!cur || cur === lastSlide) return;
    lastSlide = cur;
    var s = parseInt(cur.getAttribute('data-timer') || '', 10);
    if (s){ setTotal(s); clock.classList.add('show'); }
  });
  Array.prototype.forEach.call(document.querySelectorAll('.slide'), function(s){
    obs.observe(s, { attributes: true, attributeFilter: ['class'] });
  });

  var dragging = false, ox = 0, oy = 0;
  face.addEventListener('pointerdown', function(e){
    if (e.target.closest('button')) return;
    dragging = true;
    var r = clock.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    face.setPointerCapture(e.pointerId);
  });
  face.addEventListener('pointermove', function(e){
    if (!dragging) return;
    clock.style.left = (e.clientX - ox) + 'px'; clock.style.top = (e.clientY - oy) + 'px'; clock.style.right = 'auto';
  });
  face.addEventListener('pointerup', function(){ dragging = false; });

  paint();
})();

/* ---------- click to reveal, Prezi style zoom ---------- */
(function(){
  var HEAD = 'H3,.label,.big,.n,.dot,.srcnote';
  function makeReveal(el){
    var body = document.createElement('div'); body.className = 'rv-body';
    var kids = Array.prototype.slice.call(el.childNodes);
    var movable = kids.filter(function(k){
      if (k.nodeType !== 1) return k.nodeType === 3 && k.textContent.trim() !== '';
      return !k.matches(HEAD);
    });
    if (!movable.length) return;
    movable.forEach(function(k){ body.appendChild(k); });
    el.appendChild(body);
    el.classList.add('rv');
    el.setAttribute('tabindex','0');
    el.setAttribute('role','button');
    el.setAttribute('aria-expanded','false');
  }
  document.querySelectorAll('.slide .row').forEach(function(row){
    var inner = row.querySelector(':scope > div:not(.dot)');
    if (!inner) return;
    var parts = Array.prototype.slice.call(inner.children).filter(function(c){ return c.tagName !== 'H3'; });
    if (!parts.length) return;
    var body = document.createElement('div'); body.className='rv-body';
    parts.forEach(function(c){ body.appendChild(c); });
    inner.appendChild(body);
    row.classList.add('rv'); row.setAttribute('tabindex','0'); row.setAttribute('role','button'); row.setAttribute('aria-expanded','false');
  });
  document.querySelectorAll('.slide .card, .slide .darkpanel').forEach(function(el){
    if (el.closest('.hook')) return;
    makeReveal(el);
  });

  var zoom = document.getElementById('zoom'), zoomBack = document.getElementById('zoomBack'), zoomInner = document.getElementById('zoomInner');
  var zoomClose = document.getElementById('zoomClose');
  var zoomEl = null, lastFocus = null;
  function inPresent(){ return document.body.classList.contains('present'); }
  function placeAt(r){ zoom.style.left=r.left+'px'; zoom.style.top=r.top+'px'; zoom.style.width=r.width+'px'; zoom.style.height=r.height+'px'; }
  function openZoom(el){
    if (zoomEl) { closeZoom(true); }
    zoomEl = el;
    lastFocus = document.activeElement;
    var isDark = !!el.closest('.slide.dark') || el.classList.contains('darkpanel');
    zoom.classList.toggle('dark', isDark);
    zoomInner.innerHTML = el.innerHTML;
    zoomInner.querySelectorAll('[id]').forEach(function(n){ n.removeAttribute('id'); });
    var r = el.getBoundingClientRect();
    zoom.style.transition = 'none'; placeAt(r); zoom.style.opacity = '0';
    zoom.getBoundingClientRect();
    var W = Math.min(window.innerWidth * 0.86, 980);
    zoom.style.width = W + 'px'; zoom.style.height = 'auto';
    var H = Math.min(Math.max(zoomInner.offsetHeight + 20, 240), window.innerHeight * 0.84);
    placeAt(r); zoom.getBoundingClientRect(); zoom.style.transition = '';
    zoom.classList.add('on'); zoomBack.classList.add('on');
    placeAt({left:(window.innerWidth - W)/2, top:(window.innerHeight - H)/2, width:W, height:H});
    zoom.style.opacity = '1';
    el.classList.add('seen','open'); el.setAttribute('aria-expanded','true');
    el.closest('.slide').classList.add('has-open');
    zoomClose.focus();
  }
  function closeZoom(instant){
    if (!zoomEl) return;
    var el = zoomEl; zoomEl = null;
    el.classList.remove('open'); el.setAttribute('aria-expanded','false');
    var s = el.closest('.slide'); s.classList.toggle('has-open', !!s.querySelector('.rv.open'));
    if (instant){ zoom.classList.remove('on'); zoomBack.classList.remove('on'); zoom.style.opacity='0'; }
    else {
      var r = el.getBoundingClientRect(); placeAt(r); zoom.style.opacity = '0';
      zoom.classList.remove('on'); zoomBack.classList.remove('on');
    }
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); } else if (el.focus) { el.focus(); }
    lastFocus = null;
  }
  zoomBack.addEventListener('click', function(){ closeZoom(); });
  zoomClose.addEventListener('click', function(){ closeZoom(); });
  window.__zoomOpen = function(){ return !!zoomEl; };
  window.__zoomClose = function(instant){ closeZoom(instant); };

  /* keep keyboard focus inside the zoom dialog while it is open */
  document.addEventListener('keydown', function(e){
    if (!zoomEl || e.key !== 'Tab') return;
    var f = zoom.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!f.length) { e.preventDefault(); return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    else if (!zoom.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
  }, true);

  function setState(el, open){
    if (inPresent()){
      if (open) openZoom(el); else if (zoomEl === el) closeZoom(); else { el.classList.remove('open'); }
      return;
    }
    el.classList.toggle('open', open);
    if (open) el.classList.add('seen');
    el.setAttribute('aria-expanded', open ? 'true' : 'false');
    var s = el.closest('.slide');
    s.classList.toggle('has-open', !!s.querySelector('.rv.open'));
  }
  document.addEventListener('click', function(e){
    if (zoom.contains(e.target)) return;
    var el = e.target.closest('.rv');
    if (!el) return;
    if (e.target.closest('a,button')) return;
    e.stopPropagation();
    setState(el, !el.classList.contains('open'));
  }, true);
  document.addEventListener('keydown', function(e){
    if (zoom.contains(e.target)) return;
    var el = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.rv') : null;
    if (el && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); e.stopPropagation(); setState(el, !el.classList.contains('open')); }
  }, true);

  window.__rvNext = function(){
    var cur = document.querySelector('.slide.is-current'); if (!cur) return false;
    var next = cur.querySelector('.rv:not(.seen)');
    if (next){ setState(next, true); return true; }
    if (zoomEl){ closeZoom(); return true; }
    return false;
  };
  window.__rvAll = function(open){
    var cur = document.querySelector('.slide.is-current'); if (!cur) return;
    closeZoom(true);
    cur.querySelectorAll('.rv').forEach(function(el){ el.classList.toggle('seen', open); el.classList.remove('open'); el.setAttribute('aria-expanded','false'); });
    cur.classList.remove('has-open');
  };
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && zoomEl){ e.preventDefault(); e.stopPropagation(); closeZoom(); }
  }, true);
  document.addEventListener('keydown', function(e){
    if (!document.body.classList.contains('present')) return;
    var tag = (e.target && e.target.tagName ? e.target.tagName : '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 'a' || e.key === 'A'){ e.preventDefault(); var cur = document.querySelector('.slide.is-current'); var any = cur && cur.querySelector('.rv:not(.seen)'); window.__rvAll(!!any); }
  });
})();

/* ---------- iframe height sender for Kajabi ---------- */
(function(){
  var ID = 'slides-p-introduction-to-physiology';
  function h(){
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight
    );
  }
  function send(){
    try { parent.postMessage({ id: ID, frameId: ID, height: h(), scrollHeight: h() }, '*'); } catch (e) {}
  }
  window.addEventListener('load', send);
  window.addEventListener('resize', send);
  document.addEventListener('click', function(){ setTimeout(send, 320); });
  if (window.ResizeObserver){ new ResizeObserver(send).observe(document.body); }
  setTimeout(send, 400); setTimeout(send, 1200);
  send();
})();
