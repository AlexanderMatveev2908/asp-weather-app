import { PairPwdArgT, UserZod } from '@/core/paperwork/etc/user';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class PairPwdFormMng extends FormZodMng {
  public static readonly schema: ZodObject<{
    password: ZodString;
    confirmPassword: ZodString;
  }> = UserZod.pairPwdSchema.refine((data: PairPwdArgT) => UserZod.refinePairPwd(data), {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );
}

export type PairPwdFormT = z.infer<typeof PairPwdFormMng.schema>;
