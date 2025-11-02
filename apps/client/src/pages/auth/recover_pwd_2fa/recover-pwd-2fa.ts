import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Observable, tap } from 'rxjs';
import { UseAuthKitSvc } from '@/features/auth/etc/services/use_auth_kit';
import { PairPwdFormT } from '@/core/forms/pair_pwd/etc/paperwork/form_mng';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseKitNav } from '@/core/services/use_kit_nav';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';

@Component({
  selector: 'app-recover-pwd-2fa',
  imports: [CsrWithTitle, FormPairPwd, UseKitStrategyDir, UseIDsDir],
  templateUrl: './recover-pwd-2fa.html',
  styleUrl: './recover-pwd-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class RecoverPwd2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly useNavKit: UseKitNav = inject(UseKitNav);

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) =>
    this.useAuthKit.authApi
      .recoverPwd2fa({
        password: (data as PairPwdFormT).password,
        cbcHmacToken: this.cbcHmacSlice.cbcHmac()!,
      })
      .pipe(
        tap((res: ResApiT<JwtResT>) => {
          this.useAuthKit.authSlice.login(res.accessToken, { startTmr: false });

          this.useNavKit.pushNotice({
            eventT: 'OK',
            msg: 'password updated',
            status: 200,
          });
        })
      );

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/auth/recover-pwd-2fa', TokenT.RECOVER_PWD_2FA);
  }
}
