import { Nullable } from '@/common/types/etc';
import { createReducer, on } from '@ngrx/store';
import { ApplicationT } from '../etc/types';
import { ApplicationsActT } from './actions';

export interface ApplicationsStateT {
  applications: Nullable<ApplicationT[]>;
  nHits: number;
  pages: number;
  keyRefresh: number;
}

export const initState: ApplicationsStateT = {
  applications: null,
  nHits: 0,
  pages: 0,
  keyRefresh: 0,
};

export const applicationsReducer = createReducer(
  initState,
  on(
    ApplicationsActT.SAVE_APPLICATIONS_DATA,
    (state: ApplicationsStateT, action: Omit<ApplicationsStateT, 'keyRefresh'>) => ({
      ...state,
      applications: action.applications,
      nHits: action.nHits,
      pages: action.pages,
    })
  ),
  on(ApplicationsActT.TRIGGER_KEY_REFRESH, (state: ApplicationsStateT) => ({
    ...state,
    keyRefresh: state.keyRefresh + 1,
  })),
  on(ApplicationsActT.RESET__APPLICATIONS_STATE, (_: ApplicationsStateT) => initState)
);
