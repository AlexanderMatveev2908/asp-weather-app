import { inject, Injectable } from '@angular/core';
import { _UseSideEffectsMngLogHk } from './1.log';
import { ToastSlice } from '@/features/toast/slice';
import { ErrApiT, ObsResT, OptToastApiT, ResApiT } from '../../../types';
import { Nullable } from '@/common/types/etc';
import { tap } from 'rxjs';

@Injectable()
export abstract class _UseSideEffectsMngToastHk extends _UseSideEffectsMngLogHk {
  // ? svc
  private readonly toastSlice: ToastSlice = inject(ToastSlice);

  // ? helper
  private defOptToast(): OptToastApiT {
    return {
      toastErr: true,
      toastOk: this.confApi.getCurr()?.method !== 'GET',
      okMsg: null,
    };
  }

  // ? main
  protected withToast<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptToastApiT>>): ObsResT<T> {
    const options: Partial<OptToastApiT> = opt ?? this.defOptToast();

    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => {
          if (!options.toastOk) return;

          this.toastSlice.openToast({
            eventT: 'OK',
            msg:
              options.okMsg ??
              res?.msg ??
              `✅ ${this.confApi.getCurr()?.method ?? 'Unknown method'} operation successful`,
            status: res?.status ?? 0,
          });
        },
        error: (res: ErrApiT<T>) => {
          if (!options.toastErr) return;

          this.toastSlice.openToast({
            eventT: 'ERR',
            msg: res?.error?.msg ?? this.DEF_CLIENT_ERR_MSG,
            status: res?.status ?? 0,
          });
        },
      })
    );
  }
}
