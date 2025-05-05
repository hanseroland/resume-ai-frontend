import React, { memo } from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import Grid from '@mui/material/Grid2';

const ExperienceDetailPreview = memo(({ resumeData, cvColor }) => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p:2,
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
        Expériences Professionnelles
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Liste des expériences */}
      {resumeData?.experiences && resumeData?.experiences.length > 0 ? (
        resumeData?.experiences.map((experience, index) => (
          <Box key={index} mb={2}>
            <Grid container spacing={2}>
              <Grid size={{xs:12, sm:10}}>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight="bold" fontSize={15}>
                    {/* Icône ou Date */}
                    <span>
                      <WorkIcon
                        sx={{
                          fontSize: 20,
                          color: "#000",
                        }}
                      />
                    </span>
                    {"  "}
                    {experience?.jobTitle || "Titre du poste"}
                  </Typography>

                  <Typography variant="body1" color="textSecondary" fontSize={12}>
                    {experience?.companyName || "Nom de l'entreprise"} |{" "}
                    {experience?.city && experience?.country
                      ? `${experience?.city}, ${experience?.country}`
                      : "Lieu non spécifié"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontSize={12}>
                    {`De ${new Date(experience?.startDate).toLocaleDateString(
                      "fr-FR"
                    )} à ${
                      experience?.endDate
                        ? new Date(experience?.endDate).toLocaleDateString("fr-FR")
                        : "Aujourd'hui"
                    }`}
                  </Typography>
                  <div
                    dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                    style={{ fontSize: 12, textAlign: "justify" }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" fontSize={12}>
          Aucune expérience professionnelle renseignée. Ajoutez vos expériences pour les afficher ici.
        </Typography>
      )}
    </Box>
  );
});

export default ExperienceDetailPreview;