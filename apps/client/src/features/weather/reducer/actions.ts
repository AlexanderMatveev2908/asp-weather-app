import { createAction, props } from '@ngrx/store';
import { GeoUserT } from './reducer';

export const WeatherActT = {
  RESET__WEATHER_STATE: createAction('RESET__WEATHER_STATE'),
  SET_GEO_USER: createAction('SET_GEO_USER', props<GeoUserT>()),
};
