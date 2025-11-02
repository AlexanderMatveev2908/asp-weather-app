import { TimerIdT } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { SwapModeT, SwapStateT } from './types';
import { UseInjCtxHk } from '../../use_inj_ctx';
import { UseSwapHk } from '../use_swap/use_swap';

@Injectable()
export abstract class UseBaseSwapHk extends UseInjCtxHk {
  // | added little margin 100ms
  // | normal tim would be 400
  // eslint-disable-next-line no-magic-numbers
  public static readonly TIME_ANIMATION: number = 500;

  // ? local state
  public readonly swapState: WritableSignal<SwapStateT> = signal({
    mode: 'idle',
    swap: 0,
  });

  protected timerID: TimerIdT = null;

  // ? private helpers
  protected clearTmr(): void {
    this.timerID = LibEtc.clearTmrID(this.timerID);
  }

  private readonly _setSwap: (val: number, onEndSwap: SwapModeT) => void = (
    val: number,
    onEndSwap: SwapModeT
  ) => {
    this.clearTmr();

    this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: 'swapping', swap: val }));

    this.timerID = setTimeout(() => {
      if (this.timerID && this.swapState().mode === 'swapping')
        this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: onEndSwap }));

      this.clearTmr();
    }, UseSwapHk.TIME_ANIMATION);
  };

  // ? listeners
  public readonly setSwap: (val: number) => void = (val: number) => {
    this._setSwap(val, 'swapped');
  };
  public readonly setSwapOnErr: (val: number) => void = (val: number) => {
    this._setSwap(val, 'idle');
  };
}
