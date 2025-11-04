import { AppPayloadEventT, WithIdT } from '@/common/types/etc';
import { createAction, props } from '@ngrx/store';

export const ToastActT = {
  OPEN_TOAST: createAction('OPEN_TOAST', props<AppPayloadEventT>()),
  SET_ID: createAction('SET_ID', props<WithIdT<void>>()),
  CLOSE_TOAST: createAction('CLOSE_TOAST'),
};
