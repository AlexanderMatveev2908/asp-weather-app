import { LibCss } from '@/core/lib/data_structure/css';
import test, { Browser, expect, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib } = await LibTests.withAccessAccount(browser);

  const swapsNeeded: number = 3;
  for (let i = 0; i < swapsNeeded; i++) {
    await lib.nextSwap();
  }

  await lib.setPopID('del_acc');
  await lib.openPop();
  const pop: Locator = await lib.getPop();
  await expect(pop).toHaveCSS('border-color', LibCss.hexToRgb(LibCss.twdRed600));

  await lib.popChoseB();
  await expect(pop).not.toBeVisible();

  await lib.openPop();
  await lib.popChoseA();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
});
