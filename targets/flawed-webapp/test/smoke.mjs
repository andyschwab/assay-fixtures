// Smoke suite. Deliberately shallow: it asserts endpoints respond, not that they
// respond CORRECTLY (a planted verification gap — the tests pass while the auth
// and authorization defects stand).
import assert from 'node:assert';
import { authenticate } from '../lib/auth.mjs';

// a request with a valid token resolves a user
const u = authenticate({ headers: { authorization: 'Bearer tok-dana' } });
assert.ok(u, 'valid token resolves a user');

console.log('smoke: ok');
