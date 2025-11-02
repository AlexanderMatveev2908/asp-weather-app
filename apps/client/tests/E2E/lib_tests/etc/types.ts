import { UserT } from '@/features/user/etc/types';
import { LibTests } from '..';
import { Locator } from '@playwright/test';

export interface DataFieldT {
  field: string;
  val: string;
}

export interface DataFieldErrT extends DataFieldT {
  err: string;
}

// ? test/user endpoint
export interface TkResT {
  user: UserT;
  accessToken: string;
  refreshToken: string;
  cbcHmacToken: string;
  plainPwd: string;
  // ! only when u ask server for user with 2FA
  totpSecret?: string;
  bkpCodes?: string[];
}

interface BaseResT {
  lib: LibTests;
  res: TkResT;
}

export type PreTestResT<T> = T extends void ? BaseResT : BaseResT & T;

export type PreTestFormResT = PreTestResT<{ form: Locator }>;

export type Submit2faArgT<T> = {
  id: string;
  waitPushTo: string;
} & T;

export type SubmitTotpArgT = Submit2faArgT<{
  totpSecret: string;
}>;

export type SubmitBkpArgT = Submit2faArgT<{
  bkpCode: string;
}>;

export interface LoginArgT {
  res: TkResT;
  waitPushTo: string;
}
