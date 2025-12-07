import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserService, SearchHistoryItem } from '../../service/user.service';

export type EntityType = 'album' | 'song' | 'musicArtist';

export interface SearchData {
  searchTerm: string;
  entityType: EntityType;
}

@Component({
  selector: 'music-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './music-options.component.html',
  styleUrl: './music-options.component.scss'
})
export class MusicOptionsComponent implements OnInit {
  searchForm!: FormGroup;
  searchHistory: SearchHistoryItem[] = [];
  entityTypes: { value: EntityType; label: string }[] = [
    { value: 'album', label: 'Album' },
    { value: 'song', label: 'Song' },
    { value: 'musicArtist', label: 'Music Artist' }
  ];

  @Output() onSubmit = new EventEmitter<SearchData>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      entityType: ['album']
    });
    
    this.loadSearchHistory();
  }

  loadSearchHistory(): void {
    this.searchHistory = this.userService.getSearchHistory();
  }

  onSearch(event: Event): void {
    event.preventDefault();
    const searchTerm = this.searchForm.get('searchTerm')?.value as string;
    const entityType = this.searchForm.get('entityType')?.value as EntityType;
    
    if (searchTerm.trim()) {
      this.userService.saveSearchHistory(searchTerm, entityType);
      this.loadSearchHistory();
      
      this.onSubmit.emit({
        searchTerm,
        entityType
      });
    }
  }

  onHistoryItemClick(historyItem: SearchHistoryItem): void {
    this.searchForm.patchValue({
      searchTerm: historyItem.searchTerm,
      entityType: historyItem.entityType
    });
    
    this.onSubmit.emit({
      searchTerm: historyItem.searchTerm,
      entityType: historyItem.entityType as EntityType
    });
  }

  getEntityTypeLabel(entityType: string): string {
    const type = this.entityTypes.find(t => t.value === entityType);
    return type ? type.label : entityType;
  }
}

