import { createReducer, on } from '@ngrx/store';
import { AuthActT, LoggingKeyArgT } from './actions';
import { Nullable } from '@/common/types/etc';

export interface AuthStateT {
  isLogged: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
  cbcHmac: Nullable<string>;
}

export const initState: AuthStateT = {
  isLogged: false,
  loggingIn: false,
  loggingOut: false,
  cbcHmac: null,
};

export const authReducer = createReducer(
  initState,
  on(AuthActT.AUTH__LOGIN, (state: AuthStateT) => ({
    ...state,
    isLogged: true,
    loggingOut: false,
  })),
  on(AuthActT.AUTH__LOGOUT, (state: AuthStateT) => ({
    ...state,
    isLogged: false,
    loggingIn: false,
  })),
  on(AuthActT.AUTH__SET_LOGGING_TMR, (state: AuthStateT, action: LoggingKeyArgT) => ({
    ...state,
    [action.key]: action.val,
  }))
);
