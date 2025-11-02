import { TxtInputT } from '@/common/types/forms';
import z, { ZodArray, ZodObject, ZodOptional, ZodString, ZodType } from 'zod';

export type FormFieldItemSchemaT = ZodObject<{
  id: ZodString;
  name: ZodString;
  field: ZodString;
  label: ZodString;
  val: ZodString;
  type: ZodType<TxtInputT>;
  place: ZodString;
}>;

export type FormArraySchemaT = ZodOptional<ZodArray<FormFieldItemSchemaT>>;

export interface RulesFieldArrayT {
  maxLength: number;
  reg: RegExp;
}

export class FormArrayMng {
  public static readonly formFieldItemSchema: FormFieldItemSchemaT = z.object({
    id: z.string(),
    name: z.string(),
    field: z.string(),
    label: z.string(),
    val: z.string(),
    place: z.string(),
    type: z.enum(['text', 'email', 'url', 'password', 'textarea', 'date']),
  });
}
