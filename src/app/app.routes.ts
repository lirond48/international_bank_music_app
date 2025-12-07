import { Routes } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { MusicDetailsComponent } from './music/music-details/music-details.component';
import { RegistrationComponent } from './auth/registration/registration.component';

export const routes: Routes = [
  {
    path: 'music',
    component: MusicComponent
  },
  {
    path: 'music/:id',
    component: MusicDetailsComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: '',
    redirectTo: '/music',
    pathMatch: 'full'
  }
];
