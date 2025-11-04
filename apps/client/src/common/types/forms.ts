import { WithIdT } from './etc';

export type InputTxtT = 'text' | 'email' | 'password';

export type TxtFieldT = WithIdT<{
  name: string;
  field: string;
  place: string;
  type: InputTxtT;
}>;
