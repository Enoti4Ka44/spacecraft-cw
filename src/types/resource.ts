export interface Resource {
  id: number;
  name: string;
  spacecraftId: number;
  resourceTypeId: number;
  currentQuantity: number;
  maxCapacity: number;
  unit: string;
  lastUpdated: Date;
}

export interface ResourceType {
  id: number;
  name: string;
}

export interface RosourceLog {
  id: number;
  spacecraftId: number;
  resourceId: number;
  quantityChange: number;
  timestamp: Date;
}
