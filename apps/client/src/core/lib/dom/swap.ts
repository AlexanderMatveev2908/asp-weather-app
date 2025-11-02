import { PaginationSwapStateT } from '@/core/hooks/swap/etc/types';
import { v4 } from 'uuid';

/* eslint-disable no-magic-numbers */
export class SwapDOM {
  private static colsForSwap(): number {
    const w: number = window.innerWidth;

    return w > 1300 ? 5 : w > 1100 ? 4 : w > 800 ? 3 : w > 500 ? 2 : 1;
  }

  private static rowsForCol(): number {
    const w: number = window.innerWidth;

    return w > 1200 ? 5 : w > 800 ? 4 : 3;
  }

  private static getTotSwaps({
    colsForSwap,
    nItems,
    rowsForCol,
  }: Omit<PaginationSwapStateT, 'swapsIDs'> & { nItems: number }): number {
    const itemsForSwap: number = colsForSwap * rowsForCol;
    const totSwaps: number = Math.ceil(nItems / itemsForSwap);

    return totSwaps;
  }

  public static freshState(nItems: number): PaginationSwapStateT {
    const colsForSwap: number = this.colsForSwap();
    const rowsForCol: number = this.rowsForCol();
    const totSwaps: number = this.getTotSwaps({
      colsForSwap,
      rowsForCol,
      nItems,
    });

    return {
      colsForSwap,
      rowsForCol,
      swapsIDs: Array.from({ length: totSwaps }, (_: undefined) => v4()),
    };
  }

  public static getItemsSwap<T>(items: T[], currSwap: number, itemsForSwap: number): T[] {
    const skip: number = currSwap * itemsForSwap;

    return items.slice(skip, skip + itemsForSwap);
  }
}
