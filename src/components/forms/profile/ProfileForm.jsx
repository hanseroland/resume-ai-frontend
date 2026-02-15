import {
    Box, Typography, Avatar,
    TextField, Button,
} from '@mui/material';
import {
    Save as SaveIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";


// Schéma de validation conforme au modèle Mongoose
const validationSchema = Yup.object({
    name: Yup.string().trim().required('Requis'),
    email: Yup.string().email('Email invalide').required('Requis'),
    profilePicture: Yup.string().url('URL invalide'),

});

const ProfileForm = ({ initialUser }) => {

    const formik = useFormik({
        initialValues: {
            name: initialUser?.name || 'Sarah Anderson',
            email: initialUser?.email || 'sarah.anderson@example.com',
            profilePicture: initialUser?.profilePicture || 'https://picsum.photos/200',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Mise à jour de l'utilisateur...", values);

        },
    });

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: '#f8fafd',
            '& fieldset': { borderColor: '#e1effe' },
        },
        '& .MuiInputLabel-root': { color: '#94a3b8', ml: 1 }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>



            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                    {/* Avatar Edit */}
                    <Grid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'center' }}>
                        <Avatar src={formik.values.profilePicture} sx={{ width: 70, height: 70, mx: 'auto', mb: 1 }} />
                        <Typography variant="caption" display="block" color="text.secondary">
                            Cliquez sur l'avatar pour changer l'image
                        </Typography>
                    </Grid>

                    {/* Inputs Principaux */}
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Typography variant="caption" sx={{ ml: 1, color: '#94a3b8' }}>Nom complet</Typography>
                        <TextField
                            fullWidth
                            name="name"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            sx={inputStyle}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Typography variant="caption" sx={{ ml: 1, color: '#94a3b8' }}>Email</Typography>
                        <TextField
                            fullWidth
                            name="email"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* URL et Switch Admin */}
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Typography variant="caption" sx={{ ml: 1, color: '#94a3b8' }}>URL de l'image de profil</Typography>
                        <TextField
                            fullWidth
                            name="profilePicture"
                            variant="outlined"
                            value={formik.values.profilePicture}
                            onChange={formik.handleChange}
                            sx={inputStyle}
                        />
                    </Grid>


                    {/* Bouton Enregistrer */}
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{
                                py: 1.5,
                                borderRadius: '20px',
                                bgcolor: '#b4cff0',
                                color: '#43506c',
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#9fbce4', boxShadow: 'none' }
                            }}
                        >
                            Enregistrer les modifications
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Box>
    );
};

export default ProfileForm;