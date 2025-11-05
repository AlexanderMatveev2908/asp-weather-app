import { createReducer, on } from '@ngrx/store';
import { WeatherActT } from './actions';
import { Nullable } from '@/common/types/etc';

export interface GeoUserT {
  lon: number;
  lat: number;
}

export interface WeatherStateT {
  geoUser: Nullable<GeoUserT>;
}

export const initState: WeatherStateT = {
  geoUser: null,
};

export const weatherReducer = createReducer(
  initState,
  on(WeatherActT.RESET__WEATHER_STATE, (_: WeatherStateT) => initState),
  on(WeatherActT.SET_GEO_USER, (state: WeatherStateT, action: GeoUserT) => ({
    ...state,
    geoUser: action,
  }))
);
