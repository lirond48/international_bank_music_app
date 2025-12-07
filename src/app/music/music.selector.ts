import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MusicState } from './music.state';

export const selectMusicState = createFeatureSelector<MusicState>('music');

export const selectDiscs = createSelector(
  selectMusicState,
  (state: MusicState) => state.discs
);

export const selectLoading = createSelector(
  selectMusicState,
  (state: MusicState) => state.loading
);

export const selectError = createSelector(
  selectMusicState,
  (state: MusicState) => state.error
);

