import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-item-base',
  template: '',
})
export class FormItemBaseComponent<T = string> implements ControlValueAccessor {
  @Input()
  parentForm: FormGroup;

  @Input()
  id: string;

  @Input()
  fieldName: string;

  @Input()
  type = 'text';

  @Input()
  placeholder = '';

  @Input()
  disabled: boolean;

  public get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  value: T;
  changed: (value: T) => void;
  touched: () => void;

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  onChanged(event: Event): void {
    this.value = (<HTMLInputElement | HTMLSelectElement>event.target).value as T;
    this.changed(this.value);
  }
}
