import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldErrorsComponent, InputComponent, SelectComponent } from './components';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  declarations: [InputComponent, SelectComponent, FieldErrorsComponent],
  exports: [InputComponent, ReactiveFormsModule, SelectComponent],
})
export class FormElementsModule {}
