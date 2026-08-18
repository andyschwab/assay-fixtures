# slugify — a tiny, well-kept string-slug library

Turns arbitrary text into URL-safe slugs. Deterministic, dependency-free, and
deliberately boring.

> Fixture notice: this is the [assay-fixtures](../../README.md) **control**
> target. It is kept healthy on purpose; [`ANSWERS.yaml`](ANSWERS.yaml) asserts
> the near-absence of findings. An evaluator that reports problems here is
> drifting toward noise.

## Usage

```js
import { slugify } from './index.mjs';
slugify('Hello, World!');        // "hello-world"
slugify('  Café  del  Mar  ');   // "cafe-del-mar"
```

## Testing

```
npm test
```

The test command in this README runs. The suite checks behavior, not just that
the function returns something.
