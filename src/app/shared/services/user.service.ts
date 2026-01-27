import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService) {}

  async hasRole(role: Roles): Promise<boolean> {
    const roles = await this.authService.getUserRoles();
    return roles.includes(role);
  }

  async hasAnyRole(roles: Roles[]): Promise<boolean> {
    const userRoles = await this.authService.getUserRoles();
    return roles.some(role => userRoles.includes(role));
  }

  async getUserName(): Promise<string | null> {
    return this.authService.getUserName();
  }

  async getUserId(): Promise<string | null> {
    return this.authService.getUserId();
  }
}
