import { Directive, Signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, startWith } from 'rxjs';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { Nullable } from '@/common/types/etc';

@Directive({
  selector: '[appUseFormFieldDir]',
})
export class UseFormFieldDir extends UseInjCtxHk {
  // ? derived
  public val: Nullable<Signal<unknown>> = null;
  public interacted: Nullable<Signal<boolean>> = null;

  // ? private helpers
  private assignFields(c: FormControl): void {
    this.val = toSignal(c.valueChanges as Observable<unknown>, {
      initialValue: c.value as unknown,
    });
    this.interacted = toSignal(
      c.statusChanges.pipe(
        map(() => !!(c.touched || c.dirty)),
        startWith(!!(c.touched || c.dirty))
      ),
      { initialValue: !!(c.touched || c.dirty) }
    );
  }

  // ? helpers
  public setupWithCtrl(ctrl: FormControl): void {
    const c: FormControl = ctrl;

    this.inCtx(() => {
      this.assignFields(c);
    });
  }

  public setupWithFieldRef(inst: FormFieldTxt): void {
    const c: FormControl = inst.ctrl();

    this.inCtx(() => {
      this.assignFields(c);
    });
  }
}
