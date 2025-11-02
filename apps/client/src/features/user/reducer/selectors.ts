import { createFeatureSelector } from '@ngrx/store';
import { UserStateT } from './reducer';

export const getUserState = createFeatureSelector<UserStateT>('user');
