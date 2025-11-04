import { Reg } from '@/core/paperwork/reg';
import z, { ZodObject, ZodString } from 'zod';
import { FormControl, FormGroup } from '@angular/forms';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';

export class SearchWeatherFormMng extends RootFormMng {
  // eslint-disable-next-line no-magic-numbers
  private static readonly MAX_LEN_CITY: number = 100;

  public static schema: ZodObject<{ city: ZodString }> = z.object({
    city: z
      .string()
      .min(1, 'City name required')
      .max(this.MAX_LEN_CITY, 'Max length exceeded')
      .regex(Reg.CITY),
  });

  public static readonly form: FormWeatherGroupT = new FormGroup<{
    city: FormControl<string>;
  }>(
    {
      city: new FormControl<string>('', { nonNullable: true }),
    },
    { validators: this.validate(this.schema) }
  );
}

export type FormWeatherGroupT = FormGroup<{ city: FormControl<string> }>;

export type FormWeatherT = z.infer<typeof SearchWeatherFormMng.schema>;
