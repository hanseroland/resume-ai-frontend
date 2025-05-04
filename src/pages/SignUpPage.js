import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, TextField, Typography, Box, IconButton } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RegisterUser } from "../api/auth";
import { useNavigate } from 'react-router-dom';



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
  const [message, setMessage] = useState('');



  const handleRegister = useCallback(async (obj) => {
    try {

      if (obj.password === obj.confirmPassword) {
        const response = await RegisterUser(obj);
        if (response.success) {
            setMessage(response.message);
            //localStorage.setItem("token", response.token);
            navigate('/connexion');

        } else {
          console.log(response.message)
        }
      } else {
        
        console.log("Les mots de passe ne correspondent pas");
      }
    } catch (error) {

        console.log("Erreur lors de l'inscription :", error.message);
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

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
        {({ errors, touched, isSubmitting }) => (
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
              disabled={isSubmitting}
              sx={{
                fontWeight: "bold",
                padding: { xs: "4px 8px", md: "4px 8px", sm: "4px 8px" },
                borderRadius: "8px",
                textTransform: "none",
                fontSize:{xs:'12px',md:'16px',sm:'16px'},
                
              }}
            >
              Créer un compte
            </Button>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ou
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ textTransform: "none", mb: 1 }}
            >
              S'inscrire avec Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ textTransform: "none" }}
            >
              S'inscrire avec Facebook
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