import { Injectable } from '@angular/core';
import { ErrApiT, ObsResT, ResApiT } from '../../../types';
import { Nullable } from '@/common/types/etc';
import { ConfApiT } from '../../use_api_conf/etc/types';
import { _UseSideEffectsMngInitHk } from './0.init';
import { HttpErrorResponse } from '@angular/common/http';
import { LibLog } from '@/core/lib/dev/log';
import { envVars } from '@/environments/environment';
import { tap } from 'rxjs';

@Injectable()
export abstract class _UseSideEffectsMngLogHk extends _UseSideEffectsMngInitHk {
  private _log<T>(res: ResApiT<T> | ErrApiT<T>, emoji: string): void {
    const conf: Nullable<ConfApiT> = this.confApi.getCurr();
    const content: ResApiT<T> = res instanceof HttpErrorResponse ? res.error : res;

    const title: string = (conf?.url ?? 'Unknown url').replace(envVars.backURL, '').split('?')[0];

    LibLog.logTtl(`${emoji} ${title}`, conf, content);
  }

  protected withLog<T>(cb: ObsResT<T>): ObsResT<T> {
    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => this._log(res, '✅'),
        error: (err: ErrApiT<T>) => this._log(err, '❌'),
      })
    );
  }
}
