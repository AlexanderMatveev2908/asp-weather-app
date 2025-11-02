import { inject, Injectable } from '@angular/core';
import { ApplicationsSlice } from '../../slice';
import { ApplicationsApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseApplicationsKitSvc {
  public readonly applicationsSlice: ApplicationsSlice = inject(ApplicationsSlice);
  public readonly applicationsApi: ApplicationsApiSvc = inject(ApplicationsApiSvc);
}
