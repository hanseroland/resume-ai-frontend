import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBarComponent from './AppBarComponent';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useAuth } from '../../context/authContext';
import { Alert, AlertTitle, CircularProgress, Typography } from '@mui/material';



const ResumeLayout = () => {

  const navigate = useNavigate();
  const { currentUser, isAuthenticated, loading } = useAuth();
  const [userError, setUserError] = useState(null);


  const links = [
    { text: 'Tableau de bord', path: '/', icon: <HomeIcon /> },
    { text: 'Resumes', path: '/resumes', icon: <ContactPageIcon /> },
    { text: 'Profile', path: '/profile', icon: <PersonIcon /> },
  ];

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);


  useEffect(() => {
    // Attendre que le contexte ait fini de charger (vérification initiale du token)
    if (!loading) {
      if (!isAuthenticated) {
        // Si pas authentifié (et `loading` est terminé), redirige vers la connexion
        setUserError("Vous devez être connecté pour accéder à cette section.");
        navigate('/connexion');
      }
    }
  }, [loading, isAuthenticated, currentUser, navigate]);


  // Affichage conditionnel basé sur l'état de chargement et d'erreur 
  // Affiche un spinner pendant le chargement initial du contexte
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>Chargement de l'espace...</Typography>
      </Box>
    );
  }

  // Affiche un message d'erreur si la récupération de l'utilisateur a échoué
  if (userError) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Accès Refusé</AlertTitle>
          {userError}
        </Alert>
      </Box>
    );
  }

  // Si l'utilisateur n'est pas authentifié après le chargement, ne rien rendre.
  if (!currentUser) {
    return null;
  }




  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarComponent
        title="Resume AI"
        open={open}
        drawerWidth={240}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar

        open={open}
        handleDrawerClose={handleDrawerClose}
        links={links}

      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
          backgroundColor: '#f8f8f8',

        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ResumeLayout;


