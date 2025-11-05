import { Injectable } from '@angular/core';
import { animate } from '@motionone/dom';

@Injectable({
  providedIn: 'root',
})
export class ToastAnimationsSvc {
  public toastIn(toastDOM: HTMLElement, timerDOM: HTMLElement): void {
    animate(
      toastDOM,
      {
        x: ['120%', '-60%', '40%', '-30%', '20%', '-10%', '0%'],
        // eslint-disable-next-line no-magic-numbers
        opacity: [0, ...new Array(6).fill(1)],
      },
      {
        duration: 0.6,
        easing: 'ease-in-out',
      }
    );

    animate(
      timerDOM,
      {
        width: ['100%', '0%'],
      },
      {
        duration: 5,
        easing: 'linear',
      }
    );
  }

  public toastOut(toastDOM: HTMLElement, timerDOM: HTMLElement): void {
    animate(
      toastDOM,
      {
        // eslint-disable-next-line no-magic-numbers
        opacity: [1, 1, 0.5],
        x: ['0%', '-60%', '120%'],
      },
      {
        duration: 0.3,
        easing: 'ease-in-out',
      }
    );

    void timerDOM;
  }
}
