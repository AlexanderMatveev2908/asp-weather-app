import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { ConfSwapT } from '../../hooks/swap/etc/types';
import { UsePortalDir } from './0.use_portal';
import { Nullable } from '@/common/types/etc';

// | use WithPortal when sure curr component
// | will nt be used within a swap/slider
@Directive()
export abstract class UseSwapPortalDir extends UsePortalDir {
  // ? optional props
  // | some els may be inside a slider
  // | which require dedicated attention
  public readonly confSwap: InputSignal<Nullable<ConfSwapT>> = input<Nullable<ConfSwapT>>(null);

  // ? derived
  public readonly showTooltip: Signal<boolean> = computed(
    () => !this.confSwap() || (!!this.confSwap()?.isCurr && this.confSwap()?.mode !== 'swapping')
  );
}
