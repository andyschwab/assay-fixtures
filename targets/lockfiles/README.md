# lockfiles

A fixture target for assay's dependency-scan instrument (assay #17). It is not an
application: two planted lockfiles give the instrument something to find. Do not fix
them; `ANSWERS.yaml` is the known-answer sheet.

- `app/package-lock.json` pins minimist 1.2.5, which carries a known critical advisory.
- `legacy/package-lock.json` is truncated on purpose, so no package manager can read it.
- `python/requirements.txt` pins PyYAML 5.3.1, which carries a known critical advisory. It is
  not an npm lockfile, so only a dependency auditor that reads pip pins sees it (assay #179).
