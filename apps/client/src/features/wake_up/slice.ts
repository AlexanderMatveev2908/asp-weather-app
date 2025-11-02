import { Injectable, Signal } from '@angular/core';
import { WakeUpStateT } from './reducer/reducer';
import { getWakeUpState } from './reducer/selectors';
import { WakeUpActT } from './reducer/actions';
import { UseKitSliceHk } from '@/core/hooks/kits/use_kit_slice';

@Injectable({
  providedIn: 'root',
})
export class WakeUpSlice extends UseKitSliceHk {
  public get wakeUpState(): Signal<WakeUpStateT> {
    return this.store.selectSignal(getWakeUpState);
  }

  public setLastCall(tmsp: number): void {
    this.store.dispatch(WakeUpActT.SET_LAST_CALL({ tmsp }));
  }

  public setLastCallWithStorage(tmsp: number): void {
    this.setLastCall(tmsp);
    this.useStorage.setItem('wakeUp', tmsp);
  }
}
