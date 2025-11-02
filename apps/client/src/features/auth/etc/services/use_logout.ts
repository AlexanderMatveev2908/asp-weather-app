import { inject, Injectable } from '@angular/core';
import { UseAuthKitSvc } from './use_auth_kit';
import { ObsResT, ResApiT } from '@/core/store/api/etc/types';
import { from, tap } from 'rxjs';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { UseResetStateSvc } from '@/core/services/use_reset_state';

@Injectable({
  providedIn: 'root',
})
export class UseLogout {
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly useReset: UseResetStateSvc = inject(UseResetStateSvc);

  public main(): ObsResT<void> {
    return this.useAuthKit.authApi.logout().pipe(
      tap((_: ResApiT<void>) => {
        this.useReset.main();

        return from(this.useNav.replace('/'));
      })
    );
  }
}
