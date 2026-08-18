# ADR-0001 — A small fold table instead of Unicode normalization

- Status: accepted
- Date: 2026-06-11

## Context

slugify must map accented Latin characters to ASCII. The obvious tool is
`String.prototype.normalize('NFKD')` plus a diacritic strip, which covers far
more of Unicode than an explicit table.

## Decision

Use a small explicit fold table (`ACCENTS`) covering the Latin-1 accents this
library's users actually pass, and treat everything else without an ASCII base
as a separator.

## Consequences

- Zero dependency on the engine's Unicode data version, so output is stable
  across Node releases (the property the tests pin).
- Non-Latin scripts collapse to hyphens rather than transliterating. That is the
  intended behavior for a slug: predictable, not clever.

## Why not NFKD normalization

NFKD makes output depend on the runtime's Unicode tables, so the same input can
slug differently across Node versions. For a value that ends up in URLs and
primary keys, stability beats coverage.
