import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { PageWrapper } from '../page_wrapper/page-wrapper';
import { PageCounter } from './page_counter/page-counter';
import { SearchBar } from './search_bar/search-bar';
import {
  UseSearchBarPaginationPropsDir,
  UseSearchBarPropsDir,
  UseSearchBarStrategyPropsDir,
} from './search_bar/etc/directives/use_search_bar_props';
import { HitsCounter } from './hits_counter/hits-counter';
import { UseDebounceHk } from './search_bar/etc/hooks/use_debounce';
import { BaseSearchBarFormT } from './search_bar/etc/paperwork';
import { PaginationArgT, SearchQueryArgT } from './search_bar/etc/types';
import { LibSearchBar } from './search_bar/etc/lib';
import { UsePaginationHk } from './search_bar/etc/hooks/use_pagination';
import { finalize, Observable } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { FormGroup } from '@angular/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

export interface TriggerStrategyArgT<T> {
  dataForm?: Nullable<BaseSearchBarFormT<T>>;
  dataPagination?: Partial<PaginationArgT>;
}

@Component({
  selector: 'app-search-layout',
  imports: [
    PageWrapper,
    SearchBar,
    PageCounter,
    HitsCounter,
    UseSearchBarPropsDir,
    UseSearchBarStrategyPropsDir,
    UseSearchBarPaginationPropsDir,
  ],
  templateUrl: './search-layout.html',
  styleUrl: './search-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDebounceHk, UsePaginationHk],
})
export class SearchLayout<T> extends UseInjCtxHk implements OnInit {
  // ? directives
  public readonly useSearchBarProps: UseSearchBarPropsDir<T> = inject(UseSearchBarPropsDir);
  public readonly useSearchBarPaginationProps: UseSearchBarPaginationPropsDir = inject(
    UseSearchBarPaginationPropsDir
  );

  // ? personal props
  public readonly strategy: InputSignal<(data: SearchQueryArgT) => Observable<unknown>> =
    input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
  public readonly keyRefresh: InputSignal<number> = input.required();

  // ? hooks
  public readonly useDebounce: UseDebounceHk<T> = inject(UseDebounceHk);
  public readonly usePagination: UsePaginationHk = inject(UsePaginationHk);

  // ? helpers
  private getMainApiData(
    workingForm: FormGroup,
    arg?: TriggerStrategyArgT<T>
  ): Nullable<BaseSearchBarFormT<T>> {
    // ! return value only if form is valid
    // ! for debounce logic it is in every case checked
    // ! but pagination does not look for hid validation so this block must prevent
    // ! invalid api arguments on page-change/window-resize
    return arg?.dataForm ?? (workingForm.valid ? workingForm.value : null);
  }

  // ? local state
  private firstRun: boolean = false;

  // ? listeners
  public readonly triggerStrategy: (arg?: TriggerStrategyArgT<T>) => void = (
    arg?: TriggerStrategyArgT<T>
  ) => {
    const workingForm: FormGroup = this.useSearchBarProps.form();
    const dataApi: Nullable<BaseSearchBarFormT<T>> = this.getMainApiData(workingForm, arg);
    this.useDebounce.forceSetPrevForm(workingForm.value);

    const dataWithPagination: SearchQueryArgT = LibSearchBar.searchDataOf(
      dataApi,
      arg?.dataPagination
    );

    this.strategy()(dataWithPagination)
      .pipe(
        finalize(() => {
          this.firstRun = true;
        })
      )
      .subscribe();
  };

  ngOnInit(): void {
    this.useEffect(() => {
      const keyRefresh: number = this.keyRefresh();
      // ! skip first call because `keyRefresh` being false so 0
      // ! means no post/put operations have been executed, so
      // ! data does not need a retrigger and in every case
      // ! first call will be executed by page counter
      // ! when calculates first time his internal `blockPerPage` field
      if (!keyRefresh && this.firstRun) return;

      this.triggerStrategy();
    });
  }
}
