import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { UseFiltersHk } from '../../../hooks/use_filters';
import { SearchBarFilterT } from '../../../ui_fkt';
import { CheckBoxFieldT } from '@/common/types/forms';
import { Nullable } from '@/common/types/etc';
import { FormFieldBoxLg } from '@/common/components/forms/boxes/form_field_box_lg/form-field-box-lg';
import { FormControl, FormGroup } from '@angular/forms';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-search-bar-filter-bar-vals',
  imports: [FormFieldBoxLg, UseFormFieldDir, UseIDsDir],
  templateUrl: './search-bar-filter-bar-vals.html',
  styleUrl: './search-bar-filter-bar-vals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBarVals {
  public readonly useFilters: InputSignal<UseFiltersHk> = input.required();
  public readonly filtersAvailable: InputSignal<() => SearchBarFilterT[]> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();

  // ? helpers
  public getCtrl(f: CheckBoxFieldT): FormControl {
    return this.form().get(f.name) as FormControl;
  }

  // ? derived
  public readonly currFilters: Signal<CheckBoxFieldT[]> = computed(() => {
    const available: SearchBarFilterT[] = this.filtersAvailable()();

    const currSearchFilter: Nullable<SearchBarFilterT> =
      available.find((f: SearchBarFilterT) => f.field === this.useFilters().currFilter()) ?? null;

    return currSearchFilter?.fields ?? available[0].fields;
  });
}
