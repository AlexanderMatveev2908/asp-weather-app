import { Dict, Nullable, TimerIdT } from '@/common/types/etc';
import { Injectable } from '@angular/core';
import { FormWeatherT } from '../../paperwork/form_mng';
import { LibMemory } from '@/core/lib/data_structure/memory';
import { UseDebounceMainArgT } from './etc/types';
import { LibEtc } from '@/core/lib/etc';
import { LibLog } from '@/core/lib/dev/log';
import { LibFormPrs } from '@/core/lib/data_structure/prs/form_prs';
import { UseSetupWeatherHk } from '../0.use_setup';

@Injectable()
export abstract class UseDebounceWeatherHk extends UseSetupWeatherHk {
  private timerID: TimerIdT = null;
  private prevForm: Nullable<FormWeatherT> = null;

  // eslint-disable-next-line no-magic-numbers
  private readonly MARGIN_DEBOUNCE: number = 1000;

  private isSameData(dataNow: FormWeatherT): boolean {
    const currFlatten: Dict = LibFormPrs.flatRecord(dataNow);
    const prevFlatten: Dict = LibFormPrs.flatRecord(this.prevForm);

    return LibMemory.isSame(currFlatten, prevFlatten);
  }

  protected readonly forceSetPrevForm: (data: FormWeatherT) => void = (data: FormWeatherT) => {
    this.prevForm = data;
  };

  protected readonly debounce: (arg: UseDebounceMainArgT) => void = ({
    triggerStrategy,
  }: UseDebounceMainArgT) => {
    this.useEffect(() => {
      void this.formValue?.();

      if (this.timerID) this.timerID = LibEtc.clearTmr(this.timerID);

      this.timerID = setTimeout(() => {
        const dataNow: Nullable<FormWeatherT> = this.formValue?.() ?? null;

        if (!dataNow || !this.form.valid) {
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
