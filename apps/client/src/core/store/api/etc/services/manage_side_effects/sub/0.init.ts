import { inject, Injectable } from '@angular/core';
import { UseApiConfSvc } from '../../use_api_conf';

@Injectable()
export abstract class _UseSideEffectsMngInitHk {
  protected readonly confApi: UseApiConfSvc = inject(UseApiConfSvc);
  protected readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';
}
