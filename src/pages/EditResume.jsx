import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ResumeFormSectionWrapper from "../components/sections/ResumeFormSection";
import ResumePreview from "../components/ui/preview/ResumePreview";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import { GetOneResume } from "../api/resumes";
import { ResumeStyleContext } from "../context/ResumeStyleContext";
import Grid from '@mui/material/Grid2';


function EditResume() {
  const params = useParams();
  const [resumeData, setResumeData] = useState();
  const [loading, setLoading] = useState(true);
  const [cvColor, setCvColor] = useState("#000");

  // Fonction pour récupérer le CV
  const fetchCurrentResume = async () => {
    try {
      const response = await GetOneResume(params?.resumeId);
      setResumeData(response.data || {});
    } catch (err) {
      console.error('Erreur lors de la récupération du CV :', err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect pour récupérer le CV au montage du composant
  useEffect(() => {
    if (params?.resumeId) {
      fetchCurrentResume();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResumeStyleContext.Provider value={{ cvColor, setCvColor }}>
      <ResumeInfoContext.Provider value={{ resumeData, setResumeData }}>
        <Box py={1} px={1}>
          <Grid container spacing={2}>
            {/* Formulaire */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  p: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                  </Box>
                ) : (
                  <ResumeFormSectionWrapper resumeId={params?.resumeId} />
                )}
              </Box>
            </Grid>

            {/* Aperçu du CV */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  maxHeight: "calc(100vh - 64px)", //
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