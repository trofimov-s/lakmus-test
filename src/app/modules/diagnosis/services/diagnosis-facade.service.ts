import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

import { DiagnosisData, DiagnosisI } from '@lakmus/core/models';
import { DiagnosisService } from '@lakmus/core/services';
import { OutputJSONConditionI, OutputJSONI } from '../models';
import { CreateCondition } from '@lakmus/utils';

@Injectable()
export class DiagnosisFacadeService {
  private allDiagnoses$ = new BehaviorSubject<DiagnosisI[] | null>(null);

  constructor(private diagnosisService: DiagnosisService) {}

  getDiagnoses(search: string): Observable<DiagnosisI[]> {
    return this.allDiagnoses$.pipe(
      switchMap((diagnoses: DiagnosisI[]) => {
        return diagnoses && search === ''
          ? of(diagnoses)
          : this.diagnosisService.getDiagnoses({ Search: search }).pipe(
              tap((result: DiagnosisI[]) => {
                if (!diagnoses && search === '') {
                  this.allDiagnoses$.next(result);
                }
              })
            );
      })
    );
  }

  buildOutputJSON(date: string, diagnoses: DiagnosisData[]): OutputJSONI {
    const dateInISOFormat = new Date(date).toISOString();

    const outputData: OutputJSONI = {
      encounter: {
        date: dateInISOFormat,
      },
    };

    const diagnosesExist: boolean = diagnoses.some((dia: DiagnosisData) => Boolean(dia.diagnosis));

    if (!diagnosesExist) {
      return outputData;
    }

    const conditions: OutputJSONConditionI[] = diagnoses.map(
      ({ diagnosis, note }: DiagnosisData): OutputJSONConditionI =>
        CreateCondition(diagnosis, note, dateInISOFormat)
    );

    return { ...outputData, conditions };
  }
}
