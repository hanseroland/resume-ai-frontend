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
import { CountAllResume, CountAllResumeByWeeklyActivity, CountAllResumeByWeeklyPerformance, CountUserResume, DeleteResume, GetLatestUserResumes } from '../api/resumes';
import QuickInformations from '../components/ui/cards/QuickInformations';
import { GetTotalAdmins, GetTotalUsers } from '../api/users';



function Home() {

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true); //  données en cours de chargement
  const [userResumes, setUserResumes] = useState([]); // Stocke les CV de l'utilisateur
  const [counts, setCounts] = useState({ user: 0, all: 0, users: 0, admins: 0 });
  const [weeklyData, setWeeklyData] = useState([]);
  const [performance, setPerformance] = useState({ value: 0, isPositive: true });

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

  const fetchCounts = async () => {
    try {
      // On lance tous les appels en parallèle pour gagner du temps
      const [userRes, allRes, totalUsersRes, adminsRes] = await Promise.all([
        CountUserResume(currentUser._id),
        CountAllResume(),
        GetTotalUsers(),
        GetTotalAdmins()
      ]);

      setCounts({
        user: userRes.count || 0,
        all: allRes.count || 0,
        users: totalUsersRes.count || 0,
        admins: adminsRes.count || 0
      });
    } catch (err) {
      console.error("Erreur compteurs:", err);
    }
  };


  // Récupérer les données d'activité hebdomadaire et de performance au montage du composant
  useEffect(() => {
    const fetchStats = async () => {
      const response = await CountAllResumeByWeeklyActivity();
      if (response.success) setWeeklyData(response.data);
    };
    fetchStats();
  }, []);


  // Récupérer les données de performance hebdomadaire au montage du composant
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await CountAllResumeByWeeklyPerformance();
        if (res.success) {
          setPerformance({
            value: res.performance,
            isPositive: res.performance >= 0
          });
        }
      } catch (err) {
        console.error("Erreur performance:", err);
      }
    };

    fetchPerformance();
  }, []);

  // useEffect pour récupérer les compteurs au montage du composant et à chaque changement de l'utilisateur
  useEffect(() => {
    if (currentUser?._id) fetchCounts();
  }, [currentUser]);

  // useEffect pour récupérer les CV au montage du composant
  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchResumes();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // Relance la récupération des CV lorsqu'un nouveau CV est créé


  return (
    <>
      <Container maxWidth={false} >
        <Box sx={{ mt: 2, mb: 2 }} >
          <WelcomeBanner />
        </Box>


        <Grid container spacing={3}>

          <Grid size={{ xs: 12, sm: 8 }}>
            <Grid container spacing={3}>
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


              <Grid size={{ xs: 12, sm: 6 }}>
                <CVStylesCard />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <WeeklyActivityCard
                  weeklyData={weeklyData}
                  performance={performance}
                />
              </Grid>

            </Grid>





          </Grid>

          {/**Accès rapides */}
          <Grid container size={{ xs: 12, sm: 4 }} spacing={2}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <QuickInformations counts={counts} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <QuickActionsCard />
            </Grid>

          </Grid>

        </Grid>

      </Container>
    </>

  )
}

export default Home