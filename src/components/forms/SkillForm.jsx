import { useState, useEffect, useContext } from "react";
import { Button, TextField, Box, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import Grid from "@mui/material/Grid2";
import { UpdateSkills } from "../../api/resumes";
import { SetCurrentResume } from "../../redux/slices/resumeSlice";
import FormHead from "../ui/formsHead/FormHead";

const formField = {
  name: "",
  level: 0,
}

export default function SkillForm({ enableNext, resumeId }) {
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [skillList, setSkillList] = useState(resumeData?.skills || [formField]);


  // Fonction pour gérer la mise à jour en temps réel du contexte et du formulaire
  const handleChangeSkill = (index, name, value) => {
    const newEntries = skillList.slice();
    // Validation pour limiter la valeur de level entre 0 et 5
    if (name === "level") {
      const numericValue = parseInt(value, 10);
      if (numericValue < 0 || numericValue > 5) {
        return;
      }
    }
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };

  const addNewSkill = () => {
    setSkillList([...skillList, { ...formField }]);
  }

  const removeSkill = () => {
    setSkillList(skillList => skillList.slice(0, -1));
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await UpdateSkills(resumeId, skillList);

    if (response.success) {
      dispatch(SetCurrentResume(response.data));
      enableNext(true);
    }
    setLoading(false);
    setTimeout(() => {
      alert("Détails enregistrés avec succès !");
    }, 1000);
  };



  // Mettre à jour resumeData lorsque skillList change
  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      skills: skillList,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillList]);

  return (
    <Box p={3} bgcolor="white" boxShadow={3} borderRadius={2} maxWidth={600} mx="auto">
      <FormHead
        title="Compétences professionnelles"
        description="Ajouter vos compétences professionnelles"
      />
      <>
        {skillList.map((item, index) => (
          <Grid mt={2} container key={index} spacing={2}>
            <Grid size={{ xs: 6, sm: 6 }}>
              <span>Nom</span>
              <TextField
                fullWidth
                //name="name"
                value={item?.name}
                onChange={(e) => handleChangeSkill(index, 'name', e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 6 }}>
              <span>Niveau</span>
              <TextField
                fullWidth
                //name="level"
                value={item?.level}
                onChange={(e) => handleChangeSkill(index, 'level', e.target.value)}
                type="number"
                margin="dense"
                inputProps={{ min: 0, max: 5 }} // Ajout des attributs min et max

              />
            </Grid>
            <Box textAlign="right">
              <IconButton
                color="error"
                onClick={removeSkill}
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
          onClick={addNewSkill}
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Ajouter une compétence
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