import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormItemBaseComponent } from '../form-item-base/form-item-base.component';
import { MakeProvider } from '@lakmus/utils';
import { OptionI } from '../../models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [MakeProvider(SelectComponent)],
})
export class SelectComponent<T> extends FormItemBaseComponent {
  @Input()
  options: Array<OptionI<T>>;

  @Input()
  isLoading: boolean;

  @Input()
  notFoundText: string;

  @Input()
  loadingText = 'Загрузка...';

  @Output()
  searchData = new EventEmitter<string>();

  close(): void {
    this.searchData.emit('');
  }

  search(data: { term: string; items: Array<T> }): void {
    this.searchData.emit(data.term);
  }
}
