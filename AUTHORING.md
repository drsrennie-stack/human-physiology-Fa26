# BIO 005 Human Physiology, card authoring brief

You are writing multiple-choice recall cards for **BIO 005 Human Physiology**,
Yuba College, Fall 2026. Fully asynchronous online, lecture and lab. Majors
level, first year, one semester combined lecture and lab. Instructor is
Dr. Sharilyn Rennie.

The cards run inside a spaced-recall engine. A student rates their confidence
**before** the options appear, then answers, then reads the explanation. Both
signals feed the spacing algorithm and the red-flag detection, which is why
distractor quality matters so much: a card a student can eliminate by format
teaches nothing and pollutes the confidence data.

---

## What you are given

Your brief is a JSON file at `out/briefs/topic/<topicId>.json`. It holds:

- `topicId`, `topicTitle` — the chapter these cards belong to
- `competencies[]` — one entry per competency, each with
  - `competencyId` — **stamp this on every card you write for it**
  - `name` and `can` — the competency and its "you should be able to" statement.
    **The `can` statement is the source of truth.** Write cards that make a
    student able to do exactly what it says, no more and no less.
  - `cards.total`, `cards.dok1`, `cards.dok2`, `cards.dok3` — exact counts
  - `tags` — copy verbatim onto every card for that competency
  - `labOnly` — true when the competency is a lab task rather than lecture

Write **exactly** the number of cards asked for at each DOK level. The totals
are what add up to the course deck.

---

## Scope

This is **physiology**. Mechanism, regulation, prediction, calculation, and
tracing a pathway. Structure appears only where the structure explains the
function. Do not write pure identification cards ("which layer is outermost"):
those belong to anatomy and are out of scope for this course.

**There is no DOK 4.** Transfer at that depth is clinical medicine. Do not write
differential diagnosis, drug dosing, management decisions, or "what would you
order" cards. Clinical *context* is welcome and encouraged, clinical
*decision-making* is not.

---

## The three levels

The engine gates these: a student meets DOK 1 first, and DOK 2 opens only once
DOK 1 is holding. So the levels have to be genuinely different in depth, not
three phrasings of the same question.

**DOK 1, recall.** One retrieved fact. A definition, a normal value, a name, a
classification, which ion, which direction, which cell.
> "Which ion is at higher concentration inside the cell than outside?"

**DOK 2, apply.** One reasoning step from a fact. Predict a direction, classify
a described case, match a mechanism to a result, do a one-step calculation.
> "Extracellular K+ rises from 4 to 6 mEq/L. Which way does the resting
> membrane potential move?"

**DOK 3, analyze.** A short scenario with two or three linked steps, a
multi-variable prediction, reading a described tracing or curve, or working
back from a result to a cause.
> "A drug blocks the Na+/K+ ATPase. Predict what happens to the sodium gradient
> and then to SGLT-driven glucose uptake in the proximal tubule."

Keep DOK 3 inside first-year physiology. A scenario, not a case presentation.

---

## Writing the question

- One idea per card. Two-part questions become two cards.
- Self-contained. The student has no figure open.
- Plain language around precise terminology. The vocabulary being tested is the
  content; the sentence carrying it should be easy to read.
- Give numbers when the competency is quantitative, and keep the arithmetic
  clean enough to do in your head or on scratch paper.

## Writing the four options

Hardest and most important part.

- **Target a real misconception.** The best distractor is what a student who
  half-learned it would actually pick. Osmolarity vs tonicity. Afferent vs
  efferent arteriole. Depolarization vs hyperpolarization. Symport vs antiport.
  Bohr vs Haldane. Preload vs afterload. If two things are confusable, that
  confusion is your distractor set.
- **Same category, same grain.** All four are ions, or all four are directions,
  or all four are mechanisms. Mixed categories give it away.
- **Same length, roughly.** A long option reads as the careful correct one.
- **Three different wrong ideas**, not three rewordings of one.
- **Never silly.** No joke options, no "none of the above", no "both A and B"
  (the engine shuffles option order, so position-referencing options break).

