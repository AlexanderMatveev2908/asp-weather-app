import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthMailForm } from '@/core/forms/auth_mail/auth-mail-form';
import { UseKitMailFormHk } from '@/core/hooks/kits/kit_form/-1.use_kit_mail';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { ResApiT } from '@/core/store/api/etc/types';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-auth-req-mail-recover-pwd',
  imports: [CsrWithTitle, AuthMailForm],
  templateUrl: './auth-req-mail-recover-pwd.html',
  styleUrl: './auth-req-mail-recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailRecoverPwd extends UseKitMailFormHk {
  public strategy: (data: MailFormT) => Observable<unknown> = (data: MailFormT) =>
    this.requireMailAPi.recoverPwd(data).pipe(
      tap((_: ResApiT<void>) => {
        this.useKitNav.pushMailNotice('to recover your password');
      })
    );
}
