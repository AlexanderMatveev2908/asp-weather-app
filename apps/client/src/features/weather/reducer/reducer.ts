import { createReducer, on } from '@ngrx/store';
import { WeatherActT } from './actions';
import { BoolPayloadT, Nullable } from '@/common/types/etc';

export interface GeoUserT {
  lon: number;
  lat: number;
}

export interface WeatherStateT {
  geoUser: Nullable<GeoUserT>;
  geoPending: boolean;
}

export const initState: WeatherStateT = {
  geoUser: null,
  geoPending: true,
};

export const weatherReducer = createReducer(
  initState,
  on(WeatherActT.RESET__WEATHER_STATE, (_: WeatherStateT) => initState),
  on(WeatherActT.SET_GEO_USER, (state: WeatherStateT, action: GeoUserT) => ({
    ...state,
    geoUser: action,
  })),
  on(WeatherActT.SET_GEO_PENDING, (state: WeatherStateT, act: BoolPayloadT) => ({
    ...state,
    geoPending: act.v,
  }))
);
