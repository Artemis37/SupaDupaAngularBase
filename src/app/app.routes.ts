import { Routes } from '@angular/router';
import { authorizationGuard } from './shared/route-guards';
import { LoginComponent } from './shared/components/login/login.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authorizationGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];
