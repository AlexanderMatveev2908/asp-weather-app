import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { Observable, tap } from 'rxjs';
import { Form2faT } from '@/common/types/etc';
import { UseAuthKitSvc } from '@/features/auth/etc/services/use_auth_kit';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-login-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './login-2fa.html',
  styleUrl: './login-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class Login2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) =>
    this.useAuthKit.authApi.login2FA(data).pipe(
      tap((res: ResApiT<JwtResT>) => {
        this.useAuthKit.authSlice.login(res.accessToken, { startTmr: true });

        void this.useNav.replace('/');
      })
    );

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/auth/login-2fa', TokenT.LOGIN_2FA);
  }
}
