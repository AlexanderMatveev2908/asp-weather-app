import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Popup } from '../popup/popup';
import { PopupStaticPropsT } from '../popup/etc/types';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { ToastSlice } from '@/features/toast/slice';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { finalize } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { UsePopHk } from '@/core/hooks/use_pop';
import { UseStorageSvc } from '@/core/services/use_storage/use_storage';
import { WakeUpApiSvc } from '@/features/wake_up/api';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { envVars } from '@/environments/environment';

@Component({
  selector: 'app-wake-up',
  imports: [Popup, SpinBtn, UseMetaEventDir],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePopHk],
})
export class WakeUp implements AfterViewInit {
  // ? svc
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  // ? hooks
  public readonly usePopHk: UsePopHk = inject(UsePopHk);

  // ? popup props
  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'wake_up',
    closeOnMouseOut: false,
    eventT: 'INFO',
    closePop: this.usePopHk.closePop,
  };

  // ? message user
  public readonly backURL: string = envVars.backURL;

  // ? cbs
  private pollIf(): boolean {
    if (this.usePlatform.isServer) return false;

    const tmsp: Nullable<string> = this.useStorage.getItem('wakeUp') ?? '0';
    const lastCall: number = isNaN(+tmsp) ? 0 : +tmsp;

    const now: number = Date.now();

    const marginMinutes: number = 15;
    const marginMillis: number = LibPrs.msFromMinutes(marginMinutes);
    if (now - lastCall < marginMillis) return false;

    return true;
  }

  ngAfterViewInit(): void {
    if (!this.pollIf()) return;

    this.usePopHk.isPop.set(true);

    this.usePlatform
      .whenStable<ResApiT<void>>(
        this.wakeUpApi.poll().pipe(finalize(() => this.usePopHk.isPop.set(false)))
      )
      .subscribe({
        next: (_: ResApiT<void>) => {
          const now = Date.now();
          this.useStorage.setItem('wakeUp', now);
        },
        error: (err: ErrApiT<void>) => {
          this.toastSlice.ifNotPresent({
            msg: err.error.msg ?? 'server not available',
            status: err.status,
            eventT: 'ERR',
          });
        },
      });
  }
}
