import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseKitPairPwdFormHk } from '@/core/forms/pair_pwd/etc/hooks/use_kit_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { Observable, tap } from 'rxjs';
import { ConfSwapT } from '@/core/hooks/swap/etc/types';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseKitFormUserSvc } from '@/features/user/etc/services/use_kit_form_user';
import { Nullable } from '@/common/types/etc';
import { LibApiShape } from '@/core/store/api/etc/lib/shape';
import { PairPwdFormT } from '@/core/forms/pair_pwd/etc/paperwork/form_mng';
import { ResApiT } from '@/core/store/api/etc/types';

@Component({
  selector: 'app-change-pwd-form',
  imports: [FormPairPwd, UseKitStrategyDir, UseIDsDir],
  templateUrl: './change-pwd-form.html',
  styleUrl: './change-pwd-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class ChangePwdForm extends UseKitPairPwdFormHk {
  private readonly useKitUserForm: UseKitFormUserSvc = inject(UseKitFormUserSvc);

  public readonly confSwap: InputSignal<ConfSwapT> = input.required();

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    const cbcHmac: Nullable<string> = this.useKitUserForm.cbcHmacSlice.cbcHmac();

    return LibApiShape.throwIfCbcHmacMissing(
      cbcHmac,
      this.useKitUserForm.useKitUser.userApi
        .changePwd({
          cbcHmacToken: cbcHmac!,
          password: (data as PairPwdFormT).password,
        })
        .pipe(
          tap((_: ResApiT<void>) => {
            this.useKitUserForm.useKitNav.pushNotice({
              eventT: 'OK',
              msg: 'Password changed',
              status: 200,
            });
          })
        )
    );
  };
}
