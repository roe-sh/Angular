import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  // Import AuthService
import { Router } from '@angular/router';  // Import Router for redirection

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(public authService: AuthService, private router: Router) { }

  // Log out the user and navigate to the login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login after logging out
  }
}
