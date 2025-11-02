/* eslint-disable no-magic-numbers */
export type PaginationKeyT = 'limit' | 'pagePerBlock';

export class LibPageCounter {
  public static readonly paginationVals: Map<PaginationKeyT, () => number> = new Map<
    PaginationKeyT,
    () => number
  >([
    [
      'limit',
      () => {
        const w: number = window.innerWidth;
        return w > 1300 ? 4 : w > 800 ? 2 : 1;
      },
    ],
    [
      'pagePerBlock',
      () => {
        const w: number = window.innerWidth;
        return w > 1300 ? 8 : w > 1000 ? 6 : w > 800 ? 4 : w > 600 ? 2 : 1;
      },
    ],
  ]);

  public static lessOneButGteToZero(arg: number): number {
    return Math.max(0, arg - 1);
  }

  public static maxBlocksAvailable(pages: number, pagesPerBlock: number): number {
    const decimal: number = (pages ?? 0) / pagesPerBlock;

    return this.lessOneButGteToZero(Math.max(1, Math.ceil(decimal)));
  }
}
