import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { FormGroup } from '@angular/forms';
import { PairPwdFormMng, PairPwdFormT } from './etc/paperwork/form_mng';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { NgClass } from '@angular/common';
import { Nullable } from '@/common/types/etc';
import { ConfSwapT } from '@/core/hooks/swap/etc/types';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/use_kit_strategy';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Component({
  selector: 'app-form-pair-pwd',
  imports: [PairPwd, FormShape, NgClass, UseFormShapeDir, UseIDsDir],
  templateUrl: './form-pair-pwd.html',
  styleUrl: './form-pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class FormPairPwd extends UseKitFormHk {
  // ? directives
  public readonly useKitStrategy: UseKitStrategyDir = inject(UseKitStrategyDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? props
  public readonly confSwap: InputSignal<Nullable<ConfSwapT>> = input<Nullable<ConfSwapT>>(null);

  // ? form group
  public readonly form: FormGroup = PairPwdFormMng.form();

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.useKitStrategy.strategy()(data as PairPwdFormT));
  };
}
