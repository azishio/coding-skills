# Pragmatic engineering

Start here for architecture, lifecycle, and operational decisions. For an individual type's names, traits, constructors, builders, or signatures, use [API and internal design](api-and-internal-design.md) first. Treat the Microsoft Pragmatic Rust Guidelines as decision support, not universal requirements; prioritize project constraints and measurements.

Start with the narrow category index below, then open only the applicable `M-*` pages linked from it. Use the [Pragmatic summary](microsoft-rust-guidelines/src/SUMMARY.md) or search the [checklist](microsoft-rust-guidelines/src/guidelines/checklist/README.md) only when the category is unclear; do not read the full checklist by default. Read conditions and trade-offs before adopting opinionated guidance such as allocator changes, `target-cpu`, crate splits, async designs, or builders.

| Read when | Reference and check |
| --- | --- |
| Choosing project-wide logging, verification, or crate organization policy | [universal](microsoft-rust-guidelines/src/guidelines/universal/README.md); for a concrete lint finding, start with [Clippy policy](clippy-policy.md) |
| Designing library service boundaries, initialization, testability, resilience, or features | Choose one matching index: [libraries](microsoft-rust-guidelines/src/guidelines/libs/README.md) for shared rules, [interoperability](microsoft-rust-guidelines/src/guidelines/libs/interop/README.md) for runtime and I/O boundaries, [UX](microsoft-rust-guidelines/src/guidelines/libs/ux/README.md) for service construction and integration, [resilience](microsoft-rust-guidelines/src/guidelines/libs/resilience/README.md) for recovery, or [building](microsoft-rust-guidelines/src/guidelines/libs/building/README.md) for features and test infrastructure |
| Choosing a macro implementation strategy or organizing generated code | [macros](microsoft-rust-guidelines/src/guidelines/macros/README.md); public invocation contracts belong in API and internal design |
| Choosing application-level error reporting, allocators, or CPU targets | [applications](microsoft-rust-guidelines/src/guidelines/apps/README.md) — distinguish applications from libraries and require deployment evidence |
| Designing FFI crate names, boundaries with business logic, or DLL state | [FFI](microsoft-rust-guidelines/src/guidelines/ffi/README.md) |
| Evaluating unsafe code, soundness, or whether execution may continue after a panic | [correctness](microsoft-rust-guidelines/src/guidelines/correctness/README.md); read [unsafe modules](rust-design-patterns/src/patterns/structural/unsafe-mods.md) only when boundary isolation needs implementation guidance |
| Improving a hot path, allocations, indirection, hashing, async stacks, or telemetry overhead | [performance](microsoft-rust-guidelines/src/guidelines/performance/README.md) — profile and benchmark before changing the design |
| Choosing workspace structure, crate placement, editions, or MSRV | [project](microsoft-rust-guidelines/src/guidelines/project/README.md) |
| Improving module docs, opening sentences, canonical sections, or rustdoc re-export display | [documentation](microsoft-rust-guidelines/src/guidelines/docs/README.md) |
| Improving Rust-native structure, public paths, tests, or design documentation for AI changes | [AI](microsoft-rust-guidelines/src/guidelines/ai/README.md) — preserve human readability and project policy |

Consult the [FFI implementation references](idioms-and-patterns.md) only when a chosen boundary leaves concrete string, error, or wrapper mechanics unresolved. Do not reopen type-design guidance unless the operational decision changes the type's contract.
