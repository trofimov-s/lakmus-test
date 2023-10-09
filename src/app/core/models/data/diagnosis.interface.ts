export interface DiagnosisI {
  id: number;
  chapterNumber: number;
  chapterName: string;
  blockNumber: string;
  blockName: string;
  code: string;
  name: string;
  shortName: string;
  isPublic: boolean;
}

export interface DiagnosisData {
  diagnosis: DiagnosisI;
  note: string;
}
