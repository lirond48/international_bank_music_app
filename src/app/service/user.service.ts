import { Injectable } from '@angular/core';

export interface UserData {
  email: string;
  username: string;
}

export interface SearchHistoryItem {
  searchTerm: string;
  entityType: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly STORAGE_KEY = 'userData';
  private readonly SEARCH_HISTORY_KEY = 'searchHistory';
  private readonly MAX_SEARCH_HISTORY = 5;

  saveUserData(userData: UserData): void {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data to session storage:', error);
    }
  }

  getUserData(): UserData | null {
    try {
      const data = sessionStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading user data from session storage:', error);
      return null;
    }
  }

  saveSearchHistory(searchTerm: string, entityType: string): void {
    try {
      const history = this.getSearchHistory();
      
      // Remove duplicate if exists (same searchTerm and entityType)
      const filteredHistory = history.filter(
        item => !(item.searchTerm === searchTerm && item.entityType === entityType)
      );
      
      // Add new search at the beginning
      const newItem: SearchHistoryItem = {
        searchTerm,
        entityType,
        timestamp: Date.now()
      };
      
      const updatedHistory = [newItem, ...filteredHistory].slice(0, this.MAX_SEARCH_HISTORY);
      
      sessionStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving search history to session storage:', error);
    }
  }

  getSearchHistory(): SearchHistoryItem[] {
    try {
      const data = sessionStorage.getItem(this.SEARCH_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading search history from session storage:', error);
      return [];
    }
  }
}

