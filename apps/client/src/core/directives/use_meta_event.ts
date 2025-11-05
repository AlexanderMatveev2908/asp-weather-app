import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { MetaAppEventT, MetaEventDom } from '../lib/dom/events';
import { AppEventT } from '@/common/types/etc';

@Directive({
  selector: '[appUseMetaEventDir]',
})
export class UseMetaEventDir {
  // ? personal props
  public readonly eventT: InputSignal<AppEventT> = input.required();

  // ? derived
  public readonly metaEvent: Signal<MetaAppEventT> = computed(() =>
    MetaEventDom.metaByT(this.eventT())
  );

  public readonly cssVar: Signal<string> = computed(() => this.metaEvent().varCss);
}
