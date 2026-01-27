import { HttpInterceptorFn } from '@angular/common/http';

export const requestHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return next(cloned);
};
