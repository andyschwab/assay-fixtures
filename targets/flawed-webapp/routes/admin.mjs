// Admin routes.
import { purgeAll } from '../lib/db.mjs';
import { requireAdmin } from '../lib/auth.mjs';

// DELETE /admin/purge — clear the whole workspace (used between demo cycles).
export function handlePurge(user, res) {
  if (!requireAdmin(user)) { res.writeHead(403); res.end('admin only'); return; }
  const result = purgeAll();
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(result));
}
