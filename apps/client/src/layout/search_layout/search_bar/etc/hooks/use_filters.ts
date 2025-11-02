import { Nullable } from '@/common/types/etc';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseFiltersHk {
  public readonly currFilter: WritableSignal<Nullable<string>> = signal<Nullable<string>>(null);
}
