import { Box, Typography, Divider, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Language } from "@mui/icons-material";

const LanguageDetailPreview = ({ resumeData, cvColor }) => {
    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                p: 3,
            }}
        >
            {/* Titre de la section */}
            <Typography
                variant="h5"
                fontWeight="bold"
                color="textPrimary"
                gutterBottom
                fontSize={15}
                sx={{
                    borderBottom: `2px solid ${cvColor}`,
                    display: "inline-block",
                    pb: 0.5,
                    mb: 2,
                }}
            >
                Langues
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Liste des langues */}
            {resumeData?.languages && resumeData?.languages.length > 0 ? (
                resumeData?.languages.map((lang, index) => (
                    <Box key={index} mb={4}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 10 }}>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                                    <span><Language sx={{ fontSize: 20, color: "#000", }} /></span>
                                    <Typography variant="body1" color="textSecondary" fontSize={12}>
                                        {lang?.name || "Langue non spécifiée"}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary" fontSize={12}>
                    Aucun détail de langue renseigné. Ajoutez vos une langue pour les afficher ici.
                </Typography>
            )}
        </Box>
    );
};

export default LanguageDetailPreview;