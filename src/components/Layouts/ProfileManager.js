import { useState } from 'react';
import {
    Box, Paper, Button, Fade
} from '@mui/material';
import {

    Edit as EditIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import ProfileForm from '../forms/profile/ProfileForm';
import ProfileStatsCard from '../ui/cards/ProfileStatsCard';



const ProfileManager = () => {
    const [isEditing, setIsEditing] = useState(false);


    const softBorders = { borderRadius: '24px' };

    return (
        <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
            {/* BOUTON DE NAVIGATION HAUT DROITE */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    startIcon={isEditing ? <CloseIcon /> : <EditIcon />}
                    sx={{ borderRadius: '12px', textTransform: 'none' }}
                    color={isEditing ? "error" : "primary"}
                >
                    {isEditing ? "Annuler" : "Modifier le profil"}
                </Button>
            </Box>

            {!isEditing ? (
                /* --- VUE CARTE  --- */
                <Fade in={!isEditing}>


                    <Paper elevation={0} sx={{ ...softBorders, p: 4, border: '1px solid #f1f5f9' }}>
                        <ProfileStatsCard />
                    </Paper>

                </Fade>
            ) : (
                /* --- VUE FORMULAIRE --- */
                <Fade in={isEditing}>
                    <Paper elevation={0} sx={{ ...softBorders, p: 4, border: '1px solid #f1f5f9' }}>
                        <ProfileForm />
                    </Paper>
                </Fade>
            )}
        </Box>
    );
};

export default ProfileManager;