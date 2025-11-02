import { faker } from '@faker-js/faker';
import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';
import { DataFieldErrT, DataFieldT, TkResT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  const res: TkResT = await lib.getTk();
  await lib.nav('/user/confirm-email');

  lib.setFormID('user_req_mail_conf_mail_form');
  const form: Locator = await lib.getForm();

  const wrongData: DataFieldErrT = {
    field: 'email',
    val: faker.internet.email(),
    err: 'Email must be the same declared at registration time',
  };

  await lib.errMsgWhen(form, wrongData);

  const rightData: DataFieldT = {
    ...wrongData,
    val: res.user.email,
  };

  await lib.fillWith(form, rightData);

  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.CONF_ACCOUNT_MSG);
});
