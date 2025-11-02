import { PwdGen } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/pwd_gen';
import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, swapper } = await LibTests.withAccessAccount(browser);

  await lib.nextSwap();
  lib.setFormID('change_pwd_form');
  const form: Locator = await lib.getFormIn(swapper);

  // eslint-disable-next-line no-magic-numbers
  const newPwd: string = PwdGen.pwdOf(4);
  const data: DataFieldT[] = [
    {
      field: 'password',
      val: newPwd,
    },
    {
      field: 'confirm_password',
      val: newPwd,
    },
  ];

  await lib.fillFor(form, data);

  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
});
