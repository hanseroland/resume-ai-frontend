import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, TextField, Alert, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Pour la navigation SPA
import { ForgotPasswordRequest } from '../api/auth';
import { useMutation } from '@tanstack/react-query';


// Schéma de validation pour l'email
const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("L'email est requis"),
});

const ForgotPassword = () => {
    // Mutation React Query
    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: ForgotPasswordRequest,
    });

    const handleSubmit = (values, { setSubmitting }) => {
        mutate(values, {
            onSettled: () => setSubmitting(false)
        });
    };

    return (
        <Box
            sx={
                {
                    maxWidth: 400,
                    mx: 'auto',
                    my: 8,
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Mot de passe oublié
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Entrez votre email pour recevoir un lien de réinitialisation.
            </Typography>

            {/* Alertes basées sur l'état de la mutation */}
            {isSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {data?.message || "Lien de réinitialisation envoyé !"}
                </Alert>
            )}

            {isError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error.message}
                </Alert>
            )}

            {/* On cache le formulaire si le mail est envoyé avec succès */}
            {!isSuccess && (
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Field
                                name="email"
                                as={TextField}
                                label="Email"
                                fullWidth
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting || isPending}
                                sx={{

                                    color: "text.primary",
                                    fontWeight: "bold",
                                    padding: { xs: "4px 8px", md: "4px 8px", sm: "4px 8px" },
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontSize: { xs: "12px", md: "16px", sm: "16px" },

                                }}
                            >
                                {isPending ? "Envoi..." : "Envoyer le lien"}
                            </Button>

                        </Form>
                    )}
                </Formik>
            )}

            <Typography variant="body2" sx={{ mt: 2 }}>
                {/* RouterLink pour ne pas perdre le cache de l'app */}
                <Button component={RouterLink} to="/connexion" sx={{ textTransform: 'none' }}>
                    Retour à la connexion
                </Button>
            </Typography>
        </Box>
    );
};

export default ForgotPassword;