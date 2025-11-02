import { Browser, Locator, test } from '@playwright/test';
import { LibTests } from './lib_tests';

test('health check', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/');

  const btn: Locator = await lib.byIdInPage('script_btn');
  await btn.click();

  await lib.isToastOk();
});
