import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { CreateResume } from '../../api/resumes';
import { SetCurrentResume } from '../../redux/slices/resumeSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';


const ResumeNameForm = ({ setOpenDialog, setResumeCreated, setRefreshTrigger }) => {

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()


  //console.log("first current user", currentUser)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre du CV est obligatoire').trim(),
  });


  // Soumission du formulaire
  const handleSubmit = async (values, { resetForm }) => {
    setOpenDialog(false)
    try {

      const newValues = {
        title: values.title,
        userId: currentUser._id
      };

      // console.log("new valuse",newValues)

      const response = await CreateResume(newValues)
      if (response.success && response.data) {
        dispatch(SetCurrentResume(response.data));
        setResumeCreated(true)
        resetForm()
        setOpenDialog(false)
        navigate(`/resumes/${response.data._id}/edit`)
      } else {
        throw new Error('La réponse de l\'API est invalide.');
      }


    } catch (error) {
      console.error('Erreur lors de la création du CV :', error);
      alert('Une erreur est survenue.');
    }
  };



  return (
    <Box >
      <Formik
        initialValues={{
          title: '',
          userId: currentUser ? currentUser._id : '',

        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Titre du CV"
                  name="title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>



            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="inherit" autoFocus onClick={() => setOpenDialog(false)}>
                Annuler
              </Button>
              <Button sx={{ marginLeft: '5px' }} variant="contained" color="primary" type="submit">
                Créer
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ResumeNameForm;
