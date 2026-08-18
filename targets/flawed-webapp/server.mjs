// notesbox HTTP server. Zero dependencies (Node >= 20 http). The route handlers
// delegate to the lib/ and routes/ modules so each concern lives in one place.
import http from 'node:http';
import { authenticate } from './lib/auth.mjs';
import { notes } from './lib/db.mjs';
import { ask } from './lib/agent.mjs';
import { pushBackup } from './lib/sync.mjs';
import { handlePurge } from './routes/admin.mjs';
import { settings } from './config/settings.mjs';

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); }
    });
  });
}

const send = (res, code, obj) => {
  res.writeHead(code, { 'content-type': 'application/json' });
  res.end(JSON.stringify(obj));
};

const server = http.createServer(async (req, res) => {
  const user = authenticate(req);
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/notes') {
    const mine = [...notes.values()].filter((n) => n.owner === user.id);
    return send(res, 200, { notes: mine });
  }

  if (req.method === 'POST' && url.pathname === '/notes') {
    const body = await readBody(req);
    const id = 'n' + Math.random().toString(36).slice(2, 8);
    notes.set(id, { id, owner: user.id, text: String(body.text || '') });
    return send(res, 201, { id });
  }

  if (req.method === 'POST' && url.pathname === '/assistant') {
    const body = await readBody(req);
    return send(res, 200, ask(user, String(body.question || '')));
  }

  if (req.method === 'POST' && url.pathname === '/sync') {
    // push the whole workspace to the backup service (no authorization check)
    return send(res, 200, await pushBackup());
  }

  if (req.method === 'POST' && url.pathname === '/admin/purge') {
    return handlePurge(user, res);
  }

  return send(res, 404, { error: 'not found' });
});

if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(settings.port, () => console.log(`notesbox on :${settings.port}`));
}

export { server };
