# assay-fixtures

Public, known-answer fixture targets for [assay](https://github.com/andyschwab/assay),
the evidence-based repository evaluation engine. Every defect in these targets is
**planted on purpose and documented**; every strength is planted too. An evaluation
run over a target can therefore be scored against ground truth — which findings it
recovered, which it missed, and what it flagged that was never planted.

Nothing in this repository is a real credential, a real vulnerability in use, or a
real product. Planted "secrets" are inert strings shaped to trip scanners.

## Layout (a monorepo of targets)

```
targets/
  flawed-webapp/   a small app with planted defects across the evaluation axes
    ANSWERS.yaml   the known-answer sheet for this target
  clean-lib/       the CONTROL: a small library kept deliberately healthy
    ANSWERS.yaml   asserts the near-absence of findings
```

An evaluation can point at one target (`targets/flawed-webapp/`) or at the whole
repository. Two rules of the monorepo:

- **Path-scoped methods** (secrets scanners, SAST, the LLM dimension passes)
  target a single app directory and are scored against that target's
  `ANSWERS.yaml`.
- **Repo-scoped instruments** (OpenSSF Scorecard and anything else that reads
  repository hygiene — CI, branch protection, release signing) see the whole
  repository, so their known answers can only live at repo level, never per-app.
  Per-app sheets deliberately carry no `repo-hygiene` class.

## Why a clean control

A fixture suite that only contains flaws can only catch false negatives. The
control target catches the other failure: an evaluator or instrument that finds
"problems" in a healthy codebase is drifting toward noise, and the control's
answer sheet asserts it stays quiet. A tool earns trust here twice — by firing on
`flawed-webapp` and by not firing on `clean-lib`.

## The known-answer contract (`ANSWERS.yaml`)

One sheet per target, machine-readable, block-style YAML:

```yaml
target: flawed-webapp
planted:                       # defects an evaluation SHOULD find
  - id: P-01                   # stable id, referenced by harness assertions
    class: committed-secret    # the defect class (free slug, stable per sheet)
    axis: code-security        # the assay axis the finding should land on
    polarity: gap
    evidence: config/settings.mjs:7   # where the planted item lives (path relative to the target)
    detectable_by: [gitleaks, eval-pass]   # which method class is expected to recover it
    note: one line on what was planted and why it is inert
strengths:                     # planted STRENGTHS an evaluation should also name
  - id: S-01
    class: decision-record
    axis: artifact-legibility
    polarity: strength
    evidence: docs/adr/0001-storage-choice.md:1
    note: ...
```

Matching is by evidence path + class, never by wording: a run recovers `P-01` if
it produces a finding whose evidence resolves to the planted location and whose
substance matches the class. A finding matching nothing planted is not
automatically wrong — the sheets are the floor of ground truth, not the ceiling —
but on `clean-lib` it counts against the evaluator.

## Using the fixtures

```
# a secrets instrument against one target
gitleaks dir targets/flawed-webapp --report-format json --report-path gitleaks.json

# the flawed app actually runs (zero dependencies, Node >= 20)
node targets/flawed-webapp/server.mjs

# the control's tests actually pass
cd targets/clean-lib && npm test
```

The regression harness that pins evaluations against these sheets lives with the
engine, not here — this repository stays a pure target: only apps and answers.
