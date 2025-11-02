import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { ObsResT } from '@/core/store/api/etc/types';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';

@Injectable({
  providedIn: 'root',
})
export class RequireMailApiSvc {
  private readonly base: string = '/require-email';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public confMail(body: MailFormT): ObsResT<void> {
    return this.api.post(
      LibApiArgs.withURL(`${this.base}/confirm-email`).body(body).toastOnFulfilled()
    );
  }

  public recoverPwd(body: MailFormT): ObsResT<void> {
    return this.api.post(
      LibApiArgs.withURL(`${this.base}/recover-pwd`).body(body).toastOnFulfilled()
    );
  }

  public confMailLogged(body: MailFormT): ObsResT<void> {
    return this.api.post(
      LibApiArgs.withURL(`${this.base}/confirm-email-logged`).body(body).toastOnFulfilled()
    );
  }
}
