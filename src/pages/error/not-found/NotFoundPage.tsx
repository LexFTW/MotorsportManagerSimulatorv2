import Box from '@mui/material/Box';
import { Card, Button } from '@/shared/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
    return (
        <Box className={styles.wrapper}>
            <Card className={styles.card}>
                <Card.Body className={styles.body}>
                    <FontAwesomeIcon icon={faFlagCheckered} className={styles.icon} />
                    <h1>404</h1>
                    <h3>Página no encontrada</h3>
                    <p>La ruta a la que intentas acceder no existe.</p>
                    <Button
                        size="large"
                        variant="primary"
                        square
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        Volver al inicio
                    </Button>
                </Card.Body>
            </Card>
        </Box>
    );
};
