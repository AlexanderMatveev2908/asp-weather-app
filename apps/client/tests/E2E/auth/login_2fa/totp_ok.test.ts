import test, { Browser } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TkResT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const _lib: LibTests = await LibTests.fromBrowser(browser);
  const res: TkResT = await _lib.getTk({ use2FA: true });

  const lib: LibTests = await LibTests.fromBrowser(browser);
  await lib.login({ res, waitPushTo: '/auth/login-2fa' });

  await lib.submitTotpForm({
    id: 'login_2fa',
    totpSecret: res.totpSecret!,
    waitPushTo: '/',
  });
});
