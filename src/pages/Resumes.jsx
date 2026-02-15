
import React, { useEffect, Suspense } from 'react'
import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import AddResumeBtn from '../components/ui/AddResumeBtn';
import { DeleteResume, GetUserResumes } from '../api/resumes';
import ResumeCard from '../components/ui/cards/ResumeCard';
import { useAuth } from '../context/authContext';


function Resumes() {


  const { currentUser } = useAuth();

  const [resumeCreated, setResumeCreated] = React.useState(false)// afficher la notification de CV créé

  const [userResumes, setUserResumes] = React.useState([]); // Stocke les CV de l'utilisateur

  const [loading, setLoading] = React.useState(true); //  données en cours de chargement


  const fetchResumes = async () => {
    try {

      const response = await GetUserResumes(currentUser._id);
      if (response.success) {
        setUserResumes(response.data || []); // Met à jour les CV
      }

    } catch (err) {
      console.error('Erreur lors de la récupération des CV :', err);
    } finally {
      setLoading(false); // Indique que le chargement est terminé
    }
  };

  // useEffect pour récupérer les CV au montage du composant
  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchResumes();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeCreated, currentUser]); // Relance la récupération des CV lorsqu'un nouveau CV est créé


  const removeResume = async (resumeId) => {

    const response = await DeleteResume(resumeId);
    if (response.success) {
      alert("CV supprimé avec succès");
      fetchResumes();
    }
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        minHeight: '100vh',
        width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" }
      }}
    >

      <Box py={4}>
        <Typography fontWeight="bold" component="h2" variant="h4"> Mes CV </Typography>
        <Typography variant="body1">
          Débuter la création de votre CV avec l'IA
        </Typography>
      </Box>
      {
        resumeCreated && (
          <Box py={1} >
            <Alert
              severity="success"
              onClose={() => { setResumeCreated(false) }}
            >
              CV créé
            </Alert>
          </Box>

        )
      }


      <Grid py={2} container spacing={2}>
        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
          <AddResumeBtn
            setResumeCreated={setResumeCreated}
            resumeCreated={resumeCreated}
          />
        </Grid>

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
                    <Grid key={resume._id} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                      <ResumeCard
                        resume={resume}
                        removeResume={removeResume}
                      />
                    </Grid>
                  ))
                  :


                  <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                    <Alert sx={{ height: "40px" }} severity="info"> Aucun CV </Alert>
                  </Grid>

              }

            </>
          )
          }
        </Suspense>

      </Grid>

    </Box >
  )
}

export default Resumes