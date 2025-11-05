import { inject, Injectable } from '@angular/core';
import { UseWeatherKitSvc } from '../../hooks/use_weather_kit';
import { ToastSlice } from '@/features/toast/slice';
import { GeoResT } from '../use_geo/etc/types';
import { finalize, tap } from 'rxjs';
import { LibLog } from '@/core/lib/dev/log';
import { Dict } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class UseGeoMngSvc {
  private readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);

  private saveGeoResponse(res: GeoResT): void {
    this.toastSlice.openToast({
      eventT: 'OK',
      msg: `Geolocation retrieved using ${res.strategy} strategy`,
      status: 200,
    });

    const { strategy: _, ...payload } = res;
    this.useWeatherKit.weatherSlice.setGeuUser(payload);
  }

  public main(): void {
    void this.useWeatherKit.weatherApi
      .getUserGeo()
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
        }),
        finalize(() => this.useWeatherKit.weatherSlice.setGeoPending(false))
      )
      .subscribe();
  }
}
