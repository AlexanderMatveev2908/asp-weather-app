import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { UseKitFormPwdHk } from '@/core/forms/pwd/etc/hooks/use_kit_form_pwd';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BkpFormMng, BkpFormT } from './etc/paperwork/form_mng';
import { TxtSvgFieldT } from '@/common/types/forms';
import { PwdFieldsUiFkt } from '@/core/ui_fkt/form_fields/1.pwd';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseForm2faDir } from '../../etc/directives/use_form_2fa';

@Component({
  selector: 'app-bkp-form',
  imports: [SwapItem, FormFieldTxt, UseFormFieldDir, FormSubmit, UseIDsDir, ReactiveFormsModule],
  templateUrl: './bkp-form.html',
  styleUrl: './bkp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class BkpForm extends UseKitFormPwdHk {
  // ? directives
  public readonly useForm2faDir: UseForm2faDir = inject(UseForm2faDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  public readonly form: FormGroup = BkpFormMng.form();
  public readonly bkpField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFieldsUiFkt.fieldByBool('bkp', this.isPwdTypePwd())
  );

  public readonly onSubmit: () => void = () =>
    this.submitForm((data: unknown) =>
      this.useForm2faDir.strategy()({
        cbcHmacToken: this.useForm2faDir.cbcHmacSlice.cbcHmac()!,
        backupCode: (data as BkpFormT).bkp,
      })
    );
}
