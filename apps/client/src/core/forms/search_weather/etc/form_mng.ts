import { Reg } from '@/core/paperwork/reg';
import z, { ZodObject, ZodString } from 'zod';
import { FormControl, FormGroup } from '@angular/forms';

export class SearchWeatherFormMng {
  // eslint-disable-next-line no-magic-numbers
  private static readonly MAX_LEN_CITY: number = 100;

  public static schema: ZodObject<{ city: ZodString }> = z.object({
    city: z
      .string()
      .min(1, 'City name required')
      .max(this.MAX_LEN_CITY, 'Max length exceeded')
      .regex(Reg.CITY),
  });

  public static readonly form: FormGroup = new FormGroup({
    city: new FormControl(''),
  });
}

export type FormWeatherT = z.infer<typeof SearchWeatherFormMng.schema>;
