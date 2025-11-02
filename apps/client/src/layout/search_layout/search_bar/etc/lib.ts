import { Nullable } from '@/common/types/etc';
import { LibPageCounter } from '../../page_counter/etc/lib';
import { BaseSearchBarFormT } from './paperwork';
import { PaginationArgT, SearchQueryArgT } from './types';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export class LibSearchBar {
  private static skipEmptyStuff(v: unknown): boolean {
    return !LibShapeCheck.isStr(v) && typeof v !== 'number' && !LibShapeCheck.hasArrData(v);
  }

  public static flatSearchForm<T>(arg: Nullable<Partial<BaseSearchBarFormT<T>>>): SearchQueryArgT {
    const flatten: SearchQueryArgT = {} as SearchQueryArgT;

    // ! beside flattening ignore empty strings or non-number values
    // ! which would trigger api calls for non real need of data change

    for (const k in arg) {
      const keyArg: keyof typeof arg = k as keyof typeof arg;
      // ! eventT are managed below
      if (k === 'txtInputs') continue;
      if (this.skipEmptyStuff(arg[keyArg])) continue;

      flatten[k] = arg[keyArg];
    }

    if (arg?.txtInputs?.length)
      for (const f of arg.txtInputs) {
        if (this.skipEmptyStuff(f.val)) continue;

        flatten[f.name] = f.val;
      }

    return flatten;
  }

  public static searchDataOf<T>(
    mainData: Nullable<BaseSearchBarFormT<T>>,
    paginationData?: Partial<PaginationArgT>
  ): SearchQueryArgT {
    const merged: Partial<BaseSearchBarFormT<T>> & PaginationArgT = {
      ...((mainData ?? {}) as Partial<BaseSearchBarFormT<T>>),
      page: paginationData?.page ?? 0,
      limit: paginationData?.limit ?? LibPageCounter.paginationVals.get('limit')!(),
    };

    return this.flatSearchForm(merged);
  }
}
