import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodSafeParseResult, ZodType } from 'zod';
import { Nullable } from '@/common/types/etc';
import { SubmitFailMng } from './sub/0.submit_fail_mng';

export class FormZodMng extends SubmitFailMng {
  public static checkZ(schema: ZodType): ValidatorFn {
    return (form: AbstractControl): Nullable<ValidationErrors> => {
      const res: ZodSafeParseResult<unknown> = schema.safeParse(form.value);
      if (res.success) return null;

      for (const ctrl of Object.values((form as FormGroupControls).controls)) ctrl.setErrors(null);

      const errs: Record<string, string> = {};

      for (const issue of res.error.issues) {
        const path: string = issue.path.join('.');
        errs[path] = issue.message;

        const sub: Nullable<AbstractControl> = form.get(path);

        if (sub) sub.setErrors({ zod: issue.message });
      }

      return errs;
    };
  }
}

type FormGroupControls = AbstractControl & { controls: AbstractControl[] };
