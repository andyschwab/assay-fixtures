# ADR-0001 — In-memory store now, SQLite adapter behind an interface

- Status: accepted
- Date: 2026-05-02

## Context

notesbox needs to ship a demo this quarter, but we do not want the storage
choice to calcify. The data model is small (users, notes, sessions) and the
access pattern is simple key lookups.

## Decision

Keep an in-memory store behind a narrow module interface (`lib/db.mjs`), so the
call sites never see the storage engine. The SQLite adapter, when it lands, must
satisfy the same interface (`lookup`, the `notes` map surface, `purgeAll`) and
nothing above `lib/` changes.

## Consequences

- The demo ships without a database dependency.
- Persistence is deferred; a restart loses data. This is acceptable for the demo
  and is the first thing the production milestone fixes.

## Why not SQLite immediately

We would spend the demo window on migrations and connection handling instead of
the assistant, which is the differentiator. The interface boundary buys the
option without paying for it now.
