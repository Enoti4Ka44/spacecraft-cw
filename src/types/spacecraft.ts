export type spacecraftStatusMAP =
  | "STANDBY"
  | "IN_MISSION"
  | "MAINTENANCE"
  | "INACTIVE";

export interface Spacecraft {
  id: number;
  name: string;
  model: string;
  launchDate: string;
  spacecraftStatus: spacecraftStatusMAP;
  specifications: string;
  currentLocation: string;
}
