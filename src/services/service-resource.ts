import { Resource } from "@/types/resource";
import { BASE_URL } from ".";
import { createQueryString } from "@/lib/api-utils";

export const resourceService = {
  getAll: async (params?: {
    maxCurrentQuantity?: number;
    resourceTypeId?: number;
    spacecraftId?: number;
  }): Promise<Resource[]> => {
    const response = await fetch(
      `${BASE_URL}/resources${createQueryString(params)}`,
    );
    return response.json();
  },

  getById: async (id: number): Promise<Resource> => {
    const response = await fetch(`${BASE_URL}/resources/${id}`);
    return response.json();
  },

  post: async (data: Omit<Resource, "id">) => {
    const response = await fetch(`${BASE_URL}/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (id: number, data: Resource) => {
    const response = await fetch(`${BASE_URL}/resources/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/resources/${id}`, {
      method: "DELETE",
    });
    return response;
  },

  patchQuantity: async (id: number, quantityChange: string) => {
    console.log(quantityChange);
    const response = await fetch(`${BASE_URL}/resources/${id}/quantity`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantityChange: quantityChange }),
    });
    return response;
  },
};
