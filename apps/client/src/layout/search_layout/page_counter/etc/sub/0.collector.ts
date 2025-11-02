import {
  computed,
  Directive,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  UseSearchBarPaginationPropsDir,
  UseSearchBarStrategyPropsDir,
} from '@/layout/search_layout/search_bar/etc/directives/use_search_bar_props';
import { UsePaginationHk } from '@/layout/search_layout/search_bar/etc/hooks/use_pagination';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibPageCounter } from '../lib';

@Directive()
export abstract class UsePageCounterCollectorDir<T> extends UseInjCtxHk {
  // ? directives
  public readonly useSearchBarStrategyProps: UseSearchBarStrategyPropsDir<T> = inject(
    UseSearchBarStrategyPropsDir
  );
  public readonly useSearchbarPaginationPropsDir: UseSearchBarPaginationPropsDir = inject(
    UseSearchBarPaginationPropsDir
  );

  // ? personal props
  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();

  // ? local state
  public readonly pagesPerBlock: WritableSignal<number> = signal(1);

  // ? derived
  public readonly maxBlockAvailable: Signal<number> = computed(() =>
    LibPageCounter.maxBlocksAvailable(
      this.useSearchbarPaginationPropsDir.pages(),
      this.pagesPerBlock()
    )
  );
}
