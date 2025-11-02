import test, { Browser, Locator } from '@playwright/test';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { preRequireMail } from '../pre';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preRequireMail(browser);

  await lib.nav('/auth/require-email/confirm-email');

  lib.setFormID('req_mail_conf_mail_form');
  const form: Locator = await lib.getForm();

  const data: DataFieldT = {
    field: 'email',
    val: res.user.email,
  };

  await lib.fillWith(form, data);

  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.CONF_ACCOUNT_MSG);
});
