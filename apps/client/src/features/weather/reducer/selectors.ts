import { createFeatureSelector } from '@ngrx/store';
import { WeatherStateT } from './reducer';

export const getWeatherState = createFeatureSelector<WeatherStateT>('weather');
