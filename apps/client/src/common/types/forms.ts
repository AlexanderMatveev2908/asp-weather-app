import { ValidationErrors } from '@angular/forms';
import { Nullable, SvgT } from './etc';

export type TxtInputT = 'text' | 'email' | 'password' | 'url' | 'textarea' | 'date';
export type CheckInputT = 'radio' | 'checkbox';

export interface RecErrsFieldT {
  prev: Nullable<string>;
  curr: Nullable<string>;
}
export type ErrsFieldT = ValidationErrors & { zod: Nullable<string> };

export interface PairPwdStateT {
  isPwdTypePwd: boolean;
  isConfirmPwdTypePwd: boolean;
}

interface BaseFieldT {
  id: string;
  name: string;
  field: string;
  label: string;
}

export interface TxtFieldT extends BaseFieldT {
  type: TxtInputT;
  place: string;
}
export interface TxtSvgFieldT extends TxtFieldT {
  Svg: SvgT;
}
export interface TxtFieldArrayT extends TxtFieldT {
  val: string;
}

export interface CheckFieldT extends BaseFieldT {
  type: CheckInputT;
}
export interface CheckBoxFieldT extends CheckFieldT {
  val: string;
}
