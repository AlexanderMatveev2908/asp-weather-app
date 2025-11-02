import { createAction, props } from '@ngrx/store';

export type LoggingKeyT = 'loggingIn' | 'loggingOut';
export interface LoggingKeyArgT {
  key: LoggingKeyT;
  val: boolean;
}

export const AuthActT = {
  AUTH__LOGIN: createAction('AUTH__LOGIN'),
  AUTH__LOGOUT: createAction('AUTH__LOGOUT'),
  AUTH__SET_LOGGING_TMR: createAction('AUTH__SET_LOGGING_TMR', props<LoggingKeyArgT>()),
};
