import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { LicenseService } from '../services/license.service';

export const licenseGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const licenseService = inject(LicenseService);

  const requiredLicense = route.data['license'] as string;
  if (requiredLicense && !licenseService.hasLicense(requiredLicense)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
