import { WithIdT } from '@/common/types/etc';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
import { createAction, props } from '@ngrx/store';

export const ToastActT = {
  OPEN_TOAST: createAction('OPEN_TOAST', props<AppEventPayloadT>()),
  SET_ID: createAction('SET_ID', props<WithIdT>()),
  CLOSE_TOAST: createAction('CLOSE_TOAST'),
};
