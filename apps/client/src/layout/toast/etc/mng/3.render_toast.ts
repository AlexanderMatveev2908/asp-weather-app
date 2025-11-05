import { Directive, effect, EffectRef, inject } from '@angular/core';
import { ToastAnimationsSvc } from '../animations';
import { Nullable } from '@/common/types/etc';
import { ToastTimer } from './2.timer';
import { ElDomT } from '@/common/types/dom';
import { ErrApp } from '@/core/lib/etc/err';

@Directive()
export abstract class ToastRender extends ToastTimer {
  // ? svc
  private readonly toastAnimations: ToastAnimationsSvc = inject(ToastAnimationsSvc);

  // ? private helpers
  private handleToastOpen(
    prevID: Nullable<string>,
    { toastDOM, timerDOM }: { toastDOM: HTMLElement; timerDOM: HTMLElement }
  ): void {
    const OUT_ANIMATION_LAST = 300;
    // ? first run will have prev as null because openToast set:
    // ? - curr => new uuid
    // ? - prev => curr (which if has been closed properly ill be null)
    // ? so normally this block will handle base cases
    if (!prevID) {
      this.toastAnimations.toastIn(toastDOM, timerDOM);
      this.programClose();
    } else {
      // ? existing toast
      // ? clear existing timer to avoid memory leaks
      // ? close it with animations and trigger animation again
      // ? only after `out` one has finished
      this.clearTmr();
      this.toastAnimations.toastOut(toastDOM, timerDOM);
      setTimeout(() => {
        this.toastAnimations.toastIn(toastDOM, timerDOM);
        this.programClose();
      }, OUT_ANIMATION_LAST);
    }
  }

  private handleCloseToast({
    timerDOM,
    toastDOM,
  }: {
    toastDOM: HTMLElement;
    timerDOM: HTMLElement;
  }): void {
    // ? normal close flow
    this.clearTmr();
    this.toastAnimations.toastOut(toastDOM, timerDOM);
  }

  // ? listener
  // eslint-disable-next-line complexity
  private readonly timerEffect: EffectRef = effect(() => {
    const toastDOM: ElDomT = this.toast?.nativeElement;
    const timerDOM: ElDomT = this.timerToast?.nativeElement;

    const { isToast, currID, prevID } = this.toastState();

    if (!this.isClient || !toastDOM || !timerDOM) return;

    if (isToast && currID) {
      this.handleToastOpen(prevID, { toastDOM, timerDOM });
    } else if (isToast && !currID) {
      // ! error if by a toast exists with no ID
      throw new ErrApp('toast should never be alive without a currID set');
    } else if (!isToast) {
      this.handleCloseToast({ toastDOM, timerDOM });
    }
  });
}
