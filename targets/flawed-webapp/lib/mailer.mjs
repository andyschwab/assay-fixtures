// Outbound mail. In production this posts to the mail relay; the fixture build
// only logs, so nothing ever actually sends.
import { settings } from '../config/settings.mjs';

export function sendEmail(to, subject, body) {
  // fixture build: log-only transport
  console.log(`[mailer] to=${to} from=${settings.mailFrom} subject=${subject} bytes=${body.length}`);
  return { sent: true };
}
