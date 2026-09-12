# Dependency selection

Read this guide before implementing general-purpose utilities or repetitive infrastructure, and when evaluating, adding, or updating a crate. Prefer a suitable maintained implementation over rebuilding its functionality inside the project. Optimize total maintenance cost, not dependency count alone.

1. Define the required functionality, API shape, performance, MSRV, features, targets, `no_std` support, and license constraints.
2. Check the standard library and existing dependencies first. If they do not cover a general-purpose need, investigate suitable crates before writing a local substitute. Compare integration, transitive dependencies, build cost, and upgrade obligations with the implementation, edge cases, tests, and maintenance the project would otherwise own. A small amount of domain-specific logic or glue can stay local; a smaller initial diff alone does not justify recreating a parser, validation framework, or runtime utility.
3. For a new or updated dependency, check the registry's current releases and select a version compatible with the project and its related dependencies. Read that version's official documentation for its API, default and optional features, MSRV, license, compatibility notes, and security advisories. Inspect the source repository, release history, and relevant issue handling to assess maintenance; stars or recent activity alone do not establish suitability.
4. Check whether dependency types, attributes, generated APIs, or wire formats become part of a public contract.
5. Validate the feature, target, and `no_std` configurations the project actually claims to support on its pinned toolchain. Do not invent an all-features, no-default-features, target, or `no_std` requirement absent from project policy.

If choosing a local implementation over an available crate for a general-purpose facility, state the concrete mismatch or maintenance advantage. Do not replace a suitable existing dependency just to match this shortlist, and search beyond it when the required capability is absent. Pattern examples illustrate design mechanics; they are not instructions to hand-write reusable infrastructure.

Use the first candidate for the required capability as a starting point for evaluation. Verify suitability at adoption time; these are neither an allowlist nor dependencies to add by default. Read only the matching section: [common code](#common-code), [data and configuration](#data-and-configuration), [applications and async](#applications-and-async), [procedural macros](#procedural-macros), or [tests](#tests).

## Common code

| Need | First candidate | Adoption condition |
| --- | --- | --- |
| Iterator adapters, grouping, or multi-iterator operations | [itertools](https://docs.rs/itertools/) | Standard iterators leave repetitive or intricate traversal logic |
| Enum string conversion, parsing, or enumeration | [strum](https://docs.rs/strum/) | Generated mappings reduce repeated enum plumbing; preserve spelling and parsing contracts |
| Trait implementations for newtypes and wrappers | [derive_more](https://docs.rs/derive_more/) | The generated traits fit the type's semantics and bounds; do not add meaningless conversions, operators, or `Deref` |
| Typed error implementations | [thiserror](https://docs.rs/thiserror/) | Preserve domain distinctions and the public error contract |
| Application error context and propagation | [anyhow](https://docs.rs/anyhow/) | Use at application boundaries; retain typed errors in library APIs |
| Repetitive builder implementation after a builder is justified | [bon](https://docs.rs/bon/) | Simple construction may need no builder; assess generated API compatibility |
| Combinable flags and their operations | [bitflags](https://docs.rs/bitflags/) | Exclusive states belong in an enum |
| Integer-to-enum conversion | [num_enum](https://docs.rs/num_enum/) (conditional) | An integer representation is part of the contract; define behavior for invalid values. String conversion belongs to `strum` |

## Data and configuration

| Need | First candidate | Adoption condition |
| --- | --- | --- |
| Serialization | [serde](https://serde.rs/) and an appropriate format crate | Design wire compatibility; derive only where serialization is needed |
| Serde field conversion adapters | [serde_with](https://docs.rs/serde_with/) | Existing Serde attributes do not cover the representation and reusable adapters replace custom conversion code |
| Layered defaults, files, and environment configuration | [config](https://docs.rs/config/) | Multiple sources need explicit precedence and merging; select the required format features |
| JSON Schema generation from Rust types | [schemars](https://docs.rs/schemars/) | A schema consumer exists; verify the dialect, Serde representation, and custom serializer compatibility |
| Nested, multi-field, or conditional input validation | [garde](https://docs.rs/garde/) | Keep domain invariants enforced by constructors or types |

## Applications and async

| Need | First candidate | Adoption condition |
| --- | --- | --- |
| CLI parsing, help, and argument validation | [clap](https://docs.rs/clap/) | Compare against the actual CLI size and target/build constraints |
| Async runtime and I/O | [tokio](https://docs.rs/tokio/) | Reuse the project's runtime; a library must not create its own runtime merely to use async APIs |
| Cancellation, task tracking, codecs, or I/O adapters | [tokio-util](https://docs.rs/tokio-util/) | The project uses Tokio and needs a utility beyond its core APIs |
| Structured diagnostic events and spans | [tracing](https://docs.rs/tracing/) | Leave subscriber setup to the application and keep sensitive values out |
| Pin projection for a custom future or pinned wrapper | [pin-project](https://docs.rs/pin-project/) | Field projection is actually required; choose pinned fields deliberately and follow the generated projection and drop contracts |

## Procedural macros

Read this section when the project needs a custom procedural macro that existing derives or declarative macros cannot suitably provide. These crates serve complementary roles; select only the roles needed. Match the `syn` major version supported by `darling` and other AST consumers, and enable only required features.

| Need | First candidate | Adoption condition |
| --- | --- | --- |
| Parse Rust syntax | [syn](https://docs.rs/syn/) | Parse the required syntax nodes instead of recreating Rust grammar |
| Generate Rust tokens | [quote](https://docs.rs/quote/) | Interpolation replaces manual token assembly while preserving spans |
| Token and span operations usable outside a proc-macro entry point | [proc-macro2](https://docs.rs/proc-macro2/) | Share expansion logic with ordinary functions and tests |
| Structured attribute parsing | [darling](https://docs.rs/darling/) | Nested attributes, defaults, or validation justify derived parsing beyond a small `syn` parser |
| Resolve a dependency renamed by a macro's caller | [proc-macro-crate](https://docs.rs/proc-macro-crate/) (conditional) | Generated paths must honor the caller's Cargo dependency name |

Use `syn::Error` or `darling::Error` for diagnostics when they cover the requirement. Investigate additional derive-bound, delegation, or diagnostic helpers only for a concrete missing capability.

## Tests

Apply [Test selection](../SKILL.md#test-selection) before choosing a test tool. Put test-only tools in dev-dependencies and use the mechanism that protects the actual project contract.

| Need | First candidate | Adoption condition |
| --- | --- | --- |
| Parameterized cases and reusable fixtures | [rstest](https://docs.rs/rstest/) | Repeated setup or case matrices obscure test intent |
| Reviewable output snapshots | [insta](https://docs.rs/insta/) | Stable, meaningful output benefits from snapshot comparison; review changes instead of automatically accepting them |
| Generated inputs with shrinking | [proptest](https://docs.rs/proptest/) | A project invariant spans an input space; define valid generators and retain failing cases |
| Compile-pass and compile-fail contracts | [trybuild](https://docs.rs/trybuild/) | Protect project-authored macros or compile-time APIs, or a documented project integration regression; do not re-test a dependency's documented behavior in isolation |
