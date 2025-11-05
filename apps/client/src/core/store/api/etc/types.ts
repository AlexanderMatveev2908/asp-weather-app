import { Nullable } from '@/common/types/etc';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

interface BaseResT {
  msg?: string;
  status: number;
}

export type ResApiT<T> = T extends void ? BaseResT : BaseResT & T;
export type ResApiMandatoryMsg<T> = Omit<ResApiT<T>, 'msg'> & { msg: string };

export type ObsResT<T> = Observable<ResApiT<T>>;
export type ObsOnOkT<T> = Observable<ResApiT<T> | never>;

export interface ErrApiT<T> extends HttpErrorResponse {
  error: ResApiT<T>;
}

export interface OptToastApiT {
  toastOk: boolean;
  toastErr: boolean;
  okMsg: Nullable<string>;
}

export interface OptErrApiT {
  pushOnErr: boolean;
  pushOnStatus: number[];
}

/* eslint-disable no-magic-numbers */
export enum ApiStatusT {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  ENTITY_UNPROCESSABLE = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
