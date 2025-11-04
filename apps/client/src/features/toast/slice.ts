import { Injectable, Signal } from '@angular/core';
import { ToastStateT } from './reducer/reducer';
import { getToastState } from './reducer/selectors';
import { ToastActT } from './reducer/actions';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { AppPayloadEventT } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class ToastSlice extends UseKitSliceSvc {
  public get toastState(): Signal<ToastStateT> {
    return this.store.selectSignal(getToastState);
  }

  public set toastID(id: string) {
    this.store.dispatch(ToastActT.SET_ID({ id }));
  }

  public openToast(arg: AppPayloadEventT): void {
    this.store.dispatch(ToastActT.OPEN_TOAST(arg));
  }

  public closeToast(): void {
    this.store.dispatch(ToastActT.CLOSE_TOAST());
  }

  public ifNotPresent(arg: AppPayloadEventT): void {
    if (this.toastState().isToast) return;

    this.openToast(arg);
  }
}
