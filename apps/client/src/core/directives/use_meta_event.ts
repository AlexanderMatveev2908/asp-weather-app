import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { AppEventMetaT, AppEventT } from '../lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '../lib/dom/meta_event/meta_event';

@Directive({
  selector: '[appUseMetaEventDir]',
})
export class UseMetaEventDir {
  // ? personal props
  public readonly eventT: InputSignal<AppEventT> = input.required();

  // ? derived
  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.eventT())
  );
}
