import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoUserT } from './reducer/reducer';
import { UseGeoSvc } from './etc/services/use_geo';
import { ObsResT } from '@/core/store/api/etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiSvc {
  private readonly base: string = '/weather';

  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly useGeo: UseGeoSvc = inject(UseGeoSvc);

  public getGeoUser(): Observable<GeoUserT> {
    return this.useGeo.main();
  }

  public getGeoUserSpring(): ObsResT<GeoUserT> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/ip`).toastOnFulfilled());
  }
}
