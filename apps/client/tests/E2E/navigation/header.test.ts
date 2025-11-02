import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from '../lib_tests';

test('go to register page using header', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/');
  await lib.closeToastIfPresent();

  const headerDrop: Locator = await lib.byIdInPage('header__drop');
  const toggleBtn: Locator = await lib.byCssIn(headerDrop, 'root__btn');
  await toggleBtn.click();

  const registerLink: Locator = await lib.byIdInPage('header__auth_register');
  await registerLink.click();

  await lib.waitPushTo('/auth/register');
});
