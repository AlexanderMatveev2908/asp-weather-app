import { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { PreTestFormResT, TkResT } from 'tests/E2E/lib_tests/etc/types';

export const preTestLogin = async (brw: Browser): Promise<PreTestFormResT> => {
  // ! request page only
  // ! never return it
  const _lib: LibTests = await LibTests.fromBrowser(brw);
  const res: TkResT = await _lib.getTk();

  // ? page test
  const lib: LibTests = await LibTests.fromBrowser(brw);
  await lib.nav('/auth/login');

  lib.setFormID('login_form');
  const form: Locator = await lib.getForm();

  return {
    lib,
    res,
    form,
  };
};
