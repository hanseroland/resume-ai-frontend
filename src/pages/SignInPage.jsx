import { useCallback, useEffect, useState } from "react";
import { Button, TextField, Typography, Box, IconButton, CircularProgress, Alert } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";


// Schéma de validation pour la connexion
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});

const SignInPage = () => {

  const navigate = useNavigate();
  const { login, isAuthenticated, currentUser, loading } = useAuth();
  const [loginError, setLoginError] = useState(null);
  // eslint-disable-next-line 
  const [isAuthenticating, setIsAuthenticating] = useState(false);



  const handleSignin = useCallback(async (values) => {
    setIsAuthenticating(true);
    setLoginError(null);

    try {
      const userData = await login(values); // Attend la réponse de la fonction login
      if (userData) { // Si la connexion a réussi
        navigate('/');
      } else {
        // Gérer le cas où la fonction login ne renvoie pas d'erreur mais ne renvoie pas non plus de données
        setLoginError("Échec de la connexion.");
      }
    } catch (error) {
      setLoginError(error.message || "Échec de la connexion");
    } finally {
      setIsAuthenticating(false);
    }
  }, [login, navigate]);


  // useEffect pour rediriger si déjà connecté (le contexte gère l'état d'authentification)
  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Si déjà authentifié, redirige vers le tableau de bord
      navigate('/');
    }
  }, [loading, isAuthenticated, currentUser, navigate]);


  // Afficher un spinner si le contexte est en cours de chargement initial
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
      <IconButton href="/" sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      {/* Bouton pour changer de thème */}

      <Typography variant="h4" component="h1" gutterBottom>
        Connexion
      </Typography>
      {/* Affichage des messages d'erreur */}
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSignin}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{

                color: "text.primary",
                fontWeight: "bold",
                padding: { xs: "4px 8px", md: "4px 8px", sm: "4px 8px" },
                borderRadius: "8px",
                textTransform: "none",
                fontSize: { xs: "12px", md: "16px", sm: "16px" },

              }}
            >
              Se connecter
            </Button>
            <Typography variant="body2" sx={{ mb: 1, mt: 2 }}>
              ou
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Vous n'avez pas de compte ?{" "}
              <a href="/inscription" style={{ color: "blue", textDecoration: "none" }}>
                Inscrivez-vous
              </a>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, mt: 2 }}>
              Mot de passe oublié ?{" "}
              <a href="/forgot-password" style={{ color: "blue", textDecoration: "none" }}>
                Réinitialisez-le
              </a>
            </Typography>
            {/* <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ textTransform: "none", mb: 1 }}
            >
              Connexion avec Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ textTransform: "none" }}
            >
              Connexion avec Facebook
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Vous n'avez pas de compte ?{" "}
              <a href="/#/inscription" style={{ color: "blue", textDecoration: "none" }}>
                Inscrivez-vous
              </a>
            </Typography>*/}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignInPage;