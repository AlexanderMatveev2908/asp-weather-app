import { Injectable } from '@angular/core';
import { ObsOnOkT, ObsResT } from '../../types';
import { LibApiArgs } from '../../lib/api_args';
import { _UseSideEffectsMngNoticeHk } from './sub/3.notice';

@Injectable({
  providedIn: 'root',
})
export class _UseSideEffectsMngSvc extends _UseSideEffectsMngNoticeHk {
  public main<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.withNotice(this.withToast(this.withLog(cb), args.getOptToast()), args.getOptErr());
  }
}
