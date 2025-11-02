import { FormArrayMng, RulesFieldArrayT } from '@/core/paperwork/etc/form_array';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import z, { RefinementCtx, ZodArray, ZodEnum, ZodObject, ZodOptional } from 'zod';
import { SearchApplicationsUiFkt } from '../ui_fkt';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { Reg } from '@/core/paperwork/reg';
import { TxtFieldArrayT } from '@/common/types/forms';
import {
  BaseSearchBarSchemaT,
  SearchBarFormMng,
  SortSchemaT,
} from '@/layout/search_layout/search_bar/etc/paperwork';

export type SearchApplicationsTxtInputKetT = 'companyName' | 'positionName';

export class SearchApplicationsFormMng extends FormZodMng {
  private static readonly rules: Record<SearchApplicationsTxtInputKetT, RulesFieldArrayT> = {
    companyName: {
      maxLength: 100,
      reg: Reg.JOB_NAME,
    },
    positionName: {
      maxLength: 100,
      reg: Reg.JOB_NAME,
    },
  };

  public static readonly schema: ZodObject<{
    status: ZodOptional<ZodArray<ZodEnum>>;
    appliedAtSort: SortSchemaT;
  }> &
    BaseSearchBarSchemaT = SearchBarFormMng.baseSchema
    .extend({
      txtInputs: z.array(FormArrayMng.formFieldItemSchema).optional(),
      status: z.array(z.enum(Object.values(ApplicationStatusT))).optional(),
      appliedAtSort: SearchBarFormMng.sortSchema(),
    })
    .superRefine((data: SearchApplicationsFormT, ctx: RefinementCtx) => {
      if (data.txtInputs?.length) {
        for (let i = 0; i < data.txtInputs.length; i++) {
          const f: TxtFieldArrayT = data.txtInputs[i];
          const { name } = f;

          if (f.val.length > this.rules[name as SearchApplicationsTxtInputKetT].maxLength)
            ctx.addIssue({
              code: 'custom',
              message: 'Max length exceeded',
              path: [`txtInputs.${i}`],
            });

          const reg: RegExp = this.rules[name as SearchApplicationsTxtInputKetT].reg;
          if (!reg.test(f.val))
            ctx.addIssue({
              code: 'custom',
              message: `Invalid ${f.label}`,
              path: [`txtInputs.${i}`],
            });
        }
      }
    });

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        txtInputs: new FormArray([new FormControl(SearchApplicationsUiFkt.companyName())]),
        status: new FormControl([]),
        createdAtSort: new FormControl(''),
        updatedAtSort: new FormControl(''),
        appliedAtSort: new FormControl(''),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );

  public static readonly defState: () => SearchApplicationsFormT = () => this.form().getRawValue();
}

export type SearchApplicationsFormT = z.infer<typeof SearchApplicationsFormMng.schema>;
