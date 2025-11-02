import { inject, Injectable } from '@angular/core';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseKitNav } from '@/core/services/use_kit_nav';

@Injectable()
export abstract class UseKitPairPwdFormHk {
  protected readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  protected readonly useKitNav: UseKitNav = inject(UseKitNav);
}
