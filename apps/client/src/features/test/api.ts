import { UseApiSvc } from '@/core/store/api/use_api';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';

@Injectable({
  providedIn: 'root',
})
export class TestApiSvc {
  private readonly base: string = '/test';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public protectedData(): ObsResT<void> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/protected`).toastOnFulfilled());
  }
}
