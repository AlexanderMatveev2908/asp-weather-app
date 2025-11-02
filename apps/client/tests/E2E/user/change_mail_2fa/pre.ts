import { TokenT } from '@/features/cbcHmac/etc/types';
import { faker } from '@faker-js/faker';
import { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { DataFieldT, PreTestResT, TkResT } from 'tests/E2E/lib_tests/etc/types';

export const preChangeMail2fa = async (brw: Browser): Promise<PreTestResT<void>> => {
  const { res, lib, swapper } = await LibTests.withAccessAccTotp(brw);

  lib.setFormID('change_email_form');
  const mailForm: Locator = await lib.getFormIn(swapper);

  const right: DataFieldT = {
    field: 'email',
    val: faker.internet.email(),
  };
  await lib.fillWith(mailForm, right);
  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();

  const resNewTokens: TkResT = await lib.getTk({
    tokenT: TokenT.CHANGE_EMAIL,
    payload: res.user,
  });

  const libNewCtx: LibTests = await LibTests.fromBrowser(brw);

  await libNewCtx.nav(`/verify?cbcHmacToken=${resNewTokens.cbcHmacToken}`);
  await libNewCtx.waitPushTo('/verify/change-email-2fa');

  return {
    lib: libNewCtx,
    res,
  };
};
