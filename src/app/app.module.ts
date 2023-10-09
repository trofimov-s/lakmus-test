import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DiagnosisModule } from '@lakmus/modules/diagnosis';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, DiagnosisModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
