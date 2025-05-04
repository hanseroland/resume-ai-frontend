import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Box, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Grid from '@mui/material/Grid2';
import { UpdateCertifications } from '../../api/resumes';
import { SetCurrentResume } from '../../redux/slices/resumeSlice';
import FormHead from '../ui/formsHead/FormHead';

const formField = {
  title: "",
  issuingOrganization: "",
  dateIssued: "",
  description: ""
}

export default function CertificationForm({ enableNext, resumeId }) {
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [certificationList, setCertificationList] = useState(resumeData?.certifications || [formField]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0]; // Convertit en "YYYY-MM-DD"
  };

  // Fonction pour gérer la mise à jour en temps réel du contexte et du formulaire
  const handleChangeCertification = (index, e) => {
    const newEntries = certificationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setCertificationList(newEntries);
  };

  const addNewCertification = () => {
    setCertificationList([...certificationList,  {...formField}]);
  }

  const removeCertification = () => {
    setCertificationList(certificationList => certificationList.slice(0, -1));
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await UpdateCertifications(resumeId, certificationList);

    if (response.success) { 
      dispatch(SetCurrentResume(response.data));
      enableNext(true);
    }
    setLoading(false);
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
    }, 1000);
  };

  // Mettre à jour resumeData lorsque certificationList change
  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      certifications: certificationList,
    }));
  }, [certificationList]);

  return (
    <Box p={3} bgcolor="white" boxShadow={3} borderRadius={2} maxWidth={600} mx="auto">
      <FormHead
        title="Certifications"
        description="Ajouter vos certifications professionnelles"
      />
      <>
        {certificationList.map((item, index) => (
          <Grid mt={2} container key={index} spacing={2}>
            <Grid size={{xs:12,sm:6}}>
              <span>Titre de la certification</span>
              <TextField
                fullWidth
                name="title"
                value={item?.title}
                onChange={(e) => handleChangeCertification(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{xs:12,sm:6}}>
              <span>Organisme émetteur</span>
              <TextField
                fullWidth
                name="issuingOrganization"
                value={item?.issuingOrganization}
                onChange={(e) => handleChangeCertification(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{xs:12,sm:12}}>
              <span>Date d'émission</span>
              <TextField
                fullWidth
                name="dateIssued"
                value={formatDate(item?.dateIssued)}
                onChange={(e) => handleChangeCertification(index, e)}
                margin="dense"
                type="date"
              />
            </Grid>
            <Grid size={{xs:12,sm:12}}>
              <span>Description</span>
              <TextField
                fullWidth
                name="description"
                value={item?.description}
                onChange={(e) => handleChangeCertification(index, e)}
                margin="dense"
              />
            </Grid>
            <Box textAlign="right">
              <IconButton
                color="error"
                onClick={removeCertification}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </>

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          startIcon={<Add />}
          onClick={addNewCertification}
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Ajouter une certification
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}>
          {loading ? "Enregistrement..." : "Sauvegarder"}
        </Button>
      </Box>
    </Box>
  );
}