Test: read the four options without the question. You should not be able to
pick the answer from format alone.

## Writing the explanation

Two to four sentences. It must (1) say why the key is right, with the
reasoning, not a restatement, and (2) say why each wrong option is wrong,
naming the distinguishing feature. Warm and instructive, never scolding. A good
explanation teaches all four options from one card.

Where a wrong option would be correct under different conditions, say so. That
is often the most useful sentence on the card.

---

## Hard style rules

These are course-wide and a validator enforces them.

- **No em dashes and no en dashes anywhere.** Use commas, periods, parentheses,
  or reword.
- No credential suffixes. Never ", ND" or ", MD" after a name.
- Ions and chemistry in plain ASCII: `Na+`, `K+`, `Ca2+`, `Cl-`, `HCO3-`,
  `H+`, `PO2`, `PCO2`. Write `37 C`, not a degree symbol. Spell out Greek
  letters (alpha, beta, delta).
- Units spelled the way a physiology text writes them: mmHg, mOsm/L, mEq/L,
  L/min, mL, mV, ms.
- No placeholder text. No "TODO", "TBD", "to be customized".
- Plain ASCII throughout. No smart quotes, no arrows, no unicode symbols.
- Student-facing voice: clear, direct, like a professor explaining it, not like
  a chatbot. No filler, no motivational language.

---

## Output

Write one JSON file to `cards/<topicId>.json`. Shape:

```json
{
  "topicId": "t-membrane-transport",
  "cards": [
    {
      "id": "c1",
      "dok": 1,
      "competencyId": "w2-primary-active-transport",
      "tags": ["lecture", "lab"],
      "q": "How many sodium ions does the Na+/K+ ATPase move out of the cell per cycle?",
      "a": "Three.",
      "options": ["Two", "Three", "Four", "One"],
      "correctIndex": 1,
      "explanation": "Each cycle exports three Na+ and imports two K+, which is why the pump is electrogenic and moves net positive charge out. Two is the number of K+ brought in, not the Na+ sent out. Four and one do not match the stoichiometry of the pump and would not produce the observed charge separation."
    }
  ]
}
```

Rules for the output:

- `id` is `c1`, `c2`, `c3` ... unique within the file, numbered straight
  through the whole topic (do not restart per competency).
- Order the cards **grouped by competency, DOK 1 first, then 2, then 3** inside
  each competency.
- `options` is exactly four strings. `correctIndex` is 0 to 3 and must point at
  the correct entry as you wrote the array.
- **Spread `correctIndex` roughly evenly across 0, 1, 2 and 3.** Do not park the
  answer in one position.
- `competencyId` and `tags` copied exactly from the brief.
- Valid JSON, UTF-8, no trailing commas.

## Before you report back

Check your own file:

1. It parses as JSON.
2. Card count per competency and per DOK level matches the brief exactly.
3. Every card has all eight fields, four options, `correctIndex` in 0 to 3.
4. No em dash or en dash anywhere. Search for both.
5. `correctIndex` is spread across all four positions.
6. No two cards in the file ask the same question.

Then report: the file path, the total card count, the per-DOK counts, and
anything in the brief you could not cover honestly.

---

## Coverage, added Aug 22

Two things get checked on every chapter now.

**Hit every clause of the `can` statement.** A competency that says "define
X, state Y, and distinguish X from Z" is three obligations, not one. Walk the
statement clause by clause and make sure each one has cards on it. The
highest-value cards in the whole bank are the ones on the distinction a
student is most likely to collapse.

**Weight toward the sub-topics that carry the course.** Inside a competency,
spend the DOK 1 allocation on the terms and values the rest of the course
depends on, not on the incidental detail. If a term reappears in a later
module, it is worth a card. If it appears once and never again, it probably
is not.

`yield` on each competency tells you how hard the whole competency is
working: `core` means the exams are built from it, `high` means it matters,
`support` means it earns its place if there is time. The card counts already
reflect that, so you do not need to adjust for it. What you do need to do is
make sure the `core` competencies get your best distractors.
