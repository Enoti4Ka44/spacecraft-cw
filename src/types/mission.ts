export type MissionStatusMAP =
  | "PLANNING"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export type CrewMemberHealthStatus = "HEALTHY" | "SICK" | "CRITICAL";

export interface Mission {
  id: number;
  name: string;
  spacecraftId: number;
  startDate: Date;
  endDate: Date;
  missionStatus: MissionStatusMAP;
  objectives: string;
}

export interface MissionCrew {
  memberId: 0;
  firstName: string;
  lastName: string;
  specialization: string;
  roleInMission: string;
  joinDate: Date;
}

export interface CrewMember {
  id: 0;
  firstName: string;
  lastName: string;
  specialization: string;
  healthStatus: CrewMemberHealthStatus;
  birthDate: string;
}
