import { createReducer, on } from '@ngrx/store';
import { Nullable } from '@/common/types/etc';
import { CbcHmacActT, TmrCbcHmacArgT } from './actions';
import { CbcHmacNullableT } from '../etc/types';

export type CbcHmacKeyTmrT = 'deleting' | 'saving';

export interface CbcHmacStateT {
  cbcHmacToken: Nullable<string>;
  deleting: boolean;
  saving: boolean;
}

export const initState: CbcHmacStateT = {
  cbcHmacToken: null,
  deleting: false,
  saving: false,
};

export const cbcHmacReducer = createReducer(
  initState,
  on(CbcHmacActT.SET_CBC_HMAC, (state: CbcHmacStateT, action: CbcHmacNullableT) => {
    const isPayload: boolean = !!action.cbcHmacToken;
    return {
      ...state,
      cbcHmacToken: action.cbcHmacToken,
      deleting: isPayload ? false : state.deleting,
      saving: isPayload ? state.saving : false,
    };
  }),
  on(CbcHmacActT.DELETING_TMR, (state: CbcHmacStateT, action: TmrCbcHmacArgT) => ({
    ...state,
    deleting: action.val,
  })),
  on(CbcHmacActT.SAVING_TMR, (state: CbcHmacStateT, action: TmrCbcHmacArgT) => ({
    ...state,
    saving: action.val,
  })),
  on(CbcHmacActT.RESET_CBC_HMAC_STATE, (_: CbcHmacStateT) => ({ ...initState, deleting: true }))
);
