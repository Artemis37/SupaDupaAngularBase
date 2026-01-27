import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Roles } from '../models/roles';

export const authorizationGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const isAuthenticated = await authService.isAuthenticated();
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'] as Roles[];
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = await userService.hasAnyRole(requiredRoles);
    if (!hasRole) {
      router.navigate(['/unauthorized']);
      return false;
    }
  }

  return true;
};
