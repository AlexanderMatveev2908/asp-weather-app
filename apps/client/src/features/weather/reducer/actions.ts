import { createAction, props } from '@ngrx/store';
import { BoolPayloadT } from '@/common/types/etc';
import { GeoResT, WeatherResT } from '../etc/types';

export const WeatherActT = {
  RESET__WEATHER_STATE: createAction('RESET__WEATHER_STATE'),
  SET_GEO_USER: createAction('SET_GEO_USER', props<GeoResT>()),
  SET_GEO_PENDING: createAction('SET_GEO_PENDING', props<BoolPayloadT>()),
  SET_WEATHER_PENDING: createAction('SET_WEATHER_PENDING', props<BoolPayloadT>()),
  SET_WEATHER: createAction('SET_WEATHER', props<WeatherResT>()),
};
