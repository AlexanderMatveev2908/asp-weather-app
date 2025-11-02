import { Reg } from '@/core/paperwork/reg';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class BkpFormMng extends FormZodMng {
  public static readonly schema: ZodObject<{
    bkp: ZodString;
  }> = z.object({
    bkp: z
      .string()
      .min(1, 'Backup code required')
      .refine((v: string) => (!v ? true : Reg.isBkpCode(v)), {
        message: 'Backup code invalid',
      }),
  });

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        bkp: new FormControl(''),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );
}

export type BkpFormT = z.infer<typeof BkpFormMng.schema>;
