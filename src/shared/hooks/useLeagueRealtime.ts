// entities/league/model/useLeagueRealtime.ts
import { useEffect } from "react";
import { LeagueRealtimeClient } from "../api/ws";
import type { ParticipantResponse } from "@/models";

interface ParticipantAddedMessage {
    type: "ParticipantAdded";
    payload: ParticipantResponse;
}

function isParticipantAddedMessage(message: unknown): message is ParticipantAddedMessage {
    return (
        typeof message === "object" &&
        message !== null &&
        "type" in message &&
        (message as { type: unknown }).type === "ParticipantAdded"
    );
}

export function useLeagueRealtime(
    leagueId: string,
    onParticipantAdded: (participant: ParticipantResponse) => void,
) {
    useEffect(() => {
        console.log("useLeagueRealtime effect, leagueId:", leagueId); // temporal
        if (!leagueId) return;

        const client = new LeagueRealtimeClient();
        client.connect(leagueId);

        const unsubscribe = client.onMessage((message: unknown) => {
            console.log("WS raw message:", message); // temporal
            if (isParticipantAddedMessage(message)) {
                console.log("Parsed as ParticipantAdded:", message.payload); // temporal
                onParticipantAdded(message.payload);
            }
        });

        return () => {
            unsubscribe();
            client.disconnect();
        };
    }, [leagueId]);
}