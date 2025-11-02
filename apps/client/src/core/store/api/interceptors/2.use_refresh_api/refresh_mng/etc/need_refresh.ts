import { Nullable } from '@/common/types/etc';
import { ResApiMandatoryMsg, StatusT } from '../../../../etc/types';
import { HttpErrorResponse } from '@angular/common/http';
import { envVars } from '@/environments/environment';
import { RefreshMdwConst } from './constants';

export class RefreshMdwNeedRefresh {
  protected static readonly constMdw: RefreshMdwConst = new RefreshMdwConst();

  private static extractData(err: HttpErrorResponse): ResApiMandatoryMsg<void> {
    let data: Nullable<ResApiMandatoryMsg<void>> = null;

    const contentType: string = err.headers.get('Content-Type') ?? '';

    if (contentType.includes('application/json')) {
      data = err.error;
    } else if (typeof err.error === 'string') {
      try {
        data = JSON.parse(err.error);
      } catch {
        data = { msg: err.error, status: err.status };
      }
    } else {
      data = { msg: 'Unexpected error type', status: err.status };
    }

    return data as NonNullable<ResApiMandatoryMsg<void>>;
  }

  private static is401(status: number): boolean {
    return status === StatusT.UNAUTHORIZED;
  }
  private static isJwtErr(msg: string): boolean {
    return this.constMdw.KEY_MSG_ERR.some((err: string) => msg.includes(err));
  }
  private static isRefreshing(endpoint: string): boolean {
    return endpoint === this.constMdw.ENDPOINT_REFRESH;
  }

  public static needRefresh(err: HttpErrorResponse): boolean {
    const data: ResApiMandatoryMsg<void> = this.extractData(err);

    const partial: string = (err.url ?? 'Unknown url').replace(envVars.backURL, '');

    const need: boolean =
      this.is401(data.status) && this.isJwtErr(data.msg) && !this.isRefreshing(partial);

    return need;
  }
}
