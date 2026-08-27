import Box from '@mui/material/Box';
import { Card, Button } from '@/shared/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './UnauthorizedPage.module.css';

export const UnauthorizedPage = () => {
    return (
        <Box className={styles.wrapper}>
            <Card className={styles.card}>
                <Card.Body className={styles.body}>
                    <FontAwesomeIcon icon={faLock} className={styles.icon} />
                    <h1>403</h1>
                    <h3>Acceso no autorizado</h3>
                    <p>No tienes permisos para ver esta página.</p>
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
