import React, { useCallback, useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid2';
import ProfilPictureForm from './forms/ProfilPictureForm';
import { useDispatch } from 'react-redux';
import { GetCurrentUser, UpdateUser } from '../../api/users';
import { SetCurrentUser } from '../../redux/slices/userSlice';


// Styled components for Apple and Samsung inspired design
const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  margin: '0 auto',
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));







const ProfileComponent = ({ user }) => {

  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false)


  // Schéma de validation Yup
  const EditUserSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    phoneNumber: Yup.string(),
    company: Yup.string(),
    jobTitle: Yup.string(),
    // isAdmin: Yup.boolean().required(),
  });

  // Soumission du formulaire
  const handleSubmit = async (values, { resetForm }) => {
    try {

      const response = await UpdateUser(user._id, values)
      if (response.success) {
        getCurrentUser()
      }


    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      alert('Une erreur est survenue.');
    }
  };

  const getCurrentUser = useCallback(async () => {
    // console.log("on est dans dasboard")
    try {
      const response = await GetCurrentUser();
      // console.log("Current user dash", response)
      if (response.success) {
        dispatch(SetCurrentUser(response.data));
        setSuccess(true)
      }
    } catch (error) {
      console.log("erreur de connexion")
    }
  }, [dispatch]);

  return (
    <ProfileContainer>

      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfilPictureForm setSuccess={setSuccess} user={user} />

        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box mb={2}>
            {
              success && (
                <Alert severity="success">Profil mis à jour </Alert>
              )


            }
          </Box>
          <Formik
            initialValues={{
              name: user?.name || '',
              phoneNumber: user?.phoneNumber || '',
              company: user?.company || '',
              jobTitle: user?.jobTitle || '',
              // isAdmin: user?.isAdmin, // Par défaut, l'utilisateur n'est pas admin
            }}
            validationSchema={EditUserSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nom"
                      fullWidth
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>


                  <Grid size={{ xs: 12, md: 6 }}>
                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Téléphone"
                      fullWidth
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Field
                      as={TextField}
                      name="company"
                      label="Entreprise"
                      fullWidth
                      error={touched.company && !!errors.company}
                      helperText={touched.company && errors.company}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Field
                      as={TextField}
                      name="jobTitle"
                      label="Poste"
                      fullWidth
                      error={touched.jobTitle && !!errors.jobTitle}
                      helperText={touched.jobTitle && errors.jobTitle}
                    />
                  </Grid>


                </Grid>

                <Box textAlign="center" marginTop={4}>
                  {/* Bouton de soumission */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{ marginTop: 2 }}
                  >
                    Modifier
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>



    </ProfileContainer>
  );
};

export default ProfileComponent;
