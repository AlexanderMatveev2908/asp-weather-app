import { inject, Injectable } from '@angular/core';
import { WeatherSlice } from '../../slice';
import { WeatherApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseWeatherKitSvc {
  public readonly weatherSlice: WeatherSlice = inject(WeatherSlice);
  public readonly weatherApi: WeatherApiSvc = inject(WeatherApiSvc);
}
