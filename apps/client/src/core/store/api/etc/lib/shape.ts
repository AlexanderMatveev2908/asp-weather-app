import { DataApiBkpT, DataApiTotpT, Form2faT, Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { defer, Observable, throwError } from 'rxjs';
import { StatusT } from '../types';

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

export class LibApiShape {
  public static isHttpRes(e: HttpEvent<unknown> | HttpErrorResponse): boolean {
    return e instanceof HttpResponse || e instanceof HttpErrorResponse;
  }

  public static throwIfCbcHmacMissing(
    cbcHmacToken: Nullable<string>,
    obs: Observable<unknown>
  ): Observable<unknown> {
    return !cbcHmacToken
      ? throwError(
          () =>
            new ErrApp('bug => missing cbc_hmac and still user submit form', StatusT.UNAUTHORIZED)
        )
      : obs;
  }

  public static throwIfData2faWrong(data: Form2faT, cb: Observable<unknown>): Observable<unknown> {
    return this.throwIfCbcHmacMissing(
      data.cbcHmacToken,
      defer(() => {
        if (!(data as DataApiTotpT)?.totpCode && !(data as DataApiBkpT)?.backupCode)
          return throwError(
            () =>
              new ErrApp(
                'bug => neither totp code nor bkp code has been provided',
                StatusT.UNAUTHORIZED
              )
          );

        return cb;
      })
    );
  }
}
