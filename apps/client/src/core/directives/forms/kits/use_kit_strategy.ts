import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appUseKitStrategy]',
})
export class UseKitStrategyDir {
  public readonly strategy: InputSignal<(data: unknown) => Observable<unknown>> = input.required();
  public readonly useFullPage: InputSignal<boolean> = input.required();

  public readonly cssCls: Signal<string> = computed(() =>
    this.useFullPage() ? 'app__form__content_pad' : 'app__form__content_no_pad'
  );
}
