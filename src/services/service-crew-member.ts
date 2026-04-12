import { CrewMember } from "@/types/mission";
import { BASE_URL } from ".";

export const crewMemberService = {
  getAll: async (): Promise<CrewMember[]> => {
    const response = await fetch(`${BASE_URL}/crew-members`);
    return response.json();
  },

  getById: async (id: number): Promise<CrewMember> => {
    const response = await fetch(`${BASE_URL}/crew-members/${id}`);
    return response.json();
  },

  post: async (data: Omit<CrewMember, "id">) => {
    const response = await fetch(`${BASE_URL}/crew-members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (id: number, data: CrewMember) => {
    const response = await fetch(`${BASE_URL}/crew-members/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/crew-members/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
