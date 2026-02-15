import {
    Box,
    Typography,
    Paper,
    ButtonBase
} from '@mui/material';
import Grid from "@mui/material/Grid2";


// Configuration des boutons pour faciliter la maintenance
const ACTIONS = [
    {
        title: 'Créer un CV',
        icon: 'stars_icon_255337.png',
        bgColor: '#eef7ff',
        textColor: '#0ea5e9'
    },
    {
        title: 'Importer PDF',
        icon: 'direction_arrow_multimedia_option_inport_insert_icon_267818.png',
        bgColor: '#f0fff4',
        textColor: '#22c55e'
    },
    {
        title: 'Partager',
        icon: 'link_icon_152591.png',
        bgColor: '#fff1f2',
        textColor: '#f43f5e'
    },
    {
        title: 'Support IA',
        icon: 'robot_icon-icons.com_60269.png',
        bgColor: '#f5f3ff',
        textColor: '#8b5cf6'
    },
];

const ActionButton = ({ action }) => (
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
        <Box
            component="img"
            src={`/images/${action.icon}`}
            sx={{ width: { xs: 24, sm: 30 }, height: 'auto' }}
        />
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

const QuickActionsCard = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: '28px',
                border: '1px solid #f1f5f9',
                height: 300
            }}
        >
            <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}
            >
                Actions Rapides
            </Typography>

            <Grid container spacing={2}>
                {ACTIONS.map((action, index) => (
                    <Grid item size={{ xs: 6 }} key={index}>
                        <ActionButton action={action} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default QuickActionsCard;