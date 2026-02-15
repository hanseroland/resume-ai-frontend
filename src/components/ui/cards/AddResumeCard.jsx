import { Box, Typography, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';

const AddResumeCard = () => {
    return (
        <Link
            to={`/resumes`}
            style={{
                textDecoration: 'none',
            }}
        >
            <ButtonBase
                component="div"
                sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 500 },
                    height: '100%',
                    minHeight: { xs: 150, sm: 150 },
                    borderRadius: '28px',
                    display: 'block'
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed #bde0fe',
                        borderRadius: '28px',
                        bgcolor: 'rgba(238, 247, 255, 0.3)',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        gap: 1.5,
                        '&:hover': {
                            bgcolor: 'rgba(190, 224, 254, 0.2)',
                            borderColor: '#0ea5e9',
                            transform: 'scale(1.01)',
                        },
                    }}
                >

                    <Box
                        component="img"
                        src="/images/listadd_104393.png"
                        alt="Ajouter"
                        sx={{
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            opacity: 0.7
                        }}
                    />

                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 700,
                            color: '#0ea5e9',
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                    >
                        Nouveau CV
                    </Typography>
                </Box>
            </ButtonBase>
        </Link>
    );
};

export default AddResumeCard;