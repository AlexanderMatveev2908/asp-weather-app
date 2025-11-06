import { computed, Injectable, Signal } from '@angular/core';
import { WeatherStateT } from './reducer/reducer';
import { getWeatherState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Nullable } from '@/common/types/etc';
import { WeatherActT } from './reducer/actions';
import { GeoResT, WeatherResT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class WeatherSlice extends UseKitSliceSvc {
  public get weatherState(): Signal<WeatherStateT> {
    return this.store.selectSignal(getWeatherState);
  }

  public readonly geoPending: Signal<boolean> = computed(() => this.weatherState().geoPending);
  public setGeoPending(v: boolean): void {
    this.store.dispatch(WeatherActT.SET_GEO_PENDING({ v }));
  }

  public weatherPending: Signal<boolean> = computed(() => this.weatherState().weatherPending);
  public setWeatherPending(v: boolean): void {
    this.store.dispatch(WeatherActT.SET_WEATHER_PENDING({ v }));
  }

  public weather: Signal<Nullable<WeatherResT>> = computed(() => this.weatherState().weather);
  public setWeather(data: WeatherResT): void {
    this.store.dispatch(WeatherActT.SET_WEATHER(data));
  }

  public setGeuUser(geoUser: GeoResT): void {
    this.store.dispatch(WeatherActT.SET_GEO_USER(geoUser));
  }
  public geoUser: Signal<Nullable<GeoResT>> = computed(() => this.weatherState().geoUser);
}
