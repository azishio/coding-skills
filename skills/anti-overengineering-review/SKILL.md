---
name: anti-overengineering-review
description: >
  Review focused exclusively on over-engineering. Scans the whole codebase by
  default, or only the scope the request names (a diff, staged changes, a PR,
  files, a module). Finds what to delete: reinvented standard library,
  unneeded dependencies, speculative abstractions, dead flexibility. One line
  per finding: location, what to cut, what replaces it. Use when the user says
  "review for over-engineering", "what can we delete", "is this
  over-engineered", "simplify review", "audit this codebase", "find bloat", or
  invokes /anti-overengineering-review. Complements correctness-focused
  review, this one only hunts complexity. One-shot report, does not apply
  fixes.
---

Review for unnecessary complexity. One line per finding: location, what to
cut, what replaces it. The code's best outcome is getting shorter.

## Scope

Default: the whole tree. If the request names a scope (this diff, staged
changes, a PR, these files, this module), review only that.

## Format

`<file>:L<line>: <tag> <what>. <replacement>.`, ranked biggest cut first.

## Tags

- `delete:` dead code, unused flexibility, speculative feature. Replacement: nothing.
- `stdlib:` hand-rolled thing the standard library ships. Name the function.
- `native:` dependency or code doing what the platform already does. Name the feature.
- `yagni:` abstraction with one implementation, config nobody sets, layer with one caller.
- `shrink:` same logic, fewer lines. Show the shorter form.

## Hunt

Deps the stdlib or platform already ships, single-implementation interfaces,
factories with one product, wrappers that only delegate, files exporting one
thing, dead flags and config, hand-rolled stdlib.

## Examples

❌ "This EmailValidator class might be more complex than necessary, have you
considered whether all these validation rules are needed at this stage?"

✅ `validators.py:L12-38: stdlib: 27-line validator class. "@" in email, 1 line, real validation is the confirmation mail.`

✅ `dates.js:L4: native: moment.js imported for one format call. Intl.DateTimeFormat, 0 deps.`

✅ `repo.py:L88: yagni: AbstractRepository with one implementation. Inline it until a second one exists.`

✅ `client.py:L52-71: delete: retry wrapper around an idempotent local call. Nothing replaces it.`

✅ `mapping.py:L30-44: shrink: manual loop builds dict. dict(zip(keys, values)), 1 line.`

## Scoring

End with the only metric that matters: `net: -<N> lines, -<M> deps possible.`

If there is nothing to cut, say `Lean already. Ship.` and stop.

## Boundaries

Scope: over-engineering and complexity only. Correctness bugs, security holes,
and performance are explicitly out of scope. Route them to a normal review
pass, not this one. A single smoke test or `assert`-based self-check is the
anti-overengineering minimum, not bloat, never flag it for deletion.
Lists findings, applies nothing. One-shot.
