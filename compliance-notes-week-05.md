# Compliance notes, Week 5

BIO 005 Human Physiology. October 4, 2026. Scope: the Week 5 build, made the same way as Week 4.

## What was checked, and how

Every page below was opened in headless Chromium and checked for script errors and failed requests. None were found.

The six walkthroughs were played step by step in preview mode, and every step finished playing. They were also checked without preview mode: Show me stays locked until a prediction is typed, and Next stays locked until Show me is pressed. The topic menu unlocks at the last step. A reduced motion pass was run on all six. Each one is built on the Week 4 graded potentials shell, so the skip link, focus ring, heading focus on each step, live region for the figure description, worksheet, PDF export and print view are the same code as Week 4.

Every link on every new or changed page was checked against the repo. All of them resolve.

No page contains italics, an em dash, or the Lora font.

## Known limits

1. No support videos. Khan Academy could not be reached from the build environment on October 4, so no video could be verified. The template says to leave a button out rather than ship one that might break, so the Week 5 walkthroughs have no Stuck? buttons and the lessons page has no Watch the videos links.
2. The notes PDFs and the pre-read PDF were printed from Chromium, not through tools/make_pdf.py, because weasyprint could not be installed here. They are not tagged PDF/UA. Rerunning `python3 tools/make_notes_pdf.py 5` and adding the pre-read to the JOBS list in make_pdf.py on a machine with weasyprint will replace them with tagged versions.
3. No hand screen reader pass with NVDA or VoiceOver. Automated checks only, the same as Week 4.
4. The figures use three new tints for tissue and fluid, declared once in tools/walkthroughs/w05-kit.js. They are fills only and never carry text.
5. The Week 5 lab page, lab-week05-sensory-reflex.html, was not changed. It has no tendon reflex grading test, and it includes an orthostatic test that belongs with the autonomic material, now Week 7.

Dr. Sharilyn Rennie
