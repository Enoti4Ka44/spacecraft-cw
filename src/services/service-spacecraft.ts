import { Spacecraft, spacecraftStatusMAP } from "@/types/spacecraft";
import { BASE_URL } from ".";
import { createQueryString } from "@/lib/api-utils";

export const spacecraftService = {
  getAll: async (
    params: { status?: spacecraftStatusMAP; search?: string } = {},
  ): Promise<Spacecraft[]> => {
    const response = await fetch(
      `${BASE_URL}/spacecrafts${createQueryString(params)}`,
    );
    return response.json();
  },

  getById: async (id: number): Promise<Spacecraft> => {
    const response = await fetch(`${BASE_URL}/spacecrafts/${id}`);
    return response.json();
  },

  post: async (data: Omit<Spacecraft, "id">) => {
    const response = await fetch(`${BASE_URL}/spacecrafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (id: number, data: Spacecraft) => {
    const response = await fetch(`${BASE_URL}/spacecrafts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/spacecrafts/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
