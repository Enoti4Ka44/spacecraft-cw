export type ExperimentStatusMAP =
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface experiment {
  id: number;
  name: string;
  missionId: number;
  description: string;
  experimentStatus: ExperimentStatusMAP;
  responsibleMemberId: number;
  startTime: Date;
  endTime: Date;
  results: string;
}
