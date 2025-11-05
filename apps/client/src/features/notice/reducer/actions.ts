import { createAction, props } from '@ngrx/store';
import { NoticeStateT } from './reducer';

export const NoticeActT = {
  RESET__NOTICE_STATE: createAction('RESET__NOTICE_STATE'),
  SET_NOTICE: createAction('SET_NOTICE', props<NoticeStateT>()),
};
