import { Nullable } from '@/common/types/etc';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseBarsHk {
  public readonly isFilterBar: WritableSignal<boolean> = signal(false);
  public readonly isSortBar: WritableSignal<Nullable<boolean>> = signal<Nullable<boolean>>(null);
}
