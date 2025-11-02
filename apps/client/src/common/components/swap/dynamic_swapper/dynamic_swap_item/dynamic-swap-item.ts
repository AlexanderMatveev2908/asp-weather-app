import { FormFieldBoxLg } from '@/common/components/forms/boxes/form_field_box_lg/form-field-box-lg';
import { OpacityT } from '@/common/types/css';
import { CheckBoxFieldT } from '@/common/types/forms';
import { PaginationSwapStateT } from '@/core/hooks/swap/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-dynamic-swap-item',
  imports: [FormFieldBoxLg, UseFormFieldDir, UseIDsDir],
  templateUrl: './dynamic-swap-item.html',
  styleUrl: './dynamic-swap-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapItem {
  // ? props
  public readonly fields: InputSignal<CheckBoxFieldT[]> = input.required();
  public readonly paginationState: InputSignal<Omit<PaginationSwapStateT, 'swapIDs'>> =
    input.required();
  public readonly currOpacity: InputSignal<OpacityT> = input<OpacityT>('1');
  public readonly ctrl: InputSignal<FormControl> = input.required();
}
