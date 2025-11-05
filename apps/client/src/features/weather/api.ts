import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoUserT } from './reducer/reducer';
import { UseGeoSvc } from './etc/services/use_geo';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly useGeo: UseGeoSvc = inject(UseGeoSvc);

  public getGeoUser(): Observable<GeoUserT> {
    return this.useGeo.main();
  }
}
