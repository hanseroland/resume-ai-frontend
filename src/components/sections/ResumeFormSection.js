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
  LanguageForm
};

function ResumeFormSection({resumeId}) {

   const [activeFormIndex, setActiveFormIndex] = useState(1)

   const [enableNext,setEnableNext] = useState(false)

   const { sections } = useFormSections();


  return (
    <Box>
        {/**Head */}
        <FormSectionHeader
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
          enableNext={enableNext}
        />
        <FormStepper activeFormIndex={activeFormIndex} />

        {sections.map((section, index) => {
        const FormComponent = formComponents[section];
        return (
          <Box key={index} sx={{ display: activeFormIndex === index + 1 ? 'block' : 'none' }}>
            <FormComponent resumeId={resumeId} enableNext={(v) => setEnableNext(v)} />
          </Box>
        );
      })}

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