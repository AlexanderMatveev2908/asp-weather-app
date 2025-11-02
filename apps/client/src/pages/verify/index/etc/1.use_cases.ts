import { Directive, inject } from '@angular/core';
import { UseMngVerifyDir } from './0.use_mng';
import { UserSlice } from '@/features/user/slice';
import { AuthSlice } from '@/features/auth/slice';
import { RecoverPwdResT, VerifyApiSvc } from '@/features/verify/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtOrCbcHmacResT, JwtResT } from '@/features/auth/etc/types';
import { from, switchMap, tap } from 'rxjs';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { CbcHmacMandatoryT } from '@/features/cbcHmac/etc/types';
import { ErrApp } from '@/core/lib/err';

@Directive()
export abstract class UseCasesVerifyDir extends UseMngVerifyDir {
  private readonly verifyApi: VerifyApiSvc = inject(VerifyApiSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  protected confMail(cbcHmac: string): void {
    this.verifyApi
      .confMail(cbcHmac)
      .pipe(
        tap((res: ResApiT<JwtResT>) => {
          this.authSlice.login(res.accessToken, { startTmr: false });

          this.userSlice.triggerApi();

          this.useNavKit.pushNotice({
            eventT: 'OK',
            msg: res.msg ?? 'account verified',
            status: 200,
          });
        })
      )
      .subscribe();
  }

  protected recoverPwd(cbcHmac: string): void {
    this.verifyApi
      .recoverPwd(cbcHmac)
      .pipe(
        tap((_: ResApiT<RecoverPwdResT>) => {
          this.cbcHmacSlice.saveCbcHmac(cbcHmac, { startTmr: false });
        }),
        switchMap((res: ResApiT<RecoverPwdResT>) => {
          const path: string = res.strategy2FA ? '/verify/recover-pwd-2fa' : '/auth/recover-pwd';
          return from(this.useNavKit.useNav.replace(`${path}`));
        })
      )
      .subscribe();
  }

  private confNewMailSimpleFlow(res: ResApiT<JwtResT>): void {
    this.authSlice.login(res.accessToken, { startTmr: false });

    this.userSlice.triggerApi();

    this.useNavKit.pushNotice({
      eventT: 'OK',
      msg: res.msg ?? 'email address changed',
      status: 200,
    });
  }

  private confNewMail2faFlow(res: ResApiT<CbcHmacMandatoryT>): void {
    this.cbcHmacSlice.saveCbcHmac(res.cbcHmacToken, { startTmr: true });

    void this.useNavKit.useNav.replace('/verify/change-email-2fa');
  }

  protected confNewMail(cbcHmac: string): void {
    this.verifyApi
      .confNewMail(cbcHmac)
      .pipe(
        tap((res: ResApiT<JwtOrCbcHmacResT>) => {
          if (res.accessToken) this.confNewMailSimpleFlow(res as ResApiT<JwtResT>);
          else if (res.cbcHmacToken) this.confNewMail2faFlow(res as ResApiT<CbcHmacMandatoryT>);
          else throw new ErrApp('did the server sent a potato ? 🥔');
        })
      )
      .subscribe();
  }
}
