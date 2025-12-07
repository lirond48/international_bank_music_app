// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { musicReducer } from './app/music/music.state';
import { MusicEffects } from './app/music/music.effect';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),

    provideStore({ music: musicReducer }),
    provideEffects([MusicEffects]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
}).catch(err => console.error(err));
