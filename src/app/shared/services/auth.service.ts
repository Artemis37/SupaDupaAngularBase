import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, User } from 'oidc-client-ts';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub?: string;
  name?: string;
  email?: string;
  role?: string | string[];
  exp?: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  private currentUser: User | null = null;

  constructor(private router: Router) {
    this.userManager = new UserManager({
      authority: environment.AUTHORITY,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}signin-callback`,
      post_logout_redirect_uri: `${environment.clientRoot}signout-callback`,
      response_type: 'code',
      scope: 'openid profile email',
      automaticSilentRenew: true,
      silent_redirect_uri: `${environment.clientRoot}silent-callback.html`
    });

    this.userManager.getUser().then(user => {
      this.currentUser = user;
    });
  }

  async login(): Promise<void> {
    await this.userManager.signinRedirect();
  }

  async logout(): Promise<void> {
    await this.userManager.signoutRedirect();
  }

  async getUser(): Promise<User | null> {
    if (!this.currentUser) {
      this.currentUser = await this.userManager.getUser();
    }
    return this.currentUser;
  }

  async getAccessToken(): Promise<string | null> {
    const user = await this.getUser();
    return user?.access_token || null;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return user !== null && !user.expired;
  }

  async getDecodedToken(): Promise<DecodedToken | null> {
    const token = await this.getAccessToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  async getUserRoles(): Promise<string[]> {
    const decoded = await this.getDecodedToken();
    if (!decoded) {
      return [];
    }
    if (Array.isArray(decoded.role)) {
      return decoded.role;
    }
    return decoded.role ? [decoded.role] : [];
  }

  async getUserName(): Promise<string | null> {
    const decoded = await this.getDecodedToken();
    return decoded?.name || null;
  }

  async getUserId(): Promise<string | null> {
    const decoded = await this.getDecodedToken();
    return decoded?.sub || null;
  }

  async completeAuthentication(): Promise<void> {
    try {
      this.currentUser = await this.userManager.signinRedirectCallback();
    } catch (error) {
      console.error('Error completing authentication:', error);
      throw error;
    }
  }

  async completeLogout(): Promise<void> {
    try {
      await this.userManager.signoutRedirectCallback();
      this.currentUser = null;
    } catch (error) {
      console.error('Error completing logout:', error);
      throw error;
    }
  }
}
