import { Nullable } from '@/common/types/etc';
import { LibCbcHmac } from '@/features/cbcHmac/etc/lib';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
import { Reg } from '@/core/paperwork/reg';
import { AadCbcHmacT, TokenT } from '@/features/cbcHmac/etc/types';
import { ToastSlice } from '@/features/toast/slice';
import { Directive, inject } from '@angular/core';
import { UseKitNav } from '@/core/services/use_kit_nav';

@Directive()
export abstract class UseMngVerifyDir {
  protected readonly toastSlice: ToastSlice = inject(ToastSlice);
  protected readonly useNavKit: UseKitNav = inject(UseKitNav);

  private readonly verifyTokenT: Set<TokenT> = new Set<TokenT>([
    TokenT.CONF_EMAIL,
    TokenT.RECOVER_PWD,
    TokenT.CHANGE_EMAIL,
  ]);

  protected extractAad(cbcHmac: Nullable<string>): Nullable<AadCbcHmacT> {
    const missing: boolean = !cbcHmac;
    const invalid: boolean = !Reg.isCbcHmac(cbcHmac);
    const aad: Nullable<AadCbcHmacT> = LibCbcHmac.aadFrom(cbcHmac!);

    if (missing || invalid || !aad || !this.verifyTokenT.has(aad.tokenT)) {
      const payload: AppEventPayloadT = {
        eventT: 'ERR',
        msg: `Token ${missing ? 'not provided' : 'invalid'}`,
        status: 401,
      };

      this.toastSlice.openToast(payload);

      this.useNavKit.pushNotice(payload);

      return null;
    }

    return aad;
  }
}
