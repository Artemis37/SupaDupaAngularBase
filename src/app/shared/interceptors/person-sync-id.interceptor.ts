import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';

export const personSyncIdInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const userService = inject(UserService);
  const personSyncId = userService.getPersonSyncId();

  if (personSyncId) {
    const cloned = req.clone({
      setHeaders: {
        'personSyncId': personSyncId
      }
    });
    return next(cloned);
  }

  return next(req);
};
