import { createFeatureSelector } from '@ngrx/store';
import { CbcHmacStateT } from './reducer';

export const getCbcHmacState = createFeatureSelector<CbcHmacStateT>('cbcHmac');
