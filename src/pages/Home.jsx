import React from 'react';
import { Alert, Box, CircularProgress, Container } from '@mui/material';
import Grid from "@mui/material/Grid2";
import WelcomeBanner from '../components/ui/cards/WelcomeBanner';
import ResumeDashCard from '../components/ui/cards/ResumeDashCard';
import AddResumeCard from '../components/ui/cards/AddResumeCard';
import QuickActionsCard from '../components/ui/cards/QuickActionsCard';
import CVStylesCard from '../components/ui/charts/CVStylesCard';
import WeeklyActivityCard from '../components/ui/charts/WeeklyActivityCard';
import QuickInformations from '../components/ui/cards/QuickInformations';
import { useAuth } from '../context/authContext';
import { useDashboardData } from '../hooks/useDashboard';
import { useResumes } from '../hooks/useResumes'; // On réutilise le hook de suppression

function Home() {
  const { currentUser } = useAuth();
  
  // Données du dashboard
  const { latestResumes, stats, weeklyActivity, performance, isLoading } = useDashboardData(currentUser?._id);
  
  // On récupère juste la fonction remove du hook global resumes
  const { removeResume } = useResumes(currentUser?._id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ mt: 2, mb: 2 }}>
        <WelcomeBanner />
      </Box>

      <Grid container spacing={3}>
       
        <Grid size={{ xs: 12, sm: 12, md:12, lg:8 }}>
          <Grid container spacing={3}>
            {/* CV Récents */}
            {latestResumes.data?.length > 0 ? (
              latestResumes.data.map((resume) => (
                <Grid key={resume._id} size={{ xs: 12, sm: 6 }}>
                  <ResumeDashCard resume={resume} removeResume={removeResume} />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12, sm: 6 }}>
                <Alert severity="info">Aucun CV récent</Alert>
              </Grid>
            )}

            <Grid size={{ xs: 12, sm: 6 }}>
              <AddResumeCard />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CVStylesCard />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <WeeklyActivityCard
                weeklyData={weeklyActivity.data}
                performance={performance.data}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Barre latérale */}
        <Grid container size={{ xs: 12, sm: 12, md:12, lg:4 }} spacing={2}>
          <Grid size={{ xs: 12, sm:6, md:12, lg:12 }}>
            <QuickInformations counts={stats.data} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6,  md:12, lg:12 }}>
            <QuickActionsCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;