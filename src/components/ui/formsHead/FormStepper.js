import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useFormSections } from '../../../context/FormSectionsProvider';

const FormStepper = ({ activeFormIndex }) => {
  const { sections } = useFormSections();

  // Fonction pour retirer le suffixe "Form" des labels
  const getLabel = (section) => section.replace('Form', '');

  return (
    <Box
      sx={{
        width: '100%',
        mb: 2,
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      }}
    >
      <Stepper
        activeStep={activeFormIndex - 1}
        alternativeLabel
        sx={{
          '& .MuiStep-root': {
            padding: '0 4px', // Réduit l'espace entre les Steps
          },
          '& .MuiStepLabel-label': {
            fontSize: '12px', // Définit la taille des StepLabel à 12px
          },
        }}
      >
        {sections.map((section, index) => (
          <Step key={index}>
            <StepLabel>{getLabel(section)}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;