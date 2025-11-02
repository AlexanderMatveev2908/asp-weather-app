/* eslint-disable no-magic-numbers */
import { Nullable, TimerIdT } from '@/common/types/etc';
import { Injectable, Signal } from '@angular/core';
import { BaseSearchBarFormT } from '../paperwork';
import { FormGroup } from '@angular/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibEtc } from '@/core/lib/etc';
import { LibMemoryMng } from '@/core/lib/data_structure/memory_mng';
import { LibLog } from '@/core/lib/dev/log';
import { LibSearchBar } from '../lib';
import { SearchQueryArgT } from '../types';
import { TriggerStrategyArgT } from '@/layout/search_layout/search-layout';

export interface UseDebounceMainArgT<T> {
  form: FormGroup;
  formVal: Nullable<Signal<BaseSearchBarFormT<T>>>;
  triggerStrategy: (arg: TriggerStrategyArgT<T>) => void;
}

@Injectable()
export class UseDebounceHk<T> extends UseInjCtxHk {
  public timerID: TimerIdT = null;
  private prevForm: Nullable<BaseSearchBarFormT<T>> = null;

  private readonly MARGIN_DEBOUNCE: number = 1000;

  private isSameData<T>(dataNow: BaseSearchBarFormT<T>): boolean {
    // ! 1. flattening data to compare allow to avoid triggering just
    // ! because internal IDs change while leaving data intact
    // ! 2. then `txtInputs` fields beng dynamic can be added and removed
    // ! and to avoid triggering a request for every push/removeAt even if
    // ! data does not really changed the `flatSearchForm` skip empty strings for `txtInputs`
    const currFlatten: SearchQueryArgT = LibSearchBar.flatSearchForm(dataNow);
    const prevFlatten: SearchQueryArgT = LibSearchBar.flatSearchForm(this.prevForm);

    return LibMemoryMng.isSame(currFlatten, prevFlatten);
  }

  public readonly forceSetPrevForm: (data: BaseSearchBarFormT<T>) => void = (
    data: BaseSearchBarFormT<T>
  ) => {
    this.prevForm = data;
  };

  public readonly main: (arg: UseDebounceMainArgT<T>) => void = ({
    form,
    formVal,
    triggerStrategy,
  }: UseDebounceMainArgT<T>) => {
    this.useEffect(() => {
      void formVal?.();

      if (this.timerID) this.timerID = LibEtc.clearTmrID(this.timerID);

      this.timerID = setTimeout(() => {
        const dataNow: Nullable<BaseSearchBarFormT<T>> = formVal?.() ?? null;

        if (!dataNow || !form.valid) {
          this.timerID = LibEtc.clearTmrID(this.timerID);
          return;
        }

        if (this.isSameData(dataNow)) {
          LibLog.logTtl('skip same data');
        } else {
          triggerStrategy({ dataForm: dataNow });
        }

        this.timerID = LibEtc.clearTmrID(this.timerID);
      }, this.MARGIN_DEBOUNCE);
    });
  };
}
