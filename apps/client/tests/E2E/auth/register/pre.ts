import { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';

export interface PreRegisterReturnT {
  lib: LibTests;
  form: Locator;
}

export const preRegister = async (browser: Browser): Promise<PreRegisterReturnT> => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/auth/register');
  await lib.closeToastIfPresent();

  lib.setFormID('register_form');
  lib.setSwapperID('register_form');

  const form: Locator = await lib.getForm();

  return {
    lib,
    form,
  };
};
