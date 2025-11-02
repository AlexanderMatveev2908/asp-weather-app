import test, { Browser } from '@playwright/test';
import { preTestLogin } from './pre';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res, form } = await preTestLogin(browser);

  const fields: DataFieldT[] = [
    {
      field: 'email',
      val: res.user.email,
    },
    {
      field: 'password',
      val: res.plainPwd,
    },
  ];

  await lib.fillFor(form, fields);
  await lib.submit();

  await lib.waitPushTo('/');
  await lib.isToastOk();
});
