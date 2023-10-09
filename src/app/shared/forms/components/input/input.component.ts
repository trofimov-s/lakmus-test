import { Component, Input } from '@angular/core';

import { MakeProvider } from '@lakmus/utils';
import { FormItemBaseComponent } from '../form-item-base/form-item-base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [MakeProvider(InputComponent)],
})
export class InputComponent extends FormItemBaseComponent {
  @Input()
  minValue: string | number;
}
