import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin-redirect-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Processing login...</div>`,
  styles: [`
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  `]
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.authService.completeAuthentication();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Authentication error:', error);
      this.router.navigate(['/login']);
    }
  }
}
