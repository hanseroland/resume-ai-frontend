import React from 'react';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AdminAddUser } from '../../../api/users';

const AddUserForm = ({setOpenModal,setRefreshTrigger}) => {
  // Schéma de validation Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email invalide')
      .required('L\'email est requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
      .required('La confirmation du mot de passe est requise'),
    isAdmin: Yup.boolean().required(),
  });

  // Soumission du formulaire
  const handleSubmit = async (values, { resetForm }) => {
    try {
     
      // Appel API pour créer un utilisateur
      // Exemple : axios.post('/api/users', values)
      const response = await AdminAddUser(values)
            if(response.success){
               // console.log(response.data)
               
                setRefreshTrigger(prev => !prev);
            }
            resetForm();
            setOpenModal(false);
         } catch (error) {
      //console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          isAdmin: false, // Par défaut, l'utilisateur n'est pas admin
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {/* Champ Email */}
            <Field
              as={TextField}
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            {/* Champ Mot de passe */}
            <Field
              as={TextField}
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              variant="outlined"
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            {/* Champ Confirmation du mot de passe */}
            <Field
              as={TextField}
              fullWidth
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              variant="outlined"
              margin="normal"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            {/* Rôle - Switch pour Admin ou Utilisateur */}
            <Typography>Rôle : </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={values.isAdmin}
                  onChange={(e) => setFieldValue('isAdmin', e.target.checked)}
                />
              }
              label={values.isAdmin ? 'Admin' : 'Utilisateur'}
            />
            {touched.isAdmin && errors.isAdmin && (
              <Typography variant="body2" color="error">
                {errors.isAdmin}
              </Typography>
            )}

            {/* Bouton de soumission */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Ajouter
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUserForm;
