import { createReducer, on } from '@ngrx/store';
import { LastCallTmsp, WakeUpActT } from './actions';

export interface WakeUpStateT {
  lastCall: number;
}

export const initState: WakeUpStateT = {
  lastCall: 0,
};

export const wakeUpReducer = createReducer(
  initState,
  on(WakeUpActT.SET_LAST_CALL, (state: WakeUpStateT, action: LastCallTmsp) => ({
    lastCall: action.tmsp,
  }))
);
