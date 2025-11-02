/* eslint-disable no-magic-numbers */
import { Opt } from '@/common/types/etc';
import { LibDate } from '@/core/lib/data_structure/date';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { Reg } from '@/core/paperwork/reg';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodNullable, ZodObject, ZodString, ZodType } from 'zod';

export class ApplicationFormMng extends FormZodMng {
  public static schema: ZodObject<{
    companyName: ZodString;
    positionName: ZodString;
    status: ZodType<Opt<ApplicationStatusT>>;
    appliedAt: ZodString;
    notes: ZodNullable<ZodString>;
  }> = z.object({
    companyName: z
      .string()
      .min(1, 'Company Name required')
      .max(100, 'Max length exceeded')
      .regex(Reg.JOB_NAME, 'Company Name invalid'),
    positionName: z
      .string()
      .min(1, 'Position Name required')
      .max(100, 'Max length exceeded')
      .regex(Reg.JOB_NAME, 'Position Name invalid'),

    status: z
      .preprocess(
        (val: ApplicationStatusT) => (!val ? undefined : val),
        z
          .enum(Object.values(ApplicationStatusT), {
            error: 'Invalid application status',
          })
          .optional()
      )
      .refine((v: Opt<ApplicationStatusT>) => !!v, { message: 'Application status required' }),

    notes: z
      .string()
      .max(1000, 'Max length exceeded')
      .regex(Reg.TXT, 'Invalid notes characters')
      .nullable(),

    appliedAt: z.string().min(1, 'Date required').regex(Reg.DATE_PICKER, 'Invalid date'),
  });

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        companyName: new FormControl(''),
        positionName: new FormControl(''),
        notes: new FormControl(''),
        appliedAt: new FormControl(LibDate.pickerNow()),
        status: new FormControl(''),
      },
      { validators: this.checkZ(this.schema) }
    );
}

export type ApplicationFormT = z.infer<typeof ApplicationFormMng.schema>;
