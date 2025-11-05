import { AppPayloadEventT, WithIdT } from '@/common/types/etc';
import { createAction, props } from '@ngrx/store';

export const ToastActT = {
  RESET__TOAST_STATE: createAction('RESET__TOAST_STATE'),
  OPEN_TOAST: createAction('OPEN_TOAST', props<AppPayloadEventT>()),
  SET_ID: createAction('SET_ID', props<WithIdT<object>>()),
  CLOSE_TOAST: createAction('CLOSE_TOAST'),
};
