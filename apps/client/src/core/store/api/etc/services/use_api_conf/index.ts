import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { ConfApiT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class UseApiConfSvc {
  private readonly conf: BehaviorSubject<Nullable<ConfApiT>> = new BehaviorSubject<
    Nullable<ConfApiT>
  >(null);

  setNext(conf: ConfApiT): void {
    this.conf.next(conf);
  }

  getCurr(): Nullable<ConfApiT> {
    return this.conf.value;
  }

  asObs(): Observable<Nullable<ConfApiT>> {
    return this.conf.asObservable();
  }
}
