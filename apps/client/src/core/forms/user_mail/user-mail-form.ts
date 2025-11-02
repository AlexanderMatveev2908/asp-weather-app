import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { TxtFieldT } from '@/common/types/forms';
import { MailFormMng, MailFormT } from '@/core/paperwork/etc/mail';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { MailFormUiFkt } from '@/core/ui_fkt/form_fields/1.mail';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { NgClass } from '@angular/common';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/use_kit_strategy';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { UserSlice } from '@/features/user/slice';
import { UserT } from '@/features/user/etc/types';
import { Nullable } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Reg } from '@/core/paperwork/reg';

export type MailExpectedT = 'equal' | 'different';

@Component({
  selector: 'app-user-mail-form',
  imports: [
    ReactiveFormsModule,
    FormFieldTxt,
    FormShape,
    NgClass,
    UseFormShapeDir,
    UseIDsDir,
    UseFormFieldDir,
  ],
  templateUrl: './user-mail-form.html',
  styleUrl: './user-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class UserMailForm extends UseKitFormHk implements OnInit {
  // ? props
  public readonly mailMustBe: InputSignal<MailExpectedT> = input.required();

  // ? svc
  public readonly userSlice: UserSlice = inject(UserSlice);

  // ? derived
  public readonly user: Signal<Nullable<UserT>> = this.userSlice.user;

  // ? directives
  public readonly useKitStrategy: UseKitStrategyDir = inject(UseKitStrategyDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? static assets
  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  private readonly msgEqual: string = 'Email must be the same declared at registration time';
  private readonly msgDiff: string = 'New email must be different from the old one';

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.useKitStrategy.strategy()(data as MailFormT));
  };

  protected mailVal: Nullable<Signal<string>> = null;

  ngOnInit(): void {
    const c: FormControl = this.form.get('email') as FormControl;

    this.useInjCtx.inCtx(() => {
      this.mailVal = toSignal(c.valueChanges as Observable<string>, {
        initialValue: c.value,
      });
    });

    this.useInjCtx.useEffect(() => {
      const us: Nullable<UserT> = this.user();
      const currVal: Nullable<string> = this.mailVal?.() ?? null;
      if (!us || !Reg.isMail(currVal)) return;

      if (
        (this.mailMustBe() === 'equal' && currVal === us.email) ||
        (this.mailMustBe() === 'different' && currVal !== us.email)
      )
        return;

      this.form.markAsDirty();
      this.form.markAsTouched();

      const msg: string = this.mailMustBe() === 'equal' ? this.msgEqual : this.msgDiff;

      this.form.setErrors({
        email: msg,
      });
      c.setErrors({
        zod: msg,
      });
    });
  }
}
