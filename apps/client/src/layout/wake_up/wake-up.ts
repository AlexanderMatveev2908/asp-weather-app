import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Popup } from '../popup/popup';
import { PopupStaticPropsT } from '../popup/etc/types';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { WakeUpApiSvc } from '@/features/wake_up/api';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { ToastSlice } from '@/features/toast/slice';
import { UseStorageSvc } from '@/core/services/use_storage';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { WakeUpSlice } from '@/features/wake_up/slice';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { finalize } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { UsePopHk } from '@/core/hooks/closable/use_pop';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-wake-up',
  imports: [Popup, SpinBtn, UseMetaEventDir, UseIDsDir],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePopHk],
})
export class WakeUp implements AfterViewInit {
  // ? svc
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  public readonly useKitPop: UsePopHk = inject(UsePopHk);

  // ? popup props
  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'wake_up',
    closeOnMouseOut: false,
    eventT: 'INFO',
    closePop: this.useKitPop.closePop,
  };

  // ? cbs
  private pollIf(): boolean {
    if (this.usePlatform.isServer) return false;

    const tmsp: Nullable<string> = this.useStorage.getItem('wakeUp') ?? '0';
    const lastCall: number = isNaN(+tmsp) ? 0 : +tmsp;

    this.wakeUpSlice.setLastCall(lastCall);

    const now: number = Date.now();
    // eslint-disable-next-line no-magic-numbers
    const MS_OFFSET: number = LibPrs.minutesToMs(15);
    if (now - lastCall < MS_OFFSET) return false;

    return true;
  }

  ngAfterViewInit(): void {
    if (!this.pollIf()) return;

    this.useKitPop.isPop.set(true);

    this.usePlatform
      .whenStable<ResApiT<void>>(
        this.wakeUpApi.poll().pipe(finalize(() => this.useKitPop.isPop.set(false)))
      )
      .subscribe({
        next: (_: ResApiT<void>) => {
          const now = Date.now();
          this.wakeUpSlice.setLastCallWithStorage(now);
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
