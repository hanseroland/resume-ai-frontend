import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const SummaryDetailPreview = ({ resumeData, cvColor }) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2,
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
        Résumé Professionnel
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* Contenu du résumé */}
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{
          fontSize: 12, // Définit la taille de la police à 12px
          lineHeight: 1.6,
          textAlign: "justify",
          whiteSpace: "pre-wrap", // Pour conserver les sauts de ligne
        }}
      >
        {resumeData?.summary ||
          "Aucun résumé disponible. Ajoutez un résumé professionnel pour mettre en avant vos compétences et expériences clés."}
      </Typography>
    </Box>
  );
};

export default SummaryDetailPreview;