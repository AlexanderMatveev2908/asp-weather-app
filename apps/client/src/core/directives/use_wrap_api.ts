import { Directive, input, InputSignal } from '@angular/core';
import { AppEventT } from '../lib/dom/meta_event/etc/types';

@Directive({
  selector: '[appUseWrapApiDir]',
})
export class UseWrapApiDir {
  public readonly isPending: InputSignal<boolean> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();
}
