import { createReducer, on } from '@ngrx/store';
import { Disc } from '../interface/disc.interface';
import * as MusicActions from './music.action';

export interface MusicState {
  discs: Disc[];
  loading: boolean;
  error: string | null;
}

export const initialState: MusicState = {
  discs: [],
  loading: false,
  error: null
};

export const musicReducer = createReducer(initialState,
  on(MusicActions.loadMusic, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MusicActions.loadMusicSuccess, (state, { discs }) => ({
    ...state,
    discs,
    loading: false,
    error: null
  })),
  on(MusicActions.loadMusicFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

