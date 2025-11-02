import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormFieldDynamic } from '@/common/components/forms/dynamic_fields_array/form_field_dynamic/form-field-dynamic';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { Nullable } from '@/common/types/etc';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { UseHoverHk } from '@/core/hooks/listeners/use_hover';
import { UseIDsDir } from '@/core/directives/use_ids';
import { BtnTooltip } from '@/common/components/btns/btn_tooltip/btn-tooltip';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { TxtFieldArrayT } from '@/common/types/forms';
import { UseSpanDir } from '@/core/directives/use_span';
import { SearchBarDropAddField } from './drop_add_field/search-bar-drop-add-field';
import { FocusDOM } from '@/core/lib/dom/focus';
import { BaseSearchBarFormT } from '../../paperwork';

@Component({
  selector: 'app-search-bar-txt-fields-row',
  imports: [
    FormFieldDynamic,
    UseFormFieldDynamicDir,
    BtnTooltip,
    UseIDsDir,
    UseSpanDir,
    SearchBarDropAddField,
  ],
  templateUrl: './search-bar-txt-fields-row.html',
  styleUrl: './search-bar-txt-fields-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk],
})
export class SearchBarTxtFieldsRow<T> {
  // ? props
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly formVal: InputSignal<Nullable<BaseSearchBarFormT<T>>> = input.required();
  public readonly txtInputsAvailable: InputSignal<() => TxtFieldArrayT[]> = input.required();

  // ? optional dep recalculate coords tooltip
  public readonly optionalDep: WritableSignal<number[]> = signal([0]);

  // ? helpers
  public getTxtCtrl(idx: number): FormControl {
    return this.form().get(`txtInputs.${idx}`) as FormControl;
  }

  public readonly removeItem: (idx: number) => void = (idx: number) => {
    const txtInputs: FormArray = this.form().get('txtInputs') as FormArray;
    txtInputs.removeAt(idx);

    setTimeout(() => {
      this.optionalDep.update((prev: number[]) => [...prev, prev.length]);
      FocusDOM.byDataField(`txtInputs.${txtInputs.length - 1}`);
    }, 0);
  };

  // ? btn tooltip props
  public readonly spanProps: (f: Nullable<TxtFieldArrayT>) => SpanEventPropsT = (
    f: Nullable<TxtFieldArrayT>
  ): SpanEventPropsT => ({
    Svg: SvgFillClose,
    eventT: 'ERR',
    label: `Remove ${f?.label}`,
  });
}
