import test, { Browser } from '@playwright/test';
import { preTestLogin } from './pre';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { LoginFormT } from '@/features/auth/pages/login/paperwork/from_mng';
import { TestPayload } from 'tests/E2E/lib_tests/etc/payloads';

const p: LoginFormT = TestPayload.login();
const fields: DataFieldT[] = [
  {
    field: 'email',
    val: p.email,
  },
  {
    field: 'password',
    val: p.password,
  },
];

test('err', async ({ browser }: { browser: Browser }) => {
  const { lib, form } = await preTestLogin(browser);

  await lib.fillFor(form, fields);

  await lib.submit();

  await lib.isToastErr();
});
