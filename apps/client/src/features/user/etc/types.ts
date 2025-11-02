import { Nullable, SqlTableT } from '@/common/types/etc';

export interface UserT extends SqlTableT {
  firstName: string;
  lastName: string;
  email: string;
  tmpEmail: Nullable<string>;
  isVerified: boolean;
  use2FA: boolean;

  toptSecret?: string;
  password?: string;
}

export interface ResProfileT {
  user?: UserT;
}

interface BaseUserFormArgT {
  cbcHmacToken: string;
}
export type UserFormArgT<T> = T extends void ? BaseUserFormArgT : BaseUserFormArgT & T;

export interface Setup2faReturnT {
  totpSecret: string;
  backupCodes: string[];
  totpSecretQrCode: string;
  zipFile: string;
}
