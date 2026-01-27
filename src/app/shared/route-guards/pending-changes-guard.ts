import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate) => {
  if (component && typeof component.canDeactivate === 'function') {
    return component.canDeactivate();
  }
  return true;
};
