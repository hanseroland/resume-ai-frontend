import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Chip,
  Grid
} from '@mui/material';
import {
  Description as CvIcon,
  CheckCircle as VerifiedIcon,
  MailOutline as MailIcon,
  ShieldOutlined as ShieldIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/authContext';

const ProfileStatsCard = ({ user }) => {
  const { currentUser } = useAuth();
  const styles = {
    mainContainer: {
      p: 4,
      borderRadius: '24px',
      bgcolor: '#fff',
      maxWidth: 700,
    },
    headerBox: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      mb: 4
    },
    avatar: {
      width: 80,
      height: 80,
      boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
      border: '4px solid #fff'
    },
    infoChip: {
      bgcolor: '#f0f2f5',
      color: '#64748b',
      borderRadius: '12px',
      fontWeight: 500,
      '& .MuiChip-icon': { color: '#64748b' }
    },
    cardCv: {
      p: 3,
      borderRadius: '24px',
      bgcolor: '#fff5f8', // Rose pastel très léger
      border: '1px solid #fceef2',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    },
    cardStatus: {
      p: 3,
      borderRadius: '24px',
      bgcolor: '#f0f7ff', // Bleu pastel très léger
      border: '1px solid #e1effe',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    },
    iconBox: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      color: '#475569',
      mb: 1
    }
  };

  return (
    <Box sx={styles.mainContainer}>
      {/* --- SECTION ENTÊTE --- */}
      <Box sx={styles.headerBox}>
        <Avatar
          src={user?.profilePicture}
          alt={currentUser?.name}
          sx={styles.avatar}
        />
        <Stack spacing={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#43506c' }}>
            {currentUser?.name || 'Sarah Anderson'}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ color: '#94a3b8' }}>
            <MailIcon fontSize="small" />
            <Typography variant="body1">
              {currentUser?.email || 'sarah.anderson@example.com'}
            </Typography>
          </Stack>
          <Box sx={{ mt: 1 }}>
            <Chip
              icon={<ShieldIcon style={{ fontSize: 18 }} />}
              label="Compte Sécurisé"
              sx={styles.infoChip}
            />
          </Box>
        </Stack>
      </Box>

      {/* --- SECTION STATISTIQUES --- */}
      <Grid container spacing={3}>
        {/* Carte CVs */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={styles.cardCv}>
            <Box sx={styles.iconBox}>
              <CvIcon />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>CVs Créés</Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 400, color: '#f9a8d4' }}>
              {user?.resumes?.length || 2}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Gérez vos CVs dans l'onglet dédié.
            </Typography>
          </Paper>
        </Grid>

        {/* Carte Statut */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={styles.cardStatus}>
            <Box sx={styles.iconBox}>
              <VerifiedIcon color="action" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Statut du compte</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#64748b', mt: 1 }}>
              {user?.isAdmin ? 'Administrateur' : 'Utilisateur Standard'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Membre depuis {new Date(user?.createdAt).getFullYear() || 2024}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileStatsCard;