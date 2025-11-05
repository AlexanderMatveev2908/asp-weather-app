import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UseGeoSvc } from './etc/services/use_geo';
import { ErrApiT, ObsResT } from '@/core/store/api/etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { GeoResT } from './etc/services/use_geo/etc/types';
import { GeoUserT } from './reducer/reducer';
import { FormWeatherT } from './forms/search_weather/etc/paperwork/form_mng';
import { Dict } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiSvc {
  private readonly base: string = '/weather';

  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly useGeoSvc: UseGeoSvc = inject(UseGeoSvc);

  private getGeoUserSpring(): ObsResT<GeoResT> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/ip`).noToast());
  }

  public getUserGeo(): Observable<GeoResT> {
    // | weather/ip simply call same external API which firefox strategy already use
    // | but the personal endpoint has redis cache and rate limit 🚦
    return this.getGeoUserSpring().pipe(catchError((_: ErrApiT<void>) => this.useGeoSvc.main()));
  }

  public getWeatherByCoords(coords: GeoUserT): ObsResT<Dict> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/coords`).query(coords).toastOnErr());
  }

  public getWeatherByCity(arg: FormWeatherT): ObsResT<Dict> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/city`).query(arg).toastOnErr());
  }
}
