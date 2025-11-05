import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { MetaEventT, LibMetaEvent } from '../lib/css/events';
import { AppEventT, SvgT } from '@/common/types/etc';

@Directive({
  selector: '[appUseMetaEventDir]',
})
export class UseMetaEventDir {
  // ? personal props
  public readonly eventT: InputSignal<AppEventT> = input.required();

  // ? derived
  public readonly metaEvent: Signal<MetaEventT> = computed(() =>
    LibMetaEvent.metaByT(this.eventT())
  );

  public readonly cssVar: Signal<string> = computed(() => this.metaEvent().varCss);

  public readonly Svg: Signal<SvgT> = computed(() => this.metaEvent().Svg);
}
