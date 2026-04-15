import { Mission } from "@/types/mission";
import { BASE_URL } from ".";
import { createQueryString } from "@/lib/api-utils";

export const missionService = {
  getAll: async (params?: {
    search?: string;
    spacecraftId?: number;
    missionStatus?: string;
  }): Promise<Mission[]> => {
    const response = await fetch(
      `${BASE_URL}/missions${createQueryString(params)}`,
    );
    return response.json();
  },

  getById: async (id: number): Promise<Mission> => {
    const response = await fetch(`${BASE_URL}/missions/${id}`);
    return response.json();
  },

  post: async (data: Omit<Mission, "id">) => {
    const response = await fetch(`${BASE_URL}/missions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (id: number, data: Omit<Mission, "id">) => {
    const response = await fetch(`${BASE_URL}/missions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/missions/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
