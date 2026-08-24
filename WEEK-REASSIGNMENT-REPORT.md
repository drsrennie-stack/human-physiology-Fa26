# BIO 005 week reassignment report

Decision of record, Aug 24 2026: **keep 268, keep every id, merge nothing.** Only the week assignment changes, onto the order adopted Aug 23.

## Totals

| | |
|---|---|
| Competencies in | 268 |
| Competencies out | 268 |
| **Moved to a different week** | **209** |
| Stayed in the same week | 59 |
| Competency ids changed | **0** |
| Cards needing a re-tag | **0** |
| Total study minutes | 6445 (107 hours) |

Because no id changed, `os/card-competency-map.js` is unchanged and every card keeps the competency it proves. Card `week` fields are derived from this file by `tools/assemble_bank.py`, so they follow on the next assemble.

## Competencies per week

| Week | Title | Competencies |
|---|---|---|
| 1 | How physiology works and what keeps you steady | 12 |
| 2 | The chemistry that does work in the body | 7 |
| 3 | Getting across the membrane | 16 |
| 4 | The action potential | 29 |
| 5 | The nervous system, from sensing to moving | 35  **heaviest week** |
| 6 | How muscle makes force | 20 |
| 7 | Hormones, the slow control system | 18 |
| 8 | Reproduction, and the clearest positive feedback loop | 7 |
| 9 | The heart as a pump | 17 |
| 10 | Pressure, flow, and holding blood pressure steady | 13 |
| 11 | Blood, and how the body defends itself | 19 |
| 12 | Digestion, and how you use food for fuel | 23 |
| 13 | Breathing, gas transport, and blood pH | 24 |
| 14 | The kidney, and body fluid balance | 21 |
| 15 | The slow lever on pH, and putting it all together | 7 |

## The one thing to look at

**Week 5 carries 35 competencies, and Weeks 4 and 5 carry 64 between them.** The average week is 18.

That is the direct cost of not merging the sensory competencies. The Aug 23 sensory shrink, eighteen down to eight, existed specifically to relieve this block, because Weeks 4 and 5 now hold what four weeks used to hold: neurons, action potentials, synapses, reflexes, sensory, special senses, motor, and autonomic.

You have chosen to keep all eighteen, which is a defensible call. It is worth knowing that it is the reason Week 5 is the heaviest week in the course by a wide margin, and worth deciding now rather than in October whether Week 5 gets a lighter workbook to compensate.

One lever if it needs relieving later, and it does not require touching any id: move the six membrane potential competencies from Week 4 back to Week 3. That gives Week 3 twenty two and Week 4 twenty three.

## Ids that no longer match their week

209 of the 268 ids carry a prefix that disagrees with the week they are now taught in. This is expected and harmless as long as nothing parses the prefix. Read the `week` field.
