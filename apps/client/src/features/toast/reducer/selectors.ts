import { createFeatureSelector } from '@ngrx/store';
import { ToastStateT } from './reducer';

export const getToastState = createFeatureSelector<ToastStateT>('toast');
