import { createAction, props } from '@ngrx/store';
import { GeoResT } from './reducer';
import { BoolPayloadT, Dict } from '@/common/types/etc';

export const WeatherActT = {
  RESET__WEATHER_STATE: createAction('RESET__WEATHER_STATE'),
  SET_GEO_USER: createAction('SET_GEO_USER', props<GeoResT>()),
  SET_GEO_PENDING: createAction('SET_GEO_PENDING', props<BoolPayloadT>()),
  SET_WEATHER_PENDING: createAction('SET_WEATHER_PENDING', props<BoolPayloadT>()),
  SET_WEATHER: createAction('SET_WEATHER', props<Dict>()),
};
