import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseWeatherKitSvc } from '@/features/weather/etc/hooks/use_weather_kit';
import { switchMap, tap } from 'rxjs';
import { GeoResT } from '@/features/weather/etc/services/use_geo/etc/types';
import { ResApiT } from '@/core/store/api/etc/types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtxHk implements OnInit {
  private readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);

  ngOnInit(): void {
    void this.useWeatherKit.weatherApi
      .getUserGeo()
      .pipe(
        switchMap((res: GeoResT) =>
          this.useWeatherKit.weatherApi.getWeatherByCoords(res).pipe(
            tap((res: ResApiT<unknown>) => {
              void res;
            })
          )
        )
      )
      .subscribe();
  }
}
