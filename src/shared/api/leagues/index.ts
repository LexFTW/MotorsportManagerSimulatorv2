import { httpClient } from "../client";
import type { LeagueResponse } from "../../../models/leagues/LeagueResponse";
import type { ParticipantResponse } from "../../../models/participants/ParticipantResponse";

export const getAll = async (playerId?: string, signal?: AbortSignal) => {
    return httpClient.get<LeagueResponse[]>("/leagues", {
        params: playerId ? { playerId } : undefined,
        signal,
    });
};

export const getById = async (leagueId: string, signal?: AbortSignal): Promise<LeagueResponse> => {
    return httpClient.get<LeagueResponse>(`/leagues/${leagueId}`, {
        signal,
    });
};

export const getParticipantsByLeagueId = async (leagueId: string, signal?: AbortSignal): Promise<ParticipantResponse[]> => {
    return httpClient.get<ParticipantResponse[]>(`/leagues/${leagueId}/participants`, {
        signal,
    });
};