import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HttpMethod } from '../etc/types';
import { inject } from '@angular/core';
import { UseApiConfSvc } from '../etc/services/use_api_conf';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';
import { LibApiShape, HttpResT } from '../etc/lib/shape';
import { Nullable } from '@/common/types/etc';
import { ConfApiT } from '../etc/services/use_api_conf/etc/types';

const getDataSent = (req: HttpRequest<unknown>): Nullable<Record<string, unknown>> => {
  let dataSent: Nullable<Record<string, unknown>>;
  if (['GET', 'DELETE'].some((str: string) => str === req.method)) dataSent = null;
  else dataSent = (req.body || null) as Nullable<Record<string, unknown>>;

  return dataSent;
};

const getParams = (req: HttpRequest<unknown>): Nullable<Record<string, unknown>> => {
  const reqParams: HttpParams = req.params;
  const params: Record<string, unknown> = {};
  for (const k of reqParams.keys()) params[k] = reqParams.get(k);

  return LibShapeCheck.hasObjData(params) ? params : null;
};

const mng = (
  req: HttpRequest<unknown>,
  e: HttpEvent<unknown> | HttpErrorResponse,
  confApi: UseApiConfSvc
): void => {
  if (!LibApiShape.isHttpRes(e)) return;
  const res: HttpResT = e as HttpResT;

  const urlReq: string = (res.url ?? '').split('?')[0];
  const conf: ConfApiT = {
    url: urlReq,
    method: req.method as HttpMethod,
    responseType: res.headers.get('Content-Type') || null,
    requestType: req.headers.get('Content-Type') || null,
    accessToken: req.headers.get('Authorization') || null,
    params: getParams(req),
    body: getDataSent(req),
    rateLimit: {
      window: res.headers.get('RateLimit-Window'),
      limit: res.headers.get('RateLimit-Limit'),
      remaining: res.headers.get('RateLimit-Remaining'),
      reset: res.headers.get('RateLimit-Reset'),
    },
  };

  confApi.setNext(conf);
};

export const useConfApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const confApi: UseApiConfSvc = inject(UseApiConfSvc);

  return next(req).pipe(
    tap({
      next: (e: HttpEvent<unknown>) => mng(req, e, confApi),
      error: (e: HttpEvent<unknown>) => mng(req, e, confApi),
    })
  );
};
