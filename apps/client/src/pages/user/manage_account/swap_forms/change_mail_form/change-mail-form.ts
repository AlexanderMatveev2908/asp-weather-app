import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { Observable, tap } from 'rxjs';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseKitFormUserSvc } from '@/features/user/etc/services/use_kit_form_user';
import { Nullable } from '@/common/types/etc';
import { LibApiShape } from '@/core/store/api/etc/lib/shape';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { ResApiT } from '@/core/store/api/etc/types';

@Component({
  selector: 'app-change-mail-form',
  imports: [UserMailForm, UseKitStrategyDir, UseIDsDir],
  templateUrl: './change-mail-form.html',
  styleUrl: './change-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeMailForm {
  private readonly useKitUserForm: UseKitFormUserSvc = inject(UseKitFormUserSvc);

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    const cbcHmac: Nullable<string> = this.useKitUserForm.cbcHmacSlice.cbcHmac();

    return LibApiShape.throwIfCbcHmacMissing(
      cbcHmac,
      this.useKitUserForm.useKitUser.userApi
        .changeMail({ ...(data as MailFormT), cbcHmacToken: cbcHmac as string })
        .pipe(
          tap((_: ResApiT<void>) => {
            this.useKitUserForm.useKitNav.pushMailNotice('to your new email address');
          })
        )
    );
  };
}
