import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { UpdateCard } from '../../../api/cards';


const EditCardForm = ({ card, setOpenModal, setRefreshTrigger }) => {


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est obligatoire').trim(),
    position: Yup.string().required('Le poste est obligatoire').trim(),
    company: Yup.string().required('L\'entreprise est obligatoire').trim(),
    email: Yup.string()
      .required('L\'email est obligatoire')
      .email('Veuillez fournir une adresse email valide'),
    phone: Yup.string()
      .required('Le numéro de téléphone est obligatoire')
      .matches(/^[0-9\s+-]+$/, 'Veuillez fournir un numéro valide'),
    portfolio: Yup.string().url('Veuillez fournir une URL valide'),
    website: Yup.string().url('Veuillez fournir une URL valide'),
    linkedIn: Yup.string().url('Veuillez fournir une URL valide'),
    github: Yup.string().url('Veuillez fournir une URL valide'),
    instagram: Yup.string().url('Veuillez fournir une URL valide'),
    telegram: Yup.string().url('Veuillez fournir une URL valide'),
    twitter: Yup.string().url('Veuillez fournir une URL valide'),
    whatsapp: Yup.string().url('Veuillez fournir une URL valide'),
    nfcId: Yup.string().required('L\'ID NFC est obligatoire').trim(),
    activated: Yup.boolean().required(),
  });


  // Soumission du formulaire
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newValues = {
        name: values.name,
        position: values.position,
        company: values.company,
        email: values.email,
        phone: values.phone,
        portfolio: values.portfolio,
        website: values.website,
        nfcId:values.nfcId,
        socialLinks: {
          linkedIn: values.linkedIn,
          github: values.github,
          instagram: values.instagram,
          telegram: values.telegram,
          twitter: values.twitter,
          whatsapp: values.whatsapp,
        },
        activated:values.activated
       
      };
     
      const response = await UpdateCard(card.id, newValues)
      if (response.success) {
         console.log("oui success")
         setRefreshTrigger(prev => !prev);
      }
      resetForm()
      setOpenModal(false)
    } catch (error) {
      console.error('Erreur lors de la modification de la carte :', error);
      alert('Une erreur est survenue.');
    }
  };



  return (
    <Box >
      <Formik
        initialValues={{
            name: card?.name || '',
            position:  card?.position || '',
            company: card?.company || '',
            email: card?.email || '',
            phone: card?.phone || '',
            nfcId: card?.nfcId || '',
            portfolio: card?.portfolio || '',
            website: card?.website || '',
            linkedIn: card?.socialLinks?.linkedIn || '',
            github: card?.socialLinks?.github || '',
            instagram: card?.socialLinks?.instagram || '',
            telegram: card?.socialLinks?.telegram || '',
            twitter: card?.socialLinks?.twitter || '',
            whatsapp: card?.socialLinks?.whatsapp || '',
            activated: card?.activated
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
            
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Nom"
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Poste"
                  name="position"

                  error={touched.position && Boolean(errors.position)}
                  helperText={touched.position && errors.position}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Entreprise"
                  name="company"

                  error={touched.company && Boolean(errors.company)}
                  helperText={touched.company && errors.company}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email Pro"
                  name="email"

                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Téléphone"
                  name="phone"

                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="ID NFC"
                  name="nfcId"
                  error={touched.nfcId && Boolean(errors.nfcId)}
                  helperText={touched.nfcId && errors.nfcId}
                />
              </Grid>
              {/*<Grid item size={{xs:12,md:12}}>
          <Field
                                    as={TextField}
            fullWidth
            label="Avatar (URL)"
            name="avatar"
           
            error={touched.avatar && Boolean(errors.avatar)}
            helperText={touched.avatar && errors.avatar}
          />
        </Grid>*/}
              <Grid size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Portfolio (URL)"
                  name="portfolio"
                  error={touched.portfolio && Boolean(errors.portfolio)}
                  helperText={touched.portfolio && errors.portfolio}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Site Web (URL)"
                  name="website"

                  error={touched.website && Boolean(errors.website)}
                  helperText={touched.website && errors.website}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="LinkedIn (URL)"
                  name="linkedIn"

                  error={touched.linkedIn && Boolean(errors.linkedIn)}
                  helperText={touched.linkedIn && errors.linkedIn}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="GitHub (URL)"
                  name="github"

                  error={touched.github && Boolean(errors.github)}
                  helperText={touched.github && errors.github}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Instagram (URL)"
                  name="instagram"

                  error={touched.instagram && Boolean(errors.instagram)}
                  helperText={touched.instagram && errors.instagram}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Telegram (URL)"
                  name="telegram"
                  error={touched.telegram && Boolean(errors.telegram)}
                  helperText={touched.telegram && errors.telegram}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Twitter (URL)"
                  name="twitter"
                  error={touched.twitter && Boolean(errors.twitter)}
                  helperText={touched.twitter && errors.twitter}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="WhatsApp (URL)"
                  name="whatsapp"
                  error={touched.whatsapp && Boolean(errors.whatsapp)}
                  helperText={touched.whatsapp && errors.whatsapp}
                />
              </Grid>
              {/* Rôle - Switch pour Admin ou Utilisateur */}
            <Grid item size={{ xs: 12, md: 12 }}>
                <Typography>Activer la carte </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.activated}
                      onChange={(e) => setFieldValue('activated', e.target.checked)}
                    />
                  }
                  label={values.activated ? 'Oui' : 'Non'}
                />
                {touched.activated && errors.activated && (
                  <Typography variant="body2" color="error">
                    {errors.activated}
                  </Typography>
                )}
            </Grid>
           


            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                 Modifier
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditCardForm;
