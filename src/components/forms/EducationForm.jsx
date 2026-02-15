import React, { useContext, useState, useEffect } from 'react';
import { Button, TextField, Box, IconButton, CircularProgress } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Grid from "@mui/material/Grid2";
import { UpdateEducations } from '../../api/resumes';
import { SetCurrentResume } from '../../redux/slices/resumeSlice';
import FormHead from '../ui/formsHead/FormHead';

const formField = {
  degree: "",
  schoolName: "",
  city: "",
  country: "",
  startDate: "",
  endDate: ""
}

const EducationForm = ({ enableNext, resumeId }) => {
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [educationList, setEducationList] = useState(resumeData?.educations || [formField]);


  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0]; // Convertit en "YYYY-MM-DD"
  };

  // Fonction pour gérer la mise à jour en temps réel du contexte et du formulaire
  const handleChangeEducation = (index, e) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries)
  };

  const addNewEducation = () => {
    setEducationList([...educationList, { ...formField }])
  }

  const removeEducation = () => {
    setEducationList(educationList => educationList.slice(0, -1))
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await UpdateEducations(resumeId, educationList);

    if (response.success) {
      dispatch(SetCurrentResume(response.data));
      enableNext(true);
    }
    setLoading(false);
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
    }, 1000);
  };

  useEffect(() => {
    if (resumeData?.educations && resumeData?.educations.length > 0) {
      setEducationList(resumeData.educations);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      educations: educationList,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationList]);



  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} bgcolor="white" boxShadow={3} borderRadius={2} maxWidth={600} mx="auto">
      <FormHead
        title="Education"
        description="Complétez les informations sur votre formation académique."
      />
      <>
        {educationList.map((item, index) => (
          <Grid mt={2} container key={index} spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Diplôme obtenu</span>
              <TextField
                fullWidth
                name="degree"
                value={item?.degree}
                onChange={(e) => handleChangeEducation(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Etablissement fréquenté</span>
              <TextField
                fullWidth
                name="schoolName"
                value={item?.schoolName}
                onChange={(e) => handleChangeEducation(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Ville</span>
              <TextField
                fullWidth
                name="city"
                value={item?.city}
                onChange={(e) => handleChangeEducation(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Pays</span>
              <TextField
                fullWidth
                name="country"
                value={item?.country}
                onChange={(e) => handleChangeEducation(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Date de début</span>
              <TextField
                fullWidth
                name="startDate"
                value={formatDate(item?.startDate)}
                onChange={(e) => handleChangeEducation(index, e)}
                margin="dense"
                type="date"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Date de fin</span>
              <TextField
                fullWidth
                name="endDate"
                value={formatDate(item?.endDate)}
                onChange={(e) => handleChangeEducation(index, e)}
                margin="dense"
                type="date"
              />
            </Grid>
            <Box textAlign="right">
              <IconButton
                color="error"
                onClick={removeEducation}
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
          onClick={addNewEducation}
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Ajouter une formation
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
};

export default EducationForm;