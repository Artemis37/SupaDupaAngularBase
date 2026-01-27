import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signout-redirect-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Logging out...</div>`,
  styles: [`
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  `]
})
export class SignoutRedirectCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.authService.completeLogout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      this.router.navigate(['/login']);
    }
  }
}
