import { inject, Injectable } from '@angular/core';
import { AuthSlice } from '../../slice';
import { AuthApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseAuthKitSvc {
  public readonly authSlice: AuthSlice = inject(AuthSlice);
  public readonly authApi: AuthApiSvc = inject(AuthApiSvc);
}
