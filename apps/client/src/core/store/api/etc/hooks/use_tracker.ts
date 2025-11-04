import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class UseApiTrackerHk {
  private readonly _isPending: WritableSignal<boolean> = signal(false);
  public readonly isPending: Signal<boolean> = this._isPending.asReadonly();

  public track<T>(cb: Observable<T>): Observable<T> {
    this._isPending.set(true);

    return cb.pipe(
      finalize(() => {
        this._isPending.set(false);
      })
    );
  }
}
