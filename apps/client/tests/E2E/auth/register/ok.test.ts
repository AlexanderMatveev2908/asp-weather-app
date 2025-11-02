import test, { Browser, Locator } from '@playwright/test';
import { preRegister } from './pre';
import { TestPayload } from 'tests/E2E/lib_tests/etc/payloads';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';

const payload: Omit<RegisterFormT, 'terms' | 'confirmPassword'> = TestPayload.register();

const swap_0: DataFieldT[] = [
  {
    field: 'first_name',
    val: payload.firstName,
  },
  {
    field: 'last_name',
    val: payload.lastName,
  },
  {
    field: 'email',
    val: payload.email,
  },
];

const swap_1: DataFieldT[] = [
  {
    field: 'password',
    val: payload.password,
  },
  {
    field: 'confirm_password',
    val: payload.password,
  },
];

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, form } = await preRegister(browser);

  await lib.fillFor(form, swap_0);

  await lib.nextSwap();

  await lib.fillFor(form, swap_1);

  const terms: Locator = await lib.byIdIn(form, 'terms');
  await terms.click();

  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.CONF_ACCOUNT_MSG);
});
