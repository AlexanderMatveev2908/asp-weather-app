import { createAction, props } from '@ngrx/store';
import { GeoUserT } from './reducer';
import { BoolPayloadT } from '@/common/types/etc';

export const WeatherActT = {
  RESET__WEATHER_STATE: createAction('RESET__WEATHER_STATE'),
  SET_GEO_USER: createAction('SET_GEO_USER', props<GeoUserT>()),
  SET_GEO_PENDING: createAction('SET_GEO_PENDING', props<BoolPayloadT>()),
};
