import { computed, Injectable, Signal } from '@angular/core';
import { GeoUserT, WeatherStateT } from './reducer/reducer';
import { getWeatherState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Nullable } from '@/common/types/etc';
import { WeatherActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class WeatherSlice extends UseKitSliceSvc {
  public get weatherState(): Signal<WeatherStateT> {
    return this.store.selectSignal(getWeatherState);
  }

  public setGeuUser(geoUser: GeoUserT): void {
    this.store.dispatch(WeatherActT.SET_GEO_USER(geoUser));
  }
  public geoUser: Signal<Nullable<GeoUserT>> = computed(() => this.weatherState().geoUser);
}
