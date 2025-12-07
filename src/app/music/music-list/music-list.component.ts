import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../service/music.service';
import { Disc } from '../../interface/disc.interface';
import { Store } from '@ngrx/store';
import { MusicItemComponent } from "../music-item/music-item.component";
import { MusicOptionsComponent } from "../music-options/music-options.component";

@Component({
  selector: 'music-list',
  standalone: true,
  imports: [CommonModule, MusicItemComponent, MusicOptionsComponent],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.scss'
})
export class MusicListComponent implements OnInit {
  discs = signal<Disc[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchTerm = '';

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadDiscs();
  }

  loadDiscs(searchTerm: string = 'music'): void {
    this.loading.set(true);
    this.error.set(null);

    this.musicService.searchDiscs(searchTerm).subscribe({
      next: (discs) => {
        this.discs.set(discs);
        console.log(discs);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load discs. Please try again.');
        this.loading.set(false);
        console.error('Error loading discs:', err);
      }
    });
  }

  onSearch(event: string): void {
    console.log(event);
    const term = this.searchTerm.trim() || 'music';
    this.loadDiscs(event);
  }
}

