import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly PERSON_SYNC_ID_KEY = 'person_sync_id';
  private readonly platformId = inject(PLATFORM_ID);

  getPersonSyncId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.PERSON_SYNC_ID_KEY);
    }
    return null;
  }

  setPersonSyncId(id: string | null): void {
    if (isPlatformBrowser(this.platformId)) {
      if (id) {
        localStorage.setItem(this.PERSON_SYNC_ID_KEY, id);
      } else {
        localStorage.removeItem(this.PERSON_SYNC_ID_KEY);
      }
    }
  }
}
