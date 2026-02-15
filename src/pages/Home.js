import React, { useEffect, Suspense, useState } from 'react'
import { Alert, Box, CircularProgress, Container } from '@mui/material'
import WelcomeBanner from '../components/ui/cards/WelcomeBanner'
import Grid from "@mui/material/Grid2";
import ResumeDashCard from '../components/ui/cards/ResumeDashCard';
import AddResumeCard from '../components/ui/cards/AddResumeCard';
import QuickActionsCard from '../components/ui/cards/QuickActionsCard';
import CVStylesCard from '../components/ui/charts/CVStylesCard';
import WeeklyActivityCard from '../components/ui/charts/WeeklyActivityCard';
import { useAuth } from '../context/authContext';
import { DeleteResume, GetLatestUserResumes } from '../api/resumes';



function Home() {

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true); //  données en cours de chargement
  const [userResumes, setUserResumes] = useState([]); // Stocke les CV de l'utilisateur


  const fetchResumes = async () => {
    try {
      const response = await GetLatestUserResumes(currentUser._id);
      if (response.success) {
        setUserResumes(response.data || []); // Met à jour les CV
      }

    } catch (err) {
      console.error('Erreur lors de la récupération des CV :', err);
    } finally {
      setLoading(false); // Indique que le chargement est terminé
    }
  };

  const removeResume = async (resumeId) => {
    const response = await DeleteResume(resumeId);
    if (response.success) {
      alert("CV supprimé avec succès");
      fetchResumes();
    }
  }

  // useEffect pour récupérer les CV au montage du composant
  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchResumes();
    } else {
      setLoading(false);
    }
  }, [currentUser]); // Relance la récupération des CV lorsqu'un nouveau CV est créé


  return (
    <>
      <Container maxWidth={false} >
        <Box mt={20}>
          <WelcomeBanner />
        </Box>


        <Grid container spacing={3}>

          <Grid container spacing={2} size={{ xs: 12, sm: 8 }}>
            <Grid container size={{ xs: 12, sm: 12 }}>
              {/**Mes CV Récents  */}
              <Suspense
                fallback={
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                }
              >
                {loading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {
                      userResumes

                        ?
                        userResumes?.map((resume) => (
                          <Grid key={resume._id} size={{ xs: 12, sm: 6 }}>
                            <ResumeDashCard
                              resume={resume}
                              removeResume={removeResume}
                            />
                          </Grid>

                        ))
                        :
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Alert sx={{ height: "40px" }} severity="info"> Aucun CV </Alert>
                        </Grid>
                    }
                  </>
                )
                }
              </Suspense>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AddResumeCard />
              </Grid>
            </Grid>



            {/**Statistiques */}
            <Grid container size={{ xs: 12, sm: 12 }}>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CVStylesCard />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <WeeklyActivityCard />
              </Grid>
            </Grid>

          </Grid>

          {/**Accès rapides */}
          <Grid container size={{ xs: 12, sm: 4 }}>
            <QuickActionsCard />
          </Grid>

        </Grid>

      </Container>
    </>

  )
}

export default Home