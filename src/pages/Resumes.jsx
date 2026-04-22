import React from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddResumeBtn from '../components/ui/AddResumeBtn';
import ResumeCard from '../components/ui/cards/ResumeCard';
import { useAuth } from '../context/authContext';
import { useResumes } from '../hooks/useResumes';

function Resumes() {
  const { currentUser } = useAuth();
  
  // On utilise notre nouveau hook
  const { resumes, isLoading, removeResume,isDeleting, error } = useResumes(currentUser?._id);

  // Pour la notification de succès (optionnel, on peut aussi l'automatiser)
  const [resumeCreated, setResumeCreated] = React.useState(false);

  const handleRemove = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce CV ?")) {
      removeResume(id);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, minHeight: '100vh', width: "100%" }}>
      
      <Box py={4} textAlign="center">
        <Typography fontWeight="bold" component="h2" variant="h4"> Mes CV </Typography>
        <Typography variant="body1">Débuter la création de votre CV avec l'IA</Typography>
      </Box>

      {resumeCreated && (
        <Box py={1}>
          <Alert severity="success" onClose={() => setResumeCreated(false)}>CV créé</Alert>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error.message}</Alert>
      )}

      <Grid container spacing={2} sx={{ width: '100%', maxWidth: '1200px' }}>
        <Grid size={{ lg: 3, md: 4, sm: 4, xs: 6 }}>
          <AddResumeBtn 
            setResumeCreated={setResumeCreated} 
            userId={currentUser?._id} // On passe l'ID pour que le bouton puisse invalider le cache
          />
        </Grid>

        {isLoading ? (
          <Box display="flex" justifyContent="center" width="100%" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {resumes && resumes.length > 0 ? (
              resumes.map((resume) => (
                <Grid key={resume._id} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                  <ResumeCard 
                    resume={resume} 
                    removeResume={handleRemove}
                    isLoading={isDeleting}
                    
                    />
                </Grid>
              ))
            ) : (
              <Grid size={{ lg: 9, md: 8, sm: 8, xs: 12 }}>
                <Alert severity="info">Aucun CV trouvé. Commencez par en créer un !</Alert>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default Resumes;