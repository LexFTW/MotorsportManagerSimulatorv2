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

export const StartedLeaguePage = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const joinCode = searchParams.get("joinCode");

    const leagueId = location.pathname.split("/")[2];

    const [loading, setLoading] = useState(true);
    const [league, setLeague]: [LeagueResponse | undefined, (league: LeagueResponse) => void] = useState();
    const [participants, setParticipants]: [ParticipantResponse[] | undefined, (participants: ParticipantResponse[]) => void] = useState();

    useEffect(() => {
        const run = async () => {
            setLoading(true);

            if (joinCode) {
                await addParticipantToLeague(leagueId, joinCode);
            }

            const [leagueResponse, participantsResponse] = await Promise.all([
                getLeague(leagueId),
                getLeagueParticipants(leagueId),
            ]);

            setLeague(leagueResponse);
            setParticipants(participantsResponse);
            setLoading(false);
        };
        
        run();
    }, [leagueId, joinCode]);

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
                                    {league?.type === "PRIVATE" && (
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