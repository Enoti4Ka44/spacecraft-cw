import { ResourceType } from "@/types/resource";
import { BASE_URL } from ".";
import { createQueryString } from "@/lib/api-utils";

export const resourceTypeService = {
  getAll: async (params?: { search?: string }): Promise<ResourceType[]> => {
    const response = await fetch(
      `${BASE_URL}/resources/type${createQueryString(params)}`,
    );
    return response.json();
  },

  getById: async (id: number): Promise<ResourceType> => {
    const response = await fetch(`${BASE_URL}/resources/type/${id}`);
    return response.json();
  },

  post: async (data: Omit<ResourceType, "id">) => {
    const response = await fetch(`${BASE_URL}/resources/type`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (id: number, data: ResourceType) => {
    const response = await fetch(`${BASE_URL}/resources/type/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/resources/type/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
