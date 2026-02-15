import { Box, Button, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Toolbar,
  Editor,
  EditorProvider,
} from 'react-simple-wysiwyg';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { GenerateExperienceList } from '../api/resumes';


function RichTextEditor({ value: initialValue, onRichTextEditorChange, index }) {

  // eslint-disable-next-line 
  const { resumeData, setResumeData } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(initialValue || "");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);


  const handleGenerateExpList = async (index) => {

    setIsLoading(true)

    if (!resumeData.experiences[index]?.jobTitle) {
      return alert(`SVP ajouter le titre de l'expérience`)
    }


    /*const prompt1 = `Génère des résumés de profil professionnel de 300 caractères,`+ 
    `clair et concis pour un CV, dont le titre est ${resumeData?.title || resumeData?.personalInfo?.jobTitle}.`;*/

    const prompt = `Titre du CV : ${resumeData?.title}, génère une description sous forme de liste <ul> ayant entre ` +
      ` 4-5 points pour l'expérience en tant que ${resumeData.experiences[index]?.jobTitle} dans la société ${resumeData.experiences[index]?.companyName}`

    const response = await GenerateExperienceList(prompt)

    if (response.data) {
      setValue(response.data);
      onRichTextEditorChange(response.data);
    }
    setIsLoading(false)

  };

  return (
    <Box>
      <Box mt={1} mb={1} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          disabled={isLoading}
          startIcon={<AutoFixHighIcon />}
          sx={{ textTransform: 'none' }}
          onClick={() => handleGenerateExpList(index)}
        >
          {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : "Générer IA"}
        </Button>
      </Box>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value)
          onRichTextEditorChange(e.target.value)
        }}>
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </Box>

  )
}

export default RichTextEditor