import { Box, Container, Typography } from '@mui/material'
import ProfileManager from '../components/Layouts/ProfileManager'

function Profile() {
  return (

    <Container>
      <Typography align="center" variant="h4" component="h1" gutterBottom>
        Mon Profil
      </Typography>
      <Typography align="center" variant="body1" component="p" gutterBottom>
        Gérez vos informations personnelles et vos préférences.
      </Typography>

      {/*Tab*/}
      <Box sx={{ bgcolor: 'background.paper', width: '100%', margin: '0 auto', borderRadius: 10 }}>
        <ProfileManager />
      </Box>
    </Container>

  )
}

export default Profile