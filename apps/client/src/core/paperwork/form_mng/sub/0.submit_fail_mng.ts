import { Nullable } from '@/common/types/etc';
import { UseSwapHk } from '@/core/hooks/swap/use_swap/use_swap';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';
import { LibLog } from '@/core/lib/dev/log';
import { FocusDOM } from '@/core/lib/dom/focus';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export abstract class SubmitFailMng {
  private static mark(ctrl: AbstractControl): void {
    ctrl.markAsDirty();
    ctrl.markAsTouched();
  }

  private static ctrlErrMng(ctrl: AbstractControl): Nullable<string> {
    this.mark(ctrl);

    if (LibShapeCheck.hasObjData(ctrl.errors)) {
      ctrl.setErrors({ ...ctrl.errors });
      return '';
    }

    return null;
  }

  private static findArrayFormParent(ctrl: AbstractControl): Nullable<string> {
    const parent: Nullable<FormArray | FormGroup> = ctrl.parent;

    let parentKey: Nullable<string> = null;

    if (!parent) return parentKey;

    for (const [key, subCtrl] of Object.entries(parent.controls)) {
      if (subCtrl !== ctrl) continue;

      parentKey = key;
      break;
    }

    return parentKey;
  }

  private static entriesFrom(
    form: FormGroup | FormArray | AbstractControl
  ): [string, AbstractControl][] {
    if (form instanceof FormGroup) return Object.entries(form.controls);

    if (form instanceof FormArray)
      return form.controls.map((ctrl: AbstractControl, i: number) => [i + '', ctrl]);
    // const parentKey: Nullable<string> = this.findArrayFormParent(form);
    // return form.controls.map((ctrl: AbstractControl, i: number) => [`${parentKey}.${i}`, ctrl]);

    return [];
  }

  private static markAndFindFirst(
    form: FormGroup | FormArray | AbstractControl,
    entries: [string, AbstractControl][]
  ): Nullable<string> {
    let first: Nullable<string> = null;

    for (const [keyCtrl, ctrl] of entries) {
      const nestedKey: Nullable<string> = this._onSubmitFailed(ctrl);

      if (!first && nestedKey !== null)
        first = nestedKey === '' ? keyCtrl : `${keyCtrl}.${nestedKey}`;
      // first = nestedKey === '' ? keyCtrl : `${keyCtrl}.${nestedKey.replace(/^.*\./, '')}`;

      const err: Nullable<string> = form.errors?.[keyCtrl];

      if (LibShapeCheck.isStr(err)) {
        this.mark(ctrl);
        if (!first) first = keyCtrl;
      }
    }

    return first;
  }

  private static _onSubmitFailed(form: FormGroup | FormArray | AbstractControl): Nullable<string> {
    if (form instanceof FormGroup) LibLog.logTtl('submit failed', form.errors);

    if (form instanceof FormControl) return this.ctrlErrMng(form);

    const entries: [string, AbstractControl][] = this.entriesFrom(form);

    return this.markAndFindFirst(form, entries);
  }

  public static onSubmitFailed(form: FormGroup): void {
    const first: Nullable<string> = this._onSubmitFailed(form);

    FocusDOM.byDataField(first);
  }

  // | the job of callback is to manage to set right proper swap
  // | where first error is located
  public static onSubmitFailedInSwap(form: FormGroup, cb: (field: string) => void): void {
    const first: Nullable<string> = this._onSubmitFailed(form);
    if (first) cb(first);

    setTimeout(() => {
      FocusDOM.byDataField(first);
    }, UseSwapHk.TIME_ANIMATION);
  }
}
