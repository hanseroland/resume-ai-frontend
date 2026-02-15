import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
      }}
    >
      <Typography variant="h1" fontWeight="bold" sx={{ fontSize: { xs: "80px", md: "120px" } }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Oups ! La page que vous recherchez n'existe pas.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Elle a peut-être été déplacée ou supprimée, ou l'URL est incorrecte.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
      >
        Retour à la page d'accueil
      </Button>
    </Box>
  );
};

export default NotFoundPage;