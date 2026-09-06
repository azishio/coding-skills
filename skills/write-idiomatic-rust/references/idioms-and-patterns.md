# Idioms and patterns

Start here for ownership workarounds, cleanup, dispatch, and composition. Constructor, builder, and newtype contracts start in [API and internal design](api-and-internal-design.md); use their examples below only if implementation mechanics remain unresolved. Read benefits and drawbacks, not just example code.

If no row fits, inspect the [Patterns summary](rust-design-patterns/src/SUMMARY.md) and open one candidate page at a time.

| Read when | Reference and check |
| --- | --- |
| Cloning only to satisfy the borrow checker | [clone anti-pattern](rust-design-patterns/src/anti_patterns/borrow_clone.md) — consider scopes, field splitting, and `mem::take` |
| Moving a value out of borrowed state without cloning | [`mem::take` / `replace`](rust-design-patterns/src/idioms/mem-replace.md) |
| Implementing an already chosen constructor or default value | Choose [constructor](rust-design-patterns/src/idioms/ctor.md) or [Default](rust-design-patterns/src/idioms/default.md) for the unresolved operation |
| Implementing an already justified newtype or builder | Choose [newtype](rust-design-patterns/src/patterns/behavioural/newtype.md) or [builder](rust-design-patterns/src/patterns/creational/builder.md); first check [Dependency selection](dependencies.md) before writing repetitive plumbing |
| Implementing stack-based dynamic dispatch | [on-stack dispatch](rust-design-patterns/src/idioms/on-stack-dyn-dispatch.md) |
| Implementing resource cleanup or a scope guard | [RAII guards](rust-design-patterns/src/patterns/behavioural/RAII.md); consult [finalisation](rust-design-patterns/src/idioms/dtor-finally.md) if early-return or unwind behavior remains unclear |
| Implementing strings, errors, or wrappers at an FFI boundary chosen through Pragmatic engineering | Choose the applicable item from [FFI idioms](rust-design-patterns/src/idioms/ffi/intro.md) or [FFI patterns](rust-design-patterns/src/patterns/ffi/intro.md) |
| Considering command, strategy, visitor, or another behavioral pattern | Read only the relevant item from [behavioral patterns](rust-design-patterns/src/patterns/behavioural/intro.md) |
| Implementing composition or simplifying complex bounds | Choose [struct composition](rust-design-patterns/src/patterns/structural/compose-structs.md) or [traits for bounds](rust-design-patterns/src/patterns/structural/trait-for-bounds.md); crate splits and unsafe isolation start in Pragmatic engineering |
| Evaluating type-class or optics techniques beyond a local iterator/loop choice | Relevant item from [functional programming](rust-design-patterns/src/functional/index.md); ordinary control-flow choices need only [Data flow](data-flow.md) |
