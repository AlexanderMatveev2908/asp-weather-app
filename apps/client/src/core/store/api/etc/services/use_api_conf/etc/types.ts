import { Dict, Nullable } from '@/common/types/etc';
import { HttpMethod } from '../../../types';

export interface ConfApiT {
  url: Nullable<string>;
  method: HttpMethod;
  requestType: Nullable<string>;
  responseType: Nullable<string>;
  accessToken: Nullable<string>;
  params: Nullable<Dict>;
  body: Nullable<Dict>;
  rateLimit: {
    limit: Nullable<string>;
    window: Nullable<string>;
    remaining: Nullable<string>;
    reset: Nullable<string>;
  };
}
