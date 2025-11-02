import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { ElementRef, TemplateRef, Type } from '@angular/core';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Nullable<Record<string, unknown>>;

export interface WithIdT {
  id: string;
}

export interface WithEventT {
  eventT: AppEventT;
}

// ? make components accepts always
// ? a testId assigning it then based on needs
export interface WithTestIdT {
  testId: Nullable<string>;
}

export type RefDomT = Opt<ElementRef<HTMLElement>>;

export type RefTemplateT = Opt<TemplateRef<unknown>>;

export type SvgT = Type<unknown>;

export type ElDomT = HTMLElement | None;

export interface BtnStatePropsT {
  isPending: boolean;
  isDisabled: boolean;
}

export type None = null | undefined;

export type OrNone<T> = T | None;

export type Nullable<T> = T | null;

export type NotNullKeysT<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type Opt<T> = T | undefined;

export type TimerIdT = Nullable<NodeJS.Timeout>;

export interface BtnListenersT {
  onClick: (() => void) | (() => Promise<void>);
}

export type BtnT = 'button' | 'submit';

export type OptCbT = Nullable<(val: unknown) => void>;

export interface SqlTableT {
  id: string;
  createdAt: number;
  updatedAt: number;

  deletedAt: Nullable<number>;
}

interface BaseCbcHmacData {
  cbcHmacToken: string;
}
export type FormCbcHmacT<T> = T extends void ? BaseCbcHmacData : BaseCbcHmacData & T;

export type DataApiTotpT = FormCbcHmacT<{
  totpCode: string;
}>;

export type DataApiBkpT = FormCbcHmacT<{
  backupCode: string;
}>;

export type Form2faT = DataApiTotpT | DataApiBkpT;
