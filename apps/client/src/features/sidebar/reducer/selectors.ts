import { createFeatureSelector } from '@ngrx/store';
import { SideStateT } from './reducer';

export const getSideState = createFeatureSelector<SideStateT>('side');
