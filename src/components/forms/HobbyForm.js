import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Box, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Grid from '@mui/material/Grid2';
import { UpdateHobbies } from '../../api/resumes';
import { SetCurrentResume } from '../../redux/slices/resumeSlice';
import FormHead from '../ui/formsHead/FormHead';

const formField = {
  hobby: ""
}

export default function HobbyForm({ enableNext, resumeId }) {
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hobbyList, setHobbyList] = useState(resumeData?.hobbies || [formField]);

  // Fonction pour gérer la mise à jour en temps réel du contexte et du formulaire
  const handleChangeHobby = (index, e) => {
    const newEntries = hobbyList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setHobbyList(newEntries);
  };

  const addNewHobby = () => {
    setHobbyList([...hobbyList,  {...formField}]);
  }

  const removeHobby = () => {
    setHobbyList(hobbyList => hobbyList.slice(0, -1));
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await UpdateHobbies(resumeId, hobbyList);

    if (response.success) { 
      dispatch(SetCurrentResume(response.data));
      enableNext(true);
    }
    setLoading(false);
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
    }, 1000);
  };

  // Mettre à jour resumeData lorsque hobbyList change
  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: hobbyList,
    }));
  }, [hobbyList]);

  return (
    <Box p={3} bgcolor="white" boxShadow={3} borderRadius={2} maxWidth={600} mx="auto">
      <FormHead
        title="Loisirs et Intérêts"
        description="Ajouter vos loisirs et intérêts"
      />
      <>
        {hobbyList.map((item, index) => (
          <Grid mt={2} container key={index} spacing={2}>
            <Grid size={{xs:12,sm:12}}>
              <span>Loisir ou Intérêt</span>
              <TextField
                fullWidth
                name="hobby"
                value={item?.hobby}
                onChange={(e) => handleChangeHobby(index, e)}
                margin="dense"
              />
            </Grid>
            <Box textAlign="right">
              <IconButton
                color="error"
                onClick={removeHobby}
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
          onClick={addNewHobby}
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Ajouter un loisir ou intérêt
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