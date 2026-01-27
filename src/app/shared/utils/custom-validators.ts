import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { email: true };
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length >= min) {
        return null;
      }
      return { minLength: { requiredLength: min, actualLength: control.value.length } };
    };
  }

  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length <= max) {
        return null;
      }
      return { maxLength: { requiredLength: max, actualLength: control.value.length } };
    };
  }

  static positiveNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const num = Number(control.value);
    return !isNaN(num) && num > 0 ? null : { positiveNumber: true };
  }
}
