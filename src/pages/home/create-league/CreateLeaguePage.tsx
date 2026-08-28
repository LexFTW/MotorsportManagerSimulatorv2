import { Card, Button } from "@shared/components";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import {
    FormControlLabel,
    Radio,
} from "@mui/material";
import {
    inputSx,
    sectionTitleSx,
    sectionDescriptionSx,
    visibilityOptionSx,
} from "./CreatedLeaguePage.constants";

export const CreateLeaguePage = () => {
    return (
        <Box sx={{ padding: { xs: "0.75rem", md: "1.5rem" }, margin: "0 auto" }}>
            <Card>
                <Card.Header style={{ padding: "1.25rem 1.5rem" }}>
                    <h4 style={{ margin: 0, fontWeight: 700 }}>
                        Crear una liga
                    </h4>

                    <span
                        style={{
                            display: "block",
                            marginTop: "0.25rem",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                        }}
                    >
                        Configura tu campeonato y prepárate para competir
                    </span>
                </Card.Header>

                <Card.Body>
                    <Box
                        component="form"
                        sx={{
                            padding: {
                                xs: "1rem",
                                md: "1.5rem",
                            },
                        }}
                    >
                        <Stack spacing={4}>
                            <Box>
                                <h5 style={sectionTitleSx}>
                                    Información de la liga
                                </h5>

                                <span style={sectionDescriptionSx}>
                                    Define la identidad de tu campeonato
                                </span>

                                <Stack spacing={2} sx={{ marginTop: "1.5rem" }} >
                                    <TextField
                                        label="Nombre de la Liga"
                                        placeholder="Ej. Formula Racing Championship"
                                        fullWidth
                                        required
                                        size="small"
                                        sx={inputSx}
                                    />

                                    <TextField
                                        label="Descripción"
                                        placeholder="Describe brevemente tu liga..."
                                        multiline
                                        rows={4}
                                        fullWidth
                                        size="small"
                                        sx={inputSx}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <h5 style={sectionTitleSx}>
                                    Configuración de la liga
                                </h5>

                                <span style={sectionDescriptionSx}>
                                    Define las reglas básicas de acceso
                                </span>

                                <Stack spacing={3} sx={{ marginTop: "1.5rem" }} >
                                    <TextField
                                        label="Máximo de jugadores"
                                        type="number"
                                        defaultValue={10}
                                        slotProps={{
                                            htmlInput: {
                                                min: 2,
                                                max: 10,
                                            },
                                        }}
                                        required
                                        size="small"
                                        sx={{
                                            ...inputSx,
                                            maxWidth: {
                                                xs: "100%",
                                                sm: "250px",
                                            },
                                        }}
                                    />

                                    <FormControl>
                                        <h5 style={{ ...sectionTitleSx, marginBottom: "0.75rem" }}>
                                            Visibilidad
                                        </h5>

                                        <RadioGroup
                                            name="visibility"
                                            defaultValue="public"
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: {
                                                    xs: "1fr",
                                                    sm: "1fr 1fr",
                                                },
                                                gap: 1.5,
                                            }}
                                        >
                                            <FormControlLabel
                                                value="public"
                                                control={<Radio />}
                                                label={
                                                    <Box>
                                                        <strong
                                                            style={{
                                                                display: "block",
                                                                marginBottom:
                                                                    "0.25rem",
                                                            }}
                                                        >
                                                            Pública
                                                        </strong>

                                                        <span
                                                            style={{
                                                                display:
                                                                    "block",
                                                                fontSize:
                                                                    "0.75rem",
                                                                lineHeight: 1.5,
                                                                opacity: 0.7,
                                                            }}
                                                        >
                                                            Cualquier jugador
                                                            puede encontrar y
                                                            unirse a la liga.
                                                        </span>
                                                    </Box>
                                                }
                                                sx={visibilityOptionSx}
                                            />

                                            <FormControlLabel
                                                value="private"
                                                control={<Radio />}
                                                label={
                                                    <Box>
                                                        <strong
                                                            style={{
                                                                display: "block",
                                                                marginBottom:
                                                                    "0.25rem",
                                                            }}
                                                        >
                                                            Privada
                                                        </strong>

                                                        <span
                                                            style={{
                                                                display:
                                                                    "block",
                                                                fontSize:
                                                                    "0.75rem",
                                                                lineHeight: 1.5,
                                                                opacity: 0.7,
                                                            }}
                                                        >
                                                            Solo podrán entrar
                                                            jugadores invitados.
                                                        </span>
                                                    </Box>
                                                }
                                                sx={visibilityOptionSx}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: 1.5,
                                    paddingTop: 2,
                                    borderTop:
                                        "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <Button variant="secondary">
                                    Cancelar
                                </Button>

                                <Button type="submit" variant="primary">
                                    Crear Liga
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Card.Body>
            </Card>
        </Box>
    );
};