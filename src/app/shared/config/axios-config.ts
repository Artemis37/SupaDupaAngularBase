import axios from 'axios';
import { isPlatformBrowser } from '@angular/common';
import type { AuthService } from '../services/auth.service';
import type { UserService } from '../services/user.service';
import type { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export function configureAxios(
  authService: AuthService,
  userService: UserService,
  router: Router,
  platformId: object
): void {
  axios.defaults.baseURL = environment.CORE_BASEURL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';

  axios.interceptors.request.use((config) => {
    if (isPlatformBrowser(platformId)) {
      const token = authService.getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      const personSyncId = userService.getPersonSyncId();
      if (personSyncId) config.headers['personSyncId'] = personSyncId;
    }
    return config;
  });

  axios.interceptors.response.use(
    (r) => r,
    (err) => {
      if (err.response?.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return Promise.reject(Object.assign(err, { error: err.response?.data ?? err.message }));
    }
  );
}
