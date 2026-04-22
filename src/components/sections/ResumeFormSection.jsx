import React, { useState } from 'react'
import { Box } from '@mui/material'
import PersonalDetailForm from '../forms/PersonalDetailForm'
import SummaryForm from '../forms/SummaryForm'
import ExperienceForm from '../forms/ExperienceForm'
import EducationForm from '../forms/EducationForm'
import SkillForm from '../forms/SkillForm'
import FormSectionHeader from '../ui/formsHead/FormSectionHeader'
import { FormSectionsProvider, useFormSections } from '../../context/FormSectionsProvider'
import ProjectForm from '../forms/ProjectForm'
import CertificationForm from '../forms/CertificationForm'
import HobbyForm from '../forms/HobbyForm'
import LanguageForm from '../forms/ LanguageForm'
import FormStepper from '../ui/formsHead/FormStepper'


const formComponents = {
  PersonalDetailForm,
  SummaryForm,
  ExperienceForm,
  EducationForm,
  SkillForm,
  ProjectForm,
  CertificationForm,
  HobbyForm,
  LanguageForm,

};

function ResumeFormSection({ resumeId }) {

  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const { sections } = useFormSections();

  // Sécurité si les sections ne sont pas encore chargées
  if (!sections || sections.length === 0) return null;

  const activeFormName = sections[activeFormIndex - 1];
  const FormComponent = formComponents[activeFormName];


  return (
    <Box>
      {/**Head */}
      <FormSectionHeader
        activeFormIndex={activeFormIndex}
        setActiveFormIndex={(val) => {
            setActiveFormIndex(val);
            setEnableNext(false); // Reset le bouton "Next" à chaque changement d'onglet
          }}
        enableNext={enableNext}
        resumeId={resumeId}
      />
      <FormStepper activeFormIndex={activeFormIndex} />

      {
        FormComponent ? (
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
              overflowX: "hidden",
              p: 1,
            }}
          >
            <FormComponent 
              resumeId={resumeId} 
              enableNext={(v) => setEnableNext(v)} 
              />
          </Box>
        ) : (
        <Box p={3} textAlign="center">Section non trouvée</Box>
        )}
      
     </Box>
  )
}

export default function ResumeFormSectionWrapper(props) {
  return (
    <FormSectionsProvider>
      <ResumeFormSection {...props} />
    </FormSectionsProvider>
  );
}