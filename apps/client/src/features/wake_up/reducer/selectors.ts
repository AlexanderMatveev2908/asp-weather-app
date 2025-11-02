import { createFeatureSelector } from '@ngrx/store';
import { WakeUpStateT } from './reducer';

export const getWakeUpState = createFeatureSelector<WakeUpStateT>('wakeUp');
