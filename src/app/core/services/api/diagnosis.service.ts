import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DiagnosisI, QueryParamsI } from '../../models';
import { BaseApi } from './base-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiagnosisService extends BaseApi {
  constructor(http: HttpClient) {
    super(http);
  }

  getDiagnoses(query: QueryParamsI): Observable<DiagnosisI[]> {
    return this.http.get<DiagnosisI[]>(this.buildUrl(query));
  }
}
