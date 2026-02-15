import { Box, Typography, Paper, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useAuth } from '../../../context/authContext';

const WelcomeBanner = () => {


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { currentUser } = useAuth();


    const bannerStyle = {
        p: { xs: 2, sm: 3 },
        mb: 4,
        borderRadius: '24px',
        background: 'linear-gradient(90deg, #eef7ff 0%, #d2f7cd 50%, #f1d8f7 100%)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        width: '100%',
        boxSizing: 'border-box'
    };



    return (
        <Paper elevation={0} sx={bannerStyle}>
            <Stack
                spacing={isMobile ? 2 : 0.5}
                alignItems={isMobile ? "center" : "flex-start"}
                textAlign={isMobile ? "center" : "left"}
            >
                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                        fontWeight: 800,
                        color: '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    Bonjour, {currentUser?.name || 'John Doe'} ! 👋
                </Typography>

                <Stack
                    direction={isMobile ? "column" : "row"}
                    spacing={1.5}
                    alignItems="center"
                >
                    {/* Conteneur de l'icône pour assurer sa taille sur mobile */}
                    <Box
                        component="img"
                        src="/images/stars_icon_255337.png"
                        alt="AI Insight"
                        sx={{
                            width: 28,
                            height: 28,
                            minWidth: 28,
                            objectFit: 'contain',
                            // Petit effet de flottement léger
                            animation: 'float 3s ease-in-out infinite',
                            '@keyframes float': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-3px)' },
                            }
                        }}
                    />

                    <Typography
                        variant="body2"
                        sx={{
                            color: '#64748b',
                            fontStyle: 'italic',
                            fontWeight: 500,
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            lineHeight: 1.4
                        }}
                    >
                        AI Insight: "Fais briller ton profil : sois le récit de ton propre succès. Un CV vivant et authentique est la clé vers ton prochain grand défi ! 🚀"
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default WelcomeBanner;