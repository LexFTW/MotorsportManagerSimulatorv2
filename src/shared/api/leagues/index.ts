import { httpClient } from "../client";
import type { LeagueResponse } from "../../../models/leagues/LeagueResponse";
import type { ParticipantResponse } from "../../../models/participants/ParticipantResponse";
import type { AddParticipantLeagueRequest } from "@/models";

export const getAll = async (playerId?: string, signal?: AbortSignal) => {
    console.log("Fetching all leagues for playerId:", playerId);

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

export const addParticipant = async (
    leagueId: string,
    playerId: string,
    joinCode?: string,
    signal?: AbortSignal
): Promise<ParticipantResponse> => {
    return httpClient.post<AddParticipantLeagueRequest, ParticipantResponse>(
        `/leagues/${leagueId}/participants`,
        { playerId, joinCode }, // sin wrapper
        { signal }
    );
};