import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Box, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Grid from '@mui/material/Grid2';
import { UpdateProjects } from '../../api/resumes';
import { SetCurrentResume } from '../../redux/slices/resumeSlice';
import FormHead from '../ui/formsHead/FormHead';

const formField = {
  title: "",
  description: "",
  technologies: "",
  link: ""
}

export default function ProjectForm({ enableNext, resumeId }) {
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState(resumeData?.projects || [formField]);

  // Fonction pour gérer la mise à jour en temps réel du contexte et du formulaire
  const handleChangeProject = (index, e) => {
    const newEntries = projectList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };

  const addNewProject = () => {
    setProjectList([...projectList, { ...formField }]);
  }

  const removeProject = () => {
    setProjectList(projectList => projectList.slice(0, -1));
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await UpdateProjects(resumeId, projectList);

    if (response.success) {
      dispatch(SetCurrentResume(response.data));
      enableNext(true);
    }
    setLoading(false);
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
    }, 1000);
  };

  // Mettre à jour resumeData lorsque projectList change
  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      projects: projectList,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectList]);

  return (
    <Box p={3} bgcolor="white" boxShadow={3} borderRadius={2} maxWidth={600} mx="auto">
      <FormHead
        title="Projets"
        description="Ajouter vos projets professionnels"
      />
      <>
        {projectList.map((item, index) => (
          <Grid mt={2} container key={index} spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Titre du projet</span>
              <TextField
                fullWidth
                name="title"
                value={item?.title}
                onChange={(e) => handleChangeProject(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <span>Technologies utilisées</span>
              <TextField
                fullWidth
                name="technologies"
                value={item?.technologies}
                onChange={(e) => handleChangeProject(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <span>Lien vers le projet</span>
              <TextField
                fullWidth
                name="link"
                value={item?.link}
                onChange={(e) => handleChangeProject(index, e)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <span>Description</span>
              <TextField
                fullWidth
                name="description"
                value={item?.description}
                onChange={(e) => handleChangeProject(index, e)}
                margin="dense"
              />
            </Grid>

            <Box textAlign="right">
              <IconButton
                color="error"
                onClick={removeProject}
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
          onClick={addNewProject}
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Ajouter un projet
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