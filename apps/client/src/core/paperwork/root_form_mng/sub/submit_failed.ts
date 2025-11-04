import { Nullable } from '@/common/types/etc';
import { LibShape } from '@/core/lib/data_structure/shape';
import { LibLog } from '@/core/lib/dev/log';
import { FocusDom } from '@/core/lib/dom/focus';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class RootFormMngSubmitMng {
  private static mark(ctrl: AbstractControl): void {
    ctrl.markAsDirty();
    ctrl.markAsTouched();
  }

  private static triggerErrCtrl(ctrl: AbstractControl): Nullable<string> {
    this.mark(ctrl);

    if (LibShape.hasObjData(ctrl.errors)) {
      ctrl.setErrors({ ...ctrl.errors });
      return '';
    }

    return null;
  }

  private static entriesFrom(
    form: FormGroup | FormArray | AbstractControl
  ): [string, AbstractControl][] {
    if (form instanceof FormGroup) return Object.entries(form.controls);

    if (form instanceof FormArray)
      return form.controls.map((ctrl: AbstractControl, i: number) => [i + '', ctrl]);

    return [];
  }

  private static findFirst(
    form: FormGroup | FormArray | AbstractControl,
    entries: [string, AbstractControl][]
  ): Nullable<string> {
    let first: Nullable<string> = null;

    for (const [keyCtrl, ctrl] of entries) {
      const nestedKey: Nullable<string> = this._onSubmitFailed(ctrl);

      if (!first && nestedKey !== null)
        first = nestedKey === '' ? keyCtrl : `${keyCtrl}.${nestedKey}`;

      const err: Nullable<string> = form.errors?.[keyCtrl];
      // ! there will not be a rerender issue
      // ! fields triggered above are nested forms
      // ! which means that the parent itself does not have errors being
      // ! a simple container while children forms manage the validations
      if (LibShape.hasText(err)) {
        this.mark(ctrl);
        if (!first) first = keyCtrl;
      }
    }

    return first;
  }

  private static _onSubmitFailed(form: FormGroup | FormArray | AbstractControl): Nullable<string> {
    if (form instanceof FormGroup) LibLog.logTtl('submit failed', form.errors);

    if (form instanceof FormControl) return this.triggerErrCtrl(form);

    // ? else array_form
    const entries: [string, AbstractControl][] = this.entriesFrom(form);
    return this.findFirst(form, entries);
  }

  public static onSubmitFailed(form: FormGroup): void {
    const first: Nullable<string> = this._onSubmitFailed(form);

    FocusDom.focusByDataField(first);
  }
}
