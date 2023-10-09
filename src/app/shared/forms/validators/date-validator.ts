import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function DateValidator(etalon: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control?.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const etalonDate = new Date(etalon);

    return selectedDate < etalonDate ? { invalidDate: true } : null;
  };
}
