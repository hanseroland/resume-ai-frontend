import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ResumeFormSectionWrapper from "../components/sections/ResumeFormSection";
import ResumePreview from "../components/ui/preview/ResumePreview";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import { GetOneResume } from "../api/resumes";
import { ResumeStyleContext } from "../context/ResumeStyleContext";
import Grid from '@mui/material/Grid2';
import { useQuery } from "@tanstack/react-query";


function EditResume() {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState();
  const [cvColor, setCvColor] = useState("#000");

  // 1. Récupération des données avec React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['resume', resumeId],
    queryFn: () => GetOneResume(resumeId),
    enabled: !!resumeId,
    staleTime: 10000, // On garde les données "fraîches" 10s
  });

  // 2. Synchronisation du cache vers l'état local du contexte
  // Cela permet d'avoir les données initiales tout en gardant la possibilité de les modifier localement
  useEffect(() => {
    if (data?.data) {
      setResumeData(data.data);
      // Si une couleur est définie dans le CV, on l'applique
      if (data.data.themeColor) setCvColor(data.data.themeColor);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4}>
        <Alert severity="error">Erreur lors du chargement du CV : {error.message}</Alert>
      </Box>
    );
  }

  return (
    <ResumeStyleContext.Provider value={{ cvColor, setCvColor }}>
      <ResumeInfoContext.Provider value={{ resumeData, setResumeData }}>
        <Box py={1} px={1}>
          <Grid container spacing={2}>
            {/* Formulaire d'édition*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  p: 2,
                  backgroundColor: "#ffffff",
                  minHeight: "calc(100vh - 100px)"
                }}
              >
               
                  <ResumeFormSectionWrapper resumeId={resumeId} />
                
              </Box>
            </Grid>

            {/* Aperçu en temps réel */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
               sx={{
                  position: "sticky",
                  top: 20,
                  maxHeight: "calc(100vh - 40px)",
                  overflowY: "auto",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  p: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                <ResumePreview />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ResumeInfoContext.Provider>
    </ResumeStyleContext.Provider>
  );
}

export default EditResume;