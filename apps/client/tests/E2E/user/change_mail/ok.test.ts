import { TokenT } from '@/features/cbcHmac/etc/types';
import { faker } from '@faker-js/faker';
import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';
import { DataFieldErrT, DataFieldT, TkResT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { res, lib, swapper } = await LibTests.withAccessAccount(browser);

  lib.setFormID('change_email_form');
  const mailForm: Locator = await lib.getFormIn(swapper);

  const wrong: DataFieldErrT = {
    field: 'email',
    val: res.user.email,
    err: 'New email must be different from the old one',
  };

  await lib.errMsgWhen(mailForm, wrong);

  const right: DataFieldT = {
    ...wrong,
    val: faker.internet.email(),
  };

  await lib.fillWith(mailForm, right);

  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.CHANGE_MAIL_MSG);

  const tkVerify: TkResT = await lib.getTk({ tokenT: TokenT.CHANGE_EMAIL, payload: res.user });
  await lib.nav(`/verify?cbcHmacToken=${tkVerify.cbcHmacToken}`);

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
});
