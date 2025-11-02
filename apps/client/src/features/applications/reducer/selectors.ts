import { createFeatureSelector } from '@ngrx/store';
import { ApplicationsStateT } from './reducer';

export const getApplicationsState = createFeatureSelector<ApplicationsStateT>('applications');
