import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from '../use_platform';
import { BoolStrT, Nullable } from '@/common/types/etc';
import { LibShape } from '../../lib/data_structure/shape';
import { StorageKeyT } from './etc/types';
import { ErrApp } from '@/core/lib/etc/err';
import { LibLog } from '@/core/lib/dev/log';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';

@Injectable({
  providedIn: 'root',
})
export class UseStorageSvc {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private checkEnv<T>(cb: () => T): Nullable<T> {
    if (this.usePlatform.isServer) {
      return null;
    }

    return cb();
  }

  public cleanAll(): Nullable<void> {
    return this.checkEnv(() => {
      sessionStorage.clear();
    });
  }

  public setItem<T>(key: StorageKeyT, data: T): Nullable<void> {
    return this.checkEnv(() => {
      if (LibShape.isNone(data)) throw new ErrApp('passed None to "setStorage"');
      else if (LibShape.isPrimitive(data)) sessionStorage.setItem(key, data + '');
      else sessionStorage.setItem(key, JSON.stringify(data));
    });
  }

  public getItem<T>(key: StorageKeyT): Nullable<T> {
    return this.checkEnv(() => {
      const data: unknown = sessionStorage.getItem(key);

      if (LibShape.isNone(data) || LibShape.isNoneBug(data)) {
        return null;
      } else {
        const str: string = data as string;

        try {
          if (LibShape.isJsonObj(str)) return JSON.parse(str) as T;
        } catch {
          LibLog.log('isJsonObj failed check');
          return str as T;
        }

        // ? small help to return true|false as real boolean and not literal strings
        return (LibShape.isBoolStr(str) ? LibPrs.strToBool(str as BoolStrT) : str) as T;
      }
    });
  }

  public delItem(key: StorageKeyT): void {
    sessionStorage.removeItem(key);
  }
}
