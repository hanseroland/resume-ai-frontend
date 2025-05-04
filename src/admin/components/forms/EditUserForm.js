import React from 'react';
import { Box, Button, TextField, } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid2';
import { UpdateUser } from '../../../api/users';



// Schéma de validation Yup
const EditUserSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    phoneNumber: Yup.string(),
    company: Yup.string(),
    jobTitle: Yup.string(),
   // isAdmin: Yup.boolean().required(),
});


const EditUserForm = ({user,setOpenModal,setRefreshTrigger}) => {



    // Soumission du formulaire
    const handleSubmit = async (values, { resetForm }) => {
        try {
            
            const response =  await UpdateUser(user.id,values)
            if(response.success){
               
                setRefreshTrigger(prev => !prev);
            }
            resetForm()
            setOpenModal(false)
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            alert('Une erreur est survenue.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
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
                {({values, errors, touched,setFieldValue }) => (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid size={{xs:12,md:12}}>
                                <Field
                                    as={TextField}
                                    name="name"
                                    label="Nom"
                                    fullWidth
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>


                            <Grid size={{xs:12,md:12}}>
                                <Field
                                    as={TextField}
                                    name="phoneNumber"
                                    label="Téléphone"
                                    fullWidth
                                    error={touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                            </Grid>

                            <Grid size={{xs:12,md:12}}>
                                <Field
                                    as={TextField}
                                    name="company"
                                    label="Entreprise"
                                    fullWidth
                                    error={touched.company && !!errors.company}
                                    helperText={touched.company && errors.company}
                                />
                            </Grid>

                            <Grid size={{xs:12,md:12}}>
                                <Field
                                    as={TextField}
                                    name="jobTitle"
                                    label="Poste"
                                    fullWidth
                                    error={touched.jobTitle && !!errors.jobTitle}
                                    helperText={touched.jobTitle && errors.jobTitle}
                                />
                            </Grid>
                           {/* <Grid size={{xs:12,md:12}}>
                                
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

                            </Grid> */}

                        </Grid>

                        <Box textAlign="center" marginTop={4}>
                            {/* Bouton de soumission */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Modifier
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default EditUserForm;
