import { TimerIdT } from '@/common/types/etc';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { LibEtc } from '@/core/lib/etc';
import { ToastStateT } from '@/features/toast/reducer/reducer';
import { ToastSlice } from '@/features/toast/slice';
import { computed, Directive, inject, Signal, ViewChild } from '@angular/core';
import { RefDomT } from '@/common/types/dom';

@Directive()
export abstract class ToastRoot {
  // ? svc
  protected readonly toastSlice: ToastSlice = inject(ToastSlice);
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? derived
  public readonly toastState: Signal<ToastStateT> = computed(() => this.toastSlice.toastState());
  public readonly isClient: boolean = this.usePlatform.isClient;

  // ? children
  @ViewChild('toast') toast: RefDomT;
  @ViewChild('timerToast') timerToast: RefDomT;

  // ? local state
  protected timerID: TimerIdT = null;

  // ? private helper & listeners
  public readonly closeClick: () => void = () => {
    // ? always first clear timer on close
    // ? it means process finished completely
    this.timerID = LibEtc.clearTmr(this.timerID);
    this.toastSlice.closeToast();
  };
}
