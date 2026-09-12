---
name: anti-overengineering-gain
description: >
  Show the measured impact of the upstream ruleset this skill derives from, as
  a compact scoreboard: less code, less cost, more speed. One-shot display,
  not a persistent mode, and not a per-repo number. Trigger:
  /anti-overengineering-gain, "anti-overengineering gain", "what does
  anti-overengineering save", "show anti-overengineering impact".
---

# Anti-overengineering Gain

Display this scoreboard when invoked. One-shot: change nothing and persist
nothing.

The figures are NOT measured in this repository and NOT measured for this
skill. They are the published benchmark results of the upstream project this
skill is derived from, [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)
v4.9.0, which measured its default `full` intensity. This skill ships the
stricter `ultra` behavior, so treat the numbers as an indication of the
ruleset family, not of this exact skill.

## Scoreboard

Render plain text. The label carries the exact figure:

```
  anti-overengineering gain        upstream ponytail benchmark · not measured here

  Agentic run (Haiku 4.5, 12 feature tasks, n=4, vs the same agent with no skill)
  Lines of code   ▼ 54% mean, up to 94% where a native feature replaces a component
  Tokens          ▼ 22%
  Cost            ▼ 20%
  Time            ▼ 27%
  Safety          100%, no validation, error handling, security, or accessibility cut

  Single-shot medians (5 tasks, 3 models)
  Lines of code   ▼ 80–94%, partly a conversational-baseline artifact per upstream
  Cost            ▼ 47–77%
  Speed           ▸ 3–6× faster

  This repo:  /anti-overengineering-debt  (shortcuts you deferred)
              /anti-overengineering-audit (what's still cuttable)
```

Source: https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md

## Honesty boundary

These are upstream benchmark figures, not this repo. NEVER print a per-repo
savings number ("you saved X lines/tokens here"): the unbuilt version was never
written, so there is no real baseline to subtract from in a live repo. The
only real per-repo figures come from `/anti-overengineering-debt` (a counted
ledger), and this card points there instead of inventing one.

## Boundaries

One-shot display. Edits nothing, changes no mode.
