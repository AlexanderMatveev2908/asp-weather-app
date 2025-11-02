import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';
import { TotpFormUiFkt, TotpPartFieldsT } from './etc/ui_fkt';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TotpFormMng, TotpFormT } from './etc/paperwork/form_mng';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { FocusDOM } from '@/core/lib/dom/focus';

import { TotpPart } from './totp_part/totp-part';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { Nullable } from '@/common/types/etc';
import { toSignal } from '@angular/core/rxjs-interop';
import { UseTotpFormKeysHk } from './etc/hooks/key_mng';
import { UseForm2faDir } from '../../etc/directives/use_form_2fa';
import { FormFieldErr } from '@/common/components/forms/base_fields/form_field_err/form-field-err';

@Component({
  selector: 'app-totp-form',
  imports: [
    SwapItem,
    FormSubmit,
    UseIDsDir,
    ReactiveFormsModule,
    FormFieldErr,
    TotpPart,
    UseFormFieldDir,
  ],
  templateUrl: './totp-form.html',
  styleUrl: './totp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk, UseTotpFormKeysHk],
})
export class TotpForm extends UseKitFormHk implements OnInit, AfterViewInit {
  // ? directives
  public readonly useForm2faDir: UseForm2faDir = inject(UseForm2faDir);
  public readonly useIDs: UseIDsDir = inject(UseIDsDir);

  // ? hooks
  public readonly useTotpKeys: UseTotpFormKeysHk = inject(UseTotpFormKeysHk);

  // ! used function so every form has his own memory allocation
  public readonly partsFields: TotpPartFieldsT[] = TotpFormUiFkt.partsFields();
  public readonly form: FormGroup = TotpFormMng.form();

  // ? helpers
  public getSkip(outerIdx: number): number {
    return TotpFormUiFkt.skip(outerIdx);
  }
  public readonly formCtrl: (outerIdx: number) => (innerIdx: number) => FormControl = (
    outerIdx: number
  ) => {
    const skip: number = this.getSkip(outerIdx);
    return (innerIdx: number) => this.getCtrl(`totp.${skip + innerIdx}`);
  };

  // ? listeners
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) =>
      this.useForm2faDir.strategy()({
        cbcHmacToken: this.useForm2faDir.cbcHmacSlice.cbcHmac()!,
        totpCode: (data as TotpFormT).totp.join(''),
      })
    );
  };

  // ? local state
  private formVal: Nullable<Signal<TotpFormT>> = null;

  ngOnInit(): void {
    this.useInjCtx.inCtx(() => {
      this.formVal = toSignal(this.form.valueChanges, {
        initialValue: this.form.value,
      });
    });
  }

  ngAfterViewInit(): void {
    this.useInjCtx.useDOM(() => {
      FocusDOM.byDataField('totp.0');
    });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeysDown(e: KeyboardEvent): void {
    const val: Nullable<string[]> = this.formVal?.()?.totp ?? null;
    if (!val) return;

    const key: string = e.key;

    this.useTotpKeys.switchKey({
      key,
      form: this.form,
    });
  }
}
