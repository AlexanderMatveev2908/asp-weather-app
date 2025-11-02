import { createFeatureSelector } from '@ngrx/store';
import { AuthStateT } from './reducer';

export const getAuthState = createFeatureSelector<AuthStateT>('auth');
