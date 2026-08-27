import type { LeagueResponse, ParticipantResponse } from "@/models";
import type { TableRow } from "@/shared/components"
import Avatar from "@mui/material/Avatar";

export const mapParticipantsMock = (): TableRow[] => {
    return [
        {
            id: '1',
            cells: [
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Avatar />
                    <span>Alexis Mengual</span>
                </div>
            ]
        },
        {
            id: '2',
            cells: [
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Avatar />
                        <span>Edgar Canut</span>
                    </div>
                </>
            ]
        }
    ];
}

export const mapParticipants = (league: LeagueResponse,participants: ParticipantResponse[]): TableRow[] => {
    return participants.map((participant, index) => ({
        id: (index + 1).toString(),
        cells: [
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Avatar src={participant.avatar}/>
                <span>{participant.fullName}</span>
            </div>,
            <></>,
            <>
                { league.ownerId == participant.id && (
                    <span>Owner</span>
                )}
            </>
        ]
    }));
};