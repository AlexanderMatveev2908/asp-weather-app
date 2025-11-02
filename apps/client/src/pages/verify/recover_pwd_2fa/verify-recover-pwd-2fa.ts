import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Form2faT } from '@/common/types/etc';
import { Observable, tap } from 'rxjs';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { CbcHmacMandatoryT, TokenT } from '@/features/cbcHmac/etc/types';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { VerifyApiSvc } from '@/features/verify/api';
import { ResApiT } from '@/core/store/api/etc/types';

@Component({
  selector: 'app-verify-recover-pwd-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './verify-recover-pwd-2fa.html',
  styleUrl: './verify-recover-pwd-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class VerifyRecoverPwd2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly verifyApi: VerifyApiSvc = inject(VerifyApiSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) =>
    this.verifyApi.recoverPwd2fa(data).pipe(
      tap((res: ResApiT<CbcHmacMandatoryT>) => {
        this.cbcHmacSlice.saveCbcHmac(res.cbcHmacToken, { startTmr: true });

        void this.useNav.replace('/auth/recover-pwd-2fa');
      })
    );

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/verify/recover-pwd-2fa', TokenT.RECOVER_PWD);
  }
}
