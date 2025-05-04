import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Grid from '@mui/material/Grid2';
import { GetTotalRecentUsers, GetTotalUsers } from '../../api/users';
import { GetCountActiveCards, GetCountNonActiveCards } from '../../api/cards';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    recentUsers: 0,
    activeCards: 0,
    inactiveCards: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    const fetchStats = async () => {
      try {
        const totalUsers = await GetTotalUsers()
        const recentUsers = await GetTotalRecentUsers();
        const activeCards = await GetCountActiveCards();
        const inactiveCards = await GetCountNonActiveCards();
        setStats({
          totalUsers: totalUsers.count,
          recentUsers: recentUsers.count,
          activeCards: activeCards.count,
          inactiveCards: inactiveCards.count,
        });
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques', error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4} sx={{minHeight: '100vh' }}>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        textAlign="left"
        fontWeight="bold"
        color="primary"
      >
        Bienvenue sur le Tableau de bord
      </Typography>

      <Grid container spacing={4}>
        {/* Total Utilisateurs */}
        <Grid size={{ xs: 6, md: 3 }} >
          <Card sx={{ borderRadius: 3, boxShadow: 4,width:'100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CardMedia>
                <PeopleIcon color="primary" sx={{ fontSize: 50 }} />
              </CardMedia>
              <Typography variant="h6" fontWeight="bold">
                Total Utilisateurs
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Utilisateurs récents */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 4,width:"100%" }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CardMedia>
                <RecentActorsIcon color="success" sx={{ fontSize: 50 }} />
              </CardMedia>
              <Typography variant="h6" fontWeight="bold">
                Utilisateurs récents
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {stats.recentUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Cartes Actives */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow:4 , width:'100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CardMedia>
                <CreditCardIcon color="success" sx={{ fontSize: 50 }} />
              </CardMedia>
              <Typography variant="h6" fontWeight="bold">
                Cartes Actives
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {stats.activeCards}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Cartes Non Actives */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, width:'100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CardMedia>
                <DoNotDisturbIcon color="error" sx={{ fontSize: 50 }} />
              </CardMedia>
              <Typography variant="h6" fontWeight="bold">
                Cartes Non Actives
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {stats.inactiveCards}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
