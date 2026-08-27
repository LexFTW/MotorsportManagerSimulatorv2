export interface LeagueResponse {
    id: string;
    name: string;
    description: string | undefined;
    status: string;
    type: string;
    joinCode: string | undefined;
    maxPlayers: number;
    players: string[];
    ownerId: string;
    currentSeasonId: string;
    createdAt: string;
}