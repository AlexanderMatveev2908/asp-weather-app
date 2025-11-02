import test, { Browser } from '@playwright/test';
import { preChangeMail2fa } from './pre';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preChangeMail2fa(browser);

  await lib.submitTotpForm({
    id: 'change_email_2fa',
    totpSecret: res.totpSecret!,
    waitPushTo: '/notice',
  });
});
