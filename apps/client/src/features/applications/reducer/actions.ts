import { createAction, props } from '@ngrx/store';
import { ApplicationsStateT } from './reducer';

export const ApplicationsActT = {
  SAVE_APPLICATIONS_DATA: createAction(
    'SAVE_APPLICATIONS_DATA',
    props<Omit<ApplicationsStateT, 'keyRefresh'>>()
  ),
  TRIGGER_KEY_REFRESH: createAction('TRIGGER_KEY_REFRESH'),
  RESET__APPLICATIONS_STATE: createAction('RESET__APPLICATIONS_STATE'),
};
