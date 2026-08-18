// In-memory store. Real deployments swap this for the SQLite adapter (ADR-0001).
export const users = [
  { id: 'u1', email: 'dana@notesbox.example', role: 'member', notes: ['n1'] },
  { id: 'u2', email: 'sam@notesbox.example', role: 'member', notes: ['n2'] },
  { id: 'u3', email: 'ops@notesbox.example', role: 'admin', notes: [] },
];

export const notes = new Map([
  ['n1', { id: 'n1', owner: 'u1', text: 'Q3 pricing draft: hold at $12/seat until the renewal wave clears.' }],
  ['n2', { id: 'n2', owner: 'u2', text: 'Interview loop for the platform role starts Tuesday.' }],
]);

const tokenTable = new Map([
  ['tok-dana', 'u1'],
  ['tok-sam', 'u2'],
  ['tok-ops', 'u3'],
]);

export const sessions = {
  lookup(token) {
    const uid = tokenTable.get(token);
    if (!uid) return null;
    return users.find((u) => u.id === uid) || null;
  },
};

export function purgeAll() {
  notes.clear();
  for (const u of users) u.notes = [];
  return { purged: true };
}
