import { Nullable } from '@/common/types/etc';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { SearchBarTxtFieldsRow } from './etc/fragments/txt_fields_row/search-bar-txt-fields-row';
import { SearchBarBtnsRow } from './etc/fragments/btns_row/search-bar-btns-row';
import { SearchBarFilterBar } from './etc/fragments/filter_bar/search-bar-filter-bar';
import { UseBarsHk } from './etc/hooks/use_bars';
import { UseFiltersHk } from './etc/hooks/use_filters';
import { v4 } from 'uuid';
import { SearchBarSortBar } from './etc/fragments/sort_bar/search-bar-sort-bar';
import {
  UseSearchBarPropsDir,
  UseSearchBarStrategyPropsDir,
} from './etc/directives/use_search_bar_props';
import { BaseSearchBarFormT } from './etc/paperwork';
import { UseDebounceHk } from './etc/hooks/use_debounce';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule,
    SearchBarTxtFieldsRow,
    SearchBarBtnsRow,
    SearchBarFilterBar,
    SearchBarSortBar,
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseBarsHk, UseFiltersHk],
})
export class SearchBar<T> implements OnInit {
  // ? directives
  public readonly useSearchBarProps: UseSearchBarPropsDir<UseSearchBarPropsDir<T>> =
    inject(UseSearchBarPropsDir);
  public readonly useSearchBarStrategyProps: UseSearchBarStrategyPropsDir<T> = inject(
    UseSearchBarStrategyPropsDir
  );

  // ? personal props
  public readonly useDebounce: InputSignal<UseDebounceHk<T>> = input.required();

  // ? hooks
  public readonly useBars: UseBarsHk = inject(UseBarsHk);
  public readonly useFilters: UseFiltersHk = inject(UseFiltersHk);

  // ? listeners
  public onSubmit(): void {
    if (!this.useSearchBarProps.form().valid) {
      FormZodMng.onSubmitFailed(this.useSearchBarProps.form());
      return;
    }
    this.useSearchBarStrategyProps.triggerStrategy()();
  }

  public readonly onErase: () => void = () => {
    const { txtInputs, ...plainCtrlFields } = this.useSearchBarProps.defState();

    this.useSearchBarProps.form().patchValue(plainCtrlFields);
    const txtInputsFormArray: FormArray = this.useSearchBarProps
      .form()
      .get('txtInputs') as FormArray;
    txtInputsFormArray.clear();
    for (const f of txtInputs!) txtInputsFormArray.push(new FormControl({ ...f, id: v4() }));

    this.useSearchBarStrategyProps.usePagination().reset();
    this.useSearchBarStrategyProps.triggerStrategy()();
  };

  // ? local state
  public formVal: Nullable<Signal<BaseSearchBarFormT<T>>> = null;

  ngOnInit(): void {
    this.useSearchBarProps.inCtx(() => {
      this.formVal = toSignal(this.useSearchBarProps.form().valueChanges, {
        initialValue: this.useSearchBarProps.form().value,
      });
    });

    this.useDebounce().main({
      form: this.useSearchBarProps.form(),
      formVal: this.formVal,
      triggerStrategy: this.useSearchBarStrategyProps.triggerStrategy(),
    });
  }
}
