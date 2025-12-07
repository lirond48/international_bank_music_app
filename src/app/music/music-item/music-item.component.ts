import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Disc } from '../../interface/disc.interface';

@Component({
  selector: 'music-item',
  standalone: false,
  templateUrl: './music-item.component.html',
  styleUrl: './music-item.component.scss'
})
export class MusicItemComponent implements OnInit {
  @Input() disc!: Disc;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onItemClick(): void {
    if(this.disc.id) {
      this.router.navigate(['/music', this.disc.id]);
    }
  }

}

