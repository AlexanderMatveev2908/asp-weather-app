import { Reg } from '@/core/paperwork/reg';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import z, { ZodArray, ZodObject, ZodString } from 'zod';
import { TotpFormUiFkt } from '../ui_fkt';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export class TotpFormMng extends FormZodMng {
  private static isCodePresent(data: TotpFormT): boolean {
    return (
      data.totp.filter((val: string) => LibShapeCheck.isStr(val)).length === TotpFormUiFkt.nFields
    );
  }

  public static readonly schema: ZodObject<{
    totp: ZodArray<ZodString>;
  }> = z
    .object({
      totp: z.array(z.string()),
    })
    .refine(
      (data: TotpFormT) => this.isCodePresent(data),

      {
        message: 'TOTP code required',
        path: ['totp'],
      }
    )
    .refine(
      (data: TotpFormT) => (!this.isCodePresent(data) ? true : Reg.isTotpCode(data.totp.join(''))),
      {
        message: 'TOTP code invalid',
        path: ['totp'],
      }
    );

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        totp: new FormArray(Array.from({ length: 6 }, () => new FormControl(''))),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );
}

export type TotpFormT = z.infer<typeof TotpFormMng.schema>;
