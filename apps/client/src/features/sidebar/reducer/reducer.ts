import { createReducer, on } from '@ngrx/store';
import { SidebarActT } from './actions';

export const initState = {
  isOpen: false,
};

export type SideStateT = typeof initState;

export const sideReducer = createReducer(
  initState,
  on(SidebarActT.TOGGLE, (state: SideStateT) => ({ ...state, isOpen: !state.isOpen })),
  on(SidebarActT.CLOSE, (state: SideStateT) => ({ ...state, isOpen: false }))
);
