import type { NavigateFunction } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faUsers } from "@fortawesome/free-solid-svg-icons"
import { Button, type TableRow } from "@/shared/components"
import type { LeagueResponse } from "@/models"
import { getLeagueInitials } from "@/shared/libs"
import styles from "./HomeDashboard.module.css"

export const mapLeaguesToRows = (leagues: LeagueResponse[], navigate: NavigateFunction): TableRow[] =>
    leagues.map((league) => ({
        id: league.id,
        cells: [
            <div className={styles.leagueName}>
                <div className={styles.teamBadge}>{getLeagueInitials(league.name)}</div>
                <div>
                    <span className={styles.title}>{league.name}</span>
                    <span className={styles.leagueDescription}>{league.description ?? "Temporada actual"}</span>
                </div>
            </div>,
            <span className={styles.stat}>
                <FontAwesomeIcon icon={faUsers} />
                {league.players.length} / {league.maxPlayers}
            </span>,
            <span className={styles.status}>
                <span className={styles.statusDot} />
                {league.status.toUpperCase()}
            </span>,
            <Button
                variant="link"
                onClick={() => navigate(`/leagues/${league.id}/started`)}
            >
                Acceder
                <FontAwesomeIcon icon={faArrowRight} />
            </Button>
        ],
    }));
