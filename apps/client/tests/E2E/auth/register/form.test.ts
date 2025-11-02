import test, { Browser, expect, Locator } from '@playwright/test';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { preRegister } from './pre';

const swap_0: DataFieldT[] = [
  {
    field: 'first_name',
    val: '<><>',
  },
  {
    field: 'last_name',
    val: '<><>',
  },
  {
    field: 'email',
    val: '@not@an<><>email',
  },
];
const swap_1: DataFieldT[] = [
  {
    field: 'password',
    val: 'not safe',
  },
  {
    field: 'confirm_password',
    val: 'different',
  },
];

test('trigger errors', async ({ browser }: { browser: Browser }) => {
  const { lib, form } = await preRegister(browser);

  const [firstName, lastName] = await lib.errFor(form, swap_0);

  const prev: Locator = await lib.getSwapBtn('prev');
  await expect(prev).toBeDisabled();

  await lib.nextSwap();

  const pwd: Locator = await lib.byIdIn(form, 'password');
  await lib.isFocused(pwd);

  await lib.errFor(form, swap_1);

  await lib.submit();

  await lib.timer();
  await lib.isFocused(firstName);

  await firstName.fill('John');

  await lib.nextSwap();

  await lib.submit();

  await lib.isFocused(lastName);
});
