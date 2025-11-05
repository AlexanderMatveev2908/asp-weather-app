import { createReducer, on } from '@ngrx/store';
import { WeatherActT } from './actions';
import { BoolPayloadT, Dict, Nullable } from '@/common/types/etc';

export interface GeoUserT {
  country_code: string;
  region: string;
  lon: number;
  lat: number;
}

export interface WeatherStateT {
  geoUser: Nullable<GeoUserT>;
  geoPending: boolean;
  weather: Nullable<Dict>;
  weatherPending: boolean;
}

export const initState: WeatherStateT = {
  geoUser: null,
  geoPending: true,
  weatherPending: false,
  weather: null,
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
  })),
  on(WeatherActT.SET_WEATHER_PENDING, (state: WeatherStateT, act: BoolPayloadT) => ({
    ...state,
    weatherPending: act.v,
  })),
  on(WeatherActT.SET_WEATHER, (state: WeatherStateT, act: Dict) => ({ ...state, weather: act }))
);
