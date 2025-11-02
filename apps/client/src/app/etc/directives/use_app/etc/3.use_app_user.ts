import { UseUserKitSvc } from '@/features/user/etc/services/use_user_kit';
import { Directive, inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { ResProfileT } from '@/features/user/etc/types';
import { UseAppCbcHmacDir } from './2.use_app_cbc_hmac';

@Directive()
export abstract class UseAppUserDir extends UseAppCbcHmacDir {
  protected readonly useUserKit: UseUserKitSvc = inject(UseUserKitSvc);

  protected fetchUser(): void {
    this.useEffect(() => {
      void this.authSlice.isLogged();
      void this.useUserKit.userSlice.mark();

      this.useUserKit.userSlice.setPending(true);
      this.useUserKit.userApi
        .getUser()
        .pipe(
          tap({
            next: (res: ResApiT<ResProfileT>) => {
              if (res?.user) this.useUserKit.userSlice.setUser(res.user);
              else this.useUserKit.userSlice.markNull();
            },
            error: (_: ErrApiT<void>) => {
              this.useUserKit.userSlice.markNull();
            },
          }),
          finalize(() => this.useUserKit.userSlice.setPending(false))
        )
        .subscribe();
    });
  }
}
