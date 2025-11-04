import { Dict, Nullable, TimerIdT } from '@/common/types/etc';
import { Injectable } from '@angular/core';
import { FormWeatherT } from '../../paperwork/form_mng';
import { LibFormPrs } from '@/core/lib/prs/form_prs';
import { LibMemory } from '@/core/lib/data_structure/memory';
import { UseDebounceMainArgT } from './etc/types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibEtc } from '@/core/lib/etc';
import { LibLog } from '@/core/lib/dev/log';

@Injectable()
export class UseDebounceHk extends UseInjCtxHk {
  public timerID: TimerIdT = null;
  private prevForm: Nullable<FormWeatherT> = null;

  // eslint-disable-next-line no-magic-numbers
  private readonly MARGIN_DEBOUNCE: number = 1000;

  private isSameData(dataNow: FormWeatherT): boolean {
    const currFlatten: Dict = LibFormPrs.flatRecord(dataNow);
    const prevFlatten: Dict = LibFormPrs.flatRecord(this.prevForm);

    return LibMemory.isSame(currFlatten, prevFlatten);
  }

  public readonly forceSetPrevForm: (data: FormWeatherT) => void = (data: FormWeatherT) => {
    this.prevForm = data;
  };

  public readonly debounce: (arg: UseDebounceMainArgT) => void = ({
    form,
    formValue,
    triggerStrategy,
  }: UseDebounceMainArgT) => {
    this.useEffect(() => {
      void formValue?.();

      if (this.timerID) this.timerID = LibEtc.clearTmr(this.timerID);

      this.timerID = setTimeout(() => {
        const dataNow: Nullable<FormWeatherT> = formValue?.() ?? null;

        if (!dataNow || !form.valid) {
          this.timerID = LibEtc.clearTmr(this.timerID);
          return;
        }

        if (this.isSameData(dataNow)) LibLog.logTtl('skip same data');
        else triggerStrategy(dataNow);

        this.timerID = LibEtc.clearTmr(this.timerID);
      }, this.MARGIN_DEBOUNCE);
    });
  };
}
