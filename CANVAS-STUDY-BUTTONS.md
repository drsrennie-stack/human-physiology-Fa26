# Canvas paste blocks: study activity buttons

Built September 15, 2026. Source page: `study-buttons.html`.

Four practice activities, renamed for physiology. Nothing connects to Mastery OS, nothing reads state, and none of them is graded, so a card can sit on any page in any module without breaking.

Every card opens in a new browser tab. Rx Cards and Brain Dump keep score, and browsers block that storage inside a Canvas iframe, so a new tab is the only way their progress survives.

---

## Option A. The whole page as an iframe

Use this when you want all four on one Canvas page. Paste in the HTML editor.

```html
<iframe id="bio005-study-buttons" src="https://drsrennie-stack.github.io/human-physiology-Fa26/study-buttons.html"
        title="Four ways to practice" width="100%" height="1420"
        style="width:100%;border:0;overflow:hidden" scrolling="no"
        loading="lazy"></iframe>
```

The page sends its own height, so Canvas resizes it. The 1420 is only the fallback before the first message arrives.

---

## Option B. One card, pasted straight onto a page

No iframe. These are plain inline styled links, so they survive the Canvas editor and they stay readable on a phone. Paste one into the HTML editor wherever you want the button to sit.

### Rx Cards

Goes to `rx-cards.html`.

```html
<a href="https://drsrennie-stack.github.io/human-physiology-Fa26/rx-cards.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#7E93B8;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M7 9.5h8M7 13h5"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#7E93B8;line-height:1.15;margin:0 0 9px">Rx Cards</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">Spaced cards</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">The ones you miss come back tomorrow. The ones you know come back later.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">12 min</span><span class="screenreader-only">, opens in a new tab</span></a>
```

### Brain Dump

Goes to `competency-brain-dump.html`.

```html
<a href="https://drsrennie-stack.github.io/human-physiology-Fa26/competency-brain-dump.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#C9A14A;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M13.5 3.5 20.5 10.5 9 22H3v-6z"/><path d="M11.5 5.5 18.5 12.5"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#E3C87E;line-height:1.15;margin:0 0 9px">Brain Dump</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">From memory, then check</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">Spin a prompt, draw it on paper with nothing open, then tick off what you left out.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">20 min</span><span class="screenreader-only">, opens in a new tab</span></a>
```

### Book Problems

Goes to `assignment-bookproblems.html`.

```html
<a href="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-bookproblems.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#C9A14A;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3.5 4.5h6a3 3 0 0 1 2.5 1.4A3 3 0 0 1 14.5 4.5h6v13h-6a3 3 0 0 0-2.5 1.4A3 3 0 0 0 9.5 17.5h-6z"/><path d="M12 5.9v13"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#E3C87E;line-height:1.15;margin:0 0 9px">Book Problems</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">Work it, then work it backward</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">Try it before you look. Then start from the answer and see how the author got there.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">15 min</span><span class="screenreader-only">, opens in a new tab</span></a>
```

### Study With Me

Goes to `study-with-me.html`.

```html
<a href="https://drsrennie-stack.github.io/human-physiology-Fa26/study-with-me.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#C9A14A;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8" r="3.2"/><circle cx="16.5" cy="9.5" r="2.6"/><path d="M3 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M15 14.8c3 .2 5 2.1 5 4.7"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#E3C87E;line-height:1.15;margin:0 0 9px">Study With Me</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">Out loud, no notes</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">Saying it to another person is the fastest way to find what is still missing.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">8 min</span><span class="screenreader-only">, opens in a new tab</span></a>
```

---

## Option C. All four in a row, no iframe

Wraps to two, then one, as the screen narrows.

