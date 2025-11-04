import { Injectable } from '@angular/core';
import { ObsOnOkT, ObsResT } from '../../types';
import { LibApiArgs } from '../../lib/api_args';

@Injectable({
  providedIn: 'root',
})
export class UseSideEffectsMngSvc {
  public main<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsOnOkT<T> {}
}
