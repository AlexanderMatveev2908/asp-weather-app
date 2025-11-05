import { Injectable } from '@angular/core';
import { animate } from '@motionone/dom';

@Injectable({
  providedIn: 'root',
})
export class AnimationsPopSvc {
  public popIn(popDOM: HTMLElement): void {
    animate(
      popDOM,
      {
        // eslint-disable-next-line no-magic-numbers
        scaleX: [0, 0.6, 1.3, 0.8, 1.1, 1],
        // eslint-disable-next-line no-magic-numbers
        scaleY: [0, 1.4, 0.7, 1.2, 0.9, 1],
      },
      {
        easing: 'ease-in-out',
        duration: 0.8,
      }
    );
  }

  public popOut(popDOM: HTMLElement): void {
    animate(
      popDOM,
      {
        scaleY: [1, 0],
      },
      {
        easing: 'ease-in-out',
        duration: 0.25,
      }
    );
  }
}
