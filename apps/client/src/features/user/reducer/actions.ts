import { createAction, props } from '@ngrx/store';
import { UserT } from '../etc/types';

export interface PendingArgT {
  isPending: boolean;
}

export const UserActT = {
  SET_USER: createAction('SET_USER', props<UserT>()),
  MARK_NULL: createAction('MARK_NULL'),
  SET_PENDING: createAction('SET_PENDING', props<PendingArgT>()),
  TRIGGER_API: createAction('TRIGGER_API'),
  RESET_USER_STATE: createAction('RESET_USER_STATE'),
};
