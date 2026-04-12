import { ResourceType } from "@/types/resource";
import { BASE_URL } from ".";

export const resourceTypeService = {
  getAll: async (): Promise<ResourceType[]> => {
    const response = await fetch(`${BASE_URL}/resources/type`);
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
