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
import { WithEventT } from '@/common/types/etc';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-search-bar-filter-bar-labels',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './search-bar-filter-bar-labels.html',
  styleUrl: './search-bar-filter-bar-labels.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBarLabels {
  public readonly useFilters: InputSignal<UseFiltersHk> = input.required();
  public readonly filtersAvailable: InputSignal<() => SearchBarFilterT[]> = input.required();

  // ? derived
  public readonly filters: Signal<SearchBarFilterT[]> = computed(() => this.filtersAvailable()());

  // ? helpers
  public withEvent(f: SearchBarFilterT): SearchBarFilterT & WithEventT {
    return {
      ...f,
      eventT: 'INFO',
    };
  }

  public twd(f: SearchBarFilterT): string {
    return f.field === this.useFilters().currFilter() ? 'bg-blue-600 text-gray-300' : '';
  }

  // ? listeners
  public onClick(f: SearchBarFilterT): void {
    this.useFilters().currFilter.set(f.field);
  }
}
