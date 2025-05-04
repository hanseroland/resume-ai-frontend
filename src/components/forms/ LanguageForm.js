import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Box, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Grid from '@mui/material/Grid2';
import { UpdateLanguages } from '../../api/resumes';
import { SetCurrentResume } from '../../redux/slices/resumeSlice';
import FormHead from '../ui/formsHead/FormHead';

const formField = {
  name: "",
  note: ""
}

export default function LanguageForm({ enableNext, resumeId }) {
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [languageList, setLanguageList] = useState(resumeData?.languages || [formField]);

  // Fonction pour gérer la mise à jour en temps réel du contexte et du formulaire
  const handleChangeLanguage = (index, e) => {
    const newEntries = languageList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setLanguageList(newEntries);
  };

  const addNewLanguage = () => {
    setLanguageList([...languageList,  {...formField}]);
  }

  const removeLanguage = () => {
    setLanguageList(languageList => languageList.slice(0, -1));
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await UpdateLanguages(resumeId, languageList);

    if (response.success) { 
      dispatch(SetCurrentResume(response.data));
      enableNext(true);
    }
    setLoading(false);
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
    }, 1000);
  };

  // Mettre à jour resumeData lorsque languageList change
  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      languages: languageList,
    }));
  }, [languageList]);

  return (
    <Box p={3} bgcolor="white" boxShadow={3} borderRadius={2} maxWidth={600} mx="auto">
      <FormHead
        title="Langues"
        description="Ajouter vos compétences linguistiques"
      />
      <>
        {languageList.map((item, index) => (
          <Grid mt={2} container key={index} spacing={2}>
            <Grid size={{xs:12,sm:12}}>
              <span>Langue</span>
              <TextField
                fullWidth
                name="name"
                value={item?.name}
                onChange={(e) => handleChangeLanguage(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{xs:12,sm:12}}>
              <span>Niveau</span>
              <TextField
                fullWidth
                name="note"
                value={item?.note}
                onChange={(e) => handleChangeLanguage(index, e)}
                margin="dense"
              />
            </Grid>
            <Box textAlign="right">
              <IconButton
                color="error"
                onClick={removeLanguage}
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
          onClick={addNewLanguage}
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Ajouter une langue
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