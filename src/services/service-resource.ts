import { Resource } from "@/types/resource";
import { BASE_URL } from ".";

export const resourceService = {
  getAll: async (): Promise<Resource[]> => {
    const response = await fetch(`${BASE_URL}/resources`);
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

  patchQuantity: async (id: number, quantity: number) => {
    const response = await fetch(`${BASE_URL}/resources/${id}/quantity`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      // В зависимости от бэкенда, тут может передаваться либо просто число, либо объект
      body: JSON.stringify({ quantity }),
    });
    return response;
  },
};
