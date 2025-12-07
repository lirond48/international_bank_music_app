import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicListComponent } from "./music-list/music-list.component";

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, MusicListComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}
