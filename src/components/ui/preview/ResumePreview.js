import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { Box } from '@mui/material'
import PersonnalDetailPreview from './models/firstModel/PersonnalDetailPreview'
import SummaryDetailPreview from './models/firstModel/SummaryDetailPreview'
import SkillsDetailPreview from './models/firstModel/SkillsDetailPreview'
import ExperienceDetailPreview from './models/firstModel/ExperienceDetailPreview'
import EducationDetailPreview from './models/firstModel/EducationDetailPreview'
import { ResumeStyleContext } from '../../../context/ResumeStyleContext'
import LanguageDetailPreview from './models/firstModel/LanguageDetailPreview'



function ResumePreview() {

  const { resumeData } = useContext(ResumeInfoContext)
  const { cvColor } = useContext(ResumeStyleContext);


  //console.log("context",resumeData)
  return (
    <Box
      sx={{
        width: '100%',

      }}
    >
      {/**Infos personnelles */}
      <PersonnalDetailPreview cvColor={cvColor} resumeData={resumeData} />
      {/**Résumé */}
      <SummaryDetailPreview cvColor={cvColor} resumeData={resumeData} />
      {/**Compétences */}
      <SkillsDetailPreview cvColor={cvColor} resumeData={resumeData} />
      {/**Experiences */}
      <ExperienceDetailPreview cvColor={cvColor} resumeData={resumeData} />
      {/**Education */}
      <EducationDetailPreview cvColor={cvColor} resumeData={resumeData} />
      {/**Langues */}
      <LanguageDetailPreview cvColor={cvColor} resumeData={resumeData} />

    </Box>
  )
}

export default ResumePreview