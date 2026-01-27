import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="unauthorized-container">
      <h1>{{ 'auth.unauthorized' | translate }}</h1>
      <p>{{ 'auth.unauthorizedMessage' | translate }}</p>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
  `]
})
export class UnauthorizedComponent {}
