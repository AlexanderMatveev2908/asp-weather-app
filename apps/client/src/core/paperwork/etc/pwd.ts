import { UserZod } from '@/core/paperwork/etc/user';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class PwdFormMng extends FormZodMng {
  public static readonly schema: ZodObject<{ password: ZodString }> = UserZod.pwdSchema;

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        password: new FormControl(''),
      },
      { validators: this.checkZ(this.schema) }
    );
}

export type PwdFormT = z.infer<typeof PwdFormMng.schema>;
