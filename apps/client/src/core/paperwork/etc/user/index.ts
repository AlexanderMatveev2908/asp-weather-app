import z, { ZodObject, ZodString } from 'zod';
import { Reg } from '../../reg';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export interface PairPwdArgT {
  password: string;
  confirmPassword: string;
}

export class UserZod {
  // eslint-disable-next-line no-magic-numbers
  private static readonly MAX_CHARS_TXT: number = 100;
  // eslint-disable-next-line no-magic-numbers
  private static readonly MAX_CHARS_MAIL: number = 254;

  public static readonly namesSchema: ZodObject<{ firstName: ZodString; lastName: ZodString }> =
    z.object({
      firstName: z
        .string()
        .min(1, 'First Name required')
        .max(this.MAX_CHARS_TXT, 'Max length exceeded')
        .regex(Reg.NAME, 'First Name invalid'),
      lastName: z
        .string()
        .min(1, 'Last Name required')
        .max(this.MAX_CHARS_TXT, 'Max length exceeded')
        .regex(Reg.NAME, 'Last Name invalid'),
    });

  public static readonly mailSchema: ZodObject<{ email: ZodString }> = z.object({
    email: z
      .string()
      .min(1, 'Email required')
      .max(this.MAX_CHARS_MAIL, 'Max length exceeded')
      .regex(Reg.MAIL, 'Email Invalid'),
  });

  public static readonly pwdSchema: ZodObject<{ password: ZodString }> = z.object({
    password: z
      .string()
      .min(1, 'Password required')
      .max(this.MAX_CHARS_TXT, 'Max length exceeded')
      .regex(Reg.PWD, 'Invalid password'),
  });

  public static readonly pairPwdSchema: ZodObject<{
    password: ZodString;
    confirmPassword: ZodString;
  }> = this.pwdSchema.extend({
    confirmPassword: z.string().min(1, 'Confirm password required'),
  });

  public static refinePairPwd(data: PairPwdArgT): boolean {
    const { password, confirmPassword } = data;

    if ([password, confirmPassword].some((str: string) => !LibShapeCheck.isStr(str))) return true;

    return password === confirmPassword;
  }
}
