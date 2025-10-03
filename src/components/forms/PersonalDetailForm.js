import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { Formik, Form, Field, useFormik } from "formik";
import { Cached } from '@mui/icons-material';
import * as Yup from "yup";
import FormHead from '../ui/formsHead/FormHead'
import Grid from "@mui/material/Grid2";
import { UpdatePersonalInfo } from '../../api/resumes';
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import { SetCurrentResume } from '../../redux/slices/resumeSlice';

import { useDispatch } from 'react-redux';


function PersonalDetailForm({ enableNext, resumeId }) {

  const { resumeData, setResumeData } = useContext(ResumeInfoContext)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const initializedRef = useRef(false);



  // Vérifier si resumeData.personalInfo est défini avant d'accéder aux valeurs
  /*const [initialValues, setInitialValues] = useState({
    fullName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  });*/

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Le nom complet est requis"),
    jobTitle: Yup.string().required("Le titre du poste est requis"),
    address: Yup.string().required("L'adresse est requise"),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Numéro de téléphone invalide")
      .required("Le téléphone est requis"),
    email: Yup.string()
      .email("Email invalide")
      .required("L'email est requis"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      try {
        const response = await UpdatePersonalInfo(resumeId, values);
        if (response?.success) {
          // Met à jour le store redux
          dispatch(SetCurrentResume(response.data));
          // Met à jour le contexte une seule fois (évite réinitialisation Formik)
          setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...(prev?.personalInfo || {}), ...values },
          }));
          enableNext(true);

          // toast.success("Détails enregistrés !");
        } else {
          console.error("UpdatePersonalInfo a retourné une erreur", response);
        }
      } catch (err) {
        console.error("Erreur lors de la sauvegarde :", err);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });




  /*useEffect(() => {
    if (resumeData && resumeData.personalInfo) {
      setInitialValues({
        fullName: resumeData.personalInfo.fullName || "",
        jobTitle: resumeData.personalInfo.jobTitle || "",
        address: resumeData.personalInfo.address || "",
        phone: resumeData.personalInfo.phone || "",
        email: resumeData.personalInfo.email || "",
      });
      enableNext(true);
    } else {
      enableNext(false);
    }
  }, [resumeData]);*/


  // Initialise formik UNE SEULE FOIS depuis resumeData
  useEffect(() => {
    if (!initializedRef.current && resumeData?.personalInfo) {
      const p = resumeData.personalInfo;
      formik.setValues({
        fullName: p.fullName || "",
        jobTitle: p.jobTitle || "",
        address: p.address || "",
        phone: p.phone || "",
        email: p.email || "",
      });
      initializedRef.current = true;
      enableNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData]);



  // Mise à jour du contexte dès qu'un champ change (sans attendre validation)
  /*const handleChange = (e, setFieldValue) => {
    enableNext(false)
    const { name, value } = e.target;
    setFieldValue(name, value);
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };*/

  /*const handleSubmit = async (values, { setSubmitting }) => {
    //console.log("ResumeId :", resumeId);
    //console.log("Données soumises :", values);
    setIsLoading(true)

    const response = await UpdatePersonalInfo(resumeId, values)

    if (response.success) {
      dispatch(SetCurrentResume(response.data));
      enableNext(true)
    }
    setIsLoading(false)
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
      setSubmitting(false);
    }, 1000);
  };*/

  if (!resumeData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box>
      <FormHead
        title="Détails Personnels"
        description="Commencez avec vos informations basiques"
      />

      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 4,
          mt: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 4,

        }}
      >

        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Nom complet */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="fullName"
                name="fullName"
                label="Nom Complet"
                fullWidth
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                variant="outlined"
              />
            </Grid>

            {/* Titre du poste */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="jobTitle"
                name="jobTitle"
                label="Titre du poste"
                fullWidth
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                variant="outlined"

              />
            </Grid>

            {/* Adresse */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                id="address"
                name="address"
                label="Adresse"
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                variant="outlined"
              />
            </Grid>

            {/* Téléphone */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="phone"
                name="phone"
                label="Téléphone avec indicatif sans le +"
                fullWidth
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined"

              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Bouton de soumission */}
          <Box mt={3} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || formik.isSubmitting}

            >
              {isLoading ? <CircularProgress /> : "Enregistrer"}
            </Button>
          </Box>
        </form>



      </Box>
    </Box>
  )
}

export default PersonalDetailForm