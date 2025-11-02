import { UseApiSvc } from '@/core/store/api/use_api';
import { ObsOnOkT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtOrCbcHmacResT, JwtResT } from '../auth/etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { Form2faT } from '@/common/types/etc';
import { CbcHmacMandatoryT } from '../cbcHmac/etc/types';

export interface RecoverPwdResT {
  strategy2FA: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VerifyApiSvc {
  private readonly base: string = '/verify';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public confMail(cbcHmacToken: string): ObsOnOkT<JwtResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/confirm-email`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public recoverPwd(cbcHmacToken: string): ObsOnOkT<RecoverPwdResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/recover-pwd`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public confNewMail(cbcHmacToken: string): ObsOnOkT<JwtOrCbcHmacResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/new-email`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public confNewMail2fa(data: Form2faT): ObsOnOkT<JwtResT> {
    return this.api.patch(
      LibApiArgs.withURL(`${this.base}/new-email-2FA`)
        .body(data)
        .pushOnCbcHmacErr()
        .toastOnFulfilled()
    );
  }

  public recoverPwd2fa(data: Form2faT): ObsOnOkT<CbcHmacMandatoryT> {
    return this.api.post(
      LibApiArgs.withURL(`${this.base}/recover-pwd-2FA`)
        .body(data)
        .pushOnCbcHmacErr()
        .toastOnFulfilled()
    );
  }
}
