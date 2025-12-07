import { Injectable } from '@angular/core';

export interface UserData {
  email: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly STORAGE_KEY = 'userData';

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
}

