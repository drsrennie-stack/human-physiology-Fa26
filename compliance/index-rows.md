# Rows and edits for `compliance/index.md`

Five new documents shipped on August 23, 2026, one per slide deck. This file holds the rows to paste into the table on the index page, and the two places the index's own prose is no longer accurate.

## 1. Rows for the table under "What exists, and where it stands"

Paste these after the `week-01-foundations.compliance.md` row.

| Week 1 slide deck, Quantitative Skills for Physiology | `quantitative-skills.compliance.md` | Aug 23, 2026 | Aug 23, 2026 | AA met, AAA on every text pair |
| Week 1 slide deck, Chemical Foundations | `chemical-foundations.compliance.md` | Aug 23, 2026 | Aug 23, 2026 | AA met, AAA on every text pair |
| Week 2 slide deck, Membrane Structure and Diffusion | `membrane-structure-and-diffusion.compliance.md` | Aug 23, 2026 | Aug 23, 2026 | AA met, AAA on every text pair |
| Week 2 slide deck, Membrane Transport | `membrane-transport.compliance.md` | Aug 23, 2026 | Aug 23, 2026 | AA met, AAA on every text pair |
| Week 2 slide deck, Membrane Potential | `membrane-potential.compliance.md` | Aug 23, 2026 | Aug 23, 2026 | AA met, AAA on every text pair |

Note on the Status column. Every existing row reads "AA met, AAA on every text pair but one". These five read "AA met, AAA on every text pair", with no exception, and the difference is deliberate rather than a typo. See section 2 below.

The table also now carries two kinds of thing: lab tools and lecture decks. If that becomes confusing, the fix is a second table rather than a longer Deliverable column.

One more row is missing from the index and is not mine to write: the existing `slides-p-introduction-to-physiology.html` deck has no compliance document at all, and section 3 below is a finding against it.

## 2. The section headed "The one exception that runs through all of them" is no longer true of all of them

The section currently says that every document in the folder reports the same single AAA shortfall, the gold eyebrow on the maroon header at 5.75:1. That was true of every document until these five. The decks use `#FBEBC8` on `#8B1D1D`, which measures 7.78:1 and meets AAA. It is the same signal, gold on maroon, at a lighter gold, so the course's visual identity is unchanged.

Suggested replacement for that section:

> ## The exception, and where it has been closed
>
> The lab manual, week 1 and week 13 all report the same single AAA shortfall: the gold eyebrow text on the maroon header reaches 5.75:1, which meets AA but not the 7:1 AAA threshold. It is small display text and the gold on maroon pairing is the course's visual signal.
>
> The five slide decks built on August 23, 2026 close it. They use a lighter gold, `#FBEBC8` on `#8B1D1D`, which measures 7.78:1 and meets AAA while keeping the same signal. Every text pair in those decks reaches AAA.
>
> That gives the remaining three documents a remediation that is now proven rather than theoretical: move the eyebrow to `#FBEBC8`. It costs one token and nothing else. Until that is done, the shortfall is recorded the same way in each of those three documents so it cannot be quietly lost.

## 3. The standing decision "Every page works offline" is not true of one existing page

The index says, under standing decisions: "No web fonts, no CDN, no external requests of any kind."

That holds for the five new decks. Each was loaded with request interception and made zero external requests; the four font faces, DM Sans 400 and 700 and Plus Jakarta Sans 600 and 800, are inlined as base64 woff2 inside each file, the same way `week-01.html` does it.

It does not hold for the existing `slides-p-introduction-to-physiology.html`, which links `fonts.googleapis.com` for Plus Jakarta Sans. That page makes a request to a third party, and it renders in a fallback face offline, behind a campus proxy, or on a network that blocks Google. The claim on the index page currently covers it and should not.

Suggested addition to that paragraph, until the deck is fixed:

> **Every page works offline, with one open exception.** No web fonts, no CDN, no external requests of any kind. A student on a poor connection, behind a campus proxy, or working from a phone hotspot gets the identical page. The exception is `slides-p-introduction-to-physiology.html`, which still links `fonts.googleapis.com`. The fix is the one already used by the five week 1 and week 2 decks: inline the four font faces and drop the link. Recorded here because the claim is made here.

The finding is written up in full in the known limitations of `quantitative-skills.compliance.md`.

## 4. One more carry over defect worth a line in the index's known limitations

The gold label token `#6B5214` fails AAA once a card is marked opened, because the card's background changes to `#EDF1F3` and the ratio drops from 7.39:1 to 6.50:1. The five new decks caught it by sweeping contrast in three interaction states rather than one, and moved to `#5A4511`. The existing Introduction to Physiology deck still ships `#6B5214`.

Suggested new item under "Known limitations across the course":

> 5. **A state dependent contrast defect exists in one shipped page.** `slides-p-introduction-to-physiology.html` uses `#6B5214` for its gold card label. That passes AAA on a white card at 7.39:1 and fails at 6.50:1 once the card is marked opened and its background becomes `#EDF1F3`. A single pass contrast sweep does not catch this. Sweeping in three interaction states, at rest, marked opened, and open, does, and that is now the method. The fix is `#5A4511`, which holds 8.05:1 on the opened card and 9.15:1 on white.

## 5. Two smaller updates

- **Last updated** at the top of the index should move to August 23, 2026, if it has not already.
- The known limitation reading "Eleven weeks are unbuilt" concerns the lab tools and is unaffected by these decks. The decks are lecture material for weeks 1 and 2 and do not build any week's lab tool.
