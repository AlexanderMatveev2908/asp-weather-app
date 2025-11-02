import { Nullable } from '@/common/types/etc';
import { TxtFieldArrayT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Directive({
  selector: '[appUseDynamicFieldDir]',
})
export class UseFormFieldDynamicDir extends UseInjCtxHk {
  // ? props required
  public readonly ctrl: InputSignal<FormControl<TxtFieldArrayT>> = input.required();
  public readonly idx: InputSignal<number> = input.required();

  public readonly fieldAttr: Signal<string> = computed(
    () => `${this.field?.()?.field ?? 'bug'}.${this.idx()}`
  );

  // ? listeners
  public onChange(v: string): void {
    const c: FormControl = this.ctrl();

    c.markAsDirty();
    c.markAsTouched();

    c.setValue({
      ...this.ctrl().value,
      val: v,
    });
  }

  public setup(): void {
    this.inCtx(() => {
      const c: FormControl = this.ctrl();

      this.field = toSignal(c.valueChanges, {
        initialValue: c.value,
      });

      this.interacted = toSignal(
        c.statusChanges.pipe(
          map(() => !!(c.touched || c.dirty)),
          startWith(!!(c.touched || c.dirty))
        ),
        { initialValue: !!(c.touched || c.dirty) }
      );
    });
  }

  // ? local state
  public field: Nullable<Signal<TxtFieldArrayT>> = null;
  public interacted: Nullable<Signal<boolean>> = null;
}
