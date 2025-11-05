import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { ConfApiMdwMng } from './etc/mng';
import { UseApiConfSvc } from '../../etc/services/use_api_conf';

export const useConfApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const confApi: UseApiConfSvc = inject(UseApiConfSvc);

  return next(req).pipe(
    tap({
      next: (e: HttpEvent<unknown>) => ConfApiMdwMng.main(req, e, confApi),
      error: (e: HttpEvent<unknown>) => ConfApiMdwMng.main(req, e, confApi),
    })
  );
};
