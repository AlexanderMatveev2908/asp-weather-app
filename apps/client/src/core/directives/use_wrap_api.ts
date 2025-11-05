import { AppEventT } from '@/common/types/etc';
import { Directive, input, InputSignal } from '@angular/core';

@Directive({
  selector: '[appUseWrapApiDir]',
})
export class UseWrapApiDir {
  public readonly isPending: InputSignal<boolean> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();
}
