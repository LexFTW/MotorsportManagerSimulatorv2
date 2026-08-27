import type { LeagueResponse, ParticipantResponse } from "@/models";
import { getById, getParticipantsByLeagueId } from "@/shared/api/leagues";

export const getLeague = async (leagueId: string): Promise<LeagueResponse> => {
    return await getById(leagueId);
};

export const getLeagueParticipants = async(leagueId: string): Promise<ParticipantResponse[]> => {
    return await getParticipantsByLeagueId(leagueId);
};

export const addParticipantToLeague = async (leagueId: string, joinCode: string): Promise<void> => {
    // Logic to add participant using the joinCode
    alert("Uniendose a la liga con el código: " + joinCode);
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