import { Browser } from '@playwright/test';
import { PreTestResT, TkResT } from '../lib_tests/etc/types';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { LibTests } from '../lib_tests';

export const preVerifyTest = async (brw: Browser, tokenT: TokenT): Promise<PreTestResT<void>> => {
  const _lib: LibTests = await LibTests.fromBrowser(brw);
  const res: TkResT = await _lib.getTk({ tokenT });

  const lib: LibTests = await LibTests.fromBrowser(brw);

  return {
    lib,
    res,
  };
};
