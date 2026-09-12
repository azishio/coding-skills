# Coding Skills

[English](README.md) | [日本語](ja.md)

Coding Skills maintains and publishes agent skills and a plugin for Claude Code
and Codex. Installable skills live in [`skills/`](skills/), and the plugin
manifests and lifecycle hooks turn the repository root into an installable
plugin. This README and the repository's GitHub Actions contain maintainer
documentation and automation procedures.

## Included skills

### `write-idiomatic-rust`

Use this skill to implement, modify, review, and refactor Rust code while
holding public APIs and internal implementations to the same quality bar. It
routes relevant decisions to Rust API Guidelines, Microsoft Pragmatic Rust
Guidelines, and Rust Design Patterns, covering naming, function and method
placement, types, ownership, error design, readability, and predictability.
The strict Clippy runner complements rather than replaces a project's own
Clippy command.

Reference routing assigns a primary guide to each design decision and opens
secondary material only for unresolved questions. Vendored references remain
complete and are read selectively.

The dependency selection guide prioritizes total maintenance cost over dependency
count. Check the standard library and existing dependencies, then investigate
suitable maintained crates before rebuilding general-purpose infrastructure.
Its candidate guide groups first choices and adoption conditions by common code,
data and configuration, applications and async, procedural macros, and tests.
It includes iterator and enum utilities, trait derives, Serde adapters, and
tools for project-owned macros and tests; it is not an allowlist. Keep small
domain-specific logic local when appropriate. Before adopting a crate, select a
compatible version and verify its documentation against the project's API,
features, MSRV, and related dependencies.

### `anti-overengineering`

Use this skill family to keep every change as small as it can correctly be.
The core skill is a simplified fork of the `ultra` intensity of
[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail), reduced
to a single always-on ruleset: before writing code, stop at the first rung that
holds (does it need to exist, does the codebase already have it, does the
standard library or the platform cover it, does an installed dependency solve
it, does a mature library cover it after investigation, can it be one line),
then write the minimum that works. It follows the project's and framework's
conventions, runs one library per job, and never simplifies away validation
at trust boundaries, error handling that prevents data loss, security,
accessibility, or understanding the problem before editing.

When installed as a plugin, [`hooks/hooks.json`](hooks/hooks.json) injects the
core skill at `SessionStart` and into every subagent at `SubagentStart`. There
are no intensity levels, toggles, or state files. Deliberate shortcuts are
marked with an `anti-overengineering:` comment naming the ceiling and the
upgrade path.

Companion skills: `anti-overengineering-review` (over-engineering review of
the whole codebase by default, or of the scope named in the request),
`anti-overengineering-debt` (ledger of `anti-overengineering:` comments),
`anti-overengineering-gain` (upstream benchmark scoreboard), and
`anti-overengineering-help` (quick reference). They rely on the core rules
being in context and do not restate them.

## Setup

### Claude Code plugin

```
/plugin marketplace add azishio/coding-skills
```
```
/plugin install coding-skills@coding-skills
```

Send the two commands as separate prompts, then run `/reload-plugins`. Skills
are namespaced as `/coding-skills:<skill>`. The hooks run `node`, so it must be
on the PATH of a non-interactive shell; without it the skills still work and
the always-on rules stay silent.

### Codex plugin

```bash
codex plugin marketplace add azishio/coding-skills
codex plugin add coding-skills@coding-skills
```

Run `codex`, open `/hooks`, review and trust the two lifecycle hooks, and start
a new thread. Skills are invoked as `$<skill>`.

### Skills only

```bash
npx skills add azishio/coding-skills --skill write-idiomatic-rust
npx skills add azishio/coding-skills --skill anti-overengineering
```

The `skills` CLI discovers each skill under `skills/` and installs all of its
tracked support files, including the required reference material. Use `--global`
to install it for every project, `--agent <agent>` to target a specific agent,
and `--copy` where symlinks are unsuitable. This path installs skill files
only; the always-on hooks require the plugin install above.

## Maintainer setup

Clone the repository normally. The tracked reference files are ready for local
validation and are included in every `skills add` installation. Run
`node --test hooks/` to check the hook, the plugin manifests, and the skill
names.

## Updating references

GitHub Actions vendors the required `src/` directories and license texts from
Rust API Guidelines, Microsoft Pragmatic Rust Guidelines, and Rust Design
Patterns every Monday. When changes exist, it records the exact source commits
in [`reference-sources.json`](reference-sources.json), then commits and pushes
them automatically. Use workflow dispatch for an intentional manual refresh.

## Layout

- `skills/`: distributable agent skills, each containing only execution
  instructions, agent reference material, and helper scripts.
- `hooks/`: the stateless rule-injection hook, its configuration, and its test.
- `.claude-plugin/`, `.codex-plugin/`, `.agents/plugins/`: plugin and
  marketplace manifests for Claude Code and Codex.
- `.github/workflows/update-references.yml`: weekly reference update automation.
- `.github/workflows/test.yml`: hook and manifest tests.
- `README.md` and `ja.md`: maintainer and user documentation in English and
  Japanese.

## License

Files authored for this repository are dual-licensed under either the
[MIT License](LICENSE-MIT) or the [Apache License, Version 2.0](LICENSE-APACHE),
at the recipient's option. Unless explicitly stated otherwise, contributions are
accepted under the same terms.

The vendored references under `skills/write-idiomatic-rust/references/` are
independent upstream projects and are not covered by these licenses. The
`anti-overengineering` skills and `hooks/` are a modified derivative of
ponytail (MIT); its notice is retained at
[`skills/anti-overengineering/LICENSE-ponytail`](skills/anti-overengineering/LICENSE-ponytail).
See [Third-party notices](THIRD_PARTY_NOTICES.md) and the license texts
retained beside each reference before redistributing them.

## Upstream references

- `rust-lang/api-guidelines` (`master`): Rust API Guidelines; Apache-2.0 OR MIT.
- `microsoft/rust-guidelines` (`main`): Pragmatic Rust Guidelines; MIT.
- `rust-unofficial/patterns` (`main`): Rust Design Patterns; MPL-2.0.
- `DietrichGebert/ponytail` (v4.9.0): origin of the `anti-overengineering`
  skills and hooks; MIT. Forked and modified rather than vendored.

The exact vendored revision, source, license, and included paths are recorded
in [`reference-sources.json`](reference-sources.json).
