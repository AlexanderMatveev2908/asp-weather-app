import { UseStorageSvc } from '@/core/services/use_storage/use_storage';
import { envVars } from '@/environments/environment';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const useRootApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const useStorage = inject(UseStorageSvc);
  const jwt = useStorage.getItem('accessToken');

  const baseURL: string = envVars.backURL;

  const clone = req.clone({
    url: `${baseURL}${req.url}`,
    setHeaders: {
      Authorization: jwt ? `Bearer ${jwt}` : '',
    },
    withCredentials: true,
  });

  return next(clone);
};
