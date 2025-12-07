import { createAction, props } from '@ngrx/store';
import { Disc } from '../interface/disc.interface';

export const loadMusic = createAction(
  '[Music] Load Music',
  props<{ searchTerm?: string }>()
);

export const loadMusicSuccess = createAction(
  '[Music] Load Music Success',
  props<{ discs: Disc[] }>()
);

export const loadMusicFailure = createAction(
  '[Music] Load Music Failure',
  props<{ error: string }>()
);

