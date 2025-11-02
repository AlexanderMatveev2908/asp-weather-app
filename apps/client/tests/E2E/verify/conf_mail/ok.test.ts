import test, { Browser } from '@playwright/test';
import { preVerifyTest } from '../pre';
import { TokenT } from '@/features/cbcHmac/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preVerifyTest(browser, TokenT.CONF_EMAIL);

  await lib.nav(`/verify?cbcHmacToken=${res.cbcHmacToken}`);
  await lib.waitPushTo('/notice');
  await lib.isToastOk();
});
