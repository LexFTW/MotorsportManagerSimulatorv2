import { Button, Card, Table } from "@/shared/components";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import { COLUMNS } from "./StartedLeaguePage.constants";
import { mapParticipants } from "./StartedLeaguePage.mappers";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { LeagueResponse, ParticipantResponse } from "@/models";
import { copyLeagueJoinLink, getLeague, getLeagueParticipants, addParticipantToLeague } from "./StartedLeaguePage.controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLeagueRealtime } from "@/shared/hooks/useLeagueRealtime";

export const StartedLeaguePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const { session } = useSelector((state: RootState) => state.session)
    const joinCode = searchParams.get("joinCode");

    const leagueId = location.pathname.split("/")[2];

    const [loading, setLoading] = useState(true);
    const [league, setLeague] = useState<LeagueResponse>();
    const [participants, setParticipants] = useState<ParticipantResponse[]>();

    useEffect(() => {
        const run = async () => {
            setLoading(true);

            try {
                if (joinCode && session?.user.id) {
                    await addParticipantToLeague(
                        leagueId,
                        joinCode,
                        session.user.id
                    );
                }

                const [leagueResponse, participantsResponse] = await Promise.all([
                    getLeague(leagueId),
                    getLeagueParticipants(leagueId),
                ]);

                const isParticipant = participantsResponse.some(
                    p => p.id === session?.user.id
                );

                if (!isParticipant) {
                    // navigate("/");
                    return;
                }

                setLeague(leagueResponse);
                setParticipants(participantsResponse);
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [leagueId, joinCode, session?.user.id, navigate]);

    useLeagueRealtime(leagueId, (newParticipant: ParticipantResponse) => {
        setParticipants((prev) => {
            if (!prev) return [newParticipant];
            if (prev.some(p => p.id === newParticipant.id)) return prev;
            return [...prev, newParticipant];
        });
    });

    return (
        <Box>
            <Grid container spacing={2} sx={{
                justifyContent: "center",
                padding: "1rem",
            }}>
                {loading ? (
                    <CircularProgress aria-label="Loading…" />
                ) : 
                    <>
                        <Grid size={4}>
                            <Card>
                                <Card.Header style={{ textAlign: "center", padding: '1rem', flexDirection: 'column' }}>
                                    <h2>{league?.name}</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p style={{ color: 'var(--color-text-muted)'}}>{league?.description}</p>
                                    {league?.type.toUpperCase() === "PRIVATE" && (
                                        <>
                                            <Card style={{ margin: '1rem auto' }}>
                                                <Card.Body style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{ 
                                                            fontWeight: 'bold', 
                                                            fontFamily: 'var(--font-primary)', 
                                                            textTransform: 'uppercase' }}>Código de Invitación</span>
                                                        <span>{league?.joinCode}</span>
                                                    </Box>
                                                    <Button 
                                                        variant="secondary" 
                                                        outlined 
                                                        size="small" 
                                                        square 
                                                        onClick={() => copyLeagueJoinLink(league)}>
                                                        <FontAwesomeIcon icon={faCopy} />
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </>
                                    )}

                                    <Tooltip
                                        title={league?.maxPlayers != league?.players?.length ? "No se puede iniciar la liga hasta que todos los jugadores se hayan unido" : ""}
                                    >
                                        <span>
                                            <Button
                                                variant="primary"
                                                size="large"
                                                fullWidth
                                                square
                                                disabled={(league?.maxPlayers != league?.players?.length)}
                                            >Iniciar Liga</Button>
                                        </span>
                                    </Tooltip>
                                </Card.Body>
                            </Card>
                        </Grid>
                        <Grid size={8}>
                            <Table 
                                title="Participantes" 
                                columns={COLUMNS} 
                                rows={mapParticipants(league ?? {} as LeagueResponse, participants ?? [])} />
                        </Grid>
                    </>
                }
            </Grid>
        </Box>
    );
};