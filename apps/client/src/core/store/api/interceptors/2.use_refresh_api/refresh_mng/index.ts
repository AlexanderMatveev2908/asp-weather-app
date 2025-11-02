import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { ErrApiT, ResApiT } from '../../../etc/types';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { JwtResT } from '@/features/auth/etc/types';
import { UseStorageSvc } from '@/core/services/use_storage';
import { LibLog } from '@/core/lib/dev/log';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { AuthSlice } from '@/features/auth/slice';
import { UseResetStateSvc } from '@/core/services/use_reset_state';
import { RefreshMdwNeedRefresh } from './etc/need_refresh';

export interface RefreshMngArgT {
  http: HttpClient;
  useStorage: UseStorageSvc;
  originalReq: HttpRequest<unknown>;
  next: HttpHandlerFn;
  useNav: UseNavSvc;
  authSlice: AuthSlice;
  useReset: UseResetStateSvc;
}

export class RefreshMdwMng extends RefreshMdwNeedRefresh {
  private static refresh(
    _: HttpErrorResponse,
    { http, useStorage, authSlice }: Pick<RefreshMngArgT, 'http' | 'useStorage' | 'authSlice'>
  ): Observable<string> {
    return http
      .get<ResApiT<JwtResT>>(this.constMdw.ENDPOINT_REFRESH, { withCredentials: true })
      .pipe(
        switchMap((res: ResApiT<JwtResT>) => {
          const freshJwt: string = res.accessToken;

          useStorage.setItem('accessToken', freshJwt);
          if (!authSlice.isLogged()) authSlice.login(freshJwt, { startTmr: false });

          return of(freshJwt);
        }),
        catchError((err: ErrApiT<void>) => {
          authSlice.logout({ startTmr: false });

          return throwError(() => err);
        })
      );
  }

  public static main(
    err: HttpErrorResponse,
    { http, useStorage, originalReq, next, authSlice, useNav, useReset }: RefreshMngArgT
  ): Observable<HttpEvent<unknown>> {
    return this.refresh(err, { http, useStorage, authSlice }).pipe(
      switchMap((freshJwt: string) => {
        LibLog.logTtl('✅ refresh ok');

        const retryRequest: HttpRequest<unknown> = originalReq.clone({
          setHeaders: {
            Authorization: `Bearer ${freshJwt}`,
          },
        });

        return next(retryRequest);
      }),
      catchError((err: ErrApiT<void>) => {
        LibLog.logTtl('❌ refresh fail');
        useReset.main();
        return from(useNav.replace('/auth/login')).pipe(
          catchError((err: unknown) => {
            // | ignore router fail & rethrow real error
            LibLog.logTtl('❌ navigation bug');
            return throwError(() => err);
          }),
          switchMap(() => throwError(() => err))
        );
      })
    );
  }
}
