import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { inject, Injectable } from '@angular/core';
import { UseUserKitSvc } from './use_user_kit';
import { UseKitNav } from '@/core/services/use_kit_nav';

@Injectable({
  providedIn: 'root',
})
export class UseKitFormUserSvc {
  public readonly useKitNav: UseKitNav = inject(UseKitNav);
  public readonly useKitUser: UseUserKitSvc = inject(UseUserKitSvc);
  public readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
}
