import { Locator } from '@playwright/test';
import { DataFieldT, LoginArgT, SubmitBkpArgT, SubmitTotpArgT } from '../types';
import { LibApiTests } from './5.api';
import { totp } from 'otplib';
import { HashAlgorithms, KeyEncodings } from 'otplib/core.js';
import { LibBinary } from '@/core/lib/data_structure/binary';
import { TotpFormUiFkt } from '@/core/forms/2fa/swaps/totp_form/etc/ui_fkt';
import { Form2faTestIdT } from '@/core/forms/2fa/etc/directives/use_form_2fa';

export abstract class LibAuthTests extends LibApiTests {
  private set2faFormID(id: string, t: Form2faTestIdT): void {
    this.setSwapperID(id);
    const swapperID: string = this.getSwapperID()!;

    this.setFormID(`${swapperID}__${t}_form`);
  }

  public setTotpFormID(id: string): void {
    this.set2faFormID(id, 'totp');
  }

  public setBkpFormID(id: string): void {
    this.set2faFormID(id, 'bkp');
  }

  public async login({ res, waitPushTo }: LoginArgT): Promise<void> {
    await this.nav('/auth/login');

    this.setFormID('login_form');
    const form: Locator = await this.getForm();

    const fields: DataFieldT[] = [
      {
        field: 'email',
        val: res.user.email,
      },
      {
        field: 'password',
        val: res.plainPwd,
      },
    ];

    await this.fillFor(form, fields);
    await this.submit();

    await this.waitPushTo(waitPushTo);
    await this.isToastOk();
  }

  public async submitTotpForm({ id, totpSecret, waitPushTo }: SubmitTotpArgT): Promise<void> {
    await this.timer();

    this.setTotpFormID(id);
    const totpForm: Locator = await this.getForm();

    totp.options = {
      encoding: KeyEncodings.HEX,
      algorithm: HashAlgorithms.SHA1,
      step: 30,
      digits: 6,
    };
    const totpCode: string = totp.generate(LibBinary.hexFromB32(totpSecret));

    for (let i = 0; i < TotpFormUiFkt.nFields; i++) {
      await this.fillWith(totpForm, {
        field: `totp.${i}`,
        val: totpCode.charAt(i),
      });
    }

    await this.submit();
    await this.waitPushTo(waitPushTo);
    await this.isToastOk();
  }

  public async submitBkpForm({ id, bkpCode, waitPushTo }: SubmitBkpArgT): Promise<void> {
    this.setBkpFormID(id);

    await this.timer();
    await this.nextSwap();

    const bkpForm: Locator = await this.getForm();

    await this.fillWith(bkpForm, {
      field: 'bkp',
      val: bkpCode,
    });

    await this.submit();
    await this.waitPushTo(waitPushTo);
    await this.isToastOk();
  }
}
