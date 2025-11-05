import { Directive } from '@angular/core';
import { ToastTrimMsg } from './1.trim_msg';
import { LibEtc } from '@/core/lib/etc';

@Directive()
export abstract class ToastTimer extends ToastTrimMsg {
  protected clearTmr(): void {
    this.timerID = LibEtc.clearTmr(this.timerID);
  }

  protected programClose(): void {
    const IN_ANIMATION_LAST = 5000;

    this.timerID = setTimeout(() => {
      const isToast: boolean = this.toastState().isToast;
      // ! memory leak to manage
      if (this.timerID && !isToast) {
        this.clearTmr();
        return;
      }
      // ? if timer is null or toast is false means process
      // ? has already been closed by an existing new call
      else if (!this.timerID || !isToast) return;

      this.closeClick();
    }, IN_ANIMATION_LAST);
  }
}
