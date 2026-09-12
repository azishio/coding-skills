# Contributing

Issues and pull requests are welcome. Keep changes focused and explain the
user-visible or maintenance reason for them.

Before opening a pull request, run the skill validator described in `AGENTS.md`,
and run `node --test hooks/` if you changed the hook, a plugin manifest, or an
`anti-overengineering` skill.

Vendored references update automatically every Monday. Use the GitHub Actions
workflow dispatch for an intentional refresh. When it changes references, review
`reference-sources.json`, update the routes in the skill and its first-party
guides under `skills/write-idiomatic-rust/references/`, check their Markdown
links, and run the skill validator again.

By submitting a contribution, you agree to license it under either the MIT
License or the Apache License, Version 2.0, at the recipient's option, unless
you explicitly state otherwise in writing.
