import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { GeoUserT } from './reducer/reducer';
import { UseGeoSvc } from './etc/services/use_geo';
import { ErrApiT, ObsResT, ResApiT } from '@/core/store/api/etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { GeoResT } from './etc/services/use_geo/etc/types';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiSvc extends UseGeoSvc {
  private readonly base: string = '/weather';

  private readonly api: UseApiSvc = inject(UseApiSvc);

  private getGeoUserSpring(): ObsResT<GeoResT> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/ip`).noToast());
  }

  public getUserGeo(): Observable<GeoUserT> {
    // | weather/ip simply call same external API which firefox strategy already use
    // | but the personal endpoint has redis cache and rate limit 🚦

    return this.getGeoUserSpring().pipe(
      tap((res: ResApiT<GeoResT>) => this.saveGeoResponse(res)),
      catchError((_: ErrApiT<void>) => this.getGeoExternalStrategies()),
      finalize(() => this.weatherSlice.setGeoPending(false))
    );
  }
}
