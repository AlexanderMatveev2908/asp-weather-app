import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ApplicationRef,
  EnvironmentInjector,
  inject,
  Injectable,
  PLATFORM_ID,
  runInInjectionContext,
} from '@angular/core';
import { EMPTY, filter, Observable, take, switchMap } from 'rxjs';
import { ResApiT } from '../store/api/etc/types';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class UsePlatformSvc {
  private readonly platformID: object = inject(PLATFORM_ID);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);

  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  public readonly isClient: boolean = isPlatformBrowser(this.platformID);
  public readonly isServer: boolean = isPlatformServer(this.platformID);

  public onClient<T>(arg: () => T): Nullable<T> {
    return this.isServer ? null : arg();
  }

  private isStable(): Observable<boolean> {
    return this.appRef.isStable.pipe(filter(Boolean), take(1));
  }

  public whenStable<T>(cb: Observable<ResApiT<T>>): Observable<ResApiT<T>> {
    return this.isStable().pipe(switchMap(() => cb));
  }

  public whenClientStable<T>(cb: Observable<ResApiT<T>>): Observable<ResApiT<T> | never> {
    return this.isClient ? this.isStable().pipe(switchMap(() => cb)) : EMPTY;
  }

  public inGlobalCtx(cb: () => void): void {
    runInInjectionContext(this.injector, () => {
      cb();
    });
  }
}
