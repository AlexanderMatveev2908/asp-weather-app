import { Locator } from '@playwright/test';
import { LibAuthTests } from './6.auth';

export type AccessAccount2faArgT<T> = {
  pwd: string;
} & T;

export abstract class LibUserTests extends LibAuthTests {
  private async submitAccessAccForm(pwd: string, pushTo: string): Promise<void> {
    await this.nav('/user/manage-account');
    await this.waitPushTo('/user/access-manage-account');

    this.setFormID('access_manage_acc_form');
    const form: Locator = await this.getForm();

    await this.fillWith(form, {
      field: 'password',
      val: pwd,
    });

    await this.submit();
    await this.waitPushTo(pushTo);
  }

  private async getSwapperManageAccount(): Promise<Locator> {
    this.setSwapperID('manage_account');
    const swapper: Locator = await this.getSwapper();

    await this.timer();

    return swapper;
  }

  public async getAccessAccount(pwd: string): Promise<Locator> {
    await this.submitAccessAccForm(pwd, '/user/manage-account');

    return await this.getSwapperManageAccount();
  }

  protected async getAccessAccountTotp({
    pwd,
    totpSecret,
  }: AccessAccount2faArgT<{ totpSecret: string }>): Promise<Locator> {
    await this.submitAccessAccForm(pwd, '/user/access-manage-account-2fa');

    await this.submitTotpForm({
      id: 'access_manage_acc_2fa',
      totpSecret,
      waitPushTo: '/user/manage-account',
    });

    return await this.getSwapperManageAccount();
  }

  protected async getAccessAccountBkp({
    pwd,
    bkpCodes,
  }: AccessAccount2faArgT<{
    bkpCodes: string[];
  }>): Promise<Locator> {
    await this.submitAccessAccForm(pwd, '/user/access-manage-account-2fa');

    await this.submitBkpForm({
      id: 'access_manage_acc_2fa',
      bkpCode: bkpCodes[0],
      waitPushTo: '/user/manage-account',
    });

    return await this.getSwapperManageAccount();
  }
}
