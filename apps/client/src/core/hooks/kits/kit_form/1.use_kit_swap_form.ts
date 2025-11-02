import { Nullable } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';
import { UseSwapHk } from '@/core/hooks/swap/use_swap/use_swap';
import { inject, Injectable } from '@angular/core';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { Observable } from 'rxjs';
import { UseKitFormHk } from './0.use_kit_form';

export interface SubmitSwapArgT {
  fields: string[][];
  cb: (data: unknown) => Observable<unknown>;
}

@Injectable()
export abstract class UseKitSwapFormHk extends UseKitFormHk {
  protected readonly useSwap: UseSwapHk = inject(UseSwapHk);

  public readonly submitSwapForm: (arg: SubmitSwapArgT) => void = (arg: SubmitSwapArgT) => {
    if (!this.form.valid) {
      FormZodMng.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, arg.fields);

        if (!LibShapeCheck.isNone(target)) this.useSwap.setSwapOnErr(target!);
      });

      return;
    }

    this.apiTracker.track(arg.cb(this.form.value)).subscribe();
  };
}
