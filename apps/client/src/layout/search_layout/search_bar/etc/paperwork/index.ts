import z, { ZodObject } from 'zod';

import { Nullable } from '@/common/types/etc';
import { FormArraySchemaT } from '@/core/paperwork/etc/form_array';

export enum SortValT {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SearchBarFormMng {
  public static readonly SortValsList: SortValT[] = Object.values(SortValT);

  // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/explicit-function-return-type
  public static readonly sortSchema = () =>
    z.preprocess(
      (v: Nullable<SortValT>) => (this.SortValsList.includes(v as SortValT) ? v : null),
      z.enum(this.SortValsList).nullable()
    );

  public static readonly baseSchema: ZodObject<{
    createdAtSort: SortSchemaT;
    updatedAtSort: SortSchemaT;
  }> = z.object({
    createdAtSort: this.sortSchema(),
    updatedAtSort: this.sortSchema(),
  });
}

export type SortSchemaT = ReturnType<typeof SearchBarFormMng.sortSchema>;

export type BaseSearchBarSchemaT = ZodObject<{
  txtInputs: FormArraySchemaT;
  createdAtSort: SortSchemaT;
  updatedAtSort: SortSchemaT;
}>;
export type BaseSearchBarFormT<T> = z.infer<BaseSearchBarSchemaT> & T;
