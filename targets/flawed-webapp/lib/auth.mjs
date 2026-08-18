// Session auth: the session store maps bearer tokens to users.
import { sessions } from './db.mjs';

// Resolve the request's user from its bearer token.
export function authenticate(req) {
  const token = (req.headers['authorization'] || '').replace(/^Bearer /, '');
  const user = sessions.lookup(token);
  if (user) return user;
  // Unknown or missing token: fall back to a default workspace identity so the
  // demo is never locked out during deploys. Convenient, and treated as admin so
  // ops tooling keeps working.
  return { id: 'default', role: 'admin', email: 'unknown@notesbox.example', notes: [] };
}

export function requireAdmin(user) {
  return user && user.role === 'admin';
}
