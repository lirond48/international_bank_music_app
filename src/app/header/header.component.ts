import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UserService, UserData } from '../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userData: UserData | null = null;
  currentRoute: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.updateCurrentRoute();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUserData();
        this.updateCurrentRoute();
      });
  }

  private loadUserData(): void {
    this.userData = this.userService.getUserData();
  }

  private updateCurrentRoute(): void {
    const url = this.router.url;
    
    if (url.startsWith('/music/') && url !== '/music') {
      // Extract ID from route like /music/123
      const id = url.split('/music/')[1];
      this.currentRoute = `Music Details (ID: ${id})`;
    } else if (url === '/music') {
      this.currentRoute = 'Music Library';
    } else if (url === '/register') {
      this.currentRoute = 'User Registration';
    } else {
      this.currentRoute = 'Home';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToMusic(): void {
    this.router.navigate(['/music']);
  }
}

