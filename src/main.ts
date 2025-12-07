import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app/app.routes';
import { MusicEffects } from './app/music/music.effect';
import { MusicModule } from './app/music/music.module';
import { musicReducer } from './app/music/music.reducer';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(MusicModule)
  ]
});
