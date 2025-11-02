import { UserZod } from '@/core/paperwork/etc/user';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class MailFormMng extends FormZodMng {
  public static readonly schema: ZodObject<{ email: ZodString }> = UserZod.mailSchema;

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        email: new FormControl(''),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );
}

export type MailFormT = z.infer<typeof MailFormMng.schema>;
