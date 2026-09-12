# Third-party notices

The licenses in the repository root apply only to files authored for this
repository. They do not grant rights in the vendored references below.

| Path | Upstream | License |
| --- | --- | --- |
| `skills/write-idiomatic-rust/references/rust-api-guidelines` | [`rust-lang/api-guidelines`](https://github.com/rust-lang/api-guidelines) | Apache-2.0 OR MIT |
| `skills/write-idiomatic-rust/references/microsoft-rust-guidelines` | [`microsoft/rust-guidelines`](https://github.com/microsoft/rust-guidelines) | MIT |
| `skills/write-idiomatic-rust/references/rust-design-patterns` | [`rust-unofficial/patterns`](https://github.com/rust-unofficial/patterns) | MPL-2.0 |
| `skills/anti-overengineering*/`, `hooks/` | [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) v4.9.0 | MIT |

The exact upstream revisions and included paths of the vendored references are
recorded in `reference-sources.json`. Each reference retains its applicable
upstream license text.

The `anti-overengineering` skills and `hooks/` are a modified derivative of
ponytail, not a verbatim copy. The upstream copyright and permission notice is
retained at `skills/anti-overengineering/LICENSE-ponytail`; the modifications
are offered under this repository's dual license. Installing one of the
companion `anti-overengineering-*` skills on its own does not carry that file,
so redistribute the family together with it.

Anyone distributing an archive, package, or other artifact that includes
reference material or the derived skills must retain the applicable license
texts and notices.
