import test, { Browser, Download, expect, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib } = await LibTests.withAccessAccount(browser, { verify: true });

  // eslint-disable-next-line no-magic-numbers
  for (let i = 0; i < 2; i++) {
    await lib.nextSwap();
  }

  lib.setFormID('setup_2fa_form');
  const form: Locator = await await lib.getForm();
  await lib.submit();

  const linkQrCode: Locator = await lib.byIdIn(form, 'setup_2fa_form__qr_code');

  const [png]: [Download, void] = await Promise.all([lib.waitDownload(), linkQrCode.click()]);

  const nameImg: string = png.suggestedFilename();
  await expect(nameImg).toMatch(/qr_code.png/);

  const zipBtn: Locator = await lib.byIdIn(form, 'setup_2fa_form__zip');

  const [zip]: [Download, void] = await Promise.all([lib.waitDownload(), zipBtn.click()]);

  const nameZip: string = zip.suggestedFilename();
  await expect(nameZip).toMatch(/2FA.zip/);
});
