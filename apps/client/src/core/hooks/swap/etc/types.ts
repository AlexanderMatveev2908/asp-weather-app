export type SwapModeT = 'idle' | 'swapping' | 'swapped';

export interface SwapStateT {
  mode: SwapModeT;
  swap: number;
}

export interface ConfSwapT extends SwapStateT {
  isCurr: boolean;
}

export interface PaginationSwapStateT {
  rowsForCol: number;
  colsForSwap: number;
  swapsIDs: string[];
}
