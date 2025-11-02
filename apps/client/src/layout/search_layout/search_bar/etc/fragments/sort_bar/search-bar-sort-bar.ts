import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Popup } from '@/layout/popup/popup';
import { PopupStaticPropsT } from '@/layout/popup/etc/types';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseBarsHk } from '../../hooks/use_bars';
import { SearchBarSorterT } from '../../ui_fkt';
import { FormFieldBoxLg } from '@/common/components/forms/boxes/form_field_box_lg/form-field-box-lg';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckBoxFieldT } from '@/common/types/forms';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { Span } from '@/common/components/els/span/span';
import { SpanPropsT } from '@/common/components/els/span/etc/types';

@Component({
  selector: 'app-search-bar-sort-bar',
  imports: [Popup, UseIDsDir, FormFieldBoxLg, UseFormFieldDir, Span],
  templateUrl: './search-bar-sort-bar.html',
  styleUrl: './search-bar-sort-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarSortBar {
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly useBars: InputSignal<UseBarsHk> = input.required();
  public readonly sortersAvailable: InputSignal<() => SearchBarSorterT[]> = input.required();

  // ? helpers
  public getCtrl(f: CheckBoxFieldT): FormControl {
    return this.form().get(f.name) as FormControl;
  }

  public spanPropsOf(s: SearchBarSorterT): SpanPropsT {
    return {
      Svg: s.Svg,
      label: s.label,
    };
  }

  // ? app-popup props
  public readonly staticProps: PopupStaticPropsT = {
    closeOnMouseOut: true,
    cls: 'generic_popup',
    eventT: 'INFO',
    closePop: () => this.useBars().isSortBar.set(false),
  };

  public readonly sorters: Signal<SearchBarSorterT[]> = computed(() => this.sortersAvailable()());
}
