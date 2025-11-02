import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '../../store';
import { UseStorageSvc } from '../../services/use_storage';

@Injectable()
export abstract class UseKitSliceHk {
  protected readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);
  protected readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
}
