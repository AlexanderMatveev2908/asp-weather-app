import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Observable, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { AuthMailForm } from '@/core/forms/auth_mail/auth-mail-form';
import { UseKitMailFormHk } from '@/core/hooks/kits/kit_form/-1.use_kit_mail';

@Component({
  selector: 'app-auth-req-mail-conf-mail',
  imports: [CsrWithTitle, AuthMailForm],
  templateUrl: './auth-req-mail-conf-mail.html',
  styleUrl: './auth-req-mail-conf-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailConfMail extends UseKitMailFormHk {
  public readonly strategy: (data: MailFormT) => Observable<unknown> = (data: MailFormT) =>
    this.requireMailAPi.confMail(data).pipe(
      tap((_: ResApiT<void>) => {
        this.useKitNav.pushMailNotice('to confirm your account');
      })
    );
}
