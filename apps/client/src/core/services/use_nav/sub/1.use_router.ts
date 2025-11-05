import { Injectable } from '@angular/core';
import { _UsePathHk, NavFromT } from './0.use_path';
import { Nullable } from '@/common/types/etc';

interface NavOptT {
  replace: boolean;
  from: Nullable<NavFromT>;
}

@Injectable()
export abstract class _UseRouterHk extends _UsePathHk {
  private async _nav(arg: string, { replace, from }: NavOptT): Promise<boolean> {
    if (this.usePlatform.isServer) {
      return Promise.resolve(false);
    }

    return await this.router.navigate([arg], {
      replaceUrl: replace,
      state: {
        from,
      },
    });
  }

  public async replace(
    arg: string,
    { from }: { from?: Nullable<NavFromT> } = {}
  ): Promise<boolean> {
    return this._nav(arg, { replace: true, from: from ?? null });
  }

  public async push(arg: string, { from }: { from?: Nullable<NavFromT> } = {}): Promise<boolean> {
    return this._nav(arg, { replace: false, from: from ?? null });
  }
}
