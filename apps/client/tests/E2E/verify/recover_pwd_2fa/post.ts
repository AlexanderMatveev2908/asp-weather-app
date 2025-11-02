import { PwdGen } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/pwd_gen';
import { Locator } from '@playwright/test';
import { DataFieldT, PreTestResT } from 'tests/E2E/lib_tests/etc/types';

export const postRecoverPwd2fa = async ({ lib }: Pick<PreTestResT<void>, 'lib'>): Promise<void> => {
  lib.setFormID('recover_pwd_2fa_form');
  const form: Locator = await lib.getForm();

  const charsForRange: number = 4;
  const newPwd: string = PwdGen.pwdOf(charsForRange);

  const data: DataFieldT[] = [
    {
      field: 'password',
      val: newPwd,
    },
    {
      field: 'confirm_password',
      val: newPwd,
    },
  ];

  await lib.fillFor(form, data);
  await lib.submit();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
};
