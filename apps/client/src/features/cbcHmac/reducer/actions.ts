import { createAction, props } from '@ngrx/store';
import { CbcHmacNullableT } from '../etc/types';

export interface TmrCbcHmacArgT {
  val: boolean;
}

export const CbcHmacActT = {
  SET_CBC_HMAC: createAction('SET_CBC_HMAC', props<CbcHmacNullableT>()),
  DELETING_TMR: createAction('DELETING_TMR', props<TmrCbcHmacArgT>()),
  SAVING_TMR: createAction('SAVING_TMR', props<TmrCbcHmacArgT>()),
  RESET_CBC_HMAC_STATE: createAction('RESET_CBC_HMAC_STATE'),
};
