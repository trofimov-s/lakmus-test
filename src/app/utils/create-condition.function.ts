import { DiagnosisI } from '@lakmus/core/models';
import { OutputJSONConditionI } from '@lakmus/modules/diagnosis';
import { v4 as uuidv4 } from 'uuid';

export function CreateCondition(
  diagnosis: DiagnosisI,
  note: string,
  dateInISOFormat: string
): OutputJSONConditionI {
  return {
    id: uuidv4(),
    context: {
      identifier: {
        type: {
          coding: [
            {
              system: 'eHealth/resources',
              code: 'encounter',
            },
          ],
        },
        value: diagnosis.id,
      },
    },
    code: {
      coding: [
        {
          system: 'eHealth/ICPC2/condition_codes',
          code: diagnosis.code,
        },
      ],
    },
    notes: note || '',
    onset_date: dateInISOFormat,
  };
}
