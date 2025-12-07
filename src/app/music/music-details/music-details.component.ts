import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Disc } from '../../interface/disc.interface';
import { MusicService } from '../../service/music.service';

@Component({
  selector: 'music-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './music-details.component.html',
  styleUrl: './music-details.component.scss'
})
export class MusicDetailsComponent implements OnInit {
  disc$!: Observable<Disc | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    this.disc$ = this.route.params.pipe(
      switchMap(params => {
        const discId = +params['id'];
        return this.musicService.getDiscById(discId);
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/music']);
  }
}

