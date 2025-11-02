import { computed, Injectable, Signal } from '@angular/core';
import { ConfSwapT, SwapStateT } from '../etc/types';
import { FocusDOM } from '@/core/lib/dom/focus';
import { UseBaseSwapHk } from '../etc/use_base_swap';

@Injectable()
export class UseSwapHk extends UseBaseSwapHk {
  // ? shared helpers
  public focusWhen(...kwargs: string[]): void {
    const { swap, mode } = this.swapState();
    if (mode === 'swapped') FocusDOM.bySwap(kwargs, swap);
  }

  // ? helpers
  public getOpacity(idx: number): Signal<number> {
    return computed(() => (idx === this.swapState().swap ? 1 : 0));
  }

  // ? derived
  public readonly confSwap: (idx: number) => Signal<ConfSwapT> = (idx: number) =>
    computed(() => {
      const state: SwapStateT = this.swapState();
      return {
        ...state,
        isCurr: this.swapState().swap === idx,
      };
    });
}
