import { SvgT } from '@/common/types/etc';

export type AppEventT = 'OK' | 'NONE' | 'ERR' | 'WARN' | 'INFO';

export interface AppEventMetaT {
  Svg: SvgT;
  css: string;
  txtTwd: string;
  bdTwd: string;
  clr: string;
}

export interface AppEventPayloadT {
  status: number;
  msg: string;
  eventT: AppEventT;
}
