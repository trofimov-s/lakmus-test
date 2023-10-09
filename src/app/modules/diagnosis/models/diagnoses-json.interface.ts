interface OutputJSONEncounterI {
  date: string;
}

export interface OutputJSONConditionI {
  id: string;
  context: {
    identifier: {
      type: {
        coding: [
          {
            system: string;
            code: string;
          },
        ];
      };
      value: number;
    };
  };
  code: {
    coding: [
      {
        system: string;
        code: string;
      },
    ];
  };
  notes: string;
  onset_date: string;
}

export interface OutputJSONI {
  encounter: OutputJSONEncounterI;
  conditions?: OutputJSONConditionI[];
}
