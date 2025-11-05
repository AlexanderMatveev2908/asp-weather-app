import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseWeatherKitSvc } from '@/features/weather/etc/hooks/use_weather_kit';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtxHk implements OnInit {
  private readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);

  ngOnInit(): void {
    void this.useWeatherKit.weatherApi.getUserGeo().subscribe();
  }
}
