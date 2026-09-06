# Rust Skills

[English](README.md) | [日本語](ja.md)

Rust Skills maintains and publishes Codex skills for Rust. Installable skills live
in [`skills/`](skills/); this README and the repository's GitHub Actions contain
maintainer documentation and automation procedures.

## Included skill

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
Its shortlist covers recurring needs such as serialization, CLI parsing,
validation, builders, and async utilities; it is not an allowlist. Keep small
domain-specific logic local when appropriate. Before adopting a crate, verify
its current release and selected-version documentation against the project's
API, features, MSRV, and compatibility requirements.

## Setup

```bash
npx skills add azishio/rust-skills --skill write-idiomatic-rust
```

The `skills` CLI discovers the skill under `skills/` and installs all of its
tracked support files, including the required reference material. Use `--global`
to install it for every project, `--agent <agent>` to target a specific agent,
and `--copy` where symlinks are unsuitable.

## Maintainer setup

Clone the repository normally. The tracked reference files are ready for local
validation and are included in every `skills add` installation.

## Updating references

GitHub Actions vendors the required `src/` directories and license texts from
Rust API Guidelines, Microsoft Pragmatic Rust Guidelines, and Rust Design
Patterns every Monday. When changes exist, it records the exact source commits
in [`reference-sources.json`](reference-sources.json), then commits and pushes
them automatically. Use workflow dispatch for an intentional manual refresh.

## Layout

- `skills/`: distributable agent skills, each containing only execution
  instructions, agent reference material, and helper scripts.
- `.github/workflows/update-references.yml`: weekly reference update automation.
- `README.md` and `ja.md`: maintainer and user documentation in English and
  Japanese.

## License

Files authored for this repository are dual-licensed under either the
[MIT License](LICENSE-MIT) or the [Apache License, Version 2.0](LICENSE-APACHE),
at the recipient's option. Unless explicitly stated otherwise, contributions are
accepted under the same terms.

The vendored references under `skills/write-idiomatic-rust/references/` are
independent upstream projects and are not covered by these licenses. See
[Third-party notices](THIRD_PARTY_NOTICES.md) and the license texts retained
beside each reference before redistributing them.

## Upstream references

- `rust-lang/api-guidelines` (`master`): Rust API Guidelines; Apache-2.0 OR MIT.
- `microsoft/rust-guidelines` (`main`): Pragmatic Rust Guidelines; MIT.
- `rust-unofficial/patterns` (`main`): Rust Design Patterns; MPL-2.0.

The exact vendored revision, source, license, and included paths are recorded
in [`reference-sources.json`](reference-sources.json).
