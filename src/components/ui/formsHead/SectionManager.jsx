import React, { useState } from 'react';
import { Box, Button, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useFormSections } from '../../../context/FormSectionsProvider';

const defaultSections = [
  'PersonalDetailForm',
  'SummaryForm',
  'SkillForm',
  'ExperienceForm',
  'EducationForm',
  'LanguageForm'
];

const additionalSections = [
  'HobbyForm',
  'ProjectForm',
  'CertificationForm'
];

const SectionManager = () => {

  const { sections, addSection, removeSection } = useFormSections();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleToggleSection = (section) => {
    if (sections.includes(section)) {
      removeSection(section);
    } else {
      addSection(section);
    }
  };

  return (
    <Box>
      <Tooltip title="Sections">
        <Button
          variant="outlined"
          startIcon={<Add />}
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={handleOpenPopover}
        >
          Sections
        </Button>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography fontSize={15} variant="h6" gutterBottom>
            Sections par défaut
          </Typography>
          {defaultSections.map((section) => (
            <Box key={section} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography fontSize={13}>{section}</Typography>
            </Box>
          ))}
          {sections.filter(section => additionalSections.includes(section)).map((section) => (
            <Box key={section} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography fontSize={13}>{section}</Typography>
              <IconButton size="small" onClick={() => handleToggleSection(section)}>
                <Remove />
              </IconButton>
            </Box>
          ))}

          <Typography variant="h6" fontSize={15} gutterBottom>
            Sections complémentaires
          </Typography>
          {additionalSections.filter(section => !sections.includes(section)).map((section) => (
            <Box key={section} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography fontSize={12}>{section}</Typography>
              <IconButton size="small" onClick={() => handleToggleSection(section)}>
                <Add />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default SectionManager;