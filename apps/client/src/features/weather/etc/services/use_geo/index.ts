import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { Dict } from '@/common/types/etc';
import { GeoResT } from './etc/types';
import { LibLog } from '@/core/lib/dev/log';

@Injectable({
  providedIn: 'root',
})
export class UseGeoSvc {
  // private _getGeoChrome(): Observable<GeoResT> {
  //   return new Observable<GeoResT>((obs: Subscriber<GeoResT>) => {
  //     if (!navigator.geolocation) {
  //       obs.error(new ErrApp('Geolocation not supported'));
  //       return;
  //     }

  //     navigator.geolocation.getCurrentPosition(
  //       (pos: GeolocationPosition) => {
  //         LibLog.logTtl('✅ chrome geo', pos);

  //         obs.next({
  //           lat: pos.coords.latitude,
  //           lon: pos.coords.longitude,
  //           strategy: 'chrome',
  //         });
  //         obs.complete();
  //       },
  //       (err: unknown) => obs.error(err),
  //       {
  //         enableHighAccuracy: true,
  //         maximumAge: 0,
  //       }
  //     );
  //   });
  // }

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
          lon: res['longitude'],
          lat: res['latitude'],
          country_code: res['country_code'],
          region: res['region'],
          strategy: 'firefox',
        } as GeoResT;
      })
    );
  }

  public main(): Observable<GeoResT> {
    // ! firefox is a little dump for geolocation so is necessary an external service to retrieve the current user geolocation
    return this.getGeoFirefox();
  }
}
