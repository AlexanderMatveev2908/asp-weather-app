import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { Form2faT } from '@/common/types/etc';
import { Observable, tap } from 'rxjs';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { CbcHmacMandatoryT, TokenT } from '@/features/cbcHmac/etc/types';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseUserKitSvc } from '@/features/user/etc/services/use_user_kit';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';

@Component({
  selector: 'app-access-manage-account-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './access-manage-account-2fa.html',
  styleUrl: './access-manage-account-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class AccessManageAccount2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly useUserKit: UseUserKitSvc = inject(UseUserKitSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) =>
    this.useUserKit.userApi.accessManageAcc2fa(data).pipe(
      tap((res: ResApiT<CbcHmacMandatoryT>) => {
        this.cbcHmacSlice.saveCbcHmac(res.cbcHmacToken, { startTmr: true });

        void this.useNav.replace('/user/manage-account');
      })
    );

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType(
      '/user/access-manage-account-2fa',
      TokenT.MANAGE_ACC_2FA,
      {
        pushTo: '/user/access-manage-account',
      }
    );
  }
}
