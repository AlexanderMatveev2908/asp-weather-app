import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MailFormMng, MailFormT } from '../../paperwork/etc/mail';
import { MailFormUiFkt } from '../../ui_fkt/form_fields/1.mail';
import { TxtFieldT } from '@/common/types/forms';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { Observable } from 'rxjs';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Component({
  selector: 'app-auth-mail-form',
  imports: [AuthFormShape, FormFieldTxt, UseFormShapeDir, UseIDsDir, UseFormFieldDir],
  templateUrl: './auth-mail-form.html',
  styleUrl: './auth-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class AuthMailForm extends UseKitFormHk {
  // ? not need by parent
  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  // ? props
  public readonly strategy: InputSignal<(data: MailFormT) => Observable<unknown>> =
    input.required();
  public readonly testId: InputSignal<string> = input.required();

  // ? listeners got by mixing extended inherited methods with
  // ? personal props
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as MailFormT));
  };
}
