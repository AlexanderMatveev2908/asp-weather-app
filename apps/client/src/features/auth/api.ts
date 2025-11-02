import { UseApiSvc } from '@/core/store/api/use_api';
import { ObsOnOkT, ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtOrCbcHmacResT, JwtResT, RecoverPwdArgT } from './etc/types';
import { RegisterFormT } from './pages/register/paperwork/form_mng';
import { LoginFormT } from './pages/login/paperwork/from_mng';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { Form2faT, FormCbcHmacT } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class AuthApiSvc {
  private readonly base: string = '/auth';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public register(body: RegisterFormT): ObsResT<JwtResT> {
    return this.api.post(LibApiArgs.withURL(`${this.base}/register`).body(body).toastOnFulfilled());
  }

  public login(body: LoginFormT): ObsResT<JwtOrCbcHmacResT> {
    return this.api.post(LibApiArgs.withURL(`${this.base}/login`).body(body).toastOnFulfilled());
  }

  public logout(): ObsResT<void> {
    return this.api.post(LibApiArgs.withURL(`${this.base}/logout`).toastOnFulfilled());
  }

  public recoverPwd(arg: RecoverPwdArgT): ObsResT<JwtResT> {
    return this.api.patch(
      LibApiArgs.withURL(`${this.base}/recover-pwd`).body(arg).pushOnCbcHmacErr().toastOnFulfilled()
    );
  }

  public login2FA(data: Form2faT): ObsResT<JwtResT> {
    return this.api.post(
      LibApiArgs.withURL(`${this.base}/login-2FA`).body(data).pushOnCbcHmacErr().toastOnFulfilled()
    );
  }

  public recoverPwd2fa(data: FormCbcHmacT<{ password: string }>): ObsOnOkT<JwtResT> {
    return this.api.patch(
      LibApiArgs.withURL(`${this.base}/recover-pwd-2FA`)
        .body(data)
        .pushOnCbcHmacErr()
        .toastOnFulfilled()
    );
  }
}
