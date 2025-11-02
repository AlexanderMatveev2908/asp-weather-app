import test, { Browser } from '@playwright/test';
import { preChangeMail2fa } from './pre';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preChangeMail2fa(browser);

  await lib.submitBkpForm({
    id: 'change_email_2fa',
    bkpCode: res.bkpCodes![0],
    waitPushTo: '/notice',
  });
});
