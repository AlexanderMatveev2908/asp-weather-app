import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { Nullable } from '@/common/types/etc';
import { Setup2faReturnT, UserT } from '@/features/user/etc/types';
import { LibApiShape } from '@/core/store/api/etc/lib/shape';
import { finalize, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseKitFormUserSvc } from '@/features/user/etc/services/use_kit_form_user';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { Notice2fa } from './content_options/notice/notice-2fa';
import { ContentSetup2fa } from './content_options/setup/content-setup-2fa';
import { ConfSwapT } from '@/core/hooks/swap/etc/types';

@Component({
  selector: 'app-setup-2fa',
  imports: [UseMetaEventDir, Notice2fa, ContentSetup2fa],
  templateUrl: './setup-2fa.html',
  styleUrl: './setup-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class Setup2fa {
  // ? props
  public readonly triggerCalcH: InputSignal<() => void> = input.required();
  public readonly confSwap: InputSignal<ConfSwapT> = input.required();

  // ? local api state
  public readonly resSetup2FA: WritableSignal<Nullable<Setup2faReturnT>> = signal(null);

  // ? scv
  private readonly useKitFormUser: UseKitFormUserSvc = inject(UseKitFormUserSvc);

  // ? derived
  public readonly user: Signal<Nullable<UserT>> = this.useKitFormUser.useKitUser.userSlice.user;

  // ? hooks
  public readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? listeners
  public readonly onClick: () => void = () => {
    const cbcHmac: Nullable<string> = this.useKitFormUser.cbcHmacSlice.cbcHmac();

    LibApiShape.throwIfCbcHmacMissing(
      cbcHmac,
      this.useApiTracker.track(
        this.useKitFormUser.useKitUser.userApi.setup2FA({ cbcHmacToken: cbcHmac! }).pipe(
          tap((res: ResApiT<Setup2faReturnT>) => {
            this.resSetup2FA.set(res);
          }),
          finalize(() => this.triggerCalcH()())
        )
      )
    ).subscribe();
  };
}
