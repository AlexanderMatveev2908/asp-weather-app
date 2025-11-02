import { TokenT } from '@/features/cbcHmac/etc/types';
import { Browser } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { PreTestResT } from 'tests/E2E/lib_tests/etc/types';

export const preRecoverPwd2fa = async (brw: Browser): Promise<PreTestResT<void>> => {
  const { res, lib } = await LibTests.with2faUser(brw, { tokenT: TokenT.RECOVER_PWD });

  await lib.nav(`/verify?cbcHmacToken=${res.cbcHmacToken}`);
  await lib.waitPushTo('/verify/recover-pwd-2fa');

  return {
    res,
    lib,
  };
};
