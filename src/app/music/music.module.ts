import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicItemComponent } from './music-item/music-item.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MusicComponent,
    MusicListComponent,
    MusicItemComponent
  ],
  exports: [
    MusicComponent,
    MusicListComponent,
    MusicItemComponent
  ]
})
export class MusicModule { }