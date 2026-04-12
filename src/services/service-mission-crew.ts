import { MissionCrew } from "@/types/mission";
import { BASE_URL } from ".";

export const missionCrewService = {
  getAll: async (missionId: number): Promise<MissionCrew[]> => {
    const response = await fetch(`${BASE_URL}/missions/${missionId}/crew`);
    return response.json();
  },

  post: async (missionId: number, data: MissionCrew) => {
    const response = await fetch(`${BASE_URL}/missions/${missionId}/crew`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (missionId: number, memberId: number, data: MissionCrew) => {
    const response = await fetch(
      `${BASE_URL}/missions/${missionId}/crew/${memberId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    return response;
  },

  delete: async (missionId: number, memberId: number) => {
    const response = await fetch(
      `${BASE_URL}/missions/${missionId}/crew/${memberId}`,
      {
        method: "DELETE",
      },
    );
    return response;
  },
};
