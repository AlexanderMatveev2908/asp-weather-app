/* eslint-disable @typescript-eslint/prefer-readonly */
import { Nullable, TimerIdT } from '@/common/types/etc';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { Directive, inject, Signal } from '@angular/core';
import { UseAppAuthDir } from './1.use_app_auth';
import { LibEtc } from '@/core/lib/etc';
import { CbcHmacKeyTmrT } from '@/features/cbcHmac/reducer/reducer';
import { ConstantsApp } from '@/core/constants';
import { TokenT } from '@/features/cbcHmac/etc/types';

@Directive()
export abstract class UseAppCbcHmacDir extends UseAppAuthDir {
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  private timerSavingID: TimerIdT = null;
  private timerDeletingID: TimerIdT = null;

  protected populateCbcHmac(): void {
    const cbcHmac: Nullable<string> = this.useStorage.getItem('cbcHmacToken');
    if (!cbcHmac) return;
    this.cbcHmacSlice.saveCbcHmac(cbcHmac, { startTmr: false });
  }

  public resetSavingCbcHmac(): void {
    this.useEffect(() => {
      this.resetCbcHmacTmr('saving', this.cbcHmacSlice.saving, 'timerSavingID');
    });
  }

  public resetClearingCbcHmac(): void {
    this.useEffect(() => {
      this.resetCbcHmacTmr('deleting', this.cbcHmacSlice.deleting, 'timerDeletingID');
    });
  }

  private resetCbcHmacTmr(
    key: CbcHmacKeyTmrT,
    valSig: Signal<boolean>,
    timerRef: 'timerSavingID' | 'timerDeletingID'
  ): void {
    const val = valSig();
    if (!val) return;

    this[timerRef] = setTimeout(() => {
      if (!valSig()) {
        this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
        return;
      }

      if (key === 'saving') this.cbcHmacSlice.setSavingTmr(false);
      else this.cbcHmacSlice.setDeletingTmr(false);
      this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
    }, ConstantsApp.TIMER_RESET_WINDOW);
  }

  private notSamePath(expected: string): (path: string) => boolean {
    return (path: string) => path !== expected;
  }
  private notSamePathMap: Map<TokenT, (path: string) => boolean> = new Map<
    TokenT,
    (path: string) => boolean
  >([
    [TokenT.MANAGE_ACC, this.notSamePath('/user/manage-account')],
    [
      TokenT.RECOVER_PWD,
      (path: string) =>
        this.notSamePath('/auth/recover-pwd')(path) &&
        this.notSamePath('/verify/recover-pwd-2fa')(path),
    ],
    [TokenT.LOGIN_2FA, this.notSamePath('/auth/login-2fa')],
    [TokenT.MANAGE_ACC_2FA, this.notSamePath('/user/access-manage-account-2fa')],
    [TokenT.CHANGE_EMAIL_2FA, this.notSamePath('/verify/change-email-2fa')],
    [TokenT.RECOVER_PWD_2FA, this.notSamePath('/auth/recover-pwd-2fa')],
  ]);

  private isOutOfPlace(tokenT: TokenT, goingTo: string): boolean {
    const partial: string = goingTo.split('?')[0];

    return !!this.notSamePathMap.get(tokenT)?.(partial);
  }

  public delCbcHmacOnNavOut(): void {
    this.useEffect(() => {
      const tokenT: Nullable<TokenT> = this.cbcHmacSlice.getTokenT();
      const goingTo: Nullable<string> = this.useNav.goingTo();

      if (!tokenT || !goingTo || this.cbcHmacSlice.saving()) return;

      if (this.isOutOfPlace(tokenT, goingTo)) this.cbcHmacSlice.clearCbcHmac({ startTmr: false });
    });
  }
}
