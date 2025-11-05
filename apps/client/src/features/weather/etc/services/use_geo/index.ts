import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, Subscriber, switchMap, tap } from 'rxjs';
import { GeoUserT } from '../../../reducer/reducer';
import { ErrApp } from '@/core/lib/etc/err';
import { Dict } from '@/common/types/etc';
import { GeoResT, GeoStrategyT } from './etc/types';
import { ToastSlice } from '@/features/toast/slice';
import { WeatherSlice } from '@/features/weather/slice';
import { LibLog } from '@/core/lib/dev/log';

@Injectable({
  providedIn: 'root',
})
export class UseGeoSvc {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly weatherSlice: WeatherSlice = inject(WeatherSlice);

  private getGeoChrome(): Observable<GeoResT> {
    return new Observable<GeoResT>((obs: Subscriber<GeoResT>) => {
      if (!navigator.geolocation) {
        obs.error(new ErrApp('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          LibLog.logTtl('✅ chrome geo', pos);

          obs.next({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            strategy: 'chrome',
          });
          obs.complete();
        },
        (err: unknown) => obs.error(err),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    });
  }

  private getGeoFirefox(): Observable<GeoResT> {
    // ? https://ipwhois.io/documentation
    const url = 'https://ipwho.is/';

    return from(
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      switchMap((res: Response) => res.json()),
      map((res: Dict) => {
        LibLog.logTtl('✅ ip_api geo', res);

        return {
          lon: res['longitude'] as number,
          lat: res['latitude'] as number,
          strategy: 'firefox' as GeoStrategyT,
        };
      })
    );
  }

  public saveGeoResponse(res: GeoResT): void {
    this.toastSlice.openToast({
      eventT: 'OK',
      msg: `Geolocation retrieved using ${res.strategy} strategy`,
      status: 200,
    });

    const { strategy: _, ...payload } = res;
    this.weatherSlice.setGeuUser(payload);
  }

  public main(): Observable<GeoUserT> {
    // ! firefox is a little dump for geolocation so is necessary an external service to retrieve the current user geolocation
    return this.getGeoChrome()
      .pipe(catchError((_: unknown) => this.getGeoFirefox()))
      .pipe(
        tap({
          next: (res: GeoResT) => {
            this.saveGeoResponse(res);
          },
          error: (err: Dict) => {
            LibLog.logTtl('❌ err geo', err);

            this.toastSlice.openToast({
              msg: 'geolocation not retrieved neither with internal nor external APIs ',
              status: 500,
              eventT: 'ERR',
            });
          },
        })
      );
  }
}
