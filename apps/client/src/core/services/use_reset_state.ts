import { inject, Injectable } from '@angular/core';
import { UseStorageSvc } from './use_storage';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UserSlice } from '@/features/user/slice';
import { AuthSlice } from '@/features/auth/slice';
import { ApplicationsSlice } from '@/features/applications/slice';

@Injectable({
  providedIn: 'root',
})
export class UseResetStateSvc {
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly applicationsSlice: ApplicationsSlice = inject(ApplicationsSlice);

  public main(): void {
    this.authSlice.logout({ startTmr: true });
    this.useStorage.cleanAll();
    this.cbcHmacSlice.reset();
    this.userSlice.reset();
    this.applicationsSlice.reset();
  }
}
