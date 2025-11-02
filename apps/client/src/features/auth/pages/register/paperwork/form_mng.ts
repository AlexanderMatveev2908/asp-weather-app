import { PairPwdArgT, UserZod } from '@/core/paperwork/etc/user';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodBoolean, ZodObject, ZodString } from 'zod';

export class RegisterFormMng extends FormZodMng {
  public static readonly schema: ZodObject<{
    firstName: ZodString;
    lastName: ZodString;
    email: ZodString;
    password: ZodString;
    confirmPassword: ZodString;
    terms: ZodBoolean;
  }> = UserZod.namesSchema
    .extend(UserZod.mailSchema.shape)
    .extend(UserZod.pairPwdSchema.shape)
    .extend({
      terms: z.boolean().refine(Boolean, { message: 'Terms must be accepted' }),
    })
    .refine((data: PairPwdArgT) => UserZod.refinePairPwd(data), {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  public static readonly form: FormGroup = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      terms: new FormControl(false),
      // firstName: new FormControl('john'),
      // lastName: new FormControl('doe'),
      // email: new FormControl('matveevalexander470@gmail.com'),
      // password: new FormControl('8cLS4XY!{2Wdvl4*l^4'),
      // confirmPassword: new FormControl('8cLS4XY!{2Wdvl4*l^4'),
      // terms: new FormControl(true),
    },
    {
      validators: this.checkZ(this.schema),
    }
  );

  public static readonly fieldsBySwap: string[][] = [
    ['firstName', 'lastName', 'email'],
    ['password', 'confirmPassword', 'terms'],
  ];
}

export type RegisterFormT = z.infer<typeof RegisterFormMng.schema>;
