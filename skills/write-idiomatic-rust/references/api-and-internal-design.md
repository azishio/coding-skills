# API and internal design

Start here for type and callable contracts, including constructors, builders, newtypes, and `Deref`. Apply readable and predictable design principles to private code, but limit downstream compatibility, publishing, and public documentation requirements to public surfaces.

Use the most specific row below. Open the linked page and only the relevant `C-*` sections. If the category is uncertain, inspect the [API summary](rust-api-guidelines/src/SUMMARY.md) or search the [checklist](rust-api-guidelines/src/checklist.md) for decision terms or known identifiers instead of reading it top to bottom.

| Read when | Reference and check |
| --- | --- |
| Naming types, traits, methods, or modules; checking getter, conversion, iterator, or cost naming | [naming](rust-api-guidelines/src/naming.md) — casing, `as_` / `to_` / `into_`, getters, and iterators |
| Implementing standard traits or designing Serde integration, error types, or `Read` / `Write` interoperability | [interoperability](rust-api-guidelines/src/interoperability.md) — common traits, errors, serialization, and I/O expectations |
| Adding or changing a public macro or derive macro | [macros](rust-api-guidelines/src/macros.md) — invocations, attributes, hygiene, diagnostics, and future extensibility |
| Adding or reviewing rustdoc, examples, failure conditions, or crate metadata | [documentation](rust-api-guidelines/src/documentation.md) — crate docs, examples, `# Errors` / `# Panics` / `# Safety`, and metadata |
| Choosing functions versus methods, constructors, or operators | Relevant section of [predictability](rust-api-guidelines/src/predictability.md): [receivers](rust-api-guidelines/src/predictability.md#c-method), [constructors](rust-api-guidelines/src/predictability.md#c-ctor), or [operators](rust-api-guidelines/src/predictability.md#c-overload) |
| Deciding whether to implement `Deref` | [C-DEREF](rust-api-guidelines/src/predictability.md#c-deref); consult [Deref anti-pattern](rust-design-patterns/src/anti_patterns/deref.md) only if forwarding or inheritance trade-offs remain unclear |
| Choosing borrowed, owned, or generic arguments, or exposing trait objects | [flexibility](rust-api-guidelines/src/flexibility.md) — caller control, generic bounds, and object safety |
| Distinguishing domain values or representing options and flags | Relevant section of [type safety](rust-api-guidelines/src/type-safety.md): [newtypes](rust-api-guidelines/src/type-safety.md#c-newtype), [argument meaning](rust-api-guidelines/src/type-safety.md#c-custom-type), or [flags](rust-api-guidelines/src/type-safety.md#c-bitflag) |
| Deciding whether a builder is warranted and what it owns | [C-BUILDER](rust-api-guidelines/src/type-safety.md#c-builder) |
| Designing validation, panic conditions, destructor failures, or side effects | [dependability](rust-api-guidelines/src/dependability.md) — validation, panic, and drop contracts |
| Deciding a public type's `Debug` representation | [debuggability](rust-api-guidelines/src/debuggability.md) — useful and stable non-empty output |
| Evaluating downstream compatibility, sealed traits, private fields, or implementation hiding | [future proofing](rust-api-guidelines/src/future-proofing.md) — extensible public surfaces |
| Checking toolchain stability, crate names, or licenses before publishing | [necessities](rust-api-guidelines/src/necessities.md) — stable Rust and permissive-license basics |

Keep operations with a clear receiver, type invariant, or state transition on the type. Use a free function when no natural receiver exists, multiple inputs are peers, or the transformation is independent of a type's responsibility. Do not extract a method merely to shorten it.

Once a contract is settled, use [Idioms and patterns](idioms-and-patterns.md) only if implementation mechanics remain unresolved. Use [Pragmatic engineering](pragmatic-engineering.md) for a separate lifecycle or operational question, such as service initialization or panic recovery. Before hand-writing repetitive builder or trait boilerplate, follow [Dependency selection](dependencies.md).
