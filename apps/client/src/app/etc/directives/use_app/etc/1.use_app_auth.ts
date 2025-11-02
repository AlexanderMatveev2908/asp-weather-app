/* eslint-disable @typescript-eslint/prefer-readonly */
import { Nullable, TimerIdT } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { LoggingKeyT } from '@/features/auth/reducer/actions';
import { AuthSlice } from '@/features/auth/slice';
import { Directive, inject, Signal } from '@angular/core';
import { UseStorageSvc } from '@/core/services/use_storage';
import { ConstantsApp } from '@/core/constants';
import { UseAppScrollDir } from './0.use_app_scroll';

@Directive()
export abstract class UseAppAuthDir extends UseAppScrollDir {
  protected readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  protected readonly authSlice: AuthSlice = inject(AuthSlice);

  private timerInID: TimerIdT = null;
  private timerOutID: TimerIdT = null;

  protected markUserLogged(): void {
    const jwt: Nullable<string> = this.useStorage.getItem('accessToken');
    if (jwt) this.authSlice.login(jwt, { startTmr: false });
  }

  protected resetLoggingInTmr(): void {
    this.useEffect(() => {
      this.resetLoggingTmr('loggingIn', this.authSlice.loggingIn, 'timerInID');
    });
  }

  protected resetLoggingOutTmr(): void {
    this.useEffect(() => {
      this.resetLoggingTmr('loggingOut', this.authSlice.loggingOut, 'timerOutID');
    });
  }

  private resetLoggingTmr(
    key: LoggingKeyT,
    valSig: Signal<boolean>,
    timerRef: 'timerInID' | 'timerOutID'
  ): void {
    const val = valSig();
    if (!val) return;

    this[timerRef] = setTimeout(() => {
      if (!valSig()) {
        this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
        return;
      }

      this.authSlice.endLoggingTmr(key);
      this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
    }, ConstantsApp.TIMER_RESET_WINDOW);
  }
}