```html
<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:stretch"><div style="flex:1 1 240px;display:flex;justify-content:center"><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/rx-cards.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#7E93B8;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M7 9.5h8M7 13h5"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#7E93B8;line-height:1.15;margin:0 0 9px">Rx Cards</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">Spaced cards</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">The ones you miss come back tomorrow. The ones you know come back later.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">12 min</span><span class="screenreader-only">, opens in a new tab</span></a></div><div style="flex:1 1 240px;display:flex;justify-content:center"><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/competency-brain-dump.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#C9A14A;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M13.5 3.5 20.5 10.5 9 22H3v-6z"/><path d="M11.5 5.5 18.5 12.5"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#E3C87E;line-height:1.15;margin:0 0 9px">Brain Dump</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">From memory, then check</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">Spin a prompt, draw it on paper with nothing open, then tick off what you left out.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">20 min</span><span class="screenreader-only">, opens in a new tab</span></a></div><div style="flex:1 1 240px;display:flex;justify-content:center"><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-bookproblems.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#C9A14A;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3.5 4.5h6a3 3 0 0 1 2.5 1.4A3 3 0 0 1 14.5 4.5h6v13h-6a3 3 0 0 0-2.5 1.4A3 3 0 0 0 9.5 17.5h-6z"/><path d="M12 5.9v13"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#E3C87E;line-height:1.15;margin:0 0 9px">Book Problems</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">Work it, then work it backward</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">Try it before you look. Then start from the answer and see how the author got there.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">15 min</span><span class="screenreader-only">, opens in a new tab</span></a></div><div style="flex:1 1 240px;display:flex;justify-content:center"><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/study-with-me.html" target="_blank" rel="noopener" style="display:block;box-sizing:border-box;width:100%;max-width:320px;text-align:center;background:#101B35;border:2px solid #101B35;border-radius:20px;padding:30px 22px 26px;text-decoration:none;font-family:'Open Sans','Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif"><span style="width:74px;height:74px;border-radius:19px;display:flex;align-items:center;justify-content:center;background:#C9A14A;color:#0B1530;margin:0 auto 20px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8" r="3.2"/><circle cx="16.5" cy="9.5" r="2.6"/><path d="M3 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M15 14.8c3 .2 5 2.1 5 4.7"/></svg></span><span style="display:block;font-size:22px;font-weight:800;letter-spacing:-.01em;color:#E3C87E;line-height:1.15;margin:0 0 9px">Study With Me</span><span style="display:block;color:#FFFFFF;font-size:15.5px;line-height:1.45;margin:0 0 11px">Out loud, no notes</span><span style="display:block;color:#D9DEE8;font-size:14.5px;line-height:1.5;margin:0 0 18px">Saying it to another person is the fastest way to find what is still missing.</span><span style="display:block;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C9A14A">8 min</span><span class="screenreader-only">, opens in a new tab</span></a></div></div>
```

---

## Option D. The rendered PNG as the button

If you would rather drop in the picture: upload the PNG to Canvas Files, insert it on the page, then switch to the HTML editor and wrap it in the link below. Replace the placeholder with the file URL Canvas gives the image.

The alt text matters. A bare image link reads as the filename to a screen reader, which tells a student nothing.

**Rx Cards**

```html
<p><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/rx-cards.html" target="_blank" rel="noopener"><img src="PASTE_YOUR_CANVAS_FILE_URL_HERE/button-rx-cards.png" alt="Rx Cards. Spaced cards. Opens in a new tab." style="max-width:320px;height:auto;border:0"></a></p>
```

**Brain Dump**

```html
<p><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/competency-brain-dump.html" target="_blank" rel="noopener"><img src="PASTE_YOUR_CANVAS_FILE_URL_HERE/button-brain-dump.png" alt="Brain Dump. From memory, then check. Opens in a new tab." style="max-width:320px;height:auto;border:0"></a></p>
```

**Book Problems**

```html
<p><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-bookproblems.html" target="_blank" rel="noopener"><img src="PASTE_YOUR_CANVAS_FILE_URL_HERE/button-book-problems.png" alt="Book Problems. Work it, then work it backward. Opens in a new tab." style="max-width:320px;height:auto;border:0"></a></p>
```

**Study With Me**

```html
<p><a href="https://drsrennie-stack.github.io/human-physiology-Fa26/study-with-me.html" target="_blank" rel="noopener"><img src="PASTE_YOUR_CANVAS_FILE_URL_HERE/button-study-with-me.png" alt="Study With Me. Out loud, no notes. Opens in a new tab." style="max-width:320px;height:auto;border:0"></a></p>
```

PNG files in the drop:

- `button-rx-cards.png`, the Rx Cards card on its own
- `button-brain-dump.png`, the Brain Dump card on its own
- `button-book-problems.png`, the Book Problems card on its own
- `button-study-with-me.png`, the Study With Me card on its own
- `button-all-four.png`, all four together

---

## Back to modules

The standalone page already carries a Back to Canvas modules button pointing at

```
https://yccd.instructure.com/courses/42616/modules
```

The single cards in Option B and Option C do not, on purpose. They sit on a Canvas page, so the student is already in Canvas.
