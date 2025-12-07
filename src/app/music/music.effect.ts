// src/app/music/music.effect.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MusicService } from '../service/music.service';
import { loadMusic, loadMusicFailure, loadMusicSuccess } from './music.action';

@Injectable()
export class MusicEffects {
  loadMusic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMusic),
      switchMap(({ searchTerm = 'music' }) =>
        this.musicService.searchDiscs(searchTerm).pipe(
          map(discs => loadMusicSuccess({ discs })),
          catchError(error =>
            of(
              loadMusicFailure({
                error: error.message || 'Failed to load discs',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private musicService: MusicService
  ) {}
}
