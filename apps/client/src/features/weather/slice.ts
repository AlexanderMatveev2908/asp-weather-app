import { computed, Injectable, Signal } from '@angular/core';
import { GeoResT, WeatherStateT } from './reducer/reducer';
import { getWeatherState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Dict, Nullable } from '@/common/types/etc';
import { WeatherActT } from './reducer/actions';

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

  public weather: Signal<Nullable<Dict>> = computed(() => this.weatherState().weather);

  public setWeather(data: Dict): void {
    this.store.dispatch(WeatherActT.SET_WEATHER(data));
  }

  public setGeuUser(geoUser: GeoResT): void {
    this.store.dispatch(WeatherActT.SET_GEO_USER(geoUser));
  }
  public geoUser: Signal<Nullable<GeoResT>> = computed(() => this.weatherState().geoUser);
}
