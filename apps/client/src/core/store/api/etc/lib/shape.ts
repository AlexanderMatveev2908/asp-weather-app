import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';

export class LibApiShape {
  public static isHttpRes(e: HttpEvent<unknown> | HttpErrorResponse): boolean {
    return e instanceof HttpResponse || e instanceof HttpErrorResponse;
  }
}
