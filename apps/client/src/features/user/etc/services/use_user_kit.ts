import { inject, Injectable } from '@angular/core';
import { UserSlice } from '../../slice';
import { UserApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseUserKitSvc {
  public readonly userSlice: UserSlice = inject(UserSlice);
  public readonly userApi: UserApiSvc = inject(UserApiSvc);
}
