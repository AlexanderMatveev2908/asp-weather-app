import { computed, Injectable, Signal } from '@angular/core';
import { AuthStateT } from './reducer/reducer';
import { getAuthState } from './reducer/selectors';
import { UseKitSliceHk } from '@/core/hooks/kits/use_kit_slice';
import { AuthActT, LoggingKeyArgT, LoggingKeyT } from './reducer/actions';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class AuthSlice extends UseKitSliceHk {
  public get authState(): Signal<AuthStateT> {
    return this.store.selectSignal(getAuthState);
  }

  public login(accessToken: string, opt: { startTmr: boolean }): void {
    this.store.dispatch(AuthActT.AUTH__LOGIN());
    this.useStorage.setItem('accessToken', accessToken);
    if (opt.startTmr) this.setLoggingTmr({ key: 'loggingIn', val: true });
  }

  public logout(opt: { startTmr: boolean }): void {
    this.store.dispatch(AuthActT.AUTH__LOGOUT());
    this.useStorage.delItem('accessToken');
    if (opt.startTmr) this.setLoggingTmr({ key: 'loggingOut', val: true });
  }

  private setLoggingTmr(arg: LoggingKeyArgT): void {
    this.store.dispatch(AuthActT.AUTH__SET_LOGGING_TMR(arg));
  }
  public endLoggingTmr(key: LoggingKeyT): void {
    this.setLoggingTmr({ key, val: false });
  }

  public isLogged: Signal<boolean> = computed(() => this.authState().isLogged);
  public loggingIn: Signal<boolean> = computed(() => this.authState().loggingIn);
  public loggingOut: Signal<boolean> = computed(() => this.authState().loggingOut);
  public cbcHmac: Signal<Nullable<string>> = computed(() => this.authState().cbcHmac);
}
