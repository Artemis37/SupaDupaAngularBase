import { createReducer, on } from '@ngrx/store';
import { AppState, initialState } from './app.state';
import * as AppActions from './app.actions';

export const appReducer = createReducer(
  initialState,
  // Add your reducers here
  // Example:
  // on(AppActions.someAction, (state, action) => ({
  //   ...state,
  //   // update state
  // }))
);
