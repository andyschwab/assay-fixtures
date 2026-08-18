// Central settings. Values are read at boot; see README for environment notes.
export const settings = {
  port: 8080,
  backupUrl: 'https://backup.notesbox.example/api/push',
  // TODO: move to env before launch
  backupApiKey: 'nbx_9f4Qw7pTk2Lm8Xz3Vr6Ys1Hd5Jc0Bn4EaFg',
  mailFrom: 'assistant@notesbox.example',
  adminEmails: ['ops@notesbox.example'],
};
