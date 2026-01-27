import { Injectable } from '@angular/core';
import { LICENSES } from '../models/licenses';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private availableLicenses: Set<string> = new Set();

  constructor() {
    // In a real application, this would be loaded from the backend
    // For now, we'll initialize with some default licenses
    this.availableLicenses.add(LICENSES.quotationLicense);
    this.availableLicenses.add(LICENSES.configurationLicense);
  }

  hasLicense(license: string): boolean {
    return this.availableLicenses.has(license);
  }

  setLicenses(licenses: string[]): void {
    this.availableLicenses = new Set(licenses);
  }
}
