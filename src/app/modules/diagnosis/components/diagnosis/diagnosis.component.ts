import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

import { DateValidator, OptionI } from '@lakmus/shared/form-elements';
import { DiagnosisFacadeService } from '../../services';
import { DiagnosisData, DiagnosisI } from '@lakmus/core/models';
import { OutputJSONI } from '../../models';
import { MakeFormControlsDirty } from '@lakmus/utils';

interface DiagnosesFormArrayItemI {
  diagnosis: FormControl<DiagnosisI>;
  note: FormControl<string>;
}

interface DiagnosisFormI {
  date: FormControl<string>;
  diagnoses: FormArray<FormGroup<DiagnosesFormArrayItemI>>;
}

interface DiagnosisFormValueI {
  date: string;
  diagnoses: DiagnosisData[];
}

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagnosisComponent implements OnInit, OnDestroy {
  private search$ = new BehaviorSubject<string>('');
  readonly todayDate = new DatePipe('en-US').transform(new Date(), 'YYYY-MM-dd');
  isLoading$ = new BehaviorSubject<boolean>(false);
  options: OptionI<DiagnosisI>[] = [];
  diagnosisForm: FormGroup<DiagnosisFormI>;
  outputData: OutputJSONI;

  get diagnosesFormArray(): FormArray<FormGroup<DiagnosesFormArrayItemI>> {
    return this.diagnosisForm.controls['diagnoses'] as FormArray<
      FormGroup<DiagnosesFormArrayItemI>
    >;
  }

  constructor(
    private fb: FormBuilder,
    private diagnosisFacade: DiagnosisFacadeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.diagnosisForm = this.fb.group({
      date: ['', [DateValidator(this.todayDate), Validators.required]],
      diagnoses: this.fb.array([this.createDiagnosisItemForm()]),
    });

    this.search$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.isLoading$.next(true)),
        switchMap((search) => this.diagnosisFacade.getDiagnoses(search)),
        map((diagnoses: DiagnosisI[]): OptionI<DiagnosisI>[] =>
          diagnoses.map((diagnosis) => ({
            name: `${diagnosis.code} ${diagnosis.name}`,
            value: diagnosis,
          }))
        )
      )
      .subscribe((options: OptionI<DiagnosisI>[]) => {
        this.isLoading$.next(false);
        this.options = options;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.search$.next(null);
    this.search$.complete();
  }

  onSearch(search: string): void {
    this.search$.next(search);
  }

  addDiagnosis(): void {
    const diagnosisForm = this.createDiagnosisItemForm();

    this.diagnosesFormArray.push(diagnosisForm);
  }

  removeDiagnosis(i: number): void {
    this.diagnosesFormArray.removeAt(i);
  }

  onSubmit(): void {
    MakeFormControlsDirty(this.diagnosisForm);

    if (this.diagnosisForm.invalid) {
      return;
    }

    const { date, diagnoses }: DiagnosisFormValueI = this.diagnosisForm.getRawValue();
    const resultData = this.diagnosisFacade.buildOutputJSON(date, diagnoses);

    this.outputData = resultData;
  }

  trackBy(i: number): number {
    return i;
  }

  private createDiagnosisItemForm(): FormGroup<DiagnosesFormArrayItemI> {
    const diagnosisForm = this.fb.group({
      diagnosis: [null as DiagnosisI],
      note: [''],
    });

    return diagnosisForm;
  }
}
