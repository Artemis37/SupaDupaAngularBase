import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="home-container">
      <h1>{{ 'common.welcome' | translate }}</h1>
      <p>{{ 'common.loading' | translate }}</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
      text-align: center;
    }
  `]
})
export class HomeComponent {}
