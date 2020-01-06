import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { DaffContactState } from '../reducers/contact.reducer';

export interface DaffContactReducerState {
  contact: DaffContactState
}

const selectContactFeatureState:
  MemoizedSelector<DaffContactReducerState, DaffContactState> = createFeatureSelector<DaffContactState>('contact');

export const selectDaffContactLoading = createSelector(
  selectContactFeatureState, (state: DaffContactState) => state.loading
);

export const selectDaffContactSuccess = createSelector(
  selectContactFeatureState, (state: DaffContactState) => state.success
);

export const selectDaffContactError = createSelector(
  selectContactFeatureState, (state: DaffContactState) => state.errors
);