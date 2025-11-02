import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { Form2faT } from '@/common/types/etc';
import { Observable, tap } from 'rxjs';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { VerifyApiSvc } from '@/features/verify/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { AuthSlice } from '@/features/auth/slice';
import { UserSlice } from '@/features/user/slice';
import { UseKitNav } from '@/core/services/use_kit_nav';

@Component({
  selector: 'app-change-email-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './change-email-2fa.html',
  styleUrl: './change-email-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class ChangeEmail2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly verifyApi: VerifyApiSvc = inject(VerifyApiSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);
  private readonly useNavKit: UseKitNav = inject(UseKitNav);

  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) =>
    this.verifyApi.confNewMail2fa(data).pipe(
      tap((res: ResApiT<JwtResT>) => {
        this.userSlice.triggerApi();
        this.authSlice.login(res.accessToken, { startTmr: true });

        this.useNavKit.pushNotice({
          eventT: 'OK',
          msg: 'email address changed',
          status: 200,
        });
      })
    );

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/verify/change-email-2fa', TokenT.CHANGE_EMAIL_2FA);
  }
}
