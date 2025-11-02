import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RefreshMdwMng } from './refresh_mng';
import { inject } from '@angular/core';
import { UseStorageSvc } from '@/core/services/use_storage';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { AuthSlice } from '@/features/auth/slice';
import { UseResetStateSvc } from '@/core/services/use_reset_state';
import { UsePlatformSvc } from '@/core/services/use_platform';

// const refreshMng = (err: HttpErrorResponse): Promise<HttpEvent<unknown>> => {};

export const useRefreshApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const http: HttpClient = inject(HttpClient);
  const useStorage: UseStorageSvc = inject(UseStorageSvc);
  const useNav: UseNavSvc = inject(UseNavSvc);
  const authSlice: AuthSlice = inject(AuthSlice);
  const useReset: UseResetStateSvc = inject(UseResetStateSvc);
  const usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!RefreshMdwMng.needRefresh(err) && usePlatform.isClient) return throwError(() => err);

      return RefreshMdwMng.main(err, {
        http,
        useStorage,
        originalReq: req,
        next,
        authSlice,
        useNav,
        useReset,
      });
    })
  );
};
