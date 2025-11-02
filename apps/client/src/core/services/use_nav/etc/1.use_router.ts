import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from '../../use_platform';
import { NavFromT, UsePathHk } from './0.use_path';
import { Nullable } from '@/common/types/etc';

interface NavOptT {
  replace: boolean;
  from: Nullable<NavFromT>;
}

@Injectable()
export abstract class UseRouterHk extends UsePathHk {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private async _nav(arg: string, { replace, from }: NavOptT): Promise<boolean> {
    if (this.usePlatform.isServer) {
      // Log.log('can not call navigate on server side');
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
