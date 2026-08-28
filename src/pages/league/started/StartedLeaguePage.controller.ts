import type { LeagueResponse, ParticipantResponse } from "@/models";
import { getById, getParticipantsByLeagueId, addParticipant } from "@/shared/api/leagues";

export const getLeague = async (leagueId: string): Promise<LeagueResponse> => {
    return await getById(leagueId);
};

export const getLeagueParticipants = async(leagueId: string): Promise<ParticipantResponse[]> => {
    return await getParticipantsByLeagueId(leagueId);
};

export const addParticipantToLeague = async (leagueId: string, joinCode: string, playerId: string): Promise<void> => {
    await addParticipant(leagueId, playerId, joinCode);
};

export const copyLeagueJoinLink = async (
    league: LeagueResponse
): Promise<void> => {
    const url = generateLinkToJoinLeague(league);
    
    await navigator.clipboard.writeText(url);
};

const generateLinkToJoinLeague = (league: LeagueResponse): string => {
    return `${window.location.origin}/leagues/${league.id}/started?joinCode=${league.joinCode}`;
};