import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MusicComponent,
    MusicListComponent
  ],
  exports: [
    MusicComponent,
    MusicListComponent
  ]
})
export class MusicModule { }