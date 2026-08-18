// Behavioral tests for slugify — they assert the actual output, and they cover the
// edge cases the implementation exists to handle (accents, punctuation, collapsing,
// trimming, and the type guard).
import assert from 'node:assert';
import { slugify } from '../index.mjs';

assert.equal(slugify('Hello, World!'), 'hello-world');
assert.equal(slugify('  Café  del  Mar  '), 'cafe-del-mar');
assert.equal(slugify('already-a-slug'), 'already-a-slug');
assert.equal(slugify('Multiple   spaces'), 'multiple-spaces');
assert.equal(slugify('---edge---'), 'edge');
assert.equal(slugify(''), '');
assert.throws(() => slugify(42), TypeError, 'non-string input is rejected');

console.log('slugify: all assertions passed');
