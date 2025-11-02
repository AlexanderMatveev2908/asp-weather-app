import { GenericObjT, Nullable } from '@/common/types/etc';
import { HttpMethod } from '../../../types';

export interface ConfApiT {
  url: Nullable<string>;
  method: HttpMethod;
  requestType: Nullable<string>;
  responseType: Nullable<string>;
  accessToken: Nullable<string>;
  params: GenericObjT;
  body: GenericObjT;
  rateLimit: {
    limit: Nullable<string>;
    window: Nullable<string>;
    remaining: Nullable<string>;
    reset: Nullable<string>;
  };
}
