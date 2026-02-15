import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Grid from '@mui/material/Grid2';

const SkillsDetailPreview = ({ resumeData, cvColor }) => {

  const renderStars = (level) => {
    const stars = [];
    for (let i = 0; i < level; i++) {
      stars.push(<StarIcon fontSize="15px" key={i} sx={{ color: `${cvColor}` }} />);
    }
    return stars;
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
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
          mb: 3,
        }}
      >
        Compétences
      </Typography>

      {/* Liste des compétences */}
      <Grid container spacing={1}>
        {resumeData?.skills && resumeData?.skills.length > 0 ? (
          resumeData?.skills.map((skill, index) => (
            <Grid size={{ xs: 3, sm: 2, lg: 2, md: 2 }} key={index}>
              <Chip
                label={skill?.name}
                icon={<>{renderStars(skill?.level)}</>}
                sx={{
                  fontSize: "12px", // Définit la taille de la police à 12px
                  fontWeight: "bold",
                  color: "#000",
                  "& .MuiChip-icon": {
                    color: `${cvColor}`,
                  },
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ fontSize: 12 }}>
            Aucune compétence renseignée. Ajoutez vos compétences pour les mettre en avant.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default SkillsDetailPreview;