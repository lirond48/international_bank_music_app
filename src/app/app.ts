import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusicComponent } from "./music/music.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MusicComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('music-app');
}
