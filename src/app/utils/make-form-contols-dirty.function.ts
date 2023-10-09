import { FormArray, FormGroup } from '@angular/forms';

export function MakeFormControlsDirty(form: FormGroup): void {
  Object.keys(form.controls).forEach((key: string) => {
    if (form.controls[key] instanceof FormArray) {
      ((form.controls[key] as FormArray).controls as FormGroup[]).forEach((form: FormGroup) =>
        MakeFormControlsDirty(form)
      );
    }

    if (form.controls[key] instanceof FormGroup) {
      MakeFormControlsDirty(form.controls[key] as FormGroup);
    } else {
      form.get(key).markAsDirty();
    }
  });
}
