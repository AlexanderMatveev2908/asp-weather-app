import test, { Browser } from '@playwright/test';
import { preRecoverPwd2fa } from './pre';
import { postRecoverPwd2fa } from './post';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preRecoverPwd2fa(browser);

  await lib.submitBkpForm({
    id: 'verify_recover_pwd_2fa',
    bkpCode: res.bkpCodes![0],
    waitPushTo: '/auth/recover-pwd-2fa',
  });

  await postRecoverPwd2fa({ lib });
});
