import test, { Browser, expect, Locator } from '@playwright/test';
import { LibTests } from '../lib_tests';

test('go to register page using sidebar', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/');
  await lib.closeToastIfPresent();

  await lib.clickById('toggle_side_btn');
  await lib.timer();

  const sidebar: Locator = await lib.byIdInPage('sidebar');
  await expect(sidebar).toHaveCSS('opacity', '1');

  const dropUser: Locator = await lib.byIdIn(sidebar, 'sidebar__drop_user');
  const btnDrop: Locator = await lib.byCssIn(dropUser, 'root__btn');
  await btnDrop.click();

  const registerLink: Locator = await lib.byIdIn(sidebar, 'sidebar__auth_register');
  await registerLink.click();
  await lib.waitPushTo('/auth/register');
});
