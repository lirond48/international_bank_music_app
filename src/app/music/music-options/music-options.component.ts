import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disc } from '../../interface/disc.interface';

@Component({
  selector: 'music-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './music-options.component.html',
  styleUrl: './music-options.component.scss'
})
export class MusicOptionsComponent implements OnInit {
  searchForm!: FormGroup;

  @Output() onSubmit = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  onSearch(event: Event): void {
    // event.preventDefault();
    const searchTerm = this.searchForm.get('searchTerm')?.value as string;
    
    if (searchTerm.length > 3) {
      this.onSubmit.emit(searchTerm);
      console.log('Search term:', searchTerm);
    }
  }
}

