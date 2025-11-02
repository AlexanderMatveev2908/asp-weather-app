import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { PaginationSwapStateT, SwapStateT } from '@/core/hooks/swap/etc/types';
import { CheckBoxFieldT } from '@/common/types/forms';
import { SwapDOM } from '@/core/lib/dom/swap';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { v4 } from 'uuid';
import { DynamicSwapItem } from './dynamic_swap_item/dynamic-swap-item';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SwapBtns } from '../swap_btns/swap-btns';
import { OpacityT } from '@/common/types/css';
import { FormControl } from '@angular/forms';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { FormFieldErr } from '../../forms/base_fields/form_field_err/form-field-err';

@Component({
  selector: 'app-dynamic-swapper',
  imports: [DynamicSwapItem, SwapBtns, UseIDsDir, FormFieldErr, UseFormFieldDir],
  templateUrl: './dynamic-swapper.html',
  styleUrl: './dynamic-swapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapper extends UseInjCtxHk implements AfterViewInit {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? props
  public readonly swapState: InputSignal<SwapStateT> = input.required();
  public readonly setSwap: InputSignal<(v: number) => void> = input.required();
  public readonly fields: InputSignal<CheckBoxFieldT[]> = input.required();
  public readonly label: InputSignal<string> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? local state
  public readonly paginationState: WritableSignal<PaginationSwapStateT> = signal({
    colsForSwap: 1,
    rowsForCol: 3,
    swapsIDs: [v4()],
  });

  // ? derived
  public readonly gridConf: Signal<string> = computed(
    () => `repeat(${this.paginationState().swapsIDs.length}, 100%)`
  );
  public translate: Signal<string> = computed(
    () =>
      // eslint-disable-next-line no-magic-numbers
      `translateX(-${this.swapState().swap * 100}%)`
  );
  // ? child helpers
  public readonly currOpacity: (idx: number) => OpacityT = (idx: number) =>
    idx === this.swapState().swap ? '1' : '0';

  // ? helpers
  public getItems(currSwap: number): CheckBoxFieldT[] {
    const { colsForSwap, rowsForCol } = this.paginationState();
    const itemsForSwap: number = colsForSwap * rowsForCol;

    return SwapDOM.getItemsSwap(this.fields(), currSwap, itemsForSwap);
  }

  // ? lifecycle & listeners
  ngAfterViewInit(): void {
    this.usePlatform.onClient(() => {
      this.paginationState.set(SwapDOM.freshState(this.fields().length));
    });

    this.useEffect(() => {
      const currSwap: number = this.swapState().swap;
      const maxSwapAvailable: number = this.paginationState().swapsIDs.length - 1;

      if (currSwap > maxSwapAvailable) this.setSwap()(maxSwapAvailable);
    });
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.paginationState.set(SwapDOM.freshState(this.fields().length));
  }
}
