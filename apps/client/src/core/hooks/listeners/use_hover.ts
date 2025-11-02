import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseHoverHk {
  public readonly isHover: WritableSignal<boolean> = signal(false);

  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }
}
