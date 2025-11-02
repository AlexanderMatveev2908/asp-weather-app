import { computed, inject, Injectable, Signal } from '@angular/core';
import { UseNavSvc } from '../services/use_nav/use_nav';
import { UserSlice } from '@/features/user/slice';
import { AuthSlice } from '@/features/auth/slice';
import { UseInjCtxHk } from './use_inj_ctx';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { Nullable } from '@/common/types/etc';
import { NavFromT } from '../services/use_nav/etc/0.use_path';
import { v4 } from 'uuid';

export interface PushToOptT {
  pushTo: string;
  from?: Nullable<NavFromT>;
}

@Injectable()
export class UseRouteMngHk extends UseInjCtxHk {
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);
  protected readonly userSlice: UserSlice = inject(UserSlice);
  protected readonly authSlice: AuthSlice = inject(AuthSlice);
  protected cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  protected readonly isLoggedAllowed: Signal<boolean> = computed(
    () =>
      this.authSlice.isLogged() ||
      this.authSlice.authState().loggingOut ||
      !this.userSlice.handshake()
  );
  protected readonly isNonLoggedAllowed: Signal<boolean> = computed(
    () => !this.authSlice.isLogged() || this.authSlice.loggingIn()
  );

  public pushOutNotLogged(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.isLoggedAllowed()) return;

        void this.useNav.replace('/auth/login');
      });
    });
  }

  public pushOutLogged(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.isNonLoggedAllowed()) return;

        void this.useNav.replace('/');
      });
    });
  }

  // ? from state navigation can be improved adding more complexity
  // ? for my current needs i preferred made it simple and concise
  // ? eventually improving later
  public pushOutIfNotFrom(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathEqual(path, () => {
        if (this.useNav.allowedFrom()) return;

        void this.useNav.replace('/');
      });
    });
  }

  private pushUsingOpt(opt?: PushToOptT): void {
    const pushTo: string = opt?.pushTo ?? '/';
    const from: Nullable<NavFromT> = opt?.from ?? null;
    void this.useNav.replace(pushTo, { from });
  }

  public pushOutIfNotTokenType(path: string, expected: TokenT, opt?: PushToOptT): void {
    this.useEffect(() => {
      this.useNav.ifPathEqual(path, () => {
        void this.cbcHmacSlice.cbcHmac();

        // ! right after success i delete cbc and to avoid being pushed away i use an internal flag to have a short window to go instead to notice page
        // | i used same strategy for auth in auth out
        if (this.cbcHmacSlice.isTypeOrClearing(expected)) return;

        this.pushUsingOpt(opt);
      });
    });
  }

  public pushIfCbcHmacPresentOrNotType(
    path: string,
    opt?: PushToOptT & { tolerated?: TokenT }
  ): void {
    this.useEffect(() => {
      this.useNav.ifPathEqual(path, () => {
        void this.cbcHmacSlice.cbcHmac();

        if (this.cbcHmacSlice.isNullOrSaving()) return;

        // ! if present token, at most is tolerated just one type for special case
        const type: Nullable<TokenT> = this.cbcHmacSlice.getTokenT();
        if (type === (opt?.tolerated ?? v4())) return;

        this.pushUsingOpt(opt);
      });
    });
  }
}
