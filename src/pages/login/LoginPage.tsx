import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card, Button } from '@/shared/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiscord,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { signInWithGoogleHandler } from './LoginPage.controllers';
import { FOOTER_CONTENT } from './LoginPage.constants';

export const LoginPage = () => {
    const location = useLocation();
    const from = (location.state as { from?: Location } | null)?.from;
    const redirectPath = from ? `${from.pathname}${from.search}${from.hash}` : '/';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }} >
                    <Card className={styles.card}>
                        <Card.Body>
                            <h3>Motorsport Manager Simulator 2026</h3>
                            <Button
                                size="large"
                                variant="primary"
                                fullWidth
                                square
                                style={{ marginBottom: '1rem' }}
                                onClick={() => {
                                    signInWithGoogleHandler(redirectPath);
                                }}
                            >
                                <FontAwesomeIcon icon={faGoogle} /> Iniciar sesión con Google
                            </Button>
                            <Button
                                size="large"
                                variant="secondary"
                                outlined
                                fullWidth
                                square
                                disabled
                            >
                                <FontAwesomeIcon icon={faDiscord} /> Iniciar sesión con Discord
                            </Button>
                        </Card.Body>
                        <Card.Footer className={styles.footer}>
                            {FOOTER_CONTENT.map((item, index) => (
                                <div key={index} className={styles.footerItem}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <div>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Card.Footer>
                    </Card>
                </Grid>
                <Grid size={5} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
            </Grid>
        </Box>
    );
};