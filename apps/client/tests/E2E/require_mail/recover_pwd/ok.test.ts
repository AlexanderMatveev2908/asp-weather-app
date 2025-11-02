import test, { Browser, Locator } from '@playwright/test';
import { preRequireMail } from '../pre';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preRequireMail(browser);

  await lib.nav('/auth/require-email/recover-pwd');

  lib.setFormID('mail_recover_pwd_form');
  const form: Locator = await lib.getForm();

  const data: DataFieldT = {
    field: 'email',
    val: res.user.email,
  };

  await lib.fillWith(form, data);

  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.RECOVER_PWD_MSG);
});
