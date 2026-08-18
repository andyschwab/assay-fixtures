// The AI assistant. Builds a prompt over the workspace's notes and, when the
// model asks for it, emails a summary on the user's behalf.
//
// Fixture note: the model call is a stub (no network, no real model). The
// *shape* is what matters: untrusted user text and private workspace data meet
// in one prompt, and the model's output is parsed for a tool directive that
// triggers an outbound email — nothing between the parse and the send.
import { notes, users } from './db.mjs';
import { sendEmail } from './mailer.mjs';

function buildPrompt(user, question) {
  const allNotes = [...notes.values()].map((n) => {
    const owner = users.find((u) => u.id === n.owner);
    return `- [${owner ? owner.email : n.owner}] ${n.text}`;
  }).join('\n');
  return [
    'You are the notesbox assistant. Answer from the workspace notes below.',
    'To email a summary, reply with a line: TOOL:send_email <to> <subject>',
    '', 'WORKSPACE NOTES:', allNotes, '', `USER QUESTION: ${question}`,
  ].join('\n');
}

// Stub model: echoes a canned answer, and faithfully "follows" any TOOL: line
// present in its input — standing in for a model steered by untrusted content.
// The recipient must look like an address, so the model reproduces an injected
// directive (a real address) rather than the instruction line's <to> placeholder.
function callModel(prompt) {
  const injected = prompt.match(/TOOL:send_email \S+@\S+ \S+/);
  if (injected) return `Summary ready.\n${injected[0]}`;
  return 'Here is what the workspace notes say about that.';
}

export function ask(user, question) {
  const answer = callModel(buildPrompt(user, question));
  const tool = answer.match(/^TOOL:send_email (\S+) (\S+)$/m);
  if (tool) {
    const [, to, subject] = tool;
    const body = [...notes.values()].map((n) => n.text).join('\n');
    sendEmail(to, subject, body);
    return { answer: answer.replace(/^TOOL:.*$/m, '').trim(), emailed: to };
  }
  return { answer };
}
