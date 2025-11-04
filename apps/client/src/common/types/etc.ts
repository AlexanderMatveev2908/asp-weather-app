import { Type } from '@angular/core';

export type None = null | undefined;

export type OrNone<T> = T | None;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type SvgT = Type<unknown>;

interface BaseIdT {
  id: string;
}
export type WithIdT<T> = T extends void ? BaseIdT : T & BaseIdT;

export type TimerIdT = Nullable<NodeJS.Timeout>;

export type Dict = Record<string, unknown>;

export type BoolStrT = 'true' | 'false';

export type AppEventT = 'ERR' | 'WARN' | 'INFO' | 'NONE' | 'OK';

export interface AppPayloadEventT {
  msg: string;
  status: number;
  eventT: AppEventT;
}
