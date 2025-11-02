import { Browser } from '@playwright/test';
import { LibTests } from '../lib_tests';
import { PreTestResT, TkResT } from '../lib_tests/etc/types';

// ! mail in tests mode are not sent
// ! server skip smtp block code and just send 200
// ! rest of code follow normal flow as in prod

export const preRequireMail = async (brw: Browser): Promise<PreTestResT<void>> => {
  const _lib: LibTests = await LibTests.fromBrowser(brw);
  const res: TkResT = await _lib.getTk({});

  const lib: LibTests = await LibTests.fromBrowser(brw);

  return {
    res,
    lib,
  };
};
