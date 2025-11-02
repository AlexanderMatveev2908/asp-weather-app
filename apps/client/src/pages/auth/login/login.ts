import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { LoginFormMng, LoginFormT } from '@/features/auth/pages/login/paperwork/from_mng';
import { LoginFormUiFkt } from '@/features/auth/pages/login/ui_fkt';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { UseAuthKitSvc } from '@/features/auth/etc/services/use_auth_kit';
import { from, switchMap, tap } from 'rxjs';
import { JwtOrCbcHmacResT } from '@/features/auth/etc/types';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseKitFormPwdHk } from '@/core/forms/pwd/etc/hooks/use_kit_form_pwd';
import { PwdFieldsUiFkt } from '@/core/ui_fkt/form_fields/1.pwd';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { ErrApp } from '@/core/lib/err';

@Component({
  selector: 'app-login',
  imports: [CsrWithTitle, AuthFormShape, FormFieldTxt, UseIDsDir, UseFormShapeDir, UseFormFieldDir],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class Login extends UseKitFormPwdHk {
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  public readonly form: FormGroup = LoginFormMng.form;

  // ? assets
  public readonly mailField: TxtFieldT = LoginFormUiFkt.mailField;
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFieldsUiFkt.fieldByBool('password', this.isPwdTypePwd())
  );

  // ? listeners
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) =>
      this.useAuthKit.authApi.login(data as LoginFormT).pipe(
        tap((res: ResApiT<JwtOrCbcHmacResT>) => {
          if (res?.accessToken)
            this.useAuthKit.authSlice.login(res.accessToken, { startTmr: true });
          else if (res.cbcHmacToken)
            this.cbcHmacSlice.saveCbcHmac(res.cbcHmacToken, { startTmr: false });
          else throw new ErrApp('did the server sent a potato ? 🥔');
        }),
        switchMap((res: ResApiT<JwtOrCbcHmacResT>) =>
          from(this.useKitNav.useNav.replace(`/${res.cbcHmacToken ? 'auth/login-2fa' : ''}`))
        )
      )
    );
  };
}
