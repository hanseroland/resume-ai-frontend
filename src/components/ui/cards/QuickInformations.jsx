import {
    Box,
    Typography,
    Paper,
    ButtonBase
} from '@mui/material';
import Grid from "@mui/material/Grid2";




const ActionButton = ({ action, value }) => (
    <ButtonBase
        sx={{
            width: '100%',
            p: 2,
            borderRadius: '20px',
            bgcolor: action.bgColor,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
        }}
    >
        {/* Affichage du chiffre dynamique */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: action.textColor, lineHeight: 1 }}>
            {value}
        </Typography>
        <Typography
            variant="caption"
            sx={{
                fontWeight: 700,
                color: action.textColor,
                fontSize: { xs: '0.65rem', sm: '0.75rem' }
            }}
        >
            {action.title}
        </Typography>
    </ButtonBase>
);

const QuickInformations = ({ counts }) => {


    // Configuration mappée sur les données reçues
    const ACTIONS = [
        { title: 'Mes CV', icon: 'stars_icon_255337.png', bgColor: '#eef7ff', textColor: '#0ea5e9', val: counts?.user },
        { title: 'Total CV', icon: 'direction_arrow_multimedia_option_inport_insert_icon_267818.png', bgColor: '#f0fff4', textColor: '#22c55e', val: counts?.all },
        { title: 'Utilisateurs', icon: 'link_icon_152591.png', bgColor: '#fff1f2', textColor: '#f43f5e', val: counts?.users },
        { title: 'Admins', icon: 'robot_icon-icons.com_60269.png', bgColor: '#f5f3ff', textColor: '#8b5cf6', val: counts?.admins },
    ];


    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: '28px',
                border: '1px solid #f1f5f9',
                height: 300,
                backgroundColor: '#26363fe7',
            }}
        >
            <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 3, color: '#f0f3f8' }}
            >
                Informations Rapides
            </Typography>

            <Grid container spacing={2}>

                {ACTIONS.map((action, index) => (
                    <Grid key={index} size={{ xs: 6 }}>
                        <ActionButton action={action} value={action.val ?? '...'} />
                    </Grid>
                ))}

            </Grid>
        </Paper>
    );
};

export default QuickInformations;