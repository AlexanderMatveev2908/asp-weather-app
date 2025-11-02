import { createAction, props } from '@ngrx/store';

export interface LastCallTmsp {
  tmsp: number;
}

export const WakeUpActT = {
  SET_LAST_CALL: createAction('SET_LAST_CALL', props<LastCallTmsp>()),
};
