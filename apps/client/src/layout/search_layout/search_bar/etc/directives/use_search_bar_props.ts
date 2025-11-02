import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseSearchBarFormT } from '../paperwork';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchBarFilterT, SearchBarSorterT } from '../ui_fkt';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { TriggerStrategyArgT } from '@/layout/search_layout/search-layout';
import { UsePaginationHk } from '../hooks/use_pagination';

@Directive({
  selector: '[appUseSearchBarPropsDir]',
})
export class UseSearchBarPropsDir<T> extends UseInjCtxHk {
  // ? props
  public readonly defState: InputSignal<BaseSearchBarFormT<T>> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly txtInputsAvailable: InputSignal<() => TxtFieldArrayT[]> = input.required();
  public readonly filtersAvailable: InputSignal<() => SearchBarFilterT[]> = input.required();
  public readonly sortersAvailable: InputSignal<() => SearchBarSorterT[]> = input.required();
}

@Directive({
  selector: '[appUseSearchBarStrategyPropsDir]',
})
export class UseSearchBarStrategyPropsDir<T> {
  public readonly triggerStrategy: InputSignal<(arg?: TriggerStrategyArgT<T>) => void> =
    input.required();
  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
}

@Directive({
  selector: '[appUseSearchBarPaginationPropsDir]',
})
export class UseSearchBarPaginationPropsDir {
  // ? page related
  public readonly nHits: InputSignal<number> = input.required();
  public readonly pages: InputSignal<number> = input.required();
}
