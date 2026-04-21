import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, TextField, Alert, Button } from '@mui/material';
import { useParams, Link as RouterLink } from "react-router-dom";
import { ResetUserPassword } from '../api/auth';
import { useMutation } from '@tanstack/react-query';


const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
        .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas.')
        .required('La confirmation du mot de passe est requise'),
});

const ResetPassword = () => {
    const { token } = useParams();


    // Mutation React Query
    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: (values) => ResetUserPassword(token, values),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        if (!token) {
            // Cas rare où le token serait absent de l'URL
            return;
        }
        mutate(values, {
            onSettled: () => setSubmitting(false)
        });
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', my: 8, p: 3, border: '1px solid #ccc', borderRadius: 2, boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Réinitialiser le mot de passe
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Entrez votre nouveau mot de passe.
            </Typography>

            {/* Message de succès et lien de retour */}
            {isSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {data?.message || "Votre mot de passe a été réinitialisé !"}
                    <Button 
                        component={RouterLink} 
                        to="/connexion" 
                        sx={{ display: 'block', mt: 1, textTransform: 'none' }}
                    >
                        Retour à la connexion
                    </Button>
                </Alert>
            )}

            {/* Message d'erreur */}
            {(isError || (!token && !isSuccess)) && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error?.message || "Jeton de réinitialisation manquant ou invalide."}
                </Alert>
            )}

            {/* Affichage du formulaire uniquement si pas encore de succès */}
            {!isSuccess && token && (
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Field
                                name="password"
                                as={TextField}
                                label="Nouveau mot de passe"
                                type="password"
                                fullWidth
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ mb: 2 }}
                            />
                            <Field
                                name="confirmPassword"
                                as={TextField}
                                label="Confirmer le mot de passe"
                                type="password"
                                fullWidth
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
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
                                {isPending ? "Réinitialisation..." : "Changer le mot de passe"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            )}
        </Box>
    );
};

export default ResetPassword;