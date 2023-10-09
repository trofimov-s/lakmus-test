import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JsonPreviewComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [JsonPreviewComponent],
  exports: [JsonPreviewComponent],
})
export class JsonPreviewModule {}
