import type { LeagueResponse } from "@/models";
import { getAll } from "@shared/api/leagues";

export const getMyLeagues: (playerId?: string, signal?: AbortSignal) => Promise<LeagueResponse[]> = async (playerId?: string, signal?: AbortSignal) => {
    const response = await getAll(playerId, signal);
    return response;
};