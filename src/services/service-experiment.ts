import { experiment } from "@/types/experiment";
import { BASE_URL } from ".";
import { createQueryString } from "@/lib/api-utils";

export const experimentService = {
  getAll: async (params?: {
    search?: string;
    missionId?: number;
    status?: string;
    responsibleMemberId?: number;
  }): Promise<experiment[]> => {
    const response = await fetch(
      `${BASE_URL}/experiments${createQueryString(params)}`,
    );
    return response.json();
  },

  getById: async (id: number): Promise<experiment> => {
    const response = await fetch(`${BASE_URL}/experiments/${id}`);
    return response.json();
  },

  post: async (data: Omit<experiment, "id">) => {
    const response = await fetch(`${BASE_URL}/experiments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (id: number, data: experiment) => {
    const response = await fetch(`${BASE_URL}/experiments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/experiments/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
