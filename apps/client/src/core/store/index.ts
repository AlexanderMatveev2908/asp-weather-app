import { toastReducer, ToastStateT } from '@/features/toast/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  toast: ToastStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  toast: toastReducer,
};
