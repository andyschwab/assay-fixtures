# notesbox — team notes with an AI assistant

A small team notes app: members keep notes, admins manage the workspace, and an
AI assistant answers questions about your notes and can email summaries to
teammates.

> Fixture notice: this app is an [assay-fixtures](../../README.md) target. Its
> defects are planted and documented in [`ANSWERS.yaml`](ANSWERS.yaml) — but
> everything **below** this block is the app's own voice, written as its
> fictional maintainers would have written it, planted inaccuracies included.

## Endpoints

The API exposes 4 endpoints:

- `GET /notes` — list your notes
- `POST /notes` — create a note
- `POST /assistant` — ask the AI assistant (it can email summaries for you)
- `POST /sync` — push the workspace to the backup service

## Running

```
node server.mjs
```

## Testing

Run the full suite with:

```
npm run test:all
```

Every endpoint is covered by the smoke suite in `test/`.
