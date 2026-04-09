import { Spacecraft } from "@/types/spacecraft";
import { BASE_URL } from ".";

export const spacecraftService = {
  getAll: async (): Promise<Spacecraft[]> => {
    const response = await fetch(`${BASE_URL}/api/spacecrafts`, {
      method: "GET",
    });

    return response.json();
  },

  post: async (data: Omit<Spacecraft, "id">) => {
    const response = await fetch(`${BASE_URL}/api/spacecrafts`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/api/spacecrafts/${id}`, {
      method: "DELETE",
    });

    return response;
  },
};
