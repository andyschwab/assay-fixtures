# infra

A fixture target for an infrastructure-as-code and container policy instrument (assay #181).
It is not deployed and never applied: two planted configuration files give the
instrument something to find. Do not fix them; `ANSWERS.yaml` is the known-answer sheet.

- `Dockerfile` builds an image that runs as root (no `USER`) and declares no
  `HEALTHCHECK`.
- `main.tf` declares a storage bucket with only a name: no encryption, versioning,
  access logging or public-access block.
