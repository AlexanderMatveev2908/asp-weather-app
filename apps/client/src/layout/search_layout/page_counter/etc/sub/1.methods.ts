import { Directive, untracked, WritableSignal } from '@angular/core';
import { UsePageCounterCollectorDir } from './0.collector';
import { LibPageCounter } from '../lib';
import { ElDomT } from '@/common/types/etc';
import { PageT } from '../types';

export interface RefreshPaginationReturnT {
  newLimitItemsPerPage: number;
  wasDifferent: boolean;
}

export type ChangeBlockMarkT = '+' | '-';

@Directive()
export abstract class UsePageCounterMethodsDir<T> extends UsePageCounterCollectorDir<T> {
  private scrollOnPageChange(): void {
    const hitsCounterDOM: ElDomT = document.getElementById('hits_counter');
    if (!hitsCounterDOM) return;

    const rect: DOMRect = hitsCounterDOM.getBoundingClientRect();

    setTimeout(() => {
      window.scroll({
        top: rect.top,
        behavior: 'smooth',
      });
    }, 0);
  }

  protected changeBlock(v: ChangeBlockMarkT): void {
    const blockSig: WritableSignal<number> = this.usePagination().block;

    blockSig.set(blockSig() + (v === '+' ? 1 : -1));
  }

  protected refreshPagesPerBlockLimit(): void {
    const newPagesPerBlock: number = LibPageCounter.paginationVals.get('pagePerBlock')!();

    this.pagesPerBlock.set(newPagesPerBlock);
  }

  protected refreshItemsPerPage(): RefreshPaginationReturnT {
    const newLimitItemsPerPage: number = LibPageCounter.paginationVals.get('limit')!();
    if (newLimitItemsPerPage === this.usePagination().limit())
      return { newLimitItemsPerPage, wasDifferent: false };

    this.usePagination().limit.set(newLimitItemsPerPage);

    return { newLimitItemsPerPage, wasDifferent: true };
  }

  public changePage(p: PageT): void {
    const newPage: number = p.val;
    this.usePagination().page.set(newPage);

    this.useSearchBarStrategyProps.triggerStrategy()({
      dataForm: null,
      dataPagination: { page: newPage },
    });

    this.scrollOnPageChange();
  }

  // ? edge cases
  protected ifPageBiggerThanAvailable(): void {
    this.useEffect(() => {
      const pageSig: WritableSignal<number> = this.usePagination().page;
      const maxAvailable: number = LibPageCounter.lessOneButGteToZero(
        this.useSearchbarPaginationPropsDir.pages() ?? 0
      );
      const currVal: number = untracked(() => pageSig());

      if (currVal <= maxAvailable) return;

      pageSig.set(maxAvailable);
    });
  }

  protected ifBlockBiggerThanAvailable(): void {
    this.useEffect(() => {
      const blockSig: WritableSignal<number> = this.usePagination().block;
      const maxAvailable: number = this.maxBlockAvailable();
      const currVal: number = untracked(() => blockSig());

      if (currVal <= maxAvailable) return;

      blockSig.set(maxAvailable);
    });
  }
}
