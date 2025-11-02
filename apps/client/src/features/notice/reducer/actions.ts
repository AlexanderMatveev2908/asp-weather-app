import { createAction, props } from '@ngrx/store';
import { NoticeStateT } from './reducer';

export const NoticeActT = {
  SET_NOTICE: createAction('SET_NOTICE', props<NoticeStateT>()),
};
