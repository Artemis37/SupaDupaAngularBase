import { Routes } from '@angular/router';
import { authorizationGuard, licenseGuard } from './shared/route-guards';
import { LoginComponent } from './shared/components/login/login.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { SigninRedirectCallbackComponent } from './shared/components/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './shared/components/signout-redirect-callback/signout-redirect-callback.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
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
    path: 'signin-callback',
    component: SigninRedirectCallbackComponent
  },
  {
    path: 'signout-callback',
    component: SignoutRedirectCallbackComponent
  },
  // Example protected route:
  // {
  //   path: 'quotation',
  //   canActivate: [authorizationGuard, licenseGuard],
  //   loadChildren: () => import('./quotation/quotation.module').then(m => m.QuotationModule),
  //   data: {
  //     license: 'quotation_license',
  //     roles: ['Sales', 'Administrator']
  //   }
  // }
];
