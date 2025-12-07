import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { MusicComponent } from './music.component';
import { MusicItemComponent } from './music-item/music-item.component';
import { MusicDetailsComponent } from './music-details/music-details.component';
import { MusicOptionsComponent } from './music-options/music-options.component';

@NgModule({
  declarations: [
    MusicListComponent,
    RegistrationComponent,
    MusicComponent,
    MusicItemComponent,
    MusicDetailsComponent,
    MusicOptionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  exports: [
    MusicListComponent,
    RegistrationComponent,
    MusicComponent,
    MusicItemComponent,
    MusicDetailsComponent,
    MusicOptionsComponent
  ]
})
export class MusicModule {}
