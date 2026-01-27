import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <button (click)="login()" class="login-button">Sign In</button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .login-button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  async login(): Promise<void> {
    await this.authService.login();
  }
}
