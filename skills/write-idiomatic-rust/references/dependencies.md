# Dependency selection

Read this guide before implementing general-purpose utilities or repetitive infrastructure, and when evaluating, adding, or updating a crate. Prefer a suitable maintained implementation over rebuilding its functionality inside the project. Optimize total maintenance cost, not dependency count alone.

1. Define the required functionality, API shape, performance, MSRV, features, targets, `no_std` support, and license constraints.
2. Check the standard library and existing dependencies first. If they do not cover a general-purpose need, investigate suitable crates before writing a local substitute. Compare integration, transitive dependencies, build cost, and upgrade obligations with the implementation, edge cases, tests, and maintenance the project would otherwise own. A small amount of domain-specific logic or glue can stay local; a smaller initial diff alone does not justify recreating a parser, validation framework, or runtime utility.
3. For a new or updated dependency, verify the registry's current release and the official documentation for the selected version. Check its API, default and optional features, MSRV, license, compatibility notes, and security advisories. Inspect the source repository, release history, or open issues when maintenance or operational risk makes them material.
4. Check whether dependency types, attributes, generated APIs, or wire formats become part of a public contract.
5. Validate the feature, target, and `no_std` configurations the project actually claims to support on its pinned toolchain. Do not invent an all-features, no-default-features, target, or `no_std` requirement absent from project policy.

If choosing a local implementation over an available crate for a general-purpose facility, state the concrete mismatch or maintenance advantage. Do not replace a suitable existing dependency just to match this shortlist, and search beyond it when the required capability is absent. Pattern examples illustrate design mechanics; they are not instructions to hand-write reusable infrastructure.

These examples focus on recurring infrastructure and generated plumbing. Verify suitability at adoption time; they are neither an allowlist nor dependencies to add by default.

| Need that would otherwise require project-owned infrastructure | Candidate | Boundary |
| --- | --- | --- |
| Typed error implementations | [thiserror](https://docs.rs/thiserror/) | Preserve domain distinctions and the public error contract |
| Application error context and propagation | [anyhow](https://docs.rs/anyhow/) | Use at application boundaries; retain typed errors in library APIs |
| Serialization | [serde](https://serde.rs/) and an appropriate format crate | Design wire compatibility; derive only where serialization is needed |
| CLI parsing, help, and argument validation | [clap](https://docs.rs/clap/) | Compare against the actual CLI size and target/build constraints |
| Nested, multi-field, or conditional input validation | [garde](https://docs.rs/garde/) | Keep domain invariants enforced by constructors or types |
| Repetitive builder implementation after a builder is justified | [bon](https://docs.rs/bon/) | Simple construction may need no builder; assess generated API compatibility |
| Combinable flags and their operations | [bitflags](https://docs.rs/bitflags/) | Exclusive states belong in an enum |
| Async I/O, cancellation, and task coordination | [tokio](https://docs.rs/tokio/); [tokio-util](https://docs.rs/tokio-util/) for missing utilities | Reuse the project's runtime and add only the needed capabilities |
| Structured diagnostic events and spans | [tracing](https://docs.rs/tracing/) | Leave subscriber setup to the application and keep sensitive values out |
