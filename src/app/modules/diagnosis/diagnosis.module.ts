import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormElementsModule } from '@lakmus/shared/form-elements';
import { DiagnosisComponent } from './components';
import { ButtonModule } from '@lakmus/shared/button';
import { DiagnosisFacadeService } from './services';
import { JsonPreviewModule } from '@lakmus/shared/json-preview';

@NgModule({
  imports: [CommonModule, FormElementsModule, ButtonModule, JsonPreviewModule],
  declarations: [DiagnosisComponent],
  exports: [DiagnosisComponent],
  providers: [DiagnosisFacadeService],
})
export class DiagnosisModule {}
