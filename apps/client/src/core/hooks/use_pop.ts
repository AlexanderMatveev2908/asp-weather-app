import { Nullable } from '@/common/types/etc';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UsePopHk {
  // ? local state
  public readonly isPop: WritableSignal<Nullable<boolean>> = signal(null);
  public readonly closePop: () => void = () => {
    this.isPop.set(false);
  };
}
