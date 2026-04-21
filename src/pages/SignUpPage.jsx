import { useCallback, useEffect, useState } from "react";
import { Button, TextField, Typography, Box, IconButton, Alert, AlertTitle, CircularProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../api/auth";
import { useAuth } from "../context/authContext";



const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Le nom est requis"),
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

const SignupPage = () => {

  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  
  // Mutation React Query pour gérer l'inscription
  const { mutate, isPending, error, isSuccess, data } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      // Optionnel : rediriger après un petit délai
      setTimeout(() => navigate('/connexion'), 3000);
    }
  });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [loading, isAuthenticated, navigate]);


  const handleRegister = (values) => {
    // On n'envoie pas confirmPassword au backend
    const { confirmPassword, ...userData } = values;
    mutate(userData);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>Vérification de la session...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        bgcolor: "background.default",
      }}
    >
      <Box>

      </Box>
      <IconButton href="/" sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" component="h1" gutterBottom>
        Inscription
      </Typography>

      {/* Message de succès */}
      {isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <AlertTitle>Succès</AlertTitle>
          {data?.message || "Compte créé avec succès ! Redirection..."}
        </Alert>
      )}

      {/* Message d'erreur */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Erreur</AlertTitle>
          {error.message}
        </Alert>
      )}

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Field
                name="name"
                as={TextField}
                fullWidth
                label="Nom complet"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="email"
                as={TextField}
                fullWidth
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="password"
                as={TextField}
                fullWidth
                label="Mot de passe"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="confirmPassword"
                as={TextField}
                fullWidth
                label="Confirmer le mot de passe"
                type="password"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isPending || isSuccess}
              sx={{
                fontWeight: "bold",
                padding: { xs: "4px 8px", md: "4px 8px", sm: "4px 8px" },
                borderRadius: "8px",
                textTransform: "none",
                fontSize: { xs: '12px', md: '16px', sm: '16px' },

              }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : "Créer un compte"}
            </Button>
           
            <Typography variant="body2" sx={{ mt: 2 }}>
              Vous avez déjà un compte ?{" "}
              <a href="/#/connexion" style={{ color: "blue", textDecoration: "none" }}>
                Se connecter
              </a>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignupPage;