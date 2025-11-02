import { TxtPropsT } from '@/common/components/els/txt/etc/types';
import { Nullable } from '@/common/types/etc';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive({
  selector: '[appUseTxtDir]',
})
export class UseTxtDir {
  public readonly props: InputSignal<Nullable<TxtPropsT>> = input.required();

  public readonly txtCls: Signal<string> = computed(() => `txt__${this.props()?.size ?? 'lg'}`);
}
