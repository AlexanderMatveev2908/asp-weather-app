import { Nullable } from '@/common/types/etc';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodSafeParseResult, ZodType } from 'zod';
import { RootFormMngSubmitMng } from './sub/submit_failed';

type FormGroupControls = AbstractControl & { controls: AbstractControl[] };

export interface FieldErrsT extends ValidationErrors {
  zod: Nullable<string>;
}

export class RootFormMng extends RootFormMngSubmitMng {
  private static resetOld(form: AbstractControl): void {
    for (const ctrl of Object.values((form as FormGroupControls).controls)) ctrl.setErrors(null);
  }

  private static triggerSubCtrl(form: AbstractControl, err: { path: string; msg: string }): void {
    const sub: Nullable<AbstractControl> = form.get(err.path);
    if (sub) sub.setErrors({ zod: err.msg });
  }

  public static validate(schema: ZodType): ValidatorFn {
    return (form: AbstractControl): Nullable<ValidationErrors> => {
      const res: ZodSafeParseResult<unknown> = schema.safeParse(form.value);
      if (res.success) return null;

      this.resetOld(form);
      const errs: Record<string, string> = {};

      for (const issue of res.error.issues) {
        const msg: string = issue.message;
        const path: string = issue.path.join('.');

        errs[path] = msg;
        this.triggerSubCtrl(form, { path, msg });
      }

      return errs;
    };
  }
}
