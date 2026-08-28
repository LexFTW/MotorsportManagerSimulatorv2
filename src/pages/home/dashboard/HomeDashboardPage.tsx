import { Button, Table } from "@/shared/components"
import type { LeagueResponse } from "@/models"
import { COLUMNS } from "./HomeDashboard.constants"
import { mapLeaguesToRows } from "./HomeDashboard.mappers"
import styles from "./HomeDashboard.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { getMyLeagues } from "./HomeDashboard.controller"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { RootState } from "@/app/store"
import { useSelector } from "react-redux"

export const HomeDashboardPage = () => {
    const [leagues, setLeagues] = useState<LeagueResponse[]>([])
    const { session } = useSelector((state: RootState) => state.session)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const leaguesData = await getMyLeagues(session?.user.id)
                // http://localhost:5173/leagues/55a59fc9-5163-4a6b-ba5b-2d26593e59b7/started?joinCode=4XI0O1
                setLeagues(leaguesData)
            } catch (error) {
                console.error("Error fetching leagues:", error)
            }
        }

        fetchLeagues()
    }, [])

    return (
        <Box>
            <Grid container spacing={2} sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
            }}>
                <Grid size={12}>
                    <Table title="Mis Ligas" columns={COLUMNS} rows={mapLeaguesToRows(leagues, navigate)} />
                </Grid>
                <Grid size={6}>
                    <div className={`${styles.actionCard} ${styles.searchCard}`}>
                        <div className={styles.actionContent}>
                            <div className={styles.actionIcon}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <div>
                                <h2>BUSCAR LIGAS</h2>
                                <p>
                                    Encuentra una liga y únete a otros
                                    managers para competir por la gloria.
                                </p>
                                <Button
                                    variant="ghost"
                                    className={styles.searchActionButton}
                                    onClick={() => navigate("/leagues")}
                                >
                                    BUSCAR LIGAS
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div className={`${styles.actionCard} ${styles.createCard}`}>
                        <div className={styles.actionContent}>
                            <div className={styles.actionIcon}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <div>
                                <h2>CREAR UNA LIGA</h2>
                                <p>
                                    Crea tu propia competición, invita
                                    a tus amigos y dirige tu propio
                                    campeonato.
                                </p>
                                <Button
                                    variant="ghost"
                                    className={styles.createActionButton}
                                    onClick={() => navigate("/create-league")}
                                >
                                    CREAR LIGA
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}