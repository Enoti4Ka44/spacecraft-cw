import { RosourceLog } from "@/types/resource";
import { BASE_URL } from ".";

export const resourceLogService = {
  getAll: async (): Promise<RosourceLog[]> => {
    const response = await fetch(`${BASE_URL}/resource-logs`);
    return response.json();
  },

  getById: async (id: number): Promise<RosourceLog> => {
    const response = await fetch(`${BASE_URL}/resource-logs/${id}`);
    return response.json();
  },

  getBySpacecraftId: async (spacecraftId: number): Promise<RosourceLog[]> => {
    const response = await fetch(
      `${BASE_URL}/resource-logs/spacecraft/${spacecraftId}`,
    );
    return response.json();
  },

  getByResourceId: async (resourceId: number): Promise<RosourceLog[]> => {
    const response = await fetch(
      `${BASE_URL}/resource-logs/resource/${resourceId}`,
    );
    return response.json();
  },
};
